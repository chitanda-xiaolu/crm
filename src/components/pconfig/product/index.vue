<!--
 * @Description: 产品参数配置-产品分类首页
 * @Author: 陈桃
 * @Date: 2020-04-20 17:01:49
 * @LastEditTime: 2020-05-15 17:02:38
 * @LastEditors: 陈桃
 -->
<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClickTabs">
            <el-tab-pane label="定制品" name="first">
                <el-button type="primary" icon="el-icon-plus" @click="createDzProduct" height="700" class="create-btn" plain>新增</el-button>
                <el-table :data="pconfigState.productTreeData" border :tree-props="{children: 'children'}" row-key="value" default-expand-all>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="label" label="分类"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isValid" :disabled="scope.row.levelType === 1" @change="changeDzRowStatus(scope)" inactive-text="无效" active-text="有效"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="date" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" size="small" :disabled="scope.row.levelType === 1 || scope.row.levelType === 2"  @click="editDzProduct(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="成品" name="second">
                <el-button type="primary" icon="el-icon-plus" class="create-btn" @click="createCpProduct" plain>新增</el-button>
                <el-table :data="pconfigState.productTreeData" border :tree-props="{children: 'children'}" row-key="value" default-expand-all>
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column prop="label" label="分类"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.isValid" :disabled="scope.row.levelType === 1" @change="changeCpRowStatus(scope)" inactive-text="无效" active-text="有效"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="date" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" size="small" :disabled="scope.row.levelType === 1 || scope.row.levelType === 2" @click="editCpProduct(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <create-dz-dialog ref="dzAddDialog"></create-dz-dialog>
        <edit-dz-dialog ref="dzEditDialog"></edit-dz-dialog>
        <create-cp-dialog ref="cpAddDialog"></create-cp-dialog>
        <edit-cp-dialog ref="cpEditDialog"></edit-cp-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import createDzDialog  from '@/components/pconfig/product/createDz'
import editDzDialog  from '@/components/pconfig/product/editDz'
import createCpDialog  from '@/components/pconfig/product/createCp'
import editCpDialog  from '@/components/pconfig/product/editCp'
import { useOrForbid } from '@/api/pconfig'
export default {
    name: '',
    components: {createDzDialog, createCpDialog, editDzDialog, editCpDialog},
    data() {
        return {
            activeName: 'first',
            active: '',
            inactive: ''
        }
    },
    computed: {
        ...mapState({ pconfigState: 'pconfig' })
    },
    mounted() {
        this.getDzTreeData()
    },
    methods: {
        ...mapActions({ getproductTreeData: 'getproductTreeData' }),
        createDzProduct() { // 新增定制品
            this.$refs.dzAddDialog.visible = true
        },
        editDzProduct(data) { // 编辑定制品
            this.$refs.dzEditDialog.visible = true
            this.$refs.dzEditDialog.id = data.value
        },
        createCpProduct() { //
            this.$refs.cpAddDialog.visible = true
        },
        editCpProduct(data) { // 编辑成品
            this.$refs.cpEditDialog.visible = true
            this.$refs.cpEditDialog.id = data.value
        },
        getDzTreeData() {
            this.getproductTreeData({ productType: 10000 })
        },
        getCpTreeData() {
            this.getproductTreeData({ productType: 10001 })
        },
        handleClickTabs(a, b) {
            if(a.index === '0') {
                this.getDzTreeData()
            } else {
                this.getCpTreeData()
            }
        },
        changeDzRowStatus({ row }) {
            let id = row.value
            let status = row.isValid ? '0' : '1'
            this.commonForbidOpt(id, status, 'dz')
        },
        changeCpRowStatus({row}) {
            let id = row.value
            let status = row.isValid ? '0' : 1
            this.commonForbidOpt(id, status, 'cp')
        },
        commonForbidOpt(id, status, type) {
            useOrForbid({id, status}).then(result => {
                if(result.code === 200 && result.success && !result.data) {
                    this.$message.success('操作成功')
                    if(type === 'dz') {
                        this.getDzTreeData()
                    } else {
                        this.getCpTreeData()
                    }
                } else {
                    this.$message.warning({message: result.data || '操作失败', duration: 5000})
                    if(type === 'dz') {
                        this.getDzTreeData()
                    } else {
                        this.getCpTreeData()
                    }
                }
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
