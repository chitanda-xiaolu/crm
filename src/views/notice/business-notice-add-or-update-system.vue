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
                        <el-form-item label="分类:" class="sort" prop="type">
                            <el-radio-group v-model="dataForm.type">
                                <el-radio label='1'>总部</el-radio>
                                <el-radio label='2'>经销商</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发布日期:" prop="publicTime">
                            <el-date-picker
                                v-model="dataForm.publicTime"
                                type="date"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="dataForm.type === '2'">
                    <el-col :span="12">
                        <el-form-item label="经销商:" class="sort">
                            <el-radio-group v-model="checkDistributors">
                                <el-radio label='1'>全部</el-radio>
                                <el-radio label='2'>指定</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-show="checkDistributors === '2' && dataForm.type === '2'">
                    <el-col :span="24">
                        <el-form-item>
                            <el-select
                                v-model="selectDistributors"
                                class="width-all"
                                multiple
                                filterable
                                clearable
                                loading-text="搜索中..."
                                default-first-option
                                placeholder="请选择指定经销商">
                                <el-option
                                    v-for="item in distributor.userList"
                                    :key="item.id"
                                    :label="item.name + ' 【' + item.areaName + '】'"
                                    :disabled="item.status === 1"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="标题:" prop="title">
                            <el-input v-model="dataForm.title" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="内容:" prop="content" class="mavon-editors">
                            <mavon-editor
                                @imgAdd="addImages"
                                ref="md"
                                @change="changeContent"
                                :value="dataForm.content"/>
                        </el-form-item>
                    </el-col>
                    <el-tooltip v-show="showHelpTip" class="item" style="position:absolute" effect="dark" content="使用帮助" placement="top-start">
                        <el-button type="info" @click="gethelpDetail" circle>？</el-button>
                    </el-tooltip>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公告状态：" size="mini" prop="status">
                            <el-radio-group v-model="dataForm.status">
                                <el-radio label='0'>有效</el-radio>
                                <el-radio label='1'>无效</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="dataFormSubmit('dataForm')" icon="el-icon-position">保存</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        <Help-dialog ref="helpDetailDom" v-if="helpDialogVisible"></Help-dialog>
        </div>
    </vue-scroll>
</template>
<script>
import scrollConfig from '../../../config/scroll' // 滚动条配置项
import { businessCreateNotice, businessEditNotice, businessNoticeDetail } from '@/api/notice'
import { uploadFile } from '@/api/app'
import { selectObj } from '@/utils/utils'
import { mapState, mapMutations, mapActions } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { escape2Html } from '@/utils/validate'
import HelpDialog from '../../components/common/commonHelp'
export default {
    props: ['dept', 'editdept'],
    components: {
        mavonEditor,
        HelpDialog
    },
    data () {
        return {
            scrollops: scrollConfig,
            showHelpTip: true,
            helpDialogVisible: false,   // 使用帮助显示隐藏
            managerList: [],
            visible: true,
            dataForm: {
                title: '',
                status: '0',
                type: '1',
                publicTime: '',
                content: ''
            },
            selectDistributors: '',
            checkDistributors: '1',
            html: '',
            dataRule: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                publicTime: [
                    { required: true, message: '发布时间不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '状态不能为空', trigger: 'blur' }
                ],
                platform: [
                    { required: true, message: '系统分类不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ distributor: 'distributor' })
    },
    mounted() {
        this.getDistributorList({ size: 10000 })
        let initData = this.$route.params.id
        if (!initData) return
        businessNoticeDetail({id: initData}).then(result => {
            this.showHelpTip = false
            let html = result.data.content.replace(/& /gi, '&')
            const nodes = result.data
            const query = selectObj(nodes, ['title', 'content', 'status', 'type', 'publicTime'])
            if (nodes.distributorList.length) {
                this.checkDistributors = '2'
                nodes.distributorList.forEach(item => {
                    this.selectDistributors.push(item.distributorId)
                })
            }
            query.status = query.status.toString()
            query.content = escape2Html(html)
            query.type = query.type.toString()
            this.dataForm = { ...query }
        })
    },
    methods: {
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        ...mapActions({
            getNoticeList: 'getNoticeList',
            getDistributorList: 'getDistributorList'
        }),
        gethelpDetail() {
            this.helpDialogVisible = true
            this.$nextTick(() => {
                this.$refs.helpDetailDom.init('Z-YWGG-0001')
            })
        },
        addImages(pos, $file) {
            var formdata = new FormData()
            formdata.append('file', $file)
            formdata.append('type', 1)
            uploadFile(formdata).then((res) => {
                if (res.code === 200 && res.success) {          // axios 请求成功
                    let url = res.data
                    this.$refs.md.$img2Url(pos, url)
                }
            })
        },
        changeContent(value, render) {                          // 值, html
            this.html = value
        },
        dataFormSubmit() {
            let _self = this
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    if (!(this.checkDistributors === '2' && this.dataForm.type === '2')) {
                        this.selectDistributors = ''
                    }
                    const params = _self.dataForm
                    params.content = _self.html
                    params.platform = '1'
                    if (_self.selectDistributors.length) params.distributorIds = _self.selectDistributors.toString()
                    if(this.$route.params.id) {
                        params.id = this.$route.params.id
                        businessEditNotice(params).then(result => {
                            if(result.code === 200 && result.success) {
                                this.$message.success('编辑成功')
                                this.closeCurrentPage(this.$route.fullPath)
                                this.$router.push('/business/notice')
                            } else {
                                _self.$message.error(result.data.message || '编辑失败')
                            }
                        })
                    } else {
                        businessCreateNotice(params).then(result => {
                            if(result.code === 200 && result.success) {
                                this.$message.success('新增成功')
                                this.closeCurrentPage(this.$route.fullPath)
                                this.$router.push('/business/notice')
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
        width: 98%;
        box-sizing:border-box;
        /deep/ .ql-container {
            height: 456px;
            overflow: auto;
        }
    }
    // .scroll-box {
    //     width: calc(100% - 16px);
    // }
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
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
    .el-button--small.is-circle {
        padding: 6px 1px 1px 7px;
        text-align: center;
        font-size: 16px;
    }
    .v-note-wrapper {
        height: 498px;
    }
</style>
