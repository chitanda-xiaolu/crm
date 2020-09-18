
<template>
	<div class="logContainer">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<a target="_blank">
				<icon-svg icon-class="iconGithub" />
				</a>
				<span>项目更新日志：</span>
			</div>
			<div class="wrapper" ref="wrapper">
				<div class="logArea el-scrollbar">
					<div class="item" v-for="(item,index) in logsData" :key="index">
						<p class="timeArea">
							<span class="title">日期：</span>
							<span class="title time">{{item.createTime}}</span>
						</p>
						<div class="logContent">
							<p class="title">更新内容：</p>
							<ul class="logUl">
								<li v-for="(citem,cindex) in item.data" :key="cindex">{{citem}}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script>
import logsData from '../../assets/datas/logs.json'
import { handleScrollPage } from '@/utils/scroll'
export default {
    name: 'logList',
    data() {
        return {
            logsData: logsData.data
        }
    },
    mounted() {
        handleScrollPage(this.$refs.wrapper)
    }
}
</script>

<style lang="scss" scoped>
	.wrapper {
		overflow: hidden;
	}
	.logContainer{
		padding: 10px;
		background: #fff;
		box-sizing: border-box;
		height:370px;
		max-height: 370px;
		overflow: hidden;
		border-radius: 6px;
		.logArea{
			height: 100%;
		}
		.item{
			.title{
				 font-size: 14px;
			}
			.time{
				color:#87DE75;
			}
			.logContent {
				.logUl {
					padding-left: 30px;
					li {
						font-size: 12px;
						list-style: disc;
						line-height: 20px;
					}
				}
			}
		}
	}
	.clearfix:before, .clearfix:after {
		display: table;
		content: "";
	}
	/deep/ .el-card__body {
		height: 80%;
	}
	.clearfix:after {
		clear: both
	}
</style>
