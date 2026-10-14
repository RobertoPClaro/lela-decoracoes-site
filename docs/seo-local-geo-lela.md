# SEO local, GEO e AEO — Lela Decorações

Registro da investigação e da implementação na branch `feat/seo-local-geo`.
As páginas descritas aqui estão preparadas para revisão nesta branch; não houve
push nem deploy.

## Repositório e Git

- Repositório usado: `/home/roberto/Área de trabalho/ia-treinada-roberto/lela-decoracoes-site`.
- Remoto `origin`: `https://github.com/RobertoPClaro/lela-decoracoes-site.git`.
- A cópia do projeto estava limpa em `main`, no commit
  `8830fa057124c03acc5a4f7d6141d4e347300ca9` (`Adiciona pagina de parceiros`).
  A referência local `origin/main` apontava para o mesmo commit.
- A branch `feat/seo-local-geo` foi criada a partir dessa base limpa. O outro
  repositório que contém o diretório de trabalho tinha alterações próprias e
  permaneceu intacto.
- O GitHub informa `main` como branch padrão. A action existente constrói e
  publica no GitHub Pages após push em `main`, ou por execução manual.
- Na investigação inicial, `git fetch` falhou porque a execução isolada não
  resolveu `github.com`. Na checagem de pré-publicação, `git fetch origin`
  completou com acesso de rede autorizado; `origin/main` atualizado permaneceu
  no mesmo commit-base listado acima. O SHA exato da última publicação do Pages
  não foi consultado separadamente.

## Arquitetura original

O site usa Eleventy 3.1.6, Nunjucks, CSS e JavaScript sem framework. O build
gera arquivos estáticos em `dist`; imagens responsivas são processadas com
`sharp` e `@11ty/eleventy-img`. A action usa Node 22, `npm ci` e `npm run
build`, e então envia `dist` ao Pages.

Já existiam páginas de serviços, portfólio, dúvidas, contato e informações da
empresa, além de `LocalBusiness`, `Service`, `BreadcrumbList` e `FAQPage` em
JSON-LD, canonical, Open Graph, `sitemap.xml`, `robots.txt`, `llms.txt` e links
de WhatsApp. O telefone e o endereço já eram centralizados em
`src/_data/site.cjs`.

O repositório local da 3G Tapeçaria foi consultado somente para observar a
separação entre dado geográfico, confirmação comercial e publicação. Nenhum
arquivo ou conteúdo daquele projeto foi copiado ou alterado.

## Arquitetura implementada

`src/_data/locations.cjs` centraliza cidades, bairros, fontes geográficas,
confirmações comerciais, conteúdo específico e estado de publicação. O template
`src/regioes-atendidas/localidade.njk` gera as páginas de cidade e de bairro a
partir desse cadastro. A inclusão de um bairro novo não exige duplicar um
arquivo de página.

Rotas preparadas:

| Rota | Conteúdo |
| --- | --- |
| `/regioes-atendidas/` | Visão geral, logística, serviços, dúvidas e orçamento |
| `/regioes-atendidas/joinville/` | Serviços, retirada e condições consultáveis em Joinville |
| `/regioes-atendidas/araquari/` | Serviços informados para Araquari e consulta logística por endereço |
| `/regioes-atendidas/joinville/paranaguamirim/` | Endereço de retirada divulgado no Paranaguamirim |

As três rotas de localidade são indexáveis e entram no sitemap. A página do
Paranaguamirim descreve o ponto de retirada, não afirma que há entrega no bairro.
Todos os demais bairros permanecem no cadastro sem página, sem conteúdo
indexável e com cobertura comercial pendente.

## Cadastro geográfico e situação comercial

### Joinville

A relação municipal **Joinville Bairro a Bairro 2026** valida os 45 bairros.
O cadastro não transforma essa validação geográfica em promessa de entrega.

Adhemar Garcia, América, Anita Garibaldi, Atiradores, Aventureiro, Boa Vista,
Boehmerwald, Bom Retiro, Bucarein, Centro, Comasa, Costa e Silva, Dona
Francisca, Espinheiros, Fátima, Floresta, Glória, Guanabara, Iririú, Itaum,
Itinga, Jardim Iririú, Jardim Paraíso, Jardim Sofia, Jarivatuba, João Costa,
Marinas, Morro do Meio, Nova Brasília, Paranaguamirim, Parque Guarani,
Petrópolis, Pirabeiraba, Profipo, Rio Bonito, Saguaçu, Santa Catarina, Santo
Antônio, São Marcos, Ulysses Guimarães, Vale Verde, Vila Cubatão, Vila Nova,
Zona Industrial Norte e Zona Industrial Tupy.

### Araquari

O cadastro contém 15 nomes identificados em referências oficiais: Areias
Pequenas, Barra do Itapocu, Centro, Casa Nova, Colégio Agrícola, Corveta,
Itapocu, Itinga, Jacu, Ponto Alto, Porto Grande, Rainha, Rio do Morro, Trevo e
Volta Redonda.

