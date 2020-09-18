<!--
 * @Description: 订单详情cad信息组件
 * @Author: Zale Ying
 * @Date: 2020-01-03 16:00:01
 * @LastEditTime: 2020-05-21 09:59:52
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="cad-file-list" v-show="cadFileList.length">
        <el-divider content-position="left">CAD文件+附件<i class="el-icon-thumb thumb"></i></el-divider>
        <el-collapse class="cad-collapse margin-bottom-8" v-model="activeNames" @change="handleChange">
            <el-collapse-item title="CAD文件" name="1">
                <a class="cad-link" v-for="(item, i) in cadFileList" :key="i" :href="item.pathUrl">{{i+1}}、{{item.fileName}}</a>
            </el-collapse-item>
            <el-collapse-item title="其他附件" name="2" v-show="otherFileList.length">
                <a class="other-link" v-for="(item, i) in otherFileList" :key="i" :href="item.pathUrl">{{i+1}}、{{item.fileName}}</a>
            </el-collapse-item>
        </el-collapse>
        <el-button class="cad-design-button" v-if="orderDetailData.status === 1101" icon="el-icon-scissors" size="mini" type="primary" @click="toCad" plain>设计</el-button>
    </div>
</template>

<script>
import { cadFileList } from '@/api/order'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            orderId: this.$route.params.orderId,
            activeNames: ['1', '2'],
            cadFileList: [],
            otherFileList: []
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    mounted() {
        cadFileList({orderId: this.orderId}).then(result => {
            if (result.data && result.data.length) {
                this.cadFileList.length = 0
                this.otherFileList.length = 0
                result.data.forEach(element => {
                    element.name = element.fileName
                    if (element.type === 0) {
                        this.cadFileList.push(element)
                    } else {
                        this.otherFileList.push(element)
                    }
                })
            }
        })
    },
    methods: {
        handleChange(val) {
            console.log(val)
        },
        toCad() {
            this.$router.push({
                path: `/order/editCad/${this.orderId}`
            })
        }
    }
}
</script>

<style lang="scss">
    @import '../../../assets/scss/order/order_detail/model';
    .cad-file-list {
        .cad-collapse, .cad-design-button {
            margin-left: 15px;
        }
        .cad-link {
            color: #00a8ea;
        }
        .other-link {
            color: #de9100;
        }
    }
</style>
