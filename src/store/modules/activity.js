
import { activeList } from '@/api/activity'
export default {
    'state': {
        'activityList': [],
        total: 0
    },
    'mutations': {
        'ACTIVITY_LIST': (state, data) => {
            state.activityList = data.records
            state.total = data.total
        }
    },
    'actions': {
        getactiveList({ commit }, query) {
            return new Promise((resolve, reject) => {
                activeList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('ACTIVITY_LIST', data)
                    } else {
                        commit('ACTIVITY_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
