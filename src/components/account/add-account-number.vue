    <template>
        <el-dialog
            title="新增打款账号"
            :close-on-click-modal="false"
            :visible.sync="visible"
            :destroy-on-close="true"
            @open="showModal()"
            :append-to-body="true"
            :modal-append-to-body='false'
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
                            <el-input v-model="dataForm.accountHolder" clearable placeholder="请输入" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="24" >
                        <el-form-item label="账号：" prop="account">
                            <el-input v-model="dataForm.account" placeholder="请输入" clearable @blur="checkCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24" v-show="dataForm.accountType === 1">
                        <el-form-item label="账号：" prop="account">
                            <el-input v-model="dataForm.account" maxlength="19" minlength="16"  placeholder="请输入16-19位银行卡账号" ></el-input>
                        </el-form-item>
                    </el-col> -->
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
import { filterFalsy } from '@/utils/utils'
import { mapActions } from 'vuex'
import { addPaymentAccount, deductionType } from '@/api/account'
export default {
    data () {
        return {
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
    mounted() {
        this.getAccountType()
        this.getCorporateType()
    },
    methods: {
        ...mapActions({ paymentAccountData: 'paymentAccountData' }),
        init(id) {
            this.visible = true
            this.isMax = false
            this.distributorId = id
        },
        getAccountType() {
            deductionType({dictTypeCode: 'payment_account_type'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.accountList = result.data
                }
            })
        },
        checkCard() {
            // let cardType = this.dataForm.accountType
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
                    addPaymentAccount(params).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('新增成功')
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
