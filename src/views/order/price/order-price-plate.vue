<template>
  <div class="main-box dis-flex-row">
    <div class="wrapper" v-loading="loading">
      <h2>板件报价明细表</h2>
      <el-row :gutter="20" style="padding: 10px 0; border-bottom: 1px solid #ccc;">
        <el-col :span="6">
          <span class="padding-label title">订单号:</span>
          {{orderDetailData.orderCode}}
        </el-col>
        <el-col :span="6">
          <span class="padding-label title">部门名称:</span>
          {{orderDetailData.storeName}}
        </el-col>
        <el-col :span="6">
          <span class="padding-label title">提交初审时间:</span>
          {{DWY_UTILS.getTimeYMD(firstAuditSubmitTime)}}
        </el-col>
      </el-row>
      <div v-if="productionList.length" class="table-box">
        <el-tabs
          v-model="activeName"
          type="border-card"
          class="tab-content"
          @tab-click="handleTabClick"
        >
          <el-tab-pane v-for="(ele, index) in productionList" :key="index" :name="`tab${index}`">
            <span slot="label">
              <i class="el-icon-date"></i>
              {{ele.auditName}}
            </span>
            <el-row :gutter="20">
              <el-col :span="8">
                <span class="padding-label">生产单号:</span>
                {{ele.productionOrderCode}}
              </el-col>
            </el-row>
            <el-row :gutter="20" style="padding: 15px 0">
              <el-col :span="6">
                <span class="padding-label">总金额(零售价):</span>
                ￥ {{renderMoney(ele.retailPrice)}} 元
              </el-col>
              <el-col :span="6">
                <span class="padding-label">理论结算价:</span>
                ￥ {{renderMoney(ele.nominalSettlementPrice)}} 元
              </el-col>
              <el-col :span="6">
                <span class="padding-label">结算系数(折扣):</span>
                {{renderMoney(ele.discount)}}
              </el-col>
              <el-col :span="6">
                <span class="padding-label">实际结算价:</span>
                ￥ {{renderMoney(ele.finalSettlementPrice)}} 元
              </el-col>
            </el-row>
            <el-table
              :data="tableData"
              row-key="id"
              :span-method="objectSpanMethod"
              :tree-props="{children: 'orderOfferList', hasChildren: true}"
              border
              default-expand-all
            >
              <el-table-column
                v-for="(item, i) in columnData"
                :key="i"
                :width="item.width"
                :label="item.label"
              >
                <!-- <template slot-scope="scope">
                  <span v-if="!item.operation">{{ scope.row[item.prop] }}</span>
                </template> -->
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <p v-else class="p-nodata">暂无数据</p>
    </div>
  </div>
</template>

