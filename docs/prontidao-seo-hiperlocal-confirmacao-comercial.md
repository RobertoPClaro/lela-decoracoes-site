# Confirmação comercial e prontidão do SEO hiperlocal

> **Registro histórico de 14–15/10/2026.** O estado posterior está em [`docs/seo/seo-local-completo-2026-10-16.md`](seo/seo-local-completo-2026-10-16.md): nesta branch, as 61 rotas antes DRAFT_PREVIEW tornam-se páginas públicas `PUBLIC_NOINDEX`; não foram promovidas à indexação.

**Data da confirmação:** 2026-10-14.
**Estado do registro:** fotografia da confirmação em 14/10/2026, antes da preparação de release. O estado atual de Git e publicação está no adendo de 15/10/2026.

## CONTRATAÇÃO CONFIRMADA

Moradores de todos os bairros de Joinville e Araquari podem contratar o Pegue e Monte com retirada e devolução no Paranaguamirim, em Joinville. Endereço de retirada e devolução: R. Matusalém Gonçalves Pinheiro, 83 - Paranaguamirim, Joinville - SC, 89231-603. No Pegue e Monte, a cliente transporta, monta e desmonta conforme as orientações combinadas e devolve o kit no prazo e local acordados.

A regra está centralizada em src/_data/commercial.cjs e associada ao responsável, à declaração e à data. Os dados regionais registram a elegibilidade como CONFIRMED_CITYWIDE com evidência OWNER_CONFIRMATION.

## ENTREGA DEPENDENTE DE DISPONIBILIDADE

A entrega depende da disponibilidade da Lela para a data e o endereço informados. Consulte também eventuais taxas; a opção de retirada continua disponível. A cliente informa data e endereço; eventuais taxas são confirmadas com a Lela. A consulta ou indisponibilidade de entrega não impede a contratação com retirada. A presença de um tema no catálogo também não garante disponibilidade na data.

A regra acima é exclusiva do Pegue e Monte. Logística, retirada, entrega e montagem da Mini Festa na Mesa continuam dependendo da proposta e de confirmação com a Lela.

## CONTEÚDO EDITORIAL REVISADO

Foram atualizados os dados centrais, textos regionais e FAQs, além de Pegue e Monte, Como funciona, Serviços, Regiões atendidas, Catálogo regional, páginas de tema e llms.txt. Os 61 drafts de localidade agora explicam a retirada confirmada e a entrega condicional. O aviso de prévia informa somente que a rota está em revisão; não diz mais que a elegibilidade está desconhecida.

**Antes:** “O atendimento neste bairro ou localidade ainda precisa ser confirmado.”
**Depois:** “Moradores de Joinville podem contratar o Pegue e Monte com retirada e devolução no Paranaguamirim, em Joinville. A entrega depende da disponibilidade para a data e o endereço.”

**Antes:** “Não há uma lista pública de bairros com entrega confirmada.”
**Depois:** “Moradores de qualquer bairro de Joinville e Araquari podem contratar o Pegue e Monte retirando e devolvendo o kit no endereço divulgado. Se preferir entrega, informe a data e o endereço para a Lela verificar a disponibilidade e as condições.”

## PÁGINAS APTAS À INDEXAÇÃO

- Joinville e Araquari: páginas municipais já indexáveis, atualizadas com a regra; os dados estruturados descrevem o Pegue e Monte com retirada, sem promessa de entrega.
- Paranaguamirim: mantém a página indexável por informar o ponto real de retirada; não declara entrega no bairro.
- Entre os 61 drafts: 61 têm contratação com retirada confirmada; 0 foram promovidos; 0 têm conteúdo local distintivo suficiente para indexação nesta rodada. A confirmação comercial resolve a elegibilidade, mas os dados comuns de serviço, o mesmo catálogo e FAQ não justificam 61 páginas orgânicas individuais.
- O build público mantém três páginas regionais indexáveis (Joinville, Araquari e ponto de retirada), 17 temas indexáveis e 59 temas noindex. Os 61 drafts continuam exclusivos do build de revisão, noindex,follow, fora do sitemap e sem schema Service de bairro.
- Próximas prioridades de revisão editorial — não são estimativas de demanda: Aventureiro, Adhemar Garcia, Floresta, América, Itinga, Porto Grande e Centro. Para justificar uma URL indexável, faltam fatos locais úteis verificados, como material autorizado produzido naquela localidade ou condição logística própria. Não inventar esses elementos. Paranaguamirim é distinto por ser o endereço divulgado para retirada.

