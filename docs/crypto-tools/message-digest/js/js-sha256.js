"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){function c(t,i){i?(y[0]=y[16]=y[1]=y[2]=y[3]=y[4]=y[5]=y[6]=y[7]=y[8]=y[9]=y[10]=y[11]=y[12]=y[13]=y[14]=y[15]=0,this.blocks=y):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function e(t,i,r){var h,e=_typeof(t);if("string"===e){var s,n=[],o=t.length,f=0;for(h=0;h<o;++h)(s=t.charCodeAt(h))<128?n[f++]=s:(s<2048?n[f++]=192|s>>>6:(s<55296||57344<=s?n[f++]=224|s>>>12:(s=65536+((1023&s)<<10|1023&t.charCodeAt(++h)),n[f++]=240|s>>>18,n[f++]=128|s>>>12&63),n[f++]=128|s>>>6&63),n[f++]=128|63&s);t=n}else{if("object"!==e)throw new Error(p);if(null===t)throw new Error(p);if(d&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||d&&ArrayBuffer.isView(t)))throw new Error(p)}64<t.length&&(t=new c(i,!0).update(t).array());var a=[],u=[];for(h=0;h<64;++h){var y=t[h]||0;a[h]=92^y,u[h]=54^y}c.call(this,i,r),this.update(u),this.oKeyPad=a,this.inner=!0,this.sharedMemory=r}var p="input is invalid type",t="object"==("undefined"==typeof window?"undefined":_typeof(window)),n=t?window:{};n.JS_SHA256_NO_WINDOW&&(t=!1);var i=!t&&"object"==("undefined"==typeof self?"undefined":_typeof(self)),s=!n.JS_SHA256_NO_NODE_JS&&"object"==("undefined"==typeof process?"undefined":_typeof(process))&&process.versions&&process.versions.node;s?n=global:i&&(n=self);var r=!n.JS_SHA256_NO_COMMON_JS&&"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports,h="function"==typeof define&&define.amd,d=!n.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,a="0123456789abcdef".split(""),o=[-2147483648,8388608,32768,128],f=[24,16,8,0],w=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],u=["hex","array","digest","arrayBuffer"],y=[];!n.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!d||!n.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==_typeof(t)&&t.buffer&&t.buffer.constructor===ArrayBuffer});var l=function(i,r){return function(t){return new c(r,!0).update(t)[i]()}},b=function(t){var i=l("hex",t);s&&(i=A(i,t)),i.create=function(){return new c(t)},i.update=function(t){return i.create().update(t)};for(var r=0;r<u.length;++r){var h=u[r];i[h]=l(h,t)}return i},A=function(i,t){var r,h=require("crypto"),e=require("buffer").Buffer,s=t?"sha224":"sha256";return r=e.from&&!n.JS_SHA256_NO_BUFFER_FROM?e.from:function(t){return new e(t)},function(t){if("string"==typeof t)return h.createHash(s).update(t,"utf8").digest("hex");if(null==t)throw new Error(p);return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===e?h.createHash(s).update(r(t)).digest("hex"):i(t)}},_=function(r,h){return function(t,i){return new e(t,h,!0).update(i)[r]()}},v=function(i){var r=_("hex",i);r.create=function(t){return new e(t,i)},r.update=function(t,i){return r.create(t).update(i)};for(var t=0;t<u.length;++t){var h=u[t];r[h]=_(h,i)}return r};c.prototype.update=function(t){if(!this.finalized){var i,r=_typeof(t);if("string"!==r){if("object"!==r)throw new Error(p);if(null===t)throw new Error(p);if(d&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||d&&ArrayBuffer.isView(t)))throw new Error(p);i=!0}for(var h,e,s=0,n=t.length,o=this.blocks;s<n;){if(this.hashed&&(this.hashed=!1,o[0]=this.block,this.block=o[16]=o[1]=o[2]=o[3]=o[4]=o[5]=o[6]=o[7]=o[8]=o[9]=o[10]=o[11]=o[12]=o[13]=o[14]=o[15]=0),i)for(e=this.start;s<n&&e<64;++s)o[e>>>2]|=t[s]<<f[3&e++];else for(e=this.start;s<n&&e<64;++s)(h=t.charCodeAt(s))<128?o[e>>>2]|=h<<f[3&e++]:(h<2048?o[e>>>2]|=(192|h>>>6)<<f[3&e++]:(h<55296||57344<=h?o[e>>>2]|=(224|h>>>12)<<f[3&e++]:(h=65536+((1023&h)<<10|1023&t.charCodeAt(++s)),o[e>>>2]|=(240|h>>>18)<<f[3&e++],o[e>>>2]|=(128|h>>>12&63)<<f[3&e++]),o[e>>>2]|=(128|h>>>6&63)<<f[3&e++]),o[e>>>2]|=(128|63&h)<<f[3&e++]);this.lastByteIndex=e,this.bytes+=e-this.start,64<=e?(this.block=o[16],this.start=e-64,this.hash(),this.hashed=!0):this.start=e}return 4294967295<this.bytes&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},c.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,i=this.lastByteIndex;t[16]=this.block,t[i>>>2]|=o[3&i],this.block=t[16],56<=i&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},c.prototype.hash=function(){var t,i,r,h,e,s,n,o,f,a=this.h0,u=this.h1,y=this.h2,c=this.h3,p=this.h4,d=this.h5,l=this.h6,b=this.h7,A=this.blocks;for(t=16;t<64;++t)i=((e=A[t-15])>>>7|e<<25)^(e>>>18|e<<14)^e>>>3,r=((e=A[t-2])>>>17|e<<15)^(e>>>19|e<<13)^e>>>10,A[t]=A[t-16]+i+A[t-7]+r<<0;for(f=u&y,t=0;t<64;t+=4)this.first?(c=this.is224?(s=300032,b=(e=A[0]-1413257819)-150054599<<0,e+24177077<<0):(s=704751109,b=(e=A[0]-210244248)-1521486534<<0,e+143694565<<0),this.first=!1):(i=(a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10),h=(s=a&u)^a&y^f,b=c+(e=b+(r=(p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+(p&d^~p&l)+w[t]+A[t])<<0,c=e+(i+h)<<0),i=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),h=(n=c&a)^c&u^s,l=y+(e=l+(r=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7))+(b&p^~b&d)+w[t+1]+A[t+1])<<0,i=((y=e+(i+h)<<0)>>>2|y<<30)^(y>>>13|y<<19)^(y>>>22|y<<10),h=(o=y&c)^y&a^n,d=u+(e=d+(r=(l>>>6|l<<26)^(l>>>11|l<<21)^(l>>>25|l<<7))+(l&b^~l&p)+w[t+2]+A[t+2])<<0,i=((u=e+(i+h)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),h=(f=u&y)^u&c^o,p=a+(e=p+(r=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&l^~d&b)+w[t+3]+A[t+3])<<0,a=e+(i+h)<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+a<<0,this.h1=this.h1+u<<0,this.h2=this.h2+y<<0,this.h3=this.h3+c<<0,this.h4=this.h4+p<<0,this.h5=this.h5+d<<0,this.h6=this.h6+l<<0,this.h7=this.h7+b<<0},c.prototype.toString=c.prototype.hex=function(){this.finalize();var t=this.h0,i=this.h1,r=this.h2,h=this.h3,e=this.h4,s=this.h5,n=this.h6,o=this.h7,f=a[t>>>28&15]+a[t>>>24&15]+a[t>>>20&15]+a[t>>>16&15]+a[t>>>12&15]+a[t>>>8&15]+a[t>>>4&15]+a[15&t]+a[i>>>28&15]+a[i>>>24&15]+a[i>>>20&15]+a[i>>>16&15]+a[i>>>12&15]+a[i>>>8&15]+a[i>>>4&15]+a[15&i]+a[r>>>28&15]+a[r>>>24&15]+a[r>>>20&15]+a[r>>>16&15]+a[r>>>12&15]+a[r>>>8&15]+a[r>>>4&15]+a[15&r]+a[h>>>28&15]+a[h>>>24&15]+a[h>>>20&15]+a[h>>>16&15]+a[h>>>12&15]+a[h>>>8&15]+a[h>>>4&15]+a[15&h]+a[e>>>28&15]+a[e>>>24&15]+a[e>>>20&15]+a[e>>>16&15]+a[e>>>12&15]+a[e>>>8&15]+a[e>>>4&15]+a[15&e]+a[s>>>28&15]+a[s>>>24&15]+a[s>>>20&15]+a[s>>>16&15]+a[s>>>12&15]+a[s>>>8&15]+a[s>>>4&15]+a[15&s]+a[n>>>28&15]+a[n>>>24&15]+a[n>>>20&15]+a[n>>>16&15]+a[n>>>12&15]+a[n>>>8&15]+a[n>>>4&15]+a[15&n];return this.is224||(f+=a[o>>>28&15]+a[o>>>24&15]+a[o>>>20&15]+a[o>>>16&15]+a[o>>>12&15]+a[o>>>8&15]+a[o>>>4&15]+a[15&o]),f},c.prototype.array=c.prototype.digest=function(){this.finalize();var t=this.h0,i=this.h1,r=this.h2,h=this.h3,e=this.h4,s=this.h5,n=this.h6,o=this.h7,f=[t>>>24&255,t>>>16&255,t>>>8&255,255&t,i>>>24&255,i>>>16&255,i>>>8&255,255&i,r>>>24&255,r>>>16&255,r>>>8&255,255&r,h>>>24&255,h>>>16&255,h>>>8&255,255&h,e>>>24&255,e>>>16&255,e>>>8&255,255&e,s>>>24&255,s>>>16&255,s>>>8&255,255&s,n>>>24&255,n>>>16&255,n>>>8&255,255&n];return this.is224||f.push(o>>>24&255,o>>>16&255,o>>>8&255,255&o),f},c.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),i=new DataView(t);return i.setUint32(0,this.h0),i.setUint32(4,this.h1),i.setUint32(8,this.h2),i.setUint32(12,this.h3),i.setUint32(16,this.h4),i.setUint32(20,this.h5),i.setUint32(24,this.h6),this.is224||i.setUint32(28,this.h7),t},(e.prototype=new c).finalize=function(){if(c.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();c.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),c.prototype.finalize.call(this)}};var S=b();(S.sha256=S).sha224=b(!0),S.sha256.hmac=v(),S.sha224.hmac=v(!0),r?module.exports=S:(n.sha256=S.sha256,n.sha224=S.sha224,h&&define(function(){return S}))}();
//# sourceMappingURL=js-sha256.js.map