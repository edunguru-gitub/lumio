// Print-ready A4 QR sheet for live demos. Usage: node tools/qr/make-sheet.js <out.pdf> [url]
// Page 1: one 16 cm QR (13 cm of modules) + URL + call to action (EN/RO). Page 2: 8 cut-out cards (2 x 4) with dashed cut lines.
// QR matrix from the MIT library bundled in v2/js/qr.js (same code the app uses), error correction Q (25%).
// Prints 'matrix NxN' and the PDF path; the PDF is an output, never commit it.
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),vm=require('vm'),os=require('os');
const out=process.argv[2],URL=process.argv[3]||'https://edunguru-gitub.github.io/lumio/';
if(!out){console.error('usage: node tools/qr/make-sheet.js <out.pdf> [url]');process.exit(2)}
const ROOT=path.join(__dirname,'../..'),src=fs.readFileSync(path.join(ROOT,'v2/js/qr.js'),'utf8');
const lib=src.slice(src.indexOf('var LumioQR='),src.indexOf('function draw('));
const LumioQR=vm.runInNewContext(lib+';LumioQR');
const q=new LumioQR(-1,3);q.addData(URL);q.make();const n=q.getModuleCount(),QZ=4;
// SVG with a 4-module white quiet zone (ISO minimum) inside the square
let d='';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(q.isDark(y,x))d+=`M${x+QZ} ${y+QZ}h1v1h-1z`;
const svg=`<svg viewBox="0 0 ${n+2*QZ} ${n+2*QZ}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
const F=f=>'file://'+path.join(ROOT,'v2/fonts',f),plain=URL.replace(/^https?:\/\//,'').replace(/\/$/,'');
const card=`<div class="card"><div class="q">${svg}</div><div><p class="en">Scan to try Lumio</p><p class="ro">Scanează și încearcă Lumio</p><p class="u">${plain}</p></div></div>`;
const html=`<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Caladea;src:url(${F('Caladea-Bold.ttf')});font-weight:700}
@font-face{font-family:Inter;src:url(${F('Inter-Regular.woff2')});font-weight:400}
@font-face{font-family:Inter;src:url(${F('Inter-SemiBold.woff2')});font-weight:600}
@page{size:A4;margin:0}*{box-sizing:border-box;margin:0}body{font-family:Inter;color:#000;background:#fff}
.p{width:210mm;height:297mm;page-break-after:always;overflow:hidden}
.p1{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8mm;text-align:center}
.p1 h1{font:700 30pt Caladea}.p1 h2{font:400 20pt Inter}.p1 .big{width:160mm;height:160mm}.p1 .big svg,.q svg{display:block;width:100%;height:100%}
.p1 .u{font:600 18pt Inter;letter-spacing:.02em}
.p2{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr)}
.card{display:flex;align-items:center;gap:5mm;padding:6mm;border-right:.3mm dashed #888;border-bottom:.3mm dashed #888}
.card:nth-child(2n){border-right:0}.card:nth-child(n+7){border-bottom:0}
.q{width:52mm;height:52mm;flex:none}.en{font:700 15pt Caladea}.ro{font:400 10.5pt Inter;margin-top:2mm}.card .u{font:600 8pt Inter;margin-top:4mm;word-break:break-all}
</style>
<div class="p p1"><h1>Scan to try Lumio</h1><h2>Scanează și încearcă Lumio</h2><div class="big">${svg}</div><p class="u">${plain}</p></div>
<div class="p p2">${card.repeat(8)}</div>`;
(async()=>{const b=await chromium.launch(),p=await b.newPage();const tmp=path.join(fs.mkdtempSync(path.join(os.tmpdir(),'lumio-qr-')),'sheet.html');fs.writeFileSync(tmp,html);await p.goto('file://'+tmp);await p.evaluate(()=>document.fonts.ready);
  await p.pdf({path:out,format:'A4',printBackground:true,margin:{top:0,right:0,bottom:0,left:0}});await b.close();
  console.log(`matrix ${n}x${n} (+${QZ} quiet zone), EC Q, url ${URL}\n${path.resolve(out)}`)})();
