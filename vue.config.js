module.exports = {
  publicPath: './',
  assetsDir: 'static',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/css/main.scss";'
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  runtimeCompiler: true

  // devServer: {
  //     proxy: {
  //         '/api':{
  //             target:'http://localhost:97/',
  //             changeOrigin:true,
  //             pathRewrite:{
  //                 '/api':''
  //             }
  //         }
  //     }
  // }
}