import request from '@/utils/request'
/**
 * 查询小区列表
 * @param {Object} query
 */
export function estateList(query) {
    return request({
        'url': '/housingEstate/hq/page',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增小区
 * @param {Object} param
 */
export function estateAdd(param) {
    return request({
        'url': '/housingEstate/hq/add',
        'method': 'post',
        'params': param
    })
}

/**
 * 编辑小区
 * @param {Object} param
 */
export function estateEdit(param) {
    return request({
        'url': '/housingEstate/hq/edit',
        'method': 'put',
        'params': param
    })
}

/**
 * 查看小区详情
 * @param {String} query
 */
export function estateDetail(query) {
    return request({
        'url': `/housingEstate/hq/${query}`,
        'method': 'get'
    })
}
