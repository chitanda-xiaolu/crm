/*
 * @Description: 产品分类配置
 * @Author: 陈桃
 * @Date: 2020-04-21 09:57:54
 * @LastEditTime: 2020-04-23 15:23:07
 * @LastEditors: Zale Ying
 */

import { productTree, kljclassList } from '@/api/pconfig'

export default {
    'state': {
        'productTreeData': [], // 订制品表格，树数据
        'kjlClassTableData': [], // 对照表数据
        'kjlClassTotal': 0 // 对照表条数
    },
    'mutations': {
        'TREE_DATA': (state, data) => {
            state.productTreeData = data
        },
        'KJL_CLASS_TABLE_DATA': (state, data) => {
            state.kjlClassTableData = data.records
            state.kjlClassTotal = data.total
        }
    },
    'actions': {
        getproductTreeData({ commit }, query) {
            return productTree(query).then(result => {
                const data = result.data
                if (data) {
                    commit('TREE_DATA', data)
                } else {
                    commit('TREE_DATA', [])
                }
            })
        },
        getKjlClassTableData({ commit }, query) {
            return kljclassList(query).then(result => {
                const data = result.data
                if(data.records && data.records.length) {
                    commit('KJL_CLASS_TABLE_DATA', data)
                } else {
                    commit('KJL_CLASS_TABLE_DATA', [])
                }
            })
        }
    }
}
