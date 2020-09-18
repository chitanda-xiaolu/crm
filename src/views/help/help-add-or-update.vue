<template>
    <vue-scroll :ops="scrollops">
        <div class="notice-container">
            <el-form
                :model="dataForm"
                :rules="dataRule"
                ref="dataForm"
                label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="分类：" class="sort" prop="type">
                            <el-radio-group v-model="dataForm.type">
                                <el-radio label='1'>总部</el-radio>
                                <el-radio label='2'>经销商</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="编号：" prop="number">
                            <el-input v-model="dataForm.number" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-tooltip v-show="showHelpTip" class="item" style="position:absolute" effect="dark" content="使用帮助" placement="top-start">
                        <el-button type="info" @click="gethelpDetail" circle>？</el-button>
                    </el-tooltip>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="标题：" prop="title">
                            <el-input v-model="dataForm.title" placeholder="请输入" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="内容：" prop="content" class="mavon-editors">
                            <mavon-editor
                                @imgAdd="addImages"
                                ref="md"
                                @change="changeContent"
                                :value="dataForm.content" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="帮助状态：" size="mini" prop="status">
                            <el-radio-group v-model="dataForm.status">
                                <el-radio label='0'>有效</el-radio>
                                <el-radio label='1'>无效</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item >
                            <el-button type="primary" @click="dataFormSubmit('dataForm')">提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <Help-dialog ref="helpDetailDom" v-if="helpDialogVisible"></Help-dialog>
        </div>
    </vue-scroll>
</template>
<script>
import { createHelp, editHelp, helpDetail } from '@/api/useHelp'
import { selectObj } from '@/utils/utils'
import { mapActions, mapMutations } from 'vuex'
import { uploadFile } from '@/api/app'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { escape2Html } from '@/utils/validate'
import HelpDialog from '../../components/common/commonHelp'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    components: {
        mavonEditor,
        HelpDialog
    },
    data () {
        return {
            helpDialogVisible: false,   // 使用帮助显示隐藏
            showHelpTip: false,
            scrollops: scrollConfig,
            managerList: [],
            visible: true,
            dataForm: {
                title: '',
                status: '0',
                type: '1',
                content: '',
                number: ''
            },
            html: '',
            dataRule: {
                type: [
                    { required: true, message: '分类不能为空', trigger: 'change' }
                ],
                number: [
                    { required: true, message: '编号不能为空', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '标题不能为空', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '帮助状态不能为空', trigger: 'change' }
                ]
            }
        }
    },
    mounted() {
        let initData = this.$route.params.id
        if(!initData) return
        if (initData) {
            this.showHelpTip = true
            helpDetail(initData).then(result => {
                let html = result.content.replace(/& /gi, '&')
                const nodes = result
                const query = selectObj(nodes, ['title', 'content', 'status', 'number', 'publicTime', 'type'])
                query.status = query.status.toString()
                query.content = escape2Html(html)
                query.type = query.type.toString()
                this.dataForm = { ...query }
            })
        }
    },
    methods: {
        ...mapActions({getnoticeList: 'getnoticeList'}),
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        addImages(pos, $file) {
            let _self = this
            var formdata = new FormData()
            formdata.append('file', $file)
            formdata.append('type', 1)
            uploadFile(formdata).then((res) => {
                if (res.code === 200 && res.success) { // axios 请求成功
                    let url = res.data
                    _self.$refs.md.$img2Url(pos, url)
                }
            })
        },
        gethelpDetail() {
            this.helpDialogVisible = true
            this.$nextTick(() => {
                this.$refs.helpDetailDom.init('P-SYBZ-0001')
            })
        },
        changeContent(value, render) { // 值, html
            this.html = value
        },
        dataFormSubmit() {
            let _self = this
            let paramsId = _self.$route.params.id
            _self.$refs['dataForm'].validate(valid => {
                if (valid) {
                    const params = _self.dataForm
                    params.content = _self.html
                    if(paramsId) {
                        params.id = paramsId
                        editHelp(params).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success('编辑成功')
                                _self.closeCurrentPage(this.$route.fullPath)
                                _self.$router.push('/help')
                                _self.getnoticeList()
                            } else {
                                _self.$message.error(result.data.message || '编辑失败')
                            }
                        })
                    }else {
                        createHelp(params).then(result => {
                            if(result.code === 200 && result.success) {
                                _self.$message.success('新增成功')
                                _self.closeCurrentPage(this.$route.fullPath)
                                _self.$router.push('/help')
                                _self.getnoticeList()
                            } else {
                                _self.$message.error(result.data.message || '新增失败')
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .notice-container {
        padding: 25px 80px 0 10px;
        /deep/ .ql-container {
            height: 456px;
            overflow: auto;
        }
    }
    .row {
        display: flex;
    }
    .sort /deep/ .el-form-item__content {
        width: 100%;
    }
    .mavon-editors {
        height:500px;
        overflow:auto
    }
     .v-note-wrapper {
        height: 498px;
    }
    .el-button--small.is-circle {
        /* padding: 5px; */
        padding: 6px 1px 1px 7px;
        text-align: center;
        font-size: 16px;
    }
</style>
