<template>
    <el-row>
        <el-col :span="24">
            <div class="main-box dis-flex-col" style="overflow:scroll">
        <div class="top-divider">{{areaName}} </div>
        <dealer-info @areaInfo="areaInfo"/>
    </div>
        </el-col>
    </el-row>
</template>

<script>
// import DealerDept from '@/components/dealer/dealer-dept'
import DealerInfo from '@/components/supplier/supplier-detail'
// import AccountInfo from '@/components/dealer/account/account-detail'
export default {
    components: {
        // DealerDept,
        DealerInfo
        // AccountInfo
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
