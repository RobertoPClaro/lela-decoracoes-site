# Auditoria de SEO, conteúdo e experiência — 15/10/2026

> Baseline histórico do PR #5. O estado atual desta branch é posterior e está registrado em [`temas-editorial-2026-10-16.md`](temas-editorial-2026-10-16.md), [`seo-local-completo-2026-10-16.md`](seo-local-completo-2026-10-16.md) e [`backlog-priorizado.md`](backlog-priorizado.md). As contagens e pendências descritas abaixo pertencem à auditoria de 15/10/2026 e não devem ser usadas como resultado do build candidato atual.

## Escopo e base

Auditoria local da branch `feat/seo-audit-optimization`, baseada no commit `287b702` da branch `feat/catalogo-regioes`. O estado remoto verificado por `git fetch origin` permanece em `origin/main` `2453d0c`; a entrega principal ainda depende do PR dessa branch. A validação cobre o build estático e jornadas Playwright. Não comprova indexação, tráfego ou desempenho de campo.

A sessão não expôs agentes Luna 6 Max selecionáveis. O trabalho foi realizado pelo coordenador, sem trocar silenciosamente o modelo ou simular paralelismo.

## Resultados técnicos

| Área | Resultado observado | Limite |
|---|---|---|
| Build público | 96 HTML; 36 URLs no sitemap; 17 páginas de tema indexáveis; 59 páginas de tema `noindex`; 3 páginas regionais indexáveis; 0 drafts geográficos | Build local; não prova publicação nem indexação no Google |
| Build de revisão | 157 HTML; 61 rotas regionais `DRAFT_PREVIEW`; mesmos 17 temas indexáveis | Drafts só aparecem com `LELA_LOCAL_REVIEW=1` |
| Sitemap | XML válido; 36 URLs absolutas em `https://leladecoracoes.com`; sem duplicatas, parâmetros de contexto, temas `noindex` ou drafts; conjunto corresponde às páginas planejadas como indexáveis | Correspondência foi validada no artefato local |
| Robots | `Allow: /` e referência ao sitemap absoluto; o build público não contém drafts | Não existe bloqueio de robots específico para drafts porque eles não são gerados no build público |
| Canonicals | URL absoluta, rota canônica com barra final e sem query string de contexto; domínio de produção | Verificação pelo validador no build |
| JSON-LD | `LocalBusiness` usa o endereço divulgado de retirada; serviços indicam Joinville e Araquari; `WebPage`, `BreadcrumbList` e FAQ visível/schema conferidos | Não foi usado validador externo de rich results |
| Links | Navegação conecta homepage, serviços, catálogo, temas, cidades e páginas de localidade; links das páginas de detalhe mantêm contexto apenas no CTA | Não há dados de rastreamento para medir cliques reais |
| Catálogo regional | 76 grupos no HTML; 12 visíveis inicialmente com JavaScript, busca/filtros alcançam o conjunto completo; imagens lazy; botão “Ver mais” expande | Sem JavaScript, o HTML continua com links de tema; validar filtros exige JS |
| Responsividade | Playwright em 390, 768, 1.024, 1.280, 1.440 e 1.680 px sem overflow nas rotas testadas; console sem erros/warnings na sessão | Não substitui teste em aparelhos físicos ou WCAG completo |
| Peso local | HTML de Adhemar Garcia: 199.471 bytes bruto; 16.673 bytes com gzip local nível 9; 76 imagens marcadas lazy | Gzip local é estimativa, não transferência medida em produção; não é Core Web Vital |

O catálogo mantém 95 fotografias originais em 76 grupos. Os temas permanecem distribuídos em 17 `READY_INDEX` e 59 `noindex,follow`; a presença no catálogo não afirma estoque ou disponibilidade para uma data.

## SEO hiperlocal e decisão editorial

O cadastro contém 45 bairros de Joinville e 17 referências geográficas de Araquari (13 cadastradas como bairros, 3 como localidades e 1 distrito). As classes de Araquari não são tratadas como equivalentes e o próprio cadastro assinala que pode estar incompleto.

Moradores de todos os bairros das duas cidades podem contratar Pegue e Monte com retirada e devolução no ponto divulgado em Paranaguamirim, Joinville. Entrega depende da disponibilidade para a data e o endereço; condições e taxas são confirmadas com a Lela. Isso não garante disponibilidade de um tema. Essas regras são centralizadas em `src/_data/commercial.cjs`.

Três páginas regionais permanecem indexáveis: Joinville, Araquari e a página do ponto real de retirada no Paranaguamirim. As outras 61 são `DRAFT_PREVIEW`, fora do build público e do sitemap. A confirmação comercial removeu a incerteza sobre contratação com retirada, mas não acrescenta fatos próprios suficientes para indexar em massa páginas que compartilham a mesma operação, catálogo e FAQ. Para diferenciar páginas futuras, usar somente fatos úteis e verificáveis — por exemplo, fotos autorizadas produzidas naquela localidade ou condição logística realmente própria; se não existirem, consolidar a informação na página municipal.

## Auditoria editorial dos temas

- 76 páginas individuais são navegáveis e têm CTA contextualizado.
- 17 têm conteúdo individual revisado e estão indexáveis; 59 permanecem `noindex` até revisão.
- O validador cobre slugs duplicados, associação única de imagens, categoria, links relacionados, metadados, FAQs visíveis e similaridade textual entre páginas indexáveis.
- Permanecem pendentes de confirmação editorial/comercial, conforme `docs/inventario-catalogo-temas.md`: nomes/associações de imagens de Animais da Floresta e Roedor Fofo; associação comercial da imagem de Seleção Brasileira a Brasil Futebol; associação da imagem antiga “Rainbow Friends” a Tropa dos Rosa. Não promover essas rotas antes da confirmação.
- Corrigido na branch principal um texto HUNTR/X que expunha ao visitante uma observação interna sobre nomes de arquivo.

