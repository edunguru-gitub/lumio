(function(){
var L=window.Lumio={};window.LumioModules=window.LumioModules||{};
var K='lumio2_progress';
// lumio2_view / lumio2_theme / lumio2_lang prefs; head script applies theme + lang before first paint
L.pref=function(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}};
var ro=/^ro/i.test(L.pref('lumio2_lang')||navigator.language||''),pv=L.pref('lumio2_view')==='tabs'?'tabs':'galaxy',sysL=matchMedia('(prefers-color-scheme: light)');
L.n=function(a){return a[ro?1:0]};
L.S={back:['Back','Înapoi'],lum:['Lumens','Lumeni'],light:['Light','Luminos'],dark:['Dark','Întunecat'],galaxy:['Galaxy','Galaxie'],tabs:['Tabs','Taburi'],cont:['Continue','Continuă'],subjects:['Subjects','Materii'],
 hint:['Click: go in. Right click: go out','Click: intri. Click dreapta: ieși'],soon:['Coming soon','În curând'],of:['{a} of {b} lessons','{a} din {b} lecții'],subject:['Subject','Materie'],now:['Now','Acum'],
 home:['Home','Acasă'],missions:['Missions','Misiuni'],ranks:['Ranks','Clasament'],zin:['Go in','Intră'],zout:['Go out','Ieși'],
 alt:['Lumio galaxies. Use Tabs for keyboard navigation.','Galaxiile Lumio. Folosește Taburi pentru tastatură.']};
L.t=function(k,o){var s=L.n(L.S[k]);for(var p in o)s=s.replace('{'+p+'}',o[p]);return s};
// features (js/<id>.js) register in window.LumioFeatures; missing = skipped
L.has=function(id){return !!(window.LumioFeatures||{})[id]};
// fx stub; js/sfx.js replaces it (sounds, confetti, jump/shake, read aloud)
var nop=function(){};L.fx={canSay:false,ok:nop,bad:nop,streak:nop,pop:nop,jump:nop,shake:nop,burst:nop,say:nop,tick:nop};
L.tabOk=function(t){return t==='subjects'||L.has(t==='home'?'terminal':'ranks')};
// boot queue: runs after DOM + every registry file (loader.js); shell's own boot is first
var bq=[];L.boot=function(f){bq?bq.push(f):f()};L.boot.run=function(){var q=bq;bq=null;q.forEach(function(f){f()})};
// subjects + lessons from LumioRegistry: "subject/file" = module manifest, object = placeholder (Coming soon)
L.subjects=[];
L.build=function(){
  var R=window.LumioRegistry||{},M=window.LumioModules,by={},out=[];
  (R.lessons||[]).forEach(function(e){
    var k=typeof e==='string'?e:null,m=k?M[k]&&M[k].manifest:e;if(!m||!m.id||!m.subject)return;
    var s=by[m.subject],o=m.orbit||[(m.order||0)*1.3,70];
    if(!s){s=by[m.subject]={id:m.subject,name:m.subjectName||[m.subject,m.subject],v:m.color,lessons:[]};out.push(s)}
    s.lessons.push({id:m.id,name:m.title,mod:k&&M[k].render?k:undefined,order:m.order||0,tags:m.tags||[],a:o[0],r:o[1]});
  });
  out.forEach(function(s){s.lessons.sort(function(a,b){return a.order-b.order})});
  place(out);L.subjects=out;
};
// organic home layout: seed per device (lumio2_seed, same on reload), size k + tilt tl per subject;
// footprints (max-size galaxy + label room) never overlap; best-of-40 candidates spreads them evenly
function place(out){
  var sd=+L.pref('lumio2_seed');if(!(sd>0&&sd<2147483647)){sd=1+Math.floor(Math.random()*2147483645);L.pref('lumio2_seed',sd)}
  var r=function(){sd=sd*16807%2147483647;return sd/2147483647},A=360+80*out.length;
  var fp=function(s){var R=210*s.k;return{w:Math.max(R,150)+20,t:R*.6+20,b:R*.6+90}};
  out.forEach(function(s){s.k=.82+r()*.36;s.tl=-.55+r()*.75});
  for(;;A*=1.1){
    var ok=out.every(function(s,i){
      var f=fp(s),best=null,bs=-1;
      for(var t=0;t<40;t++){
        var x=(r()*2-1)*(A-f.w),y=-A*.75+f.t+r()*(A*1.5-f.t-f.b),sc=1e9;
        var clear=out.slice(0,i).every(function(o){var g=fp(o);sc=Math.min(sc,Math.hypot(x-o.x,(y-o.y)*1.3));return Math.abs(x-o.x)>=f.w+g.w||(y<o.y?o.y-g.t-(y+f.b):y-f.t-(o.y+g.b))>=0});
        if(clear&&sc>bs){bs=sc;best=[x,y]}
      }
      if(best){s.x=best[0];s.y=best[1]}return !!best;
    });
    if(ok)return;
  }
}
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
function eff(){return innerWidth<900&&!L.pref('lumio2_view')?'tabs':pv}
var st=L.state={level:'home',sid:null,lid:null,view:eff(),tab:'home'},subs=[];
L.on=function(f){subs.push(f)};
function emit(kind){subs.forEach(function(f){f(st,kind)})}
L.emit=emit;
L.subject=function(){return L.subjects.filter(function(s){return s.id===st.sid})[0]};
L.lesson=function(){var s=L.subject();return s&&s.lessons.filter(function(l){return l.id===st.lid})[0]};
L.go=function(level,sid,lid){st.tab='subjects';st.level=level;st.sid=level==='home'?null:sid;st.lid=level==='planet'?lid:null;emit('nav')};
L.out=function(){if(st.level==='planet')L.go('galaxy',st.sid);else if(st.level==='galaxy')L.go('home')};
L.into=function(sid,lid){if(st.level==='home')L.go('galaxy',sid);else if(st.level==='galaxy')L.go('planet',st.sid,lid)};
L.setView=function(v){pv=v;L.pref('lumio2_view',v);st.view=eff();emit('view')};
L.gal=function(){return st.tab==='subjects'&&st.view==='galaxy'};
L.setTab=function(t){if(st.level==='planet'){st.level='galaxy';st.lid=null}st.tab=t;emit('nav')};
L.theme=function(){return document.documentElement.dataset.theme||(sysL.matches?'light':'dark')};
L.setTheme=function(th){var d=document.documentElement;if(th===(sysL.matches?'light':'dark')){delete d.dataset.theme;L.pref('lumio2_theme',null)}else{d.dataset.theme=th;L.pref('lumio2_theme',th)}skin()};
L.setLang=function(g){ro=g==='ro';L.pref('lumio2_lang',g);labels();skin()};
// re-read colour tokens (theme or language changed); camera, level and progress untouched
function skin(){var cs=getComputedStyle(document.documentElement);L.subjects.forEach(function(s){s.color=cs.getPropertyValue(s.v).trim()});emit('skin')}
var $=function(i){return document.getElementById(i)},tok=0,timer=0;
function lesson(){
  var el=$('lesson'),t=++tok;clearTimeout(timer);
  if(st.level!=='planet'){el.classList.remove('on');timer=setTimeout(function(){if(t===tok)el.innerHTML=''},400);return}
  var s=L.subject(),l=L.lesson(),key=L.key(s,l);
  timer=setTimeout(function(){
    if(t!==tok)return;
    var ctx={subject:s,lesson:l,color:s.color,S:L.S,n:L.n,ui:L.ui,done:function(){L.setP(key,1);if(L.note)L.note(key,0);L.out()},
      report:function(o){return L.report?L.report(key,o):false},award:function(n){n=L.award?L.award(key,n):0;gain(n);return n},fx:L.fx,streak:function(){return L.stats?L.stats.streak:0},
      controls:function(d){return L.controls?L.controls(key,d,ctx):nop}}; // js/phone.js: lab controls (v1 LAB shape), returns unregister
    el.innerHTML='';
    var box=document.createElement('div');box.className='lesson-in';el.appendChild(box);
    var soon=function(){var h=document.createElement('h1');h.textContent=L.n(l.name);var p=document.createElement('p');p.textContent=L.n(L.S.soon);box.append(h,p)};
    if(!l.mod)soon();else L.Loader.load(l.mod).then(function(m){if(t===tok)m.render(box,ctx)},function(){if(t===tok)soon()});
    el.classList.add('on');el.scrollTop=0;
  },L.gal()&&!L.reduced()?600:0);
}
// reward pop: '+N Lumens' (Lumens colour), fades; Reduce motion = no movement
function gain(n){var g=$('gain');if(!n)return;g.textContent='+'+n+' '+L.n(L.S.lum);g.classList.remove('on');void g.offsetWidth;g.classList.add('on')}
function chrome(){
  var s=L.subject(),l=L.lesson();
  $('crumb').textContent=st.tab!=='subjects'||st.level==='home'?'':L.n(s.name)+(l?' / '+L.n(l.name):'');
  $('back').hidden=st.tab!=='subjects'||st.level==='home';
  var bd=document.body.dataset;bd.view=st.view;bd.level=st.level;bd.tab=st.tab;
  var gh=$('ghead'),c;gh.replaceChildren();gh.hidden=st.level!=='galaxy';
  if(st.level==='galaxy'){gh.append(L.head(s,L.n(L.S.galaxy)));if(c=L.contBtn(s))gh.append(c)}
  $('cback').disabled=st.level==='home';
  document.querySelectorAll('#gview button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===st.view)});
  document.querySelectorAll('#gtheme button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.th===L.theme())});
  document.querySelectorAll('#glang button').forEach(function(b){b.setAttribute('aria-pressed',(b.dataset.lg==='ro')===ro)});
  document.querySelectorAll('#top button').forEach(function(b){if(b.dataset.t===st.tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  ['top','gview','gtheme','glang'].forEach(function(i){L.seg($(i))});
}
// segmented control: --i/--n place the raised thumb under the pressed/current segment (CSS)
L.seg=function(el){var b=[].filter.call(el.children,function(x){return !x.hidden}),i=b.findIndex(function(x){return x.matches('[aria-pressed=true],[aria-current=page]')});
  el.style.setProperty('--n',b.length||1);el.style.setProperty('--i',Math.max(0,i));el.classList.toggle('noth',i<0)};
function labels(){
  document.documentElement.lang=ro?'ro':'en';
  var bk=$('back');bk.replaceChildren('← ',L.ui.el('span',L.n(L.S.back)));bk.setAttribute('aria-label',L.n(L.S.back));$('cback').textContent=L.n(L.S.back);
  $('zin').setAttribute('aria-label',L.n(L.S.zin));$('zout').setAttribute('aria-label',L.n(L.S.zout));
  document.querySelectorAll('#gview button').forEach(function(b){b.textContent=L.n(L.S[b.dataset.v])});
  document.querySelectorAll('#gtheme button').forEach(function(b){b.textContent=L.n(L.S[b.dataset.th])});
  document.querySelectorAll('#top button').forEach(function(b){b.textContent=L.n(L.S[b.dataset.t])});
  $('cv').setAttribute('aria-label',L.n(L.S.alt));
}
L.on(function(s,kind){if(kind==='stats')return;if(kind!=='progress'&&kind!=='view')lesson();chrome()});
L.boot(function(){
  L.build();if(!L.tabOk(st.tab))st.tab='subjects';
  document.querySelectorAll('#top button').forEach(function(b){b.hidden=!L.tabOk(b.dataset.t)});
  var cs=getComputedStyle(document.documentElement);
  L.subjects.forEach(function(s){s.color=cs.getPropertyValue(s.v).trim()});
  labels();$('back').onclick=$('cback').onclick=$('zout').onclick=L.out;
  document.querySelectorAll('#gview button').forEach(function(b){b.onclick=function(){L.setView(b.dataset.v)}});
  document.querySelectorAll('#gtheme button').forEach(function(b){b.onclick=function(){L.setTheme(b.dataset.th)}});
  document.querySelectorAll('#glang button').forEach(function(b){b.onclick=function(){L.setLang(b.dataset.lg)}});
  document.querySelectorAll('#top button').forEach(function(b){b.onclick=function(){L.setTab(b.dataset.t)}});
  sysL.addEventListener('change',function(){if(!document.documentElement.dataset.theme)skin()});
  addEventListener('resize',function(){if(eff()!==st.view){st.view=eff();emit('view')}});
  document.addEventListener('keydown',function(e){
    var t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)return;
    if(e.key==='Escape'||e.key==='Backspace'&&st.level!=='planet'){e.preventDefault();L.out()}
  });
  chrome();
});
})();
