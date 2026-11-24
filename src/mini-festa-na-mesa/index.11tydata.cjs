const faqs = require("../_data/faqs.cjs");

const pageFaqs = faqs.forIds([
  "mini-festa-logistics",
  "pegue-monte-vs-mini-festa",
  "how-to-request-quote"
]);

module.exports = {
  faqSchema: true,
  pageFaqs,
  schemaFaqs: pageFaqs
};
