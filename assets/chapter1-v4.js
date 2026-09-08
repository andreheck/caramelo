(() => {
  const data = window.CARAMELO_DATA;
  if (!data || !Array.isArray(data.questions)) return;

  const newItems = [
    {
      id: "q13",
      chapter: 0,
      type: "scenario",
      model: "A",
      title: "Você recebe uma tarefa longa que vai exigir constância por vários dias.",
      helper: "O que mais ajuda você a entrar em movimento?",
      options: [
        { icon: "kanban", label: "Quebrar em pequenas etapas", desc: "Organizo o caminho e começo por uma parte que consigo enxergar bem.", scores: { organizador: 3, estabilidade: 1 } },
        { icon: "rocket", label: "Começar logo por uma parte", desc: "Prefiro colocar algo em prática cedo e ganhar ritmo fazendo.", scores: { pratico: 3, empreendedor: 1 } },
        { icon: "lightbulb", label: "Encontrar um jeito mais interessante", desc: "Procuro uma abordagem que desperte curiosidade e deixe a tarefa menos automática.", scores: { criativo: 3, autonomia: 1 } },
        { icon: "globe", label: "Entender por que aquilo importa", desc: "Quando vejo sentido no que estou fazendo, fica mais fácil sustentar o esforço.", scores: { proposito: 3, investigativo: 1 } }
      ]
    },
    {
      id: "q14",
      chapter: 0,
      type: "scenario",
      model: "A",
      title: "Você chega a um grupo novo para fazer um trabalho em conjunto.",
      helper: "Qual papel costuma aparecer mais espontaneamente?",
      options: [
        { icon: "community", label: "Puxo a aproximação", desc: "Converso, conheço as pessoas e ajudo o grupo a ficar mais à vontade.", scores: { social: 3, proposito: 1 } },
        { icon: "megaphone", label: "Dou impulso para o grupo", desc: "Proponho uma direção e tento transformar conversa em movimento.", scores: { empreendedor: 3, reconhecimento: 1 } },
        { icon: "clipboard", label: "Organizo os combinados", desc: "Ajudo a definir quem faz o quê, prazos e próximos passos.", scores: { organizador: 3, estabilidade: 1 } },
        { icon: "search", label: "Observo antes de entrar", desc: "Prefiro entender o clima, as pessoas e o que está acontecendo antes de me posicionar.", scores: { investigativo: 3, autonomia: 1 } }
      ]
    },
    {
      id: "q15",
      chapter: 0,
      type: "scenario",
      model: "A",
      title: "Você ganhou uma tarde livre para aprender alguma coisa por conta própria.",
      helper: "Qual experiência teria mais chance de prender sua atenção?",
      options: [
        { icon: "books", label: "Mergulhar em um assunto", desc: "Ler, pesquisar e entender um tema com mais profundidade.", scores: { investigativo: 3 } },
        { icon: "palette", label: "Criar alguma coisa", desc: "Usar a tarde para produzir, desenhar, escrever ou experimentar uma ideia.", scores: { criativo: 3 } },
        { icon: "wrench", label: "Aprender fazendo", desc: "Seguir um tutorial, montar, testar e descobrir na prática.", scores: { pratico: 3 } },
        { icon: "messages", label: "Trocar com outras pessoas", desc: "Aprender conversando, vendo experiências e fazendo perguntas.", scores: { social: 3 } }
      ]
    },
    {
      id: "q16",
      chapter: 0,
      type: "scenario",
      model: "A",
      title: "Um plano que parecia certo muda de última hora.",
      helper: "Depois do primeiro impacto, qual reação combina mais com você?",
      options: [
        { icon: "route", label: "Adapto a rota", desc: "Aceito a mudança e procuro rapidamente outro caminho que funcione.", scores: { autonomia: 3, criativo: 1 } },
        { icon: "ruler", label: "Reorganizo o plano", desc: "Refaço prioridades, sequência e prazos para recuperar clareza.", scores: { organizador: 3, estabilidade: 1 } },
        { icon: "handshake", label: "Alinho com as pessoas", desc: "Quero entender como a mudança afeta cada um antes de seguir.", scores: { social: 3, proposito: 1 } },
        { icon: "zap", label: "Procuro a oportunidade na mudança", desc: "Vejo se a nova situação abre uma chance de avançar de outro jeito.", scores: { empreendedor: 3, reconhecimento: 1 } }
      ]
    },
    {
      id: "q17",
      chapter: 0,
      type: "scenario",
      model: "A",
      title: "Você tem várias ideias boas ao mesmo tempo, mas precisa escolher uma para seguir.",
      helper: "Como você tende a sair desse excesso de possibilidades?",
      options: [
        { icon: "lightbulb", label: "Agrupo as ideias por afinidade", desc: "Procuro conexões e tento transformar várias possibilidades em uma direção mais interessante.", scores: { criativo: 2, organizador: 2 } },
        { icon: "wrench", label: "Testo uma rapidamente", desc: "Faço algo pequeno para descobrir na prática qual ideia tem mais força.", scores: { pratico: 3, autonomia: 1 } },
        { icon: "search", label: "Pesquiso antes de escolher", desc: "Comparo informações, riscos e potencial para reduzir a incerteza.", scores: { investigativo: 3, organizador: 1 } },
        { icon: "messages", label: "Converso para ganhar perspectiva", desc: "Escuto outras leituras para perceber melhor o que eu ainda não estava enxergando.", scores: { social: 3, proposito: 1 } }
      ]
    },
    {
      id: "q18",
      chapter: 0,
      type: "scenario",
      model: "A",
      title: "Alguém pede sua ajuda em um assunto que você conhece bem.",
      helper: "Qual jeito de ajudar parece mais natural para você?",
      options: [
        { icon: "hand-heart", label: "Explico com calma", desc: "Quero que a pessoa se sinta segura para perguntar e compreender no próprio ritmo.", scores: { social: 3, proposito: 1 } },
        { icon: "books", label: "Mostro boas referências", desc: "Aponto materiais e caminhos para a pessoa entender melhor por conta própria.", scores: { investigativo: 2, autonomia: 2 } },
        { icon: "wrench", label: "Faço junto na prática", desc: "Prefiro demonstrar, testar com a pessoa e resolver enquanto fazemos.", scores: { pratico: 3, social: 1 } },
        { icon: "clipboard", label: "Organizo os próximos passos", desc: "Transformo a dúvida em uma sequência clara para a pessoa conseguir avançar.", scores: { organizador: 3, social: 1 } }
      ]
    },
    {
      id: "q19",
      chapter: 0,
      type: "forced",
      model: "C",
      title: "Quando você ainda não tem todas as informações, o que costuma funcionar melhor?",
      helper: "As duas estratégias podem ser boas. Escolha a que aparece com mais força no seu jeito de começar.",
      options: [
        { icon: "rocket", label: "Começar com uma versão simples e ajustar", desc: "Prefiro aprender com o movimento e melhorar conforme novas informações aparecem.", scores: { pratico: 3, autonomia: 1 } },
        { icon: "microscope", label: "Entender melhor antes de avançar", desc: "Prefiro esclarecer critérios importantes para diminuir retrabalho e incerteza.", scores: { investigativo: 3, organizador: 1 } }
      ]
    },
    {
      id: "q20",
      chapter: 0,
      type: "ranking",
      model: "D",
      title: "O que mais dá energia para você começar uma tarefa?",
      helper: "Clique nos cards da maior para a menor importância. Não existe combinação ideal.",
      items: [
        { icon: "compass", label: "Ter liberdade para escolher como fazer", desc: "Espaço para decidir, testar e adaptar o caminho.", scores: { autonomia: 2 } },
        { icon: "globe", label: "Perceber sentido no que estou fazendo", desc: "Entender a contribuição ou importância daquela tarefa.", scores: { proposito: 2 } },
        { icon: "trophy", label: "Ter um desafio que mostre meu crescimento", desc: "Sentir que existe conquista, evolução e valorização envolvidas.", scores: { reconhecimento: 2, empreendedor: 1 } },
        { icon: "home", label: "Ter clareza sobre o que precisa ser feito", desc: "Objetivo bem definido, estrutura e menos incerteza para começar.", scores: { estabilidade: 2, organizador: 1 } },
        { icon: "community", label: "Ter outras pessoas envolvidas", desc: "Troca, compromisso conjunto e energia do grupo.", scores: { social: 2 } },
        { icon: "wrench", label: "Conseguir colocar a mão na massa", desc: "Ver uma ação concreta acontecendo logo no início.", scores: { pratico: 2 } }
      ]
    }
  ];

  const existing = new Set(data.questions.map(item => item.id));
  const additions = newItems.filter(item => !existing.has(item.id));

  if (additions.length) {
    data.questions.splice(2, 0, ...additions);
  }

  data.version = "3.1.0-prototype";
})();
