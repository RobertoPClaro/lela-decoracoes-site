const faqData = require("./faqs.cjs");
const commercial = require("./commercial.cjs");

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
  municipalDistrict: {
    title: "Prefeitura de Araquari — serviços e subprefeitura no distrito de Itapocu",
    url: "https://araquari.atende.net/cidadao/noticia/centro-de-atendimento-ao-cidadao-facilita-acesso-a-servicos-publicos-em-araquari-saiba-onde-encontrar-os-servicos",
    checkedAt: "2026-10-13"
  },
  municipalCommunities: {
    title: "Câmara de Vereadores de Araquari — proposição sobre a Subprefeitura do Itapocu (2023)",
    url: "https://www.cvaraquari.sc.gov.br/proposicoes/Projetos-de-Lei-Complementar-Executivo/2023/1/0/12168",
    checkedAt: "2026-10-14"
  },
  municipalTourism: {
    title: "Prefeitura de Araquari — Roteiros municipais de turismo",
    url: "https://turismo.araquari.sc.gov.br/roteiros-municipais/",
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
      title: "Prefeitura de Araquari — Roteiros municipais de turismo, região da Barra do Itapocu",
      url: araquariSources.municipalTourism.url,
      checkedAt: "2026-10-13"
    },
    geographicType: "locality"
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
    source: araquariSources.municipalDistrict,
    geographicType: "district"
  },
  {
    name: "Itinga",
    source: araquariSources.municipalBoroughsJuly2026
  },
  {
    name: "Jacu",
    source: araquariSources.municipalBoroughs2026,
    geographicType: "locality"
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
  },
  {
    name: "Guamiranga",
    source: araquariSources.municipalTourism
  },
  {
    name: "Morro Grande",
    source: araquariSources.municipalCommunities,
    geographicType: "locality"
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
    description: "Moradores de Joinville e Araquari podem contratar com retirada e devolução no Paranaguamirim. Consulte o tema e a data."
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

function servicesForCity(cityName) {
  return commonServices.map((service) => service.name === "Pegue e Monte"
    ? { ...service, description: `Moradores de todos os bairros de ${cityName} podem contratar com retirada e devolução no Paranaguamirim. Consulte tema e data.` }
    : service);
}

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
    commercialConfirmationScope: "Moradores de todos os bairros de Joinville podem contratar Pegue e Monte com retirada e devolução no ponto do Paranaguamirim; entrega depende de disponibilidade para data e endereço.",
    commercialEvidence: [commercial.ownerConfirmation],
    confirmedCommercialFacts: ["Moradores de todos os bairros de Joinville podem contratar o Pegue e Monte com retirada e devolução no ponto do Paranaguamirim, em Joinville."],
    pickupEligibilityStatus: "CONFIRMED_CITYWIDE",
    deliveryStatus: "CONDITIONAL_ON_AVAILABILITY",
    commercialSources: [
      { title: "Site da Lela Decorações", url: "https://leladecoracoes.com/", checkedAt: "2026-10-13" },
      { title: "Contato e endereço para retirada", url: "https://leladecoracoes.com/contato/", checkedAt: "2026-10-13" }
    ],
    publicationStatus: "READY_INDEX",
    indexable: true,
    publicationBasis: "CITY_SERVICE",
    schemaServiceAreas: ["Joinville, SC"],
    content: {
      title: "Pegue e Monte em Joinville: temas e retirada | Lela Decorações",
      description: "Moradores de Joinville podem contratar Pegue e Monte com retirada e devolução no Paranaguamirim. Consulte temas, data e possibilidade de entrega.",
      eyebrow: "Joinville · Santa Catarina",
      h1: "Pegue e Monte em Joinville",
      intro: "Moradores de todos os bairros de Joinville podem contratar o Pegue e Monte com retirada e devolução no Paranaguamirim. Explore os temas e consulte a disponibilidade para sua data; a possibilidade de entrega depende de confirmação para o endereço.",
      detailTitle: "Retirada e logística em Joinville",
      detailText: "O ponto de retirada e devolução fica no Paranaguamirim, em Joinville. A cliente transporta, monta e desmonta o Pegue e Monte conforme as orientações combinadas. Entrega é opcional e depende da disponibilidade da Lela para a data e o endereço informados.",
      pickupNeighborhoodPath: "/regioes-atendidas/joinville/paranaguamirim/",
      pickupLabel: "Ver informações do ponto de retirada no Paranaguamirim",
      services: servicesForCity("Joinville"),
      schemaServiceName: "Pegue e Monte com retirada para moradores de Joinville",
      schemaServiceDescription: "Pegue e Monte com retirada e devolução no ponto do Paranaguamirim para moradores de Joinville. Consulte a disponibilidade do tema e a possibilidade de entrega para a data e o endereço.",
      whatsappMessage: "Olá, Lela! Encontrei a página de decoração de festas em Joinville. Meu bairro/endereço é [bairro/endereço] e quero consultar a disponibilidade para [data].",
      whatsappLabel: "Consultar atendimento em Joinville",
      faqs: faqData.regionalFor({ type: "city", name: "Joinville" })
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
    commercialConfirmationScope: "Moradores de todos os bairros de Araquari podem contratar Pegue e Monte com retirada e devolução no ponto do Paranaguamirim, em Joinville; entrega depende de disponibilidade para data e endereço.",
    commercialEvidence: [commercial.ownerConfirmation],
    confirmedCommercialFacts: ["Moradores de todos os bairros de Araquari podem contratar o Pegue e Monte com retirada e devolução no ponto do Paranaguamirim, em Joinville."],
    pickupEligibilityStatus: "CONFIRMED_CITYWIDE",
    deliveryStatus: "CONDITIONAL_ON_AVAILABILITY",
    commercialSources: [
      { title: "Site da Lela Decorações", url: "https://leladecoracoes.com/", checkedAt: "2026-10-13" },
      { title: "Contato e endereço para retirada", url: "https://leladecoracoes.com/contato/", checkedAt: "2026-10-13" }
    ],
    publicationStatus: "READY_INDEX",
    indexable: true,
    publicationBasis: "CITY_SERVICE",
    schemaServiceAreas: ["Araquari, SC"],
    content: {
      title: "Pegue e Monte em Araquari com retirada em Joinville | Lela Decorações",
      description: "Moradores de Araquari podem contratar Pegue e Monte com retirada e devolução em Joinville. Consulte temas e a possibilidade de entrega para seu endereço.",
      eyebrow: "Araquari · Santa Catarina",
      h1: "Pegue e Monte para festas em Araquari",
      intro: "Moradores de todos os bairros de Araquari podem contratar o Pegue e Monte da Lela. A retirada e a devolução são combinadas no ponto do Paranaguamirim, em Joinville; a possibilidade de entrega depende da disponibilidade para a data e o endereço.",
      detailTitle: "Logística para festas em Araquari",
      detailText: "A Lela não informa uma unidade de retirada em Araquari. Para contratar com retirada, o kit é retirado e devolvido no Paranaguamirim, em Joinville. Se preferir entrega, informe o endereço da festa e a data para a Lela verificar a disponibilidade e as condições.",
      pickupNeighborhoodPath: null,
      pickupLabel: "Ver o endereço de retirada informado em Joinville",
      services: servicesForCity("Araquari"),
      schemaServiceName: "Pegue e Monte com retirada para moradores de Araquari",
      schemaServiceDescription: "Pegue e Monte para moradores de Araquari, com retirada e devolução no ponto do Paranaguamirim, em Joinville. Entrega depende de disponibilidade para a data e o endereço.",
      whatsappMessage: "Olá, Lela! Encontrei a página de decoração de festas em Araquari. Meu endereço é [bairro/endereço] e quero consultar a logística para [data].",
      whatsappLabel: "Consultar atendimento em Araquari",
      faqs: faqData.regionalFor({ type: "city", name: "Araquari" })
    }
  }
];

