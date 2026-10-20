const commercial = require("./commercial.cjs");

const items = [
  {
    id: "pegue-monte-definition",
    question: "O que é o Pegue e Monte?",
    answer: `É o formato em que você escolhe o tema, consulta a data e confirma a composição antes de reservar. ${commercial.copy.pickupOption} ${commercial.copy.customerAssembly} Combine com a Lela os detalhes da devolução.`,
    category: "service",
    source: ["/pegue-e-monte/", "/como-funciona/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "customer-assembly",
    question: "Quem monta e desmonta o kit Pegue e Monte?",
    answer: commercial.copy.customerAssembly,
    category: "assembly",
    source: ["/pegue-e-monte/", "/como-funciona/"],
    confirmationStatus: "OWNER_CONFIRMATION_AND_PUBLISHED_SITE_COPY",
    confirmedAt: commercial.ownerConfirmation.checkedAt,
    services: ["pegue-e-monte"]
  },
  {
    id: "kit-composition",
    question: "O que vem em cada kit do Pegue e Monte?",
    answer: "A composição varia conforme o tema e o porte. O Kit Minimalista é apresentado com painel de 50 × 50 cm, balões e outros elementos; o Kit Grande, com painéis de 1,50 × 1,50 m, cilindros P/M/G e outros elementos. Confirme a lista exata antes de reservar.",
    category: "kit",
    source: ["/pegue-e-monte/", "/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "kit-size",
    question: "Qual é a diferença entre Minimalista e Grande?",
    answer: "O Minimalista é mais compacto e indicado para espaços menores. O Grande cria mais presença e exige atenção ao espaço e ao transporte. A escolha final depende da composição disponível para a sua data.",
    category: "kit",
    source: ["/pegue-e-monte/", "/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "reservation",
    question: "Como faço para reservar o Pegue e Monte?",
    answer: "Envie pelo WhatsApp a data, cidade/bairro, tema e porte desejado. A reserva é confirmada após o pagamento da entrada de 50%.",
    category: "booking",
    source: ["/como-funciona/", "/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "delivery",
    question: "Como consulto a possibilidade de entrega?",
    answer: `${commercial.copy.deliveryConditions} ${commercial.copy.pickupEligibility}`,
    category: "logistics",
    source: ["/pegue-e-monte/", "/contato/", "/duvidas/"],
    confirmationStatus: "OWNER_CONFIRMATION_AND_PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "pickup-eligibility",
    question: "Quem mora em Joinville ou Araquari pode contratar o Pegue e Monte?",
    answer: `${commercial.copy.pickupEligibility} A entrega no endereço da festa depende de disponibilidade para a data e o local informados. Combine os detalhes diretamente com a Lela.`,
    category: "coverage",
    source: ["/regioes-atendidas/", "/pegue-e-monte/"],
    confirmationStatus: "OWNER_CONFIRMATION",
    confirmedAt: commercial.ownerConfirmation.checkedAt,
    services: ["pegue-e-monte"]
  },
  {
    id: "mini-festa-logistics",
    question: "A Mini Festa na Mesa inclui montagem no local?",
    answer: "A forma de montagem, entrega e retirada depende da proposta consultada. Confirme com a Lela o que está incluído para o tema e a data antes de reservar.",
    category: "service",
    source: ["/mini-festa-na-mesa/", "/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["mini-festa-na-mesa"]
  },
  {
    id: "return-period",
    question: "Qual é o prazo de devolução do kit Pegue e Monte?",
    answer: "A decoração deve ser devolvida em até 24 horas. Após esse prazo, é cobrada uma taxa diária de 30% do valor total da festa. Se precisar de mais tempo, solicite com antecedência.",
    category: "logistics",
    source: ["/como-funciona/", "/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "payment-methods",
    question: "Quais formas de pagamento são aceitas no Pegue e Monte?",
    answer: "O pagamento pode ser feito por Pix, dinheiro ou cartão de crédito. No cartão, a taxa da maquininha fica por conta do cliente, conforme a operadora.",
    category: "payment",
    source: ["/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "cancellation",
    question: "O que acontece se eu cancelar uma reserva de Pegue e Monte?",
    answer: "A entrada de 50% não é reembolsável. O valor pode ficar como crédito por até três meses para uma nova reserva, sujeito à disponibilidade.",
    category: "booking",
    source: ["/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "damaged-item",
    question: "O que acontece se uma peça do kit Pegue e Monte for danificada?",
    answer: "Em caso de perda, avaria ou dano, será cobrado o valor do item. Siga as orientações de cuidado recebidas na retirada.",
    category: "care",
    source: ["/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "pickup-location",
    question: "Onde fica o ponto de retirada do Pegue e Monte?",
    answer: `O ponto de retirada fica em ${commercial.pickupPoint.display}. ${commercial.services.pegueEMonte.pickup.scheduling}`,
    category: "logistics",
    source: ["/contato/", "/duvidas/"],
    confirmationStatus: "PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte"]
  },
  {
    id: "catalog-theme-choice",
    question: "Posso escolher um tema do catálogo?",
    answer: "Você pode indicar uma das opções exibidas no catálogo. A presença de um tema no acervo não confirma disponibilidade para a data nem a composição do kit; a Lela verifica esses detalhes antes da reserva.",
    category: "themes",
    source: ["/portfolio/", "/duvidas/"],
    confirmationStatus: "CATALOG_AND_PUBLISHED_SITE_COPY",
    services: ["pegue-e-monte", "mini-festa-na-mesa"]
  }
];

const byId = new Map(items.map((item) => [item.id, item]));
const cityQuestionIds = [
  "pegue-monte-definition", "pickup-eligibility", "kit-composition", "customer-assembly", "reservation", "delivery",
  "mini-festa-logistics", "return-period", "payment-methods", "cancellation",
  "pickup-location", "catalog-theme-choice"
];
const localityQuestionIds = [
  "pegue-monte-definition", "pickup-eligibility", "kit-composition", "customer-assembly", "reservation", "delivery",
  "mini-festa-logistics", "return-period", "pickup-location", "catalog-theme-choice"
];

function regionalFor(location) {
  const isCity = location.type === "city";
  const cityName = isCity ? location.name : location.city;
  const placePhrase = isCity
    ? `em ${cityName}`
    : location.type === "district"
      ? `no distrito de ${location.name}, em ${cityName}`
      : location.type === "locality"
        ? `na localidade de ${location.name}, em ${cityName}`
        : location.type === "reference"
          ? `na região de ${location.name}, em ${cityName}`
          : `no bairro ${location.name}, em ${cityName}`;
  const questionOverrides = {
    "pickup-eligibility": isCity
      ? `Quem mora em ${cityName} pode contratar o Pegue e Monte?`
      : location.type === "neighborhood"
        ? `Moradores do bairro ${location.name}, em ${cityName}, podem contratar o Pegue e Monte?`
        : `Como consultar o Pegue e Monte para uma festa ${placePhrase}?`,
    reservation: `Como faço para reservar o Pegue e Monte para uma festa ${placePhrase}?`,
    delivery: `Como consulto a possibilidade de entrega para uma festa ${placePhrase}?`,
    "pickup-location": `Onde retiro o kit Pegue e Monte para uma festa ${placePhrase}?`,
    "catalog-theme-choice": `Posso consultar um tema do catálogo para uma festa ${placePhrase}?`
  };
  const ids = isCity ? cityQuestionIds : localityQuestionIds;

  return ids.map((id) => ({
    ...byId.get(id),
    question: questionOverrides[id] || byId.get(id).question
  }));
}

module.exports = items;
module.exports.byId = byId;
module.exports.regionalFor = regionalFor;
module.exports.regionalQuestionIds = { city: cityQuestionIds, locality: localityQuestionIds };
