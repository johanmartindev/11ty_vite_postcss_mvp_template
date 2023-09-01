const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const postCss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPassthroughCopy({ "assets/images": "img" });
  eleventyConfig.addPassthroughCopy({ "assets/css": "css" });
  eleventyConfig.addWatchTarget("assets/**/*.scss");

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    serverOptions: {
      port: 9090,
    },
    viteOptions: {
      clearScreen: true,
      server: {
        mode: "development",
        middlewareMode: true,
      },
      css: {
        devSourceMap: true,
        postcss: {
          plugins: [postcssPresetEnv(), cssnano({ preset: "default" })],
        },
      },

      build: {
        mode: "production",
        sourcemap: true,
        manifest: true,
      },
      resolve: {
        alias: {
          "~icons": path.resolve(__dirname, "node_modules/bootstrap-icons"),
          "/node_modules": path.resolve(__dirname, "node_modules"),
        },
      },
    },
  });

  return {
    templateFormats: ["njk"],
    dir: {
      layouts: "_layouts",
      includes: "_includes",
    },
  };
};
