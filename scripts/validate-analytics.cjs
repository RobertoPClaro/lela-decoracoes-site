const fs = require("node:fs");
const path = require("node:path");
const site = require("../src/_data/site.cjs");

const distDirectory = path.resolve("dist");

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

function fail(message) {
  console.error(`Analytics validation failed: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(distDirectory)) {
  fail("dist/ does not exist; run the site build first.");
  process.exit();
}

const pages = htmlFiles(distDirectory);
if (!pages.length) {
  fail("no generated HTML pages found.");
  process.exit();
}

const enabled = site.analyticsEnabled;
const measurementId = site.ga4MeasurementId;
let pageErrors = 0;

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const hasConsent = html.includes("data-analytics-consent");
  const consentScriptCount = (html.match(/assets\/js\/analytics-consent\.js/g) || []).length;
  const hasExternalGoogleTag = html.includes("googletagmanager.com/gtag/js");
  const hasSettingsButton = html.includes("data-open-analytics-settings");

  const invalid = enabled
    ? !hasConsent || consentScriptCount !== 1 || hasExternalGoogleTag || !html.includes(`data-measurement-id="${measurementId}"`) || !hasSettingsButton
    : hasConsent || consentScriptCount !== 0 || hasExternalGoogleTag || hasSettingsButton;

  if (invalid) {
    pageErrors += 1;
    console.error(`Analytics markup does not match ${enabled ? "enabled" : "disabled"} mode: ${path.relative(distDirectory, file)}`);
  }
}

const privacyFile = path.join(distDirectory, "politica-de-privacidade", "index.html");
if (!fs.existsSync(privacyFile)) {
  fail("generated privacy policy was not found.");
} else {
  const privacy = fs.readFileSync(privacyFile, "utf8");
  if (enabled && !privacy.includes("A preferência fica salva neste navegador")) {
    fail("enabled privacy policy does not describe consent and stored preference.");
  }
  if (!enabled && !privacy.includes("o Google Analytics não está ativo")) {
    fail("disabled privacy policy does not describe the inactive state.");
  }
}

if (pageErrors) fail(`${pageErrors} generated page(s) have incorrect analytics markup.`);
else console.log(`Analytics markup validated in ${pages.length} HTML pages (${enabled ? "consent-gated GA4 enabled" : "analytics disabled"}).`);
