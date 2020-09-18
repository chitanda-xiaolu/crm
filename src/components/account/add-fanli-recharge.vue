    <template>
        <el-dialog
            title="新增返利充值"
            :close-on-click-modal="false"
            :visible.sync="visible"
            :destroy-on-close="true"
            @open="showModal()"
            width="30%">
            <el-form
                :model="dataForm"
                :rules="dataRule"
                ref="dataForm"
                label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="充值账号：">
                            <p>{{paymentAccountList && paymentAccountList[0] && paymentAccountList[0].account || ''}}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="充值金额：" prop="money">
                            <el-input v-model="dataForm.money" style="width:80%" placeholder="请输入" clearable @blur="adddot"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="充值类型：" prop="rechargeType">
                        <el-select
                            v-model="dataForm.rechargeType"
                            filterable
                            style="width:80%"
                            remote
                            clearable
                            @change="changeRechargeType"
                            reserve-keyword
                            placeholder="请选择">
                            <el-option
                                v-for="item in rechargeTypeSelect"
                                :key="item.dictCode"
                                :label="item.dictName"
                                :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-show="dataForm.rechargeType === 2">
                <el-col :span="24">
                    <el-form-item label="充值订单编号：" prop="orderCode"
                        :rules="[{ required: dataForm.rechargeType === 2 ? true : false, message: '充值订单编号不能为空', trigger: 'blur' }]">
                        <el-input v-model="dataForm.orderCode" style="width:80%" placeholder="请输入" clearable @blur="checkOrder"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="充值时间：" prop="rechargeTime">
                             <el-date-picker
                                v-model="dataForm.rechargeTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerEnd"
                                placeholder="选择日期">
                                </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="凭证：" size="mini" prop="proofPath">
                            <el-upload
                                action="/upload/uploadFile"
                                list-type="picture-card"
                                :on-preview="handlePicturePreview"
                                :http-request="uploadSectionFile"
                                :on-change="changeUpload"
                                :on-error="errorUpload"
                                :limit='5'
                                :class="{disabled:isMax}"
                                :on-remove="handleRemoveImg">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog class="image-dialog" :modal='false' :visible.sync="picturePreviewVisible">
                                <img width="100%" :src="ImageUrls" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="备注：" size="mini" prop="remark">
                            <el-input type="textarea" style="width:80%" autosize v-model="dataForm.remark" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button :loading="isSuccess"  type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { filterFalsy, addNumberDot, mergeObject, queryParam } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
