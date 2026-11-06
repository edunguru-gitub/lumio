(function(){
var L=Lumio;
var SP='<svg viewBox="0 0 64 70" aria-hidden="true"><path d="M32 4 C34 22 41 29 60 35 C41 41 34 48 32 66 C30 48 23 41 4 35 C23 29 30 22 32 4 Z"/></svg>';
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
  ['home','subjects','ranks'].filter(L.tabOk).forEach(function(t){
    var b=L.ui.el('button',L.n(L.S[t]));b.type='button';b.onclick=function(){L.setTab(t)};
    if(st.tab===t)b.setAttribute('aria-current','page');el.appendChild(b);
  });
  L.seg(el);
}
function render(st){
  var el=document.getElementById('tabs'),box=document.createElement('div'),h=document.createElement('h2'),s=L.subject();
  box.className='list';box.appendChild(h);
  if(st.level==='home'){
    h.textContent=L.n(L.S.subjects);
    box.classList.add('wide');L.subjects.forEach(function(x,i){box.appendChild(row(i+1,L.n(x.name),L.count(x),function(){L.go('galaxy',x.id)}))});
    if(L.lessonGrid)box.appendChild(L.lessonGrid());
  }else{
    var top=L.ui.el('div',null,'thead'),mc=L.ui.el('canvas');mc.setAttribute('aria-hidden','true');
    top.append(L.head(s,L.n(L.S.subject)),mc);box.replaceChild(top,h);L.Galaxy.mini(mc,s);
    var cur=L.cur(s),c=L.contBtn(s);
    s.lessons.forEach(function(l,i){box.appendChild(row(i+1,L.n(l.name),!l.mod?L.n(L.S.soon):l===cur?L.n(L.S.now):spk(Math.min(3,Math.round(L.getP(L.key(s,l))*3))),function(){L.go('planet',s.id,l.id)},!l.mod))});
    if(c)box.appendChild(c);
  }
  el.innerHTML='';el.appendChild(box);bar(st);
}
L.boot(function(){L.on(function(s,k){if(k!=='stats')render(s)});render(L.state)});
})();
