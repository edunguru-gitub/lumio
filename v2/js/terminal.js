(function(){
// Terminal view: player card, meters, rankings (You only), lesson cards, gain ticker. Data from L.stats / L.rate.
var L=Lumio,E=function(t,x,c){return L.ui.el(t,x,c)},st=L.stats;
Object.assign(L.S,{you:['You','Tu'],rated:['{a} of {b} rated','{a} din {b} evaluate'],start:['Start a lesson','Începe o lecție'],nost:['Not started','Neînceput'],
 lum:['Lumens','Lumeni'],lum_s:['All time','În total'],moon:['Moon','Luna'],noch:['No challenges yet','Încă nicio provocare'],streak:['Streak','Serie'],best:['Best {n}','Record {n}'],
 days:['Days left','Zile rămase'],month:['This month','Luna aceasta'],lessons:['Lessons','Lecții'],name:['Name','Nume'],ovr:['Overall','General'],week:['This week','Săptămâna asta'],
 addf:['Add friends','Adaugă prieteni'],nof:['No friends yet.','Încă niciun prieten.'],contl:['Continue learning','Continuă să înveți'],
 recent:['Recent','Recente'],noact:['No activity yet','Nicio activitate încă']});
var CODE={physics:'PHY',math:'MAT',spanish:'SPA',life:'LIF'};
function t(k,o){var s=L.n(L.S[k]);for(var p in o)s=s.replace('{'+p+'}',o[p]);return s}
function num(r){return r==null?'--':String(r)}
function tier(el,r,c){el.classList.toggle('t1',r!=null&&r>=60&&r<80);el.classList.toggle('t2',r!=null&&r>=80);if(c)el.style.setProperty('--c',c)}
function stats(rows){var d=E('div',null,'cstats');rows.forEach(function(r){var c=E('div');c.append(E('small',r[0]),E('b',r[1]));d.appendChild(c)});return d}
function sgn(n){return n>0?'+'+n:n<0?'−'+-n:'0'}
function daysLeft(){var d=new Date();return new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate()+1}
function phase(){var d=new Date(),dim=new Date(d.getFullYear(),d.getMonth()+1,0).getDate(),f=Math.min(1,(d.getDate()-1)/(dim-1||1)),rx=(6*Math.abs(1-2*f)).toFixed(2);
  return'<svg class="mph" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/>'+(f>.02?'<path d="M8 2 A6 6 0 0 1 8 14 A'+rx+' 6 0 0 '+(f<.5?0:1)+' 8 2Z" fill="currentColor"/>':'')+'</svg>'}
function player(){
  var o=L.overall(),c=E('div',null,'card pcard'),top=E('div',null,'ctop'),ov=E('div',null,'ov'),mono=E('div',null,'mono'),nm=t('you');
  tier(c,o.r,'var(--tan)');ov.append(E('b',num(o.r)),E('small','OVR'));top.append(ov,L.spk(o.r==null?0:Math.round(o.r/33)));
  mono.textContent=nm.charAt(0);mono.setAttribute('aria-hidden','true');
  c.append(top,mono,E('h3',nm),E('p',o.r==null?t('start'):t('rated',{a:o.n,b:o.of}),'csub'),
    stats(L.subjects.map(function(s){return[CODE[s.id],num(L.subAvg(s))]})));
  return c;
}
function lcard(x){
  var s=x.s,l=x.l,k=x.k,r=l.mod?L.rate(k):null,v=st.les[k]||{},n=(v.ok||0)+(v.bad||0),
      b=E('button',null,'card lcard'+(l.mod?'':' lock')),top=E('div',null,'ctop'),ov=E('div',null,'ov'),mc=E('canvas'),big=E('b',num(r));
  b.type='button';b.dataset.k=k;tier(b,r,s.color);b.onclick=function(){L.go('planet',s.id,l.id)};
  ov.append(big,E('small',l.name[0].slice(0,3).toUpperCase()));top.append(ov,L.spk(r==null?0:Math.round(r/33)));
  mc.setAttribute('aria-hidden','true');L.Galaxy.mini(mc,s);
  b.append(top,mc,E('h3',L.n(l.name)),E('p',!l.mod?L.n(L.S.soon):r==null?t('nost'):' ','csub'),
    stats([['PRG',num(l.mod&&r!=null?Math.round(L.getP(k)*99):null)],['QST',num(v.qt&&r!=null?Math.round(v.qd/v.qt*99):null)],['ACC',num(n?Math.round(v.ok/n*99):null)]]));
  b.setAttribute('aria-label',L.n(l.name)+', '+(l.mod?(r==null?t('nost'):r):L.n(L.S.soon)));
  return b;
}
function meter(lab,val,sub,cls,html){var d=E('div',null,'meter'),b=E('b',val,cls);if(html)b.insertAdjacentHTML('afterbegin',html);d.append(E('small',lab),b,E('p',sub));return d}
function ticker(){
  var u=E('ul',null,'tick');u.setAttribute('aria-label',t('recent'));
  if(!st.log.length)u.appendChild(E('li',t('noact')));
  st.log.slice(0,5).forEach(function(e){var x=L.lessons().filter(function(y){return y.k===e.k})[0];
    u.appendChild(E('li',(x?x.l.name[0].slice(0,3).toUpperCase():e.k)+'  '+(e.lum?'+'+e.lum+' '+t('lum'):'')+(e.d?'  '+sgn(e.d):'')))});
  return u;
}
function ranks(){
  var o=L.overall(),tb=E('table',null,'ranks'),h=E('tr'),r=E('tr',null,'me'),f=E('tr',null,'nof'),td=E('td'),btn=E('button',t('addf'),'outline');
  ['#',t('name'),t('ovr'),t('lum'),t('week')].forEach(function(x){h.appendChild(E('th',x))});
  ['1',t('you'),num(o.r),String(st.lum),sgn(L.week())].forEach(function(x){r.appendChild(E('td',x))});
  btn.type='button';btn.disabled=true;btn.title=L.n(L.S.soon);td.colSpan=5;td.append(E('span',t('nof')),btn);f.appendChild(td);
  var th=E('thead'),bd=E('tbody');th.appendChild(h);bd.append(r,f);tb.append(th,bd);return tb;
}
function count(el,from,to){
  if(L.reduced()){el.textContent=to;return}
  var t0=performance.now();el.parentNode.parentNode.parentNode.classList.add('pop');
  (function f(now){var u=Math.min(1,(now-t0)/1200);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-u,3)));if(u<1)requestAnimationFrame(f)})(t0);
}
function render(){
  var el=document.getElementById('term'),y=el.scrollTop,o=E('div',null,'t-in'),rt=E('div',null,'t-right'),me=E('div',null,'meters'),ls=E('div',null,'t-les'),tk=ticker();
  me.append(meter(t('lum'),String(st.lum),t('lum_s'),'lum'),meter(t('moon'),'1000',t('noch'),'moon',phase()),
    meter(t('streak'),String(st.streak),t('best',{n:st.best})),meter(t('days'),String(daysLeft()),t('month')));
  ls.appendChild(E('h2',t('lessons')));
  L.subjects.forEach(function(s){var g=E('div',null,'lgrid');ls.appendChild(E('h4',L.n(s.name)));
    L.lessons().filter(function(x){return x.s===s}).forEach(function(x){g.appendChild(lcard(x))});ls.appendChild(g)});
  var tm=tk.cloneNode(true);tm.classList.add('tick-m');
  var cs=L.subjects.filter(function(x){return L.cur(x)})[0];
  if(cs){var cb=E('button',t('contl')+' →','btn-primary');cb.type='button';cb.style.setProperty('--c','var(--tan)');cb.onclick=function(){L.go('planet',cs.id,L.cur(cs).id)};rt.appendChild(cb)}
  rt.append(me,tm,E('h2',L.n(L.S.ranks)),ranks(),ls);o.append(player(),rt);
  el.replaceChildren(o,tk);el.scrollTop=y;
  var f=L.fresh,c;
  if(f&&L.state.level!=='planet'){L.fresh=null;c=el.querySelector('[data-k="'+f.k+'"]');
    if(c){var tr=el.getBoundingClientRect(),cr=c.getBoundingClientRect();if(cr.top<tr.top||cr.bottom>tr.bottom)el.scrollTo({top:el.scrollTop+cr.top-tr.top-24,behavior:L.reduced()?'auto':'smooth'});var r=L.rate(f.k);if(r!=null)count(c.querySelector('.ov b'),f.from||0,r)}}
}
document.addEventListener('DOMContentLoaded',function(){
  render();
  L.on(function(s,k){if(s.view==='terminal'&&s.level!=='planet'||k==='stats'||k==='progress')render()});
});
})();
