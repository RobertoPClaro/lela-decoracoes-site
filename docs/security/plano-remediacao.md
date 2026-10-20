# Plano de remediação de dependências

## Implementado nesta entrega

1. Atualizado o lockfile de `@11ty/eleventy` de 3.1.6 para 3.1.7, dentro da faixa já declarada. A nova resolução substitui a cadeia de Chokidar 3, removendo `braces` vulnerável, e atualiza dependências internas do Eleventy.
2. Atualizado `brace-expansion` para 1.1.21, `js-yaml` 4.x para 4.3.2 e `markdown-it` para 14.3.3, sem mudar `package.json`.
3. Limitadas as permissões do GitHub Pages: `pages: write` e `id-token: write` agora são concedidas somente ao job de deploy.

Resultado verificado: npm passou de 13 achados (10 altos, 3 moderados) para 3 altos e zero moderados/críticos em uma consulta completa pós-alteração. Outra tentativa posterior não conseguiu acessar `registry.npmjs.org` por DNS, portanto a CI deve executar uma consulta atual ao registry. A quantidade de alertas não é medida de explorabilidade.

## Pendências priorizadas

### P1 — Atualizar a cadeia de imagens em migração testada

O audit indica `@11ty/eleventy-img` 7.0.0, `image-size` 2.0.4 e `sharp` 0.35.5 como correções, mas todas exigem atualização major em relação às faixas atuais. Avaliar e atualizar em conjunto para evitar duplicatas vulneráveis. Validar:

- API e opções do shortcode de imagens do Eleventy.
- `scripts/generate-images.cjs` em JPEG/PNG usados pelo projeto.
- Instalação e variantes nativas do Sharp em Node 22/Ubuntu.
- Build público e de revisão, contagens de imagens, páginas, sitemap e artefato.
- Resultado `npm audit` após acesso confiável ao registry.

Não usar `npm audit fix --force` como atalho.

### P1 — Decidir a política para scripts de instalação

O aviso de `allowScripts` de npm 11 permanece. Confirmar como a versão de npm usada no CI trata scripts permitidos/bloqueados e formalizar a aprovação somente após revisar o script `sharp` necessário ao build. Não silenciar o aviso sem verificar a política e manter o build funcional.

### P2 — Reproduzir o runtime de CI

O teste local usou Node 24.21.0/npm 11.19.0, enquanto os workflows selecionam Node 22. Rodar `npm ci`, build e audit em Node 22 no CI. Registrar a versão efetiva de npm; avaliar fixar `packageManager`/npm se isso for necessário para reprodutibilidade.

### P2 — Imutabilidade das GitHub Actions

As actions atuais usam tags major (`checkout@v4`, `setup-node@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4`). Avaliar pin por SHA completo e processo de atualização automatizada/revisada. Não faz parte da correção mínima atual.

## Itens não recomendados

- Não remover `sharp` ou `image-size`: ambos participam da geração/validação de imagens.
- Não adicionar overrides sem confirmar compatibilidade com os pais.
- Não relaxar auditoria npm ou bloquear scripts sem revisar o build.
- Não tratar `npm audit --omit=dev` como prova de ausência de risco de build, pois todas as dependências diretas são de desenvolvimento.

## Estado de publicação

Esta mudança não altera conteúdo, indexação ou artefatos do site. Nenhum merge ou deploy foi executado. A redução de permissões foi validada estruturalmente; a publicação em GitHub Pages só poderá ser validada pelo workflow após merge autorizado.
