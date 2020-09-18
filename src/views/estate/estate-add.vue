<template>
    <div class="main-box dis-flex-row">
        <div class="map-box dis-flex-row">
            <div class="map-box-left">
                <div class="dis-flex-col margin-top-70">
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="所在区域：" prop="code">
                            <area-select ref="areaSelect" :isselectAll="isselectAll" />
                        </el-form-item>
                        <el-form-item label="小区名称：" prop="name">
                            <el-input v-model="form.name" clearable placeholder="请输入" @blur="searchMap" @keyup.enter.native="searchMap"></el-input>
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
import { estateAdd } from '@/api/estate'
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
                    { required: true, message: '请选择所在区域', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入小区名称', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            },
            estate: {}
        }
    },
    components: {
        AreaSelect, BaiduMap
    },
    computed: {
        ...mapState({appData: 'app', estateData: 'estate'})
    },
    watch: {
        // 注意方法监听不能使用箭头函数
        'appData.codeList': {
            handler: function (val, oldval) {
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
    async mounted() {
        await this.$refs.baiduMap.initMap()
    },
    methods: {
        ...mapMutations({ closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        onSubmit() {
            this.code = this.appData.codeList
            this.$refs['form'].validate(valid => {
                if (valid) {
                    let _self = this
                    let param = {
                        housingEstateName: _self.form.name,
                        provinceCode: _self.appData.codeList[0],
                        cityCode: _self.appData.codeList[1] ? _self.appData.codeList[1] : '',
                        countyCode: _self.appData.codeList[2] ? _self.appData.codeList[2] : '',
                        address: _self.form.address,
                        longitude: _self.form.lng,
                        latitude: _self.form.lat,
                        status: _self.form.status
                    }
                    estateAdd(param).then(result => {
                        if (result.code === 200 && result.success) {
                            _self.$message.success('新增成功')
                            let code = this.form.code
                            this.$refs.form.resetFields()
                            this.form.code = code
                        } else {
                            _self.$message.error(result.message)
                        }
                        _self.closeCurrentPage(_self.$route.fullPath)
                        _self.$router.push({ path: '/housingEstate' })
                    })
                }
            })
        },
        async searchMap() {
            if (!this.form.code || !this.form.name) return
            await this.$refs.baiduMap.initMapFromName(this.form.name)
        },
        // 设置地区code值
        setCode(val) {          // 新增小区直接在组件中处理，此方法暂时弃用，防止form.code中的值在组件change之后变化，无法应对form的rule校验，后期需要优化
            this.form.code = val
        },
        setMapPosition() {
            let _self = this
            let map = this.estateData.map
            let label = setLabel(this.estateData.position.name)  // 设置label
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
    .padding-left-0 {
        @include paddingLeft(0)
    }
</style>
