    <template>
        <el-dialog
            title="编辑打款账号"
            :close-on-click-modal="false"
            :visible.sync="visible"
            :destroy-on-close="true"
            @open="showModal()"
            width="45%">
            <el-form
                :model="dataForm"
                :rules="dataRule"
                ref="dataForm"
                label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="账号类型：" prop="accountType">
                            <el-select
                                v-model="dataForm.accountType"
                                filterable
                                style="width:100%"
                                remote
                                clearable
                                reserve-keyword
                                placeholder="请选择">
                                <el-option
                                    v-for="item in accountList"
                                    :key="item.id"
                                    :label="item.dictName"
                                    :value="item.dictCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="持有者：" prop="accountHolder">
                            <el-input v-model="dataForm.accountHolder" placeholder="请输入" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="账号：" prop="account">
                            <el-input v-model="dataForm.account" placeholder="请输入" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="对公类型：" size="mini" prop="corporateType">
                            <el-select
                                v-model="dataForm.corporateType"
                                filterable
                                style="width:100%"
                                remote
                                clearable
                                reserve-keyword
                                placeholder="请选择">
                                <el-option
                                    v-for="item in corporateList"
                                    :key="item.id"
                                    :label="item.dictName"
                                    :value="item.dictCode"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { selectObj, filterFalsy } from '@/utils/utils'
import { mapActions } from 'vuex'
import { editPaymentAccount, deductionType, paymentAccountDetail } from '@/api/account'
export default {
    data () {
        return {
            id: '',
            visible: false,
            accountList: [],
            corporateList: [],
            dataForm: {
                accountType: '',
                accountHolder: '',
                account: '',
                corporateType: ''
            },
            distributorId: '',
            dataRule: {
                accountType: [
                    { required: true, message: '账号类型不能为空', trigger: 'blur' }
                ],
                accountHolder: [
                    { required: true, message: '持有者不能为空', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                corporateType: [
                    { required: true, message: '对公类型不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
    },
    mounted() {
        this.getAccountType()
        this.getCorporateType()
    },
    methods: {
        ...mapActions({ paymentAccountData: 'paymentAccountData' }),
        init(id, disId) {
            this.visible = true
            this.id = id
            this.distributorId = disId
            this.getAccountNumberDetail()
        },
        getAccountNumberDetail() {
            paymentAccountDetail(this.id).then(result => {
                if(result.code === 200 && result.success) {
                    const nodes = result.data
                    const query = selectObj(nodes, ['accountType', 'accountHolder', 'account', 'corporateType', 'id'])
                    query.distributorId = this.distributorId
                    this.dataForm = {...query}
                }
            })
        },
        getAccountType() {
            deductionType({dictTypeCode: 'payment_account_type'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.accountList = result.data
                }
            })
        },
        // 对公类型
        getCorporateType() {
            deductionType({dictTypeCode: 'corporate_type'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.corporateList = result.data
                }
            })
        },
        showModal() {
            this.dataForm = {
                accountType: '',
                accountHolder: '',
                account: '',
                corporateType: ''
            }
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    const params = filterFalsy(_self.dataForm)
                    params.distributorId = _self.distributorId
                    editPaymentAccount(params).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('编辑成功')
                            _self.visible = false
                            _self.paymentAccountData({distributorId: _self.distributorId})
                        }
                    })
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
    /deep/ .el-dialog__body {
        padding: 15px 20px;
    }
    /deep/ .el-col-12 {
        width: 100%;
    }
</style>
