<!--
 * @Description: 订单加急申请弹出框
 * @Author: Zale Ying
 * @Date: 2020-03-09 13:37:12
 * @LastEditTime: 2020-03-17 17:29:49
 * @LastEditors: Zale Ying
 -->
<template>
    <el-dialog title="订单加急申请" :visible.sync="visible" :destroy-on-close="true" @open="getUrgentOrderInfo()">
        <el-form ref="urgentForm" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="加急交付周期：" prop="urgentCycle">
                <el-row>
                    <el-col :span="6">
                        <el-select placeholder="请选择交付周期" v-model="form.urgentCycle" style="width: 100%" @change="calculateDate">
                            <el-option v-for="count in 15" :key="count" :label="count+6" :value="count+6"></el-option>
                        </el-select>
                    </el-col>
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
                <el-radio-group v-model="form.urgentCharge">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="加急备注：">
                <el-col :span="18">
                    <el-input type="textarea" v-model="form.urgentRemark"></el-input>
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
import { urgentApply } from '@/api/order'
import urgentOrder from '@/components/order/orderUrgent/urgent-store-info'
import { mapActions } from 'vuex'
export default {
    components: {
        urgentOrder
    },
    data() {
        return {
            visible: false,
            form: {
                orderId: this.$route.params.orderId,
                urgentCycle: '',
                urgentCharge: true,
                urgentRemark: ''
            },
            expectDate: new Date().getTime(),
            filtertime1: filtertime1,
            rules: {
                urgentCycle: [
                    { required: true, message: '请选择交付周期', trigger: 'change' }
                ],
                urgentCharge: [
                    { required: true, trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        ...mapActions({ getUrgentOrderInfo: 'getUrgentOrderInfo' }),
        calculateDate() {
            if (!this.form.urgentCycle) return
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * this.form.urgentCycle)
            this.expectDate = date.getTime()
        },
        submitForm() {
            let _self = this
            _self.$refs['urgentForm'].validate((valid) => {
                if (valid) {
                    urgentApply(this.form).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.$message.success('订单加急提交成功')
                            _self.visible = false
                            _self.$parent.getDetail()
                        }
                    })
                }
            })
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
