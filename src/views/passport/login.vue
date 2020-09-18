<template>
  <div class="login-wrap">
    <div class="zhazhao">
      <div class="ms-login">
        <div class="ms-title">{{login_title}}</div>
        <!--正常登录  -->
        <el-form
          v-show="isnormalLogin"
          :model="loginForm"
          :rules="normalRules"
          ref="loginForm"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" class="eit" placeholder="请输入手机号码">
              <i slot="prefix" class="iconfont icon-shouji2 icon-css"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              show-password
              v-model="loginForm.password"
              class="eit"
              @keyup.enter.native="submitForm('loginForm')"
            >
              <i slot="prefix" class="iconfont icon-mima2 icon-css"></i>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button :loading="loading" @click.native.prevent="submitForm('loginForm')">登录</el-button>
          </div>
          <p class="login-tips">
            <el-checkbox v-model="checked" @change="remberMe">记住登录状态</el-checkbox>
            <span @click="forgetPsw" class="cuosor-pointer">忘记密码？</span>
          </p>
        </el-form>
        <!-- 手机验证码的form -->
        <el-form
          v-show="isPhoneCode"
          :model="validCode"
          ref="validCode"
          :rules="validCodeRules"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="fmobile">
            <el-input
              placeholder="请输入手机号码"
              @blur="validedPhone"
              class="eit"
              v-model="validCode.fmobile"
            >
              <i slot="prefix" class="iconfont icon-shouji2 icon-css"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="请输入验证码" class="eit" v-model="validCode.code">
              <i slot="prefix" class="iconfont icon-duanxin icon-css" style="line-height:-1px"></i>
              <el-button
                slot="prefix"
                class="code-btn cuosor-pointer"
                v-show="show"
                @click="getValidCode"
              >获取验证码</el-button>
              <el-button slot="prefix" class="code-btn code-btn-second" v-show="!show">{{count}}秒后重试</el-button>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="submitForm('validCode')"
            >下一步</el-button>
            <p class="login-tips">
              <el-checkbox style="visibility: hidden;"></el-checkbox>
              <span class="return-login cuosor-pointer" @click="returnLogin">返回登录</span>
            </p>
          </div>
        </el-form>
        <!-- 设置新密码的form -->
        <el-form
          v-show="isNewPsw"
          :model="setNewPsw"
          :rules="finddPswRules"
          ref="setNewPsw"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="fPassword">
            <el-input placeholder="请输入密码" type="password" v-model="setNewPsw.fPassword">
              <i slot="prefix" class="iconfont icon-mima2 icon-css"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input type="password" placeholder="请再次输入密码" v-model="setNewPsw.repassword">
              <i slot="prefix" class="iconfont icon-mima2 icon-css"></i>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button
              type="primary"
              :loading="loading"
              @click.native.prevent="submitForm('setNewPsw')"
            >确定</el-button>
          </div>
        </el-form>
        <div class="order">
          <span class="line"></span>
          <span class="txt" @click="getQrcode">
            <i class="iconfont icon-dingding"></i>钉钉登录
          </span>
          <span class="line"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendCode, nextStep, isExitPhone } from '@/api/passport'
