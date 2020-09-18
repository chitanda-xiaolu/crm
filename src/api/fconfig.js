/*
 * @Description:
 * @Author: 陈桃
 * @Date: 2020-06-23 14:45:55
 * @LastEditTime: 2020-07-20 15:24:16
 * @LastEditors: Zale Ying
 */
import request from '@/utils/request'
/**
 * 获取休息日列表
 * @param {Object} query
 */
export function workCalendarList(query) {
    return request({
        'url': '/dayOff/hq/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 判断休息日是否已存在
 * @param {Object} query
 */
export function holidayIsExist(query) {
    return request({
        'url': '/dayOff/hq/exist',
        'method': 'get',
        'params': query
    })
}
/**
 * 删除休息日
 * @param {Object} query
 */
export function deleteHoliday(query) {
    return request({
        'url': '/dayOff/hq/remove',
        'method': 'delete',
        'params': query
    })
}
/**
 * 新增休息日
 * @param {Object} query
 */
export function addHoliday(query) {
    return request({
        'url': '/dayOff/hq/add',
        'method': 'post',
        'params': query
    })
}
