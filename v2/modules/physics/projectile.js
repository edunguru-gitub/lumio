(function(){
// ported from app/lumio.html D1 projectile (prj, miniLesson def, exercises, draw) + 5 LEVELS MODE (LVL, LV, lvShotPath, lvFire, lvGo, lvRender, lvDraw). docs/spec-port-wave2.md A
var S={title:['Projectile Motion','Mișcarea proiectilului'],cv:['Launch lab: grid of distance and height with the shot path.','Laborator de lansare: grilă de distanță și înălțime cu traiectoria.'],
 mode:['Mode','Mod'],range:['Range','Bătaie'],maxh:['Max height','Înălțime max'],ft:['Flight time','Timp de zbor'],exl:['Exercises','Exerciții'],p10:['+10 Lumens','+10 Lumeni'],done:['Done','Gata'],
 ex_all:['All 4 exercises done · +15 Lumens bonus','Toate cele 4 exerciții gata · +15 Lumeni bonus'],
 lv_free:['Free play','Joc liber'],lv_lv:['Levels','Niveluri'],lv_n:['Level {n}','Nivelul {n}'],lv_fire:['Fire','Lansează'],lv_how:['Show me how','Arată-mi cum'],lv_formula:['Formula','Formula'],lv_example:['Worked example','Exemplu rezolvat'],
 lv_hint:['Hint {n}','Indiciul {n}'],lv_hit:['Hit! Level complete','Lovit! Nivel terminat'],lv_miss:['Missed: landed at {x} m. Check your numbers.','Ratat: a aterizat la {x} m. Verifică-ți calculele.'],
 lv_miss_r:['Not quite: you said {x} m (dashed line). Compare it with where the ball really lands.','Nu chiar: ai spus {x} m (linia punctată). Compară cu locul în care aterizează de fapt mingea.'],
 lv_miss_h:["Missed: at the platform's height the ball was {x} m away. Check your numbers.",'Ratat: la înălțimea platformei mingea era la {x} m. Verifică-ți calculele.'],
 tol:['A hit means within 3 % of the exact answer.','Un răspuns corect înseamnă o eroare de cel mult 3 % față de valoarea exactă.'],
 lv_lost:['Out of hearts. Try the level again.','Nu mai ai inimi. Încearcă nivelul din nou.'],lv_retry:['Try again','Încearcă din nou'],lv_next:['Next level','Nivelul următor'],
 lv_locked:['Finish the level before to unlock','Termină nivelul anterior ca să-l deblochezi'],lv_reward:['+{n} Lumens','+{n} Lumeni'],lv_replay:['Replay: no Lumens','Reluare: fără Lumeni'],
 lv_all:['All levels complete!','Toate nivelurile terminate!'],lv_ans:['Your answer','Răspunsul tău'],lv_nophone:['Phone controls work in Free play.','Controlul de pe telefon funcționează în Joc liber.'],
 lv_hearts:['{n} hearts left','{n} inimi rămase'],lv_stars:['{n} of 3 sparkles','{n} din 3 scântei'],lv_dot:['Level {n}, {s} of 3 sparkles','Nivelul {n}, {s} din 3 scântei'],lv_dlock:['Level {n}, locked','Nivelul {n}, blocat']};
var GRV=9.81,G=9.8,rad=function(a){return a*Math.PI/180};
var prj=function(s){var th=rad(s.a),vx=s.v*Math.cos(th),vy=s.v*Math.sin(th),T=2*vy/GRV;return{vx:vx,vy:vy,T:T,R:vx*T,H:vy*vy/(2*GRV)}};
var EX=[{q:{en:'Land beyond 40 m',ro:'Aterizează dincolo de 40 m'},hint:{en:'More speed means more range. At 45°, any v above 19.8 m/s lands beyond 40 m (R = v² / g).',ro:'Mai multă viteză înseamnă bătaie mai mare. La 45°, orice v peste 19,8 m/s aterizează dincolo de 40 m (R = v² / g).'},ok:function(s){return prj(s).R>40}},
 {q:{en:'Reach a max height above 15 m',ro:'Urcă peste 15 m'},hint:{en:'Only the upward part of the speed, v · sin θ, lifts the ball. Raise θ or v.',ro:'Doar partea de viteză îndreptată în sus, v · sin θ, ridică mingea. Mărește θ sau v.'},ok:function(s){return prj(s).H>15}},
 {q:{en:'Hit the flag at 30 m (±1 m)',ro:'Lovește steagul de la 30 m (±1 m)'},hint:{en:'Fine-tune speed and angle until R reads 29–31 m.',ro:'Reglează viteza și unghiul până când R arată 29–31 m.'},ok:function(s){return Math.abs(prj(s).R-30)<=1}},
 {q:{en:'At v = 20 m/s, find the max-range angle',ro:'La v = 20 m/s, găsește unghiul de bătaie maximă'},hint:{en:'Set v to 20, then try 40°, 45° and 50° and compare R. The largest R marks the answer (R changes very little near the peak).',ro:'Pune v la 20, apoi încearcă 40°, 45° și 50° și compară R. Cel mai mare R indică răspunsul (lângă maxim, R se schimbă foarte puțin).'},ok:function(s){return s.v===20&&Math.abs(s.a-45)<=1}}];
var LVL=[
 {a:45,R:40,h:0,ask:'v',unit:'m/s',
  q:{en:'The target is 40 m away. You launch at 45°. What speed hits it?',ro:'Ținta e la 40 m. Lansezi la 45°. Ce viteză o lovește?'},
  ans:[Math.sqrt(40*G)],
  f:{en:'R = v² · sin(2θ) / g   →   v = √(R · g / sin 2θ)',ro:'R = v² · sin(2θ) / g   →   v = √(R · g / sin 2θ)'},
  ex:{en:'Target 90 m at 45°: sin 90° = 1, so v = √(90 · 9.8) = √882 ≈ 29.7 m/s.',ro:'Ținta la 90 m, la 45°: sin 90° = 1, deci v = √(90 · 9,8) = √882 ≈ 29,7 m/s.'},
  hn:[{en:'Use the range formula R = v² · sin(2θ) / g.',ro:'Folosește formula bătăii R = v² · sin(2θ) / g.'},{en:'Solve for v: v = √(R · g / sin 2θ).',ro:'Scoate v: v = √(R · g / sin 2θ).'},{en:'sin 90° = 1, so v = √(40 · 9.8) = √392.',ro:'sin 90° = 1, deci v = √(40 · 9,8) = √392.'}]},
 {a:45,R:60,h:0,ask:'v',unit:'m/s',
  q:{en:'The target moved to 60 m. Still 45°. What speed now?',ro:'Ținta s-a mutat la 60 m. Tot 45°. Ce viteză acum?'},
  ans:[Math.sqrt(60*G)],
  f:{en:'v = √(R · g / sin 2θ)',ro:'v = √(R · g / sin 2θ)'},
  ex:{en:'Target 20 m at 45°: v = √(20 · 9.8) = √196 = 14 m/s.',ro:'Ținta la 20 m, la 45°: v = √(20 · 9,8) = √196 = 14 m/s.'},
  hn:[{en:'Same formula as level 1, new distance.',ro:'Aceeași formulă ca la nivelul 1, altă distanță.'},{en:'v = √(R · g) when θ = 45°.',ro:'v = √(R · g) când θ = 45°.'},{en:'v = √(60 · 9.8) = √588.',ro:'v = √(60 · 9,8) = √588.'}]},
 {v:20,R:30,h:0,ask:'a',unit:'°',
  q:{en:'Your speed is fixed at 20 m/s. The target is 30 m away. Which angle hits it? (Either answer counts.)',ro:'Viteza e fixă: 20 m/s. Ținta e la 30 m. Ce unghi o lovește? (Oricare dintre cele două răspunsuri e bun.)'},
  ans:[Math.asin(30*G/400)*90/Math.PI,90-Math.asin(30*G/400)*90/Math.PI],
  f:{en:'sin(2θ) = R · g / v²   →   θ = ½ · arcsin(R · g / v²)',ro:'sin(2θ) = R · g / v²   →   θ = ½ · arcsin(R · g / v²)'},
  ex:{en:'v = 10 m/s, R = 5 m: sin 2θ = 5 · 9.8 / 100 = 0.49 → 2θ ≈ 29.3° → θ ≈ 14.7° (or 90° − 14.7° = 75.3°).',ro:'v = 10 m/s, R = 5 m: sin 2θ = 5 · 9,8 / 100 = 0,49 → 2θ ≈ 29,3° → θ ≈ 14,7° (sau 90° − 14,7° = 75,3°).'},
  hn:[{en:'Rearrange the range formula for sin(2θ).',ro:'Rearanjează formula bătăii pentru sin(2θ).'},{en:'sin(2θ) = R · g / v², then θ = ½ · arcsin(…).',ro:'sin(2θ) = R · g / v², apoi θ = ½ · arcsin(…).'},{en:'sin 2θ = 30 · 9.8 / 400 = 0.735.',ro:'sin 2θ = 30 · 9,8 / 400 = 0,735.'}]},
 {a:45,R:30,h:5,ask:'v',unit:'m/s',
  q:{en:'The target sits on a 5 m high platform, 30 m away. Launch at 45°. What speed lands on it?',ro:'Ținta stă pe o platformă de 5 m, la 30 m. Lansezi la 45°. Ce viteză aterizează pe ea?'},
  ans:[Math.sqrt(G*900/25)],
  f:{en:'y = x · tan θ − g · x² / (2 v² cos² θ)   →  at 45°: y = x − g · x² / v²',ro:'y = x · tan θ − g · x² / (2 v² cos² θ)   →  la 45°: y = x − g · x² / v²'},
  ex:{en:'x = 20 m, y = 4 m at 45°: v² = g · x² / (x − y) = 9.8 · 400 / 16 = 245 → v ≈ 15.7 m/s.',ro:'x = 20 m, y = 4 m la 45°: v² = g · x² / (x − y) = 9,8 · 400 / 16 = 245 → v ≈ 15,7 m/s.'},
  hn:[{en:'Use the path equation y = x · tan θ − g · x² / (2 v² cos² θ).',ro:'Folosește ecuația traiectoriei y = x · tan θ − g · x² / (2 v² cos² θ).'},{en:'At 45° it becomes v² = g · x² / (x − y).',ro:'La 45° devine v² = g · x² / (x − y).'},{en:'v² = 9.8 · 900 / 25 = 352.8.',ro:'v² = 9,8 · 900 / 25 = 352,8.'}]},
 {a:45,v:30,h:0,ask:'R',unit:'m',
  q:{en:'At the same speed, from level ground, 45° gives the longest throw. At 30 m/s, how far does the ball land? Type the distance: the shot will show where it really lands.',ro:'La aceeași viteză, de pe teren plat, 45° dă cea mai lungă aruncare. La 30 m/s, cât de departe aterizează mingea? Scrie distanța: lansarea arată unde aterizează de fapt.'},
  ans:[900/G],
  f:{en:'At 45°: R = v² / g',ro:'La 45°: R = v² / g'},
  ex:{en:'At 20 m/s: R = 400 / 9.8 ≈ 40.8 m.',ro:'La 20 m/s: R = 400 / 9,8 ≈ 40,8 m.'},
  hn:[{en:'sin(2 · 45°) = sin 90° = 1.',ro:'sin(2 · 45°) = sin 90° = 1.'},{en:'So R = v² / g.',ro:'Deci R = v² / g.'},{en:'R = 900 / 9.8.',ro:'R = 900 / 9,8.'}]}];
function lvShotPath(L,v,a){var th=rad(a),vx=v*Math.cos(th),vy=v*Math.sin(th),h=L.h||0,disc=vy*vy-2*G*h,T=disc>=0?(vy+Math.sqrt(disc))/G:2*vy/G;return{vx:vx,vy:vy,T:T,X:vx*T,yEnd:disc>=0?h:0}}
// session state (v1 kept it in memory across pages; here it also survives the theme/language re-render)
var ST={a:45,v:20},LV={on:false,i:0,hearts:3,hints:0,miss:0,shot:null,res:null,how:false},tm=0;
// lumio2_proj {v:1, ex:[done exercise indexes], stars:{levelIndex:1..3}}; blocked storage = memory only
var K='lumio2_proj',mem={v:1,ex:[],stars:{}};
function load(){try{var o=JSON.parse(localStorage.getItem(K));if(o&&o.v===1){var st={};for(var i in o.stars||{})if(LVL[i]&&[1,2,3].indexOf(o.stars[i])>=0)st[i]=o.stars[i];
  mem={v:1,ex:(Array.isArray(o.ex)?o.ex:[]).filter(function(x,j,a){return EX[x]&&a.indexOf(x)===j}),stars:st}}}catch(e){}}
function save(){try{localStorage.setItem(K,JSON.stringify(mem))}catch(e){}}
var unl=function(i){return i===0||!!mem.stars[i-1]},qd=function(){return mem.ex.length+Object.keys(mem.stars).length};
var HEART='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13.5C3 10 1.5 7.5 1.5 5.5 1.5 3.6 3 2.5 4.5 2.5 6 2.5 7.2 3.4 8 4.8 8.8 3.4 10 2.5 11.5 2.5 13 2.5 14.5 3.6 14.5 5.5 14.5 7.5 13 10 8 13.5Z"/></svg>';
// manifest: shell builds subjects, planets, rows and cards from this (id = progress key part)
(window.LumioModules=window.LumioModules||{})['physics/projectile']={manifest:{id:'projectile',subject:'physics',subjectName:['Physics','Fizică'],color:'--physics',title:['Projectile motion','Mișcarea proiectilului'],order:5,tags:['lab','quest','levels'],orbit:[4.6,86]},
render:function(el,ctx){
  var U=ctx.ui,L=window.Lumio,fx=ctx.fx,rm=matchMedia('(prefers-reduced-motion: reduce)'),dec=ctx.n(['.',',']),
      t=function(k,o){var s=ctx.n(S[k]);for(var p in o)s=s.replace('{'+p+'}',o[p]);return s},loc=function(o){return ctx.n([o.en,o.ro])},
      C={ink:U.col('--ink'),muted:U.col('--muted'),line:U.col('--line'),tan:U.col('--tan')},E=function(tag,txt,cls){return U.el(tag,txt,cls)},
      fa=function(v){return v+'°'},fv=function(v){return v+' m/s'},loop,
      cv=U.canvas(t('cv'),function(){loop&&loop.redraw()}),left=E('div',null,'left'),mode=E('div',null,'pseg lv-mode'),
      fr=E('div',null,'panel'),sa=U.slider('θ',10,80,1,ST.a,fa,function(v){ST.a=v;upd()}),sv=U.slider('v',5,30,1,ST.v,fv,function(v){ST.v=v;upd()}),
      ti=E('div',null,'tiles'),exl=E('ul',null,'exl'),hi=E('p',null,'note'),
      lv=E('div',null,'panel'),dots=E('div',null,'lv-dots'),lt=E('div',null,'lv-t'),lq=E('p',null,'lv-q'),lg=E('p',null,'lv-g'),
      form=E('form',null,'lv-f'),inp=E('input'),unit=E('span'),fire=E('button',t('lv_fire'),'btn-primary'),res=E('div',null,'lv-res'),
      how=E('details',null,'how'),sum=E('summary',t('lv_how')),hw=E('div');
  load();el.classList.add('proj');el.style.setProperty('--c',ctx.color);ctx.report({qt:9});
  // mode capsule: Free play | Levels (v1 seg data-lvm)
  mode.setAttribute('role','group');mode.setAttribute('aria-label',t('mode'));
  [['free','lv_free'],['lv','lv_lv']].forEach(function(m){var b=E('button',t(m[1]));b.type='button';b.dataset.m=m[0];b.onclick=function(){if((m[0]==='lv')!==LV.on){fx.tick();setLv(m[0]==='lv')}};mode.append(b)});
  left.append(mode,cv);
  exl.setAttribute('aria-label',t('exl'));hi.setAttribute('aria-live','polite');
  fr.append(sa,sv,ti,exl,hi,U.cont(ctx));
  // Levels panel: persistent nodes (input keeps value + focus), contents refreshed by lvRender
  dots.setAttribute('role','group');dots.setAttribute('aria-label',t('lv_lv'));
  inp.id='pj-in';inp.setAttribute('inputmode','decimal');inp.autocomplete='off';fire.type='submit';
  var lab=E('label',t('lv_ans'),'k');lab.htmlFor='pj-in';var box=E('div',null,'lv-in');box.append(inp,unit);form.append(lab,box,fire);
  form.onsubmit=function(e){e.preventDefault();lvFire()};
  res.setAttribute('role','status');how.append(sum,hw);how.ontoggle=function(){LV.how=how.open};
  lv.append(dots,lt,lq,lg,form,res,how,E('p',t('lv_nophone'),'note'));
  el.append(E('h1',t('title')),left,fr,lv);

  function upd(silent){
    var r=prj(ST),done=mem.ex,cur=-1;sa.set(ST.a);sv.set(ST.v);
    EX.some(function(e,i){if(done.indexOf(i)<0){cur=i;return true}});
    if(!silent&&cur>=0&&EX[cur].ok(ST)){
      // v1 miniUpd: +10 per exercise in order, then a separate +15 bonus when all 4 are done (second pop after the first fades)
      done.push(cur);save();fx.ok();ctx.report({qd:qd(),ok:1});ctx.award(10);if(done.length===EX.length)setTimeout(function(){ctx.award(15)},1700);return upd(true)}
    U.tiles(ti,[[t('range'),r.R.toFixed(1)+' m'],[t('maxh'),r.H.toFixed(1)+' m'],[t('ft'),r.T.toFixed(2)+' s'],['vx · vy',r.vx.toFixed(1)+' · '+r.vy.toFixed(1)]]);
    exl.replaceChildren.apply(exl,EX.map(function(e,i){var li=E('li',null,done.indexOf(i)>=0?'done':i===cur?'cur':''),ck=E('i',done.indexOf(i)>=0?'✓':'');
      if(done.indexOf(i)>=0){ck.setAttribute('role','img');ck.setAttribute('aria-label',t('done'))}else ck.setAttribute('aria-hidden','true');
      if(i===cur)li.setAttribute('aria-current','step');li.append(ck,E('span',loc(e.q)),E('small',t('p10')));return li}));
    hi.textContent=cur>=0?loc(EX[cur].hint):t('ex_all');
    if(loop)loop.redraw()}

  function setLv(on){LV.on=on;fr.hidden=on;lv.hidden=!on;el.classList.toggle('lv-on',on);
    [].forEach.call(mode.children,function(b){b.setAttribute('aria-pressed',(b.dataset.m==='lv')===on)});if(L.seg)L.seg(mode);
    if(on){if(!unl(LV.i))LV.i=0;lvRender()}else LV.shot=null;if(loop)loop.redraw()}
  function lvGo(i,f){if(!unl(i))return;LV.i=i;LV.hearts=3;LV.hints=0;LV.miss=0;LV.shot=null;LV.res=null;LV.how=false;inp.value='';lvRender(f);if(loop)loop.redraw()}
  function lvFire(){
    var Lv=LVL[LV.i],x=parseFloat(String(inp.value).replace(',','.').trim());if(!isFinite(x)||x<=0){inp.focus();return}
    var ok=Lv.ans.some(function(a){return Math.abs(x-a)<=Math.abs(a)*.03}),v=Lv.v,a=Lv.a,predict=null;if(Lv.ask==='v')v=x;else if(Lv.ask==='a')a=x;else predict=x;
    var path=lvShotPath(Lv,v,a);LV.shot={v:v,a:a,path:path,t0:tm,predict:predict,ok:ok};
    if(ok){var first=mem.stars[LV.i]==null,stars=(LV.hints===0&&LV.miss===0)?3:(LV.hints<=1&&LV.miss<=1&&!(LV.hints&&LV.miss))?2:1,paid=first?10+5*(stars-1):0;
      if(first)mem.stars[LV.i]=stars;else if(stars>mem.stars[LV.i])mem.stars[LV.i]=stars;save();
      ctx.report({qd:qd(),ok:LV.miss?0:1});if(paid)ctx.award(paid);
      LV.res={kind:'hit',stars:stars,paid:paid};setTimeout(function(){if(cv.isConnected){fx.ok();fx.burst(140)}},rm.matches?0:Math.min(1600,path.T*350))}
    else{LV.hearts--;LV.miss++;inp.value='';fx.bad();ctx.report({bad:1});LV.res={kind:LV.hearts<=0?'lost':'miss',x:predict!=null?predict:path.X,k:Lv.ask==='R'?'lv_miss_r':Lv.h&&path.yEnd?'lv_miss_h':'lv_miss'}}
    lvRender('res');if(loop)loop.redraw()}
  // f: 'res' = focus the result action (or the field after a miss), 'in' = the field, else keep focus on the level dot
  function lvRender(f){
    var Lv=LVL[LV.i],r=LV.res,shut=!!(r&&(r.kind==='hit'||r.kind==='lost')),onDot=dots.contains(document.activeElement);
    dots.replaceChildren.apply(dots,LVL.map(function(_,i){var s=mem.stars[i],b=E('button',null,'lv-dot'+(i===LV.i?' cur':'')+(s?' done':''));b.type='button';
      b.append(E('i',String(i+1)));if(s&&L.spk)b.append(L.spk(s));b.disabled=!unl(i);b.title=unl(i)?t('lv_n',{n:i+1}):t('lv_locked');
      b.setAttribute('aria-label',!unl(i)?t('lv_dlock',{n:i+1}):s?t('lv_dot',{n:i+1,s:s}):t('lv_n',{n:i+1}));if(i===LV.i)b.setAttribute('aria-current','step');
      b.onclick=function(){fx.tick();lvGo(i)};return b}));
    if(onDot)dots.children[LV.i].focus();
    var hs=E('span',null,'hearts'),h=Math.max(0,LV.hearts);hs.setAttribute('role','img');hs.setAttribute('aria-label',t('lv_hearts',{n:h}));
    hs.innerHTML=HEART+HEART+HEART;for(var j=0;j<h;j++)hs.children[j].classList.add('on');hs.append(h+' / 3');
    lt.replaceChildren(E('h3',t('lv_n',{n:LV.i+1})),hs);
    lq.textContent=loc(Lv.q);
    lg.textContent=[Lv.ask!=='a'&&Lv.a!=null?'θ = '+Lv.a+'°':'',Lv.ask!=='v'&&Lv.v!=null?'v = '+Lv.v+' m/s':'',Lv.ask!=='R'&&Lv.R!=null?'R = '+Lv.R+' m':'',Lv.h?'h = '+Lv.h+' m':'','g = 9'+dec+'8 m/s²',t('tol')].filter(Boolean).join(' · ');
    unit.textContent=Lv.unit;inp.disabled=fire.disabled=shut;
    var act=null;res.replaceChildren();res.hidden=!r;
    if(r&&r.kind==='hit'){var sp=E('p',null,'lv-st');if(L.spk)sp.append(L.spk(r.stars));sp.append(E('span',t('lv_stars',{n:r.stars})));
      res.append(E('p',t('lv_hit'),'fb ok'),sp,E('p',r.paid?t('lv_reward',{n:r.paid}):t('lv_replay'),r.paid?'lum':'rep'));
      if(LV.i<LVL.length-1){act=E('button',t('lv_next'),'btn-primary');act.onclick=function(){lvGo(LV.i+1,'in')}}else res.append(E('p',t('lv_all'),'lv-all'))}
    else if(r&&r.kind==='miss')res.append(E('p',t(r.k||'lv_miss',{x:(Math.round(r.x*10)/10).toString().replace('.',dec)}),'fb no'));
    else if(r&&r.kind==='lost'){res.append(E('p',t('lv_lost'),'fb no'));act=E('button',t('lv_retry'),'btn-primary');act.onclick=function(){lvGo(LV.i,'in')}}
    if(act){act.type='button';res.append(act)}
    // Show me how: formula, worked example, hints one at a time (a hint opens the disclosure, as v1)
    var c1=E('div',null,'card2'),c2=E('div',null,'card2');c1.append(E('span',t('lv_formula'),'k'),E('code',loc(Lv.f)));c2.append(E('span',t('lv_example'),'k'),E('p',loc(Lv.ex)));
    hw.replaceChildren(c1,c2);Lv.hn.forEach(function(x,i){if(i<LV.hints){var c=E('div',null,'card2');c.append(E('span',t('lv_hint',{n:i+1}),'k'),E('p',loc(x)));hw.append(c)}});
    var hb=null;if(LV.hints<3){hb=E('button',t('lv_hint',{n:LV.hints+1}),'chip');hb.type='button';hb.onclick=function(){LV.hints++;LV.how=true;fx.tick();lvRender('hint')};hw.append(hb)}
    how.open=LV.how;
    if(f==='hint')(hb||sum).focus();else if(f==='in'||f==='res'&&!act)inp.focus();else if(f==='res')act.focus();
  }
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,w=f.w,h=f.h,calm=rm.matches,tt,k;
    c.lineCap='butt';
    if(LV.on){
      var Lv=LVL[LV.i],xm=Lv.ask==='R'||(Lv.R||0)>60?100:70,m=U.gridMap(c,w,h,{x0:0,x1:xm,y0:0,y1:xm/2,sx:10,sy:10}),X=m.X,Y=m.Y,tx=Lv.R,ty=Lv.h||0,s=LV.shot;
      if(Lv.h){c.fillStyle=C.line;c.fillRect(X(tx-3),Y(Lv.h),X(tx+3)-X(tx-3),Y(0)-Y(Lv.h))}
      if(tx!=null){c.strokeStyle=C.ink;c.lineWidth=2;c.beginPath();c.arc(X(tx),Y(ty),7,0,7);c.stroke();U.mdot(c,X(tx),Y(ty),2.5,C.ink);
        c.beginPath();c.moveTo(X(tx),Y(ty));c.lineTo(X(tx),Y(ty+6));c.stroke();c.fillStyle=C.ink;c.beginPath();c.moveTo(X(tx),Y(ty+6));c.lineTo(X(tx)+12,Y(ty+5));c.lineTo(X(tx),Y(ty+4));c.fill()}
      if(s&&s.predict!=null){c.strokeStyle=C.muted;c.lineWidth=1;c.setLineDash([4,4]);c.beginPath();c.moveTo(X(s.predict),Y(0));c.lineTo(X(s.predict),Y(8));c.stroke();c.setLineDash([])}
      var a0=s?s.a:(Lv.a||45);c.strokeStyle=C.ink;c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(X(0),Y(0));c.lineTo(X(0)+28*Math.cos(rad(a0)),Y(0)-28*Math.sin(rad(a0)));c.stroke();c.lineCap='butt';
      if(!s)return;var p=s.path,el2=calm?p.T:Math.min(p.T,(tm-s.t0)*2.5),pos=function(u){return[p.vx*u,p.vy*u-G*u*u/2]};
      c.strokeStyle=ctx.color;c.lineWidth=2.5;c.beginPath();for(var i=0;i<=60;i++){var q=pos(el2*i/60);i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1]))}c.stroke();
      var b=pos(el2);U.mdot(c,X(b[0]),Y(Math.max(0,b[1])),6,C.tan);return}
    var r=prj(ST),g=U.gridMap(c,w,h,{x0:0,x1:95,y0:0,y1:48,sx:10,sy:10}),GX=g.X,GY=g.Y;
    // exercise 3 (index 2) is current: flag at 30 m
    if(mem.ex.length===2){c.strokeStyle=C.ink;c.lineWidth=2;c.beginPath();c.moveTo(GX(30),GY(0));c.lineTo(GX(30),GY(7));c.stroke();c.fillStyle=C.ink;c.beginPath();c.moveTo(GX(30),GY(7));c.lineTo(GX(30)+14,GY(6));c.lineTo(GX(30),GY(5));c.fill()}
    c.setLineDash([5,5]);c.strokeStyle=C.muted;c.lineWidth=1;c.beginPath();c.moveTo(GX(0),GY(r.H));c.lineTo(GX(r.R/2),GY(r.H));c.stroke();c.setLineDash([]);
    c.strokeStyle=ctx.color;c.lineWidth=2.5;c.beginPath();for(var n=0;n<=60;n++){var u=r.T*n/60,x=r.vx*u,y=r.vy*u-GRV*u*u/2;n?c.lineTo(GX(x),GY(y)):c.moveTo(GX(x),GY(y))}c.stroke();
    tt=calm?r.T:tm%(r.T+.6);k=Math.min(tt,r.T);U.mdot(c,GX(r.vx*k),GY(Math.max(0,r.vy*k-GRV*k*k/2)),6,C.tan);
    c.strokeStyle=C.ink;c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(GX(0),GY(0));c.lineTo(GX(0)+28*Math.cos(rad(ST.a)),GY(0)-28*Math.sin(rad(ST.a)));c.stroke();c.lineCap='butt';
    U.mdot(c,GX(r.R),GY(0),4,C.ink)}
  loop=window.LumioPhysics.Loop(function(dt){tm+=dt},draw);
  upd(true);setLv(LV.on);
  // phone controller (v1 LAB.projectile): knob a, slider v, tilt a,v; ignored while Levels is open (v1 setP guard)
  U.gone(cv,ctx.controls({knob:'a',sliders:['v'],tilt:['a','v'],params:{a:{min:10,max:80,step:1,label:'θ',fmt:fa},v:{min:5,max:30,step:1,label:'v',fmt:fv}},
    get:function(k){return ST[k]},set:function(k,v){if(LV.on)return;ST[k]=v;upd()},ro:function(){var r=prj(ST);return'R = '+r.R.toFixed(1)+' m · H = '+r.H.toFixed(1)+' m'}}));
  requestAnimationFrame(function(){loop.start()});U.gone(cv,loop.destroy);
}};
})();
