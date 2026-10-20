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

A auditoria anterior do registry registrou 3 vulnerabilidades altas e nenhuma moderada ou crítica, agrupadas pelos pacotes acima. Após a atualização, npm audit --json não completou por falha DNS EAI_AGAIN registry.npmjs.org; não há contagem posterior confiável e não se declara que o projeto está livre de vulnerabilidades.

A versão image-size 2.0.4 é a versão latest atualmente listada pelo npm. Entretanto, o advisory público GHSA-qmwv-h59h-wjxj no repositório oficial image-size apresenta uma fronteira inconsistente: marca <=2.0.4 como afetada e também 2.0.4 como corrigida. A base global de advisories e o registry não permitiram resolver a inconsistência nesta execução. Portanto, a atualização atende às correções indicadas pelas advisories retornadas no audit anterior, mas 2.0.4 não é certificada aqui como solução inequívoca para esse advisory específico. Não foi adotado um fork de terceiros.

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
- npm audit --json: inconclusivo por EAI_AGAIN no registry.
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

1. Reexecutar npm audit --json com acesso ao registry e salvar a resposta integral.
2. Obter esclarecimento do responsável pelo GHSA-qmwv-h59h-wjxj sobre a versão efetivamente corrigida.
3. Se o advisory continuar sem fronteira confiável, avaliar uma versão upstream posterior ou uma alternativa mantida; qualquer substituição exige nova análise de compatibilidade e regressões.
4. O resultado npm audit --omit=dev não cobre os riscos das ferramentas de build.

Status: testes de build e integridade de imagens aprovados; confirmação final de advisories permanece pendente por indisponibilidade do registry e metadados contraditórios.
