(function(){
var L=Lumio;
var SP='<svg viewBox="-1 -1 2 2" aria-hidden="true"><path d="M0-1L.35-.35 1 0 .35.35 0 1-.35.35-1 0-.35-.35Z"/></svg>';
function row(i,name,val,fn,dim){
  var b=document.createElement('button');b.type='button';b.className='row'+(dim?' dim':'');
  b.innerHTML='<span class="ix"></span><span class="n"></span><span class="v"></span>';
  b.children[0].textContent=i;b.children[1].textContent=name;b.onclick=fn;
  if(typeof val==='string')b.children[2].textContent=val;else b.children[2].appendChild(val);return b;
}
function spk(n){var e=document.createElement('span');e.className='spk';e.setAttribute('role','img');e.setAttribute('aria-label',n+'/3');
  e.innerHTML=SP+SP+SP;for(var j=0;j<n;j++)e.children[j].classList.add('on');return e}
L.spk=spk;
function bar(st){
  var el=document.getElementById('tabbar');el.replaceChildren();
  [['home',function(){L.go('home');L.setView('terminal')},st.view==='terminal'],['subjects',function(){if(st.view==='terminal')L.setView('tabs');L.go('galaxy',st.sid||L.subjects[0].id)},st.view!=='terminal'],['missions'],['ranks']].forEach(function(t){
    var b=L.ui.el('button',L.n(L.S[t[0]]));b.type='button';
    if(t[1])b.onclick=t[1];else{b.disabled=true;b.title=L.n(L.S.soon)}
    if(t[2])b.setAttribute('aria-current','page');el.appendChild(b);
  });
}
function render(st){
  var el=document.getElementById('tabs'),box=document.createElement('div'),h=document.createElement('h2'),s=L.subject();
  box.className='list';box.appendChild(h);
  if(st.level==='home'){
    h.textContent=L.n(L.S.subjects);
    L.subjects.forEach(function(x,i){box.appendChild(row(i+1,L.n(x.name),L.count(x),function(){L.go('galaxy',x.id)}))});
  }else{
    var top=L.ui.el('div',null,'thead'),mc=L.ui.el('canvas');mc.setAttribute('aria-hidden','true');
    top.append(L.head(s,L.n(L.S.subject)),mc);box.replaceChild(top,h);L.Galaxy.mini(mc,s);
    var cur=L.cur(s),c=L.contBtn(s);
    s.lessons.forEach(function(l,i){box.appendChild(row(i+1,L.n(l.name),!l.mod?L.n(L.S.soon):l===cur?L.n(L.S.now):spk(Math.min(3,Math.round(L.getP(L.key(s,l))*3))),function(){L.go('planet',s.id,l.id)},!l.mod))});
    if(c)box.appendChild(c);
  }
  el.innerHTML='';el.appendChild(box);bar(st);
}
document.addEventListener('DOMContentLoaded',function(){L.on(function(s,k){if(k!=='stats')render(s)});render(L.state)});
})();
