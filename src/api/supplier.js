import request from '@/utils/request'

/**
 * 经销商列表--区域配置模块
 * @param {Object} query
 */
export function getDistributor(query) {
    return request({
        'url': '/distributor/list/display',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取经供应商列表
 * @param {Object} query
 */
export function supplierList(query) {
    return request({
        // 'url': '/distributor/list',
        'url': '/supplier/list',
        // /supplier/list
        'method': 'get',
        'params': query
    })
}

/**
 * 新增经销商
 * @param {Object} param
 */
export function addSupplier(param) {
    return request({
        'url': '/distributor/addItem',
        'method': 'post',
        'params': param
    })
}

/**
 * 编辑供应商
 * @param {*} param
 */
export function editSupplier(param) {
    return request({
        'url': '/supplier/addItem',
        'method': 'put',
        'params': param
    })
}

/**
 * 新增产品
 * @param {Object} param
 */
export function addProduction(param) {
    return request({
        'url': '/distributor/addItem',
        'method': 'post',
        'params': param
    })
}

/**
 * 编辑产品
 * @param {*} param
 */
export function editProduction(param) {
    return request({
        'url': '/supplier/addItem',
        'method': 'put',
        'params': param
    })
}

/**
 * 查询供应商详情
 * @param {Object} query
 */
export function supplierDetail(query) {
    return request({
        'url': '/supplier/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 查询供应商产品列表
 * @param {Object} query
 */
export function productionList(query) {
    return request({
        'url': '/productSup/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取部门树列表
 * @param {distributorId} query
 */
export function dealerTree(query) {
    return request({
        'url': '/dept/distributor/detail/deptTree',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取经销商部门员工
 * @param {deptId, distributorId} query
 */
export function dealerUsers(query) {
    return request({
        'url': '/distributorEmployee/distributor/detail/listUser',
        'method': 'get',
        'params': query
    })
}

/**
 * 经销商重置员工密码
 * @param {userId} query
 */
export function dealerUserPassword(query) {
    return request({
        'url': '/distributorEmployee/distributor/detail/resetPassword',
        'method': 'put',
        'params': query
    })
}

/**
 * 查询经销商资金账户详情（经销商-资金管理）
 * @param {deptId, distributorId} query
 */
export function dealerAccount(query) {
    return request({
        'url': '/distributor/hq/account',
        'method': 'get',
        'params': query
    })
}

/**
 * 员工酷家乐账号绑定
 */
export function bindEmployee(query) {
    return request({
        'url': '/kujiale/hq/distributorEmployee/bind',
        'method': 'post',
        'params': query
    })
}
/**
 * 酷家乐账号校验绑定
 */
export function checkBindEmployee(query) {
    return request({
        'url': '/kujiale/hq/bind/check',
        'method': 'get',
        'params': query
    })
}
/**
 * 获取供应商报表数据
 */
export function getSupplierCount(query) {
    return request({
        'url': '/supplier/supplierCount',
        'method': 'get',
        'params': query
    })
}
/**
 * 获取产品报表数据
 */
export function getProductionCount(query) {
    return request({
        'url': '/productSup/productCount',
        'method': 'get',
        'params': query
    })
}
/**
 * 获取产品报表数据
 */
export function getSupplierByTime(query) {
    return request({
        'url': '/supplier/supplierTimeCount',
        'method': 'get',
        'params': query
    })
}
