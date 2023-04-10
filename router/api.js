import {request} from './request.js'

// 登录
export const wxlogin = (code) => request({
  url: `/api/accounts/login/`,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data:{
  	  code
  }
})

// 用户信息
export const getinfo = () => request({
  url: `/api/accounts/info/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'get',
})


// 获取饮品菜单
export const getDrinks = () => request({
  url: `/api/product/drinks/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'get',
})

// 获取购物车
export const getCart = () => request({
  url: `/api/cart/cart/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'get',
})

// 添加到购物车
export const addCart = (cart_items) => request({
  url: `/api/cart/cart/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'put',
  data:{
	  cart_items
	}
})

// 修改地址
export const updateAddr = (addresses) => request({
  url: `/api/accounts/info/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'put',
  data:{
	  addresses
  }
})

// 添加地址
export const addAddr = (addresses) => request({
  url: `/api/accounts/info/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'put',
  data:{
	  addresses
  }
})

// 删除地址
export const delAddr = (addresses) => request({
  url: `/api/accounts/info/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'put',
  data:{
	  addresses
  }
})

export const addOrder = (order)=>request({
  url: `/api/order/order/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'post',
  data:{
	  order
  }
})

//订单
export const getorder = () => request({
  url: `/api/order/order_list/`,
 headers:{
	  "Authorization": 'Bearer '+uni.getStorageSync('access')
  },
  method: 'get',
})

// 活动
export const getActivities= () => request({
  url: `/api/activity/activity_list/`,
  method: 'get',
})