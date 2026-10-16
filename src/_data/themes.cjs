const portfolio = require("./portfolio.cjs");
const editorialReviews = require("./themeEditorialReviews.cjs").reviews;

const pageDefinitions = [
  {
    slug: "safari-baby", name: "Safari Baby",
    title: "Safari Baby em Joinville e Araquari | Lela Decorações",
    description: "Veja a referência de painel e o exemplo de montagem Safari Baby no acervo. Consulte formato, data e logística para sua festa em Joinville ou Araquari.",
    h1: "Referências de decoração Safari Baby para festa",
    intro: "No acervo, Safari Baby aparece em um painel com animais da savana e em uma mesa montada com balões e peças decorativas. Envie a data e a cidade para consultar se esse estilo está disponível para sua comemoração.",
    galleryTitle: "Painel e montagem Safari Baby",
    galleryText: "O painel mostra animais em tons suaves, enquanto o exemplo de montagem combina o painel com balões em cores terrosas e verdes. As fotos identificam o estilo visual; a composição do kit reservado precisa ser confirmada.",
    related: ["Fazendinha", "Arca de Noé", "Dinossauros Baby"],
    images: [
      { file: "Tema Menino/tema-safari-01.jpeg", alt: "Painel de referência Safari Baby com animais da savana em tons suaves.", caption: "Painel de animais da savana" },
      { file: "kits/kit-safari-01.png", alt: "Exemplo de mesa Safari Baby com painel, balões e peças decorativas.", caption: "Exemplo de montagem Safari Baby" }
    ],
    faqs: [{ question: "O exemplo Safari Baby confirma os itens do kit?", answer: "Não. A foto mostra uma ideia de montagem com painel, balões e peças decorativas. Consulte a Lela para saber quais itens estão disponíveis na data e no formato que você procura." }]
  },
  {
    slug: "bluey", name: "Bluey",
    title: "Decoração Bluey em Joinville e Araquari | Lela Decorações",
    description: "Compare o painel ilustrado e a mesa montada no tema Bluey. Consulte se o tema e o formato desejado estão disponíveis em Joinville ou Araquari.",
    h1: "Referências de decoração Bluey para festa",
    intro: "A referência Bluey mostra a família de personagens em uma paleta azul e laranja; a foto de montagem apresenta o painel junto à mesa. Informe a data e a cidade para consultar a disponibilidade do tema.",
    galleryTitle: "Referência ilustrada e exemplo de mesa Bluey",
    galleryText: "Uma foto aproxima a arte do painel; a outra mostra como esse visual pode aparecer numa mesa decorada. A montagem fotografada não define os itens, o tamanho ou a composição de uma reserva.",
    related: ["A Casa Mágica da Gabby", "Patrulha Canina", "Mundo Bita"],
    images: [
      { file: "Tema Menino/tema-bluey-01.jpeg", alt: "Painel de referência Bluey com os personagens em fundo azul e laranja.", caption: "Painel ilustrado Bluey" },
      { file: "kits/kit-bluey-01.png", alt: "Exemplo de mesa montada Bluey com painel e peças decorativas.", caption: "Exemplo de montagem Bluey" }
    ],
    faqs: [{ question: "A referência Bluey está disponível em qual formato?", answer: "A imagem não confirma se o tema está disponível como Pegue e Monte ou Mini Festa na Mesa. Envie a data e a cidade pelo WhatsApp para a Lela verificar os formatos possíveis." }]
  },
  {
    slug: "dinossauros", name: "Dinossauros",
    title: "Decoração Dinossauros em Joinville e Araquari | Lela Decorações",
    description: "O acervo reúne painel e duas ideias de mesa com dinossauros. Veja as diferenças visuais e consulte data e composição em Joinville ou Araquari.",
    h1: "Referências de decoração Dinossauros para festa",
    intro: "O tema Dinossauros tem uma referência de painel com arte realista e duas fotos de montagem com apresentações diferentes. Se esse é o estilo da festa, envie a data para confirmar o formato disponível.",
    galleryTitle: "Painel e duas ideias de montagem",
    galleryText: "As fotos de montagem não são iguais: uma segue a arte realista do painel e outra usa uma composição distinta, com balões e peças próprias. O painel pastel de Dinossauros Baby aparece como outro tema no catálogo.",
    related: ["Dinossauros Baby", "Safari Baby", "Fazendinha"],
    images: [
      { file: "Tema Menino/tema-dinossauros-02.jpeg", alt: "Painel de referência com dinossauros em arte realista.", caption: "Painel de dinossauros" },
      { file: "kits/kit-dinossauros-01.png", alt: "Exemplo de montagem com painel de dinossauros e balões verdes e terrosos.", caption: "Montagem com arte realista" },
      { file: "kits/kit-dinossauros-02.jpeg", alt: "Outra montagem de mesa no tema Dinossauros, com arco de balões.", caption: "Outra proposta de montagem" }
    ],
    faqs: [{ question: "Dinossauros e Dinossauros Baby são a mesma referência?", answer: "Não. O catálogo separa o painel realista do tema Dinossauros da ilustração pastel cadastrada como Dinossauros Baby. Consulte qual opção está disponível para a data da festa." }]
  },
  {
    slug: "casa-magica-da-gabby", name: "A Casa Mágica da Gabby",
    title: "A Casa Mágica da Gabby em Joinville e Araquari | Lela Decorações",
    description: "Veja o painel ilustrado e a foto de montagem associada à Casa Mágica da Gabby. Consulte tema, formato e data para Joinville ou Araquari.",
    h1: "Referências de decoração da Casa Mágica da Gabby",
    intro: "A página reúne uma referência ilustrada da Casa Mágica da Gabby e uma mesa montada com painéis coloridos e peças decorativas. Conte qual estilo procura e consulte a opção disponível para sua data.",
    galleryTitle: "Painel e exemplo de montagem da Gabby",
    galleryText: "A foto de montagem traz cores vivas, balões e diferentes referências visuais da série. Ela serve para comparar o estilo; os itens que podem ser reservados são confirmados no atendimento.",
    related: ["Bluey", "Skye – Patrulha Canina", "Minnie Mouse"],
    images: [
      { file: "Tema Menina/tema-gabbys-dollhouse-01.jpeg", alt: "Painel de referência ilustrado da Casa Mágica da Gabby.", caption: "Painel ilustrado da Gabby" },
      { file: "kits/kit-gabbys-dollhouse-01.jpeg", alt: "Exemplo de mesa montada com painel e peças coloridas da Casa Mágica da Gabby.", caption: "Exemplo de montagem da Gabby" }
    ],
    faqs: [{ question: "A foto da Gabby mostra uma composição fixa?", answer: "A imagem é uma referência de montagem, não uma lista fixa de itens. Pergunte à Lela quais peças e qual formato estão disponíveis para a data da sua comemoração." }]
  },
  {
    slug: "skye-patrulha-canina", name: "Skye – Patrulha Canina",
    title: "Skye da Patrulha Canina em Joinville e Araquari | Lela Decorações",
    description: "Confira o painel rosa da Skye e duas fotos de montagem. Consulte a disponibilidade e a logística para sua festa em Joinville ou Araquari.",
    h1: "Referências de decoração com Skye para festa",
    intro: "A referência da Skye combina um painel rosa ilustrado com duas fotos de montagem visualmente parecidas. A galeria mantém as três imagens para que você possa comparar o painel e os exemplos.",
    galleryTitle: "Painel e exemplo de montagem com Skye",
    galleryText: "O painel apresenta a personagem em destaque. As duas fotos de montagem mostram exemplos visualmente parecidos, com balões e peças sobre a mesa; elas não definem a composição de uma reserva.",
    related: ["Patrulha Canina", "A Casa Mágica da Gabby", "Minnie Mouse"],
    images: [
      { file: "Tema Menina/tema-skye-patrulha-canina-01.jpeg", alt: "Painel de referência rosa ilustrado com Skye, da Patrulha Canina.", caption: "Painel rosa com Skye" },
      { file: "kits/kit-skye-patrulha-canina-01.png", alt: "Exemplo de mesa montada com painel e decoração rosa da Skye.", caption: "Exemplo de montagem com Skye" }
    ],
    faqs: [{ question: "Por que a galeria da Skye tem duas fotos de montagem parecidas?", answer: "O acervo mantém dois exemplos visuais semelhantes junto ao painel de referência. As imagens permitem comparar o estilo, mas não confirmam a composição disponível para a data; consulte a Lela antes de reservar." }]
  },
  {
    slug: "toy-story", name: "Toy Story",
    title: "Decoração Toy Story em Joinville e Araquari | Lela Decorações",
    description: "Veja o painel e a montagem associados ao tema Toy Story no acervo da Lela. Consulte formato, data e logística em Joinville ou Araquari.",
    h1: "Referências de decoração Toy Story para festa",
    intro: "O acervo de Toy Story reúne um painel com personagens e uma mesa montada em cores quentes, com balões e peças decorativas. Envie a data e a cidade para confirmar o que pode ser reservado.",
    galleryTitle: "Painel ilustrado e mesa Toy Story",
    galleryText: "A montagem fotografada combina a arte do painel com tons terrosos e elementos do tema. Use a imagem como referência visual e confirme no atendimento a composição, o porte e a disponibilidade.",
    related: ["Carros", "Super Mario", "Os Incríveis"],
    images: [
      { file: "Tema Menino/tema-toy-story-01.jpeg", alt: "Painel de referência ilustrado com personagens de Toy Story.", caption: "Painel Toy Story" },
      { file: "kits/kit-toy-story-01.jpeg", alt: "Exemplo de mesa Toy Story com painel, balões e peças decorativas.", caption: "Exemplo de montagem Toy Story" }
    ],
    faqs: [{ question: "O que preciso informar para consultar Toy Story?", answer: "Envie a data da festa e a cidade ou o endereço do evento. A Lela confirma a disponibilidade do tema, os formatos possíveis e as condições de logística." }]
  },
  {
    slug: "naruto", name: "Naruto",
    title: "Decoração Naruto em Joinville e Araquari | Lela Decorações",
    description: "Consulte a referência de painel e a foto de montagem no tema Naruto. A Lela verifica data e formato para festas em Joinville ou Araquari.",
    h1: "Referências de decoração Naruto para festa",
    intro: "O painel Naruto do acervo destaca o personagem sobre um fundo vermelho e azul; a montagem acrescenta balões nas mesmas cores. Consulte se a referência está disponível para a data da sua festa.",
    galleryTitle: "Painel e montagem Naruto",
    galleryText: "As duas imagens seguem uma paleta de vermelho, azul e amarelo, com o personagem em foco. Elas ajudam a identificar o tema, mas não especificam os elementos que acompanham uma reserva.",
    related: ["Videogame / Gamer", "Super-Heróis Marvel e DC", "Sonic"],
    images: [
      { file: "Tema Menino/tema-naruto-01.jpeg", alt: "Painel de referência Naruto com arte do personagem em fundo vermelho e azul.", caption: "Painel Naruto" },
      { file: "kits/kit-naruto-01.png", alt: "Exemplo de mesa Naruto com painel e balões em vermelho e amarelo.", caption: "Exemplo de montagem Naruto" }
    ],
    faqs: [{ question: "A paleta da montagem Naruto pode ser alterada?", answer: "A foto mostra uma combinação de cores específica, mas não confirma opções de personalização. Consulte a Lela sobre as alternativas disponíveis e os itens do tema para a sua data." }]
  },
  {
    slug: "corinthians", name: "Corinthians",
    title: "Decoração Corinthians em Joinville e Araquari | Lela Decorações",
    description: "Confira o painel e o exemplo de mesa do Corinthians no acervo. Consulte data, formato e logística para sua comemoração em Joinville ou Araquari.",
    h1: "Referências de decoração Corinthians para festa",
    intro: "O acervo do Corinthians combina uma referência de painel com escudo e uma foto de mesa montada em preto e branco. Informe a data e a cidade para verificar disponibilidade e formato.",
    galleryTitle: "Painel e mesa no tema Corinthians",
    galleryText: "A foto de montagem inclui painel, balões e peças decorativas em preto e branco. A imagem identifica o estilo, mas a composição disponível e o formato precisam ser confirmados antes da reserva.",
    related: ["Brasil Futebol", "Flamengo", "Vasco da Gama"],
    images: [
      { file: "Tema Futebol/tema-corinthians-01.jpeg", alt: "Painel de referência com o escudo do Corinthians.", caption: "Painel Corinthians" },
      { file: "kits/kit-corinthians-01.jpeg", alt: "Exemplo de mesa montada do Corinthians com painel e itens em preto e branco.", caption: "Exemplo de montagem Corinthians" }
    ],
    faqs: [{ question: "A página do Corinthians informa o tamanho do kit?", answer: "Não. As fotos mostram o tema e uma ideia de mesa, mas não informam medidas ou itens inclusos. Consulte as opções e o porte disponível para a data da festa." }]
  },
  {
    slug: "happy-birthday", name: "Happy Birthday",
    title: "Happy Birthday em Joinville e Araquari | Lela Decorações",
    description: "Compare duas referências Happy Birthday e uma foto de montagem. Consulte qual estilo, formato e data estão disponíveis em Joinville ou Araquari.",
    h1: "Referências de decoração Happy Birthday",
    intro: "O catálogo reúne duas artes com a frase Happy Birthday: uma composição escura com detalhes dourados e outra clara com laços. Há também uma foto de mesa montada em rosa.",
    galleryTitle: "Duas artes de painel e uma montagem",
    galleryText: "As referências de painel têm estilos diferentes, e a foto de montagem usa uma paleta rosa. Escolha a ideia que prefere e pergunte à Lela qual delas corresponde à opção disponível para a sua data.",
    related: ["Boteco", "Tardezinha", "Pool Party"],
    images: [
      { file: "Tema Diversos/tema-aniversario-adulto-01.jpeg", alt: "Painel de referência Happy Birthday em fundo escuro com letras douradas.", caption: "Arte escura com detalhes dourados" },
      { file: "Tema Diversos/tema-happy-birthday-01.jpeg", alt: "Painel de referência Happy Birthday em tons claros com laços ilustrados.", caption: "Arte clara com laços" },
      { file: "kits/kit-aniversario-adulto-01.png", alt: "Exemplo de mesa montada para aniversário com painel e decoração rosa.", caption: "Exemplo de montagem para aniversário" }
    ],
    faqs: [{ question: "As duas referências Happy Birthday são a mesma decoração?", answer: "O acervo mostra duas artes de painel diferentes e uma foto de montagem. Envie a imagem que prefere para a Lela identificar a opção e consultar disponibilidade e formato." }]
  },
  {
    slug: "guerreiras-do-k-pop-huntr-x", name: "Guerreiras do K-Pop – HUNTR/X",
    title: "Guerreiras do K-Pop HUNTR/X em Joinville e Araquari | Lela Decorações",
    description: "Veja duas referências visuais de Guerreiras do K-Pop associadas a HUNTR/X. Consulte disponibilidade e formato para Joinville ou Araquari.",
    h1: "Referências de festa com Guerreiras do K-Pop",
    intro: "Duas artes do acervo mostram o trio HUNTR/X em composições coloridas. Compare os estilos e conte à Lela qual chamou sua atenção ao consultar uma decoração para a data da festa.",
    galleryTitle: "Duas referências do trio HUNTR/X",
    galleryText: "As artes apresentam o mesmo grupo de personagens em enquadramentos e paletas distintas. A página identifica as imagens do acervo; não declara parceria, licença ou vínculo oficial com titulares de marcas.",
    related: ["Tropa dos Rosa", "Barbie", "Apaixonada por Dorama"],
    images: [
      { file: "Tema Menina/tema-fortnite-01.jpeg", alt: "Painel de referência com o trio HUNTR/X em arte colorida de Guerreiras do K-Pop.", caption: "Arte do trio HUNTR/X" },
      { file: "Tema Menina/tema-lol-surprise-01.jpeg", alt: "Outra arte de painel com personagens do trio HUNTR/X.", caption: "Outra referência do trio" }
    ],
    faqs: [{ question: "As duas imagens HUNTR/X mostram opções diferentes?", answer: "São duas artes de painel relacionadas ao mesmo tema visual. A Lela pode confirmar qual referência está disponível, em qual formato e para a data consultada." }]
  },
  {
    slug: "tropa-dos-rosa", name: "Tropa dos Rosa",
    title: "Tropa dos Rosa em Joinville e Araquari | Lela Decorações",
    description: "Explore duas artes de painel associadas a Tropa dos Rosa no acervo. Consulte data e formato de decoração em Joinville ou Araquari.",
    h1: "Referências de decoração Tropa dos Rosa",
    intro: "O acervo tem duas referências visuais associadas a Tropa dos Rosa, com personagens e elementos gráficos em rosa e outras cores vivas. Consulte qual arte está disponível para sua data.",
    galleryTitle: "Duas artes associadas a Tropa dos Rosa",
    galleryText: "As imagens têm composições diferentes e compartilham elementos visuais associados ao grupo. Os nomes de arquivo não descrevem corretamente o conteúdo; por isso, as referências foram reunidas pelo que aparece nas artes.",
    related: ["Guerreiras do K-Pop – HUNTR/X", "Barbie", "Apaixonada por Dorama"],
    images: [
      { file: "Tema Menina/tema-grupo-pop-01.jpeg", alt: "Painel de referência com integrantes e elementos gráficos associados a Tropa dos Rosa.", caption: "Arte com o grupo em destaque" },
      { file: "Tema Menina/tema-rainbow-friends-01.jpeg", alt: "Outra referência de painel associada visualmente a Tropa dos Rosa.", caption: "Outra arte associada ao grupo" }
    ],
    faqs: [{ question: "Por que imagens com nomes de arquivo diferentes aparecem juntas?", answer: "A inspeção visual mostrou que as duas artes retratam o mesmo tema associado a Tropa dos Rosa. O atendimento confirma qual delas está disponível e em qual formato." }]
  },
  {
    slug: "eu-amo-tete", name: "Eu Amo Tetê – Vaquinha",
    title: "Eu Amo Tetê em Joinville e Araquari | Lela Decorações",
    description: "Veja as referências rosa e azul de Eu Amo Tetê e um exemplo de mesa montada. Consulte disponibilidade em Joinville ou Araquari.",
    h1: "Referências de decoração Eu Amo Tetê para festa",
    intro: "O catálogo reúne duas artes Eu Amo Tetê, uma em rosa e outra em azul, além de uma foto de montagem com o painel azul. As imagens permitem comparar essas variações antes de consultar a data.",
    galleryTitle: "Variações rosa e azul e exemplo de montagem",
    galleryText: "As referências usam a mesma vaquinha ilustrada em cores diferentes. A montagem fotografada corresponde à variação azul; confirme com a Lela qual visual, itens e formato estão disponíveis.",
    related: ["Ursinho Bebê Azul", "Bluey", "Dinossauros Baby"],
    images: [
      { file: "Tema Menino/tema-eu-amo-tete-01.jpeg", alt: "Painel azul de referência Eu Amo Tetê com ilustração de vaquinha.", caption: "Variação azul" },
      { file: "Tema Menina/tema-eu-amo-tete-02.jpeg", alt: "Painel rosa de referência Eu Amo Tetê com ilustração de vaquinha.", caption: "Variação rosa" },
      { file: "kits/kit-eu-amo-tete-01.png", alt: "Exemplo de montagem de mesa com painel azul Eu Amo Tetê.", caption: "Exemplo de montagem azul" }
    ],
    faqs: [{ question: "Há versões rosa e azul do tema Eu Amo Tetê?", answer: "O acervo mostra referências do painel em rosa e em azul, além de uma montagem azul. Consulte qual versão e quais elementos podem ser reservados para a data da festa." }]
  },
  {
    slug: "cha-revelacao", name: "Chá Revelação – Menino ou Menina",
    title: "Chá Revelação em Joinville e Araquari | Lela Decorações",
    description: "Confira o painel neutro e a montagem de Chá Revelação no acervo. Consulte cores, formato e logística para sua data em Joinville ou Araquari.",
    h1: "Referências de decoração para Chá Revelação",
    intro: "A referência do Chá Revelação usa tons neutros e a frase Menino ou Menina; o exemplo de montagem traz uma mesa compacta em cores suaves. Conte à Lela se deseja manter o resultado em sigilo.",
    galleryTitle: "Painel neutro e exemplo de mesa",
    galleryText: "As fotos mostram um painel em preto e branco e uma montagem com tons neutros. Se a informação sobre o bebê precisa permanecer em segredo, combine pelo WhatsApp como compartilhar os detalhes da decoração.",
    related: ["Ursinho Bebê Azul", "Chá de Cozinha", "Dinossauros Baby"],
    images: [
      { file: "Tema Diversos/tema-menino-ou-menina-01.jpeg", alt: "Painel de referência neutro com a frase Menino ou Menina para Chá Revelação.", caption: "Painel neutro de Chá Revelação" },
      { file: "kits/kit-menino-ou-menina-01.jpeg", alt: "Exemplo de mesa de Chá Revelação em tons neutros.", caption: "Exemplo de montagem neutra" }
    ],
    faqs: [{ question: "Como conversar sobre o sigilo do Chá Revelação?", answer: "Informe pelo WhatsApp se o resultado deve permanecer em segredo e combine uma forma segura de compartilhar cores ou instruções. Consulte também a composição e a logística para a data." }]
  },
  {
    slug: "brasil-futebol", name: "Brasil Futebol",
    title: "Decoração Brasil Futebol em Joinville e Araquari | Lela Decorações",
    description: "Veja o painel com bola e gramado e a montagem com bandeira e elementos de futebol. Consulte formato e data em Joinville ou Araquari.",
    h1: "Referências de decoração Brasil Futebol para festa",
    intro: "O acervo reúne um painel com bola e gramado e uma montagem com bandeira, bola, escudo da CBF e itens em verde, amarelo e azul. Os elementos visuais são coerentes com uma referência de futebol brasileiro; a foto não determina quais peças acompanham uma reserva.",
    galleryTitle: "Painel de futebol e montagem nas cores do Brasil",
    galleryText: "O painel mostra uma bola sobre o gramado; a foto de montagem acrescenta uma bandeira, uma bola, um escudo da CBF e balões. Use as imagens para reconhecer a referência e confirme a composição disponível para a data.",
    contentReviewEvidence: {
      type: "LOCAL_ORIGINAL_IMAGE_VISUAL_REVIEW",
      checkedAt: "2026-10-16",
      visualDescription: "Painel com bola e gramado; exemplo de montagem com bandeira brasileira, bola, escudo da CBF e balões verdes, amarelos e azuis.",
      imageFiles: ["Tema Futebol/tema-brasil-futebol-01.jpeg", "kits/kit-brasil-futebol-01.jpeg"]
    },
    related: ["Corinthians", "Flamengo", "Vasco da Gama"],
    images: [
      { file: "Tema Futebol/tema-brasil-futebol-01.jpeg", alt: "Painel de referência Brasil Futebol com bola sobre o gramado.", caption: "Painel de futebol" },
      { file: "kits/kit-brasil-futebol-01.jpeg", alt: "Exemplo de mesa de futebol brasileiro com bandeira, bola, escudo da CBF e balões verdes, amarelos e azuis.", caption: "Exemplo de montagem de futebol brasileiro" }
    ],
    faqs: [{ question: "O que aparece na referência Brasil Futebol?", answer: "A galeria reúne um painel com bola e gramado e uma montagem com bandeira, bola, escudo da CBF e balões em cores brasileiras. Consulte a Lela para confirmar o formato e os itens que podem ser reservados na data." }]
  },
  {
    slug: "borboletas-e-flores", name: "Borboletas e Flores",
    title: "Borboletas e Flores em Joinville e Araquari | Lela Decorações",
    description: "Conheça o painel floral e um exemplo de montagem com borboletas no acervo. Consulte formato, data e logística em Joinville ou Araquari.",
    h1: "Referências de decoração Borboletas e Flores",
    intro: "A referência Borboletas e Flores combina ilustrações de borboletas com flores em tons claros; o exemplo de mesa usa lilás e balões. Consulte qual formato está disponível para a sua data.",
    galleryTitle: "Painel floral e montagem em lilás",
    galleryText: "A foto do painel ajuda a observar as ilustrações e o exemplo de montagem mostra uma paleta lilás. As imagens não confirmam itens, medidas ou personalizações; esses detalhes são consultados com a Lela.",
    related: ["Unicórnio Floral", "Minnie Mouse", "Chá Revelação – Menino ou Menina"],
    images: [
      { file: "Tema Menina/tema-borboletas-01.jpeg", alt: "Painel de referência com borboletas e flores em tons claros.", caption: "Painel de borboletas e flores" },
      { file: "kits/kit-borboletas-01.jpeg", alt: "Exemplo de mesa montada com painel floral, borboletas e decoração lilás.", caption: "Exemplo de montagem lilás" }
    ],
    faqs: [{ question: "A foto Borboletas e Flores garante a cor lilás?", answer: "A imagem de montagem mostra lilás, mas não confirma as cores ou os itens disponíveis na data da sua reserva. Envie a referência para a Lela consultar as possibilidades." }]
  },
  {
    slug: "alice-no-pais-das-maravilhas", name: "Alice no País das Maravilhas",
    title: "Decoração Alice no País das Maravilhas em Joinville e Araquari | Lela Decorações",
    description: "Veja a referência visual Alice no País das Maravilhas no catálogo da Lela e consulte a disponibilidade do tema para sua data em Joinville ou Araquari.",
    h1: "Decoração Alice no País das Maravilhas para festa",
    intro: "A referência do acervo apresenta Alice no País das Maravilhas como inspiração para uma comemoração lúdica. A história acompanha Alice em um mundo fantástico depois que ela segue um coelho branco; consulte a Lela sobre a opção visual e o formato disponíveis para sua data.",
    galleryTitle: "Referência de Alice no País das Maravilhas",
    galleryText: "A imagem mostra uma arte de painel associada ao tema. Use-a para conferir se o estilo combina com a festa; a fotografia não confirma composição, tamanho ou itens incluídos em uma reserva.",
    related: ["Princesas Disney", "Chá Revelação – Menino ou Menina", "Borboletas e Flores"],
    images: [{ file: "Tema Menina/tema-alice-no-pais-das-maravilhas-01.jpeg", alt: "Painel de referência Alice no País das Maravilhas no acervo da Lela Decorações.", caption: "Referência de painel" }],
    faqs: [{ question: "Como consultar a decoração Alice para a minha festa?", answer: "Envie pelo WhatsApp a data e a cidade ou o endereço da comemoração. A Lela confirma se essa referência está disponível e quais formatos e condições podem ser consultados." }]
  },
  {
    slug: "barbie", name: "Barbie",
    title: "Decoração Barbie em Joinville e Araquari | Lela Decorações",
    description: "Conheça a referência Barbie do acervo e consulte cores, formato e disponibilidade para sua comemoração em Joinville ou Araquari.",
    h1: "Decoração Barbie para aniversário e comemoração",
    intro: "A referência Barbie pode inspirar uma festa com identidade própria: a Mattel apresenta a personagem em diferentes profissões e possibilidades criativas. Confira a imagem disponível no acervo e consulte a Lela sobre a decoração e o formato para a sua data.",
    galleryTitle: "Referência de painel Barbie",
    galleryText: "A fotografia permite conferir a arte cadastrada com o tema Barbie. Cores, peças e composição de uma reserva não são definidos pela imagem e precisam ser confirmados diretamente com a Lela.",
    related: ["Minnie Mouse", "Princesas Disney", "Unicórnio Floral"],
    images: [{ file: "Tema Menina/tema-barbie-01.jpeg", alt: "Painel de referência Barbie no catálogo de decorações da Lela.", caption: "Referência de painel" }],
    faqs: [{ question: "A decoração Barbie pode ser reservada em qualquer formato?", answer: "A foto não informa quais formatos estão disponíveis. Consulte a Lela com a data e a cidade da festa para verificar se o tema pode ser reservado como Pegue e Monte ou Mini Festa na Mesa." }]
  },
  {
    slug: "minecraft", name: "Minecraft",
    title: "Decoração Minecraft em Joinville e Araquari | Lela Decorações",
    description: "Veja a referência Minecraft e consulte uma opção de decoração para aniversário em Joinville ou Araquari, conforme a data e o formato disponível.",
    h1: "Decoração Minecraft para aniversário",
    intro: "Minecraft é um jogo de exploração e construção em um universo formado por blocos. Essa linguagem visual permite imaginar uma comemoração inspirada em cenários pixelados; veja a referência do acervo e consulte o que pode ser reservado para sua data.",
    galleryTitle: "Referência de painel Minecraft",
    galleryText: "A imagem do catálogo mostra a arte de painel associada ao tema Minecraft. Ela ajuda a avaliar o estilo visual, mas não determina quais peças, dimensões ou itens compõem o serviço disponível.",
    related: ["Super Mario", "Sonic", "Videogame / Gamer"],
    images: [{ file: "Tema Menino/tema-minecraft-01.jpeg", alt: "Painel de referência Minecraft no acervo da Lela Decorações.", caption: "Referência de painel" }],
    faqs: [{ question: "O tema Minecraft está disponível como Pegue e Monte?", answer: "A página apresenta uma referência do acervo, mas não confirma formato ou disponibilidade na data. Envie a data e a cidade pelo WhatsApp para a Lela consultar as opções." }]
  },
  {
    slug: "frozen", name: "Frozen",
    title: "Decoração Frozen em Joinville e Araquari | Lela Decorações",
    description: "Confira a referência Frozen do acervo e consulte disponibilidade, formato e logística para sua festa em Joinville ou Araquari.",
    h1: "Decoração Frozen para festa",
    intro: "Frozen apresenta as irmãs Anna e Elsa e uma história ambientada em Arendelle. A referência no acervo pode ajudar a planejar uma festa inspirada no universo de gelo; consulte a Lela sobre o formato disponível para sua data.",
    galleryTitle: "Referência de painel Frozen",
    galleryText: "A fotografia mostra a arte de painel cadastrada com o tema Frozen. Ela não confirma peças adicionais, cores personalizadas ou a composição de uma reserva; esses detalhes dependem da consulta à Lela.",
    related: ["Princesas Disney", "Unicórnio Floral", "Dinossauros Baby"],
    images: [{ file: "Tema Menina/tema-frozen-01.jpeg", alt: "Painel de referência Frozen no catálogo da Lela Decorações.", caption: "Referência de painel" }],
    faqs: [{ question: "O que preciso informar para consultar Frozen?", answer: "Informe a data da comemoração e a cidade ou o endereço do evento. A Lela verifica se a referência está disponível e quais formatos e condições logísticas podem ser consultados." }]
  }
];

