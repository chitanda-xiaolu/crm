<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn">
            <el-button
                v-if="hasPermission(Permission.product.add.code)"
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="addProduct()">新增成品</el-button>
            <el-button
                v-if="hasPermission(Permission.product.edit_status.code)"
                size="mini"
                icon="el-icon-sell"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="optShelf('up')">上架</el-button>
            <el-button
                v-if="hasPermission(Permission.product.edit_status.code)"
                size="mini"
                icon="el-icon-sold-out"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="optShelf('down')">下架</el-button>
        </div>
        <best-tables
            :data-list="productTableList"
            :total="total"
            :optBtnList="this.optBtnList()"
            :showSelectBox="true"
            :specialClass="specialClass"
            @selectRows="getSelectVal"
            @optThisRow="editHandle" />
     </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import { mergeObject, queryParam, filterFalsy } from '@/utils/utils'
import { productList, LowerOrLower, productTree } from '../../api/product'
import BtnConfig from '../../../config/operationList'

export default {
    name: 'product',
    components: {
        BestTables,
        FormModule
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            total: 0,
            productTableList: [],
            dataForm: {
                activityName: '',
                activityStatus: '0'
            },
            specialClass: { className: 'invalid-row', id: 'status', value: 1 },
            distributorList: [],
            addOrUpdateVisible: false,
            pIds: ''
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', activity: 'activity', distributor: 'distributor' })
    },
    mounted() {
        // 初始化分页
        this.getDataList()
        productTree({ productType: 10001, status: 0 }).then(res => {
            this.setQueryToSingle({ key: this.key, name: 'speType', dataType: 'cascaderList', value: res.data })
        })
    },
    methods: {
        ...mapMutations({ setQueryToSingle: 'SET_QUERYTOSINGLE' }),
        // 行操作按钮
        optBtnList() {
            return BtnConfig.product.btns
        },
        // 获取数据列表
        getDataList() {
            let _self = this
            let param = mergeObject(queryParam(_self.queryData.query[_self.key].dataForm), _self.queryData.query[_self.key].pagination)
            param.speType = param.speType && param.speType.pop()
            productList(filterFalsy(param)).then(result => {
                if (result.code === 200 && result.success) {
                    _self.productTableList = result.data.records || []
                    _self.total = result.data.total
                }
            })
        },
        // 编辑产品
        editHandle(row) {
            this.$router.push({
                path: '/product/edit',
                query: {id: row.id}
            })
        },
        optShelf(type) {
            if(type === 'up') {
                this.getLowerUpper('0')
            } else if(type === 'down') {
                this.getLowerUpper('1')
            }
        },
        getLowerUpper(status) {
            let ids = this.pIds && this.pIds.join()
            if(!ids) {
                this.$message.warning('请选择要操作的产品')
            } else {
                LowerOrLower({ids, status: status}).then(result => {
                    if(result.code === 200 && result.success) {
                        this.$message.success('操作成功')
                        this.getDataList()
                    } else {
                        this.$message.warning('操作失败')
                    }
                })
            }
        },
        // 勾选上下架
        getSelectVal(val) {
            let proIds = []
            if(val) {
                val.map(item => {
                    proIds.push(item.id)
                })
            }
            this.pIds = proIds
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        addProduct() {
            this.$router.push('/product/add')
        },
        addOrUpdateHandle(row) {
            this.$router.push({
                path: '/store/edit',
                query: {id: row.id, distributorId: row.distributorId}
            })
        }
    }
}
</script>

<style scoped lang='scss'>
    a {
        color: $linkColor;
    }
    /deep/ .el-table .invalid-row {
        color: #b5b4b4;
    }
</style>
