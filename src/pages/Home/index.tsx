/*
 * @Author: KeMull
 * @Date: 2021-02-01 14:17:15
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 17:19:18
 */
import React, { useEffect } from 'react'
import { Button } from 'antd'
import pros1 from '@/assets/images/pros_1.jpg'
import pros2 from '@/assets/images/pros_2.jpg'
import cowrs from '@/assets/images/cowrs.gif'
import {} from '@/assets/common/common'
import { get, post } from '@/utils/request'
import moment from 'moment'
const Home: React.FC<{}> = () => {
	useEffect(() => {
		get('/api/dataApi', {
			type: 'ip',
			src: 'onebox',
			tpl: 0,
			num: 1,
			query: 'ip',
			url: 'ip',
		}).then((res: any) => {
			if (res && res.ip) {
				localStorage.setItem('userip', res.ip)
			}
			console.log(res)
		})
		post('college/study_manage/live_plan_list', {})
	}, [])
	const handlePromise = () => {
		return new Promise((resolve, reject) => {
			try {
				setTimeout(() => {
					resolve('成功')
				}, 1000)
			} catch (error) {
				reject(error)
			}
		})
	}
	console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
	return (
		<>
			<h1>Home</h1>
			<div className="home_warp">sdnandka</div>
			<img src={pros2} alt="" />
			<img src={cowrs} alt="" />
			<img src={pros1} alt="" />
			<Button
				onClick={() => {
					handlePromise().then((res) => {
						console.log(
							'%c 🥑 res: ',
							'font-size:20px;background-color: #93C0A4;color:#fff;',
							res
						)
					})
				}}
			>
				点我
			</Button>
		</>
	)
}
export default Home
