(function(){
var L=Lumio,cache={},Ld=L.Loader={};
Ld.load=function(key){
  return cache[key]||(cache[key]=new Promise(function(res,rej){
    var M=window.LumioModules;if(M[key])return res(M[key]);
    var s=document.createElement('script');s.src='modules/'+key+'.js';
    s.onload=function(){M[key]?res(M[key]):(delete cache[key],rej(new Error('no module '+key)))};
    s.onerror=function(){delete cache[key];rej(new Error('load '+key))};
    document.head.appendChild(s);
  }));
};
L.on(function(st,kind){
  if(kind!=='nav'||st.level==='home')return;
  L.subject().lessons.forEach(function(l){if(l.mod)Ld.load(l.mod).catch(function(){})});
});
})();
