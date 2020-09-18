<template>
    <div>
        <div class="addbtn">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addCashHandle" plain>充值</el-button>
            <el-button type="danger" icon="el-icon-plus" size="mini" @click="addDeductionHandle" plain>扣款</el-button>
        </div>
        <el-tabs v-model="activeGrandchildTabName" type="card">
            <el-tab-pane label="充值" name="recharge">
                <div class="date">
                    <span>查询日期</span>
                    <el-date-picker
                        v-model="cashRechargeTime"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        @change="changeCashRechargeTime"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-table
                    :data="accountState.cashRechargeList"
                    highlight-current-row
                    border
                    :header-cell-style="{'background-color': '#f0f0f0'}"
                    style="margin-bottom: 5px;">
                    <el-table-column type="index" width="50" label="序号">
                        <template slot-scope="scope"><span>{{(rechargePage.current - 1) * rechargePage.size + scope.$index + 1}}</span></template>
                    </el-table-column>
                    <el-table-column property="money" align="right" label="金额（元）">
                        <template slot-scope="scope">
                            <span>{{renderMoney((scope.row.money || 0).toFixed(2))}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="account" label="充值信息"></el-table-column>
                    <el-table-column property="proofPath" label="凭证">
                       <template slot-scope="scope">
                            <viewer v-show="scope.row.proofPath" :images="scope.row.proofPathList" class="img-outer-box">
                                <img
                                    class="row-image-preview"
                                    v-for="(item, idx) in scope.row.proofPathList"
                                    :key="idx"
                                    :src="item">
                            </viewer>
                        </template>
                    </el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                    <el-table-column property="createTime" label="记录时间"></el-table-column>
                    <el-table-column property="createUserName" label="记录人"></el-table-column>
                </el-table>
                <el-pagination
                    v-show="false"
                    :current-page="rechargePage.current"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="rechargePage.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="0">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="扣款" name="deduction">
                <div class="date">
                    <span>查询日期</span>
                    <el-date-picker
                        v-model="cashDeductTime"
                        type="daterange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        @change="changeCashDeductTime"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-table
                    :data="accountState.cashRebateList"
                    highlight-current-row
                    border
                    :header-cell-style="{'background-color': '#f0f0f0'}"
                    style="margin-bottom: 5px;">
                    <el-table-column type="index" width="50" label="序号">
                        <template slot-scope="scope"><span>{{(rechargePage.current - 1) * rechargePage.size + scope.$index + 1}}</span></template>
                    </el-table-column>
                    <el-table-column property="customerName" label="客户姓名" width="120"></el-table-column>
                    <el-table-column property="deductTypeName" label="扣款类型" width="120"></el-table-column>
                    <el-table-column property="money" align="right" label="金额（元）" width="140">
                        <template slot-scope="scope">
                            <span>{{renderMoney((scope.row.money || 0).toFixed(2))}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="orderIds" label="扣款订单" width="200"></el-table-column>
                    <el-table-column property="createTime" label="扣款时间" width="170"></el-table-column>
                    <el-table-column property="createUserName" label="扣款人"></el-table-column>
                </el-table>
                <el-pagination
                    v-show="false"
                    :current-page="rechargePage.current"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="rechargePage.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="0">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
        <cashRecharge ref="cashrechargeDom"/>
        <cashDeduction ref="cashdeductionDom"/>
        <AddAccountNumber ref="addaccountnumberDom"/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import cashRecharge from '@/components/account/add-cash-recharge'
import cashDeduction from '@/components/account/add-cash-deduction'
import { paymentAccountList } from '@/api/account'
import AddAccountNumber from '@/components/account/add-account-number'
export default {
    components: {
        cashRecharge,
        cashDeduction,
        AddAccountNumber
    },
    props: ['distributorId'],
    data () {
        return {
            cashRechargeTime: '', // 现金充值日期
            cashDeductTime: '', // 现金扣款日期
            activeGrandchildTabName: 'recharge',
            searchRechargeTime: '',
            params: {
                distributorId: '',
                rechargeCategory: 0 // 充值，扣款
            },
            rechargePage: {
                size: 20,
                current: 1
            }
        }
    },
    watch: {
        $route(to, from) {
            if(to.path.split('/').length === 5) {
                this.getRechargeList()
                this.getDeductList()
            }
        }
    },
    computed: {
        ...mapState({accountState: 'account'})
    },
    mounted() {
        this.getRechargeList()
        this.getDeductList()
    },
    methods: {
        ...mapActions({cashRechargeData: 'cashRechargeData', cashRdeductionData: 'cashRdeductionData'}),
        // 充值列表
        getRechargeList() {
            let query = {}
            if(this.cashRechargeTime) {
                query.startDate = this.cashRechargeTime[0]
                query.endDate = this.cashRechargeTime[1]
            }
            query.rechargeCategory = 0
            query.distributorId = this.$route.params.disId
            this.cashRechargeData(query)
        },
        // 扣款列表
        getDeductList() {
            let query = {}
            if(this.cashDeductTime) {
                query.startDate = this.cashDeductTime[0]
                query.endDate = this.cashDeductTime[1]
            }
            query.deductCategory = 0
            query.distributorId = this.$route.params.disId
            this.cashRdeductionData(query)
        },
        // 修改现金充值日期
        changeCashRechargeTime(val) {
            this.getRechargeList()
        },
        // 修改现金扣款日期
        changeCashDeductTime(val) {
            this.getDeductList()
        },
        addCashHandle() {   // 现金充值
            paymentAccountList({distributorId: this.$route.params.disId}).then(result => {
                if(result.code === 200 && result.success) {
                    if(result.data.length) {
                        this.$refs.cashrechargeDom.visible = true
                        this.$nextTick(() => {
                            this.$refs.cashrechargeDom.init(this.$route.params.disId, this.$route.params.id)
                        })
                    } else {
                        this.$confirm('暂无可用充值的账号，请先创建充值账号, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$refs.addaccountnumberDom.visible = true
                            this.$nextTick(() => {
                                this.$refs.addaccountnumberDom.init(this.$route.params.disId)
                            })
                        })
                    }
                }
            })
        },
        addDeductionHandle() {  // 现金扣款
            this.$refs.cashdeductionDom.visible = true
            this.$nextTick(() => {
                this.$refs.cashdeductionDom.init(this.$route.params.disId, this.$route.params.id)
            })
        }
    }
}
</script>
<style scoped lang="scss">
    @import "../../assets/scss/post_role/index";
    .addbtn {
        margin: 13px 0 4px 0;
    }
    .date {
        margin: 5px;
    }
    /deep/ .el-table tr {
        height: 41px;
    }
</style>
