module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("pt-BR");
  });

  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };

};
