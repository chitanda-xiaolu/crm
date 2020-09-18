<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <best-tables
            :data-list="account.accountPageList"
            :specialClass="specialClass"
            :optBtnList="this.optBtnList()"
            :total="account.accountPageTotal"
            @optThisRow="optThisRow" />
        <add-charge ref="addChargeDom"/>
        <add-rebate ref="addRebateDom"/>
        <add-account-number ref="addaccountnumberDom"/>
     </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BestTables from '@/components/common/BestTable.vue'
import { paymentAccountList } from '@/api/account'
import FormModule from '@/components/common/Forms.vue'
import { mergeObject, queryParam } from '@/utils/utils'
import addCharge from '@/components/account/add-cash-recharge'
import addRebate from '@/components/account/add-fanli-recharge'
import AddAccountNumber from '@/components/account/add-account-number'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'account',
    components: {
        BestTables,
        FormModule,
        addCharge,
        addRebate,
        AddAccountNumber
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            dataForm: {
                activityName: '',
                activityStatus: '0'
            },
            specialClass: { className: 'invalid-row', id: 'activityStatusName', value: '无效' }
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', account: 'account' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapActions({ accountPageData: 'accountPageData' }),
        // 行操作按钮
        optBtnList() {
            return BtnConfig.account.btns
        },
        // 操作按钮处理
        optThisRow(row, type) {
            switch(type) {
            case 'cash':
                this.cashHandle(row)
                break
            case 'fanli':
                this.rechargeHandle(row)
                break
            }
        },
        tableRowClassName({row}) { // 无效数据显示灰色
            let rowClass = row.activityStatus === 1 ? 'invalid-row' : ''
            return rowClass
        },
        // 获取数据列表
        getDataList() {
            let query = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm))
            this.accountPageData(query)
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        cashHandle(row) {
            paymentAccountList({distributorId: row.distributorId}).then(result => {
                if(result.code === 200 && result.success) {
                    if(result.data.length) {
                        this.$refs.addChargeDom.visible = true
                        this.$nextTick(() => {
                            this.$refs.addChargeDom.init(row.distributorId, row.id)
                        })
                    } else {
                        this.$confirm('暂无可用充值的账号，请先创建充值账号, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$refs.addaccountnumberDom.visible = true
                            this.$nextTick(() => {
                                this.$refs.addaccountnumberDom.init(row.distributorId)
                            })
                        })
                    }
                }
            })
        },
        rechargeHandle(row) {
            this.$refs.addRebateDom.visible = true
            this.$nextTick(() => {
                this.$refs.addRebateDom.init(row.distributorId, row.id)
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
