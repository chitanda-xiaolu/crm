<!--
 * @Description: 方案详情信息
 * @Author: Zale Ying
 * @Date: 2020-04-08 14:37:20
 * @LastEditTime: 2020-05-27 19:07:55
 * @LastEditors: Zale Ying
 -->
<template>
    <el-row>
        <el-divider content-position="left">关联方案<i class="el-icon-thumb thumb"></i></el-divider>
        <div class="program-content">
            <div class="left">
                <el-row>
                    <el-col :span="6">
                        <div class="info-item">
                            <span class="info-label">方案名称：</span><span>{{programObj.name}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="info-item">
                            <span class="info-label">户型：</span><span>{{programObj.specName}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="info-item">
                            <span class="info-label">面积：</span><span>{{programObj.realArea && programObj.realArea.toFixed(2)}}<span v-show="programObj.realArea">㎡</span></span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="info-item">
                            <span class="info-label">渲染图：</span><span>
                                <viewer v-show="programObj.coverPic" class="image-preview-box">
                                    <img title="点击看大图" class="image-preview" :src="programObj.coverPic">
                                </viewer>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { programDetail } from '@/api/order'
export default {
    data() {
        return {
            programObj: {
                name: '',
                coverPic: '',
                realArea: '',
                specName: ''
            }
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    watch: {
        'orderDetailData.orderId': {
            handler: function(val, oldVal) {
                this.getProgramInfo()
            }
        }
    },
    mounted() {
        this.getProgramInfo()
    },
    methods: {
        // 获取方案信息
        getProgramInfo() {
            let designId = this.orderDetailData.designId
            if(designId) {
                programDetail({ designId }).then(result => {
                    if(result.code === 200 && result.success) {
                        this.programObj = {...result.data}
                    }
                })
            } else {
                Object.keys(this.programObj).forEach(key => this.programObj[key] = '')
            }
        }
    }
}
</script>
<style scoped lang='scss'>
@import '../../../../assets/scss/order/order_detail/model';
</style>