const neighborhoods = [
  ...joinvilleNames.map((name) => ({
    name,
    citySlug: "joinville",
    geographySource: joinvilleSource,
    geographicType: "neighborhood"
  })),
  ...araquariNames.map((entry) => ({
    name: entry.name,
    citySlug: "araquari",
    geographySource: entry.source,
    geographicType: entry.geographicType || "neighborhood"
  }))
].map((entry) => {
  const city = cities.find((item) => item.slug === entry.citySlug);
  const slug = slugify(entry.name);
  return {
    type: entry.geographicType,
    name: entry.name,
    slug,
    citySlug: city.slug,
    city: city.name,
    state: city.state,
    path: `${city.path}${slug}/`,
    geographyStatus: city.slug === "joinville" ? "MUNICIPAL_LIST" : "MUNICIPAL_REFERENCE",
    geographyConfirmationScope: city.slug === "joinville"
      ? "Consta na relação municipal Joinville Bairro a Bairro 2026."
      : entry.geographicType === "district"
        ? "A Prefeitura identifica Itapocu como distrito; o cadastro o mantém separado de bairros e localidades."
        : entry.geographicType === "locality"
          ? entry.name === "Barra do Itapocu"
            ? "O portal municipal de turismo usa ‘região da Barra do Itapocu’; esta entrada é mantida como localidade, não como bairro confirmado."
            : entry.name === "Jacu"
              ? "A Prefeitura lista Jacu como bairro em uma tabela de vagas; uma proposição legislativa também o chama de localidade. A classificação permanece pendente."
              : entry.name === "Morro Grande"
                ? "Uma proposição legislativa municipal cita Morro Grande como localidade; a vigência e a classificação territorial atual ainda precisam de confirmação."
            : "A fonte municipal consultada menciona a área como localidade ou comunidade; o nome não é tratado aqui como bairro oficialmente delimitado."
          : entry.name === "Guamiranga"
            ? "O portal municipal de turismo chama Guamiranga de bairro; esta referência não confirma limites territoriais nem atendimento comercial."
            : "A Prefeitura usa o nome como bairro em publicações de vagas ou serviços; isso não equivale a uma lista legal completa nem define limites territoriais.",
    geographySource: entry.geographySource,
    commercialStatus: "CONFIRMED",
    commercialConfirmationScope: `Moradores de todos os bairros de ${city.name} podem contratar Pegue e Monte com retirada e devolução no ponto do Paranaguamirim, em Joinville; isso não confirma entrega neste endereço.`,
    commercialEvidence: [commercial.ownerConfirmation],
    confirmedCommercialFacts: [`Moradores de todos os bairros de ${city.name} podem contratar o Pegue e Monte com retirada e devolução no ponto do Paranaguamirim, em Joinville.`],
    pickupEligibilityStatus: "CONFIRMED_CITYWIDE",
    deliveryStatus: "CONDITIONAL_ON_AVAILABILITY",
    editorialReadiness: {
      status: "INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE",
      decision: "RETAIN_DRAFT_PREVIEW",
      reason: "A confirmação comercial é municipal e compartilhada; faltam informações, fotos ou fatos próprios verificados desta localidade que sustentem uma página individual indexável."
    },
    serviceCoverageStatus: "UNCONFIRMED",
    serviceCoverageConditions: null,
    publicationStatus: "DRAFT_PREVIEW",
    indexable: false,
    content: null
  };
});

