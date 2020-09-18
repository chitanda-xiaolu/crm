<!--
 * @Description:
 * @Author: 陈桃
 * @Date: 2019-08-30 11:30:06
 * @LastEditTime: 2020-03-04 10:32:49
 * @LastEditors: 陈桃
 -->
<template>
    <div class="notice-container">
        <el-dialog
            title="使用帮助"
            :visible.sync="dialogVisible"
            width="40%">
           <el-form
            :model="DetaildataForm"
            ref="dataForm"
            label-width="100px">
            <div class="title-box">
                <h2>{{DetaildataForm.title}}</h2>
                <p class="notice-date" v-show="DetaildataForm.releaseTime">更新时间：{{DetaildataForm.releaseTime}}</p>
            </div>
            <mavon-editor
                :subfield='false'
                :scrollStyle='true'
                defaultOpen="preview"
                :toolbars="{navigation: true}"
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
import { helpDetailByNo } from '@/api/useHelp'
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
            DetaildataForm: {
                title: '',
                releaseTime: '',
                content: ''
            }
        }
    },
    methods: {
        init(data) {
            this.dialogVisible = true
            helpDetailByNo(data).then(result => {
                let html = result.content.replace(/& /gi, '&')
                const nodes = result
                const query = selectObj(nodes, ['title', 'content', 'releaseTime'])
                query.content = escape2Html(html)
                this.DetaildataForm = { ...query }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .notice-container {
        padding: 25px 80px 0 10px;
        .title-box {
            display: flex;
            h2 {
                margin-right: 30px;
                margin-top: -22px;
            }
            .notice-date {
                color:#8c8888;
                font-size: 14px;
                margin-top: -15px;
            }
        }
    }
    .row {
        display: flex;
    }
    .sort /deep/ .el-form-item__content {
        width: 100%;
    }
    .el-button--small.is-circle {
        padding: 6px 1px 1px 7px;
        text-align: center;
        font-size: 16px;
    }
</style>
