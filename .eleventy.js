module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");
  
  // Forçar o Eleventy a ler as pastas de anos, mas sem tratar como arquivo estático
  // Isso garante que ele processe o conteúdo dentro delas
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album) // Só o que tem campo 'album'
      .sort((a, b) => {
        // A MÁGICA: Tentamos pegar a data do Admin (a.data.date) 
        // Se não existir, pegamos a data do arquivo (a.date)
        const dataA = a.data.date ? new Date(a.data.date) : a.date;
        const dataB = b.data.date ? new Date(b.data.date) : b.date;
        
        return dataB - dataA; // Novo na frente
      });
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
