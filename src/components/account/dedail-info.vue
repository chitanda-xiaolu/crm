<template>
   <div class="info-list">
        <el-divider content-position="left">基础信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row class="info-content">
            <el-col :span="8">
                <span>经销商编号:</span>
                <span>{{ code }}</span>
            </el-col>
            <el-col :span="8">
                <span>所在区域:</span>
                <span>{{ areaName }}</span>
            </el-col>
            <el-col :span="8">
                <span>代理地点:</span>
                <span>{{ agentAddress }}</span>
            </el-col>
        </el-row>
        <el-row class="info-content">
            <el-col :span="8">
                <span>负责人:</span>
                <span>{{ name }}</span>
            </el-col>
            <el-col :span="8">
                <span>负责人手机:</span>
                <span>{{ phone }}</span>
            </el-col>
            <el-col :span="8">
                <span>加盟日期:</span>
                <span>{{ DWY_UTILS.getTimeYMD(joinTime) }}</span>
            </el-col>
        </el-row>
        <el-row class="info-content">
            <el-col :span="8">
                <span>招商员工:</span>
                <span>{{ businessName }}</span>
            </el-col>
            <el-col :span="8">
                <span>经营类型:</span>
                <span>{{ type === 1 ? '直营' : '加盟' }}</span>
            </el-col>
            <el-col :span="8">
                <span>经营状态:</span>
                <span>{{ status===0 ? '启用' : '禁用'}}</span>
            </el-col>
        </el-row>
        <el-divider content-position="left">系统信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row class="info-content">
            <el-col :span="8">
                <span>创建人:</span>
                <span>{{ createUser }}</span>
            </el-col>
            <el-col :span="8">
                <span>创建时间:</span>
                <span>{{ DWY_UTILS.getTimeYMD(createTime) }}</span>
            </el-col>
        </el-row>
        <el-row class="info-content">
            <el-col :span="8">
                <span>更新人:</span>
                <span>{{ updateUser }}</span>
            </el-col>
            <el-col :span="8">
                <span>更新时间:</span>
                <span>{{ DWY_UTILS.getTimeYMD(updateTime) }}</span>
            </el-col>
        </el-row>
        <el-divider content-position="left">关联信息<i class="el-icon-thumb thumb"></i></el-divider>
        <el-row class="info-content">
            <el-col class="width-all">
                <span>所属片区:</span>
                <span>{{ regionName }}</span>
            </el-col>
        </el-row>
        <el-button class="edit-position" type="warning" plain @click="editDealer">编辑</el-button>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update ref="addOrUpdate"></add-or-update>
    </div>
</template>
<script>
import { dealerDetail } from '@/api/dealer'
import AddOrUpdate from '@/components/dealer/dealer-add-update'
import { mapMutations } from 'vuex'
export default {
    components: {
        AddOrUpdate
    },
    data() {
        return {
            id: '',
            code: '',
            regionName: '',             // 所在片区
            agentAddress: '',           // 代理地址
            name: '',                   // 负责人
            phone: '',                  // 负责人手机
            joinTime: '',
            businessName: '',           // 招商员工
            businessId: '',
            type: 1,                    // 经销商类型 1 直营 2 加盟
            status: 0,                  // 经销商状态 0 启用 1 禁用
            createUser: '',
            createTime: '',
            updateUser: '',
            updateTime: '',
            areaName: '',
            codeList: []
        }
    },
    watch: {
        '$route' (to, from) {
            if(to.meta.title === '经销商详情') {
                this.init()
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapMutations({ setDialogStatus: 'SET_DIALOGSTATUS', setCodeList: 'SET_CODE_LIST' }),
        init() {
            let _self = this
            if(_self.$route.params.disId) {
                dealerDetail({id: _self.$route.params.disId}).then(result => {
                    if (result.code === 200 && result.success) {
                        let data = result.data
                        for (let i in _self._data) {
                            _self[i] = data[i]
                        }
                        _self.codeList = []
                        _self.codeList.push(data.provinceCode)
                        data.cityCode && _self.codeList.push(data.cityCode)
                        data.countyCode && _self.codeList.push(data.countyCode)
                        _self.$emit('areaInfo', _self.areaName)
                    } else {
                        _self.$message.error(result.message || '服务器异常')
                    }
                })
            }
        },
        editDealer() {
            this.$refs.addOrUpdate.editAction(this._data)
            this.setCodeList(this.codeList)
            this.setDialogStatus(true)
        }
    }
}
</script>

<style scoped lang='scss'>
    .info-list {
        width: 95%;
        height: auto;
        margin: 0 auto;
        position: relative;
        &>.info-content {
            width: 85%;
            @include marginDbl(30px, auto);
            &>.el-col {
                width: 33%;
                span {
                    display: inline-block;
                    width: 100px;
                }
                span:nth-child(1) {
                    text-align: right;
                }
                span:nth-child(2) {
                    @include paddingLeft(25px);
                    width: calc(100% - 125px);
                }
            }
        }
        .edit-position {
            position: absolute;
            top: 3px;
            right:0;
        }
        .width-all {
            width: 100% !important;
        }
    }
</style>
