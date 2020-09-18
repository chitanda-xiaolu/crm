/*
 * @Description: 产品分类配置
 * @Author: 陈桃
 * @Date: 2020-04-21 09:57:54
 * @LastEditTime: 2020-07-20 15:24:44
 * @LastEditors: Zale Ying
 */

import { workCalendarList } from '@/api/fconfig'

export default {
    'state': {
        'holidayData': [] // 表格数据
    },
    'mutations': {
        'HOLIDAY_TABLE_DATA': (state, data) => {
            state.holidayData = data
        }
    },
    'actions': {
        getHolidayData({ commit }, query) {
            return workCalendarList(query).then(result => {
                const data = result.data
                if (data) {
                    commit('HOLIDAY_TABLE_DATA', data)
                } else {
                    commit('HOLIDAY_TABLE_DATA', [])
                }
            })
        }
    }
}
