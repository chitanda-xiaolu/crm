import request from '@/utils/request'

/**
 * 岗位列表
 * @param {Object} query
 */
export function postsList(query) {
    return request({
        'url': '/role/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增岗位
 * @param {Object} query
 */
export function addPosts(query) {
    return request({
        'url': '/role/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 岗位详情
 * @param {Object} query
 */
export function postsDetail(query) {
    return request({
        'url': '/role/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 编辑岗位
 * @param {Object} query
 *      roleId: string 角色id
 *      ids： array 选择权限的id素组
 */
export function editPosts(query) {
    return request({
        'url': '/role/edit',
        'method': 'put',
        'params': query
    })
}

/**
 * 给岗位配置角色
 * @param {Object} query
 */
export function setPostsRole(query) {
    return request({
        'url': '/authority/setAuthority',
        'method': 'post',
        'params': query
    })
}
/**
 * 根据岗位id查询角色列表
 * @param {Object} query
 */
export function getRoleBypostsId(query) {
    return request({
        'url': '/authority/listByRoleId',
        'method': 'get',
        'params': query
    })
}
