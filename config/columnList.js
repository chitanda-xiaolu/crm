import permissions from './permissions'
const columnList = {
    store: {
        columns: [
            {
                label: '名称',
                code: 'storeName',
                link: {
                    path: '/store/detail',
                    param: function (row) {
                        return `${row.id}`
                    }
                },
                width: 200
            },
            {
                label: '门店类型',
                code: 'storeTypeName',
                width: 100
            },
            {
                label: '所属经销商',
                code: 'distributorName',
                link: {
                    path: '/distributor/detail',
                    param: function (row) {
                        return `${row.distributorId}`
                    }
                },
                width: 200
            },
            {
                label: '面积(m²)',
                code: 'area',
                width: 100
            },
            {
                label: '门店状态',
                code: 'storeStatusName',
                width: 100
            },
            {
                label: '建店日期',
                code: 'establishedTime',
                date: true,
                width: 130
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    distributor: {
        columns: [
            {
                label: '经销商编号',
                code: 'code',
                link: {
                    path: '/distributor/detail',
                    param: function (row) {
                        return `${row.id}`
                    }
                },
                width: 100
            },
            {
                label: '所在区域',
                code: 'areaName',
                width: 200
            },
            {
                label: '所属战区',
                code: 'regionName',
                width: 150
            },
            {
                label: '负责人',
                code: 'name',
                width: 100
            },
            {
                label: '负责人手机',
                code: 'phone',
                width: 100
            },
            {
                label: '加盟日期',
                code: 'joinTime',
                date: true,
                width: 100
            },
            {
                label: '状态',
                code: 'status',
                threeUnary: [1, '禁用', '启用']
            }
        ]
    },
    // 供应商表头
    supplier: {
        columns: [
            {
                label: '供应商商编号',
                code: 'supplierCode',
                link: {
                    path: '/supplier/detail', // 供应商详情链接
                    param: function (row) {
                        return `${row.supplierId}`
                    }
                },
                width: 200
            },
            {
                label: '供应商名称',
                code: 'supplierName',
                width: 200
            },
            {
                label: '供应商区域',
                code: 'supplierRegion',
                width: 200
            },
            {
                label: '供应商联系方式',
                code: 'supplierPhone',
                width: 200
            },
            {
                label: '供应商付款方式',
                code: 'supplierPay',
                width: 200
            },
            {
                label: '供应商评级',
                code: 'supplierRate',
                width: 200
            },
            // {
            //     label: '供应商状态',
            //     code: 'status',
            //     width: 200
            // },
            {
                label: '状态',
                code: 'status',
                width: 200,
                threeUnary: [1, '禁用', '启用']
            }
        ]
    },
    business: {
        columns: [
            {
                label: '范围',
                code: 'type',
                threeUnary: [1, '总部', '经销商'],
                width: 100
            },
            {
                label: '标题',
                code: 'title',
                width: 200
            },
            {
                label: '发布日期',
                code: 'publicTime',
                date: true,
                width: 110
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    activity: {
        columns: [
            {
                label: '活动名称',
                code: 'activityName',
                link: {
                    path: '/activity/detail',
                    param: function (row) {
                        return `${row.id}`
                    }
                },
                width: 200
            },
            {
                label: '范围',
                code: 'activityScopeName',
                width: 100
            },
            {
                label: '引流日期',
                doubleDate: true,
                startDate: 'drainageStartTime',
                endDate: 'drainageEndTime',
                width: 170
            },
            {
                label: '下单日期',
                doubleDate: true,
                startDate: 'ordersStartTime',
                endDate: 'ordersEndTime',
                width: 170
            },
            {
                label: '活动状态',
                code: 'activityStatusName',
                width: 80
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    system: {
        columns: [
            {
                label: '分类',
                code: 'type',
                threeUnary: [1, '总部', '经销商']
            },
            {
                label: '标题',
                code: 'title'
            },
            {
                label: '状态',
                code: 'status',
                status: true,
                threeUnary: [1, '无效', '有效']
            },
            {
                label: '发布日期',
                code: 'publicTime',
                date: true
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    user: {
        columns: [
            {
                label: '部门',
                code: 'deptName',
                width: 120
            },
            {
                label: '姓名',
                code: 'name',
                width: 100
            },
            {
                label: '手机',
                code: 'phone',
                width: 100
            },
            {
                label: '员工状态',
                code: 'statusName',
                width: 80
            },
            {
                label: '允许登录',
                code: 'allowLoginName',
                width: 70
            },
            {
                label: '岗位',
                code: 'roleName'
            },
            {
                label: 'KJL账号',
                code: 'kjlAccount'
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    help: {
        columns: [
            {
                label: '分类',
                code: 'typeName'
            },
            {
                label: '编号',
                code: 'number'
            },
            {
                label: '标题',
                code: 'title'
            },
            {
                label: '更新日期',
                code: 'updateTime',
                date: true
            },
            {
                label: '状态',
                code: 'statusName'
            },
            {
                label: '操作',
                operation: {
                    edit: { permission: permissions.help.update.code }
                }
            }
        ]
    },
    loginlog: {
        columns: [
            {
                label: '用户名',
                code: 'userName'
            },
            {
                label: '登录IP',
                code: 'ipAddress'
            },
            {
                label: '登录状态',
                code: 'succeed'
            },
            {
                label: '用户ID',
                code: 'userId'
            },
            {
                code: 'loginLogId',
                label: '登录ID'
            },
            {
                code: 'createTime',
                label: '登录时间'
            }
        ]
    },
    operationlog: {
        columns: [
            {
                label: '业务ID',
                code: 'operationLogId',
                link: {
                    path: '/operationLog/detail',
                    param: function (row) {
                        return `${row.operationLogId}`
                    }
                }
            },
            {
                code: 'userName',
                label: '用户名称',
                width: 100
            },
            {
                code: 'logType',
                label: '日志类型',
                width: 100
            },
            {
                label: '业务名称',
                code: 'logName'
            },
            {
                code: 'method',
                label: '方法名',
                width: 100
            },
            {
                code: 'succeed',
                label: '业务状态',
                width: 100
            },
            {
                code: 'message',
                label: '业务信息'
            },
            {
                code: 'createTime',
                label: '修改时间'
            }
        ]
    },
    menus: {
        columns: [
            {
                label: '名称',
                code: 'label'
            },
            {
                label: '所属平台',
                code: 'platformName'
            },
            {
                label: '编号',
                code: 'code'
            },
            {
                label: 'ID',
                code: 'value'
            },
            {
                label: '父级编号',
                code: 'parentId'
            },
            {
                label: '请求地址',
                code: 'url'
            },
            {
                label: '排序',
                code: 'sort'
            },
            {
                label: '层级',
                code: 'levels'
            },
            {
                label: '菜单/按钮',
                code: 'menuFlag',
                threeUnary: [true, '菜单', '按钮']
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    account: {
        columns: [
            {
                label: '经销商编号',
                code: 'distributorCode',
                link: {
                    path: '/account/detail',
                    param: function (row) {
                        return `${row.id}/${row.distributorId}`
                    }
                },
                width: 100
            },
            {
                label: '所在区域',
                code: 'distributorArea',
                width: 200
            },
            {
                label: '负责人',
                code: 'name',
                width: 100
            },
            {
                label: '账户余额（元）',
                code: 'accountTotal',
                money: true,
                align: 'right',
                width: 130
            },
            {
                label: '现金余额（元）',
                code: 'cashTotal',
                money: true,
                align: 'right',
                width: 130
            },
            {
                label: '返利余额（元）',
                code: 'rebateTotal',
                money: true,
                align: 'right',
                width: 130
            },
            {
                label: '待确认对账函',
                code: 'unconfirmedStatement',
                width: 100
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    // 经销商详情(部门管理)
    distributorDetail: {
        columns: [
            {
                label: '部门',
                code: 'deptName',
                width: 110
            },
            {
                label: '姓名',
                code: 'name',
                width: 100
            },
            {
                label: '手机',
                code: 'mobile',
                width: 100
            },
            {
                label: '岗位',
                code: 'roleName',
                width: 150
            },
            {
                label: 'KJL账号',
                code: 'kjlAccount',
                width: 120
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    accountDeptDatas: {
        columns: [
            {
                label: '部门',
                code: 'deptName',
                width: 110
            },
            {
                label: '姓名',
                code: 'name',
                width: 100
            },
            {
                label: '手机',
                code: 'mobile',
                width: 100
            },
            {
                label: '岗位',
                code: 'roleName',
                width: 150
            },
            {
                label: 'KJL账号',
                code: 'kjlAccount',
                width: 120
            },
            {
                label: '操作',
                operation: true
            }
        ]
    },
    order: {
        key: 'order',
        columns: [
            {
                label: '订单编号',
                code: 'orderCode',
                fixed: true,
                link: {
                    path: '/order/detail',
                    param: function (row) {
                        return `${row.orderId}`
                    }
                },
                width: 140
            },
            {
                label: '所属门店',
                code: 'storeName',
                width: 110
            },
            {
                label: '客户',
                code: 'customerName',
                width: 80
            },
            {
                label: '手机',
                code: 'customerMobile',
                width: 95
            },
            {
                label: '小区',
                code: 'housingEstateName'
            },
            {
                label: '期望交付(发货)日期',
                date: true,
                code: 'expectedDeliveryTime',
                width: 125
            },
            {
                label: '计划交付(发货)日期',
                date: true,
                code: 'estimatedDeliveryTime',
                width: 125
            },
            {
                label: '创建日期',
                code: 'createTime',
                width: '100',
                date: true
            },
            {
                label: '设计师',
                code: 'designerName',
                width: 80
            },
            {
                label: '订单类型',
                code: 'orderTypeName',
                width: 80
            },
            {
                label: '订单分类',
                code: 'orderCategoryName',
                width: 80
            },
            {
                label: '初审人',
                code: 'firstAuditUser',
                width: 90
            },
            {
                label: '终审人',
                code: 'finalAuditUserName',
                width: 90
            },
            {
                label: '初审负责人',
                code: 'claimUserNames',
                width: 100
            },
            {
                label: '终审负责人',
                code: 'finalClaimUserNames',
                width: 100
            },
            {
                label: '阶段',
                code: 'stageName',
                width: 60
            },
            {
                label: '状态',
                code: 'statusName',
                width: 80
            },
            {
                label: '经销商负责人',
                code: 'distributorName',
                width: 100
            },
            {
                label: '加急',
                code: 'urgent',
                threeUnary: [true, '是', '否'],
                width: 50
            },
            {
                label: '初审结果',
                code: 'firstAuditStatusName',
                width: 80
            },
            {
                label: '终审结果',
                code: 'finalAuditStatusName',
                width: 80
            },
            {
                label: '改价结果',
                code: 'modifyPriceStatusName'
            },
            {
                label: '片区',
                code: 'regionName'
            },
            {
                label: '城市',
                code: 'areaCodeName'
            },
            {
                label: '操作',
                operation: true,
                fixed: 'right',
                width: 120
            }
        ]
    },
    product: {
        key: 'product',
        columns: [
            {
                label: '图片',
                code: 'picPath',
                image: true,
                width: 80
            },
            {
                label: '产品名称(平台)',
                code: 'name'
            },
            {
                label: '产品名称(KJL)',
                code: 'kjlName'
            },
            {
                label: '产品分类',
                code: 'typeName'
            },
            {
                label: '型号',
                code: 'model'
            },
            {
                label: '物料编码',
                type: 'date',
                code: 'code',
                width: '130'
            },
            {
                label: '规格',
                width: 100,
                code: 'standards'
            },
            {
                label: '状态',
                code: 'status',
                width: 80,
                threeUnary: [1, '下架', '上架']
            },
            {
                label: '直接下单',
                code: 'isOrder',
                width: 80,
                threeUnary: [1, '是', '否']
            },
            {
                label: '零售价（元）',
                code: 'retailPrice',
                width: 100,
                money: true
            },
            {
                label: '结算价（元）',
                code: 'nominalSettlementPrice',
                width: 100,
                money: true
            },
            {
                label: '供货价（元）',
                code: 'supplyPrice',
                width: 100,
                money: true
            },
            {
                label: '操作',
                operation: {
                    edit: { permission: permissions.product.edit.code }
                }
            }
        ]
    }
}
export default columnList
