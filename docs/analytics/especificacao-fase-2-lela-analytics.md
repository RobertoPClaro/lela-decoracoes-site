# Lela Analytics — especificação da Fase 2

## Objetivo e limites

Construir futuramente um painel independente para consolidar Search Console, GA4 e dados Bing disponíveis. O painel não deve estar hospedado no site público nem receber credenciais no navegador. Esta especificação não cria dashboard nem sincroniza dados.

## Arquitetura proposta

1. **Coletores server-side/CLI** separados por provedor: Search Console API somente leitura (`webmasters.readonly`), Google Analytics Data API e API REST/exportação suportada pelo Bing Webmaster Tools.
2. **Normalização com proveniência**: guardar provedor, propriedade, intervalo, dimensões originais, data de consulta, paginação/limite e marcadores de agregação/ausência.
3. **SQLite privado** para histórico e snapshots, com chaves idempotentes por provedor/propriedade/data/dimensões/métrica e esquema versionado.
4. **Sincronização diária** reentrante, com cotas, backoff, estado por provedor e data da última coleta. Ausência de linha não significa zero.
5. **API e interface separadas** do Eleventy, protegidas por autenticação. O site não chama APIs Google/Bing e não contém refresh tokens.
6. **Classificador de URL** baseado em manifesto do build para mapear canonical a `page_type`, tema, serviço, cidade e localidade.

## Métricas, dimensões e rótulos

- **Search Console observado:** cliques, impressões, CTR e posição devolvidos pela API, para dimensões suportadas como URL, consulta, país e dispositivo. A API tem limites de linhas/cotas e não garante todas as linhas; preservar avisos de amostragem/agregação e dados ausentes.
- **GA4 observado:** usuários/sessões, views, eventos e aquisição conforme dimensões e consentimento. Resultados cobrem apenas medição permitida e dependem das configurações de retenção, atribuição, modelagem e limiares da propriedade.
- **Bing observado:** métricas dos endpoints atuais ou exportações suportadas; identificar o endpoint e cobertura por período.
- **Derivado/estimado:** comparação de 7/28/90 dias com períodos completos equivalentes; agrupamento por tema/serviço/localidade via manifesto; índices heurísticos de oportunidades com fórmula, entradas, versão e rótulo “estimativa”.
- **Avaliação manual:** armazenar pergunta, sistema, data, região/idioma, procedimento e evidência permitida. É uma amostra; não cobertura, posição estável ou promessa de citação.

Não é possível identificar todas as visitas, recomendações, citações ou buscas originadas de ferramentas de IA. Referrers podem não existir, ser agrupados ou parecer tráfego direto. Relatórios de citações cobrem apenas produtos/dados disponibilizados por cada fornecedor.

Não misturar cliques/impressões de Search Console com usuários/sessões de GA4 em uma série sem rótulo. Distinguir ausência, zero, limite da API, dado observado, estimativa e revisão humana em cada visualização.

## Segurança e privacidade

- SQLite pertence à instância privada do painel, não ao site nem ao 3G Analytics.
- Tokens ficam em secret manager/ambiente protegido do servidor, nunca em `dist`, localStorage do site, logs ou navegador.
- Usar escopos de leitura e evitar nomes, telefone, mensagens, conteúdo de formulário e identificadores pessoais.
- Definir retenção, backup, criptografia, acesso, auditoria e exclusão antes de operar.
- A revisão read-only de cópias locais do 3G encontrou a arquitetura provedores → normalização → SQLite → API → UI. As cópias não tinham metadados Git verificáveis, portanto não foi possível confirmar que correspondem ao upstream/produção. Reaproveitar ideias arquiteturais, não credenciais, banco, rotinas ou agendamentos.

## Requisitos de produto

- Períodos 7/28/90 dias e comparativo correspondente, com fuso, intervalo e aviso de período incompleto.
- Drill-down por URL, tema, serviço, cidade, dispositivo, origem e consulta somente quando a fonte suportar a dimensão e não houver supressão.
- Mostrar provedor, atualização, cobertura e limitações ao lado de cada gráfico.
- Não inferir cidade do evento a partir de geolocalização; os slugs enviados pelo site são contexto da página.
- Recomendação automatizada deve mostrar regra e evidência e não se apresentar como métrica do Google.

## Critérios antes de desenvolver

1. Aprovação da Fase 1, eventos e política de privacidade.
2. Propriedades autorizadas e credenciais server-side fornecidas por canal seguro, com escopo mínimo.
3. Verificação manual de Search Console/Bing pela responsável.
4. Aprovação de hospedagem, autenticação, backups e retenção do painel.
5. Spike independente para validar cotas/linhas de cada API e exportabilidade atual dos dados AI Performance do Bing.
6. Definir owner, alertas para falha de sincronização e rotação/revogação de credenciais.

Esses passos são futuros e não autorizam merge, deploy ou conexão de contas.
