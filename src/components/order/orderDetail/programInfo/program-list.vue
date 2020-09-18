<!--
 * @Description: 定制生产单
 * @Author: Zale Ying
 * @Date: 2020-04-08 16:23:18
 * @LastEditTime: 2020-07-20 15:31:54
 * @LastEditors: Zale Ying
 -->
<template>
    <div style='width:100%; padding-bottom: 10px;'>
        <el-divider content-position="left">定制生产单<i class="el-icon-thumb thumb"></i></el-divider>
        <el-table class="table-box" :data="programList" border>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="kjlAuditName" label="审核名称" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.kjlAuditName ? scope.row.kjlAuditName : '未命名'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="productionOrderCode" label="生产单编号" width="90"></el-table-column>
            <el-table-column prop="kjlAuditCode" label="审核编号" width="130"></el-table-column>
            <el-table-column prop="kjlStatusName" label="审核进度" width="80"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="80"></el-table-column>
            <el-table-column prop="firstAuditUserName" label="初审人" width="80"></el-table-column>
            <el-table-column prop="finalAuditUserName" label="终审人" width="80"></el-table-column>
            <el-table-column prop="claimUserName" label="初审认领人" width="100"></el-table-column>
            <el-table-column prop="jsonFlag" label="获取生产数据" width="95">
                <template slot-scope="scope">
                    <span>{{scope.row.jsonFlag ? '是': '否'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新日期" width="90">
                <template slot-scope="scope">
                    <span>{{DWY_UTILS.getTimeYMD(scope.row.updateTime)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="retailPrice" label="销售金额" width="90">
                <template slot-scope="scope">
                    <span>{{renderMoney((scope.row.retailPrice || 0).toFixed(2))}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operateComment" width="150" label="记录信息">
                <template slot-scope="scope">
                    <el-popover placement="top-start" style="cursor:pointer;" width="150" :title="scope.row.operateComment" trigger="hover">
                        <span class="text-ellipsis-2" slot="reference">{{scope.row.operateComment}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column v-if="orderDetailData.orderType === 20" prop="resupplyOrderReasons" label="补单原因">
                <template slot-scope="scope">
                    <el-popover placement="top-start" :title="scope.row.resupplyOrderReasons" trigger="hover" width="150">
                        <span slot="reference">{{scope.row.resupplyOrderReasons}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="提审备注">
                <template slot-scope="scope">
                    <el-popover placement="top-start" :title="scope.row.comment" trigger="hover" width="150">
                        <span slot="reference">{{scope.row.comment}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="x" label="操作" >
                <template slot-scope="scope">
                    <el-button
                        class="reject_btn"
                        type="text"
                        size="small"
                        icon="el-icon-error"
                        v-if="scope.row.kjlStatus === 1004 && scope.row.status === 3021 && hasPermission(Permission.order.final_audit_reject.code)"
                        @click="productionRowOpt(scope.row, 'reject')">终审驳回</el-button>
                    <el-button
                        v-if="scope.row.kjlStatus === 1004 && scope.row.status === 3021 && hasPermission(Permission.order.final_audit_pass.code)"
                        class="pass_btn"
                        type="text"
                        size="small"
                        icon="el-icon-success"
                        @click="productionRowOpt(scope.row, 'pass')">终审通过</el-button>
                    <el-button
                        v-if="(scope.row.kjlStatus === 1001 || scope.row.kjlStatus === 1002) && (scope.row.status == 2021 || scope.row.status == 2001) && hasPermission(Permission.order.production_audit.code)"
                        type="text"
                        size="small"
                        icon="el-icon-s-check"
                        @click="productionRowOpt(scope.row, 'claim')">初审审核</el-button>
                    <el-button
                        v-if="scope.row.kjlStatus === 1004 && scope.row.status === 2021 && hasPermission(Permission.order.audit_back.code)"
                        type="text"
                        size="small"
                        icon="el-icon-refresh-left"
                        @click="productionRowOpt(scope.row, 'back')">初审退回</el-button>
                    <el-button
                        v-if="scope.row.kjlStatus === 1004 && !scope.row.jsonFlag && hasPermission(Permission.order.json_pull.code)"
                        type="text"
                        size="small"
                        icon="el-icon-refresh-left"
                        :disabled="scope.row.disabled"
                        @click="productionRowOpt(scope.row, 'json', scope.row.productionOrderId)">更新生产数据</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-stopwatch"
                        :disabled="scope.row.disabled"
                        v-show="scope.row.kjlStatus === 1004 && scope.row.unpack"
                        @click="productionRowOpt(scope.row, 'bom', scope.row.productionOrderId)">bom数据</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-refresh-left"
                        v-show="orderDetailData.status === 4001 && scope.row.jsonFlag"
                        @click="productionRowOpt(scope.row, 'refreshweek', scope.row.productionOrderId)">更新交付周期</el-button>
                    <el-button
                        v-if="(scope.row.status >= 2001 && scope.row.status <= 4001) && hasPermission(Permission.order.audit_kjlStatus_refresh.code)"
                        type="text"
                        size="small"
                        icon="el-icon-refresh-left"
                        :disabled="scope.row.disabled"
                        @click="productionRowOpt(scope.row, 'refreshprogress', scope.row.productionOrderId)">刷新审核进度</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-c-scale-to-original"
                        v-if="orderDetailData.status !== 1001 && orderDetailData.orderType === 20"
                        @click="handleCauseExplanation(scope.row)">原因说明</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-finished"
                        v-if="orderDetailData.orderType === 20"
                        @click="showResupplyDialog(scope.row)">补单判责</el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-download"
                        v-show="scope.row.kjlJsonPath && scope.row.jsonFlag"
                        ><a :href="scope.row.kjlJsonPath" style="color:#3190e8">下载json</a></el-button>
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-news"
                        v-show="orderDetailData.status >= 2021"
                        @click="handleCalaimDetail(scope.row)"
                        >初审详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <bom ref="bomDom" />
        <sup-resp-dialog ref="supDialog" />
        <cause-explanation ref="causeDom" />
        <finishDialog ref="finishDialog" :rejectorpassQuery="rejectorpassQuery" :rejectReasonList="rejectReasonList" />
        <cause-explanation ref="causeDom" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import bom from '@/components/order/orderDetail/bom.vue'
import finishDialog from '@/components/order/orderDetail/programInfo/finish-dialog'
import { enumType } from '@/api/app'
import supRespDialog from '@/components/order/supply/supply-responsibility-dialog'
import causeExplanation from '@/components/order/supply/cause-explanation.vue'          // 原因说明
import { iframeUrl, finalPass, claimBack, pullJson, refreshKjlStatus, claimDetail, updatedelivery } from '@/api/order'
export default {
    components: { bom, finishDialog, supRespDialog, causeExplanation },
    data() {
        return {
            rejectReasonList: [],   // 驳回原因列表
            rejectorpassQuery: {
                productionOrderId: '',
                orderId: ''
            }
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData,
            programList: state => state.order.programList
        })
    },
    watch: {
        'orderDetailData.stage': {
            handler: function (val, oldval) {
                this.getProgramList()
            }
        },
        'orderDetailData.orderId': {
            handler: function (val, oldval) {
                this.getProgramList()
            }
        }
    },
    mounted() {
        this.getProgramList()
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData', getProgramList: 'getProgramList' }),
        // 生产定制单相关操作
        productionRowOpt(row, type, id) {
            switch(type) {
            case 'reject':
                this.$refs.finishDialog.rejectVisible = true
                this.handleReject(row)
                break
            case 'pass':
                this.handlePass(row)
                break
            case 'claim':
                this.claim(row)
                break
            case 'back':
                this.getClaimBack(row)
                break
            case 'json':
                this.getJson(row, id)
                break
            case 'refreshprogress':
                this.handleRefreshKjlStatus(row)
                break
            case 'bom':
                this.bomData(row)
                break
            case 'refreshweek':
                this.updateDeliveryData(row)
                break
            default:
            }
        },
        // 更新交付周期
        updateDeliveryData(data) {
            let productionOrderId = data.productionOrderId
            updatedelivery({productionOrderId}).then(result => {
                if(result.code === 200 && result.success) {
                    this.$message.success('操作成功')
                    this.getProgramList()
                }
            })
        },
        // 查看bom数据
        bomData(data) {
            this.$refs.bomDom.openDialog(data)
        },
        // 刷新审核进度
        handleRefreshKjlStatus(data) {
            let productionOrderId = data.productionOrderId
            refreshKjlStatus({productionOrderId}).then(result => {
                if(result.code === 200 && result.success) {
                    data.disabled = true
                    this.$message.success('操作成功')
                    this.getProgramList()
                } else {
                    this.$message.error('操作失败')
                }
            })
        },
        // 更新生产数据
        getJson(data, id) {
            let productionOrderId = data.productionOrderId
            if(data.productionOrderId === id) {
                this.isDisabledJsonBtn = true
            }
            pullJson({ productionOrderId }).then(result => {
                if(result.code === 200 && result.success) {
                    data.disabled = true
                    this.$message.success('操作成功')
                    this.getProgramList()
                } else {
                    this.$message.error('操作失败')
                }
            })
        },
        // 初审退回
        getClaimBack(row) {
            this.$confirm('您确定驳回这个订单初审吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let productionOrderId = row.productionOrderId
                claimBack({ productionOrderId }).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getProgramList()
                        this.getOrderDetailData({orderId: this.$route.params.orderId})
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            }).catch(() => {
                console.log('取消初审退回操作')
            })
        },
        // 驳回原因列表
        handleReject(row) {
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
        handlePass(row) {
            this.rejectorpassQuery.productionOrderId = row.productionOrderId
            this.rejectorpassQuery.orderId = this.$route.params.orderId
            this.$confirm('此操订单将终审通过, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                finalPass({...this.rejectorpassQuery}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getProgramList()
                        this.getOrderDetailData({orderId: this.$route.params.orderId})
                    }
                })
            })
        },
        // 初审跳转kjl页面
        claim(data) {
            let pre = JSON.parse(sessionStorage.getItem('vuex')).user
            let userId = pre.userId
            let url = pre.kjlListenUrl
            let productionOrderId = data.productionOrderId
            iframeUrl({ productionOrderId }).then(result => {
                if(result.code === 200 && result.success) {
                    window.open(`${url}/index.html?iframeUrl=${result.data}&pageurl=${window.location.href}&productionOrderId=${data.productionOrderId}&userId=${userId}`)
                }
            })
        },
        // 原因说明弹窗
        handleCauseExplanation(data) {
            this.$refs.causeDom.productionOrderId = data.productionOrderId
            this.$refs.causeDom.causeVisible = true
        },
        // 补单判责弹窗显示
        showResupplyDialog(row) {
            this.$refs.supDialog.showResupplyDialog(row, 'program')
        },
        // 初审详情
        handleCalaimDetail(data) {
            let productionOrderId = data.productionOrderId
            claimDetail({ productionOrderId }).then(result => {
                if(result.code === 200 && result.success) {
                    window.open(result.data)
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    /deep/ .cell > .el-button {
        margin-left: 0px;
    }
</style>
