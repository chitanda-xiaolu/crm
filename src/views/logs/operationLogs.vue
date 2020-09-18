<!--
 * @Description: 业务日志管理
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-27 13:07:20
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <best-tables
            :data-list="logsList"
            :total="total" />
    </div>
</template>
<script>
import { mergeObject, filterFalsy, queryParam } from '@/utils/utils'
import { mapState } from 'vuex'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import { operationLogs } from '@/api/logs'
export default {
    name: 'operationlog',
    components: {
        BestTables,
        FormModule
    },
    data() {
        return {
            key: this.$route.name,
            dataForm: {
                logUserName: '',
                logType: ''
            },
            logsList: [],                       // 日志列表数据
            total: 0
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    mounted() {
        // 初始化分页
        this.getDataList()
    },
    methods: {
        // 获取数据列表
        getDataList() {
            let query = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm))
            let _self = this
            operationLogs(filterFalsy(query)).then(result => {
                let data = result.data
                _self.logsList = data.records
                _self.total = data.total
            })
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        }
    }
}
</script>

<style scoped lang='scss'>
a {
    color: $linkColor;
}
/deep/ .el-form-item {
    width: 405px !important;
}
/deep/ .el-radio {
    font-weight: 200
}
</style>
