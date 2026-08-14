const path = require("node:path");
const Image = require("@11ty/eleventy-img");
const { minify } = require("html-minifier-terser");
const site = require("./src/_data/site.cjs");

const inputRoot = path.resolve(__dirname, "src");
const outputRoot = path.resolve(__dirname, "dist");

function generatedName(id, source, width, format) {
  const base = path.basename(source, path.extname(source)).toLowerCase();
  return `${base}-${width}.${format === "jpeg" ? "jpg" : format}`;
}

module.exports = function configure(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setTemplateFormats(["njk", "md"]);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images/reference": "assets/images/reference" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/manifest.webmanifest": "manifest.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  eleventyConfig.addNunjucksAsyncShortcode(
    "responsiveImage",
    async function responsiveImage(source, alt, className, sizes, loading, fetchPriority, preset) {
      if (!source) return "";
      const widths = preset === "hero" ? [480, 768, 1200, 1600] : [320, 480, 768, 1200];
      const metadata = await Image(source, {
        widths,
        formats: ["avif", "webp", "jpeg"],
        outputDir: path.join(outputRoot, "assets/images/generated"),
        urlPath: `${site.pathPrefix}assets/images/generated/`,
        filenameFormat: generatedName,
        sharpOptions: { animated: false }
      });

      const attrs = {
        alt: alt || "",
        class: className || "",
        sizes: sizes || "100vw",
        loading: loading || "lazy",
        decoding: "async"
      };
      if (fetchPriority) attrs.fetchpriority = fetchPriority;
      return Image.generateHTML(metadata, attrs, { whitespace: false });
    }
  );

  eleventyConfig.addFilter("take", (items, count) => (items || []).slice(0, count));
  eleventyConfig.addFilter("where", (items, key, value) => (items || []).filter((item) => item[key] === value));
  eleventyConfig.addFilter("assetUrl", (value) => {
    const clean = String(value || "").replace(/^\/+/, "");
    return `${site.pathPrefix}${clean}`;
  });
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("slug", (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));

  eleventyConfig.addTransform("minify-html", function minifyHtml(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) return content;
    return minify(content, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      sortAttributes: true,
      sortClassName: true
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    pathPrefix: site.pathPrefix,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
