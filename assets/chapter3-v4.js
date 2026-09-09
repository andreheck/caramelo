(() => {
  const data = window.CARAMELO_DATA;
  if (!data || !Array.isArray(data.questions)) return;

  const newItems = [
    {
      id: "q29",
      chapter: 2,
      type: "scenario",
      model: "A",
      title: "Você abre uma plataforma cheia de conteúdos diferentes e tem meia hora livre.",
      helper: "Qual tipo de conteúdo tem mais chance de prender sua atenção espontaneamente?",
      options: [
        { icon: "microscope", label: "Descobertas, ciência e explicações", desc: "Quero entender como algo funciona, por que acontece e o que os dados mostram.", scores: { investigativo: 3 } },
        { icon: "theater", label: "Histórias, estética e criação", desc: "Me atraem ideias, narrativas, imagens e formas diferentes de expressão.", scores: { criativo: 3, reconhecimento: 1 } },
        { icon: "community", label: "Pessoas, relações e desenvolvimento", desc: "Tenho curiosidade por experiências humanas, comportamento e formas de ajudar alguém a crescer.", scores: { social: 3, proposito: 1 } },
        { icon: "chart-up", label: "Negócios, oportunidades e movimento", desc: "Gosto de entender tendências, decisões, crescimento e como transformar ideias em resultado.", scores: { empreendedor: 3, reconhecimento: 1 } }
      ]
    },
    {
      id: "q30",
      chapter: 2,
      type: "scenario",
      model: "A",
      title: "Você entra como voluntário em um projeto social que está começando.",
      helper: "Qual frente despertaria mais vontade de contribuir?",
      options: [
        { icon: "hand-heart", label: "Acompanhar pessoas de perto", desc: "Conversar, orientar, ensinar ou apoiar diretamente quem participa do projeto.", scores: { social: 3, proposito: 1 } },
        { icon: "clipboard", label: "Organizar a operação", desc: "Estruturar agenda, tarefas, recursos e processos para o projeto funcionar melhor.", scores: { organizador: 3, social: 1 } },
        { icon: "globe", label: "Mobilizar uma causa maior", desc: "Criar ações que ampliem alcance, consciência e mudança para mais gente.", scores: { proposito: 3, empreendedor: 1 } },
        { icon: "wrench", label: "Criar uma solução útil", desc: "Construir uma ferramenta, material ou serviço que resolva um problema concreto do projeto.", scores: { pratico: 3, proposito: 1 } }
      ]
    },
    {
      id: "q31",
      chapter: 2,
      type: "scenario",
      model: "A",
      title: "Em uma oficina aberta, você pode escolher apenas uma atividade para passar a tarde.",
      helper: "Qual delas parece mais interessante?",
      options: [
        { icon: "wrench", label: "Montar e testar um protótipo", desc: "Quero construir algo, mexer em materiais e ver o resultado funcionando.", scores: { pratico: 3 } },
        { icon: "palette", label: "Criar uma peça visual ou narrativa", desc: "Quero transformar uma ideia em imagem, texto, som ou experiência.", scores: { criativo: 3 } },
        { icon: "brain", label: "Resolver um desafio de análise", desc: "Quero investigar dados, padrões ou uma pergunta difícil até encontrar uma explicação.", scores: { investigativo: 3 } },
        { icon: "messages", label: "Facilitar uma conversa", desc: "Quero ouvir pessoas, conectar perspectivas e ajudar o grupo a construir algo junto.", scores: { social: 3 } }
      ]
    },
    {
      id: "q32",
      chapter: 2,
      type: "scenario",
      model: "A",
      title: "Pense em uma mudança que faria você sentir orgulho de ter ajudado a construir.",
      helper: "Qual tipo de transformação mais mexe com você?",
      options: [
        { icon: "hand-heart", label: "Ver uma pessoa se desenvolver", desc: "Acompanhar alguém ganhando confiança, habilidade, saúde ou novas possibilidades.", scores: { social: 3, proposito: 1 } },
        { icon: "globe", label: "Mudar uma realidade para muita gente", desc: "Atuar em uma causa, sistema, comunidade ou problema coletivo de forma mais ampla.", scores: { proposito: 3, empreendedor: 1 } },
        { icon: "theater", label: "Criar algo que marque pessoas", desc: "Produzir uma ideia, obra, produto ou linguagem que gere identificação e repercussão.", scores: { criativo: 3, reconhecimento: 1 } },
        { icon: "bricks", label: "Fazer algo funcionar melhor", desc: "Melhorar um processo, estrutura ou serviço e perceber resultado concreto no cotidiano.", scores: { pratico: 2, organizador: 2 } }
      ]
    },
    {
      id: "q33",
      chapter: 2,
      type: "scenario",
      model: "A",
      title: "Você precisa escolher um tema para se dedicar por vários meses.",
      helper: "Qual tipo de projeto teria mais chance de manter sua curiosidade viva?",
      options: [
        { icon: "books", label: "Investigar uma pergunta difícil", desc: "Aprofundar conhecimento, comparar hipóteses e entender algo que ainda não está claro.", scores: { investigativo: 3, estabilidade: 1 } },
        { icon: "palette", label: "Criar algo autoral", desc: "Desenvolver uma ideia própria, experimentar formatos e construir uma identidade para o projeto.", scores: { criativo: 3, autonomia: 1 } },
        { icon: "community", label: "Acompanhar desenvolvimento humano", desc: "Trabalhar com pessoas ao longo do tempo e perceber mudanças concretas em suas trajetórias.", scores: { social: 3, proposito: 1 } },
        { icon: "rocket", label: "Fazer uma iniciativa crescer", desc: "Transformar uma ideia em algo maior, mobilizar pessoas e acompanhar resultados aparecendo.", scores: { empreendedor: 3, reconhecimento: 1 } }
      ]
    },
    {
      id: "q34",
      chapter: 2,
      type: "forced",
      model: "C",
      title: "Quando você encontra algo que poderia ficar muito melhor, qual impulso aparece mais forte?",
      helper: "As duas alternativas podem gerar excelentes resultados. Escolha a que mais combina com sua motivação natural.",
      options: [
        { icon: "lightbulb", label: "Imaginar uma solução nova", desc: "Gosto de questionar o formato atual e criar um caminho diferente do que já existe.", scores: { criativo: 3, autonomia: 1 } },
        { icon: "wrench", label: "Aprimorar o que já existe", desc: "Gosto de identificar falhas, simplificar e transformar algo conhecido em uma solução mais eficiente.", scores: { pratico: 3, organizador: 1 } }
      ]
    },
    {
      id: "q35",
      chapter: 2,
      type: "forced",
      model: "C",
      title: "Pensando em crescer profissionalmente, qual conquista parece mais estimulante?",
      helper: "Escolha o tipo de reconhecimento que mais faria você sentir que está avançando.",
      options: [
        { icon: "trophy", label: "Ter meu trabalho reconhecido e influenciar decisões", desc: "Ser lembrado pelo resultado, ganhar espaço e ter voz em projetos importantes.", scores: { reconhecimento: 3, empreendedor: 1 } },
        { icon: "microscope", label: "Dominar profundamente um assunto", desc: "Ser procurado pela qualidade do meu conhecimento e pela capacidade de resolver questões difíceis.", scores: { investigativo: 3, estabilidade: 1 } }
      ]
    }
  ];

  const existing = new Set(data.questions.map(item => item.id));
  const additions = newItems.filter(item => !existing.has(item.id));

  if (additions.length) {
    const q7Index = data.questions.findIndex(item => item.id === "q7");
    const insertAt = q7Index >= 0 ? q7Index + 1 : data.questions.length;
    data.questions.splice(insertAt, 0, ...additions);
  }

  data.version = "4.2.0-prototype";
})();
