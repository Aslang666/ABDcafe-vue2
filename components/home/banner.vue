<template>
	<view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
				:interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in activities" :key="index"  >
					<view class="swiper-item uni-bg-red" @click="navto(item)">
							<image :src="BASE_URL+item.main_image" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script >
	import {getActivities} from '../../router/api.js'
	import {BASE_URL} from '../../router/request.js'
	export default {
		name:"banner",
		data() {
			return {
				BASE_URL:BASE_URL,
				duration: 500,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				activities:[],
				list1: [
					'../../static/banner2.jpg',
					'../../static/banner1.jpg',
					'../../static/banner3.jpg',
				],
			};
		},
		methods: {
			navto(a) {
				console.log(a);
				uni.navigateTo({
					url: '../ads/ads?detail='+JSON.stringify(a)
				})
			}
		},
		mounted() {
			getActivities().then(res=>{
				console.log(res);
				this.activities = res.data
			})
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 530px;
	}
	.swiper-item {
		height: 100%;
		width: 100%;
		text-align: center;
		image{
			width: 100%;
			height: 100%;
		}
	}

</style>