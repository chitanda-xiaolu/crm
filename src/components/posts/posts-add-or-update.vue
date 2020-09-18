<template>
    <el-dialog
        :title="editdept == 'edit' ? '编辑岗位' : '新增岗位'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-form-item label="岗位分类：" prop="platform">
                <el-select
                    v-model="dataForm.platform"
                    filterable
                    :disabled="editdept=== 'edit'"
                    clearable
                    remote
                    reserve-keyword
                    @change="changePosts"
                    placeholder="请选择"
                    style="width:87%">
                    <el-option
                        v-for="item in postsList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="岗位名称：" prop="name">
                <el-input v-model="dataForm.name" placeholder="请输入" clearable style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="岗位状态：" size="mini" prop="status">
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
import { addPosts, postsDetail, editPosts } from '@/api/posts'
import { mapActions } from 'vuex'
import { selectObj, filterFalsy } from '@/utils/utils'
export default {
    props: ['roleId', 'editdept', 'platforms', 'allStatus'],
    data () {
        return {
            postsList: [{ id: 1, name: '总部' }, { id: 2, name: '经销商' }], // 岗位分类
            visible: false,
            dataForm: {
                roleId: '',
                name: '',
                status: '0',
                platform: ''
            },
            dataRule: {
                platform: [
                    { required: true, message: '岗位分类不能为空', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '岗位名称不能为空', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '部门状态不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        ...mapActions({getpostsList: 'getpostsList', getPostsAuthList: 'getPostsAuthList'}),
        changePosts(e) { // 修改岗位
        },
        init(self) {
            this.visible = true
            if(this.editdept === 'edit') {
                postsDetail({ roleId: this.roleId }).then(result => {
                    if(result.code === 200 && result.success) {
                        const nodes = result.data
                        const query = selectObj(nodes, ['roleId', 'platform', 'status', 'name'])
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
                const params = filterFalsy(this.dataForm)
                if (valid) {
                    if(this.editdept === 'edit') {
                        editPosts(params).then(() => {
                            this.$message.success('编辑成功')
                            this.getpostsList({ platform: this.dataForm.platform, status: this.allStatus === true ? 0 : '' })
                            this.visible = false
                        })
                    } else {
                        delete params.roleId
                        addPosts(params).then(result => { // 新增角色
                            if (result.code === 200 && result.success) {
                                this.$message.success('新增成功')
                                this.getpostsList({ platform: this.dataForm.platform, status: this.allStatus === true ? 0 : '' })
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
