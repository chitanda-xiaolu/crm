<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left dept-tree">
            <Tree :status="dataForm.status" @isShow="isShowStatus"/>
        </div>
        <div class="main-box-right user-list">
            <form-module />
            <div class="opt-btn">
                <el-button
                    v-if="hasPermission(Permission.user.create.code)"
                    size="mini"
                    icon="el-icon-plus"
                    type="primary"
                    plain
                    style="margin-bottom:8px"
                    @click="addHandle">新增</el-button>
            </div>
            <best-tables
                :data-list="deptUsrt.userList"
                :total="deptUsrt.total"
                :specialClass="specialClass"
                @optThisRow="optThisRow"
                :optBtnList="this.optBtnList()" />
            <!-- 弹窗, 新增 / 修改 -->
            <add-user ref="addDialog" />
            <edit-user ref="editDialog" />
        </div>
        <el-dialog
            title="绑定酷家乐(KJL）账号"
            :visible.sync="dialogVisible"
            width="30%"
            @open="openbindDialog">
            <el-form :model="bindkjlDialog" ref="bindkjlDialog" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="email"
                label="账号"
                :rules="[
                { required: true, message: '请输入账号', trigger: 'blur' },
                { type: 'email', message: '请输入正确账号格式', trigger: ['blur', 'change'] }
                ]">
                <el-input v-model="bindkjlDialog.email" clearable style="width: 79%;"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="bindKjlNo('bindkjlDialog')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import BestTables from '@/components/common/BestTable.vue'
import FormModule from '@/components/common/Forms.vue'
import addUser from '@/components/staff/user-add'
import editUser from '@/components/staff/user-edit'
import Tree from '@/components/staff/tree'
import { mergeObject, filterFalsy, queryParam } from '@/utils/utils'
import { mapState, mapActions, mapMutations } from 'vuex'
import { resetPsw, bindEmployee } from '@/api/deptUser'
import SYSTEMVALUE from '@/utils/config'
import { checkBindEmployee } from '@/api/dealer'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'user',
    components: {
        addUser,
        editUser,
        BestTables,
        FormModule,
        Tree
    },
    data() {
        let _self = this
        return {
            key: _self.$route.name,
            labelPosition: 'right',
            dataForm: {
                name: '',
                phone: '',
                roleName: '',
                status: '0'
            },
            specialClass: { className: 'invalid-row', id: 'statusName', value: '离职' },
            dataListLoading: false,
            addOrUpdateVisible: false,
            addVisible: false,
            platform: SYSTEMVALUE.COMPANY_PLATFORM,
            isShow: '0', // tree中状态 0为有效 "" 为全部
            dialogVisible: false,
            bindkjlDialog: { email: '' }
        }
    },
    computed: {
        ...mapState({ deptUsrt: 'deptUser', queryData: 'queryCondition' })
    },
    mounted() {
        this.getDataList()
    },
    methods: {
        ...mapMutations({ setDeptId: 'SET_DEPTID', setDom: 'SET_DOM' }),
        ...mapActions({ getData: 'getData', getDept: 'getDept', getDeptDisplay: 'getDeptDisplay', getRole: 'getRole' }),
        tableRowClassName({row}) { // 无效数据显示灰色
            if (row.status === 1) {
                return 'invalid-row'
            }
            return ''
        },
        // 行操作按钮
        optBtnList() {
            return BtnConfig.staff.btns
        },
        isShowStatus(data) {
            this.isShow = data
        },
        optThisRow(row, type) {
            switch(type) {
            case 'edit':
                this.editHandle(row)
                break
            case 'reset':
                this.resetPassword(row)
                break
            case 'bind':
                this.bindkjl(row)
                break
            }
        },
        // 重置密码
        resetPassword(row) {
            let _self = this
            resetPsw({
                userId: row.userId
            }).then(result => {
                if (result.code === 200 && result.success) {
                    _self.$message.success({message: `重置成功,当前密码是:${result.data.password}`, duration: 4000})
                } else {
                    _self.$message({
                        message: result.message || '请求错误',
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
            })
        },
        // 获取数据列表
        getDataList() {
            let _self = this
            let options = mergeObject(queryParam(_self.queryData.query[_self.key].dataForm), _self.queryData.query[_self.key].pagination, {
                deptId: this.deptUsrt.selectDeptId
            })
            _self.refreshData(filterFalsy(options))
            setTimeout(function() {
                let isCheckDom = document.getElementsByClassName('is-checked')[0]
                _self.setDom(isCheckDom)
                isCheckDom.children[0].style.background = '#f0f7ff'
            }, 200)
        },
        bindEmployeeHandle() {
            let _self = this
            let kjlAccount = _self.bindkjlDialog.email
            let id = _self.rowId
            bindEmployee({ kjlAccount, id }).then(result => {
                if(result.code === 200 && result.success) {
                    _self.$message.success('操作成功')
                    _self.dialogVisible = false
                    _self.getDataList()
                }
            })
        },
        bindkjl(data) {
            this.kjlAccount = data.kjlAccount
            this.dialogVisible = true
            this.rowId = data.userId
        },
        // 绑定确定
        bindKjlNo(formName) {
            let _self = this
            let kjlAccount = _self.bindkjlDialog.email
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    checkBindEmployee({kjlAccount}).then(result => {
                        if(result.code === 200 && result.success) {
                            if(result.data.isBind) {
                                let tip = result.data.bindList
                                let arr = []
                                tip && tip.map(text => {
                                    arr.push(text)
                                })
                                this.$confirm(`该账号已绑定过: ${arr.join()}, 是否继续?`, '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    _self.bindEmployeeHandle()
                                }).catch(() => {})
                            } else { // 账号未绑定
                                _self.bindEmployeeHandle()
                            }
                        }
                    })
                }
            })
        },
        openbindDialog() {
            this.$refs['loginForm'] && this.$refs['loginForm'].clearValidate()
            this.bindkjlDialog.email = this.kjlAccount || ''
        },
        // 重新渲染数据
        refreshData(data) {
            this.getData(data)
            this.getDept({status: this.isShow, userStatus: this.queryData.query[this.key].dataForm.status, platform: this.platform})
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        },
        // 新增
        addHandle() {
            this.$refs.addDialog.visible = true
            this.getDeptDisplay({status: '0', platform: SYSTEMVALUE.COMPANY_PLATFORM})
            this.getRole({platform: SYSTEMVALUE.COMPANY_PLATFORM})
        },
        // 修改
        editHandle(row) {
            this.$refs.editDialog.visible = true
            this.$nextTick(() => {
                this.$refs.editDialog.init(row.userId)
            })
        }
    }
}
</script>
<style scoped lang="scss">
    /deep/ .el-table .invalid-row {
        color: #b5b4b4;
    }
    .user-list {
        display: flex;
        flex-direction: column;
    }
    .flex-box {
        height: 100%;
        .table-box {
            height: 70%;
        }
    }
</style>