const pickupNeighborhood = neighborhoods.find((item) => item.citySlug === "joinville" && item.slug === "paranaguamirim");
pickupNeighborhood.commercialStatus = "CONFIRMED";
pickupNeighborhood.commercialConfirmationScope = "Ponto de retirada divulgado e contratação de Pegue e Monte com retirada/devolução para residentes de Joinville e Araquari; não confirma entrega neste endereço ou em outros bairros.";
pickupNeighborhood.commercialEvidence = [commercial.ownerConfirmation];
pickupNeighborhood.confirmedCommercialFacts = ["O ponto de retirada divulgado fica no Paranaguamirim, em Joinville.", "Moradores de todos os bairros de Joinville e Araquari podem contratar Pegue e Monte com retirada e devolução neste ponto."];
pickupNeighborhood.pickupEligibilityStatus = "CONFIRMED_CITYWIDE";
pickupNeighborhood.deliveryStatus = "CONDITIONAL_ON_AVAILABILITY";
pickupNeighborhood.editorialReadiness = { status: "PICKUP_LOCATION_PAGE", decision: "KEEP_READY_INDEX", reason: "A página informa o endereço real de retirada; não é uma página de cobertura de entrega do bairro." };
pickupNeighborhood.commercialSource = {
  title: "Contato e dúvidas da Lela Decorações",
  url: "https://leladecoracoes.com/contato/",
  checkedAt: "2026-10-13"
};
pickupNeighborhood.publicationStatus = "READY_INDEX";
pickupNeighborhood.indexable = true;
pickupNeighborhood.publicationBasis = "PICKUP_LOCATION";
pickupNeighborhood.content = {
  title: "Retirada de Pegue e Monte no Paranaguamirim, Joinville | Lela Decorações",
  description: "Veja o endereço de retirada da Lela no Paranaguamirim, em Joinville. Moradores de Joinville e Araquari podem contratar; consulte tema e data.",
  eyebrow: "Ponto de retirada · Joinville",
  h1: "Retirada de kits Pegue e Monte no Paranaguamirim",
  intro: "O ponto de retirada da Lela fica no Paranaguamirim. Moradores de Joinville e Araquari podem contratar o Pegue e Monte retirando e devolvendo o kit neste endereço; combine os detalhes antes de ir.",
  detailTitle: "O que combinar antes da retirada",
  detailText: "No Pegue e Monte, a cliente retira, transporta, monta e devolve o kit conforme combinado. Se preferir consultar entrega, informe a data e o endereço da festa; a possibilidade e eventuais taxas dependem da disponibilidade da Lela.",
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
  faqs: faqData.regionalFor(pickupNeighborhood)
};