<script>
import { getProductionList, getProductionPriceDetail } from '@/api/order'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            activeName: 'tab0', // 首页默认tab标签
            loading: false,
            orderId: this.$route.params.orderId,
            firstAuditSubmitTime: '',
            tableData: [],
            productionList: [],
            columnData: [
                { label: '', width: '50' },
                { label: '', width: '50' },
                { prop: 'modelName', label: '名称' },
                { prop: 'textureName', label: '材质' },
                { prop: 'width', label: '宽', width: '60px' },
                { prop: 'deep', label: '深', width: '60px' },
                { prop: 'height', label: '高', width: '60px' },
                { prop: 'quotationUnit', label: '单位', width: '70px' },
                { prop: 'quantity', label: '数量', width: '70px' },
                { prop: 'unitCost', label: '成本单价' },
                { prop: 'unitPrice', label: '销售单价' },
                { prop: 'additionalPrice', label: '附加费' },
                { prop: 'nonStandardCoef', label: '价格系数' },
                { prop: 'retailPrice', label: '金额' },
                { prop: 'costPrice', label: '理论结算价' },
                { prop: 'discount', label: '结算折扣' },
                { prop: 'finalSettlementPrice', label: '实际结算价' },
                { prop: 'modelType', label: '型号' },
                { prop: 'productCode', label: '产品编号' },
                { prop: 'color', label: '颜色' },
                { prop: 'standards', label: '规格' }
            ]
        }
    },
    mounted() {
        this.getDataList()
    },
    computed: {
        ...mapState({
            orderDetailData: (state) => state.order.orderDetailData
        })
    },
    methods: {
    // 获取生产单详情信息
        getPriceDetail(data) {
            getProductionPriceDetail({ productionOrderId: data }).then((result) => {
                this.tableData.length = 0
                if (!result.data) return
                result.data.forEach((element, index) => {
                    let sumParam
                    if (element.productType === '成品') {
                        sumParam = this.productTotal(element)
                    } else {
                        sumParam = this.recursionData(element.orderOfferList)
                    }
                    element.orderOfferList.push({
                        id: element.id + index,
                        subtotal: true,
                        modelName: `小计: 理论结算价: ${sumParam.costPrice} 元 实际结算价: ${sumParam.finalSettlementPrice} 元 金额小计: ${sumParam.retailPrice} 元`
                    })
                    this.tableData.push(element)
                    this.loading = false
                })
            })
        },
        // 首次加载获取生产列表信息
        getDataList() {
            let orderId = this.orderId
            this.productionList.length = 0
            getProductionList({ orderId }).then(async (result) => {
                this.firstAuditSubmitTime = result.data.firstAuditSubmitTime
                let $data = result.data.productionList
                if (!$data || !$data.length) return
                this.loading = true
                this.productionList = $data
                await this.getPriceDetail(
                    $data[this.activeName.slice(-1)]['productionOrderId']
                )
            })
        },
        // 递归数据
        recursionData(data) {
            let retailPrice = 0
            let costPrice = 0
            let finalSettlementPrice = 0
            if (!data && !data.length) return
            data.forEach((ele, index) => {
                retailPrice =
          Math.round(retailPrice * 100 + ele.retailPrice * 100) / 100
                costPrice = Math.round(costPrice * 100 + ele.costPrice * 100) / 100
                finalSettlementPrice =
          Math.round(
              finalSettlementPrice * 100 + ele.finalSettlementPrice * 100
          ) / 100
                if (ele.orderOfferList.length) {
                    retailPrice += parseFloat(
                        this.recursionData(ele.orderOfferList).retailPrice
                    )
                    costPrice += parseFloat(
                        this.recursionData(ele.orderOfferList).costPrice
                    )
                    finalSettlementPrice += parseFloat(
                        this.recursionData(ele.orderOfferList).finalSettlementPrice
                    )
                }
            })
            return {
                retailPrice: retailPrice.toFixed(2),
                costPrice: costPrice.toFixed(2),
                finalSettlementPrice: finalSettlementPrice.toFixed(2)
            }
        },
        // 表格跨行
        objectSpanMethod({ rowIndex, columnIndex }) {
            if (columnIndex === 1 || columnIndex === 0) {
                if (rowIndex % 19 === 0) {
                    return {
                        rowspan: 19,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },
        // 切换tab标签
        handleTabClick(tab, event) {
            this.getPriceDetail(this.productionList[tab.index]['productionOrderId'])
        },
        // 成品单价格小计
        productTotal(data) {
            return {
                retailPrice: data.retailPrice,
                costPrice: data.costPrice,
                finalSettlementPrice: data.finalSettlementPrice
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.wrapper {
  overflow: hidden;
  h2 {
    text-align: center;
  }
  .padding-label {
    padding: 0 20px 0 10%;
    color: #bb9833;
  }
  .title {
    text-align: left;
    color: #909399;
  }
  .table-box {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 72px);
    & > .tab-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      /deep/ .el-tabs__content {
        height: calc(100% - 60px);
        overflow-y: auto;
      }
    }
  }
}
.btn-link {
  position: absolute;
  right: 10px;
  top: 40px;
}
/deep/ .el-table::before {
  display: none;
}
/deep/ .el-table--border {
  border: 1px solid #ebeef5;
}
.p-nodata {
  padding: 10px 0;
  text-align: center;
}
</style>
