import request from '@/utils/request'

/**
 * 员工列表
 * @param {Object} query
 */
export function getUserlist(query) {
    return request({
        'url': '/user/page',
        'method': 'get',
        'params': query
    })
}
/**
 * 不分页员工列表
 * @param {Object} query
 */
export function getNopageUserlist(query) {
    return request({
        'url': '/user/list/display',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增员工
 * @param {Object} query
 */
export function createUser(query) {
    return request({
        'url': '/user/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑员工
 * @param {Object} query
 */
export function editUser(query) {
    return request({
        'url': '/user/edit',
        'method': 'put',
        'params': query
    })
}
/**
 * 重置密码
 * @param {Object} query
 */
export function resetPsw(query) {
    return request({
        'url': '/user/resetPassword',
        'method': 'put',
        'params': query
    })
}
/**
 * 部门树
 * @param {Object} query
 */
export function getDeptTree(query) {
    return request({
        'url': '/dept/tree',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增员工----部门树
 * @param {Object} query
 */
export function getDeptTreeDisplay(query) {
    return request({
        'url': '/dept/tree/display',
        'method': 'get',
        'params': query
    })
}
/**
 * 部门筛选过的树
 * @param {Object} query
 */
export function getDeptFilterTree(query) {
    return request({
        'url': '/dept/pidDept',
        'method': 'get',
        'params': query
    })
}

/**
 * 岗位
 * @param {Object} query
 */
export function getRoleTree(query) {
    return request({
        'url': '/role/list/display',
        'method': 'get',
        'params': query
    })
}

/**
 * 员工详情
 * @param {Object} query
 */
export function userDetail(query) {
    return request({
        'url': '/user/userDetail',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增部门
 * @param {Object} query
 */
export function createDept(query) {
    return request({
        'url': '/dept/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑部门
 * @param {Object} query
 */
export function editDept(query) {
    return request({
        'url': '/dept/update',
        'method': 'put',
        'params': query
    })
}
/**
 * 部门详情
 * @param {Object} query
 */
export function deptDetail(query) {
    return request({
        'url': '/dept/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 所有员工列表
 * @param {Object} query
 */
export function getManager(query) {
    return request({
        'url': '/user/manager',
        'method': 'get',
        'params': query
    })
}
/**
 * 员工酷家乐账号绑定
 */
export function bindEmployee(query) {
    return request({
        'url': '/kujiale/hq/user/bind',
        'method': 'post',
        'params': query
    })
}
