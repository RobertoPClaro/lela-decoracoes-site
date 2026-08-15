# Lela Decorações — Domínio, SEO e Descoberta

Data da auditoria: 15 de agosto de 2026
Repositório: RobertoPClaro/lela-decoracoes-site
Domínio desejado: https://leladecoracoes.com

## 1. Resumo

O site existente foi preservado. Não houve reconstrução, redesign, alteração do layout, CSS, JavaScript de interface, portfólio, imagens ou conteúdo comercial.

O GitHub Pages foi configurado tecnicamente para leladecoracoes.com. As variáveis de produção do repositório são:

~~~text
SITE_URL=https://leladecoracoes.com
PATH_PREFIX=/
~~~

O domínio ainda não está servindo o GitHub Pages porque os DNS da Hostinger continuam apontando para a página estacionada da Hostinger (2.57.91.91). O www ainda aponta para o apex e precisa apontar diretamente para robertopclaro.github.io.

Foram feitos somente ajustes técnicos de domínio, validação, associação da entidade no JSON-LD, documentação e um llms.txt curto com links para páginas que já existiam. Nenhum dado comercial novo foi inventado.

## 2. Estado atual encontrado

- Gerador: Eleventy 3.1.6.
- Saída: HTML estático em dist/.
- Interface: CSS próprio e JavaScript vanilla.
- Imagens: AVIF, WebP e JPEG responsivos, com picture, srcset, sizes, dimensões e lazy loading.
- Deploy: GitHub Actions com actions/upload-pages-artifact e actions/deploy-pages.
- Repositório: https://github.com/RobertoPClaro/lela-decoracoes-site.
- Usuário/owner confirmado: RobertoPClaro.

Antes da configuração, o Pages estava em modo workflow, sem domínio customizado, usando https://robertopclaro.github.io/lela-decoracoes-site/.

Após a configuração, a API do GitHub informa:

~~~text
build_type: workflow
cname: leladecoracoes.com
https_enforced: false
~~~

O DNS público observado antes da troca foi:

~~~text
leladecoracoes.com A          2.57.91.91
www.leladecoracoes.com CNAME  leladecoracoes.com.
~~~

O conteúdo retornado ainda é “Parked Domain name on Hostinger DNS system”. A Hostinger não foi alterada por esta tarefa.

## 3. Alterações realmente necessárias

### Realizadas

1. Configurado leladecoracoes.com como custom domain do GitHub Pages.
2. Definidas as variáveis SITE_URL e PATH_PREFIX do repositório.
3. Alterado o fallback do workflow para não voltar ao domínio github.io.
4. Mantida a fonte central de URLs em src/_data/site.cjs.
5. Mantidos canonical, sitemap, robots, Open Graph e JSON-LD dependentes da mesma base.
6. Adicionado identificador estável #organization ao LocalBusiness e aos providers de serviço.
7. Adicionado rel="describedby" apontando para /llms.txt.
8. Criado um llms.txt curto com links para conteúdo existente.
9. Ampliada a validação do build para domínio, canonical, sitemap, robots e ausência de URLs antigas.
10. Corrigidos os exemplos de preview para não duplicar o caminho.
11. Atualizado o README com domínio, deploy, DNS, www e HTTPS.

### Não necessárias

- Não foi criado CNAME. Com publicação por workflow customizado, o GitHub informa que ele não é necessário e é ignorado se existir.
- Não foram criadas páginas locais em massa.
- Não foram adicionados reviews, ratings, preços ou promessas.

## 4. Arquivos alterados

- .github/workflows/pages.yml: fallback de produção.
- src/_data/site.cjs: identificador da entidade e URL final do schema.
- src/_includes/layouts/base.njk: relação para llms.txt.
- src/llms.njk: referência curta para agentes.
- scripts/validate-build.cjs: validações de domínio e llms.txt.
- README.md: documentação de produção e preview.
- LELA_DECORACOES_IMPLEMENTACAO.md: exemplo correto de preview.
- LELA_DECORACOES_DOMINIO_E_SEO.md: este relatório.

## 5. Novo domínio

O domínio canônico planejado e configurado no GitHub Pages é:

~~~text
https://leladecoracoes.com
~~~

O endereço github.io não deve permanecer como canonical de produção depois da propagação DNS.

## 6. SITE_URL

A fonte de URL continua centralizada em src/_data/site.cjs e recebe:

~~~text
SITE_URL=https://leladecoracoes.com
~~~

