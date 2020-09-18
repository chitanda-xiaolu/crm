import request from '@/utils/request'
import getErrorRequest from '@/utils/getErrorRequest'

/**
 * 获取区域树
 * @param {Object} query
 * status：0有效 1无效
 */
export function fieldsTree(query) {
    return request({
        'url': '/region/tree',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增区域
 * @param {Object} query
 * parentId: 上级区域
 * name:区域名称
 * status: 0有效，1无效
 */
export function addFields(query) {
    return request({
        'url': '/region/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 获取上级区域列表
 * @param {Object} query
 * regionId 区域id
 */
export function parentRegion(query) {
    return request({
        'url': '/region/parentRegion',
        'method': 'get',
        'params': query
    })
}
/**
 * 查看详情
 * @param {Object} query
 * regionId：区域id
 */
export function Detail(query) {
    return request({
        'url': '/region/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 编辑区域
 * @param {Object} query
 * id：区域id
 * mainId:负责人id
 * userIds:可查看人员。逗号分隔
 * distributorIds：经销商id，逗号分隔
 * parentId: 父级id
 * status： 0有效，1无效
 * name: 名称
 */
export function editFields(query) {
    return request({
        'url': '/region/edit',
        'method': 'put',
        'params': query
    })
}

/**
 * 判断经销商是否已经被别的区添加
 * @param {Object} query
 * regionId：区域id
 * distributorIds 经销商列表
 */
export function judgeDealerExist(query) {
    return getErrorRequest({
        'url': '/region/verifyDealer',
        'method': 'get',
        'params': query
    })
}
