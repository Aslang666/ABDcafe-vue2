<template>
	<view class="container">
		<view class="image" v-for="(item,index) in activity.detail_images" :key ="index">
		<image :src="BASE_URL+item.image" mode="widthFix"></image>
			
		</view>
	</view>
</template>

<script>
	import {BASE_URL} from '../../router/request.js'
	export default {
		data() {
			return {
				BASE_URL:BASE_URL,
				activity:{}
			}
		},
		methods: {
			
		},
		onLoad(options) {
			console.log(JSON.parse(options.detail));
			this.activity = JSON.parse(options.detail)
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: auto;
	}
	.image{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
		}
	}
</style>
