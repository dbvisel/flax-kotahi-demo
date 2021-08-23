module.exports = function (eleventyConfig) {
  // Layout aliases for convenience
  eleventyConfig.addLayoutAlias("default", "layouts/_base.njk");

  // a debug utility
  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
