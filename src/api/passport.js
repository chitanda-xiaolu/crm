import service from '@/utils/request'
import serviceNoToken from '@/utils/requestNoToken'
import getErrorRequest from '@/utils/getErrorRequest'
import qs from 'qs'

export function clogin(param) {
    return serviceNoToken({
        'url': '/token/login',
        'method': 'post',
        'data': qs.stringify(param)
    })
}
/**
 * 获取用户信息
 * @param {*} null
 */

export function getInfo() {
    return service({
        'url': '/token/getUserDetail',
        'method': 'get'
    })
}

/**
 * 刷新token
 * @param {Object}
 * @returns {Function}
 */
export function getNewToken(param) {
    return serviceNoToken({
        'url': `/token/refreshToken?${qs.stringify(param)}`,
        'method': 'get'
    })
}
/**
 * 调用钉钉二维码
 * @param {*} null
 */
export function codeLink() {
    return service({
        'url': '/oauth/render/dingtalk',
        'method': 'get'
    })
}
/**
 * 换绑调用钉钉二维码
 * @param {*} null
 */
export function replaceCodeLink() {
    return service({
        'url': '/dingtalk/replace',
        'method': 'get'
    })
}
/**
 * 钉钉回调接口
 * @param {*} params
 */
export function backCode(param) {
    return serviceNoToken({
        'url': '/oauth/callback/dingtalk',
        'method': 'post',
        'params': param
    })
}
/**
 * 换绑钉钉回调接口
 * @param {*} params
 */
export function replaceBackCode(param) {
    return getErrorRequest({
        'url': '/dingtalk/replace/callback',
        'method': 'post',
        'params': param
    })
}
/**
 * 绑定用户接口
 * @param {*} params
 */
export function bindOAuthUser(param) {
    return service({
        'url': '/oauth/bindOAuthUser',
        'method': 'put',
        'params': param
    })
}
/**
 * 换绑用户接口
 * @param {*} params
 */
export function replaceBindUser(param) {
    return service({
        'url': '/dingtalk/replace/bind',
        'method': 'put',
        'params': param
    })
}

/**
 * 设置新密码
 * @param {*} params
 */
export function resetPassword(params) {
    return serviceNoToken({
        'url': '/password/hq/forget/resetPassword',
        'method': 'post',
        'params': params
    })
}
/**
 * 发送短信验证码
 * @param {*} params
 */
export function sendCode(params) {
    return serviceNoToken({
        'url': '/password/hq/forget/sendValidateCode',
        'method': 'post',
        'params': params
    })
}
/**
 * 提交验证码和手机号码，下一步
 * @param {*} params
 */
export function nextStep(params) {
    return serviceNoToken({
        'url': '/password/hq/forget/verifyCode',
        'method': 'post',
        'params': params
    })
}
/**
 * 验证手机号码是否存在
 * @param {*} params
 */
export function isExitPhone(params) {
    return serviceNoToken({
        'url': '/password/hq/forget/' + params,
        'method': 'post'
    })
}
