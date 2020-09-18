<template>
    <el-row :gutter="20">
  <el-col :span="5">
    <el-card shadow="hover" style="height: 1000px">
      <div class="title">
        <div class="header">
          <h3>{{ supplierName }}</h3>
          <el-link type="primary" @click="editSupplier">编辑</el-link>
        </div>
        <div class="sup-info">
          <span><i class="el-icon-phone" style="color: #66b1ff"></i>{{ supplierPhone }}</span>
          <span><i class="el-icon-edit-outline" style="color: #66b1ff"></i>备注</span>
        </div>
      </div>
      <div class="line1"></div>
      <el-divider content-position="left">基础信息</el-divider>
      <div class="info-item">
        <span class="info-label">供应商名称: </span><span>{{ supplierMan }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">供应商编码: </span><span>{{ supplierCode }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">付款方式: </span><span>{{ supplierPay }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">联系方式: </span><span>{{ supplierPhone }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">供应商评级: </span><span>{{ supplierRate }}</span>
      </div>
      <div class="line1"></div>
      <el-divider content-position="left">系统信息</el-divider>
      <div class="info-item">
        <span class="info-label">创建人: </span><span>不知道是谁</span>
      </div>
      <div class="info-item">
        <span class="info-label">创建日期: </span><span>2020-09-08</span>
      </div>
    </el-card>
    </el-col>
  <el-col :span="19">
    <el-card shadow="hover" style="height: 1000px">
      <el-row>
        <el-col :span="24" style="margin-bottom: 20px">
          <el-button size="mini" @click="addProduction()"><i class="el-icon-plus"></i>新增</el-button>
          </el-col>
        <el-col :span="24">
          <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="productCode"
        label="产品编号">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productBrand"
        label="产品品牌">
      </el-table-column>
      <el-table-column
        label="产品展示">
        <template slot-scope="props">
          <el-link :href="props.row.productUrl" target="_blank" type="primary">{{ props.row.productName+'展示' }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="productType"
        label="产品类型">
      </el-table-column>
      <el-table-column
        prop="productTime"
        label="创建日期">
      </el-table-column>
      <el-table-column
        label="编辑">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
        </el-col>
      </el-row>
    </el-card>
    </el-col>
    <add-or-update ref="addOrUpdate"></add-or-update>
    <produc-add-or-update  ref="ProductionAddOrUpdate"></produc-add-or-update>
</el-row>
</template>

<script>
import { supplierDetail, productionList } from '@/api/supplier'
import { mapState, mapMutations } from 'vuex'
import AddOrUpdate from '@/components/supplier/supplier-add-update'
import ProducAddOrUpdate from '@/components/supplier/production-add-update'
export default {
    data() {
        return {
            // 供应商
            supplierMan: '',
            supplierName: '',
            supplierPay: '',
            supplierPhone: '',
            supplierRate: '',
            supplierRegion: '',
            supplierCode: '',
            createtime: '',
            tableData: [], // 供应商详细信息数组
            codeList: []
        }
    },
    methods: {
        // SET_CODE_LIST为store app模块中的方法
        ...mapMutations({ setDialogStatus: 'SET_SUPPLIER_DIALOGSTATUS', setDialogStatus2: 'SET_PODUCTION_DIALOGSTATUS', setCodeList: 'SET_CODE_LIST' }),
        init() {
            let _self = this
            if(_self.$route.params) {
                supplierDetail(_self.$route.params).then(result => {
                    if (result.code === 200 && result.success) {
                        let data = result.data
                        for (let i in _self._data) {
                            _self[i] = data[i]
                        }
                        _self.supplierMan = data.supplierMan
                        _self.supplierName = data.supplierName
                        _self.supplierPay = data.supplierPay
                        _self.supplierPhone = data.supplierPhone
                        _self.supplierRate = data.supplierRate
                        _self.supplierRegion = data.supplierRegion
                        _self.supplierCode = data.supplierCode
                        _self.createtime = data.createtime
                        _self.codeList = []
                        _self.codeList.push(data.provinceCode)
                        data.cityCode && _self.codeList.push(data.cityCode)
                        data.countyCode && _self.codeList.push(data.countyCode)
                        _self.$emit('areaInfo', _self.areaName)
                    } else {
                        _self.$message.error(result.message || '服务器异常')
                    }
                })
                productionList(_self.$route.params).then(result => {
                    if (result.code === 200 && result.success) {
                        let data = result.data
                        this.tableData = data.records
                        console.log(data)
                        console.log(this.tableData)
                    } else {
                        _self.$message.error(result.message || '服务器异常')
                    }
                })
            }
        },
        editSupplier() {
            console.log(this._data)
            this.$refs.addOrUpdate.editAction(this._data)
            this.setCodeList(this.codeList)
            this.setDialogStatus(true)
        },
        addProduction() {
            this.setDialogStatus2(true)
        },
        editProduction () {
            this.setDialogStatus2(true)
        }
    },
    watch: {
        '$route' (to, from) {
            if(to.meta.title === '供应商商详情') {
                this.init()
            }
        }
    },
    components: {
        AddOrUpdate,
        ProducAddOrUpdate
    },
    computed: {
        ...mapState({ queryData: 'queryCondition', appData: 'app' })
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 15px;
  h3 {
    margin-right: 10px;
  }
}
.title {
  margin-bottom: 20px;
  .sup-info {
    display: flex;
    flex-direction: column;
    height: 40px;
    justify-content: space-between
  }
}
.line {
  width: 280px;
  height: 1px;
  background: #606266;
}

.info-item {
  margin-bottom: 20px;
  font-size: 14px;
  color: #606266e6
}
</style>
