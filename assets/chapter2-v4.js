(() => {
  const data = window.CARAMELO_DATA;
  if (!data || !Array.isArray(data.questions)) return;

  const newItems = [
    {
      id: "q21",
      chapter: 1,
      type: "scenario",
      model: "A",
      title: "Você recebe uma tarefa importante, mas as instruções estão incompletas.",
      helper: "Qual é sua primeira estratégia para conseguir avançar?",
      options: [
        { icon: "search", label: "Investigo o contexto", desc: "Procuro exemplos, referências e pistas para entender melhor o que realmente precisa ser resolvido.", scores: { investigativo: 3 } },
        { icon: "wrench", label: "Monto uma primeira versão", desc: "Começo por uma parte concreta e uso o que aparecer no caminho para ajustar a entrega.", scores: { pratico: 3, organizador: 1 } },
        { icon: "messages", label: "Confirmo o essencial", desc: "Faço perguntas objetivas para alinhar prioridade, expectativa e limite antes de seguir.", scores: { social: 3, organizador: 1 } },
        { icon: "rocket", label: "Assumo uma direção", desc: "Escolho uma interpretação razoável, proponho o caminho e movimento a tarefa.", scores: { empreendedor: 3, autonomia: 1 } }
      ]
    },
    {
      id: "q22",
      chapter: 1,
      type: "scenario",
      model: "A",
      title: "Você testa uma primeira solução e ela não funciona como esperava.",
      helper: "O que você tende a fazer em seguida?",
      options: [
        { icon: "microscope", label: "Procuro a causa", desc: "Volto aos dados e tento entender exatamente onde a solução falhou.", scores: { investigativo: 3, organizador: 1 } },
        { icon: "wrench", label: "Testo outra versão", desc: "Mudo uma parte, experimento de novo e aprendo pelo resultado.", scores: { pratico: 3, autonomia: 1 } },
        { icon: "lightbulb", label: "Mudo a abordagem", desc: "Questiono a ideia inicial e tento uma saída diferente do que eu havia imaginado.", scores: { criativo: 3, autonomia: 1 } },
        { icon: "community", label: "Mobilizo outras leituras", desc: "Trago pessoas para olhar o problema comigo e acelerar uma nova direção.", scores: { empreendedor: 3, social: 1 } }
      ]
    },
    {
      id: "q23",
      chapter: 1,
      type: "scenario",
      model: "A",
      title: "Duas pessoas do grupo defendem soluções bem diferentes para o mesmo problema.",
      helper: "Qual atitude aparece mais naturalmente em você?",
      options: [
        { icon: "brain", label: "Comparo critérios e evidências", desc: "Tento separar preferência pessoal de argumentos que realmente sustentam cada alternativa.", scores: { investigativo: 2, organizador: 2 } },
        { icon: "handshake", label: "Facilito um acordo", desc: "Procuro entender os interesses por trás das posições e aproximar as pessoas.", scores: { social: 3, proposito: 1 } },
        { icon: "megaphone", label: "Defino uma direção", desc: "Quando o grupo precisa sair do lugar, assumo a responsabilidade por uma decisão clara.", scores: { empreendedor: 3, reconhecimento: 1 } },
        { icon: "lightbulb", label: "Combino as melhores partes", desc: "Tento construir uma terceira saída que aproveite elementos das duas ideias.", scores: { criativo: 3, autonomia: 1 } }
      ]
    },
    {
      id: "q24",
      chapter: 1,
      type: "scenario",
      model: "A",
      title: "O prazo ficou curto e ainda faltam informações para terminar bem uma entrega.",
      helper: "Qual estratégia você provavelmente priorizaria?",
      options: [
        { icon: "clipboard", label: "Redefino o essencial", desc: "Organizo o que é indispensável, o que pode esperar e o que precisa ser cortado.", scores: { organizador: 3, estabilidade: 1 } },
        { icon: "wrench", label: "Entrego o mínimo que funciona", desc: "Faço uma versão viável agora e deixo claro o que ainda precisa evoluir.", scores: { pratico: 3, empreendedor: 1 } },
        { icon: "messages", label: "Busco a informação crítica", desc: "Identifico a principal dúvida e vou direto a quem pode destravar a decisão.", scores: { social: 2, investigativo: 1 } },
        { icon: "rocket", label: "Faço uma aposta calculada", desc: "Com o que já sei, escolho uma rota e sigo para não perder a janela de ação.", scores: { empreendedor: 3, autonomia: 1 } }
      ]
    },
    {
      id: "q25",
      chapter: 1,
      type: "scenario",
      model: "A",
      title: "Você precisa usar uma ferramenta que nunca utilizou antes.",
      helper: "Como você tende a aprender mais rápido?",
      options: [
        { icon: "books", label: "Entendo como funciona", desc: "Leio documentação, conceitos ou exemplos antes de começar a usar.", scores: { investigativo: 3, organizador: 1 } },
        { icon: "wrench", label: "Aprendo mexendo", desc: "Abro a ferramenta, sigo um exemplo simples e descubro enquanto faço.", scores: { pratico: 3 } },
        { icon: "messages", label: "Peço uma demonstração", desc: "Aprendo melhor quando alguém mostra o fluxo e posso perguntar no caminho.", scores: { social: 3 } },
        { icon: "flask", label: "Experimento possibilidades", desc: "Testo funções diferentes, combino recursos e descubro meu próprio jeito de usar.", scores: { criativo: 2, autonomia: 2 } }
      ]
    },
    {
      id: "q26",
      chapter: 1,
      type: "scenario",
      model: "A",
      title: "Um projeto tem muitas partes acontecendo ao mesmo tempo e começa a ficar confuso.",
      helper: "Onde você tende a concentrar sua energia?",
      options: [
        { icon: "kanban", label: "Mapeio dependências", desc: "Organizo etapas, responsáveis e o que precisa acontecer antes de cada próxima parte.", scores: { organizador: 3, investigativo: 1 } },
        { icon: "wrench", label: "Destravo o ponto crítico", desc: "Procuro o problema concreto que está segurando o restante e atuo nele primeiro.", scores: { pratico: 3 } },
        { icon: "puzzle", label: "Repenso a arquitetura", desc: "Vejo se existe uma forma mais simples ou inteligente de conectar as partes.", scores: { criativo: 3, investigativo: 1 } },
        { icon: "community", label: "Coordeno as frentes", desc: "Alinho pessoas, decisões e responsabilidades para recuperar ritmo e direção.", scores: { empreendedor: 3, social: 1, reconhecimento: 1 } }
      ]
    },
    {
      id: "q27",
      chapter: 1,
      type: "forced",
      model: "C",
      title: "Quando uma entrega importante precisa avançar, qual estratégia combina mais com você?",
      helper: "As duas podem levar a um bom resultado. Escolha a que costuma pesar mais no seu jeito de trabalhar.",
      options: [
        { icon: "ruler", label: "Conferir melhor antes de entregar", desc: "Prefiro reduzir erros importantes, checar critérios e entregar algo mais consistente.", scores: { organizador: 3, investigativo: 1, estabilidade: 1 } },
        { icon: "zap", label: "Entregar cedo e melhorar depois", desc: "Prefiro colocar uma versão em circulação, aprender com o retorno e evoluir rapidamente.", scores: { pratico: 3, empreendedor: 1, autonomia: 1 } }
      ]
    },
    {
      id: "q28",
      chapter: 1,
      type: "ranking",
      model: "D",
      title: "Quando você compara possíveis soluções, o que mais pesa na sua decisão?",
      helper: "Ordene os critérios da maior para a menor importância para você.",
      items: [
        { icon: "microscope", label: "Ter evidências", desc: "A solução precisa fazer sentido diante dos dados e das causas do problema.", scores: { investigativo: 2 } },
        { icon: "wrench", label: "Funcionar na prática", desc: "Precisa ser viável, aplicável e gerar um resultado concreto.", scores: { pratico: 2 } },
        { icon: "hand-heart", label: "Considerar as pessoas", desc: "Quero entender o impacto da decisão em quem será afetado por ela.", scores: { social: 2, proposito: 1 } },
        { icon: "palette", label: "Trazer uma solução original", desc: "Valorizo alternativas que abrem possibilidades e não apenas repetem o padrão.", scores: { criativo: 2, autonomia: 1 } },
        { icon: "home", label: "Reduzir riscos e incertezas", desc: "Dou valor para previsibilidade, clareza e chance de sustentar a solução ao longo do tempo.", scores: { estabilidade: 2, organizador: 1 } },
        { icon: "trophy", label: "Gerar resultado e movimento", desc: "A solução precisa criar avanço visível e mobilizar as pessoas para agir.", scores: { empreendedor: 2, reconhecimento: 1 } }
      ]
    }
  ];

  const existing = new Set(data.questions.map(item => item.id));
  const additions = newItems.filter(item => !existing.has(item.id));

  if (additions.length) {
    const q4Index = data.questions.findIndex(item => item.id === "q4");
    const insertAt = q4Index >= 0 ? q4Index + 1 : data.questions.length;
    data.questions.splice(insertAt, 0, ...additions);
  }

  data.version = "4.1.0-prototype";
})();
