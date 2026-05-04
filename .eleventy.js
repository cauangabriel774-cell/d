module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("pt-BR");
  });

  eleventyConfig.addCollection("artistas", function(collectionApi) {
    const discos = collectionApi.getAll().filter(i => i.data.artista);
    const map = {};

    discos.forEach(disco => {
      const nome = disco.data.artista;

      const slug = nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");

      if (!map[nome]) {
        map[nome] = {
          nome,
          slug,
          foto_artista: disco.data.foto_artista || null,
          genero_principal: disco.data.genero_principal || null,
          discos: []
        };
      }

      map[nome].discos.push(disco);
    });

    return Object.values(map);
  });

  
  eleventyConfig.addCollection("meusDiscos", function(collectionApi) {
  return collectionApi.getAll()
    .filter(i => i.data.album)
    .filter(i => !i.data.archive) 
    .sort((a, b) => {
      
      const dateA = new Date(a.data.data_postagem || a.date || 0);
      const dateB = new Date(b.data.data_postagem || b.date || 0);
      return dateB - dateA; 
    });
  });

  
  eleventyConfig.addCollection("discosArquivados", function(collectionApi) {
  return collectionApi.getAll()
    .filter(i => i.data.album)
    .filter(i => i.data.archive === true) 
    .sort((a, b) => {
      const dateA = new Date(a.data.data_postagem || a.date || 0);
      const dateB = new Date(b.data.data_postagem || b.date || 0);
      return dateB - dateA;
    });
  });
