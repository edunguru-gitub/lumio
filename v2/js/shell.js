(function(){
var L=window.Lumio={};window.LumioModules=window.LumioModules||{};
var K='lumio2_progress',ro=/^ro/i.test(navigator.language||'');
L.n=function(a){return a[ro?1:0]};
L.S={back:['Back','Înapoi'],terminal:['Terminal','Terminal'],galaxy:['Galaxy','Galaxie'],tabs:['Tabs','File'],cont:['Continue','Continuă'],subjects:['Subjects','Materii'],
 hint:['Click: go in. Right click: go out','Click: intri. Click dreapta: ieși'],soon:['Coming soon','În curând'],of:['{a} of {b} lessons','{a} din {b} lecții'],subject:['Subject','Materie'],now:['Now','Acum'],
 home:['Home','Acasă'],missions:['Missions','Misiuni'],ranks:['Ranks','Clasament'],zin:['Go in','Intră'],zout:['Go out','Ieși'],
 alt:['Lumio galaxies. Use Tabs for keyboard navigation.','Galaxiile Lumio. Folosește File pentru tastatură.']};
L.subjects=[
 {id:'physics',name:['Physics','Fizică'],v:'--physics',x:-300,y:-200,lessons:[
  {id:'optics',name:['Optics','Optică'],mod:'physics/optics',a:-.6,r:62},{id:'waves',name:['Waves','Unde'],a:1.4,r:80},{id:'mechanics',name:['Mechanics','Mecanică'],a:3.4,r:55},{id:'gas',name:['Gas & piston','Gaz și piston'],mod:'physics/gas',a:2.4,r:100}]},
 {id:'math',name:['Math','Matematică'],v:'--math',x:300,y:-200,lessons:[
  {id:'algebra',name:['Algebra','Algebră'],mod:'math/algebra',a:-.4,r:70},{id:'parabola',name:['Parabola','Parabola'],mod:'math/parabola',a:.75,r:95},{id:'geometry',name:['Geometry','Geometrie'],mod:'math/pythagoras',a:1.9,r:60},{id:'fractions',name:['Fractions','Fracții'],a:3.8,r:82}]},
 {id:'spanish',name:['Spanish','Spaniolă'],v:'--spanish',x:-300,y:200,lessons:[
  {id:'greetings',name:['Greetings','Salutări'],a:-1,r:66},{id:'verbs',name:['Verbs','Verbe'],a:1.1,r:78},{id:'numbers',name:['Numbers','Numere'],a:3.3,r:58}]},
 {id:'life',name:['Life skills','Abilități de viață'],v:'--life',x:300,y:200,lessons:[
  {id:'budgeting',name:['Budgeting','Buget'],a:-.8,r:60},{id:'focus',name:['Focus','Concentrare'],a:1.5,r:80},{id:'sleep',name:['Sleep','Somn'],a:3.6,r:64}]}
];
L.reduced=function(){return matchMedia('(prefers-reduced-motion: reduce)').matches};
var prog={};
try{var p=JSON.parse(localStorage.getItem(K));if(p&&typeof p==='object')prog=p}catch(e){}
L.key=function(s,l){return s.id+'/'+l.id};
L.getP=function(k){return Math.max(0,Math.min(1,+prog[k]||0))};
L.setP=function(k,v){prog[k]=v;try{localStorage.setItem(K,JSON.stringify(prog))}catch(e){}emit('progress')};
L.done=function(s){return s.lessons.filter(function(l){return L.getP(L.key(s,l))>=1}).length};
L.count=function(s){return L.n(L.S.of).replace('{a}',L.done(s)).replace('{b}',s.lessons.length)};
L.cur=function(s){return s.lessons.filter(function(l){return l.mod&&L.getP(L.key(s,l))<1})[0]};
// subject header: eyebrow, tinted title, progress bar, count
L.head=function(s,eye){
  var U=L.ui,d=U.el('div',null,'head'),bar=U.el('div',null,'pbar'),b=U.el('i');
  d.style.setProperty('--c',s.color);b.style.width=L.done(s)/s.lessons.length*100+'%';bar.appendChild(b);
  d.append(U.el('small',eye),U.el('h2',L.n(s.name)),bar,U.el('p',L.count(s),'cnt'));return d;
};
L.contBtn=function(s){
  var l=L.cur(s);if(!l)return null;
  var b=L.ui.el('button',L.n(L.S.cont)+' '+L.n(l.name)+' →','btn-primary sm');b.type='button';b.style.setProperty('--c',s.color);
  b.onclick=function(){L.go('planet',s.id,l.id)};return b;
};
L.sp=function(s){var t=0;s.lessons.forEach(function(l){t+=L.getP(L.key(s,l))});return t/s.lessons.length};
var st=L.state={level:'home',sid:null,lid:null,view:'terminal'},subs=[];
L.on=function(f){subs.push(f)};
function emit(kind){subs.forEach(function(f){f(st,kind)})}
L.emit=emit;
L.subject=function(){return L.subjects.filter(function(s){return s.id===st.sid})[0]};
L.lesson=function(){var s=L.subject();return s&&s.lessons.filter(function(l){return l.id===st.lid})[0]};
L.go=function(level,sid,lid){st.level=level;st.sid=level==='home'?null:sid;st.lid=level==='planet'?lid:null;emit('nav')};
L.out=function(){if(st.level==='planet')L.go('galaxy',st.sid);else if(st.level==='galaxy')L.go('home')};
L.into=function(sid,lid){if(st.level==='home')L.go('galaxy',sid);else if(st.level==='galaxy')L.go('planet',st.sid,lid)};
L.setView=function(v){st.view=v;emit('view')};
var $=function(i){return document.getElementById(i)},tok=0,timer=0;
function lesson(){
  var el=$('lesson'),t=++tok;clearTimeout(timer);
  if(st.level!=='planet'){el.classList.remove('on');timer=setTimeout(function(){if(t===tok)el.innerHTML=''},400);return}
  var s=L.subject(),l=L.lesson(),key=L.key(s,l);
  timer=setTimeout(function(){
    if(t!==tok)return;
    var ctx={subject:s,lesson:l,color:s.color,S:L.S,n:L.n,ui:L.ui,done:function(){L.fresh={k:key,from:L.rate(key)};L.setP(key,1);L.note(key,0);L.out()},
      report:function(o){return L.report(key,o)},award:function(n){return L.award(key,n)}};
    el.innerHTML='';
    var box=document.createElement('div');box.className='lesson-in';el.appendChild(box);
    var soon=function(){var h=document.createElement('h1');h.textContent=L.n(l.name);var p=document.createElement('p');p.textContent=L.n(L.S.soon);box.append(h,p)};
    if(!l.mod)soon();else L.Loader.load(l.mod).then(function(m){if(t===tok)m.render(box,ctx)},function(){if(t===tok)soon()});
    el.classList.add('on');el.scrollTop=0;
  },st.view==='galaxy'&&!L.reduced()?600:0);
}
function chrome(){
  var s=L.subject(),l=L.lesson();
  $('crumb').textContent=st.level==='home'?L.n(L.S.subjects):L.n(s.name)+(l?' / '+L.n(l.name):'');
  $('back').disabled=st.level==='home';
  document.body.dataset.view=st.view;document.body.dataset.level=st.level;
  var gh=$('ghead'),c;gh.replaceChildren();gh.hidden=st.level!=='galaxy';
  if(st.level==='galaxy'){gh.append(L.head(s,L.n(L.S.galaxy)));if(c=L.contBtn(s))gh.append(c)}
  $('cback').disabled=st.level==='home';
  document.querySelectorAll('#toggle button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===st.view)});
}
L.on(function(s,kind){if(kind==='stats')return;if(kind!=='progress')lesson();chrome()});
document.addEventListener('DOMContentLoaded',function(){
  var cs=getComputedStyle(document.documentElement);
  L.subjects.forEach(function(s){s.color=cs.getPropertyValue(s.v).trim()});
  document.documentElement.lang=ro?'ro':'en';
  $('back').textContent='← '+L.n(L.S.back);$('back').onclick=$('cback').onclick=$('zout').onclick=L.out;$('cback').textContent=L.n(L.S.back);
  $('zin').setAttribute('aria-label',L.n(L.S.zin));$('zout').setAttribute('aria-label',L.n(L.S.zout));
  document.querySelectorAll('#toggle button').forEach(function(b){b.textContent=L.n(L.S[b.dataset.v]);b.onclick=function(){L.setView(b.dataset.v)}});
  $('cv').setAttribute('aria-label',L.n(L.S.alt));
  st.view='terminal';
  document.addEventListener('keydown',function(e){
    var t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)return;
    if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();L.out()}
  });
  chrome();
});
})();
