<template>
   <el-dialog
        :title="'门店地址'"
        :close-on-click-modal="false"
        :visible.sync="visible"
        :destroy-on-close="true"
        width="60%">
    <div class="main-box dis-flex-row">
        <div class="map-box dis-flex-row">
            <div class="map-box-left">
                <div class="dis-flex-col margin-top-70">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="所在区域" prop="code">
                            <area-select ref="areaSelect" :isAdd='isAdd' :isselectAll="isselectAll" @change="areaSelectFocus"></area-select>
                        </el-form-item>
                        <el-form-item label="地址" prop="name">
                            <el-input v-model="form.name" placeholder="请输入" @blur="searchMap" @keyup.enter.native="searchMap"></el-input>
                        </el-form-item>
                        <el-form-item label="定位">
                            <el-row :gutter="20">
                                <el-col :span="10" class="padding-left-0">
                                    <el-input
                                        placeholder="经度"
                                        v-model="form.lng"
                                        :disabled="true"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-input
                                        placeholder="纬度"
                                        v-model="form.lat"
                                        :disabled="true"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" :disabled="disableSubmit">确认</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="map-box-right">
                <baidu-map ref="baiduMap"></baidu-map>
            </div>
        </div>
    </div>
   </el-dialog>
</template>
<script>
import AreaSelect from '@/components/common/AreaSelect.vue'
import BaiduMap from '@/components/estate/map'
import { mapState, mapMutations } from 'vuex'
import { isEmptyObject } from '@/utils/utils'
export default {
    components: {
        AreaSelect, BaiduMap
    },
    props: ['detailInfo'],
    data() {
        return {
            visible: false,
            isAdd: true,
            isselectAll: true,
            form: {
                name: '',
                lng: '',
                lat: '',
                code: ''
            },
            times: 0,
            rules: {
                code: [
                    { required: true, message: '请选择所在区域', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入地址', trigger: 'change' }
                ]
            }
        }
    },
    mounted() {
        let id = this.$route.query.distributorId
        if(id) {
            this.first()
            this.isAdd = false
        }
    },
    computed: {
        ...mapState({appData: 'app', estateData: 'estate'}),
        disableSubmit () {
            /* eslint-disable */
            return !Boolean(this.form.code && this.form.name && this.estateData.positionStatus)
            /* eslint-disable */
        }
    },
    watch: {
        // 注意方法监听不能使用箭头函数
        'appData.codeList': {
            handler: function (val, oldval) {
                this.setCode(val)
                this.searchMap()
            }
        },
        'estateData.position': {
            handler: function (val, oldval) {
                if (!isEmptyObject(val) && val.location) {
                    this.form.lng = val.location.lng
                    this.form.lat = val.location.lat
                    this.form.address = `${val.address}`
                }
            }
        },
        'estateData.map': {
            handler: function (val, oldval) {
                this.setMapPosition()
            }
        }
    },
    methods: {
        ...mapMutations({ setCodeList: 'SET_CODE_LIST', setAreaName: 'SET_AREA_NAME' }),
        init(self, id) {
            this.visible = true
            this.$nextTick(() => {
                if(!id) {
                    this.$refs.baiduMap.initMap()
                }else {
                    this.$refs.baiduMap.initMap({ longitude: this.detailInfo.longitude, latitude: this.detailInfo.latitude, estateName: this.detailInfo.address })
                }
            })
        },
        async first() {
            let _self = this
            let id = _self.$route.query.id
            let detail = _self.detailInfo
            if(id) {
                // 编辑数据回显
                _self.form.name = detail.address
                _self.form.lat = detail.latitude
                _self.form.lng = detail.longitude
                _self.setAreaName(detail.countyName || detail.cityName || detail.provinceName)
            }
        },
        onSubmit() {
            let _self = this
            _self.code = _self.appData.codeList
            _self.$refs['form'].validate(valid => {
                if (valid) {
                    let param = {
                        address: _self.form.name,
                        provinceCode: _self.appData.codeList[0],
                        cityCode: _self.appData.codeList[1] ? _self.appData.codeList[1] : '',
                        countyCode: _self.appData.codeList[2] ? _self.appData.codeList[2] : '',
                        longitude: _self.form.lng,
                        latitude: _self.form.lat,
                        areaName: _self.appData.areaName,
                        allArea: _self.estateData.allArea + '-' + _self.form.name
                    }
                    _self.$emit('locationInfo', param)
                    _self.visible = false
                }
            })
        },
        async searchMap() {
            if (!this.form.code || !this.form.name || !this.times) {
                this.times = 1
                return
            }
            this.$refs.baiduMap.initMapFromName(this.form.name)
        },
        setCode(val) {
            this.form.code = val
        },
        setMapPosition() {
            let _self = this
            let map = this.estateData.map
            let label = this.estateData.label
            map.addEventListener('click', function(e) {
                map.clearOverlays()
                /* eslint-disable */
                let point = new BMap.Point(e.point.lng, e.point.lat)
                _self.form.lng = e.point.lng
                _self.form.lat = e.point.lat
                map.centerAndZoom(new BMap.Point(e.point.lng, e.point.lat), 17)
                let marker = new BMap.Marker(point)
                map.addOverlay(marker)
                marker.setLabel(label)
                /* eslint-disable */
            })
        },
        areaSelectFocus (val) {
            this.form.code = val
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../assets/scss/estate/index';
    /deep/ .el-cascader {
        width: 100%;
    }
    /deep/ .el-form-item {
        @include marginBottom(40px)
    }
    .padding-left-0 {
        @include paddingLeft(0)
    }
    /deep/ .el-dialog__body {
        padding: 0;
        height: 500px;
    }
</style>
