const path = require('path')
require('events').EventEmitter.defaultMaxListeners = 0

const IS_PROD = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  runtimeCompiler: false,
  lintOnSave: 'warning',
  productionSourceMap: !IS_PROD,

  css: {
    sourceMap: !IS_PROD
  },

  transpileDependencies: ['vue-echarts', 'resize-detector'],

  configureWebpack: config => {
    if (IS_PROD) {
    }
  },

  devServer: {
    proxy: {
      '/group1': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/qfqzVisualization": "/qfqzVisualization-manage-server/qfqzVisualization",
        // },
      },
      '/qfqzVisualization': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/qfqzVisualization": "/qfqzVisualization-manage-server/qfqzVisualization",
        // },
      },

      '/carManage': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/carManage": "/car-manage",
        // },
      },

      '/api': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/api": "/api/web/communitywanli"
        // },
      },

      '/oauth': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/oauth": "/AUTH-SERVER/oauth",
        // },
      },

      '/token': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/token": "/USER-CENTER",
        // },
      },

      '/ajax': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/ajax": "/cloud-service"
        // },
      },

      '/iot': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/iot": "/MIT-IOT"
        // }
      },

      '/event': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: true
        // pathRewrite: {
        //     "^/event": "/EVENT-HANDLING/event"
        // }
      },

      '/voice': {
        target: 'http://223.82.111.143:8081',
        changeOrigin: false,
        secure: false
        // pathRewrite: {
        //     "^/voice": "/possecu_cs",
        // },
      }
    }
  },

  chainWebpack: config => {
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true)

    // 修改网页title
    config.plugin('html').tap(args => {
      args[0].title = '安源区社会治理实战应用平台'
      return args
    })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 加载本地pdf文件
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.pdf|ico$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        limit: 10000
      })
  }
}
