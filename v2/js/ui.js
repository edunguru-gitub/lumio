(function(){
var U=Lumio.ui={},rm=matchMedia('(prefers-reduced-motion: reduce)');
U.el=function(tag,txt,cls){var e=document.createElement(tag);if(txt!=null)e.textContent=txt;if(cls)e.className=cls;return e};
U.col=function(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()};
U.n2=function(x){return(Math.round(x*100)/100).toString().replace('-','−')};
U.slider=function(lab,min,max,step,val,fmt,on){
  var w=U.el('label',null,'sl'),i=U.el('input'),o=U.el('output');i.type='range';i.min=min;i.max=max;i.step=step;
  w.append(U.el('b',lab),i,o);w.style.setProperty('--n',Math.round((max-min)/step));w.dataset.min=fmt(min);w.dataset.max=fmt(max);w.set=function(v){i.value=v;o.textContent=fmt(v);w.style.setProperty('--p',(v-min)/(max-min))};
  i.oninput=function(){w.set(+i.value);Lumio.fx.tick();on(+i.value)};w.set(val);return w;
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
// v1 gridMap + mdot (mini labs): grid --line, labels + axes --muted, mono 11; o {x0,x1,y0,y1,sx,sy,fx?,fy?}; returns {X,Y} data->px
U.gridMap=function(c,w,h,o){var pl=34,pr=12,pt=12,pb=26,x,y,mu=U.col('--muted'),X=function(x){return pl+(x-o.x0)/(o.x1-o.x0)*(w-pl-pr)},Y=function(y){return h-pb-(y-o.y0)/(o.y1-o.y0)*(h-pt-pb)};
  c.lineWidth=1;c.strokeStyle=U.col('--line');c.fillStyle=mu;c.font='11px '+U.col('--mono');c.textAlign='center';c.textBaseline='top';
  for(x=Math.ceil(o.x0/o.sx)*o.sx;x<=o.x1+1e-9;x+=o.sx){c.beginPath();c.moveTo(X(x),Y(o.y0));c.lineTo(X(x),Y(o.y1));c.stroke();c.fillText(o.fx?o.fx(x):x,X(x),h-pb+6)}
  c.textAlign='right';c.textBaseline='middle';for(y=Math.ceil(o.y0/o.sy)*o.sy;y<=o.y1+1e-9;y+=o.sy){c.beginPath();c.moveTo(X(o.x0),Y(y));c.lineTo(X(o.x1),Y(y));c.stroke();c.fillText(o.fy?o.fy(y):y,pl-6,Y(y))}
  c.strokeStyle=mu;c.lineWidth=1.5;c.beginPath();if(o.y0<=0&&o.y1>=0){c.moveTo(X(o.x0),Y(0));c.lineTo(X(o.x1),Y(0))}if(o.x0<=0&&o.x1>=0){c.moveTo(X(0),Y(o.y0));c.lineTo(X(0),Y(o.y1))}c.stroke();return{X:X,Y:Y}};
U.mdot=function(c,x,y,r,fill,stroke){c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}};
U.cont=function(ctx){var b=U.el('button',ctx.n(ctx.S.cont)+' →','btn-primary');b.type='button';b.style.setProperty('--c',ctx.color);b.onclick=ctx.done;return b};
// modal dialog: native <dialog> (focus kept inside, Esc closes, focus returns to opener), backdrop click closes, removed on close
var dn=0;Object.assign(Lumio.S,{close:['Close','Închide']});
U.dialog=function(title,nodes){
  var d=U.el('dialog',null,'udlg'),w=U.el('div'),x=U.el('button','×','udlg-x'),h=U.el('h2',title);
  h.id='udlg'+(++dn);d.setAttribute('aria-labelledby',h.id);x.type='button';x.setAttribute('aria-label',Lumio.n(Lumio.S.close));x.onclick=function(){d.close()};
  w.append.apply(w,[x,h].concat(nodes));d.append(w);
  d.addEventListener('click',function(e){if(e.target===d)d.close()});d.addEventListener('close',function(){d.remove()});
  document.body.append(d);d.showModal();return d;
};
U.gone=function(el,f){var mo=new MutationObserver(function(){if(!el.isConnected){f();mo.disconnect()}});mo.observe(document.body,{childList:true,subtree:true})};
})();
