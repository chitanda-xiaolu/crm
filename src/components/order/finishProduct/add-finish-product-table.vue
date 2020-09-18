<!--
 * @Description: 新增成品生产单表格
 * @Author: Zale Ying
 * @Date: 2020-02-27 15:53:25
 * @LastEditTime: 2020-04-29 14:36:56
 * @LastEditors: Zale Ying
 -->
<template>
    <div>
        <el-table
            :data="defaultData"
            border
            ref="multipleTable"
            @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="kjlName" label="产品名称" width="130"></el-table-column>
            <el-table-column prop="typeName" label="分类" width="130"></el-table-column>
            <el-table-column prop="standards" label="规格" width="130"></el-table-column>
            <el-table-column prop="unitName" label="单位" width="80"></el-table-column>
            <el-table-column prop="retailPrice" label="单价（元）" width="100">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.retailPrice) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="100">
                <template slot-scope="scope">
                    <el-input
                        size="small"
                        type="number"
                        v-model="scope.row.num"
                        @input="handleEdit(scope.$index, scope.row)"
                        placeholder="请输入"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="aa" label="合计金额（元）" width="130">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.retailPrice * scope.row.num) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="aa" v-if="false" label="供货价" width="130">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.supplyPrice * scope.row.num) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="aa" v-if="false" label="供货价" width="130">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.nominalSettlementPrice * scope.row.num) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="备注"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'addFinishProduct',
    props: {
        defaultData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            totalPprice: 0,
            totalSupplyPrice: 0,
            totalNominalSettlementPrice: 0
        }
    },
    watch: {
        defaultData() {
            this.handleCheckData()
        }
    },
    methods: {
        // 监控产品数量变化
        handleEdit(val, row) {
            if (parseInt(row.num) < 0) {
                row.num = 0
            }
        },
        // 勾选产品数据
        handleSelectionChange(val) {
            this.$emit('checkFun', Boolean(val.length))
            this.defaultData.forEach(item => {
                item.selected = false
            })
            val.forEach(element => {
                element.selected = true
            })
        },
        // 处理表格数据 （element自带钩子函数响应数据）
        handleCheckData() {
            this.defaultData.forEach(item => {
                this.$refs.multipleTable.toggleRowSelection(item, true)
            })
        }
    }
}
</script>

<style lang="scss">
    // 表格中的金额右对齐
    .table-money {
        display: block;
        text-align: right;
    }
</style>
