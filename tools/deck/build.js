// Stage II deck build. Usage: node tools/deck/build.js <original.pdf> <out.pdf> [--final]
// 1) renders slides.html (new slides) to PDF, 2) renders one overlay page per final slide (new footers, small text edits),
// 3) merge.py puts old + new pages in the spec order and stamps the overlays.
// Gate (always printed; --final exits 1 and writes nothing): open ASSUMPTION/TO VERIFY tags, '__' or brackets on any page, '__' or brackets in docs/pitch-stage2.md.
const {chromium}=require('playwright'),{execFileSync}=require('child_process'),path=require('path'),fs=require('fs'),os=require('os');
const [orig,out]=process.argv.slice(2).filter(a=>!a.startsWith('--')),FINAL=process.argv.includes('--final');
if(!orig||!out){console.error('usage: node build.js <original.pdf> <out.pdf> [--final]');process.exit(2)}
const DIR=__dirname,SCRIPT=path.join(DIR,'../../docs/pitch-stage2.md'),BAD=/__|\[|\]/;

// Final order (25, the HSIC maximum): o = page of the original 18-page PDF, n = page of slides.html
const ORDER=['o1','o2','o3','o4','o5','o6','o7','n1','o8','o9','o10','o11','o12','o13','n2','n3','n4','n5','n6','n7','o14','o15','o16','o17','o18'];
const BG='#171513',CARD='#211E1A',MUTED='#A89F8E',TAN='#D9C3A0',ORANGE='#FF6A13';
// Text ops are sized from a reference text measured in the original page (pt, 960x540): ref=[text, left, capTop, right].
const MONO='500 Deck Mono',INTER='400 Inter';
const FOOT={font:MONO,ref:['LUMIO · 02 / 17',65,494.5,171.25]};
const footer=(n,o)=>[{patch:[60,489,200,510],fill:o==='o4'?'#D9C3A0':BG},{...FOOT,text:`LUMIO · ${String(n).padStart(2,'0')} / ${ORDER.length}`,color:o==='o4'?'#2B2018':MUTED}];
const notFound=x=>[{patch:[x-4,331,x+146,349],fill:BG},{font:INTER,ref:['Not found',x,335.25,x+54.25],text:'Not in public docs',color:MUTED}];
const EDITS={
  o1:[{patch:[60,456,420,476],fill:BG},{font:MONO,ref:['EDUARD · DARIUS · STEFAN',65,460.75,264.5],text:'EDUARD · DARIUS · STEFAN · TEAM FLOW · SUCEAVA',color:TAN}],
  o5:[...notFound(410.25),...notFound(576.5),...notFound(742.75),
      {...FOOT,ref:['LUMIO · 02 / 17',65,470,171.25],text:'BASED ON PUBLIC PAGES, CHECKED',color:MUTED,tag:'Assumption: check date'}],
  o6:[{patch:[648,375,882,393],fill:CARD},{font:MONO,ref:['POSSIBLE PARTNERS',652.75,379.5,783.75],text:'NO PARTNERS YET, PILOT NEXT',color:ORANGE}],
  o13:[{...FOOT,ref:['LUMIO · 02 / 17',65,62,171.25],text:'SAMPLE PLAYERS · NO REAL USERS YET',color:MUTED,anchor:'end',x:897}],
  // the ask on the last slide (Manager fix list); a new line on an original slide, so it stays tagged until Eduard approves it
  o18:[{font:MONO,ref:['LUMIO · EDUARD · DARIUS · STEFAN',65.5,461,332],y:426,text:'OUR ASK · ONE CLASS FOR A 4-WEEK PILOT',color:TAN,tag:'To verify: Eduard OK'}],
};

