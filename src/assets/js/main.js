(() => {
  const body = document.body;
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const menuToggleLabel = menuToggle?.querySelector(".sr-only");

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (menuToggleLabel) menuToggleLabel.textContent = "Abrir menu";
    body.classList.remove("menu-open");
    menu.querySelectorAll("details[open]").forEach((details) => details.removeAttribute("open"));
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      if (menuToggleLabel) menuToggleLabel.textContent = open ? "Abrir menu" : "Fechar menu";
      menu.classList.toggle("is-open", !open);
      body.classList.toggle("menu-open", !open);
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("click", (event) => {
      if (menu.classList.contains("is-open") && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    const mobileMenuQuery = window.matchMedia("(max-width: 1140px)");
    mobileMenuQuery.addEventListener("change", (event) => {
      if (!event.matches) closeMenu();
    });
  }

  const contextData = document.querySelector("#locality-context-data");
  if (contextData) {
    try {
      const registry = JSON.parse(contextData.textContent);
      const params = new URLSearchParams(window.location.search);
      const city = registry.cities.find((item) => item.slug === params.get("cidade"));
      const place = city && registry.places.find((item) => item.slug === params.get("localidade") && item.citySlug === city.slug);
      if (city) {
        const locationLabel = place
          ? place.type === "district"
            ? `no distrito de ${place.name}, em ${city.name}`
            : place.type === "locality"
              ? `na localidade de ${place.name}, em ${city.name}`
              : place.type === "reference"
                ? `na região de ${place.name}, em ${city.name}`
                : `no bairro ${place.name}, em ${city.name}`
          : `em ${city.name}`;
        const service = params.get("servico");
        const serviceLabel = service === "pegue-e-monte"
          ? "o Pegue e Monte"
          : service === "mini-festa-na-mesa"
            ? "a Mini Festa na Mesa"
            : "uma festa";
        document.querySelectorAll("[data-preserve-regional-context]").forEach((link) => {
          const url = new URL(link.href, window.location.href);
          url.searchParams.set("cidade", city.slug);
          if (["pegue-e-monte", "mini-festa-na-mesa"].includes(service)) url.searchParams.set("servico", service);
          if (place) url.searchParams.set("localidade", place.slug);
          link.href = `${url.pathname}${url.search}${url.hash}`;
        });
        document.querySelectorAll("[data-theme-context-whatsapp]").forEach((link) => {
          const themeName = link.dataset.themeName || "decoração escolhida";
          const request = service ? `${serviceLabel} ${locationLabel}` : `uma festa ${locationLabel}`;
          const message = `Olá, Lela! Estou procurando uma decoração ${themeName} para ${request}. Gostaria de consultar a disponibilidade e as condições de retirada ou eventual entrega.`;
          const url = new URL(link.href);
          url.searchParams.set("text", message);
          link.href = url.toString();
        });
        document.querySelectorAll("[data-lightbox-whatsapp][data-theme-name]").forEach((trigger) => {
          const url = new URL(trigger.dataset.lightboxWhatsapp);
          const themeName = trigger.dataset.themeName || "decoração escolhida";
          const request = service ? `${serviceLabel} ${locationLabel}` : `uma festa ${locationLabel}`;
          const message = `Olá, Lela! Estou procurando uma decoração ${themeName} para ${request}. Gostaria de consultar a disponibilidade e as condições de retirada ou eventual entrega.`;
          url.searchParams.set("text", message);
          trigger.dataset.lightboxWhatsapp = url.toString();
        });
      }
    } catch (error) {
      // A consulta sem contexto continua usando a mensagem padrão do tema.
    }
  }

  let lightbox;
  let lastFocused;
  let lightboxItems = [];
  let lightboxIndex = 0;

  function ensureLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Imagem ampliada");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.inert = true;
    lightbox.innerHTML = `<figure class="lightbox__figure"><button class="lightbox__close" type="button" aria-label="Fechar galeria">×</button><div class="lightbox__stage"><button class="lightbox__previous" type="button" aria-label="Foto anterior">‹</button><img class="lightbox__image" alt=""><button class="lightbox__next" type="button" aria-label="Próxima foto">›</button></div><figcaption class="lightbox__caption"></figcaption><p class="lightbox__counter" aria-live="polite"></p><a class="button lightbox__cta" target="_blank" rel="noopener">Consultar este tema no WhatsApp <span aria-hidden="true">↗</span></a></figure>`;
    body.appendChild(lightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox__previous").addEventListener("click", () => moveLightbox(-1));
    lightbox.querySelector(".lightbox__next").addEventListener("click", () => moveLightbox(1));
    lightbox.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...lightbox.querySelectorAll("button:not([disabled]):not([hidden]), a[href]")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || !lightbox.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !lightbox.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    });
    return lightbox;
  }

  function lightboxItem(trigger) {
    return {
      src: trigger.dataset.lightboxSrc || "",
      alt: trigger.dataset.lightboxAlt || "",
      caption: trigger.dataset.lightboxCaption || "",
      whatsapp: trigger.dataset.lightboxWhatsapp || "",
      themeName: trigger.dataset.themeName || "tema escolhido"
    };
  }

  function renderLightboxItem() {
    if (!lightbox || !lightboxItems.length) return;
    const item = lightboxItems[lightboxIndex];
    const box = lightbox;
    box.querySelector(".lightbox__image").src = item.src;
    box.querySelector(".lightbox__image").alt = item.alt;
    box.querySelector(".lightbox__caption").textContent = item.caption;
    box.querySelector(".lightbox__counter").textContent = lightboxItems.length > 1
      ? `Foto ${lightboxIndex + 1} de ${lightboxItems.length}`
      : "";
    box.querySelector(".lightbox__previous").hidden = lightboxItems.length < 2;
    box.querySelector(".lightbox__next").hidden = lightboxItems.length < 2;
    const whatsapp = box.querySelector(".lightbox__cta");
    whatsapp.href = item.whatsapp;
    whatsapp.setAttribute("aria-label", `Consultar ${item.themeName} pelo WhatsApp`);
    box.setAttribute("aria-label", `Fotos do tema ${item.themeName}`);
  }

  function moveLightbox(direction) {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
    renderLightboxItem();
  }

  function openLightbox(trigger) {
    const box = ensureLightbox();
    const group = trigger.dataset.lightboxGroup;
    const groupTriggers = group
      ? [...document.querySelectorAll("[data-lightbox-trigger]")].filter((item) => item.dataset.lightboxGroup === group)
      : [trigger];
    lightboxItems = groupTriggers.map(lightboxItem).filter((item) => item.src);
    const currentIndex = groupTriggers.indexOf(trigger);
    lightboxIndex = Math.max(0, currentIndex);
    if (!lightboxItems.length) lightboxItems = [lightboxItem(trigger)];
    renderLightboxItem();
    lastFocused = document.activeElement;
    box.setAttribute("aria-hidden", "false");
    box.inert = false;
    box.classList.add("is-open");
    body.classList.add("menu-open");
    box.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.inert = true;
    body.classList.remove("menu-open");
    lightbox.querySelector(".lightbox__image").removeAttribute("src");
    lightboxItems = [];
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });
  document.addEventListener("keydown", (event) => {
    if (lightbox?.classList.contains("is-open") && event.key === "ArrowLeft") {
      event.preventDefault();
      moveLightbox(-1);
    }
    if (lightbox?.classList.contains("is-open") && event.key === "ArrowRight") {
      event.preventDefault();
      moveLightbox(1);
    }
    if (event.key === "Escape") {
      const menuWasOpen = menu?.classList.contains("is-open");
      closeMenu();
      closeLightbox();
      if (menuWasOpen) menuToggle?.focus();
    }
  });

  const localCatalog = document.querySelector("[data-local-catalog]");
  const filterButtons = localCatalog
    ? localCatalog.querySelectorAll("[data-filter-button]")
    : document.querySelectorAll("[data-filter-button]");
  const filterItems = localCatalog
    ? localCatalog.querySelectorAll("[data-filter-item]")
    : document.querySelectorAll("[data-filter-item]");
  if (filterButtons.length && filterItems.length) {
    const searchInput = localCatalog?.querySelector("[data-portfolio-search]") || document.querySelector("[data-portfolio-search]");
    const searchStatus = localCatalog?.querySelector("[data-portfolio-results]") || document.querySelector("[data-portfolio-results]");
    const emptyMessage = localCatalog?.querySelector("[data-portfolio-empty]") || document.querySelector("[data-portfolio-empty]");
    const filterGroups = localCatalog
      ? localCatalog.querySelectorAll("[data-filter-group]")
      : document.querySelectorAll("[data-filter-group]");
    const moreButton = localCatalog?.querySelector("[data-catalog-more]");
    const progressiveLimit = Number(localCatalog?.dataset.catalogLimit) || 12;
    const categoryAliases = { "tema-menina": "infantil", "tema-menino": "infantil", "tema-adulto": "adulto", "tema-diversos": "diversos", "tema-futebol": "futebol", "kits-montados": "montagem" };
    const normalizeSearch = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
    let activeFilter = "all";
    let expanded = false;
    localCatalog?.querySelector("[data-local-catalog-controls]")?.removeAttribute("hidden");
    const applyFilter = () => {
      const query = normalizeSearch(searchInput?.value);
      let visibleCount = 0;
      let shownCount = 0;
      filterItems.forEach((item) => {
        const matchesCategory = activeFilter === "all" || item.dataset.category === activeFilter || (activeFilter === "montagem" && item.dataset.hasMontage === "true");
        const matchesSearch = !query || normalizeSearch(item.dataset.search || item.dataset.themeName).includes(query);
        const matches = matchesCategory && matchesSearch;
        item.classList.toggle("is-hidden", !matches);
        if (matches) {
          visibleCount += 1;
          const progressivelyHidden = Boolean(localCatalog && !expanded && visibleCount > progressiveLimit);
          item.classList.toggle("is-progressively-hidden", progressivelyHidden);
          if (!progressivelyHidden) shownCount += 1;
        } else {
          item.classList.remove("is-progressively-hidden");
        }
      });
      filterGroups.forEach((group) => {
        const groupItems = [...group.querySelectorAll("[data-filter-item]")];
        group.hidden = groupItems.length > 0 && groupItems.every((item) => item.classList.contains("is-hidden"));
      });
      filterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter)));
      if (searchStatus) searchStatus.textContent = visibleCount === 0
        ? "Nenhum item encontrado. Tente outro termo ou filtro."
        : localCatalog && visibleCount > shownCount
          ? `${visibleCount} temas encontrados. Mostrando ${shownCount} de ${visibleCount}.`
          : `${visibleCount} ${visibleCount === 1 ? "tema" : "temas"} no catálogo.`;
      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
      if (moreButton) {
        const remaining = Math.max(0, visibleCount - progressiveLimit);
        moreButton.hidden = visibleCount <= progressiveLimit;
        moreButton.setAttribute("aria-expanded", String(expanded));
        moreButton.textContent = expanded ? "Mostrar menos" : `Ver mais ${remaining} ${remaining === 1 ? "decoração" : "decorações"}`;
      }
    };
    filterButtons.forEach((button) => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      expanded = false;
      applyFilter();
    }));
    searchInput?.addEventListener("input", () => {
      expanded = false;
      applyFilter();
    });
    moreButton?.addEventListener("click", () => {
      expanded = !expanded;
      applyFilter();
    });
    const requestedFilter = window.location.hash.replace(/^#/, "");
    const resolvedFilter = categoryAliases[requestedFilter] || requestedFilter;
    const initialButton = [...filterButtons].find((button) => button.dataset.filter === resolvedFilter);
    activeFilter = initialButton ? resolvedFilter : "all";
    applyFilter();
    window.addEventListener("hashchange", () => {
      const requested = window.location.hash.replace(/^#/, "");
      const resolved = categoryAliases[requested] || requested;
      const button = [...filterButtons].find((candidate) => candidate.dataset.filter === resolved);
      if (!button) return;
      activeFilter = resolved;
      expanded = false;
      applyFilter();
    });
  }

  const whatsappForm = document.querySelector("[data-whatsapp-form]");
  if (whatsappForm) {
    whatsappForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(whatsappForm);
      const name = data.get("name") || "não informado";
      const date = data.get("date") || "ainda não definida";
      const city = data.get("city") || "não informado";
      const interest = data.get("interest") || "ainda não sei";
      const message = data.get("message") || "sem observações";
      const phone = whatsappForm.dataset.phone;
      const text = `Olá, Lela! Meu nome é ${name}. Quero consultar a disponibilidade.\n\nData: ${date}\nCidade/bairro: ${city}\nInteresse: ${interest}\nDetalhes: ${message}`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    });
  }
})();
