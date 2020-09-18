<template>
    <div class="notice-container">
        <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="110px">
            <el-divider content-position="left">所属信息<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
                <el-col :span="24">
                      <el-form-item label="经销商：">
                          {{distributorName}}
                    </el-form-item>
                 </el-col>
            </el-row>
            <el-divider content-position="left">门店信息<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="名称：" prop="storeName" >
                        <el-input v-model="dataForm.storeName" clearable placeholder="请输入" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="简称：" prop="storeShortName" >
                        <el-input v-model="dataForm.storeShortName" clearable placeholder="请输入" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="门店类型：" prop="storeType" >
                        <el-select
                            v-model="dataForm.storeType"
                            style="width:100%"
                            filterable
                            clearable
                            placeholder="请选择">
                            <el-option
                                v-for="item in storeTypeList"
                                :key="item.dictCode"
                                :label="item.dictName"
                                :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="建店日期：" prop="establishedTime" >
                        <el-date-picker
                            style="width:100%"
                            v-model="dataForm.establishedTime"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择"
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="面积：" prop="area">
                        <el-input v-model="dataForm.area" placeholder="请输入" clearable style="width:100%">
                            <template slot="append">m²</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="门店状态：" prop="storeStatus" >
                        <el-select
                            v-model="dataForm.storeStatus"
                            style="width:100%"
                            filterable
                            clearable
                            placeholder="请选择">
                            <el-option
                                v-for="item in storeStatusList"
                                :key="item.dictCode"
                                :label="item.dictName"
                                :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="地址：" prop="address">
                          <el-input placeholder="请输入" readonly v-model="dataForm.address">
                            <p slot="prepend">{{`${dataForm.provinceName} - ${dataForm.cityName} - ${dataForm.countyName}`}}</p>
                            <el-button slot="append" type="primary" class="select-position" icon="el-icon-search" @click="showAreaMap">定位</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="店长：" prop="managerId" >
                        <el-select
                            v-model="dataForm.managerId"
                            style="width:100%"
                            filterable
                            clearable
                            loading-text="搜索中..."
                            placeholder="请选择">
                            <el-option
                                v-for="item in managerList"
                                :key="item.id"
                                :label="item.name"
                                :disabled="item.status === 1"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="副店长：" prop="assistantManagerIds" >
                         <el-select
                            v-model="assistantManagerLists"
                            style="width:100%"
                            filterable
                            clearable
                            multiple
                            loading-text="搜索中..."
                            placeholder="请选择">
                            <el-option
                                v-for="item in assistantManagerList"
                                :key="item.index"
                                :label="item.name"
                                :disabled="item.status === 1"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">展示信息<i class="el-icon-thumb thumb"></i></el-divider>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="展示位置：" prop="showLocation" >
                        <el-select
                            v-model="dataForm.showLocation"
                            style="width:100%"
                            filterable
                            clearable
                            placeholder="请选择">
                            <el-option
                                v-for="item in storeLocationList"
                                :key="item.dictCode"
                                :label="item.dictName"
                                :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="预约电话：" prop="appointmentPhone">
                        <el-input v-model="dataForm.appointmentPhone" placeholder="请输入" clearable style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="营业时间：" prop="businessHours" >
                        <el-input v-model="dataForm.businessHours" placeholder="请输入" clearable style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <br />
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item>
                            <el-button type="primary" @click="dataFormSubmit('dataForm')" icon="el-icon-position">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <select-area v-if="mapVisible" ref="mapselectModal" :detailInfo="detailInfo" @locationInfo="getlocationInfo"></select-area>
    </div>
