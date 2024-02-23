const path = require('path');

module.exports = {
  entry : './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'image-viewer.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], 
      },
    ],
  },
  mode: 'development'
}