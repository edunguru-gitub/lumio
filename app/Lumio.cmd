@echo off
rem Lumio - one file. Double-click to start (phone mode included). Optional: "Lumio.cmd build" makes Lumio.exe once (internet). Contains the server, the exe builder, font embedding and the firewall fix.
setlocal
cd /d "%~dp0"
title Lumio
if exist "Lumio.exe" if not exist "Lumio.exe.ok" del /f /q "Lumio.exe" >nul 2>&1
if /i not "%~1"=="build" if exist "Lumio.exe.ok" if exist "Lumio.exe" (start "" "Lumio.exe" & exit /b 0)
where node >nul 2>&1 || (echo Node.js is needed: install the LTS version from https://nodejs.org then double-click Lumio.cmd again. & pause & exit /b 1)
if not exist "lumio.html" (echo lumio.html must be in the same folder as Lumio.cmd. & pause & exit /b 1)
set "MODE=%~1"
set "JS=%TEMP%\lumio-%RANDOM%.js"
more +20 "%~f0" > "%JS%"
set "LUMIO_DIR=%~dp0"
if /i "%MODE%"=="build" (node "%JS%" --build & del "%JS%" >nul 2>&1 & pause & exit /b)
netsh advfirewall firewall show rule name="Lumio ports" >nul 2>&1 || powershell -NoProfile -Command "Start-Process cmd -Verb RunAs -WindowStyle Hidden -ArgumentList '/c netsh advfirewall firewall add rule name=\"Lumio ports\" dir=in action=allow protocol=TCP localport=8080,8443 profile=private,domain'"
node "%JS%"
del "%JS%" >nul 2>&1
pause
exit /b
rem ---- everything below is the Lumio server (JavaScript), extracted at start ----
// Lumio local server (Node 20+, no dependencies). Runs as `node server.js` or as Lumio.exe (Node SEA).
// - Serves lumio.html (embedded in the exe, or next to this file)
// - Relays sync messages between the laptop and phones on the same Wi-Fi (SSE + POST)
// - Pairing: a random token per run; phones join only with the token from the QR code
// - HTTPS on :8443 for phone gyro (key.pem/cert.pem next to the exe, or a self-signed cert made once on Windows)
const http = require('http'), https = require('https'), fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto'), cp = require('child_process');
const PORT = +process.env.PORT || 8080, TLS_PORT = +process.env.TLS_PORT || 8443;
const VERSION = 'v5.27';
let TOKEN = crypto.randomBytes(9).toString('base64url');
let sea = null; try { sea = require('node:sea'); if (!sea.isSea()) sea = null; } catch (e) { sea = null; }
const BASE = sea ? path.dirname(process.execPath) : (process.env.LUMIO_DIR || __dirname);
const clients = new Map(); // res -> {role}
let tlsOn = false;

// LAN address detection: private IPv4 only, virtual/VPN adapters skipped, Wi-Fi first
const SKIP = /vEthernet|VMware|VirtualBox|vbox|WSL|Hyper-V|Docker|Loopback|Radmin|Hamachi|ZeroTier|Tailscale|WireGuard|OpenVPN|TAP|Npcap|Bluetooth|utun|awdl|llw|bridge|veth|virbr/i;
const isPrivate = ip => /^10\./.test(ip) || /^192\.168\./.test(ip) || /^172\.(1[6-9]|2\d|3[01])\./.test(ip);
const nameRank = n => /wi-?fi|wlan|wireless|wl/i.test(n) ? 0 : /ethernet|eth|en\d|lan/i.test(n) ? 1 : 2;
function lan() {
  const out = [];
  for (const [name, list] of Object.entries(os.networkInterfaces())) {
    if (SKIP.test(name)) continue;
    for (const i of list || []) if (i && i.family === 'IPv4' && !i.internal && (isPrivate(i.address) || process.env.LUMIO_ANY_IP) && !/^192\.168\.56\./.test(i.address)) out.push({ ip: i.address, name, rank: nameRank(name) });
  }
  return out.sort((a, b) => a.rank - b.rank || (/^192\.168\./.test(b.ip) - /^192\.168\./.test(a.ip)));
}
const ips = () => lan().map(x => x.ip);
const isLocal = req => /^(::1|127\.|::ffff:127\.)/.test(req.socket.remoteAddress || '');
const okToken = (req, u) => isLocal(req) || u.searchParams.get('t') === TOKEN;
const push = s => { for (const c of clients.keys()) c.write('data: ' + s + '\n\n'); };
const peers = () => { const r = [...clients.values()]; push(JSON.stringify({ type: 'peers', n: r.length, phones: r.filter(x => x.role === 'phone').length, host: os.hostname() })); };

function appHtml() {
  if (sea) { try { return Buffer.from(sea.getAsset('lumio.html')); } catch (e) {} }
  const html = fs.readdirSync(BASE).filter(f => /\.html?$/i.test(f));
  const pick = html.find(f => f.toLowerCase() === 'lumio.html') || html.find(f => /lumio/i.test(f)) || html[0];
  return pick ? fs.readFileSync(path.join(BASE, pick)) : null;
}

function pairPage(host) {
  const ip = host.split(':')[0], http1 = `http://${ip}:${PORT}/?role=phone&t=${TOKEN}`, https1 = `https://${ip}:${TLS_PORT}/?role=phone&t=${TOKEN}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lumio &middot; Connect</title>
<style>body{margin:0;font:16px/1.5 system-ui,sans-serif;background:#171513;color:#EDE3D0;padding:24px max(20px,env(safe-area-inset-left))}h1{font:400 2rem Georgia,serif;margin:8px 0}p{color:#A89F8E}
a{display:block;text-align:center;padding:14px;border-radius:999px;margin:12px 0;text-decoration:none;font-weight:600}.p{background:#D9C3A0;color:#2B2018}.s{border:1px solid #2E2A24;color:#EDE3D0}
ol{padding-left:20px;color:#EDE3D0}b{color:#FF6A13}</style></head><body>
<h1>Lumio &#10022;</h1><p>Connecting to <strong style="color:#EDE3D0">${os.hostname()}</strong></p>
${tlsOn ? `<ol><li>Tap <b>Connect with motion</b>.</li><li>Your phone shows a security warning once. Tap <b>Advanced</b> &rarr; <b>Continue / Proceed</b>. It is safe: the page comes from your own laptop.</li></ol>
<a class="p" href="${https1}">Connect with motion (gyro)</a><a class="s" href="${http1}">Connect without motion</a>` :
`<a class="p" href="${http1}">Connect</a><script>location.replace(${JSON.stringify(http1)})</script>`}
</body></html>`;
}

function handler(req, res) {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/api/info') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    const r = [...clients.values()];
    return res.end(JSON.stringify({ app: 'incognia', version: VERSION, host: os.hostname(), ips: ips(), nets: lan().map(x => ({ ip: x.ip, name: x.name })), port: PORT, tls: tlsOn ? TLS_PORT : 0,
      clients: r.length, phones: r.filter(x => x.role === 'phone').length, token: okToken(req, u) ? TOKEN : null }));
  }
  if (u.pathname === '/pair') {
    if (u.searchParams.get('t') !== TOKEN) { res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end('<p style="font:16px system-ui;padding:24px">This QR code is from an old Lumio session. Scan the new code on the laptop.</p>'); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); return res.end(pairPage(req.headers.host || 'localhost'));
  }
  if (u.pathname === '/events') {
    if (!okToken(req, u)) { res.writeHead(403); return res.end(); }
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 1500\n\n');
    clients.set(res, { role: u.searchParams.get('role') === 'phone' ? 'phone' : 'desk' }); peers();
    const ka = setInterval(() => res.write(': ka\n\n'), 15000);
    req.on('close', () => { clearInterval(ka); clients.delete(res); peers(); });
    return;
  }
  if (u.pathname === '/api/quit' && req.method === 'POST') {
    if (!isLocal(req)) { res.writeHead(403); return res.end(); }
    res.writeHead(204); res.end(); push(JSON.stringify({ type: 'bye' })); setTimeout(() => process.exit(0), 300); return;
  }
  if (u.pathname === '/send' && req.method === 'POST') {
    if (!okToken(req, u)) { res.writeHead(403); return res.end(); }
    let b = '';
    req.on('data', d => { b += d; if (b.length > 1e5) req.destroy(); });
    req.on('end', () => { let s; try { s = JSON.stringify(JSON.parse(b)); } catch (e) { res.writeHead(400); return res.end(); } push(s); res.writeHead(204); res.end(); });
    return;
  }
  if (u.pathname === '/' || u.pathname === '/index.html') {
    const d = appHtml();
    if (!d) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('lumio.html not found in ' + BASE); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); return res.end(d);
  }
  res.writeHead(404); res.end();
}

