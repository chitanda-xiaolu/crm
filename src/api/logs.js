import request from '@/utils/request'

/**
 * 获取登录日志列表
 * @param {Object} query
 */
export function loginLogs(query) {
    return request({
        'url': '/loginLog/page',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取业务日志列表
 * @param {Object} query
 */
export function operationLogs(query) {
    return request({
        'url': '/operationLog/page',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取业务日志详情
 * @param {Object} query
 */
export function operationDetail(query) {
    return request({
        'url': '/operationLog/detail',
        'method': 'get',
        'params': query
    })
}
