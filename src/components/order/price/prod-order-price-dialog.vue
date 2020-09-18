<!--
 * @Description: 生产单改价弹出框
 * @Author: Zale Ying
 * @Date: 2020-07-01 17:45:59
 * @LastEditTime: 2020-07-09 16:07:45
 * @LastEditors: Zale Ying
-->
<template>
    <el-dialog
        title="生产单改价"
        :visible.sync="prodPriceDialogVisible"
        :append-to-body="true"
        :modal-append-to-body='false'
        @open="handleOpenDialog"
        :destroy-on-close='true'
        width="30%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="改价系数：" prop="discount">
                <el-input
                    placeholder="请输入改价系数"
                    placement="top"
                    v-model="form.discount"
                    type="number"
                    @input="computePrice(form.discount)"></el-input>
            </el-form-item>
            <el-form-item label="结算价：">
                <span>{{renderMoney(form.price.toFixed(2))}} 元</span>
            </el-form-item>
            <el-form-item label="改价说明：" prop="remark">
                <el-input
                    placeholder="请输入生产单改价说明"
                    placement="top"
                    v-model="form.remark"
                    type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitPrice">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { updateProductionPrice } from '@/api/order'
export default {
    props: ['prodData'],
    name: 'prodChangePriceDialog',
    data() {
        return {
            prodPriceDialogVisible: false,
            orderId: this.$route.params.orderId,
            rules: {
                discount: [
                    { required: true, message: '折扣系数不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '改价说明不能为空', trigger: 'blur' }
                ]
            },
            form: {
                discount: 1,
                remark: '',
                price: 0
            }
        }
    },
    methods: {
        // 确认修改
        submitPrice() {
            this.$refs['form'].validate((valid) => {
                if (!valid) return
                let productJson = [{
                    productionOrderId: this.prodData.productionOrderId,
                    discount: this.form.discount,
                    modifyPriceRemark: this.form.remark,
                    finalSettlementPrice: (this.form.price * this.form.discount).toFixed(2)
                }]
                let param = {
                    productionModifyPrices: JSON.stringify(productJson),
                    orderId: this.$route.params.orderId
                }
                updateProductionPrice(param).then(result => {
                    this.$message.success('修改成功')
                    this.prodPriceDialogVisible = false
                    this.$emit('getDataList')
                })
            })
        },
        // 计算实际结算价
        computePrice(discount) {
            this.form.discount = parseFloat(discount)
            if(isNaN(this.form.discount)) {
                this.form.price = 0
            } else {
                this.form.price = parseFloat(discount) * this.prodData.nominalSettlementPrice
            }
        },
        // 打开dialog回调函数
        handleOpenDialog() {
            this.form.discount = this.prodData.discount
            this.form.price = this.prodData.finalSettlementPrice
            this.form.remark = this.prodData.modifyPriceRemark
        }
    }
}
</script>
