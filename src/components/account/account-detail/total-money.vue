<!--
 * @Description: 账户余额组件
 * @Author: 陈桃
 * @Date: 2020-03-06 14:08:25
 * @LastEditTime: 2020-04-17 17:51:00
 * @LastEditors: Zale Ying
 -->
<template>
    <el-row :gutter="24" class="show-money">
        <el-col :span="8" class="f-money">
            <span class="money-label case-yue-color">现金余额：</span>
            <span>
                <b class="bold-money case-yue-color">
                    <span class="money-show-big case-yue-color">{{renderMoney((accountData.accountInfo.cashTotal || 0).toFixed(2))}}</span>元
                </b>
            </span>
        </el-col>
        <el-col :span="8" class="f-money">
            <span class="money-label fanli-yue-color" >返利余额：</span>
            <span><b class="bold-money fanli-yue-color" ><span class="money-show-big" >{{renderMoney((accountData.accountInfo.rebateTotal || 0).toFixed(2))}}</span>元</b></span>
        </el-col>
        <el-col :span="8" class="f-money f-money-last">
            <span class="money-label all-money-color">总资产：</span>
            <span><b class="bold-money all-money-color">
            <span class="money-show-big all-money-color">{{renderMoney((accountData.accountInfo.cashTotal + accountData.accountInfo.rebateTotal || 0).toFixed(2))}}</span>元</b></span>
        </el-col>
    </el-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({accountData: 'account'})
    }
}
</script>
<style scoped lang="scss">
    .show-money {
        width: auto;
        height: 72px;
        position: relative;
        margin: 0 20% !important;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
        overflow: hidden;
        text-align: center;
        border-radius: 3px;
        @media screen and (max-width: 1600px) {
            margin: 0 10% !important;
        }
        @media screen and (max-width: 1200px) {
            margin: 0 2% !important;
        }
        @media screen and (max-width: 800px) {
            margin: 0 !important;
        }
        .f-money {
                width: 33.33%;
                border-right: 1px solid #ecf5ff;
            }
            .f-money-last {
                border-right: none;
            }
        span {
            display: inline-block;
        }
        .money-label {
            position: relative;
            top: -2px;
            font-weight: 100;
        }
        .money-circle {
            height: 70px;
            width: 75px;
            border: 1px solid $dividerColor;
            border-radius: 128px;
            text-align: center;
            line-height: 69px;
            margin-right: 10px;
        }
        .money-show-big {
            font-size: 25px;
            font-weight: bold;
            margin-right: 3px;
        }
        .case-yue-color {
            color:#66CCCC
        }
        .fanli-yue-color {
            color:#66CC99;
        }
        .all-money-color {
            color:#67c23a
        }
    }
</style>
