// 给postcss用的 配置文件 后处理我们的css文件 优化css 通过一系列的组件
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins:[
    // 优化css 浏览器前缀 自动加前缀
    autoprefixer()
  ]
}
