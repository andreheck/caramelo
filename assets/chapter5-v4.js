(() => {
  const data = window.CARAMELO_DATA;
  if (!data || !Array.isArray(data.questions)) return;

  const newItems = [
    {
      id: "q43",
      chapter: 4,
      type: "scenario",
      model: "A",
      title: "Você está considerando um curso ou área que parece interessante, mas ainda não sabe se combina com você.",
      helper: "Qual seria seu primeiro movimento para reduzir a dúvida?",
      options: [
        { icon: "books", label: "Pesquisar a fundo", desc: "Quero entender grade, rotina, possibilidades de atuação e o que realmente se estuda naquela área.", scores: { investigativo: 3, organizador: 1 } },
        { icon: "microphone", label: "Conversar com quem vive isso", desc: "Prefiro ouvir estudantes e profissionais para entender a experiência real por trás das informações oficiais.", scores: { social: 3, investigativo: 1 } },
        { icon: "flask", label: "Testar em pequena escala", desc: "Faço um curso curto, projeto ou experiência prática para sentir como eu funciono naquele tipo de atividade.", scores: { pratico: 3, autonomia: 1 } },
        { icon: "receipt", label: "Comparar critérios objetivos", desc: "Organizo duração, custo, acesso, mercado e rotina para ver se o caminho é viável para mim.", scores: { organizador: 3, estabilidade: 1 } }
      ]
    },
    {
      id: "q44",
      chapter: 4,
      type: "scenario",
      model: "A",
      title: "Você se interessa por um caminho, mas sua família prefere que você escolha outra coisa.",
      helper: "Qual reação combina mais com a forma como você gostaria de decidir?",
      options: [
        { icon: "compass", label: "Defendo minha escolha com argumentos", desc: "Quero ouvir, mas no fim assumir uma decisão que tenha a ver com quem eu quero me tornar.", scores: { autonomia: 3, proposito: 1 } },
        { icon: "messages", label: "Entendo o que está por trás da preocupação", desc: "Procuro compreender medos, expectativas e necessidades antes de construir uma saída possível.", scores: { social: 3, estabilidade: 1 } },
        { icon: "wrench", label: "Faço um teste antes de decidir", desc: "Prefiro experimentar o caminho na prática e usar essa experiência para conversar com mais segurança.", scores: { pratico: 3, investigativo: 1 } },
        { icon: "globe", label: "Comparo os futuros possíveis", desc: "Penso no tipo de vida e contribuição que cada opção poderia construir e vejo qual faz mais sentido para mim.", scores: { proposito: 3, investigativo: 1 } }
      ]
    },
    {
      id: "q45",
      chapter: 4,
      type: "scenario",
      model: "A",
      title: "Surge uma oportunidade interessante, mas aceitar significa abrir mão de algo importante.",
      helper: "Qual critério provavelmente pesaria mais na sua decisão?",
      options: [
        { icon: "landmark", label: "A segurança do caminho", desc: "Quero saber se a escolha é sustentável, previsível e compatível com minhas responsabilidades.", scores: { estabilidade: 3, organizador: 1 } },
        { icon: "globe", label: "O sentido do que vou construir", desc: "Aceitaria uma troca maior se sentisse que o caminho tem significado e contribuição real.", scores: { proposito: 3, social: 1 } },
        { icon: "trophy", label: "O potencial de crescimento", desc: "Avalio quanto a oportunidade pode ampliar minha experiência, responsabilidade e reconhecimento.", scores: { reconhecimento: 3, empreendedor: 1 } },
        { icon: "compass", label: "A liberdade que ela pode trazer", desc: "Dou muito peso à possibilidade de aprender, escolher caminhos e ganhar mais autonomia.", scores: { autonomia: 3, investigativo: 1 } }
      ]
    },
    {
      id: "q46",
      chapter: 4,
      type: "forced",
      model: "C",
      title: "Se duas carreiras parecessem igualmente possíveis, qual fator tenderia a pesar mais?",
      helper: "As duas necessidades são legítimas. Escolha a que você sentiria mais falta se não estivesse presente.",
      options: [
        { icon: "globe", label: "Sentir sentido no que faço", desc: "Quero perceber que meu trabalho contribui para algo que considero relevante.", scores: { proposito: 3, social: 1 } },
        { icon: "landmark", label: "Ter segurança financeira e previsibilidade", desc: "Quero um caminho que ofereça estabilidade suficiente para planejar minha vida com tranquilidade.", scores: { estabilidade: 3, organizador: 1 } }
      ]
    },
    {
      id: "q47",
      chapter: 4,
      type: "forced",
      model: "C",
      title: "Pensando em uma carreira que evolui bem, qual cenário parece mais atraente?",
      helper: "Escolha o tipo de crescimento que mais combina com sua motivação.",
      options: [
        { icon: "trophy", label: "Ganhar espaço e reconhecimento", desc: "Quero assumir projetos maiores, ser referência e ter meu resultado percebido.", scores: { reconhecimento: 3, empreendedor: 1 } },
        { icon: "compass", label: "Ganhar liberdade para escolher meu caminho", desc: "Quero ampliar minha autonomia, decidir prioridades e construir um jeito próprio de trabalhar.", scores: { autonomia: 3, criativo: 1 } }
      ]
    },
    {
      id: "q48",
      chapter: 4,
      type: "forced",
      model: "C",
      title: "Ao imaginar sua evolução profissional, qual direção desperta mais interesse?",
      helper: "As duas podem levar a carreiras fortes. Escolha a que mais combina com o tipo de responsabilidade que você gostaria de assumir.",
      options: [
        { icon: "microscope", label: "Me tornar especialista em um assunto", desc: "Quero aprofundar conhecimento até ser procurado pela qualidade técnica e pela capacidade de resolver questões difíceis.", scores: { investigativo: 3, estabilidade: 1 } },
        { icon: "megaphone", label: "Liderar pessoas e decisões", desc: "Quero coordenar caminhos, mobilizar pessoas e responder por resultados mais amplos.", scores: { empreendedor: 3, social: 1, reconhecimento: 1 } }
      ]
    },
    {
      id: "q49",
      chapter: 4,
      type: "forced",
      model: "C",
      title: "Qual trajetória profissional parece mais confortável para você construir ao longo dos próximos anos?",
      helper: "Não pense no que parece mais correto. Pense no tipo de caminho em que você provavelmente funcionaria melhor.",
      options: [
        { icon: "landmark", label: "Um caminho mais previsível", desc: "Gosto da ideia de etapas claras, crescimento progressivo e alguma segurança sobre o que vem depois.", scores: { estabilidade: 3, organizador: 1 } },
        { icon: "route", label: "Uma trajetória mais experimental", desc: "Prefiro poder testar áreas, combinar experiências e mudar de direção quando fizer sentido.", scores: { autonomia: 3, criativo: 1 } }
      ]
    },
    {
      id: "q50",
      chapter: 4,
      type: "ranking",
      model: "D",
      title: "Para fechar esta etapa, o que mais pesa quando você compara caminhos profissionais?",
      helper: "Ordene os critérios da maior para a menor importância para você hoje. O ranking é uma síntese, não uma decisão definitiva.",
      items: [
        { icon: "globe", label: "Sentido", desc: "Trabalhar com algo que tenha significado e contribuição para mim.", scores: { proposito: 2 } },
        { icon: "landmark", label: "Segurança", desc: "Ter estabilidade financeira e uma trajetória minimamente previsível.", scores: { estabilidade: 2 } },
        { icon: "compass", label: "Autonomia", desc: "Ter espaço para escolher caminhos, organizar prioridades e decidir como trabalhar.", scores: { autonomia: 2 } },
        { icon: "books", label: "Aprendizado", desc: "Continuar aprendendo, aprofundando conhecimentos e enfrentando problemas interessantes.", scores: { investigativo: 2 } },
        { icon: "community", label: "Pessoas", desc: "Ter relações, colaboração e possibilidade de contribuir diretamente com outras pessoas.", scores: { social: 2 } },
        { icon: "trophy", label: "Reconhecimento", desc: "Ter crescimento visível, responsabilidade e valorização pelas minhas entregas.", scores: { reconhecimento: 2, empreendedor: 1 } }
      ]
    }
  ];

  const existing = new Set(data.questions.map(item => item.id));
  const additions = newItems.filter(item => !existing.has(item.id));

  if (additions.length) {
    const q12Index = data.questions.findIndex(item => item.id === "q12");
    const insertAt = q12Index >= 0 ? q12Index + 1 : data.questions.length;
    data.questions.splice(insertAt, 0, ...additions);
  }

  data.version = "4.4.0-prototype";
})();
