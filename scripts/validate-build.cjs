const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../dist");
const originalsRoot = path.resolve(__dirname, "../src/assets/images/originals");
const required = [
  "index.html",
  "servicos/index.html",
  "pegue-e-monte/index.html",
  "mini-festa-na-mesa/index.html",
  "portfolio/index.html",
  "como-funciona/index.html",
  "sobre/index.html",
  "duvidas/index.html",
  "contato/index.html",
  "parceiros/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "favicon.svg",
  "assets/css/styles.css",
  "assets/js/main.js"
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
const html = fs.existsSync(root) ? fs.readdirSync(root, { recursive: true }).filter((file) => String(file).endsWith(".html")).length : 0;
const generated = fs.existsSync(path.join(root, "assets/images/generated"))
  ? fs.readdirSync(path.join(root, "assets/images/generated")).length
  : 0;
const originalCount = fs.existsSync(originalsRoot)
  ? fs.readdirSync(originalsRoot, { recursive: true }).filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(String(file))).length
  : 0;
const htmlFiles = fs.existsSync(root)
  ? fs.readdirSync(root, { recursive: true }).filter((file) => String(file).endsWith(".html"))
  : [];
const productionOrigin = String(process.env.SITE_URL || "").replace(/\/$/, "");

if (missing.length) {
  console.error(`Build inválido. Ausentes: ${missing.join(", ")}`);
  process.exit(1);
}
if (html < 10 || generated < 30 || originalCount !== 95) {
  console.error(`Build incompleto. HTML=${html}; imagens geradas=${generated}; originais=${originalCount}`);
  process.exit(1);
}
for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(root, file), "utf8");
  if (!content.includes("<title") || !content.includes('name="description"') || !content.includes("<main")) {
    console.error(`HTML sem metadados/estrutura esperada: ${file}`);
    process.exit(1);
  }
  if (productionOrigin) {
    if (!content.includes('rel="canonical"') || !content.includes(productionOrigin)) {
      console.error(`Canonical ausente ou fora da origem configurada: ${file}`);
      process.exit(1);
    }
  }
}
const prefix = String(process.env.PATH_PREFIX || "").replace(/\/+$/, "");
if (prefix && prefix !== "/") {
  const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
  if (!home.includes(`${prefix}/assets/css/styles.css`) || !home.includes(`${prefix}/portfolio/`)) {
    console.error(`Prefixo de publicação não encontrado nos links: ${prefix}`);
    process.exit(1);
  }
}

if (productionOrigin) {
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
  const generated = htmlFiles.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
  const siteBase = `${productionOrigin}${prefix && prefix !== "/" ? prefix : ""}`;
  const forbidden = /robertopclaro\.github\.io|localhost|\/lela-decoracoes-site\/|http:\/\/leladecoracoes\.com/;
  if (!sitemap.includes(`${siteBase}/`) || !robots.includes(`Sitemap: ${siteBase}/sitemap.xml`)) {
    console.error(`Sitemap/robots não usam a base configurada: ${siteBase}`);
    process.exit(1);
  }
  if (forbidden.test(`${generated}\n${sitemap}\n${robots}`)) {
    console.error("Build de produção contém URL pública antiga ou origem insegura.");
    process.exit(1);
  }
}

console.log(`Build validado: ${html} HTML, ${generated} derivados de imagem, ${originalCount} originais.`);
