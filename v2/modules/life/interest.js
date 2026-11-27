(function(){
// ported from app/lumio.html D3 compound interest (cint, eur, miniLesson def, exercises, draw). docs/spec-port-wave3.md D
var S={title:['Compound Interest','Dobânda compusă'],cv:['Savings lab: money over the years, compound curve, simple-interest line and the doubling level.','Laboratorul economiilor: banii de-a lungul anilor, curba dobânzii compuse, dreapta dobânzii simple și nivelul de dublare.'],
 comp:['Compound','Compus'],simp:['Simple','Simplu'],gain:['Gain','Câștig'],dbl:['Doubles in ≈','Dublare ≈'],
 exl:['Exercises','Exerciții'],done:['Done','Gata'],rew:['+10 Lumens','+10 Lumeni'],ex_all:['All 4 exercises done · +15 Lumens bonus','Toate cele 4 exerciții gata · +15 Lumeni bonus']};
var cint=function(s){var A=s.P*Math.pow(1+s.r/100,s.n),Sm=s.P*(1+s.r/100*s.n);return{A:A,Sm:Sm,gain:A-s.P}};
var EX=[{q:{en:'Double your money',ro:'Dublează-ți banii'},hint:{en:'A must reach 2 × P. Raise the rate or the years.',ro:'A trebuie să ajungă la 2 × P. Crește rata sau anii.'},ok:function(s){return cint(s).A>=2*s.P}},
 {q:{en:'Double in 10 years (A / P from 1.94 to 2.06)',ro:'Dublează în 10 ani (A / P între 1,94 și 2,06)'},hint:{en:'Set n = 10. Rule of 72: r ≈ 72 / 10 = 7.2 %. The rate moves in 0.5 % steps, so pick the closest one.',ro:'Pune n = 10. Regula lui 72: r ≈ 72 / 10 = 7,2 %. Rata se mișcă din 0,5 în 0,5 %, deci alege valoarea cea mai apropiată.'},ok:function(s){return s.n===10&&Math.abs(cint(s).A/s.P-2)<=.06}},
 {q:{en:'Turn €1,000 into €10,000',ro:'Transformă 1.000 € în 10.000 €'},hint:{en:'Keep P at 1,000. Long time + a decent rate.',ro:'Păstrează P la 1.000. Timp lung + o rată decentă.'},ok:function(s){return s.P===1000&&cint(s).A>=1e4}},
 {q:{en:'Compound beats simple by €5,000+',ro:'Compusul bate simplul cu peste 5.000 €'},hint:{en:'The gap grows with time and with the rate. Stretch n, then raise r or P.',ro:'Diferența crește cu timpul și cu rata. Mărește n, apoi crește r sau P.'},ok:function(s){var x=cint(s);return x.A-x.Sm>=5000}}];
// session state (survives theme / language re-render); lumio2_interest {v:1, ex:[done exercise indexes]}, blocked storage = memory only
var ST={P:1000,r:5,n:10},K='lumio2_interest',mem={v:1,ex:[]};
function load(){try{var o=JSON.parse(localStorage.getItem(K));if(o&&o.v===1&&Array.isArray(o.ex))mem={v:1,ex:o.ex.filter(function(x,j,a){return EX[x]&&a.indexOf(x)===j})}}catch(e){}}
function save(){try{localStorage.setItem(K,JSON.stringify(mem))}catch(e){}}
// manifest: shell builds subjects, planets, rows and cards from this (id = progress key part)
(window.LumioModules=window.LumioModules||{})['life/interest']={manifest:{id:'interest',subject:'life',subjectName:['Life skills','Viață practică'],color:'--life',title:['Compound interest','Dobânda compusă'],order:1.5,tags:['lab','quest'],orbit:[.35,92]},
// overview content (v1 LESSON.interest intro/take + LESSONS.ci podcast); used by the overview feature when it ships (spec-port-wave3 A), inert today
overview:{mins:3,ex:4,intro:['Interest that earns interest. Small rates grow into big numbers when you give them time: the earlier you start, the steeper the curve.','Dobândă care produce dobândă. Ratele mici devin sume mari dacă le dai timp: cu cât începi mai devreme, cu atât curba e mai abruptă.'],
 take:[['Simple interest pays on the starting sum only: <b>P·(1 + r·n)</b>.','Dobânda simplă se aplică doar sumei inițiale: <b>P·(1 + r·n)</b>.'],['Compound interest pays on everything so far: <b>A = P·(1 + r)ⁿ</b>.','Dobânda compusă se aplică la tot ce ai acumulat: <b>A = P·(1 + r)ⁿ</b>.'],
  ['The curve bends upward: each year adds more than the last.','Curba se arcuiește în sus: fiecare an adaugă mai mult decât precedentul.'],['<b>Rule of 72</b>: money doubles in about 72 / r years (r in %).','<b>Regula lui 72</b>: banii se dublează în aproximativ 72 / r ani (r în %).'],['Time matters more than the starting amount.','Timpul contează mai mult decât suma de pornire.']],
 podcast:[{say:['Put money in a savings account and the bank pays you interest.','Pui bani într-un cont de economii și banca îți plătește dobândă.'],board:[{t:['money + time = interest','bani + timp = dobândă']}]},
  {say:['With compound interest, next year you also earn interest on last year’s interest.','Cu dobânda compusă, anul următor câștigi dobândă și la dobânda de anul trecut.'],board:[{t:['interest on interest','dobândă la dobândă']}]},
  {say:['The formula: A equals P times one plus r, to the power n.','Formula: A egal P ori unu plus r, la puterea n.'],board:[{t:'A = P · (1 + r)ⁿ'}]},
  {say:['Quick trick, the rule of seventy two: at six percent, money doubles in about twelve years.','Truc rapid, regula lui șaptezeci și doi: la șase la sută, banii se dublează în circa doisprezece ani.'],board:[{t:['72 / 6% ≈ 12 years','72 / 6% ≈ 12 ani']}]},
  {say:['Your turn! In the lab, make your money double, then grow it tenfold.','E rândul tău! În laborator, dublează-ți banii, apoi înmulțește-i de zece ori.'],board:[{t:['Your turn!','E rândul tău!']}]}]},
render:function(el,ctx){
  var U=ctx.ui,n2=U.n2,L=window.Lumio,fx=ctx.fx,ro=ctx.n([0,1]),t=function(k){return ctx.n(S[k])},loc=function(o){return ctx.n([o.en,o.ro])},E=U.el,
      C={ink:U.col('--ink'),muted:U.col('--muted')},
      // euro by UI language, grouping by hand (EN €1,629 / RO 1.629 €); years with RO plural rules (1 an, 2-19 ani, 20+ de ani)
      eur=function(v){var g=String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,ro?'.':',');return ro?g+' €':'€'+g},
      yrs=function(n){return ro?(n===1?'1 an':n%100===0||n%100>=20?n+' de ani':n+' ani'):n+(n===1?' yr':' yrs')},pct=function(v){return n2(v)+'%'},
      cv=U.canvas(t('cv'),draw),left=E('div',null,'left'),fr=E('div',null,'panel'),
      sP=U.slider('P',100,10000,100,ST.P,eur,function(v){ST.P=v;upd()}),sr=U.slider('r',0,15,.5,ST.r,pct,function(v){ST.r=v;upd()}),sn=U.slider('n',1,40,1,ST.n,yrs,function(v){ST.n=v;upd()}),
      fo=E('div',null,'formula'),ti=E('div',null,'tiles'),exl=E('ul',null,'exl'),hi=E('p',null,'note');
  load();el.classList.add('proj');el.style.setProperty('--c',ctx.color);ctx.report({qt:4});
  exl.setAttribute('aria-label',t('exl'));hi.setAttribute('aria-live','polite');
  left.append(cv);fr.append(sP,sr,sn,fo,ti,exl,hi,U.cont(ctx));el.append(E('h1',t('title')),left,fr);
  function upd(silent){
    var x=cint(ST),done=mem.ex,cur=-1;sP.set(ST.P);sr.set(ST.r);sn.set(ST.n);
    EX.some(function(e,i){if(done.indexOf(i)<0){cur=i;return true}});
    if(!silent&&cur>=0&&EX[cur].ok(ST)){
      // v1: +10 per exercise, +15 when all four are done; stored, so each pays once
      done.push(cur);save();fx.ok();ctx.report({qd:done.length,ok:1});ctx.award(10);if(L.toast)L.toast(t('rew')+' · '+loc(EX[cur].q));
      if(done.length===EX.length){ctx.award(15);fx.burst(120)}return upd(true)}
    fo.textContent='A = '+eur(x.A);
    U.tiles(ti,[[t('comp'),eur(x.A)],[t('simp'),eur(x.Sm)],[t('gain'),eur(x.gain)],[t('dbl'),ST.r?yrs(Math.round(72/ST.r)):'—']]);
    exl.replaceChildren.apply(exl,EX.map(function(e,i){var li=E('li',null,done.indexOf(i)>=0?'done':i===cur?'cur':''),c=E('i',done.indexOf(i)>=0?'✓':'');
      if(done.indexOf(i)>=0){c.setAttribute('role','img');c.setAttribute('aria-label',t('done'))}else c.setAttribute('aria-hidden','true');
      if(i===cur)li.setAttribute('aria-current','step');li.append(c,E('span',loc(e.q)),E('small',t('rew')));return li}));
    hi.textContent=cur>=0?loc(EX[cur].hint):t('ex_all');
    draw()}
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,w=f.w,h=f.h,s=ST,x=cint(s),top=Math.max(x.A,s.P*2)*1.1,sy=Math.pow(10,Math.floor(Math.log10(top/4))),stepY=Math.ceil(top/4/sy)*sy,
      g=U.gridMap(c,w,h,{x0:0,x1:s.n,y0:0,y1:top,sx:Math.max(1,Math.ceil(s.n/8)),sy:stepY,fy:function(v){return v>=1000?(v/1000)+'k':v}}),X=g.X,Y=g.Y,cA=function(u){return s.P*Math.pow(1+s.r/100,u)},i,u;
    // doubling guide at 2P (dashed), simple-interest line (muted), compound area 20% + 3px line (subject colour), end dot ink
    c.setLineDash([5,5]);c.strokeStyle=C.muted;c.lineWidth=1.5;c.beginPath();c.moveTo(X(0),Y(s.P*2));c.lineTo(X(s.n),Y(s.P*2));c.stroke();c.setLineDash([]);
    c.strokeStyle=C.muted;c.lineWidth=2;c.beginPath();c.moveTo(X(0),Y(s.P));c.lineTo(X(s.n),Y(x.Sm));c.stroke();
    c.fillStyle=ctx.color;c.globalAlpha=.2;c.beginPath();c.moveTo(X(0),Y(0));for(i=0;i<=60;i++){u=s.n*i/60;c.lineTo(X(u),Y(cA(u)))}c.lineTo(X(s.n),Y(0));c.closePath();c.fill();c.globalAlpha=1;
    c.strokeStyle=ctx.color;c.lineWidth=3;c.lineJoin='round';c.beginPath();for(i=0;i<=60;i++){u=s.n*i/60;i?c.lineTo(X(u),Y(cA(u))):c.moveTo(X(0),Y(s.P))}c.stroke();
    U.mdot(c,X(s.n),Y(x.A),5,C.ink)}
  upd(true);
  // phone controller (v1 LAB.interest): knob r, sliders P,n, tilt r,n
  U.gone(cv,ctx.controls({knob:'r',sliders:['P','n'],tilt:['r','n'],params:{P:{min:100,max:10000,step:100,label:'P',fmt:eur},r:{min:0,max:15,step:.5,label:'r',fmt:pct},n:{min:1,max:40,step:1,label:'n',fmt:yrs}},
    get:function(k){return ST[k]},set:function(k,v){ST[k]=v;upd()},ro:function(){return'A = '+eur(cint(ST).A)}}));
}};
})();
