<!--
 * @Description: 订单改价页面
 * @Author: Zale Ying
 * @Date: 2020-01-08 16:06:06
 * @LastEditTime: 2020-05-08 17:02:31
 * @LastEditors: Zale Ying
 -->
<template>
    <el-dialog
        title="确认改价"
        :visible.sync="changePriceDialogVisible"
        :append-to-body="true"
        :modal-append-to-body='false'
        :close-on-click-modal="false"
        @open="getPriceDetail"
        width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="170px">
            <el-form-item label="计划交付(发货)日期：" prop="estimatedDeliveryTime">
                <el-row>
                    <el-col :span="10">
                         <el-date-picker
                            v-model="form.estimatedDeliveryTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions"
                            style="width: 100%">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="8">
                        <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            <div class="popover-box">
                                <el-divider content-position="center">产品费用</el-divider>
                                <p>
                                    理论结算价格：{{priceDetail.nominalSettlementPrice}} 元
                                </p>
                                <p>
                                    实际结算价格：{{priceDetail.finalSettlementPrice}} 元
                                </p>
                                <el-divider content-position="center" v-if="priceDetail.cadFee || priceDetail.urgentFee">其它费用</el-divider>
                                <p v-if="priceDetail.cadFee">
                                    翻图费：{{priceDetail.cadFee}} 元
                                </p>
                                <p v-if="priceDetail.urgentFee">
                                    加急费：{{priceDetail.urgentFee}} 元
                                </p>
                                <el-divider content-position="center">合计</el-divider>
                                <p>
                                    本次合计扣款：{{priceDetail.total}} 元
                                </p>
                                <el-divider content-position="center">经销商账户余额</el-divider>
                                <p>
                                    现金余额：{{priceDetail.cashTotal}} 元
                                </p>
                                <p>
                                    返利余额：{{priceDetail.rebateTotal}} 元
                                </p>
                            </div>
                            <el-button slot="reference" type="info" icon="el-icon-money" style="margin-left: 15px;">查看费用</el-button>
                        </el-popover>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="改价说明：" prop="modifyPriceRemark">
                <el-input type="textarea" v-model="form.modifyPriceRemark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitPrice">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { submitPriceRequest, orderIshareInfo, orderPriceDetail } from '@/api/order'
import { mapActions } from 'vuex'
export default {
    name: 'changePriceDialog',
    data() {
        return {
            changePriceDialogVisible: false,
            orderId: this.$route.params.orderId,
            form: {
                estimatedDeliveryTime: '',
                orderId: this.$route.params.orderId,
                modifyPriceRemark: ''
            },
            rules: {
                estimatedDeliveryTime: [
                    { required: true, message: '请输入交付日期', trigger: 'change' }
                ],
                modifyPriceRemark: [
                    { required: true, message: '请输入改价说明', trigger: 'blur' }
                ]
            },
            priceDetail: {
                cadFee: 0, // 翻图费
                finalSettlementPrice: 0, // 实际结算价格
                nominalSettlementPrice: 0,  // 理论结算价格
                total: 0,   // 合计
                urgentFee: 0, // 加急费用
                cashTotal: 0,   // 经销商现金余额
                rebateTotal: 0  // 经销商返利余额
            },
            lockTime: ''
        }
    },
    computed: {
        pickerOptions: function() {
            let _self = this
            return { // 日期选择条件
                disabledDate(time) {
                    return time.getTime() < ((new Date(_self.lockTime).getTime() - 24 * 3600000) || Date.now())
                }
            }
        }
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData' }),
        getPriceDetail() {
            orderPriceDetail({orderId: this.orderId}).then(result => {
                for (let x in this.priceDetail) {
                    this.priceDetail[x] = result.data[x]
                }
                this.form.estimatedDeliveryTime = this.lockTime = result.data.estimatedDeliveryTime
            })
        },
        submitPrice() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    submitPriceRequest(this.form).then(async result => {
                        if (result.code === 200 && result.success) {
                            this.$message.success('改价确认成功')
                            this.changePriceDialogVisible = false
                            await orderIshareInfo({orderId: this.orderId}).then(result => {
                                if (result.code === 200 && result.success) {
                                    this.$message.success('提交Ishare订单数据成功')
                                    this.$router.push(`/order/detail/${this.orderId}`)
                                }
                            })
                        } else {
                            this.changePriceDialogVisible = false
                        }
                    }).catch(() => {
                        this.getOrderDetailData({orderId: this.orderId})
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang='scss'>
    .popover-box > p {
        padding: 0 0 10px 25px;
    }
</style>
