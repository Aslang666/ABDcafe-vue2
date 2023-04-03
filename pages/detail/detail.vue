<template>
	<view>
		<view class="header">
		  <image class="header__img" src="../../static/star.jpg" mode="widthFix" />
		</view>
		
		<view class="detail-content">
		  <view class="detail__title">
		    <text class="detail__name">{{product}}</text>
		    <text class="detail__price">¥ 13</text>
		  </view>
		  <view class="detail__en-name">{{product}}</view>
		
		  <view class="rules">
		    <!-- 温度选择器 -->
		    <view class="spec" v-if="product">
		      <text class="spec__name">温度</text>
		      <view class="ec-chioce">
		        <view v-for="(item,index) in 1" :key="index">
		          <!-- <view class="{{['ec-chioce-item', form.tem===item?'ec-chioce-item--active':'']}}"> -->
					  <view class="ec-chioce-item ec-chioce-item--active">
		            冷
		          </view>
		        </view>
		      </view>
		    </view>
		    <!-- 糖度选择器 -->
		    <view class="spec" v-if="product">
		      <text class="spec__name">糖度</text>
		      <view class="ec-chioce">
		        <view v-for="(item,index) in sugar" :key="index">
		          <view class="ec-chioce-item, ec-chioce-item--active" >
		            {{item.name}}
		          </view>
		        </view>
		      </view>
		    </view> 
		  </view>
		  <!-- <ec-line /> -->
		  <view class="num-wrapper">
		    <text>选择数量</text>
		    <van-stepper class="num-stepper" minus-class="num-stepper__minus" plus-class="num-stepper__plus" theme="round" button-size="40rpx" value="1" @change="onNumChange(e)" />
		  </view>
		  <!-- <ec-line /> -->
		  <view class="desc">
		    <view class="desc__title">
		      商品描述
		    </view>
		    <view class="desc__content">
		      深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味
		    </view>
		  </view>
		<!-- </view> -->
		<view style="height: 124rpx;" />
		
		<van-goods-action>
		  <van-goods-action-icon icon="chat-o" text="购物袋"/>
		  <!-- <van-goods-action-icon icon="cart-o" text="isLike?'已':'未'收藏" /> -->
		  <van-goods-action-button text="加入购物袋" color="#568ae6" type="warning"  />
		  <van-goods-action-button text="立即购买" color="#0037ae"  />
		</van-goods-action>
		
		<van-toast id="van-toast" />
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product:{},
				    detail: '',
				    isLike: false,
				    form: {
				      tem: '冷',
				      sugar: '',
				      count: 1
				    },
					sugar:[{
						id:0,
						name:'多糖'
					},{
						id:1,
						name:'正常糖'
					},{
						id:2,
						name:'半糖'
					},{
						id:3,
						name:'无糖'
					}]
			}
		},
		methods: {
			onNumChange(e) {
				console.log(e);
			    this.form.count =e
			},
		},
		mounted() {

		},
		onLoad(options) {
			console.log(options.productid);
			this.product = options.productid
			    // this.getCoffeeDetail()
			    // this.checkIsLike()
		}
	}
</script>

<style lang="scss" scoped>
.header__img{
  width: 100%;
}

.detail-content{
  position: relative;
  margin: -64rpx 24rpx 0;
  padding: 48rpx 32rpx;
  color: #595a5b;
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
}

.detail__title{
  display: flex;
  justify-content: space-between;
}
.detail__name{
  color: #595a5b;
  font-size: large;
}
.detail__price{
  color: #0037ae;
  font-size: medium;
  font-weight: bold;
}
.detail__en-name{
  color: #8e8e8e;
  font-size: small;
}

.rules{
  padding: 16rpx 0;
}
.spec{
  display: flex;
  align-items: center;
  margin: 24rpx 0;
}
.spec__name{
  width: 124rpx;
}

.ec-chioce{
  display: flex;
  // gap: 24rpx;
  font-size: small;
}
.ec-chioce-item{
  padding: 8rpx 0;
  min-width: 124rpx;
  text-align: center;
  background-color: #e5e5e5;
  border-radius: 999rpx;
}
.ec-chioce-item--active{
  color: #fff;
  background-color: #0037ae;
}

.desc{
  padding-top: 32rpx;
}
.desc__content{
  margin-top: 24rpx;
  color: #8e8e8e;
  font-size: small;
}

.num-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 0;
  border-top: solid 1px #b8b8b8;
  border-bottom: solid 1px #b8b8b8;
}
.num-stepper__minus{
  color: #0037ae !important;
  border-color: #0037ae !important;
}
.num-stepper__plus{
  background-color: #0037ae !important;
}

</style>
