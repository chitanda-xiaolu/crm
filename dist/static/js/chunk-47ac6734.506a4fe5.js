(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47ac6734"],{"12ba":function(e,t,i){"use strict";var n=i("6722"),o=i.n(n);o.a},"247d":function(e,t,i){"use strict";var n=i("bcab"),o=i("fa7d"),r={store:{key:"store",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].store.update.code)}}]},business:{key:"bussiness-notice",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].businessNotice.update.code)}}]},system:{key:"system-notice",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].systemNotice.update.code)}}]},activity:{key:"activity",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].marketActivity.update.code)}}]},staff:{key:"staff",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].user.update.code)}},{id:2,title:"重置密码",icon:"el-icon-refresh-left",type:"reset",isShow:function(){return Object(o["g"])(n["a"].user.reset.code)}},{id:3,title:"绑定酷家乐",icon:"el-icon-connection",type:"bind",isShow:function(){return Object(o["g"])(n["a"].user.bindKjl.code)}}]},help:{key:"help",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].help.update.code)}}]},menu:{key:"menu",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"edit",isShow:function(){return Object(o["g"])(n["a"].menu.update.code)}}]},account:{key:"account",btns:[{id:1,title:"现金充值",icon:"el-icon-medal-1",type:"cash",isShow:function(){return Object(o["g"])(n["a"].account.recharge_add.code)}},{id:2,title:"返利充值",type:"fanli",icon:"el-icon-medal",isShow:function(){return Object(o["g"])(n["a"].account.recharge_add.code)}}]},distributorDetail:{key:"dept-distributor",btns:[{id:1,title:"重置密码",icon:"el-icon-refresh-left",type:"reset",isShow:function(){return Object(o["g"])(n["a"].user.reset.code)}},{id:2,title:"绑定酷家乐",icon:"el-icon-connection",type:"bind",isShow:function(){return Object(o["g"])(n["a"].user.bindKjl.code)}}]},deptAccount:{key:"dept-account",btns:[{id:1,title:"重置密码",icon:"el-icon-refresh-left",type:"reset",isShow:function(){return Object(o["g"])(n["a"].user.reset.code)}}]},order:{key:"order",btns:[{id:1,title:"编辑",icon:"el-icon-edit",type:"editCad",isShow:function(e){return 1001===e.status&&20===e.orderWay}},{id:2,title:"初审认领",icon:"el-icon-circle-check",type:"claim",isShow:function(e){return Object(o["g"])(n["a"].order.hq_claim.code)&&2001===e.status}},{id:3,title:"终审认领",icon:"el-icon-circle-check",type:"finishClaim",isShow:function(e){return Object(o["g"])(n["a"].order.hq_claim_final.code)&&3001===e.status}},{id:4,title:"改价确认",icon:"el-icon-success",type:"changePrice",isShow:function(e){return Object(o["g"])(n["a"].price.modify_confirm.code)&&4001===e.status}},{id:5,title:"翻图驳回",icon:"el-icon-refresh-left",type:"rebackCad",isShow:function(e){return Object(o["g"])(n["a"].order.cad_reject.code)&&1101===e.status}}]},product:{key:"product",btns:[{id:1,title:"编辑",type:"edit",icon:"el-icon-edit",isShow:function(e){return Object(o["g"])(n["a"].product.edit.code)}}]}};t["a"]=r},"2c21":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-form",{ref:"dataForm",staticClass:"padding-top-14",attrs:{"label-position":e.labelPosition,"label-width":e.labelWidth||"100px",model:e.dataForm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchList()}}},[i("div",{staticClass:"search-box"},e._l(e.showList,(function(t,n){return i("el-form-item",{key:n,class:{"order-length-date":t.date,"order-length-deduction":t.deduction,"order-length-type":t.orderType,"order-length-stage":t.stage,"order-length-claim":t.claim,"order-length-finish-claim":t.finishClaim,"order-length-mmodify-price":t.modifyPrice},attrs:{label:t.label+":","label-width":t.width,prop:""+t.code}},["input"===t.type?i("el-input",{attrs:{clearable:!0,placeholder:"请输入"+t.label+(t.extralabel||"")},model:{value:e.dataForm[t.code],callback:function(i){e.$set(e.dataForm,t.code,i)},expression:"dataForm[item.code]"}}):e._e(),"date"===t.type?i("el-date-picker",{attrs:{type:t.flag?"date":"daterange","value-format":"yyyy-MM-dd",placeholder:t.flag?"请选择日期":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dataForm[t.code],callback:function(i){e.$set(e.dataForm,t.code,i)},expression:"dataForm[item.code]"}}):e._e(),"radio"===t.type?e._l(t.radioType,(function(n,o){return i("el-radio",{key:o,attrs:{label:n.value},model:{value:e.dataForm[t.code],callback:function(i){e.$set(e.dataForm,t.code,i)},expression:"dataForm[item.code]"}},[e._v(e._s(n.name))])})):e._e(),"select"===t.type?[i("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.dataForm[t.code],callback:function(i){e.$set(e.dataForm,t.code,i)},expression:"dataForm[item.code]"}},e._l(t.selectList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.areaName,value:e.id}})})),1)]:e._e(),"cascader"===t.type?[i("el-cascader",{staticStyle:{width:"100%"},attrs:{"change-on-select":"",clearable:"",placeholder:"请选择产品",options:t.cascaderList,filterable:""},model:{value:e.dataForm[t.code],callback:function(i){e.$set(e.dataForm,t.code,i)},expression:"dataForm[item.code]"}})]:e._e(),"areaselect"===t.type?[i("area-select",{attrs:{isselectAll:!0,isOrder:!0}})]:e._e(),e.hiddenInput?i("input",{staticStyle:{display:"none"},attrs:{id:"hiddenText",type:"text"}}):e._e(),"area"===t.type?i("area-select"):e._e()],2)})),1),i("el-form-item",{staticClass:"search-btns"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.searchList()}}},[e._v("查询")]),i("el-button",{on:{click:function(t){return e.resetForm()}}},[e._v("重置")]),i("span",{directives:[{name:"show",rawName:"v-show",value:e.formList.length>7,expression:"formList.length >7"}],staticClass:"show-more",on:{click:function(t){e.showAll=!e.showAll}}},[i("i",{directives:[{name:"show",rawName:"v-show",value:1==e.openOrclose,expression:"openOrclose == 1"}],staticClass:"iconfont icon-zhankai"},[i("span",{staticClass:"iconfont-label"},[e._v("展开")])]),i("i",{directives:[{name:"show",rawName:"v-show",value:1!==e.openOrclose,expression:"openOrclose !== 1"}],staticClass:"iconfont icon-open"},[i("span",{staticClass:"iconfont-label"},[e._v("收起")])])])],1)],1)},o=[],r=(i("8e6e"),i("cadf"),i("456d"),i("ac6a"),i("bd86")),a=(i("7f7f"),i("2f62")),c=i("1f87");function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function l(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?s(Object(i),!0).forEach((function(t){Object(r["a"])(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var d={components:{AreaSelect:c["a"]},props:["labelWidth"],data:function(){return{key:this.$route.name,labelPosition:"right",dataForm:{},hiddenInput:!1,showAll:!1,formList:[]}},computed:l({},Object(a["d"])({queryData:"queryCondition"}),{openOrclose:function(){return this.showAll?2:1},showList:function(){if(this.showAll)return this.formList;var e=[];if(this.formList.length>7)for(var t=0;t<6;t++)e.push(this.formList[t]);else e=this.formList;return e}}),mounted:function(){var e={},t=0;this.formList=this.queryData.query[this.key].dataForm,this.formList.forEach((function(i){e[i.code]=i.value||i.default||"","input"===i.type&&t++})),1===t&&(this.hiddenInput=!0),this.dataForm=e},methods:l({},Object(a["c"])({setQuerys:"SET_QUERYS",setCurrent:"SET_PAGINATION_CURRENT",setCodeList:"SET_CODE_LIST"}),{searchList:function(){var e={key:this.key,current:1};this.setCurrent(e),this.setQuerys({key:this.key,query:this.dataForm}),this.$parent.getDataList()},resetForm:function(){var e=this;e.formList.forEach((function(t){t.value=t.default||"",e.dataForm[t.code]=t.default||""})),e.setCodeList(),e.setQuerys({key:e.key,query:e.dataForm})}})},u=d,p=(i("12ba"),i("2877")),h=Object(p["a"])(u,n,o,!1,null,"2de32179",null);t["a"]=h.exports},6398:function(e,t,i){"use strict";var n=i("77c5"),o=i.n(n);o.a},6722:function(e,t,i){},"741b":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"main-box dis-flex-col"},[i("form-module"),e.hasPermission(e.Permission.help.create.code)?i("div",{staticClass:"opt-btn"},[i("el-button",{staticStyle:{"margin-bottom":"8px"},attrs:{size:"mini",icon:"el-icon-plus",type:"primary",plain:""},on:{click:function(t){return e.addHandle()}}},[e._v("新增")])],1):e._e(),i("best-tables",{attrs:{"data-list":e.help.helpList.records||[],specialClass:e.specialClass,optBtnList:this.optBtnList(),total:e.help.helpList.total},on:{optThisRow:e.editHandle}})],1)},o=[],r=(i("8e6e"),i("ac6a"),i("cadf"),i("456d"),i("bd86")),a=(i("7f7f"),i("2f62")),c=i("fa7d"),s=i("184e"),l=i("2c21"),d=i("247d");function u(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function p(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?u(Object(i),!0).forEach((function(t){Object(r["a"])(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var h={name:"help",components:{BestTables:s["a"],FormModule:l["a"]},data:function(){return{key:this.$route.name,labelPosition:"right",current:1,size:20,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,specialClass:{className:"invalid-row",id:"statusName",value:"无效"}}},computed:p({},Object(a["d"])({queryData:"queryCondition",help:"help"})),mounted:function(){this.getDataList()},methods:p({},Object(a["b"])({gethelpList:"gethelpList"}),{optBtnList:function(){return d["a"].help.btns},getDataList:function(){var e=Object(c["k"])(this.queryData.query[this.key].pagination,Object(c["l"])(this.queryData.query[this.key].dataForm));e.releaseTime&&e.releaseTime.length?(e.startDate=e.releaseTime[0],e.endDate=e.releaseTime[1],e.releaseTime=""):(delete e.startTime,delete e.endTime),this.gethelpList(Object(c["e"])(e))},tableRowClassName:function(e){var t=e.row;return 1===t.status?"invalid-row":""},tableSizeChange:function(){this.getDataList()},tableCurrentChange:function(){this.getDataList()},editHandle:function(e){this.$router.push({path:"/help/platform/edit/"+e.id})},addHandle:function(){this.$router.push({path:"/help/platform/add"})}})},f=h,b=(i("6398"),i("2877")),m=Object(b["a"])(f,n,o,!1,null,"551af898",null);t["default"]=m.exports},"77c5":function(e,t,i){}}]);