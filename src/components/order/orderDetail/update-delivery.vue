<!--
 * @Description: 更新计划交期弹出组件
 * @Author: Zale Ying
 * @Date: 2020-03-17 15:59:00
 * @LastEditTime: 2020-06-12 17:56:34
 * @LastEditors: Zale Ying
 -->
<template>
    <el-dialog title="更新计划交期" :visible.sync="visible" :destroy-on-close="true" width="30%">
        <el-form ref="updateForm" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="计划交付日期：" prop="estimatedDeliveryTime">
                <el-col :span="6">
                    <el-date-picker
                        v-model="form.estimatedDeliveryTime"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerEnd"
                        placeholder="选择日期">
                    </el-date-picker>
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
import { updateDelivery } from '@/api/order'
import { strToTimestamp } from '@/utils/validate'
export default {
    props: ['extimatedTime'],
    data() {
        let _self = this
        return {
            visible: false,
            form: {
                orderId: this.$route.params.orderId,
                estimatedDeliveryTime: ''
            },
            rules: {
                estimatedDeliveryTime: [
                    { required: true, message: '请选择计划交付日期', trigger: 'change' }
                ]
            },
            pickerEnd: { // 日期选择范围
                disabledDate(time) {
                    return time.getTime() < strToTimestamp(_self.extimatedTime)
                }
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs['updateForm'].validate((valid) => {
                if (valid) {
                    updateDelivery(this.form).then(result => {
                        if (result.code === 200 && result.success) {
                            this.$message.success('计划交期更新成功')
                            this.visible = false
                            this.$parent.getDetail()
                        }
                    })
                }
            })
        }
    }
}
</script>
