import axios from 'axios'
import { Message } from 'element-ui'

const prodUrl = require('../../config/prod.env')

// 创建axios实例
let service = axios.create({
    'baseURL': prodUrl.MAP_PROXY, // api的base_proxy
    'timeout': 5000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
    response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
        const res = response.data
        if (response.status !== 200) {
            Message({
                'message': res.message,
                'type': 'error',
                'duration': 5 * 1000
            })
            // eslint-disable-next-line
            return Promise.reject('error')
        }
        if (response.status === 200 && (!response.data.results.length || !response.data.results[0].location)) {
            Message({
                'message': '未找到该地址,请确认输入地点是否存在',
                'duration': 3 * 1000
            })
        }
        return response.data
    },
    error => {
        Message({
            'message': '服务器异常,请联系管理员',
            'type': 'error',
            'duration': 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
