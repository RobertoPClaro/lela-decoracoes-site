# Revisão final do PR #7 — 16/10/2026

## Escopo e situação

Revisão focada na qualidade editorial dos temas indexáveis, nos nomes e imagens sinalizados, nas páginas regionais, na experiência mobile e nos artefatos de SEO do build. Não houve mudança de estado de indexação, URL, regra comercial ou workflow.

As capturas desta revisão estão em `docs/seo/evidencias/revisao-pr7-*.png`.

## Temas

- Catálogo: 76 temas; 73 páginas de detalhe indexáveis e 3 públicas em `noindex`.
- As 73 páginas indexáveis foram verificadas quanto a nome/slug, imagem principal, conteúdo, metadados, headings, FAQ, links internos, canonical, robots e afirmações comerciais. As 56 páginas promovidas nesta etapa têm evidência editorial estruturada; as 17 anteriores também foram incluídas na verificação.
- A comparação TF-IDF do conteúdo editorial principal (`about`, `use` e `galleryText`), excluindo texto de navegação e logística compartilhada, encontrou similaridade máxima de 0,404 (Crisma / Ursinho Bebê Azul) e nenhum par acima de 0,50. É uma triagem local de duplicação, não um limiar de qualidade ou critério do Google.
- Revisão visual aprofundada incluiu Homem-Aranha, Hulk, Sonic, Stitch, Super Mario, Mickey Mouse, Bob Esponja, Fazendinha, Fundo do Mar, Festa Junina, Flamengo e Hot Wheels, além das associações sinalizadas.
- Nenhuma página indexável precisou voltar a `noindex`. Três continuam fora do sitemap por confirmação pendente: Ana Castela – A Boiadeira (identidade comercial não confirmada pela imagem), Maria Clara e JP (associação de imagem incerta) e Tropa dos Rosa (duas artes de origem/estilo diferentes).
- Animais da floresta e Roedor fofo são descritos como referências genéricas compatíveis com as imagens. Brasil Futebol está associado a imagens de futebol brasileiro; Copinha Baby é descrito pelo texto visível no próprio painel, sem afirmar vínculo com clube. Guerreiras do K-Pop – HUNTR/X foi mantido sem alegação de parceria, licença ou afiliação.
- Removida a frase genérica anexada a todo texto de uso dos registros revisados. Cada tema mantém sua orientação específica; a disponibilidade, composição e logística continuam condicionadas à confirmação da Lela.

Exemplo: no Homem-Aranha, a instrução agora se limita à referência específica (“A fotografia permite conferir qual arte do personagem está cadastrada. Envie a data para a Lela confirmar disponibilidade e o formato que pode ser contratado.”), sem repetir automaticamente o mesmo bloco sobre cidade, serviço, composição e logística já explicado na página.

## Localidades

- 64 rotas municipais/geográficas públicas no build: 2 cidades e 62 localidades; mais o diretório `/regioes-atendidas/`.
- Joinville, Araquari e a página de retirada do Paranaguamirim são indexáveis. As outras 61 páginas individuais seguem públicas com `noindex,follow` e canonical próprio.
- Nenhuma localidade foi promovida nesta revisão. Para bairros sem um fato comercial ou geográfico próprio comprovável além do catálogo, retirada central e entrega sob consulta, a experiência pública é útil, mas não sustenta ainda uma página de busca individual sem risco de conteúdo repetitivo. Paranaguamirim tem a informação distintiva verificável do ponto de retirada.
- Todas as páginas locais continuam com catálogo de 76 temas, busca, filtros, expansão, FAQ, breadcrumbs, canonical e WhatsApp contextualizado. Retirada/devolução continuam no Paranaguamirim; entrega depende da disponibilidade para data e endereço.

## UX, performance e acessibilidade

