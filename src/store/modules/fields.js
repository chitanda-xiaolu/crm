import { fieldsTree, Detail } from '../../api/fields'

export default {
    'state': {
        'fieldsTree': [],
        'regionId': '',
        'regionDetail': {},
        'dialogStatus': false,
        'showUserDialog': false
    },
    'mutations': {
        'FIELDS_TREE': (state, data) => {
            state.fieldsTree = data
        },
        'REGION_ID': (state, data) => {
            state.regionId = data.id
            state.regionDetail = data
        },
        'SET_DIALOGSTATUS': (state, status) => {
            state.dialogStatus = status
        },
        'SET_USERDIALOG': (state, status) => {
            state.showUserDialog = status
        }
    },
    'actions': {
        getTree({commit}, query) {
            return new Promise((resolve, reject) => {
                fieldsTree(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('FIELDS_TREE', data)
                    } else {
                        commit('FIELDS_TREE', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getDetail({commit}, query) {
            return new Promise((resolve, reject) => {
                Detail(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('REGION_ID', data)
                    } else {
                        commit('REGION_ID', '')
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
