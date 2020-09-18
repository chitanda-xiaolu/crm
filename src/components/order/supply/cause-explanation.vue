<template>
    <el-dialog
        title="原因说明"
        :visible.sync="causeVisible"
        :append-to-body="true"
        @open="openDialog"
        :modal-append-to-body="false"
        :close-on-click-modal="false">
        <el-tabs v-model="activeName">
            <el-tab-pane label="总部" name="first">
                <mavon-editor
                    @imgAdd="addImages"
                    ref="md"
                    @change="changeContent"
                    v-model="readcontent"/>
            </el-tab-pane>
            <el-tab-pane label="经销商" name="second">
                 <mavon-editor
                    @imgAdd="addImages"
                    ref="md"
                    @change="changeContent"
                    :toolbarsFlag='false'
                    :subfield='false'
                    defaultOpen="preview"
                    v-model="readonlycontent"/>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmitProducts">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { uploadFile } from '@/api/app'
import { escape2Html } from '@/utils/validate'
import { addReasonDescribe, editReasonDescribe, suppleReason } from '@/api/order'
import { filterFalsy } from '@/utils/utils'
export default {
    name: 'lAddFinishProductDialog',
    components: {
        mavonEditor
    },
    data() {
        return {
            causeVisible: false,
            readcontent: '',
            readonlycontent: '',
            activeName: 'first',
            productionOrderId: '',
            editObj: {},
            addOrEdit: 'add',
            id: '',
            description: ''
        }
    },
    methods: {
        openDialog() {
            this.readcontent = ''
            this.readonlycontent = ''
            this.activeName = 'first'
            this.getsuppleReason()
        },
        getsuppleReason() {
            let productionOrderId = this.productionOrderId
            suppleReason({productionOrderId}).then((res) => {
                if (res.code === 200 && res.success) {          // axios 请求成功
                    if(res.data.length) {
                        let plat = res.data
                        plat.map(item => {
                            if(item.platform === 1) { // 总部
                                this.addOrEdit = 'edit'
                                this.readcontent = escape2Html(item.description.replace(/& /gi, '&'))
                                this.id = item.id
                                this.productionOrderId = item.productionOrderId
                                this.description = item.description
                            } else if(item.platform === 2) { // 经销商
                                this.readonlycontent = escape2Html(item.description.replace(/& /gi, '&'))
                            }
                        })
                    } else {
                        this.addOrEdit = 'add'
                        this.readcontent = ''
                        this.readonlycontent = ''
                    }
                }
            })
        },
        geteditReasonDescribe() {
            editReasonDescribe({...this.editObj}).then((res) => {
                if (res.code === 200 && res.success) {          // axios 请求成功
                    this.readcontent = escape2Html(res.data.description)
                }
            })
        },
        handleSubmitProducts() {
            let productionOrderId = this.productionOrderId
            let htmls = this.readcontent && this.readcontent.replace(/& /gi, '&')
            let description = escape2Html(htmls)
            let query = {}
            query.productionOrderId = productionOrderId
            query.description = description
            query.id = this.id
            if(this.addOrEdit === 'add') {
                query.id = ''
                addReasonDescribe(filterFalsy(query)).then((res) => {
                    if (res.code === 200 && res.success) {          // axios 请求成功
                        this.$message.success('操作成功')
                        this.causeVisible = false
                    }
                })
            } else {
                editReasonDescribe(filterFalsy(query)).then((res) => {
                    if (res.code === 200 && res.success) {          // axios 请求成功
                        this.$message.success('操作成功')
                        this.causeVisible = false
                    }
                })
            }
        },
        addImages(pos, $file) {
            var formdata = new FormData()
            formdata.append('file', $file)
            uploadFile(formdata).then((res) => {
                if (res.code === 200 && res.success) {          // axios 请求成功
                    let url = res.data
                    this.$refs.md.$img2Url(pos, url)
                }
            })
        },
        changeContent(value, render) {                          // 值, html
            this.html = value
        }
    }
}
</script>
<style lang="scss" scoped>
    /deep/ .el-dialog__body {
        height: 400px;
        overflow: auto;
    }
</style>
