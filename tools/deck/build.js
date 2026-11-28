// Stage II deck build. Usage: node tools/deck/build.js <original.pdf> <out.pdf> [--final]
// 1) renders slides.html (new slides) to PDF, 2) renders one overlay page per final slide (new footers, small text edits),
// 3) merge.py puts old + new pages in the spec order and stamps the overlays.
// Gate (always printed; --final exits 1 and writes nothing): open ASSUMPTION/TO VERIFY tags, '__' or brackets on any page,
// '__', brackets or the words ASSUMPTION / TO VERIFY (also unbracketed) in docs/pitch-stage2.md.
const {chromium}=require('playwright'),{execFileSync}=require('child_process'),path=require('path'),fs=require('fs'),os=require('os');
const [orig,out]=process.argv.slice(2).filter(a=>!a.startsWith('--')),FINAL=process.argv.includes('--final');
if(!orig||!out){console.error('usage: node build.js <original.pdf> <out.pdf> [--final]');process.exit(2)}
const DIR=__dirname,SCRIPT=path.join(DIR,'../../docs/pitch-stage2.md'),BAD=/__|\[|\]/,BADS=/__|\[|\]|ASSUMPTION|TO VERIFY/;
const SHOTS=process.env.SHOTS_DIR||path.join(DIR,'shots'); // live v2 screenshots (node tools/deck/shots.js) + qr.png (node tools/qr/styled.js); never committed

// Final order (25 of max 25; n10 = 'Limits today' slide, deck-final-4): o = page of the original 18-page PDF, n = page of slides.html. Old team pages o15-o17 -> one 'Why us' slide n9 (Eduard OK, 26 Nov)
// DRAFT6 (Eduard OK 27 Nov): old o3 o4 o5 o8 o9 o10 o12 o13 rebuilt as n11-n16, n18, n19 (true for v2); o11 (six themes) -> n17 'Try Lumio now' QR
// DRAFT11 (Eduard 28 Nov): old final page o18 -> n22 'Try it yourself' tutorial + QR
const ORDER=['o1','o2','n11','n12','n13','o6','o7','n1','n14','n15','n16','n17','n19','n2','n3','n4','n5','n6','n7','n8','n10','n20','n9','n21','n22'];
// DRAFT8 (Eduard 27 Nov): old phone slide n18 merged into n14; n9 = 'Why Lumio' (product), n21 = 'The team'
// DRAFT7 (Eduard 27 Nov): o14 'Next steps' -> n20 phase table (o14 items kept inside it); n9 Why us with sourced numbers; n4-n8 new business model (setup fee + subscription, X = 2 schools)
const BG='#171513',CARD='#211E1A',MUTED='#A89F8E',TAN='#D9C3A0',ORANGE='#FF6A13';
// Text ops are sized from a reference text measured in the original page (pt, 960x540): ref=[text, left, capTop, right].
const MONO='500 Deck Mono',INTER='400 Inter',SERIF='400 Deck Serif',INK='#EDE3D0',TILE='#211E1A';
const FOOT={font:MONO,ref:['LUMIO · 02 / 17',65,494.5,171.25]};
// fill 'auto' = colour sampled from the original page at the patch corner (pages are images, bg varies by 1-2 levels); o18 had no footer, so no patch
const footer=(n,o)=>[o==='o18'?{}:{patch:[60,489,200,510],fill:'auto'},{...FOOT,text:`LUMIO · ${String(n).padStart(2,'0')} / ${ORDER.length}`,color:o==='n12'?'#2B2018':MUTED}];
// tile body lines on slide 2 (Inter, measured from the original first body line of each tile)
const body=(x,ref,r,lines)=>lines.map((t,i)=>({font:INTER,ref:[ref,x,242,r],y:242+i*22.5,text:t,color:INK}));
const EDITS={
  o1:[{patch:[60,300,362,346],fill:'auto'},{font:SERIF,ref:['Light up how you learn.',65,305,351],text:'Short hands-on labs for high school students.',color:TAN},{patch:[60,456,600,476],fill:BG},{font:MONO,ref:['EDUARD · DARIUS · STEFAN',65,460.75,264.5],text:'EDUARD · DARIUS · STEFAN · TEAM FLOW · SUCEAVA AND ORADEA',color:TAN}],
  o6:[{patch:[648,375,882,393],fill:CARD},{font:MONO,ref:['POSSIBLE PARTNERS',652.75,379.5,783.75],text:'NO PARTNERS YET, PILOT NEXT',color:ORANGE},
      // DRAFT8 (Eduard 27 Nov): band without 'class licence' / 'parents can add premium'
      {patch:[60,440,900,460],fill:'auto'},{font:MONO,ref:['OUR PLAN: FREE FOR STUDENTS · PRIVATE SCHOOLS PAY A CLASS LICENCE · PARENTS CAN ADD PREMIUM',65,444.75,827.3],text:"OUR PLAN: SCHOOLS PAY A SETUP FEE PLUS A YEARLY SUBSCRIPTION; PARENTS' PREMIUM COMES LATER",color:TAN}],
  // survey statistics (Eduard OK 26 Nov): only the counts in docs stay (10 of 13, 13, 4 of 5); DRAFT5 default: no other numbers
  o2:[{patch:[362,238,607,441],fill:'auto'},
      ...body(368,'One in seven loses focus in',565,['Some lose focus in under ten','minutes, more by twenty. A long','lesson loses them before the','idea clicks.']),
      {font:MONO,ref:['1 IN 7 DRIFT UNDER 10 MIN',368,427,546],text:'DRIFT UNDER 10 MIN',color:ORANGE},
      {patch:[645,238,891,441],fill:'auto'},
      ...body(651,'When they get stuck, one in',852,['When they get stuck, some give','up and others just re-read the','same page. Nothing tells them','what to try next.']),
      {font:MONO,ref:['1 IN 7 QUIT · 3 IN 10 RE-READ',651,427,859],text:'QUIT OR RE-READ',color:ORANGE}],
  o7:[{patch:[60,106,806,166],fill:'auto'},{font:SERIF,ref:['Seven in ten want to try it. Testers come back.',66,113,795],text:'Students want to try it. Testers come back.',color:INK}],
};

