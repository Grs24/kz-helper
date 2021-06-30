const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const ZipPlugin = require('zip-webpack-plugin')
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const isProd = process.env.NODE_ENV === 'production'

// 生成多个页面
const pagesObj = {}

const chromeName = ['popup', 'options']

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: 'public/index.html',
    filename: `${name}.html`
  }
})

// 生成manifest文件
const manifest = isProd
  ? {
      from: path.resolve('src/manifest.production.json'),
      to: `${path.resolve('dist')}/manifest.json`
    }
  : {
      from: path.resolve('src/manifest.development.json'),
      to: `${path.resolve('dist')}/manifest.json`
    }

// const manifest = {
//   from: path.resolve('src/manifest.production.json'),
//   to: `${path.resolve('dist')}/manifest.json`
// }

const plugins = [CopyWebpackPlugin([manifest])]

// 本地环境：热加载文件复制到dist文件夹
if (!isProd) {
  plugins.push(
    CopyWebpackPlugin([
      {
        from: path.resolve('src/utils/hot-reload.js'),
        to: path.resolve('dist')
      }
    ])
  )
}

// 生产环境：打包dist为zip压缩包，用于浏览器加载拓展插件、chrome商店发布
if (isProd) {
  plugins.push(
    new ZipPlugin({
      path: path.resolve('dist'),
      filename: 'kz-helper-dist.zip'
    })
  )
}

module.exports = {
  pages: pagesObj,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  configureWebpack: {
    entry: {
      // content: './src/content/index.js',
      background: './src/background/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins
  },
  css: {
    extract: {
      filename: 'css/[name].css'
      // chunkFilename: 'css/[name].css'
    }
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve('src/'))
    // 分析打包组件大小
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(webpackBundleAnalyzer.BundleAnalyzerPlugin)
    }
  }
}
