const path = require('path')
// 插件
const HTMLplugin = require('html-webpack-plugin')
// 引入webpack
const webpack = require('webpack')
// vue-loader需要此依赖
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 判断是不是开发环境
const isDev = process.env.NODE_ENV === 'development'
const config = {
  //  编译目标是web平台
  target: "web",
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    // 此处两个下划线
    path: path.join(__dirname, 'dist')
  },
  // 插件
  plugins: [
    // 判断环境 process.env.NODE_ENV
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLplugin()
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            // 直接使用 之前的 加速编译速度
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: [{
        loader: 'url-loader',
        // 图片处理 小于1024的转义成base64代码
        options: {
          limit: 1024,
          name: '[name].[ext]'
        }
      }]
    }]
  }
}
if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: '8000',
    // 可通过本机ip访问 局域网访问
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    stats: "errors-only", //只打印错误信息
    // 运行dev的时候自动打开浏览器 http://0.0.0.0:8000/
    open:true,
    // 找不到的地址映射到入口 比如到404页
    // historyFallback: {
    // },
    //只渲染更改组件的
    hot: true
  }
  config.plugins.push(
    //
    new webpack.HotModuleReplacementPlugin(),
    //
    new webpack.NoEmitOnErrorsPlugin()
  )
}
module.exports = config
