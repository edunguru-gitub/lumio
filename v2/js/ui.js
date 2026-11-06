(function(){
var U=Lumio.ui={},rm=matchMedia('(prefers-reduced-motion: reduce)');
U.el=function(tag,txt,cls){var e=document.createElement(tag);if(txt!=null)e.textContent=txt;if(cls)e.className=cls;return e};
U.col=function(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()};
U.n2=function(x){return(Math.round(x*100)/100).toString().replace('-','−')};
U.slider=function(lab,min,max,step,val,fmt,on){
  var w=U.el('label',null,'sl'),i=U.el('input'),o=U.el('output');i.type='range';i.min=min;i.max=max;i.step=step;
  w.append(U.el('b',lab),i,o);w.set=function(v){i.value=v;o.textContent=fmt(v)};
  i.oninput=function(){o.textContent=fmt(+i.value);on(+i.value)};w.set(val);return w;
};
U.chips=function(list,on){var d=U.el('div',null,'chips');list.forEach(function(p,i){var b=U.el('button',p[0],'chip');b.type='button';if(p[1])b.style.color=p[1];b.onclick=function(){on(i)};d.appendChild(b)});return d};
U.tiles=function(box,rows){box.replaceChildren.apply(box,rows.map(function(r){var d=U.el('div',null,'tile');d.append(U.el('small',r[0]),U.el('b',r[1]));return d}))};
U.canvas=function(label,draw){
  var cv=U.el('canvas',null,'lab-cv');cv.setAttribute('role','img');cv.setAttribute('aria-label',label);
  cv.fit=function(){var d=devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return null;
    if(cv.width!==Math.round(w*d)||cv.height!==Math.round(h*d)){cv.width=Math.round(w*d);cv.height=Math.round(h*d)}
    var c=cv.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,w,h);return{c:c,w:w,h:h}};
  new ResizeObserver(function(){draw()}).observe(cv);return cv;
};
// ease-out tween of numeric fields on o; instant on reduced motion
U.tween=function(o,to,each){
  var from={},k,t0=performance.now();for(k in to)from[k]=o[k];cancelAnimationFrame(o._tw);
  if(rm.matches){for(k in to)o[k]=to[k];each(true);return}
  (function f(now){var u=Math.min(1,(now-t0)/400),e=1-Math.pow(1-u,3);for(k in to)o[k]=u<1?from[k]+(to[k]-from[k])*e:to[k];each(u>=1);if(u<1)o._tw=requestAnimationFrame(f)})(t0);
};
U.cont=function(ctx){var b=U.el('button',ctx.n(ctx.S.cont)+' →','btn-primary');b.type='button';b.style.setProperty('--c',ctx.color);b.onclick=ctx.done;return b};
U.gone=function(el,f){var mo=new MutationObserver(function(){if(!el.isConnected){f();mo.disconnect()}});mo.observe(document.body,{childList:true,subtree:true})};
})();
