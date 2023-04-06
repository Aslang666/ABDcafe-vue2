<template>
	<view class="area-selector">
		<view style="display: flex; flex-direction: column; gap: 24rpx;padding-top:24rpx;">
			<van-cell-group inset>
				<van-field label="姓名" placeholder="收货人姓名" />
				<van-field label="电话" placeholder="收货人手机号" />
				<van-field :value="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区"
					@tap="showAddrPicker" />
				<van-field label="详细地址" placeholder="街道门牌、楼层房间号等信息" />
			</van-cell-group>

			<van-cell-group inset>
				<van-cell title="设为默认收货地址" center>
					<van-switch slot="right-icon" :checked="isDefault" @change="onDefaultChange"
						active-color="#0037ae" size="48rpx" />
				</van-cell>
			</van-cell-group>

			<view style="margin: 48rpx 24rpx 0;">
				<van-button type="primary" size="large" color="#0037ae" round @click="saveAddr">保存地址</van-button>
			</view>


	</view>
	<van-popup :show="addrPickerShow" round position="bottom" :value="fieldValue">

		<van-cascader v-if="addrPickerShow" title="请选择所在地区" :options="columns" @close="onClose" @finish="onFinish"
			:value="cascaderValue" />
	</van-popup>
	</view>
</template>

<script>
	import columns from '../../utils/region.js';
	export default {
		data() {
			return {
				addrPickerShow: false,
				columns: columns,
				fieldValue: '',
				cascaderValue: '',
				isDefault:true
			}
		},
		methods: {
			showAddrPicker() {
				console.log(this.addrPickerShow);
				this.addrPickerShow = true
			},
			onClose() {
				this.addrPickerShow = false

			},
			onFinish(e) {

				const {
					selectedOptions,
					value
				} = e.detail;
				this.fieldValue = selectedOptions
					.map((option) => option.text || option.name)
					.join('/');
				this.cascaderValue = value
				this.addrPickerShow = false
				console.log(this.fieldValue);
			},
			  onDefaultChange(e) {
				  console.log(e);
			    this.isDefault = e.detail
			    
			  },
			  saveAddr(e){
				  console.log('保存地址',e);
			  }
		}
	}
</script>