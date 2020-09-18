<!--
 * @Description: 订单日志查询抽屉
 * @Author: 陈桃
 * @Date: 2020-04-27 17:35:54
 * @LastEditTime: 2020-05-27 19:01:32
 * @LastEditors: Zale Ying
 -->
<template>
    <div>
        <el-drawer
            title="日志列表"
            :visible.sync="drawer"
            size="40%"
            @open="openDrawer">
            <el-timeline :reverse="true">
                <el-timeline-item placement="top"
                    v-for="(item, index) in logsData"
                    :key="index"
                    :type="item.type"
                    :icon="item.icon"
                    :timestamp="item.stageName+'【' + DWY_UTILS.getTimeYMD(item.createTime)+' ，'+DWY_UTILS.getTimeYMD(item.endTime)+ '】'">
                    <el-card v-for="(list, index) in item.stageLogList" :key="index">
                        <div class="logs-row">
                            <p><span class="logs-label">操作：</span><span class="logs-val">{{list.operateTypeName}}</span></p>
                            <p><span class="logs-label">操作时间：</span><span class="logs-val">{{list.operateTime}}</span></p>
                            <p><span class="logs-label">操作人：</span><span class="logs-val">{{list.operateUser}}</span></p>
                            <p><span class="logs-label">操作记录：</span><span class="logs-val">{{list.operateContent}}</span></p>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-drawer>
    </div>
</template>
<script>
import { orderLogs } from '@/api/order'
export default {
    data () {
        return {
            drawer: false,
            orderId: '',
            logsData: []
        }
    },
    methods: {
        openDrawer() {
            orderLogs({orderId: this.orderId}).then(result => {
                if(result.code === 200 && result.success) {
                    let data = result.data
                    data && data.map(item => {
                        item.type = 'primary'
                        item.icon = 'el-icon-more'
                    })
                    this.logsData = data
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .logs-row {
        p {
            margin: 3px 0;
            .logs-label {
                font-size: 12px;
                color: #858484;
            }
            .logs-val {
                font-size: 14px;
                color: #333;
            }
        }
    }
    /deep/ .el-card {
        margin-bottom: 5px;
    }
    /deep/ .el-card__body {
        overflow: auto;
    }
    /deep/ .el-drawer__body {
        padding-left: 10px;
        overflow: auto;
        padding-bottom: 20px;
    }
    /deep/ .el-timeline-item__timestamp {
        color: #409eff;
        font-size: 16px;
    }
</style>
