const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const WebpackHookPlugin = require("webpack-hook-plugin");

const files = {
  templates_scssPath: "./src/scss/templates/*.scss",
  critical_scssPath: "./src/scss/critical.scss",
  common_scssPath: "./src/scss/common.scss",
  layout_scssPath: "./src/scss/layouts/*.scss",

  templates_jsPath: "./src/scripts/templates/*.js",
  critical_jsPath: "./src/scripts/critical.js",
  common_jsPath: "./src/scripts/common.js",

  assetsDir: __dirname + "/assets",
  snippetsDir: __dirname + "/snippets",
  resources: __dirname + "/src/scss/resources.scss",
};

function mergePaths(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(...glob.sync(arr[i]));
  }
  return result;
}

function templatesEntry(arr, isJS = false) {
  let entries = {};
  for (let i = 0; i < arr.length; i++) {
    for (let file of glob.sync(arr[i])) {
      const rgx = /[^\\\/]+(?=\.)/g;
      const fileName = isJS ? file.match(rgx)[0] + '-js' : file.match(rgx)[0];
      entries[fileName] = file;
    }
  }
  return entries;
}
const entries = {
  common: mergePaths([files.common_scssPath, files.common_jsPath]),
  ...templatesEntry([files.templates_scssPath, files.layout_scssPath]),
  ...templatesEntry([files.templates_jsPath], true),
};

const config = {
  mode: "production",
  resolve: {
    // resolve file extensions
    extensions: [".scss", ".js", ".css"],
  },
  watchOptions: {
    ignored: "**/node_modules",
  },
  watch: true,
};

const commonFilesConfig = Object.assign({}, config, {
  name: "Common",
  entry: entries,
  output: {
    filename: "[name].min.js",
    path: files.assetsDir,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              sourceMap: false,
              resources: [files.resources],
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
    }),
    new WebpackHookPlugin({
      onBuildExit: ["node clean.js"],
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
});

const criticalCssConfig = Object.assign({}, config, {
  name: "Liquid CSS",
  entry: {
    "critical-css": files.critical_scssPath,
  },
  output: {
    path: files.snippetsDir,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].liquid",
    }),
  ],
});
const criticalJsConfig = Object.assign({}, config, {
  name: "Liquid JS",
  entry: {
    "critical-js": files.critical_jsPath,
  },
  output: {
    filename: "[name].liquid",
    path: files.snippetsDir,
    module: true,
  },
  experiments: {
    outputModule: true,
  },
});

module.exports = [commonFilesConfig, criticalCssConfig, criticalJsConfig];