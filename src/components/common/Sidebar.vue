<!--
 * @Description: 左侧菜单栏
 * @Author: Zale Ying
 * @Date: 2020-01-03 15:21:48
 * @LastEditTime: 2020-04-14 15:36:35
 * @LastEditors: 陈桃
 -->
<template>
    <div class="sidebar" ref="wrapper">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="navData.collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#ffd04b"
            unique-opened
            router>
            <template v-for="item in menuList">
                <template v-if="item.children">
                    <el-submenu :index="item.url === '/' ? item.nodeId : item.url" :key="item.url === '/' ? item.nodeId : item.url">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.label }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-menu-item-group v-if="subItem.children" :index="subItem.url" :key="subItem.url">
                                <template slot="title">{{ subItem.label }}</template>
                            </el-menu-item-group>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                                {{ subItem.label }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item index="/home" :key="item.url">
                        <i :class="item.icon"></i><span slot="title">{{ item.label }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            menuList: []
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path
        },
        ...mapState({ navData: 'nav' })
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        this.menuList = JSON.parse(sessionStorage.getItem('vuex')).user.menuList
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/sidebar/index.scss'
</style>
