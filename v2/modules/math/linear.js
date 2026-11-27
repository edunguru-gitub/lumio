(function(){
// ported from app/lumio.html D2 linear (miniLesson def, LPTS, exercises, draw) + quick check (qcMount('linear'), num). docs/spec-port-wave3.md E
var S={title:['Linear Functions','Funcția liniară'],cv:['Line lab: the line y = mx + b on a grid, with the target points of the current exercise.','Laboratorul dreptei: dreapta y = mx + b pe o grilă, cu punctele țintă ale exercițiului curent.'],
 slope:['Slope','Pantă'],yint:['y-intercept','Taie Oy în'],xint:['x-intercept','Taie Ox în'],dir:['Direction','Direcție'],up:['Up','Urcă'],down:['Down','Coboară'],flat:['Flat','Orizontală'],
 exl:['Exercises','Exerciții'],done:['Done','Gata'],rew:['+10 Lumens','+10 Lumeni'],lum:['Lumens','Lumeni'],ex_all:['All 4 exercises done · +15 Lumens bonus','Toate cele 4 exerciții gata · +15 Lumeni bonus'],
 qc:['Quick check','Verificare rapidă'],qc_new:['New question','Altă întrebare'],check:['Check','Verifică'],clear:['Clear','Șterge'],ans:['Your answer','Răspunsul tău'],
 qc_line:['Use the line on the graph.','Folosește dreapta de pe grafic.'],qc_ok:['Correct · +5 Lumens','Corect · +5 Lumeni'],qc_no:['Not quite. Answer: {a}','Nu chiar. Răspuns: {a}'],
 qc_read:['I read “{v}”. Fix it and press Check.','Am citit „{v}”. Corectează și apasă Verifică.'],type_inst:['Type instead','Scrie cu tastatura']};
var EX=[{q:{en:'Pass through (0, 3)',ro:'Trece prin (0, 3)'},hint:{en:'The y-intercept is b. What b puts the line through (0, 3)?',ro:'Ordonata la origine este b. Ce b trece dreapta prin (0, 3)?'},ok:function(s){return s.b===3}},
 {q:{en:'Make the line go downhill',ro:'Fă dreapta să coboare'},hint:{en:'Downhill means a negative slope.',ro:'Coborâre înseamnă pantă negativă.'},ok:function(s){return s.m<0}},
 {q:{en:'Draw the flat line y = −2',ro:'Desenează dreapta orizontală y = −2'},hint:{en:'Flat means m = 0. Then choose b.',ro:'Orizontală înseamnă m = 0. Apoi alege b.'},ok:function(s){return s.m===0&&s.b===-2}},
 {q:{en:'Pass through (0, 1) and (2, 5)',ro:'Trece prin (0, 1) și (2, 5)'},hint:{en:'b = 1. Slope = (5 − 1) / (2 − 0).',ro:'b = 1. Panta = (5 − 1) / (2 − 0).'},ok:function(s){return s.b===1&&s.m===2}}];
var LPTS=[[[0,3]],[],[[-4,-2],[4,-2]],[[0,1],[2,5]]];
// session state (survives theme / language re-render); lumio2_linear {v:1, ex:[done exercise indexes]}, blocked storage = memory only
var ST={m:1,b:0},QK=null,K='lumio2_linear',mem={v:1,ex:[]};
function load(){try{var o=JSON.parse(localStorage.getItem(K));if(o&&o.v===1&&Array.isArray(o.ex))mem={v:1,ex:o.ex.filter(function(x,j,a){return EX[x]&&a.indexOf(x)===j})}}catch(e){}}
function save(){try{localStorage.setItem(K,JSON.stringify(mem))}catch(e){}}
// v1 num(): comma or dot, minus variants
var num=function(v){v=String(v).trim().replace(',','.').replace(/[−–]/g,'-');return v===''||isNaN(+v)?null:+v};
var pick=function(a){return a[Math.floor(Math.random()*a.length)]};
// manifest: shell builds subjects, planets, rows and cards from this (id = progress key part)
(window.LumioModules=window.LumioModules||{})['math/linear']={manifest:{id:'linear',subject:'math',subjectName:['Math','Matematică'],color:'--math',title:['Linear functions','Funcția liniară'],order:2.5,tags:['lab','quest','quick'],orbit:[2.85,88]},
// overview content (v1 LESSON.linear intro/take + LESSONS.lin podcast); used by the overview feature when it ships (spec-port-wave3 A), inert today
overview:{mins:3,ex:4,intro:['y = mx + b is the simplest graph there is: a straight line. m sets how steep it is, b sets where it crosses the y-axis.','y = mx + b este cel mai simplu grafic: o dreaptă. m stabilește cât de înclinată e, b unde taie axa Oy.'],
 take:[['<b>m</b> is the slope: how much y changes when x grows by 1.','<b>m</b> este panta: cât se schimbă y când x crește cu 1.'],['m > 0 goes uphill, m < 0 downhill, <b>m = 0</b> is flat.','m > 0 urcă, m < 0 coboară, <b>m = 0</b> e orizontală.'],
  ['<b>b</b> is the y-intercept: the line passes through (0, b).','<b>b</b> este ordonata la origine: dreapta trece prin (0, b).'],['Two points fix a line: <b>m = (y₂ − y₁) / (x₂ − x₁)</b>.','Două puncte fixează o dreaptă: <b>m = (y₂ − y₁) / (x₂ − x₁)</b>.'],['Parallel lines share the same m.','Dreptele paralele au același m.']],
 podcast:[{say:['A linear function draws a straight line: y equals m x plus b.','O funcție liniară desenează o dreaptă: y egal m x plus b.'],board:[{t:'y = m·x + b'}]},
  {say:['m is the slope. Step one to the right, and the line climbs m.','m este panta. Faci un pas la dreapta și dreapta urcă m.'],board:[{t:'slope = rise / run'}]},
  {say:['Negative m goes downhill. Zero is perfectly flat.','m negativ coboară. Zero este perfect orizontal.'],board:[{t:['m < 0 down     m = 0 flat','m < 0 coboară     m = 0 orizontală']}]},
  {say:['b is where the line crosses the y axis, at the point zero, b.','b este locul unde dreapta taie axa y, în punctul zero, b.'],board:[{t:'(0, b)'}]},
  {say:['Your turn! In the lab, steer the line through the target points.','E rândul tău! În laborator, trece dreapta prin punctele țintă.'],board:[{t:['Your turn!','E rândul tău!']}]}]},
render:function(el,ctx){
  var U=ctx.ui,n2=U.n2,L=window.Lumio,fx=ctx.fx,t=function(k,o){var s=ctx.n(S[k]);for(var p in o)s=s.replace('{'+p+'}',o[p]);return s},loc=function(o){return ctx.n([o.en,o.ro])},E=U.el,
      C={ink:U.col('--ink'),muted:U.col('--muted'),tan:U.col('--tan')},
      cv=U.canvas(t('cv'),draw),left=E('div',null,'left'),fr=E('div',null,'panel'),
      sm=U.slider('m',-5,5,.5,ST.m,n2,function(v){ST.m=v;upd()}),sb=U.slider('b',-8,8,1,ST.b,n2,function(v){ST.b=v;upd()}),
      fo=E('div',null,'formula'),ti=E('div',null,'tiles'),exl=E('ul',null,'exl'),hi=E('p',null,'note'),
      qc=E('div',null,'qcw'),qq=E('div',null,'eq'),fld=E('div',null,'fld'),lb=E('label',t('ans'),'k'),row=E('div',null,'ans'),inp=E('input'),ck=E('button',t('check'),'btn-check'),
      tl=E('div',null,'chips'),nw=E('button',t('qc_new'),'hint-link'),cl=E('button',t('clear'),'hint-link'),qf=E('p',null,'fb'),ink=window.LumioInk?LumioInk.mount(ctx,inp):null,miss=0,busy=0;
  load();el.classList.add('proj');el.style.setProperty('--c',ctx.color);ctx.report({qt:4});
  exl.setAttribute('aria-label',t('exl'));hi.setAttribute('aria-live','polite');qf.setAttribute('aria-live','polite');
  left.append(cv);
  // quick check (v1 qcMount): y(k) = ? from the CURRENT line (answer computed at check time, so it always matches the graph); Type default, ink optional
  inp.inputMode='decimal';inp.autocomplete='off';inp.id='ans-in';inp.placeholder='?';lb.htmlFor='ans-in';ck.type=nw.type=cl.type='button';tl.style.border='0';tl.style.padding='0';
  row.append(inp,ck);if(ink)inp.after(ink.conf);fld.append(lb,row);tl.append(nw,cl);qc.append(E('h3',t('qc'),'k'),qq);if(ink)qc.append(ink.el);qc.append(fld,tl,qf);
  fr.append(sm,sb,fo,ti,exl,hi,qc,U.cont(ctx));
  el.append(E('h1',t('title')),left,fr);
  function ystr(){var m=ST.m,b=ST.b;return'y = '+(m===0?'':(m===1?'':m===-1?'−':n2(m))+'x')+(b===0&&m!==0?'':(m===0?n2(b):(b<0?' − ':' + ')+n2(Math.abs(b))))}
  function upd(silent){
    var m=ST.m,b=ST.b,done=mem.ex,cur=-1;sm.set(m);sb.set(b);
    EX.some(function(e,i){if(done.indexOf(i)<0){cur=i;return true}});
    if(!silent&&cur>=0&&EX[cur].ok(ST)){
      // v1: +10 per exercise, +15 when all four are done; stored, so each pays once
      done.push(cur);save();fx.ok();ctx.report({qd:done.length,ok:1});ctx.award(10);if(L.toast)L.toast(t('rew')+' · '+loc(EX[cur].q));
      if(done.length===EX.length){ctx.award(15);fx.burst(120)}return upd(true)}
    fo.textContent=ystr();
    U.tiles(ti,[[t('slope')+' m',n2(m)],[t('yint'),'(0, '+n2(b)+')'],[t('xint'),m?'('+n2(+(-b/m).toFixed(2))+', 0)':'—'],[t('dir'),t(m>0?'up':m<0?'down':'flat')]]);
    exl.replaceChildren.apply(exl,EX.map(function(e,i){var li=E('li',null,done.indexOf(i)>=0?'done':i===cur?'cur':''),c=E('i',done.indexOf(i)>=0?'✓':'');
      if(done.indexOf(i)>=0){c.setAttribute('role','img');c.setAttribute('aria-label',t('done'))}else c.setAttribute('aria-hidden','true');
      if(i===cur)li.setAttribute('aria-current','step');li.append(c,E('span',loc(e.q)),E('small',t('rew')));return li}));
    hi.textContent=cur>=0?loc(EX[cur].hint):t('ex_all');
    draw()}
  function qnext(){QK=pick([-3,-2,-1,1,2,3,4]);miss=0;inp.value='';if(ink)ink.clear();qf.className='fb';qf.textContent='';fld.className='fld';qshow()}
  function qshow(){qq.textContent='y('+(QK<0?'−'+(-QK):QK)+') = ?';qq.appendChild(E('small',t('qc_line')))}
  function check(){if(busy)return;var ty=L.pref('lumio2_io')!=='ink'||!ink,raw=inp.value.trim(),v=num(raw),a=ST.m*QK+ST.b;
    if(raw==='')return;
    if(v!==null&&Math.abs(v-a)<=.051){ctx.award(5);ctx.report({ok:1});fx.ok();qf.className='fb ok';qf.textContent=t('qc_ok');fld.className='fld ok';busy=setTimeout(function(){busy=0;if(el.isConnected)qnext()},1300);return}
    // v1: in Write mode the first miss asks to fix the reading, the second switches to Type (the read text stays in the field)
    if(!ty&&++miss<2){fx.bad();qf.className='fb no';qf.textContent=t('qc_read',{v:raw||'?'});return}
    if(!ty){var tb=ink.el.querySelector('.ink-io button:last-child');if(tb)tb.click();inp.value=raw;inp.focus();miss=0;qf.className='fb';qf.textContent=t('qc_read',{v:raw||'?'})+' · '+t('type_inst');return}
    fx.bad();ctx.report({bad:1});fx.shake(fld);qf.className='fb no';fld.className='fld no';qf.textContent=t('qc_no',{a:n2(a)})}
  ck.onclick=check;inp.onkeydown=function(e){if(e.key==='Enter')check()};
  cl.onclick=function(){fx.tick();inp.value='';if(ink)ink.clear();inp.focus()};nw.onclick=function(){fx.tick();clearTimeout(busy);busy=0;qnext();inp.focus()};
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,w=f.w,h=f.h,m=ST.m,b=ST.b,g=U.gridMap(c,w,h,{x0:-8,x1:8,y0:-8,y1:8,sx:2,sy:2}),X=g.X,Y=g.Y;
    c.save();c.beginPath();c.rect(X(-8),Y(8),X(8)-X(-8),Y(-8)-Y(8));c.clip();
    c.strokeStyle=ctx.color;c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(X(-8),Y(m*-8+b));c.lineTo(X(8),Y(m*8+b));c.stroke();
    // rise / run step at x = 1
    c.setLineDash([4,4]);c.strokeStyle=C.muted;c.lineWidth=1;c.beginPath();c.moveTo(X(0),Y(b));c.lineTo(X(1),Y(b));c.lineTo(X(1),Y(b+m));c.stroke();c.setLineDash([]);c.restore();
    U.mdot(c,X(0),Y(b),5,C.tan);(LPTS[mem.ex.length]||[]).forEach(function(p){U.mdot(c,X(p[0]),Y(p[1]),7,'transparent',C.ink)})}
  if(QK==null)qnext();else qshow();upd(true);
  // phone controller (v1 LAB.linear): knob m, slider b, tilt m,b
  U.gone(cv,ctx.controls({knob:'m',sliders:['b'],tilt:['m','b'],params:{m:{min:-5,max:5,step:.5,label:'m',fmt:n2},b:{min:-8,max:8,step:1,label:'b',fmt:n2}},
    get:function(k){return ST[k]},set:function(k,v){ST[k]=v;upd()},ro:ystr}));
}};
})();
