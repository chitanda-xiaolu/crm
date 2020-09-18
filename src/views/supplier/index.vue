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
                @click="addSupplier()">新增</el-button>
                <el-link href="/supplier/statistics" style="margin-left: 10px"><el-button size="mini" plain type="primary"><i class="el-icon-document"></i>供应商报表</el-button></el-link>
        </div>
        <best-tables
            :dataList="distributorList"
            :specialClass="specialClass"
            :total="total" />
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update ref="addOrUpdate"></add-or-update>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { supplierList } from '@/api/supplier' // 供应商api
import AddOrUpdate from '@/components/supplier/supplier-add-update'
// import AddOrUpdate from '@/components/supplier/AddOrupdate'
import BestTables from '@/components/common/BestTable.vue'
import { mergeObject, filterFalsy, queryParam } from '@/utils/utils'
import FormModule from '@/components/common/Forms.vue'
// import { exportDistributorList } from '@/api/export'
export default {
    name: 'supplier',
    components: {
        BestTables,
        FormModule,
        AddOrUpdate // 编辑或新增供应商弹窗
    },
    data() {
        return {
            key: this.$route.name, // 当前页面路由的路由名称
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
            supplierDialogStatus: false                // 是否显示弹出层
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
        ...mapMutations({ setDialogStatus: 'SET_SUPPLIER_DIALOGSTATUS' }),
        // 获取数据列表
        getDataList() {
            let param = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm)) // 将页码对象和表头对象合并成一个对象
            // 如果合并对象里边的publicTime存在且长度不为零
            if (param.publicTime && param.publicTime.length) {
                param.startTime = param.publicTime[0]
                param.endTime = param.publicTime[1]
                param.publicTime = ''
            } else {
                delete param.startTime
                delete param.endTime
            }
            // 获取供应商列表信息
            supplierList(filterFalsy(param)).then(result => {
                // 当请求成功且能够拿到数据时进行供应商列表数组distributorList的初始化
                if (result.code === 200 && result.success) {
                    let data = result.data
                    this.distributorList = data.records
                    // console.log(this.distributorList)
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
        addSupplier() {
            this.setDialogStatus(true)
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
