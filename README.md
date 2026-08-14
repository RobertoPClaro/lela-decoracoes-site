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
PATH_PREFIX=/meu-repositorio/ SITE_URL=https://usuario.github.io/meu-repositorio npm run build
```

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

O workflow em `.github/workflows/pages.yml` executa `npm ci`, `npm run build`, valida o resultado e publica `dist`. Ative Pages com a fonte **GitHub Actions**.

Por padrão, o workflow assume GitHub Pages de projeto e monta automaticamente `PATH_PREFIX` como `/<nome-do-repositorio>/`. Para domínio próprio, configure as variáveis do repositório:

```text
PATH_PREFIX=/
SITE_URL=https://seudominio.com
```

O domínio real e o arquivo `CNAME` só devem ser adicionados após autorização e confirmação da cliente.

## Dados ainda pendentes

O site sinaliza de forma explícita o que precisa ser reconfirmado: catálogo e composição exata de cada kit, preços, disponibilidade, antecedência mínima, dias operacionais, condições de entrega, contrato e depoimentos verificáveis. Nenhum preço, avaliação ou item não confirmado foi inventado.
