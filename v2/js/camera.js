(function(){
var L=Lumio,K=L.Camera={},cv,anim=0,fade=0,lastW=0,lastA=0,HK='lumio2_hint';
function set(t){var c=L.cam;c.x=t.x;c.y=t.y;c.z=t.z;L.Galaxy.requestDraw()}
K.go=function(){
  var t=L.Galaxy.focus(L.state);cancelAnimationFrame(anim);clearTimeout(fade);
  if(L.reduced()){cv.style.opacity=0;fade=setTimeout(function(){set(t);cv.style.opacity=1},260);return}
  cv.style.opacity=1;
  var c=L.cam,f={x:c.x,y:c.y,z:c.z},t0=performance.now();
  (function step(now){
    var p=Math.min(1,(now-t0)/800),e=1-Math.pow(1-p,3);
    c.x=f.x+(t.x-f.x)*e;c.y=f.y+(t.y-f.y)*e;c.z=f.z*Math.pow(t.z/f.z,e);
    L.Galaxy.requestDraw();if(p<1)anim=requestAnimationFrame(step);
  })(t0);
};
function hintOff(){var h=document.getElementById('hint');h.classList.remove('on');try{localStorage.setItem(HK,'1')}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){
  cv=document.getElementById('cv');
  var G=L.Galaxy,main=document.getElementById('main'),pos=function(e){var r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
  var into=function(h){if(h)L.into(h.sid,h.lid)};
  cv.addEventListener('click',function(e){var p=pos(e);into(G.hit(p[0],p[1]))});
  cv.addEventListener('mousemove',function(e){var p=pos(e),h=G.hit(p[0],p[1]);G.setHover(h&&h.lid?h:null);cv.style.cursor=h?'pointer':'default'});
  main.addEventListener('contextmenu',function(e){if(L.state.view!=='galaxy')return;e.preventDefault();L.out()});
  main.addEventListener('wheel',function(e){
    var le=document.getElementById('lesson');if(L.state.view!=='galaxy'||le.contains(e.target)&&le.scrollHeight>le.clientHeight)return;
    e.preventDefault();
    var now=performance.now(),ok=now-lastW>150&&now-lastA>800;lastW=now;
    if(!ok||!e.deltaY)return;lastA=now;
    if(e.deltaY>0)L.out();else{var p=pos(e);into(G.hit(p[0],p[1])||G.hit(p[0],p[1],true))}
  },{passive:false});
  L.on(function(s,kind){
    if(kind==='nav'||kind==='view'){
      if(s.view==='galaxy'&&(kind==='nav'))K.go();else{cancelAnimationFrame(anim);clearTimeout(fade);cv.style.opacity=1;var t=G.focus(s);set(t)}
      if(kind==='nav')hintOff();
    }
  });
  var seen=false;try{seen=localStorage.getItem(HK)}catch(e){}
  if(!seen&&L.state.view==='galaxy'){var h=document.getElementById('hint');h.textContent=L.n(L.S.hint);h.classList.add('on')}
});
})();
