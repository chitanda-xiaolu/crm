import { orderResponsibilityDeptTree, orderResponsibilityTree } from '@/api/order'
export default {
    'state': {
        'supplyDeptTree': [],
        'supplyReasonList': []
    },
    'mutations': {
        'DEPT_TREE': (state, data) => {
            state.supplyDeptTree = data
        },
        'REASON_LIST': (state, data) => {
            state.supplyReasonList = data
        }
    },
    'actions': {
        getSupplyDeptTree({ commit }, query) {
            return new Promise((resolve, reject) => {
                orderResponsibilityDeptTree().then(result => {
                    const data = result.data
                    if (data.length) {
                        commit('DEPT_TREE', data)
                    } else {
                        commit('DEPT_TREE', [])
                    }
                })
            })
        },
        getSupplyReasonList({ commit }, query) {
            return new Promise((resolve, reject) => {
                orderResponsibilityTree().then(result => {
                    const data = result.data
                    if (data.length) {
                        commit('REASON_LIST', data)
                    } else {
                        commit('REASON_LIST', [])
                    }
                })
            })
        }
    }
}
