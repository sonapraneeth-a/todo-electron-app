const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { spawn } = require("child_process")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "source")

module.exports = {
  entry: [path.join(__dirname, "source", "index.js"), path.join(__dirname, "source", "scss", "main.scss")],
  output: {
    path: path.resolve(__dirname, "source"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }],
          /*use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            //resolve-url-loader may be chained before sass-loader if necessary
            use: ["css-loader", "sass-loader"]
          }),*/
        include: defaultInclude
      },
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader" },
        ],
        include: defaultInclude
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react"]
            }
          },
        ],
        include: defaultInclude
      },
    ]
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "source", "index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    /*new ExtractTextPlugin({
      filename: "main.css",
      allChunks: true,
    })*/
  ],
}
