/* mock.js的全局配置文件 */
import Mock from 'mockjs'
import homeApi from './home'

// 设置200-2000ms延时
Mock.setup({
    timeout: '200-2000'
})

// 首页相关
// 拦截/home/getData
Mock.mock(/\/supplier\/statistics/, 'get', homeApi.getHomeData)
