<template>
    <div class="main-box dis-flex-row">
        <div class="map-box dis-flex-row">
            <div class="map-box-left">
                <div class="dis-flex-col margin-top-70">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="所在区域" prop="code">
                            <area-select ref="areaSelect" v-if="isArea" :isselectAll="isselectAll"></area-select>
                        </el-form-item>
                        <el-form-item label="小区名称：" prop="name">
                            <el-input v-model="form.name" placeholder="请输入" clearable @blur="searchMap" @keyup.enter.native="searchMap"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址：" prop="address">
                            <el-input v-model="form.address" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="小区状态：" prop="status">
                            <el-radio-group v-model="form.status">
                                <el-radio label="0">有效</el-radio>
                                <el-radio label="1">无效</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="定位：">
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
                            <el-button type="primary" @click="onSubmit" icon="el-icon-position">保存</el-button>
                            <el-button class="margin-left-30" @click="goBack">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="map-box-right">
                <baidu-map ref="baiduMap"></baidu-map>
            </div>
        </div>
    </div>
</template>
<script>
import AreaSelect from '@/components/common/AreaSelect.vue'
import BaiduMap from '@/components/estate/map'
import { setLabel } from '@/utils/baiduMap'
import { mapState, mapMutations } from 'vuex'
import { isEmptyObject } from '@/utils/utils'
import { estateDetail, estateEdit } from '@/api/estate'
export default {
    data() {
        return {
            isselectAll: true,
            form: {
                name: '',
                address: '',
                status: '0',
                lng: '',
                lat: '',
                code: ''
            },
            rules: {
                code: [
                    { required: true, message: '请选择所在区域', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入小区名称', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'change' }
                ],
                status: [
                    { require: true, message: '请选择小区状态', trigger: 'change' }
                ]
            },
            estate: {},
            isArea: false,
            id: '',
            times: 0                  // 判断是否首次进入
        }
    },
    components: {
        AreaSelect, BaiduMap
    },
    computed: {
        ...mapState({ appData: 'app', estateData: 'estate' })
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
                    this.estate = val
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
    mounted() {
        this.init()
    },
    methods: {
        ...mapMutations({ setCodeList: 'SET_CODE_LIST', setAreaName: 'SET_AREA_NAME', closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        async init() {
            let _self = this
            _self.id = _self.$router.history.current.params.id
            await estateDetail(_self.id).then(async result => {
                _self.form.address = result.address
                _self.form.name = result.housingEstateName
                _self.form.status = result.status.toString()
                _self.form.lat = result.latitude
                _self.form.lng = result.longitude
                _self.setAreaName(result.countyName || result.cityName || result.provinceName)
                _self.setCodeList([result.provinceCode, result.cityCode, result.countyCode])
                _self.isArea = true                                                                 // 处理组件mounted同步问题
                await _self.loadMap()
            })
        },
        onSubmit() {
            this.code = this.appData.codeList
            this.$refs['form'].validate(valid => {
                if (valid) {
                    let _self = this
                    let param = {
                        id: _self.id,
                        housingEstateName: _self.form.name,
                        provinceCode: _self.appData.codeList[0],
                        cityCode: _self.appData.codeList[1] || '',
                        countyCode: _self.appData.codeList[2] || '',
                        address: _self.form.address,
                        longitude: _self.form.lng,
                        latitude: _self.form.lat,
                        status: _self.form.status
                    }
                    estateEdit(param).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.$message.success('修改成功')
                        } else {
                            _self.$message.error(result.message)
                        }
                        _self.setCodeList()
                        _self.closeCurrentPage(_self.$route.fullPath)
                        _self.$router.push({ path: '/housingEstate' })
                    })
                }
            })
        },
        async loadMap() {
            await this.$refs.baiduMap.initMap({ longitude: this.form.lng, latitude: this.form.lat, estateName: this.form.name })
        },
        searchMap() {
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
            let label = setLabel(this.estateData.position.name)   // 设置label
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
        goBack() {
            this.closeCurrentPage(this.$route.fullPath)
            this.$router.push({ path: '/housingEstate' })
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
</style>
