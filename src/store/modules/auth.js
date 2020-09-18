/*
 * @Description:
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-06-19 14:26:45
 * @LastEditors: Zale Ying
 */
import { roleAuthList } from '@/api/auth'

export default {
    'state': {
        'roleAuthList': []
    },
    'mutations': {
        'ROLE_AUTH_LIST': (state, data) => {
            state.roleAuthList = data
        }
    },
    'actions': {
        getAuthData({ commit }, query) {
            return new Promise((resolve, reject) => {
                roleAuthList(query).then(result => {
                    const data = result.data
                    if (data) {
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
