const rawPrefix = String(process.env.PATH_PREFIX || "").trim();
const pathPrefix = rawPrefix && rawPrefix !== "/"
  ? `/${rawPrefix.replace(/^\/+|\/+$/g, "")}/`
  : "/";
const origin = String(process.env.SITE_URL || "").replace(/\/$/, "");
const baseUrl = origin ? `${origin}${pathPrefix === "/" ? "" : pathPrefix.slice(0, -1)}` : "";
const organizationId = baseUrl ? `${baseUrl}/#organization` : "";

const phoneDisplay = "(47) 98856-7488";
const phoneDigits = "5547988567488";
const instagramUrl = "https://www.instagram.com/letticia_moreira/";
const address = {
  streetAddress: "R. Matusalém Gonçalves Pinheiro, 83",
  neighborhood: "Paranaguamirim",
  city: "Joinville",
  state: "SC",
  postalCode: "89231-603",
  country: "BR",
  display: "R. Matusalém Gonçalves Pinheiro, 83 - Paranaguamirim, Joinville - SC, 89231-603"
};
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.display)}`;

function whatsappLink(message = "") {
  const base = `https://wa.me/${phoneDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function absoluteUrl(urlPath = "/") {
  if (!baseUrl) return "";
  const clean = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  return `${baseUrl}${clean}`;
}

function serviceSchema(name, description, urlPath) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      ...(organizationId ? { "@id": organizationId } : {}),
      name: "Lela Decorações"
    },
    areaServed: ["Joinville", "Araquari"],
    url: absoluteUrl(urlPath)
  });
}

function breadcrumbSchema(items = []) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.url || "/")
    }))
  });
}

function faqSchema(items = [], urlPath = "/duvidas/") {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    })),
    url: absoluteUrl(urlPath)
  });
}

const localBusinessSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": organizationId || instagramUrl,
  name: "Lela Decorações",
  description: "Pegue e Monte e Mini Festa na Mesa com praticidade, delicadeza e economia.",
  telephone: `+${phoneDigits}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${address.streetAddress} - ${address.neighborhood}`,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.postalCode,
    addressCountry: address.country
  },
  hasMap: mapsUrl,
  areaServed: ["Joinville, SC", "Araquari, SC"],
  sameAs: [instagramUrl],
  ...(baseUrl ? { url: absoluteUrl("/") } : {})
});

module.exports = {
  brand: "Lela Decorações",
  tagline: "Praticidade, delicadeza e economia para celebrar.",
  origin,
  baseUrl,
  pathPrefix,
  phoneDisplay,
  phoneDigits,
  instagramUrl,
  instagramHandle: "@letticia_moreira",
  address,
  mapsUrl,
  ownerAvatar: {
    src: "/assets/images/reference/avatar-leticia.png",
    alt: "Letícia, proprietária da Lela Decorações",
    width: 188,
    height: 245
  },
  whatsappLink,
  absoluteUrl,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  serviceAreas: ["Joinville", "Araquari"],
  nav: [
    { label: "Início", url: "/" },
    { label: "Serviços", url: "/servicos/" },
    { label: "Portfólio", url: "/portfolio/" },
    { label: "Como funciona", url: "/como-funciona/" },
    { label: "Sobre a Lela", url: "/sobre/" },
    { label: "Dúvidas", url: "/duvidas/" },
    { label: "Contato", url: "/contato/" }
  ],
  categories: [
    { slug: "tema-menina", folder: "Tema Menina", label: "Tema Menina", description: "Personagens, universos e composições para festas infantis." },
    { slug: "tema-menino", folder: "Tema Menino", label: "Tema Menino", description: "Temas infantis e personagens organizados nesta categoria do acervo." },
    { slug: "tema-adulto", folder: "Tema Adulto", label: "Tema Adulto", description: "Composições para encontros e celebrações adultas." },
    { slug: "tema-diversos", folder: "Tema Diversos", label: "Tema Diversos", description: "Temas de eventos e estilos que não dependem de uma faixa específica." },
    { slug: "tema-futebol", folder: "Tema Futebol", label: "Tema Futebol", description: "Clubes e propostas esportivas presentes no acervo." }
  ],
  facts: {
    serviceHours: "09h às 20h",
    reservationEntry: "50% de entrada para confirmar a data",
    returnWindow: "Devolução em até 24 horas",
    payment: "Pix, dinheiro ou cartão de crédito; confirme taxas e condições no atendimento.",
    delivery: "Entrega e retirada no local podem ser consultadas, sujeitas a disponibilidade e taxa.",
    disclaimer: "Consulte valores, disponibilidade e condições de reserva pelo WhatsApp."
  },
  sitemapPaths: [
    "/", "/servicos/", "/pegue-e-monte/", "/mini-festa-na-mesa/", "/festas-infantis/",
    "/cha-de-bebe/", "/cha-revelacao/", "/portfolio/", "/como-funciona/", "/sobre/",
    "/duvidas/", "/contato/", "/politica-de-privacidade/", "/parceiros/"
  ]
};
