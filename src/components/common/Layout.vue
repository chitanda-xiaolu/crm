<!--
 * @Description: 基础布局组件
 * @Author: 陈桃
 * @Date: 2019-08-07 08:43:49
 * @LastEditTime: 2020-04-23 14:05:12
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{ 'content-collapse': navData.collapse }">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import vHead from '@/components/common/Header.vue'
import vSidebar from '@/components/common/Sidebar.vue'
import vTags from '@/components/common/Tags.vue'
import Footer from '@/components/common/Footer.vue'
import { mapState, mapMutations } from 'vuex'
export default {
    components: {
        vHead, vSidebar, vTags, Footer
    },
    mounted() {
    },
    computed: {
        ...mapState({ navData: 'nav', appData: 'app' })
    },
    methods: {
        ...mapMutations({ setTags: 'SET_TAGSLIST' })
    }
}
</script>

<style scoped lang="scss">
.content-box {
    position: absolute;
    left: 220px;
    right: 0;
    top: 50px;
    bottom: 0;
    padding-bottom: 40px;
    transition: left .3s ease-in-out;
    &>.content {
        width: auto;
        overflow-x: auto;
        height: calc(100% - 37px);
        padding: 5px 0 0 0;
        overflow-y: hidden;
        box-sizing: border-box;
    }
}

.content-collapse {
    left: 71px;
}

.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.crumbs {
    margin: 10px 0;
}
</style>
