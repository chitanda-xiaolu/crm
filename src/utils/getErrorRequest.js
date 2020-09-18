import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
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

// request拦截器
/* eslint-disable */
service.interceptors.request.use(async config => {  // eslint-disable-line
    if (getToken() && isValid(validTime1) < 0 && isValid(validTime2) > 0) {
        await store.dispatch('RefreshToken')
    }
    if (store.getters.token) {
        config.headers['Authorization'] = `Bearer_headquarter ${getToken()}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
        const res = response.data
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
        console.log('err' + error)
        Message({
            'message': '服务器异常,请联系管理员',
            'type': 'error',
            'duration': 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
