# Migração da cadeia de imagens — outubro de 2026

## Escopo e decisão

A migração foi realizada na branch fix/security-image-dependencies, baseada na main 077d00243fed457d4924155c0cffc7738e725505, já contendo o merge do PR #12. O escopo ficou restrito às dependências e aos pontos de integração do processamento de imagens.

## Dependências

| Pacote | Antes | Depois | Alteração |
|---|---:|---:|---|
| @11ty/eleventy-img | 6.0.4 | 7.0.0 | Import dinâmico do export default ESM no shortcode assíncrono; opções e HTML mantidos. |
| image-size | 1.2.1 | 2.0.4 | Import nomeado imageSize e leitura do buffer local, pois a API síncrona por caminho foi removida. |
| sharp | 0.33.5 | 0.35.5 | Atualização de APIs usadas sem alteração do pipeline de formatos ou larguras. |

Os três pacotes são dependências de desenvolvimento usadas no build. Não são enviados ao navegador. As ferramentas ainda processam imagens durante desenvolvimento e CI, então a exposição de build não é nula.

## Segurança e ressalvas

A auditoria válida do registry antes da migração registrou 3 vulnerabilidades altas e nenhuma moderada ou crítica, agrupadas pelos pacotes acima. A auditoria final, executada em 2026-10-20 após a atualização, retornou zero vulnerabilidades (0 low, moderate, high ou critical). Uma tentativa anterior falhou por EAI_AGAIN, mas a consulta final concluiu com sucesso. Esse resultado descreve a base de advisories retornada pelo registry e não resolve a advisory repository-level contraditória de image-size abaixo.

| Auditoria npm | Antes | Depois |
|---|---:|---:|
| Críticas | 0 | 0 |
| Altas | 3 | 0 |
| Moderadas | 0 | 0 |
| Baixas/informativas | 0 | 0 |
| Total | 3 | 0 |

Em 2026-10-20, o npm lista image-size 2.0.4 como latest. Entretanto, o advisory público GHSA-qmwv-h59h-wjxj no repositório oficial image-size apresenta uma fronteira inconsistente: marca <=2.0.4 como afetada e também 2.0.4 como corrigida. A consulta global do GitHub Advisory Database retorna 404 para esse identificador, e o npm audit concluído não o reportou; nenhum dos dois resultados resolve a inconsistência do texto do advisory. Portanto, a atualização atende às correções indicadas pelos advisories npm anteriores, mas 2.0.4 não é certificada aqui como solução inequívoca para esse advisory específico. Não foi adotado um fork de terceiros.

A migração de sharp também removeu a necessidade do install/check observado na versão 0.33.5. Em npm 10.9.9 com Node 22, npm ci terminou sem aviso de scripts e o módulo nativo codificou uma imagem JPEG. A diferença de política de lifecycle entre npm 10 e npm 11 pode produzir avisos diferentes; o CI seleciona Node 22, mas não fixa a versão npm.

Fontes: [advisory GHSA-qmwv-h59h-wjxj](https://github.com/image-size/image-size/security/advisories/GHSA-qmwv-h59h-wjxj), [pacote image-size no npm](https://www.npmjs.com/package/image-size), [advisories do Sharp](https://github.com/lovell/sharp/security/advisories).

## Validação

Executado com Node 22.23.3 e npm 10.9.9:

- npm ci: sucesso, 160 pacotes instalados; Sharp 0.35.5 nativo carregou e codificou JPEG.
- SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test: sucesso.
- node --check em .eleventy.cjs e src/_data/portfolio.cjs: sucesso.
- git diff --check: sucesso.
- npm ls: uma instância de cada dependência-alvo; Sharp deduplicado pelo Eleventy Img.
- Decodificação integral: todos os derivados da baseline e da migração foram lidos sem erro.
- npm audit --json: execução final com código 0 e contagem 0/0/0/0 no registry. A resposta foi salva fora do repositório em /tmp/lela-security-image-migration/agents/05-npm-audit-final.json.
- npm audit --omit=dev: saída vazia para o escopo sem dependências de runtime; não substitui a auditoria das ferramentas de build.

O build validado contém 157 HTML, 1.425 imagens derivadas (475 AVIF, 475 JPG e 475 WebP), 76 páginas de temas (73 indexáveis e 3 noindex), 61 páginas individuais de localidades noindex, 3 páginas regionais indexáveis, 92 URLs no sitemap e zero DRAFT_PREVIEW.

Nomes e dimensões dos 1.425 derivados coincidem com a baseline Node 22. Todos os arquivos da baseline e da saída atual foram decodificados integralmente. A inspeção visual de amostras Bluey e decoração adulta não mostrou mudança perceptível. O validador e os dados de LocalBusiness/areaServed não foram alterados; uma execução inicial sem as variáveis requeridas não reproduziu falha na execução oficial de npm test.

## Arquivos alterados

- package.json
- package-lock.json
- .eleventy.cjs
- src/_data/portfolio.cjs
- docs/security/migracao-imagens-2026-10.md

## Risco residual e acompanhamento

1. Obter esclarecimento do responsável pelo GHSA-qmwv-h59h-wjxj sobre a fronteira de versão: a auditoria do registry retorna zero, mas o advisory da página do projeto continua contraditório e não aparece na consulta npm concluída.
2. Se o advisory continuar sem fronteira confiável, avaliar uma versão upstream posterior ou uma alternativa mantida; qualquer substituição exige nova análise de compatibilidade e regressões.
3. O resultado npm audit --omit=dev não cobre os riscos das ferramentas de build.

Status: migração e auditoria npm do registry aprovadas; permanece documentada a incerteza específica do advisory repository-level de image-size.
