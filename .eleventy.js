module.exports = function(eleventyConfig) {

  // Arquivos estáticos
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  // Filtro de data
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("pt-BR");
  });

  // COLEÇÃO CORRETA (ordenada por data)
  eleventyConfig.addCollection("buscaDiscos", function(collectionApi) {
  return collectionApi.getAll()
    .filter(item => item.data.album)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(item => {
      return {
        title: item.data.album,
        artist: item.data.artista,
        url: item.url,
        img: item.data.imagem
      };
    });
});

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
