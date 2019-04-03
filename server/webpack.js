import path from "path";
import webpack from "webpack";
import middleware from "webpack-dev-middleware";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import objectHash from "node-object-hash";
import getConfig from "../webpack.config";

const config = getConfig({ production: process.env.NODE_ENV !== "development" });

config.plugins.push(new HardSourceWebpackPlugin({
  cacheDirectory: path.resolve("./node_modules/.cache/webpack/[confighash]"),
  recordsPath: path.resolve("./node_modules/.cache/webpack/[confighash]/records.json"),
  configHash: () => objectHash().hash(config),
}));

const options = {
  publicPath: "/js",
  stats: {
    colors: true,
    assets: true,
    chunks: false,
    modules: false,
  },
};

export default () => middleware(webpack(config), options);
