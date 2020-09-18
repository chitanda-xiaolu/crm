
<template>
    <div class="order-info-container">
        <el-divider content-position="left">费用信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-button type="primary" icon="el-icon-plus" plain class="add-free-btn" size="mini" @click="handleAddFee()">新增费用</el-button>
        <el-table v-if="order.feeList" :data="order.feeList" border>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="feeTypeName" label="费用类型" width="100"></el-table-column>
            <el-table-column prop="bearerName" label="承担方" width="100"></el-table-column>
            <el-table-column prop="fee" label="费用金额（元）" width="120">
                <template slot-scope="scope">
                    <span>{{renderMoney((scope.row.fee || 0).toFixed(2))}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="proofPath" label="凭证" width="100">
                <template slot-scope="scope">
                    <viewer :images="scope.row.proofPathList" class="img-outer-box">
                        <img
                            class="row-image-preview"
                            v-for="(item, idx) in scope.row.proofPathList"
                            :key="idx"
                            :src="item">
                    </viewer>
                </template>
            </el-table-column>
            <el-table-column prop="statusName" label="扣款状态" width="100"></el-table-column>
            <el-table-column prop="remark" label="说明" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="x" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="edithandle(scope.row)" v-show="scope.row.status != 20">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" @click="removehandle(scope.row)">移除</el-button>
                    <el-button type="text" icon="el-icon-money" @click="deducthandle(scope.row)">扣款</el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-fee ref="addfeeDialog" />
        <edit-fee ref="editfeeDialog" />
    </div>
</template>
<script>
import { deleteFile, uploadFile } from '@/api/app'
import { removeFees, deductFees } from '@/api/order'
import addFee from '@/components/order/orderDetail/fee/add-fee'
import editFee from '@/components/order/orderDetail/fee/edit-fee'
import { mapActions, mapState } from 'vuex'
import { addNumberDot } from '@/utils/utils'
export default {
    components: {
        addFee, editFee
    },
    computed: {
        ...mapState({
            order: 'order'
        })
    },
    watch: {
        'order.orderDetailData.orderId': {
            handler: function (val, oldval) {
                this.getFeeList({ orderId: this.$route.params.orderId })
            }
        }
    },
    mounted() {
        this.getFeeList({ orderId: this.$route.params.orderId })
    },
    methods: {
        ...mapActions({ getFeeList: 'getFeeList' }),
        handleAddFee() {
            this.$refs.addfeeDialog.feeVisible = true
        },
        edithandle(row) {
            this.$refs.editfeeDialog.feeVisible = true
            this.$nextTick(() => {
                this.$refs.editfeeDialog.init(row.id)
            })
        },
        removehandle(data) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeFees({ id: data.id }).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getFeeList({ orderId: this.$route.params.orderId })
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            }).catch(() => {})
        },
        // 费用扣款
        deducthandle(data) {
            let id = data.id
            this.$confirm(`此操作将扣除金额 ${data.fee} 元, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deductFees({id}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getFeeList({ orderId: this.$route.params.orderId })
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            }).catch(() => {})
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
                deleteFile({url}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.uploadList = newimgobj
                        this.$message.success('删除成功')
                    }
                })
            }
            this.delImages = fileList
        }
    }
}
</script>
<style scoped lang='scss'>
    .add-free-btn {
        float: right;
        margin-bottom: 3px;
    }
</style>
