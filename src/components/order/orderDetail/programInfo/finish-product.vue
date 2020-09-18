<template>
    <div class="finish-container" v-if="finishList.length">
        <el-divider content-position="left">成品生产单<i class="el-icon-thumb thumb"></i></el-divider>
        <el-table :data="finishList" border>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="kjlAuditName" label="审核名称" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.kjlAuditName ? scope.row.kjlAuditName : '未命名'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="productionOrderCode" label="生产单编号" width="100"></el-table-column>
            <el-table-column prop="kjlStatusName" label="审核进度" width="100"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="100"></el-table-column>
            <el-table-column prop="operateComment" label="记录信息">
                <template slot-scope="scope">
                    <el-popover placement="top-start" :title="scope.row.operateComment" style="cursor:pointer;" width="150" trigger="hover" >
                        <span slot="reference">{{scope.row.operateComment}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="x" label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-error"
                        class="reject_btn"
                        v-if="scope.row.kjlStatus === 1004 && (scope.row.status == 3021) && hasPermission(Permission.order.final_audit_reject.code)"
                        @click="productionRowOpt(scope.row, 'reject')">终审驳回</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-success"
                        class="pass_btn"
                        v-show="scope.row.kjlStatus === 1004 && (scope.row.status == 3021) && hasPermission(Permission.order.final_audit_pass.code)"
                        @click="productionRowOpt(scope.row, 'pass')">终审通过</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-finished"
                        v-if="orderDetailData.orderType === 20"
                        @click="showResupplyDialog(scope.row)">补单判责</el-button>
                    <el-button
                        v-if="scope.row.status === 2021 && hasPermission(Permission.order.finished_audit.code)"
                        type="text"
                        size="small"
                        icon="el-icon-s-check"
                        class="pass_btn"
                        @click="productionRowOpt(scope.row, 'claimpass')">初审通过</el-button>
                    <el-button
                        v-if="scope.row.status === 2021 && hasPermission(Permission.order.finished_audit.code)"
                        type="text"
                        size="small"
                        icon="el-icon-refresh-left"
                        class="reject_btn"
                        @click="productionRowOpt(scope.row, 'claimreject')">初审驳回</el-button>
                    <el-button
                        v-if="orderDetailData.status !== 1001 && orderDetailData.orderType === 20"
                        type="text"
                        size="small"
                        icon="el-icon-c-scale-to-original"
                        @click="handleCauseExplanation(scope.row)">原因说明</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 驳回弹窗 -->
        <el-dialog
            title="终审驳回"
            :visible.sync="rejectVisible"
            :close-on-click-modal="false"
            :destroy-on-close="true"
            :append-to-body="true"
            :modal-append-to-body='false'
            width="30%">
            <el-checkbox-group v-model="rejectList" v-for="item in rejectReasonList" @change="selectReason" :key="item.id">
                <el-checkbox :label="item.id" :value="item.id">{{item.dictName}}</el-checkbox>
            </el-checkbox-group>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="原因说明"
                v-model="reason">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectVisible = false">取消</el-button>
                <el-button type="primary" @click="submitFinishReject()">确定</el-button>
            </span>
        </el-dialog>
        <sup-resp-dialog ref="supDialog" />
        <cause-explanation ref="causeDom" />
    </div>
</template>
<script>
import { programDetail, finalReject, finalPass, finishedAudit } from '@/api/order'
import { enumType } from '@/api/app'
import { mapState, mapActions } from 'vuex'
import supRespDialog from '@/components/order/supply/supply-responsibility-dialog'
import causeExplanation from '@/components/order/supply/cause-explanation.vue'          // 原因说明
export default {
    components: {causeExplanation, supRespDialog},
    data () {
        return {
            rejectList: [],
            rejectReasonList: [],
            programObj: {
                name: '',
                coverPic: '',
                realArea: '',
                specName: ''
            },
            rejectVisible: false,
            reason: '',
            rejectorpassQuery: {
                productionOrderId: '',
                orderId: ''
            }
        }
    },
    mounted() {
        this.getFinishList()
    },
    watch: {
        'orderDetailData.stage': {
            handler: function (val, oldval) {
                this.getFinishList()
            }
        },
        'orderDetailData.orderId': {
            handler: function (val, oldval) {
                this.getFinishList()
            }
        }
    },
    computed: {
        ...mapState({
            finishList: state => state.order.finishList,
            orderDetailData: state => state.order.orderDetailData
        })
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData', getFinishList: 'getFinishList' }),
        // 初审通过、驳回接口调用
        handleClaimPassOrReject(id, type) {
            let _self = this
            this.$confirm(type === 0 ? '此订单将被驳回, 是否继续?' : '此操作将通过该订单审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                finishedAudit({ productionOrderId: id, flag: type }).then(result => {
                    if(result.code === 200 && result.success) {
                        _self.$message.success('操作成功')
                        _self.getOrderDetailData({orderId: _self.orderDetailData.orderId})
                        this.getFinishList()
                    } else {
                        _self.$message.success('操作失败')
                    }
                })
            })
        },
        // 获取方案信息
        getProgramInfo() {
            if(this.$route.params.designId && this.$route.params.designId !== 'NODID') {
                programDetail({ designId: this.$route.params.designId }).then(result => {
                    if(result.code === 200 && result.success) {
                        this.designId = result.data.designId
                        this.programObj = {...result.data}
                    }
                })
            }
        },
        opendialog() {
            this.checkedAllProgramList()
        },
        checkedAllProgramList() {
            this.finishList.map(res => {
                this.$nextTick(function() {
                    this.$refs && this.$refs.table.toggleRowSelection(res, true)
                })
            })
        },
        // 生产定制单相关操作
        productionRowOpt(row, type, id) {
            switch(type) {
            case 'reject':
                this.handleFinishReject(row)
                break
            case 'pass':
                this.hangdleFinalPass(row)
                break
            case 'claimpass':
                this.claimPass(row)
                break
            case 'claimreject':
                this.claimReject(row)
                break
            default:
            }
        },
        selectReason(val) {
            this.rejectList = val
        },
        // 初审驳回 & 初审驳回
        claimReject(row) {
            let productionOrderId = row.productionOrderId
            this.handleClaimPassOrReject(productionOrderId, 0)
            this.getOrderDetailData({orderId: this.orderDetailData.orderId})
        },
        // 初审通过
        claimPass(data) {
            let productionOrderId = data.productionOrderId
            this.handleClaimPassOrReject(productionOrderId, 1)
            this.getOrderDetailData({orderId: this.orderDetailData.orderId})
        },
        // 提交驳回
        submitFinishReject() {
            if(!this.rejectList.length) {
                this.$message.warning('请勾选驳回原因')
            } else {
                this.rejectorpassQuery.operateReasonId = this.rejectList.join()
                this.rejectorpassQuery.remark = this.reason
                this.$confirm('此订单将被驳回, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    finalReject({...this.rejectorpassQuery}).then(result => {
                        if(result.code === 200 && result.success) {
                            this.$message.success('操作成功')
                            this.rejectVisible = false
                            this.rejectList.length = 0
                            this.reason = ''
                            this.getOrderDetailData({orderId: this.orderDetailData.orderId})
                        }
                    })
                })
            }
        },
        // 驳回原因列表
        handleFinishReject(row) {
            this.rejectorpassQuery.productionOrderId = row.productionOrderId
            this.rejectorpassQuery.orderId = this.$route.params.orderId
            this.rejectVisible = true
            enumType({dictTypeCode: 'final_audit_reject_reason'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.rejectReasonList = result.data
                }
            })
        },
        // 终审通过
        hangdleFinalPass(row) {
            this.rejectorpassQuery.productionOrderId = row.productionOrderId
            this.rejectorpassQuery.orderId = this.$route.params.orderId
            this.$confirm('此订单将通过终审审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                finalPass({...this.rejectorpassQuery}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getOrderDetailData({orderId: this.orderDetailData.orderId})
                        this.getFinishList()
                    }
                })
            })
        },
        handleCauseExplanation(data) {
            this.$refs.causeDom.productionOrderId = data.productionOrderId
            this.$refs.causeDom.causeVisible = true
        },
        // 成品单补单判责显示
        showResupplyDialog(row) {
            this.$refs.supDialog.showResupplyDialog(row, 'finish')
        }
    }
}
</script>
<style scoped lang='scss'>
    // 页面滚动，弹窗居中
    .el-dialog{
       display: flex;
       flex-direction: column;
       margin:0 !important;
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       max-height:calc(100% - 30px);
       max-width:calc(100% - 30px);
    }
    .el-dialog .el-dialog__body{
        flex:1;
        overflow: auto;
    }
    .iframe-box {
        width: 100%;
        height: 550px;
    }
    /deep/ .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 5px;
        .el-checkbox__label {
            font-weight: normal
        }
    }
</style>
