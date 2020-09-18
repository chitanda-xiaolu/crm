<!--
 * @Description: cad翻图下单编辑页面
 * @Author: Zale Ying
 * @Date: 2020-01-03 17:46:23
 * @LastEditTime: 2020-05-11 15:45:16
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <vue-scroll :ops="scrollops">
            <el-tabs v-model="stepsActive">
                <el-tab-pane label="关联方案提审" name="second">
                    <merge-scheme />
                </el-tab-pane>
                <el-tab-pane label="生产单" name="third">
                    <production-order ref="productionOrder" />
                </el-tab-pane>
            </el-tabs>
        </vue-scroll>
    </div>
</template>
<script>
import scrollConfig from '../../../config/scroll' // 滚动条配置项
import { mapState, mapActions } from 'vuex'
import mergeScheme from '@/components/order/orderEdit/merge-scheme.vue'
import productionOrder from '@/components/order/orderEdit/production-order.vue'
export default {
    name: 'editOrder',
    components: {
        mergeScheme,        // 关联方案
        productionOrder     // 生产单操作
    },
    data () {
        return {
            scrollops: scrollConfig,
            orderStatus: '',
            stepsActive: 'second'
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    watch: {
        '$route' (to, from) {
            this.init()
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({ getDetailData: 'getOrderDetailData' }),
        // 初始化
        init() {
            let _self = this
            this.getDetailData({orderId: this.$route.params.orderId}).then(() => {
                if (_self.$route.params.type) {
                    _self.stepsActive = 'third'
                } else {
                    _self.stepsActive = 'second'
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .wrapper {
        overflow: hidden;
        width: 96%;
        height: 100%;
        margin: 0 auto;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
        color: #606266 !important;
    }
    /deep/ .el-tabs {
        font-weight: normal;
        /deep/ .el-tabs__item {
            padding: 0 60px !important;
            text-align: center;
            font-weight: normal !important;
        }
        /deep/ .el-tabs__nav-wrap::after {
            height: 1px !important;
        }
    }
    .program-btn {
        margin: 50px;
        .el-button {
            margin: 12px;
        }
    }
    .btns {
        display: flex;
    }
</style>
