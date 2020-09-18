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
                        <el-form-item label="订单编号：" prop="a" >
                            <span>{{orderCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-divider content-position="left">生产单信息<i class="el-icon-thumb thumb"></i></el-divider>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="审核名称：" prop="auditName" :rules="[{ required: true, message: '请输入审核名称', trigger: 'blur' }]">
                            <el-input v-model="pricedataForm.auditName" placeholder="请输入"></el-input>
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
                    <add-finish-product-table :defaultData="productLists" @checkFun="checkFlagFun" />
                </el-row>
                <el-button v-show="checkFlag" type="primary" class="save-btn" icon="el-icon-s-promotion" @click="dataFormSubmit('pricedataForm')">提交成品单</el-button>
            </el-form>
        </div>
        <add-finish-product-dialog
            ref="add-finish-product-dialog"
            @selected="dialogEmitSelect"></add-finish-product-dialog>
    </div>
</template>
<script>
import { indexOfById } from '@/utils/utils'
import { mapMutations } from 'vuex'
import { addCproductList } from '@/api/order'
import addFinishProductDialog  from '@/components/order/finishProduct/add-finish-product-dialog'
import addFinishProductTable from '@/components/order/finishProduct/add-finish-product-table'
import { handleScrollPage } from '@/utils/scroll'
export default {
    name: 'addFinishProduct',
    components: {
        addFinishProductDialog,
        addFinishProductTable
    },
    data () {
        return {
            orderId: this.$route.params.orderId,
            orderCode: this.$route.params.orderCode,
            pricedataForm: {
                auditName: ''
            },
            checkFlag: false,
            productLists: [] // 添加选中的产品
        }
    },
    computed: {
        // 计算总金额
        totalPrice() {
            let price = 0
            var num = this.productLists.length
            for (var i = 0; i < num; i++) {
                if (this.productLists[i].selected) price += this.productLists[i].num * this.productLists[i].retailPrice
            }
            return price
        },
        // 计算总供货价
        totalSupplyPrice() {
            let price = 0
            let num = this.productLists.length
            for (var i = 0; i < num; i++) {
                if (this.productLists[i].selected) price += this.productLists[i].num * this.productLists[i].supplyPrice
            }
            return price
        },
        // 计算理论结算价
        totalNominalSettlementPrice() {
            let price = 0
            let num = this.productLists.length
            for (var i = 0; i < num; i++) {
                if (this.productLists[i].selected) price += this.productLists[i].num * this.productLists[i].nominalSettlementPrice
            }
            return price
        }
    },
    mounted() {
        handleScrollPage(this.$refs.wrapper)
    },
    methods: {
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        // 添加产品
        selectProduct(query) {
            this.$refs['add-finish-product-dialog'].openDialog()
        },
        // 弹出成品库
        dialogEmitSelect(data) {
            let array = data.data
            if (array instanceof Array) {
                array.forEach(curr => {
                    const targetIndex = indexOfById(this.productLists, curr.id)
                    if (targetIndex !== -1) {
                        // 已经添加到生产列表的产品
                        this.updateProduct(targetIndex, 'num', this.productLists[targetIndex].num + curr.num)
                    } else {
                        // 没有添加到生产列表的产品
                        this.createProduct(curr)
                    }
                })
            }
        },
        // 更新成品
        updateProduct(index, attr, value) {
            if (this.productLists[index]) {
                this.$set(this.productLists[index], attr, value)
            }
        },
        // 新增成品
        createProduct(product) {
            product.selected = false
            this.productLists.push(product)
        },
        // 判断是否选中
        checkFlagFun(isCheck) {
            this.checkFlag = isCheck
        },
        // 保存新增的成品单
        dataFormSubmit() {
            let _self = this
            let proLib = []
            _self.productLists && _self.productLists.map(item => {
                if (!item.selected) return
                proLib.push({
                    productLibId: item.id,
                    count: item.num,
                    retailPrice: item.retailPrice,
                    supplyPrice: item.supplyPrice || 0,
                    nominalSettlementPrice: item.nominalSettlementPrice,
                    retailPriceUnit: item.retailPrice * item.num,
                    supplyPriceUnit: item.supplyPrice * item.num,
                    nominalSettlementPriceUnit: item.nominalSettlementPrice * item.num
                })
            })
            let query = {
                orderId: _self.orderId,
                kjlAuditName: _self.pricedataForm.auditName,
                totalRetailPrice: _self.totalPrice,
                productLibs: JSON.stringify(proLib),
                totalSupplyPrice: _self.totalSupplyPrice,
                totalNominalSettlementPrice: _self.totalNominalSettlementPrice
            }
            _self.$refs['pricedataForm'].validate(valid => {
                if (valid) {
                    addCproductList(query).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('操作成功')
                            _self.closeCurrentPage(_self.$route.fullPath)
                            _self.$router.push({
                                path: `/order/editCad/${_self.orderId}/1`
                            })
                        }
                    })
                }
            })
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
                padding-left: 8px;
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
                margin-top: 10px;
            }
        }
    }
</style>
