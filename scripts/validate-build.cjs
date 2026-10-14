const fs = require("node:fs");
const path = require("node:path");
const site = require("../src/_data/site.cjs");
const locations = require("../src/_data/locations.cjs");
const portfolio = require("../src/_data/portfolio.cjs");
const themes = require("../src/_data/themes.cjs");

const root = path.resolve(__dirname, "../dist");
const required = [
  "index.html", "servicos/index.html", "pegue-e-monte/index.html",
  "mini-festa-na-mesa/index.html", "portfolio/index.html", "como-funciona/index.html",
  "sobre/index.html", "duvidas/index.html", "contato/index.html", "parceiros/index.html",
  "regioes-atendidas/index.html", "temas/index.html", "404.html", "robots.txt", "sitemap.xml", "llms.txt",
  "favicon.svg", "assets/css/styles.css", "assets/js/main.js"
];
const allowedCoverageStatuses = new Set(["UNCONFIRMED", "CONFIRMED", "CONDITIONAL", "NOT_OFFERED"]);
const publishableStatus = "READY_FOR_REVIEW";
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
  if (!content.h1.toLowerCase().includes(page.name.toLowerCase())) {
    fail(`H1 não identifica a localidade: ${page.name}`);
  }
}

function meaningfulTokens(page) {
  const texts = [
    page.content.intro,
    page.content.detailTitle,
    page.content.detailText,
    ...page.content.faqs.flatMap((faq) => [faq.question, faq.answer])
  ].join(" ");
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

function validateThemeRegistry() {
  if (!Array.isArray(themes.pages) || !Array.isArray(themes.published)) fail("cadastro de temas incompleto");
  const allowedStatuses = new Set(["DRAFT", "READY_FOR_REVIEW", "PUBLISHED"]);
  const publishedByStatus = themes.pages.filter((page) => page.publicationStatus === "PUBLISHED");
  if (publishedByStatus.length !== themes.published.length ||
      publishedByStatus.some((page, index) => themes.published[index]?.path !== page.path)) {
    fail("themes.published deve conter somente as páginas com status PUBLISHED");
  }

  const slugs = new Set();
  const paths = new Set(["/temas/"]);
  const names = new Set();
  const catalogByFile = new Map(portfolio.all.map((item) => [`${item.folder}/${item.filename}`, item]));
  const publishedTitles = new Set();
  const publishedDescriptions = new Set();
  const publishedFaqQuestions = new Set();
  const uniqueCopy = new Map(["intro", "galleryTitle", "galleryText"].map((field) => [field, new Set()]));

  for (const page of themes.pages) {
    if (!allowedStatuses.has(page.publicationStatus)) fail(`status de publicação de tema inválido: ${page.name}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug || "") || page.path !== `/temas/${page.slug}/`) {
      fail(`slug ou URL de tema inválido: ${page.name || page.slug}`);
    }
    if (slugs.has(page.slug) || paths.has(page.path)) fail(`slug ou URL de tema duplicado: ${page.path}`);
    const nameKey = String(page.name || "").trim().toLocaleLowerCase("pt-BR");
    if (!nameKey || names.has(nameKey)) fail(`nome de tema ausente ou duplicado: ${page.name || page.slug}`);
    slugs.add(page.slug);
    paths.add(page.path);
    names.add(nameKey);

    if (page.publicationStatus !== "PUBLISHED") {
      if (themes.byName[page.name]?.path === page.path) fail(`tema não publicado exposto em links internos: ${page.path}`);
      if (site.sitemapPaths.includes(page.path)) fail(`tema não publicado no sitemap: ${page.path}`);
      const unpublishedFile = `${page.path.replace(/^\//, "")}index.html`;
      if (fs.existsSync(path.join(root, unpublishedFile))) fail(`tema não publicado possui página gerada: ${page.path}`);
      continue;
    }

    const requiredText = ["name", "title", "description", "h1", "intro", "galleryTitle", "galleryText"];
    if (requiredText.some((field) => typeof page[field] !== "string" || !page[field].trim())) {
      fail(`conteúdo de tema incompleto: ${page.name || page.slug}`);
    }
    if (page.title.length < 35 || page.description.length < 80 || page.intro.length < 80 || page.galleryText.length < 90) {
      fail(`conteúdo de tema curto para justificar página própria: ${page.name}`);
    }
    const titleSlug = slugify(page.title);
    const identifyingSlugTerms = page.slug.split("-").filter((word) => !["a", "as", "da", "das", "de", "do", "dos", "e"].includes(word));
    if (identifyingSlugTerms.some((word) => !titleSlug.includes(word)) ||
        !page.title.includes("Joinville") || !page.title.includes("Araquari") ||
        !page.description.includes("Joinville") || !page.description.includes("Araquari") ||
        !page.h1.includes("Joinville") || !page.h1.includes("Araquari")) {
      fail(`título, descrição ou H1 não identifica tema e área de atendimento: ${page.name}`);
    }
    if (page.availabilityStatus !== "VERIFY_BY_DATE") {
      fail(`disponibilidade de tema não pode ser afirmada sem confirmação por data: ${page.name}`);
    }
    if (!Array.isArray(page.images) || page.images.length === 0 || !page.images.some((item) => item.sourceType === "theme")) {
      fail(`tema sem material visual suficiente para página própria: ${page.name}`);
    }
    const imageFiles = new Set();
    for (const image of page.images) {
      const file = `${image.folder}/${image.filename}`;
      const catalogItem = catalogByFile.get(file);
      if (!catalogItem || catalogItem.themeName !== page.name || catalogItem.sourceType !== image.sourceType) {
        fail(`imagem não corresponde ao tema publicado ${page.name}: ${file}`);
      }
      if (imageFiles.has(file)) fail(`imagem repetida na página ${page.name}: ${file}`);
      if (!image.alt || image.alt.length < 20 || !image.caption || image.caption.length < 12) {
        fail(`imagem de tema sem texto alternativo ou legenda útil: ${file}`);
      }
      imageFiles.add(file);
    }
    if (!Array.isArray(page.faqs) || page.faqs.length === 0 || page.faqs.some((faq) =>
      !faq.question || faq.question.length < 18 || !faq.answer || faq.answer.length < 50
    )) fail(`FAQ de tema incompleto: ${page.name}`);
    for (const faq of page.faqs) {
      const question = faq.question.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
      if (publishedFaqQuestions.has(question)) fail(`pergunta de FAQ repetida entre páginas de tema: ${page.name}`);
      publishedFaqQuestions.add(question);
    }

    if (publishedTitles.has(page.title) || publishedDescriptions.has(page.description)) {
      fail(`title ou meta description de tema duplicado: ${page.name}`);
    }
    publishedTitles.add(page.title);
    publishedDescriptions.add(page.description);
    for (const [field, values] of uniqueCopy) {
      const normalized = page[field].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
      if (values.has(normalized)) fail(`texto ${field} repetido em páginas de tema: ${page.name}`);
      values.add(normalized);
    }
    if (!site.sitemapPaths.includes(page.path)) fail(`página publicada de tema ausente do sitemap: ${page.path}`);
  }

  for (const route of themes.published.map((page) => page.path)) {
    if (site.sitemapPaths.filter((item) => item === route).length !== 1) fail(`URL de tema ausente ou repetida no sitemap: ${route}`);
  }
}

function validateRegistry() {
  const { cities, neighborhoods, publishedPages } = locations;
  if (![cities, neighborhoods, publishedPages].every(Array.isArray)) fail("cadastro de localidades incompleto");
  for (const requiredCity of ["joinville", "araquari"]) {
    if (!cities.some((city) => city.slug === requiredCity)) fail(`cidade principal ausente: ${requiredCity}`);
  }
  if (!locations.geographyRegisterStatus || !locations.geographyRegisterNote) {
    fail("situação e escopo do cadastro geográfico não informados");
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
    if (!sourceIsValid(city.geographySource, (hostname) =>
      hostname.endsWith(".joinville.sc.gov.br") || hostname === "ibge.gov.br" || hostname.endsWith(".ibge.gov.br")
    ) || !city.geographyStatus) {
      fail(`fonte ou status geográfico inválido: ${city.name}`);
    }
    if (!city.commercialConfirmationScope || !hasCommercialEvidence(city)) {
      fail(`confirmação comercial da cidade sem escopo ou evidência: ${city.name}`);
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
      hostname.endsWith(".joinville.sc.gov.br") || hostname === "araquari.atende.net" || hostname.endsWith(".araquari.atende.net") || hostname.endsWith(".ibge.gov.br")
    ) || !neighborhood.geographyStatus || !neighborhood.geographyConfirmationScope) {
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
    if (neighborhood.indexable) {
      if (neighborhood.publicationStatus !== publishableStatus) fail(`bairro indexável sem status de publicação pronto: ${neighborhood.name}`);
      validateContent(neighborhood);
      if (!hasCommercialEvidence(neighborhood) || !hasConfirmedFacts(neighborhood)) {
        fail(`página de bairro sem fato comercial confirmado: ${neighborhood.name}`);
      }
      if (coverageConfirmed && neighborhood.publicationBasis !== "SERVICE_COVERAGE") {
        fail(`página de cobertura sem base de publicação explícita: ${neighborhood.name}`);
      }
      if (!coverageConfirmed && (neighborhood.serviceCoverageStatus !== "UNCONFIRMED" || neighborhood.publicationBasis !== "PICKUP_LOCATION")) {
        fail(`bairro sem cobertura confirmada só pode publicar fato pontual de retirada: ${neighborhood.name}`);
      }
    } else if (neighborhood.publicationStatus === publishableStatus) {
      fail(`bairro pronto para publicação, mas não indexável: ${neighborhood.name}`);
    }
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
      fail(`bairro sem publicação indexável incluído no sitemap: ${pathInSitemap}`);
    }
  }
}

validateRegistry();
validateThemeRegistry();

const dynamicRequired = [
  ...locations.publishedPages,
  ...themes.published
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

const regionalPaths = ["/regioes-atendidas/", ...locations.publishedPages.map((item) => item.path)];
for (const route of regionalPaths) {
  const file = `${route.replace(/^\//, "")}index.html`;
  const html = readOutput(file);
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const descriptionTag = html.match(/<meta\b[^>]*\bname="description"[^>]*>/i)?.[0];
  const description = descriptionTag && getAttribute(descriptionTag, "content");
  if (!title || !description || h1s.length !== 1) fail(`title/description/H1 ausente ou repetido: ${route}`);
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

  const visibleQuestions = [...html.matchAll(/<summary>([\s\S]*?)<\/summary>/gi)]
    .map((match) => normalizeText(match[1].replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/i, "")));
  const schemaQuestions = (faqPage.mainEntity || []).map((item) => item.name);
  if (visibleQuestions.length !== schemaQuestions.length || visibleQuestions.some((question, index) => question !== schemaQuestions[index])) {
    fail(`FAQPage não corresponde às perguntas visíveis em ${route}`);
  }
  const page = locations.publishedPages.find((item) => item.path === route);
  const expectedQuestions = route === "/regioes-atendidas/"
    ? locations.indexFaqs.map((item) => item.question)
    : (page?.content.faqs || []).map((item) => item.question);
  if (JSON.stringify(schemaQuestions) !== JSON.stringify(expectedQuestions)) fail(`FAQ de ${route} não corresponde ao conteúdo cadastrado`);

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
      if (!service || !Array.isArray(service.areaServed) || service.areaServed.join("|") !== page.schemaServiceAreas.join("|")) {
        fail(`Service/areaServed não corresponde à cidade em ${route}`);
      }
    } else {
      const coverageConfirmed = ["CONFIRMED", "CONDITIONAL"].includes(page.serviceCoverageStatus);
      if (coverageConfirmed && (!service || service.areaServed.join("|") !== page.schemaServiceAreas?.join("|"))) {
        fail(`Service/areaServed sem confirmação correspondente em ${route}`);
      }
      if (!coverageConfirmed && service) fail(`bairro sem cobertura confirmada declara Service em ${route}`);
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
for (const page of themes.published) {
  const href = `${site.pathPrefix}${page.path.replace(/^\//, "")}`;
  if (!themesIndex.includes(`href="${href}"`)) fail(`diretório de temas não lista ${page.path}`);

  const file = `${page.path.replace(/^\//, "")}index.html`;
  const html = readOutput(file);
  const schemas = schemasIn(html, file);
  const localBusiness = schemaOfType(schemas, "LocalBusiness");
  const breadcrumb = schemaOfType(schemas, "BreadcrumbList");
  const webPage = schemaOfType(schemas, "WebPage");
  const service = schemaOfType(schemas, "Service");
  const faqPage = schemaOfType(schemas, "FAQPage");
  if (site.origin && (!localBusiness || !breadcrumb || !webPage || !service || !faqPage)) {
    fail(`dados estruturados incompletos na página de tema: ${page.path}`);
  }
  if (localBusiness && (!Array.isArray(localBusiness.areaServed) ||
      localBusiness.areaServed.join("|") !== "Joinville, SC|Araquari, SC")) {
    fail(`LocalBusiness/areaServed inconsistente em ${page.path}`);
  }
  if (service && (!Array.isArray(service.areaServed) ||
      service.areaServed.join("|") !== "Joinville, SC|Araquari, SC")) {
    fail(`Service/areaServed inconsistente em ${page.path}`);
  }
  if (productionOrigin) {
    const canonicalTag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/i)?.[0];
    const canonical = canonicalTag && getAttribute(canonicalTag, "href");
    if (canonical !== `${fullSiteBase}${page.path}`) fail(`canonical incorreta em ${page.path}: ${canonical}`);
    if (webPage?.url !== `${fullSiteBase}${page.path}` || faqPage?.url !== `${fullSiteBase}${page.path}`) {
      fail(`WebPage ou FAQPage URL incorreta em ${page.path}`);
    }
  }
  if (!html.includes(page.h1) || !html.includes(page.galleryText)) fail(`conteúdo específico do tema ausente em ${page.path}`);
  if (!page.images.every((image) => html.includes(image.alt))) fail(`alt de imagem do tema ausente em ${page.path}`);

  const visibleQuestions = [...html.matchAll(/<summary>([\s\S]*?)<\/summary>/gi)]
    .map((match) => normalizeText(match[1].replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/i, "")));
  const schemaQuestions = (faqPage?.mainEntity || []).map((item) => item.name);
  const expectedQuestions = page.faqs.map((item) => item.question);
  if (visibleQuestions.length !== expectedQuestions.length ||
      visibleQuestions.some((question, index) => question !== expectedQuestions[index]) ||
      schemaQuestions.length !== expectedQuestions.length ||
      schemaQuestions.some((question, index) => question !== expectedQuestions[index])) {
    fail(`FAQ visível e JSON-LD não correspondem em ${page.path}`);
  }
  const expectedBreadcrumbs = [
    { label: "Início", url: "/" },
    { label: "Temas", url: "/temas/" },
    { label: page.name, url: page.path }
  ];
  const crumbs = breadcrumb?.itemListElement || [];
  if (crumbs.length !== expectedBreadcrumbs.length || crumbs.some((crumb, index) =>
    crumb.name !== expectedBreadcrumbs[index].label ||
    (productionOrigin && crumb.item !== `${fullSiteBase}${expectedBreadcrumbs[index].url}`)
  )) fail(`BreadcrumbList não corresponde à página de tema: ${page.path}`);

  const message = `Olá, Lela! Vi a página do tema ${page.name} e quero consultar a disponibilidade para [data]. Cidade/bairro: [local].`;
  if (!html.replace(/&amp;/g, "&").includes(site.whatsappLink(message))) {
    fail(`CTA do WhatsApp não identifica o tema em ${page.path}`);
  }
  for (const relatedRoute of [
    "/pegue-e-monte/", "/mini-festa-na-mesa/", "/regioes-atendidas/",
    "/regioes-atendidas/joinville/", "/regioes-atendidas/araquari/"
  ]) {
    if (!html.includes(`href="${site.pathPrefix}${relatedRoute.replace(/^\//, "")}"`)) {
      fail(`página de tema sem link relacionado para ${relatedRoute}: ${page.path}`);
    }
  }
}

for (const route of ["/", "/pegue-e-monte/", "/mini-festa-na-mesa/", "/portfolio/", "/regioes-atendidas/joinville/", "/regioes-atendidas/araquari/"]) {
  const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}index.html`;
  if (!readOutput(file).includes(`href="${site.pathPrefix}temas/"`)) {
    fail(`página importante sem integração para /temas/: ${route}`);
  }
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

console.log(`Build validado: ${htmlFiles.length} HTML, ${referencedImages.size} imagens locais referenciadas (${generatedImageFiles.length} derivadas geradas), ${locations.cities.length} cidades e ${locations.neighborhoods.length} bairros cadastrados; ${locations.publishedPages.length} páginas locais e ${themes.published.length} páginas de tema indexáveis.`);
