/**
 * 可选的配置文件
 */

const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启 GZip 压缩
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios",
  "element-ui": "ELEMENT",
  _: "lodash",
};

// cnd 配置
const cdn = {
  // 开发环境
  dev: {
    css: [
      "https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.7/theme-chalk/index.css",
    ],
    js: [],
  },
  // 生产环境
  build: {
    css: [
      "https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.7/theme-chalk/index.css",
    ],
    js: [
      "https://cdn.bootcss.com/vue/2.5.17/vue.min.js",
      "https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js",
      "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
      "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
      "https://cdn.bootcss.com/lodash.js/4.17.11/lodash.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.7/index.js",
    ],
  },
};

// 是否使用gzip
const productionGzip = true;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ["js", "css"];
// vue.config.js
module.exports = {
  // 选项...
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建 默认 true
  /**
   *如果这个值是一个函数，则会接收被解析的配置作为参数。
   该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
   */
  configureWebpack: (config) => {
    const myConfig = {}; // 定义一个我的配置
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置... 生产环境 npm 包 转 cdn
      myConfig.externals = externals;

      myConfig.plugins = [];
      // 构建时开启gzip,降低服务器压缩对CPU资源的占用,服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 10240,
            minRatio: 0.8,
          })
        );
    } else {
      // 为开发环境修改配置...
      /**
       * 关闭host check,方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true,
      };
    }
    return myConfig; // 返回新的配置
  },
  /**
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
   * 允许对内部的 webpack 配置进行更细粒度的修改。
   */
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");

    config.plugin("html").tap((args) => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },
};
