module.exports = {
  context: __dirname,
  entry: "./js/main.jsx",
  output: {
    path: "./js",
    publicPath: "/js/",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
