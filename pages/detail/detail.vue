<template>
	<view>
		<view class="header">
			<!-- <image class="header__img" :src="baseUrl+product.main_image" mode="widthFix" /> -->
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular indicator-dots="indicatorDots" autoplay="autoplay" interval="interval"
					duration="duration">
					<swiper-item v-for="(banner,index) in product.detail_images" :key="index">
						<view class="swiper-item uni-bg-red">
							<image class="header__img" :src="BASE_URL+banner.image" @click="navto" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="detail-content">
			<view class="detail__title">
				<text class="detail__name">{{product.name}}</text>
				<text class="detail__price">¥ {{product.price}}</text>
			</view>
			<view class="rules">
				<!-- 温度选择器 -->
				<view class="spec" v-if="product">
					<text class="spec__name">温度</text>
					<view class="ec-chioce">
						<view v-for="(item,index) in product.available_ice_choices" :key="index">
							<view
								:class="['ec-chioce-item',form.ice_choice===item.name?'ec-chioce-item--active':'ec-chioce-item']"
								@tap="onTapTempSpec(item)">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
				<!-- 糖度选择器 -->
				<view class="spec" v-if="product">
					<text class="spec__name">糖度</text>
					<view class="ec-chioce">
						<view v-for="(item,index) in product.available_sugar_choices" :key="index">
							<view
								:class="['ec-chioce-item',form.sugar_choice===item.name?'ec-chioce-item--active':'ec-chioce-item']"
								@tap="onTapSugarSpec(item)">
								{{item.name}}
							</view>

						</view>
					</view>
				</view>
				<view class="num-wrapper">
					<text>选择数量</text>
					<van-stepper class="num-stepper" minus-class="num-stepper__minus" plus-class="num-stepper__plus"
						theme="round" button-size="40rpx" :value="form.quantity" @change="onNumChange" />
				</view>
				<view class="desc">
					<view class="desc__title">
						商品描述
					</view>
					<view class="desc__content">
						{{product.description}}
					</view>
				</view>
			</view>
		</view>
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" @click="opensubmit" />
			<van-goods-action-button text="加入购物车" color="#568ae6" type="warning" @click="addcart(form)" />
			<van-goods-action-button text="立即购买" color="#0037ae" />
		</van-goods-action>
		<van-toast id="van-toast" />
		<!-- 		<van-submit-bar price="3050" button-text="提交订单" @submit="onClickButton" v-show="showsubmit">
			<van-tag type="primary">全选</van-tag>
		</van-submit-bar> -->
	</view>
	</view>
</template>

<script>
	import {
		BASE_URL
	} from '../../router/request.js'
	import {
		addCart
	} from '../../router/api.js'
	export default {
		name: 'detail',
		components: {},
		data() {
			return {
				BASE_URL: BASE_URL,
				showsubmit: false,
				current: 0,
				product: {},
				detail: '',
				isLike: false,
				form: {
					drinks: {
						id: '',
						name: '',
						main_image: '',
						price: 0,
						status: ''
					},
					ice_choice: '',
					sugar_choice: '',
					quantity: 1,
					unit_price: 0
				},
				cartitem:[]
			}
		},
		methods: {
			// addToCart(e) {
			// 	addCart(e).then(res => {
			// 		console.log(res)
			// 	})
			// },
			onNumChange(e) {
				console.log(e);
				this.form.quantity = e.detail
				console.log(this.form);
			},
			opensubmit() {
				uni.switchTab({
					url: '/pages//cart/cart'
				})
			},
			addcart(e) {
				console.log(e);
				this.cartitem.push( e)
				addCart(this.cartitem).then(res=>{
					console.log(res)
				})
				// this.addToCart(this.form)
				// uni.navigateBack({
				// 	url: '../menu/menu'
				// })
			},
			onClickButton() {
				console.log('提交订单');
				uni.navigateTo({
					url: '/pages/commit/commit'
				})
			},
			onTapSugarSpec(e) {
				console.log(e);
				// const value = e.currentTarget.dataset.value;
				this.form.sugar_choice = e.name
			},
			onTapTempSpec(e) {
				console.log(e);
				// const value = e.currentTarget.dataset.value;
				this.form.ice_choice = e.name
			},
		},
		mounted() {

		},
		onLoad(options) {
			console.log(JSON.parse(options.drinkdetail));
			this.product = JSON.parse(options.drinkdetail)
			this.form.drinks.id = this.product.id
			this.form.drinks.name = this.product.name
			this.form.drinks.main_image = this.product.main_image
			this.form.drinks.price = this.product.price
			this.form.unit_price = this.product.price
			this.form.drinks.status = this.product.status
			// this.getCoffeeDetail()
			// this.checkIsLike()
			console.log(this.form);
		}

	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 500rpx !important;
	}

	.header__img {
		width: 100%;
		height: 600rpx !important;
	}

	.swiper {
		height: 500px;
		// overflow:hidden; 
	}

	.swiper-item {
		height: 100%;
		width: 100%;
		text-align: center;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail-content {
		position: relative;
		margin: -44rpx 24rpx 0;
		padding: 48rpx 32rpx;
		color: #595a5b;
		background-color: #fff;
		border-radius: 24rpx;
		overflow: hidden;
	}

	.detail__title {
		display: flex;
		justify-content: space-between;
	}

	.detail__name {
		color: #595a5b;
		font-size: large;
	}

	.detail__price {
		color: #0037ae;
		font-size: medium;
		font-weight: bold;
	}

	.detail__en-name {
		color: #8e8e8e;
		font-size: small;
	}

	.rules {
		padding: 16rpx 0;
	}

	.spec {
		display: flex;
		align-items: center;
		margin: 24rpx 0;
	}

	.spec__name {
		width: 124rpx;
	}

	.ec-chioce {
		display: flex;
		gap: 5rpx;
		font-size: small;
	}

	.ec-chioce-item {
		display: flex;
		padding: 0 4rpx;
		min-width: 90rpx;
		height: 25px;
		text-align: center;
		background-color: #e5e5e5;
		border-radius: 999rpx;
		align-items: center;
		justify-content: center;
		font-size: smaller;
	}

	.ec-chioce-item--active {
		color: #fff;
		background-color: #0037ae;
	}

	.desc {
		padding-top: 32rpx;
	}

	.desc__content {
		margin-top: 24rpx;
		color: #8e8e8e;
		font-size: small;
	}

	.num-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 32rpx 0;
		border-top: solid 1px #b8b8b8;
		margin: 20rpx 0;
		border-bottom: solid 1px #b8b8b8;
	}

	.num-stepper__minus {
		color: #0037ae !important;
		border-color: #0037ae !important;
	}

	.num-stepper__plus {
		background-color: #0037ae !important;
	}

	.options {
		margin-bottom: 20rpx;
	}

	.option {
		margin-bottom: 20rpx;
	}

	.submit {
		text-align: center;
	}
</style>