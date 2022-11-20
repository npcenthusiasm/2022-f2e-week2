const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/2022-f2e-week2/' : './',
  pages: {
    index: {
      entry: 'src/main.js',
      title: '2022 F2E - 第二關 今晚，我想來點點簽'
    }
  }
})
