(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d9c8f74"],{"184e":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"flex-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.dataList,border:"","row-style":e.lineHeight,"tree-props":{children:e.childrenName,hasChildren:!0},"row-key":e.rowKey,height:"auto","row-class-name":e.specialClass&&e.tableRowClassName,"header-cell-style":{"background-color":"#f0f0f0"}},on:{"selection-change":e.handleSelectionChange}},[e.showSelectBox?a("el-table-column",{attrs:{type:"selection",width:"55"}}):e._e(),a("el-table-column",{attrs:{label:"序号",type:"index",width:"50",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s((e.queryData.query[e.key].pagination.current-1)*e.queryData.query[e.key].pagination.size+t.$index+1))])]}}])}),e._l(e.columnList,(function(t,o){return a("el-table-column",{key:o,attrs:{fixed:t.fixed,label:t.label,width:t.width||"auto","min-width":t.minWidth||""},scopedSlots:e._u([{key:"default",fn:function(o){return[t.link?a("router-link",{attrs:{to:{path:t.link.path+"/"+t.link.param(o.row)}}},[e._v(e._s(o.row[t.code])+" ")]):t.date?a("span",[e._v(e._s(e.DWY_UTILS.getTimeYMD(o.row[t.code])))]):t.doubleDate?a("span",{directives:[{name:"show",rawName:"v-show",value:o.row[t.startDate],expression:"scope.row[item.startDate]"}]},[e._v(e._s(e.DWY_UTILS.getTimeYMD(o.row[t.startDate])+"~"+e.DWY_UTILS.getTimeYMD(o.row[t.endDate])))]):t.threeUnary?a("span",[e._v("\n                    "+e._s(o.row[t.code]===t.threeUnary[0]?t.threeUnary[1]:t.threeUnary[2])+"\n                ")]):t.image?a("span",[a("viewer",{staticClass:"img-outer-box"},[a("img",{staticClass:"row-image-preview",attrs:{src:o.row.picPath}})])],1):t.link&&t.combination?e._e():a("span",[e._v(e._s(e.renderThisRow(t.type,o.row[t.code])))]),t.operation?a("span",[e._l(e.optBtnList,(function(t){return[t.isShow(o.row)?a("el-button",{key:t.id,staticStyle:{"margin-right":"8px"},attrs:{type:"text",size:"small",icon:t.icon},on:{click:function(a){return e.btnFun(o.row,t.type)}}},[e._v(e._s(t.title))]):e._e()]}))],2):e._e()]}}],null,!0)})}))],2),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:!e.noPagination&&e.pageIsShow,expression:"!noPagination && pageIsShow"}],staticClass:"pagination-position",attrs:{"current-page":e.queryData.query[e.key].pagination.current,"page-sizes":[10,20,50,100],"page-size":e.queryData.query[e.key].pagination.size,total:e.total,layout:e.layout},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}})],1)},l=[],i=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("bd86")),r=(a("c5f6"),a("7f7f"),a("2f62")),n=a("bcab"),d={store:{columns:[{label:"名称",code:"storeName",link:{path:"/store/detail",param:function(e){return"".concat(e.id)}},width:200},{label:"门店类型",code:"storeTypeName",width:100},{label:"所属经销商",code:"distributorName",link:{path:"/distributor/detail",param:function(e){return"".concat(e.distributorId)}},width:200},{label:"面积(m²)",code:"area",width:100},{label:"门店状态",code:"storeStatusName",width:100},{label:"建店日期",code:"establishedTime",date:!0,width:130},{label:"操作",operation:!0}]},distributor:{columns:[{label:"经销商编号",code:"code",link:{path:"/distributor/detail",param:function(e){return"".concat(e.id)}},width:100},{label:"所在区域",code:"areaName",width:200},{label:"所属战区",code:"regionName",width:150},{label:"负责人",code:"name",width:100},{label:"负责人手机",code:"phone",width:100},{label:"加盟日期",code:"joinTime",date:!0,width:100},{label:"状态",code:"status",threeUnary:[1,"禁用","启用"]}]},business:{columns:[{label:"范围",code:"type",threeUnary:[1,"总部","经销商"],width:100},{label:"标题",code:"title",width:200},{label:"发布日期",code:"publicTime",date:!0,width:110},{label:"操作",operation:!0}]},activity:{columns:[{label:"活动名称",code:"activityName",link:{path:"/activity/detail",param:function(e){return"".concat(e.id)}},width:200},{label:"范围",code:"activityScopeName",width:100},{label:"引流日期",doubleDate:!0,startDate:"drainageStartTime",endDate:"drainageEndTime",width:170},{label:"下单日期",doubleDate:!0,startDate:"ordersStartTime",endDate:"ordersEndTime",width:170},{label:"活动状态",code:"activityStatusName",width:80},{label:"操作",operation:!0}]},system:{columns:[{label:"分类",code:"type",threeUnary:[1,"总部","经销商"]},{label:"标题",code:"title"},{label:"状态",code:"status",status:!0,threeUnary:[1,"无效","有效"]},{label:"发布日期",code:"publicTime",date:!0},{label:"操作",operation:!0}]},user:{columns:[{label:"部门",code:"deptName",width:120},{label:"姓名",code:"name",width:100},{label:"手机",code:"phone",width:100},{label:"员工状态",code:"statusName",width:80},{label:"允许登录",code:"allowLoginName",width:70},{label:"岗位",code:"roleName"},{label:"KJL账号",code:"kjlAccount"},{label:"操作",operation:!0}]},help:{columns:[{label:"分类",code:"typeName"},{label:"编号",code:"number"},{label:"标题",code:"title"},{label:"更新日期",code:"updateTime",date:!0},{label:"状态",code:"statusName"},{label:"操作",operation:{edit:{permission:n["a"].help.update.code}}}]},loginlog:{columns:[{label:"用户名",code:"userName"},{label:"登录IP",code:"ipAddress"},{label:"登录状态",code:"succeed"},{label:"用户ID",code:"userId"},{code:"loginLogId",label:"登录ID"},{code:"createTime",label:"登录时间"}]},operationlog:{columns:[{label:"业务ID",code:"operationLogId",link:{path:"/operationLog/detail",param:function(e){return"".concat(e.operationLogId)}}},{code:"userName",label:"用户名称",width:100},{code:"logType",label:"日志类型",width:100},{label:"业务名称",code:"logName"},{code:"method",label:"方法名",width:100},{code:"succeed",label:"业务状态",width:100},{code:"message",label:"业务信息"},{code:"createTime",label:"修改时间"}]},menus:{columns:[{label:"名称",code:"label"},{label:"所属平台",code:"platformName"},{label:"编号",code:"code"},{label:"ID",code:"value"},{label:"父级编号",code:"parentId"},{label:"请求地址",code:"url"},{label:"排序",code:"sort"},{label:"层级",code:"levels"},{label:"菜单/按钮",code:"menuFlag",threeUnary:[!0,"菜单","按钮"]},{label:"操作",operation:!0}]},account:{columns:[{label:"经销商编号",code:"distributorCode",link:{path:"/account/detail",param:function(e){return"".concat(e.id,"/").concat(e.distributorId)}},width:100},{label:"所在区域",code:"distributorArea",width:200},{label:"负责人",code:"name",width:100},{label:"账户余额（元）",code:"accountTotal",money:!0,align:"right",width:130},{label:"现金余额（元）",code:"cashTotal",money:!0,align:"right",width:130},{label:"返利余额（元）",code:"rebateTotal",money:!0,align:"right",width:130},{label:"待确认对账函",code:"unconfirmedStatement",width:100},{label:"操作",operation:!0}]},distributorDetail:{columns:[{label:"部门",code:"deptName",width:110},{label:"姓名",code:"name",width:100},{label:"手机",code:"mobile",width:100},{label:"岗位",code:"roleName",width:150},{label:"KJL账号",code:"kjlAccount",width:120},{label:"操作",operation:!0}]},accountDeptDatas:{columns:[{label:"部门",code:"deptName",width:110},{label:"姓名",code:"name",width:100},{label:"手机",code:"mobile",width:100},{label:"岗位",code:"roleName",width:150},{label:"KJL账号",code:"kjlAccount",width:120},{label:"操作",operation:!0}]},order:{key:"order",columns:[{label:"订单编号",code:"orderCode",fixed:!0,link:{path:"/order/detail",param:function(e){return"".concat(e.orderId)}},width:140},{label:"所属门店",code:"storeName",width:110},{label:"客户",code:"customerName",width:80},{label:"手机",code:"customerMobile",width:95},{label:"小区",code:"housingEstateName"},{label:"期望交付(发货)日期",date:!0,code:"expectedDeliveryTime",width:125},{label:"计划交付(发货)日期",date:!0,code:"estimatedDeliveryTime",width:125},{label:"创建日期",code:"createTime",width:"100",date:!0},{label:"设计师",code:"designerName",width:80},{label:"订单类型",code:"orderTypeName",width:80},{label:"订单分类",code:"orderCategoryName",width:80},{label:"初审人",code:"firstAuditUser",width:90},{label:"终审人",code:"finalAuditUserName",width:90},{label:"初审负责人",code:"claimUserNames",width:100},{label:"终审负责人",code:"finalClaimUserNames",width:100},{label:"阶段",code:"stageName",width:60},{label:"状态",code:"statusName",width:80},{label:"经销商负责人",code:"distributorName",width:100},{label:"加急",code:"urgent",threeUnary:[!0,"是","否"],width:50},{label:"初审结果",code:"firstAuditStatusName",width:80},{label:"终审结果",code:"finalAuditStatusName",width:80},{label:"改价结果",code:"modifyPriceStatusName"},{label:"片区",code:"regionName"},{label:"城市",code:"areaCodeName"},{label:"操作",operation:!0,fixed:"right",width:120}]},product:{key:"product",columns:[{label:"图片",code:"picPath",image:!0,width:80},{label:"产品名称(平台)",code:"name"},{label:"产品名称(KJL)",code:"kjlName"},{label:"产品分类",code:"typeName"},{label:"型号",code:"model"},{label:"物料编码",type:"date",code:"code",width:"130"},{label:"规格",width:100,code:"standards"},{label:"状态",code:"status",width:80,threeUnary:[1,"下架","上架"]},{label:"直接下单",code:"isOrder",width:80,threeUnary:[1,"是","否"]},{label:"零售价（元）",code:"retailPrice",width:100,money:!0},{label:"结算价（元）",code:"nominalSettlementPrice",width:100,money:!0},{label:"供货价（元）",code:"supplyPrice",width:100,money:!0},{label:"操作",operation:{edit:{permission:n["a"].product.edit.code}}}]}},c=d;function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){Object(i["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b={data:function(){return{key:this.$route.name,layout:"total, sizes, prev, pager, next, jumper",columnList:c[this.$route.name]["columns"],loading:!0}},props:{dataList:{required:!0,type:Array,default:function(){return[]}},total:{default:0},specialClass:{},pagination:{},noPagination:{type:Boolean,default:function(){return!1}},optBtnList:{type:Array},pageIsShow:{type:Boolean,default:function(){return!0}},rowKey:{type:String},width:{type:Number},childrenName:{type:String},fixed:{},showSelectBox:{default:function(){return!1}},lineHeight:{}},computed:u({},Object(r["d"])({queryData:"queryCondition"})),watch:{dataList:function(){this.loading=!1}},mounted:function(){this.loading=Boolean(!this.dataList.length)},methods:u({},Object(r["c"])({setCurrent:"SET_PAGINATION_CURRENT",setSize:"SET_PAGINATION_SIZE"}),{getDataList:function(e){this.dataList=e||[]},renderThisRow:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(e){case"date":return this.DWY_UTILS.getTimeYMD(t);case"operation":break;case"distributor":break;case"doubleDate":break;case"sex":return 1===t?"男":"女";default:return t}},btnFun:function(e,t){this.$emit("optThisRow",e,t)},tableRowClassName:function(e){var t=e.row;return t[this.specialClass.id]===this.specialClass.value?this.specialClass.className:""},handleSelectionChange:function(e){this.$emit("selectRows",e)},sizeChangeHandle:function(e){var t={key:this.key,size:e};this.setSize(t),this.$parent.tableSizeChange()},currentChangeHandle:function(e){var t={key:this.key,current:e};this.setCurrent(t),this.$parent.tableCurrentChange()}})},h=b,p=(a("5904"),a("2877")),m=Object(p["a"])(h,o,l,!1,null,"632c9dfe",null);t["a"]=m.exports},"1f87":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-cascader",{ref:"areaCascader",attrs:{props:e.props,filterable:"",clearable:!0},on:{change:function(t){return e.handleChange(t)}},model:{value:e.selectedOptions,callback:function(t){e.selectedOptions=t},expression:"selectedOptions"}})},l=[],i=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("bd86")),r=(a("7f7f"),a("5df3"),a("1c4c"),a("b562")),n=a("2f62");function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){Object(i["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var s={props:["isAdd","isselectAll","isOrder"],data:function(){var e=this;return{selectedOptions:[],props:{lazy:!0,checkStrictly:!e.isselectAll,lazyLoad:function(t,a){var o=t.level,l=o?{parentId:t.value}:"";Object(r["a"])(l).then((function(t){if(200===t.code&&t.success){var l=Array.from(t.data).map((function(t){return{value:t.id,label:t.name,leaf:e.isOrder?o>=1:o>=2}}));e.options=l,a(l)}else e.$message({message:t.message||"请求错误",type:"error",duration:3e3}),reject()}))}},options:[]}},mounted:function(){this.isAdd?this.selectedOptions=[]:this.selectedOptions=this.appData.codeList?this.appData.codeList:[]},computed:c({},Object(n["d"])({appData:"app"})),watch:{selectedOptions:function(e){this.$emit("change",e)}},methods:c({},Object(n["c"])({setCodeList:"SET_CODE_LIST",setAreaName:"SET_AREA_NAME"}),{handleChange:function(e){"/order"===this.$route.path&&(this.$parent.form.model.areaCode=e),"/housingEstate/add"===this.$route.path&&(this.$parent.form.model.code=e),this.$emit("change",e);var t=e.slice(-1)[0];if(t!==this.appData.codeList.slice(-1)[0]){this.setCodeList(e);for(var a=0;a<this.options.length;a++)if(this.options[a].value===t){this.setAreaName(this.options[a].label);break}}}})},u=s,b=(a("662e"),a("2877")),h=Object(b["a"])(u,o,l,!1,null,"29af5f57",null);t["a"]=h.exports},5904:function(e,t,a){"use strict";var o=a("a440"),l=a.n(o);l.a},"662e":function(e,t,a){"use strict";var o=a("f975"),l=a.n(o);l.a},a440:function(e,t,a){},b562:function(e,t,a){"use strict";a.d(t,"a",(function(){return l})),a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return n}));var o=a("b775");function l(e){return Object(o["a"])({url:"/areaCode/list",method:"get",params:e})}function i(e){return Object(o["a"])({url:"/upload/uploadFile",method:"post",data:e})}function r(e){return Object(o["a"])({url:"/upload/deleteFile",method:"delete",params:e})}function n(e){return Object(o["a"])({url:"/dict/list",method:"get",params:e})}},f975:function(e,t,a){}}]);