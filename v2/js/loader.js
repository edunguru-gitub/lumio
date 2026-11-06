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
// boot: load every registry feature + lesson file (in order; missing file = skipped), then run L.boot queue.
// Hosted build inlines them all and sets LumioRegistry.inline, so nothing is fetched.
document.addEventListener('DOMContentLoaded',function(){
  var R=window.LumioRegistry||{},F=window.LumioFeatures=window.LumioFeatures||{},M=window.LumioModules,src=[];
  if(!R.inline){
    (R.features||[]).forEach(function(f){if(!F[f])src.push('js/'+f+'.js')});
    (R.lessons||[]).forEach(function(k){if(typeof k==='string'&&!M[k])src.push('modules/'+k+'.js')});
  }
  Promise.all(src.map(function(u){return new Promise(function(res){var s=document.createElement('script');s.src=u;s.async=false;s.onload=s.onerror=res;document.head.appendChild(s)})})).then(L.boot.run);
});
})();
