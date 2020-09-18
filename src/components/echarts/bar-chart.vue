<!--
 * @Description: 订单跟踪统计图表
 * @Author: Zale Ying
 * @Date: 2019-09-17 18:06:03
 * @LastEditTime: 2020-07-20 15:25:24
 * @LastEditors: Zale Ying
-->
<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="bar-title">业绩统计</span>
            <span class="margin-right">统计范围：</span>
            <el-select
                v-model="selectScope"
                filterable
                remote
                @change="changeSelectScope"
                class="margin-right select-tip"
                reserve-keyword>
                <el-option
                    v-for="item in selectScopeData"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select
                v-show="selectScope === 2"
                v-model="dataForm.regionId"
                filterable
                remote
                 @change="changeSelectRegion"
                reserve-keyword
                class="margin-right"
                placeholder="指定片区">
                <el-option
                    v-for="item in selectFieldsData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <span class="margin-right"> 统计时间：</span>
            <el-select
                v-model="dataForm.selectDate"
                filterable
                class="margin-right select-tip"
                remote
                @change="changeSelectDate"
                reserve-keyword>
                <el-option
                    v-for="item in selectTime"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-date-picker
                v-show="dataForm.selectDate === 6"
                v-model="dataForm.date"
                type="daterange"
                align="right"
                :picker-options="pickerOptions"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH mm ss"
                @change="changeTime">
            </el-date-picker>
            <el-radio-group v-model="groupOption" class="group-options" @change="changeGroupType">
                <el-radio :label="1">按天</el-radio>
                <el-radio :label="2">按周</el-radio>
                <el-radio :label="3">按月</el-radio>
                <el-radio :label="4">按季度</el-radio>
            </el-radio-group>
        </div>
        <div class="bar-show">
            <div :id="id" class="orderArea orderbarArea" :style="{width: '75%', height: '320px'}"></div>
            <div class="total-data">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <span class="money-label"> &nbsp;本日下单：</span>
                        <el-card shadow="always">
                            <span class="money money-today">{{renderMoney((todayMoney || 0).toFixed(2))}} <i class="unit">元</i></span>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <span class="money-label"> &nbsp;本月下单：</span>
                        <el-card shadow="always">
                            <span class="money money-month">{{renderMoney((monthMoney || 0).toFixed(2))}} <i class="unit">元</i></span>
                        </el-card>
                    </el-col>
                    <el-col :span="24">
                        <span class="money-label"> &nbsp;本季度下单：</span>
                        <el-card shadow="always">
                            <span class="money money-quarter">{{renderMoney((quarterMoney || 0).toFixed(2))}} <i class="unit">元</i></span>
                        </el-card>
                    </el-col>
                    <el-col :span="24">
                        <span class="money-label"> &nbsp;本年度合计下单：</span>
                        <el-card shadow="always">
                            <span class="money money-year">{{renderMoney((yearMoney || 0).toFixed(2))}} <i class="unit">元</i></span>
                        </el-card>
                    </el-col>
                    <el-col :span="24">
                        <span class="money-label"> &nbsp;本年度合计回款：</span>
                        <el-card shadow="always">
                            <span class="money moneyyear-charge">{{renderMoney((yearRechargeMoney || 0).toFixed(2))}} <i class="unit">元</i></span>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-button class="export-btn" @click="exportDetail">导出</el-button>
    </el-card>
</template>

