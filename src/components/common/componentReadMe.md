
# Tables

### 表格组件

### src/components/staff/index 实例
### 简单示例
<template>
    <div>
        <Tables 
            data-list: "[]"
            columnList: "[
                {
                    code: '', 
                    label: '', 
                    link: { path: '', id: ''},
                    date: '',
                    doubleDate: ''
                    width: '',
                    operation: { reset: {permission: permission}, edit: func }
                }
            ]" 
            total: 0
            threeUnary: [key, value1, value2]
            specialClass: { className: '', id: '', value: ''}
        />
    </div>
</template>
<script>
    import Tables from '@/components/common/Tables.vue'
    import { mapState, mapActions } from 'vuex'
    export default {
        components: {
            Tables
        },
        data() {
            return {}
        },
        computed: {
            ...mapState({ tableData: 'table'})
        },
        mounted() {
            this.getDataList()
        },
        methods: {
            getDataList() {
                let options = {}
                options.mergeObject({},  this.tableData.pagination, {})
                this.getList(options) // 数据接口
            }
        }
    }
</script>
<!-- Table Attributes
    参数              说明                类型     可选值     默认值
    dataList          表格数据源          array      /         -
    columnList        表头数据，            array    /         -
    threeUnary        三目运算            array      /         -
    total             数据总条数          number     /         -
    specialClass      特殊行数据样式处理   object     /         -
-->
<!-- 表头 Attributes
    参数              说明                         类型               可选值     默认值
    code              数组列表字段(必填)            string              /          -
    label             标题名(必填)                  string             /          -
    link              链接 (若有link path必填)      object             /          -
    date              日期                         boolean            /          -
    doubleDate        日期范围                     boolean            /          -
    width             列宽                         number/string      /          -
    operation         操作按钮                      object            /          -
 -->