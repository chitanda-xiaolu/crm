<template>
    <el-dialog
        :title="title"
        :visible.sync="distributorData.dialogStatus"
        :close-on-click-modal="isEdit"
        :destroy-on-close="true">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="招商员工：" :label-width="formLabelWidth" prop="businessId">
                        <el-select
                            class="width-all"
                            v-model="dataForm.businessId"
                            placeholder="请选择招商人员"
                            filterable
                            clearable
                            remote
                            reserve-keyword>
                            <el-option
                                v-for="item in users"
                                :key="item.userId"
                                :label="item.name"
                                :disabled="item.status == 1"
                                :value="item.userId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在区域：" :label-width="formLabelWidth" prop="areaId">
                        <area-select class="width-all" @change="handlChange" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="代理地点：" :label-width="formLabelWidth" prop="agentAddress">
                        <el-input v-model="dataForm.agentAddress" placeholder="请输入" clearable autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="负责人：" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="dataForm.name" placeholder="请输入" clearable autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="负责人手机：" :label-width="formLabelWidth" prop="phone">
                        <el-input v-model="dataForm.phone" placeholder="请输入" clearable autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="加盟日期：" :label-width="formLabelWidth" prop="joinTime">
                        <el-date-picker
                            class="width-all"
                            v-model="dataForm.joinTime"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="经销商类型：" :label-width="formLabelWidth">
                        <el-radio-group v-model="dataForm.type">
                            <el-radio label=2>加盟</el-radio>
                            <el-radio label=1>直营</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经销商状态：" :label-width="formLabelWidth">
                        <el-radio-group v-model="dataForm.status">
                            <el-radio label='0'>启用</el-radio>
                            <el-radio label='1'>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="收获地址：" :label-width="formLabelWidth" prop="address">
                            <el-input v-model="dataForm.address" placeholder="请输入经销商收获地址" type="textarea" clearable autosize></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
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
import { addDealer, editDealer } from '@/api/dealer'
import { getManager } from '@/api/deptUser'
import AreaSelect from '@/components/common/AreaSelect.vue'
import SYSTEMVALUE from '@/utils/config' // 引入路由配置文件
import { filterFalsy } from '@/utils/utils'
export default {
    data() {
        return {
            dataForm: {
                name: '',           // 负责人
                phone: '',          // 负责人手机
                businessId: '',     // 招商人员id
                joinTime: '',       // 加盟日期
                agentAddress: '',   // 代理地址
                status: '0',        // 状态
                type: '2',          // 经销商类型
                areaId: '',         // 区域id
                address: ''         // 经销商收获地址
            },
            id: '',
            users: [],
            formLabelWidth: '110px',
            // 弹窗校验规则
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
            title: '新增经销商',
            isEdit: false
        }
    },
    inject: ['reload'],     // 注入reload方法,刷新组件
    components: {
        AreaSelect
    },
    computed: {
        ...mapState({ appData: 'app', distributorData: 'distributor' })
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        ...mapMutations({ setDialogStatus: 'SET_DIALOGSTATUS', setCodeList: 'SET_CODE_LIST' }),
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
            this.dataForm.areaId = val[2] || val[1] || val[0]
        },
        isCreateStore(id) {
            this.$confirm('是否继续新增经销商?', '提示', {
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
        onSubmit() {
            this.dataForm.areaId = this.appData.codeList[2] || this.appData.codeList[1] || this.appData.codeList[0]
            this.$refs['dataForm'].validate(valid => {
                if (valid && this.isEdit) {
                    let param = filterFalsy(this.dataForm)
                    param.id = this.id
                    let _self = this
                    editDealer(param).then(result => {
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
                    addDealer(param).then(result => {
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
        closeDealer() {
            this.setDialogStatus(false)
            if (!this.isEdit) {
                this.setCodeList()
            }
        },
        editAction(params) {
            this.isEdit = true
            this.title = '编辑经销商'
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
