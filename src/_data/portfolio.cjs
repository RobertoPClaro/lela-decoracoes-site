const fs = require("node:fs");
const path = require("node:path");
const imageSize = require("image-size");

const root = path.resolve(__dirname, "../assets/images/originals");
const categoryFolders = ["Tema Menina", "Tema Menino", "Tema Adulto", "Tema Diversos", "Tema Futebol"];
const categoryDefinitions = [
  { slug: "infantil", label: "Festas infantis", folders: ["Tema Menina", "Tema Menino"], eyebrow: "Infantil", copy: "Personagens e estilos para comemorações de crianças, organizados em uma categoria única." },
  { slug: "adulto", label: "Festas adultas", folders: ["Tema Adulto"], eyebrow: "Adulto", copy: "Referências para aniversários e encontros de adultos." },
  { slug: "diversos", label: "Temas e ocasiões", folders: ["Tema Diversos"], eyebrow: "Outras ocasiões", copy: "Temas e referências que atendem diferentes estilos de comemoração." },
  { slug: "futebol", label: "Futebol", folders: ["Tema Futebol"], eyebrow: "Esportivo", copy: "Referências de clubes e futebol presentes no acervo." }
];
const categoryByFolder = new Map(categoryDefinitions.flatMap((category) =>
  category.folders.map((folder) => [folder, category])
));
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const displayNames = {
  "Tema Menina/tema-alice-no-pais-das-maravilhas-01.jpeg": "Alice no País das Maravilhas",
  "Tema Menina/tema-barbie-01.jpeg": "Barbie",
  "Tema Menina/tema-borboletas-01.jpeg": "Borboletas e Flores",
  "Tema Menina/tema-cereja-do-bolo-01.jpeg": "Você é a Cereja do Bolo",
  "Tema Menina/tema-cowgirl-01.jpeg": "Ana Castela – A Boiadeira",
  "Tema Menina/tema-dorama-01.jpeg": "Apaixonada por Dorama",
  "Tema Menina/tema-eu-amo-tete-02.jpeg": "Eu Amo Tetê – Vaquinha",
  "Tema Menina/tema-fortnite-01.jpeg": "Guerreiras do K-Pop – HUNTR/X",
  "Tema Menina/tema-frozen-01.jpeg": "Frozen",
  "Tema Menina/tema-gabbys-dollhouse-01.jpeg": "A Casa Mágica da Gabby",
  "Tema Menina/tema-grupo-pop-01.jpeg": "Tropa dos Rosa",
  "Tema Menina/tema-hamster-fofo-01.jpeg": "Capivara Fofa",
  "Tema Menina/tema-lol-surprise-01.jpeg": "Guerreiras do K-Pop – HUNTR/X",
  "Tema Menina/tema-magali-01.jpeg": "Magali – Turma da Mônica",
  "Tema Menina/tema-minnie-01.jpeg": "Minnie Mouse",
  "Tema Menina/tema-moana-01.jpeg": "Moana",
  "Tema Menina/tema-monica-01.jpeg": "Mônica – Turma da Mônica",
  "Tema Menina/tema-monstros-sa-01.jpeg": "Monstros S.A.",
  "Tema Menina/tema-princesas-01.jpeg": "Princesas Disney",
  "Tema Menina/tema-rainbow-friends-01.jpeg": "Tropa dos Rosa",
  "Tema Menina/tema-sereia-01.jpeg": "Mamãe e Bebê Sereia",
  "Tema Menina/tema-skye-patrulha-canina-01.jpeg": "Skye – Patrulha Canina",
  "Tema Menina/tema-stitch-01.jpeg": "Stitch",
  "Tema Menina/tema-turma-da-monica-01.jpeg": "Maria Clara e JP",
  "Tema Menina/tema-unicornio-01.jpeg": "Unicórnio Floral",
  "Tema Menino/tema-arca-de-noe-01.jpeg": "Arca de Noé",
  "Tema Menino/tema-astronauta-01.jpeg": "Astronauta Infantil",
  "Tema Menino/tema-batwheels-01.jpeg": "Batwheels",
  "Tema Menino/tema-bluey-01.jpeg": "Bluey",
  "Tema Menino/tema-bob-esponja-01.jpeg": "Bob Esponja",
  "Tema Menino/tema-carros-01.jpeg": "Carros",
  "Tema Menino/tema-circo-01.jpeg": "Circo",
  "Tema Menino/tema-dinossauros-02.jpeg": "Dinossauros",
  "Tema Menino/tema-eu-amo-tete-01.jpeg": "Eu Amo Tetê – Vaquinha",
  "Tema Menino/tema-homem-aranha-01.jpeg": "Homem-Aranha",
  "Tema Menino/tema-hot-wheels-01.jpeg": "Hot Wheels",
  "Tema Menino/tema-hulk-01.jpeg": "Hulk",
  "Tema Menino/tema-incrediveis-01.jpeg": "Os Incríveis",
  "Tema Menino/tema-mickey-01.jpeg": "Mickey Mouse",
  "Tema Menino/tema-minecraft-01.jpeg": "Minecraft",
  "Tema Menino/tema-minions-01.jpeg": "Minions",
  "Tema Menino/tema-mundo-bita-01.jpeg": "Mundo Bita",
  "Tema Menino/tema-naruto-01.jpeg": "Naruto",
  "Tema Menino/tema-patrulha-canina-01.jpeg": "Patrulha Canina",
  "Tema Menino/tema-rei-leao-01.jpeg": "O Rei Leão",
  "Tema Menino/tema-safari-01.jpeg": "Safari Baby",
  "Tema Menino/tema-sonic-01.jpeg": "Sonic",
  "Tema Menino/tema-super-herois-01.jpeg": "Super-Heróis Marvel e DC",
  "Tema Menino/tema-super-mario-01.jpeg": "Super Mario",
  "Tema Menino/tema-tempo-voa-01.jpeg": "O Tempo Voa – Bebê Aviador",
  "Tema Menino/tema-tom-e-jerry-01.jpeg": "Tom e Jerry",
  "Tema Menino/tema-toy-story-01.jpeg": "Toy Story",
  "Tema Menino/tema-winnie-pooh-01.jpeg": "Winnie the Pooh",
  "Tema Adulto/tema-boteco-01.jpeg": "Boteco",
  "Tema Adulto/tema-cha-de-cozinha-01.jpeg": "Chá de Cozinha",
  "Tema Diversos/tema-animais-fofos-01.jpeg": "Bolofofos",
  "Tema Diversos/tema-aniversario-adulto-01.jpeg": "Happy Birthday",
  "Tema Diversos/tema-dia-dos-namorados-01.jpeg": "Dia dos Namorados",
  "Tema Diversos/tema-dinossauros-01.jpeg": "Dinossauros Baby",
  "Tema Diversos/tema-faz-um-pix-01.jpeg": "Faz um Pix Pra Mim",
  "Tema Diversos/tema-fazendinha-01.jpeg": "Fazendinha",
  "Tema Diversos/tema-festa-junina-01.jpeg": "Festa Junina",
  "Tema Diversos/tema-fundo-do-mar-01.jpeg": "Fundo do Mar",
  "Tema Diversos/tema-galinha-pintadinha-01.jpeg": "Galinha Pintadinha",
  "Tema Diversos/tema-gratidao-01.jpeg": "Gratidão",
  "Tema Diversos/tema-happy-birthday-01.jpeg": "Happy Birthday",
  "Tema Diversos/tema-menino-ou-menina-01.jpeg": "Chá Revelação – Menino ou Menina",
  "Tema Diversos/tema-pool-party-01.jpeg": "Pool Party",
  "Tema Diversos/tema-primeira-comunhao-01.jpeg": "Primeira Comunhão",
  "Tema Diversos/tema-safari-animais-01.jpeg": "Safari Baby",
  "Tema Diversos/tema-tardezinha-01.jpeg": "Tardezinha",
  "Tema Diversos/tema-video-game-01.jpeg": "Videogame / Gamer",
  "Tema Futebol/tema-brasil-futebol-01.jpeg": "Brasil Futebol",
  "Tema Futebol/tema-corinthians-01.jpeg": "Corinthians",
  "Tema Futebol/tema-corinthians-baby-01.jpeg": "Copinha Baby",
  "Tema Futebol/tema-flamengo-01.jpeg": "Flamengo",
  "Tema Futebol/tema-vasco-01.jpeg": "Vasco da Gama",
  "kits/kit-aniversario-adulto-01.png": "Happy Birthday",
  "kits/kit-bluey-01.png": "Bluey",
  "kits/kit-borboletas-01.jpeg": "Borboletas e Flores",
  "kits/kit-brasil-futebol-01.jpeg": "Seleção Brasileira",
  "kits/kit-corinthians-01.jpeg": "Corinthians",
  "kits/kit-crisma-01.jpeg": "Crisma",
  "kits/kit-dinossauros-01.png": "Dinossauros",
  "kits/kit-dinossauros-02.jpeg": "Dinossauros",
  "kits/kit-eu-amo-tete-01.png": "Eu Amo Tetê – Vaquinha",
  "kits/kit-gabbys-dollhouse-01.jpeg": "A Casa Mágica da Gabby",
  "kits/kit-menino-ou-menina-01.jpeg": "Chá Revelação – Menino ou Menina",
  "kits/kit-musica-01.jpeg": "Música",
  "kits/kit-naruto-01.png": "Naruto",
  "kits/kit-safari-01.png": "Safari Baby",
  "kits/kit-skye-patrulha-canina-01.png": "Skye – Patrulha Canina",
  "kits/kit-skye-patrulha-canina-02.jpeg": "Skye – Patrulha Canina",
  "kits/kit-toy-story-01.jpeg": "Toy Story",
  "kits/kit-ursinho-bebe-01.jpeg": "Ursinho Bebê Azul"
};

