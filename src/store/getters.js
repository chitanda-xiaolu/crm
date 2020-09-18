/*
 * @Description: vuex 持久化数据
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-03-09 09:58:34
 * @LastEditors: Zale Ying
 */
const getters = {
    name: state => state.user.name,
    userId: state => state.user.userId,
    token: state => state.user.token,
    permissionList: state => state.user.permissionList,
    orderDetailData: state => state.order.orderDetailData,
    tagsList: state => state.nav.tagsList,
    websocketUrl: state => state.user.websocketUrl
}
export default getters
