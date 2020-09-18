<template>
  <div class="tree-container">
        <div class="tree-top">
            <div class="tree-title">布兰莎（{{deptUsrt.userName ? deptUsrt.userName+':' : ''}} {{ deptUsrt.number }}人）</div>
            <span class="bl-xs-btn el-button--primary is-plain" @click="createDept"><i class="el-icon-plus"></i>新增</span>
            <span class="bl-xs-btn el-button--warning is-plain margin-left-20" @click="editDept"><i class="el-icon-edit"></i>编辑</span>
        </div>
        <vue-scroll class="filter-tree" :ops="scrollops">
        <el-tree
            :data="deptUsrt.deptTree"
            node-key="nodeId"
            :default-expanded-keys="expandedKeys"
            :default-checked-keys="checkedKeys"
            @node-click="changeNode"
            @node-expand="getCurrentKey($event, 0)"
            @node-collapse="getCurrentKey($event, 1)"
            :highlight-current='true'
            ref="tree"
            :render-content="renderContent"></el-tree>
        </vue-scroll>
        <el-switch
            v-model="isShow"
            class="show-all"
            active-text="有效"
            @change="showAll"
            inactive-text="全部">
        </el-switch>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update
            v-if="addOrUpdateVisible"
            ref="addOrUpdate"
            :dept="deptInfo"
            :isShowStatus="isShow ? '0' : ''"
            :editdept="addOredit"></add-or-update>
    </div>
</template>
<script>
import scrollConfig from '../../../config/scroll' // 滚动条配置项
import AddOrUpdate from './dept-add-or-update'
import { mapState, mapMutations, mapActions } from 'vuex'
import SYSTEMVALUE from '@/utils/config'
import { mergeObject, filterFalsy, arrayRemove, queryParam } from '@/utils/utils'
export default {
    props: ['status'],
    components: {
        AddOrUpdate
    },
    data() {
        return {
            scrollops: scrollConfig,
            key: 'user',
            isShow: true, // switch开关默认状态
            addOrUpdateVisible: false,
            addOredit: '',
            deptInfo: '24',
            filterText: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            isSelected: true, // tree是否默认全部展开
            expandedKeys: ['24'], // tree 需要展开的节点
            checkedKeys: [''] // 默认选中
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    mounted() {
        this.getDept({status: 0, userStatus: 0, platform: SYSTEMVALUE.COMPANY_PLATFORM})
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', deptUsrt: 'deptUser' })
    },
    methods: {
        ...mapMutations({ setDeptId: 'SET_DEPTID', setCurrent: 'SET_PAGINATION_CURRENT' }),
        ...mapActions({getData: 'getData', getDept: 'getDept'}),
        showAll(e) {
            let param = {
                platform: SYSTEMVALUE.COMPANY_PLATFORM,
                status: e ? 0 : '',
                userStatus: this.status
            }
            this.getDept(param)
            this.$emit('isShow', this.isShow ? '0' : '')
        },
        renderContent(h, { node, data }) {
            return (
                <span>
                    <span>
                        <span>{node.label}</span>
                    </span>
                    <span >
                        <p size="mini" style="color:#E6A23C;">{`${data.userName ? data.userName + '：' : data.userName}${data.countUser || 0}`}</p>
                    </span>
                </span>)
        },
        changeNode(e) {
            if (this.deptUsrt.isCheckedDom) {
                this.deptUsrt.isCheckedDom.children[0].style.background = ''
            }
            let param = { key: this.key, current: 1 }
            this.setCurrent(param)
            this.setDeptId(e.value)
            let options = mergeObject(queryParam(this.queryData.query[this.key].dataForm), this.queryData.query[this.key].pagination, {
                deptId: this.deptUsrt.selectDeptId
            })
            this.getData(filterFalsy(options))
            this.checkedKeys[0] = e.value
        },
        createDept(id) {
            this.addOrUpdateVisible = true
            this.addOredit = 'add'
            this.deptInfo = this.deptUsrt.selectDeptId || '24'
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(this.$refs.addOrUpdate, id)
            })
        },
        editDept() {
            this.deptInfo = this.deptUsrt.selectDeptId
            this.addOredit = 'editDept'
            if (this.deptUsrt.selectDeptId) {
                this.addOrUpdateVisible = true
            } else {
                this.addOrUpdateVisible = false
                this.$message({
                    message: '请先选择要编辑的部门',
                    type: 'warning'
                })
            }
            this.$nextTick(() => {
                this.$refs.addOrUpdate && this.$refs.addOrUpdate.init(this.$refs.addOrUpdate, this.deptUsrt.selectDeptId)
            })
        },
        getCurrentKey(e, num) {
            // num 判断是否展开 0为展开 1为关闭
            this.checkedKeys[0] = e.nodeId
            if (!num) {
                this.expandedKeys.push(e.nodeId)
            } else {
                arrayRemove(this.expandedKeys, e.nodeId)
            }
        }
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/post_role/index";
    @import "../../assets/scss/common/tree"
</style>
