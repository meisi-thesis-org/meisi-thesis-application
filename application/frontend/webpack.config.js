const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/app.component.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  target: 'web',
  devServer: {
    static: path.resolve(__dirname, './public'),
    watchFiles: ['./src'],
    port: 4200,
    open: true,
    hot: true
  }
}
