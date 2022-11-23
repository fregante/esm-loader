import E from"path";import{fileURLToPath as w,pathToFileURL as F}from"url";import{installSourceMapSupport as I,compareNodeVersion as y,resolveTsPath as J,transform as P,transformDynamicImport as T}from"@esbuild-kit/core-utils";import{parseTsconfig as D,getTsconfig as v,createPathsMatcher as A}from"get-tsconfig";import k from"fs";const f=I(),d=process.env.ESBK_TSCONFIG_PATH?{path:process.env.ESBK_TSCONFIG_PATH,config:D(process.env.ESBK_TSCONFIG_PATH)}:v(),S=d==null?void 0:d.config,j=d&&A(d),_="file://",u=/\.([cm]?ts|[tj]sx)$/,N=t=>{const s=E.extname(t);if(s===".mjs"||s===".mts")return"module";if(s===".cjs"||s===".cts")return"commonjs"},h=new Map;async function L(t){if(h.has(t))return h.get(t);if(!await k.promises.access(t).then(()=>!0,()=>!1)){h.set(t,void 0);return}const n=await k.promises.readFile(t,"utf8");try{const o=JSON.parse(n);return h.set(t,o),o}catch{throw new Error(`Error parsing: ${t}`)}}async function M(t){let s=new URL("package.json",t);for(;!s.pathname.endsWith("/node_modules/package.json");){const n=w(s),o=await L(n);if(o)return o;const r=s;if(s=new URL("../package.json",s),s.pathname===r.pathname)break}}async function O(t){var s;const n=await M(t);return(s=n==null?void 0:n.type)!=null?s:"commonjs"}const b=[".js",".json",".ts",".tsx",".jsx"];async function R(t,s,n){let o;for(const r of b)try{return await g(t+r,s,n,!0)}catch(e){if(o===void 0){const{message:a}=e;e.message=e.message.replace(`${r}'`,"'"),e.stack=e.stack.replace(a,e.message),o=e}}throw o}async function U(t,s,n){const o=t.endsWith("/")?"index":"/index";try{return await R(t+o,s,n)}catch(r){const{message:e}=r;throw r.message=r.message.replace(`${o.replace("/",E.sep)}'`,"'"),r.stack=r.stack.replace(e,r.message),r}}const x=/^\.{0,2}\//,C=y([14,13,1])>=0||y([12,20,0])>=0,g=async function(t,s,n,o){var r,e;if(!C&&t.startsWith("node:")&&(t=t.slice(5)),t.endsWith("/"))return await U(t,s,n);const a=t.startsWith(_)||x.test(t);if(j&&!a&&!((r=s.parentURL)!=null&&r.includes("/node_modules/"))){const c=j(t);for(const p of c)try{return await g(F(p).toString(),s,n)}catch{}}if(u.test(s.parentURL)){const c=J(t);if(c)try{return await g(c,s,n,!0)}catch(p){const{code:l}=p;if(l!=="ERR_MODULE_NOT_FOUND"&&l!=="ERR_PACKAGE_PATH_NOT_EXPORTED")throw p}}let i;try{i=await n(t,s,n)}catch(c){if(c instanceof Error&&!o){if(c.code==="ERR_UNSUPPORTED_DIR_IMPORT")return await U(t,s,n);if(c.code==="ERR_MODULE_NOT_FOUND")return await R(t,s,n)}throw c}if(i.url.endsWith(".json"))return{...i,format:"json"};let{format:m}=i;return i.url.startsWith(_)&&(m=(e=N(i.url))!=null?e:m,m||(m=await O(i.url))),{...i,format:m}},K=async function(t,s,n){process.send&&process.send({type:"dependency",path:t}),t.endsWith(".json")&&(s.importAssertions||(s.importAssertions={}),s.importAssertions.type="json");const o=await n(t,s,n);if(!o.source)return o;const r=w(t),e=o.source.toString();if(o.format==="json"||u.test(t)){const a=await P(e,r,{tsconfigRaw:S});return{format:"module",source:f(a,t)}}if(o.format==="module"){const a=T(r,e);a&&(o.source=f(a,t))}return o},H=async function(t,s,n){if(t.endsWith(".json"))return{format:"module"};try{return await n(t,s,n)}catch(o){if(o.code==="ERR_UNKNOWN_FILE_EXTENSION"&&t.startsWith(_)){let r=N(t);if(!r&&u.test(t)&&(r=await O(t)),r)return{format:r}}throw o}},$=async function(t,s,n){const{url:o}=s,r=w(o);if(process.send&&process.send({type:"dependency",path:o}),o.endsWith(".json")||u.test(o)){const a=await P(t.toString(),r,{tsconfigRaw:S});return{source:f(a,o)}}const e=await n(t,s,n);if(s.format==="module"){const a=T(r,e.source.toString());a&&(e.source=f(a,o))}return e},W=y([16,12,0])<0,B=W?H:void 0,G=W?$:void 0;export{B as getFormat,K as load,g as resolve,G as transformSource};
