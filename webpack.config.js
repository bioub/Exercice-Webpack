const HtmlWebpackPlugin = require("html-webpack-plugin");

function generateConfig(env, args) {
  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ];

  // devtool: false, // pour prod sans afficher les sources
  // devtool: 'source-map', // pour prod avec les sources originales
  // devtool: 'eval-source-map', // pour dev avec les sources originales
  const devtool = args.mode === 'development' ? 'eval-source-map' : false;

  /** @type {import('webpack').Configuration} */
  const config = {
    entry: "./src/js/index.js",
    output: {
      clean: true,
      filename: args.mode === 'development' ? 'bundle.js' : 'bundle.[contenthash].js',
    },
    devtool,
    plugins,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    target: ["web", "es5"],
  };

  return config;
}

module.exports = generateConfig;
