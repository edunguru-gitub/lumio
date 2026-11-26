(function(){
// Ranks feature: table (You row, real data) for Terminal + full Ranks page. Needs rating.js.
var L=Lumio,E=function(t,x,c){return L.ui.el(t,x,c)},st=L.stats,t=L.t,sgn=L.sgn;if(!st)return;
Object.assign(L.S,{name:['Name','Nume'],ovr:['Overall','General'],week:['This week','Săptămâna asta'],addf:['Add friends','Adaugă prieteni'],nof:['No friends yet.','Încă niciun prieten.'],
 rk_lb:['Leaderboard','Clasament'],rk_fr:['Friends','Prieteni'],rk_week:['This week','Săptămâna asta'],rk_month:['This month','Luna asta'],rk_all:['Everyone','Toți'],rk_frs:['Friends','Prieteni'],
 rk_gain:['gain','câștig'],rk_view:['View','Vizualizare'],rk_per:['Period','Perioadă'],rk_show:['Show','Arată'],lb_demo:['Demo players. Your friends appear here once they join.','Jucători demo. Prietenii tăi apar aici când se alătură.']});
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
// Leaderboard (feature moon present; v1 renderRanks/rkBody/rowHTML): You + labelled Sample players, This week (weekly Moon gain) | This month (Moon)
var RK={per:'rk_month'};
function seg(lab,items,cur,on){var g=E('div',null,'pseg');g.setAttribute('role','group');g.setAttribute('aria-label',lab);
  items.forEach(function(x){var b=E('button',t(x));b.type='button';b.dataset.k=x;b.setAttribute('aria-pressed',x===cur);
    if(x==='rk_fr'||x==='rk_frs'){b.disabled=true;b.title=L.n(L.S.soon);b.append(E('small',L.n(L.S.soon)))}else if(on)b.onclick=function(){on(x)};g.append(b)});return g}
function board(){
  var M=L.moon,C=L.chal,wk=RK.per==='rk_week',o=L.overall(),tb=E('table',null,'ranks lb'),h=E('tr'),bd=E('tbody'),th=E('thead'),
      list=M.pool().sort(function(a,b){return wk?b.wk-a.wk:b.r-a.r});
  ['#',t('name'),t('ovr'),t('lum'),t('moon')+(wk?' · '+t('rk_gain'):''),t('week'),C?t('rk_ch'):''].forEach(function(x,i){var c=E('th',x);if(i===6)c.className='vh';h.appendChild(c)});
  list.forEach(function(p,i){
    var r=E('tr',null,p.me?'me':''),nm=E('span',null,'nm'),mg=E('span',p.name.charAt(0),'mg'),lu=E('td',null,'lu'),mo=E('td',null,'moon'),ch=E('td');
    mg.setAttribute('aria-hidden','true');nm.append(mg,E('b',p.name));if(p.sample)nm.append(E('span',t('sample'),'tag'));
    lu.append(E('small',t('lum')+' ','lb-l'),M.fmt(p.lum));mo.innerHTML=L.phase();mo.append(wk?(p.wk>=0?'+':'')+Math.round(p.wk):M.fmt(p.r));if(M.tname)mo.prepend(E('span',M.tname(p.r),'tier'));
    if(C&&!p.me)ch.append(C.btn(p));
    var n=E('td',null,'pl'),c2=E('td');n.append(String(i+1));c2.append(nm);
    r.append(n,c2,E('td',p.me?(o.r==null?t('new'):String(o.r)):'-'),lu,mo,E('td',p.me?sgn(L.week()):'-'),ch);bd.appendChild(r);
  });
  th.appendChild(h);tb.append(th,bd);return tb;
}
function page(){
  var rp=E('div',null,'r-in'),el=document.getElementById('ranks'),f=document.activeElement,fk=f&&el.contains(f)&&f.dataset.k;rp.append(E('h2',L.n(L.S.ranks)));
  if(!L.moon)rp.append(ranks(true));
  else{var re=function(k){RK.per=k;page()},top=E('div',null,'rk-seg');
    top.append(seg(t('rk_view'),['rk_lb','rk_fr'],'rk_lb'),seg(t('rk_per'),['rk_week','rk_month'],RK.per,re),seg(t('rk_show'),['rk_all','rk_frs'],'rk_all'));
    rp.append(top,board(),E('p',t('lb_demo'),'lb-demo'));if(L.chal)rp.append(L.chal.card())}
  el.replaceChildren(rp);rp.querySelectorAll('.pseg').forEach(L.seg);
  if(fk){var b=el.querySelector('.pseg [data-k="'+fk+'"]');if(b)b.focus()}
}
// Home preview (spec P7): only when 3+ rows exist (You + Sample players, by Moon): top 3 + You, no Challenge column; else null (compact)
function mini(){if(!L.moon)return null;var p=RK.per;RK.per='rk_month';var tb=board(),rows=[].slice.call(tb.tBodies[0].rows);RK.per=p;if(rows.length<3)return null;
  rows.forEach(function(r,i){if(i>=3&&!r.classList.contains('me'))r.remove()});[].forEach.call(tb.rows,function(r){if(r.cells[6])r.cells[6].remove()});return tb}
(window.LumioFeatures=window.LumioFeatures||{}).ranks={table:ranks,mini:mini};
L.boot(function(){page();L.on(function(s,k){if(s.tab!=='subjects'||k==='stats'||k==='progress'||k==='skin')page()})});
})();
