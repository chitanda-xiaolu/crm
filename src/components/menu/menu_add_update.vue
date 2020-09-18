<template>
    <el-dialog
        :title="editMenu === 'edit' ? '编辑菜单' : '新增菜单'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
             <el-form-item label="名称：" prop="name">
                <el-input v-model="dataForm.name" placeholder="请输入" clearable style="width:87%"></el-input>
            </el-form-item>
             <el-form-item label="编号：" prop="code">
                <el-input v-model="dataForm.code" placeholder="请输入" clearable style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="父级ID：" prop="pid">
                <el-cascader v-model="dataForm.pid" :options="menuData.menuList" :props="{ checkStrictly: true }" style="width:87%">
                </el-cascader>
            </el-form-item>
            <el-form-item label="请求地址：" prop="url">
                <el-input v-model="dataForm.url" placeholder="请输入" clearable style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="层级：" prop="levels">
                <el-select
                    v-model="dataForm.levels"
                    placeholder="请选择"
                    clearable
                    style="width:87%">
                    <el-option
                        v-for="item in levelList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="dataForm.sort" placeholder="请输入" clearable type="number" style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="图标：" prop="icon">
                <el-input v-model="dataForm.icon" placeholder="请填写class" clearable style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="所属：" size="mini" prop="platform">
                <el-radio-group v-model="dataForm.platform" :disabled="editMenu === 'edit' ? true : false">
                    <el-radio :label='0'>平台</el-radio>
                    <el-radio :label='1'>总部</el-radio>
                    <el-radio :label='2'>经销商</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="状态：" size="mini" prop="status">
                <el-radio-group v-model="dataForm.status">
                    <el-radio :label='0'>有效</el-radio>
                    <el-radio :label='1'>无效</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="类型：" prop="menuFlag">
                <el-radio-group v-model="dataForm.menuFlag">
                    <el-radio :label="true">菜单</el-radio>
                    <el-radio :label="false">按钮</el-radio>
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
import { mapState, mapActions } from 'vuex'
import { addMenuManage, editMenuManage } from '@/api/menu'
import { filterFalsy } from '@/utils/utils'
export default {
    data () {
        return {
            visible: false,
            dataForm: {
                menuId: '',
                code: '',
                name: '',
                pid: '',
                url: '',
                levels: '',
                menuFlag: true,     // true 菜单, false 按钮
                status: 0,        // 0 启用, 1 禁用
                sort: '',
                icon: '',
                platform: 0       // 0 平台, 1 总部, 2 经销商
            },
            levelList: [{
                value: '1',
                label: '一级'
            }, {
                value: '2',
                label: '二级'
            }, {
                value: '3',
                label: '三级'
            }],
            dataRule: {
                code: [
                    { required: true, message: '编号不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '岗位名称不能为空', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: 'url不能为空', trigger: 'blur' }
                ],
                levels: [
                    { required: true, message: '层级不能为空', trigger: 'blur' }
                ],
                menuFlag: [
                    { required: true, message: '类型不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '部门状态不能为空', trigger: 'blur' }
                ],
                platform: [
                    { required: true, message: '所属不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    props: [ 'editMenu' ],
    computed: {
        ...mapState({ menuData: 'menu' })
    },
    methods: {
        ...mapActions({ getMenuList: 'menuManageList' }),
        // 表单提交
        dataFormSubmit() {
            const params = filterFalsy(this.dataForm)
            if (typeof params.pid === 'object') {
                params.pid = params.pid[params.pid.length - 1]
            }
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    if(this.editMenu === 'edit') {
                        editMenuManage(params).then(() => {
                            this.$message.success('编辑成功')
                            this.getMenuList()
                            this.visible = false
                        })
                    } else {
                        addMenuManage(params).then(result => { // 新增角色
                            if (result.code === 200 && result.success) {
                                this.$message.success('新增成功')
                                this.getMenuList()
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
        toggleDialog(data) {
            if (data) {
                for (let i in this.dataForm) {
                    this.dataForm[i] = data[i]
                }
                this.dataForm.name = data.label
                this.dataForm.pid = data.parentId
                this.dataForm.menuId = data.nodeId
            } else {
                for (let i in this.dataForm) {
                    this.dataForm[i] = ''
                }
                this.dataForm.status = 0
                this.dataForm.menuFlag = true
                this.dataForm.platform = 0
            }
            this.visible = !this.visible
        },
        hendleChangeCascader() {
            this.$refs['dataForm'] && this.$refs['dataForm'].validateField('pid')
        }
    }
}
</script>
