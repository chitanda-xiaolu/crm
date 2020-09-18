<!--
 * @Description: 工厂参数配置
 * @Author: 陈桃
 * @Date: 2020-04-20 15:59:18
 * @LastEditTime: 2020-06-29 10:57:13
 * @LastEditors: 陈桃
 -->
<template>
    <div class="main-box dis-flex-col" style="overflow: auto;">
        <el-tabs type="border-card">
            <el-tab-pane label="交付周期" v-if="hasPermission(Permission.fconfig.delivery.code)">
                <el-table :data="pconfigState.productTreeData" border :tree-props="{children: 'children'}"  row-key="value" default-expand-all>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="label" label="分类" width="400"></el-table-column>
                    <el-table-column prop="status" label="交付周期（天）" width="220">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.delivery" controls-position="right" @change="changeRowCycle(scope)" :min="1"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="工作日历" v-if="hasPermission(Permission.fconfig.dayOff.code)">
                <work-calendar></work-calendar>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { updateCycle } from '@/api/pconfig'
import workCalendar  from '@/components/fconfig/workCalendar'
export default {
    name: 'pconfig',
    components: { workCalendar },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({ pconfigState: 'pconfig' })
    },
    mounted() {
        this.getTableTreeData()
    },
    methods: {
        ...mapActions({ getproductTreeData: 'getproductTreeData' }),
        getTableTreeData() {
            this.getproductTreeData()
        },
        changeRowCycle({row}) {
            let id = row.value
            let delivery = row.delivery
            updateCycle({ id, delivery }).then(result => {
                if(result.code === 200 && result.success) {
                    this.$message.success('操作成功')
                    this.getTableTreeData()
                }
            })
        }
    }
}
</script>

<style scoped lang='scss'>

</style>
