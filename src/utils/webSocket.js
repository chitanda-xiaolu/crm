/*
 * @Description: webSocket方法封装
 * @Author: Zale Ying
 * @Date: 2020-03-04 15:40:15
 * @LastEditTime: 2020-06-22 15:23:04
 * @LastEditors: Zale Ying
 */
import store from '@/store'
import Notificaty from '@/utils/notificaty'

let websock = null

let socketUrl = window.sessionStorage.getItem('vuex') ? JSON.parse(window.sessionStorage.getItem('vuex')).user.websocketUrl : ''

export const initWebSocket = function(url) {
    if (websock && websock.readyState === 1) {
        websock.close()
    }

    // readyState 0 - 表示连接尚未建立，1 - 表示连接已建立，可以进行通信，2 - 表示连接正在进行关闭，3 - 表示连接已经关闭或者连接不能打开
    if (!websock || websock.readyState !== 1) {
        let reqUrl = url || socketUrl
        websock = new WebSocket(reqUrl)
        websock.onmessage = websocketonmessage
        websock.onopen = websocketonopen
        websock.onerror = websocketonerror
        websock.onclose = websocketclose
    }
}

const websocketonopen = () => { // 连接建立之后执行send方法发送数据
    console.log('连接成功')
    let actions = {'success': true, 'type': 'Login', 'msg': '连接成功'}
    websocketsend(JSON.stringify(actions))
}

export const websocketonerror = () => { // 连接建立失败重连
    initWebSocket()
}

const websocketonmessage = (e) => { // 数据接收
    let redata = JSON.parse(e.data)
    if (!redata.success) return
    switch (redata.type) {
    case 'Login':
        console.log('登录成功')
        break
    case 'Refresh_Order':
        store.dispatch('getOrderDetailData', {orderId: redata.value})
        console.log('订单审核状态更新')
        Notificaty(redata.message)
        break
    case 'Refresh_Production_Order':
        store.dispatch('getProgramList', {orderId: redata.value})
        console.log('生产单审核状态更新')
        Notificaty(redata.message)
        break
    }
}

const websocketsend = (Data) => { // 数据发送
    websock.send(Data)
}

const websocketclose = (e) => {  // 关闭
    console.log('断开连接', e)
    console.log('尝试重新连接')
    initWebSocket()
}
