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
    path: path.resolve(__dirname, "./dist"),
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
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    /*new ExtractTextPlugin({
      filename: "main.css",
      allChunks: true,
    })*/
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    host: "127.0.0.1",
    //hot: true,
    //hotOnly: true,
    //https: true,
    port: 8080,
    before() {
      spawn(
        "electron",
        ["."],
        { shell: true, env: process.env, stdio: "inherit" }
      )
      .on("close", code => process.exit(0))
      .on("error", spawnError => console.error(spawnError))
    }
  },
  stats: {
    builtAt: true,
    errors: true,
    errorDetails: true,
    performance: true,
    timings: true,
    version: true,
    warnings: true,
  }
}
