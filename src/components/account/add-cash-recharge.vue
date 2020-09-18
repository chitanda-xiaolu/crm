<template>
    <el-dialog
        title="新增现金充值"
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
                <el-col :span="24">
                    <el-form-item label="充值账号：" prop="paymentAccount">
                        <el-select
                            v-model="dataForm.paymentAccount"
                            filterable
                            style="width:80%"
                            remote
                            clearable
                            reserve-keyword
                            :placeholder="paymentAccountList.length == 0 ? '请先创建充值账号': '请选择'">
                            <el-option
                                v-for="item in paymentAccountList"
                                :key="item.id"
                                :label="'【' + item.accountHolder + '-'+ item.accountTypeName + '】' + item.account"
                                :disabled="item.status == 1"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
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
                            reserve-keyword
                            @change="changeRechargeType"
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
                            :class="{disabled:isMax}"
                            :on-remove="handleRemoveImg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog class="image-dialog" :visible.sync="picturePreviewVisible" :modal='false'>
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
            <el-button type="primary"  @click="dataFormSubmit()" :loading="isSuccess">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { filterFalsy, addNumberDot, mergeObject, queryParam } from '@/utils/utils'
import { mapActions, mapState } from 'vuex'
import { uploadFile, deleteFile } from '@/api/app'
import { addRecharge, paymentAccountList, deductionType, orderIsExist } from '@/api/account'
import { validateMoney } from '@/utils/validate'
export default {
    data () {
        return {
            visible: false,
            paymentAccountList: [],
            images: [],
            uploadList: [],
            picturePreviewVisible: false,
            ImageUrls: '',
            money: '',
            isSuccess: false,
            isMax: false,
            pageId: '',
            falseCode: true,
            delImages: [],
            pickerEnd: { // 日期选择范围
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
            },
            rechargeTypeSelect: [], // 充值类型
            dataForm: {
                paymentAccount: '',
                money: '',
                rechargeType: '',
                orderCode: '',
                rechargeTime: '',
                proofPath: '',
                remark: ''
            },
            distributorId: '',
            dataRule: {
                paymentAccount: [
                    { required: true, message: '充值账号不能为空', trigger: 'change' }
                ],
                money: [
                    { required: true, message: '充值金额不能为空', trigger: 'blur' },
                    { validator: validateMoney, trigger: 'blur' }
                ],
                rechargeType: [
                    { required: true, message: '充值类型不能为空', trigger: 'blur' }
                ],
                rechargeTime: [
                    { required: true, message: '充值时间不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    methods: {
        ...mapActions({ cashRechargeData: 'cashRechargeData', accountDetailData: 'accountDetailData', accountPageData: 'accountPageData' }),
        init(disId, id) {
            this.visible = true
            this.isMax = false
            this.distributorId = disId
            this.pageId = id
            this.isSuccess = false
            this.getPaymentAccount()
            this.getRechargeType()
        },
        getPaymentAccount() {
            paymentAccountList({distributorId: this.distributorId}).then(result => {
                if(result.code === 200 && result.success) {
                    this.paymentAccountList = result.data
                }
            })
        },
        // 通过正则过滤小数点后两位
        oninput(e) {
            this.dataForm.money = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null
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
        // 金额自动匹配小数点
        adddot() {
            // 输入整数和输入小数
            if(this.dataForm.money && this.dataForm.money.indexOf('.') === -1) {
                this.dataForm.money = addNumberDot(this.dataForm.money)
            } else {
                this.dataForm.money = (+this.dataForm.money).toFixed(2)
            }
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
            this.dataForm.paymentAccount = ''
            this.dataForm.money = ''
            this.dataForm.rechargeTime = ''
            this.dataForm.proofPath = ''
            this.dataForm.remark = ''
            this.dataForm.rechargeType = ''
            this.dataForm.orderCode = ''
            this.uploadList.length = 0
        },
        changeRechargeType() {
            this.dataForm.orderCode = ''
        },
        // 图片预览
        handlePicturePreview(file) {
            this.ImageUrls = file.url
            this.picturePreviewVisible = true
        },
        uploadSectionFile(param) {
            let _self = this
            let formData = new FormData()
            formData.append('file', param.file)
            uploadFile(formData).then(result => {
                _self.images.push(result.data)
                _self.uploadList.push({uid: param.file.uid, url: result.data})
                this.dataForm.proofPath = this.images
                if (this.$refs['dataForm'] && this.$refs['dataForm'].validateField) {
                    this.$refs['dataForm'].validateField('proofPath')
                }
            })
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
            arrNew = arrNew.filter(res => { return res !== 'undefined' })
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
                        let _self = this
                        _self.isSuccess = true
                        const params = filterFalsy(_self.dataForm)
                        params.distributorId = _self.distributorId
                        params.proofPath = this.images.join()
                        params.rechargeCategory = 0
                        addRecharge(params).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success(result.message || '充值成功')
                                _self.visible = false
                                _self.isSuccess = false
                                _self.images.length = 0
                                _self.cashRechargeData({ distributorId: _self.distributorId, rechargeCategory: 0 })
                                _self.accountDetailData({id: _self.pageId})
                                _self.accountPageData(query)
                            } else {
                                _self.isSuccess = false
                                _self.$message.error(result.message || '充值失败')
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
    /deep/ .el-col-12 {
        width: 100%;
    }
    /deep/ .disabled .el-upload--picture-card { // 图片上传张数限制，隐藏
        display: none
    }
    /deep/ .el-upload-list--picture-card .el-upload-list__item {
        width: 90px;
        height: 90px;
    }
    .image-dialog {
        /deep/ .el-dialog {
            div {
                border: none;
            }
        }
    }
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
</style>
