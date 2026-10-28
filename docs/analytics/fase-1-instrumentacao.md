# Lela Analytics — Fase 1: instrumentação do site

## Estado

O site não contém GA4, Google Tag Manager, Meta Pixel ou outro script de analytics preexistente. A tag GA4 fica **desligada por padrão**. Nenhum identificador real foi encontrado nem adicionado.

O build só gera o aviso de consentimento e o controlador local quando as três variáveis abaixo estão válidas:

| Variável de repositório do GitHub Actions | Valor necessário |
|---|---|
| `GA4_MEASUREMENT_ID` | ID do fluxo Web no formato `G-…`; é um identificador público, não um segredo |
| `GA4_ENHANCED_OUTBOUND_CLICKS_DISABLED` | `true`, após desativar a medição automática de cliques de saída no fluxo Web GA4 |
| `GA4_ENHANCED_FORM_INTERACTIONS_DISABLED` | `true`, após desativar `form_start`/`form_submit` automáticos no fluxo Web |

Se faltar qualquer confirmação, a tag e a interface de consentimento não entram no HTML. O build imprime um aviso genérico e não revela o ID. Não configurar essas variáveis até concluir as opções da propriedade listadas abaixo.

## Consentimento

- Antes da escolha, nenhum script Google é requisitado e nenhum ping de Consent Mode é enviado (modo básico, bloqueado até opt-in).
- “Recusar medição” guarda `denied`; “Aceitar medição” guarda `granted` em `localStorage` neste navegador.
- A escolha pode ser revista em “Preferências de medição” no rodapé. Ao reabrir as preferências, a coleta é pausada imediatamente; aceitar reativa, recusar mantém a tag bloqueada e limpa cookies `_ga` acessíveis no domínio.
- Sem `localStorage`, a escolha vale apenas para a página atual; nenhuma tag carrega antes do aceite.
- O painel não é modal, não bloqueia a navegação e tem controles de aceite/recusa, foco visível e rótulos acessíveis.
- A implementação é uma escolha conservadora de produto, não uma declaração de conformidade jurídica. A política deve ser revisada por responsável jurídico/privacidade antes da ativação real.

## Contrato de eventos

| Evento | Quando é enviado (somente com opt-in) | Parâmetros próprios | O que **não** significa |
|---|---|---|---|
| `page_view` | Um carregamento completo, pelo comportamento padrão de `gtag('config', …)` | `page_title`, `page_location` e `page_referrer` limitados a origem + caminho, sem query ou fragmento | Não é conversão; não se envia um segundo `page_view` manual |
| `whatsapp_click` | Clique em link real de WhatsApp ou envio válido do formulário que abre WhatsApp | `page_type`, `placement`; contexto conhecido (`theme_slug`, `service_slug`, `city_slug`, `locality_slug`) | Intenção de abrir/iniciar contato; não prova envio de mensagem, resposta ou contratação |
| `catalog_theme_click` | Clique do catálogo para a página de um tema | `page_type`, `placement`, `theme_slug`; contexto regional comprovado quando disponível | Não significa disponibilidade ou reserva |
| `catalog_search` | Campo de busca muda e perde foco/confirma a edição | `has_query` (0/1), `results_count`, `page_type` e contexto estático | O texto consultado nunca é enviado |
| `catalog_filter` | Clique em filtro de categoria | `filter_slug`, `results_count`, `page_type` e contexto estático | Não mede preferência individual fora do filtro selecionado |
| `phone_click` | Clique em link `tel:` | `page_type`, `placement` e contexto estático | O número discado não é enviado |

Não há evento `generate_lead`: o site estático não confirma envio efetivo da mensagem, atendimento, orçamento ou contratação. Cliques separados são intenções separadas; um guard de 700 ms evita duplicação acidental do mesmo listener/elemento. Cliques de recusa/aceite não são enviados ao GA.

Atualmente não há links `tel:` no site (os contatos telefônicos apontam para WhatsApp). Portanto `phone_click` só será emitido se surgir um link de chamada real no futuro; o número não é parâmetro.

Os valores de cidade/localidade/serviço vêm de metadados estáticos da página ou de contexto interno validado contra o registro local e um referrer próprio. Não há geolocalização do visitante. Eventos próprios não incluem link, texto de mensagem, telefone, conteúdo do formulário, busca textual ou URL completa de WhatsApp.

## Pré-requisitos na propriedade GA4

Antes de definir variáveis do Actions:

1. No fluxo Web, desative a medição automática de **Outbound clicks** e **Form interactions**; esses eventos podem enviar `link_url` e `form_destination`. O Google documenta que Enhanced Measurement detecta esses eventos sem código adicional.
2. Mantenha a visualização normal dos carregamentos de página. Não crie uma tag adicional em GTM nem evento manual `page_view`. O site é multipágina estático e executa um único `config` por carregamento. Se futuramente houver navegação SPA/history, reavalie duplicidade antes de habilitar essa medição.
3. Para manter a whitelist desta fase, deixe outras medições automáticas de interação desligadas e reveja cada uma antes de ligar.
4. Registre dimensões personalizadas event-scoped no GA4 somente para os parâmetros necessários: `page_type`, `theme_slug`, `service_slug`, `placement`, `city_slug`, `locality_slug`, `filter_slug`, `results_count`, `has_query`.
5. Depois da ativação autorizada, valide DebugView/Realtime e a aba de rede com consentimento de teste; confirme ausência de eventos `click` contendo `link_url` WhatsApp. A configuração do fluxo exige permissão de Editor.

O gate de build exige duas variáveis explícitas declarando que as medições automáticas de saída e formulário foram desligadas. É uma proteção contra ativação acidental, não uma verificação técnica da configuração remota.

## Privacidade e ANPD

A política foi alterada condicionalmente ao modo do build. No estado atual (sem ID/flags), informa que GA4 está inativo. No build habilitado, descreve opt-in, preferência local, revisão no rodapé, eventos gerais e ausência do conteúdo de formulário/WhatsApp nos eventos próprios. Também informa que o Google pode processar dados técnicos necessários ao serviço.

A orientação da ANPD para cookies trata de transparência e opções reais para cookies não necessários e recomenda mecanismo para revisão de escolhas. Isso não substitui avaliação jurídica da base legal, retenção, papéis, transferências e texto final aplicável à empresa.

## Passos manuais pendentes

1. A responsável deve criar/identificar propriedade GA4 e fluxo Web autorizados; não colocar token ou ID inexistente no código.
2. Desativar as medições automáticas de saída e formulário no fluxo e revisar o comportamento de page_view conforme acima.
3. Revisar a política e as configurações de retenção/consentimento com responsável pela privacidade.
4. Adicionar as três variáveis em **Settings → Secrets and variables → Actions → Variables**. Não adicionar GA4 via GTM em paralelo.
5. Validar primeiro em ambiente de revisão: rede antes/depois do aceite, recusa, revogação, DebugView e ausência de `link_url`/`form_destination`.
6. Só após revisão e autorização, integrar e publicar. Esta branch não ativa a tag na produção.

## Fontes oficiais

- [ANPD — Guia Orientativo: Cookies e Proteção de Dados Pessoais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais)
- [Google — Configure o Google tag](https://developers.google.com/tag-platform/gtagjs/configure)
- [Google — Medir pageviews no GA4](https://developers.google.com/analytics/devguides/collection/ga4/views?hl=en)
- [Google — Enhanced Measurement e parâmetros coletados](https://support.google.com/analytics/answer/9216061?hl=en)
- [Google — Privacidade e consentimento para Google tag](https://developers.google.com/tag-platform/security/guides/consent)
