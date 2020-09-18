/*
 * @Description: 请求axios封装
 * @Author: Zale Ying
 * @Date: 2020-02-26 17:15:42
 * @LastEditTime: 2020-06-19 13:48:05
 * @LastEditors: Zale Ying
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import router from '../router'
import { getToken, getTokenTime } from '@/utils/auth'

const prodUrl = require('../../config/prod.env')

const validTime1 = 30 * 60 * 1000 // token有效时间
const validTime2 = 40 * 60 * 1000 // refreshToken有效时间

function isValid(validTime) {
    return parseInt(getTokenTime()) + validTime - parseInt(new Date().getTime())
}

// 创建axios实例
const service = axios.create({
    'baseURL': prodUrl.BASE_PROXY, // api的base_proxy
    'timeout': 5000 // 请求超时时间
})

let tokenTime, refreshTime

// request拦截器
/* eslint-disable */
service.interceptors.request.use(async config => {  // eslint-disable-line
    tokenTime = isValid(validTime1)
    refreshTime = isValid(validTime2)
    if (getToken() && tokenTime < 0 && refreshTime > 0) {
        await store.dispatch('RefreshToken')
    } else if (getToken() && tokenTime < 0 && refreshTime < 0 && window.location.pathname === '/') {
        store.dispatch('FedLogOut')
        router.push({'path': '/login'})
    }
    if (store.getters.token) {
        config.headers['Authorization'] = `Bearer_headquarter ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.code === 200 && !res.success) {
            Message({
                'message': res.message,
                'type': 'error',
                'duration': 5 * 1000
            })
            return Promise.reject('error')
        }
        if (res.code === 500) {
            Message({
                'message': res.message || '服务器异常',
                'type': 'error',
                'duration': 5 * 1000
            })
            return Promise.reject('error')
        }
        if (res.code === 300 && !res.success && window.location.pathname === '/login') {
            return Promise.reject('error')
        }
        if(res.code === 700 && !res.success) {
            MessageBox.confirm('您已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                'confirmButtonText': '重新登录',
                'cancelButtonText': '取消',
                'type': 'warning'
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象 避免bug
                })
            })
        }
        return response.data
    },
    error => {
        store.commit('SET_ERROR_TIMES')
        if (store.state.app.errorTimes > 1) {
            return Promise.reject(error)
        } else if ((tokenTime<0 && refreshTime<0)) {   // 如果token失效直接退出不报错
            setTimeout(function(){
                window.location.href = '/login'
            }, 2000)
            Message({
                'message': '系统登录超时',
                'type': 'error',
                'duration': 5 * 1000
            })
            return Promise.reject(error)
        } else {
            Message({
                'message': '服务器异常,请联系管理员',
                'type': 'error',
                'duration': 5 * 1000
            })
            return Promise.reject(error)
        }
    }
)

export default service
