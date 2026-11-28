// Deck screenshots from live v2 (never committed). Usage: node tools/deck/shots.js <outDir>
// Serves v2/ on a local port; 1273x716 CSS px at 2x (phone 390x844), English, Dark unless named *-light.
const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path');
const OUT=process.argv[2];if(!OUT){console.error('usage: node shots.js <outDir>');process.exit(2)}
const ROOT=path.join(__dirname,'../../v2'),TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml'};
const srv=http.createServer((q,r)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0])==='/'?'index.html':decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'});r.end(d)})});
// name, theme, phone mode, query, size, steps run in the page after load
const SHOTS=[
  ['galaxy','dark','desktop','',[1273,716],"L.go('home');await w(7000)"],
  ['home-dark','dark','desktop','',[1273,716],"L.setTab('home')"],
  ['home-light','light','desktop','',[1273,716],"L.setTab('home')"],
  ['gas','dark','desktop','',[1273,716],"L.go('planet','physics','gas')"],
  ['gas-float','dark','hybrid-float','',[1273,716],"L.go('planet','physics','gas')"],
  ['gas-hybrid','dark','hybrid','',[1273,716],"L.go('planet','physics','gas')"],
  ['proj-levels','dark','desktop','',[1273,716],"L.go('planet','physics','projectile');await w(900);document.querySelector('[data-m=lv]').click()"],
  ['ranks','dark','desktop','',[1273,716],"L.setTab('ranks');await w(600);[...document.querySelectorAll('*')].forEach(e=>{if(e.scrollHeight>e.clientHeight+4)e.scrollTop=128})"],
  ['phone','dark','phone','?role=phone',[390,844],"L.go('planet','physics','gas');await w(900);[...document.querySelectorAll('body *')].reverse().find(e=>e.children.length===0&&/Gas & piston/.test(e.textContent)).scrollIntoView({block:'start'})"],
];
(async()=>{
  await new Promise(r=>srv.listen(0,r));const port=srv.address().port,b=await chromium.launch();fs.mkdirSync(OUT,{recursive:true});
  for(const[name,theme,mode,q,[w,h],steps]of SHOTS){
    const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,colorScheme:theme,locale:'en-US',reducedMotion:'reduce'});
    await c.addInitScript(([theme,mode])=>{try{localStorage.setItem('lumio2_theme',theme);localStorage.setItem('lumio2_lang','en');localStorage.setItem('lumio2_view','galaxy');
      localStorage.setItem('lumio2_phone',JSON.stringify({mode:mode.split('-')[0],dock:mode.split('-')[1]||'side',tabsync:false,seen:true}));localStorage.setItem('lumio2_hint','1')}catch(e){}},[theme,mode]);
    const p=await c.newPage();p.on('pageerror',e=>console.error(name,e.message));
    await p.goto(`http://localhost:${port}/${q}`);await p.waitForTimeout(800);
    await p.evaluate(`(async()=>{const w=t=>new Promise(r=>setTimeout(r,t)),L=window.Lumio;${steps}})()`);await p.waitForTimeout(1500);
    await p.screenshot({path:path.join(OUT,name+'.png')});console.log(name);await c.close()}
  await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
