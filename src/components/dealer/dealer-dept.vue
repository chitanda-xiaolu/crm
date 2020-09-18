<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left" style="border:none">
            <dealer-tree @getDeptDataFromTree="getDeptData" @emitDistributorId="getemitDistributorId"/>
            <el-button type="primary" @click="createStore" class="el-add-store" plain><i class="el-icon-plus"></i>新增门店</el-button>
        </div>
        <div class="main-box-right dis-flex-col">
            <best-tables
                :data-list="userList"
                :optBtnList="this.optBtnList()"
                :total="total"
                @optThisRow="optThisRow"
                @bindkjl="bindkjl"/>
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
import DealerTree from './dealer-tree'
import BestTables from '../common/BestTable'
import { mapState } from 'vuex'
import { dealerUsers, dealerUserPassword, bindEmployee, checkBindEmployee } from '@/api/dealer'
import { mergeObject } from '@/utils/utils'
import BtnConfig from '../../../config/operationList'
export default {
    name: 'distributorDetail',
    components: {
        DealerTree,
        BestTables
    },
    data() {
        return {
            key: 'distributorDetail',
            dataListLoading: false,
            userList: [],
            total: 0,
            deptId: '',
            emitDistributorId: '',
            dialogVisible: false,
            bindkjlDialog: { email: '' },
            rowId: '',
            kjlAccount: ''
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' })
    },
    methods: {
        // 行操作按钮生成
        optBtnList() {
            return BtnConfig.distributorDetail.btns
        },
        // 行操作按钮执行
        optThisRow(row, type) {
            switch(type) {
            case 'reset':
                this.resetPassword(row)
                break
            case 'bind':
                this.bindkjl(row)
                break
            }
        },
        // 获取数据列表
        getDataList() {
            let _self = this
            let param = {
                deptId: _self.deptId,
                distributorId: _self.$route.params.id
            }
            let query = mergeObject(this.queryData.query[this.key].pagination, param)
            dealerUsers(query).then(result => {
                if (result.code === 200 && result.success) {
                    _self.userList = result.data.records
                    _self.total = result.data.total
                }
            })
        },
        getDeptData(data) {
            if (this.deptId === data.value) return
            this.deptId = data.code ? '' : data.value
            this.getDataList()
        },
        getemitDistributorId(id) {
            this.emitDistributorId = id
        },
        resetPassword(data) {
            let _self = this
            dealerUserPassword({userId: data.id}).then(result => {
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
        bindkjl(data) {
            this.kjlAccount = data.kjlAccount
            this.dialogVisible = true
            this.rowId = data.id
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
                } else {
                    return false
                }
            })
        },
        openbindDialog() {
            this.$refs['loginForm'] && this.$refs['loginForm'].clearValidate()
            this.bindkjlDialog.email = this.kjlAccount || ''
        },
        createStore() {
            this.$router.push({
                path: '/store/add',
                query: {id: this.emitDistributorId}
            })
        },
        // 表格每页数变化
        tableSizeChange() {
            this.getDataList()
        },
        // 表格翻页变化
        tableCurrentChange() {
            this.getDataList()
        }
    }
}
</script>

<style scoped lang="scss">
    .dis-flex-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }
    .el-add-store{
        position: absolute;
        right: 30px;
        top: 305px;
    }
</style>
