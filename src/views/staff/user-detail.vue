<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-left">
            <!-- <vue-scroll :ops="scrollops"> -->
                <div class="detail-info">
                    <el-divider content-position="left">员工信息</el-divider>
                    <div class="base-info">
                        <div class="info-item">
                            <span class="info-label">部门:</span><span>{{detailObj.deptName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">姓名:</span><span>{{detailObj.name}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">手机:</span><span>{{detailObj.phone}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">岗位:</span><span>{{detailObj.roleName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">员工状态:</span><span>{{detailObj.statusName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">允许登录:</span><span>{{detailObj.allowLoginName}}</span>
                        </div>
                    </div>
                    <el-divider content-position="left">系统信息</el-divider>
                    <div class="base-info">
                        <div class="info-item">
                            <span class="info-label">创建人:</span><span>{{detailObj.createUserName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">创建时间:</span><span>{{detailObj.updateTime && DWY_UTILS.getTimeYMD(detailObj.updateTime)}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">更新人:</span><span>{{detailObj.updateUserName}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">更新时间:</span><span>{{detailObj.updateTime && DWY_UTILS.getTimeYMD(detailObj.updateTime)}}</span>
                        </div>
                    </div>
                </div>
            <!-- </vue-scroll> -->
        </div>
    </div>
</template>
<script>
import { userDetail } from '@/api/deptUser'
// import scrollConfig from '../../../config/scroll' // 滚动条配置项
export default {
    data() {
        return {
            // scrollops: scrollConfig,
            activeTabName: 'business',
            detailObj: {
                deptName: '',
                name: '',
                mobile: '',
                roleName: '',
                statusName: '',
                allowLoginName: '',
                createTime: '',
                createUserName: '',
                updateTime: '',
                updateUserName: ''
            }
        }
    },
    watch: {
        '$route'(to, from) {
            this.getDetail()
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            userDetail({userId: this.$route.params.id}).then(result => {
                if(result.code === 200 && result.success) {
                    this.detailObj = {...result.data}
                }
            })
        }
    }
}
</script>
<style scoped lang='scss'>
    .detail-info {
        width: 100%;
        border: 1px solid #fff;
        .base-info {
            padding: 0 6px;
            margin: 17px 0 10px 0;
            .info-item {
                height: 40px;
                .info-label {
                    display: inline-block;
                    width: 65px;
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
    }
</style>