const catalogByFile = new Map(portfolio.all.map((item) => [`${item.folder}/${item.filename}`, item]));
const definitionsByName = new Map(pageDefinitions.map((definition) => [definition.name, definition]));
const routeSlugOverrides = {
  "A Casa Mágica da Gabby": "casa-magica-da-gabby",
  "Eu Amo Tetê – Vaquinha": "eu-amo-tete",
  "Chá Revelação – Menino ou Menina": "cha-revelacao"
};
const editorialCopy = {
  "Safari Baby": { about: "A proposta combina animais da savana com uma apresentação suave, adequada a uma festa infantil. O acervo mostra um painel ilustrado e uma foto de montagem; confira as duas referências antes de escolher.", use: "A paleta terrosa e os animais podem orientar os demais detalhes da comemoração. Balões e peças vistos na montagem são exemplos visuais, não uma lista do que acompanha o serviço." },
  "Bluey": { about: "Bluey é uma filhote de blue heeler que vive brincadeiras com os pais, Bandit e Chilli, e a irmã Bingo. A série transforma situações cotidianas em jogos imaginativos, uma ideia que combina com uma festa leve e participativa.", use: "A arte do acervo usa azul e laranja. A referência de painel e a foto de mesa ajudam a comparar o tema; consulte quais itens e formatos estão disponíveis para a data.", source: "https://www.bluey.tv/characters/bluey/" },
  "Dinossauros": { about: "Esta opção tem ilustração de dinossauros em estilo realista. Dinossauros Baby aparece em outro grupo, com arte infantil em tons suaves; são referências visuais distintas no catálogo.", use: "O tema pode inspirar uma festa de exploração pré-histórica. Na foto há animais voadores, mas pterossauros não são dinossauros; use a imagem como referência artística e confirme a composição do kit." },
  "A Casa Mágica da Gabby": { about: "A referência se conecta ao universo da animação A Casa Mágica da Gabby, com personagens felinos e cores alegres. A página reúne painel e exemplo de mesa cadastrados com esse nome.", use: "As cores da arte podem orientar convites e detalhes da festa. A montagem fotografada serve para comparação visual e não confirma o conteúdo reservado.", source: "https://media.netflix.com/en/only-on-netflix/81009946" },
  "Skye – Patrulha Canina": { about: "Skye faz parte da equipe de filhotes da Patrulha Canina e participa de missões de resgate. A referência do acervo destaca a personagem em uma arte rosa.", use: "A imagem do painel e os exemplos de montagem permitem observar a paleta e a presença da personagem. O atendimento confirma qual opção e quais peças estão disponíveis; as fotos não definem um pacote fixo.", source: "https://www.pawpatrol.com/characters/skye" },
  "Toy Story": { about: "Toy Story acompanha brinquedos que ganham vida quando as pessoas não estão por perto. O tema permite reunir referências de aventura e amizade em uma celebração infantil.", use: "O painel e a foto de montagem mostram como a arte pode orientar uma mesa temática. Consulte a composição do serviço; a imagem não garante os mesmos elementos na reserva.", source: "https://movies.disney.com/toy-story" },
  "Naruto": { about: "Naruto é uma série de mangá e animação sobre um jovem ninja que busca reconhecimento e quer se tornar Hokage. A referência do acervo destaca o personagem em cores fortes.", use: "Vermelho, azul e amarelo aparecem nas fotografias e podem inspirar outros detalhes da festa. Confirme com a Lela a versão visual e o formato disponíveis.", source: "https://www.viz.com/naruto" },
  "Corinthians": { about: "A referência usa o nome e as cores associados ao Sport Club Corinthians Paulista, clube de futebol brasileiro. O painel e a foto de montagem estão agrupados no catálogo para consulta.", use: "A paleta preta e branca pode guiar a decoração da comemoração. Consulte a disponibilidade e os itens do formato escolhido; a página não representa parceria oficial com o clube." },
  "Happy Birthday": { about: "Happy Birthday é uma referência de aniversário, sem personagem central. O acervo reúne duas artes de painel e uma foto de montagem, que permitem comparar estilos para uma comemoração adulta.", use: "Use as fotografias para escolher uma direção visual e informe à Lela qual delas chamou sua atenção. Cores, peças e disponibilidade precisam ser confirmadas para a data." },
  "Guerreiras do K-Pop – HUNTR/X": { about: "HUNTR/X é o trio de protagonistas de Guerreiras do K-Pop, filme em que estrelas do K-pop também enfrentam demônios. O acervo agrupa duas referências visuais cadastradas com esse tema.", use: "Compare as duas artes antes de consultar: a associação visual é do catálogo e não indica licença ou parceria oficial. A Lela confirma qual referência pode ser reservada.", source: "https://media.netflix.com/en/only-on-netflix/81498621" },
  "Tropa dos Rosa": { about: "Esta página reúne duas imagens que o cadastro associa ao nome Tropa dos Rosa. O conteúdo descreve somente o que aparece nas artes, sem atribuir personagens, histórias ou vínculo oficial ao grupo.", use: "Observe as cores e os elementos gráficos das fotografias para decidir se a referência combina com a comemoração. A composição e a disponibilidade precisam ser confirmadas com a Lela." },
  "Eu Amo Tetê – Vaquinha": { about: "O acervo mostra a mesma vaquinha ilustrada em duas versões de painel, rosa e azul, além de um exemplo de mesa com a versão azul.", use: "As cores ajudam a comparar as duas referências. Pergunte qual delas está disponível na data e quais elementos podem ser reservados; a imagem de montagem não define o conteúdo do kit." },
  "Chá Revelação – Menino ou Menina": { about: "A referência usa a frase Menino ou Menina e uma composição neutra para uma comemoração de revelação. O exemplo de mesa associado aparece em tons suaves.", use: "Se quiser preservar o segredo, combine com a Lela como compartilhar as informações necessárias. Consulte cores, formato e logística antes de confirmar a data." },
  "Brasil Futebol": { about: "O painel mostra uma bola sobre o gramado; a foto de montagem agrupada traz bandeira, bola, escudo da CBF e balões verdes, amarelos e azuis. O conjunto é coerente com a referência de futebol brasileiro cadastrada.", use: "As duas fotos ajudam a comparar o painel e um exemplo de mesa. Elas não indicam parceria oficial nem definem a composição reservada; consulte a Lela sobre formato, itens e disponibilidade para a data." },
  "Borboletas e Flores": { about: "A referência combina borboletas e flores ilustradas em tons claros; a foto de montagem associada usa lilás. É uma proposta visual floral para uma celebração delicada.", use: "As imagens permitem comparar painel e mesa. Use a paleta como inspiração, mas consulte as cores, peças e formato efetivamente disponíveis para a data." },
  "Alice no País das Maravilhas": { about: "A história clássica de Alice começa quando ela segue um coelho branco até um mundo fantástico. A referência pode inspirar uma comemoração lúdica sem depender de uma adaptação específica.", use: "Use a arte do painel para avaliar o estilo e pense em detalhes de fantasia para a festa. A foto não confirma objetos adicionais nem uma versão licenciada de qualquer adaptação.", source: "https://www.gutenberg.org/ebooks/28885" },
  "Barbie": { about: "Barbie é uma personagem da Mattel apresentada em diferentes profissões e possibilidades criativas. A ideia da página é ajudar a escolher a referência de painel disponível, sem sugerir vínculo oficial.", use: "Observe a arte e escolha uma paleta que combine com a comemoração. Consulte a Lela sobre o formato e os elementos que podem ser reservados; a fotografia não define uma composição fechada.", source: "https://shop.mattel.com/pages/about-barbie" },
  "Minecraft": { about: "Minecraft é um jogo de construção e exploração em um mundo de blocos. Essa linguagem visual permite imaginar cenários pixelados e detalhes geométricos para uma festa.", use: "A referência do painel ajuda a conferir a arte disponível. Consulte quais formatos e itens relacionados ao tema podem ser reservados na data, sem presumir que a foto representa um kit completo.", source: "https://www.minecraft.net/en-us/about-minecraft" },
  "Frozen": { about: "Frozen acompanha as irmãs Anna e Elsa em uma história ambientada em Arendelle. A referência visual pode inspirar uma festa com atmosfera de inverno e fantasia.", use: "Confira a arte do painel e converse com a Lela sobre cores, formato e disponibilidade. A imagem não confirma peças adicionais nem personalizações.", source: "https://movies.disney.com/frozen" }
};

