<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left dept-tree">
            <div class="tree-container">
                <div class="tree-top">
                    <div class="tree-title">区域配置</div>
                    <span class="bl-xs-btn el-button--primary is-plain margin-left-20 smin-btn" @click=" createRegion"><i class="el-icon-plus"></i>新增</span>
                </div>
                <vue-scroll class="filter-tree" :ops="scrollops">
                    <el-tree
                        :data="fields.fieldsTree"
                        node-key="value"
                        @node-click="changeNode"
                        :default-expanded-keys="['1']"
                        :highlight-current='true'
                        :expand-on-click-node='false'
                        ref="tree">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span :class="{ grey: data.status == 1}">{{ node.label }}</span>
                            <span>{{ data.userName ? (data.userName) : '' }}</span>
                        </span>
                    </el-tree>
                </vue-scroll>
                <el-switch
                    v-model="isShow"
                    class="show-all"
                    active-text="有效"
                    @change="showAllandVaild"
                    inactive-text="全部">
                </el-switch>
                <!-- 弹窗, 新增 / 修改 -->
                <AddFields
                    v-if="addOrUpdateVisible"
                    ref="addOrUpdate"
                    :isShowStatus="isShow ? '0' : ''">
                </AddFields>
            </div>
        </div>
        <div class="main-box-right user-list">
            <!-- 详情 -->
            <div class="page-title">{{topTitle}}</div>
            <div class="content-box">
                <el-form
                    :label-position="labelPosition"
                    label-width="88px"
                    :model="dataForm"
                    @keyup.enter.native="getDataList('dataForm')"
                    ref="dataForm">
                    <p  v-show="levelId !== 1 && level !== 1">
                    <el-divider content-position="left">信息<i class="el-icon-thumb thumb"></i></el-divider></p>
                    <div v-show="levelId !== 1">
                        <el-row>
                            <el-col :span="8">
                            <el-form-item v-show=" levelId == 3"  label="上级区域：" prop="parentId" class="content-top-item">
                                <el-select
                                    v-model="dataForm.parentId"
                                    filterable
                                    clearable
                                    remote
                                    reserve-keyword
                                    @focus="getParentList"
                                    @change="changeParentList"
                                    placeholder="请选择"
                                    style="width:87%">
                                    <el-option
                                        v-for="item in parentList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.parentId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
                                <el-form-item v-show="level !== 1" label="名称：" prop="name" class="content-top-item" style="width: 87%;">
                                    <el-input v-model="dataForm.name" clearable placeholder="请输入"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="6">
                                <el-form-item v-show="level !== 1" label="区域状态：" prop="status" class="content-top-item">
                                    <el-radio v-model="dataForm.status" label='0'>有效</el-radio>
                                    <el-radio v-model="dataForm.status" label='1'>无效</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <el-divider content-position="left">对应经销商 {{distributorNum || 0  }} 家<i class="el-icon-thumb thumb"></i></el-divider>
                    <div class="distributor-list" v-show="levelId !== 3">
                        <template v-for="item in showList">
                            <span :key="item.distributorId" style="width: 351px;">{{item.name+ '【'+item.areaName+ '】'}}</span>
                        </template>
                        <div @click="showAll = !showAll" v-show="areaList.length > 3 && levelId !== 3" class="show-more">{{openOrclose}}</div>
                    </div>
                    <el-form-item v-show="levelId == 3"  prop="distributor" class="content-top-item">
                         <el-select
                            v-model="selectDistributors"
                            multiple
                            style="width:70%"
                            filterable
                            clearable
                            loading-text="搜索中..."
                            default-first-option
                            placeholder="请选择">
                            <el-option
                                v-for="item in distributor.userList"
                                :key="item.id"
                                :label="item.name + ' 【' + item.areaName + '】'"
                                :disabled="item.status === 1"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider content-position="left">配置负责人<i class="el-icon-thumb thumb"></i></el-divider>
                    <el-form-item  prop="mainId" class="content-top-item">
                        <el-select
                            v-model="dataForm.mainId"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            @change="changeManager"
                            placeholder="请输入选择"
                            style="width:25%">
                            <el-option
                                v-for="item in deptUsrt.managerList"
                                :key="item.userId"
                                :label="item.name + ' 【' + item.deptName + '】'"
                                :disabled="item.status == 1"
                                :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider content-position="left">配置查看人<i class="el-icon-thumb thumb"></i></el-divider>
                    <el-form-item  prop="selectusers" class="content-top-item">
                        <el-select
                            v-model="selectUsers"
                            multiple
                            style="width:100%"
                            filterable
                            clearable
                            loading-text="搜索中..."
                            default-first-option
                            placeholder="请输入选择">
                            <el-option
                                v-for="item in deptUsrt.nopageList"
                                :key="item.userId"
                                :label="item.name + ' 【' + item.deptName + '】'"
                                :disabled="item.status == 1"
                                :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer" style="margin-top:10px">
                <el-button type="primary" style="margin-left: 95px;" icon="el-icon-position" @click="saveSelectVal()">保存</el-button>
            </span>
        </div>
    </div>
