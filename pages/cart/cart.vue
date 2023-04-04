<template>
	<view class="container">
		<image class="header-img" src="../../static/cafebg.jpg" mode="widthFix" />
		
		<view class="product-list">
		  <view v-for="(item,index) in content" :key="index">
		    <view class="product">
		      <van-checkbox class="product__checkbox" :value="item.checked" @change="onCheckBoxChange" checked-color="#0037ae" />
		      <image class="product__img" src="../../static/logo.png" mode="aspectFill" />
		      <view class="product__detail">
		        <view class="product__top">
		          <view class="product__name">{{item.name}}</view>
		          <!-- <view class="product__rules">{{item.rule}}</view> -->
		          <!-- <view class="product__delete" @tap="onDeleteProduct"><van-icon name="delete-o" color="#8e8e8e" /></view> -->
		        </view>
		        <!-- <view class="product__en-name">{{item.enname}}</view> -->
		        <view class="product__bottom">
		          <text class="product__price">¥ {{item.price}}</text>
		          <van-stepper class="num-stepper" minus-class="num-stepper__minus" plus-class="num-stepper__plus" theme="round" button-size="40rpx" :value="item.count" @change="onNumChange" />
		        </view>
		      </view>
		    </view>
		  </view>
		  <view class="product-list__footer">
		    哎呀, 没有数据可加载了!
		  </view>
		</view>
<!-- 		
		<van-submit-bar price="riceSum" price-class="submit-price" button-text="提交订单" button-class="submit-btn" @submit="onSubmit" disabled="!selectedCount" tip="true">
		  <van-checkbox value="isSelectAll" @change="onChangeSelectAll" checked-color="#0037ae">全选</van-checkbox>
		</van-submit-bar> -->
		
		<van-toast id="van-toast" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: [{
					name: '流沙美式',
					desc: '深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味',
					price: '11.5',
					checked:false,
					count:1
				},{
					name: '流沙美式',
					desc: '深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味',
					price: '11.5',
					checked:true,
					count:1
				},{
					name: '流沙美式',
					desc: '深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味',
					price: '11.5',
					checked:false,
					count:1
				},{
					name: '流沙美式',
					desc: '深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味',
					price: '11.5',
					checked:false,
					count:1
				},{
					name: '流沙美式',
					desc: '深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味',
					price: '11.5',
					checked:false,
					count:1
				},{
					name: '流沙美式',
					desc: '深度烘焙带来榛果，可可的香浓风味,深感焦糖，黑巧的回味',
					price: '11.5',
					checked:false,
					count:1
				}],
				    selectedCount: 0,
				    isSelectAll: false,
				    priceSum: 0,
			}
		},
		methods: {
			onCheckBoxChange(e){
				console.log("onCheckBoxChange",e);
			},
			onNumChange(e){
				console.log("onNumChange",e);
			},
			onChangeSelectAll(e){
				console.log("onChangeSelectAll",e);
			},
			onSubmit(e){
				console.log("onSubmit",e);
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background-color: #f6f6f6;
}
.header-img{
  width: 100%;
}

.product-list__footer{
  padding: 24rpx 24rpx 136rpx;
  color: #8e8e8e;
  font-size: smaller;
  text-align: center;
}
.product{
  display: flex;
  margin: 24rpx;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
}
.product__checkbox{
  align-self: center;
}
.product__img{
  width: 160rpx;
  height: 160rpx;
}

.product__detail{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 24rpx;
  color: #595a5b;
}

.product__top{
  display: flex;
}
.product__name{
  flex-shrink: 0;
}
.product__rules{
  flex-grow: 1;
  display: inline-block;
  margin-left: 24rpx;
  color: #8e8e8e;
  font-size: small;
}
.product__delete{
  flex-shrink: 0;
}
.product__en-name{
  flex-grow: 1;
  margin-top: 8rpx;
  color: #8e8e8e;
  font-size: smaller;
}
.product__bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product__price{
  color: #0037ae;
  font-size: medium;
  font-weight: bold;
}

.num-stepper__minus{
  color: #0037ae !important;
  border-color: #0037ae !important;
}
.num-stepper__plus{
  background-color: #0037ae !important;
}

.submit-price{
  color: #0037ae !important;
}
.submit-btn{
  background-color: #0037ae !important;
  border-color: #0037ae !important;
}

</style>
