<template>
    <div class="main-box dis-flex-col">
        <h2>产品报价明细表</h2>
        <el-button class="btn-link" icon="el-icon-document" type="primary" @click="offerLink" plain>板件报价明细</el-button>
        <el-row class="row-top" :gutter="20">
            <el-col :span="6"><span class="padding-label title">订单号:</span> {{orderId}}</el-col>
            <el-col :span="6"><span class="padding-label title">部门名称:</span> {{deptName}}</el-col>
            <el-col :span="6"><span class="padding-label title">提交初审时间:</span> {{DWY_UTILS.getTimeYMD(firstAuditSubmitTime)}}</el-col>
        </el-row>
        <el-row class="row-middle" :gutter="20">
            <el-col :span="6"><span class="padding-label title">客户名称:</span> {{customName}}</el-col>
            <el-col :span="18"><span class="padding-label title">客户地址:</span> {{houseAddress}}</el-col>
        </el-row>
        <el-row :gutter="20" style="padding: 15px 0">
            <el-col :span="6"><span class="padding-label">总金额(零售价):</span> ￥ {{renderMoney(retailPriceTotal)}} 元</el-col>
            <el-col :span="6"><span class="padding-label">理论结算价:</span> ￥ {{renderMoney(nominalSettlementPriceTotal)}} 元</el-col>
            <el-col :span="6"><span class="padding-label">价格系数(折扣):</span> {{renderMoney(discount)}}</el-col>
            <el-col :span="6"><span class="padding-label">实际结算价:</span> ￥ {{renderMoney(finalSettlementPriceTotal)}} 元</el-col>
        </el-row>
        <el-table
            :data="tableData"
            stripe
            border
            height="auto"
            :header-cell-style="{'background-color': '#f0f0f0'}"
            style="width: 100%; overflow-y: auto;">
            <el-table-column
                v-for="(item, i) in columnData"
                :key = i
                :width = "item.width"
                :label = "item.label">
                <template slot-scope="scope">
                    <span>
                        {{ scope.row[item.prop] }}
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getHqProductPriceDetail } from '@/api/order'
export default {
    data() {
        return {
            orderId: this.$route.params.orderId,
            customName: '',
            customMobile: '',
            deptName: '',
            houseAddress: '',
            firstAuditSubmitTime: '',
            retailPriceTotal: 0,
            nominalSettlementPriceTotal: 0,
            finalSettlementPriceTotal: 0,
            discount: 0,
            tableData: [],
            columnData: [
                {
                    prop: 'idx',
                    label: '序号',
                    width: '40px'
                }, {
                    prop: 'modelName',
                    label: '产品名称'
                }, {
                    prop: 'textureName',
                    label: '材质'
                }, {
                    prop: 'width',
                    label: '宽',
                    width: '60px'
                }, {
                    prop: 'deep',
                    label: '深',
                    width: '60px'
                }, {
                    prop: 'height',
                    label: '高',
                    width: '60px'
                }, {
                    prop: 'quotationUnit',
                    label: '单位',
                    width: '70px'
                }, {
                    prop: 'quantity',
                    label: '数量',
                    width: '70px'
                }, {
                    prop: 'unitCost',
                    label: '成本单价'
                }, {
                    prop: 'unitPrice',
                    label: '销售单价'
                }, {
                    prop: 'additionalPrice',
                    label: '附加费'
                }, {
                    prop: 'nonStandardCoef',
                    label: '价格系数'
                }, {
                    prop: 'retailPrice',
                    label: '金额'
                }, {
                    prop: 'costPrice',
                    label: '理论结算价'
                }, {
                    prop: 'discount',
                    label: '结算折扣'
                }, {
                    prop: 'finalSettlementPrice',
                    label: '实际结算价'
                }, {
                    prop: 'modelType',
                    label: '型号'
                }, {
                    prop: 'productCode',
                    label: '产品编号'
                }, {
                    prop: 'color',
                    label: '颜色'
                }, {
                    prop: 'standards',
                    label: '规格'
                }
            ]
        }
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        getDataList() {
            let orderId = this.orderId
            getHqProductPriceDetail({orderId}).then(result => {
                if (result.code === 200 && result.success) {
                    let $data = result.data
                    this.customName = $data.customName
                    this.customMobile = $data.customMobile
                    this.deptName = $data.deptName
                    this.finalSettlementPriceTotal = $data.finalSettlementPriceTotal
                    this.discount = $data.discount
                    this.firstAuditSubmitTime = $data.firstAuditSubmitTime
                    this.nominalSettlementPriceTotal = $data.nominalSettlementPriceTotal
                    this.retailPriceTotal = $data.retailPriceTotal
                    this.houseAddress = $data.houseAddress
                    $data.orderOfferList && $data.orderOfferList.forEach((element, idx) => {
                        element.idx = idx + 1
                    })
                    this.tableData = $data.orderOfferList
                }
            })
        },
        // 路由跳转
        offerLink() {
            this.$router.push({path: `/order/price/plate/${this.orderId}`})
        }
    }
}
</script>

<style scoped lang='scss'>
    .btn-link {
        width: 120px;
        position: absolute;
        right: 10px;
    }
    .row-top {
        padding-top: 20px;
    }
    .row-middle {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
    }
    h2 {
        text-align: center;
    }
    .padding-label {
        padding: 0 20px 0 50px;
        color: #bb9833;
    }
    .title {
        color: #909399;
    }
    .dis-flex-col {
        overflow-x: hidden;
        overflow-y: auto;
        width: calc(100% - 10px) !important;
        height: calc(100% - 10px) !important;
    }
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
    }
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
        background: #eee;
    }
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: #ccc;
    }
</style>
