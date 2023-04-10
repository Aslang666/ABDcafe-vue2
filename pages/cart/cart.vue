<template>
	<view class="container">
		<view v-if="token">
			<image class="header-img" src="../../static/cafebg.jpg" mode="widthFix" />
			<view class="product-list">
				<view v-for="(item,index) in content" :key="index">
					<view class="product">
						<van-checkbox class="product__checkbox" :value="item.checked"
							@change="(val)=>onCheckBoxChange(val,item)" checked-color="#0037ae" />
						<image class="product__img" :src="item.drinks.main_image" mode="aspectFill" />
						<view class="product__detail">
							<view class="product__top">
								<view class="product__name">{{item.drinks.name}}</view>
								<view class="product__rules">{{item.ice_choice}}/{{item.sugar_choice}}</view>
								<view class="product__delete" @tap="(val)=>onDeleteProduct(val,item)"><van-icon
										name="delete-o" color="#8e8e8e" /></view>
							</view>
							<view class="product__bottom">
								<text class="product__price">¥ {{item.unit_price}}</text>
								<van-stepper class="num-stepper" minus-class="num-stepper__minus"
									plus-class="num-stepper__plus" theme="round" button-size="40rpx"
									:value="item.quantity" @change="(val)=>onNumChange(val,item)" />
							</view>
						</view>
					</view>
				</view>
				<view class="product-list__footer">
					哎呀, 没有数据可加载了!
				</view>
			</view>

			<van-submit-bar :price="priceSum" price-class="submit-price" button-text="提交订单" button-class="submit-btn"
				@submit="onSubmit" :disabled="tocommit">
				<van-checkbox :value="isSelectAll" @change="onChangeSelectAll" checked-color="#0037ae">全选</van-checkbox>
			</van-submit-bar>
			<van-toast id="van-toast" />
		</view>
		<view class="no_address" v-else>
			<view class="no_img">
				<image class="" src="../../static/nologin.png"></image>
			</view>
			<view class="no_text">
				<span>您尚未登录账号</span>
				<span>请先登录</span>
				<button @click="toLogin">跳转登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCart
	} from '../../router/api.js'
	export default {
		data() {
			return {
				tocommit: true,
				token: uni.getStorageSync('access'),
				content: [{
					id: 1,
					drinks: {
						id: 1,
						name: '流沙美式',
						main_image: '../../static/logo.png',
						price: 11.5,
						status: 'available'
					},
					ice_choice: '加冰',
					sugar_choice: '正常糖',
					unit_price: 11.5,
					checked: false,
					quantity: 1,
					total_price: 11.5
				}, {
					id: 2,
					drinks: {
						id: 1,
						name: '流沙美式',
						main_image: '../../static/logo.png',
						price: 11.5,
						status: 'available'
					},
					ice_choice: '加冰',
					sugar_choice: '正常糖',
					unit_price: 11.5,
					checked: false,
					quantity: 1,
					total_price: 11.5
				}, {
					id: 3,
					drinks: {
						id: 1,
						name: '流沙美式',
						main_image: '../../static/logo.png',
						price: 11.5,
						status: 'available'
					},
					ice_choice: '加冰',
					sugar_choice: '正常糖',
					unit_price: 11.5,
					checked: false,
					quantity: 1,
					total_price: 11.5
				}, {
					id: 4,
					drinks: {
						id: 1,
						name: '流沙美式',
						main_image: '../../static/logo.png',
						price: 11.5,
						status: 'available'
					},
					ice_choice: '加冰',
					sugar_choice: '正常糖',
					unit_price: 11.5,
					checked: false,
					quantity: 1,
					total_price: 11.5
				}],
				selectedCount: 0,
				isSelectAll: false,
				priceSum: 0,
				order: {
					address: {},
					order_items: {
						drinks: []
					},
					total_price:'',
					status:''
				}
			}
		},
		mounted() {
			getCart().then(res => {
				console.log(res)
			})
		},
		methods: {

			onCheckBoxChange(e, a) {
				console.log("onCheckBoxChange", e, a);
				this.priceSum = 0
				this.tocommit = true
				this.content.forEach(item => {
					if (item.id === a.id) {
						item.checked = e.detail
					}
					if (item.checked === true) {
						this.tocommit = false
						this.priceSum += item.total_price * 100
						console.log(this.priceSum);
						this.order.total_price = this.priceSum
						// total_price
					}
				})

			},
			onNumChange(e, a) {
				console.log("onNumChange", e, a);
				this.priceSum = 0
				this.tocommit = true
				this.content.forEach(item => {
					if (item.id === a.id) {
						item.quantity = e.detail
						item.total_price = item.quantity * item.unit_price
						console.log(item);
					}
					if (item.checked === true) {
						this.tocommit = false
						this.priceSum += item.total_price * 100
						console.log(this.priceSum);
						this.order.total_price = this.priceSum
					}
				})

			},
			onChangeSelectAll(e) {
				console.log("onChangeSelectAll", e);
				this.isSelectAll = e.detail
				this.priceSum = 0
				this.tocommit = true
				this.content.forEach(item => {
					item.checked = e.detail
					if (item.checked === true) {
						this.tocommit = false
						this.priceSum += item.total_price * 100
						console.log(this.priceSum);
						this.order.total_price = this.priceSum
					}
				})
			},
			onDeleteProduct(e, a) {
				console.log(e, a);
			},
			onSubmit(e) {
				console.log("onSubmit", e);
				let list = this.content.filter(item => {
					return item.checked === true
				})
				this.order.order_items = list
				console.log(this.order);
				uni.navigateTo({
					url: `/pages/commit/commit?order=${JSON.stringify(this.order)}`,
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f6f6f6;
	}

	.header-img {
		width: 100%;
	}

	.product-list__footer {
		padding: 24rpx 24rpx 136rpx;
		color: #8e8e8e;
		font-size: smaller;
		text-align: center;
	}

	.product {
		display: flex;
		margin: 24rpx;
		padding: 24rpx;
		background-color: #fff;
		border-radius: 24rpx;
	}

	.product__checkbox {
		align-self: center;
	}

	.product__img {
		width: 120rpx;
		height: 120rpx;
	}

	.product__detail {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		margin-left: 24rpx;
		color: #595a5b;
	}

	.product__top {
		display: flex;
		align-items: center;
	}

	.product__name {
		flex-shrink: 0;
	}

	.product__rules {
		flex-grow: 1;
		display: inline-block;
		margin-left: 24rpx;
		color: #8e8e8e;
		font-size: small;
	}

	.product__delete {
		flex-shrink: 0;

	}

	.product__en-name {
		flex-grow: 1;
		margin-top: 8rpx;
		color: #8e8e8e;
		font-size: smaller;
	}

	.product__bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.product__price {
		color: #0037ae;
		font-size: medium;
		font-weight: bold;
	}

	.num-stepper__minus {
		color: #0037ae !important;
		border-color: #0037ae !important;
	}

	.num-stepper__plus {
		background-color: #0037ae !important;
	}

	.submit-price {
		color: #0037ae !important;
	}

	.submit-btn {
		background-color: #0037ae !important;
		border-color: #0037ae !important;
	}

	.no_address {
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.no_img {
			display: flex;
			justify-content: center;
			width: 340px;
			height: 340px;
			margin: auto;

			image {
				width: 340px;
				height: 340px;
			}
		}

		.no_text {
			margin-top: -40px;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;
			text-align: center;
			color: #595a5b;
			font-weight: 600;
			font-size: 18px;

			text {
				color: #0037ae;
			}

			button {
				color: #fff;
				background-color: #0037ae;
			}
		}
	}
</style>