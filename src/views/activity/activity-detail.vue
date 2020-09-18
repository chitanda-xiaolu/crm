<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left wrapper" ref="wrapper">
            <vue-scroll :ops="scrollops">
                <div class="detail-info">
                    <el-divider content-position="left">基础信息</el-divider>
                    <el-button class="btn-add" type="warning" plain @click="editInfo()" size="mini" icon="el-icon-edit">编辑</el-button>
                    <div class="base-info">
                        <div class="info-item">
                            <span class="info-label">活动范围:</span><span>{{infoObj.activityScopeName}}</span>
                        </div>
                        <div class="info-item" style="height:100%;margin-bottom:5px">
                            <span class="info-label">经销商: <div @click="showAll = !showAll" v-show="distributorList.length >3" class="show-more">{{openOrclose}}</div></span><span class="">
                                <template v-for="item in showList">
                                    <p style="margin-left: 74px" :title="item" class="text-ellipsis" :key="item">{{item}}</p>
                                </template>
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">活动类型:</span><span>{{infoObj.activityTypeName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">活动名称:</span><span>{{infoObj.activityName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">引流日期:</span><span>{{DWY_UTILS.getTimeYMD(infoObj.drainageStartTime)+'~'+DWY_UTILS.getTimeYMD(infoObj.drainageEndTime)}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">下单日期:</span><span>{{DWY_UTILS.getTimeYMD(infoObj.ordersStartTime)+'~'+DWY_UTILS.getTimeYMD(infoObj.ordersEndTime)}}</span>
                        </div>
                    </div>
                    <el-divider content-position="left">系统信息</el-divider>
                    <div class="base-info">
                        <div class="info-item">
                            <span class="info-label">创建人:</span><span>{{infoObj.createUserName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">创建时间:</span><span>{{DWY_UTILS.getTimeYMD(infoObj.createTime)}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">更新人:</span><span>{{infoObj.updateUserName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">更新时间:</span><span>{{DWY_UTILS.getTimeYMD(infoObj.updateTime)}}</span>
                        </div>
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
import { mapActions } from 'vuex'
import { activeDetail } from '@/api/activity'
import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    data() {
        return {
            scrollops: scrollConfig,
            showAll: false,
            distributorList: [],
            infoObj: {
                activityName: '',
                activityScope: '',
                activityScopeName: '',
                activityStatus: '',
                activityStatusName: '',
                activityType: '',
                activityTypeName: '',
                createTime: '',
                createUser: '',
                createUserName: '',
                distributorIds: '',
                distributorList: '',
                drainageEndTime: '',
                drainageStartTime: '',
                ordersEndTime: '',
                ordersStartTime: '',
                updateTime: '',
                updateUser: '',
                updateUserName: ''
            }
        }
    },
    computed: {
        showList() {
            if (this.showAll) return this.distributorList
            let showList = []
            if(this.distributorList.length > 3) {
                for(let i = 0; i < 2; i++) {
                    showList.push(this.distributorList[i])
                }
            } else {
                showList = this.distributorList
            }
            return showList
        },
        openOrclose() {
            if(!this.showAll) {
                return '展开全部'
            } else {
                return '收起'
            }
        }
    },
    watch: {
        '$route'(to, from) {
            if(to.meta.title === '活动详情') {
                this.getDetail()
            }
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        ...mapActions({ getDistributorList: 'getDistributorList' }),
        editInfo() {
            this.getDistributorList({size: 10000})
            this.$router.push('/marketActivity/edit/' + this.$route.params.id)
        },
        getDetail() {
            if(this.$route.params.id) {
                activeDetail({id: this.$route.params.id}).then(result => {
                    result.distributorList && result.distributorList.map(name => {
                        this.distributorList.push(name.name)
                    })
                    this.infoObj = {...result}
                })
            }
        }
    }
}
</script>
<style scoped lang='scss'>
    @import '../../assets/scss/post_role/index';
    .wrapper {
        overflow: hidden;
        .detail-info {
            width: 100%;
            border: 1px solid #fff;
            .btn-add {
                float: right;
            }
            .base-info {
                padding: 0 6px;
                margin: 17px 0 10px 0;
                .info-item {
                    height: 40px;
                    .info-label {
                        color: $disabledColor;
                        margin-right: 5px;
                    }
                    .show-more {
                        cursor: pointer;
                         color:$dividerColor;
                        font-size: 12px;
                        float: right;
                    }
                }
            }
        }
    }
</style>
