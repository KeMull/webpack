/*
 * @Author: KeMull
 * @Date: 2021-02-01 14:17:15
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 15:14:20
 */
import React from 'react'
import './index.less'
import pros1 from '@/assets/images/pros_1.jpg'
import pros2 from '@/assets/images/pros_2.jpg'
import cowrs from '@/assets/images/cowrs.gif'
const Home: React.FC<{}> = () => {
	const handlePromise = () => {
		return new Promise((resolve, reject) => {
			try {
				console.log(
					'%c 🍻 成功: ',
					'font-size:20px;background-color: #4b4b4b;color:#fff;',
					'成功'
				)
				setTimeout(() => {
					resolve('成功')
				}, 1000)
			} catch (error) {
				reject(error)
			}
		})
	}
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
