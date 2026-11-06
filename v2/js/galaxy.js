(function(){
var L=Lumio,G=L.Galaxy={},cv,cx,W=0,H=0,dpr=1,raf=0,run=false,hover=null,C={},PR=13,N=650,seed=7,TL=-.26;
var cam=L.cam={x:0,y:0,z:1};
function rnd(){seed=seed*16807%2147483647;return seed/2147483647}
var dust=[],sky=[];
// spiral dust (y-squash .5, tilt TL) + glowing ink core; z keeps specks/core a fixed screen size
function spiral(c,x,y,i,rd,rot,a,z,cs,col,tl){
  tl=tl==null?TL:tl;var TC=Math.cos(tl),TS=Math.sin(tl);c.fillStyle=col;
  dust[i].forEach(function(d){var an=d.a+d.u*2.6+rot,r=d.u*rd,u=r*Math.cos(an),v=r*Math.sin(an)*.5;c.globalAlpha=d.al*a;c.beginPath();c.arc(x+u*TC-v*TS,y+u*TS+v*TC,d.s/Math.sqrt(z),0,6.2832);c.fill()});
  c.globalAlpha=a;c.fillStyle=C.ink;c.shadowColor=C.glow;c.shadowBlur=14;c.beginPath();c.ellipse(x,y,cs/z,cs/2/z,tl,0,6.2832);c.fill();c.shadowBlur=0;
}
function spark(c,x,y,r,on){c.beginPath();for(var j=0;j<8;j++){var q=j*.7854,rr=j%2?r*.35:r;c.lineTo(x+rr*Math.sin(q),y-rr*Math.cos(q))}c.closePath();on?c.fill():c.stroke()}
G.mini=function(el,s){
  var d=window.devicePixelRatio||1,c=el.getContext('2d'),i=L.subjects.indexOf(s),rd=G.rad(s),k=50/rd;el.width=el.height=110*d;
  c.setTransform(d*k,0,0,d*k,55*d,55*d);spiral(c,0,0,i,rd,0,1,k,8,s.color,s.tl);c.globalAlpha=1;
};
var cl=function(v){return Math.max(0,Math.min(1,v))};
G.rad=function(s){return(120+90*L.sp(s))*(s.k||1)};
G.ppos=function(s,l){return{x:s.x+l.r*Math.cos(l.a),y:s.y+l.r*Math.sin(l.a)}};
// home framing: fit every galaxy (max size) + its label (screen px) inside the canvas with margins; cached per size+lang
var hc={};
G.home=function(){
  if(!W||!H||!L.subjects.length)return{x:0,y:0,z:1};var key=W+'x'+H+document.documentElement.lang;if(hc.k===key)return hc;
  var z=1,b,mx=48,my=56;
  for(var it=0;it<5;it++){
    b=[1e9,1e9,-1e9,-1e9];
    L.subjects.forEach(function(s){
      var R=210*(s.k||1);cx.font='400 22px '+C.head;var lw=cx.measureText(L.n(s.name)).width/2/z;
      b[0]=Math.min(b[0],s.x-Math.max(R,lw));b[2]=Math.max(b[2],s.x+Math.max(R,lw));b[1]=Math.min(b[1],s.y-R*.6);b[3]=Math.max(b[3],s.y+R*.6+62/z);
    });
    z=Math.min((W-2*mx)/(b[2]-b[0]),(H-2*my)/(b[3]-b[1]))||1;
  }
  return hc={k:key,x:(b[0]+b[2])/2,y:(b[1]+b[3])/2,z:z};
};
G.homeZ=function(){return G.home().z};
G.focus=function(st){
  if(cv&&cv.parentNode.clientWidth!==W)resize(); // stage just shown (tab switch): size before framing
  var m=Math.min(W,H),s=L.subject();
  if(st.level==='home'){var h=G.home();return{x:h.x,y:h.y,z:h.z}}
  if(st.level==='galaxy')return{x:s.x,y:s.y,z:m*.4/G.rad(s)};
  var p=G.ppos(s,L.lesson());return{x:p.x,y:p.y,z:m*.2/PR};
};
G.hit=function(sx,sy,near){
  var wx=cam.x+(sx-W/2)/cam.z,wy=cam.y+(sy-H/2)/cam.z,best=null,bd=1e9,lv=L.state.level;
  if(lv==='home')L.subjects.forEach(function(s){var d=Math.hypot(wx-s.x,wy-s.y)-(near?0:G.rad(s));if(d<bd&&(near||d<0)){bd=d;best={sid:s.id}}});
  else if(lv==='galaxy'){var s=L.subject();s.lessons.forEach(function(l){var p=G.ppos(s,l),d=Math.hypot(wx-p.x,wy-p.y)-(near?0:PR+6/cam.z);if(d<bd&&(near||d<0)){bd=d;best={sid:s.id,lid:l.id}}})}
  return best;
};
G.setHover=function(h){var k=h&&h.sid+'/'+h.lid,o=hover;hover=h;if(o!==h&&(o&&o.sid+'/'+o.lid)!==k)G.requestDraw()};
G.draw=function(){
  if(!cx||!W)return;
  cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);cx.fillStyle=C.sky;var ds=C.skyA>1?1.5:1;sky.forEach(function(p){cx.globalAlpha=Math.min(.6,p.al*C.skyA);cx.fillRect(p.x*W,p.y*H,ds,ds)});
  var z=cam.z,f=cl((z/G.homeZ()-1)/1.2),rot=L.reduced()?0:performance.now()%240000/240000*6.2832,near=null,nd=1e9;
  L.subjects.forEach(function(s){var d=Math.hypot(cam.x-s.x,cam.y-s.y);if(d<nd){nd=d;near=s}});
  cx.translate(W/2,H/2);cx.scale(z,z);cx.translate(-cam.x,-cam.y);
  cx.textBaseline='middle';
  L.subjects.forEach(function(s,i){
    var rd=G.rad(s),a=s===near?1:1-.7*f,cur=L.cur(s);
    spiral(cx,s.x,s.y,i,rd,rot,a,z,14,s.color,s.tl);
    s.lessons.forEach(function(l){
      var p=G.ppos(s,l),pr=PR*(.45+.55*f),k=L.getP(L.key(s,l)),hv=hover&&hover.sid===s.id&&hover.lid===l.id,lk=!l.mod,now=l===cur,ia=a*(lk?.35:1),lx=p.x+pr+10/z;
      cx.globalAlpha=ia;cx.fillStyle=cx.strokeStyle=s.color;cx.lineWidth=1.5/z;cx.beginPath();cx.arc(p.x,p.y,pr,0,6.2832);lk||now?cx.stroke():cx.fill();
      if(now||hv){cx.globalAlpha=ia*(hv?.8:.35);cx.beginPath();cx.arc(p.x,p.y,pr*20/13,0,6.2832);cx.stroke()}
      if(f>0&&s===near){
        cx.globalAlpha=f*(lk?.35:1);cx.textAlign='left';cx.fillStyle=C.ink;cx.font='500 '+17/z+'px '+C.ui;cx.fillText(L.n(l.name),lx,p.y-2/z);
        if(!lk){cx.fillStyle=cx.strokeStyle=C.tan;cx.lineWidth=1/z;for(var j=0;j<3;j++)spark(cx,lx+4.5/z+j*12/z,p.y+16/z,4.5/z,j<Math.min(3,Math.round(k*3)))}
      }
    });
    if(f<1){
      cx.textAlign='center';cx.globalAlpha=(1-f)*(s===near?1:a);cx.fillStyle=C.ink;cx.font='400 '+22/z+'px '+C.head;cx.fillText(L.n(s.name),s.x,s.y+rd*.6+30/z);
      cx.fillStyle=C.muted;cx.font='400 '+12/z+'px '+C.ui;cx.fillText(L.count(s),s.x,s.y+rd*.6+52/z);
    }
  });
  cx.globalAlpha=1;
};
function tick(){raf=0;if(document.hidden)return;G.draw();if(run)G.requestDraw()}
G.requestDraw=function(){if(!raf)raf=requestAnimationFrame(tick)};
G.sync=function(){run=L.gal()&&!document.hidden&&!L.reduced()&&L.state.level!=='planet';G.requestDraw()};
function resize(){
  var r=cv.parentNode.getBoundingClientRect();if(!r.width)return;
  dpr=window.devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;
  var t=G.focus(L.state);cam.x=t.x;cam.y=t.y;cam.z=t.z;G.requestDraw();
}
L.boot(function(){
  // dust per subject (built from manifests), then sky: same seed order as before
  dust=L.subjects.map(function(){var a=[];for(var k=0;k<N;k++)a.push({u:Math.sqrt(rnd()),a:k%3*2.094+(rnd()-.5)*.9,s:.6+rnd()*.7,al:.15+rnd()*.55});return a});
  for(var k=0;k<120;k++)sky.push({x:rnd(),y:rnd(),al:.15+rnd()*.35});
  cv=document.getElementById('cv');cx=cv.getContext('2d');
  // canvas colours from tokens; re-read on theme change ('skin')
  var read=function(){var cs=getComputedStyle(document.documentElement),g=function(n){return cs.getPropertyValue(n).trim()};
    C={ink:g('--ink'),muted:g('--muted'),tan:g('--tan'),ui:g('--ui'),head:g('--head'),mono:g('--mono'),sky:g('--sky'),skyA:+g('--sky-a')||1,glow:g('--core-glow')}};
  read();
  new ResizeObserver(resize).observe(cv.parentNode);
  if(document.fonts)document.fonts.ready.then(function(){hc={};resize()});
  document.addEventListener('visibilitychange',G.sync);
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',G.sync);
  L.on(function(s,kind){if(kind==='stats')return;if(kind==='skin'){read();hc={}}if(kind==='progress'||kind==='skin')G.requestDraw();else G.sync()});
  G.sync();
});
})();
