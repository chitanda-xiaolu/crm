<!--
 * @Description: 定制产品类型与酷家乐对照表
 * @Author: 陈桃
 * @Date: 2020-04-20 17:01:49
 * @LastEditTime: 2020-06-24 09:25:02
 * @LastEditors: 陈桃
 -->
<template>
    <div class="main-box dis-flex-col">
        <div class="opt-btn">
            <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin:0 40px 8px 0"
                @click="addDayOff()">新增</el-button>
                <el-date-picker
                    v-model="yearmonth"
                    type="month"
                    value-format="yyyy-MM-dd"
                    @change="changeYearMonth"
                    placeholder="请选择">
                </el-date-picker>
        </div>
        <div class="dis-flex-col">
            <el-table :data="holidayState.holidayData" border style="margin-bottom:5px">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="dayOff" label="日期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.dayOff.slice(0, 10) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="week" label="星期"></el-table-column>
                <el-table-column prop="statusName" label="状态"></el-table-column>
                <el-table-column prop="date" label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" plain icon="el-icon-edit" size="small"  @click="deleteHoliday(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <create-holiday ref="addHolidayDom"></create-holiday>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import createHoliday  from '@/components/fconfig/createHoliday'
import { deleteHoliday } from '@/api/fconfig'
export default {
    name: 'calendar',
    components: { createHoliday },
    data() {
        return {
            key: '',
            yearmonth: ''
        }
    },
    computed: {
        ...mapState({ holidayState: 'fconfig' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapActions({ getHolidayData: 'getHolidayData' }),
        getDataList() {
            this.getHolidayData()
        },
        changeYearMonth() {
            let para = this.yearmonth && this.yearmonth.split('-')
            let year = para && para[0]
            let month = para && para[1]
            this.getHolidayData({year, month})
        },
        addDayOff() {
            this.$refs.addHolidayDom.visible = true
        },
        deleteHoliday(row) {
            let id = row.id
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteHoliday({id}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getDataList()
                    }
                })
            })
        }
    }
}
</script>

<style scoped lang='scss'>
    .create-btn {
        margin-bottom: 10px;
    }
</style>
