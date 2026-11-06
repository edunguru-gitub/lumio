(function(){
var L=window.Lumio={};window.LumioModules=window.LumioModules||{};
var K='lumio2_progress',ro=/^ro/i.test(navigator.language||'');
L.n=function(a){return a[ro?1:0]};
L.S={back:['Back','Înapoi'],galaxy:['Galaxy','Galaxie'],tabs:['Tabs','File'],cont:['Continue','Continuă'],subjects:['Subjects','Materii'],
 hint:['Click: go in. Right click: go out','Click: intri. Click dreapta: ieși'],soon:['Coming soon','În curând'],
 alt:['Lumio galaxies. Use Tabs for keyboard navigation.','Galaxiile Lumio. Folosește File pentru tastatură.']};
L.subjects=[
 {id:'physics',name:['Physics','Fizică'],v:'--physics',x:-300,y:-200,lessons:[
  {id:'optics',name:['Optics','Optică'],mod:'physics/optics',a:-.6,r:62},{id:'waves',name:['Waves','Unde'],a:1.4,r:80},{id:'mechanics',name:['Mechanics','Mecanică'],a:3.4,r:55}]},
 {id:'math',name:['Math','Matematică'],v:'--math',x:300,y:-200,lessons:[
  {id:'algebra',name:['Algebra','Algebră'],a:-.4,r:70},{id:'geometry',name:['Geometry','Geometrie'],a:1.9,r:60},{id:'fractions',name:['Fractions','Fracții'],a:3.8,r:82}]},
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
L.sp=function(s){var t=0;s.lessons.forEach(function(l){t+=L.getP(L.key(s,l))});return t/s.lessons.length};
var st=L.state={level:'home',sid:null,lid:null,view:'galaxy'},subs=[];
L.on=function(f){subs.push(f)};
function emit(kind){subs.forEach(function(f){f(st,kind)})}
L.subject=function(){return L.subjects.filter(function(s){return s.id===st.sid})[0]};
L.lesson=function(){var s=L.subject();return s&&s.lessons.filter(function(l){return l.id===st.lid})[0]};
L.go=function(level,sid,lid){st.level=level;st.sid=level==='home'?null:sid;st.lid=level==='planet'?lid:null;emit('nav')};
L.out=function(){if(st.level==='planet')L.go('galaxy',st.sid);else if(st.level==='galaxy')L.go('home')};
L.into=function(sid,lid){if(st.level==='home')L.go('galaxy',sid);else if(st.level==='galaxy')L.go('planet',st.sid,lid)};
L.setView=function(v){st.view=v;emit('view')};
var $=function(i){return document.getElementById(i)},tok=0,timer=0;
function lesson(){
  var el=$('lesson'),t=++tok;clearTimeout(timer);
  if(st.level!=='planet'){el.classList.remove('on');return}
  var s=L.subject(),l=L.lesson(),key=L.key(s,l);
  timer=setTimeout(function(){
    if(t!==tok)return;
    var ctx={subject:s,lesson:l,color:s.color,S:L.S,n:L.n,done:function(){L.setP(key,1);L.out()}};
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
  document.body.dataset.view=st.view;
  document.querySelectorAll('#toggle button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===st.view)});
}
L.on(function(s,kind){if(kind!=='progress')lesson();chrome()});
document.addEventListener('DOMContentLoaded',function(){
  var cs=getComputedStyle(document.documentElement);
  L.subjects.forEach(function(s){s.color=cs.getPropertyValue(s.v).trim()});
  document.documentElement.lang=ro?'ro':'en';
  $('back').textContent='← '+L.n(L.S.back);$('back').onclick=L.out;
  document.querySelectorAll('#toggle button').forEach(function(b){b.textContent=L.n(L.S[b.dataset.v]);b.onclick=function(){L.setView(b.dataset.v)}});
  $('cv').setAttribute('aria-label',L.n(L.S.alt));
  st.view=innerWidth<700?'tabs':'galaxy';
  document.addEventListener('keydown',function(e){
    var t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)return;
    if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();L.out()}
  });
  chrome();
});
})();
