/*
 * @Description: Notificaty 插件
 * @Author: Zale Ying
 * @Date: 2020-04-30 11:37:33
 * @LastEditTime: 2020-06-22 15:53:54
 * @LastEditors: Zale Ying
 */
import BImg from '@/assets/img/k&j.jpg'

const Notificaty = function (txt) {
    if(window.Notification) {
        if(window.Notification.permission === 'granted') {
            var notification = new Notification('你有一条新信息', {
                body: txt,
                icon: BImg,
                silent: true,
                sound: '../assets/mp3/sound.mp3',
                requireInteraction: true
            })
            setTimeout(function() { notification.close() }, 6000)
        } else {
            window.Notification.requestPermission()
        }
    } else console.log('你的浏览器不支持此消息提示功能，请使用chrome内核的浏览器！')
}

export default Notificaty
