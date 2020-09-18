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
                @click="addDealer()">新增</el-button>
            <el-button
                size="mini"
                icon="el-icon-printer"
                type="warning"
                plain
                style="margin-bottom:8px"
                @click="exportDealer()">导出</el-button>
        </div>
        <best-tables
            :dataList="distributorList"
            :specialClass="specialClass"
            :total="total" />
        <add-or-update ref="addOrUpdate"></add-or-update><!--新增、编辑弹窗-->
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { dealerList } from '@/api/dealer'
import AddOrUpdate from '@/components/dealer/dealer-add-update'
import BestTables from '@/components/common/BestTable.vue'
import { mergeObject, filterFalsy, queryParam, exportFile } from '@/utils/utils'
import FormModule from '@/components/common/Forms.vue'
import { exportDistributorList } from '@/api/export'
export default {
    name: 'distributor',
    components: {
        BestTables,
        FormModule,
        AddOrUpdate
    },
    data() {
        return {
            key: this.$route.name,
            dataForm: {
                name: '',
                phone: '',
                roleName: '',
                code: '',
                publicTime: '',
                areaName: ''
            },
            specialClass: { className: 'invalid-row', id: 'status', value: 1 },
            distributorList: [],
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false,
            isArea: true,
            total: 0,
            dialogStatus: false                // 是否显示弹出层
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', appData: 'app' })
    },
    mounted() {
        // 初始化分页
        this.getDataList()
    },
    methods: {
        ...mapMutations({ setDialogStatus: 'SET_DIALOGSTATUS' }),
        // 获取数据列表
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
            dealerList(filterFalsy(param)).then(result => {
                if (result.code === 200 && result.success) {
                    let data = result.data
                    this.distributorList = data.records
                    this.total = data.total
                } else {
                    this.$message.error('操作失败')
                }
            })
        },
        // 无效数据显示灰色
        tableRowClassName({row}) {
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
        // 新增经销商弹出框
        addDealer() {
            this.setDialogStatus(true)
        },
        // 导出表单
        exportDealer() {
            exportDistributorList(queryParam(this.queryData.query[this.key].dataForm)).then(result => {
                exportFile(result, '经销商列表')
            }).catch(error => {
                this.$message.error(error)
            })
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
    /deep/ .el-table tr {
        height: 49px;
    }
</style>
