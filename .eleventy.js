module.exports = function(eleventyConfig) {
  
  // 1. COPIAR APENAS PASTAS DE MÍDIA E SISTEMA
  // Removemos o PassthroughCopy das pastas de anos (2021, 2023, etc.)
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");
  
  // 2. A COLEÇÃO QUE ORGANIZA DE VERDADE
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    // Pegamos todos os arquivos .md dentro das pastas de anos
    return collectionApi.getFilteredByGlob(["2021/**/*.md", "2023/**/*.md", "2025/**/*.md", "2026/**/*.md"])
      .filter(item => item.data.album) // Garante que só pegue álbuns
      .sort((a, b) => {
        // Usa a data do arquivo (campo 'date' no topo do .md)
        return (b.date || 0) - (a.date || 0);
      });
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
