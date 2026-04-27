eleventyConfig.addCollection("artistas", function(collectionApi) {
  const discos = collectionApi.getAll().filter(item => item.data.artista);

  const artistasMap = {};

  discos.forEach(disco => {
    const nome = disco.data.artista;

    if (!artistasMap[nome]) {
      artistasMap[nome] = {
        nome,
        slug: nome.toLowerCase().replace(/\s+/g, '-'),
        discos: []
      };
    }

    artistasMap[nome].discos.push(disco);
  });

  return Object.values(artistasMap);
});
