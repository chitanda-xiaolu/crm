/*
 * @Description: 产品业务api管理
 * @Author: 陈桃
 * @Date: 2019-11-26 15:32:08
 * @LastEditTime: 2020-04-29 14:35:46
 * @LastEditors: Zale Ying
 */
import request from '@/utils/request'
/**
 * 产品库产品分页查询
 * @param {Object} query
 */
export function productList(query) {
    return request({
        'url': '/productLib/hq/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增产品
 * @param {Object} param
 */
export function addProduct(param) {
    return request({
        'url': '/productLib/hq/addItem',
        'method': 'post',
        'params': param
    })
}

/**
 * 编辑产品
 * @param {*} param
 */
export function editProduct(param) {
    return request({
        'url': '/productLib/hq/editItem',
        'method': 'put',
        'params': param
    })
}

/**
 * 查询产品详情
 * @param {Object} query
 */
export function productDetail(query) {
    return request({
        'url': '/productLib/hq/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 产品分类树
 * @param {distributorId} query
 */
export function productTree(query) {
    return request({
        'url': '/productLib/hq/dict/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 产品库产品上下架
 * @param {*} param
 */
export function LowerOrLower(param) {
    return request({
        'url': '/productLib/hq/editItem/status',
        'method': 'put',
        'params': param
    })
}
/**
 * 获取产品库配置类型
 * @param {*} param
 */
export function productConfig(param) {
    return request({
        'url': '/productLib/hq/type/list',
        'method': 'get',
        'params': param
    })
}
