export const BASE_URL = 'http://127.0.0.1:8000'
// const BASE_URL = 'http://192.168.0.15:8000'
const refresh = uni.getStorageSync('refresh')
// // 通过export向外暴露一个方法，方法名叫myRequest,调用myRequest方法时会向方法中传递一个对象options
export const request = (options) => {
	return new Promise((resolve, reject) => { // 异步处理的封装通过promise比较好，并且要return出去，
		uni.request({ // 在回调函数中处理异步请求
			url: BASE_URL + options.url, // 将接口地址分为两部分，这样如果域名改变了好维护，接口地址从options中获取
			method: options.method || 'GET', // 方法从options中获取，如果没有传入method，则默认为GET，
			data: options.data || {}, // data从options中获取，如果没有传入data， 则默认一个空对象
			header: options.headers || {},
			success: (res) => { // 用箭头函数，res是返回来的数据
				// console.log(options.data);
				if (res.statusCode == 200) { // 如果请求失败，则给一个提示
					resolve(res) //如果请求成功，调用resolve返回数据
				} else if (res.statusCode == 401) {
					if (res.data.extra.token_message == "Token is invalid or expired") {
						uni.request({
							url: BASE_URL + '/api/accounts/token/',
							method: 'POST',
							data: {
								refresh: refresh
							},
							success(res) {
								console.log(res);
								uni.setStorageSync('access', res.data.access)
								console.log(uni.getStorageSync('access'));
							}
						})
					return uni.showModal({
						title: '提示',
						content: '数据貌似发生了变化，请重新刷新页面~',
						success: function(res) {
							if (res.confirm) {
								console.log('确定');
								uni.reLaunch({

									url: '/pages/index/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					}
				} else if (res.statusCode == 400) {
					console.log(res);
					return uni.showToast({
						title: res.data.message,
						duration: 1500,
						icon: "none"
					})
				} else {
					return uni.showToast({
						title: '获取数据失败！',
						duration: 1500,
						icon: "none"
					})
				}
			},
			fail: (err) => { // err 是返回来的错误信息
				uni.showToast({ // 给一个消息提示
					title: '请求接口失败！'
				})
				reject(err) // 调用reject方法把错误消息返回出去
			}

		})
	})
}