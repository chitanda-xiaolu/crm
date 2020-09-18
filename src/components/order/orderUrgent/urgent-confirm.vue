<!--
 * @Description: 加急确认弹出框
 * @Author: Zale Ying
 * @Date: 2020-03-14 17:22:38
 * @LastEditTime: 2020-03-17 17:29:18
 * @LastEditors: Zale Ying
 -->
<template>
    <el-dialog :title="isConfirm ? '订单加急确认' : '订单加急驳回'" :visible.sync="visible" :destroy-on-close="true" @open="getUrgentOrderInfo()">
        <el-form ref="urgentForm" label-width="120px">
            <el-form-item label="加急交付周期：" prop="urgentCycle">
                <el-row>
                    <el-col :span="6">{{ orderDetailData.urgentCycle}} 天</el-col>
                    <el-col class="urgent-info" :span="6">
                        <urgent-order />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="估算发货日期：">
                <el-col :span="6">
                    <el-input type="text" :value="filtertime1(expectDate)" disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="是否收费：" prop="urgentCharge">
                <el-col>{{orderDetailData.urgentCharge ? '是' : '否'}}</el-col>
            </el-form-item>
            <el-form-item label="加急备注：">
                <el-col :span="18">
                    <el-input type="textarea" disabled v-model="orderDetailData.urgentRemark"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { filtertime1 } from '@/utils/validate'
import urgentOrder from '@/components/order/orderUrgent/urgent-store-info'
import { mapState, mapActions } from 'vuex'
import { urgentCancel, urgentPass } from '@/api/order'
export default {
    props: {
        handleAddFee: {
            type: Function,
            default: null
        }
    },
    components: {
        urgentOrder
    },
    data() {
        return {
            orderId: this.$route.params.orderId,
            visible: false,
            isConfirm: true,
            expectDate: new Date().getTime(),
            filtertime1
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    mounted() {
        this.calculateDate()
    },
    methods: {
        ...mapActions({ getUrgentOrderInfo: 'getUrgentOrderInfo', getOrderDetailData: 'getOrderDetailData' }),
        calculateDate() {
            if (!this.orderDetailData.urgentCycle) return
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * this.orderDetailData.urgentCycle)
            this.expectDate = date.getTime()
        },
        // 驳回
        backForm() {
            let _self = this
            this.$confirm('您确定驳回这个加急订单吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                urgentCancel({orderId: _self.orderId}).then(result => {
                    _self.getOrderDetailData({orderId: _self.orderId}).then(result => {
                        _self.visible = false
                        _self.$message({
                            type: 'success',
                            message: '驳回成功'
                        })
                    })
                })
            }).catch(() => {
                console.log('取消加急驳回')
            })
        },
        confirmForm() {
            let _self = this
            this.$confirm('您确定通过这个加急订单吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                urgentPass({orderId: _self.orderId, urgentCharge: true}).then(result => {
                    _self.getOrderDetailData({orderId: _self.orderId}).then(result => {
                        _self.handleAddFee()
                        _self.visible = false
                        _self.$parent.handleAddFee()
                        _self.$message({
                            type: 'success',
                            message: '通过成功'
                        })
                    })
                })
            }).catch(() => {
                console.log('取消加急通过')
            })
        },
        // 确定加急
        submitForm() {
            if(this.isConfirm) {
                this.confirmForm()
            } else {
                this.backForm()
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .urgent-info {
        position: relative;
        top: -1px;
        left: 20px;
    }
</style>
