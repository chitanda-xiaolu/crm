<template>
    <div class="main-box" style="height:100%">
       <div class="top-title">
           <span>{{label}}对账函</span>
           <el-tag style="margin:0 10px" type="success">{{info.statusName}}</el-tag>
        </div>
        <div class="confirm-box">
            <div class="money-box money-box-cash">
                <p class="text cash-text"><i class="iconfont icon-xianjinmingxi"></i>现金</p>
                <div class="content">
                    <p v-if="hasPermission(Permission.account.recharge_add.code)" class="confirm-money cash-value"><span class="money-label">充值：</span>{{renderMoney((info.cashRechargeSum || 0).toFixed(2))}}<span class="money-label">元</span></p>
                    <p v-if="hasPermission(Permission.account.deduct_add.code)" class="confirm-money cash-value"><span class="money-label">扣款：</span>{{renderMoney((info.cashDeductSum || 0).toFixed(2))}}<span class="money-label">元</span></p>
                </div>
            </div>
            <div class="money-box money-box-fanli">
                <p class="text fanli-text"><i class="iconfont icon-fanlibaojia" style="font-size: 17px;"></i>返利</p>
                <div class="content">
                    <p v-if="hasPermission(Permission.account.recharge_add.code)" class="confirm-money fanli-value"><span class="money-label">充值：</span>{{renderMoney((info.rebateRechargeSum || 0).toFixed(2))}}<span class="money-label">元</span></p>
                    <p v-if="hasPermission(Permission.account.deduct_add.code)" class="confirm-money fanli-value"><span class="money-label">扣款：</span>{{renderMoney((info.rebateDeductSum || 0).toFixed(2))}}<span class="money-label">元</span></p>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeTabName">
            <el-tab-pane label="现金" name="cash">
                <div class="child-tabs" style="height:100%">
                    <el-tabs  v-model="activeChildTabName" type="card">
                    <el-tab-pane label="充值" name="recharge">
                        <el-table
                            :data="info.cashRechargeList"
                            highlight-current-row
                            border
                            height="100%"
                            :header-cell-style="{'background-color': '#f0f0f0'}"
                            style="width: 100%">
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
                                <viewer  :images="scope.row.proofPathList" class="img-outer-box">
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
                        <el-table
                            :data="info.cashDeductList"
                            height="100%"
                            highlight-current-row
                            border
                            :header-cell-style="{'background-color': '#f0f0f0'}"
                            style="width: 100%">
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
                </div>
            </el-tab-pane>
            <el-tab-pane label="返利" name="profit">
                 <div class="child-tabs" style="height:100%">
                <el-tabs v-model="activeRebateTabName" type="card">
                    <el-tab-pane label="充值" name="recharge">
                        <el-table
                            :data="info.rebateRechargeList"
                            highlight-current-row
                            border
                            height="100%"
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
                                    <viewer  :images="scope.row.proofPathList" class="img-outer-box">
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
                        <el-table
                            :data="info.rebateDeductList"
                            highlight-current-row
                            border
                            :header-cell-style="{'background-color': '#f0f0f0'}"
                            height="100%"
                            style="width: 100%">
                            <el-table-column type="index" width="50" label="序号">
                                <template slot-scope="scope"><span>{{(rechargePage.current - 1) * rechargePage.size + scope.$index + 1}}</span></template>
                            </el-table-column>
                            <el-table-column property="customerName" label="客户姓名" width="120"></el-table-column>
                            <el-table-column property="deductTypeName" label="扣款类型" width="120"></el-table-column>
                            <el-table-column property="money" align="right" label="金额（元）"  width="140">
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
                 </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { accountStatementDetail } from '@/api/account'
export default {
    data () {
        return {
            activeTabName: 'cash',
            activeChildTabName: 'recharge',
            activeRebateTabName: 'recharge',
            label: '',
            rechargePage: {
                size: 20,
                current: 1
            },
            rebatePage: {
                size: 20,
                current: 1
            },
            info: {
                statusName: '', // 状态
                cashDeductSum: '', // 现金扣款
                cashRechargeSum: '', // 现金充值
                rebateDeductSum: '', // 返利扣款
                rebateRechargeSum: '', // 返利充值
                cashDeductList: [], // 现金扣款List
                cashRechargeList: [], // 现金充值List
                rebateDeductList: [], // 返利扣款List
                rebateRechargeList: [] // 返利充值List
            }
        }
    },
    mounted() {
        this.getMonthDetail()
    },
    methods: {
        getMonthDetail() {
            accountStatementDetail({id: this.$route.query.id}).then(result => {
                if(result.code === 200 && result.success) {
                    this.label = this.$route.query.label
                    this.info = result.data
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
    .main-box {
        .el-divider__text {
            color: #8fc23a
        }
        .el-divider--horizontal {
            height: 3px;
        }
        .top-title {
            padding-left: 15px;
            font-size: 20px;
            font-weight: bold;
        }
        .confirm-box {
            width: 95%;
            margin: auto;
            height: 156px;
            display: grid;
            grid-template-columns: 0.8fr 0.8fr;
            .money-box {
                margin-top: 5px;
                font-size: 12px;
                border: 0.5px solid #eee;
                border-radius: 5px;
                .text{
                    font-weight: bold;
                    margin: 16px 16px 10px 16px;
                     font-size: 14px;
                    i{
                        margin-right: 5px;
                    }
                }
                .cash-text {
                    color: #67c23a;
                    i {
                        font-size: 17px;
                    }
                }
                .fanli-text {
                    color: #3ab2c2;
                    i {
                        font-size: 18px;
                    }
                }
            }
            .money-box-cash {
                 border-top:5px solid #67c23a;
                  margin-right: 80px;
            }
            .money-box-fanli {
                 border-top:5px solid #3ab2c2;
            }
            .confirm-money {
                font-size: 25px;
                margin: 15px 20px 15px 20px;
                .money-label {
                    font-size: 12px;
                    color: #333;
                }
            }
            .cash-value {
                color: #67c23a;
            }
            .fanli-value {
                 color: #3ab2c2;
            }
            .confirm-cash, .confirm-profit {
                padding: 5px;
                height: 133px;
                min-width: 298px;
                margin-right: 40px;
            }
        }
        /deep/ .el-table tr {
            height: 41px;
        }
        /deep/ .el-tabs__content {
        height: 90%;
    }
    .child-tabs {
          /deep/ .el-tabs {
        height: 100%;
    }
     /deep/ .el-tab-pane {
          height: 100%;
    }
    }
    /deep/ .el-tabs {
        height: 78%;
    }
     /deep/ .el-tab-pane {
          height: 100%;
    }
    }
</style>
