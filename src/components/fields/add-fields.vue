<template>
    <el-dialog
        title="新增区域"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-form-item label="上级区域：" prop="parentId">
                <el-select
                    v-model="dataForm.parentId"
                    filterable
                    clearable
                    :disabled="editdept=== 'edit'"
                    remote
                    reserve-keyword
                    @change="changePosts"
                    placeholder="请选择"
                    style="width:87%">
                    <el-option
                        v-for="item in parentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="dataForm.name" clearable placeholder="请输入"  style="width:87%"></el-input>
            </el-form-item>
            <el-form-item label="区域状态：" size="mini" prop="status">
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
import { addFields, parentRegion } from '@/api/fields'
import { mapActions } from 'vuex'
import { filterFalsy } from '@/utils/utils'
export default {
    props: ['editdept', 'platforms', 'allStatus'],
    data () {
        return {
            parentList: [], // 岗位分类
            visible: false,
            dataForm: {
                roleId: '',
                name: '',
                status: '0',
                parentId: ''
            },
            dataRule: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '区域状态不能为空', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        ...mapActions({ getTree: 'getTree' }),
        changePosts(e) { // 修改岗位
        },
        init(self) {
            parentRegion().then(result => {
                if(result.code === 200 && result.success) {
                    this.parentList = result.data
                }
            })
            this.visible = true
            this.dataForm = {
                name: '',
                status: '0'
            }
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    const params = filterFalsy(this.dataForm)
                    addFields(params).then(() => {
                        this.$message.success('新增成功')
                        this.getTree({ status: '0' })
                        this.visible = false
                    })
                }
            })
        }
    }
}
</script>
