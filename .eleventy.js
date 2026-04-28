module.exports = function(eleventyConfig) {

  // 🚀 Passa diretórios estáticos
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  // 📅 Filtro de data
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

      const slug = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");

      if (!map[nome]) {
        map[nome] = {
          nome,
          slug,
          foto_artista: artistaData.foto_artista || null,
          genero_principal: artistaData.genero_principal || null,
          discos: []
        };
      }

      map[nome].discos.push(disco);
    });

    return Object.values(map);
  });

  // 📀 COLEÇÃO DISCOS (CORRIGIDA E SEGURA)
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
    return collectionApi.getFilteredByGlob("2026/1/*.md")
      .filter(item => item.data.album)
      .sort((a, b) => {
        const dateA = new Date(a.data.date);
        const dateB = new Date(b.data.date);
        return dateB - dateA;
      });
  });

  // 🌟 Configuração de diretórios
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
