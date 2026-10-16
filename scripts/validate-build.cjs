const fs = require("node:fs");
const path = require("node:path");
const site = require("../src/_data/site.cjs");
const faqs = require("../src/_data/faqs.cjs");
const locations = require("../src/_data/locations.cjs");
const portfolio = require("../src/_data/portfolio.cjs");
const themes = require("../src/_data/themes.cjs");
const themeEditorialReviews = require("../src/_data/themeEditorialReviews.cjs").reviews;
const localCatalog = require("../src/_data/localCatalog.cjs");
const commercial = require("../src/_data/commercial.cjs");

const root = path.resolve(__dirname, "../dist");
const required = [
  "index.html", "servicos/index.html", "pegue-e-monte/index.html",
  "mini-festa-na-mesa/index.html", "portfolio/index.html", "como-funciona/index.html",
  "sobre/index.html", "duvidas/index.html", "contato/index.html", "parceiros/index.html",
  "regioes-atendidas/index.html", "temas/index.html", "404.html", "robots.txt", "sitemap.xml", "llms.txt",
  "favicon.svg", "assets/css/styles.css", "assets/js/main.js"
];
const allowedCoverageStatuses = new Set(["UNCONFIRMED", "CONFIRMED", "CONDITIONAL", "NOT_OFFERED", "CONFIRMED_WITH_PICKUP"]);
const publishableStatus = "PUBLIC_INDEX";
const publicStatuses = new Set(["PUBLIC_INDEX", "PUBLIC_NOINDEX"]);
const stopWords = new Set([
  "a", "ao", "aos", "as", "com", "como", "da", "das", "de", "do", "dos", "e", "em", "entre",
  "essa", "esse", "esta", "este", "para", "pela", "pelas", "pelo", "pelos", "por", "que", "se",
  "sem", "sua", "suas", "seu", "seus", "uma", "umas", "uns", "nas", "nos", "na", "no", "ou",
  "lela", "decorações", "joinville", "araquari", "paranaguamirim", "santa", "catarina", "sc",
  "festa", "festas", "endereço", "bairro", "cidade", "data", "serviço", "serviços", "consulte",
  "confirmar", "confirme", "disponibilidade", "retirada", "entrega", "condições", "tema", "temas"
]);

function fail(message) {
  console.error(`Build inválido: ${message}`);
  process.exit(1);
}

const faqIds = new Set();
if (!Array.isArray(faqs) || !faqs.length || faqs.some((faq) => {
  if (!faq.id || faqIds.has(faq.id) || !faq.category || !faq.confirmationStatus || !faq.services?.length || !faq.source?.length) return true;
  faqIds.add(faq.id);
  return faq.source.some((source) => !fs.existsSync(path.join(__dirname, "../src", source.replace(/^\//, ""), "index.njk")));
})) fail("cadastro central de FAQs sem IDs únicos, fontes locais ou status de confirmação");

function normalizeText(value) {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function visibleTextFromHtml(value) {
  return normalizeText(String(value)
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " "));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readOutput(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function routeForHtml(file) {
  if (file === "index.html") return "/";
  if (file === "404.html") return "/404.html";
  if (String(file).endsWith("/index.html")) return `/${path.posix.dirname(String(file))}/`;
  return `/${file}`;
}

function localPathToFile(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath.split(/[?#]/, 1)[0] || "/");
  } catch {
    fail(`URL local contém escape inválido: ${urlPath}`);
  }
  if (site.pathPrefix !== "/" && pathname.startsWith(site.pathPrefix)) {
    pathname = `/${pathname.slice(site.pathPrefix.length)}`;
  }
  const relative = pathname.replace(/^\/+/, "");
  const target = path.resolve(root, relative);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
    fail(`URL local sai do diretório de build: ${urlPath}`);
  }
  if (pathname.endsWith("/")) return path.join(target, "index.html");
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) return path.join(target, "index.html");
  return target;
}

function filesUnder(directory, extension) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { recursive: true })
    .filter((file) => String(file).toLowerCase().endsWith(extension))
    .map((file) => String(file));
}

function schemasIn(html, file) {
  return [...html.matchAll(/<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch {
      fail(`JSON-LD inválido em ${file}`);
    }
  });
}

function schemaOfType(schemas, type) {
  return schemas.find((item) => item["@type"] === type);
}

function sourceIsValid(source, allowedHost) {
  if (!source || !source.title || !source.checkedAt || !/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt)) return false;
  try {
    const url = new URL(source.url);
    if (url.protocol !== "https:") return false;
    return !allowedHost || allowedHost(url.hostname);
  } catch {
    return false;
  }
}

function commercialSources(record) {
  return [
    ...(Array.isArray(record.commercialSources) ? record.commercialSources : []),
    ...(record.commercialSource ? [record.commercialSource] : [])
  ];
}

function hasCommercialEvidence(record) {
  const publicEvidence = commercialSources(record).some((source) => sourceIsValid(source));
  const ownerEvidence = (record.commercialEvidence || []).some((evidence) =>
    evidence.type === "OWNER_CONFIRMATION" &&
    Boolean(evidence.confirmedBy && evidence.statement) &&
    /^\d{4}-\d{2}-\d{2}$/.test(evidence.checkedAt || "")
  );
  return publicEvidence || ownerEvidence;
}

function hasConfirmedFacts(record) {
  return Array.isArray(record.confirmedCommercialFacts) &&
    record.confirmedCommercialFacts.some((fact) => typeof fact === "string" && fact.trim().length >= 12);
}

function validateContent(page) {
  const content = page.content;
  const fields = ["title", "description", "eyebrow", "h1", "intro", "detailTitle", "detailText", "whatsappMessage", "whatsappLabel"];
  if (!content || fields.some((field) => typeof content[field] !== "string" || !content[field].trim())) {
    fail(`conteúdo local incompleto: ${page.name}`);
  }
  if (content.description.length < 60 || content.intro.length < 70 || content.detailText.length < 80) {
    fail(`conteúdo local curto demais para uma página útil: ${page.name}`);
  }
  if (!Array.isArray(content.services) || !content.services.length) {
    fail(`página local sem serviços relacionados: ${page.name}`);
  }
  for (const service of content.services) {
    if (!service.name || !service.path || !service.description || service.description.length < 25) {
      fail(`serviço relacionado incompleto em ${page.name}`);
    }
  }
  if (!Array.isArray(content.faqs) || !content.faqs.length || content.faqs.some((faq) =>
    !faq.question || !faq.answer || faq.question.length < 12 || faq.answer.length < 45
  )) {
    fail(`perguntas locais incompletas: ${page.name}`);
  }
  for (const faq of content.faqs) {
    const source = faqs.byId?.get(faq.id);
    if (!source || source.answer !== faq.answer || source.category !== faq.category ||
        source.confirmationStatus !== faq.confirmationStatus || JSON.stringify(source.source) !== JSON.stringify(faq.source)) {
      fail(`FAQ local não corresponde à fonte central: ${faq.id || page.name}`);
    }
  }
  if (!content.h1.toLowerCase().includes(page.name.toLowerCase())) {
    fail(`H1 não identifica a localidade: ${page.name}`);
  }
}

function meaningfulTokens(page) {
  // Perguntas e respostas reutilizadas da fonte central não medem distinção editorial local.
  const texts = [page.content.title, page.content.h1, page.content.intro, page.content.detailTitle, page.content.detailText].join(" ");
  return new Set(
    texts.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, " ").split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word))
  );
}

function validateDistinctContent(pages) {
  const tokenSets = pages.map((page) => ({ page, tokens: meaningfulTokens(page) }));
  for (let left = 0; left < tokenSets.length; left++) {
    for (let right = left + 1; right < tokenSets.length; right++) {
      const first = tokenSets[left];
      const second = tokenSets[right];
      const union = new Set([...first.tokens, ...second.tokens]);
      const intersection = [...first.tokens].filter((token) => second.tokens.has(token)).length;
      const similarity = union.size ? intersection / union.size : 1;
      if (Math.min(first.tokens.size, second.tokens.size) >= 12 && similarity >= 0.82) {
        fail(`conteúdo regional quase duplicado: ${first.page.path} e ${second.page.path}`);
      }
    }
  }
}

