<template>
	<view class="area-selector">
		<view style="display: flex; flex-direction: column; gap: 24rpx;padding-top:24rpx;">
			<van-cell-group inset>
				<van-field label="姓名" :value="address.name" @change="onNameChange" placeholder="收货人姓名" />
				<van-field label="电话" :value="address.phone" @change="onPhoneChange" placeholder="收货人手机号" />
				<van-field :value="address.region" is-link readonly label="地区" placeholder="请选择所在地区"
					@tap="showAddrPicker" />
				<van-field label="详细地址" :value="address.address" @change="onAddressChange"
					placeholder="街道门牌、楼层房间号等信息" />
			</van-cell-group>

			<van-cell-group inset>
				<van-cell title="设为默认收货地址" center>
					<van-switch slot="right-icon" :checked="address.is_default" @change="onDefaultChange"
						active-color="#0037ae" size="48rpx" />
				</van-cell>
			</van-cell-group>

			<view style="margin: 48rpx 24rpx 0; " v-if="show">
				<van-button type="primary" size="large" color="#0037ae" round
					@click="saveAddr(address)">保存地址</van-button>
					<van-button type="primary" size="large" color="#cf4347" round
						@click="sureDel(address)">删除地址</van-button>
			</view>
			<view style="margin: 48rpx 24rpx 0;" v-else>
				<van-button type="primary" size="large" color="#0037ae" round
					@click="add(address)">添加地址</van-button>
			</view>

		</view>
		<van-popup :show="addrPickerShow" round position="bottom" :value="fieldValue">

			<van-cascader v-if="addrPickerShow" title="请选择所在地区" :options="columns" @close="onClose" @finish="onFinish"
				:value="cascaderValue" />
		</van-popup>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import columns from '../../utils/region.js';
	import {
		updateAddr,
		addAddr,
		delAddr
	} from '../../router/api.js'
	export default {
		data() {
			return {
				addrPickerShow: false,
				columns: columns,
				fieldValue: '',
				cascaderValue: '',
				isDefault: false,
				id:0,
				address: {
					name: '',
					phone: '',
					region: '',
					address: '',
					is_default: false
				},
				show: true
			}
		},
		onLoad(options) {
			console.log(options);
			if (options.e) {
				this.show = true
				console.log(JSON.parse(options.e));
				this.address = JSON.parse(options.e)
			} else {
				this.address = {}
				this.show = false
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
				console.log(e);
				const {
					selectedOptions,
					value
				} = e.detail;
				this.address.region = selectedOptions
					.map((option) => option.text || option.name)
					.join('/');
				this.cascaderValue = value
				this.addrPickerShow = false
				console.log(this.address.region);
			},
			onDefaultChange(e) {
				console.log(e);
				this.address.is_default = e.detail
			},
			onNameChange(e) {
				console.log(e);
				this.address.name = e.detail
			},
			onPhoneChange(e) {
				console.log(e);
				this.address.phone = e.detail
			},
			onAddressChange(e) {
				console.log(e);
				this.address.address = e.detail
			},
			saveAddr(e) {
				console.log('保存地址', e);
				let addresses = {
					action: 'update',
					data: e
				}
				// addresses.push(e)
				updateAddr(addresses).then(res => {
					console.log(res);
					uni.redirectTo({
						url: '../address/address'
					})
				})
			},
			add(e) {
				console.log(e);
				let addresses = {
					action: 'create',
					data: e
				}
				addAddr(addresses).then(res => {
					console.log(res);
					uni.redirectTo({
						url: '../address/address'
					})
				})
			},
			sureDel(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除该地址吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('确定');
							console.log(e);
							let addresses = {
								action: 'delete',
								data: e
							}
								delAddr(addresses).then(res => {
									console.log(res);
									uni.redirectTo({
										url: '../address/address'
									})
								})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}

		}
	}
</script>