(function(){
// ported from app/lumio.html PRACTICE: genQ, checkAns, hintQ, poly (handwriting pad replaced by typed answer)
var S={q_delta:['Compute Δ = b² − 4ac','Calculează Δ = b² − 4ac'],q_xv:['Find the x of the vertex: x_V = −b / 2a','Află abscisa vârfului: x_V = −b / 2a'],
 q_f0:['Compute f(0)','Calculează f(0)'],q_f1:['Compute f(1)','Calculează f(1)'],q_root:['Find the LARGER root','Află rădăcina MAI MARE'],
 h_delta:['Δ = b² − 4·a·c = {b}² − 4·({a})·({c})','Δ = b² − 4·a·c = {b}² − 4·({a})·({c})'],h_xv:['x_V = −({b}) / (2·{a})','x_V = −({b}) / (2·{a})'],
 h_f0:['f(0) = c','f(0) = c'],h_f1:['f(1) = a + b + c = {a} + ({b}) + ({c})','f(1) = a + b + c = {a} + ({b}) + ({c})'],h_root:['(x − r₁)(x − r₂) = 0','(x − r₁)(x − r₂) = 0'],
 ok1:['Yes.','Da.'],ok2:['Nailed it.','Perfect.'],ok3:['Sharp.','Excelent.'],no1:['Not quite. The answer was {ans}','Aproape. Răspunsul era {ans}'],
 write_first:['Write an answer first','Scrie mai întâi un răspuns'],round_done:['Round done: {s}/5 correct','Rundă încheiată: {s}/5 corecte'],
 new_round:['New round','Rundă nouă'],check:['Check','Verifică'],hint:['Hint','Indiciu'],ans:['Your answer','Răspunsul tău'],enter:['Enter to check','Enter pentru verificare']};
function poly(a,b,c){var ps=[],add=function(co,v){if(co===0)return;var ab=Math.abs(co);ps.push({neg:co<0,body:(ab===1&&v)?v:String(ab)+v})};add(a,'x²');add(b,'x');add(c,'');if(!ps.length)return'0';return ps.map(function(p,i){return(i===0?(p.neg?'−':''):(p.neg?' − ':' + '))+p.body}).join('')}
var ri=function(a,b){return a+Math.floor(Math.random()*(b-a+1))},pk=function(a){return a[Math.floor(Math.random()*a.length)]};
function genQ(){var k=pk(['delta','xv','f0','f1','root','delta']),a,b,c,ans,x,r1,r2;
  if(k==='delta'){a=pk([1,2,3,-1,-2]);b=ri(-6,6);c=ri(-5,5);ans=b*b-4*a*c}
  else if(k==='xv'){a=pk([1,2,-1,-2]);x=ri(-3,3);b=-2*a*x;c=ri(-4,4);ans=x}
  else if(k==='f0'){a=pk([1,2,-1,-3]);b=ri(-6,6);c=ri(-7,7);ans=c}
  else if(k==='f1'){a=pk([1,2,-1,-2]);b=ri(-5,5);c=ri(-6,6);ans=a+b+c}
  else{r1=ri(-4,2);r2=r1+ri(1,4);a=1;b=-(r1+r2);c=r1*r2;ans=r2}
  return{k:k,a:a,b:b,c:c,ans:ans}}
(window.LumioModules=window.LumioModules||{})['math/algebra']={render:function(el,ctx){
  var U=ctx.ui,Q={cur:null,i:0,res:[],score:0,done:false,busy:false},
      t=function(k,o){return ctx.n(S[k]).replace(/\{(\w+)\}/g,function(m,p){return o?String(o[p]).replace('-','−'):m})},
      eq=U.el('div',null,'eq'),dots=U.el('div',null,'dots'),fb=U.el('p',null,'fb'),fld=U.el('div',null,'fld'),lb=U.el('label',t('ans'),'k'),row=U.el('div',null,'ans'),inp=U.el('input'),
      ck=U.el('button',t('check'),'btn-check'),hb=U.el('button',t('hint'),'hint-link');
  el.style.setProperty('--c',ctx.color);ctx.report({qt:1});
  inp.inputMode='decimal';inp.autocomplete='off';inp.id='ans-in';inp.placeholder='0';lb.htmlFor='ans-in';ck.type=hb.type='button';fb.setAttribute('aria-live','polite');
  row.append(inp,ck);fld.append(lb,row,U.el('p',t('enter'),'k'));el.append(U.el('h1',ctx.n(ctx.lesson.name)),eq,dots,fld,hb,fb,U.cont(ctx));
  function render(){var q=Q.cur;eq.textContent='f(x) = '+poly(q.a,q.b,q.c);eq.appendChild(U.el('small',t('q_'+q.k)));
    dots.replaceChildren.apply(dots,[0,1,2,3,4].map(function(i){return U.el('i',null,Q.res[i]===true?'ok':Q.res[i]===false?'no':i===Q.i?'cur':'')}).concat(U.el('span',Math.min(Q.i+1,5)+' / 5')))}
  function next(){Q.cur=genQ();fb.textContent='';fb.className='fb';fld.className='fld';inp.value='';render()}
  function round(){Q.i=0;Q.res=[];Q.score=0;Q.done=false;ck.textContent=t('check');next()}
  function check(){if(Q.busy)return;if(Q.done){round();inp.focus();return}
    var raw=inp.value.replace('−','-').replace(',','.').trim();
    if(raw===''||isNaN(+raw)){fb.className='fb';fb.textContent=t('write_first');return}
    var ok=+raw===Q.cur.ans;
    if(ok){ctx.award();ctx.report({ok:1});Q.score++;Q.res[Q.i]=true;fb.className='fb ok';fb.textContent=t(pk(['ok1','ok2','ok3']))}
    else{ctx.report({bad:1});Q.res[Q.i]=false;fb.className='fb no';fb.textContent=t('no1',{ans:Q.cur.ans})}
    fld.className='fld '+(ok?'ok':'no');Q.i++;render();Q.busy=true;
    setTimeout(function(){Q.busy=false;if(!el.isConnected)return;
      fld.className='fld';if(Q.i>=5){Q.done=true;if(ctx.report({qd:1}))ctx.award(20);fb.className='fb ok';fb.textContent=t('round_done',{s:Q.score});ck.textContent=t('new_round')}else next()},ok?1100:1900)}
  ck.onclick=check;inp.onkeydown=function(e){if(e.key==='Enter')check()};
  hb.onclick=function(){var q=Q.cur;if(Q.done)return;fb.className='fb';fb.textContent=t('h_'+q.k,q)};
  round();
}};
})();