function validateCatalogRegistry() {
  if (!Array.isArray(portfolio.all) || !Array.isArray(portfolio.catalog) || !Array.isArray(portfolio.categories)) {
    fail("catálogo ou inventário de imagens incompleto");
  }
  const categorySlugs = new Set(portfolio.categories.map((category) => category.slug));
  if (categorySlugs.size !== portfolio.categories.length || [...categorySlugs].some((slug) => !slug)) {
    fail("categorias do catálogo ausentes ou duplicadas");
  }

  const sourceByFile = new Map();
  const sourceIds = new Set();
  const generatedNames = new Set();
  for (const item of portfolio.all) {
    const file = `${item.folder}/${item.filename}`;
    if (sourceByFile.has(file)) fail(`imagem original cadastrada mais de uma vez: ${file}`);
    if (!fs.existsSync(item.sourcePath)) fail(`imagem original do catálogo ausente: ${file}`);
    if (!item.id || sourceIds.has(item.id)) fail(`id de imagem ausente ou duplicado: ${file}`);
    if (!item.generatedBase || generatedNames.has(item.generatedBase)) fail(`nome derivado de imagem ausente ou duplicado: ${file}`);
    if (item.slug !== slugify(item.themeName) || !categorySlugs.has(item.category)) {
      fail(`slug ou categoria de imagem inconsistente: ${file}`);
    }
    if (!["theme", "kit-example"].includes(item.sourceType) || !item.alt || !item.caption || item.width < 1 || item.height < 1) {
      fail(`metadados de imagem incompletos: ${file}`);
    }
    sourceByFile.set(file, item);
    sourceIds.add(item.id);
    generatedNames.add(item.generatedBase);
  }

  const groupSlugs = new Set();
  const groupNames = new Set();
  const catalogFiles = new Set();
  for (const group of portfolio.catalog) {
    const name = String(group.themeName || "").trim();
    if (!name || groupNames.has(name.toLocaleLowerCase("pt-BR"))) fail(`nome de tema ausente ou duplicado no catálogo: ${name}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(group.slug || "") || group.slug !== slugify(name) || groupSlugs.has(group.slug)) {
      fail(`slug de tema ausente, inválido ou duplicado: ${name}`);
    }
    if (!categorySlugs.has(group.category) || !Array.isArray(group.images) || group.images.length === 0) {
      fail(`grupo de catálogo sem categoria ou imagens: ${name}`);
    }
    groupNames.add(name.toLocaleLowerCase("pt-BR"));
    groupSlugs.add(group.slug);
    const groupFiles = new Set();
    for (const item of group.images) {
      const file = `${item.folder}/${item.filename}`;
      if (!sourceByFile.has(file) || groupFiles.has(file) || catalogFiles.has(file)) {
        fail(`imagem ausente ou repetida em grupos do catálogo: ${file}`);
      }
      if (item.themeName !== name || item.slug !== group.slug || item.category !== group.category) {
        fail(`imagem vinculada a tema, slug ou categoria errada: ${file}`);
      }
      groupFiles.add(file);
      catalogFiles.add(file);
    }
    if (group.previewImage?.themeName !== name || !group.images.includes(group.previewImage)) {
      fail(`imagem principal do grupo não pertence ao tema: ${name}`);
    }
    if (group.hasThemeReference !== group.images.some((item) => item.sourceType === "theme") ||
        group.hasMountedExample !== group.images.some((item) => item.sourceType === "kit-example")) {
      fail(`tipos de imagem do grupo não correspondem às fotos: ${name}`);
    }
    if (typeof group.nameNeedsConfirmation !== "boolean" || !group.searchText.includes(name)) {
      fail(`status de nome ou termos de busca ausentes: ${name}`);
    }
    if (portfolio.catalogByName[name] !== group) fail(`índice por nome não corresponde ao grupo: ${name}`);
  }
  if (catalogFiles.size !== sourceByFile.size || [...sourceByFile.keys()].some((file) => !catalogFiles.has(file))) {
    fail("cada imagem original deve pertencer a um único grupo de tema no catálogo");
  }
  if (!Array.isArray(portfolio.featuredCatalog) || portfolio.featuredCatalog.some((group) => !portfolio.catalog.includes(group))) {
    fail("seleção de temas em destaque aponta para grupos ausentes");
  }
}

function themeContentTokens(page) {
  const common = new Set([...stopWords, "acervo", "painel", "painéis", "referência", "referências", "foto", "fotos", "imagem", "imagens", "mesa", "montagem", "exemplo", "disponível", "disponibilidade", "consulta", "consultar", "data", "formato", "festa", "festas", "tema", "temas", "ideia", "ideias", "visual", "cores"]);
  const text = [page.intro, page.about, page.use, page.galleryTitle, page.galleryText, ...page.faqs.flatMap((faq) => [faq.question, faq.answer])].join(" ");
  return new Set(text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((word) => word.length > 3 && !common.has(word)));
}

function validateThemeRegistry() {
  if (!Array.isArray(themes.details) || !Array.isArray(themes.pages) || !Array.isArray(themes.published)) fail("cadastro de detalhes e páginas de temas incompleto");
  if (themes.details.length !== portfolio.catalog.length || themes.pages.length !== themes.details.length) fail("cada grupo do catálogo deve ter uma página de detalhe");
  const indexable = themes.details.filter((page) => page.indexable);
  if (indexable.length !== themes.published.length || indexable.some((page, index) => themes.published[index]?.path !== page.path)) {
    fail("themes.published deve conter somente detalhes marcados como indexáveis");
  }

  const slugs = new Set();
  const ids = new Set();
  const paths = new Set(["/temas/"]);
  const names = new Set();
  const catalogByFile = new Map(portfolio.all.map((item) => [`${item.folder}/${item.filename}`, item]));
  const publishedTitles = new Set();
  const publishedDescriptions = new Set();
  const publishedFaqQuestions = new Set();
  const uniqueCopy = new Map(["intro", "about", "use", "galleryTitle", "galleryText"].map((field) => [field, new Set()]));
  const publishedContentTokens = [];

  for (const [name, review] of Object.entries(themeEditorialReviews)) {
    const group = portfolio.catalogByName[name];
    if (!group || !review.visual || !review.editorial || !review.selection || !review.meta || !review.inspectedAt) {
      fail(`revisão editorial sem tema/imagem ou conteúdo verificável: ${name}`);
    }
    if (review.indexDecision === "PUBLIC_INDEX" && (group.nameNeedsConfirmation || group.imageAssociationNeedsConfirmation)) {
      fail(`tema com pendência de nome/imagem foi marcado para indexação: ${name}`);
    }
  }

  for (const page of themes.details) {
    const group = portfolio.catalogByName[page.name];
    if (!group || group.slug !== page.catalogSlug || page.id !== group.slug) fail(`detalhe sem grupo de catálogo correspondente: ${page.name}`);
    if (ids.has(page.id)) fail(`identificador de grupo duplicado: ${page.id}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug || "") || page.path !== `/temas/${page.slug}/`) fail(`slug ou URL inválido: ${page.name}`);
    if (slugs.has(page.slug) || paths.has(page.path)) fail(`slug ou URL de detalhe duplicado: ${page.path}`);
    const nameKey = String(page.name || "").trim().toLocaleLowerCase("pt-BR");
    if (!nameKey || names.has(nameKey)) fail(`nome de tema ausente ou duplicado: ${page.name || page.slug}`);
    ids.add(page.id);
    slugs.add(page.slug);
    paths.add(page.path);
    names.add(nameKey);

    if (!Array.isArray(page.images) || !page.images.length || page.images.length !== group.images.length) fail(`detalhe não inclui todas as imagens do grupo: ${page.name}`);
    const imageFiles = new Set();
    for (const image of page.images) {
      const file = `${image.folder}/${image.filename}`;
      const catalogItem = catalogByFile.get(file);
      if (!catalogItem || catalogItem.themeName !== page.name || catalogItem.sourceType !== image.sourceType ||
          !group.images.some((candidate) => `${candidate.folder}/${candidate.filename}` === file)) fail(`imagem não corresponde ao grupo ${page.name}: ${file}`);
      if (imageFiles.has(file)) fail(`imagem repetida na página ${page.name}: ${file}`);
      if (!image.alt || image.alt.length < 20 || !image.caption || image.caption.length < 12) fail(`imagem sem alt ou legenda útil: ${file}`);
      imageFiles.add(file);
    }
    if (group.images.some((image) => !imageFiles.has(`${image.folder}/${image.filename}`))) fail(`imagem original ausente do detalhe: ${page.name}`);
    const confirmationPending = group.nameNeedsConfirmation || group.imageAssociationNeedsConfirmation;
    if (page.indexable !== (page.editorialDecision === "PUBLIC_INDEX") ||
        (page.indexable && page.editorialStatus !== "REVIEWED") ||
        (confirmationPending && page.editorialDecision !== "CONFIRMATION_REQUIRED") ||
        (!confirmationPending && page.editorialDecision === "CONFIRMATION_REQUIRED") ||
        page.needsNameConfirmation !== group.nameNeedsConfirmation ||
        page.needsAssociationConfirmation !== group.imageAssociationNeedsConfirmation ||
        (page.indexable && (group.nameNeedsConfirmation || group.imageAssociationNeedsConfirmation))) {
      fail(`indexabilidade contradiz a revisão editorial ou de imagens do grupo: ${page.name}`);
    }
    if (page.availabilityStatus !== "VERIFY_BY_DATE") fail(`disponibilidade não pode ser afirmada sem consulta: ${page.name}`);
    if (themes.byName[page.name]?.path !== page.path) fail(`índice de detalhes por nome não aponta para a rota: ${page.name}`);
    if (!Array.isArray(page.related) || page.related.includes(page.name) || page.related.some((name) => !portfolio.catalogByName[name])) fail(`temas relacionados inválidos: ${page.name}`);

    const requiredText = ["name", "title", "description", "h1", "intro", "about", "use", "galleryTitle", "galleryText"];
    if (requiredText.some((field) => typeof page[field] !== "string" || !page[field].trim())) fail(`conteúdo de detalhe incompleto: ${page.name}`);
    if (!Array.isArray(page.faqs)) fail(`FAQ de detalhe precisa ser uma lista: ${page.name}`);
    if (page.indexable) {
      if (page.publicationStatus !== "PUBLIC_INDEX" || page.publicationBasis !== "CURATED_CATALOG_REFERENCE" || group.nameNeedsConfirmation || group.imageAssociationNeedsConfirmation) fail(`página indexável sem identificação editorial e visual confirmada: ${page.name}`);
      if (page.title.length < 30 || page.title.length > 65 || page.description.length < 80 || page.intro.length < 80 || page.about.length < 80 || page.use.length < 70) fail(`conteúdo indexável curto ou title extenso para página própria: ${page.name}`);
      if (!page.title.includes("Joinville") || !page.title.includes("Lela") || !page.description.includes("Joinville") || !page.description.includes("Araquari")) fail(`title/description não identificam área atendida: ${page.name}`);
      if (page.contentReviewEvidence?.type === "LOCAL_ORIGINAL_IMAGE_VISUAL_REVIEW") {
        const reviewedFiles = new Set(page.contentReviewEvidence.imageFiles || []);
        if (!page.images.every((image) => reviewedFiles.has(`${image.folder}/${image.filename}`))) fail(`evidência editorial não cobre todas as imagens revisadas: ${page.name}`);
      }
      if (!page.h1.toLocaleLowerCase("pt-BR").includes(page.name.split(/[ –—]/)[0].toLocaleLowerCase("pt-BR"))) fail(`H1 não identifica a opção: ${page.name}`);
      if (!page.faqs.length || page.faqs.some((faq) => !faq.question || faq.question.length < 18 || !faq.answer || faq.answer.length < 50)) fail(`FAQ editorial incompleto: ${page.name}`);
      for (const faq of page.faqs) {
        const question = faq.question.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
        if (publishedFaqQuestions.has(question)) fail(`pergunta de FAQ repetida entre páginas de tema: ${page.name}`);
        publishedFaqQuestions.add(question);
      }
      if (publishedTitles.has(page.title) || publishedDescriptions.has(page.description)) fail(`title ou meta description duplicado: ${page.name}`);
      publishedTitles.add(page.title);
      publishedDescriptions.add(page.description);
      for (const [field, values] of uniqueCopy) {
        const normalized = page[field].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
        if (values.has(normalized)) fail(`texto ${field} repetido entre páginas indexáveis: ${page.name}`);
        values.add(normalized);
      }
      if (!site.sitemapPaths.includes(page.path)) fail(`página indexável ausente do sitemap: ${page.path}`);
      publishedContentTokens.push({ page, tokens: themeContentTokens(page) });
    } else {
      const expectedBasis = page.editorialDecision === "CONFIRMATION_REQUIRED" ? "CONFIRMATION_REQUIRED" : "EDITORIAL_NOINDEX";
      if (page.publicationStatus !== "PUBLIC_NOINDEX" || page.publicationBasis !== expectedBasis) fail(`detalhe noindex sem justificativa editorial coerente: ${page.name}`);
      if (site.sitemapPaths.includes(page.path)) fail(`detalhe noindex entrou no sitemap: ${page.path}`);
    }
  }

  for (const group of portfolio.catalog) {
    if (!themes.byName[group.themeName] || themes.byName[group.themeName].catalogSlug !== group.slug) fail(`grupo sem rota individual: ${group.themeName}`);
  }
  for (let left = 0; left < publishedContentTokens.length; left++) {
    for (let right = left + 1; right < publishedContentTokens.length; right++) {
      const first = publishedContentTokens[left];
      const second = publishedContentTokens[right];
      const union = new Set([...first.tokens, ...second.tokens]);
      const intersection = [...first.tokens].filter((token) => second.tokens.has(token)).length;
      if (Math.min(first.tokens.size, second.tokens.size) >= 8 && union.size && intersection / union.size >= 0.78) fail(`conteúdo de tema quase duplicado: ${first.page.path} e ${second.page.path}`);
    }
  }
  for (const page of themes.details) {
    const count = site.sitemapPaths.filter((item) => item === page.path).length;
    if (count !== (page.indexable ? 1 : 0)) fail(`sitemap incompatível com estado editorial de ${page.path}`);
  }
}

