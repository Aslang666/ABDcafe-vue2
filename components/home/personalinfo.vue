<template>
	<view class="">
		<view class="container2" v-if="access">
			<view class="block" @click="tomenu">
				<view class="left">
					
				<view class="avatar">
					<!-- <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"> -->
					<image :src="user.avatarUrl" mode=""></image>
					<!-- </button> -->
					
					<!-- <image src="../../static/cafe.png" mode=""></image> -->
				</view>
				</view>
				<view class="hello">
					<span>
					你好呀，{{user.username}}!
					</span>
					<span>一起享受美妙的咖啡之旅吧~</span>
				</view>
				
			</view>
		</view>
		<view class="container" v-else>
			<view class="block">
				<view class="left">
					<view class="text">
						<span>SHARE</span>
						<span>TOGETHER</span>
					</view>
				</view>
				<view class="right">
					<button class="login_btn" @click="navto">注册/登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
	return{
		access: uni.getStorageSync('access'),
		user : uni.getStorageSync('user')
	}},

	methods:{
		navto(){
			uni.reLaunch({
				url: '../login/login',
				animationType: 'pop-in',
				animationDuration: 200
			})
		},
		tomenu(){
			uni.switchTab({
				url: '../personal/personal'
			})
		},
		mounted(){
		}
		
	}
}
	  // const onChooseAvatar = (e) => {
	  //   const { avatarUrl } = e.detail 
	  //   this.setData({
	  //     avatarUrl,
	  //   })
	  // }

</script>

<style lang="scss" scocped>
	.container{
		background: #cf4347;
		width: 90%;
		height: 60px;
		display: flex;
		color: #fff;
		margin: auto;
		padding: 2vw;
		margin-top: 20px;

		.block{
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;

			.left {
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				text-align: left;
				font-size: 20px;
				font-weight: 800;

				.text {
					display: flex;
					align-items: flex-start;
					flex-direction: column;
				}

				image {
					width: 30px;
					height: 30px;
				}
			}

			.right {
				.login_btn {
					background-color: #002fa5;
					color: #fff;
					border: 2px solid #fff;
					border-radius: 0px !important;
				}
			}
		}
	}
	.container2{
		background: #cf4347;
		width: 90%;
		height: 60px;
		display: flex;
		color: #fff;
		margin: auto;
		padding: 2vw;
		margin-top: 20px;
		.block{
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
			.left{
				width: 20%;
				display: flex;
				align-items: center;
				font-weight: 800;
				justify-content: center;
				.avatar{
					// width: 20% !important;
					height: 40px;
					width:40px;
					border: solid 1px #fff;
					image{
						height: 40px;
						width: 40px;
				}
			}
			}
			.hello{
				width: 80%;
				display: flex;
				flex-direction: column;
			}
			.right {
				.login_btn {
					background-color: #002fa5;
					color: #fff;
					border: 2px solid #fff;
					border-radius: 0px !important;
				}
			}
			
	}
	}
</style>