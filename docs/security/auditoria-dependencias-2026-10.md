# Auditoria de dependências — outubro de 2026

## Escopo e snapshot

Auditoria da cadeia de instalação e build do site estático Eleventy. A branch de trabalho deriva do snapshot `07b8c85348738c5fed83d3ab4ffdcb3b4fc1ad06` observado para `main`. O estado local indicado anteriormente para o PR #11 não foi confirmado como integrado nesse snapshot.

O site publicado é HTML, CSS, JavaScript próprio e assets estáticos. `package.json` declara cinco dependências diretas, todas em `devDependencies`: Eleventy, `@11ty/eleventy-img`, `html-minifier-terser`, `image-size` e `sharp`. Não há dependências npm de produção ou módulos npm carregados pelo navegador. As dependências de desenvolvimento ainda executam em máquinas locais e nos workflows de CI.

## Resultado

O log de `npm ci` de 20/10/2026 registrou 13 achados npm: 10 altos, 3 moderados e nenhum crítico. São registros agregados pelo npm; não equivalem necessariamente a 13 advisories únicos nem a 13 vulnerabilidades exploráveis no site público.

Após atualizar o lockfile, `npm audit --json` consultado com sucesso registrou 3 achados altos e nenhum moderado ou crítico, em `@11ty/eleventy-img`, `image-size` e `sharp`. A última tentativa independente de auditoria completa não alcançou o registry (`EAI_AGAIN registry.npmjs.org`); esse erro de rede não é resultado de segurança. `npm audit --omit=dev` retornou zero, coerente com a ausência de dependências de produção, mas não elimina o risco de build.

| Pacote/caminho | Inicial | Estado após correção | Exposição e condição relevante |
|---|---|---|---|
| `brace-expansion` / `braces` via Eleventy e Chokidar | Altos e moderado | Removido da árvore resolvida após Eleventy 3.1.7 e Chokidar 4 | Ferramenta de build/observação; padrões de chaves maliciosos poderiam afetar o build. |
| `js-yaml` 3.x/4.x | Alto | 4.x atualizado; o ramo 3.x vulnerável saiu com a troca interna do gray-matter | Parser usado durante a geração; YAML especialmente construído pode consumir CPU. |
| `markdown-it` | Moderado | Atualizado para 14.3.3 | Build; condição da advisory envolve `linkify: true`, que o projeto não habilita. |
| `sprintf-js` | Moderado | Saiu da árvore resolvida após a troca do gray-matter | Transitivo; não há uso direto localizado. |
| `image-size@1.2.1` | Alto | Permanece; correção indicada pelo audit exige `image-size` 2.x | Build; o projeto lê imagens locais. As advisories descrevem loops de CPU para entradas específicas JXL/HEIF ou ICNS. O inventário analisado contém JPEG/PNG; PRs podem alterar inputs executados na CI. |
| `sharp@0.33.5` | Altos | Permanece; audit sugere `sharp@0.35.5` | Build; processa imagens locais. As condições das advisories envolvem entrada não confiável/formato e, em algumas, Linux/glibc. Não há upload público de imagens nem uso no navegador identificado. |
| `@11ty/eleventy-img@6.0.4` | Alto agregado de `image-size` e `sharp` | Permanece; audit sugere versão 7 major | Plugin de build; a vulnerabilidade deriva das dependências descritas acima. |

O inventário e a análise por advisory, incluindo caminhos e fontes, foram preservados na evidência temporária da execução. Os advisories do Sharp e de `image-size` continuam relevantes à cadeia de build, ainda que não estejam presentes no runtime estático.

## Sharp e scripts de instalação

O `npm ci` executou `sharp@0.33.5` com `node install/check` e o processo terminou com código 0. O aviso do npm 11 dizia que o script ainda não estava coberto por `allowScripts`; não indica falha de instalação, mas também não prova aprovação explícita na política de scripts. Nenhuma política foi alterada para silenciar o aviso. O projeto depende do Sharp para gerar imagens.

## CI e publicação

Os workflows usam Node 22 e `npm ci`; a validação executa sintaxe, build público e build de revisão. O teste local ocorreu com Node 24.21.0/npm 11.19.0, portanto não reproduziu exatamente o runtime do CI. `pages.yml` publica somente em `main` ou por acionamento manual. As Actions estão fixadas por tags major, não por SHA imutável.

Esta branch restringe permissões do Pages: o workflow conserva `contents: read`; o job `build` recebe somente `contents: read`; `pages: write` e `id-token: write` ficam no job `deploy`, que depende do build. Triggers, artefato, sequência e diretório publicado não mudaram. A configuração foi comparada com as instruções oficiais de [deploy-pages](https://github.com/actions/deploy-pages) e [upload-pages-artifact](https://github.com/actions/upload-pages-artifact).

## Validação e limites

- `npm ci`: concluído; o aviso de instalação do Sharp permanece documentado.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`: passou; build validou 157 HTML e gerou 1.425 variantes locais de imagem.
- `node --check` para JS/CJS e `git diff --check`: passaram.
- Build/regressão manteve 76 temas (73 indexáveis e 3 noindex), 64 páginas regionais (3 indexáveis e 61 noindex), zero drafts e sitemap com 92 URLs.
- `npm audit --omit=dev --json`: zero, sem dependências de produção.
- Uma auditoria completa pós-correção terminou com 3 altos; uma tentativa posterior foi bloqueada por DNS. A consulta ao registry deve ser repetida em CI ou ambiente com rede antes de tratar o inventário npm como atualizado.
- Playwright/Puppeteer não estão instalados; esta auditoria não afirma teste de navegador.

## Parecer

Correções compatíveis reduziram os achados, e o build foi validado. Permanecem três achados altos associados ao processamento de imagens no build, com correção indicada que exige migração major. O resultado não significa “livre de vulnerabilidades”; requer revisão planejada do plugin de imagens, `image-size` e Sharp, além de uma política explícita para scripts de instalação.

### Fontes técnicas

- [npm install-scripts](https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/)
- [npm package-lock](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)
- [Eleventy 3.1.7](https://github.com/11ty/buildawesome/releases/tag/v3.1.7)
- [GHSA-5p2g-fcmc-qvqq — image-size](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq)
- [GHSA-w3rx-r6r6-pgpr — image-size](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr)
- [GHSA-f88m-g3jw-g9cj — sharp](https://github.com/advisories/GHSA-f88m-g3jw-g9cj)
- [GHSA-rgj7-g3m4-5g8c — sharp](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c)
- [GHSA-wq5f-xc86-pv6w — sharp](https://github.com/advisories/GHSA-wq5f-xc86-pv6w)
