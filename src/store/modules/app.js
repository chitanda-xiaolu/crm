/*
 * @Description: Store appData
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-03-14 16:16:47
 * @LastEditors: Zale Ying
 */
export default {
    'state': {
        'pagination': {
            size: 20,
            current: 1
        },
        'codeList': '',
        'areaName': '',
        'errorTimes': 0    // 记录接口请求错误次数
    },
    'mutations': {
        'SET_PAGINATION': (state, data) => {
            state.pagination = data
        },
        'SET_CODE_LIST': (state, data) => {
            state.codeList = data || ''
        },
        'SET_AREA_NAME': (state, data) => {
            state.areaName = data
        },
        'SET_ERROR_TIMES': (state) => {
            state.errorTimes++
        }
    }
}
