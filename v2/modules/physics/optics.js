(function(){
// manifest: shell builds subjects, planets, rows and cards from this (id = progress key part)
(window.LumioModules=window.LumioModules||{})['physics/optics']={manifest:{id:'optics',subject:'physics',subjectName:['Physics','Fizică'],color:'--physics',title:['Optics','Optică'],order:1,tags:['lab'],orbit:[-.6,62]},

  render:function(el,ctx){
    var h=document.createElement('h1'),p=document.createElement('p'),b=document.createElement('button');
    h.textContent=ctx.n(ctx.lesson.name);p.textContent=ctx.n(ctx.subject.name);
    b.type='button';b.className='btn-primary';b.style.setProperty('--c',ctx.color);
    b.textContent=ctx.n(ctx.S.cont)+' →';b.onclick=ctx.done;
    var q=document.createElement('div');q.className='quest';q.setAttribute('aria-live','polite');el.style.setProperty('--c',ctx.color);
    ctx.report({qt:1});q.textContent=ctx.n(Q[0]);
    el.append(h,p,demo(ctx,function(){if(q.classList.contains('done'))return;if(ctx.report({qd:1}))ctx.award(20);q.classList.add('done');q.textContent=ctx.n(Q[1])}),q,b);
  }
};
var Q=[['Quest: pull the spring past halfway and let go','Misiune: trage arcul peste jumătate și dă-i drumul'],['Quest complete','Misiune îndeplinită']];
function demo(ctx,win){
  var P=window.LumioPhysics,cv=document.createElement('canvas'),g=cv.getContext('2d'),W=1,H=1,drag=false,pull=0,
      cs=getComputedStyle(document.documentElement),col=function(n){return cs.getPropertyValue(n).trim();},
      par=ctx.lesson.physics||{e:.8,k:60,c:4},
      ball=new P.Ball({e:par.e,r:12}),pis=new P.Piston({k:par.k,c:par.c}),em=new P.Emitter({drag:3,life:.7}),
      rm=matchMedia('(prefers-reduced-motion: reduce)'),loop;
  cv.setAttribute('role','img');cv.setAttribute('aria-label','Bouncing ball and spring piston');
  cv.className='lab-cv';
  function reset(){ball.x=W*.3;ball.y=24;ball.vx=60;ball.vy=0;}
  function size(){var d=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);
    ball.w=W*.6;ball.h=H;pis.len=W*.3;if(!ball.x)reset();loop&&loop.redraw();}
  function step(dt){ball.step(dt);pis.F=drag?pis.k*pull:0;var v0=pis.v;pis.step(dt);
    if(!drag&&pis.v<-30&&v0>=-30){em.emit(W*.67,H/2,6,-pis.v*1.5,Math.PI,.8);}
    em.step(dt);}
  function draw(){
    g.clearRect(0,0,W,H);g.strokeStyle=col('--line');g.lineWidth=1;g.beginPath();g.moveTo(ball.w,0);g.lineTo(ball.w,H);g.stroke();
    g.fillStyle=col('--ink');g.beginPath();g.arc(ball.x,ball.y,ball.r,0,7);g.fill();
    var by=H/2,x0=W*.67,hd=W*.67+W*.3-pis.x;
    g.strokeStyle=ctx.color;g.lineWidth=2;g.strokeRect(x0,by-18,W*.3,36);
    g.beginPath();g.moveTo(x0,by);for(var i=1;i<=8;i++)g.lineTo(x0+(hd-x0)*i/8,by+(i%2?-10:10));g.lineTo(hd,by);g.stroke();
    g.fillStyle=ctx.color;g.fillRect(hd,by-16,6,32);
    g.fillStyle=col('--muted');em.p.forEach(function(q){g.globalAlpha=q.t/em.life;g.fillRect(q.x,q.y,2,2);});g.globalAlpha=1;}
  function pt(e){var r=cv.getBoundingClientRect();return e.clientX-r.left;}
  cv.onpointerdown=function(e){if(pt(e)<ball.w){reset();loop.redraw();return;}drag=true;cv.setPointerCapture(e.pointerId);cv.onpointermove(e);};
  cv.onpointermove=function(e){if(!drag)return;pull=Math.min(pis.len,Math.max(0,W*.97-pt(e)));if(rm.matches){pis.x=pull;loop.redraw();}};
  cv.onpointerup=cv.onpointercancel=function(){if(drag&&pull>pis.len*.5)win();drag=false;if(rm.matches){pis.x=0;loop.redraw();}};
  loop=P.Loop(step,draw);
  new ResizeObserver(size).observe(cv);
  var mo=new MutationObserver(function(){if(!cv.isConnected){loop.destroy();mo.disconnect();}});
  requestAnimationFrame(function(){size();loop.start();mo.observe(document.body,{childList:true,subtree:true});});
  cv._p={ball:ball,pis:pis,loop:loop};
  return cv;
}
})();
