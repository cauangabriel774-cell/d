module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");
  eleventyConfig.addPassthroughCopy("2021");
  eleventyConfig.addPassthroughCopy("2023");
  eleventyConfig.addPassthroughCopy("2025");
  eleventyConfig.addPassthroughCopy("2026");

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
