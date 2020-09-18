<template>
    <div class="notice-container">
        <el-divider content-position="left">{{$route.meta.title || '操作活动'}}<i class="el-icon-thumb thumb"></i></el-divider>
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="活动范围：" class="sort" prop="activityScope">
                        <el-radio-group v-model="dataForm.activityScope" @change="changeScope">
                            <el-radio label='0'>全国</el-radio>
                            <el-radio label='1'>指定经销商</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="经销商：" v-show="isShowDistrobutor" class="sort" prop="distributor">
                         <el-select
                            v-model="userList"
                            filterable
                            multiple
                            clearable
                            remote
                            reserve-keyword
                            style="width:47%"
                            placeholder="请选择">
                            <el-option
                                v-for="item in distributor.userList"
                                :key="item.id"
                                :label="item.name + ' 【' + item.areaName + '】'"
                                :disabled="item.status == 1"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="活动名称：" prop="activityName" >
                        <el-input v-model="dataForm.activityName" clearable style="width:50%" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="活动状态：" size="mini" prop="activityStatus">
                        <el-radio-group v-model="dataForm.activityStatus">
                            <el-radio label='0'>有效</el-radio>
                            <el-radio label='1'>无效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="引流日期：" prop="drainageTime">
                        <el-date-picker
                            v-model="dataForm.drainageTime"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="下单日期：" prop="ordersTime">
                        <el-date-picker
                            v-model="dataForm.ordersTime"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item>
                            <el-button type="primary" @click="dataFormSubmit('dataForm')" icon="el-icon-position">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { selectObj, killEmptyKey } from '@/utils/utils'
import { mapState, mapActions, mapMutations } from 'vuex'
import { createActive, activeDetail, editActive } from '@/api/activity'
import _ from 'lodash'
export default {
    data () {
        return {
            optType: '新增',
            managerList: [],
            isShowDistrobutor: false, // 是否显示经销商选择
            visible: true,
            dataForm: {
                activityName: '',
                activityScope: '0',
                drainageTime: '',
                ordersTime: '',
                activityStatus: '0',
                distributor: ''
            },
            userList: [],
            html: '',
            dataRule: {
                activityName: [
                    { required: true, message: '活动名称不能为空', trigger: 'change' }
                ],
                activityStatus: [
                    { required: true, message: '活动状态不能为空', trigger: 'change' }
                ],
                stactivityScopeatus: [
                    { required: true, message: '活动范围不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({deptUsrt: 'deptUser', distributor: 'distributor'})
    },
    mounted() {
        let _self = this
        let initData = _self.$route.params.id
        if (initData) {
            _self.getDetail(initData)
        } else {
        }
    },
    watch: {
        '$route'(to, from) {
            if(to.meta.title === '编辑活动') {
                this.getDetail()
            }
        }
    },
    methods: {
        ...mapActions({ getDistributorList: 'getDistributorList' }),
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        // 获取详情
        getDetail(id) {
            let _self = this
            activeDetail({id: id}).then(result => {
                const nodes = result
                const query = selectObj(nodes, ['activityName', 'activityScope', 'activityStatus', 'ordersTime'])
                if(query.activityScope === 1) {
                    _self.isShowDistrobutor = true
                }
                let foramtdrainageStart = _self.getTime(nodes.drainageStartTime).split('-')
                let foramtdrainageEnd = _self.getTime(nodes.drainageEndTime).split('-')
                let foramtordersStart = _self.getTime(nodes.ordersStartTime).split('-')
                let foramtordersEnd = _self.getTime(nodes.ordersEndTime).split('-')
                query.drainageTime = [new Date(foramtdrainageStart[0], foramtdrainageStart[1] - 1, foramtdrainageStart[2]), new Date(foramtdrainageEnd[0], foramtdrainageEnd[1] - 1, foramtdrainageEnd[2])]
                query.ordersTime = [new Date(foramtordersStart[0], foramtordersStart[1] - 1, foramtordersStart[2]), new Date(foramtordersEnd[0], foramtordersEnd[1] - 1, foramtordersEnd[2])]
                _self.userList =  result.distributorIds && result.distributorIds.split(',')
                query.activityScope = query.activityScope.toString()
                query.activityStatus = query.activityStatus.toString()
                _self.dataForm = { ...query }
            })
        },
        changeScope(e) { // 切换活动范围
            if(e === '1') {
                this.isShowDistrobutor = true
            }else {
                this.isShowDistrobutor = false
            }
        },
        getTime(time) {
            return time.slice(0, 10)
        },
        formatDate(date) {
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return y + '-' + m + '-' + d
        },
        dataFormSubmit() { //
            let initData = this.$route.params.id
            let _self = this
            let options = _.cloneDeep(killEmptyKey(_self.dataForm))
            const params = selectObj(options, ['activityName', 'activityScope', 'activityStatus'])
            options.drainageTime && options.drainageTime.forEach((item, index) => {
                if(typeof item === 'object' && !isNaN(item)) {
                    !index && (params.drainageStartTime = _self.formatDate(item))
                    index && (params.drainageEndTime = _self.formatDate(item))
                } else if(typeof item === 'string') {
                    !index && (params.drainageStartTime = item)
                    index && (params.drainageEndTime = item)
                }
            })
            options.ordersTime && options.ordersTime.forEach((item, index) => {
                if(typeof item === 'object' && !isNaN(item)) {
                    !index && (params.ordersStartTime = _self.formatDate(item))
                    index && (params.ordersEndTime = _self.formatDate(item))
                } else if(typeof item === 'string') {
                    !index && (params.ordersStartTime = item)
                    index && (params.ordersEndTime = item)
                }
            })
            params.distributorIds = _self.userList && _self.userList.join()
            params.activityType = '0'
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    if(initData) {
                        let query = params
                        query.id = initData
                        editActive(params).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success('编辑成功')
                                _self.closeCurrentPage(_self.$route.fullPath)
                                _self.$router.push('/marketActivity')
                            } else {
                                _self.$message.error('编辑失败')
                            }
                        })
                    } else {
                        createActive(params).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success('新增成功')
                                _self.closeCurrentPage(_self.$route.fullPath)
                                _self.$router.push('/marketActivity')
                            } else {
                                _self.$message.error('新增失败')
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .notice-container {
        padding: 10px 51px 0 51px;
    }
    .row {
        display: flex;
    }
    .sort /deep/ .el-form-item__content {
        width: 100%;
    }
    .search-btn {
        float: right;
    }
    .mavon-editors {
        height:500px;
        overflow:auto
    }
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
</style>
