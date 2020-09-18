<!--
 * @Description: 订单管理页面
 * @Author: Zale Ying
 * @Date: 2020-01-06 18:10:12
 * @LastEditTime: 2020-06-12 11:00:05
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn">
            <el-button
                v-if="hasPermission(Permission.order.hq_allot.code)"
                size="mini"
                icon="el-icon-user"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="handleDistribute">初审分配</el-button>
            <el-button
                v-if="hasPermission(Permission.order.hq_claim.code)"
                size="mini"
                icon='el-icon-circle-check'
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="handleClaim">初审认领</el-button>
             <el-button
                v-if="hasPermission(Permission.order.hq_allot_final.code)"
                size="mini"
                icon="el-icon-user-solid"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="handleFinishDistribute">终审分配</el-button>
            <el-button
                v-if="hasPermission(Permission.order.hq_claim_final.code)"
                size="mini"
                icon='el-icon-success'
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="handleLastClaim">终审认领</el-button>
            <el-button
                size="mini"
                icon="el-icon-printer"
                type="warning"
                plain
                style="margin-bottom:8px"
                @click="exportOrder()">导出</el-button>
        </div>
        <best-tables
            :data-list="order.orderList"
            :total="order.total"
            :showSelectBox="true"
            :optBtnList="this.optBtnList()"
            @selectRows="getSelectVal"
            @optThisRow="orderOpts" />
        <claim-distribute ref="claimdistributeUserDom" v-if="claimDistributeVisible" :oIds="oIds"/>
        <change-price-dialog ref="changePriceDialogDom"></change-price-dialog>
     </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import { areaCode } from '@/api/app'
