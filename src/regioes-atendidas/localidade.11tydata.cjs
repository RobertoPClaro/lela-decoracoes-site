module.exports = {
  eleventyComputed: {
    bodyClass: () => "locality-page",
    title: (data) => data.local.content.title,
    description: (data) => data.local.content.description,
    robots: (data) => data.local.indexable ? "index,follow" : "noindex,follow",
    breadcrumbs: (data) => data.local.breadcrumbs,
    schemaFaqs: (data) => data.local.content.faqs || [],
    faqSchema: (data) => Boolean(data.local.content.faqs && data.local.content.faqs.length),
    schemaServiceName: (data) => data.local.content.schemaServiceName,
    schemaServiceDescription: (data) => data.local.content.schemaServiceDescription,
    schemaServiceAreas: (data) => data.local.schemaServiceAreas,
    schemaWebPageName: (data) => data.local.content.title,
    schemaWebPageDescription: (data) => data.local.content.description
  }
};
