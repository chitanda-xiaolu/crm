<template>
    <div class="attach">
        <el-dialog
            title="绑定员工"
            :visible.sync="dialogVisible"
            width="400px"
            :show-close='false'
            :close-on-click-modal='false'>
            <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginForm"
                label-width="0px"
                class="ms-content">
                <el-form-item prop="mobile">
                    <el-input
                        placeholder="请输入手机号码"
                        v-model="loginForm.mobile">
                        <i slot="prefix" class="iconfont icon-shouji2 icon-css"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="loginForm.password">
                            <i slot="prefix" class="iconfont icon-mima2 icon-css"></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native.prevent="submitForm('loginForm')">绑定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { validatePhone } from '@/utils/validate'
export default {
    data() {
        return {
            dialogVisible: false,
            loginForm: {
                mobile: '',
                password: ''
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'change' },
                    { validator: validatePhone, trigger: 'change' }
                ],
                password: [ { required: true, message: '请输入密码', trigger: 'change' } ]
            }
        }
    },
    mounted() {
        let _self = this
        _self.checkAttach().then(result => {
            if(_self.isAttach.token) {
                _self.dialogVisible = false
                _self.$router.replace('/')
            }else {
                _self.dialogVisible = true
            }
        })
    },
    computed: {
        ...mapState({open_id: 'user', isAttach: 'user', token: 'token'}),
        openID () {
            return this.$store.state.user.openId
        }
    },
    methods: {
        ...mapActions({checkAttach: 'checkAttach', RefreshToken: 'RefreshToken', attachUser: 'attachUser'}),
        submitForm(formName) {
            let params = Object.assign({}, this.loginForm, { openId: this.openID })
            const _self = this
            _self.$refs[formName].validate(valid => {
                if (valid) {
                    _self.attachUser(params).then(() => {
                        _self.$message.success({ message: `绑定成功` })
                        _self.$router.replace('/')
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .icon-css {
        font-size:18px;
        line-height:0;
        vertical-align: middle;
    }
    /deep/ .el-dialog__body{
        border: 1px solid #eee;
    }
</style>
