<!--
 * @Description: 订单收获信息组件
 * @Author: Zale Ying
 * @Date: 2020-02-28 11:56:50
 * @LastEditTime: 2020-05-07 17:16:19
 * @LastEditors: 陈桃
 -->
<template>
    <el-dialog
        title="更新收货地址"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="30%">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
            <el-form-item label="收货人：" prop="consignee">
                <el-input v-model="dataForm.consignee" clearable type="text" placeholder="请输入" style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="consigneeMobile">
                <el-input v-model="dataForm.consigneeMobile" clearable type="text" placeholder="请输入" style="width:87%"></el-input>
            </el-form-item>
             <el-form-item label="收货地址：" prop="consigneeAddress">
                <el-input v-model="dataForm.consigneeAddress" clearable type="text" placeholder="请输入" style="width:87%"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { deliverGoods } from '@/api/order'
import { filterFalsy } from '@/utils/utils'
import { validatePhone } from '@/utils/validate'
export default {
    props: ['status', 'sh_name', 'sh_mobile', 'sh_address'], // tree状态全部或者有效 0为有效 ''为全部
    data() {
        return {
            dataForm: {
                consignee: '',
                consigneeMobile: '',
                consigneeAddress: ''
            },
            visible: false,
            orderId: '',
            dataRule: {
                consignee: [
                    { required: true, message: '收货人不能为空', trigger: 'blur' }
                ],
                consigneeMobile: [
                    { required: true, message: '联系方式不能为空', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'change' }
                ],
                consigneeAddress: [
                    { required: true, message: '收货地址不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        let base = {consignee: this.sh_name, consigneeMobile: this.sh_mobile, consigneeAddress: this.sh_address}
        this.dataForm = { ...base }
    },
    methods: {
        dataFormSubmit() { // 表单提交
            this.$refs['dataForm'].validate(valid => {
                let _self = this
                if (valid) {
                    const params = filterFalsy(_self.dataForm)
                    params.orderId = _self.orderId
                    _self.$confirm('此操作将前往iShare, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deliverGoods(params).then(result => { // 新增
                            if (result.code === 200 && result.success) {
                                _self.$message.success(`操作成功`)
                                _self.$refs['dataForm'].resetFields()
                                _self.visible = false
                                window.open('http://ishare.bulansha.com:3333/EBAP')
                            } else {
                                _self.$message.error(`${result.message} || 操作失败`)
                            }
                        })
                    })
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
</style>
