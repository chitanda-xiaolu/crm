
import { paymentAccountList, rechargeList, deductList, accountDetail, accountList } from '@/api/account'

export default {
    'state': {
        'paymentAccountList': [],
        'paymentTotal': 0,
        'cashRechargeList': [],
        'xj_rechageTotal': 0,
        'flRebateList': [],
        'xj_rebateTotal': 0,
        'flRechargeList': [],
        'flRechageTotal': 0,
        'cashRebateList': [],
        'fl_rebateTotal': 0,
        'ID': '',
        'AccountList': [],
        'accountInfo': {},
        'accountPageList': [],
        'accountPageTotal': 0
    },
    'mutations': {
        'PAYMENT_LIST': (state, data) => {
            state.paymentAccountList = data
        },
        'CASH_RECHARGE_LIST': (state, data) => {
            state.cashRechargeList = data
        },
        'CASH_REBATE_LIST': (state, data) => {
            state.cashRebateList = data
        },
        'FANLI_RECHARGE_LIST': (state, data) => {
            state.flRechargeList = data
        },
        'FANLI_REBATE_LIST': (state, data) => {
            state.flRebateList = data
        },
        'SET_DISTRIBUTORID': (state, id) => {
            state.ID = id
        },
        'SET_PAYMENTACCOUNT_LIST': (state, data) => {
            state.AccountList = data
        },
        'SET_ACCOUNT_INFO': (state, data) => {
            state.accountInfo = data
        },
        'SET_ACCOUNT_PAGE_LIST': (state, data) => {
            state.accountPageTotal = data.total
            state.accountPageList = data.records
        }
    },
    'actions': {
        accountPageData({ commit }, query) {
            return new Promise((resolve, reject) => {
                accountList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('SET_ACCOUNT_PAGE_LIST', data)
                    } else {
                        commit('SET_ACCOUNT_PAGE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        paymentAccountData({ commit }, query) {
            return new Promise((resolve, reject) => {
                paymentAccountList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('PAYMENT_LIST', data)
                    } else {
                        commit('PAYMENT_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 充值（现金充值）
        cashRechargeData({ commit }, query) {
            return new Promise((resolve, reject) => {
                rechargeList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('CASH_RECHARGE_LIST', data)
                    } else {
                        commit('CASH_RECHARGE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 扣款（现金扣款）
        cashRdeductionData({ commit }, query) {
            return new Promise((resolve, reject) => {
                deductList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('CASH_REBATE_LIST', data)
                    } else {
                        commit('CASH_REBATE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 充值（返利充值）
        flRechargeData({ commit }, query) {
            return new Promise((resolve, reject) => {
                rechargeList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('FANLI_RECHARGE_LIST', data)
                    } else {
                        commit('FANLI_RECHARGE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 扣款（返利扣款）
        flRdeductionData({ commit }, query) {
            return new Promise((resolve, reject) => {
                deductList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('FANLI_REBATE_LIST', data)
                    } else {
                        commit('FANLI_REBATE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 账户详情
        accountDetailData({ commit }, query) {
            return new Promise((resolve, reject) => {
                accountDetail(query).then(result => {
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
