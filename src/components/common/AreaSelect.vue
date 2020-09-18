<!--
 * @Description: 地区选择下拉组件
 * @Author: Zale Ying
 * @Date: 2019-12-02 09:40:19
 * @LastEditTime: 2020-05-07 14:17:12
 * @LastEditors: 陈桃
 -->
<template>
    <el-cascader
        ref="areaCascader"
        :props="props"
        filterable
        v-model="selectedOptions"
        :clearable="true"
        @change="handleChange($event)">
    </el-cascader>
</template>

<script>
import { areaCode } from '@/api/app'
import { mapState, mapMutations } from 'vuex'
export default {
    props: ['isAdd', 'isselectAll', 'isOrder'],
    data() {
        let _self = this
        return {
            selectedOptions: [],                                              // 默认值
            props: {                                                          // 配置省市区下拉
                lazy: true,
                checkStrictly: !_self.isselectAll,
                lazyLoad (node, resolve) {
                    let { level } = node
                    let param = level ? { parentId: node.value } : ''
                    areaCode(param).then(result => {
                        if (result.code === 200 && result.success) {
                            let nodes = Array.from(result.data)
                                .map(item => ({
                                    value: item.id,
                                    label: item.name,
                                    leaf: _self.isOrder ? (level >= 1) : (level >= 2)
                                }))
                            _self.options = nodes
                            resolve(nodes)                                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                        } else {
                            _self.$message({
                                message: result.message || '请求错误',
                                type: 'error',
                                duration: 3 * 1000
                            })
                            // eslint-disable-next-line
                            reject()
                        }
                    })
                }
            },
            options: []
        }
    },
    mounted() {
        if(this.isAdd) {
            this.selectedOptions = []
        } else {
            this.selectedOptions = this.appData.codeList ? this.appData.codeList : []
        }
    },
    computed: {
        ...mapState({appData: 'app'})
    },
    watch: {
        selectedOptions (newVal) {
            this.$emit('change', newVal)
        }
    },
    methods: {
        ...mapMutations({ setCodeList: 'SET_CODE_LIST', setAreaName: 'SET_AREA_NAME' }),
        handleChange(value) {
            if (this.$route.path === '/order') this.$parent.form.model.areaCode = value
            if (this.$route.path === '/housingEstate/add') this.$parent.form.model.code = value
            this.$emit('change', value)
            let iValue = value.slice(-1)[0]
            if (iValue === this.appData.codeList.slice(-1)[0]) return    // 过滤相同选择
            this.setCodeList(value)
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value === iValue) {
                    this.setAreaName(this.options[i].label)
                    break
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-cascader-menu__wrap {
        height: 400px
    }
</style>
