/*
 * @Description: 不加token的请求封装
 * @Author: Zale Ying
 * @Date: 2019-08-07 08:43:49
 * @LastEditTime: 2020-06-19 13:50:49
 * @LastEditors: Zale Ying
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'

const prodUrl = require('../../config/prod.env')

// 创建axios实例
let serviceToken = axios.create({
    'baseURL': prodUrl.BASE_PROXY, // api的base_proxy
    'timeout': 5000 // 请求超时时间
})

// request拦截器
serviceToken.interceptors.request.use(async config => {
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})

// respone拦截器
serviceToken.interceptors.response.use(
    response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
        const res = response.data
        if (res.code !== 200 || !res.success) {
            Message({
                'message': res.message,
                'type': 'error',
                'duration': 5 * 1000
            })
            // eslint-disable-next-line
            return
        }
        if(res.code === 700 && !res.success) {
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
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
        if(store.state.app.errorTimes > 1) return Promise.reject(error)
        Message({
            'message': '服务器异常,请联系管理员',
            'type': 'error',
            'duration': 5 * 1000
        })
        // eslint-disable-next-line
        return Promise.reject(error)
    }
)

export default serviceToken