for (const city of cities) {
  city.breadcrumbs = [
    { label: "Início", url: "/" },
    { label: "Regiões atendidas", url: "/regioes-atendidas/" },
    { label: city.name, url: city.path }
  ];
  city.neighborhoods = neighborhoods
    .filter((item) => item.citySlug === city.slug)
    .sort((left, right) => left.name.localeCompare(right.name, "pt-BR", { sensitivity: "base" }));
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
    answer: "A Lela oferece Pegue e Monte e Mini Festa na Mesa. Moradores de Joinville e Araquari podem contratar Pegue e Monte com retirada e devolução no Paranaguamirim; a disponibilidade de temas é confirmada para cada data."
  },
  {
    question: "Como funciona a retirada da decoração?",
    answer: faqData.byId.get("pickup-location").answer
  },
  {
    question: "Como funciona a entrega em Joinville e Araquari?",
    answer: `${commercial.copy.deliveryConditions} ${commercial.copy.pickupEligibility}`
  },
  {
    question: "Como peço um orçamento?",
    answer: "Envie pelo WhatsApp a data, a cidade e o bairro da festa, o tema e o serviço que deseja. Para Pegue e Monte, você pode escolher a retirada no Paranaguamirim; se preferir entrega, a Lela verifica a disponibilidade para o endereço informado."
  }
];

const publishedPages = [
  ...cities.filter((item) => item.indexable && item.publicationStatus === "READY_INDEX"),
  ...neighborhoods.filter((item) => item.indexable && item.publicationStatus === "READY_INDEX")
];

