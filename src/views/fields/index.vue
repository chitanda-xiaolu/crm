<template>
    <div class="main-box dis-flex-row">
        <div class="main-box-right user-list">
            <area-detail />
        </div>
    </div>
</template>
<script>
import AreaDetail from '@/components/fields/areaDetail'
export default {
    components: {
        AreaDetail
    }
}
</script>
<style scoped lang="scss">
 @import '../../assets/scss/fields/index';
</style>
