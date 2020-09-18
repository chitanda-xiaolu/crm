<template>
    <div class="header">
        <div class="logo">布兰莎业务运营平台</div>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <i class="el-icon-bell"></i>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{name}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="#" @click="userCenter">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                        </a>
                        <a href="#" @click="handleChangePsw">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </a>
                        <a href="#"  @click="getQrcode">
                            <el-dropdown-item>绑定/换绑钉钉</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog
            title="修改密码"
            :visible.sync="pswVisible"
            width="30%"
            :show-close='false'
            @open="openChangePswDialog"
            :close-on-click-modal='false'>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="loginForm"
                label-width="100px"
                class="ms-content">
                <el-form-item label="原密码" prop="oldpsw">
                    <el-input type="password" show-password v-model="ruleForm.oldpsw" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpsw">
                    <el-input type="password" show-password v-model="ruleForm.newpsw" minlength=6 maxlength=12 autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="renewpsw">
                    <el-input type="password" show-password v-model="ruleForm.renewpsw" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pswVisible = false">取消</el-button>
                <el-button type="primary" @click.native.prevent="submitForm('loginForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { changePsw } from '@/api/home'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'))
            } else {
                if(value.toString().length < 6) {
                    callback(new Error('至少输入6位'))
                } else {
                    callback()
                }
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入新密码'))
            } else if (value !== this.ruleForm.newpsw) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            collapse: false,
            fullscreen: false,
            name: '',
            message: 2,
            pswVisible: false,
            ruleForm: {
                newpsw: '',
                renewpsw: '',
                oldpsw: ''
            },
            rules: {
                oldpsw: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newpsw: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                renewpsw: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({ userData: 'user', navData: 'nav' })
    },
    mounted() {
        this.name = this.userData.name || '未登录'
        if (document.body.clientWidth < 1500) {
            this.collapseChage()
        }
    },
    methods: {
        ...mapMutations({ setCollapse: 'SET_COLLAPSE' }),
        ...mapActions({ replaceDindinLogin: 'replaceDindinLogin', FedLogOut: 'FedLogOut' }),
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command === 'loginout') {
                this.FedLogOut()
                this.$router.push('/login')
            }
        },
        // 更换绑定
        getQrcode() {
            let _self = this
            _self.replaceDindinLogin()
        },
        // 个人中心
        userCenter() {
            let id = JSON.parse(sessionStorage.getItem('vuex')).user.userId
            this.$router.push(`/user/detail/${id}`)
        },
        // 修改密码
        handleChangePsw() {
            this.pswVisible = true
        },
        // 提交修改密码
        submitForm(formName) {
            let _self = this
            _self.$refs[formName].validate((valid) => {
                if (valid) {
                    changePsw({ oldPwd: _self.ruleForm.oldpsw, newPwd: _self.ruleForm.newpsw }).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('修改成功')
                            _self.pswVisible = false
                        }
                    })
                } else {
                    return false
                }
            })
        },
        // 每次弹出修改密码框
        openChangePswDialog() {
            this.$refs['loginForm'] && this.$refs['loginForm'].clearValidate()
            this.ruleForm.renewpsw = ''
            this.ruleForm.oldpsw = ''
            this.ruleForm.newpsw = ''
        },
        // 侧边栏折叠
        collapseChage() {
            this.setCollapse(!this.navData.collapse)
        },
        // 全屏事件
        handleFullScreen() {
            const element = document.documentElement
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.fullscreen = !this.fullscreen
        }
    }
}
</script>
<style scoped lang="scss">
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        color: #fff;
        background: rgb(50, 65, 87)
    }
    .collapse-btn{
        float: left;
        padding: 0 11px;
        cursor: pointer;
        line-height: 50px;
    }
    .header .logo{
        float: left;
        /* width:250px; */
        line-height: 50px;
        margin-left: 7px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 50px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
