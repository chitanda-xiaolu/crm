// 对象合并工具
import store from '@/store'

// 判断是否有权限
export const hasPermission = function(code) {
    if (code === 'NoPermission') return true
    let permission = store.getters.permissionList
    if (permission && code) {
        var i = permission.length
        while (i--) {
            if (permission[i].code === code) {
                return true
            }
        }
        return false
    }
    return false
}

// 按钮阶段筛选
export const mergeStage = function(obj) {
    if (!store.orderDetailData) return false
    let nowStatus = store.order.orderDetailData.status
    let isShow = false
    switch (obj.operators) {
    case 'more':
        isShow = Boolean(nowStatus > obj.status)
        break
    case 'less':
        isShow = Boolean(nowStatus < obj.status)
        break
    case 'middle':
        isShow = Boolean((nowStatus > obj.status1) && (nowStatus < obj.status2))
        break
    case 'neq':
        isShow = Boolean(nowStatus !== obj.status)
        break
    }
    return isShow
}

// 合并对象,返回新对象
export const mergeObject = function (obj1, obj2) {
    var arg = arguments
    return Object.assign({}, ...arg)
}
export const addNumberDot = function(num) {
    if (num.indexOf('.') < 0) {
        num = num + '.00'
    }
    return num
}

// 去除数组和对象中表现为false的字段
export const filterFalsy = function(obj) {
    if (obj instanceof Array) {
        return obj.filter(v => v || v === 0)
    } else if (obj instanceof Object) {
        const result = {}
        for (const attr in obj) {
            if (obj[attr] || obj[attr] === 0 || obj[attr] === false) {
                result[attr] = obj[attr]
            }
        }
        return result
    }
}

// 对象中筛选指定属性
export const selectObj = function(obj, keys) {
    return keys.reduce((result, key) => {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key]
        }
        return result
    }, {})
}

// 删除数组中指定元素
export const arrayRemove = function(arr, keys) {
    var index = arr.indexOf(keys)
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr
}

// 枚举遍历
export const renderEnum = function(classEnum, value) {
    for (let i = 0; i < classEnum.length; i++) {
        let item = classEnum[i]
        if (value === item.id) {
            return item.name
        }
    }
}

// 判断空对象
export const isEmptyObject = (obj) => {
    for(let key in obj) {
        return false
    }
    return true
}

// 获取年月日
export const getTimeYMD = (time) => {
    return time && time.slice(0, 10)
}

// 删除对象关键字段
export const killEmptyKey = (obj) => {
    for (var key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return obj
}

// 过滤数组对象
export const filterArray = (arr, key, value) => {
    arr.filter(item => {
        return item[key] === value
    })
}

// 科学计数法
export const toThousandsNum = (num) => {
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        var parts
        num =  num.toString()
        // 分离数字的小数部分和整数部分
        parts = num.split('.')
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',')
        return parts.join('.')
    } else {
        // 不是数字不做处理
        return num
    }
}

// 保留两位百分数
export const toPercent = (point) => {
    var str = Number(point * 100).toFixed(2)
    str += '%'
    return str
}

// 数组求和
export const sum = (arr) => {
    var s = 0
    arr.forEach(function(val, idx, arr) {
        s += val
    }, 0)
    return s
}

// 获取query的参数
export const queryParam = (arr) => {
    let obj = {}
    arr.forEach(function(item, idx, arr) {
        obj[item.code] = item.value
    })
    return obj
}

// 查找数组对象中特定值
const indexOfByAttr = function (array, type, val) {
    if (array instanceof Array) {
        for (let i = 0, len = array.length; i < len; i++) {
            if (array[i][type] === val) {
                return i
            }
        }
    }
    return -1
}

// 查找指定id
export const indexOfById = function (array, id) {
    return indexOfByAttr(array, 'id', id)
}

// 导出excel文件
export const exportFile = function (result, fileName) {
    let blob = new Blob([result], {type: 'application/vnd.ms-excel'})
    // for IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, `${fileName}.xls`)
    } else { // for Non-IE (chrome, firefox etc.)
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        var url = window.URL.createObjectURL(blob)
        a.href =  url
        a.download = `${fileName}.xls`
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    }
}

// js转换时间戳 yy-mm-dd
export const filterDate =  function(time) {
    const date = new Date(time)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const T = Y + M + D
    return T
}
