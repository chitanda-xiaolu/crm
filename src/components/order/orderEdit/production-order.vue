<!--
 * @Description: cad总部下单生产单tab组件
 * @Author: Zale Ying
 * @Date: 2020-02-26 17:15:42
 * @LastEditTime: 2020-05-09 17:25:37
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-row">
        <div class="wrapper">
            <production-order-table />
            <finish-order-table />
            <el-dialog
                title="提交初审"
                :visible.sync="submitVisible"
                :append-to-body="true"
                @open="opendialog"
                :modal-append-to-body='false'
                width="50%">
                <div class="date">
                    <span style="margin-right:5px"><span style="color:red">*</span>期望交付(发货)日期</span>
                    <el-date-picker
                        v-model="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerEnd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <el-divider v-if="programList.length" content-position="left">定制生产单<i class="el-icon-thumb thumb"></i></el-divider>
                <el-row v-if="programList.length">
                    <el-col :span="24">
                        <el-table :data="programList" border ref="table1" height="240px">
                            <el-table-column type="index" label="序号" width="50"></el-table-column>
                            <el-table-column type="selection" label="" width="50" :selectable="() => false"></el-table-column>
                            <el-table-column prop="kjlAuditName" label="审核名称" width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.kjlAuditName ? scope.row.kjlAuditName : '未命名'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="productionOrderCode" label="生产单编号"></el-table-column>
                            <el-table-column prop="kjlAuditCode" label="审核编号"></el-table-column>
                            <el-table-column prop="kjlStatusName" label="审核进度" width="100"></el-table-column>
                            <el-table-column prop="statusName" label="状态" width="100"></el-table-column>
                            <el-table-column prop="comment" label="记录信息"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-divider v-if="finishProductList.length" content-position="left">成品生产单<i class="el-icon-thumb thumb"></i></el-divider>
                <el-row v-if="finishProductList.length">
                    <el-col :span="24">
                        <el-table :data="finishProductList" border ref="table2" height="240px">
                            <el-table-column type="index" label="序号" width="50"></el-table-column>
                            <el-table-column type="selection" label="" width="50"  :selectable="() => false"></el-table-column>
                            <el-table-column prop="kjlAuditName" label="审核名称" width="100"></el-table-column>
                            <el-table-column prop="productionOrderCode" label="生产单编号"  width="130"></el-table-column>
                            <el-table-column prop="productTypeName" label="类型" width="100"></el-table-column>
                            <el-table-column prop="statusName" label="状态"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleSubmitAudit">确定</el-button>
                </span>
            </el-dialog>
            <submit-supply-dialog ref="submitVisibleDom" />
            <el-button
                v-if="(orderDetailData.status < 2001) && (programList.length || finishProductList.length)"
                type="primary"
                size="small"
                icon="el-icon-s-promotion"
                class="submit-btn"
                :title="disabledSubmitBtn ? '暂无可提交的订单' : ''"
                :disabled="disabledSubmitBtn"
                @click="onlyDataFormSubmit">提交初审</el-button>
        </div>
    </div>
</template>
<script>
import productionOrderTable from '@/components/order/orderEdit/production-order-table.vue'
import finishOrderTable from '@/components/order/orderEdit/finish-order-table.vue'
import submitSupplyDialog from '@/components/order/supply/submit-dialog.vue'
import { mapState, mapActions } from 'vuex'
import { productionAdd } from '@/api/order'
export default {
    components: {
        productionOrderTable,
        finishOrderTable,
        submitSupplyDialog
    },
    data() {
        return {
            disabledSubmitBtn: false,
            submitVisible: false,
            date: '',
            orderId: this.$route.params.orderId,
            pickerEnd: { // 日期选择范围
                disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                }
            }
        }
    },
    computed: {
        ...mapState({
            finishProductList: state => state.order.finishKjlList,
            programList: state => state.order.programKjlList,
            orderDetailData: state => state.order.orderDetailData
        })
    },
    methods: {
        ...mapActions({ getDetailData: 'getOrderDetailData', getProgramKjlListData: 'getProgramKjlList', getFinishListData: 'getFinishKjlList' }),
        opendialog() {
            this.checkedAllProgramList()
        },
        checkedAllProgramList() {
            this.programList.map(res => {
                this.$nextTick(function() {
                    this.$refs && this.$refs.table1.toggleRowSelection(res, true)
                })
            })
            this.finishProductList.map(res => {
                this.$nextTick(function() {
                    this.$refs && this.$refs.table2.toggleRowSelection(res, true)
                })
            })
        },
        // 显示提交初审弹出
        onlyDataFormSubmit() {
            if(this.orderDetailData.orderType === 10) {
                this.submitVisible = true
            } else if(this.orderDetailData.orderType === 20) {
                this.$refs.submitVisibleDom.submitVisible = true
            }
        },
        // 提交初审
        handleSubmitAudit() {
            let list = this.programList.concat(this.finishProductList)
            let queryList = []
            list.map(item => {
                if(!item.auditName) {
                    item.auditName = '未命名'
                }
                queryList.push({ kjlAuditId: item.kjlAuditId, kjlLevelId: item.kjlLevelId, kjlAuditName: item.kjlAuditName, kjlAuditCode: item.kjlAuditCode, kjlStatus: item.kjlStatus, productType: item.productType, productionOrderId: item.productionOrderId, comment: item.comment })
            })
            let query = {
                orderId: this.orderId,
                designId: this.orderDetailData.designId,
                expectedDeliveryTime: this.date,
                auditDesigns: JSON.stringify(queryList)
            }
            if(list.length) {
                if(this.date) {
                    productionAdd(query).then(result => {
                        if(result.code === 200 && result.success) {
                            this.submitVisible = false
                            this.$message.success('提交成功')
                            this.getProgramKjlListData()
                            this.getFinishKjlList()
                            this.$router.push(`/order/detail/${this.orderId}`)
                        }
                    })
                } else {
                    this.$message.warning('请选择期望(发货)日期')
                }
            } else {
                this.$message.warning('暂无可提交的生产定制单')
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .submit-btn {
        margin-top: 5px;
    }
    /deep/ .el-dialog__body {
        padding: 18px 20px !important;
    }
    /deep/ .el-divider__text {
        color: #c57300;
    }
</style>
