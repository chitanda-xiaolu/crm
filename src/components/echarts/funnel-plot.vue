<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>机会漏斗</span>
            <el-select
                v-model="dataForm.selectOptions"
                class="interval-sel"
                filterable
                remote
                @change="changeSelectOptions"
                reserve-keyword
                placeholder="指定部门">
                <el-option
                    v-for="item in selectOptionsData"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select
                v-model="dataForm.deptIds"
                class="interval-sel"
                placeholder="请选择部门"
                filterable
                v-show="showDept"
                @change="changeOptions"
                remote
                reserve-keyword>
                <el-option
                    v-for="item in selectDeptList"
                    :key="item.deptId"
                    :label="item.simpleName"
                    :value="item.deptId">
                </el-option>
            </el-select>
        </div>
        <div class="block">
            <el-date-picker
                v-model="dataForm.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH mm ss"
                @change="changeTime"
                :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <div :id="id" class="funnel-plot" :style="{width: '100%', height: '270px'}"></div>
    </el-card>
</template>

<script>
import echarts from 'echarts'
import { getAllSaleOpportunity, deptList } from '@/api/home'
import { sum } from '@/utils/utils'
import echartsTheme from '../echarts/theme/westeros.json'
export default {
    name: 'funnelPlot',
    props: ['funnelData'],
    data() {
        return {
            id: 'funnelPlot',
            myChart: null,
            data: [],
            selectDeptList: [], // 部门列表
            showDept: false,
            lineData: ['跟进', '已见面', '已出方案', '已交订', '赢单'],
            dataForm: {
                date: '',
                selectOptions: 'company'
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            selectOptionsData: [
                {'id': 1, 'label': '本公司', value: 'company'},
                {'label': '指定部门', value: 'dept'},
                {'label': '自己', value: 'self'}
            ]
        }
    },
    beforeDestroy() {
        if (!this.myChart) {
            return
        }
        this.myChart.dispose()
        this.myChart = null
    },
    mounted() {
        this.getDataList()
        this.getSelectDeptList()
    },
    methods: {
        changeSelectOptions() {
            if(this.dataForm.selectOptions === 'dept') {
                this.showDept = true
            } else {
                this.showDept = false
                this.dataForm.deptIds = ''
            }
            this.dataForm.selectOptions !== 'dept' && this.getDataList()
        },
        // 选择部门
        changeOptions() {
            this.getDataList()
        },
        getSelectDeptList() {
            deptList().then(result => {
                if(result.code === 200 && result.success) {
                    this.selectDeptList = result.data
                }
            })
        },
        getDataList() {
            this.data.length = 0
            let query = {}
            if(this.dataForm.date) {
                query.startTime = this.dataForm.date[0].slice(0, 10)
                query.endTime = this.dataForm.date[1].slice(0, 10)
            }
            if(this.dataForm.selectOptions && this.dataForm.selectOptions === 'self') {
                query.userId = JSON.parse(sessionStorage.getItem('vuex')).user.userId
            }
            if(this.dataForm.deptIds) {
                query.deptId = this.dataForm.deptIds
            }
            getAllSaleOpportunity(query).then(result => {
                if(result.code === 200 && result.success) {
                    let resData = result.data
                    let arr = [resData.followCount, resData.meetCount, resData.planCount, resData.subCount, resData.winOrderCount]
                    let sumTotal = sum(arr)
                    arr.forEach((item, index) => {
                        this.data.push({value: `${(item / sumTotal * 100).toFixed(2)}`, name: `${this.lineData[index]}(${item})`})
                    })
                    arr.length = 0
                    this.loadChart()
                }
            })
        },
        loadChart() {
            echarts.registerTheme('westeros', echartsTheme)
            this.myChart = echarts.init(document.getElementById(this.id))
            this.myChart.setOption(this.initOption())
        },
        initOption() {
            let data = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c}%'
                },
                toolbox: {
                    right: 30,
                    feature: {
                        saveAsImage: {}
                    }
                },
                legend: {
                    data: this.lineData
                },
                calculable: true,
                series: [
                    {
                        name: '机会漏斗',
                        type: 'funnel',
                        left: '0%',
                        top: 10,
                        x2: 0,
                        bottom: 0,
                        width: '350px',
                        height: '270px',
                        min: 0,
                        max: 100,
                        minSize: '1%',
                        sort: 'descending',
                        gap: 1,
                        label: {
                            normal: {
                                position: 'inside',
                                formatter: '{b}'
                            },
                            emphasis: {
                                position: 'inside',
                                formatter: '{b}: {d}'
                            }
                        },
                        labelLine: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        emphasis: {
                            label: {
                                fontSize: 18
                            }
                        },
                        data: this.data
                    }
                ]
            }
            return data
        },
        // 修改现金充值日期
        changeTime(val) {
            this.getDataList()
        }
    }
}
</script>

<style scoped lang='scss'>
    @import '@/assets/scss/echart/home';
</style>
