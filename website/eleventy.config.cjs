const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const autoprefixer = require("autoprefixer");
const postCss = require('postcss');
const cssnano = require('cssnano');

const postcssFilter = (cssCode, done) => {
	// we call PostCSS here.
	postCss([ autoprefixer(), cssnano({ preset: 'default' })])
		.process(cssCode, {
			// path to our CSS file
			from: 'styles.css'
		})
		.then(
			(r) => done(null, r.css),
			(e) => done(e, null)
		);
};

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({'src/assets/images': 'img'});
  eleventyConfig.addWatchTarget('src/**/*.css');
	eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
			clearScreen: true,
      build: {
        sourcemap: 'true',
        manifest: true
      }
    },
    serverOptions: {
      port: 8000
    }
  });

  return {
    templateFormats: ["md", "html", "liquid", "njk"],
    dir: {
      input: 'src',
      layouts: 'layouts',
      includes: 'includes'
    }
  }
};
