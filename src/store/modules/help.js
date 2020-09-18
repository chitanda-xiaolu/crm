
import { helpList } from '@/api/useHelp'
export default {
    'state': {
        'helpList': []
    },
    'mutations': {
        'HELP_LIST': (state, data) => {
            state.helpList = data
        }
    },
    'actions': {
        gethelpList({ commit }, query) {
            return new Promise((resolve, reject) => {
                helpList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('HELP_LIST', data)
                    } else {
                        commit('HELP_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
