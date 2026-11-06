(function(){
var DT=1/120;
// semi-implicit Euler spring-damper: returns [x,v]
function spring(x,v,t,k,c,m,dt){v+=((-k*(x-t)-c*v)/m)*dt;return[x+v*dt,v];}
function Ball(o){o=o||{};this.x=o.x||0;this.y=o.y||0;this.vx=o.vx||0;this.vy=o.vy||0;this.r=o.r||10;this.g=o.g==null?900:o.g;this.e=o.e==null?.8:o.e;this.w=o.w||200;this.h=o.h||200;}
Ball.prototype.step=function(dt){
  this.vy+=this.g*dt;this.x+=this.vx*dt;this.y+=this.vy*dt;
  if(this.y+this.r>this.h){this.y=this.h-this.r;this.vy=-this.vy*this.e;if(Math.abs(this.vy)<this.g*dt*2)this.vy=0;this.vx*=.999;}
  if(this.y-this.r<0){this.y=this.r;this.vy=-this.vy*this.e;}
  if(this.x-this.r<0){this.x=this.r;this.vx=-this.vx*this.e;}
  if(this.x+this.r>this.w){this.x=this.w-this.r;this.vx=-this.vx*this.e;}
};
// plunger travel x in [0,len]; rest at 0; F pushes it in; k spring, c damping, m mass
function Piston(o){o=o||{};this.len=o.len||80;this.k=o.k||60;this.c=o.c||4;this.m=o.m||1;this.x=0;this.v=0;this.F=0;}
Piston.prototype.step=function(dt){
  this.v+=((this.F-this.k*this.x-this.c*this.v)/this.m)*dt;this.x+=this.v*dt;
  if(this.x<0){this.x=0;this.v=Math.max(0,this.v);}
  if(this.x>this.len){this.x=this.len;this.v=Math.min(0,this.v);}
};
function Emitter(o){o=o||{};this.drag=o.drag||2;this.life=o.life||.8;this.g=o.g||0;this.p=[];}
Emitter.prototype.emit=function(x,y,n,speed,ang,spread){
  for(var i=0;i<n;i++){var a=ang+(Math.random()-.5)*spread,s=speed*(.5+Math.random()*.5);
    this.p.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t:this.life});}
};
Emitter.prototype.step=function(dt){
  var d=Math.exp(-this.drag*dt),i=this.p.length,q;
  while(i--){q=this.p[i];q.t-=dt;if(q.t<=0){this.p.splice(i,1);continue;}
    q.vx*=d;q.vy=q.vy*d+this.g*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;}
};
// fixed-step loop; no rAF while hidden or when reduced motion (one static frame)
function Loop(step,draw){
  var raf=0,last=0,acc=0,rm=matchMedia('(prefers-reduced-motion: reduce)'),self={};
  function frame(t){raf=requestAnimationFrame(frame);acc+=Math.min((t-last)/1000,.1);last=t;
    while(acc>=DT){step(DT);acc-=DT;}draw();}
  self.start=function(){if(raf||document.hidden)return;if(rm.matches){draw();return;}last=performance.now();acc=0;raf=requestAnimationFrame(frame);};
  self.stop=function(){cancelAnimationFrame(raf);raf=0;};
  self.redraw=draw;
  function vis(){document.hidden?self.stop():self.start();}
  function rmc(){self.stop();self.start();}
  document.addEventListener('visibilitychange',vis);rm.addEventListener('change',rmc);
  self.destroy=function(){self.stop();document.removeEventListener('visibilitychange',vis);rm.removeEventListener('change',rmc);};
  return self;
}
window.LumioPhysics={DT:DT,spring:spring,Ball:Ball,Piston:Piston,Emitter:Emitter,Loop:Loop};
})();
