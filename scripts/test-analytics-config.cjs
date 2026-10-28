const siteFile = require.resolve("../src/_data/site.cjs");
const keys = ["GA4_MEASUREMENT_ID", "GA4_ENHANCED_OUTBOUND_CLICKS_DISABLED", "GA4_ENHANCED_FORM_INTERACTIONS_DISABLED"];

function loadSite(envOverrides = {}) {
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  keys.forEach((key) => delete process.env[key]);
  Object.assign(process.env, envOverrides);
  delete require.cache[siteFile];
  try {
    return require(siteFile);
  } finally {
    keys.forEach((key) => {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    });
    delete require.cache[siteFile];
  }
}

const flags = ["GA4_ENHANCED_OUTBOUND_CLICKS_DISABLED", "GA4_ENHANCED_FORM_INTERACTIONS_DISABLED"];
const fixtureId = "G-TEST123456";
const cases = [
  { name: "no ID remains disabled", env: {}, expected: { enabled: false, id: "" } },
  { name: "ID without privacy confirmations remains disabled", env: { GA4_MEASUREMENT_ID: fixtureId }, expected: { enabled: false, id: "" } },
  { name: "one confirmation is insufficient", env: { GA4_MEASUREMENT_ID: fixtureId, [flags[0]]: "true" }, expected: { enabled: false, id: "" } },
  { name: "both confirmations enable the configured ID", env: { GA4_MEASUREMENT_ID: fixtureId, [flags[0]]: "true", [flags[1]]: "true" }, expected: { enabled: true, id: fixtureId } }
];

let failed = false;
const originalWarn = console.warn;
const warnings = [];
console.warn = (message) => warnings.push(String(message));
for (const test of cases) {
  const site = loadSite(test.env);
  const actual = { enabled: site.analyticsEnabled, id: site.ga4MeasurementId };
  if (JSON.stringify(actual) !== JSON.stringify(test.expected)) {
    failed = true;
    console.error(`FAIL ${test.name}: ${JSON.stringify(actual)}`);
  } else {
    console.log(`PASS ${test.name}`);
  }
}
console.warn = originalWarn;
if (!warnings.some((message) => message.includes("GA4 permanece desativado")) || warnings.some((message) => message.includes(fixtureId))) {
  failed = true;
  console.error("FAIL inactive-ID warning must be present and must not reveal the measurement ID.");
} else {
  console.log("PASS inactive-ID warning is generic and does not reveal the ID");
}

let invalidMessage = "";
try {
  loadSite({ GA4_MEASUREMENT_ID: "not-a-measurement-id", ...Object.fromEntries(flags.map((key) => [key, "true"])) });
} catch (error) {
  invalidMessage = error.message;
}
if (!invalidMessage.includes("GA4_MEASUREMENT_ID inválido") || invalidMessage.includes("not-a-measurement-id")) {
  failed = true;
  console.error("FAIL malformed ID must stop the build with a generic validation error.");
} else {
  console.log("PASS malformed ID is rejected without echoing its value");
}

if (failed) process.exit(1);
