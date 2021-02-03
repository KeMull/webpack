/*
 * @Author: KeMull
 * @Date: 2021-02-02 20:59:33
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 11:51:35
 */
export interface Env {
	employeeUrl: string
	apiUrl: string
	manageUrl: string
	bucketname: string
	username: string
	password: string
	domain: string
	bucketnameV: string
	usernameV: string
	passwordV: string
	domainV: string
	upyunApi: string
}
const { MY_NODE_ENV } = process.env
let apiUrl = 'https://ceduv2.langpedu.com'
let manageUrl = 'https://beduv2.langpedu.com'
let employeeUrl = 'https://learnv2.langpedu.com'
let upyunImg = 'https://cc-imgs.langpedu.com/'
// 又拍云图片上传
const upyunApi = 'https://v0.api.upyun.com/'
let bucketname = 'pre-cc-imgs'
let username = 'preccimgs'
let password = 'NGXjdDpGcrxm5sQ5REKW6Gaj0eBQ0Gk2'
let domain = 'cc-imgs.langpedu.com'
// 又拍云文件上传
let bucketnameV = 'pre-cc-dl'
let usernameV = 'preccdl'
let passwordV = 'mwsSYUmU3iLOqlPw0W1TglY43dZWL99n'
let domainV = 'cc-dl.langpedu.com'

if (MY_NODE_ENV === 'test') {
	apiUrl = 'https://cedu.test.langpedu.com'
	manageUrl = 'https://bedu.test.langpedu.com'
	employeeUrl = 'https://learn.test.langpedu.com'
	upyunImg = 'https://cc-imgs.langpedu.com/'
	// 又拍云图片上传
	bucketname = 'pre-cc-imgs'
	username = 'preccimgs'
	password = 'NGXjdDpGcrxm5sQ5REKW6Gaj0eBQ0Gk2'
	domain = 'cc-imgs.langpedu.com'
	// 又拍云文件上传
	bucketnameV = 'pre-cc-dl'
	usernameV = 'preccdl'
	passwordV = 'mwsSYUmU3iLOqlPw0W1TglY43dZWL99n'
	domainV = 'cc-dl.langpedu.com'
} else if (MY_NODE_ENV === 'master') {
	apiUrl = 'https://cedu.51jiaoyujia.com'
	manageUrl = 'https://bedu.51jiaoyujia.com'
	employeeUrl = 'https://learn.51jiaoyujia.com'
	upyunImg = 'https://companycollege-imgs.51jiaoyujia.com/'
	// 又拍云图片上传
	bucketname = 'companycollege-imgs'
	username = 'companycollegeimgs'
	password = 'mcYUcpF3Nu7LW3izlNtOSsQlYeAYpq24'
	domain = 'companycollege-imgs.51jiaoyujia.com'

	// 又拍云文件上传
	bucketnameV = 'companycollege-dl'
	usernameV = 'companycollegedl'
	passwordV = 'k4H7Xv9xSwKLKRZXj5zC9e71sHH4MXki'
	domainV = 'companycollege-dl.51jiaoyujia.com'
} else if (MY_NODE_ENV === 'pre') {
	apiUrl = 'https://cedu.pre.langpedu.com'
	manageUrl = 'https://bedu.pre.langpedu.com'
	employeeUrl = 'https://learn.pre.langpedu.com'
	// jiaoyujiaUrl = 'http://www.51jiaoyujia.com/';
	upyunImg = 'https://companycollege-imgs.51jiaoyujia.com/'
	// 又拍云图片上传
	bucketname = 'companycollege-imgs'
	username = 'companycollegeimgs'
	password = 'mcYUcpF3Nu7LW3izlNtOSsQlYeAYpq24'
	domain = 'companycollege-imgs.51jiaoyujia.com'

	// 又拍云文件上传
	bucketnameV = 'companycollege-dl'
	usernameV = 'companycollegedl'
	passwordV = 'k4H7Xv9xSwKLKRZXj5zC9e71sHH4MXki'
	domainV = 'companycollege-dl.51jiaoyujia.com'
}

export default {
	apiUrl,
	manageUrl,
	employeeUrl,
	upyunImg,
	bucketname,
	username,
	password,
	domain,
	bucketnameV,
	usernameV,
	passwordV,
	domainV,
	upyunApi,
} as Env
