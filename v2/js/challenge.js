(function(){
// feature 'challenge' (v1 chSheet/chCard/chEnd + Elo override, app/lumio.html 2185-2202, 4010-4018): one 7-day Lumens race at a time,
// gain counted from the Lumens at start; Sample opponents move +1..4 with 50% chance every 6.5 s (simulated, labelled).
// v1 has no automatic end: the end is in the developer panel (Ctrl+Shift+D). Storage lumio2_chal. Needs moon.js.
var L=Lumio,st=L.stats,M=L.moon,U=L.ui,E=U.el,t=L.t;if(!st||!M)return;
Object.assign(L.S,{ch_title:['1v1 Challenge','Provocare 1v1'],ch_rules:['Whoever gains more Lumens in 7 days wins.','Câștigă cine adună mai mulți lumeni în 7 zile.'],
 ch_days:['days','zile'],ch_mode:['Lumens race','cursă de lumeni'],ch_vs:['1 v 1','1 la 1'],ch_send:['Send challenge','Trimite provocarea'],ch_sent:['Challenge sent to {n}','Provocare trimisă lui {n}'],
 ch_active:['Challenge','Provocare'],ch_left:['{d} days left','{d} zile rămase'],ch_win:['You won the challenge!','Ai câștigat provocarea!'],ch_lose:['{n} won this one. Rematch?','{n} a câștigat de data asta. Revanșă?'],
 ch_end:['End challenge (demo)','Încheie provocarea (demo)'],ch_fin:['Finish now (Sample)','Încheie acum (Exemplu)'],ch_busy:['Challenged','Provocat'],ch_none:['No active challenge. Pick someone on the board and tap Challenge.','Nicio provocare activă. Alege pe cineva din clasament și apasă Provoacă.'],
 ch_gain:['Lumens gained','Lumeni câștigați'],ch_sim:['Sample opponent: simulated progress.','Adversar exemplu: progres simulat.'],rk_ch:['Challenge','Provoacă'],
 dev:['Developer','Dezvoltator'],dev_seed:['Seed demo data','Populează date demo'],dev_reset:['Reset demo','Resetează demo'],dev_seeded:['Demo data seeded','Date demo populate'],dev_wiped:['Demo reset','Demo resetat']});
var K='lumio2_chal',c=null;
try{var o=JSON.parse(localStorage.getItem(K));if(o&&typeof o.name==='string'&&isFinite(o.my0)&&isFinite(o.op)&&isFinite(o.t0))c=o}catch(e){}
function save(){try{if(c)localStorage.setItem(K,JSON.stringify(c));else localStorage.removeItem(K)}catch(e){}}
function mg(name,cls){var m=E('span',name.charAt(0),'mg'+(cls?' '+cls:''));m.setAttribute('aria-hidden','true');return m}
function moon(r){var s=E('small');s.innerHTML=L.phase();s.append(M.fmt(r));return s}
// v1 chSheet: You vs opponent, three facts, rule line, Send
function sheet(p){
  var vs=E('div',null,'vs'),me=E('div'),op=E('div'),ru=E('div',null,'rules'),go=E('button',t('ch_send'),'outline wide'),os=moon(p.r||1000);
  me.append(mg(t('you')),E('b',t('you')),moon(M.m.r));if(p.sample)os.prepend(t('sample')+' · ');op.append(mg(p.name),E('b',p.name),os);vs.append(me,E('span','VS','x'),op);
  [['7',t('ch_days')],[t('lum'),t('ch_mode')],['1v1',t('ch_vs')]].forEach(function(f){var d=E('div');d.append(E('b',f[0]),E('small',f[1]));ru.append(d)});
  go.type='button';
  var d=U.dialog(t('ch_title'),[vs,ru,E('p',t('ch_rules'),'rl'),go]);
  go.onclick=function(){c={id:p.id,name:p.name,sample:!!p.sample,r:p.r||1000,my0:st.lum,op:0,t0:Date.now()};save();d.close();L.toast(t('ch_sent',{n:p.name}));L.setTab('ranks');L.emit('stats')};
}
// row button on the leaderboard: Challenge, or disabled Challenged for the active opponent
function btn(p){var on=c&&c.id===p.id,b=E('button',t(on?'ch_busy':'rk_ch'),'outline');b.type='button';b.disabled=!!on;if(!on)b.onclick=function(){sheet(p)};return b}
// v1 chCard: active race under the list (You bar = Lumens, opponent bar = muted)
function card(){
  var r=E('div',null,'race');r.setAttribute('aria-live','polite');
  if(!c){r.append(E('h3',t('ch_active')),E('p',t('ch_none')));return r}
  var my=st.lum-c.my0,mx=Math.max(my,c.op,20),left=Math.max(0,7-Math.floor((Date.now()-c.t0)/864e5)),h=E('div',null,'rh'),h3=E('h3',t('ch_active')+' · '+c.name);
  if(c.sample)h3.append(E('span',t('sample'),'tag'));h.append(h3,E('small',t('ch_left',{d:left})));r.append(h);
  [[t('you'),my,''],[c.name.split(' ')[0],c.op,' op']].forEach(function(x){var ln=E('div',null,'ln'),tr=E('span',null,'tr'+x[2]),i=E('i');
    i.style.width=Math.max(0,x[1])/mx*100+'%';tr.append(i);tr.setAttribute('aria-hidden','true');ln.append(E('span',x[0]),tr,E('b',(x[1]>=0?'+':'')+x[1]));r.append(ln)});
  r.append(E('small',t('ch_gain')));if(c.sample)r.append(E('p',t('ch_sim')));
  // visible Sample shortcut for live demos: the same end as the developer panel (Elo, toasts, state cleared)
  var f=E('button',t('ch_fin'),'outline fin');f.type='button';f.onclick=end;r.append(f);return r;
}
// v1 chEnd (Elo override): win 1 / draw .5 / loss 0, Moon moves for both (Sample rating kept in memory, as v1)
function end(){if(!c)return;var my=st.lum-c.my0,win=my>c.op?1:my===c.op?.5:0,x=c;c=null;save();
  var res=M.apply(x.r||1000,win),sp=M.SP.filter(function(s){return s.id===x.id})[0];if(sp)sp.r=Math.round(res.oppNew);
  if(win===1){L.fx.streak();L.fx.burst(180);L.toast(t('ch_win'))}else{L.fx.bad();L.toast(t('ch_lose',{n:x.name}))}L.emit('stats')}
setInterval(function(){if(c&&Math.random()<.5){c.op+=1+Math.floor(Math.random()*4);save();var el=document.querySelector('#ranks .race');if(el)el.replaceWith(card())}},6500);
// developer panel (v1 Ctrl+Shift+D): seed demo data, reset demo, end challenge
function dev(){
  var a=E('button',t('dev_seed'),'outline'),b=E('button',t('dev_reset'),'outline'),e=E('button',t('ch_end'),'outline'),w=E('div',null,'devb');
  a.type=b.type=e.type='button';e.disabled=!c;w.append(a,b,e);var d=U.dialog(t('dev'),[w]);
  a.onclick=function(){st.lum=282;st.best=9;st.streak=4;c=null;save();Object.assign(M.m,{r:1184,n:6,best:1184});M.save();L.saveStats();d.close();L.toast(t('dev_seeded'))};
  b.onclick=function(){st.lum=0;st.best=0;st.streak=0;c=null;save();try{localStorage.removeItem('lumio2_moon')}catch(x){}M.load();L.saveStats();d.close();L.setTab(L.tabOk('home')?'home':'subjects');L.toast(t('dev_wiped'))};
  e.onclick=function(){d.close();end()};
}
document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='d'){e.preventDefault();if(!document.querySelector('dialog[open]'))dev()}});
L.chal=(window.LumioFeatures=window.LumioFeatures||{}).challenge={btn:btn,card:card,end:end,get:function(){return c}};
})();
