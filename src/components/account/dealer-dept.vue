<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left">
            <dealer-tree @getDeptDataFromTree="getDeptData" @emitDistributorId="getemitDistributorId"/>
        </div>
        <div class="main-box-right dis-flex-col">
            <el-button class="add-store" size="mini" type="primary" @click="createStore" plain><i class="el-icon-plus"></i>新增门店</el-button>
            <best-tables
                :data-list="userList"
                :total="total"
                :optBtnList="this.optBtnList()"
                @optThisRow="resetPassword" />
        </div>
    </div>
</template>

<script>
import DealerTree from './dealer-tree'
import BestTables from '../common/BestTable'
import { mapState } from 'vuex'
import { dealerUsers, dealerUserPassword } from '@/api/dealer'
import { mergeObject } from '@/utils/utils'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'accountDeptDatas',
    components: {
        DealerTree,
        BestTables
    },
    data() {
        return {
            key: 'accountDeptDatas',
            dataListLoading: false,
            userList: [],
            total: 0,
            deptId: '',
            emitDistributorId: ''
        }
    },
    computed: {
        ...mapState({ tableData: 'table', queryData: 'queryCondition' })
    },
    methods: {
        // 行操作按钮
        optBtnList() {
            return BtnConfig.deptAccount.btns
        },
        // 获取数据列表
        getDataList() {
            let _self = this
            let param = {
                deptId: _self.deptId,
                distributorId: _self.$route.params.disId
            }
            let query = mergeObject(this.queryData.query[this.key].pagination, param)
            dealerUsers(query).then(result => {
                if (result.code === 200 && result.success) {
                    _self.userList = result.data.records
                    _self.total = result.data.total
                }
            })
        },
        getDeptData(data) {
            if (this.deptId === data.value) return
            this.deptId = data.code ? '' : data.value
            this.getDataList()
        },
        getemitDistributorId(id) {
            this.emitDistributorId = id
        },
        resetPassword(data) {
            let _self = this
            dealerUserPassword({userId: data.id}).then(result => {
                if (result.code === 200 && result.success) {
                    _self.$message.success({message: `重置成功,当前密码是:${result.data.password}`, duration: 4000})
                } else {
                    _self.$message({
                        message: result.message || '请求错误',
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
            })
        },
        createStore() {
            this.$router.push({
                path: '/store/add',
                query: {id: this.emitDistributorId}
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

<style scoped lang="scss">
    .dis-flex-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    .main-box-left {
        overflow-y: auto;
    }
    .add-store{
        width: 90px;
        margin-bottom: 4px;
    }
</style>
