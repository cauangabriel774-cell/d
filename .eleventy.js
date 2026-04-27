module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("pt-BR");
  });

  // 🔥 COLEÇÃO ARTISTAS
  eleventyConfig.addCollection("artistas", function(collectionApi) {
    const discos = collectionApi.getAll().filter(i => i.data.artista);

    const map = {};

    discos.forEach(disco => {

      const artistaData = disco.data;
      const nome = artistaData.artista;

      // slug seguro
      const slug = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");

      // cria artista se não existir
      if (!map[nome]) {
        map[nome] = {
          nome,
          slug,
          foto_artista: null,
          genero_principal: null,
          discos: []
        };
      }

      // pega dados do CMS (primeiro que aparecer)
      if (!map[nome].foto_artista && artistaData.foto_artista) {
        map[nome].foto_artista = artistaData.foto_artista;
      }

      if (!map[nome].genero_principal && artistaData.genero_principal) {
        map[nome].genero_principal = artistaData.genero_principal;
      }

      map[nome].discos.push(disco);
    });

    return Object.values(map);
  });

  // 📀 COLEÇÃO DISCOS
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
