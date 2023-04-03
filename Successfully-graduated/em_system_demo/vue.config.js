module.exports = {
    /* pages: {
      index: {
        // 入口
        entry: 'src/main.js',
      },
    }, */
    lintOnSave: false, //关闭语法检查
    // 开启代理服务器 (方式一)
    /* devServer: {
      proxy: 'http://localhost:5000'
    }, */
  
    // 开启代理服务器 (方式二)
    devServer: {
      proxy: {
        // /api：请求前缀
        '/api': {
          target: 'http://localhost:8080',
          pathRewrite: {
            '^/api': '' 
          }, //去掉请求头匹配目标地址
          // ws: true, //用于支持websocket
          // changeOrigin: true //用于控制请求头中的host值
        },
        '/apidouban': {
          target: 'http://localhost:8081',
          pathRewrite: {
            '^/apidouban': ''
          }, //去掉请求头匹配目标地址
          // ws: true, //用于支持websocket
          // changeOrigin: true //用于控制请求头中的host值
        }
      }
    }
  }
  /* const { defineConfig } = require('@vue/cli-service')
  module.exports = defineConfig({
    transpileDependencies: true
  }) */