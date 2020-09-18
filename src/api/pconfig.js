/*
 * @Description: 产品分类配置api
 * @Author: 陈桃
 * @Date: 2020-04-20 17:58:07
 * @LastEditTime: 2020-04-23 10:13:17
 * @LastEditors: 陈桃
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
 * 产品分类新增
 * @param {Object} param
 */
export function addpConfigProduct(param) {
    return request({
        'url': '/productLib/hq/dict/add',
        'method': 'post',
        'params': param
    })
}

/**
 * 编辑产品
 * @param {*} param
 */
export function editpConfigProduct(param) {
    return request({
        'url': '/productLib/hq/dict/edit',
        'method': 'put',
        'params': param
    })
}

/**
 * 查询产品详情
 * @param {Object} query
 */
export function pconfigDetail(query) {
    return request({
        'url': '/productLib/hq/dict/detail',
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
 * 产品分类启用/禁用
 * @param {*} param
 */
export function useOrForbid(param) {
    return request({
        'url': '/productLib/hq/dict/status/edit',
        'method': 'put',
        'params': param
    })
}
/**
 * 交付周期更新
 * @param {*} param
 */
export function updateCycle(param) {
    return request({
        'url': '/productLib/hq/dict/delivery/edit',
        'method': 'put',
        'params': param
    })
}
// 对照表-------------
/**
 * 分类对照分页查询
 * @param {Object} query
 */
export function kljclassList(query) {
    return request({
        'url': '/productCustomKjlReference/hq/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 分类对照新增
 * @param {Object} param
 */
export function addkjlclass(param) {
    return request({
        'url': '/productCustomKjlReference/hq/addItem',
        'method': 'post',
        'params': param
    })
}
/**
 * 编辑对照表
 * @param {*} param
 */
export function editkjlclass(param) {
    return request({
        'url': '/productCustomKjlReference/hq/editItem',
        'method': 'put',
        'params': param
    })
}
/**
 * 对照表详情
 * @param {Object} query
 */
export function kjlclassDetail(query) {
    return request({
        'url': '/productCustomKjlReference/hq/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询所有定制品的一级分类
 * @param {Object} query
 */
export function allKjlclassSort(query) {
    return request({
        'url': '/productCustomKjlReference/hq/custom/type/list',
        'method': 'get',
        'params': query
    })
}
