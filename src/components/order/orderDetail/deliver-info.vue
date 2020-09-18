<!--
 * @Description: 订单详情交付信息组件
 * @Author: 陈桃
 * @Date: 2020-03-14 17:34:32
 * @LastEditTime: 2020-07-17 09:19:10
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="order-info-container">
        <div>
            <el-divider content-position="left">交付信息<i class="el-icon-thumb thumb"></i></el-divider>
            <div class="program-content">
                <div class="left">
                    <el-row>
                        <el-col :span="6">
                            <div class="info-item">
                                <span class="info-label">期望交付日期：</span><span>{{DWY_UTILS.getTimeYMD(orderDetailData.expectedDeliveryTime)}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="info-item">
                                <span class="info-label">交付周期：</span><span>{{orderDetailData.delivery}}天</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="info-item">
                                <span class="info-label">计划交付日期：</span><span>{{DWY_UTILS.getTimeYMD(orderDetailData.estimatedDeliveryTime)}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="info-item">
                                <span class="info-label">是否加急：</span><span>{{orderDetailData.urgentConfirm ? '是' : '否'}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({orderDetailData: state => state.order.orderDetailData})
    }
}
</script>
<style scoped lang='scss'>
@import '../../../assets/scss/order/order_detail/model';
</style>
