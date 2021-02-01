/*
 * @Author: KeMull
 * @Date: 2021-01-30 11:41:03
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-01 11:01:04
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 不能和style-loader一起使用  会出错
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { resolve } = path
module.exports = {
	entry: resolve(__dirname, './src/index.js'),
	output: {
		path: resolve(__dirname, './dist'),
		filename: '[name]_[hash:8].js',
	},
	// loader配置
	module: {
		rules: [
			{
				test: /\.(c|le)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
			},
		],
	},
	// 插件配置
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({
			filename: 'css/[name]_[hash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].chunk.css',
		}),
		new HotModuleReplacementPlugin(), //热更新插件 webpack插件集成 配合 devServer的hot一起使用
		new CleanWebpackPlugin(),
	],
	// 开发服务器
	devServer: {
		contentBase: resolve(__dirname, 'dist'), //运行的文件目录
		compress: true, //优化压缩
		port: 8742,
		open: true,
		hot: true, //开启热更新
	},
	// 开发环境
	mode: 'development',
}