// ---- HTTPS: key.pem/cert.pem next to the exe, else a cached self-signed PFX (Windows, made once with PowerShell)
function tlsOptions() {
  const key = path.join(BASE, 'key.pem'), cert = path.join(BASE, 'cert.pem');
  if (fs.existsSync(key) && fs.existsSync(cert)) return { key: fs.readFileSync(key), cert: fs.readFileSync(cert) };
  if (process.platform !== 'win32') return null;
  const dir = path.join(process.env.APPDATA || BASE, 'Lumio'), pfx = path.join(dir, 'lumio.pfx');
  try {
    if (!fs.existsSync(pfx)) {
      fs.mkdirSync(dir, { recursive: true });
      const ps = `$c=New-SelfSignedCertificate -DnsName 'lumio.local','localhost' -CertStoreLocation 'Cert:\\CurrentUser\\My' -KeyExportPolicy Exportable -NotAfter (Get-Date).AddYears(5);` +
        `$p=ConvertTo-SecureString -String 'lumio' -Force -AsPlainText;Export-PfxCertificate -Cert $c -FilePath '${pfx}' -Password $p | Out-Null`;
      cp.execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps], { stdio: 'ignore', timeout: 30000, windowsHide: true });
    }
    return { pfx: fs.readFileSync(pfx), passphrase: 'lumio' };
  } catch (e) { return null; }
}

