<template>
	<view class="content">
		<banner></banner>
		<ways></ways>
		<personalinfo></personalinfo>
	</view>
</template>

<script>
import banner from '../../components/home/banner.vue'
import ways from '../../components/home/ways.vue'
import personalinfo from '../../components/home/personalinfo.vue'
export default {
	components:{
		banner,
		ways,
		personalinfo
	},
		data() {
			return {
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		margin-bottom: 50px;
	}

</style>
