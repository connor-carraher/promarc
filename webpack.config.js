const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const configUtils = require('webpack-config-utils');
const babelRcConfig = JSON.parse(fs.readFileSync('.babelrc'));

module.exports = env => {
  env = env || {};
  const ifUtils = configUtils.getIfUtils(env);

  return {
    context: path.resolve('public/src'),
    entry: {
      main: 'index.js',
    },
    devtool: 'source-map',
    output: {
      path: path.resolve('public/js'),
      filename: '[name].min.js',
      pathinfo: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: Object.assign(
              babelRcConfig,
              {
                cacheDirectory: true,
                babelrc: false,
                forceEnv: env,
              }
            ),
          }],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: configUtils.removeEmpty([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          ifUtils.ifProduction('production', process.env.NODE_ENV || 'development')
        ),
      }),
      ifUtils.ifProduction(
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: { drop_console: true, warnings: false },
        })
      ),
      ifUtils.ifProduction(
        new webpack.LoaderOptionsPlugin({ minimize: true })
      ),
    ]),
    resolve: {
      modules: ['node_modules', path.resolve('public/src')],
    },
  };
};
