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

//订单
export const getorder = () => request({
  url: `/api/order/order_list/`,
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
