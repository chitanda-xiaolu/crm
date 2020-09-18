<template>
    <vue-scroll :ops="scrollops">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            class="form-box"
            label-width="130px">
            <el-divider content-position="left">产品分类<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="产品分类：" prop="speType">
                        <el-cascader
                            v-model="dataForm.speType"
                            style="width:100%"
                            placeholder="请选择产品"
                            :debounce="1000"
                            :options="treeData"
                            :props="optionProps"
                            filterable
                            @change="hendleChangeCascader"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品品牌：" size="mini" prop="productBrand">
                        <el-select
                            v-model="dataForm.productBrand"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            style="width:100%"
                            placeholder="请选择">
                            <el-option
                                v-for="item in brandList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态：" size="mini" prop="status" :rules="{required: true, message: '状态不能为空', trigger: 'blur'}">
                        <el-radio-group v-model="dataForm.status">
                            <el-radio label='0'>上架</el-radio>
                            <el-radio label='1'>下架</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">产品信息<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
            <el-col :span="8">
                    <el-form-item label="物料编码：" prop="code">
                        <el-input clearable v-model="dataForm.code" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="酷家乐编号：" prop="kjlCode">
                        <el-input clearable v-model="dataForm.kjlCode" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品名称(平台)：" prop="name">
                        <el-input clearable v-model="dataForm.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="产品名称(KJL)：" prop="kjlName">
                        <el-input clearable v-model="dataForm.kjlName" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="材料：" prop="baseMetal">
                        <el-select
                            v-model="dataForm.baseMetal"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            placeholder="请选择"
                            style="width:100%">
                            <el-option
                                v-for="item in packageMaterialList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="颜色：" prop="color">
                        <el-select
                            v-model="dataForm.color"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            placeholder="请选择"
                            style="width:100%">
                            <el-option
                                v-for="item in packageColorList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="型号：" prop="model">
                        <el-input clearable v-model="dataForm.model" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="规格：" prop="standards">
                        <el-input clearable v-model="dataForm.standards" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="包装规则：" prop="packRule">
                        <el-select
                            v-model="dataForm.packRule"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            placeholder="请选择"
                            style="width:100%">
                            <el-option
                                v-for="item in packageRuleList"
                                :key="item.code"
                                :label="item.name+'【'+item.description+'】'"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="宽：" prop="width">
                        <el-input clearable v-model="dataForm.width" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="深：" prop="deep">
                        <el-input clearable v-model="dataForm.deep" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="高：" prop="height">
                        <el-input clearable v-model="dataForm.height" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="方案规则：" prop="designRule">
                        <el-select
                            v-model="dataForm.designRule"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            placeholder="请选择"
                            style="width:100%">
                            <el-option
                                v-for="item in programRuleList"
                                :key="item.code"
                                :label="item.name+'【'+item.description+'】'"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="库存：" prop="inventory">
                        <el-input clearable v-model="dataForm.inventory" type="number" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品图片：" prop="picPath">
                        <el-upload
                            action="/upload/uploadFile"
                            ref="upload"
                            list-type="picture-card"
                            :on-preview="handlePicturePreview"
                            :http-request="uploadSectionFile"
                            :on-change="changeUpload"
                            :on-error="errorUpload"
                            :on-remove="handleRemoveImg">
                            <el-button size="mini" type="primary" v-show="isInitUpload" icon="el-icon-plus">上传</el-button>
                            <el-button size="small" type="primary" style="display:flex" icon="el-icon-refresh" @click="clearUploadedImage" v-show="!isInitUpload">更换</el-button>
                        </el-upload>
                        <el-dialog class="image-dialog" :visible.sync="picturePreviewVisible" :modal='false'>
                            <img width="100%" :src="ImageUrls" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form-item label="说明：" prop="description">
                        <el-input clearable v-model="dataForm.description" type="textarea" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">价格信息<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="直接下单：" prop="isOrder" :rules="{required: true, message: '状态不能为空', trigger: 'blur'}">
                        <el-radio-group v-model="dataForm.isOrder">
                            <el-radio label='1'>是</el-radio>
                            <el-radio label='0'>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否外协：" prop="isAssist" :rules="{required: true, message: '状态不能为空', trigger: 'blur'}">
                        <el-radio-group v-model="dataForm.isAssist">
                            <el-radio label='1'>是</el-radio>
                            <el-radio label='0'>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="单位：" prop="unit" :rules="{required: true, message: '单位不能为空', trigger: 'change'}">
                        <el-select
                            v-model="dataForm.unit"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            placeholder="请选择"
                            style="width:100%">
                            <el-option
                                v-for="item in peerList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="零售价：" prop="retailPrice">
                        <el-input v-model="dataForm.retailPrice" clearable placeholder="请输入" @blur="adddot(dataForm.retailPrice, 1)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="理论结算价：" prop="nominalSettlementPrice">
                        <el-input v-model="dataForm.nominalSettlementPrice" clearable placeholder="请输入" @blur="adddot(dataForm.nominalSettlementPrice, 2)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="供货价：" prop="supplyPrice">
                        <el-input  v-model="dataForm.supplyPrice" onKeypress="return (/^\d+(\.\d+)?$/.test(String.fromCharCode(event.keyCode)))" clearable placeholder="请输入" @blur="adddot(dataForm.supplyPrice, 3)"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">可销售范围<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="可销售范围：" prop="salesScope" :rules="{required: true, message: '销售范围不能为空', trigger: 'blur'}">
                        <el-radio-group v-model="dataForm.salesScope">
                            <el-radio label='0'>布兰莎</el-radio>
                            <el-radio label='1'>空&间</el-radio>
                            <el-radio label='2'>布兰莎、空&间</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="btns">
                <el-form-item>
                    <el-button type="primary" @click="sveAddDataFormSubmit('dataForm')" icon="el-icon-position">保存并新增下一个</el-button>
                </el-form-item>
            </div>
        </el-form>
    </vue-scroll>
