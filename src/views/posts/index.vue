<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left">
            <el-tabs class="tabs-container" v-model="activeLeft" @tab-click="changeLeftTabs">
                <el-tab-pane class="tabs-item" label="总部" name="dept">
                    <div class="page-list-left">
                            <div v-for="item in postsList" class="list-item is-hover-current" @click="changePostsNode(item.name, item.roleId)" :key="item.roleId" :class="{ active: item.name === clickItem }" >
                            <span class="list-item-left text-ellipsis" :class="{ greytxt: item.status === 1 }">{{ item.name }}</span>
                            <el-button class="list-item-right is-visibility" plain size="mini" type="warning" @click="addOrUpdateHandle(item.roleId)"><i class="el-icon-edit"></i>编辑</el-button>
                         </div>
                       </div>
                </el-tab-pane>
                <el-tab-pane class="tabs-item" label="经销商" name="distributor">
                    <div class="page-list-left">
                            <div v-for="item in postsList" class="list-item is-hover-current" @click="changePostsNode(item.name, item.roleId)" :class="{ active: item.name === clickItem }" :key="item.roleId">
                                <div class="list-item-left text-ellipsis" :class="{ greytxt: item.status === 1 }">{{ item.name }}</div>
                                <el-button class="list-item-right is-visibility"  plain size="mini" type="warning" @click="addOrUpdateHandle(item.roleId)"><i class="el-icon-edit"></i>编辑</el-button>
                            </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-button class="btn-add-public" plain @click="addOrUpdateHandle()" size="mini" type="primary"><i class="el-icon-plus"></i>新增</el-button>
            <el-switch
                v-model="isShow"
                class="switch-position"
                active-text="有效"
                @change="showAll"
                inactive-text="全部">
            </el-switch>
        </div>
        <span v-show="!showRightBox" class="unselect-role-or-posts">请先选择左边岗位查看权限</span>
        <div class="main-box-right" v-show="showRightBox">
            <div class="page-title">{{rightTopTip}}</div>
                <vue-scroll :ops="scrollops">
                    <el-tabs v-model="activeRight" @tab-click="changeRightTabs">
                        <el-tab-pane label="角色选择" name="menubtn">
                            <div class="menubtn">
                                    <el-form ref="form" :model="form" label-width="80px"  v-show="postsRoleList.length !== 0">
                                        <div class="role-list-box">
                                            <el-form-item v-for="ckbox in postsRoleList" :key="ckbox.name" >
                                            <el-checkbox-group v-model="postsRoleListSelected">
                                                <el-checkbox :label="ckbox.authorityId" :key="ckbox.authoarityId">{{ckbox.name}}</el-checkbox>
                                            </el-checkbox-group>
                                            </el-form-item>
                                        </div>
                                        <el-form-item>
                                            <el-button type="primary" class="submit-role-posts" @click="handleClickRolePostSubmit" @keyup.enter.native="handleClickRolePostSubmit">保存</el-button>
                                        </el-form-item>
                                    </el-form>
                                <span class="no-data-tip" v-show="postsRoleList.length == 0">暂无可选角色</span>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="权限显示" name="business">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-tree
                                        :data="postsAuthList"
                                        show-checkbox
                                        default-expand-all
                                        node-key="value"
                                        @check="checkAuth"
                                        :default-expanded-keys="['1']"
                                        :default-checked-keys="authTreeDefaultChecked">
                                    </el-tree>
                                </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </vue-scroll>
        </div>
         <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" @whichPlatform="whichPlatform" :roleId="roleId" :allStatus="allStatus" :platforms="platforms" :editdept="addOredit" ref="addOrUpdate" @refreshDataList="getDataList()"></add-or-update>
    </div>
