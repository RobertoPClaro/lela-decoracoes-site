# Revisão editorial e SEO hiperlocal

**Data:** 14/10/2026 · **Branch:** `feat/catalogo-regioes` · **Base local:** `2453d0c`
**Estado na captura de 14/10/2026:** trabalho local para revisão, antes da preparação do PR. O estado atual está registrado no adendo de prontidão de 15/10/2026.

## Estado da branch

O repositório usado é `lela-decoracoes-site`, na branch `feat/catalogo-regioes`. As alterações preexistentes foram preservadas. O histórico local contém os merges #1 (`f2a2007`) e #2 (`2453d0c`). A referência disponível de `origin/main` ainda é `2453d0c`; `git fetch origin` falhou porque o ambiente não consegue resolver `github.com`. Não foi possível verificar se há commits remotos posteriores.

O servidor que havia sido usado em `127.0.0.1:8090` não estava ativo no início desta revisão. O preview atualizado está servido em `http://127.0.0.1:8091/`, limitado a loopback e apontando para o build local de revisão. A página inicial, o catálogo, rotas de tema e rotas geográficas foram abertas pelo navegador de teste e responderam HTTP 200.

## Decisões de publicação

| Conjunto | Cadastro | Gerado no build público | Indexável / sitemap | Apenas no build local de revisão |
| --- | ---: | ---: | ---: | ---: |
| Joinville | 45 bairros da publicação municipal de 2026 | Página da cidade e ponto de retirada no Paranaguamirim | 2 páginas locais | 44 rotas de bairro `DRAFT_PREVIEW` |
| Araquari | 17 referências geográficas: 13 nomes usados como bairros em fontes municipais, 3 localidades/comunidades e o distrito de Itapocu | Página da cidade | 1 página local | 17 rotas `DRAFT_PREVIEW` |
| Temas | 76 opções do catálogo | 76 detalhes para consulta | 17 temas | 59 detalhes `noindex,follow` seguem acessíveis ao público, fora do sitemap |

As páginas municipais e o ponto de retirada são as **3 páginas locais indexáveis**. Nenhuma rota individual dos outros bairros/localidades é gerada no build público. `DRAFT_PREVIEW` tem `noindex,follow`, não recebe schema `Service`, não entra no sitemap e só é gerado com `LELA_LOCAL_REVIEW=1`. A cidade pode listar links para esses rascunhos apenas nesse build de revisão.

Para conferir Araquari, a lista municipal do SINE usa a coluna “Bairro” para nomes como Areias Pequenas, Centro, Itinga, Jacu, Porto Grande e Volta Redonda. O portal municipal de turismo chama Guamiranga de bairro e descreve a Barra do Itapocu como região. Uma proposição legislativa da Câmara cita Jacu e Morro Grande como localidades no território de Itapocu; como a fonte é uma proposição e há divergência com a tabela do SINE, Jacu permanece classificado como localidade pendente, e a vigência/classificação de Morro Grande também precisa de confirmação. Itapocu segue como distrito, separado dos bairros. Esse inventário não afirma que a relação é exaustiva nem define limites legais.

Fontes geográficas consultadas:

