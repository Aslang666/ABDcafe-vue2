<template>
	<view class="container">
		<view class="bg" />

		<view class="tabs">
			<van-tabs :active="status" @change="(val)=>onChangeTab(val)" title-active-color="#0037ae" color="#0037ae">
				
				<van-tab title="全部" name="all" />
				<van-tab title="待接单" name="pending" />
				<van-tab title="制作中" name="processing" />
				<van-tab title="已完成" name="completed" />
				<van-tab title="已取消" name="canceled" />
			</van-tabs>
		</view>

		<view class="list">
			<view v-for="(list,index) in orderList" :key="index">
				<view class="card products-card">
					<view class="card-header">
						<text style="flex-grow: 1;">订单号：{{list.order_id}}</text>
						<!-- <text v-if="{{item.status===1}}" bindtap="onReceiveTap" data-oid="{{item.oid}}">确认收货</text> -->
						<text style="margin-right: 24rpx;">{{list.status}}</text>
						<van-icon name="delete-o" size="40rpx" @tap="(val)=>onRemoveOrder(val,list)" />
					</view>
					<view v-for="(item,index) in list.order_items" :key="index">
						<view class="product">
							<image class="product__img" :src="baseUrl+item.drinks.main_image" />
							<view class="product__detail">
								<view>{{item.drinks.name}}</view>
								<view class="product__en-name">{{item.ice_choice}}/{{item.sugar_choice}}</view>
								<view class="product__price">¥{{item.unit_price}}</view>
							</view>
							<view class="product__price">￥{{item.total_price}}</view>
							<view class="product__count">{{item.quantity}}</view>
						</view>
					</view>
				</view>
				<view class="card count-card">
					<view class="date">
						<!-- formatTime({{item.created_at}}) -->
						
					</view>
					<view class="count-text">
						<text class="sum">共计{{list.order_items.length}}件</text>
						<text class="price-sum">合计 ¥50</text>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 48rpx;" />

	</view>
</template>

<script>
	import {formatTime} from '../../utils/util.js'
	import {
		getorder
	} from '../../router/api.js'
	export default {
		data() {
			return {
				baseUrl: 'http://192.168.0.15:8000',
				status: 'pending',
				orders: [],
				orderList: [],
				pending: [],
				processing: [],
				completed: [],
				canceled: []
			}
		},
		methods: {
			onRemoveOrder(e, a) {
				console.log(e, a);
			},
			getOrderList() {
				getorder().then(res => {
					console.log(res.data);
					// this.orderList = res.data
					res.data.forEach(item => {
						this.orderList = []
						this.pending = []
						this.processing = []
						this.completed = []
						this.canceled = []
						switch (item.status) {
							case 'pending':
								this.pending.push(item)
								this.orderList = this.pending
								break;
							case 'processing':
								this.processing.push(item)
								this.orderList = this.processing
								break;
							case 'completed':
								this.completed.push(item)
								this.orderList = this.completed
								break;
							case 'canceled':
								this.canceled.push(item)
								this.orderList = this.canceled
								break;
							case 'all':
								this.orderList = this.canceled
						}
						this.status = item.status
					})
					console.log(this.orderList);
				})
			},
			onChangeTab(event) {
				// const {
				//   index
				// } = event.detail
				console.log(event);
				this.getOrderList()
				// this.getOrders(index)
				// this.setData({activeTab: index})
			},
		
		},
		mounted() {
			this.getOrderList(this.status)

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #f6f6f6;
	}

	.bg {
		background-color: #0037ae;
		height: 200rpx;
		margin-bottom: -50rpx;
		z-index: -1 !important;
	}

	.tabs {
		margin: 0 32rpx;
		border-radius: 24rpx 24rpx 0 0;
		overflow: hidden;
	}

	.card {
		margin: 24rpx;
		padding: 24rpx;
		color: #595a5b;
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
	}

	.card-header {
		display: flex;
		align-items: center;
		font-size: smaller;
	}

	.product {
		display: flex;
		gap: 24rpx;
		margin: 24rpx 0;
	}

	.product__img {
		flex-shrink: 0;
		width: 160rpx;
		height: 160rpx;
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

	.product__count {
		flex-shrink: 0;
		align-self: flex-end;
		font-size: smaller;
		color: #8e8e8e;
	}

	.products-card {
		margin-bottom: 0;
		border-radius: 24rpx 24rpx 0 0;
		border-bottom: 1px dashed #0037ae;
	}

	.count-card {
		border-radius: 24rpx 24rpx 0 0;
		margin-top: 0;
		color: #8e8e8e;
		font-size: smaller;
		border-radius: 0;
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
</style>