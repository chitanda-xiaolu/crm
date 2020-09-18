<!--
 * @Description: map组件
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-03-03 17:27:31
 * @LastEditors: Zale Ying
 -->
<template>
    <div :id="mapId" class="bmap-container" v-loading="loading"></div>
</template>

<script>
import { BaiduMap, setLabel } from '@/utils/baiduMap'
import { mapState, mapMutations, mapActions } from 'vuex'
import { isEmptyObject } from '@/utils/utils'
export default {
    data() {
        return {
            loading: false,
            mapId: `BMap-${Date.now()}${Math.floor(Math.random() * 1000)}`,
            longitude: '120.260409',                                             // 经度默认布兰莎
            latitude: '30.244508',                                               // 纬度默认布兰莎
            estateName: '布兰莎总部'
        }
    },
    computed: {
        ...mapState({ appData: 'app', estateData: 'estate' })
    },
    watch: {
        'estateData.position': {
            handler: async function(val, oldval) {
                if (!isEmptyObject(val) && val.location) {
                    let data = val
                    this.longitude = data.location.lng
                    this.latitude = data.location.lat
                    this.estateName = data.name
                    await this.initMap()
                }
                this.loading = false
            }
        }
    },
    methods: {
        ...mapMutations({ setMap: 'SET_MAP', setLabel: 'SET_LABEL' }),
        ...mapActions({ getPositionForName: 'getPositionForName' }),
        async initMap(param) {
            let _self = this
            _self.loading = true
            /* eslint-disable */
            await BaiduMap().then(async () => {
                let map = new BMap.Map(_self.mapId)                                                                                          // 创建Map实例
                let point = new BMap.Point(param ? param.longitude : _self.longitude, param ? param.latitude : _self.latitude)
                await map.centerAndZoom(new BMap.Point(param ? param.longitude : _self.longitude, param ? param.latitude : _self.latitude), 17)
                let marker = new BMap.Marker(point)                                                                                          // 创建标注
                await map.addOverlay(marker)                                                                                                       // 将标注添加到地图中
                let label = setLabel(param ? param.estateName : _self.estateName)   // 设置label
                marker.setLabel(label)
                map.enableScrollWheelZoom()
                map.enableInertialDragging()
                _self.loading = false
                await _self.setMap(map)
                await _self.setLabel(label)
            })
            /* eslint-disable */
        },
        async initMapFromName(query) {
            await this.getPositionForName({ name: query, region: this.appData.areaName })
        }
    }
}
</script>
