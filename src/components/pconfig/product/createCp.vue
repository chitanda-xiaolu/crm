<!--
 * @Description: 新增成品分类
 * @Author: 陈桃
 * @Date: 2020-04-20 17:38:07
 * @LastEditTime: 2020-06-06 16:06:45
 * @LastEditors: 陈桃
 -->
 <template>
    <el-dialog
        title="成品新增分类"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        @open="showModal()"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-form-item label="上级分类：" prop="parentId">
                <el-cascader
                    v-model="dataForm.parentId"
                    style="width:100%"
                    placeholder="请选择上级分类"
                    :options="treeData"
                    filterable
                    change-on-select
                    @change="hendleChangeCascader">
                </el-cascader>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="dataForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="dataForm.sort" clearable placeholder="请输入" @blur="positiveNumber($event)" style="width:100%"></el-input>
            </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
       </span>
  </el-dialog>
</template>
<script>
import { addpConfigProduct } from '@/api/pconfig'
import { filterFalsy } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            visible: false,
            treeData: [],
            dataForm: {
                parentId: [],
                name: '',
                sort: ''
            },
            dataRule: {
                parentId: [
                    { required: true, message: '上级分类不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ pconfigState: 'pconfig' })
    },
    methods: {
        ...mapActions({ getproductTreeData: 'getproductTreeData' }),
        showModal() {
            let filterData = this.pconfigState.productTreeData
            this.setDisable(1, filterData, 2)
            this.getCpTreeData()
            this.treeData = filterData
            this.dataForm = {
                parentId: [],
                name: '',
                sort: ''
            }
        },
        getCpTreeData() {
            this.getproductTreeData({ productType: 10001 })
        },
        setDisable (count, data, maxNum) {
            if (count > maxNum) { // 最多几级就写几
                data.forEach(v => {
                    v.disabled = true // 超过设定的最大级数,给这一集的数据添加disabled属性
                })
            } else {
                data.forEach(v => {
                    v.count = count
                    if (v.children && v.children.length) {
                        v.count++
                        this.setDisable(v.count, v.children, maxNum) // 子级循环时把这一层数据的count传入
                    }
                })
            }
        },
        positiveNumber(e) {
            let flag = new RegExp('^[0-9]([0-9])*$').test(e.target.value)
            if(!flag) {
                this.$message.warning('请输入正数')
            }
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    const params = filterFalsy(_self.dataForm)
                    if (typeof _self.dataForm.parentId === 'string') {
                        params.parentId = _self.dataForm.parentId
                    } else {
                        params.parentId = _self.dataForm.parentId.pop()
                    }
                    addpConfigProduct(params).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.$message.success('新增成功')
                            _self.visible = false
                            _self.getCpTreeData()
                        }
                    })
                }
            })
        },
        hendleChangeCascader() {
            this.$refs['dataForm'] && this.$refs['dataForm'].validateField('parentId')
        }
    }
}
</script>