</template>
<script>
import scrollConfig from '../../../config/scroll' // 滚动条配置项
import AddFields from './add-fields'
import { mapState, mapActions, mapMutations } from 'vuex'
import { editFields, parentRegion, Detail, judgeDealerExist } from '@/api/fields'
import SYSTEMVALUE from '@/utils/config'
import { mergeObject, filterFalsy, selectObj } from '@/utils/utils'
export default {
    components: {
        AddFields
    },
    data() {
        return {
            scrollops: scrollConfig,
            level: 1,
            selectDistributors: [],
            selectUsers: [], // 多选矿的用户
            showUser: false,
            showDistrio: false,
            isShow: true,
            addOrUpdateVisible: false, // 新增区域弹窗
            levelId: '', // 区域等级flag
            regionId: '', // 区域id
            labelPosition: 'right',
            parentList: [], // 上级区域列表
            showAll: false,
            distributorNum: 0,
            dataForm: { // 6
                name: '',
                status: '0',
                responsible: '',
                mainId: '',
                parentId: '',
                distributor: '',
                selectusers: []

            },
            topTitle: '',
            areaList: [] // 区域
        }
    },
    computed: {
        ...mapState({ deptUsrt: 'deptUser', fields: 'fields', distributor: 'distributor' }),
        showList() {
            if (this.showAll) return this.areaList
            var showList = []
            if(this.areaList.length > 3) {
                for(var i = 0; i < 3; i++) {
                    showList.push(this.areaList[i])
                }
            } else {
                showList = this.areaList
            }
            return showList
        },
        openOrclose() {
            if(!this.showAll) {
                return '展开全部'
            } else {
                return '收起'
            }
        },
        treeStatus() {
            if (!this.isShow) {
                return ''
            } else {
                return '0'
            }
        }
    },
    mounted() {
        this.getTree({status: this.treeStatus})
        this.getManager({platform: SYSTEMVALUE.COMPANY_PLATFORM})
        this.getParentList()
        this.lookDetail({regionId: 1})
        this.handleClickcSelectUser(1)
    },
    methods: {
        ...mapActions({
            getManager: 'getManager',
            getTree: 'getTree',
            getDetail: 'getDetail',
            setPagination: 'SET_PAGINATION',
            getData: 'getData',
            getDistributorList: 'getDistributorList',
            getNopageData: 'getNopageData'
        }),
        ...mapMutations({ setDialogStatus: 'SET_DIALOGSTATUS' }),
        getParentList() { // 上级区域
            parentRegion({regionId: this.regionId}).then(result => {
                let resData =  result && result.data
                resData.map(res => {
                    res.parentId = res.id
                })
                this.parentList = resData
            })
        },
        changeParentList(e) { // 修改上级区域
            this.dataForm.parentId = e
        },
        changeManager(e) { // 修改配置负责人
            this.dataForm.mainId = e
        },
        handleClickcSelectUser(id) { // 选择员工
            this.getNopageData({
                regionId: id
            })
        },
        // 选择经销商
        handleClickselectDistributor(id) {
            this.getDistributorList({
                size: 10000,
                regionId: id
            })
        },
        // 保存
        saveSelectVal() {
            const formParams = filterFalsy(this.dataForm)
            formParams.userIds = formParams.selectusers && formParams.selectusers.join()
            delete formParams.selectusers
            let options = {}
            options = mergeObject(formParams, {
                distributorIds: this.selectDistributors && this.selectDistributors.join(),
                id: this.regionId || '1',
                userIds: this.selectUsers.join()
            })
            let queryObj = {
                regionId: this.regionId,
                distributorIds: this.selectDistributors && this.selectDistributors.join()
            }
            let _self = this
            if(this.levelId === 3 && this.selectDistributors.length) {
                judgeDealerExist(queryObj).then(result => {
                    if(result.code === 200 && result.success) {
                        editFields(options).then(result => {
                            if (result.code === 200 && result.success) {
                                this.$message.success('编辑成功')
                                this.getTree({status: _self.treeStatus})
                            }
                        })
                    } else {
                        this.$confirm(result.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            editFields(options).then(result => {
                                if (result.code === 200 && result.success) {
                                    this.$message.success('编辑成功')
                                    this.getTree({status: _self.treeStatus})
                                }
                            })
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                })
            } else {
                editFields(options).then(result => {
                    if (result.code === 200 && result.success) {
                        this.$message.success('编辑成功')
                        this.getTree({status: this.treeStatus})
                    }
                })
            }
        },
        // 树的方法
        showAllandVaild(e) { // 显示全部/有效
            let param = {
                status: e ? 0 : ''
            }
            this.getTree(param)
            this.$emit('isShow', this.isShow ? '0' : '')
        },
        lookDetail(val) {
            Detail(val).then(result => {
                if(result.code === 200 && result.success) {
                    let newUser = []
                    let newdistro = []
                    const nodes = result.data
                    this.level = nodes.level
                    this.distributorNum = nodes.distributorNum
                    const query = selectObj(nodes, ['name', 'phone', 'mainId', 'parentId', 'allowLogin', 'status', 'deptId'])
                    query.status = query && query.status.toString()
                    query.parentId = query && query.parentId
                    this.areaList = nodes.listAreaName
                    this.selectDistributors = nodes.listAreaName
                    nodes.listUser && nodes.listUser.map(curr => {
                        newUser.push(curr.userId)
                    })
                    nodes.listAreaName && nodes.listAreaName.map(curr => {
                        newdistro.push(curr.distributorId)
                    })
                    this.selectUsers = newUser
                    this.selectDistributors = newdistro
                    this.topTitle = nodes.name
                    this.dataForm = { ...query }
                }
            })
        },
        changeNode(e) {
            this.lookDetail({regionId: e.value})
            e.level === 3 && this.handleClickcSelectUser(e.value)
            e.level === 3 && this.handleClickselectDistributor(e.value)
            this.levelId = e.level
            this.regionId = e.value
            this.topTitle = e.label
        },
        createRegion(id) { // 新增区域
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(this.$refs.addOrUpdate, id)
            })
        }
    }
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/post_role/index";
@import "../../assets/scss/common/tree";
    .page-title {
        height: 38px;
        border-bottom: 1px solid #eee;
        line-height: 38px;
        padding-left: 25px;
        color: #333;
        font-size: 20px;
    }
    .content-box {
        padding: 8px 8px;
        position: relative;
        .search-box {
            width: 100%;
            .content-top-item {
                width: 40%;
            }
            .content-top-item:nth-child(1) {
                @include marginRight(5px)
            }
        }
        /deep/ .box-card {
            margin: auto;
            height: 160px;
            overflow: auto;
            position: relative;
            .select-item {
                height: 34px;
                line-height: 34px;
                @include marginRight(15px)
            }
        }
        /deep/ .el-card__body {
            display: flex;
            flex-flow: wrap;
        }
        .select-btn {
            position: absolute;
            right: 35px;
            border: none;
            bottom: 10px;
        }
        .search-box-this {
            justify-content: space-between;
        }
    }
    .distributor-list {
        display: flex;
        flex-flow: wrap;
        margin: 10px 0;
        @include paddingLeft(85px);
        .show-more {
            cursor: pointer;
            color:$dividerColor;
            font-size: 12px;
            @include marginTop(9px)
        }
        span {
            @include marginRight(69px);
            display: inline-block;
            line-height: 32px;
        }
    }
    .grey {
        color: $invalidColor
    }
    .smin-btn {
        padding: 1px 5px !important;
    }
    .user-list {
        overflow: auto;
    }
</style>
