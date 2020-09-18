import request from '@/utils/request'

/**
 * 系统公告列表
 * @param {Object} query
 */
export function noticeList(query) {
    return request({
        'url': '/system/notice/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 系统公告详情
 * @param {Object} query
 */
export function noticeDetail(query) {
    return request({
        'url': '/system/notice/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增系统公告
 * @param {Object} query
 */
export function createNotice(query) {
    return request({
        'url': '/system/notice/addItem',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑系统公告
 * @param {Object} query
 */
export function editNotice(query) {
    return request({
        'url': '/system/notice/editItem',
        'method': 'put',
        'params': query
    })
}

/**
 * 业务公告列表
 * @param {Object} query
 */
export function businessNoticeList(query) {
    return request({
        'url': '/business/notice/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 业务公告详情
 * @param {Object} query
 */
export function businessNoticeDetail(query) {
    return request({
        'url': '/business/notice/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增业务公告
 * @param {Object} query
 */
export function businessCreateNotice(query) {
    return request({
        'url': '/business/notice/addItem',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑业务公告
 * @param {Object} query
 */
export function businessEditNotice(query) {
    return request({
        'url': '/business/notice/editItem',
        'method': 'put',
        'params': query
    })
}
