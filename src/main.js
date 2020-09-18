/*
 * @Description: main.js
 * @Author: Zale Ying
 * @Date: 2020-02-27 15:53:25
 * @LastEditTime: 2020-05-03 22:25:44
 * @LastEditors: Zale Ying
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/permission' // 路由鉴权
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import '@/assets/css/icon.css'
import '@/assets/css/iconfont/iconfont.css'
import 'babel-polyfill'
import store from '@/store'
import { getTimeYMD, toThousandsNum } from './utils/utils'
import _ from 'lodash'
import { hasPermission } from '@/utils/utils'
import Permission from '../config/permissions'
import moment from 'moment'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import vuescroll from 'vuescroll'
import './mock'
import http from './devapi/config'

Vue.prototype.moment = moment   // 赋值使用
moment.locale('zh-cn')          // 需要汉化
// 全局插入按钮权限方法
Vue.prototype._ = _
Vue.prototype.DWY_UTILS = {}
Vue.prototype.DWY_UTILS.getTimeYMD = getTimeYMD
Vue.prototype.renderMoney = toThousandsNum
Vue.prototype.Permission = Permission
Vue.prototype.hasPermission = hasPermission
Vue.prototype.$http = http

Vue.use(Viewer)
Vue.use(vuescroll)
Viewer.setDefaults({
    Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.config.productionTip = false
Vue.use(ElementUI, {
    'size': 'small'
})

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    components: {
        App
    },
    template: '<App/>'
})
