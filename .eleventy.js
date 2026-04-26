module.exports = function(eleventyConfig) {
  
  // 1. Cópia de arquivos estáticos (Imagens, Admin, etc.)
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");
  
  // Importante: Se você guarda as capas dentro das pastas de ano, 
  // essas linhas garantem que elas apareçam no site final.
  eleventyConfig.addPassthroughCopy("2021");
  eleventyConfig.addPassthroughCopy("2023");
  eleventyConfig.addPassthroughCopy("2025");
  eleventyConfig.addPassthroughCopy("2026");

  // 2. A Mágica: Criando a coleção que coloca o álbum NOVO na frente
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album) // Só pega arquivos que têm o campo "album"
      .sort((a, b) => {
        // Compara as datas: o mais recente ganha a primeira posição
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
