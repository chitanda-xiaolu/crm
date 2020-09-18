<template>
    <el-dialog
        title="新增员工"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="30%">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="dataForm.name" clearable type="text" placeholder="员工姓名" style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
                <el-input v-model="dataForm.phone" clearable type="text" placeholder="员工手机号码" style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="部门：" prop="deptId">
                <el-cascader
                    v-model="dataForm.deptId"
                    style="width:87%"
                    placeholder="请选择部门"
                    :debounce="1000"
                    :options="deptUsrtData.deptTreeDisplay"
                    change-on-select
                    filterable
                    @change="hendleChangeCascader"></el-cascader>
            </el-form-item>
            <el-form-item label="岗位：" prop="roleId">
                <el-select
                    v-model="dataForm.roleId"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    @change="changeRole"
                    placeholder="请选择岗位"
                    style="width:87%">
                    <el-option
                        v-for="item in deptUsrtData.roleTree"
                        :key="item.id"
                        :label="item.name"
                        :value="item.roleId"
                        :disabled="item.status == 1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工状态：" size="mini" prop="status">
                <el-radio-group v-model="dataForm.status" @change="changeUserStatus">
                    <el-radio label='0'>在职</el-radio>
                    <el-radio label='1'>离职</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="允许登录：" prop="allowLogin">
                <el-switch v-model="dataForm.allowLogin" @change="handleallowLogin"></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { createUser } from '@/api/deptUser'
import { mergeObject, filterFalsy } from '@/utils/utils'
import { mapState, mapActions, mapMutations } from 'vuex'
import { validatePhone } from '@/utils/validate'
export default {
    props: ['status'], // tree状态全部或者有效 0为有效 ''为全部
    data() {
        return {
            userId: '',
            visible: false,
            roleList: [],
            dataForm: {
                name: '',
                phone: '',
                roleName: null, // 岗位
                roleId: null,
                deptId: '', // 部门
                deptName: [],
                allowLogin: true,
                status: '0'
            },
            dataRule: {
                name: [
                    { required: true, message: '员工姓名不能为空', trigger: 'change' }
                ],
                deptId: [
                    { required: true, message: '部门不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'change' },
                    { validator: validatePhone, trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ deptUsrtData: 'deptUser', queryData: 'queryCondition' })
    },
    mounted() {},
    methods: {
        ...mapMutations({setDom: 'SET_DOM', setPagination: 'SET_PAGINATION'}),
        ...mapActions({getData: 'getData', getDeptDisplay: 'getDeptDisplay'}),
        changeRole (e) {
            this.dataForm.roleId = e
        },
        changeUserStatus(e) {
            if(e === '1') {
                this.dataForm.allowLogin = false
            }
        },
        handleallowLogin(e) {
            this.dataForm.allowLogin = e
        },
        hendleChangeCascader() {
            this.$refs['dataForm'] && this.$refs['dataForm'].validateField('deptId')
        },
        dataFormSubmit() { // 表单提交
            this.$refs['dataForm'].validate(valid => {
                let _self = this
                if (valid) {
                    const params = filterFalsy(_self.dataForm)
                    params.allowLogin = _self.dataForm.allowLogin

                    if (typeof _self.dataForm.deptId === 'string') {
                        params.deptId = _self.dataForm.deptId
                    } else {
                        params.deptId = _self.dataForm.deptId.pop()
                    }
                    createUser(params).then(result => { // 新增
                        if (result.code === 200 && result.success) {
                            _self.$message.success(`新增成功`)
                            let param = { size: _self.queryData.query[_self.$route.name].pagination.size, current: 1 }
                            _self.setPagination(param)
                            _self.$refs['dataForm'].resetFields()
                            _self.userAfterInit()
                        } else {
                            _self.$message.error(`${result.message} || 新增失败`)
                        }
                    })
                    setTimeout(function() {
                        let isCheckDom = document.getElementsByClassName('is-checked')[0]
                        _self.setDom(isCheckDom)
                        isCheckDom.children[0].style.background = '#f0f7ff'
                    }, 200)
                }
            })
        },
        userAfterInit() {
            this.visible = false
            this.getDeptDisplay({ platform: 1, status: this.status, userStatus: this.queryData.query[this.$route.name].dataForm.status })
            this.getData(mergeObject(this.queryData.query[this.$route.name].pagination, { deptId: this.deptUsrtData.selectDeptId, status: this.queryData.query[this.$route.name].dataForm.status }))
        }
    }
}
</script>
<style scoped lang="scss">
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
    .dept-default-value {
        position: absolute;
        z-index: 2;
        width: 158px;
        top: 1px;
    }
</style>
