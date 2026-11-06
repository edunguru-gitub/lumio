(function(){
// ported from app/lumio.html physics lab: PH, newPart, phStep, updPhys, drawPhys
var S={cv:['Gas in a cylinder with a piston, a pressure gauge and a thermometer.','Gaz într-un cilindru cu piston, manometru și termometru.'],
 cool:['Cool down','Răcește'],heat:['Heat up','Încălzește'],sq:['Squeeze','Comprimă'],rel:['Release','Eliberează'],reset:['Reset','Reset'],
 pressure:['Pressure','Presiune'],temperature:['Temperature','Temperatură'],volume:['Volume','Volum'],collisions:['Piston hits','Ciocniri piston'],
 phh_over:['Overpressure! Release the piston or cool the gas.','Suprapresiune! Eliberează pistonul sau răcește gazul.'],
 phh_hot:['Hot gas: fast molecules hit harder and more often → pressure rises.','Gaz fierbinte: molecule rapide lovesc mai tare și mai des → presiunea crește.'],
 phh_sq:['Less room → more hits per second → pressure rises (Boyle).','Mai puțin loc → mai multe lovituri pe secundă → presiunea crește (Boyle).'],
 phh_gen:['Molecules bounce off the piston: pressure = hits per area. Change T, V or N and watch the gauge.','Moleculele lovesc pistonul: presiune = lovituri pe arie. Schimbă T, V sau N și urmărește manometrul.'],
 q_phys:['Quest: reach 3 atm without heating above 300 K','Misiune: ajunge la 3 atm fără să încălzești peste 300 K'],q_done:['Boyle would be proud! +25 XP','Boyle ar fi mândru! +25 XP'],title:['Piston & Thermodynamics Lab','Laboratorul piston și termodinamică']};
// '#rrggbb' mix; v1 hue ramp (blue→red) rebuilt from tokens: subject blue → tan → rose (no orange)
function mix(a,b,t){if(!/^#[0-9a-f]{6}$/i.test(a)||!/^#[0-9a-f]{6}$/i.test(b))return t<.5?a:b;var o='#';for(var i=1;i<7;i+=2){var x=parseInt(a.substr(i,2),16),y=parseInt(b.substr(i,2),16);o+=('0'+Math.round(x+(y-x)*t).toString(16)).slice(-2)}return o}
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
function newPart(yp){var a=Math.random()*6.283;while(Math.abs(Math.sin(a))<.3)a=Math.random()*6.283;return{x:Math.random(),y:Math.random()*yp,dx:Math.cos(a),dy:Math.sin(a),f:.6+Math.random()*.8,flash:0}}
// manifest: shell builds subjects, planets, rows and cards from this (id = progress key part)
(window.LumioModules=window.LumioModules||{})['physics/gas']={manifest:{id:'gas',subject:'physics',subjectName:['Physics','Fizică'],color:'--physics',title:['Gas & piston','Gaz și piston'],order:4,tags:['lab','quest'],orbit:[2.4,100]},
render:function(el,ctx){
  var U=ctx.ui,P=window.LumioPhysics,t=function(k){return ctx.n(S[k])},rm=matchMedia('(prefers-reduced-motion: reduce)'),
      PH={T:300,V:1,Vd:1,vV:0,N:30,parts:[],hitsAcc:0,rate:0,rateT:0,needle:1,quest:false,P:function(){return(this.N/30)*(this.T/300)/this.V}},
      C={ink:U.col('--ink'),muted:U.col('--muted'),line:U.col('--line'),tan:U.col('--tan'),rose:U.col('--bad'),mono:U.col('--mono')},
      cv=U.canvas(t('cv'),function(){loop&&loop.redraw()}),ti=U.el('div',null,'tiles big'),hi=U.el('p'),qu=U.el('div',null,'quest'),loop,
      sl={T:U.slider('T',200,500,10,300,function(v){return v+' K'},set('T')),V:U.slider('V',.3,1.2,.05,1,function(v){return(+v).toFixed(2)+' L'},set('V')),N:U.slider('N',10,50,5,30,String,set('N'))},
      fx=ctx.fx,rb=null,ramp=function(f){return f<.5?mix(ctx.color,C.tan,f*2):mix(C.tan,C.rose,f*2-1)},
      ch=U.chips([[t('cool'),ctx.color],[t('heat'),C.tan],[t('sq'),C.rose],[t('rel')],[t('reset')]],function(i){fx.pop();U.tween(PH,[{T:200},{T:450},{V:.4},{V:1.2},{T:300,V:1,N:30}][i],function(){PH.N=Math.round(PH.N/5)*5;PH.T=Math.round(PH.T);upd()})});
  function set(k){return function(v){PH[k]=v;upd()}}
  el.style.setProperty('--c',ctx.color);qu.setAttribute('aria-live','polite');ctx.report({qt:1});
  el.append(U.el('h1',t('title')),cv,sl.T,sl.V,sl.N,ch,ti,hi,qu,U.cont(ctx));
  function step(dt){var yp=PH.Vd/1.2;while(PH.parts.length<PH.N)PH.parts.push(newPart(yp));PH.parts.length=PH.N;
    var sv=P.spring(PH.Vd,PH.vV,PH.V,90,12,1,dt);PH.Vd=Math.max(.1,sv[0]);PH.vV=sv[1];
    var yp2=PH.Vd/1.2,sp0=.55*Math.sqrt(PH.T/300),hits=0;
    PH.parts.forEach(function(p){var sp=sp0*p.f;p.x+=p.dx*sp*dt;p.y+=p.dy*sp*dt;
      if(p.x<0){p.x=-p.x;p.dx=Math.abs(p.dx)}else if(p.x>1){p.x=2-p.x;p.dx=-Math.abs(p.dx)}
      if(p.y<0){p.y=-p.y;p.dy=Math.abs(p.dy)}if(p.y>yp2){p.y=Math.max(0,yp2-(p.y-yp2));p.dy=-Math.abs(p.dy);hits++;p.flash=1}
      if(p.flash>0)p.flash=Math.max(0,p.flash-dt*5)});
    PH.hitsAcc+=hits;PH.rateT+=dt;if(PH.rateT>=.5){PH.rate=PH.hitsAcc/PH.rateT;PH.hitsAcc=0;PH.rateT=0}
    PH.needle+=(PH.P()-PH.needle)*Math.min(1,dt*6)}
  function upd(){var Pr=PH.P(),T=PH.T;sl.T.set(T);sl.V.set(PH.V);sl.N.set(PH.N);
    U.tiles(ti,[['P · '+t('pressure'),Pr.toFixed(2)+' atm'],['T · '+t('temperature'),T+' K · '+Math.round(T-273.15)+' °C'],['V · '+t('volume'),PH.V.toFixed(2)+' L'],[t('collisions'),Math.round(PH.rate)+' /s']]);rb=ti.lastChild.lastChild;
    hi.className=Pr>8?'hint-orange':'';hi.textContent=Pr>8?t('phh_over'):T>400?t('phh_hot'):PH.V<.5?t('phh_sq'):t('phh_gen');
    if(Pr>=3&&T<=300){if(!PH.quest){fx.ok();fx.burst(120);if(ctx.report({qd:1}))ctx.award(25)}PH.quest=true}else if(Pr<2.5)PH.quest=false;
    qu.classList.toggle('done',PH.quest);qu.textContent=t(PH.quest?'q_done':'q_phys');
    if(rm.matches){PH.Vd=PH.V;PH.vV=0;PH.needle=Pr;step(0)}loop&&loop.redraw()}
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,w=f.w,h=f.h,fs=clamp(w/34,10,14),F=C.mono,
      x0=.07*w,x1=.5*w,top=.2*h,bot=.78*h,Hh=bot-top,Wd=x1-x0,yPix=bot-(PH.Vd/1.2)*Hh,heat=clamp((PH.T-200)/300,0,1),hc=ramp(heat),now=rm.matches?0:performance.now(),rs=Math.round(PH.rate)+' /s',i;
    if(rb&&rb.textContent!==rs)rb.textContent=rs;
    c.globalAlpha=.16;c.fillStyle=hc;c.fillRect(x0,yPix,Wd,bot-yPix);c.globalAlpha=1;
    var r=Math.max(3,Math.min(w,h)*.013);PH.parts.forEach(function(p){c.fillStyle=p.flash>0?mix(hc,C.ink,p.flash*.6):hc;c.beginPath();c.arc(x0+p.x*Wd,bot-p.y*Hh,r*(1+p.flash*.5),0,7);c.fill()});
    // burner: v1 flames (rose base → tan tip, no orange) above 310 K, ice crystals below 260 K
    c.fillStyle=C.line;c.fillRect(x0-6,bot+8,Wd+12,6);
    if(PH.T>310){var fl=clamp((PH.T-300)/200,0,1);for(i=0;i<5;i++){var fx0=x0+Wd*(.1+i*.2),fh=(.04+fl*.11)*h*(.8+.2*Math.sin(now/90+i*2)),fg=c.createLinearGradient(0,bot+6,0,bot+6-fh);fg.addColorStop(0,C.rose);fg.addColorStop(1,C.tan);c.fillStyle=fg;
      c.beginPath();c.moveTo(fx0-Wd*.07,bot+4);c.bezierCurveTo(fx0-Wd*.06,bot-fh*.4,fx0,bot-fh*.5,fx0,bot+4-fh);c.bezierCurveTo(fx0,bot-fh*.5,fx0+Wd*.06,bot-fh*.4,fx0+Wd*.07,bot+4);c.closePath();c.fill()}}
    else if(PH.T<260){var ir=Math.min(h*.03,Wd*.07);c.strokeStyle=ctx.color;c.lineWidth=1.5;c.lineCap='round';for(i=0;i<3;i++){var ix=x0+Wd*(.45+i*.23),iy=bot+h*.075;c.beginPath();for(var k=0;k<3;k++){var ia=k*Math.PI/3;c.moveTo(ix-Math.cos(ia)*ir,iy-Math.sin(ia)*ir);c.lineTo(ix+Math.cos(ia)*ir,iy+Math.sin(ia)*ir)}c.stroke()}}
    // cylinder + piston
    c.strokeStyle=C.ink;c.lineWidth=2;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(x0,top-8);c.lineTo(x0,bot);c.lineTo(x1,bot);c.lineTo(x1,top-8);c.stroke();
    var rx=(x0+x1)/2,rt=top-.1*h;c.fillStyle=C.line;c.fillRect(rx-4,rt,8,yPix-rt);c.lineWidth=1;c.strokeRect(rx-4,rt,8,yPix-rt);
    c.fillStyle=ctx.color;c.beginPath();c.roundRect?c.roundRect(x0+2,yPix-10,Wd-4,10,4):c.rect(x0+2,yPix-10,Wd-4,10);c.fill();
    c.fillStyle=C.tan;c.beginPath();c.roundRect?c.roundRect(rx-20,top-.12*h,40,10,5):c.rect(rx-20,top-.12*h,40,10);c.fill();c.strokeStyle=C.ink;c.lineWidth=1;c.stroke();
    // gauge
    var Pn=PH.needle,gx=.77*w,gy=.36*h,R=Math.min(.19*w,.22*h),a0=.75*Math.PI,sw=1.5*Math.PI;c.lineWidth=R*.12;c.lineCap='butt';
    [[0,5,C.line],[5,8,C.tan],[8,10,C.rose]].forEach(function(z){c.strokeStyle=z[2];c.beginPath();c.arc(gx,gy,R,a0+z[0]/10*sw,a0+z[1]/10*sw);c.stroke()});
    c.strokeStyle=C.muted;c.lineWidth=1.5;c.fillStyle=C.muted;c.font=Math.round(fs*.85)+'px '+F;c.textAlign='center';c.textBaseline='middle';
    for(i=0;i<=10;i++){var an=a0+i/10*sw,ca=Math.cos(an),sa=Math.sin(an);c.beginPath();c.moveTo(gx+ca*R*.78,gy+sa*R*.78);c.lineTo(gx+ca*R*.9,gy+sa*R*.9);c.stroke();if(i%2===0)c.fillText(i,gx+ca*R*.62,gy+sa*R*.62)}
    var na=a0+clamp(Pn/10,0,1)*sw;c.strokeStyle=C.ink;c.lineWidth=2.5;c.beginPath();c.moveTo(gx,gy);c.lineTo(gx+Math.cos(na)*R*.85,gy+Math.sin(na)*R*.85);c.stroke();
    c.fillStyle=ctx.color;c.beginPath();c.arc(gx,gy,R*.08,0,7);c.fill();
    // overpressure: label flashes rose/ink every 250 ms (static rose on Reduce motion)
    c.fillStyle=PH.P()>8&&(rm.matches||Math.floor(now/250)%2)?C.rose:C.ink;c.font='600 '+Math.round(fs*1.2)+'px '+F;c.fillText(PH.P().toFixed(2)+' atm',gx,gy+R*.8+10+fs*.85);
    c.fillStyle=C.muted;c.font=fs+'px '+F;c.fillText('P',gx,gy-R*1.3);
    // thermometer
    var bh=Math.max(8,.035*h),bx=.6*w,bw=.34*w,by=Math.min(h-bh-fs*3.4,Math.max(.7*h,gy+R*.8+10+fs*1.7+12+fs*1.6)),fr=clamp((PH.T-200)/300,0,1),g=c.createLinearGradient(bx,0,bx+bw,0);
    g.addColorStop(0,ctx.color);g.addColorStop(.5,C.tan);g.addColorStop(1,C.rose);
    var rr=function(x,y,ww){c.beginPath();c.roundRect?c.roundRect(x,y,ww,bh,bh/2):c.rect(x,y,ww,bh)};
    c.fillStyle=C.line;rr(bx,by,bw);c.fill();c.fillStyle=g;rr(bx,by,Math.max(bh,bw*fr));c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;rr(bx,by,bw);c.stroke();
    c.fillStyle=C.ink;c.textAlign='left';c.font='500 '+fs+'px '+F;c.fillText('T = '+PH.T+' K ('+Math.round(PH.T-273.15)+' °C)',bx,by-fs);
    c.fillStyle=C.muted;c.font=fs+'px '+F;c.fillText('V = '+PH.V.toFixed(2)+' L · N = '+PH.N,bx,by+bh+fs*1.5);c.fillText(t('collisions')+': '+Math.round(PH.rate)+'/s',bx,by+bh+fs*3);
    c.font='600 '+fs+'px '+F;c.fillText('PV = nRT',x0,Math.min(h-fs,bot+fs*2.6))}
  loop=P.Loop(step,draw);upd();step(0);
  requestAnimationFrame(function(){loop.start()});U.gone(cv,loop.destroy);
}};
})();
