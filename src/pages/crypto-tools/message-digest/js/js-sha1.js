!function(){"use strict";function t(t){t?(l[0]=l[16]=l[1]=l[2]=l[3]=l[4]=l[5]=l[6]=l[7]=l[8]=l[9]=l[10]=l[11]=l[12]=l[13]=l[14]=l[15]=0,this.blocks=l):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}function r(r,e){var i,h=v(r);if(r=h[0],h[1]){var s,n=[],o=r.length,a=0;for(i=0;i<o;++i)(s=r.charCodeAt(i))<128?n[a++]=s:s<2048?(n[a++]=192|s>>>6,n[a++]=128|63&s):s<55296||s>=57344?(n[a++]=224|s>>>12,n[a++]=128|s>>>6&63,n[a++]=128|63&s):(s=65536+((1023&s)<<10|1023&r.charCodeAt(++i)),n[a++]=240|s>>>18,n[a++]=128|s>>>12&63,n[a++]=128|s>>>6&63,n[a++]=128|63&s);r=n}r.length>64&&(r=new t(!0).update(r).array());var f=[],u=[];for(i=0;i<64;++i){var c=r[i]||0;f[i]=92^c,u[i]=54^c}t.call(this,e),this.update(u),this.oKeyPad=f,this.inner=!0,this.sharedMemory=e}var e="input is invalid type",i="object"==typeof window,h=i?window:{};h.JS_SHA1_NO_WINDOW&&(i=!1);var s=!i&&"object"==typeof self,n=!h.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;n?h=global:s&&(h=self);var o=!h.JS_SHA1_NO_COMMON_JS&&"object"==typeof module&&module.exports,a="function"==typeof define&&define.amd,f=!h.JS_SHA1_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,u="0123456789abcdef".split(""),c=[-2147483648,8388608,32768,128],y=[24,16,8,0],p=["hex","array","digest","arrayBuffer"],l=[],d=Array.isArray;!h.JS_SHA1_NO_NODE_JS&&d||(d=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var b=ArrayBuffer.isView;!f||!h.JS_SHA1_NO_ARRAY_BUFFER_IS_VIEW&&b||(b=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var v=function(t){var r=typeof t;if("string"===r)return[t,!0];if("object"!==r||null===t)throw new Error(e);if(f&&t.constructor===ArrayBuffer)return[new Uint8Array(t),!1];if(!d(t)&&!b(t))throw new Error(e);return[t,!1]},_=function(r){return function(e){return new t(!0).update(e)[r]()}},A=function(t){var r,i=require("crypto"),s=require("buffer").Buffer;r=s.from&&!h.JS_SHA1_NO_BUFFER_FROM?s.from:function(t){return new s(t)};return function(h){if("string"==typeof h)return i.createHash("sha1").update(h,"utf8").digest("hex");if(null===h||void 0===h)throw new Error(e);return h.constructor===ArrayBuffer&&(h=new Uint8Array(h)),d(h)||b(h)||h.constructor===s?i.createHash("sha1").update(r(h)).digest("hex"):t(h)}},w=function(t){return function(e,i){return new r(e,!0).update(i)[t]()}};t.prototype.update=function(t){if(this.finalized)throw new Error("finalize already called");var r=v(t);t=r[0];for(var e,i,h=r[1],s=0,n=t.length||0,o=this.blocks;s<n;){if(this.hashed&&(this.hashed=!1,o[0]=this.block,this.block=o[16]=o[1]=o[2]=o[3]=o[4]=o[5]=o[6]=o[7]=o[8]=o[9]=o[10]=o[11]=o[12]=o[13]=o[14]=o[15]=0),h)for(i=this.start;s<n&&i<64;++s)(e=t.charCodeAt(s))<128?o[i>>>2]|=e<<y[3&i++]:e<2048?(o[i>>>2]|=(192|e>>>6)<<y[3&i++],o[i>>>2]|=(128|63&e)<<y[3&i++]):e<55296||e>=57344?(o[i>>>2]|=(224|e>>>12)<<y[3&i++],o[i>>>2]|=(128|e>>>6&63)<<y[3&i++],o[i>>>2]|=(128|63&e)<<y[3&i++]):(e=65536+((1023&e)<<10|1023&t.charCodeAt(++s)),o[i>>>2]|=(240|e>>>18)<<y[3&i++],o[i>>>2]|=(128|e>>>12&63)<<y[3&i++],o[i>>>2]|=(128|e>>>6&63)<<y[3&i++],o[i>>>2]|=(128|63&e)<<y[3&i++]);else for(i=this.start;s<n&&i<64;++s)o[i>>>2]|=t[s]<<y[3&i++];this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=o[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[16]=this.block,t[r>>>2]|=c[3&r],this.block=t[16],r>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,r,e=this.h0,i=this.h1,h=this.h2,s=this.h3,n=this.h4,o=this.blocks;for(t=16;t<80;++t)r=o[t-3]^o[t-8]^o[t-14]^o[t-16],o[t]=r<<1|r>>>31;for(t=0;t<20;t+=5)e=(r=(i=(r=(h=(r=(s=(r=(n=(r=e<<5|e>>>27)+(i&h|~i&s)+n+1518500249+o[t]<<0)<<5|n>>>27)+(e&(i=i<<30|i>>>2)|~e&h)+s+1518500249+o[t+1]<<0)<<5|s>>>27)+(n&(e=e<<30|e>>>2)|~n&i)+h+1518500249+o[t+2]<<0)<<5|h>>>27)+(s&(n=n<<30|n>>>2)|~s&e)+i+1518500249+o[t+3]<<0)<<5|i>>>27)+(h&(s=s<<30|s>>>2)|~h&n)+e+1518500249+o[t+4]<<0,h=h<<30|h>>>2;for(;t<40;t+=5)e=(r=(i=(r=(h=(r=(s=(r=(n=(r=e<<5|e>>>27)+(i^h^s)+n+1859775393+o[t]<<0)<<5|n>>>27)+(e^(i=i<<30|i>>>2)^h)+s+1859775393+o[t+1]<<0)<<5|s>>>27)+(n^(e=e<<30|e>>>2)^i)+h+1859775393+o[t+2]<<0)<<5|h>>>27)+(s^(n=n<<30|n>>>2)^e)+i+1859775393+o[t+3]<<0)<<5|i>>>27)+(h^(s=s<<30|s>>>2)^n)+e+1859775393+o[t+4]<<0,h=h<<30|h>>>2;for(;t<60;t+=5)e=(r=(i=(r=(h=(r=(s=(r=(n=(r=e<<5|e>>>27)+(i&h|i&s|h&s)+n-1894007588+o[t]<<0)<<5|n>>>27)+(e&(i=i<<30|i>>>2)|e&h|i&h)+s-1894007588+o[t+1]<<0)<<5|s>>>27)+(n&(e=e<<30|e>>>2)|n&i|e&i)+h-1894007588+o[t+2]<<0)<<5|h>>>27)+(s&(n=n<<30|n>>>2)|s&e|n&e)+i-1894007588+o[t+3]<<0)<<5|i>>>27)+(h&(s=s<<30|s>>>2)|h&n|s&n)+e-1894007588+o[t+4]<<0,h=h<<30|h>>>2;for(;t<80;t+=5)e=(r=(i=(r=(h=(r=(s=(r=(n=(r=e<<5|e>>>27)+(i^h^s)+n-899497514+o[t]<<0)<<5|n>>>27)+(e^(i=i<<30|i>>>2)^h)+s-899497514+o[t+1]<<0)<<5|s>>>27)+(n^(e=e<<30|e>>>2)^i)+h-899497514+o[t+2]<<0)<<5|h>>>27)+(s^(n=n<<30|n>>>2)^e)+i-899497514+o[t+3]<<0)<<5|i>>>27)+(h^(s=s<<30|s>>>2)^n)+e-899497514+o[t+4]<<0,h=h<<30|h>>>2;this.h0=this.h0+e<<0,this.h1=this.h1+i<<0,this.h2=this.h2+h<<0,this.h3=this.h3+s<<0,this.h4=this.h4+n<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3,h=this.h4;return u[t>>>28&15]+u[t>>>24&15]+u[t>>>20&15]+u[t>>>16&15]+u[t>>>12&15]+u[t>>>8&15]+u[t>>>4&15]+u[15&t]+u[r>>>28&15]+u[r>>>24&15]+u[r>>>20&15]+u[r>>>16&15]+u[r>>>12&15]+u[r>>>8&15]+u[r>>>4&15]+u[15&r]+u[e>>>28&15]+u[e>>>24&15]+u[e>>>20&15]+u[e>>>16&15]+u[e>>>12&15]+u[e>>>8&15]+u[e>>>4&15]+u[15&e]+u[i>>>28&15]+u[i>>>24&15]+u[i>>>20&15]+u[i>>>16&15]+u[i>>>12&15]+u[i>>>8&15]+u[i>>>4&15]+u[15&i]+u[h>>>28&15]+u[h>>>24&15]+u[h>>>20&15]+u[h>>>16&15]+u[h>>>12&15]+u[h>>>8&15]+u[h>>>4&15]+u[15&h]},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3,h=this.h4;return[t>>>24&255,t>>>16&255,t>>>8&255,255&t,r>>>24&255,r>>>16&255,r>>>8&255,255&r,e>>>24&255,e>>>16&255,e>>>8&255,255&e,i>>>24&255,i>>>16&255,i>>>8&255,255&i,h>>>24&255,h>>>16&255,h>>>8&255,255&h]},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(20),r=new DataView(t);return r.setUint32(0,this.h0),r.setUint32(4,this.h1),r.setUint32(8,this.h2),r.setUint32(12,this.h3),r.setUint32(16,this.h4),t},(r.prototype=new t).finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var r=this.array();t.call(this,this.sharedMemory),this.update(this.oKeyPad),this.update(r),t.prototype.finalize.call(this)}};var S=function(){var r=_("hex");n&&(r=A(r)),r.create=function(){return new t},r.update=function(t){return r.create().update(t)};for(var e=0;e<p.length;++e){var i=p[e];r[i]=_(i)}return r}();S.sha1=S,S.sha1.hmac=function(){var t=w("hex");t.create=function(t){return new r(t)},t.update=function(r,e){return t.create(r).update(e)};for(var e=0;e<p.length;++e){var i=p[e];t[i]=w(i)}return t}(),o?module.exports=S:(h.sha1=S,a&&define(function(){return S}))}();
