(function(){
// feature 'sfx': v1 sounds (AU), confetti (CF), jump/shake, read aloud (TTS, Australian English preferred). Reduce motion: no confetti/jump/shake.
var L=Lumio,rm=matchMedia('(prefers-reduced-motion: reduce)'),ac=null,VOL=.6,syn=window.speechSynthesis,vs=[],cf=null,ps=[];
function get(){if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(ac&&ac.state==='suspended')ac.resume();return ac}
function tone(f,t0,d,type,g,f2){var c=get();if(!c)return;g=g==null?.25:g;var o=c.createOscillator(),n=c.createGain(),T0=c.currentTime+t0;o.type=type||'sine';o.frequency.setValueAtTime(f,T0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,T0+d);
  n.gain.setValueAtTime(.0001,T0);n.gain.exponentialRampToValueAtTime(Math.max(.0002,g*VOL),T0+.02);n.gain.exponentialRampToValueAtTime(.0001,T0+d);o.connect(n);n.connect(c.destination);o.start(T0);o.stop(T0+d+.05)}
function loop(){var c=cf.getContext('2d'),H=innerHeight;c.clearRect(0,0,cf.width,cf.height);ps=ps.filter(function(p){return p.life-->0&&p.y<H+30});
  ps.forEach(function(p){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;c.save();c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.globalAlpha=Math.min(1,p.life/40);
    if(p.sh===0)c.fillRect(-p.w/2,-p.h/2,p.w,p.h);else{c.beginPath();if(p.sh===1)c.arc(0,0,p.w/2,0,7);else{c.moveTo(0,-p.h/2);c.lineTo(p.w/2,p.h/2);c.lineTo(-p.w/2,p.h/2)}c.fill()}c.restore()});
  if(ps.length)requestAnimationFrame(loop);else c.clearRect(0,0,cf.width,cf.height)}
function anim(el,cls){if(!el||rm.matches)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(function(){el.classList.remove(cls)},600)}
// v1 bestVoice: en-AU (natural/online/neural first), then Google UK Female, Google US, en-GB, any en; ro: natural/online/google first
function load(){vs=syn.getVoices()||[]}
function vl(v){return v.lang.replace('_','-').toLowerCase()}
function nat(a,re){return a.filter(function(v){return re.test(v.name)})[0]||a[0]||null}
function best(ro){
  if(ro)return nat(vs.filter(function(v){return vl(v).indexOf('ro')===0}),/natural|online|google/i);
  var f=function(fn){return vs.filter(fn)[0]};
  return nat(vs.filter(function(v){return vl(v)==='en-au'}),/natural|online|neural/i)||f(function(v){return/Google UK English Female/i.test(v.name)})||f(function(v){return/Google US English/i.test(v.name)})||f(function(v){return vl(v)==='en-gb'})||f(function(v){return vl(v).indexOf('en')===0})||null;
}
if(syn){load();syn.addEventListener('voiceschanged',load)}
var F=L.fx={canSay:!!syn,
  ok:function(){[523,659,784,1047].forEach(function(f,i){tone(f,i*.08,.2,'triangle')})},
  bad:function(){tone(220,0,.25,'sawtooth',.18,110);tone(165,.2,.35,'sawtooth',.18,70)},
  streak:function(){[523,659,784,1047,1319,1568,2093].forEach(function(f,i){tone(f,i*.07,.25,'square',.1)});tone(1047,.55,.5,'triangle',.2)},
  pop:function(){tone(300,0,.12,'sine',.2,700)},
  tick:function(){tone(1600,0,.03,'sine',.05)}, // slider detent
  jump:function(el){anim(el,'jump')},shake:function(el){anim(el,'shake')},
  // confetti in subject + tan + ink tokens (no Lumens orange / Moon purple)
  burst:function(n){if(rm.matches)return;n=n||140;
    if(!cf){cf=document.createElement('canvas');cf.id='confetti';cf.setAttribute('aria-hidden','true');document.body.appendChild(cf)}
    cf.width=innerWidth;cf.height=innerHeight;var cs=getComputedStyle(document.documentElement),cols=['--physics','--math','--spanish','--life','--tan','--ink'].map(function(v){return cs.getPropertyValue(v).trim()}),run=ps.length;
    for(var i=0;i<n;i++)ps.push({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*16,vy:-Math.random()*14-4,w:6+Math.random()*7,h:8+Math.random()*8,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%6],life:110+Math.random()*60,sh:i%3});
    if(!run)requestAnimationFrame(loop)},
  say:function(text){if(!syn||!text)return;syn.cancel();var ro=document.documentElement.lang==='ro',u=new SpeechSynthesisUtterance(text),v=best(ro);
    u.lang=v?v.lang.replace('_','-'):ro?'ro-RO':'en-AU';if(v)u.voice=v;u.rate=1;u.pitch=1.1;syn.speak(u)}
};
(window.LumioFeatures=window.LumioFeatures||{}).sfx=F;
L.on(function(s,kind){if(kind==='nav'&&syn)syn.cancel()});
})();
