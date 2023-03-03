(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3465012f"],{6511:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h1",{staticClass:"text-center text-3xl"},[e._v("csv文件转json")]),n("input",{attrs:{type:"file",id:"files-list"},on:{change:e.inputChange}}),n("div",[n("el-input",{attrs:{placeholder:"请输入要生成的文件名，否则为默认名"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}})],1),n("div",[n("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.saveJSON(1)}}},[e._v("中文")]),n("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.saveJSON(2)}}},[e._v("日文")]),n("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.saveJSON(3)}}},[e._v("英文")]),n("el-button",{on:{click:e.down}},[e._v("测试")]),n("a",{attrs:{id:"h"}},[e._v("点此进行下载")])],1)])},o=[],a=(n("ac4d"),n("8a81"),n("1c4c"),n("7f7f"),n("6b54"),n("53ca"));function i(e){if(Array.isArray(e))return e}function s(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done);i=!0)if(a.push(r.value),t&&a.length===t)break}catch(l){s=!0,o=l}finally{try{i||null==n["return"]||n["return"]()}finally{if(s)throw o}}return a}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function c(e,t){if(e){if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(e,t){return i(e)||s(e,t)||c(e,t)||u()}n("ac6a"),n("5df3"),n("f400"),n("28a5");function d(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=h(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw a}}}}function h(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v={name:"home",components:{},data:function(){return{chineseJson:{},japaneseJson:{},englishJson:{},fileName:"",file:null}},mounted:function(){},computed:{},methods:{inputChange:function(e){var t=this,n=new FileReader;"text/csv"!==e.target.files[0].type?this.$message({message:"文件不是csv",type:"error"}):(t.file=e.target.files[0],n.readAsText(e.target.files[0],"gb2312")),n.onload=function(){t.textToCsv(n.result)}},textToCsv:function(e){for(var t=e.split(/\r\n/),n=new Map,r=new Map,o=new Map,a=0;a<t.length;a++){var i=t[a].split(",");n.set(i[0],i[1]),r.set(i[0],i[2]),o.set(i[0],i[3])}this.chineseJson=this._strMapToObj(n),this.japaneseJson=this._strMapToObj(r),this.englishJson=this._strMapToObj(o)},_strMapToObj:function(e){var t,n=Object.create(null),r=d(e);try{for(r.s();!(t=r.n()).done;){var o=f(t.value,2),a=o[0],i=o[1];n[a]=i}}catch(s){r.e(s)}finally{r.f()}return n},saveJSON:function(e,t){var n=null,r="";switch(e){case 1:n=this.chineseJson,r="chinese";break;case 2:n=this.japaneseJson,r="japanese";break;case 3:n=this.englishJson,r="english";break;default:break}if(this.file){t=this.fileName?this.fileName+".json":r+(new Date).getTime()+".json","object"===Object(a["a"])(n)&&(n=JSON.stringify(n,void 0,4));var o=new Blob([n],{type:"text/json"}),i=document.createEvent("MouseEvents"),s=document.createElement("a");s.download=t,s.href=window.URL.createObjectURL(o),s.dataset.downloadurl=["text/json",s.download,s.href].join(":"),i.initMouseEvent("click",!0),s.dispatchEvent(i)}else this.$message({message:"数据为空",type:"error"})},down:function(){var e=new Blob(["Hello World"]),t=window.URL.createObjectURL(e),n=document.getElementById("h");n.download="helloworld.txt",n.href=t;var r="http://ecat-tw-test.jcipn.com/ecat-service/api/part/export/sheet?categoryIds=&partNo=&carIds=&levelIds=&languageType=zh-cn";window.open(r)}}},m=v,b=(n("832d"),n("2877")),y=Object(b["a"])(m,r,o,!1,null,"09be008f",null);t["default"]=y.exports},"832d":function(e,t,n){"use strict";n("bee4")},bee4:function(e,t,n){}}]);
//# sourceMappingURL=chunk-3465012f.de7b01d8.js.map