### Matriz das 61 páginas DRAFT_PREVIEW

A contratação com retirada está confirmada para residentes da cidade em cada linha. O campo interno serviceCoverageStatus: UNCONFIRMED permanece exclusivamente como ausência de confirmação de entrega no endereço específico; não contradiz pickupEligibilityStatus: CONFIRMED_CITYWIDE.

| Cidade | Localidade | Tipo geográfico cadastrado | Pegue e Monte | Entrega | Prontidão editorial | Publicação | Decisão |
|---|---|---|---|---|---|---|---|
| Joinville | Adhemar Garcia | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | América | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Anita Garibaldi | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Atiradores | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Aventureiro | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Boa Vista | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Boehmerwald | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Bom Retiro | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Bucarein | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Centro | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Comasa | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Costa e Silva | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Dona Francisca | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Espinheiros | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Fátima | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Floresta | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Glória | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Guanabara | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Iririú | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Itaum | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Itinga | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Jardim Iririú | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Jardim Paraíso | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Jardim Sofia | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Jarivatuba | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | João Costa | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Marinas | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Morro do Meio | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Nova Brasília | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Parque Guarani | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Petrópolis | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Pirabeiraba | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Profipo | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Rio Bonito | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Saguaçu | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Santa Catarina | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Santo Antônio | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | São Marcos | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Ulysses Guimarães | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Vale Verde | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Vila Cubatão | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Vila Nova | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Zona Industrial Norte | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Joinville | Zona Industrial Tupy | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Areias Pequenas | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Barra do Itapocu | Localidade (classificação mantida) | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Centro | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Casa Nova | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Colégio Agrícola | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Corveta | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Itapocu | Distrito | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Itinga | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Jacu | Localidade (classificação mantida) | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Ponto Alto | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Porto Grande | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Rainha | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Rio do Morro | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Trevo | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Volta Redonda | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Guamiranga | Bairro | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |
| Araquari | Morro Grande | Localidade (classificação mantida) | Retirada/devolução confirmada | Entrega sob consulta | INSUFFICIENT_LOCAL_DISTINCTIVE_EVIDENCE | DRAFT_PREVIEW | RETAIN_DRAFT_PREVIEW |

## FAQ E COERÊNCIA

A fonte central src/_data/faqs.cjs explica elegibilidade, endereço, entrega condicional, consulta de tema/data, montagem pela cliente e logística ainda dependente de proposta na Mini Festa na Mesa. As perguntas são contextualizadas por cidade ou localidade e reutilizam respostas centrais. O validador compara respostas visíveis com FAQPage.

Pendências da proprietária: confirmar possibilidade e condições de entrega para cada data/endereço, inclusive taxas; confirmar as regras específicas da Mini Festa na Mesa; revalidar periodicamente as condições contratuais já divulgadas. Nenhuma dessas pendências altera a confirmação de retirada do Pegue e Monte.

## INDEXAÇÃO E BUILDS

DRAFT_PREVIEW só é renderizado com LELA_LOCAL_REVIEW=1, recebe noindex,follow e fica fora do sitemap. Não houve mudança nos estados públicos de bairros ou temas. A página Paranaguamirim continua READY_INDEX.

## TESTES E EVIDÊNCIAS

- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`: aprovado. Build público: 96 HTML; 1.427 referências locais de imagem, 1.425 variantes geradas; 2 páginas de cidade + Paranaguamirim indexáveis; 17 páginas de tema indexáveis; nenhum draft.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm run build:review`: aprovado. 157 HTML; 61 drafts; 3 páginas regionais indexáveis; 17 temas indexáveis. O validador conferiu FAQ visível/schema, canonical, sitemap, robots, breadcrumbs, JSON-LD, links, imagens e catálogo completo nas rotas regionais.
- `node --check` em todos os JS/CJS de `src` e `scripts`, e `git diff --check`: aprovados.
- Playwright: 18 rotas, CSS e JS responderam HTTP 200. Adhemar Garcia, Aventureiro, Itinga e as cidades renderizaram 76 grupos; busca por Bluey retornou um grupo; FAQ regional apresentou 10 perguntas e abriu pelo teclado. Mensagens verificadas: Adhemar Garcia + Bluey; Aventureiro + Safari Baby; Itinga + Dinossauros; Araquari + Bluey. Acesso direto a Bluey manteve mensagem padrão. Nenhuma mensagem foi enviada.
- Responsividade Playwright em 390, 768, 1.024 e 1.440 px: sem overflow horizontal nas páginas regionais verificadas.