</template>
<script>
import { filterFalsy, mergeObject } from '@/utils/utils'
import { mapState, mapActions, mapMutations } from 'vuex'
import { storeType, storeStatus, storeShowLocation, editStore, storeDetail, getShopOwner } from '@/api/store'
import selectArea from '../../components/store/map'
import { validateArea } from '@/utils/validate'
export default {
    components: {
        selectArea
    },
    data () {
        return {
            distributorName: '',
            storeStatusList: [], // 门店状态
            storeTypeList: [], // 门店类型
            storeLocationList: [], // 展示位置
            mapVisible: false,
            selectDistributors: [], // 经销商
            dialogVisible: false,
            managerList: [],
            assistantManagerList: [],
            assistantManagerLists: [],
            visible: true,
            addressInfo: {},
            detailInfo: {},
            dataForm: {
                distributorId: '',
                storeName: '',
                storeShortName: '',
                storeType: '',
                establishedTime: '',
                area: '',
                storeStatus: '',
                businessHours: '',
                address: '',
                countyName: '',
                appointmentPhone: '',
                showLocation: '',
                code: ''
            },
            userList: [],
            html: '',
            dataRule: {
                distributorId: [
                    { required: true, message: '经销商不能为空', trigger: 'change' }
                ],
                storeName: [
                    { required: true, message: '名称不能为空', trigger: 'change' }
                ],
                storeType: [
                    { required: true, message: '门店类型不能为空', trigger: 'change' }
                ],
                establishedTime: [
                    { required: true, message: '建店日期不能为空', trigger: 'change' }
                ],
                area: [
                    { required: true, message: '面积不能为空', trigger: 'change' },
                    { validator: validateArea, trigger: 'change' }
                ],
                storeStatus: [
                    { required: true, message: '门店状态不能为空', trigger: 'change' }
                ],
                stactivityScopeatus: [
                    { required: true, message: '活动范围不能为空', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '地址不能为空', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState({distributor: 'distributor', appData: 'app'})
    },
    watch: {
        // 注意方法监听不能使用箭头函数
        // 'appData.codeList': {
        //     handler: function (val, oldval) {
        //         this.setCode(val)
        //     }
        // }
    },
    mounted() {
        let _self = this
        let initData = _self.$route.query
        if (initData.id) {
            _self.getDetail(initData.id)
        }
        if (initData.distributorId) {
            _self.getShopperList(initData.distributorId)
        }
        this.getStoreType()
        this.getStoreStatus()
        this.getStoreShowLocation()
        this.getDistributorList({ size: 1000 })
    },
    methods: {
        ...mapActions({ getDistributorList: 'getDistributorList' }),
        ...mapMutations({ setCodeList: 'SET_CODE_LIST', setAreaName: 'SET_AREA_NAME', closeCurrentPage: 'CLOSE_CURRENT_PAGE' }),
        setCode(val) {
            this.dataForm.areaCode = val
        },
        getShopperList(id) {
            getShopOwner({distributorId: id}).then(result => {
                if(result.code === 200 && result.success) {
                    this.managerList = result.data
                    this.assistantManagerList = result.data
                }
            })
        },
        // 获取详情
        getDetail(id) {
            let _self = this
            storeDetail({id: id}).then(result => {
                let nodes = result
                _self.detailInfo = filterFalsy(nodes)
                _self.setCodeList([nodes.provinceCode, nodes.cityCode, nodes.countyCode])
                _self.setAreaName(nodes.countyName || nodes.cityName || nodes.provinceName)
                _self.distributorName = nodes.distributorName
                nodes.showLocation = nodes.showLocation ? parseInt(nodes.showLocation) : ''
                _self.assistantManagerLists =  result.assistantManagerIds && result.assistantManagerIds.split(',')
                _self.dataForm = { ...nodes }
            })
        },
        showAreaMap() {
            let initData = this.$route.query.id
            this.mapVisible = true
            this.$nextTick(() => {
                this.$refs.mapselectModal.init(this.$refs.mapselectModal, initData)
            })
        },
        getlocationInfo(data) {
            this.addressInfo = data
            this.dataForm.address = data.address
            this.dataForm.countyName = data.areaName
            this.setCodeList([data.provinceCode, data.cityCode, data.countyCode])
        },
        dataFormSubmit() {
            let initData = this.$route.query.id
            let _self = this
            if(!_self.dataForm.storeShortName) {
                _self.dataForm.storeShortName = _self.dataForm.storeName
            }
            let params = mergeObject(filterFalsy(_self.dataForm))
            params.assistantManagerIds = _self.assistantManagerLists && _self.assistantManagerLists.join()
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    let query = params
                    query.id = initData
                    editStore(params).then(result => {
                        if(result.code === 200 && result.success) {
                            _self.$message.success('编辑成功')
                            _self.closeCurrentPage(_self.$route.fullPath)
                            _self.$router.push('/store')
                        } else {
                            _self.$message.error('编辑失败')
                        }
                    })
                }
            })
        },
        // 查询门店类型列表
        getStoreType() {
            storeType().then(result => {
                if(result.code === 200 && result.success) {
                    this.storeTypeList = result.data
                }
            })
        },
        // 查询门店状态列表
        getStoreStatus() {
            storeStatus().then(result => {
                if(result.code === 200 && result.success) {
                    this.storeStatusList = result.data
                }
            })
        },
        // 展示位置
        getStoreShowLocation() {
            storeShowLocation().then(result => {
                if(result.code === 200 && result.success) {
                    this.storeLocationList = result.data
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
   @import '../../assets/scss/store/index';
</style>
