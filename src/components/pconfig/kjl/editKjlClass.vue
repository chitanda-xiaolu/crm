<!--
 * @Description: 新增对照表
 * @Author: 陈桃
 * @Date: 2020-04-20 17:38:07
 * @LastEditTime: 2020-04-27 17:07:37
 * @LastEditors: Zale Ying
 -->
 <template>
    <el-dialog
        title="编辑对照表"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        @open="showModal()"
        width="30%">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="135px">
            <el-form-item label="类型：" prop="customTypeId">
                <el-select
                    v-model="dataForm.customTypeId"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    placeholder="请选择"
                    style="width:100%">
                    <el-option
                        v-for="item in customTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酷家乐类别：" prop="kjlCategory">
                <el-input v-model="dataForm.kjlCategory" clearable placeholder="请输入" ></el-input>
            </el-form-item>
            <el-form-item label="酷家乐一级分类：" prop="kjlType">
                <el-input v-model="dataForm.kjlType" clearable placeholder="请输入" maxlength="25"></el-input>
            </el-form-item>
            <el-form-item label="酷家乐二级分类：" prop="kjlSubType">
                <el-input v-model="dataForm.kjlSubType" clearable placeholder="请输入" maxlength="25"></el-input>
            </el-form-item>
             <el-form-item label="真分类：" prop="prodCatId">
                <el-input v-model="dataForm.prodCatId" @blur="positiveNumber($event)" clearable placeholder="请输入" ></el-input>
            </el-form-item>
            <el-form-item label="工具线：" prop="toolType">
                <el-input v-model="dataForm.toolType" clearable placeholder="请输入" ></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="dataForm.sort" @blur="positiveNumber($event)" clearable placeholder="请输入" ></el-input>
            </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
       </span>
  </el-dialog>
</template>
<script>
import { allKjlclassSort, editkjlclass, kjlclassDetail } from '@/api/pconfig'
import { filterFalsy } from '@/utils/utils'
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            visible: false,
            classId: '',
            dataForm: {
                customTypeId: '',
                kjlCategory: '',
                kjlType: '',
                kjlSubType: '',
                prodCatId: '',
                toolType: '',
                sort: ''
            },
            customTypeList: [],
            dataRule: {
                customTypeId: [
                    { required: true, message: '类型不能为空', trigger: 'focus' }
                ],
                kjlCategory: [
                    { required: true, message: '酷家乐类别不能为空', trigger: 'change' }
                ],
                kjlType: [
                    { required: true, message: '酷家乐一级分类不能为空', trigger: 'change' }
                ],
                prodCatId: [
                    { required: true, message: '真分类不能为空', trigger: 'change' }
                ],
                toolType: [
                    { required: true, message: '工具线不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ pconfigState: 'pconfig' })
    },
    methods: {
        ...mapActions({ getKjlClassTableData: 'getKjlClassTableData' }),
        showModal() {
            allKjlclassSort().then(result => {
                if(result.code === 200 && result.success) {
                    this.customTypeList = result.data
                }
            })
            this.getKjlDetail()
        },
        getKjlDetail() {
            kjlclassDetail({id: this.classId}).then(result => {
                if(result.code === 200 && result.success) {
                    this.dataForm = { ...result.data }
                }
            })
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
                    params.id = _self.classId
                    editkjlclass(params).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.$message.success('编辑成功')
                            _self.getKjlClassTableData({current: 1, size: 1000})
                            _self.visible = false
                        }
                    })
                }
            })
        }
    }
}
</script>
