(function(){
// Ranks feature: table (You row, real data) for Terminal + full Ranks page. Needs rating.js.
var L=Lumio,E=function(t,x,c){return L.ui.el(t,x,c)},st=L.stats,t=L.t,sgn=L.sgn;if(!st)return;
Object.assign(L.S,{name:['Name','Nume'],ovr:['Overall','General'],week:['This week','Săptămâna asta'],addf:['Add friends','Adaugă prieteni'],nof:['No friends yet.','Încă niciun prieten.']});
// real data only: one You row; full page adds Moon (1000 base) and the Add friends empty state
function ranks(full){
  var o=L.overall(),tb=E('table',null,'ranks'),h=E('tr'),r=E('tr',null,'me'),f=E('tr',null,'nof'),td=E('td'),btn=E('button',t('addf'),'outline');
  ['#',t('name'),t('ovr'),t('lum')].concat(full?[t('moon'),t('week')]:[t('week')]).forEach(function(x){h.appendChild(E('th',x))});
  ['1',t('you'),o.r==null?t('new'):String(o.r),String(st.lum)].concat(full?['1000',sgn(L.week())]:[sgn(L.week())]).forEach(function(x){r.appendChild(E('td',x))});
  if(full)r.children[4].className='moon';
  var th=E('thead'),bd=E('tbody');th.appendChild(h);bd.appendChild(r);
  if(full){btn.type='button';btn.disabled=true;btn.title=L.n(L.S.soon);td.colSpan=6;td.append(E('span',t('nof')),btn,E('p',t('moon')+' 1000 · '+t('noch')));f.appendChild(td);bd.appendChild(f)}
  tb.append(th,bd);return tb;
}
function page(){var rp=E('div',null,'r-in');rp.append(E('h2',L.n(L.S.ranks)),ranks(true));document.getElementById('ranks').replaceChildren(rp)}
(window.LumioFeatures=window.LumioFeatures||{}).ranks={table:ranks};
L.boot(function(){page();L.on(function(s,k){if(s.tab!=='subjects'||k==='stats'||k==='progress'||k==='skin')page()})});
})();
