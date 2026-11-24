const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const portfolio = require("../src/_data/portfolio.cjs");
sharp.concurrency(1);

const output = path.resolve(__dirname, "../dist/assets/images/generated");
const widths = [320, 480, 768, 1200, 1600];
const formats = [
  { name: "avif", options: { quality: 52, effort: 2 } },
  { name: "webp", options: { quality: 78, effort: 2 } },
  { name: "jpeg", options: { quality: 82, progressive: true, mozjpeg: true } }
];

fs.mkdirSync(output, { recursive: true });

async function generate(item) {
  const metadata = await sharp(item.sourcePath).metadata();
  for (const width of widths) {
    for (const format of formats) {
      const filename = `${item.generatedBase}-${width}.${format.name === "jpeg" ? "jpg" : format.name}`;
      let image = sharp(item.sourcePath, { animated: false }).rotate().resize({ width, fit: "inside", withoutEnlargement: true });
      if (metadata.hasAlpha && format.name === "jpeg") image = image.flatten({ background: "#fff" });
      await image.toFormat(format.name, format.options).toFile(path.join(output, filename));
    }
  }
}

const brandLogoSource = path.resolve(__dirname, "../src/assets/images/reference/763050356_18613920478042020_6619288363067691579_n.jpeg");
const ownerAvatarSource = path.resolve(__dirname, "../src/assets/images/reference/avatar-leticia.png");

async function generateBrandAndAvatar() {
  await Promise.all([
    sharp(brandLogoSource).rotate().resize({ width: 116, height: 116, fit: "cover", position: "centre" }).avif({ quality: 62, effort: 2 }).toFile(path.join(output, "brand-logo-116.avif")),
    sharp(brandLogoSource).rotate().resize({ width: 174, height: 174, fit: "cover", position: "centre" }).avif({ quality: 65, effort: 2 }).toFile(path.join(output, "brand-logo-174.avif")),
    sharp(brandLogoSource).rotate().resize({ width: 116, height: 116, fit: "cover", position: "centre" }).webp({ quality: 84, effort: 2 }).toFile(path.join(output, "brand-logo-116.webp")),
    sharp(brandLogoSource).rotate().resize({ width: 174, height: 174, fit: "cover", position: "centre" }).webp({ quality: 86, effort: 2 }).toFile(path.join(output, "brand-logo-174.webp")),
    sharp(brandLogoSource).rotate().resize({ width: 116, height: 116, fit: "cover", position: "centre" }).jpeg({ quality: 86, progressive: true, mozjpeg: true }).toFile(path.join(output, "brand-logo-116.jpg")),
    sharp(ownerAvatarSource).rotate().resize({ width: 188, height: 245, fit: "inside", withoutEnlargement: true }).avif({ quality: 78, effort: 2 }).toFile(path.join(output, "avatar-leticia-188.avif")),
    sharp(ownerAvatarSource).rotate().resize({ width: 188, height: 245, fit: "inside", withoutEnlargement: true }).webp({ quality: 90, effort: 2 }).toFile(path.join(output, "avatar-leticia-188.webp"))
  ]);
}

(async () => {
  let next = 0;
  async function worker() {
    while (next < portfolio.all.length) {
      const item = portfolio.all[next++];
      await generate(item);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  await generateBrandAndAvatar();
  console.log(`Imagens geradas: ${portfolio.all.length} originais × ${widths.length} larguras × ${formats.length} formatos + logo (116x116, 174x174) e avatar (188x245).`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
