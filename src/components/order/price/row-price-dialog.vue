<!--
 * @Description: 订单行改价弹出框
 * @Author: Zale Ying
 * @Date: 2020-01-06 13:50:56
 * @LastEditTime: 2020-05-08 17:06:02
 * @LastEditors: Zale Ying
 -->
<template>
    <el-dialog
        title="行改价"
        :visible.sync="rowPriceDialogVisible"
        :append-to-body="true"
        :modal-append-to-body='false'
        width="30%">
        <el-form ref="form" :rules="rules" label-width="60px">
            <el-form-item label="改价：" prop="discount">
                <el-input
                    placeholder="请输入改价系数"
                    placement="top"
                    v-model="form.discount"
                    type="number"
                    @change="discountFormat(form.discount)"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitRowPrice">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { updateProductionPriceOnRow } from '@/api/order'
export default {
    props: ['row'],
    name: 'rowChangePriceDialog',
    data() {
        return {
            rowPriceDialogVisible: false,
            orderId: this.$route.params.orderId,
            rules: {
                modifyPriceRemark: [
                    { required: true, message: '请输入改价折扣', trigger: 'blur' }
                ]
            },
            form: ''
        }
    },
    methods: {
        submitRowPrice() {
            let modifyPrice = []
            modifyPrice.push({
                id: this.form.id,
                discount: this.form.discount
            })
            let params = {
                orderId: this.orderId,
                modifyPrices: JSON.stringify(modifyPrice)
            }
            updateProductionPriceOnRow(params).then(result => {
                if (result.code === 200 && result.success) {
                    this.$message.success('修改成功')
                    this.rowPriceDialogVisible = false
                    this.$emit('getDataList')
                } else {
                    this.changePriceDialogVisible = false
                }
            })
        },
        reciveData(data) {
            this.form = Object.assign({}, data)
        },
        // 格式化折扣
        discountFormat(discount) {
            let value = discount || 1.00
            let count = parseFloat(value)
            this.form.discount = parseFloat(count.toFixed(2))
        }
    }
}
</script>
