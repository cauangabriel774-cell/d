module.exports = function(eleventyConfig) {

  // 1. **Cópias de Pastas**: Copiar pastas de arquivos estáticos para o diretório de saída (_site).
  const passthroughFiles = [
    "admin",          // Pasta do admin
    "Imagens",        // Pasta de imagens
    "ArtistaFotos"    // Fotos dos artistas
  ];
  
  passthroughFiles.forEach((folder) => {
    eleventyConfig.addPassthroughCopy(folder);
  });

  // 2. **Filtro de Data**: Formatar as datas no formato pt-BR.
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString('pt-BR');
  });

  // 3. **Coleção 'meusDiscos'**: Exibir álbuns ordenados por data de postagem.
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album)  // Filtra por "album" no frontmatter
      .sort((a, b) => {
        const dataA = a.data.data_postagem ? new Date(a.data.data_postagem) : new Date(a.date || 0);
        const dataB = b.data.data_postagem ? new Date(b.data.data_postagem) : new Date(b.date || 0);
        return dataB - dataA; // Recentes primeiro
      });
  });

  // 4. **Coleção 'artistas'**: Criar uma coleção para listar artistas.
  eleventyConfig.addCollection("artistas", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.artista)  // Filtra por "artista"
      .sort((a, b) => {
        const dataA = a.data.data_postagem ? new Date(a.data.data_postagem) : new Date(a.date || 0);
        const dataB = b.data.data_postagem ? new Date(b.data.data_postagem) : new Date(b.date || 0);
        return dataB - dataA; // Recentes primeiro
      });
  });

  // 5. **Outras Configurações e Otimizações**:
  // - Adiciona o filtro "sortByDate" para ordenar por data (se necessário em outros casos).
  eleventyConfig.addFilter("sortByDate", (array) => {
    return array.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // 6. **Exclusão de Arquivos Temporários**: Para fins de otimização, se você deseja ignorar certos arquivos.
  // Exemplo: Ignorar arquivos específicos ou pastas desnecessárias
  // eleventyConfig.addPassthroughCopy("*.bak"); // Ignorar arquivos .bak
  // eleventyConfig.addPassthroughCopy("temporaryFolder"); // Ignorar pasta temporária
  
  // 7. **Diretórios de Entrada e Saída**:
  // Configurações do diretório de entrada (input) e diretório de saída (output) do site
  return {
    dir: {
      input: ".",           // Diretório de entrada
      output: "_site",      // Diretório de saída
      includes: "_includes", // Diretório de includes
      data: "_data",        // Diretório de dados (se você tiver algum)
    }
  };
};
