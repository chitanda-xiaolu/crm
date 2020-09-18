import request from '@/utils/request'

/**
 * 活动列表
 * @param {Object} query
 */
export function activeList(query) {
    return request({
        'url': '/marketActivity/hq/page',
        'method': 'get',
        'params': query
    })
}
/**
 * 公告详情
 * @param {Object} query
 */
export function activeDetail(query) {
    return request({
        'url': '/marketActivity/hq/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增活动
 * @param {Object} query
 */
export function createActive(query) {
    return request({
        'url': '/marketActivity/hq/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑活动
 * @param {Object} query
 */
export function editActive(query) {
    return request({
        'url': '/marketActivity/hq/edit',
        'method': 'put',
        'params': query
    })
}
