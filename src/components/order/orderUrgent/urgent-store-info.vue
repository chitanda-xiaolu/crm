<!--
 * @Description: 经销商当月加急单查看组件
 * @Author: Zale Ying
 * @Date: 2020-03-11 11:17:10
 * @LastEditTime: 2020-03-17 17:37:32
 * @LastEditors: Zale Ying
 -->
<template>
    <el-popover
        placement="right"
        width="400"
        trigger="click">
        <h3>{{urgentInfo.areaName}}</h3>
        <br />
        <el-row>
            <el-col :span="20">上月结算业绩：{{ urgentInfo.finalSettlementPrice ? urgentInfo.finalSettlementPrice.toFixed(2) : 0.00}} 元</el-col>
        </el-row>
        <br />
        <div class="wrapper-popover">
            <el-timeline>
                <el-timeline-item
                    v-for="(item, index) in urgentInfo.urgentList"
                    :key="index"
                    :timestamp="DWY_UTILS.getTimeYMD(item.createTime)">
                    {{item.orderCode}} ({{item.urgentCharge ? '收费' : '未收费'}})
                </el-timeline-item>
            </el-timeline>
        </div>
        <el-button type="warning" plain icon="el-icon-document" slot="reference">查看上月加急订单</el-button>
    </el-popover>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            orderId: this.$route.params.orderId
        }
    },
    computed: {
        ...mapState({ urgentInfo: state => state.order.urgentInfo })
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
    .wrapper-popover {
        max-height: 250px;
        overflow-y: auto;
    }
</style>
