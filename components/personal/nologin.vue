<template>
	<view>
		<view class="content">
			<view class="user_orange">
			</view>
				<view class="tips">
					<image src="../../static/nologin.png" mode=""></image>
					<span>
					尚无权限，请先登录
					</span>
				</view>
				<button class="login_btn" @click="tologin">跳转登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"nologin",
		data() {
			return {
				
			};
		},
		methods: {
			tologin(){
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	// .user_orange{
	// 	height: 1vh;
	// 	background: #fda366;
	// 	border-bottom-right-radius: 45%;
	// 	border-bottom-left-radius: 45%;
	// 	box-shadow: 0px 0px 100px 100px #fda366;
	// 	z-index: -1;
	// 	margin-top: -10px;
	// }
	.tips{
		margin: 24vw 0 10vw 0vw;
		display: flex;
		align-items: center;
		flex-direction: column;
		image{
			// width: 184px;
			// height: 129px;
		}
		span{
			font-size: 18px;
			font-weight: 600;
			color: #0037ae;
			border-bottom: solid 3px #0037ae;
			padding: 12px 15px;
			border-radius: 25px;
		}
	}
	.login_btn {
		width: 240rpx;
		background-color: #e1effd;
		line-height: 60rpx;
		color: #0037ae;
		font-weight: 600;
		border: solid 1px #0037ae;
		margin-top: 8vw;
	}
</style>