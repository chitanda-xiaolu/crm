/*
 * @Description: 路由钩子
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-06-19 14:01:51
 * @LastEditors: Zale Ying
 */
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

NProgress.configure({ showSpinner: true })// 想禁用进度环？设置 showSpinner 为 false。

const whiteList = ['/login', '/404', '/attach'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        if(!store.getters.token) {
            next('/login')
            NProgress.done()
        } else if (store.getters.userId && store.getters.token && from.path !== '/login') {
            next()
        } else {
            store.dispatch('GetInfo').then(() => {
                next()
            }).catch(() => {
                store.dispatch('FedLogOut').then(() => {
                    window.location.href = '/login'
                })
            })
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
