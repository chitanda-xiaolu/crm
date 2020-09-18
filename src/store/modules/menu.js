
import { getMenuList } from '@/api/menu'
export default {
    'state': {
        'menuList': []
    },
    'mutations': {
        'MENU_LIST': (state, data) => {
            state.menuList = data
        }
    },
    'actions': {
        menuManageList({ commit }, query) {
            return new Promise((resolve, reject) => {
                getMenuList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('MENU_LIST', data)
                    } else {
                        commit('MENU_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
