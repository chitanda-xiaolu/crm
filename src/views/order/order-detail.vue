<!--
 * @Description: 订单详情页面
 * @Author: Zale Ying
 * @Date: 2020-02-28 11:56:50
 * @LastEditTime: 2020-07-29 17:26:47
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-row">
        <vue-scroll :ops="scrollops">
            <div class="wrapper" ref="wrapper">
                <div class="wrapper-content">
                    <div class="order-detail-top">
                        <p class="order_code_position">
                            {{orderDetailData.customerName}}：{{orderDetailData.orderCode}}
                            <img class="order-icon" v-if="orderIconCategory" :src="orderIconCategory" width="22" height="22" />
                            <img class="order-icon" v-if="orderIconType" :src="orderIconType" width="22" height="22" />
                            <img class="order-icon" v-if="orderIconUrgent" :src="orderIconUrgent" width="22" height="22" />
                            <img class="order-icon" v-if="orderIconStandard" :src="orderIconStandard" width="22" height="22" />
                        </p>
                        <p class="order_code_position">计划交付(发货)日期： {{ orderDetailData.estimatedDeliveryTime ? DWY_UTILS.getTimeYMD(orderDetailData.estimatedDeliveryTime) : '暂无日期'}}</p>
                    </div>
                    <div id="part1">
                        <detail-steps />
                    </div>
                    <div id="part2" v-if="orderDetailData && orderDetailData.status > 1000">
                        <order-info />
                    </div>
                    <div v-if="orderDetailData && orderDetailData.orderWay === 20">
                        <cad-detail-list />
                    </div>
                    <div id="part3" v-if="orderDetailData && orderDetailData.status > 2000">
                        <program-info />
                    </div>
                    <div id="part4" >
                        <deliver-info />
                    </div>
                    <div id="part5" v-if="orderDetailData && orderDetailData.status > 2000">
                        <quotation />
                    </div>
                    <div id="part6">
                        <cost ref="cost" />
                    </div>
                    <div class="order-opt-btns" v-if="orderDetailData.status !== 9998">
                        <el-button type="info" icon="el-icon-circle-close" v-if="hasPermission(Permission.order.order_close.code)" @click="handleOrderClose">订单关闭</el-button>
                        <el-button type="danger" plain icon="el-icon-money" v-if="orderDetailData && (orderDetailData.status >= 2999 && orderDetailData.status < 4998) && hasPermission(Permission.price.order_price_invalid.code)" @click="handleChangePrice">调整报价</el-button>
                        <el-button type="danger" icon="el-icon-discount" v-if="(orderDetailData && !orderDetailData.urgent) && hasPermission(Permission.order.urgent_apply.code)" @click="handleDeliverUrgent">加急申请</el-button>
                        <el-button type="danger" icon="el-icon-circle-close" v-if="(orderDetailData && orderDetailData.urgent && !orderDetailData.urgentConfirm) && hasPermission(Permission.order.urgent_cancel.code)" @click="handleUrgentBack">加急驳回</el-button>
                        <el-button type="success" icon="el-icon-circle-check" v-if="(orderDetailData && orderDetailData.urgent && !orderDetailData.urgentConfirm) && hasPermission(Permission.order.urgent_confirm.code)" @click="handleUrgentPass">加急通过</el-button>
                        <el-button type="warning" icon="el-icon-edit-outline" v-if="orderDetailData && orderDetailData.status === 5201" @click="handleUpdateDelivery">更新计划交期</el-button>
                        <el-button type="primary" icon="el-icon-edit" v-show="(orderDetailData && !orderDetailData.deliveryPlan) && (orderDetailData && orderDetailData.status) >= 5201" @click="handleDeliverGoods">填写发货计划</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="handleLookLogs">查看日志</el-button>
                    </div>
                </div>
            </div>
        </vue-scroll>
        <deliver-goods
            ref="goodsDom"
            :sh_name="orderDetailData.consignee"
            :sh_mobile="orderDetailData.consigneeMobile"
            :sh_address="orderDetailData.consigneeAddress">
        </deliver-goods>
        <urgent-apply ref="urgentApply" />
        <urgent-confirm ref="urgentConfirm" :handleAddFee="handleAddFee" />
        <update-delivery ref="updateDelivery" :extimatedTime="orderDetailData.estimatedDeliveryTime" />
        <order-logs ref="orderLogsDom"></order-logs>
    </div>