function validateRegistry() {
  const { cities, neighborhoods, publicPages, publishedPages, previewPages, buildPages } = locations;
  if (![cities, neighborhoods, publicPages, publishedPages, previewPages, buildPages].every(Array.isArray)) fail("cadastro de localidades incompleto");
  if (locations.reviewMode !== (process.env.LELA_LOCAL_REVIEW === "1")) fail("modo de revisão regional incompatível com a configuração do build");
  for (const requiredCity of ["joinville", "araquari"]) {
    if (!cities.some((city) => city.slug === requiredCity)) fail(`cidade principal ausente: ${requiredCity}`);
  }
  if (!locations.geographyRegisterStatus || !locations.geographyRegisterNote) {
    fail("situação e escopo do cadastro geográfico não informados");
  }
  const peg = commercial.services.pegueEMonte;
  const mini = commercial.services.miniFestaNaMesa;
  if (commercial.ownerConfirmation.checkedAt !== "2026-10-14" ||
      commercial.ownerConfirmation.type !== "OWNER_CONFIRMATION" ||
      commercial.pickupPoint !== site.address ||
      peg.residentEligibility !== "CONFIRMED_ALL_NEIGHBORHOODS_WITH_PICKUP" ||
      peg.pickup.status !== "CONFIRMED" || peg.pickup.customerReturnsKit !== true ||
      peg.delivery.status !== "CONDITIONAL_ON_AVAILABILITY" ||
      !["date", "eventAddress", "ownerAvailability"].every((item) => peg.delivery.dependsOn.includes(item)) ||
      peg.delivery.fee !== "CONFIRM_WITH_OWNER" ||
      mini.logistics !== "CONFIRM_WITH_OWNER" || mini.pickup !== "NOT_CONFIRMED_BY_THIS_POLICY" ||
      mini.delivery !== "NOT_CONFIRMED_BY_THIS_POLICY" || mini.assembly !== "NOT_CONFIRMED_BY_THIS_POLICY") {
    fail("fonte central de regras comerciais incoerente, incompleta ou extrapolada para Mini Festa na Mesa");
  }
  if (!commercial.ownerConfirmation.statement.includes("Joinville e Araquari") ||
      !commercial.ownerConfirmation.statement.includes("data e o endereço")) {
    fail("confirmação do responsável não registra cobertura por retirada e condição da entrega");
  }

  const cityBySlug = new Map();
  const paths = new Set(["/regioes-atendidas/"]);
  for (const city of cities) {
    if (!city.name || city.slug !== slugify(city.name) || !/^[A-Z]{2}$/.test(city.state || "")) {
      fail(`identificação de cidade inválida: ${city.name || city.slug}`);
    }
    if (cityBySlug.has(city.slug)) fail(`slug de cidade duplicado: ${city.slug}`);
    const expectedPath = `/regioes-atendidas/${city.slug}/`;
    if (city.path !== expectedPath || paths.has(city.path)) fail(`URL de cidade inválida ou duplicada: ${city.path}`);
    cityBySlug.set(city.slug, city);
    paths.add(city.path);
    const cityNeighborhoods = neighborhoods
      .filter((item) => item.citySlug === city.slug)
      .sort((left, right) => left.name.localeCompare(right.name, "pt-BR", { sensitivity: "base" }));
    if (!Array.isArray(city.neighborhoods) ||
        city.neighborhoods.length !== cityNeighborhoods.length ||
        city.neighborhoods.some((item, index) => item.slug !== cityNeighborhoods[index]?.slug)) {
      fail(`lista geográfica da cidade não corresponde ao cadastro: ${city.name}`);
    }
    if (!sourceIsValid(city.geographySource, (hostname) =>
      hostname.endsWith(".joinville.sc.gov.br") || hostname === "ibge.gov.br" || hostname.endsWith(".ibge.gov.br")
    ) || !city.geographyStatus) {
      fail(`fonte ou status geográfico inválido: ${city.name}`);
    }
    if (!city.commercialConfirmationScope || !hasCommercialEvidence(city)) {
      fail(`confirmação comercial da cidade sem escopo ou evidência: ${city.name}`);
    }
    if (city.pickupEligibilityStatus !== "CONFIRMED_CITYWIDE" || city.deliveryStatus !== "CONDITIONAL_ON_AVAILABILITY") {
      fail(`política de retirada/entrega inconsistente na página de cidade: ${city.name}`);
    }
    if (city.indexable) {
      if (city.commercialStatus !== "CONFIRMED" || city.publicationStatus !== publishableStatus || city.publicationBasis !== "CITY_SERVICE") {
        fail(`página de cidade sem confirmação ou estado de publicação válido: ${city.name}`);
      }
      validateContent(city);
      if (!Array.isArray(city.schemaServiceAreas) || city.schemaServiceAreas.join("|") !== `${city.name}, ${city.state}`) {
        fail(`areaServed de cidade não corresponde à cidade: ${city.name}`);
      }
    } else if (city.publicationStatus === publishableStatus) {
      fail(`cidade marcada como pronta, mas não indexável: ${city.name}`);
    }
  }

  const neighborhoodNames = new Set();
  const neighborhoodPaths = new Set();
  for (const neighborhood of neighborhoods) {
    const city = cityBySlug.get(neighborhood.citySlug);
    if (!city || neighborhood.city !== city.name || neighborhood.state !== city.state) {
      fail(`bairro associado à cidade errada: ${neighborhood.name}`);
    }
    const nameKey = `${neighborhood.citySlug}:${neighborhood.name.toLocaleLowerCase("pt-BR")}`;
    if (neighborhoodNames.has(nameKey)) fail(`bairro duplicado na cidade: ${neighborhood.name}`);
    neighborhoodNames.add(nameKey);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(neighborhood.slug) || neighborhood.slug !== slugify(neighborhood.name)) {
      fail(`slug inválido: ${neighborhood.name} (${neighborhood.slug})`);
    }
    const expectedPath = `${city.path}${neighborhood.slug}/`;
    if (neighborhood.path !== expectedPath || paths.has(neighborhood.path) || neighborhoodPaths.has(neighborhood.path)) {
      fail(`URL de localidade duplicada ou conflitante: ${neighborhood.path}`);
    }
    paths.add(neighborhood.path);
    neighborhoodPaths.add(neighborhood.path);
      if (!sourceIsValid(neighborhood.geographySource, (hostname) =>
      hostname.endsWith(".joinville.sc.gov.br") || hostname === "araquari.atende.net" || hostname.endsWith(".araquari.atende.net") || hostname.endsWith(".araquari.sc.gov.br") || hostname.endsWith(".ibge.gov.br") || hostname.endsWith(".cvaraquari.sc.gov.br")
    ) || !neighborhood.geographyStatus || !neighborhood.geographyConfirmationScope ||
        !["neighborhood", "district", "locality"].includes(neighborhood.type) || (neighborhood.type !== "neighborhood" && city.slug !== "araquari")) {
      fail(`fonte ou escopo geográfico inválido: ${neighborhood.name}`);
    }
    if (!allowedCoverageStatuses.has(neighborhood.serviceCoverageStatus)) {
      fail(`status de cobertura comercial inválido: ${neighborhood.name}`);
    }
    if (!["CONFIRMED", "UNCONFIRMED"].includes(neighborhood.commercialStatus)) {
      fail(`status comercial inválido: ${neighborhood.name}`);
    }
    const coverageConfirmed = ["CONFIRMED", "CONDITIONAL"].includes(neighborhood.serviceCoverageStatus);
    if (coverageConfirmed && (neighborhood.commercialStatus !== "CONFIRMED" || !hasCommercialEvidence(neighborhood) || !hasConfirmedFacts(neighborhood))) {
      fail(`cobertura indicada sem evidências comerciais: ${neighborhood.name}`);
    }
    if (neighborhood.serviceCoverageStatus === "CONDITIONAL" && !neighborhood.serviceCoverageConditions) {
      fail(`cobertura condicional sem condições documentadas: ${neighborhood.name}`);
    }
    if (neighborhood.serviceCoverageStatus === "CONDITIONAL" && neighborhood.indexable &&
        !normalizeText(`${neighborhood.content.detailText} ${neighborhood.content.intro}`).toLowerCase()
          .includes(normalizeText(neighborhood.serviceCoverageConditions).toLowerCase())) {
      fail(`condições da cobertura não aparecem no conteúdo: ${neighborhood.name}`);
    }
    if (neighborhood.commercialStatus === "CONFIRMED" && (!neighborhood.commercialConfirmationScope || !hasCommercialEvidence(neighborhood) || !hasConfirmedFacts(neighborhood))) {
      fail(`fato comercial do bairro sem escopo ou evidência: ${neighborhood.name}`);
    }
    if (neighborhood.commercialStatus !== "CONFIRMED" ||
        neighborhood.pickupEligibilityStatus !== "CONFIRMED_CITYWIDE" ||
        neighborhood.deliveryStatus !== "CONDITIONAL_ON_AVAILABILITY" ||
        !neighborhood.commercialEvidence.some((evidence) => evidence.checkedAt === commercial.ownerConfirmation.checkedAt) ||
        neighborhood.serviceCoverageStatus !== "CONFIRMED_WITH_PICKUP") {
      fail(`elegibilidade com retirada ou condição de entrega inconsistente: ${neighborhood.name}`);
    }
    if (neighborhood.indexable) {
      if (neighborhood.publicationStatus !== publishableStatus) fail(`bairro indexável sem status de publicação pronto: ${neighborhood.name}`);
      validateContent(neighborhood);
      if (!hasCommercialEvidence(neighborhood) || !hasConfirmedFacts(neighborhood)) {
        fail(`página de bairro sem fato comercial confirmado: ${neighborhood.name}`);
      }
      if (coverageConfirmed && neighborhood.publicationBasis !== "SERVICE_COVERAGE") {
        fail(`página de cobertura sem base de publicação explícita: ${neighborhood.name}`);
      }
      if (!coverageConfirmed && neighborhood.publicationBasis !== "PICKUP_LOCATION") {
        fail(`página indexável sem cobertura de serviço deve se limitar ao ponto real de retirada: ${neighborhood.name}`);
      }
    } else if (neighborhood.publicationStatus === "PUBLIC_NOINDEX") {
      if (!neighborhood.editorialReadiness ||
          neighborhood.editorialReadiness.decision !== "PUBLIC_NOINDEX" ||
          neighborhood.editorialReadiness.status !== "PUBLIC_EXPERIENCE_NO_LOCAL_DISTINCTIVE_EVIDENCE" ||
          neighborhood.publicationBasis !== "CITYWIDE_PICKUP_NO_LOCAL_INDEXING_BASIS") {
        fail(`página pública noindex sem justificativa editorial individual: ${neighborhood.name}`);
      }
      validateContent(neighborhood);
      if (site.sitemapPaths.includes(neighborhood.path)) fail(`página PUBLIC_NOINDEX entrou no sitemap: ${neighborhood.path}`);
    } else if (neighborhood.publicationStatus === "DRAFT_PREVIEW") {
      if (!neighborhood.editorialReadiness?.decision || !neighborhood.editorialReadiness?.reason) {
        fail(`DRAFT_PREVIEW sem impedimento específico documentado: ${neighborhood.name}`);
      }
    } else {
      fail(`estado de publicação inválido para localidade não indexável: ${neighborhood.name}`);
    }
  }

  const expectedPublicPages = [...cities, ...neighborhoods].filter((item) => publicStatuses.has(item.publicationStatus));
  if (publicPages.length !== expectedPublicPages.length ||
      expectedPublicPages.some((page) => !publicPages.some((candidate) => candidate.path === page.path)) ||
      new Set(publicPages.map((page) => page.path)).size !== publicPages.length) {
    fail("publicPages deve conter somente uma vez cada rota PUBLIC_INDEX e PUBLIC_NOINDEX");
  }
  for (const page of publicPages) validateContent(page);

  const draftRecords = neighborhoods.filter((item) => item.publicationStatus === "DRAFT_PREVIEW");
  if (locations.reviewMode) {
    if (previewPages.length !== draftRecords.length || previewPages.some((page) =>
      !page.previewOnly || page.indexable || page.publicationStatus !== "DRAFT_PREVIEW" ||
      !draftRecords.some((record) => record.path === page.path)
    )) fail("páginas DRAFT_PREVIEW não correspondem às localidades com impedimentos documentados");
    for (const page of previewPages) validateContent(page);
  } else if (previewPages.length || buildPages.some((page) => page.previewOnly)) {
    fail("páginas DRAFT_PREVIEW não podem ser geradas no build público padrão");
  }

  const candidates = [...cities, ...neighborhoods].filter((item) => item.indexable && item.publicationStatus === publishableStatus);
  const candidatePaths = candidates.map((item) => item.path);
  const publishedPaths = publishedPages.map((item) => item.path);
  if (new Set(publishedPaths).size !== publishedPaths.length ||
      candidatePaths.length !== publishedPaths.length ||
      candidatePaths.some((route) => !publishedPaths.includes(route))) {
    fail("publishedPages deve corresponder às localidades indexáveis e prontas para publicação");
  }
  validateDistinctContent(candidates);

  if (new Set(site.sitemapPaths).size !== site.sitemapPaths.length) fail("sitemapPaths contém URLs duplicadas");
  for (const page of [{ path: "/regioes-atendidas/" }, ...candidates]) {
    if (!site.sitemapPaths.includes(page.path)) fail(`rota regional ausente do sitemap: ${page.path}`);
  }
  for (const pathInSitemap of site.sitemapPaths) {
    if (neighborhoodPaths.has(pathInSitemap) && !candidatePaths.includes(pathInSitemap)) {
      fail(`localidade não indexável incluída no sitemap: ${pathInSitemap}`);
    }
  }
}

