(function(){
// feature 'moon' (v1 v5.23 Lumens + Moon, app/lumio.html 3890-3965): Lumens milestones (Lumens never reset), Moon = monthly Elo
// (lumio2_moon, changes only on Challenge results), labelled Sample players, Lumens chip in lessons. Needs rating.js.
var L=Lumio,st=L.stats,t=L.t;if(!st)return;
Object.assign(L.S,{lum_to:['{p}% to {n}','{p}% până la {n}'],lum_ex:['Lumens grow every time you learn. They never reset.','Lumenii cresc de fiecare dată când înveți. Nu se resetează niciodată.'],
 moon_ex:['Your Moon rating changes when you win or lose Challenges. It resets each month.','Ratingul Moon se schimbă când câștigi sau pierzi provocări. Se resetează în fiecare lună.'],
 days_left:['{n} days left','{n} zile rămase'],ends_today:['Ends today','Se încheie azi'],of_n:['#{a} of {b}','#{a} din {b}'],top_p:['Top {p}%','Top {p}%'],
 prov:['New: provisional place','Nou: loc provizoriu'],best_moon:['Best Moon','Cel mai bun Moon'],last_month:['Last month','Luna trecută'],sample:['Sample','Exemplu'],lum_ms:['{n} Lumens reached','{n} lumeni atinși'],
 moon_up:['Moon +{d}','Moon +{d}'],moon_dn:['Moon {d}','Moon {d}']});
// Sample players (v1 SAMPLE_P, seeded rng 4242). Names live only in this constant; every Sample row carries the Sample tag.
var SAMPLE_NAMES=['Andrei Popescu','Maria Ionescu','Ioana Stan','Vlad Marin','Elena Rusu','Matei Toma'];
function rng(seed){var a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var SP=(function(){var r=rng(4242);return SAMPLE_NAMES.map(function(n,i){return{id:'s'+i,name:n,sample:true,seed:Math.floor(r()*9999),r:Math.round(940+r()*320),wk:Math.round(-30+r()*90),lum:Math.round(300+r()*3200)}})})();
// v1 verbatim: Lumens milestones, Elo, month / week ids, days left
var LMS=[100,250,500,1000,2000,3500,5000];
function lumNext(x){var prev=0;for(var i=0;i<LMS.length;i++){if(x<LMS[i])return{prev:prev,next:LMS[i]};prev=LMS[i]}var k=Math.floor((x-5000)/2000);return{prev:5000+k*2000,next:5000+(k+1)*2000}}
function lumP(x){var n=lumNext(x);return Math.max(0,Math.min(100,Math.floor((x-n.prev)/(n.next-n.prev)*100)))}
var ELO={exp:function(rp,ro){return 1/(1+Math.pow(10,(ro-rp)/400))},k:function(n){return n<10?32:20},next:function(rp,ro,score,n){return rp+ELO.k(n)*(score-ELO.exp(rp,ro))}};
function monthId(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function mondayId(d){var x=new Date(d),k=(x.getDay()+6)%7;x.setDate(x.getDate()-k);return x.toISOString().slice(0,10)}
function daysLeft(d){d=d||new Date();return new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate()+1}
var K='lumio2_moon',M={SP:SP,ELO:ELO,lumNext:lumNext,lumP:lumP,daysLeft:daysLeft};
function save(){try{localStorage.setItem(K,JSON.stringify(M.m))}catch(e){}}
// v1 moonLoad: new month = soft reset half way to 1000, last month kept; new week = new weekly base
M.load=function(now){now=now||new Date();var sid=monthId(now),m=null;try{m=JSON.parse(localStorage.getItem(K))}catch(e){}
  if(!(m&&typeof m.season==='string'&&isFinite(m.r)&&isFinite(m.n)&&isFinite(m.best)&&m.wk&&isFinite(m.wk.base)))m={season:sid,r:1000,n:0,best:1000,last:null,wk:{mon:mondayId(now),base:1000}};
  if(m.season!==sid){M.fresh=m.last=Math.round(m.r);m.r=1000+(m.r-1000)*.5;m.n=0;m.season=sid;m.wk={mon:mondayId(now),base:m.r}}
  if(m.wk.mon!==mondayId(now))m.wk={mon:mondayId(now),base:m.r};
  M.m=m;save();return m};
M.P=function(r){return Math.max(0,Math.min(100,Math.round((r-600)/1000*100)))};
// v1 moonApply: score 1 win / .5 draw / 0 loss; returns the opponent's new rating (k 20 side)
M.apply=function(oppR,score){var m=M.m,before=m.r;m.r=ELO.next(m.r,oppR,score,m.n);m.n++;m.best=Math.max(m.best,Math.round(m.r));save();
  var d=Math.round(m.r-before);L.toast(t(d>=0?'moon_up':'moon_dn',{d:d}),L.phase());L.emit('stats');return{d:d,oppNew:ELO.next(oppR,before,1-score,10)}};
M.save=function(){save();L.emit('stats')};
M.played=function(){return M.m.n>0||M.m.last!=null};
M.fmt=function(n){return Math.round(n).toLocaleString(L.n(['en-US','ro-RO']))};
// players pool: You + Sample players (v1 friends are off while Friends is Coming soon)
M.pool=function(){var m=M.m;return[{id:'me',name:t('you'),me:true,r:m.r,wk:m.r-m.wk.base,lum:st.lum}].concat(SP)};
M.sub=function(){var pl=M.pool(),s=pl.slice().sort(function(a,b){return b.r-a.r}),n=s.findIndex(function(x){return x.me})+1,real=pl.filter(function(x){return !x.sample}).length,dl=daysLeft();
  // place shown only after the first activity (a lesson answer or a Challenge); before that: provisional
  if(!st.log.length&&!M.played())return t('prov')+' · '+(dl===1?t('ends_today'):t('days_left',{n:dl}));
  return(real>=20?t('top_p',{p:Math.max(1,Math.round(n/pl.length*100))}):t('of_n',{a:n,b:pl.length})+(real<pl.length?' · '+t('sample'):''))+' · '+(dl===1?t('ends_today'):t('days_left',{n:dl}))};
// Moon tiers (Manager 26 Nov, docs/spec-moon-tiers.md). ONE table: Eduard edits names / thresholds here. Display only, Elo unchanged.
// [from Moon points, EN, RO]; no tier below the first. Remove this block = the app shows numbers only.
// Tier names: ONE table. RO column kept English by decision (rename here only).
var TIERS=[[0,'New Moon','New Moon'],[1015,'Crescent','Crescent'],[1050,'First Quarter','First Quarter'],[1100,'Gibbous','Gibbous'],[1160,'Full Moon','Full Moon'],[1250,'Blue Moon','Blue Moon']];
Object.assign(L.S,{tier_to:['{n} points to {name}','{n} puncte până la {name}'],tier_top:['Top rank','Rang maxim'],tier_new:['Win a Challenge to reach {name}.','Câștigă o provocare ca să ajungi la {name}.'],
 tier_up:['New rank: {name}','Rang nou: {name}'],tier_ex:['Moon ranks go from {a} to {b}. They follow your Moon rating.','Rangurile Moon merg de la {a} la {b}. Urmează ratingul tău Moon.'],
 reset_note:['New month. Last month: {name}.','Lună nouă de joc. Luna trecută: {name}.']});
function tn(i){return L.n(TIERS[i].slice(1))}
M.tier=function(r){r=Math.round(r);for(var i=TIERS.length-1;i>0&&r<TIERS[i][0];i--);return i};
M.tname=function(r){return tn(M.tier(r))};
M.tnext=function(r){var i=M.tier(r),nx=TIERS[i+1];return !M.played()?t('tier_new',{name:tn(1)}):nx?t('tier_to',{n:nx[0]-Math.round(r),name:tn(i+1)}):t('tier_top')};
M.tex=function(){return t('tier_ex',{a:tn(0),b:tn(TIERS.length-1)})};
M.load();L.moon=M;(window.LumioFeatures=window.LumioFeatures||{}).moon=M;
// milestone pop (once per crossing) after the '+N Lumens' pop; Lumens chip fixed top right of the lesson view
var last=st.lum,chip;
function ms(){var nx=lumNext(last).next,hit=st.lum>=nx&&last<nx;last=st.lum;if(!hit)return;
  setTimeout(function(){var g=document.getElementById('gain');g.textContent=t('lum_ms',{n:M.fmt(nx)});g.classList.remove('on');void g.offsetWidth;g.classList.add('on');L.fx.pop()},1700)}
function chipU(){chip.textContent=M.fmt(st.lum)+' '+t('lum');chip.classList.toggle('z',!st.lum)}
L.boot(function(){
  chip=L.ui.el('div');chip.id='lchip';document.getElementById('main').append(chip);chipU();
  L.on(function(s,k){if(k==='stats')ms();if(k==='stats'||k==='skin')chipU()});
});
})();
