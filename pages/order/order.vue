<template>
	<view class="container">
		<view class="bg" />

		<!-- 		<view class="tabs">
		  <van-tabs active="{{ activeTab }}" @change="onChangeTab" title-active-color="#0037ae" color="#0037ae">
		    <van-tab title="全部" name="all" />
		    <van-tab title="进行中" name="ing" />
		    <van-tab title="已完成" name="done" />
		  </van-tabs>
		</view> -->

		<view class="list">
			<view v-for="item in 3" :key="item">
				<view class="card products-card">
					<view class="card-header">
						<text style="flex-grow: 1;">NO.213553525</text>
								        <!-- <text v-if="{{item.status===1}}" bindtap="onReceiveTap" data-oid="{{item.oid}}">确认收货</text> -->
		        <text style="margin-right: 24rpx;">已完成</text>
		        <van-icon name="delete-o" size="40rpx" @tap="(val)=>onRemoveOrder(val,item)"/>
					</view>
					<view v-for="item in 3" :key="item">	
						<view class="product">
							<image class="product__img" src="../../static/abd.png" mode="widthFix" />
							<view class="product__detail">
								<view>生椰拿铁<text class="product__rule">少冰/少糖</text></view>
								<view class="product__en-name">yo</view>
								<view class="product__price">¥23</view>
							</view>
							<view class="product__count">4</view>
						</view>
					</view>
				</view>
				<view class="card count-card">
					<view class="date">2023年4月3日16：24</view>
					<view class="count-text">
						<text class="sum">共计3 件</text>
						<text class="price-sum">合计 ¥50</text>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 48rpx;" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				orders: [],
			}
		},
		methods: {
			onRemoveOrder(e,a){
				console.log(e,a);
			}
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
		width: 172rpx;
		height: 172rpx;
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