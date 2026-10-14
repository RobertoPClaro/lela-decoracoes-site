module.exports = {
  layout: "layouts/base.njk",
  pagination: {
    data: "themes.published",
    size: 1,
    alias: "theme"
  },
  permalink: "{{ theme.path }}index.html",
  eleventyComputed: {
    title: (data) => data.theme.title,
    description: (data) => data.theme.description,
    breadcrumbs: (data) => [
      { label: "Início", url: "/" },
      { label: "Temas", url: "/temas/" },
      { label: data.theme.name, url: data.theme.path }
    ],
    schemaServiceName: (data) => `Decoração temática ${data.theme.name}`,
    schemaServiceDescription: (data) => data.theme.description,
    schemaServiceAreas: (data) => data.site.serviceAreaNames,
    schemaWebPageName: (data) => data.theme.title,
    schemaWebPageDescription: (data) => data.theme.description,
    schemaFaqs: (data) => data.theme.faqs,
    faqSchema: (data) => Boolean(data.theme.faqs.length),
    ogImage: (data) => data.site.baseUrl
      ? `${data.site.baseUrl}/assets/images/generated/${data.theme.heroImage.generatedBase}-1200.jpg`
      : "",
    ogImageAlt: (data) => data.theme.heroImage.alt
  }
};
