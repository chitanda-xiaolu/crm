<!--
 * @Description: 活动列表
 * @Author: 陈桃
 * @Date: 2019-08-13 14:53:21
 * @LastEditTime: 2020-04-27 11:19:40
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn" v-if="hasPermission(Permission.marketActivity.create.code)">
            <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="addActivity()">新增</el-button>
        </div>
        <best-tables
            :data-list="activity.activityList"
            :optBtnList="this.optBtnList()"
            :specialClass="specialClass"
            :total="activity.total"
            @optThisRow="addOrUpdateHandle" />
     </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import { mergeObject, filterFalsy, queryParam } from '@/utils/utils'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'activity',
    components: {
        BestTables,
        FormModule
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            dataForm: {
                activityName: '',
                activityStatus: '0'
            },
            specialClass: { className: 'invalid-row', id: 'activityStatusName', value: '无效' },
            distributorList: [],
            addOrUpdateVisible: false
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', activity: 'activity' })
    },
    mounted() {
        // 初始化分页
        this.getDataList()
    },
    methods: {
        ...mapActions({ getDistributorList: 'getDistributorList', getactiveList: 'getactiveList' }),
        // 行操作按钮
        optBtnList() {
            return BtnConfig.activity.btns
        },
        tableRowClassName({row}) { // 无效数据显示灰色
            if (row.activityStatus === 1) {
                return 'invalid-row'
            }
            return ''
        },
        // 获取数据列表
        getDataList() {
            let param = mergeObject(queryParam(this.queryData.query[this.key].dataForm), this.queryData.query[this.key].pagination)
            this.getactiveList(filterFalsy(param))
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        addActivity() {
            this.$router.push('/marketActivity/add')
            this.getDistributorList({size: 10000})
        },
        addOrUpdateHandle(row) {
            this.$router.push('/marketActivity/edit/' + row.id)
            this.getDistributorList({size: 10000})
        }
    }
}
</script>

<style scoped lang='scss'>
    a {
        color: $linkColor;
    }
    /deep/ .el-table .invalid-row {
        color: #b5b4b4;
    }
</style>