import claimDistribute from '@/components/order/orderExamine/claim-distribute.vue'
import { mergeObject, filterFalsy, queryParam, exportFile } from '@/utils/utils'
import changePriceDialog from '@/components/order/price/change-price-dialog'
import { orderClaim, finalOrderClaim, rebackCadFile } from '@/api/order'
import { exportOrderList } from '@/api/export'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'order',
    components: {
        BestTables,
        FormModule,
        claimDistribute,
        changePriceDialog
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            dataForm: {
                activityName: '',
                activityStatus: '0'
            },
            specialClass: { className: 'invalid-row', id: 'activityStatusName', value: '无效' },
            dataList: [],
            total: 0,
            claimDistributeVisible: false, // 初审分配员工操作显示隐藏
            finishClaimDistributeVisible: false, // 终审分配显示隐藏
            oIds: ''                  // 勾选的订单列表
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', order: 'order' })
    },
    mounted() {
        this.getDataList()
        this.getProvinceData()
    },
    methods: {
        ...mapActions({ getOrderList: 'getOrderList' }),
        ...mapMutations({ setQueryToSingle: 'SET_QUERYTOSINGLE' }),
        // 行操作按钮
        optBtnList() {
            return BtnConfig.order.btns
        },
        getProvinceData() {
            areaCode().then(res => {
                this.setQueryToSingle({ key: this.key, name: 'areaCode', dataType: 'cascaderList', value: res.data })
            })
        },
        tableRowClassName({row}) { // 无效数据显示灰色
            let rowClass = row.activityStatus === 1 ? 'invalid-row' : ''
            return rowClass
        },
        // 设置参数
        setParam() {
            let query = queryParam(this.queryData.query[this.key].dataForm)
            if(query.areaCode && query.areaCode.length) {
                query.areaCode = query.areaCode[1]
            } else {
                delete query.areaCode
            }
            if(query.createTime && query.createTime.length) {
                query.startCreateTime = query.createTime[0]
                query.endCreateTime = query.createTime[1]
                query.createTime = ''
            } else {
                delete query.startCreateTime
                delete query.endCreateTime
            }
            if(query.deductTime && query.deductTime.length) {
                query.startDeductTime = query.deductTime[0]
                query.endDeductTime = query.deductTime[1]
                query.deductTime = ''
            } else {
                delete query.startDeductTime
                delete query.endDeductTime
            }
            if(query.time && query.time.length) {
                query.startExpectedDeliveryDate = query.time[0]
                query.endExpectedDeliveryDate = query.time[1]
                query.time = ''
            } else {
                delete query.startExpectedDeliveryDate
                delete query.endExpectedDeliveryDate
            }
            if(query.estimateTime && query.estimateTime.length) {
                query.startEstimatedDeliveryTime = query.estimateTime[0]
                query.endEstimatedDeliveryTime = query.estimateTime[1]
                query.estimateTime = ''
            } else {
                delete query.startEstimatedDeliveryTime
                delete query.endEstimatedDeliveryTime
            }
            return query
        },
        // 获取数据列表
        getDataList() {
            this.getOrderList(filterFalsy(mergeObject(this.queryData.query[this.key].pagination, this.setParam())))
        },
        // 初审/终审认领
        orderOpts(row, type) {
            switch(type) {
            case 'editCad':
                this.editCad(row)
                break
            case 'claim':
                this.claimOpt([{ orderId: row.orderId, status: row.status }])
                break
            case 'finishClaim':
                this.finishClaim([{ orderId: row.orderId, status: row.status }])
                break
            case 'changePrice':
                this.changePrice(row)
                break
            case 'rebackCad':
                this.rebackCad(row)
                break
            }
        },
        // 改价
        changePrice(data) {
            this.$refs.changePriceDialogDom.changePriceDialogVisible = true
            this.$refs.changePriceDialogDom.orderId = data.orderId
            this.$refs.changePriceDialogDom.form.orderId = data.orderId
        },
        // 编辑CAD
        editCad(data) {
            this.$router.push({
                path: `/order/editCad/${data.orderId}`
            })
        },
        // 翻图驳回
        rebackCad(data) {
            this.$confirm('您确定要驳回这个订单翻图吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rebackCadFile({orderId: data.orderId}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('翻图驳回成功')
                        this.getDataList()
                    }
                })
            })
        },
        // 初审
        claimOpt(oid) {
            let _self = this
            let ids = []
            oid && oid.map(item => {
                ids.push(item.orderId)
            })
            if(ids.length) {
                orderClaim({ orderIds: ids.join() }).then(result => {
                    if(result.code === 200 && result.success) {
                        _self.$message.success('认领成功')
                        _self.getDataList()
                    }
                })
            } else {
                _self.$message.warning('请先选择订单')
            }
        },
        // 终审
        finishClaim(oid) {
            let _self = this
            let ids = []
            oid && oid.map(item => {
                ids.push(item.orderId)
            })
            if(ids.length) {
                finalOrderClaim({ orderIds: ids.join() }).then(result => {
                    if(result.code === 200 && result.success) {
                        _self.$message.success('认领成功')
                        _self.getDataList()
                    }
                })
            } else {
                _self.$message.warning('请先选择订单')
            }
        },
        handleClaim() {
            this.claimOpt(this.oIds)
        },
        // 终审
        handleLastClaim() {
            this.finishClaim(this.oIds)
        },
        // 初审分配 按阶段
        handleDistribute(id) {
            if(!this.oIds) {
                this.$message.warning('请先选择要分配的订单')
            } else {
                this.oIds.map(item => {
                    if(item.stage !== 1300) { // 初审
                        this.$message.warning('请先选择初审阶段的订单')
                    } else {
                        this.claimDistributeVisible = true
                        this.$nextTick(() => {
                            this.$refs.claimdistributeUserDom.init(1300)
                        })
                    }
                })
            }
        },
        // 终审分配, 按阶段
        handleFinishDistribute() {
            if(!this.oIds) {
                this.$message.warning('请先选择要分配的订单')
            } else {
                this.oIds.map(item => {
                    if(item.stage !== 1500) { // 终审
                        this.$message.warning('请先选择终审阶段的订单')
                    } else {
                        this.claimDistributeVisible = true
                        this.$nextTick(() => {
                            this.$refs.claimdistributeUserDom.init(1500)
                        })
                    }
                })
            }
        },
        getSelectVal(val) {
            let orderIds = []
            if(val) {
                val.map(item => {
                    orderIds.push({orderId: item.orderId, status: item.status, stage: item.stage})
                })
            }
            this.oIds = orderIds
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        exportOrder() {
            exportOrderList(filterFalsy(this.setParam())).then(result => {
                exportFile(result, '订单列表')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped lang='scss'>
    a {
        color: $linkColor;
    }
    /deep/ .el-table .invalid-row {
        color: #b5b4b4;
    }
    /deep/ .el-table td, .el-table th {
        padding: 0;
    }
    /deep/ .el-table--small td, .el-table--small th {
        padding: 0;
    }
</style>
