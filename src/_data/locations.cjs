const joinvilleSource = {
  title: "Joinville Bairro a Bairro 2026 — Prefeitura de Joinville",
  url: "https://www.joinville.sc.gov.br/publicacoes/joinville-bairro-a-bairro/",
  checkedAt: "2026-10-13"
};

const araquariSources = {
  census: {
    title: "Censo Demográfico 2022 — mapas e descrições de setores censitários, IBGE",
    url: "https://geoftp.ibge.gov.br/cartas_e_mapas/mapas_para_fins_de_levantamentos_estatisticos/censo_demografico_2022/mapas_e_descritivos_de_setores_censitarios/SC/4201307/",
    checkedAt: "2026-10-13"
  },
  municipalBoroughs2026: {
    title: "Prefeitura de Araquari — SINE, bairros informados em vagas (fevereiro de 2026)",
    url: "https://araquari.atende.net/cidadao/noticia/sine-araquari-divulga-novas-vagas-de-emprego-nesta-sexta-feira",
    checkedAt: "2026-10-13"
  },
  municipalBoroughsJuly2026: {
    title: "Prefeitura de Araquari — SINE, bairros informados em vagas (julho de 2026)",
    url: "https://araquari.atende.net/cidadao/noticia/sine-araquari-divulga-37-vagas-de-emprego-nesta-sextafeira-1007",
    checkedAt: "2026-10-13"
  },
};

const joinvilleNames = [
  "Adhemar Garcia", "América", "Anita Garibaldi", "Atiradores", "Aventureiro",
  "Boa Vista", "Boehmerwald", "Bom Retiro", "Bucarein", "Centro", "Comasa",
  "Costa e Silva", "Dona Francisca", "Espinheiros", "Fátima", "Floresta", "Glória",
  "Guanabara", "Iririú", "Itaum", "Itinga", "Jardim Iririú", "Jardim Paraíso",
  "Jardim Sofia", "Jarivatuba", "João Costa", "Marinas", "Morro do Meio",
  "Nova Brasília", "Paranaguamirim", "Parque Guarani", "Petrópolis", "Pirabeiraba",
  "Profipo", "Rio Bonito", "Saguaçu", "Santa Catarina", "Santo Antônio", "São Marcos",
  "Ulysses Guimarães", "Vale Verde", "Vila Cubatão", "Vila Nova", "Zona Industrial Norte",
  "Zona Industrial Tupy"
];

const araquariNames = [
  {
    name: "Areias Pequenas",
    source: araquariSources.municipalBoroughs2026
  },
  {
    name: "Barra do Itapocu",
    source: {
      title: "IBGE, Censo 2022 — setor censitário 420130710000017",
      url: `${araquariSources.census.url}42013071000/MSU/420130710000017/d_420130710000017.pdf`,
      checkedAt: "2026-10-13"
    }
  },
  {
    name: "Centro",
    source: araquariSources.municipalBoroughs2026
  },
  {
    name: "Casa Nova",
    source: araquariSources.municipalBoroughs2026
  },
  {
    name: "Colégio Agrícola",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Corveta",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Itapocu",
    source: araquariSources.municipalBoroughs2026
  },
  {
    name: "Itinga",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Jacu",
    source: araquariSources.municipalBoroughs2026
  },
  {
    name: "Ponto Alto",
    source: araquariSources.municipalBoroughs2026
  },
  {
    name: "Porto Grande",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Rainha",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Rio do Morro",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Trevo",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Volta Redonda",
    source: araquariSources.municipalBoroughs2026
  }
];

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const commonServices = [
  {
    name: "Pegue e Monte",
    path: "/pegue-e-monte/",
    description: "Escolha um tema, consulte a data, retire o kit, monte e devolva conforme combinado."
  },
  {
    name: "Mini Festa na Mesa",
    path: "/mini-festa-na-mesa/",
    description: "Uma composição compacta para aniversários, mêsversários e celebrações íntimas."
  },
  {
    name: "Temas e decorações",
    path: "/portfolio/",
    description: "Consulte os temas que aparecem no acervo e confirme a disponibilidade."
  }
];

