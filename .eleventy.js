module.exports = function(eleventyConfig) {
  
  // 1. Cópias de pastas
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  // 2. Filtro de Data para o Layout
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString('pt-BR');
  });

  // 3. Coleção meusDiscos (A prova de falhas)
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album)
      .sort((a, b) => {
        // Tentamos pegar o novo campo 'data_postagem'. 
        // Se não existir, tentamos o 'date'.
        // Se nenhum existir, usamos o tempo de criação do arquivo.
        const dataA = a.data.data_postagem ? new Date(a.data.data_postagem) : (a.data.date ? new Date(a.data.date) : a.date);
        const dataB = b.data.data_postagem ? new Date(b.data.data_postagem) : (b.data.date ? new Date(b.data.date) : b.date);
        
        return dataB - dataA; // Recentes primeiro
      });
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
