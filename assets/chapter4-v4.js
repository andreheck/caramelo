(() => {
  const data = window.CARAMELO_DATA;
  if (!data || !Array.isArray(data.questions)) return;

  const newItems = [
    {
      id: "q36",
      chapter: 3,
      type: "scenario",
      model: "A",
      title: "Você pode escolher como se organizar com uma equipe para desenvolver um projeto importante.",
      helper: "Em qual configuração você imagina que renderia melhor?",
      options: [
        { icon: "community", label: "Trabalho bem próximo do grupo", desc: "Gosto de trocar bastante, construir junto e acompanhar como as pessoas estão ao longo do projeto.", scores: { social: 3, proposito: 1 } },
        { icon: "compass", label: "Tenho minha frente com autonomia", desc: "Prefiro receber o objetivo e ter liberdade para decidir como conduzir minha parte.", scores: { autonomia: 3 } },
        { icon: "kanban", label: "Cada pessoa tem papel bem definido", desc: "Rendo melhor quando responsabilidades, etapas e combinados estão claros para todos.", scores: { organizador: 3, estabilidade: 1 } },
        { icon: "rocket", label: "Time pequeno, decisões rápidas", desc: "Gosto de ambientes em que posso assumir responsabilidade, decidir e colocar as coisas em movimento.", scores: { empreendedor: 3, reconhecimento: 1 } }
      ]
    },
    {
      id: "q37",
      chapter: 3,
      type: "scenario",
      model: "A",
      title: "Imagine que você trabalha com uma liderança muito competente.",
      helper: "Qual estilo provavelmente faria você entregar seu melhor?",
      options: [
        { icon: "compass", label: "Dá direção e confia em mim", desc: "Alinha o resultado esperado e me deixa escolher o caminho para chegar lá.", scores: { autonomia: 3 } },
        { icon: "landmark", label: "Cria clareza e segurança", desc: "Define prioridades, critérios e rotina para que eu saiba onde estou pisando.", scores: { estabilidade: 3, organizador: 1 } },
        { icon: "handshake", label: "Escuta e desenvolve pessoas", desc: "Conversa, orienta e cria um ambiente em que é possível aprender e pedir ajuda.", scores: { social: 3, proposito: 1 } },
        { icon: "trophy", label: "Desafia e abre espaço para crescer", desc: "Eleva a régua, reconhece boas entregas e me envolve em decisões mais importantes.", scores: { reconhecimento: 3, empreendedor: 1 } }
      ]
    },
    {
      id: "q38",
      chapter: 3,
      type: "scenario",
      model: "A",
      title: "Você pode escolher o clima do lugar onde passará boa parte do seu dia.",
      helper: "Qual ambiente tende a combinar melhor com sua energia?",
      options: [
        { icon: "brain", label: "Calmo e concentrado", desc: "Poucas interrupções, tempo para pensar e espaço para aprofundar assuntos difíceis.", scores: { investigativo: 3, autonomia: 1 } },
        { icon: "community", label: "Colaborativo e próximo", desc: "Pessoas acessíveis, conversas frequentes e sensação de que o trabalho acontece em conjunto.", scores: { social: 3, proposito: 1 } },
        { icon: "palette", label: "Flexível e cheio de estímulos", desc: "Variedade de temas, referências e liberdade para experimentar formas diferentes de fazer.", scores: { criativo: 3, autonomia: 1 } },
        { icon: "zap", label: "Acelerado e desafiador", desc: "Ritmo alto, metas visíveis e situações que pedem iniciativa e decisão rápida.", scores: { empreendedor: 3, reconhecimento: 1 } }
      ]
    },
    {
      id: "q39",
      chapter: 3,
      type: "scenario",
      model: "A",
      title: "Um novo ciclo de trabalho começa e você recebe uma meta importante.",
      helper: "Qual forma de apresentar essa meta mais aumentaria sua vontade de se envolver?",
      options: [
        { icon: "trophy", label: "Um desafio que mostre evolução", desc: "Quero saber o que significaria superar a meta e como meu resultado será reconhecido.", scores: { reconhecimento: 3, empreendedor: 1 } },
        { icon: "globe", label: "Um impacto que faça sentido", desc: "Me envolvo mais quando entendo quem será beneficiado e por que aquele resultado importa.", scores: { proposito: 3, social: 1 } },
        { icon: "clipboard", label: "Um objetivo claro e mensurável", desc: "Gosto de critérios definidos, etapas acompanháveis e uma ideia concreta do que significa concluir bem.", scores: { organizador: 3, estabilidade: 1 } },
        { icon: "rocket", label: "Um desafio com espaço para decidir", desc: "Me anima ter responsabilidade pelo resultado e liberdade para descobrir a melhor rota.", scores: { empreendedor: 3, autonomia: 1 } }
      ]
    },
    {
      id: "q40",
      chapter: 3,
      type: "forced",
      model: "C",
      title: "Pensando em uma semana de trabalho que funciona bem para você, o que pesa mais?",
      helper: "As duas formas podem ser produtivas. Escolha a que tende a sustentar melhor sua energia.",
      options: [
        { icon: "landmark", label: "Ter uma rotina relativamente previsível", desc: "Horários, responsabilidades e prioridades mais estáveis me ajudam a manter consistência.", scores: { estabilidade: 3, organizador: 1 } },
        { icon: "route", label: "Ter uma agenda que possa mudar bastante", desc: "Variedade, novas demandas e liberdade para reorganizar o dia mantêm meu interesse.", scores: { autonomia: 3, criativo: 1 } }
      ]
    },
    {
      id: "q41",
      chapter: 3,
      type: "forced",
      model: "C",
      title: "Quando uma decisão importante precisa ser tomada, qual situação costuma deixar você mais confortável?",
      helper: "Escolha o formato que mais combina com sua forma de assumir responsabilidade.",
      options: [
        { icon: "community", label: "Construir a decisão com outras pessoas", desc: "Prefiro ouvir perspectivas, chegar a um entendimento compartilhado e seguir com compromisso coletivo.", scores: { social: 3, proposito: 1 } },
        { icon: "compass", label: "Ter autonomia para decidir minha parte", desc: "Prefiro assumir a responsabilidade pela escolha e responder diretamente pelo resultado.", scores: { autonomia: 3, pratico: 1 } }
      ]
    },
    {
      id: "q42",
      chapter: 3,
      type: "ranking",
      model: "D",
      title: "Agora organize o que mais importa no seu ambiente de estudo ou trabalho.",
      helper: "Ordene os atributos da maior para a menor importância para você.",
      items: [
        { icon: "landmark", label: "Estrutura e previsibilidade", desc: "Papéis claros, rotina sustentável e menos incerteza desnecessária.", scores: { estabilidade: 2, organizador: 1 } },
        { icon: "compass", label: "Autonomia", desc: "Liberdade para escolher caminhos, organizar prioridades e tomar decisões.", scores: { autonomia: 2 } },
        { icon: "globe", label: "Propósito", desc: "Sentir que o trabalho contribui para algo que considero relevante.", scores: { proposito: 2 } },
        { icon: "trophy", label: "Crescimento e reconhecimento", desc: "Ter desafios, evolução visível e valorização pelas minhas entregas.", scores: { reconhecimento: 2, empreendedor: 1 } },
        { icon: "community", label: "Colaboração", desc: "Ter boas relações, troca frequente e pessoas disponíveis para construir junto.", scores: { social: 2 } },
        { icon: "palette", label: "Liberdade para criar", desc: "Poder experimentar, variar abordagens e trazer ideias próprias para o trabalho.", scores: { criativo: 2 } }
      ]
    }
  ];

  const existing = new Set(data.questions.map(item => item.id));
  const additions = newItems.filter(item => !existing.has(item.id));

  if (additions.length) {
    const q10Index = data.questions.findIndex(item => item.id === "q10");
    const insertAt = q10Index >= 0 ? q10Index + 1 : data.questions.length;
    data.questions.splice(insertAt, 0, ...additions);
  }

  data.version = "4.3.0-prototype";
})();
