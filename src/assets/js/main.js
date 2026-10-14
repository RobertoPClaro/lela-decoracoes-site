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
  }

  let lightbox;
  let lastFocused;

  function ensureLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Imagem ampliada");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.inert = true;
    lightbox.innerHTML = `<figure class="lightbox__figure"><button class="lightbox__close" type="button" aria-label="Fechar imagem">×</button><img class="lightbox__image" alt=""><figcaption class="lightbox__caption"></figcaption><a class="button lightbox__cta" target="_blank" rel="noopener">Consultar este tema no WhatsApp <span aria-hidden="true">↗</span></a></figure>`;
    body.appendChild(lightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...lightbox.querySelectorAll("button:not([disabled]), a[href]")];
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

  function openLightbox(trigger) {
    const box = ensureLightbox();
    const image = box.querySelector(".lightbox__image");
    const caption = box.querySelector(".lightbox__caption");
    const whatsapp = box.querySelector(".lightbox__cta");
    const themeName = trigger.dataset.themeName || "tema escolhido";
    lastFocused = document.activeElement;
    image.src = trigger.dataset.lightboxSrc;
    image.alt = trigger.dataset.lightboxAlt || "";
    caption.textContent = trigger.dataset.lightboxCaption || "";
    whatsapp.href = trigger.dataset.lightboxWhatsapp || "";
    whatsapp.setAttribute("aria-label", `Consultar ${themeName} pelo WhatsApp`);
    box.setAttribute("aria-label", `Imagem ampliada: ${themeName}`);
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
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const menuWasOpen = menu?.classList.contains("is-open");
      closeMenu();
      closeLightbox();
      if (menuWasOpen) menuToggle?.focus();
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter-button]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  if (filterButtons.length && filterItems.length) {
    const searchInput = document.querySelector("[data-portfolio-search]");
    const searchStatus = document.querySelector("[data-portfolio-results]");
    const emptyMessage = document.querySelector("[data-portfolio-empty]");
    const filterGroups = document.querySelectorAll("[data-filter-group]");
    const categoryAliases = { "tema-menina": "infantil", "tema-menino": "infantil", "tema-adulto": "adulto", "tema-diversos": "diversos", "tema-futebol": "futebol" };
    const normalizeSearch = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
    let activeFilter = "all";
    const applyFilter = () => {
      const query = normalizeSearch(searchInput?.value);
      let visibleCount = 0;
      filterItems.forEach((item) => {
        const matchesCategory = activeFilter === "all" || item.dataset.category === activeFilter || item.dataset.source === activeFilter;
        const matchesSearch = !query || normalizeSearch(item.dataset.search || item.dataset.themeName).includes(query);
        const matches = matchesCategory && matchesSearch;
        item.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount += 1;
      });
      filterGroups.forEach((group) => {
        const groupItems = [...group.querySelectorAll("[data-filter-item]")];
        group.hidden = groupItems.length > 0 && groupItems.every((item) => item.classList.contains("is-hidden"));
      });
      filterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === activeFilter)));
      if (searchStatus) searchStatus.textContent = visibleCount === 0
        ? "Nenhum item encontrado. Tente outro termo ou filtro."
        : `${visibleCount} ${visibleCount === 1 ? "imagem" : "imagens"} no portfólio.`;
      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    };
    filterButtons.forEach((button) => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      applyFilter();
    }));
    searchInput?.addEventListener("input", applyFilter);
    const requestedFilter = window.location.hash.replace(/^#/, "");
    const resolvedFilter = categoryAliases[requestedFilter] || requestedFilter;
    const initialButton = [...filterButtons].find((button) => button.dataset.filter === resolvedFilter);
    activeFilter = initialButton ? resolvedFilter : "all";
    applyFilter();
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