const cities = [
  {
    type: "city",
    name: "Joinville",
    slug: "joinville",
    state: "SC",
    stateName: "Santa Catarina",
    path: "/regioes-atendidas/joinville/",
    geographyStatus: "CONFIRMED",
    geographySource: joinvilleSource,
    commercialStatus: "CONFIRMED",
    commercialConfirmationScope: "Atendimento municipal declarado no site atual da empresa.",
    commercialSources: [
      { title: "Site da Lela Decorações", url: "https://leladecoracoes.com/", checkedAt: "2026-10-13" },
      { title: "Contato e endereço para retirada", url: "https://leladecoracoes.com/contato/", checkedAt: "2026-10-13" }
    ],
    publicationStatus: "READY_FOR_REVIEW",
    indexable: true,
    publicationBasis: "CITY_SERVICE",
    schemaServiceAreas: ["Joinville, SC"],
    content: {
      title: "Pegue e Monte e decoração de festas em Joinville | Lela Decorações",
      description: "Conheça o Pegue e Monte e a Mini Festa na Mesa da Lela Decorações em Joinville. Consulte temas, data e condições de retirada ou entrega.",
      eyebrow: "Joinville · Santa Catarina",
      h1: "Pegue e Monte e decoração de festas em Joinville",
      intro: "A Lela Decorações oferece Pegue e Monte e Mini Festa na Mesa para comemorações em Joinville. Consulte temas do acervo, a data e o formato adequado ao espaço da sua festa.",
      detailTitle: "Retirada e entrega em Joinville",
      detailText: "O endereço informado para retirada fica no Paranaguamirim. No Pegue e Monte, retirada e devolução pelo cliente são a regra. Entrega e retirada no local podem ser consultadas, conforme disponibilidade e taxa.",
      pickupNeighborhoodPath: "/regioes-atendidas/joinville/paranaguamirim/",
      pickupLabel: "Ver informações do ponto de retirada no Paranaguamirim",
      services: commonServices,
      schemaServiceName: "Decoração de festas em Joinville",
      schemaServiceDescription: "Pegue e Monte, Mini Festa na Mesa e temas para comemorações em Joinville, Santa Catarina.",
      whatsappMessage: "Olá, Lela! Encontrei a página de decoração de festas em Joinville. Meu bairro/endereço é [bairro/endereço] e quero consultar a disponibilidade para [data].",
      whatsappLabel: "Consultar atendimento em Joinville",
      faqs: [
        {
          question: "Onde retiro o kit da Lela Decorações em Joinville?",
          answer: "O endereço informado para retirada fica na R. Matusalém Gonçalves Pinheiro, 83, no Paranaguamirim. Combine a disponibilidade e a retirada pelo WhatsApp."
        },
        {
          question: "A Lela entrega em todos os bairros de Joinville?",
          answer: "Não há uma lista pública de bairros com entrega confirmada. Entrega e retirada no local podem ser consultadas conforme o endereço, a disponibilidade e a taxa."
        }
      ]
    }
  },
  {
    type: "city",
    name: "Araquari",
    slug: "araquari",
    state: "SC",
    stateName: "Santa Catarina",
    path: "/regioes-atendidas/araquari/",
    geographyStatus: "CONFIRMED",
    geographySource: {
      title: "Araquari, SC — IBGE",
      url: "https://www.ibge.gov.br/cidades-e-estados/sc/araquari.html",
      checkedAt: "2026-10-13"
    },
    commercialStatus: "CONFIRMED",
    commercialConfirmationScope: "Atendimento municipal declarado no site atual da empresa; condições por endereço ainda precisam de consulta.",
    commercialSources: [
      { title: "Site da Lela Decorações", url: "https://leladecoracoes.com/", checkedAt: "2026-10-13" },
      { title: "Contato e endereço para retirada", url: "https://leladecoracoes.com/contato/", checkedAt: "2026-10-13" }
    ],
    publicationStatus: "READY_FOR_REVIEW",
    indexable: true,
    publicationBasis: "CITY_SERVICE",
    schemaServiceAreas: ["Araquari, SC"],
    content: {
      title: "Pegue e Monte e decoração de festas em Araquari | Lela Decorações",
      description: "Encontre Pegue e Monte e Mini Festa na Mesa para comemorações em Araquari. Consulte temas disponíveis e confirme a logística para seu endereço.",
      eyebrow: "Araquari · Santa Catarina",
      h1: "Decoração de festas em Araquari",
      intro: "A Lela Decorações informa atendimento em Araquari com Pegue e Monte e Mini Festa na Mesa. Consulte o tema e a data e confirme as condições para o endereço da comemoração.",
      detailTitle: "Consulte a logística para seu endereço",
      detailText: "O endereço de retirada divulgado pela Lela fica no Paranaguamirim, em Joinville. Para uma festa em Araquari, confirme pelo WhatsApp se há entrega ou outra condição de retirada para o seu endereço; a disponibilidade e a taxa são verificadas caso a caso.",
      pickupNeighborhoodPath: null,
      pickupLabel: "Ver o endereço de retirada informado em Joinville",
      services: commonServices,
      schemaServiceName: "Decoração de festas em Araquari",
      schemaServiceDescription: "Pegue e Monte, Mini Festa na Mesa e temas para comemorações em Araquari, Santa Catarina.",
      whatsappMessage: "Olá, Lela! Encontrei a página de decoração de festas em Araquari. Meu endereço é [bairro/endereço] e quero consultar a logística para [data].",
      whatsappLabel: "Consultar atendimento em Araquari",
      faqs: [
        {
          question: "A Lela Decorações atende Araquari?",
          answer: "Sim. O site da Lela informa atendimento em Araquari com Pegue e Monte e Mini Festa na Mesa. Consulte a disponibilidade do tema e da data pelo WhatsApp."
        },
        {
          question: "Há entrega de decoração em todos os bairros de Araquari?",
          answer: "Não há uma lista pública de bairros com entrega confirmada. Informe o endereço da festa para consultar disponibilidade, logística e eventual taxa. O endereço de retirada divulgado fica em Joinville."
        }
      ]
    }
  }
];