Capturas do build de revisão:

- [Adhemar Garcia mobile, 390 px](screenshots/confirmacao-comercial/adhemar-mobile-390.png)
- [Catálogo local de Adhemar Garcia, 390 px](screenshots/confirmacao-comercial/adhemar-catalogo-390.png)
- [Itinga mobile, 390 px](screenshots/confirmacao-comercial/itinga-mobile-390.png)
- [Joinville desktop, 1.440 px](screenshots/confirmacao-comercial/joinville-desktop-1440.png)

O preview atualizado está em **http://127.0.0.1:8094/** e serve o build de revisão gerado agora. A tentativa de reutilizar 8093 falhou com `EADDRINUSE`; não encerrei processos. Verificados HTTP 200 em homepage, Pegue e Monte, Dúvidas, Regiões atendidas, Joinville, Araquari, Paranaguamirim, Adhemar Garcia, Aventureiro, Floresta, América, Itinga, Porto Grande, catálogo, Bluey, Safari Baby, CSS e JS.

Na captura deste relatório, nenhum commit, push ou PR havia sido feito. O adendo a seguir atualiza esse estado sem alterar os estados de publicação.

## Auditoria de release e SEO — 15/10/2026

### Git e entrega

- Repositório: `lela-decoracoes-site`; branch `feat/catalogo-regioes`.
- `git fetch origin` foi concluído. `origin/main` permanece em `2453d0c`, base da branch; o histórico contém os merges #1 (`f2a2007`) e #2 (`2453d0c`).
- O workflow Pages publica apenas em `push` para `main` ou execução manual. O novo `.github/workflows/validate.yml` valida PRs e branches de trabalho, com permissão `contents: read`, sem deploy.
- O login web do GitHub CLI aguarda autorização. Nenhum push, PR, merge ou deploy foi iniciado sem credenciais válidas.

### Validação local

- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`: aprovado; 96 HTML, 17 temas indexáveis, 59 temas `noindex`, 3 páginas regionais indexáveis e nenhum draft regional no build público.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm run build:review`: aprovado; 157 HTML, com 61 drafts regionais restritos ao build de revisão.
- Sintaxe JS/CJS, YAML do workflow e `git diff --check`: aprovados.
- O validador checa sitemap, robots, canonicals, metadados, breadcrumbs, JSON-LD/FAQ visível, links, imagens e estados editoriais. Parâmetros usados para contexto de WhatsApp não alteram canonical nem entram no sitemap.
- Playwright confirmou os fluxos Joinville → Adhemar Garcia → Bluey, Joinville → Aventureiro → Safari Baby e Araquari → Itinga → Dinossauros, com tema e localidade no link de WhatsApp. Acesso direto a tema conserva mensagem padrão. Também foram testados menu desktop/mobile, busca, filtros e expansão de 12 para 76 opções; nenhuma mensagem foi enviada.
- Viewports 390, 768, 1.024, 1.280, 1.440 e 1.680 px: sem overflow horizontal nas páginas testadas; nenhum erro ou warning no console do navegador.

### Decisões e limitações de SEO

- Permanecem 17 temas `READY_INDEX` e 59 temas `noindex,follow`; permanecem 3 páginas regionais indexáveis e 61 `DRAFT_PREVIEW`. A confirmação de retirada não é motivo suficiente para indexar cada bairro; nenhuma promoção em massa foi feita.
- A retirada/devolução do Pegue e Monte no Paranaguamirim está confirmada para residentes de Joinville e Araquari. Entrega depende da disponibilidade para data e endereço; eventuais taxas precisam ser consultadas. Isso não confirma disponibilidade de tema nem a logística da Mini Festa na Mesa.
- Não houve acesso autenticado ao Search Console, GA4 ou Google Business Profile. Não foram verificados dados de consultas, tráfego, perfil no Maps nem Core Web Vitals de campo.
- A sessão não disponibilizou Luna 6 Max selecionável nem subagentes desse modelo. A auditoria foi conduzida pelo agente principal; nenhum paralelismo foi simulado.

Capturas desta validação: `screenshots/pr-validation/adhemar-390.png` e `screenshots/pr-validation/adhemar-1440.png`. A pesquisa SEO e seu backlog priorizado ficam documentados em `docs/seo/` na branch isolada, dependente da revisão da branch principal.
