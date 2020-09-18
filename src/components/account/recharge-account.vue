<!--
 * @Description: 账号管理
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-21 14:38:49
 * @LastEditors: Zale Ying
 -->
<template>
    <div style="height:100%">
        <el-button type="primary" icon="el-icon-plus" @click="addAccount" size="mini" plain style="margin-bottom: 4px;">新增</el-button>
        <el-table
            :data="accountState.paymentAccountList"
            highlight-current-row
            border
            height="94%"
            :header-cell-style="{'background-color': '#f0f0f0'}">
            <el-table-column type="index" width="50" label="序号">
                <template slot-scope="scope"><span>{{(rechargePage.current - 1) * rechargePage.size + scope.$index + 1}}</span></template>
            </el-table-column>
            <el-table-column property="accountTypeName" label="账号类型"></el-table-column>
            <el-table-column property="accountHolder" label="持有者"></el-table-column>
            <el-table-column property="account" label="账号"></el-table-column>
            <el-table-column property="corporateTypeName" label="对公类型"></el-table-column>
            <el-table-column property="createTime" label="创建时间"></el-table-column>
            <el-table-column property="createUserName" label="创建人"></el-table-column>
            <el-table-column property="opt" label="操作">
                 <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        icon="el-icon-edit"
                        @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <AddAccountNumber ref="addaccountnumberDom"/>
        <EditAccountNumber ref="editaccountnumberDom"/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AddAccountNumber from '@/components/account/add-account-number'
import EditAccountNumber from '@/components/account/edit-account-number'
export default {
    components: {
        AddAccountNumber,
        EditAccountNumber
    },
    data () {
        return {
            dataSource: [],
            rechargePage: {
                size: 20,
                current: 1
            }
        }
    },
    computed: {
        ...mapState({ accountState: 'account' })
    },
    watch: {
        $route(to, from) {
            if(to.path.split('/').length === 5) {
                this.getDataList()
            }
        }
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapActions({ paymentAccountData: 'paymentAccountData' }),
        getDataList() {
            let id = this.$route.params.disId
            this.paymentAccountData({ distributorId: id })
        },
        edit(row) {
            this.$refs.editaccountnumberDom.visible = true
            this.$nextTick(() => {
                this.$refs.editaccountnumberDom.init(row.id, row.distributorId)
            })
        },
        addAccount() {
            this.$refs.addaccountnumberDom.visible = true
            this.$nextTick(() => {
                this.$refs.addaccountnumberDom.init(this.$route.params.disId)
            })
        }
    }
}
</script>
<style scoped lang="scss">
     @import "../../assets/scss/post_role/index";
</style>
