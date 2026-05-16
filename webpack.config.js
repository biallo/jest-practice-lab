const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (_, argv) => ({
  entry: path.resolve(__dirname, "src/main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].[contenthash:8].js",
    assetModuleFilename: "assets/[name].[contenthash:8][ext]",
    publicPath: argv.mode === "production" ? "./" : "/",
    clean: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            compilerOptions: {
              noEmit: false
            }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html")
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public/icons"), to: "icons" },
        { from: path.resolve(__dirname, "public/site.webmanifest"), to: "site.webmanifest" }
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: false,
    hot: true,
    open: false
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },
  devtool: "source-map"
});
