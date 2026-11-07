(function(){
// feature 'phone' (parity P3, docs/spec-phone-controller.md): v1 phone controller (Ctl: knob, sliders, tilt pad, Motion, Center, read-out),
// layouts Desktop / Hybrid (phone mockup dock, side or floating) / Phone (?role=phone or width<700: controller under the lab canvas),
// sync = BroadcastChannel 'incognia-sync' (Live tab) + LAN relay app/Lumio.cmd (/api/info, SSE /events, POST /send, pairing token), Connect dialog with QR.
// Lessons call ctx.controls(def) with the v1 LAB shape {knob,sliders,tilt,params:{k:{min,max,step,label,fmt}},get,set,ro}. Absent = no controller, no Link pill.
var L=Lumio,U=L.ui,F=window.LumioFeatures=window.LumioFeatures||{},TAB=Math.random().toString(36).slice(2,10),
q=new URLSearchParams(location.search),role=q.get('role')==='phone',http=/^https?:/.test(location.protocol),rm=matchMedia('(prefers-reduced-motion: reduce)'),
S={link:['Link','Link'],cd_t:['Connect your phone','Conectează telefonul'],cd_s:['Scan with the camera. No app, no typing.','Scanează cu camera. Fără aplicație, fără tastat.'],
 cd_1:['Scan the code with your phone camera','Scanează codul cu camera telefonului'],cd_2:['If the phone shows a warning, tap Advanced → Continue','Dacă telefonul arată un avertisment, apasă Avansat → Continuă'],
 cd_2c:['this is your own computer','este propriul tău calculator'],cd_3:['Wait for the check mark','Așteaptă bifa'],cd_wait:['Waiting for your phone…','Se așteaptă telefonul…'],cd_ok:['Phone connected','Telefon conectat'],
 cd_copy:['Copy','Copiază'],cd_copied:['Copied','Copiat'],cd_other:['Other address','Altă adresă'],cd_help:['Having trouble?','Ai probleme?'],
 cd_h1:['Phone and laptop must be on the same Wi-Fi (or the laptop on the phone hotspot).','Telefonul și laptopul trebuie să fie pe același Wi-Fi (sau laptopul pe hotspotul telefonului).'],
 cd_h2:['If Windows asks, tick “Private networks” and click Allow.','Dacă Windows întreabă, bifează „Rețele private” și apasă Permite.'],
 cd_nomo:['Motion controls unavailable, touch controls work.','Controlul prin mișcare nu e disponibil, controlul tactil funcționează.'],
 cd_none:['No network found. Connect the laptop to Wi-Fi, then try again.','Nu am găsit nicio rețea. Conectează laptopul la Wi-Fi și încearcă din nou.'],
 cd_still:['Still waiting? Check that both devices use the same Wi-Fi, then press Connect again.','Încă aștepți? Verifică dacă ambele dispozitive sunt pe același Wi-Fi, apoi apasă din nou Conectează.'],
 cn_file:['To link a phone, start Lumio.cmd on this laptop (lumio.html next to it), then open http://localhost:8080.','Ca să conectezi un telefon, pornește Lumio.cmd pe laptop (cu lumio.html lângă el), apoi deschide http://localhost:8080.'],
 cn_to:['Connected to {h}','Conectat la {h}'],cn_old:['Old QR code · scan the new one on the laptop','Cod QR vechi · scanează-l pe cel nou de pe laptop'],
 cn_err:["Can't reach the laptop. Same Wi-Fi?",'Laptopul nu răspunde. Aceeași rețea Wi-Fi?'],cn_off:['Disconnected · retrying…','Deconectat · reîncerc…'],
 ch_phone:['Phone','Telefon'],ch_re:['Reconnecting…','Se reconectează…'],ch_full:['Phone connected to {h}','Telefon conectat la {h}'],ch_conn:['Connected','Conectat'],ch_not:['Not connected','Neconectat'],
 quit:['Quit Lumio','Închide Lumio'],quit_c:['Stops the local server','Oprește serverul local'],quit_ok:['Lumio stopped. You can close this tab.','Lumio s-a oprit. Poți închide fila.'],close:['Close','Închide'],
 layout:['Layout mode','Mod afișare'],desktop:['Desktop','Desktop'],hybrid:['Hybrid Demo','Demo hibrid'],phone:['Phone','Telefon'],dock:['Hybrid phone','Telefon hibrid'],side:['Side-by-side','Alăturat'],float:['Floating','Plutitor'],
 tabsync:['Live tab sync (phone ↔ desktop)','Sincronizare live între file (telefon ↔ desktop)'],
 tabsync_h:['Open Lumio in a second tab or window, switch it to Phone mode: its controls, sliders and tilt pad now drive this tab in real time (same browser).','Deschide Lumio într-o a doua filă, treci-o în modul Telefon: butoanele, sliderele și padul ei controlează acum această filă în timp real (același browser).'],
 ctl:['Phone controller','Controler telefon'],motion:['Motion','Mișcare'],center:['Center','Centru'],tilt:['Tilt','Înclinare'],
 none:['Open a lab (Gas, Parabola or Geometry) to use the phone controller.','Deschide un laborator (Gaz, Parabolă sau Geometrie) ca să folosești controlerul.'],
 nosensor:['No motion sensor found — use the tilt pad.','Nu există senzor de mișcare — folosește padul.'],sensor:['Motion sensors on','Senzori de mișcare activi'],denied:['Motion permission denied','Permisiune refuzată']},
t=function(k,o){var s=L.n(S[k]);for(var p in o)s=s.replace('{'+p+'}',o[p]);return s},
clamp=function(v,a,b){return Math.min(b,Math.max(a,v))},
nm=function(p){return Array.isArray(p.label)?L.n(p.label):p.label};
// lumio2_phone {mode, tabsync, dock, seen}; ?role=phone forces Phone mode (not saved)
var cfg={};try{cfg=JSON.parse(L.pref('lumio2_phone'))||{}}catch(e){}
if(['desktop','hybrid','phone'].indexOf(cfg.mode)<0)cfg.mode=innerWidth<700?'phone':'desktop';
if(cfg.dock!=='float')cfg.dock='side';cfg.tabsync=cfg.tabsync===true;
var mode=role?'phone':cfg.mode;
function save(){L.pref('lumio2_phone',JSON.stringify(cfg))}
function phoneSide(){return role||mode==='phone'}

/* ---- lab registry: one live def (the open lesson); remote values for a closed lab wait in pend ---- */
var cur=null,pend={},sent={},raf=0,rnav=0;
function known(key){return L.subjects.some(function(s){return s.lessons.some(function(l){return L.key(s,l)===key})})}
function setP(key,k,v,remote){
  if(!cur||cur.key!==key){if(remote&&known(key))(pend[key]=pend[key]||{})[k]=v;return}
  var d=cur.def,p=d.params[k];if(!p)return;v=+clamp(Math.round(v/p.step)*p.step,p.min,p.max).toFixed(3);if(remote)sent[k]=v;if(d.get(k)===v)return;d.set(k,v)}
L.controls=function(key,def,ctx){
  cur={key:key,def:def,ctx:ctx};var pv=pend[key];delete pend[key];for(var k in pv)setP(key,k,pv[k],true);
  sent={};for(k in def.params)sent[k]=def.get(k);mount();if(!raf)raf=requestAnimationFrame(tick);
  return function(){if(cur&&cur.def===def){cur=null;mount()}}};
// every frame: changes made anywhere in the lesson (its sliders, chips, drag, this controller) go out once; then the controller follows the lab
function tick(now){raf=0;if(!cur)return;raf=requestAnimationFrame(tick);var d=cur.def;
  for(var k in d.params){var v=d.get(k);if(sent[k]!==v){sent[k]=v;bc('param',{lab:cur.key,k:k,v:v})}}sync()}
function snap(){var o={};if(cur){o[cur.key]={};for(var k in cur.def.params)o[cur.key][k]=cur.def.get(k)}return o}

/* ---- controller (v1 Ctl, karc, knob/tilt/slider handlers, applyTilt, enableMotion, onOri, syncCtl) ---- */
var Ctl={el:null,c:null,drag:null,last:{},sl:{},ou:{},motion:false,seen:false,fx:null,fy:null},dock,phoneEl,screen;
function karc(a0,a1,r){r=r||38;var p=function(a){return[50+r*Math.sin(a*Math.PI/180),50-r*Math.cos(a*Math.PI/180)]},s=p(a0),e=p(a1);return'M'+s[0].toFixed(2)+' '+s[1].toFixed(2)+'A'+r+' '+r+' 0 '+(a1-a0>180?1:0)+' 1 '+e[0].toFixed(2)+' '+e[1].toFixed(2)}
var knobSVG='<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" style="fill:var(--card);stroke:var(--edge)" stroke-width="2"/><path d="'+karc(-135,135)+'" fill="none" style="stroke:var(--edge)" stroke-width="7" stroke-linecap="round"/><path class="kv2" d="" fill="none" style="stroke:var(--c)" stroke-width="7" stroke-linecap="round"/><g class="kp"><line x1="50" y1="30" x2="50" y2="19" style="stroke:var(--ink)" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="17" r="4.5" style="fill:var(--c);stroke:var(--ink)" stroke-width="2"/></g></svg>';
function live(){return !!(cur&&L.state.level==='planet'&&L.subject()&&L.lesson()&&cur.key===L.key(L.subject(),L.lesson()))}
function mount(){
  document.querySelectorAll('.pctl').forEach(function(e){e.remove()});if(screen)screen.replaceChildren();Ctl.el=Ctl.c=null;
  if(phoneEl)phoneEl.style.transform='';
  var c=live()?cur:null;
  if(mode==='hybrid')build(screen,c);
  else if(mode==='phone'&&c){var cv=document.querySelector('#lesson .lab-cv'),box=U.el('section',null,'pctl');box.setAttribute('aria-label',t('ctl'));if(cv){cv.after(box);build(box,c)}}
}
function build(el,c){
  var pui=U.el('div',null,'pui'),head=U.el('div',null,'phead');Ctl.el=el;Ctl.c=c;Ctl.drag=null;Ctl.last={};Ctl.sl={};Ctl.ou={};
  if(c)el.style.setProperty('--c',c.ctx.color);
  Ctl.live=U.el('i',null,'live');head.append(U.el('span',c?L.n(c.ctx.lesson.name):'Lumio'),Ctl.live);pui.append(head);el.append(pui);lamp();
  if(!c){var sh=U.el('div',null,'pshort');
    [['physics','gas'],['math','parabola'],['math','geometry']].forEach(function(p){var s=L.subjects.filter(function(x){return x.id===p[0]})[0],l=s&&s.lessons.filter(function(x){return x.id===p[1]&&x.mod})[0];
      if(l){var b=U.el('button',L.n(l.name),'chip');b.type='button';b.onclick=function(){L.go('planet',s.id,l.id)};sh.append(b)}});
    pui.append(U.el('p',t('none'),'pnone'),sh);return}
  var d=c.def,key=c.key,kp=d.params[d.knob],row=U.el('div',null,'prow'),kc=U.el('div'),kn=U.el('div',null,'knob'),psl=U.el('div',null,'psl'),
      tr=U.el('div',null,'ptilt'),tl=U.el('div',null,'tilt'),pb=U.el('div',null,'pbtn'),cap=U.el('small');
  Ctl.ro=U.el('div',null,'pro');Ctl.msg=U.el('p',null,'pmsg');Ctl.msg.setAttribute('role','status');
  kn.innerHTML=knobSVG;kn.append(Ctl.kv=U.el('div',null,'kv'));kn.tabIndex=0;kn.setAttribute('role','slider');kn.setAttribute('aria-label',nm(kp));
  kn.setAttribute('aria-valuemin',kp.min);kn.setAttribute('aria-valuemax',kp.max);kc.append(kn,U.el('div',nm(kp),'kl'));Ctl.knob=kn;
  d.sliders.forEach(function(k){var p=d.params[k],w=U.el('label',null,'ps'),b=U.el('b'),sw=U.el('div',null,'sl'),i=U.el('input');
    i.type='range';i.min=p.min;i.max=p.max;i.step=p.step;sw.style.setProperty('--n',Math.round((p.max-p.min)/p.step));sw.append(i);
    w.append(U.el('span',nm(p)),b,sw);psl.append(w);Ctl.sl[k]=i;Ctl.ou[k]=b;
    i.addEventListener('input',function(){L.fx.tick();setP(key,k,+i.value)});i.addEventListener('pointerdown',function(){Ctl.drag='sl'+k});i.addEventListener('pointerup',function(){Ctl.drag=null})});
  row.append(kc,psl);
  tl.append(Ctl.puck=U.el('i'));Ctl.tilt=tl;tl.setAttribute('aria-hidden','true');
  cap.append(U.el('b',t('tilt')),U.el('br'),'↔ '+nm(d.params[d.tilt[0]])+' · ↕ '+nm(d.params[d.tilt[1]]));
  var mb=U.el('button',t('motion'),'chip'),cb=U.el('button',t('center'),'chip');mb.type=cb.type='button';mb.onclick=enableMotion;cb.onclick=function(){applyTilt(0,0)};
  pb.append(cap,mb,cb);tr.append(tl,pb);pui.append(Ctl.ro,row,tr,Ctl.msg);
  var kmove=function(e){var r=kn.getBoundingClientRect(),ang=Math.atan2(e.clientX-(r.left+r.width/2),-(e.clientY-(r.top+r.height/2)))*180/Math.PI,cu=(d.get(d.knob)-kp.min)/(kp.max-kp.min);
    if(Math.abs(ang)>135)ang=cu<.5?-135:135;setP(key,d.knob,kp.min+(ang+135)/270*(kp.max-kp.min))};
  kn.addEventListener('pointerdown',function(e){kn.setPointerCapture(e.pointerId);Ctl.drag='knob';kmove(e)});kn.addEventListener('pointermove',function(e){if(Ctl.drag==='knob')kmove(e)});
  ['pointerup','pointercancel'].forEach(function(n){kn.addEventListener(n,function(){Ctl.drag=null})});
  kn.addEventListener('keydown',function(e){var v=d.get(d.knob),s=kp.step,m={ArrowUp:v+s,ArrowRight:v+s,ArrowDown:v-s,ArrowLeft:v-s,PageUp:v+s*5,PageDown:v-s*5,Home:kp.min,End:kp.max}[e.key];
    if(m===undefined)return;e.preventDefault();setP(key,d.knob,m)});
  var tmove=function(e){var r=tl.getBoundingClientRect();applyTilt(clamp((e.clientX-r.left)/r.width*2-1,-1,1),clamp((e.clientY-r.top)/r.height*2-1,-1,1))};
  tl.addEventListener('pointerdown',function(e){tl.setPointerCapture(e.pointerId);Ctl.drag='tilt';tmove(e)});tl.addEventListener('pointermove',function(e){if(Ctl.drag==='tilt')tmove(e)});
  ['pointerup','pointercancel'].forEach(function(n){tl.addEventListener(n,function(){Ctl.drag=null;if(phoneEl)phoneEl.style.transform=''})});
  sync();
}
// x,y in -1..1 → the two tilt params; Hybrid: the mockup leans with the puck (6 deg max, none on Reduce motion)
function applyTilt(x,y){var c=Ctl.c;if(!c)return;var d=c.def,kx=d.tilt[0],ky=d.tilt[1],px=d.params[kx],py=d.params[ky];
  setP(c.key,kx,px.min+(x+1)/2*(px.max-px.min));setP(c.key,ky,py.min+(1-y)/2*(py.max-py.min));
  if(mode==='hybrid'&&phoneEl&&!rm.matches)phoneEl.style.transform='rotateY('+x*6+'deg) rotateX('+(-y*6)+'deg)'}
function say(k){if(Ctl.msg)Ctl.msg.textContent=t(k)}
function enableMotion(){
  var go=function(){if(!Ctl.motion){addEventListener('deviceorientation',onOri);Ctl.motion=true}Ctl.seen=false;say('sensor');setTimeout(function(){if(!Ctl.seen)say('nosensor')},1800)};
  try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function')
    DeviceOrientationEvent.requestPermission().then(function(r){r==='granted'?go():say('denied')},function(){say('nosensor')});else go()}catch(e){say('nosensor')}}
function onOri(e){if(e.gamma==null&&e.beta==null)return;Ctl.seen=true;if(Ctl.drag||!Ctl.c)return;
  var gx=clamp((e.gamma||0)/40,-1,1),gy=clamp(((e.beta||45)-45)/40,-1,1),f=Ctl.fx==null?1:.35;
  Ctl.fx=Ctl.fx==null?gx:Ctl.fx+(gx-Ctl.fx)*f;Ctl.fy=Ctl.fy==null?gy:Ctl.fy+(gy-Ctl.fy)*f;applyTilt(Ctl.fx,Ctl.fy)}
function sync(){var c=Ctl.c;if(!c||!Ctl.el.isConnected)return;var d=c.def,La=Ctl.last,v;
  d.sliders.forEach(function(k){v=d.get(k);if(La['s'+k]!==v){La['s'+k]=v;var p=d.params[k],i=Ctl.sl[k];if(Ctl.drag!=='sl'+k)i.value=v;i.parentNode.style.setProperty('--p',(v-p.min)/(p.max-p.min));Ctl.ou[k].textContent=p.fmt(v)}});
  var kp=d.params[d.knob],kv=d.get(d.knob);if(La.kn!==kv){La.kn=kv;var ang=-135+(kv-kp.min)/(kp.max-kp.min)*270;
    Ctl.knob.querySelector('.kp').setAttribute('transform','rotate('+ang+' 50 50)');Ctl.knob.querySelector('.kv2').setAttribute('d',ang>-134?karc(-135,ang):'');
    Ctl.kv.textContent=kp.fmt(kv);Ctl.knob.setAttribute('aria-valuenow',kv);Ctl.knob.setAttribute('aria-valuetext',kp.fmt(kv))}
  if(Ctl.drag!=='tilt'){var px=d.params[d.tilt[0]],py=d.params[d.tilt[1]],x=(d.get(d.tilt[0])-px.min)/(px.max-px.min)*2-1,y=1-(d.get(d.tilt[1])-py.min)/(py.max-py.min)*2,k2=x+','+y+','+Ctl.tilt.offsetWidth;
    if(La.tl!==k2){La.tl=k2;var W=(Ctl.tilt.offsetWidth||120)/2-14;Ctl.puck.style.transform='translate('+x*W+'px,'+y*W+'px)'}}
  var ro=d.ro();if(La.ro!==ro){La.ro=ro;Ctl.ro.textContent=ro}}
function setMode(m){mode=cfg.mode=m;save();document.body.dataset.pmode=m;Net.on&&Net.connect();mount();pill()}

/* ---- sync: BroadcastChannel (Live tab) + LAN relay (v1 Net, bc, onRemote) ---- */
var BC=null;
function syncOn(){try{if(cfg.tabsync&&'BroadcastChannel' in window){if(!BC){BC=new BroadcastChannel('incognia-sync');BC.onmessage=function(e){onRemote(e.data)}}}else if(BC){BC.close();BC=null}}catch(e){BC=null}}
var Net={on:false,es:null,info:null,peers:0,phones:0,host:'',err:false,old:false,q:{},qt:null,
  tok:(function(){var x=q.get('t');try{if(x)sessionStorage.setItem('lumio2_t',x);return x||sessionStorage.getItem('lumio2_t')}catch(e){return x}})(),
  init:function(){var N=this;if(!http||/github\.io$/.test(location.hostname))return pill();
    fetch('/api/info'+(N.tok?'?t='+encodeURIComponent(N.tok):''),{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
      if(!j||j.app!=='incognia')throw 0;N.info=j;N.host=j.host;if(j.token)N.tok=j.token;
      if(!N.tok||role&&!j.token){N.err=true;N.old=role&&!!N.tok;pill();return}N.old=false;N.connect();
      if(!phoneSide()&&!cfg.seen){cfg.seen=true;save();setTimeout(open,900)}}).catch(function(){N.err=role;pill()})},
  connect:function(){var N=this;if(N.es)N.es.close();N.es=new EventSource('/events?t='+encodeURIComponent(N.tok)+'&role='+(phoneSide()?'phone':'desk'));
    N.es.onopen=function(){N.on=true;N.err=false;pill();N.send({type:'hello'})};
    N.es.onerror=function(){N.on=false;pill();if(N.es.readyState===2){N.err=true;pill();setTimeout(function(){N.init()},4000)}};
    N.es.onmessage=function(e){var d;try{d=JSON.parse(e.data)}catch(x){return}(Array.isArray(d)?d:[d]).forEach(onRemote)}},
  send:function(m){var N=this;if(!N.on)return;m.from=m.from||TAB;if(m.type==='param'){N.q[m.lab+'.'+m.k]=m;if(!N.qt)N.qt=setTimeout(function(){N.flush()},33);return}N.flush();N.post([m])},
  flush:function(){clearTimeout(this.qt);this.qt=null;var a=Object.keys(this.q).map(function(k){return this.q[k]},this);this.q={};if(a.length)this.post(a)},
  post:function(a){fetch('/send?t='+encodeURIComponent(this.tok||''),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(a)}).catch(function(){})}};
