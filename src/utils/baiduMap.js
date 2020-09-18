/*
 * @Description: 调用百度地图api
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-03-03 16:49:52
 * @LastEditors: Zale Ying
 */
import SYSTEMVALUE from './config'
/*
 * 配置百度api
*/
export function BaiduMap() {
    return new Promise(function(resolve, reject) {
        /* eslint-disable */
        if (typeof BMap !== 'undefined') {
            resolve(BMap)
            return true
        }
        window.onBMapCallback = function() {
            resolve(BMap)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=2.0&ak=${SYSTEMVALUE.BAIDU_MAP_KEY}&callback=onBMapCallback`
        script.onerror = reject
        document.head.appendChild(script)
        /* eslint-disable */
    })
}

/*
 * 设置label样式
*/
export function setLabel(name) {
    let label = new BMap.Label(name, {offset: new BMap.Size(-30, -40)})
    label.setStyle({
        color : "green",
        fontSize : "12px",
        paddingLeft : "15px",
        paddingRight: "15px",
        paddingTop: "8px",
        paddingBottom: "8px",
        lineHeight : "20px",
        borderColor: "",
        fontFamily:"微软雅黑"
    })
    return label
}
