eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.data.album)
      .sort((a, b) => {
        // Agora usamos o campo 'data_postagem' que você criou
        // Se não tiver (posts antigos), ele usa a data do arquivo
        const dataA = a.data.data_postagem ? new Date(a.data.data_postagem) : a.date;
        const dataB = b.data.data_postagem ? new Date(b.data.data_postagem) : b.date;
        
        return dataB - dataA; // Recentes primeiro
      });
  });
