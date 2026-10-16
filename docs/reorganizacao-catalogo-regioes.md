# Revisão corretiva do catálogo e do SEO local

> **Atualização posterior — 14/10/2026:** este relatório registra a revisão corretiva anterior e mantém seus números como histórico. A revisão hiperlocal mais recente substitui o status corrente: Araquari tem 17 referências geográficas (13 bairros, 3 localidades e 1 distrito); entre os 76 temas, 17 estão indexáveis e 59 estão `noindex`; 61 rotas geográficas ficam disponíveis somente no build local de revisão. O preview atual está em `http://127.0.0.1:8091/`. Consulte [Revisão editorial e SEO hiperlocal](revisao-editorial-hiperlocal.md) para contagens, validações, screenshots e pendências atualizadas. Nenhuma dessas alterações locais foi publicada.

Os resultados de teste, a lista de Araquari com 16 nomes, a contagem 19/57 e a referência anterior à porta 8090, descritos nas seções abaixo, pertencem ao snapshot anterior. Para o estado e preview atuais, use o relatório hiperlocal acima.

**Data:** 14/10/2026 · **Branch:** `feat/catalogo-regioes` · **Base local:** `2453d0cd` (merge do PR #2; inclui `f2a2007`, do PR #1).
**Estado na captura de 14/10/2026:** revisão local, aguardando avaliação visual. Os dados de Git nesta seção são históricos; consulte o relatório de prontidão para o estado atualizado.

## Git e escopo

O repositório correto é `lela-decoracoes-site`. A branch está baseada no `origin/main` disponível em cache. `git fetch origin` falhou porque este ambiente não resolve `github.com`; a referência local de `origin/main` continua em `2453d0c`. Os merges dos PRs #1 e #2 aparecem no histórico. A produção não foi alterada.

As regressões vieram da reorganização anterior: o cabeçalho deixou Sobre, Dúvidas e Contato somente no rodapé; os cards faziam zoom como ação principal e 61 temas não tinham rota; os dados herdavam categorias de pastas antigas; os espaços do catálogo e da página Dúvidas não foram reavaliados no conjunto do site. O validador anterior não exigia um destino individual para cada card nem a acessibilidade das páginas institucionais pelo menu.

## Correções locais

- **Navegação:** cabeçalho preserva Início, Serviços, Catálogo, Como funciona e Regiões atendidas; o grupo acessível “Institucional” expõe Sobre a Lela, Dúvidas e Contato. O botão do WhatsApp continua destacado, o logo leva à home e o menu móvel usa breakpoint de 1.060 px. As páginas também permanecem no rodapé.
- **Catálogo:** 95 imagens originais estão organizadas em 76 grupos. Foto, nome e ação “Ver detalhes” levam à rota do tema. O zoom tem controle separado nas páginas individuais. Busca ignora acentos, filtros mantêm hashes antigos e chips formam grade no celular. Espaçamentos e molduras foram ajustados; as imagens quadradas e horizontais preservam a composição, e o catálogo não exibe o botão flutuante sobre os filtros.
- **Categorias:** permanecem cinco filtros, sem divisões por gênero. Três referências sem público infantil evidente — Ana Castela, Dorama e Tropa dos Rosa — foram movidas para “Outros temas”. O filtro “Infantil e personagens” ainda contém 52 opções, todas identificadas como temas infantis, personagens ou animações no acervo. Não foi criada subdivisão por subgênero porque o material não define categorias menores com segurança; a busca por nome é o caminho direto para cada opção.
- **Detalhes:** todos os 76 grupos têm página navegável e imagens do próprio grupo. 19 páginas têm conteúdo editorial revisado, canonical, metadados e indexação; 57 são `noindex,follow` e ficam fora do sitemap até receberem revisão. As páginas pendentes descrevem a referência visual, explicam como consultar e identificam o tema no WhatsApp sem afirmar estoque, preço, composição ou logística. Os nomes de personagens e marcas não indicam parceria ou licença.
- **Geografia:** as páginas de Joinville e Araquari exibem listas expansíveis de referências geográficas (45 registros de Joinville; 16 de Araquari, incluindo o distrito de Itapocu). A lista de Araquari é explicitamente parcial. As listas ajudam a pessoa a identificar sua localidade e não confirmam entrega. Paranaguamirim continua descrevendo o endereço de retirada divulgado; não foram criadas páginas de bairro sem confirmação comercial.
- **Fotos e associações:** os originais não foram removidos nem renomeados. As 95 imagens foram inspecionadas visualmente. Dinossauros e Dinossauros Baby permanecem separados pelas artes distintas. As duas imagens de HUNTR/X foram agrupadas pela correspondência visual. A arte de Brasil Futebol não implica vínculo oficial; a proprietária ainda precisa confirmar a associação da foto chamada “Seleção Brasileira”. A imagem com nome antigo “Rainbow Friends” foi mantida em Tropa dos Rosa após inspeção do símbolo “R” e da arte; o inventário registra essa revisão.

O diretório `/temas/` apresenta as páginas com conteúdo editorial ampliado; `/portfolio/` continua sendo o catálogo completo. Os caminhos anteriores de Gabby, Eu Amo Tetê e Chá Revelação foram preservados.

## Cobertura local e confirmações comerciais

O cadastro geográfico contém 45 bairros de Joinville, apoiados na relação municipal Bairro a Bairro 2026, e 16 referências de Araquari — 15 bairros citados nas fontes cadastradas e o distrito de Itapocu. Araquari não tem uma lista municipal exaustiva confirmada neste cadastro. Apenas as páginas municipais e o fato pontual do endereço de retirada em Paranaguamirim são publicáveis. **SEO individual por bairro continua parcial:** não há evidência de entrega por bairro.

A proprietária precisa confirmar:

1. Quais serviços são oferecidos em cada cidade e se a contratação com retirada cobre outros municípios.
2. Para quais endereços há entrega, se inclui devolução/coleta, como funciona a taxa e quais condições valem por serviço.
3. Se a Mini Festa na Mesa é retirada, entregue ou montada e quem recolhe os itens.
4. Regras atuais de agendamento, retirada, devolução e reserva antes de repetir esses detalhes em páginas novas.
5. O nome comercial de “Animais da floresta” e “Roedor fofo”; se painel e montagem de Brasil Futebol/Seleção Brasileira pertencem à mesma opção.

## Validação executada

| Verificação | Resultado |
| --- | --- |
| `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test` | Aprovado: 96 HTML; 1.427 referências locais a imagens e 1.425 variantes geradas; 2 cidades e 61 registros geográficos; 3 páginas locais e 19 páginas de tema indexáveis. |
| Sintaxe JavaScript/CJS e `git diff --check` | Aprovados após a atualização documental final. |
| Páginas de tema no preview | 76/76 responderam HTTP 200; cada uma tem um H1. 19 têm `index,follow` e estão no sitemap; 57 têm `noindex,follow` e estão fora dele. |
| Jornada Playwright no build final | 11 verificações: home → catálogo → foto Bluey → página com conteúdo próprio → zoom separado e fechamento por Escape → CTA contextual sem envio → detalhe de Ana Castela, antes sem rota → Sobre, Dúvidas e Contato pelo menu móvel. |
| Responsividade Playwright | 56 combinações (14 rotas × 390, 768, 1.024 e 1.440 px): sem overflow horizontal, erro JavaScript ou imagem carregada quebrada. Espaço entre hero e busca do catálogo em 1.440 px: 64 px. |
| Filtros e navegação por teclado | Busca sem acento, hash legado e alteração de filtro sem recarga aprovados. Botão do menu e dropdown institucional funcionam com teclado; lightbox prende o foco, fecha com Escape e devolve o foco ao botão de zoom. |
| Localidades | As páginas exibem 45 itens de Joinville e 16 de Araquari; Araquari identifica Itapocu como distrito e explica que a lista é parcial. A lista declara que não confirma entrega. |
| Sitemap, canonical, metadados, JSON-LD, breadcrumbs e links | Aprovados pelo validador de produção durante o build; rotas `noindex` não entram no sitemap. |

Não houve auditoria WCAG completa ou teste com leitor de tela. Os checks de imagem verificam referências locais no build e imagens carregadas nas rotas testadas; não são métricas de campo. GA4, Search Console e Core Web Vitals de campo não foram acessados.

## Capturas do build final

As capturas `corrective-final/` foram feitas no preview local atualizado em 14/10/2026. A produção continua sem alteração.

- [Home mobile, 390 px](screenshots/catalogo-regioes/corrective-final/home-390.png)
- [Catálogo mobile, início, 390 px](screenshots/catalogo-regioes/corrective-final/catalog-top-390.png)
- [Cards do catálogo mobile, 390 px](screenshots/catalogo-regioes/corrective-final/catalog-cards-390.png)
- [Catálogo desktop, 1.440 px](screenshots/catalogo-regioes/corrective-final/catalog-1440.png)
- [Bluey mobile, 390 px](screenshots/catalogo-regioes/corrective-final/bluey-390.png)
- [Ana Castela mobile, 390 px](screenshots/catalogo-regioes/corrective-final/ana-castela-390.png)
- [Dúvidas mobile, 390 px](screenshots/catalogo-regioes/corrective-final/duvidas-390.png)
- [Joinville mobile, 390 px](screenshots/catalogo-regioes/corrective-final/joinville-390.png)
- [Araquari mobile, 390 px](screenshots/catalogo-regioes/corrective-final/araquari-390.png)
- [Lista geográfica de Araquari expandida](screenshots/catalogo-regioes/corrective-final/araquari-localidades-lista.png)

O preview atual é servido por HTTP estático em `http://127.0.0.1:8090/`, limitado a loopback e apontando para o build validado em `/tmp/lela-catalogo-review.d4zKAV/site`. Ele respondeu 200 na home, no catálogo e em detalhes. As portas 8080 e 8081 estavam ocupadas; nenhum processo alheio foi encerrado. O servidor deve permanecer ativo durante a avaliação visual.

## Acompanhamento do plano

| Item | Estado | Ação ou evidência pendente | Depende da proprietária |
| --- | --- | --- | --- |
| SEO por cidade | CONCLUÍDO | Páginas de Joinville e Araquari integradas a serviços, catálogo e retirada; logística permanece consultável por endereço. | Confirmação comercial periódica |
| SEO por bairro | PARCIAL | Confirmar cobertura por serviço/endereço antes de publicar páginas; Paranaguamirim continua sendo página do ponto de retirada. | Sim |
| Páginas de temas | PARCIAL | 76 detalhes navegáveis; revisar editorialmente as 57 páginas noindex antes de indexá-las. | Sim para nomes e fatos comerciais incertos |
| Otimização do portfólio | CONCLUÍDO | Agrupamento visual, busca, filtros, links de detalhe e WhatsApp; restam duas identificações e a associação Brasil Futebol. | Sim para confirmações |
| Concorrentes | PARCIAL | Pesquisa pública anterior é qualitativa; atualizar ofertas e sites locais com evidência pública datada, sem métricas presumidas. | Não |
| Palavras-chave | PARCIAL | Termos seguem hipóteses sem volumes confiáveis; validar com consultas e impressões do Search Console. | Acesso à conta ajuda |
| GA4 e conversões | BLOQUEADO | Fornecer ID real, definir consentimento e aprovar eventos sem dados pessoais. | Sim, acesso/decisão |
| Search Console | BLOQUEADO | Conceder acesso de leitura para cobertura, consultas, sitemap e CWV. | Sim, acesso |
| Google Business Profile / Maps | BLOQUEADO | Confirmar perfil e acesso para revisar nome, contato, endereço e serviços. | Sim, acesso |
| Core Web Vitals | PARCIAL | Obter LCP, INP e CLS de campo; complementar com laboratório e registrar fonte/data. | Search Console ajuda; dados de campo externos dependem de acesso |
| GEO/AEO | PARCIAL | Conteúdo e estrutura técnica respondem dúvidas verificáveis; não há garantia de recomendação ou posicionamento em IA. | Não para revisão técnica |
| Visibilidade em buscadores com IA | NÃO INICIADO | Registrar consultas, data, resposta e fonte em buscas reproduzíveis. | Não, salvo serviços autenticados |
| Acessibilidade | PARCIAL | Menu e lightbox testados por teclado; faltam WCAG automatizado e leitor de tela. | Não |
| Publicação desta revisão | NÃO INICIADO | Aguardar aprovação visual; então revisar diff, sincronizar remoto, preparar PR e acompanhar Pages. | Sim, aprovação do proprietário |
