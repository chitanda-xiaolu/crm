<template>
    <el-dialog
        title="提交补单初审"
        :visible.sync="submitVisible"
        @open="openDialog"
        :destroy-on-close="true"
        top="80px"
        :modal-append-to-body="false"
        width="75%">
        <div class="date">
            <span style="margin-right:5px"><span style="color:red">*</span>期望交付(发货)日期：</span>
            <el-date-picker
                v-model="date"
                value-format="yyyy-MM-dd"
                :picker-options="pickerEnd"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <el-divider v-if="programTablemodel.programList.length" content-position="left">定制生产单<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row v-if="programTablemodel.programList.length">
            <el-col :span="24">
                <el-form :rules="programTablemodel.rules" :model="programTablemodel" ref="form1">
                    <el-table
                        border
                        ref="table"
                        :data="programTablemodel.programList">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="kjlAuditName" label="审核名称" width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.kjlAuditName ? scope.row.kjlAuditName : '未命名'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="productionOrderCode" label="生产单编号" width="160"></el-table-column>
                        <el-table-column prop="kjlAuditCode" label="审核编号" width="150"></el-table-column>
                        <el-table-column prop="kjlStatusName" label="审核进度" width="80"></el-table-column>
                        <el-table-column prop="retailPrice" label="销售金额" width="100"></el-table-column>
                        <el-table-column label="关联原生产单" min-width="150">
                            <template slot-scope="scope">
                                <el-form-item :prop="'programList.' + scope.$index + '.originalProductionOrderId'" :rules='programTablemodel.rules.originalProductionOrderId'>
                                    <el-select
                                        v-model="scope.row.originalProductionOrderId"
                                        placeholder="请输入选择"
                                        clearable
                                        :disabled="rowDisabled(scope.row)"
                                        filterable
                                        @focus="getOriginOrderList(scope.$index,$event)">
                                        <el-option
                                            v-for="item in originOrderSelectList"
                                            :key="item.productionOrderId"
                                            :label="item.kjlAuditName"
                                            :value="item.productionOrderId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="补单原因" min-width="175">
                            <template slot-scope="scope">
                                <el-form-item :prop="'programList.' + scope.$index + '.reasonIds'" :rules='programTablemodel.rules.reasonIds'>
                                    <el-select
                                        v-model="scope.row.reasonIdList"
                                        placeholder="请输入选择"
                                        clearable
                                        filterable
                                        :disabled="rowDisabled(scope.row)"
                                        multiple>
                                        <el-option
                                            v-for="item in reasonList"
                                            :key="item.id"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-col>
        </el-row>
        <el-divider v-if="finishTablemodel.finishProductList.length" content-position="left">成品生产单<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row v-if="finishTablemodel.finishProductList.length">
            <el-col :span="24">
                <el-form :rules="finishTablemodel.rules" :model="finishTablemodel" ref="form2">
                    <el-table
                        border
                        ref="table2"
                        :data="finishTablemodel.finishProductList">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="kjlAuditName" label="审核名称" width="100"></el-table-column>
                        <el-table-column prop="productionOrderCode" label="生产单编号"  width="160"></el-table-column>
                        <el-table-column prop="kjlStatusName" label="审核进度" width="90"></el-table-column>
                        <el-table-column prop="statusName" label="状态" width="80"></el-table-column>
                        <el-table-column prop="retailPrice" label="销售金额" width="100"></el-table-column>
                        <el-table-column label="关联原生产单" min-width="175">
                            <template slot-scope="scope">
                                <el-form-item :prop="'finishProductList.' + scope.$index + '.originalProductionOrderId'" :rules='finishTablemodel.rules.originalProductionOrderId'>
                                    <el-select
                                        v-model="scope.row.originalProductionOrderId"
                                        placeholder="请输入选择" clearable filterable
                                        :disabled="rowDisabled(scope.row)"
                                        @focus="getOriginOrderList(scope.$index,$event)">
                                        <el-option
                                            v-for="item in originOrderSelectList"
                                            :key="item.productionOrderId"
                                            :label="item.kjlAuditName"
                                            :value="item.productionOrderId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="补单原因" min-width="175">
                            <template slot-scope="scope">
                                <el-form-item  :prop="'finishProductList.' + scope.$index + '.reasonIds'" :rules='finishTablemodel.rules.reasonIds'>
                                    <el-select
                                        v-model="scope.row.reasonIdList"
                                        :disabled="rowDisabled(scope.row)"
                                        placeholder="请输入选择"
                                        clearable
                                        filterable
                                        multiple>
                                        <el-option
                                            v-for="item in reasonList"
                                            :key="item.id"
                                            :label="item.dictName"
                                            :value="item.dictCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="handleSubmitAudit('form1','form2')">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {fuzzyList, productionAdd} from '@/api/order'
