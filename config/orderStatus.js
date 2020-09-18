const ORDER_STATUS_LIST = {
    INIT: [{
        code: 1000,
        status: '订单初始'
    }],
    DESIGN: [
        {
            code: 1001,
            status: '设计图待提交'
        }, {
            code: 1101,
            status: '待翻图'
        }
    ],
    FIRST_TRIAL: [
        {
            code: 2001,
            status: '初审待认领'
        }, {
            code: 2021,
            status: '初审审核中'
        }, {
            code: 2999,
            status: '初审通过'
        }, {
            code: 2998,
            status: '初审不通过'
        }
    ],
    FINAL_TRIAL: [
        {
            code: 3001,
            status: '终审待认领'
        }, {
            code: 3021,
            status: '终审审核中'
        }, {
            code: 3999,
            status: '终审通过'
        }, {
            code: 3998,
            status: '终审不通过'
        }
    ],
    PRICING: [
        {
            code: 4001,
            status: '待核价'
        }, {
            code: 4021,
            status: '待核价确认'
        },
        {
            code: 4901,
            status: '待扣款'
        }, {
            code: 4999,
            status: '已扣款'
        }
    ],
    PRODUCTION: [
        {
            code: 5201,
            status: '待生产'
        }, {
            code: 5301,
            status: '生产中'
        }
    ],
    WAREHOUSE: [
        {
            code: 6001,
            status: '待入库'
        }
    ],
    SEND: [
        {
            code: 7001,
            status: '待确认发货计划'
        }, {
            code: 8001,
            status: '待发货'
        }
    ],
    RECEIVE: [
        {
            code: 9001,
            status: '待签收'
        }, {
            code: 9888,
            status: '已签收'
        }, {
            code: 9999,
            status: '异常关闭'
        }
    ]
}

export default ORDER_STATUS_LIST
