window.CARAMELO_DATA={
version:"3.0.0-prototype",
rankWeights:[2.5,2,1.5,1,.5,0],
momentBoosts:{
 "ensino-medio":{investigativo:.5,social:.5,autonomia:.5},
 "curso-faculdade":{organizador:.7,estabilidade:.4,investigativo:.4},
 "transicao":{autonomia:.8,pratico:.5,proposito:.4}
},
axisLabels:{investigativo:"Investigativo",criativo:"Criativo",social:"Social",empreendedor:"Empreendedor",organizador:"Organizador",pratico:"Prático-realizador",autonomia:"Autonomia",estabilidade:"Estabilidade",proposito:"Propósito",reconhecimento:"Reconhecimento"},
axisOneLiners:{investigativo:"entender a fundo antes de agir",criativo:"imaginar, expressar e criar caminhos",social:"cuidar, ensinar, comunicar e aproximar pessoas",empreendedor:"liderar, influenciar e movimentar oportunidades",organizador:"planejar, estruturar e dar previsibilidade",pratico:"resolver, construir e colocar a mão na massa",autonomia:"ter liberdade para decidir e experimentar",estabilidade:"buscar segurança, rotina e continuidade",proposito:"sentir impacto e sentido no que faz",reconhecimento:"crescer, aparecer e ser valorizado"},
chapters:["Quem sou em movimento","Como resolvo problemas","O que me atrai no mundo","Onde eu funciono melhor","Meu futuro possível"],
questions:[
{id:"q1",chapter:0,type:"scenario",model:"A",title:"Você entra em um projeto novo e ninguém sabe por onde começar.",helper:"Qual cena mais parece sua primeira reação?",options:[
{icon:"kanban",label:"Organizo as etapas",desc:"Divido tarefas, crio ordem e deixo o caminho mais claro.",scores:{organizador:3,estabilidade:1}},
{icon:"lightbulb",label:"Abro possibilidades",desc:"Trago ideias diferentes para o grupo enxergar novos caminhos.",scores:{criativo:3,autonomia:1}},
{icon:"handshake",label:"Alinho as pessoas",desc:"Escuto expectativas e tento fazer todo mundo caminhar junto.",scores:{social:3,proposito:1}},
{icon:"search",label:"Investigo o problema",desc:"Busco dados, referências e causas antes de decidir.",scores:{investigativo:3,pratico:1}}]},
{id:"q2",chapter:0,type:"forced",model:"C",title:"Quando penso no meu futuro profissional, pesa mais para mim:",helper:"As duas opções são boas. Escolha a prioridade que aparece com mais força agora.",options:[
{icon:"home",label:"Ter segurança e previsibilidade",desc:"Saber onde estou pisando e construir com estabilidade.",scores:{estabilidade:3,organizador:1}},
{icon:"route",label:"Ter liberdade para criar meu caminho",desc:"Experimentar, ajustar rota e decidir com autonomia.",scores:{autonomia:3,criativo:1}}]},
{id:"q3",chapter:1,type:"scenario",model:"A",title:"Você precisa resolver um desafio difícil em pouco tempo.",helper:"Qual estratégia aparece mais naturalmente?",options:[
{icon:"brain",label:"Entender o padrão",desc:"Procuro a lógica por trás do problema.",scores:{investigativo:3,organizador:1}},
{icon:"wrench",label:"Testar na prática",desc:"Faço um primeiro protótipo e ajusto no caminho.",scores:{pratico:3,empreendedor:1}},
{icon:"messages",label:"Pedir leituras diferentes",desc:"Converso com pessoas para ampliar a visão.",scores:{social:2,criativo:1}},
{icon:"rocket",label:"Tomar a frente",desc:"Decido uma rota e movimento o grupo.",scores:{empreendedor:3,reconhecimento:1}}]},
{id:"q4",chapter:1,type:"forced",model:"C",title:"Em uma decisão importante, você prefere:",helper:"Escolha o lado que te representa melhor quando não dá para ter tudo ao mesmo tempo.",options:[
{icon:"ruler",label:"Um método claro",desc:"Critérios, etapas e menos improviso.",scores:{organizador:3,estabilidade:1}},
{icon:"wind",label:"Espaço para improvisar",desc:"Adaptar a rota conforme novas possibilidades aparecem.",scores:{autonomia:2,criativo:2}}]},
{id:"q5",chapter:2,type:"scenario",model:"A",title:"Você entra em uma feira de profissões com vários estandes.",helper:"Qual estande provavelmente chamaria sua atenção primeiro?",options:[
{icon:"dna",label:"Pesquisa, ciência e dados",desc:"Descobrir padrões, causas e explicações.",scores:{investigativo:3}},
{icon:"theater",label:"Arte, comunicação e imagem",desc:"Criar linguagem, estética e narrativas.",scores:{criativo:3,reconhecimento:1}},
{icon:"heart-hand",label:"Cuidado, educação e pessoas",desc:"Apoiar desenvolvimento humano e gerar impacto direto.",scores:{social:3,proposito:2}},
{icon:"chart-up",label:"Negócios, gestão e crescimento",desc:"Organizar recursos, liderar e transformar ideias em resultado.",scores:{empreendedor:2,organizador:2,reconhecimento:1}}]},
{id:"q6",chapter:2,type:"forced",model:"C",title:"Qual tipo de problema te prende mais?",helper:"Escolha o que você teria mais vontade de resolver mesmo se ninguém estivesse olhando.",options:[
{icon:"puzzle",label:"Um problema complexo de lógica",desc:"Algo que exige análise, sistema e raciocínio.",scores:{investigativo:3,pratico:1}},
{icon:"sprout",label:"Um problema humano ou social",desc:"Algo que melhora convivência, cuidado ou oportunidade.",scores:{social:3,proposito:2}}]},
{id:"q7",chapter:2,type:"ranking",model:"D",title:"Agora organize o que mais te atrai em uma carreira.",helper:"Clique nos cards na ordem de importância. O primeiro vale mais pontos.",items:[
{icon:"palette",label:"Criar coisas novas",desc:"Expressão, repertório e imaginação.",scores:{criativo:2,autonomia:1}},
{icon:"hand-heart",label:"Ajudar pessoas diretamente",desc:"Cuidado, escuta e transformação humana.",scores:{social:2,proposito:1}},
{icon:"microscope",label:"Resolver problemas complexos",desc:"Pesquisa, análise e profundidade.",scores:{investigativo:2}},
{icon:"bricks",label:"Construir estabilidade",desc:"Segurança, consistência e longo prazo.",scores:{estabilidade:2,organizador:1}},
{icon:"megaphone",label:"Liderar ou influenciar",desc:"Comunicação, iniciativa e reconhecimento.",scores:{empreendedor:2,reconhecimento:1}},
{icon:"wrench",label:"Fazer algo concreto",desc:"Execução, técnica e resultado visível.",scores:{pratico:2}}]},
{id:"q8",chapter:3,type:"scenario",model:"A",title:"Imagine seu ambiente ideal de estudo ou trabalho.",helper:"Qual cenário combina mais com seu funcionamento?",options:[
{icon:"landmark",label:"Clareza e rotina",desc:"Papéis definidos, método e previsibilidade.",scores:{organizador:2,estabilidade:3}},
{icon:"flask",label:"Laboratório de ideias",desc:"Liberdade para testar, criar e aprender fazendo.",scores:{criativo:2,autonomia:2,investigativo:1}},
{icon:"community",label:"Troca entre pessoas",desc:"Conversa, colaboração e construção coletiva.",scores:{social:3,proposito:1}},
{icon:"zap",label:"Movimento e desafio",desc:"Metas, ritmo, oportunidade e crescimento.",scores:{empreendedor:3,reconhecimento:1}}]},
{id:"q9",chapter:3,type:"forced",model:"C",title:"Se uma rotina começa a ficar repetitiva, você tende a desejar mais:",helper:"Escolha a alternativa que costuma pesar mais na sua energia.",options:[
{icon:"books",label:"Profundidade",desc:"A chance de dominar melhor aquele tema.",scores:{investigativo:2,estabilidade:1,organizador:1}},
{icon:"compass",label:"Variedade",desc:"A chance de circular por temas e experiências diferentes.",scores:{criativo:2,autonomia:2}}]},
{id:"q10",chapter:3,type:"scenario",model:"A",title:"Você recebeu uma crítica sobre algo que fez.",helper:"Qual reação é mais provável depois do primeiro impacto?",options:[
{icon:"wrench",label:"Ajusto e melhoro",desc:"Transformo o feedback em melhoria prática.",scores:{pratico:2,reconhecimento:1}},
{icon:"lotus",label:"Reflito com calma",desc:"Preciso entender o que faz sentido antes de mudar.",scores:{investigativo:2,autonomia:1}},
{icon:"handshake",label:"Converso para entender",desc:"Busco contexto e tento preservar a relação.",scores:{social:2,proposito:1}},
{icon:"clipboard",label:"Crio critérios",desc:"Organizo o que será mantido, mudado e priorizado.",scores:{organizador:3}}]},
{id:"q11",chapter:4,type:"forced",model:"C",title:"Entre dois sinais de sucesso, qual combina mais com você hoje?",helper:"Ambas as respostas são legítimas. A ideia é revelar prioridade.",options:[
{icon:"trophy",label:"Ser reconhecido pelo que faço bem",desc:"Crescimento, visibilidade e valorização.",scores:{reconhecimento:3,empreendedor:1}},
{icon:"globe",label:"Sentir que meu trabalho contribui com algo maior",desc:"Sentido, impacto e coerência com valores.",scores:{proposito:3,social:1}}]},
{id:"q12",chapter:4,type:"scenario",model:"A",title:"Você está escolhendo entre caminhos possíveis.",helper:"Qual próximo passo parece mais útil para sair da dúvida?",options:[
{icon:"microphone",label:"Conversar com profissionais",desc:"Entender rotinas reais e ouvir histórias de quem já atua.",scores:{social:2,investigativo:1}},
{icon:"receipt",label:"Comparar critérios",desc:"Listar tempo de formação, rotina, renda, mercado e riscos.",scores:{organizador:3,estabilidade:1}},
{icon:"flask",label:"Fazer uma experiência curta",desc:"Curso, projeto, visita, voluntariado ou teste prático.",scores:{pratico:2,autonomia:1}},
{icon:"brain",label:"Pesquisar profundamente",desc:"Estudar áreas, grades curriculares e possibilidades futuras.",scores:{investigativo:3}}]}
],
profiles:[
{id:"explorador-analitico",title:"Explorador Analítico",weights:{investigativo:1.4,autonomia:.6,pratico:.35,organizador:.25},summary:"Seu padrão de respostas sugere curiosidade, busca por compreensão e preferência por decisões bem pensadas.",motivator:"Compreender antes de escolher",environment:"Ambientes com autonomia, estudo e complexidade",tension:"Cuidado para não pesquisar tanto que a decisão fique sempre adiada.",careers:["Pesquisa","Ciência de Dados","UX Research","Engenharia","Psicologia Experimental","Economia","Relações Internacionais","Análise de Mercado"]},
{id:"criador-expressivo",title:"Criador Expressivo",weights:{criativo:1.45,autonomia:.75,reconhecimento:.35,empreendedor:.25},summary:"Você parece se mover melhor quando existe espaço para criar, testar linguagens e transformar ideias em algo visível.",motivator:"Dar forma nova às ideias",environment:"Ambientes flexíveis, criativos e com variedade",tension:"Cuidado para trocar de rota antes de amadurecer uma possibilidade.",careers:["Design","Publicidade","Produção de Conteúdo","Audiovisual","Moda","Arquitetura","Produto Digital","Comunicação"]},
{id:"cuidador-estrategico",title:"Cuidador Estratégico",weights:{social:1.35,proposito:.9,organizador:.25,investigativo:.25},summary:"Seu resultado indica sensibilidade para pessoas, escuta e desejo de contribuir com desenvolvimento humano.",motivator:"Ajudar pessoas a se desenvolverem",environment:"Ambientes colaborativos, humanos e com impacto direto",tension:"Cuidado para carregar responsabilidades que não são só suas.",careers:["Psicologia","Educação","RH","Saúde","Serviço Social","Mediação","Fonoaudiologia","Pedagogia"]},
{id:"construtor-organizado",title:"Construtor Organizado",weights:{organizador:1.35,estabilidade:1.05,pratico:.35,reconhecimento:.2},summary:"Você tende a funcionar bem quando existe método, clareza e continuidade.",motivator:"Criar ordem para fazer acontecer",environment:"Ambientes previsíveis, estruturados e com metas claras",tension:"Cuidado para evitar boas oportunidades só porque ainda não parecem totalmente seguras.",careers:["Administração","Contabilidade","Gestão de Projetos","Operações","Logística","Finanças","Processos","Gestão Pública"]},
{id:"comunicador-influente",title:"Comunicador Influente",weights:{empreendedor:1.2,social:.65,reconhecimento:.9,criativo:.25},summary:"Você demonstra energia para movimentar pessoas, apresentar ideias e buscar crescimento.",motivator:"Conectar pessoas, ideias e oportunidades",environment:"Ambientes dinâmicos, com troca, metas e visibilidade",tension:"Cuidado para medir seu valor apenas por aprovação externa.",careers:["Marketing","Vendas","Eventos","Relações Públicas","Jornalismo","Negócios","Gestão Comercial","Empreendedorismo"]},
{id:"transformador-social",title:"Transformador Social",weights:{proposito:1.35,social:.95,criativo:.35,empreendedor:.2},summary:"Seu padrão aponta busca por sentido, contribuição e impacto.",motivator:"Sentir que o trabalho importa",environment:"Ambientes com propósito, pessoas e problemas reais",tension:"Cuidado para romantizar uma área sem investigar rotina, remuneração e limites.",careers:["Políticas Públicas","ONGs","Educação","Saúde Coletiva","Direito","Ciências Sociais","Sustentabilidade","Projetos Sociais"]},
{id:"realizador-pratico",title:"Realizador Prático",weights:{pratico:1.3,empreendedor:.55,estabilidade:.35,investigativo:.25},summary:"Você parece aprender melhor colocando ideias em ação.",motivator:"Aprender fazendo e resolver no mundo real",environment:"Ambientes práticos, técnicos e orientados a solução",tension:"Cuidado para agir rápido demais sem comparar cenários importantes.",careers:["Tecnologia","Engenharia","Gastronomia","Design de Produto","Técnico Industrial","Logística","Agronegócio","Manutenção"]}
]};