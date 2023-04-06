import {request} from './request.js'

// 获取饮品分类
export const getDrinksCategory = () => request({
  url: `/api/product/drinks_category`,
  method: 'get',
})

// 获取饮品菜单
export const getDrinks = () => request({
  url: `/api/product/drinks/`,
  method: 'get',
})

// 提交在线预约
export const bookhandling = (name,gender,age,phone,date,time,content) => request({
  url: `/api/management/bookhandling/`,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data:{
	  name,gender,age,phone,date,time,content
  }
})