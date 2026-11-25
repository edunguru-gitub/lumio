// Stage II deck build. Usage: node tools/deck/build.js <original.pdf> <out.pdf> [--final]
// 1) renders slides.html (new slides) to PDF, 2) renders one overlay page per final slide (new footers, small text edits),
// 3) merge.py puts old + new pages in the spec order and stamps the overlays. --final exits 1 while any ASSUMPTION/TO VERIFY tag remains.
const {chromium}=require('playwright'),{execFileSync}=require('child_process'),path=require('path'),fs=require('fs'),os=require('os');
const [orig,out]=process.argv.slice(2).filter(a=>!a.startsWith('--')),FINAL=process.argv.includes('--final');
if(!orig||!out){console.error('usage: node build.js <original.pdf> <out.pdf> [--final]');process.exit(2)}
const DIR=__dirname,TMP=fs.mkdtempSync(path.join(os.tmpdir(),'deck-'));

// Final order (24): o = page of the original 18-page PDF, n = page of slides.html
const ORDER=['o1','o2','o3','o4','o5','o6','o7','n1','o8','o9','o10','o11','o12','o13','n2','n3','n4','n5','n6','o14','o15','o16','o17','o18'];
const BG='#171513',CARD='#211E1A',MUTED='#A89F8E',TAN='#D9C3A0',ORANGE='#FF6A13';
// Text ops are sized from a reference text measured in the original page (pt, 960x540): ref=[text, left, capTop, right].
const MONO='500 Deck Mono',INTER='400 Inter';
const FOOT={font:MONO,ref:['LUMIO · 02 / 17',65,494.5,171.25]};
const footer=(n,o)=>[{patch:[60,489,200,510],fill:o==='o4'?'#D9C3A0':BG},{...FOOT,text:`LUMIO · ${String(n).padStart(2,'0')} / 24`,color:o==='o4'?'#2B2018':MUTED}];
const notFound=x=>[{patch:[x-4,331,x+146,349],fill:BG},{font:INTER,ref:['Not found',x,335.25,x+54.25],text:'Not in public docs',color:MUTED}];
const EDITS={
  o1:[{patch:[60,456,420,476],fill:BG},{font:MONO,ref:['EDUARD · DARIUS · STEFAN',65,460.75,264.5],text:'EDUARD · DARIUS · STEFAN · TEAM FLOW · SUCEAVA',color:TAN}],
  o5:[...notFound(410.25),...notFound(576.5),...notFound(742.75),
      {...FOOT,ref:['LUMIO · 02 / 17',65,470,171.25],text:'BASED ON PUBLIC PAGES, CHECKED __',color:MUTED,tag:'Assumption: check date'}],
  o6:[{patch:[648,375,882,393],fill:CARD},{font:MONO,ref:['POSSIBLE PARTNERS',652.75,379.5,783.75],text:'NO PARTNERS YET, PILOT NEXT',color:ORANGE}],
  o13:[{...FOOT,ref:['LUMIO · 02 / 17',65,62,171.25],text:'SAMPLE PLAYERS · NO REAL USERS YET',color:MUTED,anchor:'end',x:897}],
};

(async()=>{
  const b=await chromium.launch(),p=await b.newPage();
  // 1) new slides
  await p.goto('file://'+path.join(DIR,'slides.html'));await p.evaluate(()=>document.fonts.ready);
  const tags=await p.$$eval('.tag',e=>e.map(t=>t.closest('section').id+': '+t.textContent));
  await p.pdf({path:path.join(TMP,'new.pdf'),preferCSSPageSize:true,printBackground:true});
  // 2) overlays (transparent pages, SVG text measured with canvas so it lands on the original glyph box)
  const pages=ORDER.map((o,i)=>[...(o[0]==='o'?footer(i+1,o):footer(i+1,o).slice(1)),...(EDITS[o]||[])]);
  await p.setContent(`<style>@font-face{font-family:'Deck Mono';src:url(file://${DIR}/fonts/DeckMono-Medium.ttf);font-weight:500}
    @font-face{font-family:Inter;src:url(file://${DIR}/../../v2/fonts/Inter-Regular.woff2);font-weight:400}
    @page{size:960pt 540pt;margin:0}*{margin:0}svg{display:block;width:960pt;height:540pt;break-after:page}</style><body></body>`);
  const otags=await p.evaluate(async pages=>{
    await document.fonts.load('500 10px "Deck Mono"');await document.fonts.load('400 10px Inter');
    const cx=document.createElement('canvas').getContext('2d'),NS='http://www.w3.org/2000/svg',tags=[];
    const m=(font,t)=>{cx.font=font.replace(/ (.+)$/,' 100px "$1"');return cx.measureText(t)};
    const el=(n,a,txt)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(txt)e.textContent=txt;return e};
    pages.forEach((ops,i)=>{const s=el('svg',{viewBox:'0 0 960 540'});
      for(const o of ops){
        if(o.patch){const[a,b,c,d]=o.patch;s.append(el('rect',{x:a,y:b,width:c-a,height:d-b,fill:o.fill}));continue}
        const[rt,l,top,r]=o.ref,rm=m(o.font,rt),size=(r-l)/(rm.actualBoundingBoxLeft+rm.actualBoundingBoxRight)*100;
        const base=top+rm.actualBoundingBoxAscent*size/100,[w,fam]=o.font.split(/ (.+)/);
        const x=o.x??l+rm.actualBoundingBoxLeft*size/100;
        s.append(el('text',{x,y:base,'font-family':fam,'font-weight':w,'font-size':size,fill:o.color,'text-anchor':o.anchor||'start'},o.text));
        if(o.tag){tags.push('page '+(i+1)+': '+o.tag);const tw=m(o.font,o.text).width*size/100,tx=x+tw+6,tl=o.tag.toUpperCase(),ts=size*.8,tlw=m(o.font,tl).width*ts/100;
          s.append(el('rect',{class:'tag',x:tx,y:base-ts-1.5,width:tlw+8,height:ts+4,rx:2,fill:'#D9C3A0'}));
          s.append(el('text',{x:tx+4,y:base,'font-family':fam,'font-weight':w,'font-size':ts,fill:'#171513'},tl))}
      }document.body.append(s)});
    return tags;
  },pages);
  const all=[...tags,...otags];
  console.log(`${all.length} open tag(s)`+(all.length?':\n  '+all.join('\n  '):''));
  if(FINAL&&all.length){console.error('FINAL export refused: confirm or delete every ASSUMPTION / TO VERIFY line first.');await b.close();process.exit(1)}
  await p.pdf({path:path.join(TMP,'ov.pdf'),preferCSSPageSize:true,printBackground:true});
  await b.close();
  execFileSync('python3',[path.join(DIR,'merge.py'),orig,path.join(TMP,'new.pdf'),path.join(TMP,'ov.pdf'),out,ORDER.join(',')],{stdio:'inherit'});
})().catch(e=>{console.error(e);process.exit(1)});