## Pesquisa qualitativa de busca e concorrentes

Não há volume, posição ou dificuldade de palavra-chave verificados. Os termos abaixo são hipóteses de intenção comercial a validar no Search Console:

| Grupo de consulta | Exemplos | Intenção/evidência | Próximo passo |
|---|---|---|---|
| Serviço + cidade | “Pegue e Monte Joinville”; “aluguel de decoração para festa Joinville” | Intenção de contratação; serviço e cidade são confirmados no site | Comparar impressões, cliques e páginas no GSC |
| Serviço + Araquari | “Pegue e Monte Araquari”; “decoração de festa Araquari” | Intenção local; explicitar retirada em Joinville e entrega sob consulta | Medir consultas e objeções comerciais recebidas |
| Serviço + tema | “decoração Bluey Joinville”; “Pegue e Monte Safari Baby” | Intenção de tema; 76 páginas navegáveis, apenas 17 indexáveis | Expandir só quando houver informação própria verificável |
| Serviço + bairro | “Pegue e Monte no Aventureiro”; “decoração no Itinga” | Hipótese longa, sem volume conhecido | Não indexar páginas repetitivas; medir demanda antes de investir em conteúdo local próprio |
| Serviço específico | “Mini Festa na Mesa Joinville” | Intenção de contratação; detalhes logísticos desse formato ainda precisam de confirmação | Confirmar a oferta operacional antes de ampliar claims |

Páginas comerciais consultadas em 15/10/2026:

- [Andressa Arte em Festas](https://andressaarteemfestas.com.br/) apresenta Pegue e Monte em Joinville, informa retirada, mostra níveis de kit e detalhes de condições comerciais. É uma referência de clareza de oferta; nenhum preço ou composição foi transferido para a Lela.
- [Aprecie Cada Festa](https://apreciecadafesta.com.br/) apresenta níveis e composições de kits, FAQ e condições de entrega por bairros. A comparação aponta uma oportunidade para a Lela detalhar formatos e logística quando a proprietária confirmar esses dados.
- Nesta busca não foi estabelecido um concorrente direto de Araquari por fonte primária confiável. Isso não demonstra ausência de concorrência.

## Performance e acessibilidade

A página regional de referência tem cerca de 195 KiB de HTML bruto, mas 16,7 KiB no cálculo gzip local. Os 76 cards mantêm links estáticos e imagens com `loading=lazy`; a interface apresenta 12 opções inicialmente e deixa busca/filtros consultar todas. Essa solução não substitui a avaliação de LCP/INP/CLS de campo.

Navegação por teclado, menu mobile, FAQ e fluxos principais foram verificados em Playwright. Não foi executada auditoria WCAG completa, análise de contraste automatizada ou sessão com leitor de tela. Não há relatório CrUX/PageSpeed autenticado nesta execução; Core Web Vitals de campo permanecem não verificados.

## Analytics, Search Console e Google Maps

- **GA4:** não foi encontrado `G-…`, `GTM-…` ou `gtag()` no código da branch. Isso não prova que a empresa não tenha propriedade; não há ID ou acesso autorizado disponível. Próxima etapa: confirmar propriedade/ID e consentimento; especificar eventos de clique WhatsApp, busca e filtro sem incluir dados pessoais em URL/log/evento.
- **Search Console:** sem acesso autenticado. Não foi possível verificar propriedade, sitemap recebido, cobertura, consultas, URLs inspecionadas ou dados de campo. O proprietário deve conceder acesso de leitura ou validar na conta existente.
- **Google Business Profile/Maps:** não foi possível confirmar uma ficha oficial da Lela com segurança nem acessar a conta. Não foi feita alteração. Antes de editar, confirmar com a proprietária se o endereço recebe clientes presencialmente e qual modelo representa a operação. As [diretrizes do Google](https://support.google.com/business/answer/3038177?hl=en) exigem representação fiel do local e da área; para negócios híbridos/área de serviço, a orientação depende de haver atendimento real no endereço. O Google também recomenda áreas precisas e permite no máximo 20 áreas configuradas ([gerenciar áreas de serviço](https://support.google.com/business/answer/9157481?hl=en)). A retirada divulgada no site, por si só, não confirma elegibilidade ou configuração correta de uma ficha pública.

## GEO/AEO

O site contém respostas visíveis sobre serviço, retirada, consulta de tema/data e condições de entrega; FAQ schema corresponde ao conteúdo visível. Isso melhora a legibilidade para pessoas e sistemas que extraem respostas, mas não garante ranking, citação ou recomendação em mecanismos de IA. Não foram medidos resultados em buscadores com IA.

## CI e segurança de publicação

`.github/workflows/validate.yml` executa sintaxe JS/CJS, build público e build de revisão em PR/push das branches de trabalho, com `contents: read`; não tem job de deploy. `.github/workflows/pages.yml` dispara em `push` para `main` ou `workflow_dispatch`. Portanto, push da branch de feature e abertura de PR não publicam; merge em `main` aciona a publicação automática e exige a revisão aprovada antes do merge.

## Evidências locais

- Capturas: `docs/screenshots/pr-validation/` e `docs/screenshots/seo-hiperlocal/`.
- Prontidão dos bairros e estado comercial: `docs/prontidao-seo-hiperlocal-confirmacao-comercial.md`.
- Inventário dos temas: `docs/inventario-catalogo-temas.md`.
- Build público: 96 HTML; 36 URLs no sitemap; nenhum draft regional.
- Build de revisão: 157 HTML; 61 drafts regionais fora do sitemap; 17 temas indexáveis.
