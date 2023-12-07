import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

type Mode = 'development' | 'production';

interface EndVariables {
  mode: Mode;
}

export default (env: EndVariables) => {
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: isDev && 'inline-source-map',
    devServer: {
      port: 3000,
      open: true,
      hot: true
    } as DevServerConfiguration,
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: 'convertColors',
                      params: {
                        currentColor: true,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        title: 'Adspro',
      }),
      ...(env.mode === 'production'
        ? [
            new WorkboxPlugin.GenerateSW({
              runtimeCaching: [
                {
                  urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'images',
                    expiration: {
                      maxEntries: 20,
                    },
                  },
                },
                {
                  urlPattern: /\.(?:js|css)$/,
                  handler: 'StaleWhileRevalidate',
                },
              ],
            }),
          ]
        : []),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src/assets'), to: 'assets' },
          { from: path.resolve(__dirname, 'public/icons'), to: 'icons' },
        ],
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      }),
    ],
  };

  return config;
};
