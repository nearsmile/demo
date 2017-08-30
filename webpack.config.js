// import HtmlWebpackPlugin from 'html-webpack-plugin';
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // entry: './src/index.js', // 入口起点，可以指定多个入口起点
  devtool: 'inline-source-map', // 控制是否生成以及如何生成 source map
  entry: {
    app: './src/index.js',
    print: './src/print.js',
    anoter: './src/another.js'
  },
  output: { // 输出，只可指定一个输出配置
    // filename: 'bundle.js', // 输出文件名
    // filename: '[name].bundle.js',
    // filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].bundle.js', // 在配置文件中使用`process.env.NODE_ENV`
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist') // 输出文件所在的目录
  },
  module: { // 如何处理项目中不同类型的模块
    rules: [ // 用于规定在不同模块被创建时如何处理模块的规则数组
      {
        test: /\.css$/,  // 匹配特定文件的正则表达式或正则表达式数组
        use: [ // 应用于模块的 loader 使用列表
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
    contentBase: path.resolve(__dirname, 'dist'), // 设置静态资源的根目录
    // hot: true, // 告诉 dev-server 我们在用 HMR
    // hotOnly: true // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack demo', // 生成 HTML 文档的标题
      filename: 'index.html' // 写入 HTML 文件的文件名，默认 `index.html`
    }),
    new webpack.ProvidePlugin({
      $: 'jquery', // 设置全局变量
      jQuery: 'jquery'
    }),
    new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
    new CleanWebpackPlugin(['dist']), // 第一个参数是要清理的目录的字符串数组
    // new webpack.HotModuleReplacementPlugin(), //启用 HMR
    // new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // 抽取出的模块的模块名 / 将 vendor 入口处的代码放入 vendor 模块
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime' // 将 webpack 自身的运行时代码放在 runtime 模块
    })

  ]
}
