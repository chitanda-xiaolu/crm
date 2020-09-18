
import { getDistributor, dealerAccount } from '@/api/dealer'
export default {
    'state': {
        'userList': [],
        'total': 0,
        'supplierDialogStatus': false, // 控制弹窗状态的布尔值，true显示弹窗，false隐藏弹窗
        'accountInfo': {}
    },
    'mutations': {
        'DISTRIBUTOR_LIST': (state, data) => {
            state.userList = data.records
            state.total = data.total
        },
        // 新增供应商和编辑供应商弹窗控制
        'SET_SUPPLIER_DIALOGSTATUS': (state, status) => {
            state.supplierDialogStatus = status
            console.log('触发supplier弹窗')
        },
        'SET_ACCOUNT_INFO': (state, data) => {
            state.accountInfo = data
        }
    },
    /**
     *  经销商列表
     */
    'actions': {
        getDistributorList({ commit }, query) {
            return new Promise((resolve, reject) => {
                getDistributor(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('DISTRIBUTOR_LIST', data)
                    } else {
                        commit('DISTRIBUTOR_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateDistorSelectList ({ commit, state }, arrUserId) {
            let temp = []
            temp.push(...state.userList)
            arrUserId.forEach(curr => {
                temp = temp.map(currItem => {
                    if (currItem.id === curr) {
                        return {
                            ...currItem,
                            own: true
                        }
                    } else {
                        return currItem
                    }
                })
            })
            commit('DISTRIBUTOR_LIST', {
                records: temp
            })
        },
        // 账户详情
        accountData({ commit }, query) {
            return new Promise((resolve, reject) => {
                dealerAccount(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('SET_ACCOUNT_INFO', data)
                    } else {
                        commit('SET_ACCOUNT_INFO', {})
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
