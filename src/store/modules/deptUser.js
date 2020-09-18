import { getUserlist, getRoleTree, getDeptTree, getDeptTreeDisplay, getManager, getDeptFilterTree, getNopageUserlist } from '@/api/deptUser'

export default {
    'state': {
        'userList': [],
        'nopageList': [],
        'total': 0,
        'roleTree': null,
        'deptTree': [],
        'editTree': [],
        'numberDisplay': 0,
        'deptTreeDisplay': [],
        'editTreeDisplay': [],
        'number': 0,
        'userNameDisplay': '',
        'userName': '',
        'managerList': [],
        'selectDeptId': '',
        'isCheckedDom': null
    },
    'mutations': {
        'USER_LIST': (state, data) => {
            if (data.records) {
                state.userList = data.records
                state.total = data.total
            } else {
                state.userList = []
                state.total = 0
            }
        },
        'NOPAGE_USER_LIST': (state, data) => {
            if (data) {
                state.nopageList = data
            }
        },
        'ROLE_TREE': (state, data) => {
            state.roleTree = data
        },
        'DEPT_TREE': (state, data) => {
            state.number = data[0].countUser
            state.userName = data[0].userName
            state.deptTree = data
        },
        'DEPT_TREE_DISPLAY': (state, data) => {
            state.numberDisplay = data[0].countUser
            state.userNameDisplay = data[0].userName
            state.deptTreeDisplay = data
        },
        'DEPT_TREE_TREE': (state, data) => {
            state.number = data[0].countUser
            state.userName = data[0].userName
            state.deptTree = data
        },
        'MANAGER_LIST': (state, data) => {
            state.managerList = data
        },
        'EDIT_TREE': (state, data) => {
            state.editTree = data
        },
        'SET_DEPTID': (state, data) => {
            state.selectDeptId = data
        },
        'SET_DOM': (state, data) => {
            state.isCheckedDom = data
        }
    },
    /**
     *  员工列表
     */
    'actions': {
        getData({ commit }, query) {
            return new Promise((resolve, reject) => {
                getUserlist(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('USER_LIST', data)
                    } else {
                        commit('USER_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getNopageData({ commit }, query) {
            return new Promise((resolve, reject) => {
                getNopageUserlist(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('NOPAGE_USER_LIST', data)
                    } else {
                        commit('NOPAGE_USER_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 员工岗位角色
         */
        getRole({ commit }, query) {
            return new Promise((resolve, reject) => {
                getRoleTree(query).then(result => {
                    const data = result.data
                    commit('ROLE_TREE', data)
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取部门树
         * @param {Object} query
         */
        getDept({ commit }, query) {
            return new Promise((resolve, reject) => {
                getDeptTree(query).then(result => {
                    if(result.data.length) {
                        commit('DEPT_TREE', [result.data[0]])
                    }else {
                        commit('DEPT_TREE', [[]])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 新增员工获取部门数据
         * @param {Object} query
         */
        getDeptDisplay({ commit }, query) {
            return new Promise((resolve, reject) => {
                getDeptTreeDisplay(query).then(result => {
                    if(result.data.length) {
                        commit('DEPT_TREE_DISPLAY', [result.data[0]])
                    }else {
                        commit('DEPT_TREE_DISPLAY', [[]])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取部门树
         * @param {Object} query
         */
        getDeptFilterTree({ commit }, query) {
            return new Promise((resolve, reject) => {
                getDeptFilterTree(query).then(result => {
                    commit('EDIT_TREE', [result.data[0]])
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 部门主管
         * @param {any} param
         */
        getManager({ commit }, query) {
            return new Promise((resolve, reject) => {
                getManager(query).then(result => {
                    resolve(result)
                    commit('MANAGER_LIST', result.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateUserSelectList ({ commit, state }, arrUserId) {
            let temp = []
            temp.push(...state.userList)
            arrUserId.forEach(curr => {
                temp = temp.map(currItem => {
                    if (currItem.userId === curr) {
                        return {
                            ...currItem,
                            own: true
                        }
                    } else {
                        return currItem
                    }
                })
            })
            commit('USER_LIST', {
                records: temp
            })
        }
    }
}
