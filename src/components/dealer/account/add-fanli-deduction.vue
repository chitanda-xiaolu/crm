    <template>
        <el-dialog
            title="新增返利扣款"
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
                        <el-form-item label="扣款类型：" prop="deductType">
                            <el-select
                                v-model="dataForm.deductType"
                                filterable
                                style="width:100%"
                                remote
                                clearable
                                reserve-keyword
                                placeholder="请选择">
                                <el-option
                                    v-for="item in paymentAccountList"
                                    :key="item.id"
                                    :label="item.dictName"
                                    :disabled="item.status == 1"
                                    :value="item.dictCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="金额：" prop="money">
                            <el-input v-model="dataForm.money" clearable placeholder="请输入" @blur="adddot"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="备注：" size="mini" prop="remark">
                            <el-input v-model="dataForm.remark" clearable type="textarea" autosize placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" :loading="isSuccess" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { filterFalsy, addNumberDot } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
import { addDeduct, deductionType } from '@/api/account'
export default {
    data () {
        return {
            visible: false,
            paymentAccountList: [],
            isSuccess: false,
            money: '',
            dataForm: {
                deductType: '',
                money: '',
                remark: ''
            },
            distributorId: '',
            dataRule: {
                deductType: [
                    { required: true, message: '扣款类型不能为空', trigger: 'blur' }
                ],
                money: [
                    { required: true, message: '充值金额不能为空', trigger: 'blur' },
                    { validator: this.validateMoney, trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({accountMsg: 'account'})
    },
    methods: {
        ...mapActions({flRdeductionData: 'flRdeductionData', accountData: 'accountData'}),
        init(disId) {
            this.visible = true
            this.distributorId = disId
            this.isSuccess = false
            this.getdeductionType()
        },
        validateMoney(rule, value, callback) {
            if(value <= this.accountMsg.accountInfo.rebateTotal) {
                callback()
            }else {
                callback(new Error(`请输入正确金额,当前余额是：${this.accountMsg.accountInfo.rebateTotal}`))
            }
        },
        // 金额自动匹配小数点
        adddot() {
            if(this.dataForm.money && this.dataForm.money.indexOf('.') === -1) {
                this.dataForm.money = addNumberDot(this.dataForm.money)
            } else {
                this.dataForm.money = (+this.dataForm.money).toFixed(2)
            }
        },
        getdeductionType() {
            deductionType({dictTypeCode: 'deduct_type'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.paymentAccountList = result.data
                }
            })
        },
        showModal() {
            this.dataForm = {
                money: '',
                payType: '',
                remark: ''
            }
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    _self.isSuccess = true
                    const params = filterFalsy(_self.dataForm)
                    params.distributorId = _self.distributorId
                    params.deductCategory = 1
                    addDeduct(params).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('扣款成功')
                            _self.isSuccess = false
                            _self.visible = false
                            _self.accountData({ distributorId: _self.distributorId })
                            _self.flRdeductionData({ distributorId: _self.distributorId, deductCategory: 1 })
                        } else {
                            _self.$message.error('扣款失败')
                            _self.isSuccess = false
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
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
</style>
