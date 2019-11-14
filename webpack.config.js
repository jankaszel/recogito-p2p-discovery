module.exports = {
  entry: './app/index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'discovery.js',
    library: 'RecogitoDiscovery',
  },
  devServer: {
    contentBase: `${__dirname}/dist`,
    disableHostCheck: true,
    compress: true,
    port: 9001,
  },
}