const neighborhoods = [
  ...joinvilleNames.map((name) => ({
    name,
    citySlug: "joinville",
    geographySource: joinvilleSource
  })),
  ...araquariNames.map((entry) => ({
    name: entry.name,
    citySlug: "araquari",
    geographySource: entry.source
  }))
].map((entry) => {
  const city = cities.find((item) => item.slug === entry.citySlug);
  const slug = slugify(entry.name);
  return {
    type: "neighborhood",
    name: entry.name,
    slug,
    citySlug: city.slug,
    city: city.name,
    state: city.state,
    path: `${city.path}${slug}/`,
    geographyStatus: city.slug === "joinville" ? "MUNICIPAL_LIST" : "OFFICIAL_SOURCE_REFERENCE",
    geographyConfirmationScope: city.slug === "joinville"
      ? "Consta na relação municipal Joinville Bairro a Bairro 2026."
      : "Nome citado como bairro em fonte municipal ou referência geográfica do IBGE; não confirma lista municipal exaustiva nem limites legais.",
    geographySource: entry.geographySource,
    commercialStatus: "UNCONFIRMED",
    commercialConfirmationScope: null,
    serviceCoverageStatus: "UNCONFIRMED",
    serviceCoverageConditions: null,
    confirmedCommercialFacts: [],
    publicationStatus: "PENDING_COMMERCIAL_CONFIRMATION",
    indexable: false,
    content: null
  };
});

