(function(){
// feature 'settings' (v1 renderSettings / exportCode / importCode, app/lumio.html 2004-2055; docs/spec-port-wave2.md C1):
// language + theme (same as header), name, sound, read aloud + voice + speed, export / import (v3 + v1 v:2 codes), reset, phone link.
// Storage lumio2_settings {v:1,name,sfx,vol,tts,voice,rate}; blocked storage = memory only. sfx.js reads L.settings.
var L=Lumio,U=L.ui,E=U.el,t=L.t,K='lumio2_settings',D={v:1,name:'',sfx:true,vol:.6,tts:false,voice:'auto',rate:1},P={};
Object.assign(L.S,{
 set_app:['Appearance','Aspect'],set_lang:['Language','Limbă'],set_theme:['Theme','Temă'],
 set_acc:['Profile','Profil'],set_name:['Display name','Nume afișat'],set_name_h:['Shown on your card and in Ranks.','Apare pe cardul tău și în Clasament.'],
 set_audio:['Audio and voice','Audio și voce'],set_sfx:['Sound effects','Efecte sonore'],set_sfxv:['Effects volume','Volum efecte'],
 set_tts:['Read aloud automatically','Citire automată'],set_tts_h:['Reads questions and feedback in Algebra.','Citește întrebările și răspunsurile la Algebră.'],
 set_voice:['Voice','Voce'],set_rate:['Speed','Viteză'],auto:['Auto','Auto'],ro_none:['Romanian voice not installed on this device','Vocea română nu este instalată pe acest dispozitiv'],
 set_test:['Test','Test'],test:['Test voice','Testează vocea'],t_ok:['Correct','Corect'],t_bad:['Wrong','Greșit'],t_st:['Streak','Serie'],
 test_t:['Hi! I am Lumio, your digital tutor.','Salut! Sunt Lumio, tutorele tău digital.'],
 set_prog:['Progress','Progres'],set_export:['Your progress code','Codul progresului tău'],set_export_h:['Progress stays on this device. Use the code to move it.','Progresul rămâne pe acest dispozitiv. Folosește codul ca să-l muți.'],
 set_copy:['Copy','Copiază'],copied:['Copied','Copiat'],set_import:['Import a code','Importă un cod'],set_import_h:['Also accepts codes from Lumio v1.','Acceptă și coduri din Lumio v1.'],
 set_apply:['Apply','Aplică'],bad_code:['That code does not work','Codul nu funcționează'],no_store:['Could not save on this device','Nu s-a putut salva pe acest dispozitiv'],
 imp_t:['Replace progress?','Înlocuiești progresul?'],imp_p:['The progress on this device will be replaced by the code.','Progresul de pe acest dispozitiv va fi înlocuit cu cel din cod.'],
 imp_ok:['Replace','Înlocuiește'],cancel:['Cancel','Anulează'],imported:['Progress imported','Progres importat'],
 reset:['Reset Lumens, best and streak','Resetează lumenii, recordul și seria'],reset_h:['Lessons and Moon stay.','Lecțiile și Luna rămân.'],reset_b:['Reset','Resetează'],
 reset_t:['Reset Lumens?','Resetezi lumenii?'],reset_p:['Lumens, best streak and streak go back to 0.','Lumenii, recordul și seria revin la 0.'],reset_ok:['Progress reset','Progres resetat'],
 set_phone:['Phone as controller','Telefonul ca telecomandă'],set_phone_h:['Layout mode and live tab sync are inside.','Modul de afișare și sincronizarea live sunt aici.'],lan_open:['Connect phone','Conectează telefonul'],
 on:['On','Pornit'],off:['Off','Oprit']});
var YOU=L.S.you||(L.S.you=['You','Tu']);
function load(){var o=null;try{o=JSON.parse(localStorage.getItem(K))}catch(e){}return clean(o)}
// only known fields with valid types; anything else falls back to the default
function clean(o){var s={};o=o&&typeof o==='object'?o:{};for(var k in D)s[k]=D[k];
  if(typeof o.name==='string')s.name=o.name.trim().slice(0,24);if(typeof o.sfx==='boolean')s.sfx=o.sfx;if(typeof o.tts==='boolean')s.tts=o.tts;
  if(typeof o.voice==='string')s.voice=o.voice;if(typeof o.vol==='number'&&isFinite(o.vol))s.vol=Math.max(0,Math.min(1,+o.vol));if(typeof o.rate==='number'&&isFinite(o.rate))s.rate=Math.max(.6,Math.min(1.6,+o.rate));return s}
function save(){try{localStorage.setItem(K,JSON.stringify(P))}catch(e){}}
function nm(){L.S.you=P.name?[P.name,P.name]:YOU}
P=load();nm();
L.settings=(window.LumioFeatures=window.LumioFeatures||{}).settings={get:function(k){return P[k]}};
function set(k,v){P[k]=v;save();if(k==='name'){nm();L.emit('stats')}}
// mechanical switch (spec-tactile s2): inset well + raised knob, word On / Off beside it; role=switch, Space / Enter (native button)
U.sw=function(lab,on,fn){var b=E('button',null,'sw'),w=E('span',null,'sw-w'),x=E('span',null,'sw-t');b.type='button';b.setAttribute('role','switch');b.setAttribute('aria-label',lab);w.append(E('i'));b.append(w,x);
  var put=function(v){b.setAttribute('aria-checked',v);x.textContent=t(v?'on':'off')};put(on);b.onclick=function(){on=!on;put(on);fn(on)};return b};
// v1 exportCode / importCode: base64 of JSON (UTF-8 safe)
function enc(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function dec(s){return JSON.parse(decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))))}
function rd(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
var KEYS={set:K,prog:'lumio2_progress',stats:'lumio2_stats',moon:'lumio2_moon',proj:'lumio2_proj'};
function code(){return enc({v:3,name:P.name,set:P,prog:rd(KEYS.prog)||{},stats:rd(KEYS.stats)||L.stats||null,moon:rd(KEYS.moon)||(L.moon&&L.moon.m)||null,proj:rd(KEYS.proj)})}
var obj=function(x){return x===null||x===undefined||typeof x==='object'&&!Array.isArray(x)};
// returns an apply function, or null for a bad code (nothing is applied before the confirm)
function parse(s){var o;try{o=dec(s)}catch(e){return null}if(!o||typeof o!=='object')return null;
  if(o.v===3){for(var k in KEYS)if(!obj(o[k]))return null;if(o.stats&&(o.stats.v!==1||!o.stats.les||typeof o.stats.les!=='object'))return null;
    return function(){var old={},k;
      try{for(k in KEYS)old[k]=localStorage.getItem(KEYS[k]);for(k in KEYS){if(o[k]==null)localStorage.removeItem(KEYS[k]);else localStorage.setItem(KEYS[k],JSON.stringify(k==='set'?clean(o[k]):o[k]))}}
      catch(e){try{for(k in old){if(old[k]==null)localStorage.removeItem(KEYS[k]);else localStorage.setItem(KEYS[k],old[k])}}catch(x){}L.toast(t('no_store'));return}
      location.reload()}}
  // v1 code (v:2): name, xp -> Lumens, best, lang, theme (palette name ends in -light / -dark); v1 default name 'Learner' = no name
  if(o.v===2){var n=typeof o.name==='string'&&o.name!=='Learner'?o.name.trim().slice(0,24):'',xp=Math.max(0,Math.round(+o.xp||0)),bs=Math.max(0,Math.round(+o.best||0)),th=typeof o.theme==='string'?(/light$/.test(o.theme)?'light':'dark'):null;
    return function(){if(L.stats){L.stats.lum=xp;L.stats.best=bs;L.saveStats()}set('name',n);if(th)L.setTheme(th);if(o.lang==='en'||o.lang==='ro')L.setLang(o.lang);page();L.toast(t('imported'))}}
  return null}
function confirm(title,txt,ok,fn){var a=E('button',t('cancel'),'outline'),b=E('button',ok,'outline'),r=E('div',null,'s-act');a.type=b.type='button';r.append(a,b);
  var d=U.dialog(title,[E('p',txt),r]);a.onclick=function(){d.close()};b.onclick=function(){d.close();fn()}}
function voices(){var ro=L.n([0,1]),a=window.speechSynthesis?speechSynthesis.getVoices()||[]:[];return a.filter(function(v){return v.lang.replace('_','-').toLowerCase().indexOf(ro?'ro':'en')===0})}
function row(lab,hint,ctl){var r=E('div',null,'srow'),l=E('div',null,'sl-l');l.append(E('b',lab));if(hint)l.append(E('small',hint));r.append(l);if(ctl)r.append(ctl);return r}
function capsule(lab,items,cur,fn){var g=E('div',null,'pseg');g.setAttribute('role','group');g.setAttribute('aria-label',lab);
  items.forEach(function(x){var b=E('button',x[1]);b.type='button';b.setAttribute('aria-pressed',x[0]===cur);b.onclick=function(){fn(x[0])};g.append(b)});return g}
function btn(txt,fn,cls){var b=E('button',txt,cls||'outline');b.type='button';b.onclick=fn;return b}
function page(){
  var el=document.getElementById('settings');if(!el)return;
  var w=E('div',null,'s-in'),F=L.fx,ro=L.n([0,1]),nmI=E('input'),vs=voices(),sel=E('select'),ex=E('input'),im=E('input'),err=E('p',null,'s-err'),ph=(window.LumioFeatures||{}).phone;
  w.append(E('h2',t('settings')));
  w.append(E('h4',t('set_app')),
    row(t('set_lang'),null,capsule(t('set_lang'),[['en','English'],['ro','Română']],ro?'ro':'en',function(g){L.setLang(g)})),
    row(t('set_theme'),null,capsule(t('set_theme'),[['light',t('light')],['dark',t('dark')]],L.theme(),function(th){L.setTheme(th)})));
  nmI.type='text';nmI.id='set-name';nmI.maxLength=24;nmI.value=P.name;nmI.placeholder=L.n(YOU);nmI.autocomplete='off';
  nmI.oninput=function(){set('name',nmI.value.trim().slice(0,24));ex.value=code()};
  var nl=row(t('set_name'),t('set_name_h'),nmI);nl.firstChild.firstChild.replaceWith(Object.assign(E('label',t('set_name')),{htmlFor:'set-name'}));
  w.append(E('h4',t('set_acc')),nl);
  // audio and voice (v1 sfx, sfxVol, tts, voice, rate + test buttons)
  var vol=U.slider('',0,1,.1,P.vol,function(v){return Math.round(v*100)+'%'},function(v){set('vol',v)}),rate=U.slider('',.6,1.6,.1,P.rate,function(v){return(+v).toFixed(1)+'×'},function(v){set('rate',v)});
  vol.querySelector('input').setAttribute('aria-label',t('set_sfxv'));rate.querySelector('input').setAttribute('aria-label',t('set_rate'));
  sel.id='set-voice';sel.append(Object.assign(E('option',t('auto')+(ro?'':' · Australian')),{value:'auto'}));
  vs.forEach(function(v){sel.append(Object.assign(E('option',v.name),{value:v.name,selected:v.name===P.voice}))});
  sel.onchange=function(){set('voice',sel.value);F.say(t('test_t'))};
  var vl=row(t('set_voice'),ro&&!vs.length?t('ro_none'):null,sel);vl.firstChild.firstChild.replaceWith(Object.assign(E('label',t('set_voice')),{htmlFor:'set-voice'}));
  var tb=E('div',null,'s-act');tb.append(btn(t('test'),function(){F.say(t('test_t'))}),btn(t('t_ok'),function(){F.ok()}),btn(t('t_bad'),function(){F.bad()}),btn(t('t_st'),function(){F.streak();F.burst(100)}));
  w.append(E('h4',t('set_audio')),row(t('set_sfx'),null,U.sw(t('set_sfx'),P.sfx,function(v){set('sfx',v);if(v)F.pop()})),row(t('set_sfxv'),null,vol),
    row(t('set_tts'),t('set_tts_h'),U.sw(t('set_tts'),P.tts,function(v){set('tts',v);if(v)F.say(t('test_t'))})),vl,row(t('set_rate'),null,rate),row(t('set_test'),null,tb));
  // progress: export, import (confirm), reset (confirm), phone link
  ex.readOnly=true;ex.id='set-code';ex.value=code();ex.className='s-code';ex.onfocus=function(){ex.select()};
  var cp=btn(t('set_copy'),function(){var ok=function(){L.toast(t('copied'))};ex.select();(navigator.clipboard?navigator.clipboard.writeText(ex.value):Promise.reject()).then(ok,function(){try{document.execCommand('copy')}catch(e){}ok()})}),
      ap=btn(t('set_apply'),function(){var f=im.value.trim()&&parse(im.value);err.textContent=f?'':t('bad_code');if(f)confirm(t('imp_t'),t('imp_p'),t('imp_ok'),f)}),
      eb=E('div',null,'s-pair'),ib=E('div',null,'s-pair');
  ex.setAttribute('aria-label',t('set_export'));im.id='set-imp';im.className='s-code';im.placeholder='eyJ2Ijoz…';im.autocomplete='off';im.setAttribute('aria-label',t('set_import'));im.setAttribute('aria-describedby','set-err');
  im.onkeydown=function(e){if(e.key==='Enter')ap.click()};im.oninput=function(){err.textContent=''};err.id='set-err';err.setAttribute('role','alert');
  eb.append(ex,cp);ib.append(im,ap);
  w.append(E('h4',t('set_prog')),row(t('set_export'),t('set_export_h'),eb),row(t('set_import'),t('set_import_h'),ib),err,
    row(t('reset'),t('reset_h'),btn(t('reset_b'),function(){confirm(t('reset_t'),t('reset_p'),t('reset_b'),function(){var s=L.stats;if(!s)return;s.lum=0;s.best=0;s.streak=0;L.saveStats();ex.value=code();L.toast(t('reset_ok'))})})));
  if(ph&&ph.open)w.append(row(t('set_phone'),t('set_phone_h'),btn(t('lan_open'),ph.open)));
  el.replaceChildren(w);w.querySelectorAll('.pseg').forEach(L.seg);
}
if(window.speechSynthesis)speechSynthesis.addEventListener('voiceschanged',function(){if(L.state.tab==='settings'&&!document.querySelector('#settings :focus'))page()});
L.boot(function(){page();L.on(function(s,k){if(k==='skin'||k==='nav'&&s.tab==='settings')page()})});
})();
