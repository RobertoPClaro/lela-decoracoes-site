# Lela Decorações — site estático

Implementação estática do plano aprovado para a Lela Decorações. O projeto gera apenas HTML, CSS, JavaScript mínimo e imagens derivadas para publicação em GitHub Pages.

## Desenvolvimento local

```bash
npm install
npm run build
npm start
```

O preview abre em `http://localhost:8080/`. Para simular publicação em uma subpasta:

```bash
PATH_PREFIX=/meu-repositorio/ SITE_URL=https://usuario.github.io npm run build
```

`SITE_URL` é a origem sem caminho; `PATH_PREFIX` é o caminho de publicação. No domínio próprio, use `SITE_URL=https://leladecoracoes.com` e `PATH_PREFIX=/`.

## Imagens

Os originais estão em `src/assets/images/originals/` e não são publicados diretamente. O build gera AVIF, WebP e JPEG responsivos em `dist/assets/images/generated/`, com `picture`, `srcset`, `sizes`, dimensões e lazy loading abaixo do primeiro bloco.

O acervo respeita a organização confirmada pela proprietária:

- `Tema Menina`
- `Tema Menino`
- `Tema Adulto`
- `Tema Diversos`
- `Tema Futebol`
- `kits` como exemplos de montagem, separado dos temas

## Publicação no GitHub Pages

O site oficial é `https://leladecoracoes.com`. O workflow em `.github/workflows/pages.yml` executa `npm ci`, `npm run build`, valida o resultado e publica `dist` no GitHub Pages usando **GitHub Actions**.

As variáveis de produção do repositório são:

```text
PATH_PREFIX=/
SITE_URL=https://leladecoracoes.com
```

Com o workflow atual, o GitHub Pages usa o domínio customizado configurado nas definições do repositório; não é necessário adicionar `CNAME` ao código. O `www` deve ser configurado no DNS como CNAME para `robertopclaro.github.io` e o GitHub Pages fará o redirecionamento para o domínio canônico quando os dois registros estiverem corretos.

Para o domínio raiz, configure na Hostinger os quatro registros A oficiais do GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`. Remova apenas o registro de estacionamento/construtor que conflitar com o domínio; preserve registros de e-mail como MX, SPF, DKIM e DMARC.

Depois da propagação DNS e emissão do certificado, habilite **Enforce HTTPS** em Settings → Pages. O deploy ocorre automaticamente a cada push na branch `main`.

## Dados ainda pendentes

O site sinaliza de forma explícita o que precisa ser reconfirmado: catálogo e composição exata de cada kit, preços, disponibilidade, antecedência mínima, dias operacionais, condições de entrega, contrato e depoimentos verificáveis. Nenhum preço, avaliação ou item não confirmado foi inventado.
