/*
 * @Author: KeMull
 * @Date: 2021-01-30 11:41:03
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 17:27:55
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 不能和style-loader一起使用  会出错
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')

process.env.VERSION_CODE = '0.0.1'
const { resolve } = path
const { PORT, NODE_ENV, VERSION_CODE } = process.env
module.exports = {
	entry: ['./src/index.tsx', './src/index.html'],
	output: {
		path: resolve(__dirname, './dist'),
		filename: `[name]_[hash:8]_${VERSION_CODE}.js`,
	},
	// loader配置
	module: {
		rules: [
			{
				test: /\.(c|le)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'css-modules-typescript-loader',
					// {
					// 	loader: 'typings-for-css-modules-loader',
					// 	options: {
					// 		modules: true,
					// 		namedExport: true,
					// 		camelCase: true,
					// 		minimize: true,
					// 		localIdentName: '[local]_[hash:base64:5]',
					// 	},
					// },
					// 'style-loader',
					{
						loader: 'css-loader',
						options: {
							module: true,
						},
					},
					{
						loader: 'less-loader',
					},
					{
						// css兼容loader  兼容各种版本浏览器打包之后会自动添加 css hack的前缀
						// 需要在package.json文件配置 browserslist属性
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env'],
							},
						},
					},
				],
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
			},
			/**
			 * @name: babel-loader/@babel/core js兼容性处理
			 *        @babel/preset-env 基本js兼容性处理环境
			 *        core-js 按需加载
			 * @msg: @babel/preset-react/@babel/preset-typescript 处理react+ts
			 *        加载 .babelrc文件里的配置
			 */
			{
				test: /\.(js|tsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					name: `[name]_[hash:8]_${VERSION_CODE}.[ext]`,
					outputPath: 'static/imgs',
					esModule: false,
				},
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				exclude: /\.(html|js|ts|tsx|css|less|jpg|png|gif)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'static/media',
				},
			},
			/*
        语法检查: eslint-loader eslint
            注意: 只检查源代码,第三方库不检查
        检查规则:
      */
			// {
			// 	test: /\.(js|ts|tsx)$/,
			// 	exclude: /node_modules/,
			// 	loader: 'eslint-loader',
			// 	options: {
			// 		fix: true,
			// 	},
			// },
			// { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
		],
	},
	// 插件配置
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				// 移除空格
				collapseWhitespace: true,
				// 移除注释
				removeComments: true,
			},
		}),
		new MiniCssExtractPlugin({
			// css分离插件
			filename: `static/css/[name]_[hash:8]_${VERSION_CODE}.css`,
			chunkFilename: `static/css/[name].[contenthash:8]_${VERSION_CODE}.chunk.css`,
		}),
		new HotModuleReplacementPlugin(), // 热更新插件 webpack插件集成 配合 devServer的hot一起使用
		new CleanWebpackPlugin(),
		new BundleAnalyzerPlugin({
			// analyzerMode: 'disabled', //避免每次启动都打开分析网站
			generateStatsFile: true,
		}),
		// 压缩css
		new OptimizeCssAssetsWebpackPlugin(),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.MY_NODE_ENV': JSON.stringify(process.env.MY_NODE_ENV),
		}),
	],
	resolve: {
		// 定义别名 在对应的t/jsconfig.json的paths里面去配置
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'node_modules'),
		},
		// 当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找这些扩展名
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	// 开发服务器
	devServer: {
		contentBase: resolve(__dirname, 'dist'), // 运行的文件目录
		compress: true, // 优化压缩
		port: Number(PORT) | 9522,
		open: true,
		hot: true, // 开启热更新
	},
	devtool: 'source-map',
	/**
	 * @name: source-map
	 * 一种提供源代码到构建后代码映射技术 (如果构建后代码出错了,通过映射可以追踪到代码错误的源代码位置)
	 * [inline-|hidden-|eval-|nosources-|cheap-|cheap-module-]source-map
	 * hidden-|nosources-|cheap-|cheap-module-|source-map : 生成外部文件
	 * inline-|eval- : 生成内联文件
	 */
	// 开发环境
	// production
	mode: NODE_ENV ? NODE_ENV : 'development',
}
