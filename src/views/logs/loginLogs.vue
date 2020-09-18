<!--
 * @Description: 登录日志管理
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-27 13:04:39
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <best-tables
            :data-list="logsList"
            :total="total"/>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { loginLogs } from '@/api/logs'
import { filterFalsy, mergeObject, queryParam } from '@/utils/utils'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
export default {
    name: 'loginlog',
    components: {
        BestTables,
        FormModule
    },
    data() {
        return {
            key: this.$route.name,
            dataForm: {
                logUserName: ''
            },
            logsList: [],
            dataListLoading: false,
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
            let _self = this
            let param = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm))
            _self.dataListLoading = true
            loginLogs(filterFalsy(param)).then(result => {
                let data = result.data
                _self.logsList = data.records
                _self.total = data.total
                _self.dataListLoading = false
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
</style>
