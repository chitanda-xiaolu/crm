import request from '@/utils/request'

/**
 * 门店列表
 * @param {Object} query
 */
export function getStoreList(query) {
    return request({
        'url': '/store/hq/page',
        'method': 'get',
        'params': query
    })
}
/**
 * 门店详情
 * @param {Object} query
 */
export function storeDetail(query) {
    return request({
        'url': '/store/hq/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增门店
 * @param {Object} query
 */
export function createStore(query) {
    return request({
        'url': '/store/hq/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑门店
 * @param {Object} query
 */
export function editStore(query) {
    return request({
        'url': '/store/hq/edit',
        'method': 'put',
        'params': query
    })
}
/**
 * 查询门店类型列表
 * @param {Object} query
 */
export function storeType(query) {
    return request({
        'url': '/dict/list?dictTypeCode=store_type',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询门店状态列表
 * @param {Object} query
 */
export function storeStatus(query) {
    return request({
        'url': '/dict/list?dictTypeCode=store_status',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询展示位置列表
 * @param {Object} query
 */
export function storeShowLocation(query) {
    return request({
        'url': '/dict/list?dictTypeCode=show_location',
        'method': 'get',
        'params': query
    })
}
/**
 * 门店，店长，副店长列表
 * @param {Object} query
 */
export function getShopOwner(query) {
    return request({
        'url': '/distributorEmployee/list',
        'method': 'get',
        'params': query
    })
}
