import request from '@/utils/request'

/**
 * 帮助列表
 * @param {Object} query
 */
export function helpList(query) {
    return request({
        'url': '/help/platform/page',
        'method': 'get',
        'params': query
    })
}
/**
 * 帮助详情
 * @param {Object} query
 */
export function helpDetail(query) {
    return request({
        'url': '/help/platform/' + query,
        'method': 'get'
    })
}
/**
 * 帮助详情
 * @param {Object} query
 */
export function helpDetailByNo(query) {
    return request({
        'url': '/help/detail/' + query,
        'method': 'get'
    })
}
/**
 * 新增帮助
 * @param {Object} query
 */
export function createHelp(query) {
    return request({
        'url': '/help/platform/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑帮助
 * @param {Object} query
 */
export function editHelp(query) {
    return request({
        'url': '/help/platform/edit',
        'method': 'put',
        'params': query
    })
}
