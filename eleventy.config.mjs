import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import sass from "vite-plugin-sass";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.watchIgnores.add("README.md");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setTemplateFormats("njk");
  eleventyConfig.addTemplateFormats(["css", "scss"]);
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "img" });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    serverOptions: {
      port: 9090,
    },
    viteOptions: {
      plugins: [sass()],
      clearScreen: true,
      server: {
        mode: "development",
        middlewareMode: true,
      },
      css: {
        evSourceMap: true,
        transformer: "lightningcss",
        lightningcss: {
          targets: browserslistToTargets(browserslist(">= 0.25%")),
        },
      },
      build: {
        cssMinify: "lightningcss",
        mode: "production",
        emptyOutDir: true,
        sourcemap: true,
        manifest: true,
      },
      resolve: {
        alias: {
          "~icons": path.resolve(__dirname, "node_modules/bootstrap-icons"),
          "/node_modules": path.resolve(__dirname, "node_modules"),
          "@/": `${path.resolve(__dirname, "src")}/`,
        },
      },
    },
  });
}
