module.exports = function(eleventyConfig) {
  
  // Cópias de pastas estáticas
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  // FILTRO DE DATA (O que causou o erro no Netlify)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString('pt-BR');
  });

  // Coleção organizada (O segredo para não embaralhar)
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album)
      .sort((a, b) => {
        // Tenta usar o campo 'date' do Admin, se não tiver, usa a data do arquivo
        const dataA = a.data.date ? new Date(a.data.date) : a.date;
        const dataB = b.data.date ? new Date(b.data.date) : b.date;
        return dataB - dataA; // Mais novo primeiro
      });
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
