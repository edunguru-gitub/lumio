(function(){
var L=Lumio,G=L.Galaxy={},cv,cx,W=0,H=0,dpr=1,raf=0,run=false,hover=null,C={},PR=16,N=200,seed=7;
var cam=L.cam={x:0,y:0,z:1};
function rnd(){seed=seed*16807%2147483647;return seed/2147483647}
var dust=L.subjects.map(function(){var a=[];for(var k=0;k<N;k++)a.push({u:Math.sqrt(rnd()),a:k%3*2.094+(rnd()-.5)*.9,s:rnd()<.15?2.4:1.4,al:.25+rnd()*.5});return a});
var cl=function(v){return Math.max(0,Math.min(1,v))};
G.rad=function(s){return 120+90*L.sp(s)};
G.ppos=function(s,l){return{x:s.x+l.r*Math.cos(l.a),y:s.y+l.r*Math.sin(l.a)}};
G.homeZ=function(){return Math.min(W/1160,H/960)||1};
G.focus=function(st){
  var m=Math.min(W,H),s=L.subject();
  if(st.level==='home')return{x:0,y:0,z:G.homeZ()};
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
  cx.setTransform(dpr,0,0,dpr,0,0);cx.fillStyle=C.bg;cx.fillRect(0,0,W,H);
  var z=cam.z,f=cl((z/G.homeZ()-1)/1.2),rot=L.reduced()?0:performance.now()%120000/120000*6.2832,near=null,nd=1e9;
  L.subjects.forEach(function(s){var d=Math.hypot(cam.x-s.x,cam.y-s.y);if(d<nd){nd=d;near=s}});
  cx.translate(W/2,H/2);cx.scale(z,z);cx.translate(-cam.x,-cam.y);
  cx.textAlign='center';
  L.subjects.forEach(function(s,i){
    var rd=G.rad(s),a=s===near?1:1-.7*f;
    cx.fillStyle=s.color;
    dust[i].forEach(function(d){var an=d.a+d.u*2.6+rot,r=d.u*rd;cx.globalAlpha=d.al*a;cx.fillRect(s.x+r*Math.cos(an),s.y+r*Math.sin(an)*.85,d.s,d.s)});
    cx.globalAlpha=a;cx.beginPath();cx.arc(s.x,s.y,5,0,6.2832);cx.fill();
    s.lessons.forEach(function(l){
      var p=G.ppos(s,l),pr=PR*(.45+.55*f),k=L.getP(L.key(s,l)),hv=hover&&hover.sid===s.id&&hover.lid===l.id;
      cx.globalAlpha=a;cx.beginPath();cx.arc(p.x,p.y,pr,0,6.2832);cx.fillStyle=C.card;cx.fill();
      cx.lineWidth=(hv?3:1.5)/z;cx.strokeStyle=s.color;cx.stroke();
      if(k>=1){cx.beginPath();cx.arc(p.x,p.y,pr*.45,0,6.2832);cx.fillStyle=s.color;cx.fill()}
      if(f>0&&s===near){cx.globalAlpha=f;cx.fillStyle=C.ink;cx.font='500 '+13/z+'px '+C.ui;cx.fillText(L.n(l.name),p.x,p.y+pr+18/z)}
    });
    if(f<1){
      cx.globalAlpha=(1-f)*(s===near?1:a);cx.fillStyle=C.ink;cx.font='700 '+22/z+'px '+C.head;cx.fillText(L.n(s.name),s.x,s.y+rd+30/z);
      cx.fillStyle=C.muted;cx.font='400 '+12/z+'px '+C.mono;cx.fillText(Math.round(L.sp(s)*100)+'%',s.x,s.y+rd+50/z);
    }
  });
  cx.globalAlpha=1;
};
function tick(){raf=0;if(document.hidden)return;G.draw();if(run)G.requestDraw()}
G.requestDraw=function(){if(!raf)raf=requestAnimationFrame(tick)};
G.sync=function(){run=L.state.view==='galaxy'&&!document.hidden&&!L.reduced()&&L.state.level!=='planet';G.requestDraw()};
function resize(){
  var r=cv.parentNode.getBoundingClientRect();if(!r.width)return;
  dpr=window.devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;
  var t=G.focus(L.state);cam.x=t.x;cam.y=t.y;cam.z=t.z;G.requestDraw();
}
document.addEventListener('DOMContentLoaded',function(){
  cv=document.getElementById('cv');cx=cv.getContext('2d');
  var cs=getComputedStyle(document.documentElement),g=function(n){return cs.getPropertyValue(n).trim()};
  C={bg:g('--bg'),card:g('--card'),ink:g('--ink'),muted:g('--muted'),ui:g('--ui'),head:g('--head'),mono:g('--mono')};
  new ResizeObserver(resize).observe(cv.parentNode);
  document.addEventListener('visibilitychange',G.sync);
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',G.sync);
  L.on(function(s,kind){if(kind==='progress')G.requestDraw();else G.sync()});
  G.sync();
});
})();
