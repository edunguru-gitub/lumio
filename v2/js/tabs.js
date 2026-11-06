(function(){
var L=Lumio;
function row(c,name,val,fn){
  var b=document.createElement('button');b.type='button';b.className='row';b.style.setProperty('--c',c);
  b.innerHTML='<span class="dot"></span><span class="n"></span><span class="v"></span>';
  b.children[1].textContent=name;b.children[2].textContent=val;b.onclick=fn;return b;
}
function render(st){
  var el=document.getElementById('tabs'),box=document.createElement('div'),h=document.createElement('h2'),s=L.subject();
  box.className='list';box.appendChild(h);
  if(st.level==='home'){
    h.textContent=L.n(L.S.subjects);
    L.subjects.forEach(function(x){box.appendChild(row(x.color,L.n(x.name),Math.round(L.sp(x)*100)+'%',function(){L.go('galaxy',x.id)}))});
  }else{
    h.textContent=L.n(s.name);
    s.lessons.forEach(function(l){box.appendChild(row(s.color,L.n(l.name),Math.round(L.getP(L.key(s,l))*100)+'%',function(){L.go('planet',s.id,l.id)}))});
  }
  el.innerHTML='';el.appendChild(box);
}
document.addEventListener('DOMContentLoaded',function(){L.on(render);render(L.state)});
})();
