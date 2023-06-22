const path = require("path");
const fs = require("fs");

const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss", ".css", ".json"],
    },
    module: {
      rules: [
        // `js` and `jsx` files are parsed using `babel`
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        // `ts` and `tsx` files are parsed using `ts-loader`
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
        },
        {
          test: /\.css$/,
          use: [MiniCSSExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "assets",
              },
            },
          ],
        },
        {
          ///scss
          test: /\.s[ac]ss$/i,
          use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },

    mode: "production",

    entry: {
      save: "./dist/lib/save.js",
      editorshelper: "./lib/ReactEditor.tsx",
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
    },

    plugins: [new MiniCSSExtractPlugin({ filename: "[name].css" })],
  };
};
