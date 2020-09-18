<!--
 * @Description: 【订单详情】>>【订单信息】
 * @Author: Zale Ying
 * @Date: 2020-04-29 14:40:44
 * @LastEditTime: 2020-07-29 17:40:42
 * @LastEditors: Zale Ying
-->
<template>
    <div class="order-info-container">
        <el-divider content-position="left">订单信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="info-item">
                    <span class="info-label">订单分类：</span><span>{{orderDetailData.orderCategoryName}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                    <div class="info-item">
                    <span class="info-label">订单类型：</span><span>{{orderDetailData.orderTypeName}}</span>
                </div>
            </el-col>
            <el-col :span="6" v-if="orderDetailData.orderType === 20">
                    <div class="info-item">
                    <span class="info-label">原订单号：</span>
                    <span @click="goOrginOrderDetail" class="orgin-oeder-code-link">{{orderDetailData.originalOrderCode}}</span>
                </div>
            </el-col>
            <el-col :span="6" v-if="orderDetailData.orderType === 20">
                <div class="info-item">
                    <span class="info-label">补单原因：</span><span>{{resupplyOrderReasons}}</span>
                </div>
            </el-col>
            <el-col :span="6" v-if="orderDetailData.orderType !== 20">
                <div class="info-item">
                    <el-button v-if="!orderDetailData.standard" size="mini" type="primary" plain icon="el-icon-s-tools" @click="handleMakeStandard">设为非标</el-button>
                    <el-button v-if="orderDetailData.standard" size="mini" type="warning" plain icon="el-icon-s-tools" @click="handleMakeStandard">取消非标</el-button>
                </div>
            </el-col>
        </el-row>
        <el-divider content-position="left">客户信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="info-item">
                    <span class="info-label">客户姓名：</span><span>{{orderDetailData.customerName}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                    <div class="info-item">
                    <span class="info-label">客户手机：</span><span>{{orderDetailData.customerMobile}}</span>
                </div>
            </el-col>
            <el-col :span="6" v-show="orderDetailData.orderCategory === 10">
                    <div class="info-item">
                    <span class="info-label">所在小区：</span><span>{{orderDetailData.housingEstateName}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                    <div class="info-item">
                    <span class="info-label">{{orderDetailData.orderCategory === 20 ? '收货地址：' : '房屋地址：'}}</span><span>{{orderDetailData.consigneeAddress}}</span>
                </div>
            </el-col>
        </el-row>
        <el-divider content-position="left">设计师<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                    <div class="info-item">
                    <span class="info-label">设计师：</span><span>{{orderDetailData.designerName}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                    <div class="info-item">
                    <span class="info-label">联系电话：</span><span>{{orderDetailData.designerMobile}}</span>
                </div>
            </el-col>
        </el-row>
        <el-divider content-position="left">下单方式<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row>
            <el-col :span="6">
                <div class="info-item">
                    <span class="info-label">下单方式：</span><span>{{orderDetailData.orderWayName}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { makeStandard } from '@/api/order'
export default {
    data () {
        return {
            orderInfos: {} // 订单信息
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        }),
        resupplyOrderReasons() {
            if(!this.orderDetailData.resupplyOrderReasons) return
            return this.orderDetailData.resupplyOrderReasons.substring(0, this.orderDetailData.resupplyOrderReasons.length - 1)
        }
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData' }),
        // 跳转订单详情页面
        goOrginOrderDetail() {
            this.$router.push({
                path: `/order/detail/${this.orderDetailData.originalOrderId}`
            })
        },
        handleMakeStandard() {
            let param = {
                orderId: this.$route.params.orderId,
                flag: !this.orderDetailData.standard
            }
            makeStandard(param).then(result => {
                this.$message.success('操作成功')
                this.getOrderDetailData({orderId: this.$route.params.orderId})
            })
        }
    }
}
</script>
<style scoped lang='scss'>
@import '../../../assets/scss/order/order_detail/model';
.orgin-oeder-code-link {
    color: #409eff;
    cursor: pointer;
}
</style>
