<template>
    <div class="timeline-wrapper clearfix">
        <div class="timeline-content-day" v-if="steps.length">
            <div class="timeline-line"></div>
            <div class="timeline-content-item" v-for="(item, idx) in defaultSteps" ref="timeItem" :key="idx" :class="{'active': idx === steps.length-1}" @mouseenter="mouseEnter(idx)" @mouseleave="mouseLeave(idx)">
                <span :class="{'o-span': idx < steps.length-1}">{{item.stageName}}</span>
                <p :class="{'o-span': idx < steps.length-1}">{{item.startTime}}</p>
                <div class="timeline-content-item-reveal">
                    <a href="#">
                        <img :src="stepImgs[idx]" />
                        <span v-if="orderDetailData.stage === item.stage">{{steps[steps.length-1]['statusData'][steps[steps.length-1]['statusData'].length-1]['statusName']}}({{item.startTime.slice(-5).replace(/-/g, '/')}})</span>
                        <span v-else-if="idx < steps.length-1">已{{item.stageName}}</span>
                        <span v-else>待{{item.stageName}}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import step1 from '@/assets/img/step1.jpg'
import step2 from '@/assets/img/step2.jpg'
import step3 from '@/assets/img/step3.jpg'
import step4 from '@/assets/img/step4.jpg'
import step5 from '@/assets/img/step5.jpg'
import step6 from '@/assets/img/step6.jpg'
// import step7 from '@/assets/img/step7.jpg'
import step8 from '@/assets/img/step8.jpg'
import step9 from '@/assets/img/step9.jpg'
import step10 from '@/assets/img/step10.jpg'
import { mapState } from 'vuex'
export default {
    name: 'orderProductionProcess',
    data () {
        return {
            defaultSteps: [
                {
                    stage: 1100,
                    stageName: '设计',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 1300,
                    stageName: '初审',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 1500,
                    stageName: '终审',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 1700,
                    stageName: '核价',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 1900,
                    stageName: '扣款',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 2100,
                    stageName: '生产',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 2500,
                    stageName: '计划发货',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }, {
                    stage: 2900,
                    stageName: '签收',
                    stageState: '',
                    startTime: '',
                    statusData: []
                }
            ],
            steps: [],
            stepImgs: [step1, step2, step3, step4, step5, step6, step8, step10, step9]
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    watch: {
        'orderDetailData.stage': {
            handler: function (val, oldval) {
                this.sliceSteps(this.orderDetailData.steps, val)
            }
        }
    },
    mounted() {
        if (!this.orderDetailData.status) return
        this.sliceSteps(this.orderDetailData.steps, this.orderDetailData.stage)
    },
    methods: {
        sliceSteps(arr, stage) {
            this.steps.length = 0
            if (arr instanceof Array) {
                let isTrue
                // 数据合并
                for (let i = 0, len = arr.length; i < len; i++) {
                    if (!isTrue) {
                        this.defaultSteps[i] = {
                            ...arr[i]
                        }
                        this.$set(this.steps, i, this.defaultSteps[i])
                    }
                    if (arr[i].stage === stage) {          // 最终所处的状态的对象
                        isTrue = true
                    }
                }
            }
        },
        mouseEnter(num) {
            if(num === this.steps.length - 1) return
            this.$refs.timeItem[num].classList.add('active')
        },
        mouseLeave(num) {
            if(num === this.steps.length - 1) return
            this.$refs.timeItem[num].classList.remove('active')
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../../assets/scss/order/order_detail/detail_steps';
</style>
