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

(async () => {
  let next = 0;
  async function worker() {
    while (next < portfolio.all.length) {
      const item = portfolio.all[next++];
      await generate(item);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  console.log(`Imagens geradas: ${portfolio.all.length} originais × ${widths.length} larguras × ${formats.length} formatos.`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
