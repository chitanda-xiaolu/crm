<template>
    <div class="main-box">
        <div class="wrapper" ref="wrapper">
            <div class="detail-info">
                <section ref="dataSection">
                    <el-row :gutter="10" class="row-list">
                        <el-col :span="24">
                            <bar-chart />
                        </el-col>
                    </el-row>
                    <el-row :gutter="10" class="row-list funnel-box">
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>业务公告</span>
                                </div>
                                <ul v-for="(o, index) in businessList" :key="index" class="notice-list">
                                    <li @click="getSystemNoticeDetail(o.id, 'business')">
                                        <a>
                                            <span style="margin-right:3px">{{(bPagination.current - 1) * bPagination.size + index+1}}.</span>
                                            <span :data-id="o.id">{{ o.title }}</span>
                                        </a>
                                    </li>
                                </ul>
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="bTotal"
                                    :page-size="6"
                                    v-show="bTotal > 6"
                                    @current-change="handleBcurrentChange"
                                    class="home-pagination">
                                </el-pagination>
                            </el-card>
                        </el-col>
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>系统公告</span>
                                </div>
                                <ul v-for="(o, index) in systemList" :key="index" class="notice-list">
                                    <li @click="getSystemNoticeDetail(o.id, 'system')">
                                        <a>
                                            <span style="margin-right:3px">{{(sPagination.current - 1) * sPagination.size + index+1}}.</span>
                                            <span :data-id="o.id">{{ o.title }}</span>
                                        </a>
                                        <span>{{o.publicTime.slice(0, 10)}}</span></li>
                                </ul>
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="sTotal"
                                    :page-size="6"
                                    v-show="sTotal > 6"
                                    @current-change="handleScurrentChange"
                                    class="home-pagination">
                                </el-pagination>
                            </el-card>
                        </el-col>
                    </el-row>
                </section>
            </div>
        </div>
        <notice-detail ref="helpDetailDom" v-if="helpDialogVisible" />
    </div>
</template>
<script>
import noticeDetail from '@/components/common/NoticeDetail' // 公告详情
import { getMoreBusinessNoticeList } from '@/api/home'
import barChart from '@/components/echarts/bar-chart'

export default {
    components: {
        noticeDetail,
        barChart
    },
    data() {
        return {
            businessList: [],
            systemList: [],
            helpDialogVisible: false,
            bTotal: 0,
            sTotal: 0,
            bPagination: {
                size: 6,
                current: 1,
                platform: 1
            },
            sPagination: {
                size: 6,
                current: 1,
                platform: 0
            }
        }
    },
    mounted() {
        this.getBusinessNotice()
        this.getSystemNotice()
    },
    methods: {
        // 业务公告列表
        getBusinessNotice(current = 1, size = 6) {
            let _self = this
            getMoreBusinessNoticeList(_self.bPagination).then(result => {
                if (result.code === 200 && result.success) {
                    _self.businessList = result.data.records
                    _self.bTotal = result.data.total
                }
            })
        },
        // 系统公告列表
        getSystemNotice() {
            let _self = this
            getMoreBusinessNoticeList(_self.sPagination).then(result => {
                if (result.code === 200 && result.success) {
                    _self.systemList = result.data.records
                    _self.sTotal = result.data.total
                }
            })
        },
        // 业务公告详情
        getBusinessNoticeDetail(id, tag) {
            this.helpDialogVisible = true
            this.$nextTick(() => {
                this.$refs.helpDetailDom.init(id, tag)
            })
        },
        // 系统公告详情
        getSystemNoticeDetail(id, tag) {
            this.helpDialogVisible = true
            this.$nextTick(() => {
                this.$refs.helpDetailDom.init(id, tag)
            })
        },
        // 业务公告翻页
        handleBcurrentChange(val) {
            this.bPagination.current = val
            this.getBusinessNotice()
        },
        // 系统公告翻页
        handleScurrentChange(val) {
            this.sPagination.current = val
            this.getSystemNotice()
        }
    }
}
</script>
<style scoped lang='scss'>
    .main-box {
        padding-right: 20px;
        .wrapper {
            background: #f2f2f5; margin-right: 7px;
            @include paddingAll(10px);
            .row-list {
                height: 390px;
                &>.el-col {
                    height: 100%;
                    &>.el-card {
                        height: 100%;
                        .notice-list>li {
                            display: flex;
                            justify-content: space-between;
                            @include paddingCol(12px);
                            border-bottom: 1px solid #eee;
                            &>a {
                                color: $linkColor;
                                cursor: pointer;
                            }
                            &>span {
                                color: $defaultColor;
                            }
                        }
                    }
                }
            }
            /deep/ .el-card__header {
                @include paddingDbl(12px, 10px);
            }
            /deep/ .el-card__body {
                @include paddingDbl(10px, 20px);
            }
            .home-pagination {
                float: right;
                margin-top: 10px;
            }
        }
    }
</style>