SITE_URL é somente a origem. Não incluir /lela-decoracoes-site/ ou /preview/.

## 7. PATH_PREFIX

O domínio próprio é servido na raiz:

~~~text
PATH_PREFIX=/
~~~

O preview em subpasta continua possível:

~~~bash
PATH_PREFIX=/preview/ SITE_URL=https://example.test npm run build
~~~

Esse preview foi validado com links em /preview/ uma única vez e canonical/sitemap em https://example.test/preview/....

## 8. GitHub Pages

O custom domain foi gravado nas configurações do Pages:

~~~text
leladecoracoes.com
~~~

O Pages permanece com fonte GitHub Actions. Nenhum CNAME deve ser adicionado ao código nesta estratégia.

Fonte: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 9. GitHub Actions

O workflow existente foi preservado:

~~~text
push na main → npm ci → npm run build → validação → upload dist → deploy Pages
~~~

A configuração usa as variáveis de repositório e fallback para:

~~~text
PATH_PREFIX: vars.PATH_PREFIX ou /
SITE_URL: vars.SITE_URL ou https://leladecoracoes.com
~~~

O fallback não usa mais robertopclaro.github.io/lela-decoracoes-site/.

## 10. DNS da Hostinger

A Hostinger não foi alterada automaticamente. Configure manualmente:

| Tipo | Nome | Valor | TTL | Ação |
|---|---|---|---|---|
| A | @ | 185.199.108.153 | 3600/Automático | Adicionar |
| A | @ | 185.199.109.153 | 3600/Automático | Adicionar |
| A | @ | 185.199.110.153 | 3600/Automático | Adicionar |
| A | @ | 185.199.111.153 | 3600/Automático | Adicionar |
| CNAME | www | robertopclaro.github.io | 3600/Automático | Substituir o atual |

Remova/substitua somente o A de estacionamento/construtor que conflitar. Preserve MX, SPF, DKIM, DMARC e TXT de e-mail.

