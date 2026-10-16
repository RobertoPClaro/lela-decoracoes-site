module.exports = {
  layout: "layouts/base.njk",
  pagination: {
    data: "themes.details",
    size: 1,
    alias: "theme"
  },
  permalink: "{{ theme.path }}index.html",
  eleventyComputed: {
    bodyClass: () => "theme-detail-page",
    title: (data) => data.theme.title,
    description: (data) => data.theme.description,
    schemaServiceName: (data) => data.theme.indexable ? `Decoração temática ${data.theme.name}` : null,
    schemaServiceDescription: (data) => data.theme.indexable ? data.theme.description : null,
    schemaServiceAreas: (data) => data.site.serviceAreaNames,
    schemaWebPageName: (data) => data.theme.title,
    schemaWebPageDescription: (data) => data.theme.description,
    schemaFaqs: (data) => data.theme.faqs,
    faqSchema: (data) => Boolean(data.theme.indexable && data.theme.faqs.length),
    robots: (data) => data.theme.indexable ? "index,follow" : "noindex,follow",
    breadcrumbs: (data) => [
      { label: "Início", url: "/" },
      { label: "Catálogo", url: "/portfolio/" },
      { label: data.theme.name, url: data.theme.path }
    ],
    ogImage: (data) => data.site.baseUrl
      ? `${data.site.baseUrl}/assets/images/generated/${data.theme.heroImage.generatedBase}-1200.jpg`
      : "",
    ogImageAlt: (data) => data.theme.heroImage.alt
  }
};
