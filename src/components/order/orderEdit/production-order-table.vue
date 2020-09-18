<!--
 * @Description: 定制生产单表格
 * @Author: Zale Ying
 * @Date: 2020-03-13 16:44:32
 * @LastEditTime: 2020-04-21 14:28:19
 * @LastEditors: Zale Ying
 -->
<template>
    <div>
        <el-divider content-position="left">定制生产单<i class="el-icon-thumb thumb"></i></el-divider>
        <el-button type="primary" icon="el-icon-refresh-right" size="mini" plain style="margin-bottom:3px" @click="refreshProgramData">更新数据</el-button>
        <el-table :data="programList" border>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="kjlAuditName" label="审核名称" width="130">
                <template slot-scope="scope">
                    <span>{{scope.row.kjlAuditName ? scope.row.kjlAuditName : '未命名'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="productionOrderCode" label="生产单编号"  width="160"></el-table-column>
            <el-table-column prop="kjlAuditCode" label="审核编号"  width="130"></el-table-column>
            <el-table-column prop="kjlStatusName" label="审核进度" width="100"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="100"></el-table-column>
            <el-table-column prop="operateComment" label="记录信息" width="150">
                <template slot-scope="scope">
                    <el-popover placement="top-start" :title="scope.row.operateComment" style="cursor: pointer;" width="150" trigger="hover" >
                        <span class="text-ellipsis-2" slot="reference">{{scope.row.operateComment}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="提审备注" width="200"></el-table-column>
            <el-table-column prop="retailPrice" label="销售金额" width="100"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.cancelFlag && hasPermission(Permission.order.audit_cancel.code)"
                        type="text"
                        size="small"
                        icon="el-icon-error"
                        @click="deleteThisAudit(scope.row)">作废</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { deleteAudit } from '@/api/order'
export default {
    computed: {
        ...mapState({
            programList: state => state.order.programKjlList
        })
    },
    watch: {
        '$route'(to, from) {
            this.getProgramKjlListData({orderId: this.$route.params.orderId})
        }
    },
    mounted() {
        this.getProgramKjlListData()
    },
    methods: {
        ...mapActions({ getProgramKjlListData: 'getProgramKjlList' }),
        // 作废定制生产单
        deleteThisAudit(data) {
            let productionOrderId = data.productionOrderId
            this.$confirm('此操作将作废该定制生产单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteAudit({productionOrderId}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getProgramKjlListData()
                    }
                })
            }).catch(() => {})
        },
        // 更新数据
        refreshProgramData() {
            this.getProgramKjlListData({orderId: this.$route.params.orderId})
        }
    }
}
</script>
<style scoped lang="scss">
    .text-ellipsis-2 {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
