<template>
    <el-dialog
        title="选择产品"
        :visible.sync="productVisible"
        :append-to-body="true"
        @open="openDialog"
        :modal-append-to-body="false"
        class="add-finish-product-dialog">
        <el-form
            :model="productDateForm"
            ref="numberValidateForm"
            label-width="70px"
            class="add-finish-product-dialog-form"
            :inline="true">
            <el-form-item label="分类：" prop="type">
                <el-cascader
                    v-model="productDateForm.type"
                    style="width:100%"
                    change-on-select
                    placeholder="请选择产品"
                    clearable
                    :options="searchProList"
                    filterable></el-cascader>
            </el-form-item>
            <el-form-item label="名称：" prop="kjlName">
                <el-input clearable v-model="productDateForm.kjlName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchProducts">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row class="select-product-container" :gutter="20">
            <el-col class="product-item"  v-for="item in productList" :key="item.id">
                <div class="pro-top">
                    <div class="top-left">
                        <viewer class="image-preview-box">
                            <img :src="item.picPath" />
                        </viewer>
                    </div>
                    <div class="top-right">
                        <el-tooltip placement="top">
                            <div slot="content">{{item.name}}</div>
                            <p class="text-ellipsis">{{item.name}}</p>
                        </el-tooltip>
                        <el-tooltip placement="right">
                            <div slot="content">{{item.kjlCode}}</div>
                            <p class="text-ellipsis">{{item.kjlCode}}</p>
                        </el-tooltip>
                        <el-tooltip placement="bottom">
                            <div slot="content">{{item.standards}}</div>
                            <p class="text-ellipsis">{{item.standards}}</p>
                        </el-tooltip>
                    </div>
                </div>
                <div class="pro-bottom">
                    <span class="pro-price">
                        <span class="price-pre">¥<span class="price-num">{{item.retailPrice}}</span></span>
                    </span>
                    <el-checkbox-group v-model="checkList" @change="handleChangeAddProducts">
                        <el-checkbox :label="item" class="font-weight:normal">加入生产单</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
        </el-row>
        <div class="pagination-box">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="productDateForm.current"
                :page-size="productDateForm.size"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSubmitProducts">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getProductList, serachProductsData } from '@/api/order'
import { filterFalsy } from '@/utils/utils'
export default {
    name: 'addFinishProductDialog',
    data() {
        return {
            productVisible: false,
            productList: [],
            searchProList: [],
            selectedProductLists: [],
            total: 0,
            productDateForm: {
                type: '',
                kjlName: '',
                code: '',
                size: 9,
                current: 1,
                status: 0
            },
            checkList: []
        }
    },
    methods: {
        getProductList() {
            getProductList(filterFalsy(this.productDateForm)).then(result => {
                if (result.code === 200 && result.success) {
                    this.total = result.data.total
                    if (result.data.records) {
                        let list = result.data.records
                        list && list.map(item => {
                            item.num = 1
                        })
                        this.productList = list
                    } else {
                        this.productList.length = 0
                    }
                }
            })
        },
        getSerachProductsData() {
            serachProductsData({ productType: 10001, status: 0 }).then(result => {
                if (result.code === 200 && result.success) {
                    this.searchProList = result.data
                }
            })
        },
        // 查询产品
        searchProducts() {
            if (typeof this.productDateForm.type === 'string') {
                this.productDateForm.type = this.productDateForm.type
            } else {
                this.productDateForm.type = this.productDateForm.type.pop()
            }
            this.getProductList()
        },
        // 加入生产单
        handleChangeAddProducts(val) {
            this.selectedProductLists = val
        },
        // 勾选产品回来，列表渲染
        handleSubmitProducts() {
            if (!this.selectedProductLists.length) {
                this.$message({
                    message: '您暂未选择一个产品',
                    type: 'warning'
                })
                return
            }
            this.$emit('selected', {
                data: [].concat(this.selectedProductLists.map(curr => {
                    return {
                        ...curr,
                        num: 1      // 加入生产单默认数量为1
                    }
                }))
            })
            this.closeDialog()
        },
        openDialog() {
            this.productVisible = true
            this.getProductList()
            this.getSerachProductsData()
        },
        closeDialog() {
            this.productVisible = false
            this.$emit('finish')
        },
        handleCurrentChange(val) {
            this.productDateForm.current = val
            this.getProductList()
        }
    }
}
</script>
<style lang="scss" scoped>
    .select-product-container {
        width: 100%;
        max-height: 450px;
        overflow: auto;
        margin: 0 !important;
        .pagination-box {
            margin-top: 10px;
        }
        .product-item {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            width: 31%;
            margin: 5px 1%;
            height: 32%;
            .pro-top {
                display: flex;
                flex-direction: row;
                height: 112px;
                margin-bottom: 5px;
                .top-left {
                    width: 40%;
                    img {
                        border-radius: 3px;
                        margin-top: 8px;
                        width: 100%;
                        height: 100px;
                    }
                }
                .top-right {
                    width: 57%;
                    margin: 15px 0 0 7px;
                    p {
                        height: 30px;
                        width: 100%;
                        word-wrap: break-word;
                        word-break: break-all;
                        overflow: hidden;
                    }
                }
            }
            .pro-bottom {
                height: 35px;
                display: flex;
                justify-content: space-around;
                padding: 0 8px;
                .pro-price {
                    width: 60%;
                    display: inline-block;
                    .price-pre {
                        display: inline-block;
                        font-size: 12px;
                    }
                    .price-num {
                        font-size: 15px;
                        margin-left: 5px;
                        color: red;
                    }
                }
            }
        }
    }
    /deep/ .el-dialog__body {
        padding: 18px 20px !important;
    }
</style>
