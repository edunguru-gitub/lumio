// Styled Lumio QR for the deck 'Try Lumio now' slide. Usage: node tools/qr/styled.js <out.png> [url] [px=1200]
// Matrix from the MIT library bundled in v2/js/qr.js, error correction H (30%). Rounded-square modules, ink #171513 on a
// cream card #EDE3D0 (dark on light: inverted codes fail on some scanners), 4-module quiet zone, Lumio sparkle centre mark
// on a cleared square of at most 12% of the code area (inside H capacity). Writes <out.png> and <out>.svg; never commit them.
// Check decoding before use (jsQR at several sizes, downscale, blur); if one fails, lower R (rounding) or HOLE (centre mark).
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),vm=require('vm');
const out=process.argv[2],URL=process.argv[3]||'https://edunguru-gitub.github.io/lumio/',PX=+process.argv[4]||1200;
if(!out){console.error('usage: node tools/qr/styled.js <out.png> [url] [px]');process.exit(2)}
const R=+(process.env.QR_R??0.2),HOLE=+(process.env.QR_HOLE??0.1); // corner radius (module units), cleared share of the code area
const src=fs.readFileSync(path.join(__dirname,'../../v2/js/qr.js'),'utf8');
const LumioQR=vm.runInNewContext(src.slice(src.indexOf('var LumioQR='),src.indexOf('function draw('))+';LumioQR');
const q=new LumioQR(-1,2);q.addData(URL);q.make();const n=q.getModuleCount(),QZ=4,W=n+2*QZ; // 2 = H in this library
let k=Math.floor(Math.sqrt(HOLE*n*n));if((n-k)%2)k--;const k0=(n-k)/2,k1=k0+k; // centred cleared square, k*k <= HOLE*n*n
const inHole=(x,y)=>x>=k0&&x<k1&&y>=k0&&y<k1,fin=(x,y)=>(x<8||x>=n-8)&&(y<8||(y>=n-8&&x<8)); // finder patterns stay square (round finders failed jsQR at 300 px)
let d='';for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(q.isDark(y,x)&&!inHole(x,y))
  d+=`<rect x="${x+QZ-.02}" y="${y+QZ-.02}" width="1.04" height="1.04" rx="${fin(x,y)?0:R}"/>`; // 0.02 overlap hides anti-alias seams
// sparkle (same path as the v2 favicon, viewBox 64x70) scaled into the cleared square with a 1-module margin
const s=(k-2)/70,sx=QZ+k0+1+(k-2-64*s)/2,sy=QZ+k0+1;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}"><rect width="${W}" height="${W}" rx="${QZ*.6}" fill="#EDE3D0"/><g fill="#171513">${d}</g>`+
  (k>2?`<path transform="translate(${sx} ${sy}) scale(${s})" fill="#171513" d="M32 4C34 22 41 29 60 35C41 41 34 48 32 66C30 48 23 41 4 35C23 29 30 22 32 4Z"/>`:'')+'</svg>';
fs.writeFileSync(out.replace(/\.png$/,'')+'.svg',svg);
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:PX,height:PX}});
  await p.setContent(`<style>*{margin:0}body{background:transparent}svg{display:block;width:${PX}px;height:${PX}px}</style>${svg}`);
  await p.screenshot({path:out,omitBackground:true});await b.close();
  console.log(`matrix ${n}x${n}, EC H, hole ${k}x${k} = ${(100*k*k/(n*n)).toFixed(1)}% of the code area, radius ${R}; ${out}`)})();