(async()=>{
  const b=await chromium.launch(),p=await b.newPage();
  const pages=ORDER.map((o,i)=>[...(o[0]==='o'?footer(i+1,o):footer(i+1,o).slice(1)),...(EDITS[o]||[])]);
  const pg=id=>'page '+(ORDER.indexOf(id)+1);
  // gate: tags and '__' / brackets on every page (new slides, overlay text, original pages) and in the script
  await p.goto('file://'+path.join(DIR,'slides.html'));await p.evaluate(()=>document.fonts.ready);
  const secs=await p.$$eval('section',e=>e.map(s=>[[...s.querySelectorAll('.tag')].map(t=>t.textContent),s.innerText]));
  const tags=[],bad=[];
  secs.forEach(([t,txt],i)=>{t.forEach(x=>tags.push(pg('n'+(i+1))+': '+x));if(BAD.test(txt))bad.push(pg('n'+(i+1))+': '+txt.split('\n').find(l=>BAD.test(l)))});
  pages.forEach((ops,i)=>ops.forEach(o=>{if(o.tag)tags.push('page '+(i+1)+': '+o.tag);if(o.text&&BAD.test(o.text))bad.push('page '+(i+1)+': '+o.text)}));
  bad.push(...execFileSync('python3',[path.join(DIR,'merge.py'),'--scan',orig,ORDER.join(',')]).toString().split('\n').filter(Boolean));
  fs.readFileSync(SCRIPT,'utf8').split('\n').forEach((l,i)=>{if(BAD.test(l))bad.push('docs/pitch-stage2.md line '+(i+1)+': ...'+l.match(/.{0,30}(__|\[|\]).{0,50}/)[0]+'...')});
  console.log(`${tags.length} open tag(s)`+(tags.length?':\n  '+tags.join('\n  '):''));
  console.log(`${bad.length} '__' or bracket hit(s)`+(bad.length?':\n  '+bad.join('\n  '):''));
  if(FINAL&&(tags.length||bad.length)){console.error('FINAL export refused, nothing written: confirm or delete every ASSUMPTION / TO VERIFY tag and every __ / bracket listed above.');await b.close();process.exit(1)}
  // 1) new slides
  const TMP=fs.mkdtempSync(path.join(os.tmpdir(),'deck-'));
  await p.pdf({path:path.join(TMP,'new.pdf'),preferCSSPageSize:true,printBackground:true});
  // 2) overlays (transparent pages, SVG text measured with canvas so it lands on the original glyph box)
  await p.setContent(`<style>@font-face{font-family:'Deck Mono';src:url(file://${DIR}/fonts/DeckMono-Medium.ttf);font-weight:500}
    @font-face{font-family:Inter;src:url(file://${DIR}/../../v2/fonts/Inter-Regular.woff2);font-weight:400}
    @page{size:960pt 540pt;margin:0}*{margin:0}svg{display:block;width:960pt;height:540pt;break-after:page}</style><body></body>`);
  await p.evaluate(async pages=>{
    await document.fonts.load('500 10px "Deck Mono"');await document.fonts.load('400 10px Inter');
    const cx=document.createElement('canvas').getContext('2d'),NS='http://www.w3.org/2000/svg';
    const m=(font,t)=>{cx.font=font.replace(/ (.+)$/,' 100px "$1"');return cx.measureText(t)};
    const el=(n,a,txt)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(txt)e.textContent=txt;return e};
    pages.forEach((ops,i)=>{const s=el('svg',{viewBox:'0 0 960 540'});
      for(const o of ops){
        if(o.patch){const[a,b,c,d]=o.patch;s.append(el('rect',{x:a,y:b,width:c-a,height:d-b,fill:o.fill}));continue}
        const[rt,l,top,r]=o.ref,rm=m(o.font,rt),size=(r-l)/(rm.actualBoundingBoxLeft+rm.actualBoundingBoxRight)*100;
        const base=(o.y??top)+rm.actualBoundingBoxAscent*size/100,[w,fam]=o.font.split(/ (.+)/);
        const x=o.x??l+rm.actualBoundingBoxLeft*size/100;
        s.append(el('text',{x,y:base,'font-family':fam,'font-weight':w,'font-size':size,fill:o.color,'text-anchor':o.anchor||'start'},o.text));
        if(o.tag){const tw=m(o.font,o.text).width*size/100,tx=x+tw+6,tl=o.tag.toUpperCase(),ts=size*.8,tlw=m(o.font,tl).width*ts/100;
          s.append(el('rect',{class:'tag',x:tx,y:base-ts-1.5,width:tlw+8,height:ts+4,rx:2,fill:'#D9C3A0'}));
          s.append(el('text',{x:tx+4,y:base,'font-family':fam,'font-weight':w,'font-size':ts,fill:'#171513'},tl))}
      }document.body.append(s)});
  },pages);
  await p.pdf({path:path.join(TMP,'ov.pdf'),preferCSSPageSize:true,printBackground:true});
  await b.close();
  execFileSync('python3',[path.join(DIR,'merge.py'),orig,path.join(TMP,'new.pdf'),path.join(TMP,'ov.pdf'),out,ORDER.join(',')],{stdio:'inherit'});
})().catch(e=>{console.error(e);process.exit(1)});