const reviewMode = process.env.LELA_LOCAL_REVIEW === "1";
const previewPages = reviewMode
  ? neighborhoods.filter((item) => !item.indexable).map((place) => {
    const city = cities.find((item) => item.slug === place.citySlug);
    const kind = place.type === "district" ? "distrito" : place.type === "locality" ? "localidade" : "bairro";
    return {
      ...place,
      previewOnly: true,
      publicationStatus: "DRAFT_PREVIEW",
      indexable: false,
      content: {
        title: `Pegue e Monte em ${place.name}, ${place.city} | Lela Decorações`,
        description: `Moradores de ${place.name}, em ${place.city}, podem contratar Pegue e Monte com retirada no Paranaguamirim. Explore temas e consulte a possibilidade de entrega.`,
        eyebrow: `${place.name} · ${kind} de ${place.city}`,
        h1: `Pegue e Monte em ${place.name}, ${place.city}`,
        intro: `Mora em ${place.name}, ${place.city}? Você pode contratar o Pegue e Monte da Lela com retirada e devolução no Paranaguamirim, em Joinville. Explore os temas e consulte a disponibilidade para sua data; a entrega depende de confirmação para o endereço.`,
        detailTitle: "Retirada e entrega",
        detailText: place.citySlug === "joinville"
          ? "A retirada e a devolução do Pegue e Monte são combinadas no ponto do Paranaguamirim, em Joinville. A cliente transporta, monta e desmonta o kit conforme as orientações recebidas. Se preferir entrega, informe data e endereço para consultar a disponibilidade e as condições."
          : "Moradores de Araquari podem contratar com retirada e devolução no ponto do Paranaguamirim, em Joinville. Se preferir entrega, informe data e endereço para a Lela consultar a disponibilidade e as condições.",
        services: [
          { name: "Pegue e Monte", path: "/pegue-e-monte/", description: "Moradores da cidade podem contratar com retirada e devolução no Paranaguamirim; consulte tema, data e entrega." },
          { name: "Catálogo de decorações", path: "/portfolio/", description: "Veja os temas do catálogo e consulte as condições para sua festa." },
          { name: `Região de ${place.city}`, path: city.path, description: `Veja como funcionam retirada, catálogo e consulta de entrega para festas em ${place.city}.` }
        ],
        pickupNeighborhoodPath: city.slug === "joinville" ? "/regioes-atendidas/joinville/paranaguamirim/" : null,
        pickupLabel: "Ver o ponto de retirada no Paranaguamirim",
        schemaServiceName: null,
        schemaServiceDescription: null,
        whatsappMessage: `Olá, Lela! Moro em ${place.name}, ${place.city}, e quero consultar o Pegue e Monte para [data]. Tema: [tema]. Pretendo retirar e devolver o kit no Paranaguamirim; também gostaria de consultar a possibilidade de entrega para meu endereço.`,
        whatsappLabel: `Consultar decoração para ${place.name}`,
        faqs: faqData.regionalFor(place)
      }
    };
  })
  : [];

const buildPages = [...publishedPages, ...previewPages];

module.exports = {
  sources: { joinville: joinvilleSource, araquari: araquariSources },
  geographyRegisterStatus: "PARTIAL_FOR_ARAQUARI",
  geographyRegisterNote: "Joinville segue os 45 bairros da publicação municipal Bairro a Bairro 2026. Araquari reúne 17 referências geográficas: bairros, localidades/comunidades e o distrito de Itapocu; o cadastro pode estar incompleto e não define limites. A contratação do Pegue e Monte com retirada no Paranaguamirim está confirmada para residentes das duas cidades; entrega para endereço específico continua sujeita à disponibilidade. A confirmação comercial não torna automaticamente cada página apta à indexação.",
  cities,
  neighborhoods,
  publishedPages,
  previewPages,
  buildPages,
  reviewMode,
  indexFaqs
};
