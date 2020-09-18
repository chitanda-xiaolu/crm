<!--
 * @Description: 门店详情（page）
 * @Author: 陈桃
 * @Date: 2019-08-20 17:58:17
 * @LastEditTime: 2020-04-27 14:58:12
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left">
            <vue-scroll :ops="scrollops" class="detail-info">
               <el-divider content-position="left">门店信息</el-divider>
                <div class="base-info">
                    <div class="info-item">
                        <span class="info-label">门店编号：</span><span>{{detailObj.storeCode}}</span>
                    </div>
                     <div class="info-item">
                        <span class="info-label">名称：</span><span>{{detailObj.storeName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">简称：</span><span>{{detailObj.storeShortName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">门店类型：</span><span>{{detailObj.storeTypeName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">建店日期：</span><span>{{DWY_UTILS.getTimeYMD(detailObj.establishedTime)}}</span>
                    </div>
                   <div class="info-item">
                        <span class="info-label">面积：</span><span>{{detailObj.area}}m²</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">门店状态：</span><span>{{detailObj.storeStatusName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">地址：</span>
                        <el-tooltip class="item" :content="detailObj.address" placement="top-start" effect="light">
                            <span class="text-ellipsis over-width">{{detailObj.address}}</span>
                        </el-tooltip>
                    </div>
                    <div class="info-item">
                        <span class="info-label">店长：</span><span>{{detailObj.managerName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">展示位置：</span><span>{{detailObj.showLocationName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">预约电话：</span><span>{{detailObj.appointmentPhone}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">营业时间：</span><span>{{detailObj.businessHours}}</span>
                    </div>
                </div>
                <el-divider content-position="left">所属信息</el-divider>
                <div class="base-info">
                    <div class="info-item" style="line-height: 16px;">
                        <span class="info-label">经销商：</span>
                        <el-tooltip class="item" :content="detailObj.distributorName" placement="top-start" effect="light">
                            <span class="text-ellipsis over-width" style="display:inline-block">{{detailObj.distributorName}}</span>
                        </el-tooltip>
                    </div>
                    <div class="info-item">
                        <span class="info-label">关联部门：</span><span>{{detailObj.deptName}}</span>
                    </div>
                </div>
               <el-divider content-position="left">系统信息</el-divider>
                <div class="base-info">
                    <div class="info-item">
                        <span class="info-label">创建人：</span><span>{{detailObj.createUserName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">创建时间：</span><span>{{DWY_UTILS.getTimeYMD(detailObj.createTime)}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">更新人：</span><span>{{detailObj.updateUserName}}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">更新时间：</span><span>{{DWY_UTILS.getTimeYMD(detailObj.updateTime)}}</span>
                    </div>
                </div>
            </vue-scroll>
        </div>
        <div class="main-box-right" >
            <!-- <div class="page-title">XXXX</div>
            <div class="show-right">
                <el-tabs>
                    <el-tab-pane label="统计分析"  name="business">
                    </el-tab-pane>
                    <el-tab-pane label="xxx" name="menubtn">
                    </el-tab-pane>
                </el-tabs>
            </div> -->
        </div>
    </div>
</template>
<script>
import { storeDetail } from '@/api/store'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    data() {
        return {
            scrollops: scrollConfig,
            detailObj: {
                address: '',
                appointmentPhone: '',
                area: '',
                assistantManagerIds: '',
                assistantManagerList: '',
                businessHours: '',
                cityCode: '',
                cityName: '',
                closeTime: '',
                countyCode: '',
                countyName: '',
                createTime: '',
                createUser: '',
                createUserName: '',
                deptId: '',
                deptName: '',
                distributorId: '',
                distributorName: '',
                establishedTime: '',
                latitude: '',
                longitude: '',
                managerId: '',
                managerName: '',
                provinceCode: '',
                provinceName: '',
                showLocation: '',
                showLocationList: '',
                showLocationName: '',
                storeCode: '',
                storeName: '',
                storeShortName: '',
                storeStatus: 2,
                storeStatusName: '',
                storeType: 4,
                storeTypeName: '',
                updateTime: '',
                updateUser: '',
                updateUserName: ''
            }
        }
    },
    watch: {
        '$route'(to, from) {
            if(to.meta.title === '门店详情') {
                this.getDetail()
            }
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            if(this.$route.params.id) {
                storeDetail({id: this.$route.params.id}).then(result => {
                    this.detailObj = {...result}
                })
            }
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../assets/scss/post_role/index';
    .detail-info {
        width: 100%;
        border: 1px solid #fff;
        .base-info {
            padding: 0 6px;
            margin: 17px 0 10px 0;
            .info-item {
                height: 35px;
                display: flex;
                .info-label {
                    display: inline-block;
                    width: 75px;
                    text-align: right;
                    color: $disabledColor;
                    @include marginRight(5px);
                }
                .show-more {
                    cursor: pointer;
                    color:$linkColor;
                    font-size: 12px;
                    float: right;
                }
            }
        }
        .over-width {
            width: 200px;
        }
        /deep/ .__view {
            overflow: hidden;
        }
    }
</style>