As publicações municipais do SINE de fevereiro e julho de 2026 chamam parte
desses lugares de bairros e associam vagas a localidades. A referência do IBGE
para Barra do Itapocu é um mapa descritivo de setor censitário do Censo 2022.
Não foi localizada uma relação municipal única, atual e exaustiva com os
limites de todos os bairros de Araquari. Por isso, o cadastro está marcado como
parcial e esses nomes não sustentam páginas locais nem alegações de cobertura.

### Estado de confirmação

- **Joinville:** 44 bairros aguardam confirmação comercial. Paranaguamirim tem
  somente o endereço de retirada confirmado; cobertura de entrega continua
  pendente.
- **Araquari:** os 15 nomes aguardam confirmação comercial por bairro e por
  serviço. O atendimento municipal informado no site não confirma logística
  para cada localidade.
- **Cidades:** Joinville e Araquari têm páginas próprias com conteúdo apoiado
  nas áreas de atendimento que o site atual já declara. A disponibilidade de
  cada kit e a logística do endereço continuam sujeitas a consulta.

Fontes verificadas em 13/10/2026:

- [Joinville Bairro a Bairro — Prefeitura de Joinville](https://www.joinville.sc.gov.br/publicacoes/joinville-bairro-a-bairro/), incluindo o [PDF municipal de 2026](https://www.joinville.sc.gov.br/wp-content/uploads/2026/03/Joinville-Bairro-a-Bairro-2026-atualizado-em-17032026.pdf).
- [SINE Araquari — Prefeitura, fevereiro de 2026](https://araquari.atende.net/cidadao/noticia/sine-araquari-divulga-novas-vagas-de-emprego-nesta-sexta-feira).
- [SINE Araquari — Prefeitura, julho de 2026](https://araquari.atende.net/cidadao/noticia/sine-araquari-divulga-37-vagas-de-emprego-nesta-sextafeira-1007).
- [Censo 2022 — mapas e descrições de setores censitários, IBGE](https://www.ibge.gov.br/estatisticas/sociais/populacao/2098-np-censo-demografico/22827-censo-demografico-2022.html?edicao=43045). A fonte específica de cada nome está registrada no cadastro.
- O endereço e os serviços comerciais foram conferidos nas páginas públicas da [Lela Decorações](https://leladecoracoes.com/) e de [contato](https://leladecoracoes.com/contato/).

## SEO técnico, dados estruturados e conversão

- Cada página regional recebe título, descrição, H1, canonical absoluta, Open
  Graph, breadcrumb visível e `BreadcrumbList`.
- Páginas de cidade recebem `WebPage`, `Service` e `FAQPage` quando há perguntas
  visíveis. A página geral também recebe `WebPage` e FAQ. A página de bairro não
  declara um serviço em schema com cobertura local não confirmada.
- `LocalBusiness.areaServed` mantém somente Joinville e Araquari, coerentes com
  a declaração comercial já existente. Nenhum endereço ou estabelecimento por
  bairro foi criado.
- O sitemap deriva as páginas locais do cadastro; `robots.txt` aponta para o
  sitemap da origem configurada. `llms.txt` recebeu as novas rotas e esclarece
  a diferença entre retirada e entrega.
- Homepage, menu principal, rodapé e páginas pertinentes de serviço apontam para as regiões.
  Os links de WhatsApp usam o telefone central e mensagens com cidade, bairro,
  data e intenção do contato.
- O design usa os componentes e estilos atuais. Nenhuma dependência foi
  adicionada.

## Testes e validações

### Build e verificações automatizadas

- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test` — passou na
  revisão final. O build produziu 19 páginas HTML, 1.425 imagens derivadas e
  22 arquivos escritos pelo Eleventy; o validador encontrou 1.427 referências
  locais de imagem, incluindo imagens de referência.
- Build de prefixo `PATH_PREFIX=/preview/` com origem neutra
  (`https://preview.example.com`) e `scripts/validate-build.cjs` — passou,
  incluindo links, canonicals, sitemap, breadcrumbs, schemas e recursos sob o
  prefixo. O host antigo `robertopclaro.github.io` continua bloqueado pela
  proteção de origem do site, como esperado.
- O validador agora deriva as páginas publicáveis do cadastro, sem impor total
  fixo de bairros, páginas regionais ou imagens. Confere slugs e URLs únicos,
  vínculo bairro/cidade, fontes geográficas HTTPS oficiais, evidências
  comerciais, conteúdo mínimo, diferenças entre páginas, estado de indexação,
  referências reais de imagens, links internos, title e description únicos,
  um H1, JSON-LD, canonical, Open Graph, breadcrumbs, sitemap e FAQs visíveis.
- Um cadastro sintético em memória expandiu a lista de 60 para 62 bairros,
  incluindo estados futuros `CONFIRMED` e `CONDITIONAL` com evidência; o
  validador passou sem publicar novas rotas. Outro caso sintético, com cobertura
  confirmada mas sem evidência, foi rejeitado.
- `git diff --check` — passou, sem erros de whitespace.

### Navegador, responsividade e acessibilidade

Teste local com Playwright sobre o build gerado na revisão final:

- Homepage, serviços, visão geral, cidades e Paranaguamirim em 390 px e
  1.280 px: sem overflow horizontal e com um H1 por página. As páginas de cidade
  e bairro exibem suas duas FAQs; a visão geral exibe quatro.
- Cabeçalho em 821, 900 e 1.280 px: sem overflow; o link de regiões cabe no
  menu. Em 390 px, Tab destaca “Pular para o conteúdo” e o botão do menu abre
  os oito links principais mais o CTA, com `aria-expanded=true`.
- O console do navegador não registrou erros nem avisos nas páginas verificadas.
- Conferência de contraste de cores representativas: texto principal 13,64:1,
  texto secundário 5,22:1, roxo de destaque 6,63:1 e contorno de foco 8,01:1
  sobre o fundo claro. O halo branco do foco contrasta 15,82:1 com o roxo escuro.

As verificações de contraste foram pontuais; não foi executada uma auditoria
automatizada completa de WCAG ou com leitor de tela.

## Arquivos modificados

- `src/_data/locations.cjs` — cadastro geográfico, estados comerciais e conteúdo.
- `src/_data/site.cjs` e `src/_includes/layouts/base.njk` — áreas atendidas,
  sitemap e JSON-LD.
- `src/regioes-atendidas/` — visão geral e template de localidades.
- `src/_includes/partials/regions-note.njk`, rodapé, homepage e páginas de
  serviços — navegação e links internos.
- `src/llms.njk` — referência das páginas e logística informada.
- `scripts/validate-build.cjs` — validação de conteúdo gerado, cadastro,
  páginas indexáveis, links, canonical, sitemap, breadcrumbs e schemas.
- `docs/seo-local-geo-lela.md` — este registro.

## Pendências antes de expandir

1. Confirmar com a operação a logística por bairro e por serviço antes de criar
   outra página de bairro.
2. Se Araquari for expandido, obter da Prefeitura uma relação municipal atual e
   exaustiva, com limites ou fonte geográfica consolidada.
3. Confirmar com a operação as condições por endereço quando houver novos
   pedidos; nenhuma condição de entrega por bairro é presumida neste cadastro.

## Revisão de pré-publicação — 14/10/2026

- Branch `feat/seo-local-geo`, baseada em
  `8830fa057124c03acc5a4f7d6141d4e347300ca9` (`Adiciona pagina de parceiros`).
  O fetch atualizou `origin/main` e `origin/HEAD`; ambos apontam para esse mesmo
  SHA. `git rev-list --left-right --count HEAD...origin/main` retornou `0 0`,
  sem commits divergentes nem conflitos de integração. As mudanças continuam
  sem commit no working tree.
- Diagnóstico de DNS: a execução isolada não resolveu `github.com`; o sistema
  usa o stub `127.0.0.53`, e a consulta ao serviço `systemd-resolved` foi
  bloqueada pelo sandbox. `git fetch origin` funcionou com acesso de rede
  autorizado. Nenhuma configuração global ou do resolver foi alterada.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test` passou: build de
  produção, 19 páginas HTML, 1.425 imagens derivadas, 1.427 referências locais
  verificadas, duas cidades e 60 bairros cadastrados. O validador não impõe
  totais fixos de bairros, páginas regionais ou imagens.
- As quatro URLs regionais estão no sitemap e foram geradas: `/regioes-atendidas/`,
  `/regioes-atendidas/joinville/`, `/regioes-atendidas/araquari/` e
  `/regioes-atendidas/joinville/paranaguamirim/`. O menu aponta para a página
  geral; homepage e rodapé ligam às cidades; a visão geral e Joinville ligam ao
  ponto de retirada. Os serviços levam à visão geral.
- Nenhum arquivo sensível, temporário ou gerado entrou na lista de mudanças.
  `dist/` e `node_modules/` são ignorados pelo Git; a lista revisada contém dez
  arquivos rastreados modificados e sete arquivos novos, incluindo esta
  documentação. `git diff --check` passou.
- A validação anterior com Playwright cobriu desktop e mobile, links, menu por
  teclado, foco visível e console sem erros ou avisos. Ela não substitui uma
  auditoria WCAG automatizada nem um teste com leitor de tela.
- Não há conflito remoto nem defeito bloqueante conhecido. Permanecem como
  limites de conteúdo a confirmação comercial por bairro e serviço e a ausência
  de uma fonte municipal única e exaustiva para Araquari. Os bairros sem
  confirmação continuam sem páginas individuais e fora do sitemap. Nenhum
  commit, push, merge ou deploy foi executado; o SHA efetivamente implantado no
  Pages não foi consultado separadamente.