</template>
<script>
import { setPostsRole } from '@/api/posts'
import AddOrUpdate from '@/components/posts/posts-add-or-update'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
import { mapActions } from 'vuex'
export default {
    components: { AddOrUpdate },
    data() {
        return {
            scrollops: scrollConfig,
            showRightBox: false, // 是否显示右边
            activeFirst: ['menu'],
            platforms: '', // 平台id
            tabsIndex: '0',
            whichPlat: '',
            roleId: '',
            auth_checked: '',
            clickItem: '',
            showEditBtn: true,
            isShow: true,
            allStatus: true,
            addOredit: '',
            activeLeft: 'dept',
            activeRight: 'menubtn',
            rightTopTip: '',
            showMenu: 'menu',
            addOrUpdateVisible: false,
            form: {
                type: []
            },
            postsRoleListSelected: [], // 角色默认选中
            authTreeDefaultChecked: [] // 权限默认选中
        }
    },
    computed: {
        postsRoleList () {
            return this.$store.state.posts.postsRoleList
        },
        postsList () {
            return this.$store.state.posts.postsList
        },
        postsAuthList () {
            return this.$store.state.posts.postsAuthList
        }
    },
    watch: {
        postsRoleList (newVal) {
            this.postsRoleListSelected = newVal.filter(item => item.own).map(item => item.authorityId)
        },
        postsAuthList (newVal) {
            let temp = []
            this.recursionAuthTreeSelect(newVal, temp)
            this.authTreeDefaultChecked = temp
        }
    },
    mounted() {
        this.getpostsList({ platform: 1, status: 0 })
    },
    methods: {
        ...mapActions({getpostsList: 'getpostsList', getPostsAuthList: 'getPostsAuthList', getPostsRoleList: 'getPostsRoleList'}),
        checkAuth(a, b) {                               // 当权限复选框被点击的时候触发
            this.auth_checked = b.checkedKeys.join()
        },
        changeLeftTabs(tab) {                          // 左边tab切换
            this.clickItem = ''
            this.showRightBox = false
            let tabs = tab.index
            this.tabsIndex = tabs
            this.platforms = tab.label
            this.isShow = true
            this.getpostsList({ platform: tabs === '0' ? 1 : 2, status: 0 })
        },
        changeRightTabs(tab, index) {                 // 角色选择 权限显示切换
            this.clickItem = ''
            let tabs = tab.index
            this.tabsIndex = tab.index
            if(!this.roleId) {
                this.$message.info('请先选择岗位')
            }else {
                if(tabs === '1') {                    // 权限
                    this.getPostsAuthList({ roleId: this.roleId, platform: this.tabsIndex === '0' ? 1 : 2 })
                }else {                               // 角色
                    this.getPostsRoleList({ roleId: this.roleId })
                }
            }
        },
        changePostsNode(item, id) {                     // 选择item
            this.roleId = id
            this.clickItem = item
            this.rightTopTip = item
            this.activeRight = 'menubtn'
            this.showRightBox = true
            this.getPostsRoleList({ roleId: id })
        },
        addOrUpdateHandle(id) {
            if(id) {
                this.addOredit = 'edit'
                this.roleId = id
            }else {
                this.addOredit = 'add'
            }
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(this.$refs.addOrUpdate, id)
            })
        },
        // 权限设置提交按钮逻辑
        handleClickRolePostSubmit() {
            let params = {
                roleId: this.roleId,
                ids: this.postsRoleListSelected.join()
            }
            if(!params.ids) {
                this.$message.info('请先勾选权限')
            }else {
                setPostsRole(params).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('设置权限成功')
                    }else {
                        this.$message.error(result.message || '设置权限失败')
                    }
                })
            }
        },
        // 权限树默认值提取
        recursionAuthTreeSelect (temp, arr) {
            for (let i = 0, len = temp.length; i < len; i++) {
                if (temp[i].children && temp[i].children instanceof Array) {
                    this.recursionAuthTreeSelect(temp[i].children, arr)
                } else {
                    if (temp[i].own) {
                        arr.push(temp[i].value)
                    }
                }
            }
        },
        showAll(e) { // 显示全部/有效
            this.allStatus = e
            this.getpostsList({ platform: this.tabsIndex === '0' ? 1 : 2, status: e ? 0 : '' })
        },
        whichPlatform(data) {
            this.whichPlat = data
            this.activeLeft = data === 1 ? 'dept' : 'distributor'
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../assets/scss/post_role/index';
    /deep/ .el-tree-node .is-focusable {
        margin: 7px;
    }
    /deep/ .el-checkbox {
        font-weight: normal;
    }
    /deep/ .el-tree-node {
        float:left;
    }
    /deep/ .el-checkbox {
        @include marginRight(6px)
    }
    /deep/ .el-tabs__nav-wrap::after {
        height: 1px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        width: 320px;
    }
    .role-list-box {
        display: flex;
        flex-wrap: wrap;
    }
</style>
