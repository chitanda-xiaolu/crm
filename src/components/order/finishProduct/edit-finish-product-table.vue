<template>
    <div>
        <el-table
            :data="productLists"
            border
            @selection-change="handleSelectionChange" ref="table">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column type="selection" width="55" :selectable="() => true"></el-table-column>
            <el-table-column prop="name" label="产品名称" width="130"></el-table-column>
            <el-table-column prop="typeName" label="分类" width="170"></el-table-column>
            <el-table-column prop="standards" label="规格" width="130"></el-table-column>
            <el-table-column prop="unitName" label="单位" width="80"></el-table-column>
            <el-table-column prop="retailPrice" label="单价（元）" width="100"></el-table-column>
            <el-table-column prop="count" label="数量" width="100">
                <template slot-scope="scope">
                    <el-input
                        size="small"
                        type="number"
                        v-model="scope.row.count"
                        placeholder="请输入"
                        @input="handleEdit(scope.$index, scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="aa" label="合计金额（元）" width="130">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.retailPrice * scope.row.count) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="aa" v-if="false" label="供货价" width="130">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.supplyPrice * scope.row.count) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="aa" v-if="false" label="供货价" width="130">
                <template slot-scope="scope">
                    <span class="table-money">{{renderMoney(scope.row.nominalSettlementPrice * scope.row.count) || 0}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="备注"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'editFinishProduct',
    props: ['productLists'],
    data() {
        return {
            totalPprice: 0,
            totalSupplyPrice: 0,
            totalNominalSettlementPrice: 0,
            arr: []
        }
    },
    updated() {
        this.checkedAllProgramList()
    },
    methods: {
        // 修改产品行内数量
        handleEdit(val, count) {
            if (parseInt(count.count) < 0) {
                count.count = 0
            }
            this.clacTotalPrice()
            this.calcTotalNominalSettlementPrice()
            this.calcTotalSupplyPrice()
            this.$emit('tableSelectChange', {
                totalPrice: this.totalPprice,
                totalSupplyPrice: this.totalSupplyPrice,
                totalNominalSettlementPrice: this.totalNominalSettlementPrice
            })
        },
        checkedAllProgramList(arr) {
            let _self = this
            _self.productLists && _self.productLists.map(res => {
                _self.$refs && _self.$refs.table.toggleRowSelection(res, true)
            })
        },
        // 勾选产品数据
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.clacTotalPrice()
            this.calcTotalNominalSettlementPrice()
            this.calcTotalSupplyPrice()
            this.$emit('tableSelectChange', {
                totalPrice: this.totalPprice,
                totalSupplyPrice: this.totalSupplyPrice,
                totalNominalSettlementPrice: this.totalNominalSettlementPrice,
                tablePro: val
            })
        },
        // 计算总价格
        clacTotalPrice() {
            let price = 0
            var num = this.multipleSelection.length
            for (var i = 0; i < num; i++) {
                price += this.multipleSelection[i].count * this.multipleSelection[i].retailPrice
            }
            this.totalPprice = price
        },
        // 计算总供货价
        calcTotalSupplyPrice() {
            let price = 0
            var num = this.multipleSelection.length
            for (var i = 0; i < num; i++) {
                if(!this.multipleSelection[i].supplyPrice) {
                    price = 0
                } else {
                    price += this.multipleSelection[i].count * this.multipleSelection[i].supplyPrice
                }
            }
            this.totalSupplyPrice = price
        },
        // 计算理论结算价
        calcTotalNominalSettlementPrice() {
            let price = 0
            var num = this.multipleSelection.length
            for (var i = 0; i < num; i++) {
                price += this.multipleSelection[i].count * this.multipleSelection[i].nominalSettlementPrice
            }
            this.totalNominalSettlementPrice = price
        }
    }
}
</script>
