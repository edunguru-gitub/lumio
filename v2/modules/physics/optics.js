(function(){
(window.LumioModules=window.LumioModules||{})['physics/optics']={
  render:function(el,ctx){
    var h=document.createElement('h1'),p=document.createElement('p'),b=document.createElement('button');
    h.textContent=ctx.n(ctx.lesson.name);p.textContent=ctx.n(ctx.subject.name);
    b.type='button';b.className='btn-primary';b.style.setProperty('--c',ctx.color);
    b.textContent=ctx.n(ctx.S.cont)+' →';b.onclick=ctx.done;
    el.append(h,p,b);
  }
};
})();
