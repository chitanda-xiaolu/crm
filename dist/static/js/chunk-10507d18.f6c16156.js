(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10507d18"],{"12ba":function(t,e,i){"use strict";var r=i("6722"),a=i.n(r);a.a},"247d":function(t,e,i){"use strict";var r=i("bcab"),a=i("fa7d"),o={store:{key:"store",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].store.update.code)}}]},business:{key:"bussiness-notice",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].businessNotice.update.code)}}]},system:{key:"system-notice",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].systemNotice.update.code)}}]},activity:{key:"activity",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].marketActivity.update.code)}}]},staff:{key:"staff",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].user.update.code)}},{id:2,title:"重置密码",icon:"el-icon-refresh-left",type:"reset",isShow:function(){return Object(a["g"])(r["a"].user.reset.code)}},{id:3,title:"绑定酷家乐",icon:"el-icon-connection",type:"bind",isShow:function(){return Object(a["g"])(r["a"].user.bindKjl.code)}}]},help:{key:"help",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].help.update.code)}}]},menu:{key:"menu",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(a["g"])(r["a"].menu.update.code)}}]},account:{key:"account",btns:[{id:1,title:"现金充值",icon:"el-icon-medal-1",type:"cash",isShow:function(){return Object(a["g"])(r["a"].account.recharge_add.code)}},{id:2,title:"返利充值",type:"fanli",icon:"el-icon-medal",isShow:function(){return Object(a["g"])(r["a"].account.recharge_add.code)}}]},distributorDetail:{key:"dept-distributor",btns:[{id:1,title:"重置密码",icon:"el-icon-refresh-left",type:"reset",isShow:function(){return Object(a["g"])(r["a"].user.reset.code)}},{id:2,title:"绑定酷家乐",icon:"el-icon-connection",type:"bind",isShow:function(){return Object(a["g"])(r["a"].user.bindKjl.code)}}]},deptAccount:{key:"dept-account",btns:[{id:1,title:"重置密码",icon:"el-icon-refresh-left",type:"reset",isShow:function(){return Object(a["g"])(r["a"].user.reset.code)}}]},order:{key:"order",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"editCad",isShow:function(t){return 1001===t.status&&20===t.orderWay}},{id:2,title:"初审认领",icon:"el-icon-circle-check",type:"claim",isShow:function(t){return Object(a["g"])(r["a"].order.hq_claim.code)&&2001===t.status}},{id:3,title:"终审认领",icon:"el-icon-circle-check",type:"finishClaim",isShow:function(t){return Object(a["g"])(r["a"].order.hq_claim_final.code)&&3001===t.status}},{id:4,title:"改价确认",icon:"el-icon-success",type:"changePrice",isShow:function(t){return Object(a["g"])(r["a"].price.modify_confirm.code)&&4001===t.status}},{id:5,title:"翻图驳回",icon:"el-icon-refresh-left",type:"rebackCad",isShow:function(t){return Object(a["g"])(r["a"].order.cad_reject.code)&&1101===t.status}}]},product:{key:"product",btns:[{id:1,title:"编辑",type:"edit",icon:"el-icon-edit",isShow:function(t){return Object(a["g"])(r["a"].product.edit.code)}}]}};e["a"]=o},"2c21":function(t,e,i){"use strict";var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"dataForm",staticClass:"padding-top-14",attrs:{"label-position":t.labelPosition,"label-width":t.labelWidth||"100px",model:t.dataForm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchList()}}},[i("div",{staticClass:"search-box"},t._l(t.showList,(function(e,r){return i("el-form-item",{key:r,class:{"order-length-date":e.date,"order-length-deduction":e.deduction,"order-length-type":e.orderType,"order-length-stage":e.stage,"order-length-claim":e.claim,"order-length-finish-claim":e.finishClaim,"order-length-mmodify-price":e.modifyPrice},attrs:{label:e.label+":","label-width":e.width,prop:""+e.code}},["input"===e.type?i("el-input",{attrs:{clearable:!0,placeholder:"请输入"+e.label+(e.extralabel||"")},model:{value:t.dataForm[e.code],callback:function(i){t.$set(t.dataForm,e.code,i)},expression:"dataForm[item.code]"}}):t._e(),"date"===e.type?i("el-date-picker",{attrs:{type:e.flag?"date":"daterange","value-format":"yyyy-MM-dd",placeholder:e.flag?"请选择日期":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.dataForm[e.code],callback:function(i){t.$set(t.dataForm,e.code,i)},expression:"dataForm[item.code]"}}):t._e(),"radio"===e.type?t._l(e.radioType,(function(r,a){return i("el-radio",{key:a,attrs:{label:r.value},model:{value:t.dataForm[e.code],callback:function(i){t.$set(t.dataForm,e.code,i)},expression:"dataForm[item.code]"}},[t._v(t._s(r.name))])})):t._e(),"select"===e.type?[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:t.dataForm[e.code],callback:function(i){t.$set(t.dataForm,e.code,i)},expression:"dataForm[item.code]"}},t._l(e.selectList,(function(t){return i("el-option",{key:t.id,attrs:{label:t.areaName,value:t.id}})})),1)]:t._e(),"cascader"===e.type?[i("el-cascader",{staticStyle:{width:"100%"},attrs:{"change-on-select":"",clearable:"",placeholder:"请选择产品",options:e.cascaderList,filterable:""},model:{value:t.dataForm[e.code],callback:function(i){t.$set(t.dataForm,e.code,i)},expression:"dataForm[item.code]"}})]:t._e(),"areaselect"===e.type?[i("area-select",{attrs:{isselectAll:!0,isOrder:!0}})]:t._e(),t.hiddenInput?i("input",{staticStyle:{display:"none"},attrs:{id:"hiddenText",type:"text"}}):t._e(),"area"===e.type?i("area-select"):t._e()],2)})),1),i("el-form-item",{staticClass:"search-btns"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.searchList()}}},[t._v("查询")]),i("el-button",{on:{click:function(e){return t.resetForm()}}},[t._v("重置")]),i("span",{directives:[{name:"show",rawName:"v-show",value:t.formList.length>7,expression:"formList.length >7"}],staticClass:"show-more",on:{click:function(e){t.showAll=!t.showAll}}},[i("i",{directives:[{name:"show",rawName:"v-show",value:1==t.openOrclose,expression:"openOrclose == 1"}],staticClass:"iconfont icon-zhankai"},[i("span",{staticClass:"iconfont-label"},[t._v("展开")])]),i("i",{directives:[{name:"show",rawName:"v-show",value:1!==t.openOrclose,expression:"openOrclose !== 1"}],staticClass:"iconfont icon-open"},[i("span",{staticClass:"iconfont-label"},[t._v("收起")])])])],1)],1)},a=[],o=(i("8e6e"),i("cadf"),i("456d"),i("ac6a"),i("bd86")),n=(i("7f7f"),i("2f62")),c=i("1f87");function s(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function l(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?s(Object(i),!0).forEach((function(e){Object(o["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var d={components:{AreaSelect:c["a"]},props:["labelWidth"],data:function(){return{key:this.$route.name,labelPosition:"right",dataForm:{},hiddenInput:!1,showAll:!1,formList:[]}},computed:l({},Object(n["d"])({queryData:"queryCondition"}),{openOrclose:function(){return this.showAll?2:1},showList:function(){if(this.showAll)return this.formList;var t=[];if(this.formList.length>7)for(var e=0;e<6;e++)t.push(this.formList[e]);else t=this.formList;return t}}),mounted:function(){var t={},e=0;this.formList=this.queryData.query[this.key].dataForm,this.formList.forEach((function(i){t[i.code]=i.value||i.default||"","input"===i.type&&e++})),1===e&&(this.hiddenInput=!0),this.dataForm=t},methods:l({},Object(n["c"])({setQuerys:"SET_QUERYS",setCurrent:"SET_PAGINATION_CURRENT",setCodeList:"SET_CODE_LIST"}),{searchList:function(){var t={key:this.key,current:1};this.setCurrent(t),this.setQuerys({key:this.key,query:this.dataForm}),this.$parent.getDataList()},resetForm:function(){var t=this;t.formList.forEach((function(e){e.value=e.default||"",t.dataForm[e.code]=e.default||""})),t.setCodeList(),t.setQuerys({key:t.key,query:t.dataForm})}})},u=d,p=(i("12ba"),i("2877")),f=Object(p["a"])(u,r,a,!1,null,"2de32179",null);e["a"]=f.exports},6722:function(t,e,i){},"756e":function(t,e,i){"use strict";var r=i("8e93"),a=i.n(r);a.a},"7a17":function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main-box dis-flex-col"},[i("form-module"),t.hasPermission(t.Permission.marketActivity.create.code)?i("div",{staticClass:"opt-btn"},[i("el-button",{staticStyle:{"margin-bottom":"8px"},attrs:{size:"mini",icon:"el-icon-plus",type:"primary",plain:""},on:{click:function(e){return t.addActivity()}}},[t._v("新增")])],1):t._e(),i("best-tables",{attrs:{"data-list":t.activity.activityList,optBtnList:this.optBtnList(),specialClass:t.specialClass,total:t.activity.total},on:{optThisRow:t.addOrUpdateHandle}})],1)},a=[],o=(i("8e6e"),i("ac6a"),i("cadf"),i("456d"),i("bd86")),n=(i("7f7f"),i("2f62")),c=i("184e"),s=i("2c21"),l=i("fa7d"),d=i("247d");function u(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function p(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?u(Object(i),!0).forEach((function(e){Object(o["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var f={name:"activity",components:{BestTables:c["a"],FormModule:s["a"]},data:function(){var t=this;return{key:t.$route.name,dataForm:{activityName:"",activityStatus:"0"},specialClass:{className:"invalid-row",id:"activityStatusName",value:"无效"},distributorList:[],addOrUpdateVisible:!1}},computed:p({},Object(n["d"])({queryData:"queryCondition",activity:"activity"})),mounted:function(){this.getDataList()},methods:p({},Object(n["b"])({getDistributorList:"getDistributorList",getactiveList:"getactiveList"}),{optBtnList:function(){return d["a"].activity.btns},tableRowClassName:function(t){var e=t.row;return 1===e.activityStatus?"invalid-row":""},getDataList:function(){var t=Object(l["k"])(Object(l["l"])(this.queryData.query[this.key].dataForm),this.queryData.query[this.key].pagination);this.getactiveList(Object(l["e"])(t))},tableSizeChange:function(){this.getDataList()},tableCurrentChange:function(){this.getDataList()},addActivity:function(){this.$router.push("/marketActivity/add"),this.getDistributorList({size:1e4})},addOrUpdateHandle:function(t){this.$router.push("/marketActivity/edit/"+t.id),this.getDistributorList({size:1e4})}})},h=f,y=(i("756e"),i("2877")),b=Object(y["a"])(h,r,a,!1,null,"100b8f68",null);e["default"]=b.exports},"8e93":function(t,e,i){}}]);