const queryConditionList = {
    store: {
        dataForm: [
            {
                label: '门店名称',
                code: 'storeName',
                type: 'input',
                value: '',
                default: ''
            },
            {
                label: '经销商',
                code: 'distributorId',
                type: 'select',
                selectList: [],
                value: '',
                default: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    distributor: {
        dataForm: [
            {
                label: '编号',
                code: 'code',
                value: '',
                type: 'input'
            },
            {
                label: '所在区域',
                code: 'areaName',
                value: '',
                type: 'input'
            },
            {
                label: '手机',
                code: 'phone',
                value: '',
                type: 'input'
            },
            {
                label: '加盟日期',
                code: 'publicTime',
                value: '',
                type: 'date'
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    // 供应商
    supplier: {
        dataForm: [
            {
                label: '供应商名称',
                code: 'supplierName',
                value: '',
                type: 'input'
            },
            {
                label: '供应商编号',
                code: 'supplierCode',
                value: '',
                type: 'input'
            },
            {
                label: '状态',
                code: 'status',
                type: 'radio',
                radioType: [
                    {
                        name: '全部',
                        value: ''
                    },
                    {
                        name: '启用',
                        value: '0'
                    },
                    {
                        name: '禁用',
                        value: '1'
                    }
                ],
                value: '',
                default: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    business: {
        dataForm: [
            {
                label: '标题',
                code: 'title',
                value: '',
                type: 'input'
            },
            {
                label: '发布日期',
                code: 'publicTime',
                value: '',
                type: 'date'
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    activity: {
        dataForm: [
            {
                label: '活动名称',
                code: 'activityName',
                value: '',
                type: 'input'
            },
            {
                label: '活动状态',
                code: 'activityStatus',
                type: 'radio',
                radioType: [
                    {
                        name: '有效',
                        value: '0'
                    },
                    {
                        name: '无效',
                        value: '1'
                    },
                    {
                        name: '全部',
                        value: ''
                    }
                ],
                value: '0',
                default: '0'
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    system: {
        dataForm: [
            {
                label: '标题',
                code: 'title',
                value: '',
                type: 'input'
            },
            {
                label: '发布日期',
                code: 'publicTime',
                value: '',
                type: 'date'
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    user: {
        dataForm: [
            {
                label: '姓名',
                code: 'name',
                value: '',
                type: 'input'
            },
            {
                label: '手机',
                code: 'phone',
                value: '',
                type: 'input'
            },
            {
                label: '岗位',
                code: 'roleName',
                value: '',
                type: 'input'
            },
            {
                label: '状态',
                code: 'status',
                type: 'radio',
                radioType: [
                    {
                        name: '在职',
                        value: '0'
                    },
                    {
                        name: '离职',
                        value: '1'
                    },
                    {
                        name: '全部',
                        value: ''
                    }
                ],
                value: '0',
                default: '0'
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    help: {
        dataForm: [
            {
                label: '编号',
                code: 'number',
                value: '',
                type: 'input'
            },
            {
                label: '标题',
                code: 'title',
                type: 'input',
                value: ''
            },
            {
                label: '日期',
                code: 'releaseTime',
                type: 'date',
                value: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    loginlog: {
        dataForm: [
            {
                label: '用户名',
                code: 'logUserName',
                type: 'input',
                value: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    operationlog: {
        dataForm: [
            {
                label: '用户名',
                code: 'logUserName',
                type: 'input',
                value: ''
            },
            {
                label: '类型',
                code: 'logType',
                type: 'radio',
                value: '',
                radioType: [
                    {
                        name: '业务日志',
                        value: '0'
                    },
                    {
                        name: '异常日志',
                        value: '1'
                    },
                    {
                        name: '全部',
                        value: ''
                    }
                ]
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    menus: {
        dataForm: [
            {
                label: '名称',
                code: 'name',
                type: 'input',
                value: ''
            },
            {
                label: '编号',
                code: 'code',
                type: 'input',
                value: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    account: {
        dataForm: [
            {
                label: '经销商编号',
                code: 'distributorCode',
                type: 'input',
                value: ''
            },
            {
                label: '所在区域',
                code: 'areaName',
                type: 'input',
                value: ''
            },
            {
                label: '负责人',
                code: 'name',
                type: 'input',
                value: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    distributorDetail: {
        dataForm: [],
        pagination: {
            size: 20,
            current: 1
        }
    },
    accountDeptDatas: {
        dataForm: [],
        pagination: {
            size: 20,
            current: 1
        }
    },
    order: {
        dataForm: [
            {
                label: '片区',
                code: 'regionName',
                type: 'input',
                value: ''
            },
            {
                label: '城市',
                code: 'areaCode',
                type: 'areaselect',
                value: '',
                default: ''
            },
            {
                label: '订单编号',
                extralabel: '（精确查询）',
                code: 'orderCode',
                type: 'input',
                value: ''
            },
            {
                label: '小区',
                code: 'housingEstateName',
                type: 'input',
                value: ''
            },
            {
                label: '订单阶段',
                code: 'stage',
                type: 'radio',
                stage: true,
                radioType: [
                    { name: '全部', value: '' },
                    { name: '设计', value: '1100' },
                    { name: '初审', value: '1300' },
                    { name: '终审', value: '1500' },
                    { name: '核价', value: '1700' },
                    { name: '扣款', value: '1900' },
                    { name: '生产', value: '2100' },
                    // {name: '入库', value: '2300'},
                    { name: '发货', value: '2500' },
                    // {name: '出库', value: '2700'},
                    { name: '签收', value: '2900' },
                    { name: '关闭', value: '3100' }
                ],
                value: '',
                default: ''
            },
            {
                label: '状态',
                code: 'status',
                stage: true,
                type: 'radio',
                radioType: [
                    { name: '全部', value: '' },
                    { name: '待提交', value: 1001 },
                    { name: '待翻图', value: 1101 },
                    { name: '初审待认领', value: 2001 },
                    { name: '初审审核中', value: 2021 },
                    { name: '终审待认领', value: 3001 },
                    { name: '终审审核中', value: 3021 },
                    { name: '核价待扣款', value: 4001 },
                    { name: '待扣款', value: 4901 },
                    { name: '已扣款', value: 4999 },
                    { name: '待生产', value: 5201 },
                    { name: '生产中', value: 5301 },
                    { name: '计划发货', value: 7001 },
                    { name: '待签收', value: 9001 },
                    { name: '已签收', value: 9888 },
                    { name: '异常关闭', value: 9999 }
                ],
                value: '',
                default: ''
            },
            {
                label: '下单方式',
                code: 'orderWay',
                type: 'radio',
                radioType: [
                    {
                        name: '全部',
                        value: ''
                    },
                    {
                        name: '酷家乐',
                        value: '10'
                    },
                    {
                        name: 'CAD',
                        value: '20'
                    }
                ],
                value: '',
                default: ''
            },
            {
                label: '订单类型',
                code: 'orderType',
                type: 'radio',
                radioType: [
                    {
                        name: '全部',
                        value: ''
                    },
                    {
                        name: '正单',
                        value: '10'
                    },
                    {
                        name: '补单',
                        value: '20'
                    }
                ],
                value: '',
                default: ''
            },
            {
                label: '订单分类',
                code: 'orderCategory',
                type: 'radio',
                orderType: true,
                radioType: [
                    {
                        name: '全部',
                        value: ''
                    },
                    {
                        name: '客户订单',
                        value: '10'
                    },
                    {
                        name: '样品订单',
                        value: '20'
                    }
                    // {
                    //     name: '工程单',
                    //     value: '30'
                    // }
                ],
                value: '',
                default: ''
            },
            {
                label: '初审结果',
                code: 'firstAuditStatus',
                type: 'radio',
                orderType: true,
                radioType: [
                    { name: '全部', value: '' },
                    { name: '待审核', value: 2001 },
                    { name: '通过', value: 2999 },
                    { name: '驳回', value: 2998 }
                ],
                value: '',
                default: ''
            },
            {
                label: '终审结果',
                code: 'finalAuditStatus',
                type: 'radio',
                orderType: true,
                radioType: [
                    { name: '全部', value: '' },
                    { name: '待审核', value: 3001 },
                    { name: '通过', value: 3999 },
                    { name: '驳回', value: 3998 }
                ],
                value: '',
                default: ''
            },
            {
                label: '扣款结果',
                code: 'deductStatus',
                type: 'radio',
                orderType: true,
                radioType: [
                    { name: '全部', value: '' },
                    { name: '待扣款', value: 4901 },
                    { name: '已扣款', value: 4999 },
                    { name: '扣款失败', value: 4998 }
                ],
                value: '',
                default: ''
            },
            {
                label: '是否加急',
                code: 'urgent',
                type: 'radio',
                radioType: [
                    { name: '全部', value: '' },
                    { name: '是', value: 1 },
                    { name: '否', value: 0 }
                ],
                value: '',
                default: '' // 0：否，1：是
            },
            {
                label: '改价结果',
                code: 'modifyPriceStatus',
                type: 'radio',
                modifyPrice: true,
                radioType: [
                    { name: '全部', value: '' },
                    { name: '待改价', value: 4001 },
                    { name: '通过', value: 4498 },
                    { name: '驳回', value: 4499 }
                ],
                value: '',
                default: ''
            },
            {
                label: '期望交付(发货)日期',
                code: 'time',
                value: '',
                type: 'date',
                flag: false,
                date: true,
                orderType: true,
                width: '140'
            },
            {
                label: '计划交付(发货)日期',
                code: 'estimateTime',
                value: '',
                type: 'date',
                flag: false,
                date: true,
                orderType: true,
                width: '140'
            },
            {
                label: '创建日期',
                code: 'createTime',
                value: '',
                type: 'date',
                orderType: true,
                flag: false,
                date: true,
                width: '140'
            },
            {
                label: '扣款日期',
                code: 'deductTime',
                value: '',
                type: 'date',
                orderType: true,
                flag: false,
                date: true,
                width: '180'
            },
            {
                label: '客户姓名',
                code: 'customerName',
                type: 'input',
                value: ''
            },
            {
                label: '客户手机',
                code: 'customerMobile',
                type: 'input',
                value: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    },
    product: {
        dataForm: [
            {
                label: '名称(平台)',
                code: 'name',
                type: 'input',
                value: ''
            },
            {
                label: '名称(KJL)',
                code: 'kjlName',
                type: 'input',
                value: ''
            },
            {
                label: '型号',
                code: 'model',
                type: 'input',
                value: ''
            },
            {
                label: '物料编码',
                code: 'code',
                type: 'input',
                value: ''
            },
            {
                label: '状态',
                code: 'status',
                type: 'radio',
                radioType: [
                    { name: '全部', value: '' },
                    { name: '上架', value: '0' },
                    { name: '下架', value: '1' }
                ],
                value: '',
                default: ''
            },
            {
                label: '直接下单',
                code: 'isOrder',
                type: 'radio',
                radioType: [
                    { name: '全部', value: '' },
                    { name: '是', value: '1' },
                    { name: '否', value: '0' }
                ],
                value: '',
                default: ''
            },
            {
                label: '产品分类',
                code: 'speType',
                type: 'cascader',
                cascaderList: [],
                value: '',
                default: ''
            }
        ],
        pagination: {
            size: 20,
            current: 1
        }
    }
}
export default queryConditionList
