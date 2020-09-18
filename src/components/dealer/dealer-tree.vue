<!--
 * @Description:经销商部门详情
 * @Author: 陈桃
 * @Date: 2019-08-30 09:40:34
 * @LastEditTime: 2020-04-17 14:23:44
 * @LastEditors: 陈桃
 -->
<template>
    <el-tree
        :data="data"
        :props="defaultProps"
        node-key="value"
        :default-checked-keys="checkedKeys"
        @node-click="handleNodeClick"
        :highlight-current="true">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <p :class="{'list-item': !data.code}" class="item-label-tree">
                    <span
                        :title="node.label"
                        class="node-label"
                        :class="{ grey: data.status == 1, super: data.code }"
                        @click="handleNodeClick(data)">{{ node.label }}
                    </span>
                    <span class="is-visibility">
                        <el-button
                            class="detail-btn"
                            v-show="data.storeId"
                            type="text"
                            size="mini"
                            @click="() => handlestoteDetail(node, data)">
                            详情
                        </el-button>
                    </span>
                </p>
            </span>
        </el-tree>
</template>

<script>
import { dealerTree } from '@/api/dealer'
export default {
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            checkedKeys: []
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let _self = this
            let query = { distributorId: this.$route.params.id }
            dealerTree(query).then(result => {
                if (result.code === 200 && result.success) {
                    _self.$emit('emitDistributorId', result.data.id)
                    result.data.label = `${result.data.name}【 ${result.data.type === 1 ? '直营店' : '加盟店'} 】`
                    result.data.value = result.data.id
                    result.data.children = result.data.deptTreeViewNodes
                    _self.data = [result.data]
                    _self.checkedKeys.push(_self.data[0].value)
                }
            }).then(() => {
                document.getElementsByClassName('is-checked')[0].click()
            })
        },
        handleNodeClick(data) {
            this.checkedKeys.length = 0
            this.$emit('getDeptDataFromTree', data)
        },
        handlestoteDetail(node, data) {
            this.$router.push({path: '/store/detail/' + data.storeId})
        }
    }
}
</script>

<style lang="scss">
    .is-current {
        background: #f3f5f9;
    }
    .is-focusable {
        background: #fff;
    }
    .node-label {
        width: 150px;
        display: inline-block;
    }
    .detail-btn {
        padding:6px 0;
        padding: 2px 5px;
        color: #409eff;
        font-size: 12px;
        border: none;
    }
</style>
