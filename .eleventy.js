module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes" // Isso garante que ele ache seus layouts
    }
  };
};
