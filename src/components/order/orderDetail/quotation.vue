<template>
    <div class="order-info-container" v-if="orderDetailData.status > 3000">
        <el-divider content-position="left">报价信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row>
            <el-col v-show="orderPriceData.retailPriceTotal" :span="6">
                <div class="info-item">
                    <span class="info-label">总金额(零售价)： </span>
                     <span class="price price_1" v-show="orderPriceData.retailPriceTotal"><i class="rmb">¥</i> {{renderMoney((orderPriceData.retailPriceTotal || 0).toFixed(2))}}</span>
                </div>
            </el-col>
            <el-col v-show="orderPriceData.nominalSettlementPriceTotal" :span="6">
                <div class="info-item">
                    <span class="info-label">理论结算价：</span>
                    <span class="price price_2" v-show="orderPriceData.nominalSettlementPriceTotal"><i class="rmb">¥</i> {{renderMoney((orderPriceData.nominalSettlementPriceTotal || 0).toFixed(2))}}</span>
                </div>
            </el-col>
            <el-col v-show="orderPriceData.finalSettlementPriceTotal" :span="6" >
                <div class="info-item">
                    <span class="info-label">实际结算价：</span>
                    <span class="price price_3" v-show="orderPriceData.finalSettlementPriceTotal"><i class="rmb">¥</i> {{renderMoney((orderPriceData.finalSettlementPriceTotal || 0).toFixed(2))}}</span>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="info-item">
                    <span class="info-label">结算系数(折扣)：</span>
                    <span class="price price_4">{{orderPriceData.discount}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row style="padding-bottom: 10px;">
            <el-col class="text-center" :span="6">
                <el-button v-if="orderDetailData.status > ORDER_STATUS.FIRST_TRIAL[2]['code']" type="primary" icon="el-icon-document" plain size="mini" @click="plateLink">板件报价明细</el-button>
            </el-col>
            <el-col class="text-center" v-if="(orderDetailData.status === ORDER_STATUS.PRICING[0]['code'] || orderDetailData.status === ORDER_STATUS.PRICING[1]['code']) && hasPermission(Permission.price.modify_reject.code)" :span="6">
                <el-button type="danger" icon="el-icon-refresh-left" plain size="mini" @click="backPricing">核价驳回</el-button>
                <el-button type="warning" icon="el-icon-edit" plain size="mini" @click="alterLink">订单改价</el-button>
            </el-col>
            <el-col class="text-center" v-if="orderDetailData.status === ORDER_STATUS.PRICING[3]['code']" :span="6">
                <el-button class="btn-link" icon="el-icon-thumb" size="mini" type="warning" @click="updateMes">手动更新MES</el-button>
            </el-col>
            <el-col class="text-center" v-if="orderDetailData.status >= ORDER_STATUS.FIRST_TRIAL[2]['code']" :span="6">
                <el-button class="btn-link" icon="el-icon-thumb" size="mini" type="success" @click="gotoMes">跳转MES</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { rejectPrcing, orderIshareInfo } from '@/api/order'
import { mapState, mapActions } from 'vuex'
import ORDER_STATUS from '../../../../config/orderStatus'
import { toPercent } from '@/utils/utils'
export default {
    data () {
        return {
            houseAddress: '',
            ORDER_STATUS,
            toPercent
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData,
            orderPriceData: state => state.order.orderPriceData
        })
    },
    watch: {
        'orderDetailData.orderId': {
            handler: function (val, oldval) {
                this.getOrderPrice()
            }
        }
    },
    mounted() {
        this.getOrderPrice()
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData', getOrderPrice: 'getOrderPrice' }),
        plateLink() {
            this.$router.push({path: `/order/price/plate/${this.$route.params.orderId}`})
        },
        backPricing() {
            this.$confirm('您确定驳回这个订单核价吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                rejectPrcing({orderId: this.$route.params.orderId}).then(result => {
                    if (result.code === 200 && result.success) {
                        this.$message.success('核价退回成功')
                        this.getOrderDetailData({orderId: this.$route.params.orderId})
                    }
                })
            }).catch(() => {
                console.log('取消核价驳回')
            })
        },
        alterLink() {
            this.$router.push({path: `/order/price/alter/${this.$route.params.orderId}`})
        },
        // 跳转mes系统
        gotoMes() {
            window.open('http://ishare.bulansha.com:3333/EBAP')
        },
        // 手动更新mes数据
        updateMes() {
            orderIshareInfo({orderId: this.$route.params.orderId}).then(result => {
                if (result.code === 200 && result.success) {
                    this.$message.success('手动提交Ishare订单数据成功')
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../../assets/scss/order/order_detail/model';
    .program-container {
        text-align: center;
        margin-left: 30px;
        .info-item {
            height: 50px;
            display: flex;
            .image-preview-box {
                width: 65px;
                height: 36px;
                margin-top: -7px;
            }
            .image-preview {
                cursor: pointer;
                width: 100%;
                height: 100%;
            }
            .info-label {
                font-size: 14px;
                display: inline-block;
                width: 130px;
                text-align: right;
                color: $disabledColor;
                margin-right: 5px;
            }
        }
        .rmb {
            font-style: normal;
            font-size: 12px;
        }
        .price {
            font-size: 17px;
        }
        .price_1 {
            color:#67c23a;
        }
        .price_2 {
            color:#66CCCC;
        }
        .price_3 {
            color:#66CC99;
        }
        .price_4 {
            color:#e6a23c;
        }
    }
</style>