- Corrigido o grid de cartões de serviço em páginas locais: passa a uma coluna em telas até 560 px, eliminando overflow observado a 320 px.
- O botão flutuante do WhatsApp é ocultado apenas nas páginas locais em telas até 560 px, onde cobria controles durante rolagem. Permanecem os CTAs contextuais da página, dos temas e dos cards.
- Busca, filtro, combinação dos dois, contador, expansão de 12 para 76 cards, FAQ por teclado e menu mobile foram verificados. Nos viewports 320, 390, 768, 1024, 1280, 1440 e 1680 px, não houve overflow horizontal.
- Em laboratório local, na página Adhemar Garcia a 390 px: HTML de 199.775 bytes, 76 imagens de catálogo com `loading=lazy`, dimensões intrínsecas presentes, 6 pedidos de imagem iniciais; LCP medido de 208 ms e CLS de 0 nesse ensaio. Esses números não são Core Web Vitals de campo.
- Imagens verificadas possuem texto alternativo. A revisão de teclado cobriu FAQ, menu, busca, filtros e expansão; não se declara conformidade WCAG integral.

## SEO e validação do build público

- 157 arquivos HTML; 92 URLs no sitemap; 64 páginas `noindex,follow`; 0 `DRAFT_PREVIEW` no build público.
- Os 92 endereços do sitemap são únicos, usam HTTPS e `leladecoracoes.com`, não têm parâmetros e correspondem exatamente às páginas indexáveis canônicas. Nenhuma página noindex entrou no sitemap.
- Verificação local: zero divergências de canonical e zero erros de parse de JSON-LD. `robots.txt` permite rastreamento e referencia `https://leladecoracoes.com/sitemap.xml`.
- Os avisos comerciais continuam visíveis: moradores de Joinville e Araquari podem contratar Pegue e Monte com retirada e devolução no Paranaguamirim; entrega depende de disponibilidade; catálogo não garante disponibilidade por data; regras não foram extrapoladas para Mini Festa na Mesa.
- Nenhuma URL tema × bairro foi criada; estados de indexação não foram alterados.

## Evidências visuais

- `revisao-pr7-adhemar-320.png` — apresentação mobile e acesso ao catálogo sem overflow.
- `revisao-pr7-adhemar-390.png` — catálogo mobile com controles visíveis.
- `revisao-pr7-faq-adhemar-390.png` — FAQ aberto em mobile, sem sobreposição do botão flutuante.
- `revisao-pr7-joinville-1440.png` — diretório municipal em desktop.

## Testes desta revisão

- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test` — aprovado; build público com 157 HTML, 1.427 referências locais a imagens, 73 temas indexáveis, 3 temas noindex, 61 localidades noindex e zero drafts.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm run build:review` — aprovado; build de revisão com os mesmos estados e os avisos de preview confinados à revisão.
- `node --check` em `themes.cjs`, `themeEditorialReviews.cjs`, `main.js` e `validate-build.cjs` — aprovado; `git diff --check` — aprovado.
- Checagem adicional do artefato: sitemap contém exatamente as 92 páginas indexáveis; canonical divergente: 0; erros de parse de JSON-LD: 0; páginas noindex no sitemap: 0; aviso de preview no build público: 0.
- Playwright no servidor local: 26 rotas verificadas, todas HTTP 200; viewports 320, 390, 768, 1024, 1280, 1440 e 1680 px sem overflow; busca/filtro/combinação/expansão do catálogo, FAQ por teclado, menu mobile e mensagens WhatsApp contextualizadas verificados sem enviar mensagens.
- A prévia pública candidata foi reconstruída em `dist` e servida em `http://127.0.0.1:8100/`. A porta 8096 estava ocupada por um processo inacessível neste sandbox, então a revisão usa 8100 sem interromper esse processo.

## Pendências

- Confirmar com a proprietária a identificação comercial de Ana Castela – A Boiadeira, a associação de Maria Clara e JP e a composição de imagens de Tropa dos Rosa antes de considerar indexação.
- Conteúdo hiperlocal distintivo verificável ainda não foi identificado para as outras 60 páginas regionais individuais além de Paranaguamirim; mantidas públicas em noindex até evidência editorial real.
- O estado dos checks remotos e a atualização do corpo do PR dependem de conectividade/autenticação GitHub no ambiente. Não houve merge nem deploy nesta revisão.
