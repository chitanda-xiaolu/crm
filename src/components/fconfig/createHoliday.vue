<!--
 * @Description: 新增对照表
 * @Author: 陈桃
 * @Date: 2020-04-20 17:38:07
 * @LastEditTime: 2020-06-28 15:51:27
 * @LastEditors: 陈桃
 -->
 <template>
    <el-dialog
        title="休息日期"
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
            <el-form-item label="日期：" prop="dayOff">
                <el-date-picker
                    v-model="dataForm.dayOff"
                    value-format="yyyy-MM-dd"
                    @blur="checkIsexistDay"
                    placeholder="选择月">
                </el-date-picker>
            </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()" :disabled="isSubmit">确定</el-button>
       </span>
  </el-dialog>
</template>
<script>
import { addHoliday, holidayIsExist } from '@/api/fconfig'
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            visible: false,
            treeData: [],
            isSubmit: true,
            dataForm: {
                dayOff: ''
            },
            customTypeList: [],
            dataRule: {
                dayOff: [
                    { required: true, message: '日期不能为空', trigger: 'focus' }
                ]
            }
        }
    },
    methods: {
        ...mapActions({ getHolidayData: 'getHolidayData' }),
        showModal() {
            this.dataForm.dayOff = ''
        },
        checkIsexistDay() {
            holidayIsExist({ dayOff: this.dataForm.dayOff }).then(result => {
                if(result.code === 200 && result.success) {
                    if(result.data) {
                        this.isSubmit = true
                        this.$message.warning('该休息日已存在')
                    } else {
                        this.isSubmit = false
                    }
                }
            })
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let _self = this
                    const params = _self.dataForm
                    let weekLabel = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                    params.week = weekLabel[new Date(_self.dataForm.dayOff).getDay()]
                    addHoliday(params).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.$message.success('新增成功')
                            _self.getHolidayData()
                            _self.visible = false
                        }
                    })
                }
            })
        }
    }
}
</script>
