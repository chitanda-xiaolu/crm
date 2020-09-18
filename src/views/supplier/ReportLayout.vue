<template>
<el-scrollbar style="height:100%">
  <el-row :gutter="20" style="height: 1500px">
    <el-col :span="24">
      <el-date-picker
        v-model="supplierForm.date"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        style="margin-left: 560px; margin-right: 10px"
        >
      </el-date-picker>
      <el-button @click="querySupplierCount">查询</el-button>
      <echart :chartData="echartData.user" style="height: 520px; margin-nbttom: 6px"></echart>
    </el-col>
    <el-col :span="24">
      <el-date-picker
        v-model="productionForm.date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        value-format="yyyy-MM-dd"
        style="margin-right: 10px; margin-left: 140px">
      </el-date-picker>
      <el-button @click="queryProductionCount">查询</el-button>
      <echart style="height: 400px" :chartData="echartData.productions"
              :isAxisChart="false"></echart>
    </el-col>
    <el-col :span="24">
      <echart style="height: 400px" :chartData="echartData.order"></echart>
    </el-col>
  </el-row>
 </el-scrollbar>
</template>

<script>
import Echart from '@/components/echarts/Echart'
import { getSupplierCount, getProductionCount, getSupplierByTime } from '@/api/supplier'
// getProductionCount
export default {
    data() {
        return {
            // 存储供应商查询开始时间和查询结束时间
            supplierForm: {
                date: ''
            },
            productionForm: {
                date: ''
            },
            data: [],
            echartData: {
                order: {
                    xData: [],
                    series: [],
                    xName: '',
                    yName: ''
                },
                user: {
                    xData: [],
                    series: [],
                    xName: '',
                    yName: ''
                },
                productions: {
                    series: []
                }
            }
        }
    },
    components: {Echart},
    methods: {
        querySupplierCount() {
            this.SupplierCount()
        },
        queryProductionCount() {
            this.getProduction()
        },
        SupplierCount() {
            this.data.length = 0
            let query = {}
            // 判断是否选择了开始时间和结束时间
            if(this.supplierForm.date) {
                // 获取开始时间
                query.startTime = this.supplierForm.date[0]
                // 获取结束时间
                query.endTime = this.supplierForm.date[1]
            }
            getSupplierCount(query).then(result => {
                if(result.code === 200 && result.success) {
                    this.echartData.user.series = []
                    this.echartData.user.xData = result.data.map(item => item.areaName.slice(0, 3))
                    this.echartData.user.series.push(
                        {name: '供应商', data: result.data.map(item => item.areaNamesum), type: 'bar'}
                    )
                    this.echartData.user.xName = '(地区)'
                    this.echartData.user.yName = '供应商数量(单位:个)'
                }
            })
        },
        getProduction() {
            this.data.length = 0
            // 用于暂存查询的开始时间和结束时间
            let query = {}
            if(this.productionForm.date) {
                query.startTime = this.productionForm.date[0].slice(0, 10)
                query.endTime = this.productionForm.date[1].slice(0, 10)
                console.log(query)
            }
            getProductionCount(query).then(result  => {
                if(result.code === 200 && result.success) {
                    let productionCount = []
                    let prod = []
                    result.data.forEach(item => {
                        let production = {}
                        production.name = item.productName
                        production.value = item.productNameSum
                        productionCount.push(production)
                    })
                    prod.push({data: productionCount, type: 'pie', formatter: '{a} <br/>{b} : {c} ({d}%)'})
                    this.echartData.productions.series = prod
                }
            })
        },
        getSupplierByTime() {
            getSupplierByTime().then(response => {
                if(response.code === 200 && response.success) {
                    console.log(response)
                    this.echartData.order.series = []
                    this.echartData.order.xData = response.data.map(item => item.createTime.slice(0, 10))
                    this.echartData.order.series.push(
                        {name: '供应商', data: response.data.map(item => item.supplierNamesum), type: 'line'}
                    )
                    this.echartData.order.xName = '时间'
                    this.echartData.order.yName = '供应商数量(单位:个)'
                }
            })
        }
    },
    created() {
        // 创建组件的时候获取数据并初始化报表
        this.SupplierCount()
        this.getProduction()
        this.getSupplierByTime()
        this.getSupplierByTime()
        // this.getProduction()
    }
}
</script>

<style scoped lang="scss">
</style>
