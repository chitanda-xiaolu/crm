<template>
    <div>
        <span class="search-year">查询年份：</span>
        <el-select v-model="year" @change="changeYear" class="year" placeholder="请选择年份">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.key">
            </el-option>
        </el-select>
        <div class="month-box" >
            <template v-for="(month, i) in months">
                <el-tag effect="plain" :key="i" class="month" :class="{ activetag: month.id }" @click="handleMonth(month)">
                    <span>{{month.statementDate}}<span class="status-name">{{month.statusName}}</span></span>
                </el-tag>
            </template>
        </div>
    </div>
</template>
<script>
import { accountStatementList } from '@/api/account'
import SYSTEMVALUE from '@/utils/config'
export default {
    data () {
        return {
            months: [],
            year: SYSTEMVALUE.ACCOUNT_SEARCH_YEAR[1].key,
            options: SYSTEMVALUE.ACCOUNT_SEARCH_YEAR
        }
    },
    computed: {
    //   ...mapState({ accountState: 'account'})
    },
    mounted() {
        this.getMonthList()
    },
    methods: {
        // 查询对账详情
        handleMonth(month) {
            if(month.id) {
                this.$router.push({
                    path: '/month/reconciliation',
                    query: {
                        id: month.id,
                        label: month.statementDate
                    }
                })
            }
        },
        // 获取12各月份对账
        getMonthList() {
            accountStatementList({ distributorId: this.$route.params.id, statementDate: this.year }).then(result => {
                if(result.code === 200 && result.success) {
                    this.months = result.data
                }
            })
        },
        // 修改年份
        changeYear(val) {
            this.getMonthList()
        }
    }
}
</script>
<style scoped lang="scss">
    .month-box {
        display: flex;
        flex-wrap: wrap;
        width: 98%;
        padding: 10px 10px 10px 10px;
    }
    .search-year {
        margin-left: 30px;
    }
    .year {
        margin-left: 13px;
    }
    .month {
        width: 22%;
        height: 60px;
        color: #409EFF;
        line-height: 60px;
        text-align: center;
        margin: 20px;
        border-radius: 9px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        position: relative;
        .status-name {
            margin-left: 3px;
            font-size: 14px;
        }
        .month-eng {
            position: absolute;
            right: 3px;
            bottom: -17px;
        }
    }
    .activetag {
        cursor: pointer;
        background-color: #fdf6ec;
        border-color: #faecd8;
        color: #e6a23c;
    }
</style>
