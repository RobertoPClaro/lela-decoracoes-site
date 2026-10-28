# Lela Analytics — relatório de entrega da Fase 1

**Data:** 28/10/2026
**Branch:** `feat/lela-analytics-instrumentation`
**Base local conhecida:** `09186d9` (último `origin/main` disponível antes da falha de DNS; atualidade da main remota não confirmada).

## Implementado

- Instrumentação GA4 opcional no Eleventy, desligada por padrão e sem ID real embutido.
- A tag, o painel de escolha e o script local só entram no HTML quando há um ID válido e as duas confirmações de configuração do fluxo GA4 estão definidas como `true`.
- Consentimento em modo básico: nenhum pedido ao Google antes do aceite; recusa, armazenamento local da escolha e controle no rodapé para reabrir/revogar.
- `page_view` pelo `gtag('config')` padrão, sem evento manual duplicado.
- Eventos próprios `whatsapp_click`, `catalog_theme_click`, `catalog_search`, `catalog_filter` e `phone_click`; nenhum `generate_lead`.
- Contexto de página/tema/serviço/cidade/localidade enviado apenas quando disponível nos dados estáticos ou validado pelo contexto interno. Mensagem, telefone, conteúdo de formulário, consulta de busca e URL completa de WhatsApp não entram nos eventos próprios.
- Política de privacidade condicional ao build e documentos de preparação do Search Console/Bing e da especificação da Fase 2.
- Nenhuma regra de indexação, URL, canonical, sitemap, robots, imagem, conteúdo comercial ou página noindex alterada.

## Evidências de teste

- `npm ci --offline`: concluído anteriormente; 158 pacotes adicionados, 159 auditados, sem vulnerabilidades reportadas naquela instalação. Não foi repetido nesta etapa.
- `SITE_URL=https://leladecoracoes.com PATH_PREFIX=/ npm test`, sem variáveis de GA4: **passou em Node 24.21.0 / npm 11.19.0**.
- Build: 157 HTML; 95 imagens originais × 5 larguras × 3 formatos = 1.425 variantes; 1.427 referências locais; 76 temas (73 indexáveis, 3 noindex); 61 páginas locais noindex; 3 páginas regionais indexáveis; 0 drafts; 92 URLs no sitemap.
- Validação da instrumentação: as 157 páginas foram verificadas sem painel, sem script GA4 e sem botão de preferências quando a integração está desligada.
- Testes de configuração: seis casos passaram, incluindo gate sem ID, gate incompleto, gate completo, ID inválido e mensagens de erro sem ecoar o valor.
- Testes de navegador em build local consentido: ausência de chamadas/tag antes do aceite; um `config` e pageview padrão após aceite; eventos de busca/filtro/tema/WhatsApp; contexto regional preservado; formulário não envia campos pessoais; revogação interrompe novos eventos; painel funcional em 320, 390 e 1440 px. Nenhuma mensagem real foi aberta ou enviada.
- `node --check` dos scripts alterados e `git diff --check`: passaram.

## Limitações e passos manuais

- Node 22 não está instalado neste ambiente e não foi possível obtê-lo sem rede. O CI da branch deverá confirmar a compatibilidade com o runtime do Pages antes da aprovação final.
- Não foi encontrado ID GA4 real. Por isso, a versão candidata atual não inclui tag nem interface de consentimento e não coleta dados.
- A confirmação das duas opções de medição automática é uma barreira operacional por variável do GitHub; não comprova por si só a configuração da propriedade Google. Antes da ativação, a proprietária deve desligar cliques externos e interações automáticas de formulário no fluxo Web e verificar DebugView/rede.
- Política de privacidade e base legal devem ser revisadas pela responsável apropriada antes de eventual ativação; esta implementação conservadora não declara conformidade jurídica.
- A autenticação do `gh` falhou e `git fetch` não resolveu DNS (`github.com`). Não foi possível confirmar a main remota atual, fazer push, abrir Draft PR ou consultar checks. Nenhuma credencial foi alterada.
- Search Console, Bing Webmaster Tools e contas Google não foram acessados; os documentos descrevem somente os passos manuais. A Fase 2 não foi implementada.

## Arquivos

Implementação em `.github/workflows/pages.yml`, `package.json`, `src/_data/site.cjs`, templates/partials, `src/assets/js/analytics-consent.js`, `src/assets/js/main.js`, CSS, política de privacidade e dois scripts de validação/teste. Documentação adicional em `fase-1-instrumentacao.md`, `preparacao-search-console-bing.md` e `especificacao-fase-2-lela-analytics.md`.

## Próxima etapa segura

Confirmar a branch com a main remota no terminal autenticado, executar o workflow/CI com Node 22 e abrir um **Draft PR**. A ativação GA4 depende de revisão da Fase 1, do ID real e das configurações do fluxo; não publicar ou ativar antes dessa revisão.
