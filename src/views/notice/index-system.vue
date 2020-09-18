<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn">
            <el-button
                class="margin-bottom-8"
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                @click="addOrUpdateHandle()">新增</el-button>
        </div>
        <best-tables
            :data-list="noticeList"
            :optBtnList="this.optBtnList()"
            :total="total"
            :specialClass="specialClass"
            @optThisRow="addOrUpdateHandle" />
    </div>
</template>
<script>
import { noticeList } from '@/api/notice'
import { mapState } from 'vuex'
import { filterFalsy, mergeObject, queryParam } from '@/utils/utils'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'system',
    components: {
        BestTables, FormModule
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            platform: 0,                            // 平台
            noticeList: [],
            specialClass: { className: 'invalid-row', id: 'status', value: 1 },
            total: 0
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        // 行操作按钮
        optBtnList() {
            return BtnConfig.system.btns
        },
        getDataList() {
            let param = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm))
            if (param.publicTime && param.publicTime.length) {
                param.startTime = param.publicTime[0]
                param.endTime = param.publicTime[1]
                param.publicTime = ''
            } else {
                delete param.startTime
                delete param.endTime
            }
            let _self = this
            noticeList(filterFalsy(param)).then(result => {
                if (result.code === 200 && result.success) {
                    _self.noticeList = result.data.records
                    _self.total = result.data.total
                }
            })
        },
        // 新增 or 修改
        addOrUpdateHandle(row) {
            if(row && row.id) {
                this.$router.push({
                    path: '/system/notice_edit/' + row.id
                })
            } else {
                this.$router.push({
                    path: '/system/notice_add'
                })
            }
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
<style scoped lang="scss">
    .float-right {
       /deep/ &>.el-form-item__content {
            float: right;
        }
    }
</style>
