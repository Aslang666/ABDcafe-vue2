<template>
	<view class="container">
		<view class="sidebar">
			<scroll-view class="sidebar-content" scroll-y="true" @catchtouchmove="stopPropagation">
				<view v-for="(item, index) in menuList" :key="index" class="sidebar-item"
					:class="{active: activeIndex === index}" @click="switchTab(index)">
					{{ item.name }}
				</view>
			</scroll-view>
		</view>
		<view class="main">
			<scroll-view class="main-content" scroll-y="true" :scroll-top="scrollTop" @catchtouchmove="stopPropagation"
				@scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper" scroll-with-animation="true">
				<view v-for="(item, index) in menuList" :key="index" class="tab-item"
					:class="{active: activeIndex === index}">
					<view class="product-list">
						<view class="banner">
							<span>{{item.name}}</span>
							<image src="../../static/cafebg.jpg" mode=""></image>
						</view>
						<view v-for="(list,index) in item.drinks" :key="index">
							<view class="product" @click="(val)=>tapToDetail(val,list)">
								<view class="product__img">
									<image class="img" :src="BASE_URL+list.main_image" />
								</view>
								<view class="product__names">
									<view class="product__zh-name">{{list.name}}</view>
									<view class="product__en-name">{{list.description}}</view>
								</view>
								<view class="product__price">¥ {{list.price}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getDrinks,
		getDrinksCategory
	} from '../../router/api.js';
	import {BASE_URL} from '../../router/request.js'
	export default {
		data() {
			return {
				BASE_URL:BASE_URL,
				drinks: [],
				categories: [],
				menuList: [],
				activeIndex: 0,
				scrollTop: 0,
				contentHeight: 0,
				access: uni.getStorageSync('access')
			}
		},
		// watch:{
		// 	access:{
		// 		handler(newName, oldName){
		// 			this.getDrinkList()
		// 			console.log(newName);
		// 			setTimeout(() => {
		// 				this.$router.go(0)
		// 			}, 500)
		// 		},
		// 		immediate: true
		// 	}
		// },
		mounted() {
			// getDrinks(this.access).then(res => {
			// 	this.menuList = res.data
			// 	console.log(this.menuList);
			// })
			this.getDrinkList()
		},
		methods: {
			getDrinkList(){
				getDrinks().then(res => {
					this.menuList = res.data
					console.log(this.menuList);
				})
			},
			switchTab(index) {
				this.activeIndex = index
			},
			stopPropagation(event) {
				event.stopPropagation()
			},
			scrollToLower() {
				const currentIndex = this.activeIndex
				if (currentIndex < this.menuList.length - 1) {
					setTimeout(
						function() {
							this.activeIndex = currentIndex + 1
						}, 500);
				}
			},
			scrollToUpper() {
				const currentIndex = this.activeIndex
				if (currentIndex > 0) {
					setTimeout(function() {
						this.activeIndex = currentIndex - 1
					}, 500);

				}
			},
			tapToDetail(e, a) {
				console.log(e, a);
				uni.navigateTo({
					url: '/pages/detail/detail?drinkdetail=' + JSON.stringify(a)
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}

	.sidebar {
		width: 100px;
		/* background-color: #f7f7f7; */
		border-right: 2px solid #d0d0d0;
	}

	.sidebar-content {
		height: 100%;
	}

	.sidebar-item {
		height: 50px;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
	}

	.sidebar-item.active {
		background-color: #0d39a9;
		// border-right: 2px solid #0d39a9;
		color: #fff;
		font-weight: 600;
		padding-left: 2px;
	}

	.main {
		flex: 1;
		// padding: 20px;
		// background-color: #f11;
	}

	.main-content {
		height: 100%;
	}

	.tab-item {
		display: none;
	}

	.tab-item.active {
		display: block;
	}

	.product-list {
		overflow: auto;
		padding: 24rpx;
	}

	.product {
		display: flex;
		align-items: center;
		gap: 24rpx;
		margin: 24rpx 0;
		color: #595a5b;
		background-color: #fff;
	}

	.banner {
		span {
			font-weight: bold;
			margin-bottom: 24rpx;
		}

		image {
			width: 100%;
			height: 200rpx;
		}
	}

	.product__img {
		width: 150rpx;
		height: 150rpx;

		.img {
			width: 150rpx !important;
			height: 150rpx !important;
		}
	}

	.product__names {
		flex-grow: 1;
	}

	.product__zh-name {
		font-weight: bold;
		color: #111;
	}

	.product__en-name {
		font-size: small;
		// width:200px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.product__price {
		flex-shrink: 0;
		color: #0037ae;
		font-weight: bold;
	}
</style>