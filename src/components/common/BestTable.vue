<!--
 * @Description: 更好的table组件
 * @Author: Zale Ying
 * @Date: 2020-04-25 16:13:32
 * @LastEditTime: 2020-05-20 16:48:39
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="flex-table">
        <el-table
            :data="dataList"
            border
            :row-style="lineHeight"
            v-loading="loading"
            :tree-props="{children: childrenName, hasChildren: true}"
            :row-key="rowKey"
            height="auto"
            :row-class-name="specialClass && tableRowClassName"
            @selection-change="handleSelectionChange"
            :header-cell-style="{'background-color': '#f0f0f0'}">
            <el-table-column
                v-if="showSelectBox"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center">
                <template slot-scope="scope">
                    <span>{{(queryData.query[key].pagination.current - 1) * queryData.query[key].pagination.size + scope.$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-for="(item, index) in columnList"
                :fixed="item.fixed"
                :key="index"
                :label="item.label"
                :width="item.width || 'auto'"
                :min-width="item.minWidth || ''">
                <template slot-scope="scope">
                    <router-link v-if="item.link" :to="{ path: `${item.link.path}/${item.link.param(scope.row)}` }">{{ scope.row[item.code] }} </router-link>
                    <span v-else-if="item.date">{{ DWY_UTILS.getTimeYMD(scope.row[item.code]) }}</span>
                    <span v-else-if="item.doubleDate" v-show="scope.row[item.startDate]">{{ `${DWY_UTILS.getTimeYMD(scope.row[item.startDate])}~${DWY_UTILS.getTimeYMD(scope.row[item.endDate])}` }}</span>
                    <span v-else-if="item.threeUnary">
                        {{ scope.row[item.code] === item.threeUnary[0] ? item.threeUnary[1] : item.threeUnary[2] }}
                    </span>
                    <span v-else-if="item.image">
                        <viewer class="img-outer-box" >
                            <img class="row-image-preview"
                                :src="scope.row.picPath" />
                        </viewer>
                    </span>
                    <span v-else-if="!item.link || !item.combination">{{ renderThisRow(item.type, scope.row[item.code]) }}</span>
                    <span v-if="item.operation">
                        <template v-for="btn in optBtnList">
                            <el-button
                                :key="btn.id"
                                type="text"
                                size="small"
                                :icon="btn.icon"
                                v-if="btn.isShow(scope.row)"
                                @click="btnFun(scope.row, btn.type)"
                                style="margin-right:8px">{{btn.title}}</el-button>
                        </template>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination-position"
            v-show="!noPagination && pageIsShow"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="queryData.query[key].pagination.current"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="queryData.query[key].pagination.size"
            :total="total"
            :layout="layout"></el-pagination>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ColumnConfig from '../../../config/columnList'
export default {
    data() {
        return {
            key: this.$route.name,
            layout: 'total, sizes, prev, pager, next, jumper',
            columnList: ColumnConfig[this.$route.name]['columns'],
            loading: true
        }
    },
    props: {
        dataList: { // 数据源
            required: true,
            type: Array,
            default: function () { return [] }
        },
        total: {// 总条数
            default: 0
        },
        specialClass: {}, // 行特殊处理
        pagination: {},
        noPagination: {
            type: Boolean,
            default: function () { return false }
        },
        optBtnList: { // 按钮列表
            type: Array
        },
        pageIsShow: { // 页面级是否显示分页，一般超过20条显示(eg: :pageIsShow="choice.total >= 20" )
            type: Boolean,
            default: function () { return true }
        },
        rowKey: {
            type: String
        }, // 行id
        width: { // 列宽
            type: Number
        },
        childrenName: {
            type: String
        },   // 下拉表格
        fixed: { // 接受 Boolean 值或者leftright，表示左边固定还是右边固定

        },
        showSelectBox: { // 多选
            default: function () { return false }
        },
        lineHeight: {}
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    watch: {
        dataList() {
            this.loading = false
        }
    },
    mounted() {
        this.loading = Boolean(!this.dataList.length)
    },
    methods: {
        ...mapMutations({ setCurrent: 'SET_PAGINATION_CURRENT', setSize: 'SET_PAGINATION_SIZE' }),
        getDataList(data) {
            this.dataList = data || []
        },
        renderThisRow(type = '', data) {
            /* eslint-disable */
            switch(type) {
            case 'date':
                return this.DWY_UTILS.getTimeYMD(data)
                break
            case 'operation':
                break
            case 'distributor':
                break
            case 'doubleDate':
                break
            case 'sex':
                return data === 1 ? '男' : '女'
                break
            default:
                // 默认代码块
                return data
            }
            /* eslint-disable */
        },
        // 表格行一系列操作
        btnFun(data, type) {
            this.$emit('optThisRow', data, type)
        },
        // 特殊行class
        tableRowClassName({row}) {
            if (row[this.specialClass.id] === this.specialClass.value) {
                return this.specialClass.className
            }
            return ''
        },
        // 表格多选
        handleSelectionChange(data) {
            this.$emit('selectRows', data)
        },
        // 每页数
        sizeChangeHandle(val) {
            let param = { key: this.key, size: val }
            this.setSize(param)
            this.$parent.tableSizeChange()
        },
        // 翻页
        currentChangeHandle(val) {
            let param = { key: this.key, current: val }
            this.setCurrent(param)
            this.$parent.tableCurrentChange()
        }
    }
}
</script>
<style scoped lang="scss">
    a {
        color: $linkColor;
    }
    .flex-table {
        display: flex;
        flex-direction: column;
        flex: 2;
        min-height: 10px;
    }
</style>
