/*
 * @Description: form 查询条件筛选
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-04-22 17:17:44
 * @LastEditors: Zale Ying
 */
import queryConditionList from '../../../config/queryCondition'

// JSON.stringify将对象转换成字符串
// JSON.parse() 方法用于将一个 JSON 字符串转换为对象
let queryData = JSON.parse(JSON.stringify(queryConditionList))

export default {
    'state': {
        query: queryData
    },
    'mutations': {
        // 设置form参数
        'SET_QUERYS': (state, data) => {
            let dataForm = data.query
            state.query[data.key].dataForm.forEach((item) => {
                item.value = typeof (dataForm[item.code]) === 'string' ? dataForm[item.code].trim() : dataForm[item.code]
            })
        },
        // 设置单个form参数
        'SET_QUERYTOSINGLE': (state, data) => {
            state.query[data.key].dataForm.forEach((item) => {
                if (item.code === data.name) {
                    item[data.dataType] = data.value
                }
            })
        },
        // 设置表格分页
        'SET_PAGINATION_CURRENT': (state, data) => {
            state.query[data.key].pagination.current = data.current || 1
        },
        // 设置表格大小
        'SET_PAGINATION_SIZE': (state, data) => {
            state.query[data.key].pagination.size = data.size || 20
        },
        // 重制单个页面查询条件
        'SET_SINGLE_RESET': (state, data) => {
            if (!state.query[data.key]) return
            state.query[data.key].dataForm.forEach((item) => {
                item.value = item.default || ''
            })
            state.query[data.key].pagination = {
                current: 1,
                size: 20
            }
        },
        // 重制所有页面查询条件
        'SET_ALL_RESET': (state) => {
            state.query = JSON.parse(JSON.stringify(queryConditionList))
        }
    }
}