const pickupNeighborhood = neighborhoods.find((item) => item.citySlug === "joinville" && item.slug === "paranaguamirim");
pickupNeighborhood.commercialStatus = "CONFIRMED";
pickupNeighborhood.commercialConfirmationScope = "Somente endereço informado para retirada; não confirma entrega no bairro.";
pickupNeighborhood.confirmedCommercialFacts = ["O site atual informa endereço de retirada no Paranaguamirim, Joinville."];
pickupNeighborhood.commercialSource = {
  title: "Contato e dúvidas da Lela Decorações",
  url: "https://leladecoracoes.com/contato/",
  checkedAt: "2026-10-13"
};
pickupNeighborhood.publicationStatus = "READY_FOR_REVIEW";
pickupNeighborhood.indexable = true;
pickupNeighborhood.publicationBasis = "PICKUP_LOCATION";
pickupNeighborhood.content = {
  title: "Retirada de kits Pegue e Monte no Paranaguamirim, Joinville | Lela Decorações",
  description: "Consulte como retirar um kit Pegue e Monte da Lela Decorações no Paranaguamirim, Joinville, e confirme data, disponibilidade e logística.",
  eyebrow: "Ponto de retirada · Joinville",
  h1: "Retirada de kits Pegue e Monte no Paranaguamirim",
  intro: "O endereço informado para retirar os kits da Lela Decorações fica no Paranaguamirim, em Joinville. Consulte a disponibilidade do tema e combine a retirada antes da festa.",
  detailTitle: "Endereço informado para retirada",
  detailText: "No Pegue e Monte, retirada e devolução pelo cliente são a regra. Entrega e retirada no local podem ser consultadas, conforme disponibilidade e taxa. O endereço abaixo identifica o ponto de retirada divulgado; não confirma entrega em todos os endereços do Paranaguamirim.",
  services: [
    {
      name: "Pegue e Monte",
      path: "/pegue-e-monte/",
      description: "Veja o passo a passo de escolha, retirada, montagem e devolução."
    },
    {
      name: "Como funciona",
      path: "/como-funciona/",
      description: "Consulte o processo e as condições informadas antes de reservar."
    }
  ],
  schemaServiceName: null,
  schemaServiceDescription: null,
  whatsappMessage: "Olá, Lela! Encontrei a página do ponto de retirada no Paranaguamirim. Quero consultar um kit para [data] e informar o endereço da festa.",
  whatsappLabel: "Consultar retirada no Paranaguamirim",
  faqs: [
    {
      question: "Qual é o endereço de retirada no Paranaguamirim?",
      answer: "O endereço informado é R. Matusalém Gonçalves Pinheiro, 83, Paranaguamirim, Joinville - SC, CEP 89231-603. Combine data e horário pelo WhatsApp."
    },
    {
      question: "A Lela entrega em todo o Paranaguamirim?",
      answer: "A página confirma o endereço informado para retirada, mas não promete entrega em todo o bairro. Consulte a possibilidade de entrega ou retirada no local conforme o endereço, a disponibilidade e a taxa."
    }
  ]
};

for (const city of cities) {
  city.breadcrumbs = [
    { label: "Início", url: "/" },
    { label: "Regiões atendidas", url: "/regioes-atendidas/" },
    { label: city.name, url: city.path }
  ];
  city.neighborhoods = neighborhoods.filter((item) => item.citySlug === city.slug);
}

for (const neighborhood of neighborhoods) {
  const city = cities.find((item) => item.slug === neighborhood.citySlug);
  neighborhood.breadcrumbs = [
    { label: "Início", url: "/" },
    { label: "Regiões atendidas", url: "/regioes-atendidas/" },
    { label: city.name, url: city.path },
    { label: neighborhood.name, url: neighborhood.path }
  ];
}

const indexFaqs = [
  {
    question: "Quais serviços a Lela Decorações oferece?",
    answer: "A Lela oferece Pegue e Monte, Mini Festa na Mesa e temas para festas e comemorações. Consulte a disponibilidade para a sua data."
  },
  {
    question: "Como funciona a retirada da decoração?",
    answer: "O endereço divulgado para retirada fica no Paranaguamirim, Joinville. No Pegue e Monte, retirada e devolução pelo cliente são a regra; combine os detalhes pelo WhatsApp."
  },
  {
    question: "A Lela entrega em todos os bairros de Joinville e Araquari?",
    answer: "Não há uma lista pública de bairros com entrega confirmada. A possibilidade de entrega ou retirada no local depende do endereço, da disponibilidade e de eventual taxa."
  },
  {
    question: "Como peço um orçamento?",
    answer: "Envie pelo WhatsApp a data da festa, a cidade e o bairro, o serviço desejado e o tema. A Lela consulta disponibilidade e condições para o endereço informado."
  }
];

const publishedPages = [
  ...cities.filter((item) => item.indexable && item.publicationStatus === "READY_FOR_REVIEW"),
  ...neighborhoods.filter((item) => item.indexable && item.publicationStatus === "READY_FOR_REVIEW")
];

module.exports = {
  sources: { joinville: joinvilleSource, araquari: araquariSources },
  geographyRegisterStatus: "PARTIAL_FOR_ARAQUARI",
  geographyRegisterNote: "Joinville segue a relação municipal Bairro a Bairro 2026. Para Araquari, o cadastro reúne nomes usados como bairros em publicações oficiais e referências do IBGE; não foi localizada uma relação municipal única e exaustiva com limites oficiais.",
  cities,
  neighborhoods,
  publishedPages,
  indexFaqs
};