(async()=>{
  const b=await chromium.launch(),p=await b.newPage();
  const pages=ORDER.map((o,i)=>[...(o[0]==='o'?footer(i+1,o):footer(i+1,o).slice(1)),...(EDITS[o]||[])]);
  const auto=[];pages.forEach((ops,i)=>ops.forEach(o=>{if(o.fill==='auto')auto.push([ORDER[i],o])}));
  const px=JSON.parse(execFileSync('python3',[path.join(DIR,'merge.py'),'--px',orig,JSON.stringify(auto.map(([k,o])=>[+k.slice(1),o.patch[0],o.patch[1]]))]).toString());
  auto.forEach(([,o],j)=>o.fill=px[j]);
  const pg=id=>'page '+(ORDER.indexOf(id)+1);
  // gate: tags and '__' / brackets on every page (new slides, overlay text, original pages) and in the script
  await p.goto('file://'+path.join(DIR,'slides.html'));
  const need=await p.$$eval('img[data-shot]',e=>e.map(i=>i.dataset.shot)),miss=need.filter(f=>!fs.existsSync(path.join(SHOTS,f)));
  if(miss.length){console.error('missing screenshots in '+SHOTS+': '+miss.join(', ')+' (node tools/deck/shots.js <dir>; node tools/qr/styled.js <dir>/qr.png)');await b.close();process.exit(2)}
  await p.$$eval('img[data-shot]',(e,d)=>Promise.all(e.map(i=>new Promise(r=>{i.onload=i.onerror=r;i.src='file://'+d+'/'+i.dataset.shot}))),SHOTS);
  await p.evaluate(()=>document.fonts.ready);
  const secs=await p.$$eval('section',e=>e.map(s=>[[...s.querySelectorAll('.tag')].map(t=>t.textContent),s.innerText]));
  const tags=[],bad=[];
  secs.forEach(([t,txt],i)=>{t.forEach(x=>tags.push(pg('n'+(i+1))+': '+x));if(BAD.test(txt))bad.push(pg('n'+(i+1))+': '+txt.split('\n').find(l=>BAD.test(l)))});
  pages.forEach((ops,i)=>ops.forEach(o=>{if(o.tag)tags.push('page '+(i+1)+': '+o.tag);if(o.text&&BAD.test(o.text))bad.push('page '+(i+1)+': '+o.text)}));
  bad.push(...execFileSync('python3',[path.join(DIR,'merge.py'),'--scan',orig,ORDER.join(',')]).toString().split('\n').filter(Boolean));
  fs.readFileSync(SCRIPT,'utf8').split('\n').forEach((l,i)=>{if(BADS.test(l))bad.push('docs/pitch-stage2.md line '+(i+1)+': ...'+l.match(/.{0,30}(__|\[|\]|ASSUMPTION|TO VERIFY).{0,50}/)[0]+'...')});
  console.log(`${tags.length} open tag(s)`+(tags.length?':\n  '+tags.join('\n  '):''));
  console.log(`${bad.length} '__' or bracket hit(s)`+(bad.length?':\n  '+bad.join('\n  '):''));
  if(FINAL&&(tags.length||bad.length)){console.error('FINAL export refused, nothing written: confirm or delete every ASSUMPTION / TO VERIFY tag and every __ / bracket listed above.');await b.close();process.exit(1)}
  // 1) new slides
  const TMP=fs.mkdtempSync(path.join(os.tmpdir(),'deck-'));
  await p.pdf({path:path.join(TMP,'new.pdf'),preferCSSPageSize:true,printBackground:true});
  // 2) overlays (transparent pages, SVG text measured with canvas so it lands on the original glyph box)
  await p.setContent(`<style>@font-face{font-family:'Deck Mono';src:url(file://${DIR}/fonts/DeckMono-Medium.ttf);font-weight:500}
    @font-face{font-family:Inter;src:url(file://${DIR}/../../v2/fonts/Inter-Regular.woff2);font-weight:400}
    @font-face{font-family:'Deck Serif';src:url(file://${DIR}/fonts/InstrumentSerif-Regular.woff2);font-weight:400}
    @page{size:960pt 540pt;margin:0}*{margin:0}svg{display:block;width:960pt;height:540pt;break-after:page}</style><body></body>`);
  await p.evaluate(async pages=>{
    await document.fonts.load('500 10px "Deck Mono"');await document.fonts.load('400 10px Inter');await document.fonts.load('400 10px "Deck Serif"');
    const cx=document.createElement('canvas').getContext('2d'),NS='http://www.w3.org/2000/svg';
    const m=(font,t)=>{cx.font=font.replace(/ (.+)$/,' 100px "$1"');return cx.measureText(t)};
    const el=(n,a,txt)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(txt)e.textContent=txt;return e};
    pages.forEach((ops,i)=>{const s=el('svg',{viewBox:'0 0 960 540'});
      for(const o of ops){
        if(o.patch){const[a,b,c,d]=o.patch;s.append(el('rect',{x:a,y:b,width:c-a,height:d-b,fill:o.fill}));continue}
        if(!o.font)continue;
        const[rt,l,top,r]=o.ref,rm=m(o.font,rt),size=(r-l)/(rm.actualBoundingBoxLeft+rm.actualBoundingBoxRight)*100;
        const base=o.ybase?o.ybase[1]+m(o.font,o.ybase[0]).actualBoundingBoxAscent*size/100:(o.y??top)+rm.actualBoundingBoxAscent*size/100,[w,fam]=o.font.split(/ (.+)/);
        const x=o.x??l+rm.actualBoundingBoxLeft*size/100;
        s.append(el('text',{x,y:base,'font-family':fam,'font-weight':w,'font-size':size,fill:o.color,'text-anchor':o.anchor||'start'},o.text));
        if(o.tag){const tw=m(o.font,o.text).width*size/100,tx=x+tw+6,tl=o.tag.toUpperCase(),ts=size*(o.tagScale||.8),tlw=m(o.font,tl).width*ts/100;
          s.append(el('rect',{class:'tag',x:tx,y:base-ts-1.5,width:tlw+8,height:ts+4,rx:2,fill:'#D9C3A0'}));
          s.append(el('text',{x:tx+4,y:base,'font-family':fam,'font-weight':w,'font-size':ts,fill:'#171513'},tl))}
      }document.body.append(s)});
  },pages);
  await p.pdf({path:path.join(TMP,'ov.pdf'),preferCSSPageSize:true,printBackground:true});
  await b.close();
  execFileSync('python3',[path.join(DIR,'merge.py'),orig,path.join(TMP,'new.pdf'),path.join(TMP,'ov.pdf'),out,ORDER.join(',')],{stdio:'inherit'});
})().catch(e=>{console.error(e);process.exit(1)});
