module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("Imagens");
  eleventyConfig.addPassthroughCopy("ArtistaFotos");
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("pt-BR");
  });
  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return "";
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  });
  eleventyConfig.addFilter("todosArtistas", function(artista, extras) {
    const nomes = [artista];
    if (extras && Array.isArray(extras)) {
      extras.forEach(e => nomes.push(e.nome || e));
    }
    if (nomes.length === 1) return nomes[0];
    return nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
  });
  const getDate = (item) =>
    new Date(item.data.data_postagem || item.date || 0).getTime();
  const sortByDate = (a, b) => getDate(b) - getDate(a);
  const normalizeArtistList = (lista) => {
    if (!lista) return [];
    return Array.isArray(lista) ? lista : [lista];
  };
  eleventyConfig.addCollection("artistas", function (collectionApi) {
    const discos = collectionApi.getAll()
      .filter(i => i.data.album && (i.data.artistas || i.data.artista));
    const map = {};
    discos.forEach(disco => {
      const lista = normalizeArtistList(
        disco.data.artistas || disco.data.artista
      );
      lista.forEach(nome => {
        if (!nome) return;
        const slug = nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
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
    });
    return Object.values(map);
  });
  eleventyConfig.addCollection("meusDiscos", function (collectionApi) {
    return collectionApi.getAll()
      .filter(i => i.data.album && i.data.tipo !== "ep" && !i.data.archive)
      .sort(sortByDate);
  });
  eleventyConfig.addCollection("discosArquivados", function (collectionApi) {
    return collectionApi.getAll()
      .filter(i => i.data.album && i.data.tipo !== "ep" && i.data.archive === true)
      .sort(sortByDate);
  });
  eleventyConfig.addCollection("meusEPs", function (collectionApi) {
    return collectionApi.getAll()
      .filter(i => i.data.tipo === "ep")
      .sort(sortByDate);
  });
  eleventyConfig.addCollection("tudo2026", function (collectionApi) {
    return collectionApi.getAll()
      .filter(i => i.data.album && !i.data.archive)
      .sort(sortByDate);
  });
  eleventyConfig.addCollection("todasReviews", function (collectionApi) {
    return collectionApi.getAll()
      .filter(i => i.data.album)
      .sort(sortByDate);
  });
  eleventyConfig.addCollection("top2026", function (collectionApi) {
    return collectionApi.getAll()
      .filter(i => i.data.album && !i.data.archive)
      .sort((a, b) => (b.data.nota || 0) - (a.data.nota || 0))
      .slice(0, 6);
  });
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
