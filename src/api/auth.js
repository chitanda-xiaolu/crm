import request from '@/utils/request'

/**
 * 角色下的权限
 * @param {Object} query
 */
export function roleAuthList(query) {
    return request({
        'url': '/menu/listMenuByAuthority',
        'method': 'get',
        'params': query
    })
}

/**
 * 为角色设置权限
 * @param {Object} query
 */
export function setRoleAuth(query) {
    return request({
        'url': '/menu/setMenu',
        'method': 'post',
        'params': query
    })
}

/**
 * 岗位下的权限
 * @param {Object} query
 */
export function getPostsAuthList(query) {
    return request({
        'url': '/menu/listMenuByRole',
        'method': 'get',
        'params': query
    })
}

/**
 * 根据岗位ID获取岗位下角色的权限
 * @param {Object} query
 */
export function getAuthByPid(query) {
    return request({
        'url': '/authority/listByRoleId',
        'method': 'get',
        'params': query
    })
}
