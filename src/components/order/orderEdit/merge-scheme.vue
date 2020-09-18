<template>
     <div class="program-show">
        <div class="content" v-show="!isShowAddOrderBtn">
            <div class="left">
                <div class="info-item">
                    <span class="info-label">方案名称：</span><span>{{programDetailObj.name}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">户型：</span><span>{{programDetailObj.specName}}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">面积：</span><span>{{programDetailObj.realArea && programDetailObj.realArea.toFixed(2)}}<span v-show="programDetailObj.realArea">㎡</span></span>
                </div>
            </div>
            <div class="right">
                <div class="info-item">
                    <span class="info-label">渲染图：</span>
                    <viewer class="img-outer-big-box">
                        <img :src="programDetailObj.coverPic" alt="暂无渲染图" />
                    </viewer>
                </div>
            </div>
        </div>
        <div class="no-program" v-show="isShowAddOrderBtn" @click="createOrder('add')">
            <img src="@/assets/img/404.png" alt="">
        </div>
        <div class="bottom">
            <el-button type="primary" v-show="!isShowAddOrderBtn" @click="handleCreateOrder('add')" icon="el-icon-scissors">方案设计</el-button>
            <el-button type="primary" v-show="isShowAddOrderBtn" plain  @click="createOrder('add')" icon="el-icon-plus">新增方案</el-button>
            <el-button type="primary"  @click="arraignmentProgram()" plain icon="el-icon-refresh">更换关联方案</el-button>
        </div>
        <el-dialog
            title="关联方案"
            :visible.sync="bindProgramVisible"
            :append-to-body="true"
            :modal-append-to-body='false'
            width="50%">
            <el-row>
                <el-col :span="24">
                    <el-table :data="programList" border height="373">
                        <el-table-column type="index" label="序号" width="80">
                            <template slot-scope="scope">
                                <span>{{scope.$index + 1 + orderPagaination.size * (orderPagaination.current - 1)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="specName" label="户型" width="150"></el-table-column>
                        <el-table-column prop="modifiedTime" label="更新日期" width="130">
                            <template slot-scope="scope">
                                <span>{{moment(scope.row.modifiedTime).format('YYYY-MM-DD')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="x" label="操作">
                            <template slot-scope="scope">
                                <span>
                                    <el-button type="text" size="small" icon='el-icon-link' @click="bindProgram(scope.row)" v-show="scope.row.bindStatus === 0">关联</el-button>
                                    <el-button type="text" size="small" icon='el-icon-link' @click="unBindDesignProgram(scope.row)" v-show="scope.row.bindStatus === 2">取消关联</el-button>
                                    <span style="margin-left:7px" v-show="scope.row.bindStatus === 2">已关联</span>
                                    <span v-show="scope.row.bindStatus === 1">其他订单关联</span>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeOrderChange"
                        @current-change="handleCurrentOrderChange"
                        :current-page="orderPagaination.current"
                        :page-sizes="[10, 20, 50]"
                        :page-size="orderPagaination.size"
                        v-show="total >= 20"
                        layout="total, sizes, prev, pager, next, jumper"
                        style="margin-top:10px"
                        :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="bindProgramVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { programDetail, designProgram, designProgramList, unBindProgram, programBind } from '@/api/order'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'mergeScheme',
    data() {
        return {
            programDetailObj: {
                name: '',           // 方案名称
                realArea: '',       // 面积
                specName: '',       // 户型名称
                coverPic: ''        // 渲染图
            },
            orderPagaination: {     // 方案列表分页
                current: 1,
                size: 20
            },
            orderId: this.$route.params.orderId,
            total: 0,
            programList: [],        // 方案列表
            bindProgramVisible: false,              // 弹窗样式
            isShowAddOrderBtn: false                // 是否绑定方案
        }
    },
    computed: {
        ...mapState({
            orderDetailData: state => state.order.orderDetailData
        })
    },
    watch: {
        'orderDetailData.designId': {
            handler: function (val, oldval) {
                this.init()
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({ getDetailData: 'getOrderDetailData' }),
        // 初始化方法
        init() {
            if(this.orderDetailData.designId) {
                this.isShowAddOrderBtn = false
                this.getProgramDetail(this.orderDetailData.designId)
            } else {
                this.isShowAddOrderBtn = true
            }
        },
        // 获取方案详情
        getProgramDetail(designId) {
            programDetail({ designId }).then(result => {
                this.programDetailObj = { ...result.data }
            })
        },
        // 跳转酷家乐
        createOrder() {
            let dest = 4        // 0：校验通过后会跳转到户型的创建页面, 4 直接跳酷家乐方案
            designProgram({dest}).then(result => {
                window.open(result.data)
            })
        },
        // 方案设计
        handleCreateOrder() {
            if (this.orderDetailData.designId) {
                let dest = 1    // 1： 检验通过后跳转到该制定方案的工具编辑页面
                designProgram({dest, designid: this.orderDetailData.designId}).then(result => {
                    window.open(result.data)
                })
            } else {
                this.$message.warning('操作失败')
            }
        },
        // 获取方案列表
        getProgramList() {
            let query = Object.assign({orderId: this.orderId}, this.orderPagaination)
            designProgramList(query).then(result => {
                this.total = result.data.total
                this.programList = result.data.records
            })
        },
        // 更换方案
        arraignmentProgram() {
            this.bindProgramVisible = true
            this.getProgramList()
        },
        // 关联方案
        bindProgram(data) {
            let designId = data.designId
            this.bindDesignId = data.designId
            let orderId = this.orderId
            if(designId && designId !== 'NODID') {
                programBind({ designId, orderId }).then(result => {
                    this.$message.success('方案关联成功')
                    this.getDetailData({orderId})
                    this.getProgramList()
                    this.getProgramDetail(designId)
                    this.DesignId = designId
                    this.hasDesignId = true
                    this.isShowAddOrderBtn = false
                })
            }
        },
        // 取消关联方案
        unBindDesignProgram(data) {
            let designId = data.designId
            let orderId = this.orderId
            unBindProgram({ designId, orderId }).then(result => {
                this.$message.success('方案取消成功')
                this.getDetailData({orderId})
                this.getProgramList()
                this.isShowAddOrderBtn = true
            })
        },
        // 弹窗分页操作
        handleSizeOrderChange(val) {
            this.orderPagaination.size = val
            this.getProgramList()
        },
        handleCurrentOrderChange(val) {
            this.orderPagaination.current = val
            this.getProgramList()
        }
    }
}
</script>

<style scoped lang='scss'>
    .program-show {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 600px;
        overflow: auto;
        .content {
            display: flex;
            justify-content: space-between;
            height: 80%;
            .left, .right {
                .info-item {
                    height: 40px;
                    .info-label {
                        display: inline-block;
                        width: 74px;
                        text-align: right;
                        font-size: 14px;
                        color: $disabledColor;
                        margin-right: 5px;
                    }
                }
            }
            .right {
                width: 74%;
                height: 100%;
                display: flex;
                .img-outer-big-box {
                    width: 100%;
                }
                img {
                    width: 50%;
                    height: 50%;
                }
            }
        }
        .no-program {
            height: 60%;
            margin:auto;
            cursor: pointer;
        }
        .bottom {
            height: 20%;
            margin: auto;
        }
    }
</style>
