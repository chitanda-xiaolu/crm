(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e0182d2"],{"05ef":function(t,e,r){},"5d58":function(t,e,r){t.exports=r("d8d6")},"67bb":function(t,e,r){t.exports=r("f921")},7618:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var a=r("5d58"),i=r.n(a),o=r("67bb"),s=r.n(o);function c(t){return c="function"===typeof s.a&&"symbol"===typeof i.a?function(t){return typeof t}:function(t){return t&&"function"===typeof s.a&&t.constructor===s.a&&t!==s.a.prototype?"symbol":typeof t},c(t)}function n(t){return n="function"===typeof s.a&&"symbol"===c(i.a)?function(t){return c(t)}:function(t){return t&&"function"===typeof s.a&&t.constructor===s.a&&t!==s.a.prototype?"symbol":c(t)},n(t)}},"7eec":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"notice-container"},[r("el-divider",{attrs:{"content-position":"left"}},[t._v(t._s(t.$route.meta.title||"操作活动")),r("i",{staticClass:"el-icon-thumb thumb"})]),r("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"100px"}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{staticClass:"sort",attrs:{label:"活动范围：",prop:"activityScope"}},[r("el-radio-group",{on:{change:t.changeScope},model:{value:t.dataForm.activityScope,callback:function(e){t.$set(t.dataForm,"activityScope",e)},expression:"dataForm.activityScope"}},[r("el-radio",{attrs:{label:"0"}},[t._v("全国")]),r("el-radio",{attrs:{label:"1"}},[t._v("指定经销商")])],1)],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:t.isShowDistrobutor,expression:"isShowDistrobutor"}],staticClass:"sort",attrs:{label:"经销商：",prop:"distributor"}},[r("el-select",{staticStyle:{width:"47%"},attrs:{filterable:"",multiple:"",clearable:"",remote:"","reserve-keyword":"",placeholder:"请选择"},model:{value:t.userList,callback:function(e){t.userList=e},expression:"userList"}},t._l(t.distributor.userList,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name+" 【"+t.areaName+"】",disabled:1==t.status,value:t.id}})})),1)],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"活动名称：",prop:"activityName"}},[r("el-input",{staticStyle:{width:"50%"},attrs:{clearable:"",placeholder:"请输入"},model:{value:t.dataForm.activityName,callback:function(e){t.$set(t.dataForm,"activityName",e)},expression:"dataForm.activityName"}})],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"活动状态：",size:"mini",prop:"activityStatus"}},[r("el-radio-group",{model:{value:t.dataForm.activityStatus,callback:function(e){t.$set(t.dataForm,"activityStatus",e)},expression:"dataForm.activityStatus"}},[r("el-radio",{attrs:{label:"0"}},[t._v("有效")]),r("el-radio",{attrs:{label:"1"}},[t._v("无效")])],1)],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"引流日期：",prop:"drainageTime"}},[r("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dataForm.drainageTime,callback:function(e){t.$set(t.dataForm,"drainageTime",e)},expression:"dataForm.drainageTime"}})],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"下单日期：",prop:"ordersTime"}},[r("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dataForm.ordersTime,callback:function(e){t.$set(t.dataForm,"ordersTime",e)},expression:"dataForm.ordersTime"}})],1)],1)],1),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"el-icon-position"},on:{click:function(e){return t.dataFormSubmit("dataForm")}}},[t._v("保存")])],1)],1)],1)],1)],1)},i=[],o=(r("8e6e"),r("cadf"),r("456d"),r("7618")),s=(r("ac6a"),r("6b54"),r("28a5"),r("bd86")),c=r("fa7d"),n=r("2f62"),l=r("ca41"),u=r("2ef0"),d=r.n(u);function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){Object(s["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={data:function(){return{optType:"新增",managerList:[],isShowDistrobutor:!1,visible:!0,dataForm:{activityName:"",activityScope:"0",drainageTime:"",ordersTime:"",activityStatus:"0",distributor:""},userList:[],html:"",dataRule:{activityName:[{required:!0,message:"活动名称不能为空",trigger:"change"}],activityStatus:[{required:!0,message:"活动状态不能为空",trigger:"change"}],stactivityScopeatus:[{required:!0,message:"活动范围不能为空",trigger:"change"}]}}},computed:p({},Object(n["d"])({deptUsrt:"deptUser",distributor:"distributor"})),mounted:function(){var t=this,e=t.$route.params.id;e&&t.getDetail(e)},watch:{$route:function(t,e){"编辑活动"===t.meta.title&&this.getDetail()}},methods:p({},Object(n["b"])({getDistributorList:"getDistributorList"}),{},Object(n["c"])({closeCurrentPage:"CLOSE_CURRENT_PAGE"}),{getDetail:function(t){var e=this;Object(l["a"])({id:t}).then((function(t){var r=t,a=Object(c["m"])(r,["activityName","activityScope","activityStatus","ordersTime"]);1===a.activityScope&&(e.isShowDistrobutor=!0);var i=e.getTime(r.drainageStartTime).split("-"),o=e.getTime(r.drainageEndTime).split("-"),s=e.getTime(r.ordersStartTime).split("-"),n=e.getTime(r.ordersEndTime).split("-");a.drainageTime=[new Date(i[0],i[1]-1,i[2]),new Date(o[0],o[1]-1,o[2])],a.ordersTime=[new Date(s[0],s[1]-1,s[2]),new Date(n[0],n[1]-1,n[2])],e.userList=t.distributorIds&&t.distributorIds.split(","),a.activityScope=a.activityScope.toString(),a.activityStatus=a.activityStatus.toString(),e.dataForm=p({},a)}))},changeScope:function(t){this.isShowDistrobutor="1"===t},getTime:function(t){return t.slice(0,10)},formatDate:function(t){var e=t.getFullYear(),r=t.getMonth()+1;r=r<10?"0"+r:r;var a=t.getDate();return a=a<10?"0"+a:a,e+"-"+r+"-"+a},dataFormSubmit:function(){var t=this.$route.params.id,e=this,r=d.a.cloneDeep(Object(c["j"])(e.dataForm)),a=Object(c["m"])(r,["activityName","activityScope","activityStatus"]);r.drainageTime&&r.drainageTime.forEach((function(t,r){"object"!==Object(o["a"])(t)||isNaN(t)?"string"===typeof t&&(!r&&(a.drainageStartTime=t),r&&(a.drainageEndTime=t)):(!r&&(a.drainageStartTime=e.formatDate(t)),r&&(a.drainageEndTime=e.formatDate(t)))})),r.ordersTime&&r.ordersTime.forEach((function(t,r){"object"!==Object(o["a"])(t)||isNaN(t)?"string"===typeof t&&(!r&&(a.ordersStartTime=t),r&&(a.ordersEndTime=t)):(!r&&(a.ordersStartTime=e.formatDate(t)),r&&(a.ordersEndTime=e.formatDate(t)))})),a.distributorIds=e.userList&&e.userList.join(),a.activityType="0",this.$refs["dataForm"].validate((function(r){if(r)if(t){var i=a;i.id=t,Object(l["d"])(a).then((function(t){200===t.code&&t.success?(e.$message.success("编辑成功"),e.closeCurrentPage(e.$route.fullPath),e.$router.push("/marketActivity")):e.$message.error("编辑失败")}))}else Object(l["c"])(a).then((function(t){200===t.code&&t.success?(e.$message.success("新增成功"),e.closeCurrentPage(e.$route.fullPath),e.$router.push("/marketActivity")):e.$message.error("新增失败")}))}))}})},b=f,y=(r("9ec8c"),r("2877")),g=Object(y["a"])(b,a,i,!1,null,"2cd0e05b",null);e["default"]=g.exports},"9ec8c":function(t,e,r){"use strict";var a=r("05ef"),i=r.n(a);i.a}}]);