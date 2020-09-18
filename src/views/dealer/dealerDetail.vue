<!--
 * @Description: 经销商详情页面
 * @Author: 陈桃
 * @Date: 2019-08-12 10:58:14
 * @LastEditTime: 2020-07-17 11:44:59
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col" style="overflow:scroll">
        <div class="top-divider"><i class="el-icon-s-shop" /> {{areaName}} </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="详情信息" name="first">
                <dealer-info @areaInfo="areaInfo"/>
            </el-tab-pane>
            <el-tab-pane label="部门管理" name="second" style="height:750px">
                <dealer-dept />
            </el-tab-pane>
            <el-tab-pane v-if="hasPermission(Permission.distributor.account.code)" label="资金管理" name="account">
                <AccountInfo />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import DealerDept from '@/components/dealer/dealer-dept'
import DealerInfo from '@/components/dealer/dealer-detail'
import AccountInfo from '@/components/dealer/account/account-detail'
export default {
    components: {
        DealerDept,
        DealerInfo,
        AccountInfo
    },
    data() {
        return {
            activeName: 'first',
            areaName: ''
        }
    },
    methods: {
        handleClick(tab, event) {
        },
        areaInfo(data) {
            this.areaName = data
        }
    }
}
</script>

<style scoped lang="scss">
    .top-divider {
        font-size: 20px;
        margin-left: 12px;
    }
    /deep/ .el-tab-pane {
        height: 100%;
    }
    .el-divider__text {
        font-size: 1.2em;
        color: #515356;
    }
</style>
