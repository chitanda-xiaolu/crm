/*
 * @Description: 路由管理
 * @Author: Zale Ying
 * @Date: 2020-01-10 17:21:03
 * @LastEditTime: 2020-07-04 16:38:50
 * @LastEditors: Zale Ying
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
/* eslint-disable */

export default new Router({
    mode: 'history',
    'routes': [
        {
            'path': '/',
            'redirect': '/home'
        },
        {
            'path': '/',
            'component': resolve => require(['@/components/common/Layout.vue'], resolve),
            'meta': { 'title': '自述文件' },
            'children': [
                {
                    'path': '/home',
                    'component': resolve => require(['@/views/home/index.vue'], resolve),
                    'meta': { 'title': '系统首页' }
                },
                // 部门/员工管理
                {
                    'path': '/user',
                    'name': 'user',
                    'component': resolve => require(['@/views/staff/index.vue'], resolve),
                    'meta': { 'title': '部门员工' }
                },
                {
                    'path': '/user/detail/:id',
                    'name': '4',
                    'component': resolve => require(['@/views/staff/user-detail.vue'], resolve),
                    'meta': { 'title': '员工详情' }
                },
                // 公共岗位
                {
                    'path': '/role',
                    'component': resolve => require(['@/views/posts/index.vue'], resolve),
                    'meta': { 'title': '公共岗位' }
                },
                // 公共角色
                {
                    'path': '/authority',
                    'component': resolve => require(['@/views/roles/index.vue'], resolve),
                    'meta': { 'title': '公共角色' }
                },
                // 小区管理
                {
                    'path': '/housingEstate',
                    'name': 'estate',
                    'component': resolve => require(['@/views/estate/index.vue'], resolve),
                    'meta': { 'title': '小区管理' }
                },
                {
                    'path': '/housingEstate/add',
                    'component': resolve => require(['@/views/estate/estate-add.vue'], resolve),
                    'meta': { 'title': '新增小区' }
                },
                {
                    'path': '/housingEstate/edit/:id',
                    'component': resolve => require(['@/views/estate/estate-edit.vue'], resolve),
                    'meta': { 'title': '编辑小区', 'editIndex': 'estate' }
                },
                // 区域配置
                {
                    'path': '/region',
                    'component': resolve => require(['@/views/fields/index.vue'], resolve),
                    'meta': { 'title': '区域配置' }
                },
                // 系统公告
                {
                    'path': '/system/notice',
                    'name': 'system',
                    'component': resolve => require(['@/views/notice/index-system.vue'], resolve),
                    'meta': { 'title': '系统公告' }
                },
                {
                    'path': '/system/notice_add',
                    'component': resolve => require(['@/views/notice/system-notice-add-or-update-system.vue'], resolve),
                    'meta': { 'title': '新增系统公告' }
                },
                {
                    'path': '/system/notice_edit/:id',
                    'component': resolve => require(['@/views/notice/system-notice-add-or-update-system.vue'], resolve),
                    'meta': { 'title': '编辑系统公告', 'editIndex': 'estate' }
                },
                // 业务公告
                {
                    'path': '/business/notice',
                    'name': 'business',
                    'component': resolve => require(['@/views/notice/index-business.vue'], resolve),
                    'meta': { 'title': '业务公告' }
                },
                {
                    'path': '/business/notice_add',
                    'component': resolve => require(['@/views/notice/business-notice-add-or-update-system.vue'], resolve),
                    'meta': { 'title': '新增业务公告', 'editIndex': 'estate' }
                },
                {
                    'path': '/business/notice_edit/:id',
                    'component': resolve => require(['@/views/notice/business-notice-add-or-update-system.vue'], resolve),
                    'meta': { 'title': '编辑业务公告', 'editIndex': 'estate' }
                },
                // 经销商管理
                {
                    'path': '/distributor',
                    'name': 'distributor',
                    'component': resolve => require(['@/views/dealer/index.vue'], resolve),
                    'meta': { 'title': '经销商管理' }
                },
                {
                    'path': '/distributor/detail/:id',
                    'name': 'distributorDetail',
                    'component': resolve => require(['@/views/dealer/dealerDetail.vue'], resolve),
                    'meta': { 'title': '经销商详情' }
                },
                //供应商管理
                {
                    'path': '/supplier/list',
                    'name': 'supplier',
                    'component': resolve => require(['@/views/supplier/index.vue'], resolve),
                    'meta': { 'title': '供应商管理' }
                },
                {
                    'path': '/supplier/detail/:supplierId',
                    'name': 'supplierDetail',
                    'component': resolve => require(['@/views/supplier/supplier-detail1.vue'], resolve),
                    'meta': { 'title': '供应商详情' }
                },
                ,
                {
                    'path': '/supplier/statistics',
                    'name': 'supplierStatistics',
                    'component': resolve => require(['@/views/supplier/ReportLayout.vue'], resolve),
                    'meta': { 'title': '供应商报表' }
                },
                // 使用帮助
                {
                    'path': '/help',
                    'name': 'help',
                    'component': resolve => require(['@/views/help/index.vue'], resolve),
                    'meta': { 'title': '使用帮助' }
                },
                {
                    'path': '/help/platform/add',
                    'component': resolve => require(['@/views/help/help-add-or-update.vue'], resolve),
                    'meta': { 'title': '新增帮助' }
                },
                {
                    'path': '/help/platform/edit/:id',
                    'component': resolve => require(['@/views/help/help-add-or-update.vue'], resolve),
                    'meta': { 'title': '编辑帮助', 'editIndex': 'estate' }
                },
                // 市场活动
                {
                    'path': '/marketActivity',
                    'name': 'activity',
                    'component': resolve => require(['@/views/activity/index.vue'], resolve),
                    'meta': { 'title': '市场活动' }
                },
                {
                    'path': '/marketActivity/add',
                    'component': resolve => require(['@/views/activity/activity-add.vue'], resolve),
                    'meta': { 'title': '新增活动' }
                },
                {
                    'path': '/marketActivity/edit/:id',
                    'component': resolve => require(['@/views/activity/activity-add.vue'], resolve),
                    'meta': { 'title': '编辑活动', 'editIndex': 'activity' }
                },
                {
                    'path': '/activity/detail/:id',
                    'component': resolve => require(['@/views/activity/activity-detail.vue'], resolve),
                    'meta': { 'title': '活动详情' }
                },
                // 登录日志
                {
                    'path': '/loginLog',
                    'name': 'loginlog',
                    'component': resolve => require(['@/views/logs/loginLogs.vue'], resolve),
                    'meta': { 'title': '登录日志' }
                },
                // 业务日志
                {
                    'path': '/operationLog',
                    'name': 'operationlog',
                    'component': resolve => require(['@/views/logs/operationLogs.vue'], resolve),
                    'meta': { 'title': '业务日志' }
                },
                // 业务日志详情
                {
                    'path': '/operationLog/detail/:id',
                    'component': resolve => require(['@/views/logs/operationDetail.vue'], resolve),
                    'meta': { 'title': '业务详情' }
                },
                // 门店
                {
                    'path': '/store',
                    'name': 'store',
                    'component': resolve => require(['@/views/store/index.vue'], resolve),
                    'meta': { 'title': '门店' }
                },
                {
                    'path': '/store/add',
                    'component': resolve => require(['@/views/store/store-add.vue'], resolve),
                    'meta': { 'title': '新增门店' }
                },
                {
                    'path': '/store/edit',
                    'component': resolve => require(['@/views/store/store-edit.vue'], resolve),
                    'meta': { 'title': '编辑门店', 'editIndex': 'store' }
                },
                {
                    'path': '/store/detail/:id',
                    'component': resolve => require(['@/views/store/store-detail.vue'], resolve),
                    'meta': { 'title': '门店详情' }
                },
                // 资金账户
                {
                    'path': '/account',
                    'name': 'account',
                    'component': resolve => require(['@/views/account/index.vue'], resolve),
                    'meta': { 'title': '资金账户' }
                },
                {
                    'path': '/account/detail/:id/:disId',
                    'name': 'accountDeptDatas',
                    'component': resolve => require(['@/views/account/account-detail.vue'], resolve),
                    'meta': { 'title': '资金账户详情' }
                },
                {
                    'path': '/month/reconciliation',
                    'name': '12',
                    'component': resolve => require(['@/views/account/month-detail.vue'], resolve),
                    'meta': { 'title': '对账单详情详情' }
                },
                // 菜单管理
                {
                    'path': '/menu',
                    'name': 'menus',
                    'component': resolve => require(['@/views/menu/index.vue'], resolve),
                    'meta': { 'title': '菜单管理' }
                },
                // 换绑
                {
                    'path': '/replace',
                    'component': resolve => require(['@/views/replace/index.vue'], resolve)
                },
                // 订单
                {
                    'path': '/order',
                    'name': 'order',
                    'component': resolve => require(['@/views/order/index.vue'], resolve),
                    'meta': { 'title': '订单管理' }
                },
                {
                    'path': '/order/editCad/:orderId/:type?',
                    'name': 'editCad',
                    'component': resolve => require(['@/views/order/order-cad.vue'], resolve),
                    'meta': { 'title': '编辑CAD' }
                },
                {
                    'path': '/order/detail/:orderId',
                    'name': '14',
                    'component': resolve => require(['@/views/order/order-detail.vue'], resolve),
                    'meta': { 'title': '订单详情' }
                },
                {
                    'path': '/order/addfinish/:orderId/:orderCode/:orderType',
                    'component': resolve => require(['@/views/order/finishProduct/add-finish-product.vue'], resolve),
                    'meta': { 'title': '新增成品生产单' },
                    'name': 'addFinish'
                },
                {
                    'path': '/order/editfinish/:orderId/:orderCode/:productionOrderId/:orderType',
                    'component': resolve => require(['@/views/order/finishProduct/edit-finish-product.vue'], resolve),
                    'meta': { 'title': '编辑成品生产单' },
                    'name': 'editFinish'
                },
                {
                    'path': '/order/price/product/:orderId',
                    'component': resolve => require(['@/views/order/price/order-price-product.vue'], resolve),
                    'meta': { 'title': '产品报价单' },
                    'name': 'productOffer'
                },
                {
                    'path': '/order/price/plate/:orderId',
                    'name': 'plateOffer',
                    'component': resolve => require(['@/views/order/price/order-price-plate.vue'], resolve),
                    'meta': { 'title': '板件报价单' }
                },
                {
                    'path': '/order/price/alter/:orderId',
                    'name': 'priceAlter',
                    'component': resolve => require(['@/views/order/price/order-alter-price.vue'], resolve),
                    'meta': { 'title': '订单改价' }
                },
                // 产品管理
                {
                    'path': '/productLib',
                    'name': 'product',
                    'component': resolve => require(['@/views/product/index.vue'], resolve),
                    'meta': { 'title': '产品管理' }
                },
                {
                    'path': '/product/add',
                    'component': resolve => require(['@/views/product/product-add.vue'], resolve),
                    'meta': { 'title': '新增产品' }
                },
                {
                    'path': '/product/edit',
                    'component': resolve => require(['@/views/product/product-edit.vue'], resolve),
                    'meta': { 'title': '编辑产品' }
                },
                // 产品参数配置   
                {
                    'path': '/hq/product/config',
                    'name': 'pconfig',
                    'component': resolve => require(['@/views/pconfig/index.vue'], resolve),
                    'meta': { 'title': '产品参数配置' }
                },
                // 工厂参数配置
                {
                    'path': '/hq/factory/config',
                    'name': 'fconfig',
                    'component': resolve => require(['@/views/fconfig/index.vue'], resolve),
                    'meta': { 'title': '工厂参数配置' }
                },
            ]
        },
        { 'path': '/login', 'component': resolve => require(['@/views/passport/login.vue'], resolve) },
        { 'path': '/404', 'component': resolve => require(['@/views/404'], resolve) },
        { 'path': '/attach', hidden: true, 'component': resolve => require(['@/views/attach'], resolve) },
        { 'path': '*', 'redirect': '/404' },
        // { 'path': '/test', 'component': resolve => require(['@/views/tests/index.vue'], resolve)}
    ]
})
