(function(){
// ported from app/lumio.html: updLearn, drawParab, poly (v1 LEARN)
var S={cv:['Parabola graph','Graficul parabolei'],p_frown:['Frown','Tristă'],delta:['Delta','Delta'],vertex:['Vertex','Vârf'],roots:['Roots','Rădăcini'],axis:['Axis','Axa'],
 no_roots:['no real roots','fără rădăcini reale'],line_only:['a = 0 → just a line','a = 0 → doar o dreaptă'],
 h_pos:['The curve cuts the x-axis twice. Slide c up and watch the roots merge.','Curba taie axa Ox de două ori. Urcă c și vezi cum se unesc rădăcinile.'],
 h_zero:['Perfect square. The vertex touches the x-axis.','Pătrat perfect. Vârful atinge axa Ox.'],
 h_neg:['The parabola floats away from the x-axis. No real roots.','Parabola plutește deasupra axei Ox. Fără rădăcini reale.'],
 h_line:['Careful: with a = 0 there is no parabola.','Atenție: cu a = 0 nu există parabolă.'],
 smile:['a > 0: opens up ∪','a > 0: deschisă în sus ∪'],frown:['a < 0: opens down ∩','a < 0: deschisă în jos ∩'],
 quest:['Quest: make Δ = 0 (a ≠ 0)','Misiune: fă Δ = 0 (a ≠ 0)'],quest_done:['Quest complete','Misiune îndeplinită']};
function poly(a,b,c){var ps=[],add=function(co,v){if(co===0)return;var ab=Math.abs(co);ps.push({neg:co<0,body:(ab===1&&v)?v:String(ab)+v})};add(a,'x²');add(b,'x');add(c,'');if(!ps.length)return'0';return ps.map(function(p,i){return(i===0?(p.neg?'−':''):(p.neg?' − ':' + '))+p.body}).join('')}
(window.LumioModules=window.LumioModules||{})['math/parabola']={render:function(el,ctx){
  var U=ctx.ui,n2=U.n2,t=function(k){return ctx.n(S[k])},L={a:1,b:-4,c:3,quest:false},
      C={line:U.col('--line'),ink:U.col('--ink'),muted:U.col('--muted'),card:U.col('--card'),mono:U.col('--mono')},
      cv=U.canvas(t('cv'),draw),fo=U.el('div',null,'formula'),ti=U.el('div',null,'tiles'),hi=U.el('p'),qu=U.el('div',null,'quest'),
      sl=[['a',-5,5,.5],['b',-10,10,1],['c',-8,8,1]].map(function(d){return U.slider(d[0],d[1],d[2],d[3],L[d[0]],n2,function(v){L[d[0]]=v;upd()})}),
      ch=U.chips([['Δ > 0'],['Δ = 0'],['Δ < 0'],[t('p_frown')]],function(i){var p=[[1,-4,3],[1,2,1],[1,0,2],[-1,2,3]][i];L.a=p[0];L.b=p[1];L.c=p[2];sl.forEach(function(s,j){s.set(p[j])});upd()});
  el.style.setProperty('--c',ctx.color);qu.setAttribute('aria-live','polite');ctx.report({qt:1});
  el.append(U.el('h1',ctx.n(ctx.lesson.name)),cv,U.el('p','f(x) = ax² + bx + c','cap'),fo,sl[0],sl[1],sl[2],ch,ti,hi,qu,U.cont(ctx));
  function upd(){var a=L.a,b=L.b,c=L.c,D=b*b-4*a*c,rt='—',vx='—',ax='—',ht;
    fo.textContent='f(x) = '+poly(a,b,c);
    if(a!==0){var xv=-b/(2*a),yv=-D/(4*a);vx='V('+n2(xv)+' , '+n2(yv)+')';ax='x = '+n2(xv);
      if(D>0){var s=Math.sqrt(D),r1=(-b-s)/(2*a),r2=(-b+s)/(2*a);rt='x₁='+n2(Math.min(r1,r2))+', x₂='+n2(Math.max(r1,r2));ht=t('h_pos')}
      else if(D===0){rt='x₁=x₂='+n2(xv);ht=t('h_zero')}else{rt=t('no_roots');ht=t('h_neg')}}
    else{rt=t('line_only');ht=t('h_line')}
    U.tiles(ti,[[t('delta')+' = b²−4ac',n2(D)],[t('vertex'),vx],[t('roots'),rt],[t('axis'),ax]]);
    hi.textContent=ht+(a>0?' · '+t('smile'):a<0?' · '+t('frown'):'');
    var was=L.quest;L.quest=a!==0&&D===0;if(L.quest&&!was&&ctx.report({qd:1}))ctx.award(20);qu.classList.toggle('done',L.quest);qu.textContent=t(L.quest?'quest_done':'quest');
    draw();}
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,w=f.w,h=f.h,s=Math.min(w/20,h/13),ox=w/2,oy=h/2,X=function(x){return ox+x*s},Y=function(y){return oy-y*s},x,y;
    c.lineWidth=1;c.strokeStyle=C.ink;c.globalAlpha=.08;c.beginPath();for(x=-Math.ceil(ox/s);x<=Math.ceil(ox/s);x++){c.moveTo(X(x),0);c.lineTo(X(x),h)}for(y=-Math.ceil(oy/s);y<=Math.ceil(oy/s);y++){c.moveTo(0,Y(y));c.lineTo(w,Y(y))}c.stroke();
    c.strokeStyle=C.ink;c.globalAlpha=.4;c.lineWidth=1;c.beginPath();c.moveTo(0,oy);c.lineTo(w,oy);c.moveTo(ox,0);c.lineTo(ox,h);c.stroke();c.globalAlpha=1;
    c.fillStyle=C.muted;c.font='11px '+C.mono;c.textAlign='center';for(x=-9;x<=9;x+=3)if(x&&Math.abs(X(x)-ox)<ox)c.fillText(x,X(x),oy+15);c.textAlign='right';for(y=-6;y<=6;y+=3)if(y&&Math.abs(Y(y)-oy)<oy)c.fillText(y,ox-5,Y(y)+4);
    var a=L.a,b=L.b,cc=L.c,fn=function(x){return a*x*x+b*x+cc},D=b*b-4*a*cc;
    if(a!==0){var xv=-b/(2*a);c.setLineDash([6,6]);c.strokeStyle=C.muted;c.lineWidth=1.5;c.beginPath();c.moveTo(X(xv),0);c.lineTo(X(xv),h);c.stroke();c.setLineDash([])}
    c.strokeStyle=ctx.color;c.lineWidth=2;c.lineCap='round';c.lineJoin='round';c.beginPath();var pen=false;
    for(var px=0;px<=w;px+=2){var py=Y(fn((px-ox)/s));if(py<-200||py>h+200){pen=false;continue}if(!pen){c.moveTo(px,py);pen=true}else c.lineTo(px,py)}c.stroke();
    var dot=function(x,y,fill,r,lab){if(X(x)<0||X(x)>w||Y(y)<0||Y(y)>h)return;c.fillStyle=fill;c.strokeStyle=C.ink;c.lineWidth=1.5;c.beginPath();c.arc(X(x),Y(y),r,0,7);c.fill();c.stroke();
      if(lab){c.fillStyle=C.ink;c.font='500 12px '+C.mono;c.textAlign='left';c.fillText(lab,X(x)+r+4,Y(y)-r)}};
    dot(0,cc,C.card,5,'c');
    if(a!==0){var yv=fn(xv);dot(xv,yv,ctx.color,7,'V('+n2(xv)+', '+n2(yv)+')');if(D>=0){var q=Math.sqrt(D);dot((-b-q)/(2*a),0,C.ink,5);if(D>0)dot((-b+q)/(2*a),0,C.ink,5)}}}
  upd();
}};
})();
