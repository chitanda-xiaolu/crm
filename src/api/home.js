/*
 * @Description: 首页公告api管理
 * @Author: 陈桃
 * @Date: 2019-10-09 16:44:09
 * @LastEditTime: 2020-06-16 20:18:07
 * @LastEditors: Zale Ying
 */
import request from '@/utils/request'

/**
 * 角色下的权限
 * @param {Object} query
 */
export function getAllSaleOpportunity(query) {
    return request({
        'url': '/home/saleOpportunity',
        'method': 'get',
        'params': query
    })
}
/**
 * 获取首页业更多公告列表
 * @param {Object} query
 */
export function getMoreBusinessNoticeList(query) {
    return request({
        'url': '/home/hq/notice/page',
        'method': 'get',
        'params': query
    })
}
/**
 * 业务公告详情
 * @param {Object} query
 */
export function businessNoticeDetail(query) {
    return request({
        'url': '/business/notice/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 系统公告详情
 * @param {Object} query
 */
export function noticeDetail(query) {
    return request({
        'url': '/system/notice/detail',
        'method': 'get',
        'params': query
    })
}
/**
 *  修改密码
 * @param {Object} query
 */
export function changePsw(query) {
    return request({
        'url': '/user/editPassword',
        'method': 'put',
        'params': query
    })
}
/**
 * 图表数据
 * @param {Object} query
 */
export function getOrderCount(query) {
    return request({
        'url': '/performance/hq/statistics',
        'method': 'get',
        'params': query
    })
}
/**
 * 片区
 * @param {Object} query
 */
export function regionData(query) {
    return request({
        'url': '/region/parentRegion',
        'method': 'get',
        'params': query
    })
}
/**
 * 本日、本月、本季度、本年下单和回款金额统计
 * @param {Object} query
 */
export function amountStatisticsy(query) {
    return request({
        'url': '/performance/hq/statistics/accurate',
        'method': 'get',
        'params': query
    })
}
