<template>
	<view class="container">
		<view class="bg" />

		<view class="tabs">
			<van-tabs :active="status" @change="(val)=>onChangeTab(val)" title-active-color="#0037ae" color="#0037ae">
				<van-tab title="全部" name="all" />
				<van-tab title="制作中" name="pending" />
				<!-- <van-tab title="制作中" name="processing" /> -->
				<van-tab title="已完成" name="completed" />
				<van-tab title="已取消" name="canceled" />
			</van-tabs>
		</view>

		<view class="list" v-if="orderList.length">
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
							<image class="product__img" :src="BASE_URL+item.drinks.main_image" />
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
				{{list.created_at| formatDate}}
					</view>
					<view class="count-text">
						<text class="sum">共计{{list.order_items.length}}件</text>
						<text class="price-sum">合计 ¥50</text>
					</view>
				</view>
			</view>
		</view>
<view class="no_address" v-else>
			<view class="no_img">
			  <image class="" src="../../static/nodata.png"></image>
			</view>
			<view class="no_text">
				<span>这里空荡荡哦~</span> 
			</view>
		</view>
		<view style="height: 48rpx;" />

	</view>
</template>

<script>
	// import {
	// 	formatTime
	// } from '../../utils/util.js'
	import moment from 'moment'
	import {
		BASE_URL
	} from '../../router/request.js'
	import {
		getorder
	} from '../../router/api.js'
	export default {
		data() {
			return {
				BASE_URL: BASE_URL,
				status: 'all',
				orderList: [],
			}
		},
		methods: {
			onRemoveOrder(e, a) {
				console.log(e, a);
			},
			getOrderList(a) {
				this.status = a
				this.orderList = []
				getorder().then(res => {
					res.data.forEach(item => {
						if (a === 'all') {
							this.orderList = res.data
						} else if (a === 'pending') {
							if (item.status === 'pending') {
								this.orderList.push(item)
							} else if (item.status === 'processing') {
								this.orderList.push(item)
							}
						} else if (a === 'completed') {
							if (item.status === a)  this.orderList.push(item)
						} else if (a === 'canceled') {
							if (item.status === a) this.orderList.push(item)
						}
					})
				console.log(this.orderList);
				})
			},
			onChangeTab(event) {
				this.getOrderList(event.detail.name)
			},

		},
		mounted() {
			this.getOrderList('all')
		},
		filters:{
			  formatDate(value) {
			    if (value == '') {
			        return ''
			    }
				return moment(value).format('YYYY-MM-DD HH:mm:ss'); 
			// formatDate(time) {
			//   var json_date = new Date(time).toJSON();
			//   return new Date(new Date(json_date) + 6 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
			// }
		}
	}}
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
	.no_address{
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.no_img{
			display: flex;
			justify-content: center;
			width: 340px;
			height: 340px;
			margin: auto ;
			image{
			width: 340px;
			height: 340px;	
			}
		}
		.no_text{
			margin-top: -40px;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;
			text-align: center;
			color: #595a5b;
			font-weight: 600;
			font-size: 18px;
			text{
				color: #0037ae;
			}
			button{
				color: #fff;
				background-color: #0037ae;
			}
		}}
</style>