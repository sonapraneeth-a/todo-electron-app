const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { spawn } = require("child_process")

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, "source")

module.exports = {
  entry: defaultInclude,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }],
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
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
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
