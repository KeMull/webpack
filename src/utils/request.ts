//  引入axios qs
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import ENV from '@/utils/env'

axios.defaults.baseURL = ENV.apiUrl
// axios.defaults.timeout = 5000 //超时响应
axios.defaults.headers.post['Content-Type'] =
	'application/x-www-form-urlencoded;charset=UTF-8' // post请求头

/***
 * 请求拦截：就是所有的请求发送之前 会被拦截到 做一些处理 然后才去发送
 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
	if (config.url && config.url.indexOf('/api') !== -1) {
		config.baseURL = 'http://localhost:9522'
	}
	// 取出本地的token 有就返回 token 没有就为空
	// let token = local.get('t_k') || ''
	// if (token) {
	// 	//   统一在请求头设置携带 token
	// 	config.headers.Authorization = token
	// }
	return config
})

/**
 * 响应拦截：请求成功之后，后端响应数据后，先经过响应拦截，做一些处理，然后在接受后端传过来的数据
 */
// axios.interceptors.response.use((response) => {
//   // 判断响应回来的数据 是否有 code  和 msg
//   if (response.data.code !== undefined && response.data.msg !== undefined) {
//     let { code, msg } = response.data; //有code & msg 就取出 code msg
//     if (code === 0) {
//       // code === 0 成功
//       Message({ type: "success", message: msg }); //弹出消息框
//     } else if (code === 1) {
//       //   code === 1 失败
//       Message.error(msg); //弹出消息框
//     }
//   }
//   return response;
// });

// 封装通用的get post 请求  让两种请求方式 使用方法一致

// Promise 封装get请求
export const get = (url: string, params = {}) => {
	//使用get请求时  传入两个参数  url：地址   数据是一个对象的形式 params = {}  默认是一个空对象
	return new Promise((resolve, reject) => {
		axios
			.get(url, { params })
			.then((response) => {
				resolve(response.data) //成功
			})
			.catch((err) => {
				reject(err)
			}) //失败
	})
}

// Promise 封装post请求
export const post = (url: string, params = {}) => {
	//   使用post请求时 传入两个参数 url params对象 === 默认是一个空对象
	return new Promise((resolve, reject) => {
		axios
			.post(url, qs.stringify(params)) //post数据 需要qs.stringify() 去处理数据
			.then((response) => {
				resolve(response.data) //成功
			})
			.catch((err) => {
				reject(err) //失败
			})
	})
}
