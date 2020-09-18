import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-RefreshToken'
const TokenTime = 'Token-Time'

/**
 * 获取token
 */
export function getToken() {
    return Cookies.get(TokenKey)
}

/**
 * 获取refreshToken
 */
export function getRefreshToken() {
    return Cookies.get(RefreshTokenKey)
}
/**
 * 获取token设置时间
 */
export function getTokenTime() {
    return Cookies.get(TokenTime)
}

/**
 * 在cookie中设置token
 * @param {String} token
 */
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
/**
 * 设置token存入时间
 * @param {Date} _time
 */
export function setTokenTime(_time) {
    return Cookies.set(TokenTime, _time)
}

/**
 * 在cookie中设置refreshToken
 * @param {String} refreshToken
 */
export function setRefreshToken(refreshToken) {
    return Cookies.set(RefreshTokenKey, refreshToken)
}

/**
 * 清除用户缓存信息
 */
export function removeUserInfo() {
    sessionStorage.removeItem('vuex')
    return Cookies.remove(TokenKey)
}
