(function(){
// feature 'ink' (parity P2): v1 handwriting pad (class Ink) + offline digit recogniser (REC), ported from app/lumio.html.
// LumioInk.mount(ctx,input) -> {el,conf,clear}: pad + tools + Write/Type toggle; recognised text goes into input. Absent = typing only.
var L=Lumio,pads=new Set(),
S={write:['Write','Scrie'],type:['Type','Tastează'],mode:['Answer by','Răspunde prin'],here:['Write your answer by hand…','Scrie răspunsul de mână…'],pad:['Handwriting pad','Zonă de scris de mână'],
 pen:['Pen','Creion'],eraser:['Eraser','Radieră'],undo:['Undo','Anulează'],clear:['Clear','Șterge'],size:['size','grosime'],strokes:['strokes','trăsături'],conf:['Read confidence','Încredere la citire'],
 auto:['Auto colour','Culoare auto'],red:['Red','Roșu'],green:['Green','Verde'],tan:['Tan','Bej']};
function tok(k){return getComputedStyle(document.documentElement).getPropertyValue(k).trim()}
/* recognizer (v1 REC, verbatim; 'Patrick Hand' not shipped in v2, falls back silently) */
const REC={tpl:null,N:16,tmp:null,
build(){const fonts=['Arial','"Comic Sans MS"','Georgia','"Courier New"','"Patrick Hand"','"Segoe Print"','Verdana','"Trebuchet MS"'],T=[];
for(let d=0;d<=9;d++)for(const f of fonts)for(const wt of['400','700']){const cv=document.createElement('canvas');cv.width=100;cv.height=130;const c=cv.getContext('2d');c.font=`${wt} 96px ${f}`;c.textBaseline='alphabetic';c.fillStyle='#000';c.fillText(String(d),12,104);const g=this.grid(cv);if(g)T.push({ch:String(d),g})}
const cv=document.createElement('canvas');cv.width=40;cv.height=130;const c=cv.getContext('2d');c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(20,10);c.lineTo(20,120);c.stroke();const g=this.grid(cv);T.push({ch:'1',g});
const cv2=document.createElement('canvas');cv2.width=60;cv2.height=130;const c2=cv2.getContext('2d');c2.lineWidth=9;c2.lineCap='round';c2.beginPath();c2.moveTo(40,10);c2.lineTo(30,120);c2.stroke();T.push({ch:'1',g:this.grid(cv2)});this.tpl=T},
bbox(cv){const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data,W=cv.width,H=cv.height;let x0=W,y0=H,x1=-1,y1=-1;for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]>60){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}return x1<0?null:[x0,y0,x1-x0+1,y1-y0+1]},
grid(src,box){box=box||this.bbox(src);if(!box)return null;const N=this.N;this.tmp=this.tmp||document.createElement('canvas');this.tmp.width=this.tmp.height=N;const c=this.tmp.getContext('2d',{willReadFrequently:true});c.clearRect(0,0,N,N);c.imageSmoothingQuality='high';
const k=Math.min(12/box[2],12/box[3]),dw=box[2]*k,dh=box[3]*k;c.drawImage(src,box[0],box[1],box[2],box[3],(N-dw)/2,(N-dh)/2,dw,dh);const d=c.getImageData(0,0,N,N).data,a=new Float32Array(N*N);for(let i=0;i<N*N;i++)a[i]=d[i*4+3]/255;
const b=new Float32Array(N*N);for(let y=0;y<N;y++)for(let x=0;x<N;x++){let s=0,n=0;for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const xx=x+i,yy=y+j;if(xx>=0&&yy>=0&&xx<N&&yy<N){s+=a[yy*N+xx];n++}}b[y*N+x]=s/n}
let m=0;for(let i=0;i<b.length;i++)m+=b[i]*b[i];m=Math.sqrt(m)||1;for(let i=0;i<b.length;i++)b[i]/=m;return b},
run(cv){if(!this.tpl)this.build();const W=cv.width,H=cv.height,d=cv.getContext('2d').getImageData(0,0,W,H).data,col=new Int32Array(W);let ymin=H,ymax=0;
for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(d[(y*W+x)*4+3]>60){col[x]++;if(y<ymin)ymin=y;if(y>ymax)ymax=y}
const inkH=ymax-ymin+1;if(ymax<ymin)return{text:'',conf:0};const gap=Math.max(6,inkH*.14),gs=[];let x=0;
while(x<W){if(col[x]>0){let s=x,e=x;while(x<W){if(col[x]>0)e=x;else if(x-e>gap)break;x++}gs.push([s,e])}else x++}
const items=gs.map(([s,e])=>{let y0=H,y1=0;for(let y=0;y<H;y++)for(let xx=s;xx<=e;xx++)if(d[(y*W+xx)*4+3]>60){if(y<y0)y0=y;if(y>y1)y1=y;break}return{b:[s,y0,e-s+1,y1-y0+1]}});
const digH=Math.max(...items.filter(i=>i.b[2]<i.b[3]*2).map(i=>i.b[3]),0);let out='',cs=[];
for(const it of items){const[bx,by,bw,bh]=it.b;if(bw>bh*2.2&&bh<(digH||bw)*.6||(!digH&&bw>bh*1.8)){out+='-';cs.push(.9);continue}
if(digH&&bh<digH*.25&&bw<digH*.3){out+='.';cs.push(.8);continue}
const g=this.grid(cv,it.b);if(!g)continue;let best=-1,ch='?';for(const tp of this.tpl){let s=0;for(let i=0;i<g.length;i++)s+=g[i]*tp.g[i];if(s>best){best=s;ch=tp.ch}}out+=ch;cs.push(best)}
return{text:out,conf:cs.length?cs.reduce((a,b)=>a+b)/cs.length:0}}};
/* pad (v1 class Ink; colours are token names resolved at draw time, so strokes recolour on theme change) */
class Ink{
constructor(wrap,o={}){this.wrap=wrap;this.cv=document.createElement('canvas');wrap.appendChild(this.cv);this.ctx=this.cv.getContext('2d',{willReadFrequently:true});this.strokes=[];this.cur=null;this.tool='pen';this.w=o.w||6;this.color=null;this.on=o.onChange||(()=>{});this.dpr=1;this.cm={};
const c=this.cv;c.addEventListener('pointerdown',e=>this.down(e));c.addEventListener('pointermove',e=>this.move(e));['pointerup','pointercancel'].forEach(n=>c.addEventListener(n,e=>this.up(e)));c.addEventListener('contextmenu',e=>e.preventDefault());
this.ro=new ResizeObserver(()=>this.resize());this.ro.observe(wrap);this.resize()}
resize(){const r=this.wrap.getBoundingClientRect();if(!r.width)return;const d=devicePixelRatio||1,w=Math.round(r.width*d),h=Math.round(r.height*d);if(this.cv.width===w&&this.cv.height===h)return;this.cv.width=w;this.cv.height=h;this.dpr=d;this.redraw()}
pt(e){const r=this.cv.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top,p:e.pressure>0?e.pressure:.5}}
down(e){e.preventDefault();this.cv.setPointerCapture(e.pointerId);this.cm={};this.cur={tool:this.tool,w:this.w,color:this.color,pts:[this.pt(e)]};this.strokes.push(this.cur);this.dot(this.cur);this.on('start')}
move(e){if(!this.cur)return;e.preventDefault();const s=this.cur,evs=(e.getCoalescedEvents&&e.getCoalescedEvents())||[];for(const ev of(evs.length?evs:[e])){const p=this.pt(ev),l=s.pts[s.pts.length-1];if(Math.hypot(p.x-l.x,p.y-l.y)<1.2)continue;s.pts.push(p);if(s.pts.length>=3)this.seg(s,s.pts.length-1)}}
up(){if(!this.cur)return;this.tail(this.cur);this.cur=null;this.on('end')}
style(s){const c=this.ctx,er=s.tool==='eraser',k=s.color||'--ink';c.globalCompositeOperation=er?'destination-out':'source-over';c.strokeStyle=c.fillStyle=er?'#000':(this.cm[k]||(this.cm[k]=tok(k)));c.lineCap=c.lineJoin='round'}
wd(s,p){return s.tool==='eraser'?s.w*4:s.w*(.6+p.p*.8)}
mid(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}}
dot(s){const c=this.ctx,p=s.pts[0];c.save();c.scale(this.dpr,this.dpr);this.style(s);c.beginPath();c.arc(p.x,p.y,this.wd(s,p)/2,0,7);c.fill();c.restore()}
seg(s,i){const c=this.ctx,p=s.pts,a=i===2?p[0]:this.mid(p[i-2],p[i-1]),b=this.mid(p[i-1],p[i]);c.save();c.scale(this.dpr,this.dpr);this.style(s);c.lineWidth=this.wd(s,p[i-1]);c.beginPath();c.moveTo(a.x,a.y);c.quadraticCurveTo(p[i-1].x,p[i-1].y,b.x,b.y);c.stroke();c.restore()}
tail(s){const p=s.pts,n=p.length;if(n<2)return;const a=n===2?p[0]:this.mid(p[n-2],p[n-1]),c=this.ctx;c.save();c.scale(this.dpr,this.dpr);this.style(s);c.lineWidth=this.wd(s,p[n-1]);c.beginPath();c.moveTo(a.x,a.y);c.lineTo(p[n-1].x,p[n-1].y);c.stroke();c.restore()}
redraw(){this.cm={};this.ctx.clearRect(0,0,this.cv.width,this.cv.height);for(const s of this.strokes){const n=s.pts.length;if(!n)continue;if(n===1){this.dot(s);continue}for(let i=2;i<n;i++)this.seg(s,i);this.tail(s)}}
undo(){this.strokes.pop();this.redraw();this.on('end')}clear(){this.strokes=[];this.redraw();this.on('clear')}
setTool(t){this.tool=t}}
// theme change: recolour 'auto' strokes on every live pad
L.on(function(s,kind){if(kind==='skin')pads.forEach(function(p){if(p.wrap.isConnected)p.redraw();else pads.delete(p)})});
function mount(ctx,inp){
  var U=ctx.ui,t=function(k){return ctx.n(S[k])},el=U.el('div',null,'ink'),io=U.el('div',null,'ink-io'),pad=U.el('div',null,'ink-pad'),hint=U.el('span',t('here'),'ink-hint'),
      tools=U.el('div',null,'ink-tools'),stat=U.el('span',null,'ink-stat'),conf=U.el('small',null,'ink-conf'),tm=0,ink;
  function btn(txt,cls,on){var b=U.el('button',txt,cls);b.type='button';b.onclick=on;return b}
  function press(list,b){list.forEach(function(x){x.setAttribute('aria-pressed',x===b)})}
  function st(){stat.textContent=t(ink.tool)+' · '+t('size')+' '+(ink.w<=3?'S':ink.w>=10?'L':'M')+' · '+ink.strokes.length+' '+t('strokes')}
  // v1 runRec: recognised text into the answer field, confidence next to it (650 ms after pen-up)
  function read(){if(!el.isConnected)return;var r=REC.run(ink.cv);inp.value=r.text;conf.textContent=r.text?Math.round(r.conf*100)+'%':''}
  pad.appendChild(hint);
  ink=new Ink(pad,{w:6,onChange:function(e){hint.hidden=ink.strokes.length>0;st();clearTimeout(tm);if(e==='clear'){inp.value='';conf.textContent='';return}if(e==='end')tm=setTimeout(read,650)}});
  ink.cv.setAttribute('aria-label',t('pad'));pads.add(ink);
  var pen=btn(t('pen'),'chip',function(){ink.setTool('pen');press(tb,pen);st()}),er=btn(t('eraser'),'chip',function(){ink.setTool('eraser');press(tb,er);st()}),tb=[pen,er];press(tb,pen);
  // 4 swatches: auto (ink, flips with theme) + bad / good / tan (v1 amber -> tan: orange is reserved for Lumens)
  var cw=U.el('span',null,'ink-sw'),cb=[[null,'auto'],['--bad','red'],['--good','green'],['--tan','tan']].map(function(c){var b=btn('','',function(){ink.color=c[0];press(cb,b);pen.onclick()});
    b.setAttribute('aria-label',t(c[1]));b.appendChild(U.el('i')).style.setProperty('--sw','var('+(c[0]||'--ink')+')');return b});
  var sw=U.el('span',null,'ink-sw ink-sz'),sb=[3,6,10].map(function(w,i){var b=btn('','',function(){ink.w=w;press(sb,b);st()});
    b.setAttribute('aria-label',t('size')+' '+'SML'[i]);b.appendChild(U.el('i')).style.setProperty('--d',(8+i*5)+'px');return b});
  press(cb,cb[0]);press(sb,sb[1]);cw.append.apply(cw,cb);sw.append.apply(sw,sb);
  tools.append(pen,er,btn(t('undo'),'chip',function(){ink.undo()}),btn(t('clear'),'chip',function(){ink.clear()}),cw,sw,stat);
  // Write / Type (v1 iotog), saved in lumio2_io; typing works in both modes
  var iob=['ink','type'].map(function(m){return btn(t(m==='ink'?'write':'type'),'',function(){set(m)})});
  function set(m){L.pref('lumio2_io',m);pad.hidden=tools.hidden=m==='type';iob.forEach(function(b,i){b.setAttribute('aria-pressed',(i===1)===(m==='type'))});L.seg(io)}
  io.setAttribute('role','group');io.setAttribute('aria-label',t('mode'));io.append.apply(io,iob);
  conf.title=t('conf');el.append(io,pad,tools);set(L.pref('lumio2_io')==='type'?'type':'ink');st();
  return{el:el,conf:conf,clear:function(){clearTimeout(tm);ink.clear()}};
}
window.LumioInk={REC:REC,Ink:Ink,mount:mount};
(window.LumioFeatures=window.LumioFeatures||{}).ink=window.LumioInk;
})();
