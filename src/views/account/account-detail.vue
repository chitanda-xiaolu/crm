<template>
    <div class="main-box dis-flex-col">
        <div class="top-divider"><i class="el-icon-s-shop" /> {{accountData.accountInfo.distributorName}} <a class="go-history" onClick="javascript :history.back(-1);">返回上一页>></a></div>
        <el-tabs v-model="activeTabName" style="width: 100%; min-height: 100px; flex: 2;">
            <el-tab-pane label="详情信息" name="detailTab">
                <detail-info />
            </el-tab-pane>
            <el-tab-pane label="部门管理" name="deptTab">
                <dealer-dept />
            </el-tab-pane>
            <el-tab-pane label="资金管理" name="fundTab">
                <total-money></total-money>
                <el-tabs v-model="activeChildTabName">
                    <el-tab-pane label="现金" name="cash">
                        <el-row class="middle-row" :gutter="20">
                            <el-col class="middle-col" :span="8">
                                <el-tag type='primary'>累计充值：<span class="zj_show_css">{{renderMoney((accountData.accountInfo.cashRechargeAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                            </el-col>
                            <el-col class="middle-col" :span="8">
                                <el-tag type='danger'>累计扣款：<span class="zj_show_css">{{renderMoney((accountData.accountInfo.cashDeductAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                            </el-col>
                            <el-col class="middle-col" :span="8">
                                <el-tag type='success'>现金余额：<span class="zj_show_css">{{renderMoney((accountData.accountInfo.cashTotal || 0).toFixed(2))}}</span>元</el-tag>
                            </el-col>
                        </el-row>
                        <cash :distributorId="distributorPropsId"/>
                    </el-tab-pane>
                    <el-tab-pane label="返利" name="profit">
                        <el-row class="middle-row" :gutter="20">
                            <el-col class="middle-col" :span="8">
                                <el-tag type='primary'>累计充值：<span class="zj_show_css">{{renderMoney((accountData.accountInfo.rebateRechargeAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                            </el-col>
                            <el-col class="middle-col" :span="8">
                                <el-tag type='danger'>累计扣款：<span class="zj_show_css">{{renderMoney((accountData.accountInfo.rebateDeductAccumulate || 0).toFixed(2))}}</span>元</el-tag>
                            </el-col>
                            <el-col class="middle-col" :span="8">
                                <el-tag>返利余额：<span class="zj_show_css">{{renderMoney((accountData.accountInfo.rebateTotal || 0).toFixed(2))}}</span>元</el-tag>
                            </el-col>
                        </el-row>
                        <rebate :distributorId="distributorPropsId"/>
                    </el-tab-pane>
                    <el-tab-pane></el-tab-pane><el-tab-pane></el-tab-pane><el-tab-pane></el-tab-pane>
                    <el-tab-pane label="对账管理" class="right-tab" name="reconciliation">
                    <reconciliation/>
                    </el-tab-pane>
                    <el-tab-pane label="充值账号管理" class="right-tab" name="number">
                        <recharge-account />
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import DealerDept from '@/components/account/dealer-dept'
import DetailInfo from '@/components/account/dedail-info'
import Cash from '@/components/account/cash'
import rechargeAccount from '@/components/account/recharge-account'
import Rebate from '@/components/account/rebate'
import Reconciliation from '@/components/account/Reconciliation'
import { mapActions, mapState } from 'vuex'
import totalMoney from '@/components/account/account-detail/total-money'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    components: {
        DealerDept,
        DetailInfo,
        Cash,
        Rebate,
        Reconciliation,
        rechargeAccount,
        totalMoney
    },
    data() {
        return {
            scrollops: scrollConfig,
            distributorPropsId: '',
            activeTabName: 'fundTab',
            activeChildTabName: 'cash',
            cashRechargePropsList: [],
            cashDeductPropsList: [],
            rebateDeductPropsList: [],
            rebateRechargePropsList: []
        }
    },
    watch: {
        '$route'(to, from) {
            if(to.meta.title === '资金账户详情') {
                this.getAccountDetail()
            }
        }
    },
    computed: {
        ...mapState({accountData: 'account'})
    },
    mounted() {
        this.getAccountDetail()
    },
    methods: {
        ...mapActions({ accountDetailData: 'accountDetailData' }),
        getAccountDetail() {
            if(this.$route.params.id) {
                this.accountDetailData({id: this.$route.params.id})
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .top-divider {
        font-size: 20px;
        margin-left: 12px;
    }
    .el-tag {
        height: 30px;
        line-height: 28px;
        padding: 0 35px;
        text-align: center;
        border: none;
    }
    .middle-row {
        width: 80%;
        margin: 0 auto !important;
        &>.middle-col {
            display: flex;
            justify-content: center;
        }
    }
    /deep/ .el-tabs {
        display: flex;
        flex-direction: column;
        width: 100%;
        /deep/ &>.el-tabs__content {
            height: auto;
            flex: 1;
            overflow: auto;
        }
        /deep/ &>.el-tab-pane {
            height: calc(100% - 15px);
        }
        /deep/ #pane-deptTab {
            height: 100%;
        }
    }
    /deep/ .el-divider--horizontal {
        margin: 17px 0px;
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
    #tab-2 {
        width: 300px;
    }
    .go-history {
        color: #409EFF;
        font-size: .75em;
        cursor: pointer;
    }
    .go-history:hover {
        text-decoration: underline;
    }
</style>
