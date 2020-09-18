<template>
    <div class="main-box dis-flex-col">
        <el-form
            label-position="right"
            label-width="120px"
            :model="dataForm"
            @keyup.enter.native="getQuery()"
            ref="dataForm">
            <div class="search-box">
                <el-form-item label="小区名称:" prop="name">
                    <el-input v-model="dataForm.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所在区域:" prop="code">
                    <area-select v-if="isArea"></area-select>
                </el-form-item>
                <el-form-item label="小区状态:" prop="status">
                    <el-radio v-model="dataForm.status" label='0'>有效</el-radio>
                    <el-radio v-model="dataForm.status" label='1'>无效</el-radio>
                    <el-radio v-model="dataForm.status" label="">全部</el-radio>
                </el-form-item>
                <el-form-item class="search-btns">
                    <el-button type="primary" @click="getQuery()">查询</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="map-box dis-flex-row border-top">
            <div class="map-box-left">
                <div class="dis-flex-col">
                    <div class="border-bottom" :span="24">
                        <router-link v-if="hasPermission(Permission.estate.create.code)" to="/housingEstate/add">
                            <el-button class="map-add" size="mini" type="primary" icon="el-icon-plus" plain>新增小区</el-button>
                        </router-link>
                    </div>
                    <vue-scroll :ops="scrollops">
                        <div class="wrapper" ref="wrapper">
                            <ul class="estate-list-conainer" v-if="estateList && estateList.length">
                                <li
                                    class="list-item border-bottom"
                                    v-for="(item, index) in estateList"
                                    :class="item.id === selectId ? 'active' : ''"
                                    :key="item.id">
                                    <div class="list-item-left padding-col-10" :class="item.status === 1 ? 'disabled-text' : ''" @click="selectItem(item.id, item.housingEstateName, item.longitude, item.latitude)">
                                        <p class="item-left-top text-ellipsis">{{(current - 1)*10 + index+1}}. {{item.housingEstateName}}</p>
                                        <p class="item-left-bottom text-ellipsis">{{item.fullName}}</p>
                                    </div>
                                    <router-link v-if="hasPermission(Permission.estate.update.code)" :to="{ path: `/housingEstate/edit/${item.id}` }">
                                        <el-button class="list-item-right" type="warning" size="mini" icon="el-icon-edit" plain>编辑</el-button>
                                    </router-link>
                                </li>
                            </ul>
                            <div class="el-table__empty-text empty-text" v-if="estateList && !estateList.length">暂无数据</div>
                        </div>
                    </vue-scroll>
                    <el-pagination
                        class="pagination-position"
                        @current-change="currentChangeHandle"
                        :current-page="current"
                        layout="total, prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
            <div class="map-box-right">
                <baidu-map ref="baiduMap"></baidu-map>
            </div>
        </div>
    </div>
</template>

<script>
import BaiduMap from '@/components/estate/map'
import { estateList } from '@/api/estate'
import AreaSelect from '@/components/common/AreaSelect.vue'
import { mapState, mapMutations } from 'vuex'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    name: 'estate',
    components: {
        AreaSelect,
        BaiduMap
    },
    data() {
        return {
            scrollops: scrollConfig,
            loading: false,
            dataForm: {                                                       // 查询内容参数
                name: '',
                code: '',
                status: '0'
            },
            selectId: 1,                                                      // 当前选中的小区
            estateList: [],                                                   // 楼盘列表
            total: 0,                                                         // 总页数
            mapId: `BMap-${Date.now()}${Math.floor(Math.random() * 1000)}`,
            longitude: '120.219',                                             // 经度默认布兰莎
            latitude: '30.259',                                               // 纬度默认布兰莎
            estateName: '布兰莎总部',
            current: 1,
            isArea: false,
            timer: null
        }
    },
    computed: {
        ...mapState({ appData: 'app' })
    },
    mounted() {
        let params = { current: this.current, status: this.dataForm.status }
        this.estateData(params)
        this.setCodeList()
    },
    methods: {
        ...mapMutations({setCodeList: 'SET_CODE_LIST'}),
        estateData(param) {                                                         // 小区翻页列表获取
            let _self = this
            _self.loading = true
            estateList(param).then(result => {
                let data = result.data
                if (result.code === 200 && result.success && result.data.total) {
                    _self.estateList = data.records
                    _self.total = data.total
                    _self.selectId = data.records[0].id
                    _self.longitude = data.records[0].longitude
                    _self.latitude = data.records[0].latitude
                    _self.estateName = data.records[0].housingEstateName
                    _self.$nextTick(() => {
                        _self._initScroll()
                    })
                } else if (result.code === 200 && result.success && !result.data.total) {
                    _self.estateList = data.records
                    _self.total = data.total
                } else {
                    _self.$message({
                        message: result.message || '请求错误',
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
                _self.isArea = true
                _self.loadMap()
            })
        },
        _initScroll() {
            if (!this.$refs.wrapper) return 0
        },
        selectItem(id, name, long, lat) {
            this.selectId = id
            this.estateName = name
            this.longitude = long
            this.latitude = lat
            this.loadMap()
        },
        loadMap() {
            this.$refs.baiduMap.initMap({ longitude: this.longitude, latitude: this.latitude, estateName: this.estateName })
        },
        currentChangeHandle(val) {
            this.current = val
            this.getDataList()
        },
        getQuery() {                                                       // 查询
            this.current = 1
            this.getDataList()
        },
        getDataList() {
            let params = {
                housingEstateName: this.dataForm.name,
                code: this.appData.codeList.slice(-1)[0] || '',
                status: this.dataForm.status,
                current: this.current
            }
            this.estateData(params)
        },
        resetForm() {                                                         // 重置
            let _self = this
            _self.isArea = false
            _self.setCodeList()
            _self.$refs['dataForm'].resetFields()
            _self.timer && clearTimeout(_self.timer)
            _self.timer = setTimeout(function() {
                _self.isArea = true
                clearTimeout(_self.timer)
            }, 10)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/estate/index';
</style>
