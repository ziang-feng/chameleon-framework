const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        app: './js/app.js'
    },
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname,'./js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    stats: {
      warnings: false
    }
  };