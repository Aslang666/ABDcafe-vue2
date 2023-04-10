<template>
	<view class="container">
		<view class="bg"></view>

		<!-- 		<van-cell-group inset>
		  <van-cell title="修改密码" is-link bindtap="showPasswordPopup" />
		  <van-cell title="注销账号" is-link bindtap="onCancelAccount"/>
		</van-cell-group> -->
		<view class="top">
			<image src="../../static/abd.png" mode=""></image>
		</view>
		<view class="btn">
			<button class="logoutbtn" type="primary" size="large" color="#0037ae" round @click="onLogout">退出登录</button>
		</view>

		<!-- 	<van-popup v-show="passwordPopupShow" closeable position="bottom" @close="onPasswordClose">
		  <view>
		    <view class="password__title">修改密码</view>
		    <van-cell-group class="form" border="{{false}}">
		      <van-field value="{{ originPassword }}" label="旧密码" placeholder="旧密码(首字符必须为字母)" type="{{originPasswordShow?'text':'password'}}" right-icon="{{originPasswordShow?'eye':'closed-eye'}}" bind:click-icon="onTapOriginPasswordShow" />
		
		      <van-field value="{{ newPassword }}" label="新密码" placeholder="新密码(首字符必须为字母)" type="{{newPasswordShow?'text':'password'}}" right-icon="{{newPasswordShow?'eye':'closed-eye'}}" bind:click-icon="onTapNewPasswordShow" />
		    </van-cell-group>
		    <view class="password__btn">
		      <van-button type="primary" size="large" color="#0037ae" round bind:click="onPasswordSubmitTap">提交</van-button>
		    </view>
		  </view>
		</van-popup> -->

		<!-- <van-dialog id="van-dialog" /> -->

	</view>
</template>

<script>
	export default {
		name: 'security',
		data() {
			return {
				passwordPopupShow: false
			}
		},
		methods: {
			onLogout() {
				uni.removeStorageSync('user')
				uni.removeStorageSync('access')
				uni.removeStorageSync('refresh')
				uni.reLaunch({
					url: '../index/index',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
	}

	.top {
		width: 100%;
		height: 300px;
		background: #c5dfff;
		display: flex;
		justify-content: center;
		border-radius: 300px;
		border-bottom-left-radius: 200px;
		border-bottom-right-radius: 200px;

		image {
			width: 300px;
			height: 300px;
		}
	}

	.bg {
		background-color: #0037ae;
		height: 200rpx;
		margin-bottom: -50rpx;
		z-index: -1 !important;
	}

	.password__title {
		margin: 32rpx;
		color: #595a5b;
		font-size: 48rpx;
		font-weight: bold;
	}

	.password__btn {
		margin: 64rpx 32rpx 32rpx;
	}

	.btn {
		padding: 150rpx 32rpx 0;
		background-color: #fff;
		height: 150rpx;
		z-index: 1;
	}

	.logoutbtn {
		background-color: #0037ae;
	}
</style>