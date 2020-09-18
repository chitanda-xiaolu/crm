const permissions = {
    user: {
        create: {
            code: 'user_add',
            name: '新增员工'
        },
        query: {
            code: 'user_list',
            name: '查询员工'
        },
        update: {
            code: 'user_edit',
            name: '修改员工'
        },
        reset: {
            code: 'user_resetPassword',
            name: '重置员工密码'
        },
        bindKjl: {
            code: 'kujiale_user_bind',
            name: '总部员工绑定酷家乐账号'
        }
    },
    dept: {
        create: {
            code: 'dept_add',
            name: '新增部门'
        },
        update: {
            code: 'dept_update',
            name: '修改部门'
        },
        query: {
            code: 'dept_tree',
            name: '部门树'
        }
    },
    region: {
        create: {
            code: 'region_add',
            name: '新增区域'
        },
        update: {
            code: 'region_edit',
            name: '修改区域'
        },
        detail: {
            code: 'region_detail',
            name: '区域详情'
        }
    },
    estate: {
        create: {
            code: 'housingEstate_hq_add',
            name: '新增小区'
        },
        update: {
            code: 'housingEstate_hq_edit',
            name: '修改小区'
        }
    },
    distributor: {
        create: {
            code: 'distributor_addItem',
            name: '新增经销商'
        },
        update: {
            code: 'distributor_editItem',
            name: '修改经销商'
        },
        account: {
            code: 'distributor_hq_account',
            name: '经销商资金管理'
        }
    },
    role: {
        create: {
            code: 'role_add',
            name: '新增岗位'
        },
        update: {
            code: 'role_edit',
            name: '修改岗位'
        }
    },
    authority: {
        create: {
            code: 'authority_add',
            name: '新增角色'
        },
        update: {
            code: 'authority_edit',
            name: '修改角色'
        },
        set: {
            code: 'authority_setAuthority',
            name: '配置角色'
        }
    },
    systemNotice: {
        create: {
            code: 'systemNotice_addItem',
            name: '新增系统公告'
        },
        update: {
            code: 'systemNotice_editItem',
            name: '编辑系统公告'
        }
    },
    businessNotice: {
        create: {
            code: 'businessNotice_addItem',
            name: '新增系统公告'
        },
        update: {
            code: 'businessNotice_editItem',
            name: '编辑系统公告'
        }
    },
    marketActivity: {
        create: {
            code: 'marketActivity_hq_add',
            name: '新增市场活动'
        },
        update: {
            code: 'marketActivity_hq_edit',
            name: '编辑市场活动'
        }
    },
    help: {
        create: {
            code: 'help_platform_add',
            name: '新增帮助'
        },
        update: {
            code: 'help_platform_edit',
            name: '编辑帮助'
        }
    },
    store: {
        create: {
            code: 'store_hq_add',
            name: '新增门店'
        },
        update: {
            code: 'store_hq_edit',
            name: '编辑门店'
        }
    },
    account: {
        recharge_add: {
            code: 'recharge_hq_add',
            name: '充值'
        },
        deduct_add: {
            code: 'deduct_hq_add',
            name: '扣款'
        }
    },
    menu: {
        create: {
            code: 'menuAdd',
            name: '新增菜单'
        },
        update: {
            code: 'menuEdit',
            name: '修改菜单'
        }
    },
    price: {
        supply: {
            code: 'hide_supply_price',
            name: '出厂价'
        },
        retail: {
            code: 'hide_retail_price',
            name: '零售价'
        },
        nominal_settlement: {
            code: 'hide_nominal_settlement_price',
            name: '理论结算价'
        },
        final_settlement: {
            code: 'hide_final_settlement_price',
            name: '实际结算价'
        },
        modify_confirm: {
            code: 'hq_price_modify_confirm',
            name: '改价确认'
        },
        production_modify: {
            code: 'productionOrderPrice_hq_price_modify',
            name: '生产单改价'
        },
        detail_modify: {
            code: 'productionOrderPrice_hq_orderOffer_price_modify',
            name: '行改价'
        },
        order_price_invalid: {
            code: 'productionOrderPrice_hq_orderOffer_invalid',
            name: '报价明细行作废'
        },
        price_deduct: {
            code: 'hq_price_deduct',
            name: '手动扣款'
        },
        modify_reject: {
            code: 'hq_price_modify_reject',
            name: '核价驳回'
        }
    },
    order: {
        hq_allot: {
            code: 'order_hq_allot',
            name: '初审分配'
        },
        hq_allot_final: {
            code: 'order_hq_allot_final',
            name: '终审分配'
        },
        hq_claim: {
            code: 'order_hq_claim',
            name: '初审认领'
        },
        hq_claim_final: {
            code: 'order_hq_claim_final',
            name: '终审认领'
        },
        final_audit_pass: {
            code: 'hq_finalAudit_pass',
            name: '终审通过'
        },
        final_audit_reject: {
            code: 'hq_finalAudit_reject',
            name: '终审驳回'
        },
        production_audit: {
            code: 'hq_production_audit',
            name: '酷家乐初审审核跳转'
        },
        audit_back: {
            code: 'hq_audit_back',
            name: '初审退回'
        },
        json_pull: {
            code: 'hq_json_pull',
            name: '更新生产数据'
        },
        audit_kjlStatus_refresh: {
            code: 'hq_audit_kjlStatus_refresh',
            name: '刷新酷家乐审核进度'
        },
        audit_cancel: {
            code: 'hq_audit_cancel',
            name: '定制单作废'
        },
        finished_audit: {
            code: 'hq_finished_audit',
            name: '成品生产单通过或驳回'
        },
        cad_reject: {
            code: 'hq_reject_translateDrawing',
            name: '翻图驳回'
        },
        urgent_apply: {
            code: 'order_hq_urgent_apply',
            name: '订单加急申请'
        },
        urgent_cancel: {
            code: 'order_hq_urgent_cancel',
            name: '加急驳回'
        },
        urgent_confirm: {
            code: 'order_hq_urgent_confirm',
            name: '加急确认'
        },
        order_close: {
            code: 'order_close',
            name: '订单关闭'
        }
    },
    product: {
        add: {
            code: 'product_add',
            name: '新增产品'
        },
        edit: {
            code: 'product_edit',
            name: '修改产品'
        },
        edit_status: {
            code: 'product_edit_status',
            name: '产品上下架'
        },
        finished_edit: {
            code: 'hq_finished_edit',
            name: '修改成品生产单'
        },
        finished_detele: {
            code: 'hq_finished_detele',
            name: '作废成品单'
        },
        finished_add: {
            code: 'hq_finished_add',
            name: '新增成品生产单'
        }
    },
    fconfig: {
        delivery: {
            code: 'order_delivery_hq_list',
            name: '交付周期'
        },
        dayOff: {
            code: 'dayOff_hq_list',
            name: '工作日历'
        }
    }
}

export default permissions
