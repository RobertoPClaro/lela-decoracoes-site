# SEO: estado e próximas ações — 16/10/2026

Este relatório acompanha a branch `feat/seo-local-completo` e o PR #7. É um snapshot do build candidato, não indica merge, deploy nem indexação no Google.

## Concluído nesta etapa

- Revisadas individualmente as 55 páginas de tema que estavam `PENDING_EDITORIAL_REVIEW`, com texto visual específico, alt text, metadados, FAQ contextual e decisão editorial por registro.
- Estado consolidado do catálogo: 73 `PUBLIC_INDEX` e 3 `PUBLIC_NOINDEX`. As três páginas fora do sitemap são Ana Castela – A Boiadeira (identidade na imagem), Maria Clara e JP (associação da imagem) e Tropa dos Rosa (associação das duas artes); ver evidências no inventário editorial.
- Resolvidas pela inspeção visual três pendências antigas: nome genérico de Animais da floresta, nome genérico de Roedor fofo e correspondência das fotos de Brasil Futebol. Não há alegação de afiliação oficial.
- Resultado dos temas: 73 `PUBLIC_INDEX`, 3 `PUBLIC_NOINDEX`; veja o [inventário editorial individual](temas-editorial-2026-10-16.md).
- As 61 páginas regionais continuam acessíveis no build público em `PUBLIC_NOINDEX`; não há `DRAFT_PREVIEW`. O piloto avaliou oito localidades e manteve noindex onde não existe evidência editorial própria da operação. Veja a [matriz regional](seo-local-completo-2026-10-16.md).
- O catálogo local e os 76 temas permanecem completos. As páginas municipais e regionais foram ajustadas para reduzir repetição sem alterar as regras comerciais.

## Pendências

| Prioridade | Item | Estado | Próxima ação concreta | Dependência |
|---|---|---|---|---|
| P1 | Nome de Ana Castela – A Boiadeira | CONFIRMAÇÃO NECESSÁRIA | Confirmar com a proprietária que a pessoa retratada é Ana Castela; manter noindex até lá. | Proprietária do projeto |
| P1 | Associação de Maria Clara e JP | CONFIRMAÇÃO NECESSÁRIA | Validar a identificação, pois o arquivo original menciona Turma da Mônica e a arte não contém nomes legíveis. | Proprietária do projeto |
| P1 | Associação das imagens de Tropa dos Rosa | CONFIRMAÇÃO NECESSÁRIA | Confirmar se as duas artes pertencem ao mesmo tema ou corrigir o agrupamento em outra etapa. | Proprietária do projeto |
| P2 | Indexação individual de bairros | AVALIADO; MANTER NOINDEX | Reavaliar somente quando houver informação comercial ou editorial local real, como logística própria confirmada ou fotos autorizadas de montagens naquela localidade. | Evidência da operação; dados de busca podem complementar, não substituir, valor editorial |
| P2 | Search Console | FORA DESTA MISSÃO | Conceder acesso de leitura para analisar consultas, cobertura e canonical selecionada depois da revisão do site. | Acesso do proprietário |
| P2 | Acessibilidade com leitor de tela | PARCIAL | Complementar scanner e teclado com leitor de tela em uma próxima rodada. | Ferramenta/sistema de leitura disponível |
| P2 | Core Web Vitals de campo | NÃO MEDIDO | Depois da publicação, consultar dados reais de CrUX/Search Console e separá-los das métricas de laboratório. | Acesso externo ou dados públicos de CrUX |
| P2 | GA4 e conversões | FORA DESTA MISSÃO | Não instalar até receber propriedade/ID e aprovação de consentimento; evitar PII nos eventos. | Acesso e decisão da proprietária |
| P3 | Mini Festa na Mesa | REGRAS OPERACIONAIS NÃO GENERALIZADAS | Confirmar montagem, entrega, retirada, devolução e composição específicas antes de ampliar o conteúdo. | Proprietária do projeto |
| P3 | Perfil da Empresa no Google | FORA DESTA MISSÃO | Não criar ou alterar perfil sem confirmar elegibilidade, titularidade e endereço apropriado. | Acesso e confirmação da proprietária |

## Guardrails

- A contratação do Pegue e Monte com retirada, a disponibilidade de um tema e a possibilidade de entrega são fatos distintos.
- O ponto divulgado em Paranaguamirim não implica que clientes sejam recebidos sem agendamento nem que exista uma unidade nos bairros.
- A inclusão de URL no sitemap não garante indexação.
- Não há métricas de tráfego, volume de busca, posição, conversão ou Core Web Vitals de campo nesta execução.
- Nenhuma regra do Pegue e Monte foi extrapolada à Mini Festa na Mesa.
