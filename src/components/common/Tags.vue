<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in navData.tagsList" :class="{'active': isActive(item.path)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState({ navData: 'nav' }),
        showTags() {
            return this.navData.tagsList.length > 0
        }
    },
    watch: {
        $route(newValue) {
            this.setTagsList(newValue)
        }
    },
    created() {
        this.setTagsList(this.$route)
    },
    methods: {
        ...mapMutations({ setTags: 'SET_TAGSLIST', closeCurrentPage: 'CLOSE_CURRENT_PAGE', setSingleReset: 'SET_SINGLE_RESET', setAllReset: 'SET_ALL_RESET' }),
        isActive(path) {
            return path === this.$route.fullPath
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.navData.tagsList[index]
            let _self = this
            _self.setSingleReset({key: delItem.name})
            _self.closeCurrentPage(delItem.path)
            let len = this.navData.tagsList.length
            if (len) {
                delItem.path === this.$route.fullPath && this.$router.push(this.navData.tagsList[len - 1].path)
            } else {
                this.$router.push('/')
            }
        },
        // 关闭全部标签
        closeAll() {
            this.setTags([{name: 'Home', path: '/home', title: '系统首页'}])
            this.setAllReset()
            this.$router.push('/')
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.navData.tagsList.filter(item => {
                return item.path === this.$route.fullPath
            })
            this.setTags(curItem)
        },
        // 设置标签
        setTagsList(route) {
            if (!this.navData.tagsList[0]) this.setTags()
            const isExist = this.navData.tagsList.some(item => {
                return item.path === route.fullPath
            })
            if (!isExist) {
                let tags = this.navData.tagsList
                if (this.navData.tagsList.length >= 8) {
                    this.setTags(tags.slice(1))
                }
                tags.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                })
                this.setTags(tags)
            }
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll()
        }
    }
}

</script>

<style>
    .tags {
        position: relative;
        height: 37px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        border-bottom: 1px solid #eee;
    }
    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    .tags-li {
        float: left;
        margin: 6px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 24px;
        line-height: 25px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }
    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }
    .tags-li.active {
        color: #fff;
        background: #3190e8;
    }
    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }
    .tags-li.active .tags-li-title {
        color: #fff;
    }
    .tags-close-box {
        position: absolute;
        right: 0;
        top: 6px;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        /* box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1); */
        z-index: 10;
    }
</style>