validateCatalogRegistry();
validateRegistry();
validateThemeRegistry();

const dynamicRequired = [
  ...locations.buildPages,
  ...themes.details
].map((item) => `${item.path.replace(/^\//, "")}index.html`);
const missing = [...new Set([...required, ...dynamicRequired])].filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) fail(`arquivos ausentes: ${missing.join(", ")}`);

const htmlFiles = filesUnder(root, ".html");
const productionOrigin = String(process.env.SITE_URL || "").replace(/\/$/, "");
const forbidden = /robertopclaro\.github\.io|localhost|\/lela-decoracoes-site\/|http:\/\/leladecoracoes\.com/;
const fullSiteBase = site.baseUrl;
const seenTitles = new Set();
const seenDescriptions = new Set();
const seenHeadings = new Set();
const referencedImages = new Set();

function getAttribute(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return tag.match(new RegExp(`\\b${escapedName}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2];
}

function localTarget(rawUrl, file) {
  const value = String(rawUrl || "").trim().replace(/&amp;/g, "&");
  if (!value || value.startsWith("#") || /^(?:data:|javascript:|mailto:|tel:)/i.test(value)) return null;
  let pathname = value;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) {
    try {
      const url = new URL(value, productionOrigin || "https://local.invalid");
      const expectedOrigin = productionOrigin ? new URL(productionOrigin).origin : "https://local.invalid";
      if (url.origin !== expectedOrigin) return null;
      pathname = url.pathname;
    } catch {
      fail(`URL de recurso inválida em ${file}: ${value}`);
    }
  } else if (!value.startsWith("/")) {
    pathname = path.posix.join(path.posix.dirname(`/${file}`), value);
  }
  return localPathToFile(pathname);
}

function assertLocalReference(rawUrl, file, kind) {
  const target = localTarget(rawUrl, file);
  if (target && !fs.existsSync(target)) fail(`${kind} local ausente em ${file}: ${rawUrl}`);
  return target;
}

for (const file of htmlFiles) {
  const content = readOutput(file);
  const visibleText = visibleTextFromHtml(content);
  const unrenderedTextPatterns = [
    [/\bMoradores de\s+podem\b/i, "frase de moradores sem cidade"],
    [/\bundefined\b/i, "valor undefined"],
    [/\bNaN\b/i, "valor NaN"],
    [/\[object Object\]/i, "objeto convertido em texto"],
    [/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/, "interpolação Nunjucks não renderizada"]
  ];
  for (const [pattern, label] of unrenderedTextPatterns) {
    if (pattern.test(visibleText)) fail(`texto visível inválido (${label}): ${file}`);
  }
  const whatsappUrls = [...content.matchAll(/\b(?:href|data-lightbox-whatsapp)="([^"]*wa\.me[^"]*)"/gi)]
    .map((match) => match[1].replace(/&amp;/g, "&"));
  for (const rawUrl of whatsappUrls) {
    try {
      const whatsappMessage = new URL(rawUrl).searchParams.get("text") || "";
      if (/\[[^\]]+\]/.test(whatsappMessage)) fail(`CTA do WhatsApp contém placeholder literal: ${file}`);
    } catch {
      fail(`URL do WhatsApp inválida: ${file}`);
    }
  }
  const localPage = locations.buildPages.find((local) => local.path === routeForHtml(file));
  if (localPage) {
    const hasEligibilityText = localPage.type === "city"
      ? visibleText.includes(`Moradores de todos os bairros de ${localPage.name} podem contratar o Pegue e Monte`)
      : localPage.slug === "paranaguamirim"
        ? visibleText.includes(commercial.copy.pickupEligibility)
      : localPage.type === "neighborhood"
        ? visibleText.includes(localPage.content.intro) && visibleText.includes("podem contratar o Pegue e Monte")
        : visibleText.includes(localPage.content.intro) && visibleText.includes("consulte com a Lela as condições do Pegue e Monte");
    if (!hasEligibilityText || !visibleText.includes(commercial.copy.pickupOption) ||
        !visibleText.includes(commercial.copy.deliveryConditions)) {
      fail(`texto de contratação, retirada ou entrega não corresponde à regra comercial em ${localPage.path}`);
    }
  }
  const title = content.match(/<title>(.*?)<\/title>/i)?.[1];
  const descriptionTag = content.match(/<meta\b[^>]*\bname="description"[^>]*>/i)?.[0];
  const description = descriptionTag?.match(/\bcontent="([^"]*)"/i)?.[1];
  const h1s = [...content.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (!title || !description || !content.includes("<main")) fail(`HTML sem metadados/estrutura esperada: ${file}`);
  if (seenTitles.has(title)) fail(`title repetido: ${file} (${title})`);
  if (seenDescriptions.has(description)) fail(`meta description repetida: ${file}`);
  if (h1s.length !== 1) fail(`página deve ter um H1: ${file} (${h1s.length})`);
  const heading = normalizeText(h1s[0][1]);
  if (seenHeadings.has(heading)) fail(`H1 repetido: ${file} (${heading})`);
  seenTitles.add(title);
  seenDescriptions.add(description);
  seenHeadings.add(heading);
  schemasIn(content, file);
  if (productionOrigin) {
    const canonicalTag = content.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
    const canonical = canonicalTag?.match(/\bhref="([^"]+)"/i)?.[1];
    const ogUrlTag = content.match(/<meta\b[^>]*\bproperty="og:url"[^>]*>/i)?.[0];
    const ogUrl = ogUrlTag?.match(/\bcontent="([^"]+)"/i)?.[1];
    const expectedCanonical = `${fullSiteBase}${routeForHtml(file)}`;
    if (canonical !== expectedCanonical) fail(`canonical incorreta em ${file}: ${canonical}`);
    if (ogUrl !== expectedCanonical) fail(`og:url incorreta em ${file}: ${ogUrl}`);
  }
  if (productionOrigin && forbidden.test(content)) fail(`origem pública antiga ou insegura em ${file}`);

  for (const match of content.matchAll(/\bhref=(['"])(.*?)\1/gi)) {
    const raw = match[2].replace(/&amp;/g, "&");
    const target = assertLocalReference(raw, file, "link");
    const fragment = raw.split("#")[1];
    if (target && fragment) {
      const targetHtml = target.endsWith(".html") ? fs.readFileSync(target, "utf8") : "";
      const id = decodeURIComponent(fragment);
      if (!new RegExp(`(?:id|name)=["']${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}['"]`).test(targetHtml)) {
        fail(`âncora inexistente em ${file}: ${raw}`);
      }
    }
  }

  for (const match of content.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const alt = getAttribute(tag, "alt");
    if (alt === undefined) fail(`imagem sem atributo alt em ${file}`);
    const src = getAttribute(tag, "src");
    const target = assertLocalReference(src, file, "imagem");
    if (target) referencedImages.add(target);
    const srcset = getAttribute(tag, "srcset");
    for (const candidate of (srcset || "").split(",")) {
      const url = candidate.trim().split(/\s+/, 1)[0];
      if (!url) continue;
      const candidateTarget = assertLocalReference(url, file, "imagem srcset");
      if (candidateTarget) referencedImages.add(candidateTarget);
    }
  }
  for (const match of content.matchAll(/<source\b[^>]*\bsrcset=(['"])(.*?)\1/gi)) {
    for (const candidate of match[2].split(",")) {
      const url = candidate.trim().split(/\s+/, 1)[0];
      if (!url) continue;
      const target = assertLocalReference(url, file, "imagem source srcset");
      if (target) referencedImages.add(target);
    }
  }
  const ogImageTag = content.match(/<meta\b[^>]*\bproperty="og:image"[^>]*>/i)?.[0];
  const ogImage = ogImageTag && getAttribute(ogImageTag, "content");
  const ogImageTarget = assertLocalReference(ogImage, file, "og:image");
  if (ogImageTarget) referencedImages.add(ogImageTarget);
}

if (!referencedImages.size) fail("nenhuma imagem local encontrada nas páginas geradas");
const generatedImageFiles = filesUnder(path.join(root, "assets/images/generated"), ".avif")
  .concat(filesUnder(path.join(root, "assets/images/generated"), ".webp"), filesUnder(path.join(root, "assets/images/generated"), ".jpg"));
const productionBase = String(fullSiteBase || "").replace(/\/$/, "");

const regionalPaths = ["/regioes-atendidas/", ...locations.buildPages.map((item) => item.path)];
for (const route of regionalPaths) {
  const file = `${route.replace(/^\//, "")}index.html`;
  const html = readOutput(file);
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const descriptionTag = html.match(/<meta\b[^>]*\bname="description"[^>]*>/i)?.[0];
  const description = descriptionTag && getAttribute(descriptionTag, "content");
  const robotsTag = html.match(/<meta\b[^>]*\bname="robots"[^>]*>/i)?.[0];
  const robots = robotsTag && getAttribute(robotsTag, "content");
  const page = locations.buildPages.find((item) => item.path === route);
  const expectedRobots = route === "/regioes-atendidas/" || page?.indexable ? "index,follow" : "noindex,follow";
  if (!title || !description || h1s.length !== 1 || robots !== expectedRobots) fail(`title/description/H1/robots ausente, incorreto ou repetido: ${route}`);
  if (productionOrigin) {
    const canonicalTag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
    const canonical = canonicalTag && getAttribute(canonicalTag, "href");
    if (canonical !== `${fullSiteBase}${route}`) fail(`canonical incorreta em ${route}: ${canonical}`);
  }

  const schemas = schemasIn(html, file);
  const localBusiness = schemaOfType(schemas, "LocalBusiness");
  const breadcrumb = schemaOfType(schemas, "BreadcrumbList");
  const webPage = schemaOfType(schemas, "WebPage");
  const faqPage = schemaOfType(schemas, "FAQPage");
  const expectedAreas = ["Joinville, SC", "Araquari, SC"];
  if (!localBusiness || !Array.isArray(localBusiness.areaServed) || localBusiness.areaServed.join("|") !== expectedAreas.join("|")) {
    fail(`LocalBusiness/areaServed inconsistente em ${route}`);
  }
  if (!breadcrumb || !webPage || !faqPage) fail(`BreadcrumbList, WebPage ou FAQPage ausente em ${route}`);
  if (productionOrigin && webPage.url !== `${fullSiteBase}${route}`) fail(`WebPage URL incorreta em ${route}`);
  if (productionOrigin && faqPage.url !== `${fullSiteBase}${route}`) fail(`FAQPage URL incorreta em ${route}`);

  const visibleQuestions = [...html.matchAll(/<details\b[^>]*class="faq-item"[^>]*>[\s\S]*?<summary>([\s\S]*?)<\/summary>/gi)]
    .map((match) => normalizeText(match[1].replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/i, "")));
  const schemaQuestions = (faqPage.mainEntity || []).map((item) => item.name);
  const schemaAnswers = (faqPage.mainEntity || []).map((item) => item.acceptedAnswer?.text || "");
  const expectedFaqs = route === "/regioes-atendidas/" ? locations.indexFaqs : (page?.content.faqs || []);
  if (visibleQuestions.length !== schemaQuestions.length || visibleQuestions.some((question, index) => question !== schemaQuestions[index])) {
    fail(`FAQPage não corresponde às perguntas visíveis em ${route}`);
  }
  if (expectedFaqs.length !== schemaAnswers.length || expectedFaqs.some((faq, index) => normalizeText(schemaAnswers[index]) !== normalizeText(faq.answer))) {
    fail(`respostas do FAQPage não correspondem às respostas visíveis/cadastradas em ${route}`);
  }
  const expectedQuestions = route === "/regioes-atendidas/"
    ? locations.indexFaqs.map((item) => item.question)
    : (page?.content.faqs || []).map((item) => item.question);
  if (JSON.stringify(schemaQuestions) !== JSON.stringify(expectedQuestions)) fail(`FAQ de ${route} não corresponde ao conteúdo cadastrado`);
  if (page) {
    const minimumFaqs = 8;
    const maximumFaqs = 12;
    if (page.content.faqs.length < minimumFaqs || page.content.faqs.length > maximumFaqs ||
        page.content.faqs.some((item) => !item.id || !item.category || !item.confirmationStatus || !item.source?.length || !item.services?.length)) {
      fail(`FAQ regional fora do intervalo ou sem origem/status registrados em ${route}`);
    }
  }

  const expectedBreadcrumbs = route === "/regioes-atendidas/"
    ? [{ label: "Início", url: "/" }, { label: "Regiões atendidas", url: route }]
    : page?.breadcrumbs;
  if (!page && route !== "/regioes-atendidas/") fail(`página regional sem registro correspondente: ${route}`);
  const crumbItems = breadcrumb.itemListElement || [];
  if (!Array.isArray(expectedBreadcrumbs) || crumbItems.length !== expectedBreadcrumbs.length ||
      crumbItems.some((item, index) => item.name !== expectedBreadcrumbs[index].label ||
        (productionOrigin && item.item !== `${fullSiteBase}${expectedBreadcrumbs[index].url}`))) {
    fail(`BreadcrumbList não corresponde à navegação visível em ${route}`);
  }

  if (route !== "/regioes-atendidas/") {
    if (crumbItems.at(-1)?.item !== `${fullSiteBase}${route}` || !html.includes(page.content.h1) || !html.includes(page.name)) {
      fail(`breadcrumb ou conteúdo local não corresponde ao registro: ${route}`);
    }
    const service = schemaOfType(schemas, "Service");
    if (page.type === "city") {
      const localityItems = [...html.matchAll(/<li\b[^>]*data-locality-reference-item=/gi)];
      const visibleText = normalizeText(html).toLocaleLowerCase("pt-BR");
      if (localityItems.length !== page.neighborhoods.length ||
          page.neighborhoods.some((place) => !visibleText.includes(place.name.toLocaleLowerCase("pt-BR"))) ||
          !visibleText.includes("podem contratar") || !visibleText.includes("depende da disponibilidade") ||
          (page.slug === "araquari" && !visibleText.includes("a lista pode estar incompleta"))) {
        fail(`lista geográfica ou informação de retirada/entrega incompleta em ${route}`);
      }
      if (page.content.geographyReference &&
          (!html.includes(`href="${page.content.geographyReference.url}"`) ||
            !visibleText.includes(page.content.geographyReference.label.toLocaleLowerCase("pt-BR")))) {
        fail(`fonte geográfica municipal ausente em ${route}`);
      }
      const sortedPlaces = [...page.neighborhoods].sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
      const listedSlugs = [...html.matchAll(/<li\b[^>]*data-locality-reference-item="([^"]+)"/gi)].map((match) => match[1]);
      const actualTypeLabels = [...html.matchAll(/<span\b[^>]*class="locality-directory__type"[^>]*>([\s\S]*?)<\/span>/gi)]
        .map((match) => normalizeText(match[1]));
      const expectedTypeLabels = sortedPlaces.filter((place) => place.type !== "neighborhood")
        .map((place) => place.type === "district" ? "Distrito" : "Localidade");
      if (listedSlugs.some((slug, index) => slug !== sortedPlaces[index]?.slug) ||
          JSON.stringify(actualTypeLabels) !== JSON.stringify(expectedTypeLabels) ||
          /class="locality-directory__type">Bairro<\/span>/i.test(html)) {
        fail(`lista geográfica fora de ordem ou com rótulo repetido de bairro em ${route}`);
      }
      const listedLinks = [...html.matchAll(/<li\b[^>]*data-locality-reference-item=[^>]*>[\s\S]*?<\/li>/gi)]
        .flatMap((match) => [...match[0].matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((link) => link[1]));
      const expectedListed = page.neighborhoods.filter((place) => publicStatuses.has(place.publicationStatus) || locations.reviewMode);
      if (listedLinks.length !== expectedListed.length || expectedListed.some((place) => !listedLinks.includes(`${site.pathPrefix}${place.path.replace(/^\//, "")}`))) {
        fail(`links de localidades não correspondem ao estado de revisão em ${route}`);
      }
      if (!service || !Array.isArray(service.areaServed) || service.areaServed.join("|") !== page.schemaServiceAreas.join("|")) {
        fail(`Service/areaServed não corresponde à cidade em ${route}`);
      }
    } else {
      const coverageConfirmed = ["CONFIRMED", "CONDITIONAL"].includes(page.serviceCoverageStatus);
      if (coverageConfirmed && (!service || service.areaServed.join("|") !== page.schemaServiceAreas?.join("|"))) {
        fail(`Service/areaServed sem confirmação correspondente em ${route}`);
      }
      if (!coverageConfirmed && service) fail(`bairro sem cobertura confirmada declara Service em ${route}`);
      if (page.publicationStatus === "PUBLIC_NOINDEX" &&
          (page.previewOnly || html.includes("Prévia local em revisão") || service ||
            site.sitemapPaths.includes(route) || robots !== "noindex,follow")) {
        fail(`página PUBLIC_NOINDEX deve ser pública sem aviso de preview, schema Service ou sitemap: ${route}`);
      }
      if (page.previewOnly) {
        const robotsTag = html.match(/<meta\b[^>]*\bname="robots"[^>]*>/i)?.[0];
        const whatsappTag = [...html.matchAll(/<a\b[^>]*href="([^"]*wa\.me[^"]*)"[^>]*>/gi)]
          .map((match) => match[1].replace(/&amp;/g, "&"))
          .find((href) => {
            try { return new URL(href).searchParams.get("text")?.includes(page.name); } catch { return false; }
          });
        const whatsappMessage = whatsappTag ? new URL(whatsappTag).searchParams.get("text") : "";
        if (!robotsTag || getAttribute(robotsTag, "content") !== "noindex,follow" ||
            !html.includes("Prévia local em revisão") || !whatsappMessage?.includes(page.city) ||
            !whatsappMessage?.includes(page.name) || !html.includes(page.city) || !html.includes(page.name)) {
          fail(`página de localidade em revisão sem noindex, aviso ou CTA contextualizado: ${route}`);
        }
        if (site.sitemapPaths.includes(route)) fail(`página DRAFT_PREVIEW entrou no sitemap: ${route}`);
      }
    }

    const groups = localCatalog.catalogGroupsFor(page.type === "city" ? page.slug : page.citySlug, page.type === "city");
    const cards = [...html.matchAll(/<article\b(?=[^>]*\bdata-local-theme-card="([^"]+)")[^>]*>[\s\S]*?<\/article>/gi)];
    const cardIds = cards.map((match) => match[1]);
    if (groups.length !== portfolio.catalog.length || cards.length !== groups.length || new Set(cardIds).size !== groups.length) {
      fail(`catálogo local precisa renderizar cada grupo uma vez em ${route}`);
    }
    const citySlug = page.type === "city" ? page.slug : page.citySlug;
    const cityName = page.type === "city" ? page.name : page.city;
    for (const group of groups) {
      const theme = themes.byName[group.themeName];
      const card = cards.find((match) => match[1] === group.slug)?.[0] || "";
      const cardTag = card.slice(0, card.indexOf(">") + 1);
      const placeName = page.type === "city" ? "" : page.name;
      const expectedHref = `${site.pathPrefix}${theme.path.replace(/^\//, "")}?cidade=${citySlug}&servico=pegue-e-monte${placeName ? `&localidade=${page.slug}` : ""}`;
      const normalizedCard = card.replace(/&amp;/g, "&");
      if (!card || (normalizedCard.match(new RegExp(`href="${expectedHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "g")) || []).length < 2) {
        fail(`card local não leva à página contextualizada de ${group.themeName} em ${route}`);
      }
      const placeLabel = !placeName ? `em ${cityName}` : page.type === "district"
        ? `no distrito de ${placeName}, em ${cityName}`
        : page.type === "locality"
          ? `na localidade de ${placeName}, em ${cityName}`
          : `no bairro ${placeName}, em ${cityName}`;
      const message = `Olá, Lela! Estou procurando uma decoração ${group.themeName} para o Pegue e Monte ${placeLabel}. Gostaria de consultar a disponibilidade e as condições de retirada ou entrega.`;
      if (!theme || !normalizedCard.includes(site.whatsappLink(message))) {
        fail(`WhatsApp do tema não preserva a localidade em ${route}: ${group.themeName}`);
      }
      if (!normalizedCard.includes(group.previewImage.generatedBase + "-480.jpg") || !normalizedCard.includes(group.themeName) ||
          normalizeText(getAttribute(cardTag, "data-category")) !== group.category ||
          normalizeText(getAttribute(cardTag, "data-search")) !== normalizeText(group.searchText) ||
          getAttribute(cardTag, "data-has-montage") !== String(Boolean(group.hasMountedExample))) {
        fail(`card local sem imagem, nome, categoria ou termos de busca corretos em ${route}: ${group.themeName}`);
      }
    }
    const regionalFilters = [...html.matchAll(/data-filter-button\b/g)].length;
    const expectedFilters = site.categories.length + 1 + (localCatalog.hasMountedExamples ? 1 : 0);
    if (!html.includes(`id="catalogo-local"`) || !html.includes("data-local-catalog-controls") ||
        !html.includes(`data-catalog-limit="12"`) || !normalizeText(html).toLocaleLowerCase("pt-BR").includes("moradores de") ||
        !normalizeText(html).toLocaleLowerCase("pt-BR").includes("depende da disponibilidade") ||
        regionalFilters !== expectedFilters || !html.includes("data-catalog-more")) {
      fail(`catálogo local sem busca/filtros, limite progressivo ou regras comerciais em ${route}`);
    }
  }
}

const themesIndex = readOutput("temas/index.html");
const themesIndexSchemas = schemasIn(themesIndex, "temas/index.html");
const themesIndexWebPage = schemaOfType(themesIndexSchemas, "WebPage");
const themesIndexBreadcrumb = schemaOfType(themesIndexSchemas, "BreadcrumbList");
if (site.origin && (!themesIndexWebPage || !themesIndexBreadcrumb)) {
  fail("página /temas/ sem WebPage ou BreadcrumbList");
}
if (productionOrigin && themesIndexWebPage.url !== `${fullSiteBase}/temas/`) {
  fail("WebPage URL incorreta em /temas/");
}
for (const route of ["/portfolio/", "/regioes-atendidas/joinville/", "/regioes-atendidas/araquari/"]) {
  if (!themesIndex.includes(`href="${site.pathPrefix}${route.replace(/^\//, "")}"`)) {
    fail(`diretório de temas sem link interno para ${route}`);
  }
}
for (const page of themes.details) {
  const file = `${page.path.replace(/^\//, "")}index.html`;
  const html = readOutput(file);
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const descriptionTag = html.match(/<meta\b[^>]*\bname="description"[^>]*>/i)?.[0];
  const description = descriptionTag && getAttribute(descriptionTag, "content");
  const robotsTag = html.match(/<meta\b[^>]*\bname="robots"[^>]*>/i)?.[0];
  const robots = robotsTag && getAttribute(robotsTag, "content");
  const expectedRobots = page.indexable ? "index,follow" : "noindex,follow";
  if (!title || title !== page.title || !description || description !== page.description || h1s.length !== 1 || !robotsTag || robots !== expectedRobots) {
    fail(`title/description/H1/robots não correspondem ao detalhe: ${page.path}`);
  }
  const schemas = schemasIn(html, file);
  const localBusiness = schemaOfType(schemas, "LocalBusiness");
  const breadcrumb = schemaOfType(schemas, "BreadcrumbList");
  const webPage = schemaOfType(schemas, "WebPage");
  const service = schemaOfType(schemas, "Service");
  const faqPage = schemaOfType(schemas, "FAQPage");
  if (site.origin && (!localBusiness || !breadcrumb || !webPage)) fail(`dados estruturados essenciais ausentes em ${page.path}`);
  if (page.indexable !== Boolean(service) || page.indexable !== Boolean(faqPage)) fail(`schemas de serviço/FAQ incompatíveis com indexabilidade em ${page.path}`);
  if (localBusiness && (!Array.isArray(localBusiness.areaServed) || localBusiness.areaServed.join("|") !== "Joinville, SC|Araquari, SC")) fail(`LocalBusiness/areaServed inconsistente em ${page.path}`);
  if (service && (!Array.isArray(service.areaServed) || service.areaServed.join("|") !== "Joinville, SC|Araquari, SC")) fail(`Service/areaServed inconsistente em ${page.path}`);
  if (productionOrigin) {
    const canonicalTag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
    const canonical = canonicalTag && getAttribute(canonicalTag, "href");
    if (canonical !== `${fullSiteBase}${page.path}`) fail(`canonical incorreta em ${page.path}: ${canonical}`);
    if (webPage?.url !== `${fullSiteBase}${page.path}` || (faqPage && faqPage.url !== `${fullSiteBase}${page.path}`)) fail(`WebPage ou FAQPage URL incorreta em ${page.path}`);
  }
  if (!html.includes(page.h1) || !html.includes(page.about) || !html.includes(page.use) || !html.includes(page.galleryText)) fail(`conteúdo de detalhe ausente em ${page.path}`);
  if (!page.images.every((image) => html.includes(image.alt))) fail(`alt de imagem ausente em ${page.path}`);
  if (!html.includes('id="locality-context-data"') || (html.match(/data-theme-context-whatsapp/g) || []).length !== 2) {
    fail(`página de tema não oferece contexto local para os CTAs do WhatsApp: ${page.path}`);
  }

  const visibleQuestions = [...html.matchAll(/<details\b[^>]*class="faq-item"[^>]*>[\s\S]*?<summary>([\s\S]*?)<\/summary>/gi)]
    .map((match) => normalizeText(match[1].replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/i, "")));
  const schemaQuestions = (faqPage?.mainEntity || []).map((item) => item.name);
  const expectedQuestions = page.faqs.map((item) => item.question);
  if (visibleQuestions.length !== expectedQuestions.length || visibleQuestions.some((question, index) => question !== expectedQuestions[index]) ||
      (page.indexable && (schemaQuestions.length !== expectedQuestions.length || schemaQuestions.some((question, index) => question !== expectedQuestions[index])))) fail(`FAQ visível e JSON-LD não correspondem em ${page.path}`);
  const expectedBreadcrumbs = [
    { label: "Início", url: "/" },
    { label: "Catálogo", url: "/portfolio/" },
    { label: page.name, url: page.path }
  ];
  const crumbs = breadcrumb?.itemListElement || [];
  if (crumbs.length !== expectedBreadcrumbs.length || crumbs.some((crumb, index) => crumb.name !== expectedBreadcrumbs[index].label ||
      (productionOrigin && crumb.item !== `${fullSiteBase}${expectedBreadcrumbs[index].url}`))) fail(`BreadcrumbList não corresponde à página: ${page.path}`);

  const message = `Olá, Lela! Tenho interesse na decoração ${page.name}. Gostaria de consultar a disponibilidade e os formatos possíveis para minha data. Posso informar a data e a cidade ou o bairro da festa.`;
  if (!html.replace(/&amp;/g, "&").includes(site.whatsappLink(message))) fail(`CTA do WhatsApp não identifica o tema em ${page.path}`);
  for (const relatedRoute of ["/portfolio/", "/pegue-e-monte/", "/mini-festa-na-mesa/", "/regioes-atendidas/joinville/", "/regioes-atendidas/araquari/"]) {
    if (!html.includes(`href="${site.pathPrefix}${relatedRoute.replace(/^\//, "")}`)) fail(`página de tema sem link para ${relatedRoute}: ${page.path}`);
  }
  if (page.indexable && !themesIndex.includes(`href="${site.pathPrefix}${page.path.replace(/^\//, "")}`)) fail(`diretório editorial não lista ${page.path}`);
  if (!page.indexable && themesIndex.includes(`href="${site.pathPrefix}${page.path.replace(/^\//, "")}`)) fail(`página noindex entrou no diretório indexável: ${page.path}`);
}

for (const route of ["/", "/pegue-e-monte/", "/mini-festa-na-mesa/", "/portfolio/", "/regioes-atendidas/joinville/", "/regioes-atendidas/araquari/"]) {
  const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}index.html`;
  const html = readOutput(file);
  if (!html.includes(`href="${site.pathPrefix}portfolio/"`)) fail(`página importante sem integração para o catálogo: ${route}`);
}

for (const route of ["/", "/portfolio/", "/sobre/", "/duvidas/", "/contato/", "/regioes-atendidas/"]) {
  const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}index.html`;
  const html = readOutput(file);
  const nav = html.match(/<nav\b(?=[^>]*data-menu)[\s\S]*?<\/nav>/i)?.[0] || "";
  if (!nav) fail(`navegação principal ausente em ${route}`);
  const navRoutes = [...nav.matchAll(/<li\b[^>]*>\s*<a\b[^>]*href="([^"]+)"/gi)].map((match) => match[1]);
  const expectedNavRoutes = site.nav.map((item) => `${site.pathPrefix}${item.url.replace(/^\//, "")}`);
  if (JSON.stringify(navRoutes) !== JSON.stringify(expectedNavRoutes) || /Institucional|<details\b/i.test(nav)) {
    fail(`ordem ou conteúdo da navegação principal incorreto em ${route}`);
  }
  for (const importantRoute of ["/sobre/", "/duvidas/", "/contato/"]) {
    if (!nav.includes(`href="${site.pathPrefix}${importantRoute.replace(/^\//, "")}`)) fail(`navegação principal não expõe ${importantRoute} em ${route}`);
  }
  if (!nav.includes("button--header") || !nav.includes("Consultar disponibilidade")) fail(`CTA de WhatsApp ausente na navegação: ${route}`);
  if (["/sobre/", "/duvidas/", "/contato/"].includes(route)) {
    const activeHref = nav.match(new RegExp(`<a\\b(?=[^>]*href="${site.pathPrefix}${route.replace(/^\//, "")}")(?=[^>]*aria-current="page")[^>]*>`, "i"));
    if (!activeHref) fail(`navegação principal não indica página atual em ${route}`);
  }
}

const catalogHtml = readOutput("portfolio/index.html");
const catalogCardIds = [...catalogHtml.matchAll(/<article\b(?=[^>]*\bdata-filter-item)(?=[^>]*\bid="(tema-[^"]+)")[^>]*>/gi)]
  .map((match) => match[1]);
if (catalogCardIds.length !== portfolio.catalog.length || new Set(catalogCardIds).size !== catalogCardIds.length) {
  fail("catálogo publicado não corresponde aos grupos de tema sem duplicidade");
}
for (const group of portfolio.catalog) {
  if (!catalogCardIds.includes("tema-" + group.slug)) fail("grupo ausente no catálogo publicado: " + group.themeName);
  const articleStart = catalogHtml.indexOf(`id="tema-${group.slug}"`);
  const articleEnd = catalogHtml.indexOf("</article>", articleStart);
  const card = catalogHtml.slice(articleStart, articleEnd);
  const detail = themes.byName[group.themeName];
  if (!detail) fail(`grupo sem detalhe de tema: ${group.themeName}`);
  const detailHref = `href="${site.pathPrefix}${detail.path.replace(/^\//, "")}`;
  if ((card.split(detailHref).length - 1) < 3) fail(`imagem/nome/ação do card não levam ao detalhe: ${group.themeName}`);
  if (card.includes("data-lightbox-trigger") || !card.includes(group.previewImage.generatedBase + "-1200.jpg")) fail(`card deve navegar para o detalhe e exibir a imagem principal: ${group.themeName}`);
  const detailHtml = readOutput(`${detail.path.replace(/^\//, "")}index.html`);
  for (const image of detail.images) {
    if (!detailHtml.includes(image.alt) || !detailHtml.includes(image.generatedBase + "-1200.jpg")) fail(`foto do grupo não aparece na página individual de ${group.themeName}: ${image.generatedBase}`);
  }
  const message = "Olá, Lela! Vi a referência de " + group.themeName + " no catálogo e quero consultar se há disponibilidade para minha data. Posso informar a data e a cidade ou o bairro da festa.";
  if (!catalogHtml.replace(/&amp;/g, "&").includes(site.whatsappLink(message))) {
    fail("CTA do catálogo não identifica o tema: " + group.themeName);
  }
}
for (const category of portfolio.categories) {
  if (!catalogHtml.includes("data-filter=\"" + category.slug + "\"")) fail("filtro ausente no catálogo: " + category.slug);
}
if (!catalogHtml.includes('data-filter="montagem"') || !catalogHtml.includes('placeholder="Ex.: Safari, Bluey, chá de revelação"')) {
  fail("busca ou filtro de exemplos de montagem ausente no catálogo");
}

if (productionOrigin) {
  const sitemap = readOutput("sitemap.xml");
  const robots = readOutput("robots.txt");
  const expected = site.sitemapPaths.map((item) => `${productionBase}${item}`).sort();
  const actual = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail("sitemap não corresponde exatamente às URLs registradas");
  if (!robots.includes(`Sitemap: ${productionBase}/sitemap.xml`)) fail(`robots.txt aponta para sitemap incorreto: ${productionBase}`);
  if (forbidden.test(`${sitemap}\n${robots}`)) fail("sitemap/robots contêm origem pública antiga ou insegura");
}

const prefix = String(process.env.PATH_PREFIX || "").replace(/\/+$/, "");
if (prefix && prefix !== "/") {
  const home = readOutput("index.html");
  if (!home.includes(`${prefix}/assets/css/styles.css`) || !home.includes(`${prefix}/portfolio/`)) {
    fail(`prefixo de publicação não encontrado nos links: ${prefix}`);
  }
}

console.log(`Build validado: ${htmlFiles.length} HTML, ${referencedImages.size} imagens locais referenciadas (${generatedImageFiles.length} derivadas geradas), ${locations.cities.length} cidades e ${locations.neighborhoods.length} registros geográficos; ${locations.publicPages.length - locations.publishedPages.length} páginas locais públicas noindex, ${locations.publishedPages.length} páginas locais indexáveis, ${locations.previewPages.length} DRAFT_PREVIEW, ${themes.published.length} temas indexáveis e ${themes.details.length - themes.published.length} temas noindex.`);
