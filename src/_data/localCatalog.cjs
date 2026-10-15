const locations = require("./locations.cjs");
const portfolio = require("./portfolio.cjs");
const themes = require("./themes.cjs");

// Curadoria editorial fixa. Não representa popularidade, estoque ou preferência por bairro.
const citySelection = [
  "safari-baby", "bluey", "dinossauros", "borboletas-e-flores",
  "happy-birthday", "cha-revelacao", "toy-story", "corinthians"
];
const neighborhoodSelection = [
  "safari-baby", "bluey", "dinossauros", "borboletas-e-flores",
  "happy-birthday", "cha-revelacao"
];

const themesBySlug = new Map(themes.details.map((theme) => [theme.slug, theme]));
const groupsBySlug = new Map(portfolio.catalog.map((group) => [group.slug, group]));
const categoryLabels = {
  "Infantil e personagens": "Festa infantil",
  "Adultos e comemorações": "Adultos",
  "Chás e ocasiões especiais": "Ocasiões especiais"
};

function resolveSelection(slugs) {
  return slugs.map((slug) => {
    const theme = themesBySlug.get(slug);
    const group = theme && groupsBySlug.get(theme.catalogSlug);
    const imageMatches = Boolean(group && theme.heroImage && group.images.some(
      (image) => image.generatedBase === theme.heroImage.generatedBase
    ));

    if (!theme || !group || !theme.indexable || theme.editorialStatus !== "REVIEWED" ||
        theme.needsNameConfirmation || group.nameNeedsConfirmation || group.imageAssociationNeedsConfirmation || !imageMatches) {
      throw new Error(`Tema não elegível na curadoria de localidades: ${slug}`);
    }

    return {
      slug: theme.slug,
      name: theme.name,
      path: theme.path,
      categoryLabel: categoryLabels[theme.categoryLabel] || theme.categoryLabel,
      heroImage: theme.heroImage,
      availabilityStatus: "CONSULTATION_REQUIRED"
    };
  });
}

const cityThemes = Object.fromEntries(locations.cities.map((city) => [city.slug, resolveSelection(citySelection)]));
const neighborhoodThemes = resolveSelection(neighborhoodSelection);

function catalogGroupsFor(citySlug, isCity) {
  const curatedThemes = isCity ? cityThemes[citySlug] : neighborhoodThemes;
  if (!curatedThemes) throw new Error(`Curadoria local ausente para ${citySlug}`);

  const curatedGroups = curatedThemes.map((theme) => {
    const detail = themesBySlug.get(theme.slug);
    const group = detail && groupsBySlug.get(detail.catalogSlug);
    if (!group) throw new Error(`Grupo de catálogo ausente para ${theme.slug}`);
    return group;
  });
  const curatedSlugs = new Set(curatedGroups.map((group) => group.slug));
  return [...curatedGroups, ...portfolio.catalog.filter((group) => !curatedSlugs.has(group.slug))];
}

module.exports = {
  cityThemes,
  neighborhoodThemes,
  catalogGroupsFor,
  catalogCount: portfolio.catalog.length,
  hasMountedExamples: portfolio.catalog.some((group) => group.hasMountedExample),
  curation: {
    basis: "Seleção editorial estável de temas revisados e imagens associadas; sem dados de preferência ou disponibilidade por localidade.",
    citySlugs: locations.cities.map((city) => city.slug),
    neighborhoodCount: neighborhoodThemes.length
  }
};
