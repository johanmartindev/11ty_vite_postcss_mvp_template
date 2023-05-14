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
  eleventyConfig.addWatchTarget('./includes/css/*.css');
	eleventyConfig.addNunjucksAsyncFilter('postcss', postcssFilter);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      publicDir: 'public',
			clearScreen: false,
			server: {
				mode: 'development',
				middlewareMode: true,
			},
			appType: 'custom',
      build: {
        sourcemap: 'true',
        manifest: true
      },
      css: {
        postcss: {
          plugins: [
            autoprefixer()
          ]
        }
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
      layouts: 'layouts',
      includes: 'includes',
      output: 'dist'
    }
  }
};
