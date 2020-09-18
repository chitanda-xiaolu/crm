<!--
 * @Description: 终审驳回弹窗
 * @Author: Zale Ying
 * @Date: 2020-04-09 14:44:20
 * @LastEditTime: 2020-04-10 15:49:55
 * @LastEditors: Zale Ying
 -->
<template>
    <el-dialog
        title="终审驳回"
        :visible.sync="rejectVisible"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :append-to-body="true"
        :modal-append-to-body='false'
        width="30%">
        <el-checkbox-group v-model="rejectList" v-for="item in rejectReasonList" @change="selectReason" :key="item.id" style="margin-bottom: 10px;">
            <el-checkbox :label="item.id" :value="item.id">{{item.dictName}}</el-checkbox>
        </el-checkbox-group>
        <el-input
            type="textarea"
            :rows="2"
            placeholder="原因说明"
            v-model="reason">
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="rejectVisible = false">取消</el-button>
            <el-button type="primary" @click="submitReject()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { finalReject } from '@/api/order'
export default {
    props: ['rejectorpassQuery', 'rejectReasonList'],
    data() {
        return {
            rejectVisible: false,
            reason: '',
            rejectList: []
        }
    },
    methods: {
        selectReason(val) {
            this.rejectList = val
        },
        // 提交驳回
        submitReject() {
            if(!this.rejectList.length) {
                this.$message.warning('请勾选驳回原因')
            } else {
                this.rejectorpassQuery.operateReasonId = this.rejectList.join()
                this.rejectorpassQuery.remark = this.reason
                this.$confirm('此操作将驳回该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    finalReject({...this.rejectorpassQuery}).then(result => {
                        if(result.code === 200 && result.success) {
                            this.$message.success('操作成功')
                            this.rejectVisible = false
                            this.rejectList.length = 0
                            this.reason = ''
                            this.getProgramList()
                            this.getOrderDetailData({orderId: this.orderId})
                        }
                    })
                }).catch(() => {})
            }
        }
    }
}
</script>
