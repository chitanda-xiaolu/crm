<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left">
            <el-tabs class="tabs-container" v-model="activeLeft" @tab-click="changeLeftTabs">
                <el-tab-pane class="tabs-item" label="总部" name="dept">
                    <div class="page-list-left">
                        <template v-for="item in roles.roleList">
                            <div class="list-item is-hover-current"  @click="changeRolesNode(item.name, item.authorityId)" :class="{ active: item.name === clickItem }" :key="item.authorityId">
                                <div class="list-item-left text-ellipsis click-this-area" :class="{ greytxt: item.status === 1 }">{{ item.name }}</div>
                                <el-button class="list-item-right is-visibility" plain size="mini" type="warning" @click="addOrUpdateHandle(item.name, item.authorityId)" style="margin-top:3px"><i class="el-icon-edit"></i>编辑</el-button>
                            </div>
                        </template>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="经销商" name="distributor">
                     <div class="page-list-left">
                        <template v-for="item in roles.roleList">
                            <div class="list-item is-hover-current" :class="{ active: item.name === clickItem }"  @click="changeRolesNode(item.name, item.authorityId)" :key="item.authorityId">
                                <div class="list-item-left text-ellipsis click-this-area" :class="{ greytxt: item.status === 1 }">{{ item.name }}</div>
                                <el-button class="list-item-right is-visibility" plain size="mini" type="warning" @click="addOrUpdateHandle(item.name, item.authorityId)" style="margin-top:3px"><i class="el-icon-edit"></i>编辑</el-button>
                            </div>
                        </template>
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
        <span v-show="!showRightBox" class="unselect-role-or-posts">请先选择左边角色查看权限</span>
        <div class="main-box-right" v-show="showRightBox">
            <div class="page-title">{{rightTopTip}}</div>
            <div class="tree-container">
                <el-tabs v-model="activeRight" class="dis-flex-col">
                    <el-tab-pane label="按业务对象配置功能权限" disabled name="business">
                        <div class="business">
                            <el-collapse v-model="showBusiness" :accordion='true'>
                                <el-collapse-item title="按业务对象配置功能权限这一期暂时不做" name="busi"></el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="按菜单按钮配置功能权限" name="menubtn" style="height: 100%">
                        <vue-scroll :ops="scrollops" class="menubtn">
                            <el-form ref="form" :model="form" label-width="80px" v-if="roleAuthList.length">
                                <el-tree
                                    :data="roleAuthList"
                                    show-checkbox
                                    node-key="value"
                                    default-expand-all
                                    @check="checkAuth"
                                    :default-expanded-keys="['1']"
                                    :default-checked-keys="authTreeDefaultChecked">
                                </el-tree>
                                <el-button class="save-btn" type="primary" @click="handleRoleAuth">保存</el-button>
                            </el-form>
                            <span class="no-data-tip" v-if="roleAuthList.length <= 0">暂无可配置的权限</span>
                        </vue-scroll>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
         <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" @whichPlatform="whichPlatform" :allStatus="allStatus" :editdept="addOredit" :authorityId="authorityId" ref="addOrUpdate" @refreshDataList="getDataList()"></add-or-update>
    </div>
</template>
<script>
import { setRoleAuth } from '@/api/auth'
import AddOrUpdate from '@/components/roles/roles-add-or-update'
import { mapState, mapActions } from 'vuex'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    components: {
        AddOrUpdate
    },
    data() {
        return {
            scrollops: scrollConfig,
            showRightBox: false, // 是否显示右边
            authTreeDefaultChecked: [], // 默认选中的权限
            tabsIndex: '0',
            whichPlat: '',
            authorityList: [],
            authorityId: '',
            auth_checked: '', // 选择的权限
            clickItem: '',
            showEditBtn: true,
            isShow: true,
            allStatus: true,
            addOredit: '',
            activeLeft: 'dept',
            activeRight: 'menubtn',
            showBusiness: 'business',
            rightTopTip: '',
            showMenu: 'menu',
            addOrUpdateVisible: false,
            form: {
                type: []
            }
        }
    },
    mounted() {
        this.getRoleList({ platform: 1, status: 0 })
    },
    computed: {
        ...mapState({ roles: 'roles', auth: 'auth' }),
        roleAuthList () {
            return this.$store.state.auth.roleAuthList
        }
    },
    watch: {
        roleAuthList (newVal) {
            let temp = []
            this.recursionAuthTreeSelect(newVal, temp)
            this.authTreeDefaultChecked = temp
        }
    },
    methods: {
        ...mapActions({ getAuthData: 'getAuthData', getRoleList: 'getRoleList', getRoleAuthList: 'getRoleAuthList' }),
        checkAuth(a, b) { // 当权限复选框被点击的时候触发
            this.auth_checked = b.checkedKeys.join()
        },
        changeLeftTabs(tab) { // 总部、经销商切换
            this.tabsIndex = tab.index
            let tabs = tab.index
            this.isShow = true
            this.showRightBox = false
            this.getRoleList({ platform: tabs === '0' ? 1 : 2, status: 0 })
        },
        handleCheckedCitiesChange(e) {
            this.auth_checked = e.join()
        },
        changeRolesNode(item, id) {
            this.showRightBox = true
            this.authorityId = id
            this.clickItem = item
            this.rightTopTip = item
            this.getRoleAuthList({ authorityId: id, platform: this.tabsIndex === '0' ? 1 : 2 })
        },
        // add-or-edit
        addOrUpdateHandle(id, authorityId) {
            this.authorityId = authorityId
            if(id) {
                this.addOredit = 'edit'
            }else {
                this.addOredit = 'add'
            }
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(this.$refs.addOrUpdate, id)
            })
        },
        handleRoleAuth() { // 为角色分配权限
            let params = {authorityId: this.authorityId, ids: this.auth_checked}
            if(!this.auth_checked) {
                this.$message.info('请先勾选角色')
            }else {
                setRoleAuth(params).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('设置权限成功')
                    } else {
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
            let flag = e
            this.getRoleList({ platform: this.tabsIndex === '0' ? 1 : 2, status: flag ? 0 : '' })
        },
        whichPlatform(data) {
            this.whichPlat = data
            /* eslint-disable */
            this.activeLeft = data == 1 ? 'dept' : 'distributor'
            /* eslint-disable */
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../assets/scss/post_role/index';
    .public-posts {
        .left {
            /deep/ .el-tabs__nav {
                margin-left: 30px;
            }
        }
    }
    .tree-container {
        display: flex;
        flex: 1;
        height: calc(100% - 38px);
    }
    .save-btn {
        margin: 0 0 10px 24px;
    }
    /deep/ .el-tree-node__label {
        width: 141px !important;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    /deep/ .el-tree-node .is-focusable {
        float:left;
    }
    /deep/ .el-checkbox {
        @include marginRight(6px)
    }
    /deep/ .el-tree > div, .filter-tree > div {
        position: static
    }
</style>