function definitionFromReview(name, group, review) {
  const mounted = review.imageType === "mounted";
  const faqQuestion = review.faqQuestion === "O que aparece na referência visual deste tema?"
    ? `O que aparece na imagem de ${name}?`
    : review.faqQuestion;
  const faqAnswer = review.faqAnswer || `A foto do acervo mostra ${review.visual}. Ela identifica esta arte; a Lela confirma disponibilidade, formato e composição para a data antes da reserva.`;

  return {
    title: themeTitle(name),
    description: `Tema ${name}: ${review.meta} Consulte disponibilidade em Joinville ou Araquari.`,
    h1: `${name}: decoração para sua festa`,
    intro: `Confira a referência ${name} no catálogo da Lela. A disponibilidade e o formato precisam ser confirmados para a data da festa.`,
    about: review.editorial,
    use: review.selection,
    galleryTitle: `Como é a referência ${name}`,
    galleryText: `${mounted ? "A foto mostra um exemplo de montagem" : "A foto mostra um painel de referência"} com ${review.visual}. Ela ajuda a identificar a arte, mas não confirma composição, formato ou disponibilidade para uma data.`,
    related: review.related,
    faqs: [{ question: faqQuestion, answer: faqAnswer }],
    editorialDecision: review.indexDecision,
    editorialDecisionReason: review.indexationReason,
    contentReviewEvidence: {
      type: "LOCAL_ORIGINAL_IMAGE_VISUAL_REVIEW",
      checkedAt: review.inspectedAt,
      visualDescription: review.visual,
      imageFiles: group.images.map((image) => `${image.folder}/${image.filename}`)
    },
    reviewImageAlt: review.imageAlt || `${mounted ? "Exemplo de montagem" : "Painel de referência"} ${name}: ${review.visual}.`,
    reviewImageAltByFile: review.imageAltByFile,
    reviewImageCaption: mounted ? `Exemplo fotografado de montagem · ${name}` : `Painel de referência · ${name}`
  };
}

