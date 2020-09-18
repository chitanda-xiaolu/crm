
import { noticeList } from '@/api/notice'
export default {
    'state': {
        'noticeList': []
    },
    'mutations': {
        'NOTICE_LIST': (state, data) => {
            state.noticeList = data
        }
    },
    'actions': {
        getNoticeList({ commit }, query) {
            return new Promise((resolve, reject) => {
                noticeList(query).then(result => {
                    const data = result.data
                    if (data) {
                        commit('NOTICE_LIST', data)
                    } else {
                        commit('NOTICE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
