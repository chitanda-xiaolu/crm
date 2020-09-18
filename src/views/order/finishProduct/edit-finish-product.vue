<!--
 * @Description: 编辑成品下单
 * @Author: Zale Ying
 * @Date: 2020-01-04 08:56:49
 * @LastEditTime: 2020-04-28 14:54:27
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="product-finish-container main-box dis-flex-col">
        <div class="wrapper" ref="wrapper">
            <el-form
                :model="pricedataForm"
                ref="pricedataForm"
                label-width="100px">
                <el-divider content-position="left">订单信息<i class="el-icon-thumb thumb"></i></el-divider>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="订单编号：" prop="orderCode">
                            <span>{{pricedataForm.orderCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left">生产单信息<i class="el-icon-thumb thumb"></i></el-divider>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="审核名称：" prop="kjlAuditName" :rules="[{ required: true, message: '请输入审核名称', trigger: 'blur' }]">
                            <el-input v-model="pricedataForm.kjlAuditName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="总金额：" prop="c">
                            <span class="total-price">{{totalPrice}}</span>
                            <span class="total-unit">元</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="table-box">
                        <el-button type="primary" class="select-btn" size="mini" icon="el-icon-plus" plain @click="selectProduct">添加产品</el-button>
                    </div>
                </el-row>
                <el-row>
                    <edit-finish-product-table
                        v-if="flag"
                        :productLists="productLists"
                        @tableSelectChange="tableEmitSelectChange" />
                </el-row>
                <el-button type="primary" class="save-btn" size="mini" icon="el-icon-s-promotion" @click="dataFormSubmit('pricedataForm')">保存</el-button>
            </el-form>
        </div>
        <edit-finish-product-dialog ref="edit-finish-product-dialog" @selected="dialogEmitSelect" />
    </div>
</template>
<script>
import { indexOfById } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { editCproductList, finishProductDetail } from '@/api/order'
import editFinishProductDialog  from '@/components/order/finishProduct/edit-finish-product-dialog'
import editFinishProductTable from '@/components/order/finishProduct/edit-finish-product-table'
import { handleScrollPage } from '@/utils/scroll'
export default {
    name: 'editFinishProduct',
    components: {
        editFinishProductDialog,
        editFinishProductTable
    },
    data () {
        return {
            orderId: this.$route.params.orderId,
            orderCode: this.$route.params.orderCode,
            productionOrderId: this.$route.params.productionOrderId,
            orderType: this.$route.params.orderType,                    // 订单类型 10 为正单   20 为补单
            pricedataForm: {
                kjlAuditName: '',
                orderCode: '',
                totalRetailPrice: 0
            },
            totalPrice: 0,
            totalSupplyPrice: 0,
            totalNominalSettlementPrice: 0,
            productLists: [], // 添加选中的产品
            flag: false,
            tablePro: []
        }
    },
    mounted() {
        handleScrollPage(this.$refs.wrapper)
    },
    created() {
        this.getFinishProductDetail()
    },
    methods: {
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        // 添加产品
        selectProduct(query) {
            this.$refs['edit-finish-product-dialog'].openDialog()
        },
        // 详情回显
        getFinishProductDetail() {
            let productionOrderId = this.productionOrderId
            finishProductDetail({productionOrderId}).then(result => {
                if(result.code === 200 && result.success) {
                    let $data = result.data
                    this.pricedataForm = {...$data}
                    this.totalPrice = $data.totalRetailPrice
                    this.totalSupplyPrice = $data.totalSupplyPrice
                    this.totalNominalSettlementPrice = $data.totalNominalSettlementPrice
                    let orderOfferList = $data.orderOfferList
                    orderOfferList && orderOfferList.map(item => {
                        item.id = item.productLibId
                    })
                    this.productLists = orderOfferList
                    this.flag = true
                }
            })
        },
        // 表格选中产品发生变化时执行
        tableEmitSelectChange ({ totalPrice = 0, totalSupplyPrice = 0, totalNominalSettlementPrice = 0, tablePro = [] }) {
            this.totalPrice = totalPrice
            this.totalSupplyPrice = totalSupplyPrice
            this.totalNominalSettlementPrice = totalNominalSettlementPrice
            this.tablePro = tablePro
        },
        dialogEmitSelect (data) {
            let array = data.data
            if (array instanceof Array) {
                array.forEach(curr => {
                    const targetIndex = indexOfById(this.productLists, curr.id)
                    if (targetIndex !== -1) {
                        // 已经添加到生产列表的产品
                        this.updateProduct(targetIndex, 'count', parseFloat(this.productLists[targetIndex].count) + parseFloat(curr.count))
                    } else {
                        // 没有添加到生产列表的产品
                        this.createProduct(curr)
                    }
                })
            }
        },
        updateProduct (index, attr, value) {
            if (this.productLists[index]) {
                this.$set(this.productLists[index], attr, value)
                this.clacTotalPrice()
                this.calcTotalSupplyPrice()
                this.calcTotalNominalSettlementPrice()
            }
        },
        createProduct (product) {
            this.productLists.push(product)
            this.clacTotalPrice()
            this.calcTotalSupplyPrice()
            this.calcTotalNominalSettlementPrice()
        },
        tabelEmitChange ({ data }) {
            // 选中生产产品列表的产品
            if (data instanceof Array) {
                // 计算金额
                this.computedMoney(data)
                // 保存选中的产品
                this.productListsSelected(data)
                // 关闭页面
                this.closeCurrentPage()
            }
        },
        // 保存编辑的成品单
        dataFormSubmit() {
            let proLib = []
            let allData = this.tablePro.length ? this.tablePro : this.productLists
            allData.map(item => {
                proLib.push({
                    productLibId: item.productLibId || item.id,
                    count: item.count,
                    retailPriceUnit: item.retailPrice * item.count,
                    supplyPriceUnit: item.supplyPrice ? item.supplyPrice * item.count : 0,
                    nominalSettlementPriceUnit: item.nominalSettlementPrice * item.count})
            })
            let query = {
                orderId: this.orderId,
                kjlAuditName: this.pricedataForm.kjlAuditName,
                totalRetailPrice: this.totalPrice,
                productLibs: JSON.stringify(proLib),
                totalSupplyPrice: this.totalSupplyPrice,
                totalNominalSettlementPrice: this.totalNominalSettlementPrice,
                productionOrderId: this.productionOrderId
            }
            if(proLib.length) {
                let _self = this
                this.$refs['pricedataForm'].validate(valid => {
                    if (valid) {
                        editCproductList(query).then(result => {
                            if(result.code === 200 && result.success) {
                                this.$message.success('操作成功')
                                this.closeCurrentPage(this.$route.fullPath)     // 关闭当前页面
                                _self.editHandleRoute()
                            }
                        })
                    }
                })
            } else {
                this.$message.warning('请先勾选产品')
            }
        },
        // 编辑成功后路由跳转
        editHandleRoute() {
            this.$router.push({
                path: `/order/editCad/${this.orderId}/1`
            })
        },
        // 计算总价格
        clacTotalPrice() {
            let price = 0
            var num = this.productLists.length
            for (var i = 0; i < num; i++) {
                price += this.productLists[i].count * this.productLists[i].retailPrice
            }
            this.totalPrice = price
        },
        // 计算总供货价
        calcTotalSupplyPrice() {
            let price = 0
            var num = this.productLists.length
            for (var i = 0; i < num; i++) {
                if(!this.productLists[i].supplyPrice) {
                    price = 0
                } else {
                    price += this.productLists[i].count * this.productLists[i].supplyPrice
                }
            }
            this.totalSupplyPrice = price
        },
        // 计算理论结算价
        calcTotalNominalSettlementPrice() {
            let price = 0
            var num = this.productLists.length
            for (var i = 0; i < num; i++) {
                price += this.productLists[i].count * this.productLists[i].nominalSettlementPrice
            }
            this.totalNominalSettlementPrice = price
        }
    }
}
</script>
<style scoped lang='scss'>
    .product-finish-container {
        width: 100%;
        padding-right: 5px;
        .wrapper {
            overflow: hidden;
            .total-price {
                display: inline-block;
                font-size: 30px;
                color: #c57300;
            }
            .total-unit {
                display: inline-block;
                font-size: 14px;
            }
            .info-item {
                height: 50px;
                display: flex;
                font-size: 14px;
                .image-preview-box {
                    width: 65px;
                    height: 36px;
                    margin-top: -7px;
                }
                .image-preview {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                }
                .info-label {
                    font-size: 14px;
                    display: inline-block;
                    width: 74px;
                    text-align: right;
                    color: $disabledColor;
                    margin-right: 5px;
                }
            }
            .table-box {
                padding-right: 8px;
                .select-btn {
                    margin-bottom: 5px;
                }
            }
            .save-btn {
                margin: 6px 0 0 0;
            }
        }
    }
</style>
