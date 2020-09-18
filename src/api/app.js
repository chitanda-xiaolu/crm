import request from '@/utils/request'
/**
 * 省市区联动查询
 * @param {Object} levelType // 等级 1:省 2：市 3：区
 */
export function areaCode(query) {
    return request({
        'url': '/areaCode/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 文件上传
 * @param {*} query
 */
export function uploadFile(query) {
    return request({
        'url': '/upload/uploadFile',
        'method': 'post',
        'data': query
    })
}
/**
 * 文件删除
 * @param {*} query
 */
export function deleteFile(query) {
    return request({
        'url': '/upload/deleteFile',
        'method': 'delete',
        'params': query
    })
}
/**
 * 枚举查询
 * @param {*} query
 */
export function enumType(query) {
    return request({
        'url': '/dict/list',
        'method': 'get',
        'params': query
    })
}
