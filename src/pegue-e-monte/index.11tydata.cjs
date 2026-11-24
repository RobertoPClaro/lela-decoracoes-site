const faqs = require("../_data/faqs.cjs");

const pageFaqs = faqs.forIds([
  "pegue-monte-definition",
  "pegue-monte-vs-mini-festa",
  "kit-composition",
  "reservation",
  "delivery",
  "return-period"
]);

module.exports = {
  faqSchema: true,
  pageFaqs,
  schemaFaqs: pageFaqs
};
