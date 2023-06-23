// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const dotenv = require('dotenv')

const isProd = process.env.NODE_ENV == 'production'
const envVars = dotenv.config().parsed

const commonConfig = {
  plugins: [],
  module: {
    rules: [],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          warnings: false,
          parse: {},
          compress: {
            properties: false,
          },
          mangle: false,
          module: false,
          output: {
            beautify: true,
            // comments: /\@(customfunction|OnlyCurrentDoc)/,
          },
        },
        extractComments: false,
      }),
    ],
  },
}

const clientConfig = {
  ...commonConfig,
  name: 'CLIENT',
  target: 'web',
  entry: {
    client: './src/client/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (pathData) => {
      return `${pathData.chunk.name}/redirector.js`
    },
    libraryTarget: 'commonjs',
  },
  plugins: [...commonConfig.plugins],
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig/tsconfig.client.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    ...commonConfig.resolve,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig/tsconfig.client.json',
      }),
    ],
  },
}

const serverConfig = {
  ...commonConfig,
  name: 'SERVER',
  target: 'node',
  entry: {
    server: './src/server/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (pathData) => {
      return `${pathData.chunk.name}/bundle.js`
    },
    libraryTarget: 'this',
  },
  externals: nodeExternals(),
  plugins: [...commonConfig.plugins],
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig/tsconfig.server.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    ...commonConfig.resolve,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig/tsconfig.server.json',
      }),
    ],
  },
}

const configs = [clientConfig, serverConfig]

const devConfig = configs.map((config) => (env, argv) => {
  return {
    ...config,
    mode: 'development',
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
    ],
  }
})

const prodConfig = configs.map((config) => (env, argv) => {
  return {
    ...config,
    mode: 'production',
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env.SERVER__HOSTNAME': JSON.stringify(
          process.env.SERVER__HOSTNAME,
        ),
        'process.env.SERVER__GRAPHQL_PATHNAME': JSON.stringify(
          process.env.SERVER__GRAPHQL_PATHNAME,
        ),
        'process.env.SERVER__PRODUCTION_URL': JSON.stringify(
          process.env.SERVER__PRODUCTION_URL,
        ),
        'process.env.PORTAL__REDIRECT_URL': JSON.stringify(
          process.env.PORTAL__REDIRECT_URL,
        ),
        'process.env.PORTAL__PASSWORD': JSON.stringify(
          process.env.PORTAL__PASSWORD,
        ),
        'process.env.DATABASE__DB_URL': JSON.stringify(
          process.env.DATABASE__DB_URL,
        ),
        'process.env.SERVER__PRODUCTION_URL': JSON.stringify(
          process.env.SERVER__PRODUCTION_URL,
        ),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  }
})

module.exports = isProd ? prodConfig : devConfig