import { mapState, mapMutations, mapActions } from 'vuex'
import { validatePhone } from '@/utils/validate'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.setNewPsw.repassword !== '') {
                    this.$refs.ruleForm && this.$refs.ruleForm.validateField('checkPass')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.setNewPsw.fPassword) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            rember: true, // 是否点击
            show: true, // 显示获取验证码 or 倒计时
            count: '', // 倒计时
            timer: null,
            login_title: '手机登录',
            code: '',
            passPhone: false, // 手机是否检查通过
            isPhoneCode: false,
            isNewPsw: false,
            isnormalLogin: true,
            checked: true,
            loginForm: {
                mobile: '',
                password: ''
            },
            validCode: {
                // 手机验证码
                fmobile: '',
                code: ''
            },
            setNewPsw: {
                // 设置新密码
                fPassword: '',
                repassword: ''
            },
            finddPswRules: {
                // 设置新密码校验
                fPassword: [{ validator: validatePass, trigger: 'change' }],
                repassword: [{ validator: validatePass2, trigger: 'change' }]
            },
            normalRules: {
                // 正常账密登录校验
                mobile: [{ validator: validatePhone, trigger: 'change' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ]
            },
            validCodeRules: {
                // 验证码校验
                fmobile: [{ validator: validatePhone, trigger: 'change' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
            },
            loading: false,
            ddLink: ''
        }
    },
    computed: {
        ...mapState({ jump_code: 'user' })
    },
    mounted() {
        this.setTags()
    },
    methods: {
        ...mapMutations({ setTags: 'SET_TAGSLIST' }),
        ...mapActions({ dindinLogin: 'dindinLogin' }),
        forgetPsw() {
            // 忘记密码
            this.isPhoneCode = true
            this.isnormalLogin = false
            this.login_title = '忘记密码'
        },
        validedPhone() {
            // 校验手机号是否存在
            let phone = this.validCode.fmobile
            let _self = this
            if (/^[0-9]{11}$/.test(this.validCode.fmobile)) {
                isExitPhone(phone).then((result) => {
                    if (result.code === 200 && result.success) {
                        this.passPhone = true
                    } else {
                        _self.$message.error('请求错误')
                    }
                })
            }
        },
        getValidCode() {
            // 获取验证码
            const TIME_COUNT = 60
            if (!this.validCode.fmobile) {
                this.$message({
                    message: '请先填写手机号',
                    type: 'warning'
                })
            } else {
                let params = { phone: this.validCode.fmobile }
                let _self = this
                sendCode(params).then((result) => {
                    _self.timer && clearInterval(_self.timer)
                    if (result.code === 200 && result.success) {
                        if (!_self.timer) {
                            _self.count = TIME_COUNT
                            _self.show = false
                            _self.timer = setInterval(() => {
                                if (_self.count > 0 && _self.count <= TIME_COUNT) {
                                    _self.count--
                                } else {
                                    _self.show = true
                                    clearInterval(_self.timer)
                                    _self.timer = null
                                }
                            }, 1000)
                        }
                    } else {
                        _self.$message.error('请求错误')
                    }
                })
            }
        },
        returnLogin() {
            this.isPhoneCode = false
            this.isnormalLogin = true
            this.login_title = '手机登录'
        },
        // 提交登录
        submitForm(formName) {
            const _self = this
            switch (formName) {
            case 'loginForm':
                _self.$refs[formName].validate((valid) => {
                    if (valid) {
                        _self.loading = true
                        _self.$store
                            .dispatch('Login', _self.loginForm)
                            .then(() => {
                                _self.loading = false
                                _self.$router.replace({ path: '/' })
                            })
                            .catch(() => {
                                _self.loading = false
                            })
                    }
                })
                break
            case 'validCode':
                _self.$refs[formName].validate((valid) => {
                    // 手机找回
                    let params = {
                        phone: _self.validCode.fmobile,
                        validateCode: _self.validCode.code
                    }
                    if (valid) {
                        _self.timer && clearInterval(_self.timer)
                        nextStep(params).then((result) => {
                            if (result.code === 200 && result.success) {
                                _self.login_title = '设置新密码'
                                _self.isPhoneCode = false
                                _self.isnormalLogin = false
                                _self.isNewPsw = true
                            } else {
                                _self.$message.error('请求错误')
                            }
                        })
                    } else {
                        return false
                    }
                })
                break
            case 'setNewPsw':
                _self.$refs[formName].validate((valid) => {
                    // 设置新密码
                    let params = {
                        phone: _self.validCode.fmobile,
                        newPassword: _self.setNewPsw.fPassword,
                        confirmNewPassword: _self.setNewPsw.repassword
                    }
                    if (valid) {
                        _self.$store.dispatch('ResetPassword', params).then(() => {
                            _self.$router.replace({ path: '/' })
                            _self.$message.success('密码设置成功')
                        })
                    }
                })
                break
            }
        },
        // 获取钉钉登录二维码
        getQrcode() {
            this.dindinLogin()
        },
        remberMe(val) {
            this.rember = val
        }
    }
}
</script>

<style scoped lang="scss">
.login-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(../../assets/img/login-bg2.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  /deep/ .el-input__inner {
    padding-left: 46px;
  }
  /deep/ .el-input__prefix {
    border-right: 1px solid;
    width: 34px;
  }
  .icon-css {
    font-size: 18px;
    line-height: 0;
    vertical-align: middle;
  }
  //   .zhazhao {
  //     height: 100%;
  //     background: rgba(7, 7, 8, 0.3);
  //   }
  .ms-title {
    width: 100%;
    line-height: 45px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .order {
    height: 46px;
    display: flex;
    justify-content: space-between;
    .line {
      display: inline-block;
      width: 150px;
      border-top: 1px solid #ccc;
    }
    .txt {
      display: inline-block;
      color: #3a8ee6;
      font-size: 14px;
      line-height: 1px;
      cursor: pointer;
      .icon-dingding {
        margin-right: 5px;
      }
    }
  }
  /deep/ .el-tabs__nav {
    width: 100%;
    color: #fff;
  }
  /deep/ .el-tabs__item {
    width: 50%;
    text-align: center;
    color: #fff;
  }
  /deep/ .el-tabs__item:hover {
    color: #409eff;
  }
  .ms-login {
    // width: 350px;
    // position: absolute;
    // left: 78%;
    // top: 50%;
    // margin: -190px 0 0 -175px;
    // border-radius: 5px;
    // background: rgba(40, 41, 40, 0.8);
    // overflow: hidden;
    width: 449px;
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 28%;
    right: 10%;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0.9;
    box-sizing: border-box;
  }
  .ms-login::before {
    content: "";
    width: calc(100% + 100px);
    height: calc(100% + 100px);
    background: inherit;
    box-shadow: inset 0 0 0 300px rgba(255, 255, 255, 0.1);
    position: absolute;
    top: -10px;
    left: -10px;
    z-index: -1;
    filter: blur(10px);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 0;
    /deep/ .eit input {
      height: 40px;
      background: none;
    }
    .el-input__inner {
      height: 40px;
      background: none;
    }
  }
  .login-btn {
    text-align: center;
    .return-login {
      float: right;
      color: white;
      font-size: 12px;
    }
  }
  .login-btn button {
    width: 352px;
    height: 40px;
    margin-bottom: 10px;
    background: none;
    color: #dcdfe6;
  }
  .login-tips {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
  .icon-btn-col {
    font-size: 18px;
  }
  /deep/ .el-checkbox__label {
    color: #c6c8ca;
    font-size: 12px;
    font-weight: normal;
  }
  .code-btn {
    border: none;
    color: #409eff;
    width: 100px;
    position: absolute;
    left: 246px;
    top: 1px;
    height: 40px;
  }
  .code-btn-second {
    left: 174px;
  }
}
</style>
