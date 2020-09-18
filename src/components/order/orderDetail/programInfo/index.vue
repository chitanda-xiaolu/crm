<!--
 * @Description: programInfo汇总
 * @Author: Zale Ying
 * @Date: 2020-04-08 16:08:12
 * @LastEditTime: 2020-04-15 15:23:17
 * @LastEditors: Zale Ying
 -->
<template>
    <div class="order-info-container">
        <program-detail />
        <program-list />
        <finish-pro />
        <cause-explanation ref="causeDom" />
    </div>
</template>
<script>
import finishPro from '@/components/order/orderDetail/programInfo/finish-product'
import programDetail from './program-detail'
import programList from './program-list'
import { mapState, mapActions } from 'vuex'
import causeExplanation from '@/components/order/supply/cause-explanation.vue'          // 原因说明
export default {
    components: {finishPro, causeExplanation, programDetail, programList},
    data () {
        return {
            date: '',
            isDisabledJsonBtn: false,
            submitVisible: false,
            pickerEnd: { // 日期选择范围
                disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                }
            }
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData,
            programList: state => state.order.programList
        })
    },
    methods: {
        ...mapActions({ getOrderDetailData: 'getOrderDetailData' }),
        opendialog() {
            this.checkedAllProgramList()
        },
        checkedAllProgramList() {
            this.programList.map(res => {
                this.$nextTick(function() {
                    this.$refs && this.$refs.table.toggleRowSelection(res, true)
                })
            })
        }
    }
}
</script>