Fonte: [DNS records for a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#dns-records-for-your-custom-domain).

## 11. WWW

O registro atual www → leladecoracoes.com deve virar:

~~~text
www CNAME robertopclaro.github.io
~~~

Não incluir nome de repositório no CNAME. Com apex e www corretos, o GitHub Pages pode redirecionar www para o domínio canônico.

Fonte: [Configuring an apex domain and the www subdomain variant](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain-and-the-www-subdomain-variant).

## 12. HTTPS

Canonical, Open Graph, sitemap, robots e JSON-LD já usam HTTPS. A auditoria não encontrou recursos http:// em páginas ou metadata; a ocorrência técnica do namespace XML do sitemap não é mixed content.

### Ação manual necessária no GitHub

Após DNS e certificado:

1. Abrir Settings → Pages.
2. Confirmar o domínio.
3. Habilitar Enforce HTTPS.

O GitHub informa que a emissão pode levar até 24 horas.

## 13. Canonical

Os 14 HTML gerados foram auditados. Todos têm canonical no novo domínio. Exemplos:

~~~text
https://leladecoracoes.com/
https://leladecoracoes.com/portfolio/
https://leladecoracoes.com/servicos/
https://leladecoracoes.com/como-funciona/
https://leladecoracoes.com/sobre/
https://leladecoracoes.com/duvidas/
https://leladecoracoes.com/contato/
~~~

Nenhum canonical de produção contém github.io, localhost ou /lela-decoracoes-site/.

## 14. Sitemap

src/sitemap.njk gera 13 URLs públicas. Todas usam https://leladecoracoes.com/; a página 404 não entra no sitemap.

## 15. Robots

dist/robots.txt validado:

~~~text
User-agent: *
Allow: /
Sitemap: https://leladecoracoes.com/sitemap.xml
~~~

Não há bloqueio geral de crawlers nem regras específicas para IA.

## 16. Open Graph

As 14 páginas geram og:url, og:image, og:title, og:description, og:site_name e og:image:alt. As URLs absolutas usam o novo domínio; textos existentes foram preservados.

## 17. Schema / JSON-LD

O site já possuía LocalBusiness, Service, BreadcrumbList e FAQPage. O LocalBusiness agora usa:

~~~text
https://leladecoracoes.com/#organization
~~~

Os providers de Service referenciam a mesma entidade. Nome, telefone, endereço, áreas, Instagram e serviços são dados já presentes no site. Não foram adicionados reviews, rating, priceRange ou preços.

## 18. SEO técnico

Auditoria confirmou titles, descriptions, H1, HTML semântico, breadcrumbs, favicon, manifest, links internos, imagens com alt/dimensões/srcset e conteúdo principal disponível sem JavaScript. FAQ usa details; o formulário apenas monta a mensagem do WhatsApp.

## 19. SEO local

O conteúdo existente apresenta Joinville, Araquari, Santa Catarina, Pegue e Monte, Mini Festa na Mesa, temas infantis, chá de bebê, chá revelação, celebrações adultas, endereço, WhatsApp e Instagram. Não foram criadas páginas artificiais por cidade.

## 20. Descoberta por sistemas de IA

O HTML permite identificar empresa, Letícia, serviços, localidades, contato, Instagram, processo de reserva e portfólio sem executar JavaScript. O llms.txt acrescenta um índice curto para agentes, sem keyword stuffing, texto oculto ou duplicação integral do site.

Não há garantia de que qualquer sistema de IA citará ou recomendará o domínio.

## 21. Entidade Lela Decorações

~~~text
Lela Decorações
├── criada por Letícia
├── Pegue e Monte
├── Mini Festa na Mesa
├── Joinville e Araquari, SC
├── https://leladecoracoes.com
├── https://www.instagram.com/letticia_moreira/
└── WhatsApp (47) 98856-7488
~~~

Essa associação está coerente entre Home, Sobre, Contato, rodapé, metadata, JSON-LD e llms.txt, sem repetição artificial.

## 22. Crawlability

robots.txt permite rastreamento; sitemap lista as páginas; canonical está alinhado; links internos são HTML; conteúdo essencial não depende de JS; imagens têm alt, dimensões e variantes; filtros/lightbox não escondem os cards do HTML; llms.txt é referenciado por rel="describedby".

## 23. LLMS.txt — decisão e justificativa

Decisão: implementar um arquivo curto e complementar.

O formato atual é uma proposta aberta, não uma garantia de ranking. O arquivo é simples de manter, usa somente informações públicas e aponta para páginas existentes. Não foi criado llms-full.txt nem cópia Markdown de todas as páginas porque isso aumentaria manutenção sem necessidade demonstrada.

Fonte: [The /llms.txt file — proposal](https://llmstxt.org/).

## 24. Testes executados

Build de produção:

~~~bash
PATH_PREFIX=/ SITE_URL=https://leladecoracoes.com npm test
~~~

Resultado:

~~~text
Build validado: 14 HTML, 1425 derivados de imagem, 95 originais.
~~~

Preview:

~~~bash
PATH_PREFIX=/preview/ SITE_URL=https://example.test npx eleventy
PATH_PREFIX=/preview/ SITE_URL=https://example.test node scripts/validate-build.cjs
~~~

Resultado: aprovado. Também não foram encontradas URLs antigas no build de produção.

## 25. Resultado do build

- 14 HTML, incluindo 404.html.
- 95 imagens originais.
- 1.425 derivados responsivos.
- robots.txt, sitemap.xml e llms.txt.
- CSS, JavaScript, favicon e manifest.
- 14 canonical, 14 describedby, 14 LocalBusiness, 14 breadcrumbs, 6 schemas Service e 1 FAQPage.

## 26. Pendências manuais no GitHub

### Verificação do domínio

No GitHub: avatar → Settings → Pages → Add a domain → informar leladecoracoes.com → copiar o TXT gerado → criar na Hostinger → aguardar → clicar Verify → manter o TXT.

O valor do TXT não foi inventado, pois é específico da conta e só o GitHub pode gerar.

Fonte: [Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

### HTTPS

Após DNS e certificado, habilitar Enforce HTTPS em Settings → Pages.

## 27. Pendências manuais na Hostinger

1. Substituir @ → 2.57.91.91 pelos quatro A oficiais.
2. Substituir www → leladecoracoes.com por www → robertopclaro.github.io.
3. Adicionar o TXT de verificação _github-pages-challenge-RobertoPClaro somente com o valor fornecido pelo GitHub.
4. Preservar MX, SPF, DKIM, DMARC e TXT de e-mail.
5. Não criar wildcard *, parking ou redirecionamento da Hostinger.
6. Aguardar propagação, que pode levar até 24 horas.

Validação após a troca:

~~~bash
dig leladecoracoes.com +noall +answer -t A
dig www.leladecoracoes.com +noall +answer
~~~

O esperado é o apex retornar os quatro A do GitHub e www retornar CNAME direto para robertopclaro.github.io.