</template>
<script>
import scrollConfig from '../../../config/scroll' // 滚动条配置项
import detailSteps from '@/components/order/orderDetail/detail-steps.vue'
import orderInfo from '@/components/order/orderDetail/order-info.vue'
import programInfo from '@/components/order/orderDetail/programInfo/index'
import deliverInfo from '@/components/order/orderDetail/deliver-info.vue'
import cadDetailList from '@/components/order/orderDetail/cad-detail-list.vue'
import cost from '@/components/order/orderDetail/cost.vue'
import quotation from '@/components/order/orderDetail/quotation.vue'
import { mapState, mapActions } from 'vuex'
import deliverGoods from '@/components/order/orderDetail/deliver-goods'
import updateDelivery from '@/components/order/orderDetail/update-delivery'
import urgentApply from '@/components/order/orderUrgent/urgent-apply'
import urgentConfirm from '@/components/order/orderUrgent/urgent-confirm'
import orderLogs from '@/components/order/orderDetail/order-logs'
import { orderColse } from '@/api/order'

import oOriginal from '@/assets/img/o-original.jpg'
import oSample from '@/assets/img/o-sample.jpg'
import oSupply from '@/assets/img/o-supply.jpg'
import oUrgent from '@/assets/img/o-urgent.jpg'
import oStandard from '@/assets/img/o-standard.jpg'
export default {
    name: 'orderDetail',
    components: {
        detailSteps, orderInfo, programInfo, deliverInfo, cost, quotation, deliverGoods, cadDetailList, urgentApply, urgentConfirm, updateDelivery, orderLogs
    },
    data() {
        return {
            scrollops: scrollConfig,
            orderId: this.$route.params.orderId,
            customerName: ''
        }
    },
    computed: {
        orderIconCategory() {
            let icon
            switch (this.orderDetailData.orderCategory) {
            case 10:
                icon = ''
                break
            case 20:
                icon = oSample
                break
            default:
                icon = ''
                break
            }
            return icon
        },
        orderIconType() {
            let icon
            switch (this.orderDetailData.orderType) {
            case 10:
                icon = oOriginal
                break
            case 20:
                icon = oSupply
                break
            default:
                icon = oOriginal
                break
            }
            return icon
        },
        orderIconUrgent() {
            return this.orderDetailData.urgentConfirm ? oUrgent : ''
        },
        orderIconStandard() {
            return this.orderDetailData.standard ? oStandard : ''
        },
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    watch: {
        '$route'(to, from) {
            if(this.orderId === this.$route.params.orderId) return
            this.orderId = this.$route.params.orderId
            this.getDetail()
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData' }),
        // 收货
        handleDeliverGoods() {
            this.$refs.goodsDom.visible = true
            this.$refs.goodsDom.orderId = this.orderDetailData.orderId
        },
        // 订单加急申请弹出框
        handleDeliverUrgent() {
            this.$refs.urgentApply.visible = true
        },
        getDetail() {
            this.getOrderDetailData({orderId: this.orderId})
        },
        // 更新计划交期弹出框
        handleUpdateDelivery() {
            this.$refs.updateDelivery.visible = true
        },
        // 查看日志
        handleLookLogs() {
            this.$refs.orderLogsDom.drawer = true
            this.$refs.orderLogsDom.orderId = this.orderId
        },
        handleOrderClose() {
            this.$confirm('您确定要关闭这个订单吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                orderColse({orderId: this.orderId}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getOrderDetailData({orderId: this.orderId})
                    } else {
                        this.$message.warning('操作失败')
                    }
                })
            })
        },
        handleChangePrice() {
            this.$router.push({path: `/order/price/alter/${this.$route.params.orderId}`})
        },
        // 加急订单通过
        handleUrgentPass() {
            this.$refs.urgentConfirm.visible = true
            this.$refs.urgentConfirm.isConfirm = true
        },
        // 加急订单驳回
        handleUrgentBack() {
            this.$refs.urgentConfirm.visible = true
            this.$refs.urgentConfirm.isConfirm = false
        },
        // 加急订单驳回
        handleAddFee() {
            this.$refs.cost.handleAddFee()
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../assets/scss/post_role/index';
    @import '../../assets/scss/order/order_detail/index';
</style>
