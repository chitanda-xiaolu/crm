<!--
 * @Description: 帮助中心页面
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-29 14:35:19
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn" v-if="hasPermission(Permission.help.create.code)">
            <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="addHandle()">新增</el-button>
        </div>
        <best-tables
            :data-list="help.helpList.records || []"
            :specialClass="specialClass"
            :optBtnList="this.optBtnList()"
            :total="help.helpList.total"
            @optThisRow="editHandle" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { filterFalsy, mergeObject, queryParam } from '@/utils/utils'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'help',
    components: {
        BestTables,
        FormModule
    },
    data() {
        return {
            key: this.$route.name,
            labelPosition: 'right',
            current: 1,
            size: 20,
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false,
            specialClass: { className: 'invalid-row', id: 'statusName', value: '无效' }
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', help: 'help' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapActions({gethelpList: 'gethelpList'}),
        // 行操作按钮
        optBtnList() {
            return BtnConfig.help.btns
        },
        getDataList() {
            let param = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm))
            if (param.releaseTime && param.releaseTime.length) {
                param.startDate = param.releaseTime[0]
                param.endDate = param.releaseTime[1]
                param.releaseTime = ''
            } else {
                delete param.startTime
                delete param.endTime
            }
            this.gethelpList(filterFalsy(param))
        },
        tableRowClassName({row}) { // 无效数据显示灰色
            if (row.status === 1) return 'invalid-row'
            return ''
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        // 新增 / 修改
        editHandle(row) {
            this.$router.push({
                path: '/help/platform/edit/' + row.id
            })
        },
        addHandle() {
            this.$router.push({
                path: '/help/platform/add'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    /deep/ .el-table .invalid-row {
        color: #b5b4b4;
    }
</style>
