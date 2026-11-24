# 05 — Guia Separado de Dimensões Personalizadas no GA4 — Lela Decorações

**Finalidade:** orientar o cadastro manual das dimensões personalizadas na interface administrativa da propriedade GA4 da Lela Decorações (configurada em `GA4_MEASUREMENT_ID`), sem modificar a propriedade nesta etapa.  
**Origem no código:** `src/assets/js/analytics-consent.js` (ativo somente após opt-in de consentimento).

---

## 1. Parâmetros Já Enviados pelo Site (Escopo de Evento)

Todos os eventos próprios enviados por `analytics-consent.js` permanecem intactos e respeitam o consentimento opt-in, sem envio de PII (nenhum telefone, texto de mensagem, nome ou busca digitada é transmitido).

| Parâmetro enviado (`event parameter`) | Eventos que emitem | Valores esperados | Utilidade no acompanhamento |
|---|---|---|---|
| `page_type` | `whatsapp_click`, `catalog_theme_click`, `catalog_search`, `catalog_filter`, `phone_click` | `home`, `service`, `theme`, `region`, `catalog`, `theme_directory`, `faq`, `contact`, `content` | Identifica quais famílias de página geram mais cliques no WhatsApp. |
| `placement` | `whatsapp_click`, `phone_click` | `home_hero`, `header`, `floating_contact`, `cta_section`, `service_cta`, `theme_detail`, `regional_hero`, `contact_details`, `contact_form`, `faq_cta`, `footer_social`, `footer_phone`, `lightbox` | Mede qual botão/posição converte melhor. |
| `theme_slug` | `whatsapp_click`, `catalog_theme_click` | Slug do tema (ex.: `patrulha-canina`, `casa-magica-da-gabby`, `bluey`) | Ranking real de temas com maior intenção de orçamento. |
| `service_slug` | `whatsapp_click`, `catalog_theme_click` | `pegue-e-monte`, `mini-festa-na-mesa` | Separa demanda entre Pegue e Monte e Mini Festa na Mesa. |
| `city_slug` | `whatsapp_click`, `catalog_theme_click` | `joinville`, `araquari` | Compara geração de contatos entre Joinville e Araquari. |
| `locality_slug` | `whatsapp_click`, `catalog_theme_click` | Ex.: `paranaguamirim` (apenas quando navegando em contexto de localidade) | Mede contexto regional preservado até o clique no tema/WhatsApp. |
| `filter_slug` | `catalog_filter` | `all`, `infantil`, `adulto`, `celebracoes`, `futebol`, `diversos`, `montagem` | Indica quais categorias são mais filtradas no catálogo `/portfolio/`. |

*(Os parâmetros numéricos `has_query` e `results_count` de `catalog_search`/`catalog_filter` podem ser cadastrados como métricas personalizadas, se desejado no futuro; prioridade principal são as **dimensões de evento** acima).*

---

## 2. Passo a Passo Manual no Painel Web do GA4 (Quando Autorizado)

1. Acessar `analytics.google.com` com a conta proprietária da propriedade GA4 da Lela Decorações (fluxo Web configurado em `GA4_MEASUREMENT_ID`).
2. Abrir **Administrador** (ícone de engrenagem) → **Exibição de dados** → **Definições personalizadas**.
3. Na aba **Dimensões personalizadas**, clicar em **Criar dimensão personalizada** para cada parâmetro prioritário abaixo:
   - **Nome da dimensão:** `Posicionamento CTA` · **Escopo:** `Evento` · **Parâmetro do evento:** `placement`
   - **Nome da dimensão:** `Tipo de página` · **Escopo:** `Evento` · **Parâmetro do evento:** `page_type`
   - **Nome da dimensão:** `Tema (slug)` · **Escopo:** `Evento` · **Parâmetro do evento:** `theme_slug`
   - **Nome da dimensão:** `Serviço (slug)` · **Escopo:** `Evento` · **Parâmetro do evento:** `service_slug`
   - **Nome da dimensão:** `Cidade (slug)` · **Escopo:** `Evento` · **Parâmetro do evento:** `city_slug`
   - *(Opcional)* **Localidade (slug)** (`locality_slug`) e **Filtro de catálogo** (`filter_slug`).
4. Aguardar 24–48 horas após novos eventos com opt-in para visualização nos relatórios GA4 e sincronização posterior pelo acompanhamento local.
5. **Regra permanente:** manter **Cliques de saída (Outbound clicks)** e **Interações de formulário (Form interactions)** **desativados** na Medição Otimizada do fluxo Web (pré-requisito do `analytics-consent.js`).
