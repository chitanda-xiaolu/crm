(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a3d6344"],{"12ba":function(e,t,a){"use strict";var r=a("6722"),o=a.n(r);o.a},2672:function(e,t,a){},"2c21":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"dataForm",staticClass:"padding-top-14",attrs:{"label-position":e.labelPosition,"label-width":e.labelWidth||"100px",model:e.dataForm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchList()}}},[a("div",{staticClass:"search-box"},e._l(e.showList,(function(t,r){return a("el-form-item",{key:r,class:{"order-length-date":t.date,"order-length-deduction":t.deduction,"order-length-type":t.orderType,"order-length-stage":t.stage,"order-length-claim":t.claim,"order-length-finish-claim":t.finishClaim,"order-length-mmodify-price":t.modifyPrice},attrs:{label:t.label+":","label-width":t.width,prop:""+t.code}},["input"===t.type?a("el-input",{attrs:{clearable:!0,placeholder:"请输入"+t.label+(t.extralabel||"")},model:{value:e.dataForm[t.code],callback:function(a){e.$set(e.dataForm,t.code,a)},expression:"dataForm[item.code]"}}):e._e(),"date"===t.type?a("el-date-picker",{attrs:{type:t.flag?"date":"daterange","value-format":"yyyy-MM-dd",placeholder:t.flag?"请选择日期":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dataForm[t.code],callback:function(a){e.$set(e.dataForm,t.code,a)},expression:"dataForm[item.code]"}}):e._e(),"radio"===t.type?e._l(t.radioType,(function(r,o){return a("el-radio",{key:o,attrs:{label:r.value},model:{value:e.dataForm[t.code],callback:function(a){e.$set(e.dataForm,t.code,a)},expression:"dataForm[item.code]"}},[e._v(e._s(r.name))])})):e._e(),"select"===t.type?[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.dataForm[t.code],callback:function(a){e.$set(e.dataForm,t.code,a)},expression:"dataForm[item.code]"}},e._l(t.selectList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.areaName,value:e.id}})})),1)]:e._e(),"cascader"===t.type?[a("el-cascader",{staticStyle:{width:"100%"},attrs:{"change-on-select":"",clearable:"",placeholder:"请选择产品",options:t.cascaderList,filterable:""},model:{value:e.dataForm[t.code],callback:function(a){e.$set(e.dataForm,t.code,a)},expression:"dataForm[item.code]"}})]:e._e(),"areaselect"===t.type?[a("area-select",{attrs:{isselectAll:!0,isOrder:!0}})]:e._e(),e.hiddenInput?a("input",{staticStyle:{display:"none"},attrs:{id:"hiddenText",type:"text"}}):e._e(),"area"===t.type?a("area-select"):e._e()],2)})),1),a("el-form-item",{staticClass:"search-btns"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.searchList()}}},[e._v("查询")]),a("el-button",{on:{click:function(t){return e.resetForm()}}},[e._v("重置")]),a("span",{directives:[{name:"show",rawName:"v-show",value:e.formList.length>7,expression:"formList.length >7"}],staticClass:"show-more",on:{click:function(t){e.showAll=!e.showAll}}},[a("i",{directives:[{name:"show",rawName:"v-show",value:1==e.openOrclose,expression:"openOrclose == 1"}],staticClass:"iconfont icon-zhankai"},[a("span",{staticClass:"iconfont-label"},[e._v("展开")])]),a("i",{directives:[{name:"show",rawName:"v-show",value:1!==e.openOrclose,expression:"openOrclose !== 1"}],staticClass:"iconfont icon-open"},[a("span",{staticClass:"iconfont-label"},[e._v("收起")])])])],1)],1)},o=[],s=(a("8e6e"),a("cadf"),a("456d"),a("ac6a"),a("bd86")),i=(a("7f7f"),a("2f62")),n=a("1f87");function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(s["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var d={components:{AreaSelect:n["a"]},props:["labelWidth"],data:function(){return{key:this.$route.name,labelPosition:"right",dataForm:{},hiddenInput:!1,showAll:!1,formList:[]}},computed:c({},Object(i["d"])({queryData:"queryCondition"}),{openOrclose:function(){return this.showAll?2:1},showList:function(){if(this.showAll)return this.formList;var e=[];if(this.formList.length>7)for(var t=0;t<6;t++)e.push(this.formList[t]);else e=this.formList;return e}}),mounted:function(){var e={},t=0;this.formList=this.queryData.query[this.key].dataForm,this.formList.forEach((function(a){e[a.code]=a.value||a.default||"","input"===a.type&&t++})),1===t&&(this.hiddenInput=!0),this.dataForm=e},methods:c({},Object(i["c"])({setQuerys:"SET_QUERYS",setCurrent:"SET_PAGINATION_CURRENT",setCodeList:"SET_CODE_LIST"}),{searchList:function(){var e={key:this.key,current:1};this.setCurrent(e),this.setQuerys({key:this.key,query:this.dataForm}),this.$parent.getDataList()},resetForm:function(){var e=this;e.formList.forEach((function(t){t.value=t.default||"",e.dataForm[t.code]=t.default||""})),e.setCodeList(),e.setQuerys({key:e.key,query:e.dataForm})}})},u=d,p=(a("12ba"),a("2877")),m=Object(p["a"])(u,r,o,!1,null,"2de32179",null);t["a"]=m.exports},"310a":function(e,t,a){"use strict";var r=a("fda2"),o=a.n(r);o.a},"3f2a":function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"c",(function(){return s})),a.d(t,"b",(function(){return i}));var r=a("b775");function o(e){return Object(r["a"])({url:"/distributor/hq/export",method:"get",params:e,responseType:"blob"})}function s(e){return Object(r["a"])({url:"/order/hq/export",method:"get",params:e,responseType:"blob"})}function i(e){return Object(r["a"])({url:"/performance/hq/statistics/export",method:"get",params:e,responseType:"blob"})}},"61f7":function(e,t,a){"use strict";a.d(t,"f",(function(){return r})),a.d(t,"d",(function(){return o})),a.d(t,"e",(function(){return s})),a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return l}));a("a481");function r(e,t,a){/^[0-9]{11}$/.test(t)?a():a(new Error("请输入正确的手机号"))}function o(e,t,a){/^([1-9]\d*|0)(\.\d*[0-9])?$/.test(t)?a():a(new Error("请输入正数"))}function s(e,t,a){parseFloat(t)>0?a():a(new Error("请输入正数"))}function i(e){var t={lt:"<",gt:">",nbsp:" ",amp:"&",quot:'"',"#40":"(","#41":")"};return e&&e.replace(/&(lt|gt|nbsp|amp|quot|#40|#41);/gi,(function(e,a){return t[a]}))}function n(e){var t=new Date(e),a=t.getFullYear()+"-",r=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",o=t.getDate()<10?"0"+t.getDate():t.getDate(),s=a+r+o;return s}function l(e){var t=e.substring(0,19);t=t.replace(/-/g,"/");var a=new Date(t).getTime();return a}},6722:function(e,t,a){},bc43:function(e,t,a){"use strict";var r=a("2672"),o=a.n(r);o.a},c0ae:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,visible:e.distributorData.dialogStatus,"close-on-click-modal":e.isEdit,"destroy-on-close":!0},on:{"update:visible":function(t){return e.$set(e.distributorData,"dialogStatus",t)}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"招商员工：","label-width":e.formLabelWidth,prop:"businessId"}},[a("el-select",{staticClass:"width-all",attrs:{placeholder:"请选择招商人员",filterable:"",clearable:"",remote:"","reserve-keyword":""},model:{value:e.dataForm.businessId,callback:function(t){e.$set(e.dataForm,"businessId",t)},expression:"dataForm.businessId"}},e._l(e.users,(function(e){return a("el-option",{key:e.userId,attrs:{label:e.name,disabled:1==e.status,value:e.userId}})})),1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所在区域：","label-width":e.formLabelWidth,prop:"areaId"}},[a("area-select",{staticClass:"width-all",on:{change:e.handlChange}})],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"代理地点：","label-width":e.formLabelWidth,prop:"agentAddress"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:"",autocomplete:"off"},model:{value:e.dataForm.agentAddress,callback:function(t){e.$set(e.dataForm,"agentAddress",t)},expression:"dataForm.agentAddress"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"负责人：","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:"",autocomplete:"off"},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"负责人手机：","label-width":e.formLabelWidth,prop:"phone"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:"",autocomplete:"off"},model:{value:e.dataForm.phone,callback:function(t){e.$set(e.dataForm,"phone",t)},expression:"dataForm.phone"}})],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"加盟日期：","label-width":e.formLabelWidth,prop:"joinTime"}},[a("el-date-picker",{staticClass:"width-all",attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期时间"},model:{value:e.dataForm.joinTime,callback:function(t){e.$set(e.dataForm,"joinTime",t)},expression:"dataForm.joinTime"}})],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"经销商类型：","label-width":e.formLabelWidth}},[a("el-radio-group",{model:{value:e.dataForm.type,callback:function(t){e.$set(e.dataForm,"type",t)},expression:"dataForm.type"}},[a("el-radio",{attrs:{label:"2"}},[e._v("加盟")]),a("el-radio",{attrs:{label:"1"}},[e._v("直营")])],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"经销商状态：","label-width":e.formLabelWidth}},[a("el-radio-group",{model:{value:e.dataForm.status,callback:function(t){e.$set(e.dataForm,"status",t)},expression:"dataForm.status"}},[a("el-radio",{attrs:{label:"0"}},[e._v("启用")]),a("el-radio",{attrs:{label:"1"}},[e._v("禁用")])],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"收获地址：","label-width":e.formLabelWidth,prop:"address"}},[a("el-input",{attrs:{placeholder:"请输入经销商收获地址",type:"textarea",clearable:"",autosize:""},model:{value:e.dataForm.address,callback:function(t){e.$set(e.dataForm,"address",t)},expression:"dataForm.address"}})],1)],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeDealer}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")])],1)],1)},o=[],s=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("6b54"),a("bd86")),i=a("2f62"),n=a("61f7"),l=a("7306"),c=a("dcd1"),d=a("1f87"),u=a("01ea"),p=a("fa7d");function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){Object(s["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b={data:function(){return{dataForm:{name:"",phone:"",businessId:"",joinTime:"",agentAddress:"",status:"0",type:"2",areaId:"",address:""},id:"",users:[],formLabelWidth:"110px",dataRule:{name:[{required:!0,message:"请输入负责人姓名",trigger:"change"}],areaId:[{required:!0,message:"请选择所在区域",trigger:"change"}],phone:[{required:!0,message:"请填写正确的手机号码",trigger:"change"},{validator:n["f"],trigger:"change"}],joinTime:[{required:!0,message:"请选择加盟日期",trigger:"change"}],agentAddress:[{required:!0,message:"请输入代理地址",trigger:"change"}],address:[{required:!0,message:"请输入收货地址",trigger:"change"}]},title:"新增经销商",isEdit:!1}},inject:["reload"],components:{AreaSelect:d["a"]},computed:f({},Object(i["d"])({appData:"app",distributorData:"distributor"})),mounted:function(){this.getUsers()},methods:f({},Object(i["c"])({setDialogStatus:"SET_DIALOGSTATUS",setCodeList:"SET_CODE_LIST"}),{getUsers:function(){var e=this;Object(c["j"])({platform:u["a"].COMPANY_PLATFORM}).then((function(t){200===t.code&&t.success&&(t.data.length?e.users=t.data:e.users.length=0)}))},handlChange:function(e){this.dataForm.areaId=e[2]||e[1]||e[0]},isCreateStore:function(e){var t=this;this.$confirm("是否继续新增门店?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$router.push({path:"/store/add",query:{id:e}})})).catch((function(){t.$message.success("操作成功")}))},onSubmit:function(){var e=this;this.dataForm.areaId=this.appData.codeList[2]||this.appData.codeList[1]||this.appData.codeList[0],this.$refs["dataForm"].validate((function(t){if(t&&e.isEdit){var a=Object(p["e"])(e.dataForm);a.id=e.id;var r=e;Object(l["j"])(a).then((function(e){200===e.code&&e.success?(r.setCodeList(),r.closeDealer(),r.reload()):r.$message.error(e.message||"操作失败")}))}else if(t){var o=Object(p["e"])(e.dataForm),s=e;Object(l["a"])(o).then((function(e){200===e.code&&e.success?(s.setCodeList(),s.closeDealer(),s.reload(),s.isCreateStore(e.data)):s.$message.error(e.message||"操作失败")}))}else e.$message.error("请填写所有必填字段")}))},closeDealer:function(){this.setDialogStatus(!1),this.isEdit||this.setCodeList()},editAction:function(e){for(var t in this.isEdit=!0,this.title="编辑经销商",this.dataForm)this.dataForm[t]=e[t];this.dataForm.status=this.dataForm.status.toString(),this.dataForm.type=this.dataForm.type.toString(),this.id=e.id}})},h=b,g=(a("310a"),a("2877")),y=Object(g["a"])(h,r,o,!1,null,"2c163233",null);t["a"]=y.exports},e6a2:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-box dis-flex-col"},[a("form-module"),a("div",{staticClass:"opt-btn"},[a("el-button",{staticStyle:{"margin-bottom":"8px"},attrs:{size:"mini",icon:"el-icon-plus",type:"primary",plain:""},on:{click:function(t){return e.addDealer()}}},[e._v("新增")]),a("el-button",{staticStyle:{"margin-bottom":"8px"},attrs:{size:"mini",icon:"el-icon-printer",type:"warning",plain:""},on:{click:function(t){return e.exportDealer()}}},[e._v("导出")])],1),a("best-tables",{attrs:{dataList:e.distributorList,specialClass:e.specialClass,total:e.total}}),a("add-or-update",{ref:"addOrUpdate"})],1)},o=[],s=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("bd86")),i=(a("7f7f"),a("2f62")),n=a("7306"),l=a("c0ae"),c=a("184e"),d=a("fa7d"),u=a("2c21"),p=a("3f2a");function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){Object(s["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b={name:"distributor",components:{BestTables:c["a"],FormModule:u["a"],AddOrUpdate:l["a"]},data:function(){return{key:this.$route.name,dataForm:{name:"",phone:"",roleName:"",code:"",publicTime:"",areaName:""},specialClass:{className:"invalid-row",id:"status",value:1},distributorList:[],dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,isArea:!0,total:0,dialogStatus:!1}},computed:f({},Object(i["d"])({queryData:"queryCondition",appData:"app"})),mounted:function(){this.getDataList()},methods:f({},Object(i["c"])({setDialogStatus:"SET_DIALOGSTATUS"}),{getDataList:function(){var e=this,t=Object(d["k"])(this.queryData.query[this.key].pagination,Object(d["l"])(this.queryData.query[this.key].dataForm));t.publicTime&&t.publicTime.length?(t.startTime=t.publicTime[0],t.endTime=t.publicTime[1],t.publicTime=""):(delete t.startTime,delete t.endTime),Object(n["f"])(Object(d["e"])(t)).then((function(t){if(200===t.code&&t.success){var a=t.data;e.distributorList=a.records,e.total=a.total}else e.$message.error("操作失败")}))},tableRowClassName:function(e){var t=e.row;return 1===t.status?"invalid-row":""},tableSizeChange:function(){this.getDataList()},tableCurrentChange:function(){this.getDataList()},addDealer:function(){this.setDialogStatus(!0)},exportDealer:function(){var e=this;Object(p["a"])(Object(d["l"])(this.queryData.query[this.key].dataForm)).then((function(e){Object(d["c"])(e,"经销商列表")})).catch((function(t){e.$message.error(t)}))}})},h=b,g=(a("bc43"),a("2877")),y=Object(g["a"])(h,r,o,!1,null,"97e8d8b2",null);t["default"]=y.exports},fda2:function(e,t,a){}}]);