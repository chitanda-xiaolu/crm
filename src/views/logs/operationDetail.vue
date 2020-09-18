<template>
    <div class="main-box dis-flex-col">
        <vue-scroll :ops="scrollops">
            <div class="info-list">
                <el-divider content-position="left">基础信息</el-divider>
                <el-row class="info-content">
                    <el-col :span="8">
                        <span>业务ID:</span>
                        <span>{{ operationLogId }}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>用户名称:</span>
                        <span>{{ userName }}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>日志名称:</span>
                        <span>{{ logName }}</span>
                    </el-col>
                </el-row>
                <el-row class="info-content">
                    <el-col :span="8">
                        <span>方法名:</span>
                        <span>{{ method }}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>创建时间:</span>
                        <span>{{ createTime }}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>状态:</span>
                        <span>{{ succeed }}</span>
                    </el-col>
                </el-row>
                <el-row class="info-content">
                    <el-col :span="8">
                        <span>日志类型:</span>
                        <span>{{ logType }}</span>
                    </el-col>
                    <el-col :span="8">
                        <span>类名:</span>
                        <span>{{ className }}</span>
                    </el-col>
                </el-row>
                <el-row class="info-content">
                    <el-col class="width-all dis-flex-row" :span="24">
                        <span>业务信息:</span>
                        <span>{{ regularMessage }}</span>
                    </el-col>
                </el-row>
            </div>
        </vue-scroll>
    </div>
</template>

<script>
import { operationDetail } from '@/api/logs'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    data() {
        return {
            scrollops: scrollConfig,
            operationLogId: '',
            logName: '',
            userName: '',
            method: '',
            className: '',
            createTime: '',
            succeed: '',
            regularMessage: '',
            logType: ''
        }
    },
    watch: {
        '$route' (to, from) {
            if(to.meta.title === '业务详情') {
                this.init()
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let _self = this
            operationDetail(_self.$route.params).then(result => {
                if (result.code === 200 && result.success) {
                    let data = result.data
                    for (let i in _self._data) {
                        _self[i] = data[i]
                    }
                    _self.codeList = []
                    _self.codeList.push(data.provinceCode)
                    data.cityCode && _self.codeList.push(data.cityCode)
                    data.countyCode && _self.codeList.push(data.countyCode)
                } else {
                    _self.$message.error(result.message || '服务器异常')
                }
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.info-list {
    width: 95%;
    height: auto;
    margin: 0 auto;
    position: relative;
    &>.info-content {
        width: 90%;
        @include marginDbl(30px, auto);
        &>.el-col {
            width: 33%;
            span {
                display: inline-block;
                width: 100px;
            }
            span:nth-child(1) {
                text-align: right;
            }
            span:nth-child(2) {
                @include paddingLeft(25px);
                width: calc(100% - 125px);
            }
        }
    }
    .edit-position {
        position: absolute;
        top: 31px;
        right:0;
    }
    .width-all {
        width: 100% !important;
    }
}
</style>
