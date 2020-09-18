/*
 * @Description:
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-06-19 14:26:29
 * @LastEditors: Zale Ying
 */
import { getLocationFromName } from '@/api/map'
export default {
    'state': {
        'position': {},
        'map': null,
        'label': null,
        'positionStatus': true,
        'allArea': ''
    },
    'mutations': {
        'SET_POSITION': (state, data) => {
            if (data.length) {
                state.position = data[0]
            }
        },
        'SET_MAP': (state, data) => {
            state.map = data
        },
        'SET_LABEL': (state, data) => {
            state.label = data
        },
        // 设置选择位置是否存在
        'SET_POSITION_STATUS': (state, bool) => {
            state.positionStatus = bool
        },
        // 村查询省市区
        'SET_ALL_AREA': (state, data) => {
            state.allArea = data
        }
    },
    'actions': {
        /**
         * 通过名称获取定位
         * @param {Object} query
         */
        getPositionForName({ commit }, query) {
            return new Promise((resolve, reject) => {
                getLocationFromName(query).then(result => {
                    let allArea = ''
                    if(result && result.results[0]) {
                        allArea = result.results[0].province + '-' + result.results[0].city + '-' + result.results[0].area
                    }
                    commit('SET_POSITION', [result.results[0]])
                    commit('SET_ALL_AREA', allArea)
                    commit('SET_POSITION_STATUS', Boolean(result.results.length))
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
