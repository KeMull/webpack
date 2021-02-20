/*
 * @Author: KeMull
 * @Date: 2021-01-30 11:41:03
 * @LastEditors: KeMull
 * @LastEditTime: 2021-02-03 17:27:55
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 不能和style-loader一起使用  会出错
const {
	HotModuleReplacementPlugin,
	DefinePlugin,
	DllReferencePlugin,
} = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')

/*
    缓存:
      babel缓存
        cacheDirectory:true
        --> 让第二次打包构建速度更快
      文件资源缓存:
        hash: 每次webpack构建时会生成唯一的hash值
        问题: 因为js/css打包时使用的同一个hash值
              如果重新打包会导致缓存失败
        chunkhash: 根据chunk生成的hash值,如果打包来源于一个chunk,那么hash值就是一样的
          chunk: 当前某一个文件的所有引入关系就是同一个chunk
          问题: css是在js中引入的,同属于一个chunk
        contenthash: 根据文件的内容生成的hash,不同的文件的hash值是不一样的
        --> 让代码上线运行缓存更好使用
*/

/*
   优化:
      tree shaking: 取出无用代码
      前提: 1. 必须使用es6模块化  2. 开启production环境
      作用: 减少代码的体积

    在package.json中的配置
    "sideEffects":false 所有代码都没有副作用( 都可以进行tree shaking )
*/
process.env.VERSION_CODE = '0.0.1'
const { resolve } = path
const { PORT, NODE_ENV, VERSION_CODE } = process.env
module.exports = {
	entry: './src/index.tsx', //单入口
	// entry: { index: './src/index.tsx', about: './src/about.tsx' }, //多入口
	output: {
		path: resolve(__dirname, './dist'),
		filename: `static/js/[name]_[hash:8]_${VERSION_CODE}.js`,
		chunkFilename: `static/js/[name]_[chunkhash:8]_${VERSION_CODE}.js`,
		// 打包后所有资源引入公共路劲的前缀 '/' --> 'imgs/1.png' --> '/imgs/1.png'
		publicPath: '/',
		// chunkFilename: 'js/[name]_chunk.js', 非入口chunk名称/重命名
		// library:'[name]' 打包后整个js库向外暴露的变量名
		// libraryTarget:'window | commonjs | amd' 打包后的库向外暴露的目标 添加到 window上还是遵循commonjs amd规范向外导出
	},
	// loader配置
	module: {
		rules: [
			// oneOf 以下loader只会匹配一个
			// 注意: 不能有两个配置处理同一种类型的文件
			{
				oneOf: [
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
						exclude: /node_modules/,
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
						// 两种配置处理同一种类型的文件
						// enforce:'pre', pre 优先执行   post 延后执行
						loader: 'babel-loader',
						options: {
							// 开启babel缓存
							// 第二次构建时,会读取之前的缓存
							cacheDirectory: true,
						},
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
				],
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
			chunkFilename: `static/css/[name].[chunkhash:8]_${VERSION_CODE}.chunk.css`,
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
		// 告诉webpack有哪些库不参与打包,同时使用时的名称也得改变
		new DllReferencePlugin({
			manifest: resolve(__dirname, 'dll/manifest.json'),
		}),
		new AddAssetHtmlWebpackPlugin({
			filepath: resolve(__dirname, 'dll/moment.js'),
		}),
	],
	resolve: {
		// 配置解析模块,定义别名 在对应的t/jsconfig.json的paths里面去配置
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'node_modules'),
		},
		// 当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找这些扩展名
		extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
		// 告诉webpack解析模块是去哪个目录找  默认是就是 node_modules
		modules: [resolve(__dirname, 'node_modules'), 'node_modules'],
	},
	/*  
      代码分割
      1. 可以将node-modules中的代码单独打包成一个chunk
      2. 自动化分析多入口chunk中,有没有引入公共文件/node_modules,如果有打包成一个单独的文件
  */
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	// 开发服务器
	devServer: {
		contentBase: resolve(__dirname, 'dist'), // 运行的文件目录
		compress: true, // 优化压缩 gzip压缩
		port: Number(PORT) | 9522,
		open: true,
		hot: true, // 开启热更新
		watchContentBase: true, //监视contentBase 目录下所有的文件,一旦文件发生变化就会reload
		watchOptions: {
			ignored: /node_modules/, //忽略文件
		},
		clientLogLevel: 'none', //不要显示启动服务器日志信息
		quiet: true, //除了一些基本的启动信息以外,其他内容都不要显示
		overlay: false, //如果出错了,不要全屏提示
		proxy: {
			'/api': {
				target: 'https://open.onebox.so.com',
				pathRewrite: {
					'^/api': '',
				},
				changeOrigin: true,
			},
		},
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
	// 忽略第三方包/库打包在本地  使用cdn引入 (要手动去引入)
	externals: {
		// jquery: 'jQuery',
		// moment: 'moment',
	},
}