import request from '@/utils/request'

/**
 * 资金账户列表
 * @param {Object} query
 */
export function accountList(query) {
    return request({
        'url': '/account/hq/page',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询资金账户详情
 * @param {Object} query
 */
export function accountDetail(query) {
    return request({
        'url': '/account/hq/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询现金/返利充值列表 rechargeCategory 充值分类（0：现金 1：返利） 必传
 * @param {Object} query
 */
export function rechargeList(query) {
    return request({
        'url': '/recharge/hq/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询返利/返利扣款列表 rechargeCategory 充值分类（0：现金 1：返利） 必传
 * @param {Object} query
 */
export function deductList(query) {
    return request({
        'url': '/deduct/hq/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 新增现金/返利充值 rechargeCategory 充值分类（0：现金 1：返利）
 * @param {Object} query
 */
export function addRecharge(query) {
    return request({
        'url': '/recharge/hq/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 新增现金/返利扣款 rechargeCategory 充值分类（0：现金 1：返利）
 * @param {Object} query
 */
export function addDeduct(query) {
    return request({
        'url': '/deduct/hq/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 查询充值账号列表
 * @param {Object} query
 */
export function paymentAccountList(query) {
    return request({
        'url': '/paymentAccount/hq/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 新增充值账号
 * @param {Object} query
 */
export function addPaymentAccount(query) {
    return request({
        'url': '/paymentAccount/hq/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑充值账号
 * @param {Object} query
 */
export function editPaymentAccount(query) {
    return request({
        'url': '/paymentAccount/hq/edit',
        'method': 'put',
        'params': query
    })
}
/**
 * 查询充值账号详情
 * @param {Object} query
 */
export function paymentAccountDetail(query) {
    return request({
        'url': '/paymentAccount/hq/' + query,
        'method': 'get',
        'params': query
    })
}
/**
 * 查询对账列表
 * @param {Object} query
 */
export function accountStatementList(query) {
    return request({
        'url': '/accountStatement/hq/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询对账详情
 * @param {Object} query
 */
export function accountStatementDetail(query) {
    return request({
        'url': '/accountStatement/hq/detail',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询经销商充值账号列表（不走权限）
 * @param {Object} query
 */
export function rechargeNumber(query) {
    return request({
        'url': '/paymentAccount/hq/list/display',
        'method': 'get',
        'params': query
    })
}
/**
 * 查询扣款类型列表/deductionType
 * @param {Object} query
 */
export function deductionType(query) {
    return request({
        'url': '/dict/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 现金充值：判断订单编号是否存在
 * @param {Object} query
 */
export function orderIsExist(query) {
    return request({
        'url': '/order/hq/exist',
        'method': 'get',
        'params': query
    })
}
