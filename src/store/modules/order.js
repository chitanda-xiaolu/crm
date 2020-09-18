
import { orderList, feeList, orderDetail, productionList, productionKjlList, urgentInfo, getHqProductPriceDetail } from '@/api/order'

export default {
    'state': {
        'orderList': [],
        'total': 0,
        'feeList': [],
        'orderDetailData': {},
        'finishList': [],
        'programList': [],
        'programKjlList': [],
        'finishKjlList': [],
        'urgentInfo': '',
        'orderPriceData': {}
    },
    'mutations': {
        'SET_ORDERLIST': (state, data) => {
            if (data) {
                state.orderList = data.records
                state.total = data.total
            } else {
                state.orderList.length = 0
                state.total = 0
            }
        },
        'SET_PROGRAMLIST': (state, data) => {
            state.programList = data
        },
        'SET_PROGRAM_KJL_LIST': (state, data) => {
            state.programKjlList = data
        },
        'SET_FEELIST': (state, data) => {
            if (data) {
                state.feeList = data
            } else {
                state.feeList.length = 0
            }
        },
        'SET_FINISHLIST': (state, data) => {
            if (data) {
                state.finishList = data
            } else {
                state.finishList.length = 0
            }
        },
        'SET_FINISH_KJL_LIST': (state, data) => {
            state.finishKjlList = data
        },
        'SET_DETAIL_DATA': (state, data) => {
            state.orderDetailData = data
        },
        'SET_URGENTINFO': (state, data) => {
            state.urgentInfo = data
        },
        'SET_ORDERPRICE': (state, data) => {
            state.orderPriceData = data
        }
    },
    'actions': {
        getOrderList({ commit }, query) {
            return new Promise((resolve, reject) => {
                orderList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('SET_ORDERLIST', data)
                    } else {
                        commit('SET_ORDERLIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getFeeList({ commit }, query) {
            return new Promise((resolve, reject) => {
                feeList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('SET_FEELIST', data)
                    } else {
                        commit('SET_FEELIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取订单详情
        getOrderDetailData({ commit }, query) {
            return new Promise((resolve, reject) => {
                orderDetail(query).then(result => {
                    const data = result.data
                    let _res = []
                    let res = result.data.orderProcessMap
                    for (const key in res) {
                        if (res.hasOwnProperty(key)) {
                            _res.push({
                                stage: res[key][0].stage,
                                stageName: res[key][0].stageName,
                                startTime: res[key][0].operateTime.split(' ')[0],
                                operatePlatformName: res[key][0].operatePlatformName,
                                statusData: res[key].map(curr => {
                                    return {
                                        id: curr.id,
                                        operateTime: curr.operateTime.split(' ')[0],
                                        status: curr.status,
                                        statusName: curr.statusName
                                    }
                                })
                            })
                        }
                    }
                    data.steps = _res
                    if (data) {
                        commit('SET_DETAIL_DATA', data)
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取定制生产单列表
        getProgramList({ commit }, query) {
            let param = {
                size: 1000,
                current: 1,
                productType: 10000,
                orderId: query ? query.orderId : this.state.order.orderDetailData.orderId
            }
            return new Promise((resolve, reject) => {
                productionList({ ...param }).then(result => {
                    const data = result.data.records
                    if (data) {
                        commit('SET_PROGRAMLIST', data)
                    } else {
                        commit('SET_PROGRAMLIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取成品生产单列表
        getFinishList({ commit }, query) {
            let param = {
                size: 1000,
                current: 1,
                productType: 10001,
                orderId: query ? query.orderId : this.state.order.orderDetailData.orderId
            }
            return new Promise((resolve, reject) => {
                productionList({ ...param }).then(result => {
                    const data = result.data.records
                    if (data) {
                        commit('SET_FINISHLIST', data)
                    } else {
                        commit('SET_FINISHLIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取酷家乐定制生产单列表（订单设计阶段）
        getProgramKjlList({ commit }, query) {
            let param = {
                size: 1000,
                current: 1,
                productType: 10000,
                orderId: query ? query.orderId : this.state.order.orderDetailData.orderId
            }
            return new Promise((resolve, reject) => {
                productionKjlList({ ...param }).then(result => {
                    const data = result.data.records
                    if (data) {
                        commit('SET_PROGRAM_KJL_LIST', data)
                    } else {
                        commit('SET_PROGRAM_KJL_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取酷家乐成品生产单列表（订单设计阶段）
        getFinishKjlList({ commit }, query) {
            let param = {
                size: 1000,
                current: 1,
                productType: 10001,
                orderId: query ? query.orderId : this.state.order.orderDetailData.orderId
            }
            return new Promise((resolve, reject) => {
                productionKjlList({ ...param }).then(result => {
                    const data = result.data.records
                    if (data) {
                        commit('SET_FINISH_KJL_LIST', data)
                    } else {
                        commit('SET_FINISH_KJL_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取经销商加急单信息
        getUrgentOrderInfo({ commit }) {
            let param = {
                orderId: this.state.order.orderDetailData.orderId
            }
            return new Promise((resolve, reject) => {
                urgentInfo({ ...param }).then(result => {
                    let data = result.data
                    if (data) {
                        commit('SET_URGENTINFO', data)
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 订单报价信息
        getOrderPrice({ commit }) {
            return new Promise((resolve, reject) => {
                getHqProductPriceDetail({orderId: this.state.order.orderDetailData.orderId}).then(result => {
                    let data = result.data
                    if (data) {
                        commit('SET_ORDERPRICE', data)
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
