/*
 * @Author: KeMull
 * @Date: 2021-01-27 11:21:48
 * @LastEditors: KeMull
 * @LastEditTime: 2021-01-30 11:58:45
 */
const path = require('path')
const webpack = require('webpack')
const { HotModuleReplacementPlugin } = webpack
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// MiniCssExtractPlugin: 把js中import导入的样式文件，单独打包成一个css文件，结合html-webpack-plugin，以link的形式插入到html文件中。
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 不能和style-loader一起使用  会出错
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 不能和style-loader一起使用  会出错
const { resolve } = path
module.exports = {
	entry: resolve(__dirname, './src/index.js'), // 入口，表示，要使用 webpack 打包哪个文件
	output: {
		// 输出文件相关的配置
		path: resolve(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
		filename: `[name]_[hash:8].js`, // 这是指定 输出的文件的名称
	},
	// loader配置
	module: {
		rules: [
			// 详细的loader配置
			{
				test: /\.(css|less)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: './',
						},
					},
					'css-loader',
					'less-loader',
				],
			},
			// 两个包  下载 url-loader  依赖 file-loader
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader', //url-loader默认使用es6模块化解析,而html-loader引入的图片使用的是commonJs引入
				// 解析时会出现[object Module]
				// 解决方法: 关闭es6模块化解析
				options: {
					limit: 8 * 1024, //base64 || 压缩
					esModule: false,
					name: `static/[name]_[hash:8].[ext]`, //[ext] 取文件原来的扩展名
				},
			},
			{
				test: /\.html$/,
				// 处理 html-loader引入的image 使用的是commonJs的规则
				loader: 'html-loader',
			},
			{
				// 排除css/js/html/less资源  以外的资源使用file-loader去处理
				exclude: /\.(css|js|html|less|jpg|png|gif)$/,
				loader: 'file-loader',
				options: {
					name: `static/[name]_[hash:8].[ext]`,
				},
			},
		],
	},

	plugins: [
		// new HotModuleReplacementPlugin(), // 热更新插件

		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css',
		}),
		// new webpack.ProgressPlugin(),
		new CleanWebpackPlugin({
			// root: path.resolve(__dirname, '..'),
			dry: false,
			verbose: true,
		}),
		new HtmlWebpackPlugin({
			// 复制html 并自动打包输出所有的(js/css)资源
			// 格式化模板
			template: './src/index.html',
		}),
		// new UglifyjsWebpackPlugin(),
	],
	optimization: {
		minimizer: [
			// new UglifyjsWebpackPlugin({
			// 	uglifyOptions: {
			//    parallel:true, //并行化可以显着加快构建速度，因此强烈建议使用
			// 		output: {
			// 			comments: false,
			// 		},
			// 		compress: {
			// 			warnings: false,
			// 			drop_debugger: true,
			// 			drop_console: true,
			// 			pure_funcs: ['console.log'], //移除console
			// 		},
			// 	},
			// }),
		],
	},
	// 开发服务器 (自动编译,自动打开浏览器,自动刷新浏览器)
	// 特点: 只会在内存中编译打包,不会有任何输出
	devServer: {
		contentBase: resolve(__dirname, 'dist'), //运行的文件目录
		compress: true, //优化压缩
		port: 8741,
		open: true,
		define: {
			'process.env': {
				MY_NODE_ENV: process.env.MY_NODE_ENV,
				VERSION_CODE: process.env.VERSION_CODE,
			},
		},
	},
	// 环境
	mode: 'development',
	// mode: 'production',
	// define: {
	// 	'process.env': {
	// 		MY_NODE_ENV: process.env.MY_NODE_ENV,
	// 		VERSION_CODE: process.env.VERSION_CODE,
	// 	},
	// },
}
