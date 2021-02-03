/*
 * @Author: KeMull
 * @Date: 2021-02-01 14:17:15
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 10:10:41
 */
import React from 'react'
import './index.less'
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
