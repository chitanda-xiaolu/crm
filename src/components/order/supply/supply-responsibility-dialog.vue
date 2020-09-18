<template>
    <!-- 补单判责窗口 -->
    <el-dialog
        title="补单判责"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :append-to-body="true"
        :modal-append-to-body="false"
        width="30%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="责任部门：" prop="deptId">
                <el-cascader
                    v-model="form.deptId"
                    style="width: 100%"
                    placeholder="请选择部门"
                    :debounce="1000"
                    :options="deptTree"
                    filterable></el-cascader>
            </el-form-item>
            <el-form-item label="错误类型：" prop="blameId">
                <el-cascader
                    v-model="form.blameId"
                    style="width: 100%"
                    placeholder="请选择补单原因"
                    :debounce="1000"
                    :options="reasonList"
                    filterable></el-cascader>
            </el-form-item>
            <el-form-item label="补单说明：" prop="remark">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { suppleOrderAddResponsibility, suppleOrderEditResponsibility, orderBlameDetail } from '@/api/order'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'supRespDialog',
    data() {
        return {
            type: '',   // 成品补单：finish 定制补单：program
            form: {
                deptId: '',             // 部门id
                blameId: '',            // 原因id
                remark: '',             // 说明
                productionOrderId: ''   // 补单生产单id
            },
            rules: {
                deptId: [
                    { required: true, message: '请选择责任部门', trigger: 'change' }
                ],
                blameId: [
                    { required: true, message: '请选择补单原因', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入补单说明', trigger: 'change' }
                ]
            },
            addResponseStatus: true,    // 判断添加还是修改
            dialogVisible: false        // 补单判责弹出框是否显示
        }
    },
    computed: {
        ...mapState({
            deptTree: state => state.supplyOrder.supplyDeptTree,
            reasonList: state => state.supplyOrder.supplyReasonList
        })
    },
    mounted() {
        !this.deptTree.length && this.getSupplyDeptTree()    // 责任部门数据
        !this.reasonList.length && this.getSupplyReasonList()  // 错误类型数据
    },
    methods: {
        ...mapActions({ getSupplyDeptTree: 'getSupplyDeptTree', getSupplyReasonList: 'getSupplyReasonList', getFinishKjlList: 'getFinishKjlList', getProgramList: 'getProgramList' }),
        // 显示补单判责弹出框
        showResupplyDialog(row, type) {
            this.type = type
            this.dialogVisible = true
            this.form.productionOrderId = row.productionOrderId
            if (row.orderBlameId) {
                this.addResponseStatus = false
                orderBlameDetail({id: row.orderBlameId}).then(result => {
                    this.form.deptId = result.data.deptId.toString()
                    this.form.blameId = result.data.blameId.toString()
                    this.form.remark = result.data.remark
                })
            } else {
                this.addResponseStatus = true
                this.$nextTick(() => {
                    this.$refs['form'].resetFields()
                })
            }
        },
        // 提交补单审核
        submitForm(formName) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (!valid) return
                let param = {
                    deptId: Array.isArray(_self.form.deptId) ? _self.form.deptId[_self.form.deptId.length - 1] : _self.form.deptId,
                    blameId: Array.isArray(_self.form.blameId) ? _self.form.blameId[_self.form.blameId.length - 1] : _self.form.blameId,
                    remark: _self.form.remark,
                    productionOrderId: _self.form.productionOrderId
                }
                if (_self.addResponseStatus) {
                    suppleOrderAddResponsibility(param).then(result => {
                        _self.$message.success('判责提交成功')
                        _self.$refs[formName].resetFields()
                        _self.dialogVisible = false
                        if (_self.type === 'program') {
                            _self.getProgramList()
                        } else {
                            _self.getFinishKjlList()
                        }
                    })
                } else {
                    suppleOrderEditResponsibility(param).then(result => {
                        _self.$message.success('判责修改成功')
                        _self.$refs[formName].resetFields()
                        _self.dialogVisible = false
                    })
                }
            })
        },
        // 取消弹窗
        cancelDialog() {
            this.dialogVisible = false
        }
    }
}
</script>
