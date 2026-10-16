# Estratégia SEO, portfólio e temas — Fase 2

> **Atualização em 14/10/2026:** o documento abaixo preserva o registro da
> implementação inicial da Fase 2 e seus números são históricos. A reorganização
> posterior elevou o catálogo a 76 grupos e as páginas detalhadas a 15. Consulte
> o relatório [Reorganização do catálogo e SEO local](reorganizacao-catalogo-regioes.md)
> para o estado atual, as capturas e a validação da branch `feat/catalogo-regioes`.

Pesquisa e implementação revisadas em **14/10/2026**. O trabalho está na branch
`feat/seo-portfolio-temas`, baseada na `origin/main` atualizada em
`f2a2007fa47a4ad9956f50a036b2041719f23570` (integração do PR #1). O diretório
estava limpo antes da criação da branch. As alterações permanecem fora de
`main` e não foram publicadas em produção.

## Pesquisa de mercado e concorrentes

A pesquisa consultou páginas públicas de empresas e diretórios locais. Não houve
acesso ao Planejador de palavras-chave, Search Console da Lela ou outra fonte de
volume confiável. Portanto, os termos e a dificuldade abaixo são hipóteses de
priorização, não estimativas de buscas mensais nem posições.

| Empresa ou fonte | Evidência pública observada | Oportunidade para a Lela |
| --- | --- | --- |
| [Aprecie Cada Festa](https://apreciecadafesta.com.br/), Joinville | Título e meta description identificam aluguel de mini kits em Joinville. O site organiza catálogo por porte, lista itens e valores, mostra adicionais, inspirações e FAQ, e usa CTA de reserva/WhatsApp. | Explicar melhor o que pode ser consultado em cada formato e responder dúvidas comerciais com fatos confirmados pela operação. Não copiar preços, composição, prazos nem áreas de entrega. |
| [Andressa Arte em Festas](https://andressaarteemfestas.com.br/), Joinville | Título usa “Kit Pegue & Monte”; H1 e meta description citam Joinville. O site apresenta kits, doces e combos, vários CTAs de WhatsApp e informa retirada dos kits. | Diferenciar com clareza Pegue e Monte e Mini Festa na Mesa; fazer o CTA levar o tema visto junto com data e local. As condições da concorrente não foram usadas como condições da Lela. |
| [Ame e Decore Festas](https://www.evepla.com/BR/Joinville/632857656769087/Ame-e-Decore-Festas), Joinville | Perfil em diretório anuncia locação de peças, arcos de balões e outros serviços. Não foi localizada uma página própria atual nesta pesquisa. | Tratar a entrada como sinal de mercado de baixa confiança, não como prova de oferta atual ou concorrência direta. |
| Diretórios de eventos em Araquari | Há anúncios de locação e decoração, mas as páginas consultadas não permitem confirmar, em fonte própria, a operação, disponibilidade ou cobertura atual de cada anunciante. | Manter Araquari como área comercial informada pela Lela; não afirmar exclusividade nem ausência de concorrentes. Validar fornecedores e cobertura por endereço antes de criar páginas de bairro. |

O projeto local da 3G Tapeçaria foi consultado apenas como referência de
organização: separar dado geográfico, evidência comercial e estado de publicação.
Nenhum texto, imagem ou arquivo da 3G foi copiado.

## Matriz de palavras-chave e oportunidades

“Relevância” é uma avaliação comercial qualitativa. “Evidência” indica o que foi
observado publicamente, sem comprovar volume. “Dificuldade” é uma hipótese baseada
na presença de empresas, catálogos e diretórios locais; deve ser revisada com
Search Console ou ferramenta de pesquisa autorizada.

| Grupo e exemplos | Intenção | Relevância | Evidência pública | Material da Lela | Dificuldade estimada |
| --- | --- | --- | --- | --- | --- |
| “Pegue e Monte em Joinville”; “aluguel de decoração de aniversário Joinville” | Contratação do serviço | Alta | Sites locais anunciam Pegue e Monte e aluguel de kits. | Serviços e condições gerais já explicados; fotos e páginas de temas agora apoiam a escolha. | Média/alta |
| “Mini Festa na Mesa Joinville”; “kit pequeno para aniversário Joinville” | Comparar solução e contratar | Alta | Aprecie Cada Festa publica catálogo de mini kits; Lela oferece página própria do serviço. | Página de Mini Festa e acervo visual. Composição específica por tema ainda requer confirmação. | Média |
| “Decoração [tema] Joinville”; “Pegue e Monte [tema] Joinville” | Escolher tema e consultar disponibilidade | Alta | Concorrentes exibem temas e galerias; a busca pública identifica referências locais, sem volume. | Oito páginas piloto apoiadas por imagens existentes. | Média |
| “Pegue e Monte em Araquari”; “decoração de festa Araquari” | Contratação com intenção local | Alta, se a localidade for atendida para a data | A Lela declara atendimento a Araquari; diretórios mostram oferta relacionada, mas a confirmação direta varia. | Página municipal existente e páginas de tema que explicam consulta por cidade/endereço. | Incerta |
| “Decoração [tema] Araquari” | Escolher tema e consultar logística | Média/alta | Hipótese baseada na área atendida declarada; nenhum dado de volume foi obtido. | Páginas de tema citam Joinville e Araquari, sem duplicá-las por cidade. | Incerta |
| “Pegue e Monte no Paranaguamirim”; “decoração no Aventureiro”; “kit no Itinga, Araquari” | Busca hiperlocal | Média, a validar | São exemplos de busca plausíveis, não termos comprovados. A página existente do Paranaguamirim descreve retirada; não promete entrega. | Cadastro geográfico da Fase 1 e material de tema; cobertura bairro a bairro pendente. | Incerta |
| “Decoração para chá de bebê Joinville”; “kit chá revelação em Joinville”; “decoração de aniversário infantil Joinville” | Escolher solução para uma ocasião | Alta | A Lela já apresenta páginas de chá de bebê e chá revelação, e concorrentes anunciam kits para essas ocasiões. | Páginas de ocasião e imagens correspondentes do portfólio; verificar cada tema e logística na data. | Média/incerta |
| “O que vem no kit”; “como reservar”; “como funciona retirada e entrega”; “qual a diferença entre os kits” | Resolver dúvidas antes do contato | Alta | Sites concorrentes publicam composição, processo e FAQs, sinal de que essas dúvidas fazem parte da decisão. | Páginas de serviço, FAQ e CTAs contextualizados; tamanhos, itens e logística continuam sujeitos à confirmação. | Baixa/média |

Não foi atribuído volume nem intenção comprovada a uma combinação de bairro e
tema. Os próximos dados úteis são consultas e impressões da Search Console,
mensagens comerciais categorizadas sem dados pessoais e confirmação da equipe
sobre dúvidas recorrentes.

## Inventário e seleção do portfólio

O catálogo atual possui **95 arquivos de imagem**: 77 imagens de tema em cinco
pastas legadas e 18 exemplos de kits montados na pasta `kits`. Quatorze nomes de
exibição aparecem em grupos repetidos, somando 33 arquivos desses grupos; a
inspeção por hash não encontrou duplicatas byte a byte. O nome do arquivo não é
tratado como prova do tema: a curadoria preserva os mapeamentos existentes de
`src/_data/portfolio.cjs`.

Os filtros foram reorganizados em quatro categorias de linguagem neutra — Festas
infantis, Festas adultas, Temas e ocasiões e Futebol — mantendo um filtro próprio
para Kits montados. A busca textual ignora acentos e combina tema e categoria.
Os hashes antigos de categorias são aceitos como aliases. A galeria separa
legenda e link da ação de ampliar, remove controles interativos aninhados e
envia ao WhatsApp o tema da foto aberta.

| Tema piloto | Material visual aproveitado | Razão da seleção |
| --- | --- | --- |
| Safari Baby | 2 referências de painel e 1 exemplo de kit | Imagens em mais de uma pasta e exemplo montado associado ao tema. |
| Bluey | 1 referência de painel e 1 exemplo de kit | Associação visual e catálogo consistentes. |
| Dinossauros | 1 referência de painel e 2 montagens | Mais de uma apresentação visual no acervo. |
| A Casa Mágica da Gabby | 1 referência de painel e 1 exemplo de kit | Nome de exibição conferido contra o mapeamento do catálogo. |
| Skye — Patrulha Canina | 1 referência de painel e 1 exemplo de montagem | A segunda foto de kit é muito semelhante à primeira; permanece no portfólio, sem duplicar a galeria da página. |
| Toy Story | 1 referência de painel e 1 exemplo de kit | Par de imagens do tema e da montagem. |
| Naruto | 1 referência de painel e 1 exemplo de kit | Par de imagens do tema e da montagem. |
| Corinthians | 1 referência de painel e 1 exemplo de kit | Par de imagens do tema e da montagem. |

Os textos chamam as imagens de **referências do acervo** e as fotos de mesa de
**exemplos de montagem**. Não afirmam que representam festas de clientes, um
trabalho feito em Joinville/Araquari, a composição exata do aluguel ou estoque
para uma data. Imagens originais e nomes de arquivo foram preservados.

## Páginas e arquitetura implementadas

O cadastro `src/_data/themes.cjs` reúne conteúdo próprio e referências às
imagens já catalogadas. Um template Nunjucks e pagination do Eleventy geram as
páginas publicadas; apenas temas com status `PUBLISHED` aparecem no mapa de
links. A arquitetura não cria combinações tema × cidade × bairro. O status de
disponibilidade de cada piloto é `VERIFY_BY_DATE`.

| URL | Conteúdo específico |
| --- | --- |
| `/temas/` | Diretório de temas, consulta de disponibilidade, serviços e cidades atendidas. |
| `/temas/safari-baby/` | Painéis ilustrados e exemplo de montagem Safari Baby. |
| `/temas/bluey/` | Referência do painel e montagem Bluey. |
| `/temas/dinossauros/` | Painel e duas apresentações de montagem. |
| `/temas/casa-magica-da-gabby/` | Painel e exemplo de montagem da Gabby. |
| `/temas/skye-patrulha-canina/` | Painel e uma montagem identificada como Skye; a foto semelhante adicional continua acessível no portfólio. |
| `/temas/toy-story/` | Referência do painel e montagem Toy Story. |
| `/temas/naruto/` | Referência do painel e montagem Naruto. |
| `/temas/corinthians/` | Painel do Corinthians e exemplo de montagem. |

Cada página tem título, descrição, H1, galeria com alt/legendas, FAQ visível,
breadcrumbs, canonical, Open Graph e CTA do WhatsApp com o tema preenchido. Links
apontam para Pegue e Monte, Mini Festa na Mesa, regiões atendidas e diretório de
temas. O menu, rodapé, homepage, portfólio, páginas dos serviços e páginas das
cidades ligam ao diretório. O sitemap deriva as rotas publicadas do cadastro.
O `llms.txt` aponta para o diretório e páginas de tema.

O JSON-LD combina `LocalBusiness`, `Service`, `WebPage`, `BreadcrumbList` e
`FAQPage` onde há perguntas visíveis. `areaServed` permanece em Joinville e
Araquari, conforme a declaração comercial já existente. Nenhum endereço de
bairro, avaliação, preço ou relação oficial com personagens foi acrescentado.

### Revisão editorial e risco de páginas doorway

As oito páginas têm como conteúdo principal imagens específicas do acervo,
descrições do que cada conjunto de fotos mostra e uma pergunta ligada àquele
material. A busca nas oito URLs não gera variações por cidade ou bairro. O
bloco sobre serviços, retirada e consulta por data é compartilhado e não é
tratado como conteúdo exclusivo de cada tema.

Na revisão visual, as duas fotos de montagem da Skye mostraram praticamente a
mesma mesa, com enquadramento diferente. A página ficou com uma montagem e uma
referência de painel; a segunda foto continua no portfólio. As perguntas comuns
de disponibilidade foram removidas das páginas de tema e substituídas por uma
pergunta sobre o material de cada galeria. Não há alegações de parceria,
licenciamento ou vínculo oficial com personagens, marcas ou clube.

O teste de teclado encontrou links do menu móvel recebendo foco enquanto o
menu estava fechado e um nome acessível que não mudava ao abrir. O estado
fechado agora retira o menu da navegação por teclado e o rótulo informa a ação
disponível; Escape fecha o menu e devolve o foco ao botão.

As páginas foram mantidas como um piloto de catálogo visual porque permitem à
visitante identificar e enviar um tema específico à Lela. O acervo não comprova
preço, dimensões, composição de kit ou estoque para uma data; por isso o texto
não afirma esses dados e não se deve ampliar a quantidade de páginas até haver
informação comercial e imagens suficientes. Esta decisão segue a orientação
do [Google Search Central sobre conteúdo útil e feito para pessoas](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
e a definição de [doorway abuse nas políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies).

## Analytics, Maps e visibilidade em IA

- **GA4 e Search Console:** não foi encontrado ID de GA4, GTM ou token de
  verificação no código. A política da Fase 1 informa que o site não usa
  analytics ou cookies de rastreamento. Não foi criado identificador fictício
  nem script. Configurar coleta depende de propriedade e decisão de privacidade
  autorizadas pelo proprietário; eventos não devem incluir nome, telefone, data,
  cidade/bairro ou mensagem do WhatsApp.
- **Google Maps / Perfil da Empresa:** o site público já divulga endereço,
  telefone e link de mapa. A pesquisa exata pelo nome retorna o site, mas não
  confirmou de forma inequívoca um Perfil da Empresa da Lela. O acesso direto ao
  Google Maps não foi disponibilizado pela ferramenta pública usada nesta
  auditoria. Não se conclui que o perfil inexista. O proprietário deve validar
  nome, telefone, endereço e serviços em `business.google.com` e conceder acesso
  de leitura ao perfil e à Search Console para auditoria autenticada; senhas e
  tokens não devem ser enviados na conversa.
- **Respostas de IA:** a busca web pública exibiu o site em consultas de marca e
  serviço. Essa observação não é uma resposta gerada por IA nem comprova citação,
  ranking ou recomendação. Não foi possível obter resultados reproduzíveis de
  ChatGPT, Gemini ou AI Overviews nesta execução. Uma medição futura deve
  registrar mecanismo, data, consulta literal, resposta e fontes citadas, sem
  misturar isso com posições orgânicas.

## Desempenho, responsividade e acessibilidade

O template de imagem existente já gera AVIF, WebP e JPEG responsivos, informa
dimensões e usa carregamento tardio em cartões. As páginas piloto usam a imagem
de destaque em carregamento prioritário e mantêm as demais imagens lazy. A
busca e filtros funcionam sem bibliotecas novas. O lightbox agora mantém o foco
entre fechar/consultar, tem botão contextual de WhatsApp e pode ser fechado com
Escape.

Não há medição de campo de LCP, INP ou CLS disponível no repositório. A consulta
ao relatório público do PageSpeed Insights não foi acessível pela ferramenta
desta execução. Portanto, nenhum valor de Core Web Vitals é declarado como dado
de usuário ou como pontuação de laboratório. A verificação Playwright desta
branch cobriu larguras mobile e desktop e os fluxos de busca, menu, lightbox e
WhatsApp; isso não substitui CrUX, Search Console, Lighthouse ou teste com leitor
de tela.

## Validação

O build de produção e o validador verificam rotas indexáveis a partir do
cadastro, títulos e descrições únicos, um H1, imagens/alt existentes, JSON-LD,
FAQ visível igual ao schema, breadcrumbs, canonical, sitemap, `robots.txt`,
links internos e os CTAs com tema. O validador não depende de um total fixo de
temas, bairros ou imagens; cada tema publicado precisa de conteúdo específico,
imagens associadas ao mesmo tema, FAQ e disponibilidade a confirmar por data.

### Resultados executados

| Verificação | Resultado |
| --- | --- |
| `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test` | Aprovado na revisão final: 28 HTML, 1.425 variantes derivadas, 1.427 referências locais, 2 cidades, 60 bairros, 3 páginas locais e 8 páginas de tema indexáveis. O build validou sitemap, robots, canonical, metadados, JSON-LD, breadcrumbs, FAQs, links e imagens. |
| Sintaxe e `git diff --check` | `node --check` passou para os arquivos JavaScript/CJS alterados; `git diff --check` passou após as correções. |
| Playwright local, 390 × 844 e 1.280 × 800 | As oito páginas de tema foram abertas nos dois tamanhos. Sem overflow horizontal; H1, canonical, FAQ/schema e CTA estavam presentes. As imagens examinadas carregaram sem falha. O console terminou sem erros. |
| Busca e filtros do portfólio | “safári” retornou três imagens sem acento; “sem-resultado-xyz” exibiu o estado vazio e ocultou as duas grades. O filtro Kits montados mostrou 18 itens e Futebol mostrou 5. |
| Hashes antigos do portfólio | `#tema-menina` e `#tema-menino` abriram Festas infantis; `#tema-adulto`, `#tema-diversos` e `#tema-futebol` abriram suas categorias atuais. `#kits-montados` continua apontando para a galeria de kits. |
| Menu móvel e teclado | Links do menu fechado não receberam foco; abrir atualizou o nome acessível para “Fechar menu”; Tab percorreu o menu; Escape fechou e devolveu o foco ao botão. |
| Lightbox e WhatsApp | Alt e legenda corresponderam à foto Bluey; CTA incluiu o tema e a data; Tab percorreu o CTA e voltou ao fechar; Escape fechou e restaurou o foco à foto. CTAs das oito páginas incluíram o nome do tema, a data e o local. |
| URLs existentes e novas | Requisições no servidor estático local retornaram HTTP 200 para 13 rotas existentes e as 9 URLs novas. As nove URLs de tema estavam no sitemap; `robots.txt` apontava para o sitemap. Este teste não consultou o site público. |
| Build com prefixo `/preview/` | `npm test` com origem `https://preview.example.com` passou na rodada anterior à revisão final; não foi reexecutado depois dos ajustes de CSS e teclado. |
| Inspeção pontual da homepage pública em 390 × 844 | Uma execução headless anterior registrou DOMContentLoaded em 849 ms, load em 850 ms, candidato LCP em 924 ms e CLS 0. Foi uma sessão sem throttling, não dado de campo, p75 ou medição oficial de INP. |
| CrUX/Core Web Vitals de campo | Sem medição: faltam dados de CrUX/Search Console. |

Durante a revisão foram corrigidos três problemas comprovados: uma foto de
montagem da Skye quase repetida na página própria; a grade principal que
permanecia no layout acessível quando a busca não tinha resultados; e links do
menu móvel que ainda recebiam foco quando o menu estava fechado. As perguntas
genéricas de disponibilidade também foram substituídas por perguntas baseadas
nas imagens de cada tema.

## Acompanhamento do plano original

| Item | Estado | Próxima ação e evidência faltante | Depende da proprietária? |
| --- | --- | --- | --- |
| Investigar repositório, GitHub e Fase 1 | CONCLUÍDO | `origin/main` confirmado em `f2a2007`; documentação da Fase 1 revisada. | Não |
| Consultar a 3G Tapeçaria como referência | CONCLUÍDO | Padrões técnicos consultados sem alterar nem copiar conteúdo do projeto. | Não |
| SEO por cidade e bairro | PARCIAL | Manter páginas de Joinville, Araquari e Paranaguamirim; antes de publicar mais bairros, confirmar área, logística, taxa e retirada para cada localidade. Falta evidência comercial bairro a bairro. | Sim, para confirmar cobertura e logística |
| Pesquisa de concorrentes | PARCIAL | Complementar fontes primárias atuais para Araquari e confirmar se as ofertas observadas continuam ativas. Faltam fontes diretas de alguns fornecedores; diretórios são evidência secundária. | Não para pesquisa pública; sim para fatos sobre a operação da Lela |
| Palavras-chave | PARCIAL | Exportar consultas, impressões e páginas da Search Console e comparar termos no Planejador de palavras-chave. A matriz atual não tem volumes medidos. | Sim, para conceder acesso às contas |
| Inventário e curadoria de imagens | CONCLUÍDO | 95 arquivos associados ao catálogo; nomes e originais preservados; sem duplicatas byte a byte. A montagem quase repetida da Skye saiu da página de tema e continua no portfólio. | Não; validação de novas associações depende da Lela |
| Otimização do portfólio | CONCLUÍDO | Busca sem acento, filtros, hashes antigos, cards, lightbox acessível por teclado e CTA contextual validados. | Não |
| Páginas de temas | CONCLUÍDO | Diretório e oito páginas temáticas implementados na branch, com fotos identificadas como referências do acervo e disponibilidade confirmada por data. A publicação está separada na linha final. | Não para as páginas atuais; novas informações de kit exigem confirmação |
| Integração entre temas, serviços e localidades | CONCLUÍDO | Links para Pegue e Monte, Mini Festa na Mesa, Joinville, Araquari e regiões atendidas; sem combinações tema × bairro. | Não |
| GEO/AEO técnico | PARCIAL | Conteúdo claro, Schema.org, `llms.txt` e links foram implementados. Falta observar respostas e citações reais após publicação; não há garantia de presença em IA. | Não; depende de publicação para medir |
| GA4 e conversões | BLOQUEADO | Informar ID da propriedade, escolher configuração de consentimento e aprovar eventos sem dados pessoais. Faltam conta autorizada e decisão de privacidade. | Sim |
| Search Console | BLOQUEADO | Conceder acesso de leitura para validar sitemap, indexação e consultas. Nenhum relatório autenticado foi consultado. | Sim |
| Google Business Profile / Google Maps | BLOQUEADO | Confirmar se existe perfil, seu estado de verificação e consistência de nome, telefone, endereço e serviços. Falta acesso autorizado ao perfil. | Sim |
| Core Web Vitals | PARCIAL | Após a publicação, medir LCP, INP e CLS em dados de campo (CrUX/Search Console) e complementar com Lighthouse ou PSI. A observação headless anterior é uma única sessão, não métrica de campo. | Acesso à Search Console ajuda; teste de laboratório não depende |
| Visibilidade em buscadores com IA | BLOQUEADO | Repetir consultas literais em ChatGPT, Gemini e AI Overviews e registrar data, resposta e fontes. Não há resultados reproduzíveis nem acesso a respostas de IA nesta revisão. | Não para buscas públicas; depende de acesso às plataformas quando exigirem autenticação |
| Acessibilidade e validação integral | PARCIAL | Build, validador, navegador e teclado cobertos; faltam auditoria automatizada de WCAG e teste com leitor de tela. | Não |
| Publicação em produção | NÃO INICIADO | Após a revisão e o merge do PR, aguardar o workflow de Pages e conferir as nove URLs públicas. O código ainda não está integrado à `main` nem publicado. | Sim, para revisão e merge do PR |