function bc(type,data){var m={type:type,from:TAB};for(var k in data)m[k]=data[k];if(BC)try{BC.postMessage(m)}catch(e){}Net.send(m)}
function navMsg(){var s=L.state;return{tab:s.tab,level:s.level,sid:s.sid,lid:s.lid}}
// remote nav (validated; same place = no re-render, so the open lab keeps its values)
function goRemote(m){var s=L.state,sub=L.subjects.filter(function(x){return x.id===m.sid})[0];
  if(s.tab===m.tab&&s.level===m.level&&s.sid===m.sid&&s.lid===m.lid)return;rnav=1;
  try{if(m.tab!=='subjects'){if(L.tabOk(m.tab))L.setTab(m.tab)}else if(m.level==='home')L.go('home');
    else if(sub&&m.level==='galaxy')L.go('galaxy',sub.id);else if(sub&&m.level==='planet'&&sub.lessons.some(function(l){return l.id===m.lid&&l.mod}))L.go('planet',sub.id,m.lid)}finally{rnav=0}}
var CD={open:false,ip:null,re:0,reT:0,wt:0};
function onRemote(m){if(!m||typeof m!=='object'||typeof m.type!=='string')return;
  if(m.type==='peers'){var was=Net.phones;Net.peers=+m.n||0;Net.phones=+m.phones||0;Net.host=typeof m.host==='string'?m.host:Net.host;
    if(!phoneSide()){if(was>0&&!Net.phones){CD.re=1;clearTimeout(CD.reT);CD.reT=setTimeout(function(){CD.re=0;pill()},60000)}if(Net.phones){CD.re=0;clearTimeout(CD.reT)}}
    pill();if(CD.open&&!was&&Net.phones){var st=document.getElementById('pd-st');if(st){st.className='pd-st ok';st.lastChild.textContent=t('cd_ok');dlg.querySelectorAll('.pd-steps li').forEach(function(l){l.classList.add('ok')})}
      L.fx.tick();setTimeout(function(){if(CD.open)dlg.close()},1200)}return}
  if(m.type==='net'){info().then(function(j){if(CD.open&&j)render(j)});return}
  if(m.type==='bye'){Net.on=false;Net.err=true;pill();return}
  if(m.from===TAB)return;
  var nav=typeof m.tab==='string'&&['home','galaxy','planet'].indexOf(m.level)>=0;
  if(m.type==='param'&&typeof m.lab==='string'&&typeof m.k==='string'&&isFinite(m.v))setP(m.lab,m.k,+m.v,true);
  else if(m.type==='nav'&&nav)goRemote(m);
  else if(m.type==='hello'){if(!phoneSide()){var o=navMsg();o.to=m.from;o.p=snap();bc('state',o)}}
  else if(m.type==='state'&&m.to===TAB&&nav){goRemote(m);if(m.p&&typeof m.p==='object')for(var l in m.p)for(var k in m.p[l])if(isFinite(m.p[l][k]))setP(l,k,+m.p[l][k],true)}}

