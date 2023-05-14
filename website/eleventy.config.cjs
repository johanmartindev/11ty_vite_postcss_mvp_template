
module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/css/");
  return {
    dir: { input: 'src' }
  }
};
