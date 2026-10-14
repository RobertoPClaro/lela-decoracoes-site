const portfolio = require("./portfolio.cjs");

const catalogByFile = new Map(
  portfolio.all.map((item) => [`${item.folder}/${item.filename}`, item])
);

const editorialPages = [
  {
    slug: "safari-baby",
    name: "Safari Baby",
    title: "Safari Baby para festa em Joinville e Araquari | Lela Decorações",
    description: "Veja referências do tema Safari Baby no acervo da Lela e consulte disponibilidade, composição e logística para sua data em Joinville ou Araquari.",
    h1: "Decoração Safari Baby para festas em Joinville e Araquari",
    intro: "O acervo Safari Baby reúne dois painéis com ilustrações de animais e uma imagem de kit montado. Use as referências para escolher o estilo e consulte qual configuração está disponível para sua data.",
    galleryTitle: "Referências de Safari Baby no acervo",
    galleryText: "As imagens mostram dois painéis com composições diferentes de animais e um exemplo de montagem. Elas ajudam a identificar o tema, mas não definem a composição exata de um kit reservado.",
    images: [
      { file: "Tema Menino/tema-safari-01.jpeg", alt: "Painel decorativo com ilustração de animais no tema Safari Baby.", caption: "Painel ilustrado no tema Safari Baby" },
      { file: "Tema Diversos/tema-safari-animais-01.jpeg", alt: "Outra referência de painel com animais para o tema Safari Baby.", caption: "Outra referência de painel Safari Baby" },
      { file: "kits/kit-safari-01.png", alt: "Exemplo de montagem de mesa no tema Safari Baby, com painel e balões.", caption: "Exemplo de kit montado Safari Baby" }
    ],
    faqs: [
      { question: "Qual é a diferença entre as referências de painel do Safari Baby?", answer: "O acervo reúne duas imagens de painéis com ilustrações diferentes de animais e uma foto de uma mesa montada. A foto da montagem serve de inspiração; consulte o que compõe o kit disponível para sua data." }
    ]
  },
  {
    slug: "bluey",
    name: "Bluey",
    title: "Bluey para festa em Joinville e Araquari | Lela Decorações",
    description: "Conheça as referências do tema Bluey no acervo da Lela. Consulte disponibilidade, formato do kit e logística para sua festa em Joinville ou Araquari.",
    h1: "Decoração Bluey para festas em Joinville e Araquari",
    intro: "A página reúne uma referência do painel Bluey e uma foto de kit montado. Se esse é o tema da sua festa, compartilhe a data e a cidade com a Lela para confirmar o que está disponível.",
    galleryTitle: "Painel e exemplo de montagem Bluey",
    galleryText: "Uma imagem mostra o painel ilustrado; a outra apresenta uma montagem de mesa no mesmo tema. A composição e os itens disponíveis variam e são confirmados no atendimento.",
    images: [
      { file: "Tema Menino/tema-bluey-01.jpeg", alt: "Painel decorativo com ilustração da família Bluey.", caption: "Painel ilustrado no tema Bluey" },
      { file: "kits/kit-bluey-01.png", alt: "Exemplo de mesa montada no tema Bluey, com painel e itens decorativos.", caption: "Exemplo de kit montado Bluey" }
    ],
    faqs: [
      { question: "O que as imagens de Bluey ajudam a escolher?", answer: "Uma foto mostra a referência do painel e a outra apresenta uma mesa montada no tema. Elas ajudam a comparar o visual; os itens que acompanham a opção disponível são informados no atendimento." }
    ]
  },
  {
    slug: "dinossauros",
    name: "Dinossauros",
    title: "Dinossauros para festa em Joinville e Araquari | Lela Decorações",
    description: "Veja fotos do tema Dinossauros no acervo da Lela e consulte qual kit, composição e logística podem ser reservados para Joinville ou Araquari.",
    h1: "Decoração Dinossauros para festas em Joinville e Araquari",
    intro: "As referências de Dinossauros incluem um painel ilustrado e duas imagens de montagem. Compare o estilo visual que procura e confirme com a Lela o formato e a disponibilidade para sua data.",
    galleryTitle: "Painel e montagens no tema Dinossauros",
    galleryText: "O acervo mostra uma referência de painel e duas propostas de montagem com elementos visuais diferentes. As fotos não informam medidas, itens inclusos ou estoque atual; esses detalhes são confirmados antes da reserva.",
    images: [
      { file: "Tema Menino/tema-dinossauros-02.jpeg", alt: "Painel decorativo ilustrado com dinossauros.", caption: "Painel ilustrado no tema Dinossauros" },
      { file: "kits/kit-dinossauros-01.png", alt: "Exemplo de mesa montada no tema Dinossauros, com painel e balões.", caption: "Exemplo de montagem Dinossauros" },
      { file: "kits/kit-dinossauros-02.jpeg", alt: "Outra proposta de montagem no tema Dinossauros com painel e arco de balões.", caption: "Outra referência de montagem Dinossauros" }
    ],
    faqs: [
      { question: "O acervo de Dinossauros mostra mais de uma montagem?", answer: "Sim. Além da referência do painel, há duas fotos de mesas montadas com apresentações visuais diferentes. As imagens não definem medidas, itens inclusos nem disponibilidade para uma data." }
    ]
  },
  {
    slug: "casa-magica-da-gabby",
    name: "A Casa Mágica da Gabby",
    title: "Casa Mágica da Gabby em Joinville e Araquari | Lela Decorações",
    description: "Veja referências da Casa Mágica da Gabby no acervo da Lela. Consulte o kit disponível e a logística para sua festa em Joinville ou Araquari.",
    h1: "Decoração da Casa Mágica da Gabby para festas em Joinville e Araquari",
    intro: "Para o tema da Gabby, o acervo apresenta uma referência de painel e uma foto de montagem com peças decorativas. Conte qual imagem combina com sua ideia e confirme a composição disponível para a data.",
    galleryTitle: "Referências da Casa Mágica da Gabby",
    galleryText: "A galeria combina uma imagem do painel temático com um exemplo de kit montado. A foto serve para orientar a escolha do tema; os itens e o porte precisam ser consultados.",
    images: [
      { file: "Tema Menina/tema-gabbys-dollhouse-01.jpeg", alt: "Painel decorativo ilustrado no tema A Casa Mágica da Gabby.", caption: "Painel ilustrado da Casa Mágica da Gabby" },
      { file: "kits/kit-gabbys-dollhouse-01.jpeg", alt: "Exemplo de mesa montada no tema A Casa Mágica da Gabby, com painel e peças decorativas.", caption: "Exemplo de kit montado da Gabby" }
    ],
    faqs: [
      { question: "O que aparece na referência de montagem da Casa Mágica da Gabby?", answer: "O acervo mostra uma imagem do painel temático e outra de uma mesa com peças decorativas. A foto ilustra o estilo; a Lela informa quais itens estão disponíveis para a data consultada." }
    ]
  },
  {
    slug: "skye-patrulha-canina",
    name: "Skye – Patrulha Canina",
    title: "Skye da Patrulha Canina em Joinville e Araquari | Lela Decorações",
    description: "Conheça as referências de Skye, da Patrulha Canina, no acervo da Lela e consulte disponibilidade e logística em Joinville ou Araquari.",
    h1: "Decoração da Skye, da Patrulha Canina, em Joinville e Araquari",
    intro: "O acervo associado à Skye reúne uma imagem do painel e um exemplo de mesa montada. Se procura essa personagem para uma festa em Joinville ou Araquari, consulte os itens disponíveis e as condições para sua data.",
    galleryTitle: "Painel e montagens com Skye",
    galleryText: "As fotos mostram o painel ilustrado de Skye e um exemplo de mesa montada. A Lela confirma quais itens e formatos estão disponíveis no momento do orçamento.",
    images: [
      { file: "Tema Menina/tema-skye-patrulha-canina-01.jpeg", alt: "Painel decorativo ilustrado com Skye, da Patrulha Canina.", caption: "Painel ilustrado com Skye" },
      { file: "kits/kit-skye-patrulha-canina-01.png", alt: "Exemplo de montagem de mesa com painel e decoração da Skye.", caption: "Exemplo de kit montado com Skye" }
    ],
    faqs: [
      { question: "A página da Skye tem uma foto do painel e outra da mesa montada?", answer: "Sim. Uma imagem mostra o painel ilustrado da personagem; a outra registra uma montagem de mesa no tema. A composição fotografada é uma referência e precisa ser confirmada para a data escolhida." }
    ]
  },
  {
    slug: "toy-story",
    name: "Toy Story",
    title: "Toy Story para festa em Joinville e Araquari | Lela Decorações",
    description: "Confira as referências de Toy Story no acervo da Lela. Consulte disponibilidade, composição do kit e logística para Joinville ou Araquari.",
    h1: "Decoração Toy Story para festas em Joinville e Araquari",
    intro: "A página reúne um painel ilustrado de Toy Story e uma foto de kit montado. Compartilhe a referência escolhida com a Lela para verificar o formato disponível e os detalhes da sua data.",
    galleryTitle: "Painel e exemplo de kit Toy Story",
    galleryText: "Uma foto registra o painel do tema e a outra mostra uma proposta de montagem de mesa. As imagens são referências do acervo, não uma lista de itens garantidos em cada reserva.",
    images: [
      { file: "Tema Menino/tema-toy-story-01.jpeg", alt: "Painel decorativo ilustrado no tema Toy Story.", caption: "Painel ilustrado Toy Story" },
      { file: "kits/kit-toy-story-01.jpeg", alt: "Exemplo de mesa montada no tema Toy Story, com painel e itens decorativos.", caption: "Exemplo de kit montado Toy Story" }
    ],
    faqs: [
      { question: "As imagens de Toy Story mostram o que acompanha o kit?", answer: "Elas mostram uma referência do painel e um exemplo de mesa montada, mas não listam todos os itens de uma reserva. Peça à Lela a composição disponível para a sua data." }
    ]
  },
  {
    slug: "naruto",
    name: "Naruto",
    title: "Naruto para festa em Joinville e Araquari | Lela Decorações",
    description: "Veja imagens do tema Naruto no acervo da Lela e consulte disponibilidade, composição e logística para sua festa em Joinville ou Araquari.",
    h1: "Decoração Naruto para festas em Joinville e Araquari",
    intro: "O acervo Naruto inclui uma referência do painel ilustrado e uma foto de montagem. Informe a data e a cidade para a Lela conferir se o tema e o formato desejado estão disponíveis.",
    galleryTitle: "Painel e montagem no tema Naruto",
    galleryText: "A galeria apresenta o painel ilustrado e uma proposta de mesa montada. Consulte os itens, o porte e as condições do kit antes de reservar; as fotos não garantem estoque para uma data específica.",
    images: [
      { file: "Tema Menino/tema-naruto-01.jpeg", alt: "Painel decorativo ilustrado no tema Naruto.", caption: "Painel ilustrado Naruto" },
      { file: "kits/kit-naruto-01.png", alt: "Exemplo de mesa montada no tema Naruto, com painel e balões.", caption: "Exemplo de kit montado Naruto" }
    ],
    faqs: [
      { question: "A foto de montagem Naruto informa os itens do kit?", answer: "A imagem é uma referência visual do painel e da mesa montada, não uma lista de itens. Consulte a composição e a disponibilidade para a data antes de reservar." }
    ]
  },
  {
    slug: "corinthians",
    name: "Corinthians",
    title: "Corinthians para festa em Joinville e Araquari | Lela Decorações",
    description: "Conheça as referências do tema Corinthians no acervo da Lela e consulte o kit e a logística para sua comemoração em Joinville ou Araquari.",
    h1: "Decoração Corinthians para festas em Joinville e Araquari",
    intro: "Para quem quer levar o tema Corinthians à mesa da festa, o acervo apresenta uma referência de painel e um exemplo de kit montado. Consulte a composição disponível e a logística para sua data.",
    galleryTitle: "Painel e exemplo de montagem Corinthians",
    galleryText: "As duas imagens mostram o painel temático e uma proposta de mesa montada. A disponibilidade dos itens e o porte adequado são confirmados no atendimento, conforme a data e o local da festa.",
    images: [
      { file: "Tema Futebol/tema-corinthians-01.jpeg", alt: "Painel decorativo com o escudo do Corinthians.", caption: "Painel no tema Corinthians" },
      { file: "kits/kit-corinthians-01.jpeg", alt: "Exemplo de mesa montada no tema Corinthians, com painel e itens decorativos.", caption: "Exemplo de kit montado Corinthians" }
    ],
    faqs: [
      { question: "A foto do Corinthians informa os itens incluídos na montagem?", answer: "A imagem mostra uma referência do painel e um exemplo de mesa montada, mas não especifica a composição do kit. Consulte os itens disponíveis para sua data antes de reservar." }
    ]
  }
];

const pages = editorialPages.map((page) => {
  const images = page.images.map((entry) => {
    const item = catalogByFile.get(entry.file);
    if (!item) throw new Error(`Imagem do tema não encontrada no portfólio: ${entry.file}`);
    return { ...item, alt: entry.alt, caption: entry.caption };
  });
  return {
    ...page,
    path: `/temas/${page.slug}/`,
    publicationStatus: "PUBLISHED",
    availabilityStatus: "VERIFY_BY_DATE",
    images,
    heroImage: images[0]
  };
});

const published = pages.filter((page) => page.publicationStatus === "PUBLISHED");

module.exports = {
  pages,
  published,
  byName: Object.fromEntries(published.map((page) => [page.name, page]))
};
