<!--
 * @Description: 产品参数配置
 * @Author: 陈桃
 * @Date: 2020-04-20 15:59:31
 * @LastEditTime: 2020-04-23 16:18:17
 * @LastEditors: 陈桃
 -->
<template>
    <div class="main-box dis-flex-col" style="overflow: auto;">
        <el-tabs type="border-card">
            <el-tab-pane label="产品分类">
                <product-class />
            </el-tab-pane>
            <el-tab-pane label="定制产品类型与KJL对照表">
                <class-kjl />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import productClass  from '@/components/pconfig/product/index'
import classKjl  from '@/components/pconfig/kjl/index'
export default {
    name: 'pconfig',
    components: { productClass, classKjl },
    data() {
        return {
        }
    }
}
</script>

<style scoped lang='scss'>

</style>