- [Joinville Bairro a Bairro 2026 — Prefeitura de Joinville](https://www.joinville.sc.gov.br/publicacoes/joinville-bairro-a-bairro/)
- [SINE Araquari — lista municipal de vagas por bairro, fevereiro de 2026](https://araquari.atende.net/cidadao/noticia/sine-araquari-divulga-novas-vagas-de-emprego-nesta-sexta-feira)
- [SINE Araquari — lista municipal de vagas por bairro, julho de 2026](https://araquari.atende.net/cidadao/noticia/sine-de-araquari-divulga-37-vagas-de-emprego-nesta-sextafeira-1007)
- [Portal Municipal de Turismo — Roteiros de Araquari](https://turismo.araquari.sc.gov.br/roteiros-municipais/)
- [Câmara de Araquari — proposição sobre a Subprefeitura do Itapocu, 2023](https://www.cvaraquari.sc.gov.br/proposicoes/Projetos-de-Lei-Complementar-Executivo/2023/1/0/12168)

## Conteúdo e informações comerciais

O texto de Joinville agora começa pelo processo de escolha e consulta e separa o endereço de retirada da eventual entrega. A página de Araquari informa que o atendimento municipal é declarado pela empresa, mas que o ponto de retirada fica em Joinville e que a logística para cada endereço deve ser confirmada. As duas páginas têm três FAQs visíveis e correspondentes ao JSON-LD.

O Pegue e Monte é descrito como retirada, transporte, montagem pela cliente e devolução conforme combinado. Na Mini Festa na Mesa, a página agora pede confirmação sobre composição, montagem, entrega e retirada; esses pontos não são inferidos do nome do serviço. O cadastro comercial não afirma entrega em nenhum bairro nem montagem profissional.

A revisão cobre as páginas institucionais, os serviços, a homepage, catálogo, diretório de temas, cidades e ponto de retirada, além das 76 rotas de detalhe. Em cada tema foram conferidos nome/slug, associação de imagem, H1, metadados, indexação e CTA. Somente 17 têm conteúdo editorial individual sustentado pelo acervo; as outras 59 seguem acessíveis como detalhe para consulta, mas `noindex` até receberem apuração e texto próprios. Isso não equivale a uma aprovação editorial completa dessas 59 páginas.

As 61 páginas geográficas do preview usam um modelo de revisão explícito: dizem que a referência territorial não comprova cobertura, informam o ponto de retirada divulgado, orientam o que enviar para consulta e abrem o WhatsApp com cidade e localidade preenchidas. O texto compartilhado é intencional e as páginas não são candidatas a indexação enquanto não houver confirmação comercial e material realmente próprio.

### Exemplos editoriais

| Antes | Depois |
| --- | --- |
| “Referências geográficas parciais, reunidas de fontes cadastradas; a lista não é exaustiva. Ela não confirma entrega ou cobertura comercial em Araquari.” | “Esta relação reúne nomes citados em notícias municipais, turismo e documentos públicos; não é um cadastro municipal completo. Ela ajuda a identificar a localidade, mas não confirma entrega.” |
| “A Lela Decorações informa atendimento em Araquari com Pegue e Monte e Mini Festa na Mesa. Consulte o tema e a data e confirme as condições para o endereço da comemoração.” | “A Lela informa atendimento em Araquari com Pegue e Monte e Mini Festa na Mesa. A retirada divulgada fica em Joinville; para uma festa em Araquari, envie o endereço e a data para confirmar se a logística é viável antes de reservar.” |
| Brasil Futebol estava marcado como revisado, embora a própria FAQ dissesse que a associação comercial da foto “Seleção Brasileira” precisava de confirmação. | O detalhe continua navegável para consulta, mas está em `noindex,follow` e fora do sitemap até a proprietária confirmar a associação. A mesma correção foi aplicada a Tropa dos Rosa, cuja segunda imagem também tem associação pendente. |

## Matriz editorial

| Página ou conjunto | Problema identificado | Correção | Evidência | Estado |
| --- | --- | --- | --- | --- |
| `/` | A jornada precisava explicar o próximo passo sem tratar disponibilidade como garantida. | Mantidos links entre catálogo, serviços, cidades e atendimento; copy continua orientando a consultar data e logística. | `src/index.njk`; catálogo e serviços são dados locais. | REVISADO |
| `/servicos/`, `/pegue-e-monte/` | Risco de confundir serviço com montagem/entrega incluída. | Pegue e Monte distingue montagem pela cliente da logística eventual, que precisa de consulta. | `src/pegue-e-monte/index.njk`; FAQ comercial. | REVISADO |
| `/mini-festa-na-mesa/` | O site não tinha confirmação para presumir montagem no local, entrega ou retirada desse formato. | Incluída orientação para confirmar composição, montagem e logística antes de reservar; nova FAQ visível. | `src/mini-festa-na-mesa/index.njk`; `src/_data/faqs.cjs`. | CORRIGIDO; confirmação da operação pendente |
| `/festas-infantis/`, `/cha-de-bebe/`, `/cha-revelacao/` | As páginas orientavam a escolha do tema, mas composição e disponibilidade variam. | Mantida linguagem de referência e consulta, sem prometer estoque ou itens fixos. | Templates e CTAs; links do catálogo. | REVISADO |
| `/portfolio/`, `/temas/` | As imagens são referências, não prova de estoque, composição ou trabalho em determinada localidade. | Mantidos agrupamentos do catálogo e links para detalhes; temas noindex ficam fora do diretório editorial e do sitemap. | `portfolio.cjs`, `themes.cjs`, templates e validador. | REVISADO |
| 76 rotas `/temas/*/` | 2 páginas estavam indexáveis apesar de associações de fotos ainda pendentes; outras 57 tinham conteúdo genérico para consulta. | 17 permanecem indexáveis; Brasil Futebol e Tropa dos Rosa foram rebaixadas, totalizando 59 `noindex` (as 57 anteriores mais as 2 reclassificadas). Todas preservam detalhe e CTA contextual. | Cadastro de temas, inventário, metadados, sitemap e JSON-LD validados. | 17 INDEXÁVEIS; 59 NOINDEX |
| `/regioes-atendidas/` | Precisava separar atendimento municipal de entrega por bairro. | Mantida explicação de retirada e consulta por endereço, sem lista de entrega presumida. | `src/regioes-atendidas/index.njk`; endereço de Contato. | REVISADO |
| `/regioes-atendidas/joinville/` | Texto anterior era curto e podia deixar dúvida sobre retirada e entrega. | Explicados o ponto no Paranaguamirim, o passo de consulta e os dados que a cliente deve enviar; três FAQs. | Cadastro da cidade e endereço de retirada divulgado pela empresa. | CORRIGIDO |
| `/regioes-atendidas/araquari/` | Texto não deixava explícito que Araquari não tem base de retirada divulgada. | Explicado atendimento municipal declarado, retirada em Joinville e confirmação de logística por endereço; três FAQs. | Cadastro comercial da cidade e endereço de retirada divulgado. | CORRIGIDO |
| Paranaguamirim | O endereço de retirada poderia ser interpretado como entrega em todo o bairro. | Mantido como ponto de retirada; a página esclarece que isso não confirma entrega no bairro. | `locations.cjs` e página de contato. | REVISADO |
| 61 demais rotas geográficas | Sem comprovação de atendimento, as páginas públicas poderiam virar doorway ou prometer cobertura. | Rotas `DRAFT_PREVIEW` geradas apenas para revisão local, com noindex e fora do sitemap. | Registro territorial e ausência de confirmação comercial por bairro. | PREVIEW; publicação bloqueada por confirmação |
| `/como-funciona/`, `/duvidas/` | Condições sobre reserva, devolução e pagamento exigem redação consistente; montagem da Mini Festa era uma dúvida sem resposta. | Mantidas regras já publicadas e incluída pergunta sobre montagem/entrega/retirada da Mini Festa. | `como-funciona/index.njk`, `faqs.cjs`; a operação deve reconfirmar regras que mudam. | REVISADO; atualização comercial periódica pendente |
| `/sobre/`, `/contato/`, rodapé e menus | Informações institucionais e endereço precisam permanecer fáceis de localizar e consistentes. | Mantidos acessos principais, endereço divulgado, telefone e canal de contato centralizados. | `site.cjs`, cabeçalho, rodapé e contato. | REVISADO |
| `/parceiros/`, `/politica-de-privacidade/` | Não foi identificado conteúdo comercial de bairro a expandir. | Páginas preservadas; nenhum tracking novo foi incluído. | Templates existentes; nenhuma conta externa acessada. | REVISADO |

O inventário [completo de temas](inventario-catalogo-temas.md) lista os 76 grupos, arquivos associados, categoria, rota e estado individual.

## SEO técnico, GEO e AEO

- Cidades e Paranaguamirim mantêm title, description, H1, canonical, breadcrumbs e estados explícitos de indexação.
- Os rascunhos têm canonical de rota e `noindex,follow`; não produzem schema `Service`, não entram em `site.sitemapPaths` e não são listados como páginas indexáveis em `/temas/` ou `llms.txt`.
- O `Service.areaServed` permanece restrito a Joinville e Araquari nos registros de cidade; detalhes de bairro sem confirmação não têm esse schema.
- `FAQPage` foi mantido somente quando há perguntas e respostas visíveis. O teste compara conteúdo visível com JSON-LD.
- Nomes de personagens e clubes identificam referências do acervo; não foram adicionadas alegações de parceria ou licença.
- Temas e bairros não geram combinações automáticas entre si.

## Testes e preview

`SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test` passou nesta revisão: build público com 96 HTML, 1.427 referências locais de imagem e 1.425 derivados gerados; 2 cidades e 62 referências geográficas; 3 páginas locais indexáveis; 17 páginas de tema indexáveis. `git diff --check` e `node -c` em todos os arquivos `.js` e `.cjs` também passaram.

O build de revisão com `LELA_LOCAL_REVIEW=1` foi validado separadamente: 157 HTML, 61 páginas geográficas `DRAFT_PREVIEW`, todas com `noindex,follow` e fora do sitemap, além das 3 páginas locais indexáveis e dos 17 temas indexáveis. O navegador percorreu as 76 rotas de tema (76/76 HTTP 200, metadados e CTA contextualizados; 17 `index,follow`, 59 `noindex,follow`) e as 62 rotas listadas pelas páginas municipais (45 de Joinville, 17 de Araquari; 61 prévias e Paranaguamirim como ponto de retirada publicado).

A jornada Playwright no celular passou: menu → catálogo → busca por Bluey → clique na imagem → detalhe com texto próprio → zoom pelo botão separado → Escape fecha e devolve o foco → CTA abre o WhatsApp com Bluey no texto (sem enviar mensagem) → Sobre, Dúvidas, FAQ por teclado e Contato. Busca/filtro e menu mobile funcionaram, sem erros JavaScript de página. Em 28 combinações de 7 páginas e 4 larguras (390, 768, 1.024 e 1.440 px), não houve overflow horizontal nem imagens carregadas quebradas.

As rotas principais, os bairros de amostra e os arquivos CSS/JS foram consultados no navegador e responderam HTTP 200. Isso comprova o preview no ambiente de navegador; não mede desempenho de campo nem substitui avaliação visual da proprietária.

Capturas feitas no build de revisão:

- [Homepage, desktop 1.440 px](screenshots/seo-hiperlocal/home-1440.png)
- [Catálogo, desktop 1.440 px](screenshots/seo-hiperlocal/catalogo-1440.png)
- [Tema Bluey, mobile 390 px](screenshots/seo-hiperlocal/bluey-390.png)
- [Joinville, mobile 390 px](screenshots/seo-hiperlocal/joinville-390.png)
- [Araquari, mobile 390 px](screenshots/seo-hiperlocal/araquari-390.png)
- [Aventureiro, mobile 390 px](screenshots/seo-hiperlocal/aventureiro-390.png)
- [Dúvidas, mobile 390 px](screenshots/seo-hiperlocal/duvidas-390.png)

Não houve auditoria WCAG completa nem teste com leitor de tela. As imagens foram checadas por referências locais no build e carregamento nas rotas responsivas; Core Web Vitals de campo não foram obtidos.

Comandos de reprodução:

```sh
SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test
LELA_LOCAL_REVIEW=1 SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm run build:review
LELA_LOCAL_REVIEW=1 SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ node scripts/validate-build.cjs
python3 -m http.server 8091 --bind 127.0.0.1 --directory dist
```

## Pendências da proprietária

1. Confirmar entrega por endereço/bairro, eventual coleta na devolução, taxas e diferenças por serviço. Até lá, nenhuma rota de bairro será publicada.
2. Confirmar se a Mini Festa na Mesa inclui montagem no local e como ficam entrega, retirada e recolhimento dos itens.
3. Confirmar se o painel e a montagem “Seleção Brasileira” pertencem à mesma opção Brasil Futebol.
4. Confirmar a associação comercial de “Tropa dos Rosa” com a imagem que mantém o nome antigo de arquivo Rainbow Friends.
5. Confirmar a classificação territorial atual de Jacu e Morro Grande e obter uma relação municipal completa de Araquari, se disponível.
6. Revalidar com a proprietária as regras contratuais de entrada, devolução, taxa por atraso e cancelamento antes de reaproveitá-las em páginas novas.

## Navegação e catálogo nas páginas locais — revisão de 14/10/2026

- O menu principal agora mostra, nesta ordem, Início, Serviços, Catálogo, Como funciona, Sobre a Lela, Dúvidas, Regiões atendidas e Contato; o botão de disponibilidade permanece em destaque. No celular, os oito links aparecem individualmente. O menu muda para o modo compacto até 1.140 px.
- As listas geográficas seguem em ordem alfabética considerando acentos. Bairros aparecem apenas pelo nome; localidades e o distrito de Itapocu mantêm uma etiqueta discreta com sua classificação.
- As páginas das cidades exibem uma seleção editorial fixa de oito temas; as páginas de localidades exibem seis. Joinville e Araquari usam a mesma curadoria, assim como os bairros de cada cidade, porque não há dados de preferência por região. A curadoria inclui Safari Baby, Bluey, Dinossauros, Borboletas e Flores, Happy Birthday e Chá Revelação; as páginas municipais também incluem Toy Story e Corinthians.
- A seleção só aceita temas revisados, indexáveis e com imagem associada ao grupo correto. Ela sinaliza consulta necessária; não representa estoque, disponibilidade na data, entrega ou montagem. Todos os links de tema mantêm o canonical da página sem parâmetros.
- Os links levam `cidade`, `localidade` e `servico` no endereço para manter o contexto da navegação. O JavaScript confere cidade e localidade no cadastro antes de contextualizar os dois CTAs do tema e a ação de WhatsApp da galeria. O acesso direto ao tema mantém a mensagem padrão. Nenhuma mensagem foi enviada durante os testes.
- Joinville continua com 45 bairros cadastrados. Araquari continua com 17 referências: 13 classificadas como bairros, três como localidades e Itapocu como distrito. A cidade e os bairros ainda sem confirmação comercial não ganharam status de atendimento.
- O ponto 8091 não aceitou novo bind; também não respondeu por HTTP em `127.0.0.1`. Nenhum processo foi encerrado. O preview atualizado está em `http://127.0.0.1:8092/`, limitado a loopback e servido do `dist` recém-gerado.

### Validação desta revisão

- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`: aprovado. Build público com 96 HTML, 1.427 imagens locais referenciadas (1.425 variantes geradas), três páginas locais indexáveis, 17 temas indexáveis e nenhuma rota `DRAFT_PREVIEW`.
- Build de revisão Eleventy + validador: aprovado. 157 HTML, 61 rotas geográficas `DRAFT_PREVIEW`, todas `noindex,follow` e fora do sitemap; as 17 páginas de tema indexáveis e os estados de SEO existentes foram preservados.
- `node --check` nos arquivos JavaScript/CJS alterados e `git diff --check`: aprovados.
- Playwright: a jornada Joinville → Aventureiro → Safari Baby → consulta preservou tema, bairro e cidade. Araquari → Itinga → Bluey fez o mesmo; Bluey aberto diretamente funcionou sem contexto. Canonical não mudou e os testes apenas inspecionaram os links do WhatsApp.
- Menu testado em 390, 768, 1.024, 1.280, 1.440 e 1.680 px. Sem quebra de linha no desktop, dropdown Institucional ou overflow; no celular, todos os links e o botão ficaram visíveis, e Escape fechou o menu.
- Homepage, catálogo, serviços, páginas institucionais, páginas locais de amostra, Bluey, Safari Baby, CSS e JavaScript responderam HTTP 200 no preview. Não houve erros JavaScript de página. As imagens lazy-loaded dos cards foram verificadas após rolagem.

Capturas desta revisão:

- [Joinville com navegação e temas, desktop 1.440 px](screenshots/catalogo-local/joinville-1440.png)
- [Aventureiro com seleção de temas, celular 390 px](screenshots/catalogo-local/aventureiro-390.png)

Arquivos desta atualização: `src/_data/localCatalog.cjs`, `src/_data/site.cjs`, `src/_data/locations.cjs`, `src/_includes/partials/header.njk`, `src/_includes/partials/local-theme-selection.njk`, `src/_includes/partials/local-theme-card.njk`, `src/_includes/partials/whatsapp-cta.njk`, `src/regioes-atendidas/localidade.njk`, `src/temas/tema.njk`, `src/assets/css/styles.css`, `src/assets/js/main.js` e `scripts/validate-build.cjs`, além das duas capturas acima.

Esta atualização permanece local na branch de trabalho. Não houve commit, push, PR ou deploy. A confirmação comercial de entrega por endereço e a autorização para publicar páginas de bairro continuam pendentes.

## Polimento final de conteúdo e mobile — 14/10/2026

- Encurtei títulos e introduções das 61 páginas geográficas em revisão. O texto agora convida a conhecer o catálogo e consultar data e logística, sem sugerir que o bairro tenha entrega ou montagem confirmada.
- Incluí no topo das páginas um botão de consulta com o bairro/cidade na mensagem e um atalho para os temas. Mantive os seis temas curados por localidade e oito por cidade; nomes, imagens, links e indexação não foram alterados.
- Reduzi o espaçamento vertical e a escala do H1 regional em telas pequenas. A lista de Araquari mantém o aviso de que pode estar incompleta; os textos de navegação explicam a entrega em linguagem direta.
- Removi repetições entre a apresentação, o bloco logístico e as FAQs. A retirada fica explicada no bloco próprio; as FAQs se concentram em consultar um tema e verificar entrega.
- O aviso de revisão local continua aparecendo apenas no build `LELA_LOCAL_REVIEW=1`. Sua redação informa que o atendimento precisa ser confirmado, sem usar termos administrativos.

Exemplos editoriais:

- Antes: “Aventureiro está cadastrado como bairro de Joinville [...] essa referência geográfica não confirma entrega nem montagem nesse endereço.”
- Depois: “Explore os temas do catálogo e envie à Lela a data e o endereço da festa para consultar as opções e a logística.”
- Antes: “A lista é apenas geográfica. Para verificar a logística [...]”
- Depois: “O nome da localidade ajuda a identificar onde será a festa, mas não confirma entrega. Informe à Lela o endereço, a data e o serviço para consultar as condições.”

Validação desta rodada:

- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`: aprovado; build público validou 96 HTML, 1.427 referências de imagem, 3 páginas regionais indexáveis e 17 temas indexáveis; nenhuma rota draft foi gerada.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm run build:review`: aprovado; 157 HTML, com 61 páginas `DRAFT_PREVIEW`, todas fora do sitemap e sem indexação, conforme o validador.
- Playwright em 390, 768, 1.024 e 1.440 px: seis cards, CTA visível e nenhum overflow horizontal. As jornadas Aventureiro → Safari Baby e Araquari → Itinga → Bluey preservaram tema e localidade no WhatsApp. Bluey aberto diretamente também funcionou sem contexto.
- Homepage, Joinville, Araquari, Aventureiro, Itinga e Bluey responderam HTTP 200; CSS e JavaScript do build atualizado responderam HTTP 200. Screenshot de viewport mobile conferido visualmente durante a sessão.
- O validador foi ajustado para aceitar o aviso editorial conciso de que a relação de Araquari pode estar incompleta; a validação de entrega não confirmada permanece.

Pendência comercial: confirmar, por endereço e data, se há entrega, eventual taxa e quais condições se aplicam a cada serviço. Até essa confirmação, os 61 bairros/localidades em revisão permanecem fora do build público e do sitemap. O preview atualizado está em `http://127.0.0.1:8092/`.

Arquivos tocados nesta rodada: `src/_data/locations.cjs`, `src/regioes-atendidas/localidade.njk`, `src/regioes-atendidas/localidade.11tydata.cjs`, `src/_includes/partials/local-theme-selection.njk`, `src/assets/css/styles.css` e `scripts/validate-build.cjs`.

## Catálogo completo por localidade e FAQ avançado — 14/10/2026

- As duas páginas de cidade e as 62 páginas geográficas do build de revisão agora reutilizam o catálogo central e renderizam os 76 grupos em uma única grade por página. A curadoria anterior continua no topo da ordem; as opções restantes seguem a ordem estável do catálogo. Não há cópia de cadastro por bairro nem combinações de URL tema × localidade.
- Busca sem diferença de acento ou caixa e filtros por categoria/“Com exemplo de montagem” consideram todos os 76 grupos. O HTML contém links estáticos para as 76 páginas individuais; com JavaScript, 12 cards aparecem inicialmente e “Ver mais” abre o restante. Sem JavaScript, todos os 76 links ficam visíveis e os controles de filtro permanecem ocultos.
- Os cards usam uma imagem real associada ao grupo, título, categoria e situação do acervo. A presença no catálogo não afirma estoque, disponibilidade na data, entrega ou montagem. Temas `noindex` continuam acessíveis pelo catálogo e fora do sitemap.
- `faqs.cjs` mantém 12 respostas em uma fonte central com identificador, categoria, páginas-fonte, status de confirmação e serviços aplicáveis. `regionalFor()` seleciona 11 perguntas para cada cidade e 9 para cada bairro/localidade; as perguntas de reserva, entrega, retirada e escolha de tema recebem o contexto geográfico, mas as respostas continuam compartilhadas e coerentes. Uma resposta nova esclarece que a presença no catálogo não garante disponibilidade ou composição do kit.
- O `FAQPage` só é emitido para as páginas regionais indexáveis, com as perguntas e respostas visíveis correspondentes. As 61 páginas de revisão não recebem schema de serviço local; permanecem `DRAFT_PREVIEW`, `noindex` e fora do sitemap público.
- O link do card leva à URL canônica do tema com parâmetros simples `cidade`, `localidade` e `servico`. A página do tema valida esses valores contra o cadastro e atualiza os dois CTAs do próprio tema e o CTA da galeria. Testes cobriram Adhemar Garcia → Bluey, Aventureiro → Safari Baby e Itinga/Araquari → Dinossauros. O acesso direto a Bluey mantém a mensagem padrão. Nenhuma conversa foi enviada.

Exemplo editorial da nova FAQ:

> **Pergunta:** Posso consultar um tema do catálogo para uma festa na região de Aventureiro, em Joinville?
> **Resposta:** Você pode indicar uma das opções exibidas no catálogo. A presença de um tema no acervo não confirma disponibilidade para a data nem a composição do kit; a Lela verifica esses detalhes antes da reserva.

### Estados e contagens

- Catálogo: 76 temas/grupos e 95 imagens originais; 76 rotas individuais continuam disponíveis, com 17 páginas de tema indexáveis e 59 `noindex`.
- Geografia: 45 bairros cadastrados em Joinville e 17 referências em Araquari (13 bairros, três localidades e um distrito, conforme o cadastro atual). Esses números territoriais não significam cobertura de entrega.
- Build de produção (`SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`): 96 HTML, três páginas regionais indexáveis, 17 temas indexáveis e nenhuma rota `DRAFT_PREVIEW`.
- Build de revisão (`SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm run build:review`): 157 HTML, incluindo 61 rotas `DRAFT_PREVIEW`; três páginas regionais permanecem indexáveis. O validador confirmou os drafts fora do sitemap e preservou os estados de indexação dos temas.
- As 64 páginas regionais com catálogo (duas cidades + 62 referências geográficas) têm 76 cards cada: 4.864 instâncias de card geradas para a revisão local. Os 61 drafts são conteúdo de prévia; não serão publicados pelo build público padrão.

### Desempenho local e testes

- Página de Adhemar Garcia: 197.823 bytes HTML bruto e 16.602 bytes em gzip estimado localmente. Joinville: 197.408 bytes bruto e 17.911 bytes gzip estimado. Uma medição anterior reproduzível do HTML de seis cards não estava disponível nesta rodada; portanto, não é apresentada uma diferença “antes/depois” medida.
- `main.js`: 15.057 bytes bruto / 3.951 gzip; CSS: 43.547 / 8.164 bytes. Em navegador mobile de laboratório, o HTML contém os 76 elementos de imagem, mas, ao navegar até o catálogo, foram solicitadas 12 imagens de card (mais um recurso de imagem inicial); 12 das 76 imagens do catálogo estavam carregadas. As imagens são lazy-loaded. Isso não é métrica de campo nem Core Web Vitals.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`: aprovado. Build de revisão e validador: aprovados. `node --check` para JS/CJS em `src` e `scripts`, e `git diff --check`: aprovados.
- Playwright: todas as 76 rotas de tema responderam HTTP 200; busca individual encontrou cada um dos 76 nomes; filtro Futebol mostrou cinco opções e, combinado com “Corinthians”, uma. “Ver mais” expandiu 12 → 76 e “Mostrar menos” recolheu para 12. Com JavaScript desativado, os 76 links continuaram visíveis.
- Playwright em 390, 768, 1.024, 1.280, 1.440 e 1.680 px: não houve overflow horizontal; nove FAQs da página de bairro; acordeão aberto pelo teclado; zero erros `pageerror`. As jornadas de WhatsApp preservaram tema, localidade e cidade; canonical não mudou. As rotas principais, CSS e JS responderam HTTP 200.
- Os validadores de build verificaram canonical, sitemap, robots, JSON-LD, FAQ/schema visível, breadcrumbs, index/noindex e referências de imagens. Nenhuma mensagem real foi enviada.

Capturas do build atualizado:

- [Adhemar Garcia, catálogo mobile 390 px](screenshots/catalogo-bairros-completo/adhemar-catalogo-390.png)
- [Adhemar Garcia, catálogo desktop 1.440 px](screenshots/catalogo-bairros-completo/adhemar-catalogo-1440.png)
- [Busca de Bluey no catálogo local](screenshots/catalogo-bairros-completo/busca-bluey-1440.png)

O preview está sendo servido em `http://127.0.0.1:8093/` pelo build de revisão atualizado. As páginas de cidade e tema mantêm suas URLs canônicas; o teste confirmou HTTP 200 para a home, catálogo, cidades, Paranaguamirim, bairros de amostra, serviços, Dúvidas, CSS e JS.

### Pendências comerciais

1. Confirmar por endereço e data se há entrega ou coleta, taxas e condições para cada serviço. O catálogo regional apenas permite conhecer e consultar os temas.
2. Confirmar se Mini Festa na Mesa inclui montagem, entrega, retirada e recolhimento; até lá, as respostas direcionam a cliente a confirmar o escopo da proposta.
3. Revalidar periodicamente regras contratuais que já aparecem no site (entrada, cancelamento, devolução, atraso, pagamento e danos) com a proprietária antes de alterar ou ampliar sua divulgação.
4. Validar a classificação geográfica incompleta de Araquari com fonte municipal atual. Nenhuma dessas pendências promove os 61 rascunhos para publicação ou indexação.

Esta rodada não altera estados editoriais, não publica bairros adicionais e não muda regras de produção. Não houve commit, push, PR, merge ou deploy.


## Adendo de 14/10/2026 — confirmação comercial atualizada

O responsável confirmou que moradores de todos os bairros de Joinville e Araquari podem contratar Pegue e Monte com retirada e devolução no ponto divulgado no Paranaguamirim. Entrega depende da disponibilidade para a data e o endereço, com eventuais taxas a consultar. Esta confirmação substitui pendências comerciais de elegibilidade registradas nas seções históricas, mas não promove automaticamente os 61 drafts: ainda falta conteúdo local distintivo para indexação individual. As regras da Mini Festa na Mesa continuam independentes. Consulte o relatório atual, com matriz por localidade, em docs/prontidao-seo-hiperlocal-confirmacao-comercial.md.
