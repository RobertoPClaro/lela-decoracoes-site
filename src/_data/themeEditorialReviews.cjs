// Revisão individual das imagens e do conteúdo das páginas de tema.
// Toda descrição visual abaixo se limita às fotografias locais; não indica
// composição de kit, estoque, licenciamento ou disponibilidade para uma data.
const inspectedAt = "2026-10-16";

function review(visual, editorial, selection, meta, options = {}) {
  return {
    visual,
    editorial,
    selection,
    meta,
    inspectedAt,
    indexDecision: options.indexDecision || "PUBLIC_INDEX",
    indexationReason: options.indexationReason || "A fotografia original foi conferida e apresenta uma referência visual identificável pelo tema cadastrado. A página agora descreve os elementos que aparecem e ajuda a cliente a selecionar a referência antes de consultar a data; não declara composição ou disponibilidade.",
    imageType: options.imageType || "panel",
    imageAlt: options.imageAlt || "",
    imageAltByFile: options.imageAltByFile || {},
    faqQuestion: options.faqQuestion || "O que aparece na referência visual deste tema?",
    faqAnswer: options.faqAnswer || "",
    related: options.related || null
  };
}

const reviews = {
  "Ana Castela – A Boiadeira": review(
    "um retrato de cantora com chapéu western rosa, roupa em tons de rosa e moldura floral",
    "A fotografia permite identificar uma estética country em rosa, com flores e franjas. O arquivo original está nomeado como cowgirl e não confirma, por si só, a identidade da pessoa retratada.",
    "Use a foto para mostrar à Lela qual referência visual você procura. A identificação comercial como Ana Castela precisa ser confirmada antes de apresentar o nome como correspondência certa.",
    "Retrato em estilo country rosa com chapéu western e moldura floral.",
    { indexDecision: "CONFIRMATION_REQUIRED", indexationReason: "A arte mostra uma cantora com chapéu western rosa, mas a imagem e o nome de arquivo não confirmam que a pessoa seja Ana Castela. Manter noindex até a proprietária confirmar a identificação comercial.", imageAlt: "Painel circular com retrato de uma cantora usando chapéu western rosa, roupa rosa e moldura floral.", faqQuestion: "A imagem confirma que o painel é da Ana Castela?", faqAnswer: "A fotografia mostra uma cantora com chapéu western rosa, mas não traz identificação legível. O cadastro associa a arte a Ana Castela – A Boiadeira; confirme esse nome com a Lela antes de solicitar a reserva." }
  ),
  "Apaixonada por Dorama": review(
    "a frase “Apaixonada por Dorama”, corações e pequenos ícones ligados a cinema",
    "O texto central torna a proposta explícita: uma comemoração para quem gosta de doramas. A arte combina lettering rosa e roxo com elementos de câmera e claquete.",
    "A frase e os ícones ajudam a avaliar se a referência combina com a pessoa homenageada. Informe à Lela qual imagem do catálogo você escolheu e a data da festa.",
    "Painel rosa e roxo com lettering, corações e referências visuais de cinema."
  ),
  "Arca de Noé": review(
    "animais ilustrados reunidos em uma embarcação, sobre ondas em tons de azul",
    "A composição reúne diferentes animais ao redor da arca e cria uma cena narrativa, em vez de destacar um personagem único. As cores suaves mantêm o foco nos bichos e na água.",
    "Esta referência pode orientar uma festa infantil com animais e mar. Use a imagem para indicar a arte do painel; os itens da reserva são definidos separadamente.",
    "Painel ilustrado com animais reunidos na arca e ondas azuis.",
    { related: ["Fazendinha", "Safari Baby", "Dinossauros Baby"] }
  ),
  "Astronauta Infantil": review(
    "uma criança vestida de astronauta entre planetas, estrelas e um foguete",
    "O fundo azul-marinho pontilhado de estrelas separa bem a figura central dos elementos espaciais. A arte reúne astronauta, foguete e planetas numa única cena.",
    "A ilustração funciona como referência para uma festa infantil com espaço e exploração. Compare o painel com o restante da identidade visual que planeja para a comemoração.",
    "Astronauta infantil, foguete e planetas em painel azul estrelado.",
    { related: ["Videogame / Gamer", "Dinossauros Baby", "Batwheels"] }
  ),
  "Batwheels": review(
    "carros ilustrados em movimento, o letreiro Batwheels e uma cidade ao fundo",
    "A arte combina veículos coloridos com cenário urbano noturno e grafismos de ação. O nome do tema também aparece no próprio painel, o que facilita reconhecer esta referência.",
    "Mostre a imagem à Lela para consultar esta arte específica. O painel identifica o tema; ele não confirma quais peças ou formatos podem ser reservados.",
    "Carros Batwheels em cena urbana com grafismos de ação.",
    { related: ["Carros", "Hot Wheels", "Super Mario"] }
  ),
  "Bob Esponja": review(
    "Bob Esponja, Patrick e outros personagens em uma cena submarina azul",
    "A ilustração reúne personagens conhecidos do desenho num fundo aquático. O azul domina a composição, com cores fortes nos personagens em primeiro plano.",
    "A imagem ajuda a diferenciar esta referência submarina de outros temas de personagens. Consulte a disponibilidade para a data e confirme com a Lela o formato possível.",
    "Personagens de Bob Esponja em cenário submarino azul.",
    { related: ["Fundo do Mar", "Mundo Bita", "Monstros S.A."] }
  ),
  "Bolofofos": review(
    "cinco personagens de olhos grandes diante de uma paisagem verde com árvores",
    "A foto mostra um grupo de animais coloridos, incluindo figuras roxa, azul, amarela, laranja e branca. A disposição em camadas concentra os personagens no centro do painel.",
    "Use a imagem para apontar o grupo e a paleta que procura. A fotografia é uma referência de painel e não apresenta uma lista de itens do kit.",
    "Personagens coloridos dos Bolofofos em paisagem verde.",
    { related: ["Galinha Pintadinha", "Mundo Bita", "Patrulha Canina"] }
  ),
  "Boteco": review(
    "a palavra “Boteco” em faixa vermelha, sobre fundo de madeira e moldura xadrez",
    "O painel combina textura amadeirada, borda preta e branca e uma faixa central que identifica a proposta. O conjunto tem linguagem visual de bar, sem depender de personagens.",
    "Esta arte pode servir de referência para uma comemoração adulta com estética de boteco. Consulte o formato disponível e não presuma que objetos vistos na imagem acompanham a reserva.",
    "Painel Boteco com faixa vermelha, madeira e moldura xadrez.",
    { related: ["Happy Birthday", "Tardezinha", "Pool Party"] }
  ),
  "Carros": review(
    "carros de corrida ilustrados, bandeiras quadriculadas e luzes azuis",
    "A arte reúne veículos em diferentes posições, com a pista e o quadriculado reforçando o clima de velocidade. A composição se distingue de Hot Wheels pelo conjunto de personagens e cores deste painel.",
    "Se a criança gosta de corridas, esta imagem permite indicar qual estilo de painel você quer consultar. Confirme com a Lela a disponibilidade e a composição para sua data.",
    "Carros de corrida e bandeiras quadriculadas em painel azul.",
    { related: ["Hot Wheels", "Batwheels", "Toy Story"] }
  ),
  "Chá de Cozinha": review(
    "a frase “Chá de Cozinha” em lettering branco, com flores e utensílios ilustrados",
    "O fundo escuro lembra uma lousa e contrasta com os desenhos de panela, xícara e flores. O próprio painel identifica a ocasião e permite reconhecer rapidamente a proposta.",
    "A arte pode orientar uma celebração de chá de cozinha. Consulte se a referência e o serviço desejado estão disponíveis; não há confirmação de itens incluídos pela foto.",
    "Painel Chá de Cozinha com lousa, flores e utensílios.",
    { related: ["Chá Revelação – Menino ou Menina", "Dia dos Namorados", "Happy Birthday"] }
  ),
  "Circo": review(
    "uma tenda listrada, personagens circenses e adereços coloridos",
    "As faixas vermelhas e brancas da tenda enquadram os personagens e brinquedos do picadeiro. O painel concentra referências visuais clássicas de circo numa composição infantil.",
    "Use a imagem para avaliar a intensidade das cores e o estilo do painel. Envie o nome do tema e a data para confirmar o que pode ser reservado.",
    "Tenda listrada e personagens circenses em painel colorido.",
    { related: ["Festa Junina", "Arca de Noé", "Mundo Bita"] }
  ),
  "Copinha Baby": review(
    "a inscrição “Copinha Baby”, uma bola de futebol, uma taça, uma chupeta e as cores do Brasil",
    "O painel combina símbolos de futebol com detalhes infantis. A palavra Copinha Baby aparece na arte; embora o arquivo original tenha uma referência a Corinthians no nome, a imagem mostra verde, amarelo, azul e bandeira brasileira, sem escudo legível de clube.",
    "Esta página descreve a imagem como Copinha Baby e não como uma decoração de time específico. Consulte o formato e os itens disponíveis para a data.",
    "Painel Copinha Baby com bola, taça, chupeta e cores brasileiras.",
    { related: ["Brasil Futebol", "Corinthians", "Flamengo"], faqQuestion: "Copinha Baby identifica um tema de time específico?", faqAnswer: "A arte traz o nome Copinha Baby, uma bola, uma taça e as cores brasileiras. Ela não mostra um escudo de clube legível; consulte a Lela se você procura uma referência de time específica." }
  ),
  "Crisma": review(
    "uma mesa decorada em branco e dourado, com bolo, suportes para doces e balões",
    "A fotografia mostra uma composição montada com diferentes alturas de suportes, arco de balões e elementos dourados. É um exemplo visual de mesa para Crisma, não uma relação dos itens disponíveis para locação.",
    "Use a foto para mostrar à Lela a proposta de montagem que você tem em mente. Confirme quais elementos podem compor a opção para sua data e serviço.",
    "Exemplo de mesa para Crisma com branco, dourado, bolo e suportes para doces.",
    { imageType: "mounted", faqQuestion: "A foto de Crisma mostra tudo o que acompanha a reserva?", faqAnswer: "Não. A imagem mostra um exemplo de mesa montada em branco e dourado, com bolo, suportes para doces e balões. A composição disponível para uma reserva precisa ser confirmada com a Lela." }
  ),
  "Dia dos Namorados": review(
    "a frase “Feliz Dia dos Namorados” e dois personagens ilustrados próximos de um coração",
    "A arte usa vermelho, preto e branco, com pequenos corações e estampa xadrez. O texto deixa clara a ocasião e dá à imagem um caráter de painel comemorativo.",
    "A referência pode ser consultada para uma comemoração a dois. Informe a data e pergunte qual formato está disponível; a fotografia não determina a composição do serviço.",
    "Painel Feliz Dia dos Namorados com personagens e corações.",
    { related: ["Chá de Cozinha", "Happy Birthday", "Tardezinha"] }
  ),
  "Dinossauros Baby": review(
    "dinossauros pequenos em tons pastel, reunidos numa paisagem com folhas e céu claro",
    "A ilustração usa cores suaves e personagens arredondados, o que a diferencia da arte mais realista do tema Dinossauros. Essa página registra a versão Baby do catálogo.",
    "Se procura um visual infantil mais delicado, compare esta referência com Dinossauros antes de decidir qual indicar à Lela.",
    "Dinossauros em estilo baby e cores pastel em painel ilustrado.",
    { related: ["Dinossauros", "Safari Baby", "Fazendinha"] }
  ),
  "Faz um Pix Pra Mim": review(
    "a frase “Faz um Pix pra mim”, um celular e elementos gráficos associados ao Pix",
    "O painel transforma a mensagem em uma proposta bem-humorada: tipografia decorativa, telefone e símbolos gráficos em fundo claro. A frase é o elemento central da referência.",
    "Consulte se essa arte combina com o tom da comemoração e envie a imagem escolhida. O tema não representa uma oferta ou solicitação de pagamento da Lela.",
    "Painel bem-humorado com a frase Faz um Pix pra mim e celular.",
    { related: ["Boteco", "Happy Birthday", "Tardezinha"] }
  ),
  "Fazendinha": review(
    "uma fazenda ilustrada com animais, celeiro, moinho e um trator",
    "A cena reúne elementos rurais em várias partes do painel, incluindo construções e animais. Os tons de verde, vermelho e amarelo ajudam a distinguir esta arte de Safari Baby.",
    "Use os detalhes da fazenda para decidir se esta é a referência que procura. A Lela confirma quais formatos e itens podem ser reservados para a data.",
    "Painel Fazendinha com celeiro, moinho, trator e animais.",
    { related: ["Arca de Noé", "Safari Baby", "Dinossauros Baby"] }
  ),
  "Festa Junina": review(
    "o letreiro “Festa Junina”, bandeirinhas e elementos de arraial em cores vivas",
    "A imagem traz fogos, bandeirinhas e detalhes de festa popular sobre um fundo quente. O texto do painel identifica diretamente a ocasião.",
    "Esta referência é voltada a uma comemoração junina. Consulte a disponibilidade na data e indique quais elementos da arte deseja usar como referência.",
    "Painel Festa Junina com bandeirinhas e cores de arraial.",
    { related: ["Circo", "Boteco", "Tardezinha"] }
  ),
  "Flamengo": review(
    "listras vermelhas e pretas e um escudo associado ao Flamengo",
    "A composição é gráfica e direta: contraste das listras, escudo central e fundo escuro. A descrição identifica a referência visual cadastrada sem sugerir vínculo comercial com o clube.",
    "Informe que procura a referência visual do Flamengo e consulte o formato e a data. A página não declara parceria, licença ou afiliação oficial.",
    "Painel de futebol com listras rubro-negras e escudo do Flamengo.",
    { related: ["Vasco da Gama", "Corinthians", "Brasil Futebol"] }
  ),
  "Fundo do Mar": review(
    "uma concha azul ao centro, estrelas-do-mar e formas marinhas em tons de azul e areia",
    "A concha é o ponto focal e os detalhes laterais completam a cena aquática. A paleta mistura azul claro e tons quentes de areia, sem depender de personagens identificáveis.",
    "A arte pode ajudar a planejar convites ou outros elementos em tema marinho. Use-a para indicar a referência e confirme a composição do serviço com a Lela.",
    "Painel marinho com concha azul, estrelas-do-mar e tons de areia.",
    { related: ["Arca de Noé", "Moana", "Bolofofos"] }
  ),
  "Galinha Pintadinha": review(
    "personagens coloridos, incluindo uma galinha azul, diante de um campo verde",
    "A ilustração reúne vários personagens em vez de mostrar somente a figura central. O fundo verde e o céu azul criam uma cena aberta e colorida.",
    "A imagem ajuda a escolher entre uma referência com grupo de personagens e um painel com personagem único. Consulte a disponibilidade para sua data.",
    "Painel Galinha Pintadinha com personagens em paisagem verde.",
    { related: ["Bolofofos", "Mundo Bita", "Patrulha Canina"] }
  ),
  "Gratidão": review(
    "a palavra “Gratidão” em dourado sobre fundo azul-marinho com detalhes geométricos",
    "O painel tem uma composição minimalista, com texto central, pequenos pontos claros e moldura geométrica dourada. A tipografia é o principal elemento da arte.",
    "Considere esta referência se procura um painel centrado numa mensagem. Consulte a Lela sobre o formato; a foto não informa itens adicionais ou personalização.",
    "Painel azul-marinho com a palavra Gratidão em dourado.",
    { related: ["Happy Birthday", "Boteco", "Primeira Comunhão"] }
  ),
  "Homem-Aranha": review(
    "o Homem-Aranha em vermelho e azul, diante de uma trama de teias",
    "O personagem ocupa o centro da arte e o fundo repete o motivo de teia. A composição usa contraste entre vermelho, azul e áreas escuras.",
    "A fotografia permite conferir qual arte do personagem está cadastrada. Envie a data para a Lela confirmar disponibilidade e o formato que pode ser contratado.",
    "Painel do Homem-Aranha em vermelho e azul com fundo de teias.",
    { related: ["Super-Heróis Marvel e DC", "Os Incríveis", "Sonic"] }
  ),
  "Hot Wheels": review(
    "carros esportivos em várias cores, o logotipo Hot Wheels e uma faixa quadriculada",
    "A arte combina vários veículos em ângulos diferentes, com o quadriculado remetendo a uma pista. O letreiro torna o tema legível na própria imagem.",
    "Mostre a foto para indicar esta arte de carros e consulte os formatos para a data. Os veículos ilustrados não representam itens incluídos na reserva.",
    "Painel Hot Wheels com carros esportivos e bandeira quadriculada.",
    { related: ["Carros", "Batwheels", "Videogame / Gamer"] }
  ),
  "Hulk": review(
    "um super-herói verde em pose de ação contra um fundo amarelo e cinza",
    "A figura ocupa quase todo o painel e cria uma composição de alto contraste. A descrição se limita à aparência observada, sem afirmar quais acessórios acompanham a decoração.",
    "Use a imagem para distinguir esta referência de outros temas de heróis. Consulte a disponibilidade e a composição antes de escolher o serviço.",
    "Painel com super-herói verde em pose de ação.",
    { related: ["Homem-Aranha", "Super-Heróis Marvel e DC", "Os Incríveis"] }
  ),
  "Magali – Turma da Mônica": review(
    "a personagem Magali junto a uma melancia, em fundo vermelho e verde",
    "A fruta ocupa boa parte da composição e acompanha a personagem em destaque. O contraste de vermelho e verde conecta a arte à melancia representada no painel.",
    "A referência oferece um detalhe visual fácil de reconhecer. Indique a imagem exata à Lela e consulte se ela está disponível na data da comemoração.",
    "Painel da Magali com melancia em fundo vermelho e verde.",
    { related: ["Mônica – Turma da Mônica", "Mickey Mouse", "Minnie Mouse"] }
  ),
  "Mamãe e Bebê Sereia": review(
    "uma bebê-sereia dentro de uma concha, com fundo rosa e detalhes do mar",
    "A imagem centraliza uma personagem infantil de cabelos rosados e cauda de sereia. A concha e os tons suaves completam a cena sem outras personagens destacadas.",
    "Esta referência pode ajudar a escolher uma proposta de sereia para uma comemoração infantil. Consulte cores, formato e composição para a data.",
    "Bebê-sereia em concha sobre painel rosa com detalhes marinhos.",
    { related: ["Fundo do Mar", "Moana", "Unicórnio Floral"] }
  ),
  "Maria Clara e JP": review(
    "duas crianças ilustradas: uma menina de rosa e verde e um menino de camiseta vermelha e short azul",
    "O arquivo original traz no nome uma referência à Turma da Mônica, enquanto a arte mostra duas crianças sem nomes legíveis. A correspondência com Maria Clara e JP é plausível, mas a imagem sozinha não confirma a identidade comercial.",
    "Use a fotografia para reconhecer a ilustração, mas peça à Lela que confirme a associação antes de divulgar ou reservar pelo nome Maria Clara e JP.",
    "Painel com menina e menino ilustrados em roupas rosa, verde, vermelho e azul.",
    { indexDecision: "CONFIRMATION_REQUIRED", indexationReason: "O nome do arquivo original sugere Turma da Mônica, mas a arte mostra duas crianças e não contém nomes. A correspondência com Maria Clara e JP não pode ser confirmada apenas pela semelhança visual; manter noindex até validação editorial.", imageAlt: "Painel circular com uma menina de roupa rosa e verde e um menino de camiseta vermelha e short azul; identificação comercial pendente.", faqQuestion: "A imagem confirma o tema Maria Clara e JP?", faqAnswer: "A foto mostra duas crianças ilustradas, mas não traz seus nomes. O arquivo original menciona Turma da Mônica e o cadastro atual associa a arte a Maria Clara e JP; confirme essa associação com a Lela antes de considerar a reserva." }
  ),
  "Mickey Mouse": review(
    "Mickey Mouse de shorts vermelhos e sapatos amarelos sobre fundo claro com pequenas silhuetas",
    "O painel destaca o personagem sozinho, com repetição de silhuetas e detalhes discretos no fundo. O vermelho e o amarelo sobressaem na arte clara.",
    "Compare a imagem com outras referências infantis para confirmar que este é o estilo procurado. Informe data e cidade para consultar a disponibilidade.",
    "Painel do Mickey Mouse com shorts vermelhos e fundo claro.",
    { related: ["Minnie Mouse", "Magali – Turma da Mônica", "Moana"] }
  ),
  "Minions": review(
    "um grupo de personagens amarelos com jardineiras azuis em fundo de laboratório",
    "A foto reúne várias figuras em diferentes posições e usa azul e amarelo como cores dominantes. O agrupamento mostra uma referência de painel com o elenco, não um kit de objetos.",
    "Se quer uma decoração com vários personagens, esta composição ajuda a identificar a opção. Confirme com a Lela a data, o serviço e os itens possíveis.",
    "Painel Minions com personagens amarelos em jardineiras azuis.",
    { related: ["Toy Story", "Os Incríveis", "Bob Esponja"] }
  ),
  "Minnie Mouse": review(
    "Minnie Mouse com laço vermelho de bolinhas sobre fundo rosa e vermelho",
    "O laço estampado e as cores da personagem são os elementos mais visíveis. A imagem aproxima o rosto da personagem e deixa pouco espaço para outros motivos.",
    "Use a foto para apontar a variação de painel que procura e pergunte quais formatos podem ser consultados para sua data.",
    "Painel da Minnie Mouse com laço vermelho de bolinhas.",
    { related: ["Mickey Mouse", "Magali – Turma da Mônica", "Unicórnio Floral"] }
  ),
  "Moana": review(
    "uma personagem de cabelos longos diante de mar azul e vegetação tropical, acompanhada por uma criança",
    "A cena mistura água, folhas e figuras em primeiro plano. A fotografia permite reconhecer uma referência tropical e comparar os tons azuis e verdes do painel.",
    "Consulte esta imagem se procura uma proposta visual inspirada no mar e em paisagens tropicais. A Lela confirma disponibilidade e formato para a data.",
    "Painel Moana com mar azul, vegetação tropical e personagens.",
    { related: ["Fundo do Mar", "Mamãe e Bebê Sereia", "Arca de Noé"] }
  ),
  "Mônica – Turma da Mônica": review(
    "a personagem Mônica com um coelho azul, em arte vermelha com pequenos corações",
    "A figura aparece em primeiro plano, segurando o coelho, e o fundo repete detalhes em vermelho. A descrição identifica a imagem do painel, sem inferir outros itens.",
    "Se prefere a personagem Mônica a uma referência de grupo, esta imagem ajuda a fazer a distinção. Informe o tema e a data no atendimento.",
    "Painel da Mônica com coelho azul e fundo vermelho.",
    { related: ["Magali – Turma da Mônica", "Maria Clara e JP", "Mickey Mouse"] }
  ),
  "Monstros S.A.": review(
    "um monstro azul peludo, uma figura verde de um olho e uma menina em cenário azul",
    "A arte reúne personagens de tamanhos diferentes e mantém o azul como fundo predominante. Verde e rosa aparecem como pontos de contraste.",
    "Use a imagem para comparar o grupo e as cores com outras opções infantis. Consulte a Lela para verificar a referência e o formato disponíveis.",
    "Painel Monstros S.A. com personagens azuis, verdes e rosa.",
    { related: ["Bob Esponja", "Minions", "Os Incríveis"] }
  ),
  "Mundo Bita": review(
    "o nome Mundo Bita e personagens coloridos em uma paisagem com arco-íris",
    "O letreiro é acompanhado por figuras de animais e personagens em tons vivos. A composição distribui as imagens ao redor do nome e do arco-íris.",
    "A arte oferece várias cores para comparar ao planejar outros detalhes da festa. Use-a para indicar a referência exata e consulte os formatos disponíveis.",
    "Painel Mundo Bita com personagens e arco-íris.",
    { related: ["Bolofofos", "Galinha Pintadinha", "Patrulha Canina"] }
  ),
  "Música": review(
    "uma mesa montada com painel azul de notas musicais, silhuetas, caixas decorativas e balões pretos e brancos",
    "A fotografia mostra um exemplo de montagem com diferentes superfícies e elementos gráficos ligados à música. O preto, o branco e o azul aparecem na composição fotografada.",
    "Mostre a foto como referência de apresentação e confirme quais itens e qual serviço podem ser reservados. A imagem não fixa a composição de uma contratação.",
    "Exemplo de mesa montada com painel musical e detalhes em preto, branco e azul.",
    { imageType: "mounted", faqQuestion: "A foto do tema Música define os itens de uma reserva?", faqAnswer: "Não. Ela mostra uma mesa montada com painel musical, caixas decorativas e balões pretos e brancos. Consulte com a Lela o formato e os itens que podem compor a opção para sua data." }
  ),
  "O Rei Leão": review(
    "um leão em primeiro plano e outros animais numa paisagem de tons quentes",
    "A arte usa laranja e amarelo para compor a paisagem e destaca o leão no centro. Outros animais aparecem nos lados do painel, ampliando a cena.",
    "Esta imagem ajuda a distinguir uma cena de savana de propostas de fazenda ou safari. Envie a referência à Lela ao consultar a disponibilidade.",
    "Painel O Rei Leão com leão e animais em paisagem de tons quentes.",
    { related: ["Arca de Noé", "Safari Baby", "Fazendinha"] }
  ),
  "O Tempo Voa – Bebê Aviador": review(
    "um bebê em balão de ar quente, nuvens e a frase “O Tempo Voa”",
    "O painel combina a frase com uma cena aérea delicada em azul e rosa. O balão ocupa o centro da composição e reforça a ideia de viagem e passagem do tempo.",
    "A arte pode ser consultada para uma comemoração de bebê. Informe a idade ou a ocasião e a data para a Lela confirmar o formato disponível.",
    "Painel O Tempo Voa com bebê, balão de ar quente e nuvens.",
    { related: ["Ursinho Bebê Azul", "Dinossauros Baby", "Chá Revelação – Menino ou Menina"] }
  ),
  "Os Incríveis": review(
    "uma família de super-heróis em fundo vermelho com o emblema do grupo",
    "As figuras estão reunidas em uma cena compacta e o vermelho domina o painel. A arte funciona como referência de grupo, distinta das imagens que destacam um herói sozinho.",
    "Compare esta composição familiar com Homem-Aranha ou Hulk e indique qual painel deseja consultar. Disponibilidade e formato dependem da data.",
    "Painel Os Incríveis com família de heróis em fundo vermelho.",
    { related: ["Homem-Aranha", "Hulk", "Super-Heróis Marvel e DC"] }
  ),
  "Patrulha Canina": review(
    "vários cães caracterizados com uniformes e distintivos sobre uma base verde",
    "O painel dá destaque ao grupo de filhotes e usa o verde na parte inferior da cena. Os uniformes diferenciam as figuras entre si.",
    "Se quer comparar o grupo completo com a referência individual de Skye, consulte as duas páginas e informe à Lela qual imagem procura.",
    "Painel Patrulha Canina com grupo de cães uniformizados.",
    { related: ["Skye – Patrulha Canina", "Bolofofos", "Mundo Bita"] }
  ),
  "Pool Party": review(
    "a expressão “Pool Party” em letras coloridas, com sol, água e elementos tropicais",
    "O painel usa uma faixa de cores quentes e frias e uma composição descontraída. O texto e os elementos aquáticos identificam uma festa à beira da piscina como referência visual.",
    "Consulte a arte para uma comemoração com essa proposta e confirme qual serviço atende à sua necessidade. A foto não indica entrega, montagem ou itens incluídos.",
    "Painel Pool Party com letras coloridas e motivos tropicais.",
    { related: ["Tardezinha", "Boteco", "Happy Birthday"] }
  ),
  "Primeira Comunhão": review(
    "um cálice e espigas de trigo em traço delicado, junto da inscrição “Primeira Comunhão”",
    "A arte é minimalista e usa tons claros com desenho central de cálice, trigo e pequenos elementos decorativos. O texto identifica a ocasião religiosa.",
    "Use a imagem para consultar esta proposta específica e confirme com a Lela quais formatos podem ser contratados. A fotografia não determina os itens de uma reserva.",
    "Painel Primeira Comunhão com cálice, trigo e traço delicado.",
    { related: ["Crisma", "Chá de Cozinha", "Gratidão"] }
  ),
  "Princesas Disney": review(
    "várias princesas ilustradas em vestidos de cores diferentes, reunidas no mesmo painel",
    "A composição privilegia o grupo e reúne vestidos azuis, amarelos, verdes e lilases. Essa referência é diferente dos painéis centrados numa personagem só.",
    "Se deseja uma arte com várias personagens, esta foto ajuda a distinguir a opção. Confirme nome, composição e disponibilidade na data antes de reservar.",
    "Painel Princesas Disney com personagens em vestidos de várias cores.",
    { related: ["Frozen", "Moana", "Minnie Mouse"] }
  ),
  "Sonic": review(
    "Sonic em destaque, cercado por um círculo de luz azul e grafismos luminosos",
    "O personagem azul aparece no centro de uma composição escura com brilho circular. A paleta azul e branca dá à referência um efeito de movimento.",
    "Use esta imagem para diferenciar a arte do Sonic de outras propostas de videogame. Envie data e cidade para consultar os formatos disponíveis.",
    "Painel Sonic com personagem azul e efeito de luz circular.",
    { related: ["Super Mario", "Videogame / Gamer", "Hot Wheels"] }
  ),
  "Stitch": review(
    "Stitch azul em fundo rosa com corações, pontos e pequenos elementos decorativos",
    "A personagem ocupa o centro, com tons de rosa e azul em todo o painel. Os corações e a padronagem tornam a referência visual distinta de um tema marinho genérico.",
    "Confira se esta é a variação da personagem que você procura e mostre a imagem no atendimento. A disponibilidade é verificada para cada data.",
    "Painel Stitch azul com fundo rosa e corações.",
    { related: ["Moana", "Fundo do Mar", "Minnie Mouse"] }
  ),
  "Super Mario": review(
    "Mario, Luigi e outros personagens do jogo entre blocos e elementos coloridos",
    "O painel reúne personagens e objetos associados ao universo visual do jogo. Verde, azul e vermelho aparecem entre os elementos da composição.",
    "A imagem ajuda a selecionar a arte do tema antes de definir outros detalhes da festa. Consulte a data e o formato com a Lela.",
    "Painel Super Mario com personagens e elementos do jogo.",
    { related: ["Sonic", "Videogame / Gamer", "Toy Story"] }
  ),
  "Super-Heróis Marvel e DC": review(
    "um grupo de heróis ilustrados diante de uma cidade noturna",
    "A cena reúne personagens com diferentes trajes e cores em vez de focar um único herói. O fundo escuro com prédios cria uma referência de quadrinhos e ação.",
    "Consulte a imagem para confirmar se o estilo de grupo atende ao que procura. O nome identifica uma referência visual e não declara parceria, licença ou afiliação com marcas.",
    "Painel de grupo de super-heróis diante de uma cidade noturna.",
    { related: ["Homem-Aranha", "Hulk", "Os Incríveis"] }
  ),
  "Tardezinha": review(
    "a palavra “Tardezinha” sobre um céu em tons de pôr do sol com silhuetas de palmeiras",
    "A arte usa degradê laranja, rosa e azul, com o texto em destaque e palmeiras nas laterais. O visual remete a um encontro ao entardecer sem identificar um evento específico.",
    "Use o painel para indicar essa paleta tropical e consulte disponibilidade e formato. O nome e a imagem não representam parceria com marca ou evento.",
    "Painel Tardezinha com pôr do sol e palmeiras.",
    { related: ["Pool Party", "Boteco", "Happy Birthday"] }
  ),
  "Tom e Jerry": review(
    "Tom e Jerry em fundo amarelo, com o nome do desenho no alto",
    "A imagem aproxima o gato e o rato em uma pose de perseguição e usa amarelo para preencher o painel. A marca visual do título está visível na arte.",
    "Se procura a referência dos dois personagens juntos, esta imagem permite diferenciá-la de outros temas de animação. Consulte a data e o formato com a Lela.",
    "Painel Tom e Jerry com os personagens em fundo amarelo.",
    { related: ["Mickey Mouse", "Minnie Mouse", "Bob Esponja"] }
  ),
  "Unicórnio Floral": review(
    "um unicórnio branco com flores rosas e estrelas sobre fundo claro",
    "Flores e pequenos pontos dourados cercam o unicórnio e criam uma composição suave. O painel combina elementos de fantasia e botânica, não apenas um personagem isolado.",
    "Use a fotografia para avaliar se a paleta floral combina com a comemoração. Informe o tema à Lela para consultar a disponibilidade e o formato.",
    "Painel Unicórnio Floral com flores rosas e estrelas.",
    { related: ["Borboletas e Flores", "Mamãe e Bebê Sereia", "Princesas Disney"] }
  ),
  "Ursinho Bebê Azul": review(
    "uma mesa montada com painel de ursinho, balões azuis e peças decorativas brancas e azuis",
    "A fotografia mostra um exemplo completo de apresentação em ambiente externo, com balões agrupados à esquerda e suportes de alturas diferentes. O registro ajuda a visualizar a paleta azul, mas não define o conteúdo de uma reserva.",
    "Mostre a imagem para consultar a proposta de montagem e confirme separadamente quais peças e qual serviço podem ser contratados para sua data.",
    "Exemplo de mesa Ursinho Bebê Azul com balões e suportes decorativos.",
    { imageType: "mounted", faqQuestion: "A foto do Ursinho Bebê Azul define o kit reservado?", faqAnswer: "Não. A imagem é um exemplo de mesa com painel de ursinho, balões azuis e suportes decorativos. A composição e o serviço disponíveis para a data precisam ser confirmados com a Lela." }
  ),
  "Vasco da Gama": review(
    "um escudo preto e branco com navio ao centro, sobre fundo escuro",
    "O painel apresenta um emblema de alto contraste com a imagem de um navio. A descrição identifica a referência de futebol visualmente cadastrada, sem declarar parceria oficial com o clube.",
    "Envie a foto para a Lela confirmar se essa referência está disponível na data e quais formatos podem ser consultados.",
    "Painel Vasco da Gama com escudo preto e branco e navio.",
    { related: ["Flamengo", "Corinthians", "Brasil Futebol"] }
  ),
  "Videogame / Gamer": review(
    "um controle de videogame neon e a frase “Play Games” sobre fundo azul escuro",
    "A arte usa linhas luminosas e botões coloridos para compor um visual tecnológico. O painel não depende de personagens de um jogo específico.",
    "Esta referência pode ser comparada com temas de jogos que têm personagens próprios. Indique à Lela se prefere um painel gamer genérico e consulte a disponibilidade.",
    "Painel gamer com controle neon e a frase Play Games.",
    { related: ["Super Mario", "Sonic", "Batwheels"] }
  ),
  "Você é a Cereja do Bolo": review(
    "a frase “Você é a Cereja do Bolo”, duas cerejas e uma borda xadrez rosa e branca",
    "A tipografia ocupa o centro e os desenhos de cereja completam a brincadeira com a expressão. A moldura xadrez organiza a composição sem outros personagens.",
    "Use o painel se essa mensagem combina com a comemoração e consulte as possibilidades de formato. A foto não indica se há personalização de texto.",
    "Painel com cerejas e a frase Você é a Cereja do Bolo.",
    { related: ["Faz um Pix Pra Mim", "Happy Birthday", "Dia dos Namorados"] }
  ),
  "Winnie the Pooh": review(
    "um urso amarelo de camiseta vermelha com outros personagens numa paisagem verde",
    "O personagem central está acompanhado por figuras menores e vegetação ao fundo. A imagem usa tons de verde e amarelo, com a cena preenchendo todo o painel.",
    "Consulte esta arte do grupo de personagens e informe qual imagem escolheu. A composição do kit e a disponibilidade para a data são confirmadas no atendimento.",
    "Painel Winnie the Pooh com personagens em paisagem verde.",
    { related: ["Arca de Noé", "Mundo Bita", "Toy Story"] }
  ),

  // Os nomes são genéricos e correspondem ao conteúdo visual observado;
  // a página fica indexável como referência individual do catálogo.
  "Animais da floresta": review(
    "um urso, uma raposa, um guaxinim e outros animais entre folhas e cogumelos",
    "A arte usa ilustração aquarelada em tons de terra e verde, com cada animal em uma posição distinta. O conjunto é coerente com o nome genérico Animais da floresta, sem sugerir uma franquia específica.",
    "Use a imagem para indicar quais animais e qual paleta você procura. A foto é uma referência de painel e não confirma peças adicionais.",
    "Painel aquarelado com animais da floresta, folhas e cogumelos.",
    { related: ["Arca de Noé", "Fazendinha", "Safari Baby"] }
  ),
  "Roedor fofo": review(
    "um hamster ilustrado com laço rosa segurando uma bebida com canudo",
    "A personagem ocupa quase todo o painel, com fundo rosa de bolinhas e roupa listrada. A imagem mostra claramente um roedor em estilo infantil; o nome é genérico e não depende de identificar uma personagem licenciada.",
    "Consulte esta referência se procura uma arte infantil com um pequeno roedor. Informe a data para confirmar formato e disponibilidade.",
    "Painel rosa com hamster ilustrado, laço e bebida.",
    { related: ["Bolofofos", "Unicórnio Floral", "Mamãe e Bebê Sereia"] }
  ),
  "Tropa dos Rosa": review(
    "grupos de personagens ilustrados com roupas coloridas, cabelo rosa e grafismos com a letra R",
    "As duas artes do acervo mostram grupos de personagens em estilos de ilustração diferentes. Os nomes dos arquivos são genéricos e não confirmam que ambas as imagens correspondam à Tropa dos Rosa.",
    "A página descreve apenas o que se vê. A associação comercial das duas artes ao tema precisa ser confirmada antes de apresentar esta opção como uma página indexável.",
    "Duas artes ilustradas com grupos de personagens e grafismos coloridos.",
    { indexDecision: "CONFIRMATION_REQUIRED", indexationReason: "A galeria mistura duas artes com estilos e arquivos de origem distintos. A inspeção visual não basta para confirmar que ambas correspondem ao tema Tropa dos Rosa; manter noindex até a proprietária validar ou separar a associação.", imageAlt: "Grupo de personagens ilustrados em tons de rosa, amarelo e roxo com grafismos; associação ao tema pendente.", imageAltByFile: { "Tema Menina/tema-rainbow-friends-01.jpeg": "Grupo de personagens ilustrados em cores vivas, com cabelo rosa e fundo azul; associação ao tema pendente." }, faqQuestion: "As duas imagens são da mesma referência Tropa dos Rosa?", faqAnswer: "A galeria reúne duas artes com estilos diferentes. Os nomes originais dos arquivos são genéricos; a Lela precisa confirmar se ambas pertencem ao mesmo tema antes de identificar a opção comercial." }
  )
};

module.exports = { reviews, inspectedAt };
