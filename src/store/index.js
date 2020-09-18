/*
 * @Description: vuex 入口文件
 * @Author: Zale Ying
 * @Date: 2019-12-20 08:53:52
 * @LastEditTime: 2020-06-23 15:02:40
 * @LastEditors: 陈桃
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import queryCondition from './modules/queryCondition'
import menu from './modules/menu'
import user from './modules/user'
import nav from './modules/nav'
import deptUser from './modules/deptUser'
import roles from './modules/roles'
import posts from './modules/posts'
import auth from './modules/auth'
import notice from './modules/notice'
import estate from './modules/estate'
import getters from './getters'
import fields from './modules/fields'
import distributor from './modules/distributor'
import help from './modules/help'
import activity from './modules/activity'
import account from './modules/account'
import order from './modules/order'
import createPersistedState from 'vuex-persistedstate'
import supplyOrder from './modules/supplyOrder'
import pconfig from './modules/pconfig'
import fconfig from './modules/fconfig'
import supplier from './modules/supplier'
import production from './modules/production'

Vue.use(Vuex)

const store = new Vuex.Store({
    'modules': {
        app,
        user,
        deptUser,
        roles,
        menu,
        posts,
        auth,
        notice,
        fields,
        estate,         // 小区管理
        nav,            // 导航路由
        distributor,    // 经销商
        help,           // 使用帮助
        activity,
        account,
        queryCondition,
        order,
        supplyOrder,
        pconfig,      // 产品分类配置
        fconfig,
        supplier,
        production
    },
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                user: {
                    name: val.user.name,
                    userId: val.user.userId,
                    menuList: val.user.menuList,
                    permissionList: val.user.permissionList,
                    kjlListenUrl: val.user.kjlListenUrl,
                    websocketUrl: val.user.websocketUrl
                },
                order: {
                    orderDetailData: val.order.orderDetailData
                },
                nav: {
                    tagsList: val.nav.tagsList
                }
            }
        }
    })]
})

export default store
