/*
 * @Description: excel导出功能
 * @Author: Zale Ying
 * @Date: 2020-04-21 16:17:26
 * @LastEditTime: 2020-06-03 16:10:06
 * @LastEditors: 陈桃
 */

import request from '@/utils/request'
/**
 * 经销商列表导出
 * @param {Object} query
*/
export function exportDistributorList(query) {
    return request({
        'url': '/distributor/hq/export',
        'method': 'get',
        'params': query,
        'responseType': 'blob'
    })
}

/**
 * 订单列表导出
 * @param {Object} query
*/
export function exportOrderList(query) {
    return request({
        'url': '/order/hq/export',
        'method': 'get',
        'params': query,
        'responseType': 'blob'
    })
}
/**
 * 首页统计导出
 * @param {Object} query
*/
export function exportHomeList(query) {
    return request({
        'url': '/performance/hq/statistics/export',
        'method': 'get',
        'params': query,
        'responseType': 'blob'
    })
}
