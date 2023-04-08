<template>
	<view>
		<view class="bg"/>
		<van-cell-group inset>
		  <van-cell title="头像" center>
		    <view slot="right-icon">
		      <image style="width: 80rpx; border-radius: 100%;" src="../../static/loginbg.jpg" mode="widthFix"/>
		    </view>
		  </van-cell>
		  <van-cell title="用户id" :value="id" />
		  <van-cell title="昵称" :value="nickName" />
		  <van-cell title="简介" :value="desc||'这家伙很懒, 什么都没有留下! '" />
		</van-cell-group>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:1,
				nickName:'Aslang'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.bg {
  background-color: #0037ae;
  height: 200rpx;
  margin-bottom: -50rpx;
}

</style>
