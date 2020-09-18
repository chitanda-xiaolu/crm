<template>
    <el-dialog
        :title="editdept == 'add' ? '新增部门' : '编辑部门'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        @open="showModal(editdept)"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-form-item label="上级部门：" prop="pid">
                <el-cascader
                    v-model="dataForm.pid"
                    style="width:87%"
                    placeholder="请选择上级部门"
                    :options="editdept === 'add' ? deptUsrt.deptTree : deptUsrt.editTree"
                    filterable
                    change-on-select
                    @change="hendleChangeCascader"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="部门名称：" prop="simpleName">
                <el-input v-model="dataForm.simpleName" clearable placeholder="部门名称" style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="部门主管：" prop="userId">
                <el-select
                    v-model="dataForm.userId"
                    filterable
                    clearable
                    remote
                    reserve-keyword
                    @change="changeManager"
                    placeholder="请选择主管"
                    style="width:87%">
                    <el-option
                        v-for="item in deptUsrt.managerList"
                        :key="item.userId"
                        :label="item.name"
                        :disabled="item.status == 1"
                        :value="item.userId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门状态：" size="mini" prop="status">
                <el-radio-group v-model="dataForm.status">
                    <el-radio label='0'>有效</el-radio>
                    <el-radio label='1'>无效</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
       </span>
  </el-dialog>
</template>
<script>
import {
    createDept,
    editDept,
    deptDetail
} from '@/api/deptUser'
import { selectObj, filterFalsy } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
import SYSTEMVALUE from '@/utils/config'
export default {
    props: ['dept', 'editdept', 'isShowStatus'],
    data () {
        return {
            managerList: [],
            visible: false,
            dataForm: {
                pid: [],
                simpleName: '',
                userId: '',
                status: '0',
                pName: [],
                userName: ''
            },
            dataRule: {
                pid: [
                    { required: true, message: '上级部门不能为空', trigger: 'change' }
                ],
                simpleName: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '部门状态不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({deptUsrt: 'deptUser'})
    },
    methods: {
        ...mapActions({getDept: 'getDept', getManager: 'getManager', getDeptFilterTree: 'getDeptFilterTree'}),
        changeManager(e) {
            this.dataForm.userId = e
        },
        showModal(isAdd) {
            if(isAdd) {
                this.dataForm = {
                    pid: [],
                    simpleName: '',
                    userId: '',
                    status: '0',
                    pName: [],
                    userName: ''
                }
            }
        },
        init(self) {
            this.getManager({platform: SYSTEMVALUE.COMPANY_PLATFORM})
            this.visible = true
            if(this.editdept === 'add') {
                self.showModal(true)
            } else {
                if (this.dept) {
                    this.getDeptFilterTree({ deptId: this.dept })
                    deptDetail({deptId: this.dept}).then(result => {
                        if(result.code === 200 && result.success) {
                            const nodes = result.data
                            const query = selectObj(nodes, ['pid', 'simpleName', 'status', 'pName', 'userId', 'userName'])
                            query.pid = typeof query.pid === 'number' ? query.pid.toString() : query.pid
                            query.status = query.status.toString()
                            this.dataForm = { ...query }
                        } else {
                            self.$refs['dataForm'].resetFields()
                        }
                    })
                }
            }
        },
        includeInvalid(val) {
            let flag = true
            this.deptUsrt.managerList.map(item => {
                if(item.name === val) {
                    flag = false
                }
                if(!val) {
                    flag = false
                }
            })
            return flag
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    const params = filterFalsy(_self.dataForm)
                    params.pid = (params.pid instanceof Array) ? params.pid = params.pid[params.pid.length - 1] : params.pid
                    if(_self.editdept === 'add') {
                        createDept(params).then(result => { // 新增部门
                            if (result.code === 200 && result.success) {
                                _self.$message.success('新增成功')
                                _self.getDept({status: _self.isShowStatus, userStatus: '0', platform: SYSTEMVALUE.COMPANY_PLATFORM})
                                _self.visible = false
                            } else {
                                _self.$message.error('新增失败')
                            }
                        })
                    } else {
                        params.deptId = _self.dept
                        editDept(params).then(() => {
                            _self.$message.success('编辑成功')
                            _self.getDept({status: _self.isShowStatus, userStatus: '0', platform: SYSTEMVALUE.COMPANY_PLATFORM})
                            _self.visible = false
                        })
                    }
                }
            })
        },
        hendleChangeCascader() {
            this.$refs['dataForm'] && this.$refs['dataForm'].validateField('pid')
        }
    }
}
</script>
<style scoped lang="scss">
    // 离职 无效 默认不展示
    .is-disabled {
        display: none
    }
</style>
