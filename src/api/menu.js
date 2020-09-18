import request from '@/utils/request'
/**
 * 查询菜单列表
 * @param {Object} query
 */
export function getMenuList(query) {
    return request({
        'url': '/menu/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增菜单
 * @param {Object} query
 */
export function addMenuManage(query) {
    return request({
        'url': '/menu/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 编辑菜单
 * @param {Object} query
 */
export function editMenuManage(query) {
    return request({
        'url': '/menu/edit',
        'method': 'put',
        'params': query
    })
}
