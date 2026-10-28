# Preparação manual: Search Console e Bing Webmaster Tools

Esta documentação não cria propriedades, não verifica domínio, não consulta contas e não envia o sitemap. A instrumentação GA4 desta branch é independente dessas ferramentas.

## Google Search Console — passos para a proprietária

1. Entrar no Search Console com a conta Google autorizada pela Lela.
2. Adicionar a propriedade de domínio `leladecoracoes.com` (cobre protocolos e subdomínios).
3. O Google fornecerá um valor TXT único. Adicioná-lo no DNS do domínio sem copiá-lo ao repositório ou compartilhá-lo em relatório.
4. Aguardar a propagação e verificar. Se não houver acesso ao DNS, escolher uma alternativa suportada pelo Search Console e aprovada pela responsável técnica.
5. Enviar `https://leladecoracoes.com/sitemap.xml` na área Sitemaps.
6. Conferir cobertura, URLs importantes, HTTPS, ações manuais e problemas de segurança. Uma URL indexável ou no sitemap **não** tem indexação garantida.
7. Preservar `noindex` dos 61 locais e dos três temas pendentes; revisar cada URL antes de qualquer futura mudança.

Não publicar valores de verificação, TXT, tokens ou capturas com dados da conta. Nenhuma propriedade foi conectada nesta etapa.

### Relatórios de IA do Google

O Search Console oferece um relatório de desempenho de recursos generativos na Pesquisa, incluindo AI Overviews/AI Mode conforme elegibilidade e disponibilidade da propriedade. Consultas e métricas são agregadas e não representam todas as respostas, citações ou visitas de sistemas de IA. Tratar como observação do produto, não inventário completo.

Fonte: [Google Search Console — relatório de desempenho de IA](https://support.google.com/webmasters/answer/16984139?hl=en).

## Bing Webmaster Tools — passos para a proprietária

1. Entrar no Bing Webmaster Tools com conta autorizada.
2. Adicionar `https://leladecoracoes.com/`. Se Search Console já estiver verificado e a importação estiver disponível, avaliar a importação; caso contrário, usar o método de verificação oferecido pelo Bing, como DNS.
3. Enviar `https://leladecoracoes.com/sitemap.xml`.
4. Revisar inspeção de URL, indexação, desempenho e diagnósticos na ferramenta.
5. Manter credenciais de API fora do site público e restringir a leitura quando a Fase 2 for planejada.

Os endpoints antigos SOAP/POX do Bing Webmaster Tools foram aposentados em 31/08/2026. A Fase 2 deve validar endpoint REST, permissões e disponibilidade atuais antes de sincronizar.

### Bing AI Performance

O AI Performance foi anunciado como public preview e expõe amostras de citações/páginas e grounding queries para produtos Microsoft cobertos. Não representa todas as citações nem todo o tráfego de IA, não estabelece posição universal e pode ter limitações de período e disponibilidade. Usar somente dados visíveis/exportáveis da conta, registrando a data.

Fontes: [Bing Webmaster Tools — documentação](https://learn.microsoft.com/en-us/bingwebmaster/), [acesso às APIs](https://learn.microsoft.com/en-us/bingwebmaster/getting-access), [anúncio AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/).

## Baseline técnico a preservar

O último baseline local conhecido é 92 URLs no sitemap, com 73 temas indexáveis, 3 temas `noindex` e 61 páginas individuais de localidades `noindex`; Joinville, Araquari e Paranaguamirim seguem indexáveis. Esta fase não altera robots, canonicals, URLs, sitemap ou indexação. Recalcular no build antes de futura submissão; o baseline não presume indexação efetiva.
