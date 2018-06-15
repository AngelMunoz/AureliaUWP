const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./aurelia_project/aurelia.json');
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const title = 'Aurelia Navigation Skeleton';
const outDir = path.resolve(__dirname, project.platform.output);
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/dist/';

const cssRules = [
  { loader: 'css-loader' },
];

module.exports = ({production, server, extractCss, coverage, analyze} = {}) => ({
  resolve: {
    extensions: ['.js'],
    modules: [srcDir, 'node_modules'],
  },
  entry: {
    main: ['aurelia-bootstrapper'],
  },
  mode: production ? 'production' : 'development',
  output: {
    path: outDir,
    publicPath: baseUrl,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[name].chunk.js'
  },
  performance: { hints: false },
  devServer: {
    contentBase: outDir,
    // serve index.html for all 404 (required for push-state)
    historyApiFallback: true
  },
  devtool: production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
      // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
      {
        test: /\.css$/i,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: extractCss ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssRules
        }) : ['style-loader', ...cssRules],
      },
      {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: cssRules
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        issuer: /\.[tj]s$/i
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader'],
        issuer: /\.html?$/i
      },
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.js$/i, loader: 'babel-loader', exclude: nodeModulesDir,
        options: coverage ? { sourceMap: 'inline', plugins: [ 'istanbul' ] } : {},
      },
      { test: /\.json$/i, loader: 'json-loader' },
      // embed small images and fonts as Data Urls and larger ones as files:
      { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
      // load these fonts normally, as files:
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
    ]
  },
  plugins: [
    new AureliaPlugin(),
    new ModuleDependenciesPlugin({
      'aurelia-testing': [ './compile-spy', './view-spy' ]
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      minify: production ? {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        ignoreCustomFragments: [/\${.*?}/g]
      } : undefined,
      metadata: {
        // available in index.ejs //
        title, server, baseUrl
      }
    }),
    ...when(extractCss, new ExtractTextPlugin({
      filename: production ? '[contenthash].css' : '[id].css',
      allChunks: true
    })),
    ...when(production, new CopyWebpackPlugin([
      { from: 'static/favicon.ico', to: 'favicon.ico' }])),
    ...when(analyze, new BundleAnalyzerPlugin())
  ]
});
