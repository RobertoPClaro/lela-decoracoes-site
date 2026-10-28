(() => {
  const consentPanel = document.querySelector("[data-analytics-consent]");
  if (!consentPanel || window.__lelaAnalyticsConsentInitialized) return;

  const measurementId = consentPanel.dataset.measurementId || "";
  if (!/^G-[A-Z0-9]{6,20}$/i.test(measurementId)) return;
  window.__lelaAnalyticsConsentInitialized = true;

  const consentKey = "lela.analytics.consent.v1";
  const pageType = document.body.dataset.analyticsPageType || "content";
  const choiceButtons = [...consentPanel.querySelectorAll("[data-analytics-choice]")];
  const settingsButtons = [...document.querySelectorAll("[data-open-analytics-settings]")];
  const recentClick = new WeakMap();
  const lastSearchValues = new WeakMap();
  let choice = readChoice();
  let analyticsActive = false;
  let tagConfigured = false;
  let settingsTrigger = null;

  function readChoice() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(consentKey) || "null");
      return saved?.version === 1 && ["granted", "denied"].includes(saved.state) ? saved.state : null;
    } catch (error) {
      return null;
    }
  }

  function saveChoice(state) {
    choice = state;
    try {
      window.localStorage.setItem(consentKey, JSON.stringify({ version: 1, state }));
    } catch (error) {
      // Sem armazenamento disponível, a escolha vale para esta página.
    }
  }

  function consentState(granted) {
    return {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    };
  }

  function safeUrl(value) {
    if (!value) return "";
    try {
      const url = new URL(value, window.location.href);
      return `${url.origin}${url.pathname}`;
    } catch (error) {
      return "";
    }
  }

  function slugOrEmpty(value) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || "") ? value : "";
  }

  function internalContext() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("cidade")) return {};

    let referrer;
    try {
      referrer = new URL(document.referrer);
    } catch (error) {
      return {};
    }
    if (referrer.origin !== window.location.origin || !/(\/regioes-atendidas\/|\/portfolio\/|\/temas\/)/.test(referrer.pathname)) return {};

    let registry;
    try {
      const data = document.querySelector("#locality-context-data");
      registry = data ? JSON.parse(data.textContent) : null;
    } catch (error) {
      return {};
    }
    if (!registry) return {};

    const citySlug = slugOrEmpty(params.get("cidade"));
    const city = (registry.cities || []).find((item) => item.slug === citySlug);
    if (!city) return {};

    const result = { citySlug };
    const serviceSlug = params.get("servico");
    if (["pegue-e-monte", "mini-festa-na-mesa"].includes(serviceSlug)) result.serviceSlug = serviceSlug;

    const localitySlug = slugOrEmpty(params.get("localidade"));
    const locality = (registry.places || []).find((item) => item.slug === localitySlug && item.citySlug === citySlug);
    if (locality) result.localitySlug = localitySlug;
    return result;
  }

  function contextParams(element) {
    const body = document.body.dataset;
    const placement = element?.dataset.analyticsPlacement
      || (element?.matches?.("[data-portfolio-search]") ? "catalog_search" : "")
      || (element?.matches?.("[data-filter-button]") ? "catalog_filter" : "")
      || "content";
    const context = {
      page_type: pageType,
      placement
    };
    const themeSlug = slugOrEmpty(element?.dataset.themeSlug || body.themeSlug);
    const serviceSlug = slugOrEmpty(body.serviceSlug);
    let citySlug = slugOrEmpty(body.citySlug);
    let localitySlug = slugOrEmpty(body.localitySlug);

    if (!citySlug && ["theme", "catalog"].includes(pageType)) {
      const forwarded = internalContext();
      citySlug = forwarded.citySlug || "";
      localitySlug = forwarded.localitySlug || "";
      if (!serviceSlug && forwarded.serviceSlug) context.service_slug = forwarded.serviceSlug;
    }

    if (themeSlug) context.theme_slug = themeSlug;
    if (serviceSlug) context.service_slug = serviceSlug;
    if (citySlug) context.city_slug = citySlug;
    if (localitySlug) context.locality_slug = localitySlug;
    return context;
  }

  function configureTag() {
    if (tagConfigured) {
      window[`ga-disable-${measurementId}`] = false;
      window.gtag("consent", "update", consentState(true));
      analyticsActive = true;
      return;
    }

    window[`ga-disable-${measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", consentState(false));
    window.gtag("consent", "update", consentState(true));
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
      page_title: document.title,
      page_location: safeUrl(window.location.href),
      page_referrer: safeUrl(document.referrer),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      transport_type: "beacon"
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.referrerPolicy = "no-referrer";
    script.dataset.analyticsTag = "ga4";
    document.head.appendChild(script);

    tagConfigured = true;
    analyticsActive = true;
  }

  function clearGoogleAnalyticsCookies() {
    const host = window.location.hostname;
    const domains = [""];
    if (host && !/^\d+(?:\.\d+){3}$/.test(host) && host !== "localhost") {
      domains.push(`; domain=${host}`, `; domain=.${host}`);
      const hostParts = host.split(".");
      if (hostParts.length > 2) domains.push(`; domain=.${hostParts.slice(-2).join(".")}`);
    }
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie.split(";").forEach((entry) => {
      const name = entry.split("=")[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax${secure}`;
      });
    });
  }

  function pauseTag() {
    analyticsActive = false;
    if (tagConfigured && typeof window.gtag === "function") {
      window[`ga-disable-${measurementId}`] = true;
      window.gtag("consent", "update", consentState(false));
    }
    clearGoogleAnalyticsCookies();
  }

  if (choice !== "granted") clearGoogleAnalyticsCookies();

  function openSettings() {
    settingsTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    pauseTag();
    consentPanel.hidden = false;
    settingsButtons.forEach((button) => button.setAttribute("aria-expanded", "true"));
    choiceButtons[0]?.focus();
  }

  function choose(state) {
    if (!['granted', 'denied'].includes(state)) return;
    saveChoice(state);
    consentPanel.hidden = true;
    settingsButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
    if (state === "granted") configureTag();
    else pauseTag();
    if (settingsTrigger?.isConnected) settingsTrigger.focus();
    settingsTrigger = null;
  }

  function sendEvent(name, parameters) {
    if (!analyticsActive || typeof window.gtag !== "function") return;
    window.gtag("event", name, parameters);
  }

  function isRecentDuplicate(element, eventName) {
    const now = Date.now();
    const previous = recentClick.get(element);
    if (previous?.name === eventName && now - previous.time < 700) return true;
    recentClick.set(element, { name: eventName, time: now });
    return false;
  }

  function resultCount() {
    const text = document.querySelector("[data-portfolio-results]")?.textContent || "";
    const match = text.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const filterButton = target?.closest("[data-filter-button]");
    if (filterButton && !isRecentDuplicate(filterButton, "catalog_filter")) {
      sendEvent("catalog_filter", {
        ...contextParams(filterButton),
        filter_slug: slugOrEmpty(filterButton.dataset.filter) || "all",
        results_count: resultCount()
      });
      return;
    }

    const link = target?.closest("a[href]");
    if (!link) return;
    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    const eventName = ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)
      ? "whatsapp_click"
      : url.protocol === "tel:"
        ? "phone_click"
        : link.matches("[data-analytics-theme-link]")
          ? "catalog_theme_click"
          : "";
    if (!eventName || isRecentDuplicate(link, eventName)) return;

    const parameters = contextParams(link);
    if (eventName === "catalog_theme_click") {
      sendEvent(eventName, parameters);
      return;
    }

    sendEvent(eventName, parameters);
  });

  document.addEventListener("change", (event) => {
    const input = event.target instanceof Element ? event.target.closest("[data-portfolio-search]") : null;
    if (!input) return;
    const value = input.value.trim();
    if (lastSearchValues.get(input) === value) return;
    lastSearchValues.set(input, value);
    sendEvent("catalog_search", {
      ...contextParams(input),
      has_query: value ? 1 : 0,
      results_count: resultCount()
    });
  });

  document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
    form.addEventListener("submit", () => {
      const selected = form.querySelector('[name="interest"]')?.value;
      const serviceSlug = selected === "Pegue e Monte"
        ? "pegue-e-monte"
        : selected === "Mini Festa na Mesa"
          ? "mini-festa-na-mesa"
          : "";
      const parameters = contextParams(form);
      if (serviceSlug) parameters.service_slug = serviceSlug;
      parameters.placement = "contact_form";
      sendEvent("whatsapp_click", parameters);
    });
  });

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => choose(button.dataset.analyticsChoice));
  });
  settingsButtons.forEach((button) => button.addEventListener("click", openSettings));

  if (choice === "granted") configureTag();
  else if (choice === "denied") consentPanel.hidden = true;
  else consentPanel.hidden = false;
})();