<script>
import echarts from 'echarts'
import echartsTheme from '../echarts/theme/westeros.json'
import { regionData, getOrderCount, amountStatisticsy } from '@/api/home'
import { exportHomeList } from '@/api/export'
import { exportFile, filterDate } from '@/utils/utils'
export default {
    name: 'barChat',
    data() {
        let _self = this
        return {
            id: 'barChart',
            myChart: null,
            data: [],
            groupOption: 3,
            showDept: false,
            selectFieldsData: [],
            selectScope: 1,
            xAxisData: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
            dataForm: {
                date: '',
                regionId: '',
                startTime: _self.getCurrMonth()[0],
                endTime: _self.getCurrMonth()[1]
            },
            groupType: 3,
            selectScopeData: [{id: 1, label: '全部'}, {id: 2, label: '选择片区'}],
            selectTime: [{id: 1, label: '今天'}, {id: 2, label: '本周'}, {id: 3, label: '本月'}, {id: 4, label: '本季度'}, {id: 6, label: '自定义时间'}],
            todayMoney: 0,
            monthMoney: 0,
            quarterMoney: 0,
            yearMoney: 0,
            yearRechargeMoney: 0,
            pickerOptions: {
                disabledDate: (time) => {
                    let minYear = new Date().getFullYear() - 3
                    return time > Date.now() || time.getTime() < new Date(JSON.stringify(minYear))
                }
            }
        }
    },
    mounted() {
        this.getDataList()
        this.getregionData()
        this.getStatisticsy()
    },
    beforeDestroy() {
        if (!this.myChart) return
        this.myChart.dispose()
        this.myChart = null
    },
    methods: {
        // 计算当前月起止日期
        getCurrMonth() {
            let curr = []
            let start = new Date()
            start.setDate(1)
            let date = new Date()
            let currentMonth = date.getMonth()
            let nextMonth = ++currentMonth
            let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
            let oneDay = 1000 * 60 * 60 * 24
            let end = new Date(nextMonthFirstDay - oneDay)
            let startDate = filterDate(start)
            let endDate = filterDate(end)
            curr = [startDate, endDate]
            return curr
        },
        // 修改统计时间
        changeSelectDate() {
            let times = this.dataForm.selectDate // 天、周、月、季度
            switch(times) {
            case 1:
                this.dataForm.startTime = this.dateFormat()
                this.dataForm.endTime = this.dateFormat()
                break
            case 2:
                let week = new Date().getTime() + 3600 * 1000 * 24 * 7
                this.dataForm.startTime = this.dateFormat()
                this.dataForm.endTime = filterDate(week)
                break
            case 3:
                this.dataForm.startTime = this.getCurrMonth()[0]
                this.dataForm.endTime = this.getCurrMonth()[1]
                break
            case 4:
                let quar = Math.floor((new Date().getMonth() % 3 === 0 ? (new Date().getMonth() / 3) : (new Date().getMonth() / 3 + 1)))
                let currYear = new Date().getFullYear() // 季度flag
                if(quar === 1) {
                    this.dataForm.startTime = currYear + '-01-01'
                    this.dataForm.endTime = currYear + '-03-31'
                } else if(quar === 2) {
                    this.dataForm.startTime = currYear + '-04-01'
                    this.dataForm.endTime = currYear + '-06-30'
                } else if(quar === 3) {
                    this.dataForm.startTime = currYear + '-07-01'
                    this.dataForm.endTime = currYear + '-09-31'
                } else if(quar === 4) {
                    this.dataForm.startTime = currYear + '-10-01'
                    this.dataForm.endTime = currYear + '-12-31'
                }
                break
            default:
            }
            if(times !== 6) {
                this.getDataList()
            }
        },
        // 修改按天、周、月、季度
        changeGroupType(val) {
            this.groupType = val
            this.dataForm.startTime = this.getCurrMonth()[0]
            this.dataForm.endTime = this.getCurrMonth()[1]
            this.getDataList()
        },
        // 修改自定义时间
        changeTime(val) {
            this.getDataList()
        },
        // 修改统计范围
        changeSelectScope() {
            let scope = this.selectScope
            if(scope === 1) {
                this.dataForm.regionId = ''
                this.getDataList()
            }
        },
        // 修改片区
        changeSelectRegion() {
            this.getDataList()
        },
        exportDetail() {
            if(this.dataForm.date) {
                this.dataForm.startTime = this.dataForm.date[0].slice(0, 10)
                this.dataForm.endTime = this.dataForm.date[1].slice(0, 10)
                this.dataForm.groupType = this.groupType
            }
            delete this.dataForm.date
            exportHomeList({...this.dataForm}).then(result => {
                exportFile(result, '业绩统计明细')
            })
        },
        getregionData() {
            regionData().then(result => {
                if(result.success && result.code === 200) {
                    this.selectFieldsData = result.data
                }
            })
        },
        getStatisticsy() {
            amountStatisticsy().then(result => {
                if(result.code === 200 && result.success) {
                    this.todayMoney = result.data.todayMoney
                    this.monthMoney = result.data.monthMoney
                    this.quarterMoney = result.data.quarterMoney
                    this.yearMoney = result.data.yearMoney
                    this.yearRechargeMoney = result.data.yearRechargeMoney
                }
            })
        },
        getDataList() {
            this.data.length = 0
            if(this.dataForm.date) {
                this.dataForm.startTime = this.dataForm.date[0].slice(0, 10)
                this.dataForm.endTime = this.dataForm.date[1].slice(0, 10)
            }
            this.dataForm.groupType = this.groupType
            delete this.dataForm.date
            let newX = []
            getOrderCount({...this.dataForm}).then(result => {
                if(result.code === 200 && result.success) {
                    let $data = result.data
                    let xdarr = []
                    let hkarr = []
                    for(let i = 0; i < $data.length; i++) {
                        newX.push($data[i].time)
                        xdarr.push($data[i].orderPerformance)
                        hkarr.push($data[i].rechargePerformance)
                    }
                    this.xAxisData = newX
                    this.loadChart(xdarr, hkarr)
                }
            })
        },
        loadChart(xd, hk) {
            this.$nextTick(() => {
                echarts.registerTheme('westeros', echartsTheme)
                this.myChart = echarts.init(document.getElementById(this.id), 'westeros')
                this.myChart.setOption(this.initOption(xd, hk))
            })
        },
        initOption(xd, hk) {
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['下单', '回款']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.xAxisData
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        realtime: true
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 0,
                        end: 100
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '下单',
                        type: 'bar',
                        data: xd
                    },
                    {
                        name: '回款',
                        type: 'bar',
                        data: hk
                    }
                ]
            }
            return option
        },
        // 时间foramt
        dateFormat() {
            let todays = ''
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            if (month < 10) {
                month = '0' + month
            }
            if (day < 10) {
                day = '0' + day
            }
            todays = year + '-' + month + '-' + day
            return todays
        }
    }
}
</script>

<style scoped lang='scss'>
    .box-card {
        height: 380px !important;
        margin-bottom: 10px;
        .bar-title {
            font-size: 18px;
            margin-right: 8px;
        }
        .margin-right {
            margin-right: 5px;
        }
        .select-tip {
            width: 120px;
        }
        .export-btn {
            position: absolute;
            top: 69px;
            right: 38%;
        }
        .group-options {
            margin-left: 100px;
        }
        .bar-show {
            display: flex;
            justify-content: space-around;
            .total-data {
                width: 30%;
                display: flex;
                height: 100%;
                &>.el-row {
                    width: 100%;
                    .el-col {
                        margin-top: 8px;
                    }
                }
                .money {
                    font-size: 17px;
                }
                .money-today {
                    color: #F56C6C
                }
                .money-month {
                    color: #E6A23C;
                }
                .money-quarter {
                    color: #5bc6f3;
                }
                .money-year {
                    color: #409EFF;
                }
                .moneyyear-charge {
                    color: #67c23a;
                }
                .money-label {
                    font-size: 14px;
                    color: #999;
                }
                .unit {
                    font-style: normal;
                    font-size: 12px;
                }
            }
        }
    }
</style>
