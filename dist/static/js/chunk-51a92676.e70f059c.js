(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51a92676"],{"32a2":function(t,e,a){"use strict";var r=a("af4b"),o=a.n(r);o.a},"47fd":function(t,e,a){"use strict";var r={scrollPanel:{scrollingX:!1},bar:{hoverStyle:!0,onlyShowBarOnScroll:!1,background:"#ccc",scrollingX:!1,initialScrollX:!1,size:"5px"},rail:{}};e["a"]=r},"7b41":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("vue-scroll",{attrs:{ops:t.scrollops}},[a("div",{staticClass:"notice-container"},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"100px"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"sort",attrs:{label:"分类：",prop:"type"}},[a("el-radio-group",{model:{value:t.dataForm.type,callback:function(e){t.$set(t.dataForm,"type",e)},expression:"dataForm.type"}},[a("el-radio",{attrs:{label:"1"}},[t._v("总部")]),a("el-radio",{attrs:{label:"2"}},[t._v("经销商")])],1)],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"发布日期：",prop:"publicTime"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:t.dataForm.publicTime,callback:function(e){t.$set(t.dataForm,"publicTime",e)},expression:"dataForm.publicTime"}})],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"标题：",prop:"title"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入"},model:{value:t.dataForm.title,callback:function(e){t.$set(t.dataForm,"title",e)},expression:"dataForm.title"}})],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"mavon-editors",attrs:{label:"内容：",prop:"content"}},[a("mavon-editor",{ref:"md",attrs:{value:t.dataForm.content},on:{imgAdd:t.addImages,change:t.changeContent}}),a("div",{staticClass:"markdown-body",attrs:{id:"content"}})],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"公告状态：",size:"mini",prop:"status"}},[a("el-radio-group",{model:{value:t.dataForm.status,callback:function(e){t.$set(t.dataForm,"status",e)},expression:"dataForm.status"}},[a("el-radio",{attrs:{label:"0"}},[t._v("有效")]),a("el-radio",{attrs:{label:"1"}},[t._v("无效")])],1)],1)],1)],1),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:24}},[a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-position"},on:{click:function(e){return t.dataFormSubmit("dataForm")}}},[t._v("保存")])],1)],1)],1)],1)],1)])},o=[],s=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("6b54"),a("a481"),a("bd86")),n=a("0bb4"),l=a("b562"),i=a("fa7d"),c=a("2f62"),u=a("b2d8"),d=a("61f7"),m=(a("64e1"),a("47fd"));function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function b(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var f={props:["dept","editdept"],components:{mavonEditor:u["mavonEditor"]},data:function(){return{managerList:[],scrollops:m["a"],visible:!0,dataForm:{title:"",status:"0",type:"1",publicTime:"",content:""},html:"",dataRule:{title:[{required:!0,message:"标题不能为空",trigger:"blur"}],publicTime:[{required:!0,message:"发布时间不能为空",trigger:"blur"}],status:[{required:!0,message:"状态不能为空",trigger:"blur"}],platform:[{required:!0,message:"系统分类不能为空",trigger:"blur"}]}}},computed:b({},Object(c["d"])({deptUsrt:"deptUser"})),mounted:function(){var t=this,e=this.$route.params.id;e&&Object(n["g"])({id:e}).then((function(e){var a=e.data.content.replace(/& /gi,"&"),r=e.data,o=Object(i["m"])(r,["title","content","status","type","publicTime"]);o.status=o.status.toString(),o.content=Object(d["a"])(a),o.type=o.type.toString(),t.dataForm=b({},o)}))},methods:b({},Object(c["c"])({closeCurrentPage:"CLOSE_CURRENT_PAGE"}),{},Object(c["b"])({getNoticeList:"getNoticeList"}),{addImages:function(t,e){var a=this,r=new FormData;r.append("file",e),r.append("type",1),Object(l["d"])(r).then((function(e){if(200===e.code&&e.success){var r=e.data;a.$refs.md.$img2Url(t,r)}}))},changeContent:function(t,e){this.html=t},dataFormSubmit:function(){var t=this,e=this;this.$refs["dataForm"].validate((function(a){if(a){var r=e.dataForm;r.content=e.html,r.platform="0",t.$route.params.id?(r.id=t.$route.params.id,Object(n["f"])(r).then((function(a){200===a.code&&a.success?(t.$message.success("编辑成功"),t.closeCurrentPage(t.$route.fullPath),t.$router.push("/system/notice")):e.$message.error(a.data.message||"编辑失败")}))):Object(n["e"])(r).then((function(a){200===a.code&&a.success?(t.$message.success("新增成功"),t.closeCurrentPage(t.$route.fullPath),t.$router.push("/system/notice")):e.$message.error(a.data.message||"新增失败")}))}}))}})},g=f,h=(a("32a2"),a("2877")),v=Object(h["a"])(g,r,o,!1,null,"059a1dc4",null);e["default"]=v.exports},af4b:function(t,e,a){},b562:function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),a.d(e,"d",(function(){return s})),a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return l}));var r=a("b775");function o(t){return Object(r["a"])({url:"/areaCode/list",method:"get",params:t})}function s(t){return Object(r["a"])({url:"/upload/uploadFile",method:"post",data:t})}function n(t){return Object(r["a"])({url:"/upload/deleteFile",method:"delete",params:t})}function l(t){return Object(r["a"])({url:"/dict/list",method:"get",params:t})}}}]);