/*
 * @Author: KeMull
 * @Date: 2021-02-01 14:17:15
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 17:19:18
 */
import React from 'react'
import './index.less'
import pros1 from '@/assets/images/pros_1.jpg'
import pros2 from '@/assets/images/pros_2.jpg'
import cowrs from '@/assets/images/cowrs.gif'
import {} from '@/assets/common/common'
import moment from 'moment'
const Home: React.FC<{}> = () => {
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

	console.log(
		'%c 🍦 🍝: ',
		'font-size:20px;background-color: #42b983;color:#fff;',
		'🍝'
	)
	console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
	return (
		<>
			<h1>Home</h1>
			<div className="home_warp">sdnandka</div>
			<img src={pros2} alt="" />
			<img src={cowrs} alt="" />
			<img src={pros1} alt="" />
			<button
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
			</button>
		</>
	)
}
export default Home
