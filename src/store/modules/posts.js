
import { postsList, getRoleBypostsId } from '@/api/posts'
import { getPostsAuthList } from '@/api/auth'
export default {
    'state': {
        'postsList': [],
        'postsAuthList': [],
        'postsRoleList': []
    },
    'mutations': {
        'AUTH_LIST': (state, data) => {
            state.postsList = data
        },
        'POSTS_AUTH_LIST': (state, data) => {
            state.postsAuthList = data
        },
        'POSTS_ROLE_LIST': (state, data) => {
            state.postsRoleList = data
        }
    },
    'actions': {
        getpostsList({ commit }, query) {
            return postsList(query).then(result => {
                const data = result.data
                if (data) {
                    commit('AUTH_LIST', data)
                } else {
                    commit('AUTH_LIST', [])
                }
            })
        },
        getPostsAuthList({ commit }, query) {
            return getPostsAuthList(query).then(result => {
                const data = result.data
                if (data.length) {
                    commit('POSTS_AUTH_LIST', data)
                } else {
                    commit('POSTS_AUTH_LIST', [])
                }
            })
        },
        getPostsRoleList({ commit }, query) { // ��ɫ�б�
            return new Promise((resolve, reject) => {
                getRoleBypostsId(query).then(result => {
                    const data = result.data
                    if (data.length) {
                        commit('POSTS_ROLE_LIST', data)
                    } else {
                        commit('POSTS_ROLE_LIST', [])
                    }
                    resolve(result)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
