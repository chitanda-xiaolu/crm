<template>
    <div>
        <div class="addbtn">
            <el-button type="warning" icon="el-icon-plus" @click="addCashHandle" plain>充值</el-button>
            <el-button type="danger" icon="el-icon-plus" @click="addDeductionHandle" plain>扣款</el-button>
        </div>
        <el-tabs style="margin-top:15px" v-model="activeGrandchildTabName" type="card">
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
                    <el-table-column property="account" label="充值账号"></el-table-column>
                    <el-table-column property="proofPath" label="凭证">
                       <template slot-scope="scope">
                            <viewer v-show="scope.row.proofPath" :images="scope.row.proofPathList" class="img-outer-box">
                                <img
                                    class="row-image-preview"
                                    v-for="(item, idx) in scope.row.proofPathList"
                                    :key="idx"
                                    :src="item"
                                >
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
            </el-tab-pane>
        </el-tabs>
        <FanliRecharge ref="fanliRechargeDom"/>
        <FanliDeduction ref="fanlideductionDom"/>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import FanliRecharge from '@/components/account/add-fanli-recharge'
import FanliDeduction from '@/components/account/add-fanli-deduction'
export default {
    components: {
        FanliRecharge,
        FanliDeduction
    },
    props: ['distributorId'],
    data () {
        return {
            rebateRechargeTime: '', // 返利充值日期
            rebateDeductTime: '', // 返利扣款
            activeGrandchildTabName: 'recharge',
            searchRechargeTime: '',
            params: {
                distributorId: '',
                rechargeCategory: 1 // 充值，扣款
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
        ...mapState({ accountState: 'account' })
    },
    mounted() {
        this.getRechargeList()
        this.getDeductList()
    },
    methods: {
        ...mapActions({ flRechargeData: 'flRechargeData', flRdeductionData: 'flRdeductionData' }),
        // 充值列表
        getRechargeList() {
            let query = {}
            if(this.rebateRechargeTime) {
                query.startDate = this.rebateRechargeTime[0]
                query.endDate = this.rebateRechargeTime[1]
            }
            query.rechargeCategory = 1
            query.distributorId = this.$route.params.disId
            this.flRechargeData(query)
        },
        // 扣款列表
        getDeductList() {
            let query = {}
            if(this.rebateDeductTime) {
                query.startDate = this.rebateDeductTime[0]
                query.endDate = this.rebateDeductTime[1]
            }
            query.deductCategory = 1
            query.distributorId = this.$route.params.disId
            this.flRdeductionData(query)
        },
        // 修改返利充值日期
        changeRebateRechargeTime(val) {
            this.getRechargeList()
        },
        // 修改返利扣款日期
        changeRebateDeductTime(val) {
            this.getDeductList()
        },
        addCashHandle() { // 返利充值
            this.$refs.fanliRechargeDom.visible = true
            this.$nextTick(() => {
                this.$refs.fanliRechargeDom.init(this.$route.params.disId, this.$route.params.id)
            })
        },
        addDeductionHandle() { // 返利扣款
            this.$refs.fanlideductionDom.visible = true
            this.$nextTick(() => {
                this.$refs.fanlideductionDom.init(this.$route.params.disId, this.$route.params.id)
            })
        }
    }
}
</script>
<style scoped lang="scss">
    @import "../../assets/scss/post_role/index";
    .date {
        margin: 5px;
    }
    .addbtn {
        margin-top: 13px;
    }
    /deep/ .el-table tr {
        height: 41px;
    }
</style>
