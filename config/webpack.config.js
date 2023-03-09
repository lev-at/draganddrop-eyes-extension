'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');
 
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + '/popup.js',
      contentScript: PATHS.src + '/contentScript.js',
      background: PATHS.src + '/background.js',
      options: PATHS.src + '/options.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    plugins: [
      new NodePolyfillPlugin()
    ]
  });

module.exports = config;



