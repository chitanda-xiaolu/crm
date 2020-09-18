<!--
 * @Description: 菜单管理
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-27 14:06:29
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-col">
        <form-module />
        <div class="opt-btn" v-if="hasPermission(Permission.menu.create.code)">
            <el-button
                size="mini"
                icon="el-icon-plus"
                type="primary"
                plain
                style="margin-bottom:8px"
                @click="addHandle">新增</el-button>
        </div>
        <best-tables
            :data-list="menuData.menuList"
            childrenName="children"
            :optBtnList="this.optBtnList()"
            @optThisRow="editHandle"
            rowKey="value" />
        <add-or-update-module ref="addUpdateModule" :editMenu="isEdit" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { mergeObject, filterFalsy, queryParam } from '@/utils/utils'
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import addOrUpdateModule from '@/components/menu/menu_add_update.vue'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'menus',
    components: {
        FormModule,
        BestTables,
        addOrUpdateModule
    },
    data() {
        return {
            key: this.$route.name,
            isEdit: '',
            isShow: false,
            dataListLoading: false,
            total: 0
        }
    },
    computed: {
        ...mapState({ menuData: 'menu', queryData: 'queryCondition' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapActions({ getMenuList: 'menuManageList' }),
        // 行操作按钮
        optBtnList() {
            return BtnConfig.menu.btns
        },
        // 获取数据列表
        getDataList() {
            let query = mergeObject(this.queryData.query[this.key].pagination, queryParam(this.queryData.query[this.key].dataForm))
            this.dataListLoading = true
            this.getMenuList(filterFalsy(query)).then(result => {
                this.dataListLoading = false
            })
        },
        // 编辑
        editHandle(data) {
            this.$refs.addUpdateModule.toggleDialog(data)
            this.isEdit = 'edit'
        },
        // 新增
        addHandle() {
            this.isEdit = ''
            this.$refs.addUpdateModule.toggleDialog()
        }
    }
}
</script>

<style scoped lang='scss'>
a {
    color: $linkColor;
}
</style>