import { uploadFile, deleteFile } from '@/api/app'
import { addRecharge, rechargeNumber, deductionType, orderIsExist } from '@/api/account'
import { validateArea } from '@/utils/validate'
export default {
    data () {
        return {
            images: [],
            uploadList: [],
            visible: false,
            voucherImg: '',
            paymentAccountList: [],
            picturePreviewVisible: false,
            ImageUrls: '',
            isSuccess: false,
            rechargeTypeSelect: [], // 充值类型
            money: '',
            isMax: false,
            pickerEnd: { // 日期选择范围
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            falseCode: true,
            dataForm: {
                money: '',
                rechargeType: '',
                orderCode: '',
                pageId: '',
                rechargeTime: '',
                proofPath: '',
                remark: ''
            },
            distributorId: '',
            dataRule: {
                money: [
                    { required: true, message: '充值金额不能为空', trigger: 'blur' },
                    { validator: validateArea, trigger: 'blur' }
                ],
                rechargeTime: [
                    { required: true, message: '充值时间不能为空', trigger: 'change' }
                ],
                rechargeType: [
                    { required: true, message: '充值类型不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    methods: {
        ...mapActions({ flRechargeData: 'flRechargeData', accountDetailData: 'accountDetailData', accountPageData: 'accountPageData' }),
        init(disId, id) {
            this.visible = true
            this.isMax = false
            this.distributorId = disId
            this.pageId = id
            this.isSuccess = false
            this.getRechargeNumber()
            this.getRechargeType()
        },
        // 金额自动匹配小数点
        adddot() {
            if(this.dataForm.money && this.dataForm.money.indexOf('.') === -1) {
                this.dataForm.money = addNumberDot(this.dataForm.money)
            } else {
                this.dataForm.money = (+this.dataForm.money).toFixed(2)
            }
        },
        getRechargeNumber() {
            rechargeNumber({distributorId: 0}).then(result => {
                if(result.code === 200 && result.success) {
                    this.paymentAccountList = result.data
                }
            })
        },
        // 获取充值类型列表
        getRechargeType() {
            deductionType({dictTypeCode: 'recharge_type'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.rechargeTypeSelect = result.data
                }
            })
        },
        // 检测订单编号是否存在
        checkOrder() {
            let orderCode = this.dataForm.orderCode
            if(orderCode) {
                orderIsExist({distributorId: this.distributorId, orderCode}).then(result => {
                    if(result.code === 200 && result.success && result.data) {
                        this.falseCode = true
                    } else {
                        this.falseCode = false
                    }
                })
            }
        },
        uploadSectionFile(param) {
            let formData = new FormData()
            formData.append('file', param.file)
            uploadFile(formData).then(result => {
                this.images.push(result.data)
                this.uploadList.push({uid: param.file.uid, url: result.data})
                this.dataForm.proofPath = this.images
                if (this.$refs['dataForm'] && this.$refs['dataForm'].validateField) {
                    this.$refs['dataForm'].validateField('proofPath')
                }
            })
        },
        changeUpload(file, fileList) {
            if(fileList.length >= 5) {
                this.isMax = true
            }
        },
        errorUpload(errs, file, fileList) {
            this.$message.error('上传失败')
            if(fileList.length >= 5) {
                this.isMax = true
            } else {
                this.isMax = false
            }
        },
        showModal() {
            if (this.$refs['dataForm'] && this.$refs['dataForm'].resetFields) {
                this.$refs['dataForm'].resetFields()
            }
            this.dataForm.money = ''
            this.dataForm.rechargeTime = ''
            this.dataForm.proofPath = ''
            this.dataForm.remark = ''
            this.uploadList.length = 0
            this.dataForm.rechargeType = ''
            this.dataForm.orderCode = ''
        },
        changeRechargeType() {
            this.dataForm.orderCode = ''
        },
        // 图片预览
        handlePicturePreview(file) {
            this.ImageUrls = file.url
            this.picturePreviewVisible = true
        },
        // 图片删除
        handleRemoveImg(file, fileList) {
            let allImgs = this.uploadList
            let url = ''
            let arrNew = []
            let newimgobj = []
            allImgs && allImgs.map(item => {
                if(item.uid === file.uid) {
                    url = item.url
                }
                if(item.uid !== file.uid) {
                    arrNew.push(item.url)
                    newimgobj.push(item)
                }
            })
            // eslint-disable-next-line
            arrNew = arrNew.filter(res=> { return res != 'undefined' })
            this.images = arrNew
            if(url) {
                deleteFile({url: url}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.uploadList = newimgobj
                        this.$message.success('删除成功')
                    }
                })
            }
            if(fileList.length < 5) {
                this.isMax = false
            }
            this.delImages = fileList
        },
        // 表单提交
        dataFormSubmit() {
            let query = mergeObject(this.queryData.query.account.pagination, queryParam(this.queryData.query.account.dataForm))
            this.$refs['dataForm'].validate(valid => {
                if(!this.falseCode && this.dataForm.rechargeType === 2) {
                    this.$message.warning('请输入正确的订单编号')
                } else {
                    if (valid) {
                        this.isSuccess = true
                        let _self = this
                        const params = filterFalsy(_self.dataForm)
                        params.distributorId = _self.distributorId
                        params.paymentAccount = _self.paymentAccountList[0].id
                        params.proofPath = this.images.join()
                        params.rechargeCategory = 1
                        addRecharge(params).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.isSuccess = false
                                _self.$message.success(result.message || '充值成功')
                                _self.visible = false
                                _self.images.length = 0
                                _self.accountDetailData({ id: _self.pageId })
                                _self.flRechargeData({ distributorId: _self.distributorId, rechargeCategory: 1 })
                                _self.accountPageData(query)
                            } else {
                                _self.$message.success(result.message || '充值失败')
                                _self.isSuccess = false
                            }
                        })
                    }
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
    /deep/ .el-upload-list {
        display: flex;
    }
    /deep/ .el-upload--picture-card {
        width: 45px;
        height: 45px;
        line-height: 54px;
    }
     /deep/ .el-upload-list--picture-card .el-upload-list__item {
        width: 90px;
        height: 90px;
    }
    /deep/ .el-col-12 {
        width: 100%;
    }
    /deep/ .disabled .el-upload--picture-card { // 图片上传张数限制，隐藏
        display: none
    }
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
    .image-dialog {
        /deep/ .el-dialog {
            div {
                border: none;
            }
        }
    }
</style>
