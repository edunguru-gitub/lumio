(function(){
// Ticker feature: last 5 gains from lumio2_stats log, shown on Terminal. Needs rating.js.
var L=Lumio,E=function(t,x,c){return L.ui.el(t,x,c)},st=L.stats,t=L.t,sgn=L.sgn;if(!st)return;
Object.assign(L.S,{recent:['Recent','Recente']});
function ticker(){
  var u=E('ul',null,'tick');u.setAttribute('aria-label',t('recent'));
  st.log.slice(0,5).forEach(function(e){var x=L.lessons().filter(function(y){return y.k===e.k})[0];
    u.appendChild(E('li',(x?x.l.name[0].slice(0,3).toUpperCase():e.k)+'  '+(e.lum?'+'+e.lum+' '+t('lum'):'')+(e.d?'  '+sgn(e.d):'')))});
  return u;
}
(window.LumioFeatures=window.LumioFeatures||{}).ticker={el:ticker};
})();
