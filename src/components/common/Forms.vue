<template>
    <el-form
        class="padding-top-14"
        :label-position="labelPosition"
        :label-width="labelWidth || '100px'"
        :model="dataForm"
        @keyup.enter.native="searchList()"
        ref="dataForm">
        <div class="search-box">
            <el-form-item
                v-for="(item, index) in showList"
                :key="index"
                :label="`${item.label}:`"
                :label-width="item.width"
                :class="{
                    'order-length-date': item.date,
                    'order-length-deduction': item.deduction,
                    'order-length-type': item.orderType,
                    'order-length-stage': item.stage,
                    'order-length-claim': item.claim,
                    'order-length-finish-claim': item.finishClaim,
                    'order-length-mmodify-price' :item.modifyPrice
                }"
                :prop="`${item.code}`">
                <el-input
                    v-if="item.type === 'input'"
                    v-model="dataForm[item.code]"
                    :clearable="true"
                    :placeholder="`请输入${item.label}${item.extralabel || ''}`"></el-input>
                <el-date-picker
                    v-if="item.type === 'date'"
                    v-model="dataForm[item.code]"
                    :type="!item.flag ? 'daterange' : 'date'"
                    value-format="yyyy-MM-dd"
                    :placeholder="item.flag ? '请选择日期' : ''"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"></el-date-picker>
                <template v-if="item.type === 'radio'">
                    <el-radio
                        v-for="(obj, idx) in item.radioType"
                        :key="idx"
                        v-model="dataForm[item.code]"
                        :label='obj.value'>{{ obj.name }}</el-radio>
                </template>
                <template v-if="item.type === 'select'">
                    <el-select
                        v-model="dataForm[item.code]"
                        style="width:100%"
                        filterable
                        clearable
                        placeholder="请选择">
                        <el-option
                            v-for="obj in item.selectList"
                            :key="obj.id"
                            :label="obj.areaName"
                            :value="obj.id">
                        </el-option>
                    </el-select>
                </template>
                <template v-if="item.type === 'cascader'">
                    <el-cascader
                        v-model="dataForm[item.code]"
                        style="width:100%"
                        change-on-select
                        clearable
                        placeholder="请选择产品"
                        :options="item.cascaderList"
                        filterable></el-cascader>
                </template>
                <template v-if="item.type === 'areaselect'">
                    <area-select :isselectAll="true" :isOrder="true"></area-select>
                </template>
                <!-- 防止单个输入框回车刷新页面 -->
                <input v-if="hiddenInput" id="hiddenText" type="text" style="display:none" />
                <area-select v-if="item.type === 'area'"></area-select>
            </el-form-item>
            </div>
        <el-form-item class="search-btns">
            <el-button type="primary" @click="searchList()">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
             <span  @click="showAll = !showAll" v-show="formList.length >7" class="show-more">
                <i v-show="openOrclose == 1" class="iconfont icon-zhankai"><span class="iconfont-label">展开</span></i>
                <i v-show="openOrclose !== 1" class="iconfont icon-open"><span class="iconfont-label">收起</span></i>
            </span>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import AreaSelect from '@/components/common/AreaSelect.vue'
export default {
    components: {
        AreaSelect
    },
    props: ['labelWidth'],
    data() {
        return {
            key: this.$route.name,
            labelPosition: 'right',
            dataForm: {},
            hiddenInput: false,
            showAll: false,
            formList: []
            // itemList: [                                  // form标签
            //     {
            //         label: '',                           // 标题
            //         code: '',                            // 关键字
            //         type: 'input, date, area, radio',    // form类型
            //         radioType: [{                        // radio参数
            //             name: '',
            //             value: ''
            //         }]
            //     }
            // ]
        }
    },
    computed: {
        ...mapState({ queryData: 'queryCondition' }),
        openOrclose() {
            if(!this.showAll) {
                return 1
            } else {
                return 2
            }
        },
        showList() {
            if (this.showAll) return this.formList
            let showList = []
            if(this.formList.length > 7) {
                for(let i = 0; i < 6; i++) {
                    showList.push(this.formList[i])
                }
            } else {
                showList = this.formList
            }
            return showList
        }
    },
    mounted() {
        let initForm = {}
        let num = 0
        this.formList = this.queryData.query[this.key].dataForm
        this.formList.forEach(item => {
            initForm[item.code] = item.value || item.default || ''
            item.type === 'input' && num++
        })
        if (num === 1) this.hiddenInput = true
        this.dataForm = initForm
    },
    methods: {
        ...mapMutations({ setQuerys: 'SET_QUERYS', setCurrent: 'SET_PAGINATION_CURRENT', setCodeList: 'SET_CODE_LIST' }),
        searchList() {
            let param = { key: this.key, current: 1 }
            this.setCurrent(param)
            this.setQuerys({key: this.key, query: this.dataForm})
            this.$parent.getDataList()
        },
        resetForm() {
            let _self = this
            _self.formList.forEach(item => {
                item.value = item.default || ''
                _self.dataForm[item.code] = item.default || ''
            })
            _self.setCodeList()
            _self.setQuerys({key: _self.key, query: _self.dataForm})
        }
    }
}
</script>
<style lang="scss" scoped>
    .search-box {
        overflow-y: auto;
        @media screen and (max-height: 1080px) {
            max-height: 400px;
        }
        @media screen and (max-height: 768px) {
            max-height: 250px;
        }
    }
    /deep/ .el-radio__label {
        font-weight: normal;
    }
    .order-length-date {
        margin-left: 8px;
    }
    .order-length-deduction {
        width: 52% !important;
    }
    .order-length-type, .order-length-finish-claim {
        width: 42% !important;
    }
    .order-length-stage {
        width: 100% !important;
    }
    .order-length-claim {
        width: 43% !important;
    }
    .order-length-mmodify-price {
        width: 79% !important;
    }
    .show-more {
        color: #409EFF;
        font-size: 12px;
        cursor: pointer;
        padding: 10px;
        .iconfont-label {
            font-size:12px;
            margin-left:3px;
        }
    }
</style>
