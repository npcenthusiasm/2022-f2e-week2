const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: '2022 F2E - 第二關 今晚，我想來點點簽'
    }
  }
})
