<template>
	<view>
		<view class="card">
			<view @click="onAddressPickerOpen">
				<text>选择地址</text>
				<van-icon name="arrow" color="#8e8e8e" />
			</view>
			<view class="address__content address__view">
				<view class="address__info" style="display: flex; gap: 32rpx;">
					<view style="color: #0037ae; font-weight: bold;">{{selectAddr.name}}</view>
					<view>{{selectAddr.phone}}</view>
					<view class="address__default" v-if="selectAddr.is_default">默认</view>
				</view>
				<text class="address__addr">{{selectAddr.region}}{{selectAddr.address}}</text>
			</view>
		</view>

		<view class="card products-card">
			<text>订单信息</text>
			<view v-for="(item,index) in order.order_items" :key="index">
				<view class="product">
					<image class="product__img" src="../../static/abd.png" mode="widthFix" />
					<view class="product__detail">
						<view> {{item.drinks.name}} <text
								class="product__rule">{{item.ice_choice}}/{{item.sugar_choice}} </text>
							<text class="unit_price"> ¥{{item.unit_price}}</text>
						</view>
						<view class="product__price">¥ {{item.total_price}}</view>
					</view>
					<!-- <text class="total_price">¥ {{item.total_price}}</text> -->
					<view class="product__count">x{{item.quantity}}</view>
				</view>
			</view>
		</view>

		<view class="card count-card">
			<view class="date">{{date}}</view>
			<view class="count-text">
				<text class="sum">共计 {{length}} 件</text>
				<text class="price-sum">合计 ¥{{(order.total_price)/100}}</text>
			</view>
		</view>

		<view style="height: 136rpx;" />

		<view class="bottom-bar">
			<van-button type="primary" size="large" color="#0037ae" round @click="onCommitTap">立即结算</van-button>
		</view>

		<van-popup :show="addressPickerShow" position="bottom" closeable @close="onAddressPickerClose">
			<view class="address-wrapper">
				<view class="address__title">选择地址</view>
				<view v-for="(one,index) in addressList" :key="index">
					<view class="address" :data-address="one" @tap="(val)=>onCheckBoxChange(val)">
						<van-checkbox class="address__checkbox" @change="(val,index)=>onCheckChange(val,index)"
							:value="checkedAddrIndex==index+1 " checked-color="#0037ae" />
						<view class="address__content">
							<text class="address__info">{{one.name}} {{one.phone}} <text v-if="one.isDefault"
									class="address__default">默认</text></text>
							<text class="address__addr">{{one.region}}{{one.address}}</text>
						</view>
					</view>
				</view>
				<van-button class="address__new" type="primary" size="large" color="#0037ae" round
					@click="onNewAddressTap">新增地址</van-button>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import util from '../../utils/util'
	import {
		getinfo,
		addOrder
	} from '../../router/api.js'
	export default {
		data() {
			return {
				addressPickerShow: false,
				order: {

				},
				length: 0,
				date: util.formatTime(new Date()),
				addressList: [],
				checkedAddrIndex: 1,
				selectAddr: {}
			}
		},
		methods: {
			onAddressPickerOpen() {

				this.addressPickerShow = true
			},
			onAddressPickerClose() {
				this.addressPickerShow = false
			},
			onCheckBoxChange(e, a) {
				console.log(e);
				console.log(e.currentTarget.dataset);
				console.log(this.checkedAddrIndex);
				this.checkedAddrIndex = e.currentTarget.dataset.address.id
				this.selectAddr = e.currentTarget.dataset.address
			},
			onCheckChange(e) {
				console.log(e);
			},
			onCommitTap() {
				console.log(this.order);
				// addOrder(this.order).then(res => {
				// 	console.log(res);
				// })
				// uni.navigateTo({
				// 	url: '/pages/order/order'
				// })
			},
			// 新增地址
			onNewAddressTap() {
				uni.redirectTo({
					url: '/pages/editaddr/editaddr'
				})
			}
		},
		onLoad(option) {
			console.log(option.order);
			this.order = JSON.parse(option.order)
			console.log(this.order);
			this.length = this.order.order_items.length
		},
		mounted() {
			getinfo().then(res => {
				// console.log(res);
				this.addressList = res.data.addresses
				this.selectAddr = this.addressList[0]
				this.order.address = this.selectAddr
				// console.log(this.selectAddr);
			})
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		margin: 24rpx;
		padding: 24rpx;
		color: #595a5b;
		background-color: #fff;
		border-radius: 24rpx;
	}

	.van-icon {
		display: inline-block;
		color: #8e8e8e;
		margin-left: 16rpx;
	}

	.product {
		display: flex;
		gap: 24rpx;
		margin: 24rpx 0;
	}

	.product__img {
		flex-shrink: 0;
		width: 172rpx;
	}

	.product__detail {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.product__rule {
		margin-left: 16rpx;
		color: #8e8e8e;
		font-size: smaller;
		vertical-align: top;
	}

	.unit_price {
		margin-left: 20rpx;
		color: #0037ae;
		font-size: smaller;
		vertical-align: top;
		font-weight: bold;
	}

	.product__en-name {
		flex-grow: 1;
		color: #8e8e8e;
		font-size: small;
		max-width: 400rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.product__price {
		color: #0037ae;
		font-weight: bold;
	}

	.total_price {
		color: #0037ae;
		font-weight: bold;
		font-size: normal;
	}

	.product__count {
		flex-shrink: 0;
		align-self: flex-end;
		font-size: smaller;
		color: #8e8e8e;
	}

	.products-card {
		margin-bottom: 0;
		border-radius: 24rpx 24rpx 0 0;
	}

	.count-card {
		margin-top: 0;
		border-radius: 0 0 24rpx 24rpx;
		color: #8e8e8e;
		font-size: smaller;
	}

	.date {
		color: #595a5b;
	}

	.count-text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;
	}

	.price-sum {
		color: #0037ae;
		font-size: medium;
		font-weight: bold;
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0rpx 24rpx 32rpx;
	}

	.address-wrapper {
		padding: 32rpx;
	}

	.address__title {
		margin: 0 0 32rpx;
		color: #595a5b;
		font-size: 40rpx;
		font-weight: bold;
	}

	.address__new {
		margin-top: 32rpx;
	}

	.address {
		display: flex;
		align-items: center;
		padding: 24rpx 0;
	}

	.address__checkbox {
		flex-shrink: 0;
	}

	.address__content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 16rpx;
	}

	.address__default {
		display: inline-block;
		padding: 0 16rpx;
		text-align: center;
		vertical-align: middle;
		color: #fff;
		font-size: smaller;
		background-color: #0037ae;
		border-radius: 999rpx;
	}

	.address__addr {
		font-size: smaller;
		color: #595a5b;
	}

	.address__view {
		padding-top: 24rpx;
	}
</style>