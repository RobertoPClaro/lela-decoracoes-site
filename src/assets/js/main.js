(() => {
  const body = document.body;
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
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
    lightbox.innerHTML = `<figure class="lightbox__figure"><button class="lightbox__close" type="button" aria-label="Fechar imagem">×</button><img class="lightbox__image" alt=""><figcaption class="lightbox__caption"></figcaption></figure>`;
    body.appendChild(lightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
    return lightbox;
  }

  function openLightbox(trigger) {
    const box = ensureLightbox();
    const image = box.querySelector(".lightbox__image");
    const caption = box.querySelector(".lightbox__caption");
    lastFocused = document.activeElement;
    image.src = trigger.dataset.lightboxSrc;
    image.alt = trigger.dataset.lightboxAlt || "";
    caption.textContent = trigger.dataset.lightboxCaption || "";
    box.classList.add("is-open");
    body.classList.add("menu-open");
    box.querySelector(".lightbox__close").focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    body.classList.remove("menu-open");
    lightbox.querySelector(".lightbox__image").removeAttribute("src");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLightbox();
    }
  });

  const filterButtons = document.querySelectorAll("[data-filter-button]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  if (filterButtons.length && filterItems.length) {
    const applyFilter = (filter) => {
      filterItems.forEach((item) => {
        const matches = filter === "all" || item.dataset.category === filter || item.dataset.source === filter;
        item.classList.toggle("is-hidden", !matches);
      });
      filterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
    };
    filterButtons.forEach((button) => button.addEventListener("click", () => applyFilter(button.dataset.filter)));
    const requestedFilter = window.location.hash.replace(/^#/, "");
    const initialButton = [...filterButtons].find((button) => button.dataset.filter === requestedFilter);
    applyFilter(initialButton ? requestedFilter : "all");
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
