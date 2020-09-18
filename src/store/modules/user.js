import {
    clogin,
    getInfo,
    getNewToken,
    backCode,
    codeLink,
    resetPassword,
    bindOAuthUser,
    replaceCodeLink,
    replaceBackCode,
    replaceBindUser
} from '@/api/passport'
import { Message } from 'element-ui'
import {
    getToken,
    getRefreshToken,
    setToken,
    setRefreshToken,
    setTokenTime,
    removeUserInfo
} from '@/utils/auth'

function setTokenFun(commit, data) {
    let timestamp = new Date().getTime()
    setToken(data.token)                            // 登录成功时设置token到cookie
    setTokenTime(timestamp)
    setRefreshToken(data.refreshToken)
    commit('SET_TOKEN', data.token)                 // 异步设置token保存至store
    commit('SET_REFRESHTOKEN', data.refreshToken)
}

export default {
    'state': {
        'token': getToken(),
        'refreshToken': getRefreshToken(),
        'userId': '',
        'name': '',
        'avatar': '',
        'roles': [],
        'openId': '',
        'isAttach': false,
        'platform': '',
        'menuList': [],
        'permissionList': [],
        'replaceOpenId': '',
        'replaceNickName': '',
        'againAttach': false,
        'kjlListenUrl': '',
        'websocketUrl': ''
    },
    'mutations': {
        'SET_TOKEN': (state, token) => {
            state.token = token
        },
        'SET_REFRESHTOKEN': (state, refreshToken) => {
            state.refreshToken = refreshToken
        },
        'SET_PERMISSIONLIST': (state, list) => {
            state.permissionList = list
        },
        'SET_USERID': (state, id) => {
            state.userId = id
        },
        'SET_NAME': (state, name) => {
            state.name = name
        },
        'SET_MENULIST': (state, menus) => {
            state.menuList = menus
        },
        'SET_AVATAR': (state, avatar) => {
            state.avatar = avatar
        },
        'SET_KJL_URL': (state, url) => {
            state.kjlListenUrl = url
        },
        'SET_ROLES': (state, roles) => {
            state.roles = roles
        },
        'OPEN_ID': (state, openId) => {
            state.openId = openId
        },
        'SET_PLATFORM': (state, platform) => {
            state.platform = platform
        },
        'SET_PERMISSION': (state, list) => {
            state.permissionList = list
        },
        'REPLACE_OPEN_ID': (state, data) => {
            state.replaceOpenId = data
        },
        'REPLACE_NICE_NAME': (state, data) => {
            state.replaceNickName = data
        },
        'AGAIN_ATTACH': (state, flag) => {
            state.againAttach = flag
        },
        'SET_WEBSOCKET_URL': (state, data) => {
            state.websocketUrl = data
        }
    },
    'actions': {
        /**
         * 登录
         * @param {Object} userInfo
         */
        Login({ commit }, userInfo) {
            const mobile = userInfo.mobile.trim()
            return new Promise((resolve, reject) => {
                clogin({ mobile, 'password': userInfo.password })
                    .then(response => {
                        const data = response.data
                        setTokenFun(commit, data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        /**
         * @param {*} param
         * @param {*} userInfo
         */
        ResetPassword({ commit }, userInfo) {
            const phone = userInfo.phone.trim()
            return new Promise((resolve, reject) => {
                resetPassword({ phone, 'newPassword': userInfo.newPassword, 'confirmNewPassword': userInfo.confirmNewPassword })
                    .then(response => {
                        const data = response.data
                        setTokenFun(commit, data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        /**
         * @param {*} 钉钉跳转
         */
        dindinLogin({ commit }) {
            return new Promise((resolve, reject) => {
                codeLink().then(result => {
                    window.location.href = result.data.result
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * @param {*} 换绑钉钉跳转
         */
        replaceDindinLogin({ commit }) {
            return new Promise((resolve, reject) => {
                replaceCodeLink().then(result => {
                    window.location.href = result.data.result
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取用户信息
         * @param {Object}
         *
         */
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    // 传递token
                    const data = response.data
                    commit('SET_MENULIST', data.permissions)
                    commit('SET_PERMISSION', data.buttonPermissions)
                    commit('SET_USERID', data.id)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_KJL_URL', data.kjlListenUrl)
                    commit('SET_PLATFORM', data.platform)
                    commit('SET_WEBSOCKET_URL', data.websocketUrl)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 刷新token
        RefreshToken({ commit, state }) {
            return new Promise((resolve, reject) => {
                getNewToken({ 'refreshToken': state.refreshToken })
                    .then(response => {
                        const data = response.data
                        setTokenFun(commit, data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        checkAttach({ commit, state }) {
            // 检查是否绑定钉钉
            let nowUrl = window.location.href
            if (nowUrl.indexOf('=') !== -1) {
                const code = nowUrl.split('=')[1].split('&')[0]
                return new Promise((resolve, reject) => {
                    backCode({ code }).then(result => {
                        let data = result.data
                        if(data.refreshToken && data.token) { // 绑定，直接登录，刷新tocken
                            setTokenFun(commit, data)
                            state.isAttach = true
                        }else { // 未绑定给openid
                            commit('OPEN_ID', data.openId)
                            state.isAttach = false
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        },
        replaceDindin({ commit, state }) {
            let nowUrl = window.location.href
            if (nowUrl.indexOf('=') !== -1) {
                const state = nowUrl.split('=')[2]
                const code = nowUrl.split('=')[1].split('&')[0]
                return new Promise((resolve, reject) => {
                    replaceBackCode({ 'code': code, 'state': state }).then(result => {
                        let data = result.data
                        if(result.code === 200 && result.success) { // 换绑、绑定弹窗
                            commit('REPLACE_OPEN_ID', data.openId)
                            commit('REPLACE_NICE_NAME', data.nickName)
                        } else { // 已绑定，自己再绑
                            Message({
                                'message': result.message || '服务器异常,请联系管理员',
                                'type': 'warning',
                                'duration': 3 * 1000,
                                'showClose': true
                            })
                            commit('AGAIN_ATTACH', true)
                        }
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        },
        attachUser({ commit }, query) { // 绑定钉钉用户
            const mobile = query.mobile.trim()
            return new Promise((resolve, reject) => {
                bindOAuthUser({ mobile, 'password': query.password, 'openId': query.openId })
                    .then(result => {
                        const data = result.data
                        setTokenFun(commit, data)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        replaceAttachUser({ commit }, query) { // 换绑确认操作
            const mobile = query.mobile.trim()
            return new Promise((resolve, reject) => {
                replaceBindUser({ mobile, 'password': query.password, 'openId': query.openId, 'nickNmae': query.nickName })
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        /**
         *  前端 登出
         *  @returns {Function}
         */
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_USERID', '')
                commit('SET_NAME', '')
                removeUserInfo()
                resolve()
            })
        }
    }
}
