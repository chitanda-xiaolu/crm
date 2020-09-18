/*
 * @Description: socket工具类
 * @Author: Zale Ying
 * @Date: 2020-03-04 13:38:08
 * @LastEditTime: 2020-03-04 15:55:55
 * @LastEditors: Zale Ying
 */

import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'

Vue.use(new VueSocketIo({
    debug: true,
    connection: 'http://127.0.0.1:3000'
}))
