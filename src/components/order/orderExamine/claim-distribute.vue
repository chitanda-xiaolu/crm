<template>
    <el-dialog
        title="分配审核人"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        @open="openDialog"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="120px">
            <el-row :gutter="20">
                <el-col :span="22">
                    <el-form-item label="选择审核人：" prop="serviceUser">
                        <el-select
                            v-model="dataForm.serviceUser"
                            filterable
                            multiple
                            clearable
                            style="width:100%"
                            remote
                            reserve-keyword
                            placeholder="请选择">
                            <el-option
                                v-for="item in selectList"
                                :key="item.userId"
                                :label="item.name"
                                :disabled="item.status == 1"
                                :value="item.userId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { distribute, claimUsers, distributeFinal } from '@/api/order'
import { filterFalsy, queryParam, mergeObject } from '@/utils/utils'
export default {
    props: ['oIds'],
    data () {
        return {
            visible: false,
            selectList: [],
            stage: '',
            dataForm: {
                serviceUser: ''
            },
            dataRule: {}
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', order: 'order' })
    },
    methods: {
        ...mapActions({ getOrderList: 'getOrderList' }),
        init(stage) {
            this.stage = stage
            this.visible = true
            this.serviceUser = ''
            claimUsers({stage}).then(result => {
                if(result.code === 200 && result.success) {
                    this.selectList = result.data
                }
            })
        },
        openDialog() {
            this.dataForm.serviceUser = ''
        },
        // 表单提交
        dataFormSubmit() {
            let query = mergeObject(this.queryData.query.order.pagination, queryParam(this.queryData.query.order.dataForm))
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    let ids = []
                    const params = filterFalsy(_self.dataForm)
                    const param = {}
                    _self.oIds && _self.oIds.map(item => {
                        ids.push(item.orderId)
                    })
                    param.orderIds = ids.join()
                    param.claimUserIds = params.serviceUser && params.serviceUser.join()
                    param.stage = _self.stage
                    if(_self.stage === 1300) {
                        distribute(param).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success('分配成功')
                                _self.getOrderList(filterFalsy(query))
                                _self.selectList = []
                                _self.$refs['dataForm'].resetFields()
                                _self.visible = false
                            }
                        })
                    } else {
                        distributeFinal(param).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success('分配成功')
                                _self.getOrderList(filterFalsy(query))
                                _self.selectList = []
                                _self.$refs['dataForm'].resetFields()
                                _self.visible = false
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
    /deep/ .el-dialog__body {
        padding: 15px 20px;
    }
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
</style>