// ---- Firewall: try to add a private-network rule (works only when run as admin; otherwise Windows shows its own prompt)
function firewall() {
  if (process.platform !== 'win32') return;
  const prog = process.execPath;
  cp.exec(`netsh advfirewall firewall add rule name="Lumio" dir=in action=allow program="${prog}" profile=private`, { windowsHide: true }, () => {});
}

const ADDR = () => ips()[0] || 'localhost';
const openBrowser = () => { if (process.env.LUMIO_NO_BROWSER) return; const url = `http://localhost:${PORT}`;
  if (process.platform === 'win32') cp.exec(`start "" "${url}"`, { windowsHide: true }); else if (process.platform === 'darwin') cp.exec(`open "${url}"`); };
function start() {
// IP watcher: when the network changes, rotate the pairing token so old QR codes stop working
let netSig = ips().join(',');
setInterval(() => { const sig = ips().join(','); if (sig === netSig) return; netSig = sig; TOKEN = crypto.randomBytes(9).toString('base64url');
  push(JSON.stringify({ type: 'net', ips: ips() })); for (const [r, c] of clients) if (c.role === 'phone') r.end(); }, 4000);
const srv = http.createServer(handler);
srv.on('error', e => { if (e.code === 'EADDRINUSE') { openBrowser(); setTimeout(() => process.exit(0), 500); } else throw e; });
srv.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Lumio ${VERSION} is running - keep this window open, close it to stop.\n`);
  console.log(`  Laptop:  http://localhost:${PORT}`);
  console.log(`  Phone:   scan the QR code in the app (Connect phone)`);
  console.log(`  If Windows asks: tick "Private networks" and click Allow.\n`);
  firewall();
  openBrowser();
});
const tls = tlsOptions();
if (tls) {
  https.createServer(tls, handler).on('error', () => { tlsOn = false; }).listen(TLS_PORT, '0.0.0.0', () => { tlsOn = true; console.log(`  HTTPS for phone motion: https://${ADDR()}:${TLS_PORT}\n`); });
}
}

