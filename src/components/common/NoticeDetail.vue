<!--
 * @Description: 公告查看组件
 * @Author: Zale Ying
 * @Date: 2020-03-04 13:58:48
 * @LastEditTime: 2020-06-12 11:23:42
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="notice-container">
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="50%">
            <el-form
                :model="DetaildataForm"
                ref="dataForm">
                <div class="title-box">
                    <p class="notice-title">{{DetaildataForm.title}}</p>
                    <p class="notice-date">{{DetaildataForm.publicTime}}</p>
                </div>
                <mavon-editor
                    :subfield='false'
                    :scrollStyle='true'
                    defaultOpen="preview"
                    :toolbars="{navigation: true, fullscreen: true}"
                    :value="DetaildataForm.content" />
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { escape2Html } from '@/utils/validate'
import { selectObj } from '@/utils/utils'
import { businessNoticeDetail, noticeDetail } from '@/api/home'
export default {
    components: {
        mavonEditor
    },
    props: ['lookId'],
    data () {
        return {
            dialogVisible: false,
            selectDistributors: '',
            html: '',
            id: '',
            DetaildataForm: {
                title: '',
                publicTime: '',
                content: ''
            }
        }
    },
    methods: {
        init(id, tag) {
            this.dialogVisible = true
            this.id = id
            if(tag === 'business') {
                this.getBusiness()
            } else if(tag === 'system') {
                this.getSystem()
            }
        },
        // 渲染模版
        renderHtml(html) {
            let htmls = html.content && html.content.replace(/& /gi, '&')
            const query = selectObj(html, ['title', 'content', 'releaseTime', 'publicTime'])
            query.releaseTime = query.releaseTime && query.releaseTime.slice(0, 10)
            query.publicTime = query.publicTime && query.publicTime.slice(0, 10)
            query.content = escape2Html(htmls)
            this.DetaildataForm = { ...query }
        },
        getBusiness() {
            businessNoticeDetail({id: this.id}).then(result => {
                const nodes = result.data
                this.renderHtml(nodes)
            })
        },
        getSystem() {
            noticeDetail({id: this.id}).then(result => {
                const nodes = result.data
                this.renderHtml(nodes)
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../assets/scss/notice/notice-detail';
</style>
