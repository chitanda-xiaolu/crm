import { roleList } from '@/api/roles'
import { roleAuthList } from '@/api/auth'
export default {
    'state': {
        'roleList': [],
        'roleAuthList': []
    },
    'mutations': {
        'AUTH_LIST': (state, data) => {
            state.roleList = data
        },
        'ROLE_AUTH_LIST': (state, data) => {
            state.roleAuthList = data
        }
    },
    'actions': {
        getRoleList({ commit }, query) {
            return new Promise((resolve, reject) => {
                roleList(query).then(result => {
                    const data = result.data
                    if (data.length) {
                        commit('AUTH_LIST', data)
                    } else {
                        commit('AUTH_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getRoleAuthList({ commit }, query) {
            return new Promise((resolve, reject) => {
                roleAuthList(query).then(result => {
                    const data = result.data
                    if (data.length) {
                        commit('ROLE_AUTH_LIST', data)
                    } else {
                        commit('ROLE_AUTH_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
