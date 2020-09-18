<template>
    <el-dialog
        :title="title"
        :visible.sync="distributorData.supplierDialogStatus"
        :close-on-click-modal="isEdit"
        :destroy-on-close="true">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="供应商名称：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="dataForm.supplierName" placeholder="请输入" clearable autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="供应商评级：">
                    <el-select v-model="dataForm.supplierRate" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="联系方式：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="dataForm.phone" placeholder="请输入" clearable autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在区域：" :label-width="formLabelWidth" prop="areaId">
                        <area-select class="width-all" @change="handlChange" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="支付方式：" :label-width="formLabelWidth">
                        <el-radio-group v-model="dataForm.payType">
                            <el-radio label=2>汇款</el-radio>
                            <el-radio label=1>现金</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="供应商状态：" :label-width="formLabelWidth">
                        <el-radio-group v-model="dataForm.status">
                            <el-radio label='0'>启用</el-radio>
                            <el-radio label='1'>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDealer">取 消</el-button>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { validatePhone } from '@/utils/validate'
import { addSupplier, editSupplier } from '@/api/supplier'
import { getManager } from '@/api/deptUser'
import AreaSelect from '@/components/common/AreaSelect.vue'
import SYSTEMVALUE from '@/utils/config'
import { filterFalsy } from '@/utils/utils'
export default {
    data() {
        return {
            dataForm: {
                supplierName: '',           // 供应商名称
                status: '0',        // 状态
                payType: '2',       // 支付方式
                areaId: '',        // 区域id
                startValue: 1      // 供应商评级
            },
            id: '',
            users: [],
            formLabelWidth: '110px',
            // 表单校验规则
            dataRule: {
                name: [
                    { required: true, message: '请输入负责人姓名', trigger: 'change' }
                ],
                areaId: [
                    { required: true, message: '请选择所在区域', trigger: 'change' }
                ],
                phone: [
                    { required: true, message: '请填写正确的手机号码', trigger: 'change' },
                    { validator: validatePhone, trigger: 'change' }
                ],
                joinTime: [
                    { required: true, message: '请选择加盟日期', trigger: 'change' }
                ],
                agentAddress: [
                    { required: true, message: '请输入代理地址', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入收货地址', trigger: 'change' }
                ]
            },
            title: '新增供应商',
            isEdit: false, // 用于判断弹窗的类别,isEdit为true时弹窗为编辑弹窗，为false时为新增弹窗
            options: [{
                value: '选项1',
                label: '1'
            }, {
                value: '选项2',
                label: '2'
            }, {
                value: '选项3',
                label: '3'
            }, {
                value: '选项4',
                label: '4'
            }, {
                value: '选项5',
                label: '5'
            }]
        }
    },
    inject: ['reload'],     // 注入reload方法,刷新组件
    components: {
        AreaSelect
    },
    computed: {
        ...mapState({ appData: 'app', distributorData: 'supplier' }) // 获取控制弹窗的变量
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        ...mapMutations({ setDialogStatus: 'SET_SUPPLIER_DIALOGSTATUS', setCodeList: 'SET_CODE_LIST' }),
        // **getUsers???
        getUsers() {
            let _self = this
            getManager({platform: SYSTEMVALUE.COMPANY_PLATFORM}).then(result => {
                if(result.code === 200 && result.success) {
                    if(result.data.length) {
                        _self.users = result.data
                    } else {
                        _self.users.length = 0
                    }
                }
            })
        },
        // 监听地区选择框变化
        handlChange(val) {
            this.dataForm.areaId = val[2] || val[1] || val[0]  // **???
        },
        isCreateStore(id) {
            this.$confirm('是否继续新增供应商?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push({
                    path: '/store/add',
                    query: {id: id}
                })
            }).catch(() => {
                this.$message.success('操作成功')
            })
        },
        // 提交功能
        onSubmit() {
            this.dataForm.areaId = this.appData.codeList[2] || this.appData.codeList[1] || this.appData.codeList[0]
            this.$refs['dataForm'].validate(valid => {
                // 若表单校验通过且isEdit为true则进行供应商编辑
                if (valid && this.isEdit) {
                    // 去除数组和对象中表现为false的字段
                    let param = filterFalsy(this.dataForm)
                    param.id = this.id // ???
                    let _self = this
                    editSupplier(param).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.setCodeList()
                            _self.closeDealer()
                            _self.reload()
                        } else {
                            _self.$message.error(result.message || '操作失败')
                        }
                    })
                } else if(valid) {
                    let param = filterFalsy(this.dataForm)
                    let _self = this
                    addSupplier(param).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.setCodeList()
                            _self.closeDealer()
                            _self.reload()
                            _self.isCreateStore(result.data)
                        } else {
                            _self.$message.error(result.message || '操作失败')
                        }
                    })
                } else {
                    this.$message.error('请填写所有必填字段')
                }
            })
        },
        // 关闭新增或编辑供应商弹窗
        closeDealer() {
            this.setDialogStatus(false)
            if (!this.isEdit) {
                this.setCodeList()
            }
        },
        editAction(params) {
            this.isEdit = true
            this.title = '编辑供应商'
            for (let i in this.dataForm) {
                this.dataForm[i] = params[i]
            }
            this.dataForm.status = this.dataForm.status.toString()
            this.dataForm.type = this.dataForm.type.toString()
            this.id = params.id
        }
    }
}
</script>
<style scoped lang="scss">
    .width-all {
        width: 100%;
    }
    .is-disabled {
        display: none;
    }
</style>
