<!--
 * @Description: 定制产品类型与酷家乐对照表
 * @Author: 陈桃
 * @Date: 2020-04-20 17:01:49
 * @LastEditTime: 2020-04-27 17:07:46
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <div class="opt-btn">
            <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="addKjlClass()">新增</el-button>
        </div>
        <div class="dis-flex-col">
            <el-table :data="kjlClassState.kjlClassTableData" border style="margin-bottom:5px">
                <el-table-column type="index" label="序号">
                    <template slot-scope="scope">
                        <span>{{(pagination.current - 1) * pagination.size + scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="customTypeName" label="类型"></el-table-column>
                <el-table-column prop="kjlCategory" label="酷家乐类别"></el-table-column>
                <el-table-column prop="kjlType" label="酷家乐一级分类"></el-table-column>
                <el-table-column prop="kjlSubType" label="酷家乐二级分类"></el-table-column>
                <el-table-column prop="prodCatId" label="真分类ID"></el-table-column>
                <el-table-column prop="toolType" label="工具线"></el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>
                <el-table-column prop="date" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" size="small"  @click="editKjlClass(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination-position"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagination.size"
                v-show="kjlClassState.kjlClassTotal >= 1000"
                layout="total, sizes, prev, pager, next, jumper"
                :total="kjlClassState.kjlClassTotal">
            </el-pagination>
        </div>
        <create-kjl-class ref="kjlAddClass"></create-kjl-class>
        <edit-kjl-class ref="kjlEditClass"></edit-kjl-class>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import createKjlClass  from '@/components/pconfig/kjl/createKjlClass'
import editKjlClass  from '@/components/pconfig/kjl/editKjlClass'
export default {
    name: 'kjlclass',
    components: { createKjlClass, editKjlClass },
    data() {
        return {
            key: 'kjlclass',
            pagination: {current: 1, size: 1000}
        }
    },
    computed: {
        ...mapState({ kjlClassState: 'pconfig' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapActions({ getKjlClassTableData: 'getKjlClassTableData' }),
        getDataList() {
            this.getKjlClassTableData(this.pagination)
        },
        addKjlClass() {
            this.$refs.kjlAddClass.visible = true
        },
        editKjlClass(data) {
            this.$refs.kjlEditClass.visible = true
            this.$refs.kjlEditClass.classId = data.id
        },
        handleSizeChange(val) {
            this.pagination.size = val
            this.getDataList()
        },
        handleCurrentChange(val) {
            this.pagination.current = val
            this.getDataList()
        }
    }
}
</script>

<style scoped lang='scss'>
    .create-btn {
        margin-bottom: 10px;
    }
    .pagination-position {
        position: fixed;
        bottom: 3%;
        background: #FFF;
        z-index: 999;
        width: 100%;
        border-top: 1px solid #eee;
    }
</style>