</template>
<script>
import { filterFalsy, addNumberDot } from '@/utils/utils'
import { validateMoney } from '@/utils/validate'
import { uploadFile, deleteFile } from '@/api/app'
import { productTree, addProduct, productConfig } from '@/api/product'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    data () {
        return {
            scrollops: scrollConfig,
            images: [],
            uploadList: [],
            brandList: [],
            picturePreviewVisible: false,
            ImageUrls: '',
            treeData: [],
            peerList: [],
            packageRuleList: [],
            programRuleList: [],
            packageColorList: [],
            packageMaterialList: [],
            isMax: false,
            isInitUpload: true,
            optionProps: {
                disabled: 'status'
            },
            dataForm: {
                standards: '',
                kjlName: '',
                picPath: '',
                description: '',
                kjlCode: '',
                supplyPrice: '',
                activityId: '',
                nominalSettlementPrice: '',
                retailPrice: '',
                speType: '',
                status: '0',
                code: '',
                name: '',
                isAssist: '1',
                isOrder: '1',
                packRule: '',
                productBrand: '',
                inventory: '',
                salesScope: '0',
                widdth: '',
                deep: '',
                height: '',
                baseMetal: '',
                color: ''
            },
            dataRule: {
                speType: [
                    { required: true, message: '产品分类不能为空', trigger: 'change' }
                ],
                picPath: [
                    { required: true, message: '产品图片不能为空', trigger: 'change' }
                ],
                code: [
                    { required: true, message: '物料编码不能为空', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '名称不能为空', trigger: 'change' }
                ],
                packRule: [
                    { required: true, message: '包装规则不能为空', trigger: 'change' }
                ],
                designRule: [
                    { required: true, message: '方案规则不能为空', trigger: 'change' }
                ],
                standards: [
                    { required: true, message: '规格不能为空', trigger: 'change' }
                ],
                model: [
                    { required: true, message: '型号不能为空', trigger: 'change' }
                ],
                retailPrice: [
                    { required: true, validator: validateMoney, trigger: 'change' }
                ],
                nominalSettlementPrice: [
                    { required: true, validator: validateMoney, trigger: 'change' }
                ],
                width: [
                    { required: true, validator: validateMoney, trigger: 'change' }
                ],
                deep: [
                    { required: true, validator: validateMoney, trigger: 'change' }
                ],
                height: [
                    { required: true, validator: validateMoney, trigger: 'change' }
                ]
            }
        }
    },
    computed: {
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getProTree()
            this.getProductPeerEnum()
            this.getProductBrandEnum()
            this.getProductProgramEnum()
            this.getProductPackageEnum()
            this.getProductColor()
            this.getProductMateril()
        },
        getProTree() {
            productTree({ productType: 10001 }).then(result => {
                if(result.code === 200 && result.success) {
                    this.treeData = result.data
                }
            })
        },
        // 单位
        getProductPeerEnum() {
            productConfig({typeCode: 'unit_type'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.peerList = result.data
                }
            })
        },
        // 品牌
        getProductBrandEnum() {
            productConfig({typeCode: 'product_brand'}).then(result => {
                if(result.code === 200 && result.success) {
                    this.brandList = result.data
                }
            })
        },
        // 方案规则
        getProductProgramEnum() {
            productConfig({ typeCode: 'design_rule' }).then(result => {
                if(result.code === 200 && result.success) {
                    this.programRuleList = result.data
                }
            })
        },
        // 包装规则
        getProductPackageEnum() {
            productConfig({ typeCode: 'pack_rule' }).then(result => {
                if(result.code === 200 && result.success) {
                    this.packageRuleList = result.data
                }
            })
        },
        // 颜色
        getProductColor() {
            productConfig({ typeCode: 'color' }).then(result => {
                if(result.code === 200 && result.success) {
                    this.packageColorList = result.data
                }
            })
        },
        // 材料
        getProductMateril() {
            productConfig({ typeCode: 'material' }).then(result => {
                if(result.code === 200 && result.success) {
                    this.packageMaterialList = result.data
                }
            })
        },
        sveAddDataFormSubmit() { // 保存并新增
            let _self = this
            let params = filterFalsy(_self.dataForm)
            params.picPath = this.images.join()
            if(_self.dataForm.speType) {
                params.speType = _self.dataForm.speType[_self.dataForm.speType.length - 1]
            }
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    addProduct(params).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('操作成功')
                            _self.$refs['dataForm'].resetFields()
                            _self.getProTree()
                            _self.$refs.upload.clearFiles()
                        }
                    })
                }
            })
        },
        // 金额自动匹配小数点
        adddot(val, index) {
            // 输入整数和输入小数
            if(val && val.indexOf('.') === -1) {
                val = addNumberDot(val)
            } else {
                val = (+val).toFixed(2)
            }
            if(index === 1) {
                this.dataForm.retailPrice = val
            } else if(index === 2) {
                this.dataForm.nominalSettlementPrice = val
            } else if(index === 3) {
                this.dataForm.supplyPrice = val
            }
        },
        clearUploadedImage () {
            this.$refs.upload.clearFiles()
        },
        changeUpload(file, fileList) {
            if(fileList.length >= 1) {
                this.isMax = true
            }
        },
        errorUpload(errs, file, fileList) {
            this.$message.error('上传失败')
            if(fileList.length >= 1) {
                this.isMax = true
            } else {
                this.isMax = false
            }
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
            formData.append('type', 3)
            uploadFile(formData).then(result => {
                _self.images.push(result.data)
                _self.uploadList.push({uid: param.file.uid, url: result.data})
                _self.dataForm.picPath = result.data
                _self.isInitUpload = false
                if (_self.$refs['dataForm'] && _self.$refs['dataForm'].validateField) {
                    _self.$refs['dataForm'].validateField('picPath')
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
                        this.isInitUpload = true
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            }
            if(fileList.length < 1) {
                this.isMax = false
            }
        },
        hendleChangeCascader() {
            this.$refs['dataForm'] && this.$refs['dataForm'].validateField('speType')
        }
    }
}
</script>
<style scoped lang='scss'>
    @import "../../assets/scss/product/index";
</style>
