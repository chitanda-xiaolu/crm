<template>
    <el-dialog
        title="添加费用"
        :close-on-click-modal="false"
        :visible.sync="feeVisible"
        @open="openFeeDialog"
        :destroy-on-close="true"
        :append-to-body="true"
        :modal-append-to-body='false'
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="费用类型：" prop="feeType">
                        <el-select
                            v-model="dataForm.feeType"
                            filterable
                            style="width:100%"
                            remote
                            clearable
                            reserve-keyword
                            placeholder='请选择'>
                            <el-option
                                v-for="item in feeTypeList"
                                :key="item.dictCode"
                                :label="item.dictName"
                                :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="费用金额：" prop="fee">
                        <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            <el-row :gutter="20">
                                <el-col :span="20">
                                    <el-form-item label="理论结算价：">
                                        <span>{{renderMoney((orderPriceData.nominalSettlementPriceTotal || 0).toFixed(2))}} 元</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="费用比例：">
                                        <el-input type="number" v-model="proportion" @input="cmoputeFee"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item label="计算结果：">
                                        <span>{{feePrice}} 元</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-input slot="reference" v-model="dataForm.fee" placeholder="请输入" clearable @blur="adddot"></el-input>
                        </el-popover>
                    </el-form-item>
                </el-col>
            </el-row>
                <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="承担方：" prop="bearer">
                        <el-select
                            v-model="dataForm.bearer"
                            filterable
                            style="width:100%"
                            remote
                            clearable
                            reserve-keyword
                            placeholder='请选择'>
                            <el-option
                                v-for="item in bearerList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="说明：" size="mini" prop="remark">
                        <el-input type="textarea" :rows="2" v-model="dataForm.remark" clearable placeholder="请输入"></el-input>
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
                            :class="{disabled:isMax}"
                            :on-change="changeUpload"
                            :on-remove="handleRemoveImg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog class="image-dialog" :visible.sync="picturePreviewVisible" :modal='false'>
                            <img width="100%" :src="imageUrls" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="feeVisible = false">取消</el-button>
                <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
            </span>
    </el-dialog>
</template>
<script>
import { filterFalsy } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
import { validateMoney } from '@/utils/validate'
import { addFees, bearerList } from '@/api/order'
import { uploadFile, deleteFile, enumType } from '@/api/app'
export default {
    data() {
        return {
            feeVisible: false,
            isMax: false,
            orderId: this.$route.params.orderId,
            dataForm: {
                feeType: '',
                fee: '',
                bearer: '',
                proofPath: '',
                remark: ''
            },
            feeTypeList: [],
            bearerList: [],
            images: [],
            uploadList: [],
            picturePreviewVisible: false,
            imageUrls: '',
            proportion: 0,
            feePrice: 0,
            dataRule: {
                feeType: [
                    { required: true, message: '费用不能为空', trigger: 'change' }
                ],
                fee: [
                    { required: true, message: '费用金额不能为空', trigger: 'blur' },
                    { validator: validateMoney, trigger: 'change' }
                ],
                bearer: [
                    { required: true, message: '承担方不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            orderPriceData: state => state.order.orderPriceData
        })
    },
    mounted() {
        this.getCostType()
    },
    methods: {
        ...mapActions({ getFeeList: 'getFeeList' }),
        openFeeDialog() {
            this.getBearerList()
            this.isMax = false
        },
        // 计算费用
        cmoputeFee() {
            if (this.orderPriceData.nominalSettlementPriceTotal) {
                let price = (this.proportion * this.orderPriceData.nominalSettlementPriceTotal).toFixed(2)
                this.dataForm.fee = price
                this.feePrice = price
            }
        },
        getCostType() {
            enumType({ dictTypeCode: 'order_fee_type' }).then(result => {
                if(result.code === 200 && result.success) {
                    this.feeTypeList = result.data
                }
            })
        },
        getBearerList() {
            bearerList().then(result => {
                if(result.code === 200 && result.success) {
                    this.bearerList = result.data
                }
            })
        },
        // 添加费用提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    const params = filterFalsy(_self.dataForm)
                    params.orderId = _self.orderId
                    params.proofPath = params.proofPath && params.proofPath.join()
                    addFees(params).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('操作成功')
                            _self.images.length = 0
                            _self.getFeeList({orderId: _self.orderId})
                            _self.feeVisible = false
                            _self.$refs.dataForm.resetFields()
                        } else {
                            _self.$message.error('操作失败')
                        }
                    })
                }
            })
        },
        // 金额自动匹配小数点
        adddot() {
            // 输入整数和输入小数
            this.dataForm.fee = (parseFloat(this.dataForm.fee) || 0).toFixed(2)
        },
        // 图片预览
        handlePicturePreview(file) {
            this.imageUrls = file.url
            this.picturePreviewVisible = true
        },
        changeUpload(file, fileList) {
            if(fileList.length >= 1) {
                this.isMax = true
            }
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
            if(fileList.length < 1) {
                this.isMax = false
            }
            this.delImages = fileList
        }
    }
}
</script>
<style scoped lang="scss">
    /deep/ .el-upload--picture-card {
        width: 35px;
        height: 35px;
        line-height: 40px;
        i {
            font-size: 22px !important;
        }
    }
    /deep/ .disabled .el-upload--picture-card { // 图片上传张数限制，隐藏
        display: none
    }
</style>
