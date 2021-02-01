/*
 * @Author: KeMull
 * @Date: 2021-01-30 11:50:31
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-01 11:00:39
 */
import './assets/css/global.less'
import { handleReduce } from './assets/common/common'
console.log(
	'%c 🌰 handleReduce: ',
	'font-size:20px;background-color: #ED9EC7;color:#fff;',
	handleReduce()
)
const handleClick = () => {
	return '1'
}
const handleClicks = () => {
	return '1'
}
const handleClickwwws = () => {
	return '1'
}
// 测试热更新模块 当前的模块有更新 就会走都里面去
module.hot.accept('./assets/common/common', () => {
	console.log('editor 模块更新了，需要这里手动处理')
	// console.log(handleReduce())
})
