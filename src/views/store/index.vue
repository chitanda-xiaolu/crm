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
                @click="addStore()">新增</el-button>
        </div>
        <best-tables
            :dataList="storeList"
            :optBtnList="this.optBtnList()"
            :specialClass="specialClass"
            :total="total"
            @optThisRow="addOrUpdateHandle" />
     </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import { mergeObject, queryParam, filterFalsy } from '@/utils/utils'
import { getStoreList } from '../../api/store'
import BtnConfig from '../../../config/operationList'

export default {
    name: 'product',
    components: {
        FormModule,
        BestTables
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            total: 0,
            storeList: [],
            dataForm: {
                activityName: '',
                activityStatus: '0'
            },
            specialClass: { className: 'invalid-row', id: 'storeStatusName', value: '关店' },
            distributorList: [],
            addOrUpdateVisible: false
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', activity: 'activity', distributor: 'distributor' })
    },
    mounted() {
        // 初始化分页
        this.getDataList()
        this.getDistributorList({ size: 1000 }).then(res => {
            this.setQueryToSingle({ key: this.key, name: 'distributorId', dataType: 'selectList', value: this.distributor.userList })
        })
    },
    methods: {
        ...mapActions({ getDistributorList: 'getDistributorList' }),
        ...mapMutations({ setQueryToSingle: 'SET_QUERYTOSINGLE' }),
        tableRowClassName({row}) { // 无效数据显示灰色
            if (row.storeStatus === 1) {
                return 'invalid-row'
            }
            return ''
        },
        // 行操作按钮
        optBtnList() {
            return BtnConfig['store']['btns']
        },
        // 获取数据列表
        getDataList() {
            let _self = this
            let param = mergeObject(queryParam(_self.queryData.query[_self.key].dataForm), _self.queryData.query[_self.key].pagination)
            getStoreList(filterFalsy(param)).then(result => {
                if (result.code === 200 && result.success) {
                    _self.storeList = result.data.records || []
                    _self.total = result.data.total
                }
            })
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        addStore() {
            this.$router.push('/store/add')
        },
        addOrUpdateHandle(row) {
            this.$router.push({
                path: '/store/edit',
                query: {id: row.id, distributorId: row.distributorId}
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
</style>
