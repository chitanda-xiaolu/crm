(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17badf9d"],{"1f87":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-cascader",{ref:"areaCascader",attrs:{props:e.props,filterable:"",clearable:!0},on:{change:function(t){return e.handleChange(t)}},model:{value:e.selectedOptions,callback:function(t){e.selectedOptions=t},expression:"selectedOptions"}})},r=[],i=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("bd86")),o=(a("7f7f"),a("5df3"),a("1c4c"),a("b562")),s=a("2f62");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){Object(i["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var l={props:["isAdd","isselectAll","isOrder"],data:function(){var e=this;return{selectedOptions:[],props:{lazy:!0,checkStrictly:!e.isselectAll,lazyLoad:function(t,a){var n=t.level,r=n?{parentId:t.value}:"";Object(o["a"])(r).then((function(t){if(200===t.code&&t.success){var r=Array.from(t.data).map((function(t){return{value:t.id,label:t.name,leaf:e.isOrder?n>=1:n>=2}}));e.options=r,a(r)}else e.$message({message:t.message||"请求错误",type:"error",duration:3e3}),reject()}))}},options:[]}},mounted:function(){this.isAdd?this.selectedOptions=[]:this.selectedOptions=this.appData.codeList?this.appData.codeList:[]},computed:u({},Object(s["d"])({appData:"app"})),watch:{selectedOptions:function(e){this.$emit("change",e)}},methods:u({},Object(s["c"])({setCodeList:"SET_CODE_LIST",setAreaName:"SET_AREA_NAME"}),{handleChange:function(e){"/order"===this.$route.path&&(this.$parent.form.model.areaCode=e),"/housingEstate/add"===this.$route.path&&(this.$parent.form.model.code=e),this.$emit("change",e);var t=e.slice(-1)[0];if(t!==this.appData.codeList.slice(-1)[0]){this.setCodeList(e);for(var a=0;a<this.options.length;a++)if(this.options[a].value===t){this.setAreaName(this.options[a].label);break}}}})},d=l,p=(a("662e"),a("2877")),f=Object(p["a"])(d,n,r,!1,null,"29af5f57",null);t["a"]=f.exports},"33c7":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"bmap-container",attrs:{id:e.mapId}})},r=[],i=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("7f7f"),a("96cf"),a("3b8d")),o=a("bd86"),s=a("fe2f"),c=a("2f62"),u=a("fa7d");function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p={data:function(){return{loading:!1,mapId:"BMap-".concat(Date.now()).concat(Math.floor(1e3*Math.random())),longitude:"120.260409",latitude:"30.244508",estateName:"布兰莎总部"}},computed:d({},Object(c["d"])({appData:"app",estateData:"estate"})),watch:{"estateData.position":{handler:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t,a){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(Object(u["i"])(t)||!t.location){e.next=7;break}return n=t,this.longitude=n.location.lng,this.latitude=n.location.lat,this.estateName=n.name,e.next=7,this.initMap();case 7:this.loading=!1;case 8:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()}},methods:d({},Object(c["c"])({setMap:"SET_MAP",setLabel:"SET_LABEL"}),{},Object(c["b"])({getPositionForName:"getPositionForName"}),{initMap:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=this,a.loading=!0,e.next=4,Object(s["a"])().then(Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new BMap.Map(a.mapId),r=new BMap.Point(t?t.longitude:a.longitude,t?t.latitude:a.latitude),e.next=4,n.centerAndZoom(new BMap.Point(t?t.longitude:a.longitude,t?t.latitude:a.latitude),17);case 4:return i=new BMap.Marker(r),e.next=7,n.addOverlay(i);case 7:return o=Object(s["b"])(t?t.estateName:a.estateName),i.setLabel(o),n.enableScrollWheelZoom(),n.enableInertialDragging(),a.loading=!1,e.next=14,a.setMap(n);case 14:return e.next=16,a.setLabel(o);case 16:case"end":return e.stop()}}),e)}))));case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),initMapFromName:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getPositionForName({name:t,region:this.appData.areaName});case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()})},f=p,m=a("2877"),b=Object(m["a"])(f,n,r,!1,null,null,null);t["a"]=b.exports},"61f7":function(e,t,a){"use strict";a.d(t,"f",(function(){return n})),a.d(t,"d",(function(){return r})),a.d(t,"e",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return c}));a("a481");function n(e,t,a){/^[0-9]{11}$/.test(t)?a():a(new Error("请输入正确的手机号"))}function r(e,t,a){/^([1-9]\d*|0)(\.\d*[0-9])?$/.test(t)?a():a(new Error("请输入正数"))}function i(e,t,a){parseFloat(t)>0?a():a(new Error("请输入正数"))}function o(e){var t={lt:"<",gt:">",nbsp:" ",amp:"&",quot:'"',"#40":"(","#41":")"};return e&&e.replace(/&(lt|gt|nbsp|amp|quot|#40|#41);/gi,(function(e,a){return t[a]}))}function s(e){var t=new Date(e),a=t.getFullYear()+"-",n=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",r=t.getDate()<10?"0"+t.getDate():t.getDate(),i=a+n+r;return i}function c(e){var t=e.substring(0,19);t=t.replace(/-/g,"/");var a=new Date(t).getTime();return a}},"662e":function(e,t,a){"use strict";var n=a("f975"),r=a.n(n);r.a},"73f5":function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"e",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return s})),a.d(t,"h",(function(){return c})),a.d(t,"g",(function(){return u})),a.d(t,"f",(function(){return l})),a.d(t,"c",(function(){return d}));var n=a("b775");function r(e){return Object(n["a"])({url:"/store/hq/page",method:"get",params:e})}function i(e){return Object(n["a"])({url:"/store/hq/detail",method:"get",params:e})}function o(e){return Object(n["a"])({url:"/store/hq/add",method:"post",params:e})}function s(e){return Object(n["a"])({url:"/store/hq/edit",method:"put",params:e})}function c(e){return Object(n["a"])({url:"/dict/list?dictTypeCode=store_type",method:"get",params:e})}function u(e){return Object(n["a"])({url:"/dict/list?dictTypeCode=store_status",method:"get",params:e})}function l(e){return Object(n["a"])({url:"/dict/list?dictTypeCode=show_location",method:"get",params:e})}function d(e){return Object(n["a"])({url:"/distributorEmployee/list",method:"get",params:e})}},b562:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return s}));var n=a("b775");function r(e){return Object(n["a"])({url:"/areaCode/list",method:"get",params:e})}function i(e){return Object(n["a"])({url:"/upload/uploadFile",method:"post",data:e})}function o(e){return Object(n["a"])({url:"/upload/deleteFile",method:"delete",params:e})}function s(e){return Object(n["a"])({url:"/dict/list",method:"get",params:e})}},ced5:function(e,t,a){},e7fe:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"门店地址","close-on-click-modal":!1,visible:e.visible,"destroy-on-close":!0,width:"60%"},on:{"update:visible":function(t){e.visible=t}}},[a("div",{staticClass:"main-box dis-flex-row"},[a("div",{staticClass:"map-box dis-flex-row"},[a("div",{staticClass:"map-box-left"},[a("div",{staticClass:"dis-flex-col margin-top-70"},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"所在区域",prop:"code"}},[a("area-select",{ref:"areaSelect",attrs:{isAdd:e.isAdd,isselectAll:e.isselectAll},on:{change:e.areaSelectFocus}})],1),a("el-form-item",{attrs:{label:"地址",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入"},on:{blur:e.searchMap},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchMap(t)}},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"定位"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"padding-left-0",attrs:{span:10}},[a("el-input",{attrs:{placeholder:"经度",disabled:!0},model:{value:e.form.lng,callback:function(t){e.$set(e.form,"lng",t)},expression:"form.lng"}})],1),a("el-col",{attrs:{span:10}},[a("el-input",{attrs:{placeholder:"纬度",disabled:!0},model:{value:e.form.lat,callback:function(t){e.$set(e.form,"lat",t)},expression:"form.lat"}})],1)],1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",disabled:e.disableSubmit},on:{click:e.onSubmit}},[e._v("确认")])],1)],1)],1)]),a("div",{staticClass:"map-box-right"},[a("baidu-map",{ref:"baiduMap"})],1)])])])},r=[],i=(a("8e6e"),a("ac6a"),a("cadf"),a("456d"),a("96cf"),a("3b8d")),o=(a("7f7f"),a("bd86")),s=a("1f87"),c=a("33c7"),u=a("2f62"),l=a("fa7d");function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var f={components:{AreaSelect:s["a"],BaiduMap:c["a"]},props:["detailInfo"],data:function(){return{visible:!1,isAdd:!0,isselectAll:!0,form:{name:"",lng:"",lat:"",code:""},times:0,rules:{code:[{required:!0,message:"请选择所在区域",trigger:"change"}],name:[{required:!0,message:"请输入地址",trigger:"change"}]}}},mounted:function(){var e=this.$route.query.distributorId;e&&(this.first(),this.isAdd=!1)},computed:p({},Object(u["d"])({appData:"app",estateData:"estate"}),{disableSubmit:function(){return!Boolean(this.form.code&&this.form.name&&this.estateData.positionStatus)}}),watch:{"appData.codeList":{handler:function(e,t){this.setCode(e),this.searchMap()}},"estateData.position":{handler:function(e,t){!Object(l["i"])(e)&&e.location&&(this.form.lng=e.location.lng,this.form.lat=e.location.lat,this.form.address="".concat(e.address))}},"estateData.map":{handler:function(e,t){this.setMapPosition()}}},methods:p({},Object(u["c"])({setCodeList:"SET_CODE_LIST",setAreaName:"SET_AREA_NAME"}),{init:function(e,t){var a=this;this.visible=!0,this.$nextTick((function(){t?a.$refs.baiduMap.initMap({longitude:a.detailInfo.longitude,latitude:a.detailInfo.latitude,estateName:a.detailInfo.address}):a.$refs.baiduMap.initMap()}))},first:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=this,a=t.$route.query.id,n=t.detailInfo,a&&(t.form.name=n.address,t.form.lat=n.latitude,t.form.lng=n.longitude,t.setAreaName(n.countyName||n.cityName||n.provinceName));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),onSubmit:function(){var e=this;e.code=e.appData.codeList,e.$refs["form"].validate((function(t){if(t){var a={address:e.form.name,provinceCode:e.appData.codeList[0],cityCode:e.appData.codeList[1]?e.appData.codeList[1]:"",countyCode:e.appData.codeList[2]?e.appData.codeList[2]:"",longitude:e.form.lng,latitude:e.form.lat,areaName:e.appData.areaName,allArea:e.estateData.allArea+"-"+e.form.name};e.$emit("locationInfo",a),e.visible=!1}}))},searchMap:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.form.code&&this.form.name&&this.times){e.next=3;break}return this.times=1,e.abrupt("return");case 3:this.$refs.baiduMap.initMapFromName(this.form.name);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),setCode:function(e){this.form.code=e},setMapPosition:function(){var e=this,t=this.estateData.map,a=this.estateData.label;t.addEventListener("click",(function(n){t.clearOverlays();var r=new BMap.Point(n.point.lng,n.point.lat);e.form.lng=n.point.lng,e.form.lat=n.point.lat,t.centerAndZoom(new BMap.Point(n.point.lng,n.point.lat),17);var i=new BMap.Marker(r);t.addOverlay(i),i.setLabel(a)}))},areaSelectFocus:function(e){this.form.code=e}})},m=f,b=(a("f7ab"),a("2877")),h=Object(b["a"])(m,n,r,!1,null,"4aaec121",null);t["a"]=h.exports},f7ab:function(e,t,a){"use strict";var n=a("ced5"),r=a.n(n);r.a},f975:function(e,t,a){},fe2f:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return i}));var n=a("01ea");function r(){return new Promise((function(e,t){if("undefined"!==typeof BMap)return e(BMap),!0;window.onBMapCallback=function(){e(BMap)};var a=document.createElement("script");a.type="text/javascript",a.src="http://api.map.baidu.com/api?v=2.0&ak=".concat(n["a"].BAIDU_MAP_KEY,"&callback=onBMapCallback"),a.onerror=t,document.head.appendChild(a)}))}function i(e){var t=new BMap.Label(e,{offset:new BMap.Size(-30,-40)});return t.setStyle({color:"green",fontSize:"12px",paddingLeft:"15px",paddingRight:"15px",paddingTop:"8px",paddingBottom:"8px",lineHeight:"20px",borderColor:"",fontFamily:"微软雅黑"}),t}}}]);