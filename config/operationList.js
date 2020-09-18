/*
 * @Description: 表格操作按钮配置
 * @Author: Zale Ying
 * @Date: 2019-11-26 16:18:37
 * @LastEditTime: 2020-06-19 14:27:04
 * @LastEditors: Zale Ying
 */
import permissions from './permissions'
import { hasPermission } from '@/utils/utils'

const buttonList = {
    store: {
        key: 'store',
        btns: [
            {
                id: 1, // 唯一标识
                title: '编辑', // 按钮标题
                icon: 'el-icon-edit', // 操作icon
                type: 'edit', // 操作类型
                isShow: function() {
                    return hasPermission(permissions.store.update.code) // 权限码
                }
            }
        ]
    },
    business: {
        key: 'bussiness-notice',
        btns: [
            {
                id: 1, // 唯一标识
                title: '编辑', // 按钮标题
                icon: 'el-icon-edit', // 操作icon
                type: 'edit', // 操作类型
                isShow: function() {
                    return hasPermission(permissions.businessNotice.update.code) // 权限码
                }
            }
        ]
    },
    system: {
        key: 'system-notice',
        btns: [
            {
                id: 1, // 唯一标识
                title: '编辑', // 按钮标题
                icon: 'el-icon-edit', // 操作icon
                type: 'edit', // 操作类型
                isShow: function() {
                    return hasPermission(permissions.systemNotice.update.code) // 权限码
                }
            }
        ]
    },
    activity: {
        key: 'activity',
        btns: [
            {
                id: 1, // 唯一标识
                title: '编辑', // 按钮标题
                icon: 'el-icon-edit', // 操作icon
                type: 'edit', // 操作类型
                isShow: function() {
                    return hasPermission(permissions.marketActivity.update.code) // 权限码
                }
            }
        ]
    },
    staff: {
        key: 'staff',
        btns: [
            {
                id: 1, // 唯一标识
                title: '编辑', // 按钮标题
                icon: 'el-icon-edit', // 操作icon
                type: 'edit', // 操作类型
                isShow: function() {
                    return hasPermission(permissions.user.update.code) // 权限码
                }
            },
            {
                id: 2,
                title: '重置密码',
                icon: 'el-icon-refresh-left',
                type: 'reset',
                isShow: function() {
                    return hasPermission(permissions.user.reset.code) // 权限码
                }
            },
            {
                id: 3,
                title: '绑定酷家乐',
                icon: 'el-icon-connection',
                type: 'bind',
                isShow: function() {
                    return hasPermission(permissions.user.bindKjl.code) // 权限码
                }
            }
        ]
    },
    help: {
        key: 'help',
        btns: [
            {
                id: 1,
                title: '编辑',
                icon: 'el-icon-edit',
                type: 'edit',
                isShow: function() {
                    return hasPermission(permissions.help.update.code)
                }
            }
        ]
    },
    menu: {
        key: 'menu',
        btns: [
            {
                id: 1,
                title: '编辑',
                icon: 'el-icon-edit',
                type: 'edit',
                isShow: function() {
                    return hasPermission(permissions.menu.update.code)
                }
            }
        ]
    },
    account: {
        key: 'account',
        btns: [
            {
                id: 1,
                title: '现金充值',
                icon: 'el-icon-medal-1',
                type: 'cash',
                isShow: function() {
                    return hasPermission(permissions.account.recharge_add.code)
                }
            },
            {
                id: 2,
                title: '返利充值',
                type: 'fanli',
                icon: 'el-icon-medal',
                isShow: function() {
                    return hasPermission(permissions.account.recharge_add.code)
                }
            }
        ]
    },
    distributorDetail: {
        key: 'dept-distributor',
        btns: [
            {
                id: 1,
                title: '重置密码',
                icon: 'el-icon-refresh-left',
                type: 'reset',
                isShow: function() {
                    return hasPermission(permissions.user.reset.code) // 权限码
                }
            },
            {
                id: 2,
                title: '绑定酷家乐',
                icon: 'el-icon-connection',
                type: 'bind',
                isShow: function() {
                    return hasPermission(permissions.user.bindKjl.code) // 权限码
                }
            }
        ]
    },
    deptAccount: {
        key: 'dept-account',
        btns: [
            {
                id: 1,
                title: '重置密码',
                icon: 'el-icon-refresh-left',
                type: 'reset',
                isShow: function() {
                    return hasPermission(permissions.user.reset.code) // 权限码
                }
            }
        ]
    },
    order: {
        key: 'order',
        btns: [
            {
                id: 1, // 唯一标识
                title: '编辑', // 按钮标题
                icon: 'el-icon-edit', // 操作icon
                type: 'editCad', // 操作类型
                isShow: function(row) {
                    return row.status === 1001 && row.orderWay === 20
                }
            },
            {
                id: 2, // 唯一标识
                title: '初审认领', // 按钮标题
                icon: 'el-icon-circle-check', // 操作icon
                type: 'claim', // 操作类型
                isShow: function(row) {
                    return hasPermission(permissions.order.hq_claim.code) && row.status === 2001
                }
            },
            {
                id: 3, // 唯一标识
                title: '终审认领', // 按钮标题
                icon: 'el-icon-circle-check', // 操作icon
                type: 'finishClaim', // 操作类型
                isShow: function(row) {
                    return hasPermission(permissions.order.hq_claim_final.code) && row.status === 3001
                }
            },
            {
                id: 4, // 唯一标识
                title: '改价确认', // 按钮标题
                icon: 'el-icon-success', // 操作icon
                type: 'changePrice', // 操作类型
                isShow: function(row) {
                    return hasPermission(permissions.price.modify_confirm.code) && row.status === 4001
                }
            },
            {
                id: 5, // 唯一标识
                title: '翻图驳回', // 按钮标题
                icon: 'el-icon-refresh-left', // 操作icon
                type: 'rebackCad', // 操作类型
                isShow: function(row) {
                    return hasPermission(permissions.order.cad_reject.code) && row.status === 1101
                }
            }
        ]
    },
    product: {
        key: 'product',
        btns: [
            {
                id: 1,
                title: '编辑',
                type: 'edit',
                icon: 'el-icon-edit', // 操作icon
                isShow: function(row) {
                    return hasPermission(permissions.product.edit.code)
                }
            }
        ]
    }
}
export default buttonList
