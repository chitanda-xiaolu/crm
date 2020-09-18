import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {Object} query
 */
export function roleList(query) {
    return request({
        'url': '/authority/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增角色
 * @param {Object} query
 */
export function addRole(query) {
    return request({
        'url': '/authority/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 获取角色详情
 * @param {Object} query
 */
export function roleDetail(query) {
    return request({
        'url': '/authority/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 编辑角色
 * @param {Object} query
 */
export function editRole(query) {
    return request({
        'url': '/authority/edit',
        'method': 'put',
        'params': query
    })
}
