# Backlog de SEO e mensuração — 15/10/2026

> Snapshot histórico. Atualização em 16/10/2026: o fluxo de publicação local foi implementado na branch `feat/seo-local-completo`; consulte [`seo-local-completo-2026-10-16.md`](seo-local-completo-2026-10-16.md) para o estado candidato. As 61 localidades ficam públicas em `noindex` por falta de evidência editorial própria para indexação. GSC, GA4 e Perfil da Empresa no Google não fazem parte desta fase.

| Prioridade | Item | Estado | Ação concreta | Evidência que falta | Dependência |
|---|---|---|---|---|---|
| P1 | PR principal da branch `feat/catalogo-regioes` | Aguardando credencial | Autorizar GitHub CLI, enviar branch e abrir PR para `main`; não fazer merge | Token GH atual inválido; autenticação web pendente | Proprietário concluir OAuth |
| P1 | Confirmar Google Business Profile | BLOQUEADO | Acessar a conta da empresa, conferir ficha, telefone, endereço e tipo de operação antes de qualquer ajuste | Ficha oficial e elegibilidade/endereço de atendimento não verificados | Acesso da proprietária e confirmação se clientes são recebidos no endereço |
| P2 | Search Console | BLOQUEADO | Conceder acesso de leitura; conferir propriedade, sitemap, consultas, cobertura, páginas excluídas e URLs prioritárias | Dados de conta e relatórios reais | Acesso do proprietário |
| P2 | Palavras-chave e concorrentes | PARCIAL | Usar consultas/impressões do GSC para validar hipóteses; atualizar comparação de páginas de Joinville/Araquari | Volume, impressões, cliques e SERP local observada | Acesso ao GSC; sem isso manter como pesquisa qualitativa |
| P2 | Indexação individual de bairros | PARCIAL | Manter 61 drafts até existir informação local útil e verificável; revisar piloto um a um, ou consolidar na cidade | Fotos autorizadas, fatos próprios ou logística local específica; tráfego/consultas | Proprietária para fatos/fotos; GSC para evidência de procura |
| P2 | Nomes/associações de temas pendentes | PARCIAL | Confirmar Animais da Floresta, Roedor Fofo, Seleção Brasileira/Brasil Futebol e arquivo antigo associado a Tropa dos Rosa | Confirmação comercial e/ou autorização/identificação da arte | Proprietária |
| P2 | GA4 e conversões | BLOQUEADO | Confirmar propriedade e ID; aprovar consentimento; configurar eventos de WhatsApp, busca e filtro sem PII | ID, propriedade e política de consentimento | Acesso/decisão da proprietária; não instalado |
| P2 | Core Web Vitals de campo | NÃO INICIADO | Verificar CrUX/GSC/PageSpeed com URLs e datas; separar LCP, INP e CLS de laboratório | Dados de campo disponíveis e baseline | Acesso Search Console ou URL pública/CrUX; laboratório não substitui campo |
| P2 | Auditoria de acessibilidade | PARCIAL | Rodar scanner WCAG e fazer teste de leitor de tela/teclado com roteiro | Resultado axe/WAVE e leitor de tela | Não depende da proprietária; pode ser executado na próxima rodada |
| P3 | Visibilidade em mecanismos de IA | NÃO INICIADO | Registrar consultas reproduzíveis, data, sistema, resposta e citações; repetir em cadência definida | Resultados observados e histórico comparável | Acesso público aos sistemas; nenhuma promessa de citação |
| P3 | Revisão de Mini Festa na Mesa | PARCIAL | Confirmar montagem, entrega, retirada, devolução e composição antes de detalhar páginas | Regras atuais do serviço | Proprietária |
| P3 | Rotina de atualização | PRONTA PARA PLANEJAR | Definir revisão trimestral de cobertura, catálogo, perfil, sitemap e consultas | Responsável e cadência | Proprietária |

## Guardrails

- Não promover páginas `DRAFT_PREVIEW` ou temas `noindex` em lote.
- A contratação do Pegue e Monte com retirada, a disponibilidade de tema e a entrega são fatos distintos.
- O endereço do Paranaguamirim é o ponto divulgado para retirada; não implica endereço de atendimento público ou elegibilidade automática no Google Maps.
- Nenhuma métrica de tráfego, volume de busca, posição, conversão ou Core Web Vitals de campo foi inventada ou presumida.
