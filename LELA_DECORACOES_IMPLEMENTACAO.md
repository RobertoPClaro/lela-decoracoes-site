# Lela Decorações — relatório de implementação

## O que foi implementado

- Site estático em Eleventy, com saída exclusiva em `dist/`.
- Home orientada a conversão, com posicionamento, serviços, portfólio, processo, temas e CTA para WhatsApp.
- Páginas de serviços: `/servicos/`, `/pegue-e-monte/` e `/mini-festa-na-mesa/`.
- Páginas de intenção: `/festas-infantis/`, `/cha-de-bebe/` e `/cha-revelacao/`.
- Páginas institucionais e de conversão: `/portfolio/`, `/como-funciona/`, `/sobre/`, `/duvidas/`, `/contato/`, `/politica-de-privacidade/` e `404.html`.
- Filtros por cinco categorias de tema e filtro separado para `kits` montados.
- Lightbox com foco, Escape, botão de fechamento, texto alternativo e imagem maior derivada.
- Menu mobile, FAQ nativo com `details`, foco visível e formulário que abre uma mensagem contextual no WhatsApp.
- `robots.txt`, `sitemap.xml`, favicon, manifest, metadados Open Graph e JSON-LD para LocalBusiness, Service, BreadcrumbList e FAQPage.
- Workflow de GitHub Pages com build, validação e deploy por Actions.

## Decisões de tecnologia

Eleventy foi usado apenas como ferramenta de build. O resultado final não exige Node, servidor, banco de dados ou API: GitHub Pages serve os arquivos estáticos gerados. A interface usa CSS próprio, JavaScript vanilla e HTML semântico.

O `PATH_PREFIX` e o `SITE_URL` são centralizados em `src/_data/site.cjs`. Isso permite testar publicação em subpasta de projeto e depois mudar para domínio próprio sem espalhar caminhos absolutos pelo código.

## Imagens e acervo

Foram copiados, sem alterar os originais fora do projeto, 95 arquivos organizados pela cliente: 77 imagens nas cinco pastas de temas e 18 imagens na pasta `kits`. Os originais permanecem em `src/assets/images/originals/` para rastreabilidade. As referências de informação e logo estão em `src/assets/images/reference/`.

O build gera variantes AVIF, WebP e JPEG em quatro larguras principais. Cards usam lazy loading; a imagem hero é carregada com prioridade alta. O CSS mantém proporção nos contêineres para reduzir deslocamento de layout. Antes do lançamento, a proprietária deve fornecer fotos originais de maior qualidade e autorizar o uso final das imagens.

## SEO e conteúdo

Cada página possui title, description, H1, URL amigável, navegação interna e breadcrumbs. As páginas locais e de serviço usam apenas localidades e ofertas confirmadas no plano. O schema de negócio usa Joinville e Araquari como área de atendimento, sem inventar endereço físico.

O site não publica preço, avaliação, endereço de retirada ou composição definitiva quando esses dados não foram confirmados. A informação pública de telefone e horário está acompanhada de orientação para reconfirmação antes da reserva.

## Performance e acessibilidade

- CSS e JavaScript sem frameworks pesados.
- HTML minificado no build.
- Imagens responsivas e sem publicação dos originais.
- `alt` descritivo, HTML semântico, labels, áreas clicáveis adequadas e foco visível.
- `prefers-reduced-motion` respeitado.
- Navegação mobile com estado ARIA e fechamento por Escape.
- Meta de projeto: Lighthouse 90+ em Performance, Accessibility e Best Practices, e 95+ em SEO após configurar domínio, favicon definitivo e dados finais.

## Como validar

```bash
npm install
npm run build
PATH_PREFIX=/preview/ SITE_URL=https://example.test/preview npm run build
```

O script de validação verifica páginas essenciais, sitemap, robots, assets e derivados de imagem. A auditoria visual final deve ser executada em 360, 390, 430, 768, 1024 e 1440 px, além de Lighthouse no build publicado em preview.

## Pendências antes do lançamento

1. Confirmar número/conta final do WhatsApp, dias de atendimento e endereço de retirada.
2. Receber catálogo comercial aprovado, preços, disponibilidade, composição de cada kit, antecedência mínima e contrato.
3. Confirmar política de cancelamento, atraso, danos, caução e entrega com redação comercial/jurídica final.
4. Receber logo vetorial ou arquivo original, fotos originais e autorização de uso.
5. Receber depoimentos e avaliações verificáveis, caso a cliente queira publicar prova social.
6. Definir proprietário, nome do repositório, domínio e eventual `CNAME`.
7. Rodar Lighthouse e revisão manual após os dados reais e a hospedagem serem configurados.
