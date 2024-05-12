"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:t+""}function _toPrimitive(e,t){if("object"!=_typeof(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);var o=n.call(e,t||"default");if("object"!=_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}var darkFlatpickrThemeLink=document.createElement("link");darkFlatpickrThemeLink.id="darkFlatpickrTheme",darkFlatpickrThemeLink.rel="stylesheet",darkFlatpickrThemeLink.href="https://npmcdn.com/flatpickr/dist/themes/dark.css";var FLATPICKR_DATE_FORMAT="Y-m-d H:i:S",NORMAL_DATE_FORMAT="yyyy-MM-dd HH:mm:ss";document.addEventListener("alpine:init",function(){Alpine.effect(function(){var e;"dark"===Alpine.store("theme").value?document.querySelector("#darkFlatpickrTheme")||document.head.appendChild(darkFlatpickrThemeLink):null===(e=document.querySelector("#darkFlatpickrTheme"))||void 0===e||e.remove()});var e=new Date,t=flatpickr.formatDate(e,FLATPICKR_DATE_FORMAT),n=Intl.DateTimeFormat().resolvedOptions().timeZone,o=Intl.supportedValuesOf("timeZone"),i=o.map(function(e){return{timeZone:e,offset:luxon.DateTime.local().setZone(e).offsetNameShort,toString:function(){return"".concat(this.timeZone," (").concat(this.offset,")")}}});Alpine.store("timeZone",{supportedTimeZonesAndOffsets:i,inputDateTime:t,outputDateTime:"",inputTimeZone:n,outputTimeZone:o[0],changeInputDateTime:function(e){this.convertTZ()},convertTZ:function(){console.log(this.inputDateTime,this.inputTimeZone,this.outputTimeZone);var e=luxon.DateTime.fromFormat(this.inputDateTime,NORMAL_DATE_FORMAT,{zone:this.inputTimeZone}).setZone(this.outputTimeZone);this.outputDateTime=e.toFormat(NORMAL_DATE_FORMAT),console.log(this.outputDateTime)}}),flatpickr("#datetime-picker-input",{enableTime:!0,dateFormat:FLATPICKR_DATE_FORMAT,defaultDate:t,enableSeconds:!0,onValueUpdate:function(e,t,n){Alpine.store("timeZone").inputDateTime=t}});var r={selector:"#autoComplete",placeHolder:"Search for Food...",data:{src:i,cache:!0},resultsList:{maxResults:1e4,element:function(e,t){if(!t.results.length){var n=document.createElement("div");n.setAttribute("class","no_result"),n.innerHTML='<span>Found No Results for "'.concat(t.query,'"</span>'),e.prepend(n)}},noResults:!0},resultItem:{highlight:!0}},u=new autoComplete(_objectSpread(_objectSpread({},r),{},{selector:"#autoCompleteInputTimeZone",events:{input:{focus:function(e){u.start(" ");var t=i.findIndex(function(e){return e.timeZone===Alpine.store("timeZone").inputTimeZone});setTimeout(function(){u.goTo(t)},0)},selection:function(e){var t=e.detail.selection.value;u.input.value=t.toString(),Alpine.store("timeZone").inputTimeZone=t.timeZone,Alpine.store("timeZone").convertTZ(),u.input.blur()}},list:{scroll:function(e){console.log("Results List scrolled!")}}}}));u.input.value=i.find(function(e){return e.timeZone===n}).toString();var l=new autoComplete(_objectSpread(_objectSpread({},r),{},{selector:"#autoCompleteOutputTimeZone",events:{input:{focus:function(e){l.start(" ");var t=i.findIndex(function(e){return e.timeZone===Alpine.store("timeZone").inputTimeZone});setTimeout(function(){l.goTo(t)},0)},selection:function(e){var t=e.detail.selection.value;l.input.value=t.toString(),Alpine.store("timeZone").outputTimeZone=t.timeZone,Alpine.store("timeZone").convertTZ(),l.input.blur()}},list:{scroll:function(e){console.log("Results List scrolled!")}}}}));l.input.value=i[0].toString(),Alpine.store("timeZone").convertTZ()});
//# sourceMappingURL=timezone-coverter.js.map