const replacements = {
  "cha": "Chá",
  "bebê": "bebê",
  "bebe": "bebê",
  "reve": "revelação",
  "pix": "Pix",
  "happy": "Happy",
  "birthday": "Birthday",
  "eu": "Eu",
  "amo": "Amo",
  "tete": "Tetê",
  "faz": "Faz",
  "um": "um",
  "pais": "País",
  "das": "das",
  "maravilhas": "Maravilhas",
  "sa": "S.A.",
  "mickey": "Mickey",
  "minnie": "Minnie",
  "corinthians": "Corinthians",
  "flamengo": "Flamengo",
  "vasco": "Vasco",
  "naruto": "Naruto",
  "barbie": "Barbie",
  "frozen": "Frozen",
  "bluey": "Bluey",
  "skye": "Skye",
  "minecraft": "Minecraft",
  "fortnite": "Fortnite"
};

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function humanize(file) {
  const base = file.replace(/\.[^.]+$/, "").replace(/^(tema|kit)-/, "").replace(/-\d+$/, "");
  return base.split("-").map((word, index) => {
    const mapped = replacements[word] || word;
    if (index === 0 && !replacements[word]) return mapped.charAt(0).toUpperCase() + mapped.slice(1);
    return mapped;
  }).join(" ");
}

function readImages(folder, sourceType) {
  const folderPath = path.join(root, folder);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { numeric: true }))
    .map((entry, index) => {
      const technicalName = humanize(entry.name);
      const slug = slugify(technicalName);
      const displayNameKey = `${folder}/${entry.name}`;
      const themeName = displayNames[displayNameKey];
      if (!themeName) throw new Error(`Nome de exibição não cadastrado para ${displayNameKey}`);
      const sourcePath = path.join(folderPath, entry.name);
      const dimensions = imageSize(sourcePath);
      const category = categoryByFolder.get(folder);
      return {
        id: `${slug}-${sourceType}-${index + 1}`,
        slug,
        themeName,
        title: themeName,
        alt: sourceType === "theme"
          ? `Imagem de referência no tema ${themeName}`
          : `Exemplo de kit montado no tema ${themeName}`,
        caption: sourceType === "theme" ? `Referência do tema ${themeName}` : `Kit montado: ${themeName}`,
        category: sourceType === "theme" ? category.slug : "kits-montados",
        categoryLabel: sourceType === "theme" ? category.label : "Kits montados",
        folder,
        sourceType,
        filename: entry.name,
        generatedBase: entry.name.replace(/\.[^.]+$/, "").toLowerCase(),
        width: dimensions.width,
        height: dimensions.height,
        sourcePath
      };
    });
}

const themes = categoryFolders.flatMap((folder) => readImages(folder, "theme"));
const kits = readImages("kits", "kit-example");

function firstMatch(list, needle) {
  return list.find((item) => item.filename.includes(needle)) || list[0];
}

const featured = [
  firstMatch(kits, "ursinho-bebe"),
  firstMatch(themes, "frozen"),
  firstMatch(themes, "homem-aranha"),
  firstMatch(themes, "fazendinha"),
  firstMatch(themes, "boteco"),
  firstMatch(themes, "corinthians"),
  firstMatch(kits, "safari"),
  firstMatch(kits, "dinossauros")
].filter(Boolean);

const categoryCards = categoryDefinitions.map((category) => ({
  ...category,
  folder: category.folders[0],
  image: themes.find((item) => category.folders.includes(item.folder))
}));

module.exports = {
  themes,
  kits,
  all: [...themes, ...kits],
  featured,
  categories: categoryDefinitions,
  categoryCards,
  counts: { themes: themes.length, kits: kits.length, total: themes.length + kits.length }
};
