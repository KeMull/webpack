const { resolve } = require('path')
const { DllPlugin } = require('webpack')
const { PORT, NODE_ENV, VERSION_CODE } = process.env

module.exports = {
	entry: {
		moment: ['moment'],
	},
	output: {
		filename: `[name].js`,
		path: resolve(__dirname, 'dll'),
		library: '[name]_[hash:8]', //打包的js库里面的内容向外暴露出去的内容的名称  === 原名称+8位hash,
	},
	plugins: [
		// 打包生成一个json文件 ---> 提供entry打包的第三方库的映射关系
		new DllPlugin({
			name: '[name]_[hash:8]', //映射库暴露的内容的名称
			path: resolve(__dirname, 'dll/manifest.json'), //输入的路径
		}),
	],
	mode: NODE_ENV ? NODE_ENV : 'development',
}
