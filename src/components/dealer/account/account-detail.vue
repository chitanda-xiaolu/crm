<template>
    <div>
        <total-money></total-money>
        <el-tabs v-model="activeCashTabName" class="first-tabs">
            <el-tab-pane label="现金" name="cash">
                <el-tag type='warning'>累计充值：<span class="zj_show_css">{{renderMoney((accountState.accountInfo.cashRechargeAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                <el-tag type='danger'>累计扣款：<span class="zj_show_css">{{renderMoney((accountState.accountInfo.cashDeductAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                <el-tag type='success'>现金余额：<span class="zj_show_css">{{renderMoney((accountState.accountInfo.cashTotal || 0).toFixed(2))}}</span>元</el-tag>
                <div class="addbtn">
                    <el-button type="warning" icon="el-icon-plus" @click="addCashHandle" plain>充值</el-button>
                    <el-button type="danger" icon="el-icon-plus" @click="addDeductionHandle" plain>扣款</el-button>
                </div>
                <el-tabs v-model="activeCashChildTabName" type="card" style="margin-top:15px">
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
                            :header-cell-style="{'background-color': '#f0f0f0'}">
                            <el-table-column type="index" width="50" label="序号">
                                <template slot-scope="scope"><span>{{(rechargePage.current - 1) * rechargePage.size + scope.$index + 1}}</span></template>
                            </el-table-column>
                            <el-table-column property="money" align="right" label="金额（元）">
                                <template slot-scope="scope">
                                    <span>{{renderMoney(scope.row.money)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="account" label="充值账号"></el-table-column>
                            <el-table-column property="proofPath" label="凭证">
                                <template slot-scope="scope">
                                    <viewer v-show="scope.row.proofPath">
                                        <img style="cursor: pointer;" :src="scope.row.proofPath" :key="scope.row.path" :alt="scope.row.title" width="25px" height="22px">
                                    </viewer>
                                </template>
                            </el-table-column>
                            <el-table-column property="remark" label="备注"></el-table-column>
                            <el-table-column property="createTime" label="记录时间"></el-table-column>
                            <el-table-column property="createUserName" label="记录人"></el-table-column>
                        </el-table>
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
                            :header-cell-style="{'background-color': '#f0f0f0'}">
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
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="返利" name="profit">
                <el-tag type='warning'>累计充值：<span class="zj_show_css">{{renderMoney((accountState.accountInfo.rebateRechargeAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                <el-tag type='danger'>累计扣款：<span class="zj_show_css">{{renderMoney((accountState.accountInfo.rebateDeductAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                <el-tag type='success'>返利余额：<span class="zj_show_css">{{renderMoney((accountState.accountInfo.rebateTotal || 0).toFixed(2))}}</span>元</el-tag>
                <div class="addbtn">
                    <el-button type="warning" icon="el-icon-plus" @click="addCashFanliHandle" plain>充值</el-button>
                    <el-button type="danger" icon="el-icon-plus" @click="addDeductionFanliHandle" plain>扣款</el-button>
                </div>
                <el-tabs  v-model="activeFanliTabName" type="card" style="margin-top:15px">
                    <el-tab-pane label="充值" name="recharge">
                        <div class="date">
                            <span>查询日期</span>
                            <el-date-picker
                                v-model="rebateRechargeTime"
                                type="daterange"
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                @change="changeRebateRechargeTime"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <el-table
                            :data="accountState.flRechargeList"
                            highlight-current-row
                            border
                            :header-cell-style="{'background-color': '#f0f0f0'}">
                            <el-table-column type="index" width="50" label="序号">
                                <template slot-scope="scope"><span>{{(rebatePage.current - 1) * rebatePage.size + scope.$index + 1}}</span></template>
                            </el-table-column>
                            <el-table-column property="money" align="right" label="金额（元）">
                                <template slot-scope="scope">
                                    <span>{{renderMoney(scope.row.money)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="account" label="充值账号"></el-table-column>
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
                    </el-tab-pane>
                    <el-tab-pane label="扣款" name="deduction">
                        <div class="date">
                            <span>查询日期</span>
                            <el-date-picker
                                v-model="rebateDeductTime"
                                type="daterange"
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                @change="changeRebateDeductTime"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <el-table
                            :data="accountState.flRebateList"
                            highlight-current-row
                            border
                            :header-cell-style="{'background-color': '#f0f0f0'}">
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
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane></el-tab-pane><el-tab-pane></el-tab-pane><el-tab-pane></el-tab-pane>
            <el-tab-pane label="对账管理" name="recon">
                <Reconciliation />
            </el-tab-pane>
            <el-tab-pane label="充值账号管理" class="right-tab" name="number">
                <rechargeAccount />
            </el-tab-pane>
        </el-tabs>
        <cashRecharge ref="cashrechargeDom"/>
        <cashDeduction ref="cashdeductionDom"/>
        <FanliRecharge ref="fanliRechargeDom"/>
        <FanliDeduction ref="fanlideductionDom"/>
        <AddAccountNumber ref="addaccountnumberDom"/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cashRecharge from '@/components/dealer/account/add-cash-recharge'
import cashDeduction from '@/components/dealer/account/add-cash-deduction'
import FanliRecharge from '@/components/dealer/account/add-fanli-recharge'
import FanliDeduction from '@/components/dealer/account/add-fanli-deduction'
import Reconciliation from '@/components/dealer/Reconciliation'
import rechargeAccount from '@/components/dealer/recharge-account'
import { paymentAccountList } from '@/api/account'
import AddAccountNumber from '@/components/account/add-account-number'
import totalMoney from '@/components/account/account-detail/total-money'
export default {
    components: {
        cashRecharge,
        cashDeduction,
        FanliRecharge,
        FanliDeduction,
        Reconciliation,
        rechargeAccount,
        AddAccountNumber,
        totalMoney
    },
    data() {
        return {
            cashRechargeTime: '', // 现金充值日期
            cashDeductTime: '', // 现金扣款日期
            rebateRechargeTime: '', // 返利充值日期
            rebateDeductTime: '', // 返利扣款
            activeCashTabName: 'cash',
            activeCashChildTabName: 'recharge',
            activeFanliTabName: 'recharge',
            distributorPropsId: '',
            activeTabName: 'fundTab',
            activeChildTabName: 'cash',
            rechargePage: {
                size: 20,
                current: 1
            },
            rebatePage: {
                size: 20,
                current: 1
            },
            cashDeductList: [], // 现金扣款List
            rebateDeductList: [], // 返利扣款List
            rebateRechargeList: [], // 返利充值List
            dataInfo: {
                cashTotal: '', // 现金余额
                rebateTotal: '',
                cashRechargeAccumulate: '', // 累计现金充值
                cashDeductAccumulate: '', // 累计现金扣款
                rebateDeductAccumulate: '', // 累计返利扣款
                rebateRechargeAccumulate: '', // 累计返利充值
                rebateAvailable: '', // 返利余额
                distributorName: '' // 经销商名称
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.getAccountsDetail()
        }
    },
    computed: {
        ...mapState({ accountState: 'account', accountDatas: 'dealer' })
    },
    mounted() {
        this.getAccountsDetail()
        this.getCashRechargeList()
        this.getCashDeductList()
        this.getRebateList()
        this.getRebatehDeductList()
    },
    methods: {
        ...mapActions({
            cashRechargeData: 'cashRechargeData',
            cashRdeductionData: 'cashRdeductionData',
            flRechargeData: 'flRechargeData',
            flRdeductionData: 'flRdeductionData',
            accountData: 'accountData'
        }),
        // 现金充值列表
        getCashRechargeList() {
            let query = {}
            if(this.cashRechargeTime) {
                query.startDate = this.cashRechargeTime[0]
                query.endDate = this.cashRechargeTime[1]
            }
            query.rechargeCategory = 0
            query.distributorId = this.$route.params.id
            this.cashRechargeData(query)
        },
        // 现金扣款列表
        getCashDeductList() {
            let query = {}
            if(this.cashDeductTime) {
                query.startDate = this.cashDeductTime[0]
                query.endDate = this.cashDeductTime[1]
            }
            query.distributorId = this.$route.params.id
            query.deductCategory = 0
            this.cashRdeductionData(query)
        },
        // 返利充值列表
        getRebateList() {
            let query = {}
            if(this.rebateRechargeTime) {
                query.startDate = this.rebateRechargeTime[0]
                query.endDate = this.rebateRechargeTime[1]
            }
            query.distributorId = this.$route.params.id
            query.rechargeCategory = 1
            this.flRechargeData(query)
        },
        // 返利扣款列表
        getRebatehDeductList() {
            let query = {}
            if(this.rebateDeductTime) {
                query.startDate = this.rebateDeductTime[0]
                query.endDate = this.rebateDeductTime[1]
            }
            query.distributorId = this.$route.params.id
            query.deductCategory = 1
            this.flRdeductionData(query)
        },
        // 修改现金充值日期
        changeCashRechargeTime(val) {
            this.getCashRechargeList()
        },
        // 修改现金扣款日期
        changeCashDeductTime(val) {
            this.getCashDeductList()
        },
        // 修改返利充值日期
        changeRebateRechargeTime(val) {
            this.getRebateList()
        },
        // 修改返利扣款日期
        changeRebateDeductTime(val) {
            this.getRebatehDeductList()
        },
        addCashHandle() {   // 现金充值
            // this.$refs.cashrechargeDom.visible = true
            // this.$nextTick(() => {
            //     this.$refs.cashrechargeDom.init(this.$route.params.id)
            // })
            paymentAccountList({distributorId: this.$route.params.id}).then(result => {
                if(result.code === 200 && result.success) {
                    if(result.data.length) {
                        this.$refs.cashrechargeDom.visible = true
                        this.$nextTick(() => {
                            this.$refs.cashrechargeDom.init(this.$route.params.id)
                        })
                    } else {
                        this.$confirm('暂无可用充值的账号，请先创建充值账号, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$refs.addaccountnumberDom.visible = true
                            this.$nextTick(() => {
                                this.$refs.addaccountnumberDom.init(this.$route.params.id)
                            })
                        })
                    }
                }
            })
        },
        addDeductionHandle() {  // 现金扣款
            this.$refs.cashdeductionDom.visible = true
            this.$nextTick(() => {
                this.$refs.cashdeductionDom.init(this.$route.params.id)
            })
        },
        addCashFanliHandle() { // 返利充值
            this.$refs.fanliRechargeDom.visible = true
            this.$nextTick(() => {
                this.$refs.fanliRechargeDom.init(this.$route.params.id)
            })
        },
        addDeductionFanliHandle() { // 返利扣款
            this.$refs.fanlideductionDom.visible = true
            this.$nextTick(() => {
                this.$refs.fanlideductionDom.init(this.$route.params.id)
            })
        },
        getAccountsDetail() {
            this.accountData({distributorId: this.$route.params.id})
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../../assets/scss/post_role/index";
    .addbtn {
        margin-top: 13px;
    }
    .date {
        margin: 5px;
    }
    .money-label {
        font-weight: 100;
    }
    .el-tag {
        height: 30px;
        line-height: 30px;
        margin: 0 54px;
        width: 215px;
        text-align: center;
        border: none;
    }
    /deep/ .el-tab-pane {
        height: 100%;
    }
     /deep/ .el-tabs__nav-wrap::after {
        height: 1px;
    }
    /deep/ .el-tabs__item {
        width: 110px !important;
        font-weight: normal !important;
        text-align: center;
    }
    /deep/ .el-date-editor {
        border: none;
        border-bottom: 1px solid #eee;
        border-radius: 0;
    }
    .el-divider__text {
        font-size: 1.2em;
        color: #515356;
    }
    /deep/ .el-table tr {
        height: 41px;
    }
</style>
