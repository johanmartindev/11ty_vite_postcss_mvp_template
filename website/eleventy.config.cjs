const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const autoprefixer = require("autoprefixer");
const postCss = require('postcss');
const cssnano = require('cssnano');

const postcssFilter = (cssCode, done) => {
	// we call PostCSS here.
	postCss([ autoprefixer(), cssnano({ preset: 'default' })])
		.process(cssCode, {
			// path to our CSS file
			from: './includes/css/mvp.css'
		})
		.then(
			(r) => done(null, r.css),
			(e) => done(e, null)
		);
};

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({'src/assets/': 'assets'});
  eleventyConfig.addWatchTarget('./includes/css/*.css');
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
      port: 8000,
      watch: ["src/**/*.css"],
    }
  });

  return {
    templateFormats: ["md", "html", "liquid", "njk"],
    dir: {
      layouts: 'src/layouts',
      includes: 'src/includes',
      output: 'dist'
    }
  }
};
