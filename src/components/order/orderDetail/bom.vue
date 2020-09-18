<template>
    <el-dialog
        title="工件bom清单"
        :visible.sync="bomDialogVisible"
        :append-to-body="true"
        :modal-append-to-body='false'
        @opne="openDialog"
        width="65%">
        <el-table
            :data="bomTableList"
            height="450"
            border ref="table">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="Matname" label="材料"></el-table-column>
            <el-table-column prop="DetailName" label="部件名称" width="100"></el-table-column>
            <el-table-column prop="Barcode" label="部件编码"></el-table-column>
            <el-table-column prop="Length" label="长度" width="90"></el-table-column>
            <el-table-column prop="Width" label="宽度" width="90"></el-table-column>
            <el-table-column prop="Cnt" label="数量" width="70"></el-table-column>
            <el-table-column prop="Matgrid" label="纹理方向" width="80"></el-table-column>
            <el-table-column prop="Prfid1" label="封边信息" ></el-table-column>
            <el-table-column prop="Info2" label="打孔信息" width="100"></el-table-column>
            <el-table-column prop="Info3" label="备注"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="() => bomDialogVisible = false">知道了</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { bomList } from '@/api/order'
export default {
    name: 'addFinishProductDialog',
    data() {
        return {
            bomDialogVisible: false,
            bomTableList: []
        }
    },
    methods: {
        openDialog(data) {
            let productionOrderId = data.productionOrderId
            this.bomDialogVisible = true
            bomList({ productionOrderId }).then(result => {
                if(result.code === 200 && result.success) {
                    if(result.data) {
                        this.bomTableList = JSON.parse(result.data)
                    }
                }
            })
        }
    }
}
</script>
