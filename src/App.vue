<!--
 * @Description: App.vue 项目页面主入口
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-30 14:48:35
 * @LastEditors: Zale Ying
 -->
<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
import { initWebSocket } from '@/utils/webSocket'
import { mapState } from 'vuex'
export default {
    name: 'app',
    provide () {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    computed: {
        ...mapState({userData: 'user'})
    },
    watch: {
        // 注意方法监听不能使用箭头函数
        'userData.websocketUrl': {
            handler: function (val, oldval) {
                if (val) {
                    initWebSocket(val)
                } else {
                    initWebSocket()
                }
            }
        }
    },
    beforeCreate() {
        // 判断浏览器是否支持
        if (!window.WebSocket) {
            this.$message({
                message: '您的浏览器不支持websocket通信，建议更换谷歌浏览器',
                type: 'error'
            })
        }
    },
    mounted() {
        if (this.userData.websocketUrl) {
            initWebSocket(this.userData.websocketUrl)
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style>
    @import "./assets/css/reset.css";
</style>
