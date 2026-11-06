(function(){
// lumio2_stats: lifetime Lumens, answer streak, per-lesson quests/accuracy, gain log (ticker). Ratings 0-99 from real play.
var L=Lumio,K='lumio2_stats',st={v:1,lum:0,streak:0,best:0,les:{},log:[],o:0};
try{var o=JSON.parse(localStorage.getItem(K));if(o&&o.v===1&&o.les&&typeof o.les==='object'){for(var k in st)if(o[k]!=null)st[k]=o[k];if(!Array.isArray(st.log))st.log=[]}}catch(e){}
L.stats=st;
function save(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
function les(k){return st.les[k]||(st.les[k]={qd:0,qt:0,ok:0,bad:0,ts:0})}
L.lessons=function(){var a=[];L.subjects.forEach(function(s){s.lessons.forEach(function(l){a.push({s:s,l:l,k:L.key(s,l)})})});return a};
// rating = round(99*(.5P+.3Q+.2A)); A=0 under 5 attempts; null = unrated (shown as NEW) until 5 answers or lesson finished
L.rate=function(k){
  var s=st.les[k]||{},P=L.getP(k),n=(s.ok||0)+(s.bad||0);
  if(P<1&&n<5)return null;
  return Math.round(99*(.5*P+.3*(s.qt?Math.min(1,s.qd/s.qt):0)+.2*(n>=5?s.ok/n:0)));
};
function mean(a){a=a.filter(function(r){return r!=null});return a.length?Math.round(a.reduce(function(x,y){return x+y},0)/a.length):null}
L.overall=function(){var r=L.lessons().map(function(x){return L.rate(x.k)});return{r:mean(r),n:r.filter(function(v){return v!=null}).length,of:r.length}};
L.subAvg=function(s){return mean(s.lessons.map(function(l){return L.rate(L.key(s,l))}))};
L.week=function(){var t=Date.now()-7*864e5,w=0;st.log.forEach(function(e){if(e.ts>=t)w+=e.od||0});return w};
// log a change for lesson k; merges with the newest entry of the same lesson within 3 s
L.note=function(k,lum){
  var s=les(k),r=L.rate(k)||0,o=L.overall().r||0,d=r-(s.r||0),od=o-st.o,e=st.log[0],now=Date.now();
  s.r=r;st.o=o;s.ts=now;
  if(lum||d||od){
    if(e&&e.k===k&&now-e.ts<3000){e.lum+=lum;e.d+=d;e.od+=od;e.ts=now}
    else{st.log.unshift({ts:now,k:k,lum:lum,d:d,od:od});if(st.log.length>20)st.log.length=20}
  }
  save();L.emit('stats');
};
// o: {qt (total), qd (done, kept at max), ok, bad (added)}; returns true when a new quest was completed
L.report=function(k,o){
  var s=les(k),got=false;o=o||{};
  if(o.qt>=0)s.qt=o.qt;
  if(o.qd>s.qd){s.qd=s.qt?Math.min(s.qt,o.qd):o.qd;got=true}
  if(o.ok>0){s.ok+=o.ok;st.streak+=o.ok;if(st.streak>st.best)st.best=st.streak}
  if(o.bad>0){s.bad+=o.bad;st.streak=0}
  L.note(k,0);return got;
};
// Lumens: default = correct answer 10 + min(streak,5)*2 (v1 addXP)
L.award=function(k,n){n=n==null?10+Math.min(st.streak,5)*2:Math.max(0,Math.round(n));st.lum+=n;L.note(k,n);return n};
})();