import { enumType } from '@/api/app'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            pickerEnd: {                            // 日期选择范围
                disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                }
            },
            orderId: this.$route.params.orderId,
            submitVisible: false,
            date: '',
            originOrderSelectList: [],
            reasonList: [],
            page: {
                size: 1000,
                current: 1,
                orderId: ''
            },
            programTablemodel: {
                rules: {
                    originalProductionOrderId: {required: true, message: '必填字段', trigger: 'change'},
                    reasonIdList: {required: true, message: '必填字段', trigger: 'blur'}
                },
                programList: []
            },
            finishTablemodel: {
                rules: {
                    originalProductionOrderId: {required: true, message: '必填字段', trigger: 'change'},
                    reasonIdList: {required: true, message: '必填字段', trigger: 'blur'}
                },
                finishProductList: []
            },
            bindDesignId: ''
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData,
            programList: state => state.order.programKjlList,
            finishList: state => state.order.finishKjlList
        })
    },
    mounted() {
        this.date = this.orderDetailData.expectedDeliveryTime
    },
    methods: {
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        ...mapActions({ getDetailData: 'getDetailData' }),
        // 订单
        getOriginOrderList(index, e) {
            let orderId = this.orderDetailData.originalOrderId
            fuzzyList({ orderId }).then(result => {
                if(result.code === 200 && result.success) {
                    this.originOrderSelectList = result.data
                }
            })
        },
        rowDisabled(row) {
            return row.kjlStatus === 1003 || row.kjlStatus === 1004 || row.kjlStatus === 1005
        },
        // 原因
        getReasons() {
            enumType({ dictTypeCode: 'order_resupply_reason' }).then(result => {
                if(result.code === 200 && result.success) {
                    this.reasonList = result.data
                }
            })
        },
        // 提交初审
        handleSubmitAudit(a, b) {
            if (!this.date) {
                this.$message.warning('请输入期望交付日期')
                return
            }
            let list = this.programTablemodel.programList.concat(this.finishTablemodel.finishProductList)
            let queryList = []
            let orderId = this.orderId
            list.map(item => {
                if(!item.auditName) {
                    item.auditName = '未命名'
                }
                queryList.push({
                    kjlAuditId: item.kjlAuditId,
                    kjlLevelId: item.kjlLevelId,
                    kjlAuditName: item.kjlAuditName,
                    kjlAuditCode: item.kjlAuditCode,
                    kjlStatus: item.kjlStatus,
                    productType: item.productType,
                    productionOrderId: item.productionOrderId,
                    originalProductionOrderId: item.originalProductionOrderId,
                    reasonIds: item.reasonIdList && item.reasonIdList.join(),
                    comment: item.comment
                })
            })
            let query = {
                orderId,
                expectedDeliveryTime: this.date,
                auditDesigns: JSON.stringify(queryList)
            }
            let isPost = true
            if (this.programTablemodel.programList.length) {
                this.$refs[a].validate((valid) => {
                    if(!valid) isPost = false
                })
            }
            if (this.finishTablemodel.finishProductList.length) {
                this.$refs[b].validate((valid) => {
                    if(!valid) isPost = false
                })
            }
            if(!isPost) return
            productionAdd(query).then(result => {
                if(result.code === 200 && result.success) {
                    this.$message.success('提交成功')
                    this.submitVisible = false
                    this.closeCurrentPage(this.$route.fullPath)
                    this.$router.push(`/order/detail/${this.orderId}`)
                }
            })
        },
        // 打开弹出框
        openDialog() {
            this.programTablemodel.programList = this.programList
            this.finishTablemodel.finishProductList = this.finishList
            this.getReasons()
        }
    }
}
</script>
<style lang="scss" scoped>
    /deep/ .el-dialog__body {
        height: 400px;
        overflow: auto;
    }
</style>
