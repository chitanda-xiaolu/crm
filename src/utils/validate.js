// 手机号11位校验
export function validatePhone(rule, value, callback) {
    if (/^[0-9]{11}$/.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的手机号'))
    }
}
// 区域面积数字校验
export function validateArea(rule, value, callback) {
    if (/^([1-9]\d*|0)(\.\d*[0-9])?$/.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正数'))
    }
}
// 校验金额是正数
export function validateMoney(rule, value, callback) {
    if (parseFloat(value) > 0) {
        callback()
    } else {
        callback(new Error('请输入正数'))
    }
}
export function validateMoney1(value, newVal, callback) {
    if (parseFloat(value) > 0) {
        callback()
    } else {
        callback(new Error('请输入正数'))
    }
}
export function validateCard(rule, value, callback) {
    if (/^(\d{16}|\d{19})$/.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确卡号'))
    }
}
// 合法uri
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

// 去除空格
export function strTrim(str) {
    return str && str.replace(/(^\s*)|(\s*$)/g, '')
}

export function validateContent(str) {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,8}$/
    const data = str && str.replace(/(^\s*)|(\s*$)/g, '')
    return reg.test(data)
}
// 小写字母
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}
// 字母数字汉字
export function validateCNECNE(str) {
    if (!str) return false
    const strs = (str + '').replace(/(^\s*)|(\s*$)/g, '')
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
    return reg.test(strs)
}
// 大写字母
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}
// 转码
export function escape2Html(str) { // 转义
    /* eslint-disable */
    var arrEntities = {'lt': '<','gt':'>','nbsp': ' ','amp': '&','quot': '"','#40': '(', '#41': ')'}
    return str && str.replace(/&(lt|gt|nbsp|amp|quot|#40|#41);/ig, function(all, t) {
        return arrEntities[t] 
    })
    /* eslint-disable */
}

// 数字
export function validateNum(str) {
    const reg = /^[0-9]+$/
    return reg.test(str)
}

// 大小写字母
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* 获取月初和月末 */
export function monthDay(time, bloo) {
    const date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (bloo) { // 月初
        return (new Date(year + '-' + month + '-1')).getTime()
    } else { // 月末
        if (month === 12) {
            year += 1
            month = 1
        } else {
            month += 1
        }
        return (new Date(year + '-' + month + '-1')).getTime() - 1000 * 3600 * 24
    }
}

// js转换时间戳 年月日十分秒
export function filtertime(time) {
    const date = new Date(time)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    const s = date.getSeconds()
    const T = Y + M + D + h + m + s
    return T
}

// js转换时间戳 十分秒
export function filterDay(time) {
    const date = new Date(time)
    const h = date.getHours() + ':'
    const m = (date.getMinutes() < 10 ? ('0' + date.getMinutes() + ':') : (date.getMinutes() + ':'))
    const s = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
    const T = h + m + s
    return T
}

// js转换时间戳 yy-mm-dd
export function filtertime1(time) {
    const date = new Date(time)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const T = Y + M + D
    return T
}

// js转换时间戳 字符串转时间戳
export function strToTimestamp(time) {
    let date = time.substring(0,19)
    date = date.replace(/-/g,'/')   //必须把日期'-'转为'/'
    let timestamp = new Date(date).getTime()
    return timestamp
}

// js转换月的起始时间
export function filtertime2(time) {
    const firstday = this.$moment(time).startOf('month').format('YYYY-MM-DD')
    const lastday = this.$moment(time).endOf('month').format('YYYY-MM-DD')
    return {
        startTime: firstday,
        endTime: lastday
    }
}

// 百分比转换成小数
export function toPoint(percent) {
    var str = percent.replace('%', '')
    str = str / 100
    return str
}

// 判断今年是否是闰年
export function isLeapYear(year) {
    year = year || new Date().getFullYear()
    if(year%4 === 0 && year%100 != 0 || year%400 === 0) {
        return true
    } else {
        return false
　　}
}