function themeTitle(name) {
  const localizedTitle = `Decoração ${name} em Joinville | Lela`;
  return localizedTitle.length <= 60 ? localizedTitle : `${name} em Joinville | Lela`;
}

const pages = portfolio.catalog.map((group) => {
  const review = editorialReviews[group.themeName];
  const definition = review
    ? definitionFromReview(group.themeName, group, review)
    : definitionsByName.get(group.themeName);
  const detailSlug = routeSlugOverrides[group.themeName] || group.slug;
  const imageOverrides = new Map();
  if (definition?.reviewImageAlt && group.images[0]) {
    const first = group.images[0];
    imageOverrides.set(`${first.folder}/${first.filename}`, {
      alt: definition.reviewImageAlt,
      caption: definition.reviewImageCaption
    });
  }
  for (const [file, alt] of Object.entries(definition?.reviewImageAltByFile || {})) {
    imageOverrides.set(file, { alt, caption: definition.reviewImageCaption });
  }
  for (const entry of definition?.images || []) imageOverrides.set(entry.file, entry);
  const images = group.images.map((item) => {
    const file = `${item.folder}/${item.filename}`;
    const override = imageOverrides.get(file);
    if (override?.file && (!catalogByFile.has(override.file) || catalogByFile.get(override.file).themeName !== group.themeName)) {
      throw new Error(`Imagem não corresponde ao tema ${group.themeName}: ${file}`);
    }
    return override ? { ...item, alt: override.alt, caption: override.caption } : item;
  });
  const namePending = group.nameNeedsConfirmation;
  const associationPending = group.imageAssociationNeedsConfirmation;
  const editorialStatus = namePending
    ? "NAME_CONFIRMATION_REQUIRED"
    : associationPending
      ? "IMAGE_ASSOCIATION_CONFIRMATION_REQUIRED"
      : definition ? "REVIEWED" : "PENDING_EDITORIAL_REVIEW";
  const indexable = editorialStatus === "REVIEWED" && definition?.editorialDecision !== "PUBLIC_NOINDEX" && definition?.editorialDecision !== "CONFIRMATION_REQUIRED";
  const observedTypes = [group.hasThemeReference ? "painel de referência" : "", group.hasMountedExample ? "exemplo de montagem" : ""].filter(Boolean);
  const visualDetails = images.map((image) => image.alt.replace(/[.]$/, "")).filter(Boolean).join(" ");
  const imageCountSentence = images.length === 1 ? "O acervo reúne uma foto." : `O acervo reúne ${images.length} fotos.`;
  const visualTypes = observedTypes.length ? observedTypes.join(" e ") : "referência visual";
  const about = definition?.about || editorialCopy[group.themeName]?.about || (namePending
    ? `${imageCountSentence} O nome comercial associado a esta referência ainda precisa ser confirmado. Confira a imagem e envie a identificação correta à Lela antes de considerar uma reserva.`
    : `As fotos do acervo estão cadastradas como “${group.themeName}” e incluem ${visualTypes}. ${visualDetails} ${imageCountSentence} Use as imagens para avaliar o estilo e consulte disponibilidade e composição para a data.`);
  const use = definition?.use || editorialCopy[group.themeName]?.use || (namePending
    ? "Antes de considerar esta referência como uma oferta, confirme o nome e a associação das imagens com a Lela. A consulta pode ser feita pelo WhatsApp nesta página."
    : "Use as imagens para indicar à Lela a referência visual que procura. Informe a data, a cidade e o serviço desejado; a equipe confirma a disponibilidade e os itens que podem compor a opção. As fotos não definem uma composição fixa.");
  return {
    ...(definition || {}),
    id: group.slug,
    catalogSlug: group.slug,
    slug: detailSlug,
    name: group.themeName,
    path: `/temas/${detailSlug}/`,
    category: group.category,
    categoryLabel: group.categoryLabel,
    editorialStatus,
    indexable,
    publicationStatus: indexable ? "PUBLIC_INDEX" : "PUBLIC_NOINDEX",
    publicationBasis: indexable ? "CURATED_CATALOG_REFERENCE" : editorialStatus !== "REVIEWED" ? "CONFIRMATION_REQUIRED" : "EDITORIAL_NOINDEX",
    editorialDecision: definition?.editorialDecision || (indexable ? "PUBLIC_INDEX" : editorialStatus !== "REVIEWED" ? "CONFIRMATION_REQUIRED" : "PUBLIC_NOINDEX"),
    editorialDecisionReason: definition?.editorialDecisionReason || (editorialStatus !== "REVIEWED"
      ? "A identificação do nome ou a associação das imagens ainda depende de confirmação; a página permanece pública para consulta, mas fora do sitemap."
      : indexable
        ? "Conteúdo editorial específico, imagem associada ao cadastro e orientação comercial verificável permitem apresentar esta página individual como opção de catálogo."
        : "A página permanece pública para consulta, mas ainda não tem evidência editorial suficiente para indexação individual."),
    contentReviewEvidence: definition?.contentReviewEvidence || null,
    availabilityStatus: "VERIFY_BY_DATE",
    needsNameConfirmation: namePending,
    needsAssociationConfirmation: associationPending,
    title: themeTitle(group.themeName),
    description: definition?.description || `Veja as fotos associadas a ${group.themeName} no catálogo da Lela. Consulte disponibilidade e composição para sua data em Joinville ou Araquari.`,
    h1: definition?.h1 || `Referência de ${group.themeName} para sua comemoração`,
    intro: definition?.intro || `Confira as fotos cadastradas como ${group.themeName}. ${group.hasThemeReference ? "O acervo inclui um painel de referência." : "O acervo inclui uma referência visual."}${group.hasMountedExample ? " Também há exemplo de montagem." : ""} A Lela confirma disponibilidade, formato e composição para a data solicitada.`,
    about,
    use,
    visualDescription: definition?.galleryText || images.map((image) => image.alt).join(" "),
    galleryTitle: definition?.galleryTitle || `Fotos do tema ${group.themeName}`,
    galleryText: definition?.galleryText || `${imageCountSentence} As imagens cadastradas como ${group.themeName} servem como referência visual; não confirmam preço, itens incluídos ou disponibilidade para uma data.`,
    related: (definition?.related || portfolio.catalog.filter((candidate) => candidate.slug !== group.slug && candidate.category === group.category).slice(0, 3).map((candidate) => candidate.themeName)),
    faqs: definition?.faqs || [],
    images,
    heroImage: images[0],
    source: editorialCopy[group.themeName]?.source || ""
  };
});

const pagePaths = new Set();
for (const page of pages) {
  if (pagePaths.has(page.path)) throw new Error(`URL de tema duplicada: ${page.path}`);
  pagePaths.add(page.path);
}
const published = pages.filter((page) => page.indexable);

module.exports = {
  pages,
  details: pages,
  published,
  indexable: published,
  byName: Object.fromEntries(pages.map((page) => [page.name, page]))
};
