/*
 * @Description: vue-scroll 基础配置
 * @Author: Zale Ying
 * @Date: 2020-02-27 15:53:25
 * @LastEditTime: 2020-04-17 14:21:10
 * @LastEditors: Zale Ying
 */
const scrollops = {
    scrollPanel: {
        scrollingX: false
    },
    bar: {
        hoverStyle: true,
        onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
        background: '#ccc',   // 颜色
        scrollingX: false,
        initialScrollX: false,
        size: '5px'
    },
    rail: {
    }
}
export default scrollops
