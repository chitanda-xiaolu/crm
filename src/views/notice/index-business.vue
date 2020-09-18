<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn">
            <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin-bottom:8px"
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
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import { mapState } from 'vuex'
import { businessNoticeList } from '@/api/notice'
import { filterFalsy, mergeObject, queryParam } from '@/utils/utils'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'business',
    components: {
        FormModule, BestTables
    },
    data() {
        return {
            key: this.$route.name,
            platform: 1,                    // 总部
            labelPosition: 'right',
            dataForm: {
                publicTime: '',
                title: ''
            },
            specialClass: { className: 'invalid-row', id: 'status', value: 1 },
            noticeList: [],
            total: 0
        }
    },
    mounted() {
        this.getDataList()
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    methods: {
        // 行操作按钮
        optBtnList() {
            return BtnConfig.business.btns
        },
        getDataList(query) {
            let _self = this
            let param = mergeObject(queryParam(_self.queryData.query[_self.key].dataForm), _self.queryData.query[_self.key].pagination)
            if (param.publicTime && param.publicTime.length) {
                param.startTime = param.publicTime[0]
                param.endTime = param.publicTime[1]
                param.publicTime = ''
            } else {
                delete param.startTime
                delete param.endTime
            }
            businessNoticeList(filterFalsy(param)).then(result => {
                if (result.code === 200 && result.success) {
                    _self.noticeList = result.data.records || []
                    _self.total = result.data.total
                }
            })
        },
        // 新增 / 修改
        addOrUpdateHandle(row) {
            if(row && row.id) {
                this.$router.push({
                    path: '/business/notice_edit/' + row.id
                })
            } else {
                this.$router.push({
                    path: '/business/notice_add'
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
