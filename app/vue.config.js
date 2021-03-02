const path = require('path');

console.log(path.resolve(__dirname, 'src/helpers/api'))
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'api': path.join(__dirname, 'src/helpers/api'),
      },
    },
  },  
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:1337',
        changeOrigin: true
      },
    }
  }
}