/* ---- Link pill + Connect dialog (v1 netUI, openConnect/cdRender, drawQR, Quit) ---- */
var pl,dlg;
function lamp(){if(Ctl.live)Ctl.live.classList.toggle('on',Net.on||!!BC)}
function pill(){lamp();if(!pl)return;var txt=t('link'),st='',tip=t('cd_t');
  if(phoneSide()&&http){if(Net.on){txt=t('ch_conn');st='on';tip=t('cn_to',{h:Net.host||'Lumio'})}else if(Net.old){txt=t('ch_not');st='err';tip=t('cn_old')}else if(Net.err){txt=t('ch_not');st='err';tip=t('cn_err')}else if(Net.info){txt=t('ch_re');tip=t('cn_off')}}
  else if(Net.phones>0){txt=t('ch_phone');st='on';tip=t('ch_full',{h:Net.host||'Lumio'})}else if(CD.re){txt=t('ch_re');tip=txt}else if(Net.on){txt='LAN · '+Math.max(1,Net.peers);st='on'}
  pl.lastChild.textContent=txt;pl.className=st;pl.title=tip;pl.setAttribute('aria-label',tip)}
function info(){return http&&!/github\.io$/.test(location.hostname)?fetch('/api/info',{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){if(!j||j.app!=='incognia')return null;Net.info=j;if(j.token)Net.tok=j.token;return j}).catch(function(){return null}):Promise.resolve(null)}
function open(){info().then(function(j){CD.open=true;render(j);if(!dlg.open)dlg.showModal()})}
function drawQR(el,url){
  if(F.qr)return F.qr.draw(el,url);
  var mk=function(){el.textContent='';new QRCode(el,{text:url,width:180,height:180,colorDark:'#111111',colorLight:'#ffffff'})};if(window.QRCode)return mk();
  var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';s.onload=mk;s.onerror=function(){el.textContent='QR offline — use the URL'};document.head.appendChild(s)}
function seg(items,on,pressed){var g=U.el('div',null,'pseg');g.setAttribute('role','group');
  items.forEach(function(k){var b=U.el('button',t(k));b.type='button';b.setAttribute('aria-pressed',k===pressed);b.onclick=function(){on(k)};g.append(b)});return g}
function render(j){
  var nets=j&&j.nets||[],ip=nets.some(function(n){return n.ip===CD.ip})?CD.ip:nets[0]&&nets[0].ip,tls=j&&j.tls,tok=encodeURIComponent(Net.tok||''),done=Net.phones>0,
      url=ip?(tls?'https://'+ip+':'+tls+'/?role=phone&t='+tok:'http://'+ip+':'+(j.port||8080)+'/pair?t='+tok):'',x=U.el('button','×','pd-x'),lay=U.el('section'),ln=U.el('section');
  CD.ip=ip;clearTimeout(CD.wt);x.type='button';x.setAttribute('aria-label',t('close'));x.onclick=function(){dlg.close()};
  lay.append(U.el('h3',t('layout')),seg(['desktop','hybrid','phone'],function(m){if(role)return;setMode(m);render(j)},mode));
  if(mode==='hybrid')lay.append(U.el('h3',t('dock')),seg(['side','float'],function(k){cfg.dock=k;save();document.body.dataset.dock=k;render(j)},cfg.dock));
  var sw=U.el('label',null,'pd-sw'),cb=U.el('input');cb.type='checkbox';cb.checked=cfg.tabsync;cb.onchange=function(){cfg.tabsync=cb.checked;save();syncOn();lamp()};
  sw.append(cb,t('tabsync'));lay.append(sw,U.el('p',t('tabsync_h'),'pd-note'));
  if(!j)ln.append(U.el('p',t('cn_file'),'pd-note'));
  else if(!url)ln.append(U.el('p',t('cd_none'),'pd-warn'));
  else{var qr=U.el('div',null,'pd-qr'),ol=U.el('ol',null,'pd-steps'),st=U.el('div',null,'pd-st'+(done?' ok':'')),lk=U.el('div',null,'pd-link'),cp=U.el('button',t('cd_copy'),'chip');
    qr.setAttribute('aria-label','QR code');ln.append(U.el('p',t('cd_s'),'pd-note'),qr);
    [['cd_1'],tls?['cd_2','cd_2c']:null,['cd_3']].filter(Boolean).forEach(function(s,i){var li=U.el('li');if(done&&s[0]!=='cd_2')li.className='ok';li.append(U.el('span',String(i+1)),t(s[0]));if(s[1])li.append(U.el('small',t(s[1])));ol.append(li)});
    st.id='pd-st';st.setAttribute('role','status');st.setAttribute('aria-live','polite');st.append(U.el('i'),U.el('span',t(done?'cd_ok':'cd_wait')));ln.append(ol,st);
    if(!tls)ln.append(U.el('p',t('cd_nomo'),'pd-warn'));
    cp.type='button';cp.onclick=function(){var ok=function(){cp.textContent=t('cd_copied');setTimeout(function(){cp.textContent=t('cd_copy')},1200)};
      navigator.clipboard?navigator.clipboard.writeText(url).then(ok,function(){getSelection().selectAllChildren(lk.firstChild)}):getSelection().selectAllChildren(lk.firstChild)};
    lk.append(U.el('span',url),cp);lk.firstChild.title=url;ln.append(lk);
    if(nets.length>1){var ot=U.el('label',t('cd_other'),'pd-other'),se=U.el('select');nets.forEach(function(n){var o=U.el('option',n.ip+' · '+n.name);o.value=n.ip;o.selected=n.ip===ip;se.append(o)});
      se.onchange=function(){CD.ip=se.value;render(Net.info)};ot.append(se);ln.append(ot)}
    if(!done)CD.wt=setTimeout(function(){if(CD.open&&!st.classList.contains('ok'))st.after(U.el('p',t('cd_still'),'pd-note'))},20000)}
  var hp=U.el('details',null,'pd-help');hp.append(U.el('summary',t('cd_help')),U.el('p',t('cd_h1')),U.el('p',t('cd_h2')));ln.append(hp);
  if(j&&/^(localhost|127\.)/.test(location.hostname)&&!role){var qb=U.el('button',t('quit'),'chip');qb.type='button';qb.title=t('quit_c');
    qb.onclick=function(){fetch('/api/quit',{method:'POST'}).catch(function(){}).then(function(){ln.replaceChildren(U.el('p',t('quit_ok')))})};ln.append(qb)}
  dlg.replaceChildren(x,U.el('h2',t('cd_t')),lay,ln);if(url)drawQR(qr,url);dlg.querySelectorAll('.pseg').forEach(L.seg)}

L.on(function(s,kind){if(kind==='nav'){if(!rnav)bc('nav',navMsg());mount()}else if(kind==='skin'){mount();pill();if(CD.open)render(Net.info)}});
L.boot(function(){
  var bd=document.body.dataset;bd.pmode=mode;bd.dock=cfg.dock;
  dock=U.el('div');dock.id='pdock';phoneEl=U.el('div',null,'pphone');screen=U.el('div',null,'pscreen');phoneEl.append(screen);dock.append(phoneEl);document.body.append(dock);
  dlg=U.el('dialog');dlg.id='pdlg';dlg.addEventListener('close',function(){CD.open=false;clearTimeout(CD.wt)});document.body.append(dlg);
  pl=U.el('button');pl.id='plink';pl.type='button';pl.append(U.el('i'),U.el('span'));pl.onclick=function(){if(phoneSide()&&http&&!Net.on&&Net.info)Net.init();else open()};
  document.getElementById('bar').insertBefore(pl,document.getElementById('gview'));
  syncOn();pill();mount();Net.init();
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&Net.info&&(!Net.es||Net.es.readyState===2))Net.init()});
});
F.phone={Net:Net,setMode:setMode,setP:setP};
})();
