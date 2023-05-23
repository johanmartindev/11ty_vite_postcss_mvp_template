"use strict";

/*
 * Require the path module
 */
const path = require("path");

/*
 * Require the Fractal module
 */
const fractal = (module.exports = require("@frctl/fractal").create());

/*
 * Give your project a title.
 */
fractal.set("project.title", "Design");

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set("path", path.join(__dirname, "components"));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set("path", path.join(__dirname, "docs"));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set("static.path", path.join(__dirname, "public"));

/*
 * Setup nunjucks
 */
fractal.components.engine("@frctl/nunjucks"); // register the Nunjucks adapter for your components
fractal.components.set("ext", ".njk"); // look for files with a .njk file extension
