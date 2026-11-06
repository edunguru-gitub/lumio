(function(){
// ported from app/lumio.html geometry lab: GEO, updGeo, drawGeo
var S={cv:['Right triangle with squares on each side. Drag the corners to change a and b.','Triunghi dreptunghic cu pătrate pe laturi. Trage colțurile pentru a schimba a și b.'],
 hyp:['Hypotenuse','Ipotenuza'],area:['Area','Aria'],perim:['Perimeter','Perimetru'],angles:['Angles','Unghiuri'],
 qg:['Quest: find 3 different Pythagorean triples ({n}/3)','Misiune: găsește 3 triplete pitagorice diferite ({n}/3)'],qg_done:['Quest complete','Misiune îndeplinită'],
 triple:['Pythagorean triple. All sides are whole numbers.','Triplet pitagoric. Toate laturile sunt numere întregi.'],
 gh_45:['Equal legs → a 45° isosceles right triangle.','Catete egale → triunghi dreptunghic isoscel de 45°.'],
 gh_gen:['Drag a and b: the big square on c always equals the two small squares together.','Trage a și b: pătratul mare de pe c este mereu egal cu cele două pătrate mici.'],
 title:['Right Triangle Lab','Laboratorul triunghiului dreptunghic']};
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
// manifest: shell builds subjects, planets, rows and cards from this (id = progress key part)
(window.LumioModules=window.LumioModules||{})['math/pythagoras']={manifest:{id:'geometry',subject:'math',subjectName:['Math','Matematică'],color:'--math',title:['Geometry','Geometrie'],order:3,tags:['lab'],orbit:[1.9,60]},
render:function(el,ctx){
  var U=ctx.ui,n2=U.n2,t=function(k,n){return ctx.n(S[k]).replace('{n}',n)},G={a:3,b:4,seen:new Set(),done:false,live:false},drag=null,
      C={ink:U.col('--ink'),card:U.col('--card'),mono:U.col('--mono'),tan:U.col('--tan'),rose:U.col('--bad')},fx=ctx.fx,
      cv=U.canvas(t('cv'),draw),fo=U.el('div',null,'formula'),big=U.el('div',null,'big'),bd=U.el('div',null,'badge'),ti=U.el('div',null,'tiles'),hi=U.el('p'),qu=U.el('div',null,'quest'),
      sa=U.slider('a',1,12,.5,G.a,n2,function(v){G.a=v;upd()}),sb=U.slider('b',1,12,.5,G.b,n2,function(v){G.b=v;upd()}),
      ch=U.chips([[3,4],[5,12],[6,8],[1,1]].map(function(p,i){return[p[0]+' · '+p[1],[null,ctx.color,C.rose,C.tan][i]]}),function(i){var p=[[3,4],[5,12],[6,8],[1,1]][i];fx.pop();U.tween(G,{a:p[0],b:p[1]},function(end){sa.set(n2r(G.a));sb.set(n2r(G.b));end?upd():draw()})});
  function n2r(v){return Math.round(v*2)/2}
  el.style.setProperty('--c',ctx.color);bd.setAttribute('aria-live','polite');ctx.report({qt:3});qu.setAttribute('aria-live','polite');
  el.classList.add('lab-2');el.append(U.el('h1',t('title')),cv,big,sa,sb,ch,fo,bd,ti,hi,qu,U.cont(ctx));
  function upd(){var a=G.a,b=G.b,c=Math.hypot(a,b),tri=Number.isInteger(a)&&Number.isInteger(b)&&Number.isInteger(c),al=Math.atan2(b,a)*180/Math.PI;
    sa.set(a);sb.set(b);
    big.textContent='c = '+c.toFixed(2);fo.textContent=n2(a)+'² + '+n2(b)+'² = '+n2(a*a+b*b)+'  →  c = '+n2(c);
    bd.textContent=tri?Math.min(a,b)+'-'+Math.max(a,b)+'-'+c:'';
    U.tiles(ti,[[t('hyp')+' c',n2(c)],[t('area')+' ab/2',n2(a*b/2)],[t('perim'),n2(a+b+c)],[t('angles'),al.toFixed(1)+'° / '+(90-al).toFixed(1)+'°']]);
    if(tri&&G.live){var k=Math.min(a,b)+'-'+Math.max(a,b);if(!G.seen.has(k)){G.seen.add(k);var third=G.seen.size>=3&&!G.done;fx.ok();fx.burst(70);if(third){G.done=true;fx.burst(160)}
      // v1: +10 per new triple, +30 more on the third
      ctx.report({qd:Math.min(3,G.seen.size)});ctx.award(third?40:10)}}
    qu.classList.toggle('done',G.done);qu.textContent=G.done?t('qg_done'):t('qg',Math.min(3,G.seen.size));
    hi.textContent=tri?t('triple'):(a===b?t('gh_45'):t('gh_gen'));
    draw();}
  function geom(w,h){var a=G.a,b=G.b,s=drag?drag.s:.84*Math.min(w/(a+2*b),h/(2*a+b)),ox=w/2,oy=h/2,cx=drag?drag.cx:a/2,cy=drag?drag.cy:b/2;
    return{s:s,cx:cx,cy:cy,W:function(x,y){return[ox+(x-cx)*s,oy-(y-cy)*s]},inv:function(px,py){return[(px-ox)/s+cx,-(py-oy)/s+cy]}}}
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,w=f.w,h=f.h,a=G.a,b=G.b,cc=Math.hypot(a,b),tri=Number.isInteger(a)&&Number.isInteger(b)&&Number.isInteger(cc),g=geom(w,h),s=g.s,W=g.W;
    var sq=function(O,u,v,L,al,lab){var P=function(i,j){return W(O[0]+u[0]*i+v[0]*j,O[1]+u[1]*i+v[1]*j)},q=[P(0,0),P(L,0),P(L,L),P(0,L)],path=function(){c.beginPath();q.forEach(function(p,i){i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])});c.closePath()};
      c.globalAlpha=al;c.fillStyle=ctx.color;path();c.fill();
      c.globalAlpha=.25;c.strokeStyle=ctx.color;c.lineWidth=1;c.beginPath();for(var i=1;i<L;i++){var p0=P(i,0),p1=P(i,L),p2=P(0,i),p3=P(L,i);c.moveTo(p0[0],p0[1]);c.lineTo(p1[0],p1[1]);c.moveTo(p2[0],p2[1]);c.lineTo(p3[0],p3[1])}c.stroke();
      c.globalAlpha=1;c.lineWidth=1.5;path();c.stroke();var m=P(L/2,O[0]>0?L/2:L/4);c.fillStyle=C.ink;c.font='500 '+clamp(s*1.1,11,16)+'px '+C.mono;c.textAlign='center';c.textBaseline='middle';c.fillText(lab,m[0],m[1])};
    c.lineJoin='round';
    sq([0,-a],[1,0],[0,1],a,.12,'a²='+n2(a*a));sq([-b,0],[1,0],[0,1],b,.18,'b²='+n2(b*b));sq([a,0],[-a/cc,b/cc],[b/cc,a/cc],cc,.26,'c²='+n2(cc*cc));
    var A=W(0,0),B=W(a,0),Cc=W(0,b);c.fillStyle=C.card;c.beginPath();c.moveTo(A[0],A[1]);c.lineTo(B[0],B[1]);c.lineTo(Cc[0],Cc[1]);c.closePath();c.fill();c.strokeStyle=tri?ctx.color:C.ink;c.lineWidth=tri?3:2;c.stroke();
    var r=Math.min(.8,a/3,b/3),R1=W(r,0),R2=W(r,r),R3=W(0,r);c.strokeStyle=C.ink;c.lineWidth=1.5;c.beginPath();c.moveTo(R1[0],R1[1]);c.lineTo(R2[0],R2[1]);c.lineTo(R3[0],R3[1]);c.stroke();
    [B,Cc].forEach(function(p){c.fillStyle=ctx.color;c.beginPath();c.arc(p[0],p[1],6,0,7);c.fill()});
    var lab=function(txt,p,dx,dy){c.font='500 '+clamp(s*1.1,11,15)+'px '+C.mono;var tw=c.measureText(txt).width+10;c.fillStyle=C.card;c.fillRect(p[0]+dx-tw/2,p[1]+dy-10,tw,20);c.fillStyle=C.ink;c.textAlign='center';c.textBaseline='middle';c.fillText(txt,p[0]+dx,p[1]+dy)};
    lab('a = '+n2(a),W(a/2,0),0,16);lab('b = '+n2(b),W(0,b/2),-34,0);lab('c = '+n2(cc),W(a/2,b/2),0,0);
    var al=Math.atan2(b,a)*180/Math.PI;c.fillStyle=C.ink;c.font='500 12px '+C.mono;c.textAlign='right';c.fillText('α '+al.toFixed(1)+'°',B[0]-8,B[1]-8);c.textAlign='left';c.fillText('β '+(90-al).toFixed(1)+'°',Cc[0]+8,Cc[1]+18);}
  // drag corner B (changes a) or C (changes b); scale frozen while dragging
  function pt(e){var r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}
  cv.onpointerdown=function(e){var p=pt(e),g=geom(cv.clientWidth,cv.clientHeight),B=g.W(G.a,0),Cc=g.W(0,G.b),dB=Math.hypot(p[0]-B[0],p[1]-B[1]),dC=Math.hypot(p[0]-Cc[0],p[1]-Cc[1]);
    if(Math.min(dB,dC)>40)return;cancelAnimationFrame(G._tw);drag={k:dB<dC?'a':'b',s:g.s,cx:g.cx,cy:g.cy};cv.setPointerCapture(e.pointerId)};
  cv.onpointermove=function(e){if(!drag)return;var g=geom(cv.clientWidth,cv.clientHeight),q=g.inv.apply(null,pt(e)),v=n2r(clamp(drag.k==='a'?q[0]:q[1],1,12));if(v!==G[drag.k]){G[drag.k]=v;upd()}};
  cv.onpointerup=cv.onpointercancel=function(){if(drag){drag=null;draw()}};
  upd();G.live=true;
}};
})();
