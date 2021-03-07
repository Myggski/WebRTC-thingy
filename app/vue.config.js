const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        api: path.join(__dirname, 'src/core/api'),
      },
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:1337',
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ['vuex-module-decorators'],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/main.scss";',
      },
    },
  },
};
