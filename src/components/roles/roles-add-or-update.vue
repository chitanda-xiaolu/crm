<template>
    <el-dialog
        :title="editdept == 'edit' ? '编辑角色' : '新增角色'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-form-item label="角色分类：" prop="platform">
                <el-select
                    v-model="dataForm.platform"
                    filterable
                    :disabled="editdept=== 'edit'"
                    remote
                    clearable
                    placeholder="请选择"
                    reserve-keyword
                    @change="changeRole"
                    style="width:87%">
                    <el-option
                        v-for="item in platformClass"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色名称：" prop="name">
                <el-input v-model="dataForm.name" placeholder="请输入" clearable style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="角色状态：" size="mini" prop="status">
                <el-radio-group v-model="dataForm.status">
                <el-radio label='0'>有效</el-radio>
                <el-radio label='1'>无效</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="dataFormSubmit()" @keyup.enter.native="dataFormSubmit">确定</el-button>
       </span>
    </el-dialog>
</template>
<script>
import { addRole, roleDetail, editRole } from '@/api/roles'
import { mapActions } from 'vuex'
import { selectObj, filterFalsy } from '@/utils/utils'
export default {
    props: ['editdept', 'authorityId', 'allStatus'],
    data () {
        return {
            managerList: [],
            platformClass: [{id: 1, name: '总部'}, {id: 2, name: '经销商'}], // 角色分类
            visible: false,
            dataForm: {
                authorityId: '',
                platform: '',
                status: '0',
                name: ''
            },
            dataRule: {
                platform: [
                    { required: true, message: '角色分类不能为空', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '角色状态不能为空', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        ...mapActions({ getAuthData: 'getAuthData', getRoleList: 'getRoleList' }),
        changeRole(e) { // 更换角色
        },
        init(self) {
            this.visible = true
            if(this.editdept === 'edit') {
                roleDetail({ authorityId: this.authorityId }).then(result => {
                    if(result.code === 200 && result.success) {
                        const nodes = result.data
                        const query = selectObj(nodes, ['authorityId', 'platform', 'status', 'name'])
                        query.status = query.status.toString()
                        this.dataForm = { ...query }
                    } else {
                        self.$refs['dataForm'].resetFields()
                    }
                })
            } else {
                self.$refs['dataForm'].resetFields()
            }
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    const params = filterFalsy(this.dataForm)
                    if(this.editdept === 'edit') {
                        const params = filterFalsy(this.dataForm)
                        editRole(params).then(() => {
                            this.$message.success('编辑成功')
                            this.getRoleList({platform: params.platform, status: this.allStatus === true ? 0 : ''})
                            this.visible = false
                        })
                    } else {
                        delete params.authorityId
                        addRole(params).then(result => { // 新增角色
                            if (result.code === 200 && result.success) {
                                this.$message.success('新增成功')
                                this.getRoleList({ platform: params.platform, status: this.allStatus === true ? 0 : '' })
                                this.visible = false
                            } else {
                                this.$message.error('新增失败')
                            }
                        })
                    }
                }
            })
            this.$emit('whichPlatform', this.dataForm.platform)
        },
        hendleChangeCascader() {
            this.$refs['dataForm'] && this.$refs['dataForm'].validateField('pid')
        }
    }
}
</script>