// ---- Font embedding (was embed-fonts.js): Geist, Geist Mono, Instrument Serif into lumio.html, once, needs internet
function embedFonts() {
  const FILE = path.join(BASE, 'lumio.html'), MARK = '/*FONTS:EMBED*/';
  const CSS_URL = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif&display=swap';
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
  const get = url => new Promise((ok, no) => https.get(url, { headers: { 'User-Agent': UA } }, r => {
    if (r.statusCode >= 300 && r.headers.location) return get(r.headers.location).then(ok, no);
    if (r.statusCode !== 200) return no(new Error('HTTP ' + r.statusCode));
    const b = []; r.on('data', d => b.push(d)); r.on('end', () => ok(Buffer.concat(b)));
  }).on('error', no));
  return (async () => {
    const html = fs.readFileSync(FILE, 'utf8');
    if (!html.includes(MARK)) return console.log('      fonts already embedded');
    const css = (await get(CSS_URL)).toString(); let out = '', n = 0;
    for (const b of css.split('/*').slice(1).map(x => '/*' + x).filter(x => /\/\* (latin|latin-ext) \*\//.test(x))) {
      const m = b.match(/url\((https:[^)]+\.woff2)\)/); if (!m) continue;
      out += b.replace(/\/\*[^*]*\*\//, '').replace(m[0], 'url(data:font/woff2;base64,' + (await get(m[1])).toString('base64') + ')').trim() + '\n'; n++;
    }
    if (!out) throw new Error('no font faces');
    fs.writeFileSync(FILE, html.replace(MARK, '/*FONTS:EMBEDDED*/\n' + out)); console.log('      embedded ' + n + ' font faces');
  })().catch(e => console.log('      fonts skipped (' + e.message + '), the built-in fallback font is used'));
}

// ---- Build Lumio.exe (was build-exe.bat): one exe with server + app + fonts, no console window
async function build() {
  const run = c => cp.execSync(c, { cwd: BASE, stdio: 'inherit', shell: true });
  const exe = path.join(BASE, 'Lumio.exe');
  try {
    console.log('[1/5] Embedding fonts...'); await embedFonts();
    console.log('[2/5] Packing server + app...');
    fs.writeFileSync(path.join(BASE, 'sea-config.json'), JSON.stringify({ main: __filename, output: 'sea-prep.blob', disableExperimentalSEAWarning: true, assets: { 'lumio.html': 'lumio.html' } }));
    run(`"${process.execPath}" --experimental-sea-config sea-config.json`);
    console.log('[3/5] Copying the Node runtime...');
    if (fs.existsSync(exe)) fs.unlinkSync(exe); fs.copyFileSync(process.execPath, exe);
    console.log('[4/5] Adding the icon...');
    if (fs.existsSync(path.join(BASE, 'lumio.ico'))) {
      try { run('npm install --no-save --silent rcedit@4'); const m = require(path.join(BASE, 'node_modules', 'rcedit'));
        await (m.rcedit || m.default || m)(exe, { icon: path.join(BASE, 'lumio.ico'), 'version-string': { ProductName: 'Lumio', FileDescription: 'Lumio' } }); console.log('      icon ok');
      } catch (e) { console.log('      icon skipped: ' + e.message); }
    } else console.log('      no lumio.ico, skipped');
    console.log('[5/5] Injecting the app and hiding the console window...');
    run('npx --yes postject@1.0.0-alpha.6 Lumio.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse ' + ['NODE', 'SEA', 'FUSE', 'fce680ab2cc467b6e072b8b5df1996b2'].join('_'));
    const b = fs.readFileSync(exe), pe = b.readUInt32LE(0x3c); if (b.readUInt32LE(pe) !== 0x4550) throw new Error('not a PE file');
    b.writeUInt16LE(2, pe + 24 + 68); fs.writeFileSync(exe, b);
    fs.writeFileSync(exe + '.ok', 'built ' + new Date().toISOString());
    for (const f of ['sea-prep.blob', 'sea-config.json']) try { fs.unlinkSync(path.join(BASE, f)); } catch (e) {}
    try { fs.rmSync(path.join(BASE, 'node_modules'), { recursive: true, force: true }); } catch (e) {}
    console.log('\nDone. Lumio.exe is ready. From now on Lumio.cmd (or Lumio.exe) starts it. To stop: Settings > Quit Lumio.');
  } catch (e) { console.log('\nBuild failed: ' + e.message + '\nNo problem: Lumio.cmd still runs Lumio without the exe (double-click it).'); try { fs.unlinkSync(exe); fs.unlinkSync(exe + '.ok'); } catch (x) {} process.exitCode = 1; }
}

if (!sea && process.argv.includes('--build')) build(); else start();
