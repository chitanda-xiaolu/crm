import request from '@/utils/request'
/**
 * 新增订单
 * @param {Object} query
 */
export function createOrder(query) {
    return request({
        'url': '/order/distributor/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 编辑订单
 * @param {Object} query
 */
export function editOrder(query) {
    return request({
        'url': '/order/distributor/edit',
        'method': 'put',
        'params': query
    })
}
/**
 * 审核分配人
 * @param {Object} query
 */
export function claimUsers(query) {
    return request({
        'url': '/user/hq/auditor/list',
        'method': 'get',
        'params': query
    })
}
/**
 * 获取酷家乐方案列表
 * @param {Object} query
 */
export function designProgramList(query) {
    return request({
        'url': '/kujiale/hq/design/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 客户订单取消关联方案
 * @param {Object} query
 */
export function unBindProgram(query) {
    return request({
        'url': '/kujiale/hq/design/unbind',
        'method': 'post',
        'params': query
    })
}

/**
 * 客户订单关联方案
 * @param {Object} query
 */
export function programBind(query) {
    return request({
        'url': '/kujiale/hq/design/bind',
        'method': 'post',
        'params': query
    })
}

/**
 * 获取酷家乐方案列表
 * @param {Object} query
 */
export function programDetail(query) {
    return request({
        'url': '/kujiale/design/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 分配初审审核人
 * @param {Object} query
 */
export function distribute(query) {
    return request({
        'url': '/order/hq/allot',
        'method': 'post',
        'params': query
    })
}
/**
 * 分配终审审核人
 * @param {Object} query
 */
export function distributeFinal(query) {
    return request({
        'url': '/order/hq/allot/final',
        'method': 'post',
        'params': query
    })
}
/**
 * 初审认领订单
 * @param {Object} query
 */
export function orderClaim(query) {
    return request({
        'url': '/order/hq/claim',
        'method': 'post',
        'params': query
    })
}

/**
 * 终审认领订单
 * @param {Object} query
 */
export function finalOrderClaim(query) {
    return request({
        'url': '/order/hq/claim/final',
        'method': 'post',
        'params': query
    })
}

/**
 * 获取酷家乐审核单列表
 * @param {Object} query
 */
export function auditList(query) {
    return request({
        'url': '/kujiale/distributor/production/audit/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取酷家乐审核单列表
 * @param {Object} query
 */
export function orderList(query) {
    return request({
        'url': '/order/hq/page',
        'method': 'get',
        'params': query
    })
}

/**
 * 生产单提交初审
 * @param {Object} query
 */
export function productionAdd(query) {
    return request({
        'url': '/kujiale/hq/production/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 设计方案
 * @param {Object} query
 */
export function designProgram(query) {
    return request({
        'url': '/kujiale/iframe/url',
        'method': 'get',
        'params': query
    })
}

/**
 * 订单详情
 * @param {Object} query
 */
export function orderDetail(query) {
    return request({
        'url': '/order/hq/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取生产单列表
 * @param {Object} query
 */
export function productionList(query) {
    return request({
        'url': '/production/hq/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 获取生产单列表 (设计阶段)
 * @param {Object} query
 */
export function productionKjlList(query) {
    return request({
        'url': '/kujiale/hq/production/audit/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 生产单认领审核返回iframeurl
 * @param {Object} query
 */
export function iframeUrl(query) {
    return request({
        'url': '/production/hq/audit',
        'method': 'post',
        'params': query
    })
}

/**
 * 生产单-终审驳回
 * @param {Object} query
 */
export function finalReject(query) {
    return request({
        'url': '/production/hq/finalAudit/reject',
        'method': 'put',
        'params': query
    })
}

/**
 * 生产单-终审驳回
 * @param {Object} query
 */
export function finalPass(query) {
    return request({
        'url': '/production/hq/finalAudit/pass',
        'method': 'put',
        'params': query
    })
}

/**
 * 生产定制单退回
 * @param {Object} query
 */
export function claimBack(query) {
    return request({
        'url': '/production/hq/audit/back',
        'method': 'post',
        'params': query
    })
}

/**
 * 生产单报价明细接口
 * @param {Object} query
 */
export function getHqPriceDetail(query) {
    return request({
        'url': '/productionOrderPrice/hq/price/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 根据订单查询生产单
 * @param {orderId: string} query
 */
export function getProductionList(query) {
    return request({
        'url': '/productionOrderPrice/hq/price/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 根据生产单id查询板件报价明细
 * @param {productionOrderId: string} query
 */
export function getProductionPriceDetail(query) {
    return request({
        'url': '/productionOrderPrice/hq/price/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 产品报价明细接口
 * @param {Object} query
 */
export function getHqProductPriceDetail(query) {
    return request({
        'url': '/productionOrderPrice/hq/price/product/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 订单行改价
 * @param {Object} query
 */
export function updateProductionPriceOnRow(query) {
    return request({
        'url': '/productionOrderPrice/hq/orderOffer/price/modify',
        'method': 'put',
        'params': query
    })
}

/**
 * 修改生产单报价折扣
 * @param {Object} query
 */
export function updateProductionPrice(query) {
    return request({
        'url': '/productionOrderPrice/hq/price/modify',
        'method': 'put',
        'params': query
    })
}

/**
 * 审核通过重新导入JSON
 * @param {Object} query
 */
export function pullJson(query) {
    return request({
        'url': '/production/hq/json/pull',
        'method': 'post',
        'params': query
    })
}

/**
 *
 * @param {Object} query
 */
export function submitPriceRequest(query) {
    return request({
        'url': '/order/hq/price/modify/confirm',
        'method': 'post',
        'params': query
    })
}

/**
 * 费用列表
 * @param {Object} query
 */
export function feeList(query) {
    return request({
        'url': '/orderFee/hq/list',
        'method': 'get',
        'params': query
    })
}

/*
 * 增加费用
 * @param {Object} query
 */
export function addFees(query) {
    return request({
        'url': '/orderFee/hq/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 费用承担方列表
 * @param {Object} query
 */
export function bearerList(query) {
    return request({
        'url': '/orderFee/hq/bearer/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 增加费用
 * @param {Object} query
 */
export function editFees(query) {
    return request({
        'url': '/orderFee/hq/edit',
        'method': 'put',
        'params': query
    })
}

/**
 * 移除费用
 * @param {Object} query
 */
export function removeFees(query) {
    return request({
        'url': '/orderFee/hq/remove',
        'method': 'put',
        'params': query
    })
}

/**
 * 订单费用扣款
 * @param {Object} query
 */
export function deductFees(query) {
    return request({
        'url': '/orderFee/hq/deduct',
        'method': 'put',
        'params': query
    })
}

/**
 *订单价格详情
 * @param {Object} query
 */
export function feeDetail(query) {
    return request({
        'url': '/orderFee/hq/detail',
        'method': 'get',
        'params': query
    })
}

/**
 * 传输ishare订单信息
 * @param {Object} query
 */
export function orderIshareInfo(query) {
    return request({
        'url': '/order/ishare/info',
        'method': 'get',
        'params': query
    })
}
/**
 * 成品单初审审核
 * @param {Object} query
 */
export function finishedAudit(query) {
    return request({
        'url': '/production/hq/finished/audit',
        'method': 'post',
        'params': query
    })
}

/**
 * 定制单审核进度是1002的订单可刷新审核进度
 * @param {Object} query
 */
export function refreshKjlStatus(query) {
    return request({
        'url': '/production/hq/audit/kjlStatus/refresh',
        'method': 'put',
        'params': query
    })
}

/**
 * 订单手动扣款
 * @param {Object} query
 */
export function updatePriceDeduct(query) {
    return request({
        'url': '/order/hq/price/deduct',
        'method': 'post',
        'params': query
    })
}

/**
 * 订单核价驳回
 * @param {Object} query
 */
export function rejectPrcing(query) {
    return request({
        'url': '/order/hq/price/modify/reject',
        'method': 'put',
        'params': query
    })
}
/**
 * 新增生产单补单原因说明
 * @param {Object} query
 */
export function addReasonDescribe(query) {
    return request({
        'url': '/production/resupply/hq/description/add',
        'method': 'post',
        'params': query
    })
}
/**
 * 编辑生产单补单原因说明
 * @param {Object} query
 */
export function editReasonDescribe(query) {
    return request({
        'url': '/production/resupply/hq/description/edit',
        'method': 'put',
        'params': query
    })
}

/**
 *
 * 获取补单原因说明列表
 * @param {Object} query
 */
export function suppleReason(query) {
    return request({
        'url': '/production/resupply/description/list',
        'method': 'get',
        'params': query
    })
}

/**
 *
 * 获取补单判责部门列表
 * @param {Object} query
 */
export function orderResponsibilityDeptTree(query) {
    return request({
        'url': '/orderBlame/dept/list/tree',
        'method': 'get',
        'params': query
    })
}

/**
 *
 * 获取补单判责原因列表
 * @param {Object} query
 */
export function orderResponsibilityTree(query) {
    return request({
        'url': '/orderBlame/list/tree',
        'method': 'get',
        'params': query
    })
}

/**
 *
 * 新增补单判责
 * @param {Object} query
 */
export function suppleOrderAddResponsibility(query) {
    return request({
        'url': '/orderBlame/add',
        'method': 'post',
        'params': query
    })
}

/**
 *
 * 补单判责详情
 * @param {Object} query
 */
export function orderBlameDetail(query) {
    return request({
        'url': '/orderBlame/detail',
        'method': 'get',
        'params': query
    })
}

/**
 *
 * 修改补单判责
 * @param {Object} query
 */
export function suppleOrderEditResponsibility(query) {
    return request({
        'url': '/orderBlame/edit',
        'method': 'post',
        'params': query
    })
}

/**
 * 新增成品生产单
 * @param {Object} query
 */
export function addCproductList(query) {
    return request({
        'url': '/production/hq/finished/add',
        'method': 'post',
        'params': query
    })
}

/**
 * 新增成品生产单
 * @param {Object} query
 */
export function editCproductList(query) {
    return request({
        'url': '/production/hq/finished/edit',
        'method': 'put',
        'params': query
    })
}

/**
 * 产品分类树
 * @param {Object} query
 */
export function serachProductsData(query) {
    return request({
        'url': '/productLib/hq/dict/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 成品生产单作废
 * @param {Object} query
 */
export function deleteFinishProduct(query) {
    return request({
        'url': '/production/hq/finished/delete',
        'method': 'delete',
        'params': query
    })
}

/**
 * 查询产品库列表
 * @param {Object} query
 */
export function getProductList(query) {
    return request({
        'url': '/productLib/hq/list',
        'method': 'get',
        'params': query
    })
}

/**
 *
 * 获取生产单下产品明细
 * @param {Object} query
 */
export function finishProductDetail(query) {
    return request({
        'url': '/production/distributor/orderOffer/list',
        'method': 'get',
        'params': query
    })
}
/**
 *
 * 定制生产单作废
 * @param {Object} query
 */
export function deleteAudit(query) {
    return request({
        'url': '/production/hq/audit/cancel',
        'method': 'delete',
        'params': query
    })
}
/**
 *
 * 更新订单收货信息
 * @param {Object} query
 */
export function deliverGoods(query) {
    return request({
        'url': '/order/ishare/update/receive/info',
        'method': 'post',
        'params': query
    })
}

/**
 * 查询cad文件列表
 * @param {Object} query
 */
export function cadFileList(query) {
    return request({
        'url': '/order/distributor/cad/file/list',
        'method': 'get',
        'params': query
    })
}

/**
 * cad翻图驳回
 * @param {Object} query
 */
export function rebackCadFile(query) {
    return request({
        'url': '/order/hq/reject/translateDrawing',
        'method': 'put',
        'params': query
    })
}

/**
 * 查看生产订单bom数据
 * @param {Object} query
 */
export function bomList(query) {
    return request({
        'url': '/production/bom/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 订单申请加急
 * @param {Object} query
 */
export function urgentApply(query) {
    return request({
        'url': '/order/distributor/urgent/apply',
        'method': 'post',
        'params': query
    })
}

/**
 * 经销商加急单信息查询
 * @param {Object} query
 */
export function urgentInfo(query) {
    return request({
        'url': '/order/hq/urgent/info',
        'method': 'get',
        'params': query
    })
}

/**
 * 加急单取消
 * @param {*} query
 */
export function urgentCancel(query) {
    return request({
        'url': '/order/distributor/urgent/cancel',
        'method': 'post',
        'params': query
    })
}

/**
 * 加急单通过
 * @param {*} query
 */
export function urgentPass(query) {
    return request({
        'url': '/order/hq/urgent/confirm',
        'method': 'post',
        'params': query
    })
}

/**
 * 更新计划交期
 * @param {*} query
 */
export function updateDelivery(query) {
    return request({
        'url': '/order/ishare/update/urgent/delivery',
        'method': 'post',
        'params': query
    })
}

/**
 * 模糊查询生产单列表
 * @param {Object} query
 */
export function fuzzyList(query) {
    return request({
        'url': '/production/fuzzy/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 订单改价信息显示
 * @param {*} query
 */
export function orderPriceDetail(query) {
    return request({
        'url': '/order/hq/price/modify/info',
        'method': 'get',
        'params': query
    })
}

/**
 * 订单关闭
 * @param {*} query
 */
export function orderColse(query) {
    return request({
        'url': '/order/hq/close',
        'method': 'put',
        'params': query
    })
}

/**
 * 订单日志
 * @param {*} query
 */
export function orderLogs(query) {
    return request({
        'url': '/order/log/list',
        'method': 'get',
        'params': query
    })
}

/**
 * 订单明细
 * @param {*} query
 */
export function orderOfferInvalid(query) {
    return request({
        'url': '/productionOrderPrice/hq/orderOffer/invalid',
        'method': 'put',
        'params': query
    })
}

/**
 * 初审详情
 * @param {*} query
 */
export function claimDetail(query) {
    return request({
        'url': '/kujiale/hq/production/iframe',
        'method': 'get',
        'params': query
    })
}

/**
 * 手动更新交付周期
 * @param {*} query
 */
export function updatedelivery(query) {
    return request({
        'url': '/production/hq/delivery/update',
        'method': 'put',
        'params': query
    })
}

/**
 * 手动更新交付周期
 * @param {*} query
 */
export function makeStandard(query) {
    return request({
        'url': '/order/hq/marker/standard',
        'method': 'put',
        'params': query
    })
}
