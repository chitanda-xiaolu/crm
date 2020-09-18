<!--
 * @Description: 成品生产单表格
 * @Author: Zale Ying
 * @Date: 2020-03-13 16:46:07
 * @LastEditTime: 2020-05-11 17:28:32
 * @LastEditors: Zale Ying
 -->
<template>
    <div>
        <el-divider content-position="left">成品生产单<i class="el-icon-thumb thumb"></i></el-divider>
        <el-button v-if="hasPermission(Permission.product.finished_add.code)" type="primary" class="add-pro-btn" size="mini" plain @click="addFinishProduct"><i class="el-icon-plus"></i> 新增成品</el-button>
        <el-table :data="finishProductList" border>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="kjlAuditName" label="审核名称" width="130"></el-table-column>
            <el-table-column prop="productionOrderCode" label="生产单编号" width="160"></el-table-column>
            <el-table-column prop="productTypeName" label="类型" width="130"></el-table-column>
            <el-table-column prop="kjlStatusName" label="审核进度" width="100"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="100"></el-table-column>
            <el-table-column prop="retailPrice" label="销售金额" width="100"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        v-if=" (orderDetailData.status < 2001) && hasPermission(Permission.product.finished_edit.code)"
                        type="text"
                        size="small"
                        icon="el-icon-edit"
                        @click="editThisPro(scope.row)">编辑</el-button>
                    <el-button
                        v-if=" (orderDetailData.status < 2001) && hasPermission(Permission.product.finished_detele.code)"
                        type="text"
                        size="small"
                        icon="el-icon-error"
                        @click="deleteThisPro(scope.row)">作废</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { deleteFinishProduct } from '@/api/order'
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData,
            finishProductList: state => state.order.finishKjlList
        })
    },
    watch: {
        '$route'(to, from) {
            this.getFinishListData({orderId: this.$route.params.orderId})
        }
    },
    mounted() {
        this.getFinishListData()
    },
    methods: {
        ...mapActions({ getFinishListData: 'getFinishKjlList' }),
        // 编辑成品单
        editThisPro(data) {
            this.$router.push({
                path: `/order/editfinish/${this.orderDetailData.orderId}/${this.orderDetailData.orderCode}/${data.productionOrderId}/${this.orderDetailData.orderType}`
            })
        },
        // 新增成品定制单
        addFinishProduct() {
            this.$router.push({
                path: `/order/addfinish/${this.orderDetailData.orderId}/${this.orderDetailData.orderCode}/${this.orderDetailData.orderType}`
            })
        },
        // 作废成品单
        deleteThisPro(data) {
            let productionOrderId = data.productionOrderId
            this.$confirm('此操作将作废该成品生产单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteFinishProduct({productionOrderId}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getFinishListData()
                    }
                })
            }).catch(() => {})
        }
    }
}
</script>

<style scoped lang="scss">
    .add-pro-btn {
        margin-bottom: 5px;
    }
</style>
