(()=>{
  const J=window.CARAMELO_JOURNEY;
  if(!J)return;

  const state=J.state;
  const STORAGE_KEY="caramelo:v4:journey";
  const DAY=5;
  const XP=70;
  const DIMENSIONS={
    literal:"Informação explícita",
    inferencia:"Inferência",
    intencao:"Intenção comunicativa",
    instrucao:"Aplicação de instruções"
  };
  const QUESTIONS=[
    {id:"t1",dimension:"literal",icon:"clipboard",source:"Anúncio de estágio",title:"Quantos dias por semana a pessoa precisa ir ao escritório?",context:"Estágio em Produto · 25 horas semanais · segunda a sexta, das 13h às 18h · modelo híbrido com presença no escritório às terças, quartas e quintas.",options:["1 dia","2 dias","3 dias","5 dias"],correct:2},
    {id:"t2",dimension:"inferencia",icon:"messages",source:"Mensagem de WhatsApp",title:"Por que a pessoa pediu o arquivo antes das 16h?",context:"“Consegue me mandar a versão final antes das 16h? Às 16h30 entro na reunião com o cliente e queria dar uma última conferida.”",options:["Porque o arquivo vence às 16h","Porque ela quer revisar o material antes da reunião","Porque a reunião foi cancelada","Porque o cliente pediu o arquivo diretamente"],correct:1},
    {id:"t3",dimension:"intencao",icon:"microphone",source:"E-mail de processo seletivo",title:"Qual é a principal mensagem deste e-mail?",context:"“Agradecemos muito sua participação e o tempo dedicado ao processo. Neste momento, seguiremos com outros perfis para esta vaga. Esperamos poder conversar novamente em oportunidades futuras.”",options:["A pessoa foi aprovada","O processo foi adiado","A pessoa não seguirá nesta vaga","A empresa está pedindo nova entrevista"],correct:2},
    {id:"t4",dimension:"instrucao",icon:"landmark",source:"Aviso de evento escolar",title:"O que falta para uma pessoa de 17 anos entrar no evento?",context:"Entrada até 18h30. Todos devem apresentar documento com foto. Participantes menores de 18 anos também precisam levar autorização assinada pelo responsável. João tem 17 anos, chegou às 18h20 e trouxe apenas o RG.",options:["Nada, ele já pode entrar","A autorização assinada","Outro documento com foto","Chegar antes das 18h"],correct:1},
    {id:"t5",dimension:"literal",icon:"kanban",source:"Briefing de projeto",title:"Qual entrega tem prazo mais próximo?",context:"Prioridades da semana: corrigir o problema de login até terça-feira; revisar os textos até quinta; concluir os ajustes visuais até sexta.",options:["Revisar os textos","Corrigir o login","Ajustes visuais","Todas têm o mesmo prazo"],correct:1},
    {id:"t6",dimension:"inferencia",icon:"route",source:"Comunicado de transporte",title:"O que uma pessoa que usa o ponto da Praça Central deve fazer entre 8h e 12h?",context:"Por causa de um evento, as linhas do centro terão desvio das 8h às 12h. O ponto da Praça Central ficará temporariamente desativado. Durante esse período, utilize o ponto da Rua das Flores, a duas quadras.",options:["Esperar na Praça Central","Usar o ponto da Rua das Flores","Evitar ônibus durante todo o dia","Ir direto ao terminal final"],correct:1},
    {id:"t7",dimension:"intencao",icon:"handshake",source:"Mensagem de trabalho",title:"O que a pessoa está comunicando sobre a prioridade dessa conversa?",context:"“Quando der, me chama? Não é urgente agora, mas queria alinhar isso com você antes de enviar ao cliente amanhã.”",options:["Precisa ser resolvido imediatamente","Pode ser ignorado até depois do envio","Não é urgente neste instante, mas precisa ser alinhado antes de amanhã","O cliente já recebeu o material"],correct:2},
    {id:"t8",dimension:"instrucao",icon:"receipt",source:"Instrução de inscrição",title:"Qual envio segue todas as regras?",context:"Envie o currículo em PDF até 23h59. Nomeie o arquivo como Nome_Sobrenome_Curso. Não serão aceitos links para arquivos externos.",options:["ana.pdf enviado às 20h","Ana_Silva_Design.docx enviado às 18h","Link do Drive para Ana_Silva_Design.pdf","Ana_Silva_Design.pdf enviado às 22h30"],correct:3}
  ];

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
  function icon(name){return `<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`}
  function toast(msg){const e=$("#toast");if(!e)return;e.textContent=msg;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)}
  function openView(view){$$('.view').forEach(v=>v.classList.toggle('active',v.id===view));$$('[data-view-button]').forEach(b=>b.setAttribute('aria-current',b.dataset.viewButton===view?'page':'false'));scrollTo({top:0,behavior:'smooth'})}
  function ensureState(){if(!Number.isInteger(state.readingIndex))state.readingIndex=0;if(!state.readingAnswers||typeof state.readingAnswers!=="object")state.readingAnswers={};if(state.readingResult===undefined)state.readingResult=null}
  function injectViews(){
    if($('#reading'))return;
    const main=$('#main');if(!main)return;
    main.insertAdjacentHTML('beforeend',`
      <section id="reading" class="view" aria-labelledby="reading-title"><div class="reflection-layout"><aside class="panel quiz-side"><span class="eyebrow">dia 5</span><h2 id="reading-title">Você entende o jogo?</h2><p id="readingProgressText" class="progress-text" aria-live="polite"></p><div class="meter" aria-hidden="true"><span id="readingMeter"></span></div><p class="microcopy">Leitura aplicada a situações do cotidiano. O resultado descreve esta bateria curta e não equivale a uma avaliação padronizada de leitura.</p></aside><article class="panel pad question-panel" id="readingHost" aria-live="polite"></article></div></section>
      <section id="reading-result" class="view" aria-labelledby="reading-result-title"><article class="panel pad reflection-result"><span class="eyebrow">dia 5 concluído</span><h2 id="reading-result-title">Como você leu os sinais desta rodada</h2><div class="score-layout"><div class="score-disc reading-score"><strong id="readingScore">0</strong><span>/100</span></div><div><small>Desempenho observado</small><h3 id="readingLevel"></h3><p><strong>Dimensão com melhor desempenho:</strong> <span id="readingStrongest"></span></p><p>O objetivo é observar como você localiza informações, infere sentidos, entende intenções e aplica instruções em situações concretas.</p></div></div><div class="bars reflection-bars" id="readingBars"></div><div class="notice"><strong>O que entra no mapa final</strong><p>Esses resultados entram como sinais complementares de leitura aplicada. Eles não classificam sua capacidade geral nem substituem uma avaliação educacional ou cognitiva formal.</p></div><div class="actions"><button class="btn" type="button" id="readingToJourney">Voltar para a jornada</button></div></article></section>`);
    $('#readingToJourney').onclick=()=>{J.renderJourney();openView('journey')};
  }
  function start(){if(!state.completedDays.includes(4)){toast('Conclua o Dia 4 primeiro.');return}ensureState();state.readingIndex=0;save();openView('reading');render()}
  function render(){
    const host=$('#readingHost');if(!host)return;
    const i=state.readingIndex,q=QUESTIONS[i],selected=state.readingAnswers[q.id];
    $('#readingProgressText').textContent=`Situação ${i+1} de ${QUESTIONS.length}`;$('#readingMeter').style.width=`${Math.round((i+1)/QUESTIONS.length*100)}%`;
    host.innerHTML=`<div class="reading-source-head"><div class="wheel-question-icon reading-icon">${icon(q.icon)}</div><div><span class="eyebrow">${DIMENSIONS[q.dimension]}</span><small>${q.source}</small></div></div><h2 class="question-title">${q.title}</h2><blockquote class="reading-source">${q.context}</blockquote><div class="reflection-options reading-options">${q.options.map((o,n)=>`<button type="button" class="reflection-option ${selected===n?'selected':''}" data-reading-value="${n}" aria-pressed="${selected===n}"><strong>${o}</strong></button>`).join('')}</div><div class="question-actions"><button class="btn secondary" id="readingBack" type="button">${i===0?'Voltar para jornada':'Situação anterior'}</button><button class="btn" id="readingNext" type="button">${i===QUESTIONS.length-1?'Ver meu desempenho':'Próxima situação'}</button></div>`;
    $$('[data-reading-value]').forEach(b=>b.onclick=()=>{state.readingAnswers[q.id]=Number(b.dataset.readingValue);save();render()});
    $('#readingBack').onclick=()=>{if(i===0)return openView('journey');state.readingIndex--;save();render()};
    $('#readingNext').onclick=()=>{if(state.readingAnswers[q.id]===undefined){toast('Escolha uma alternativa para continuar.');return}if(i<QUESTIONS.length-1){state.readingIndex++;save();render();scrollTo({top:0,behavior:'smooth'})}else calculate()};
  }
  function calculate(){
    const answered=QUESTIONS.filter(q=>state.readingAnswers[q.id]!==undefined);if(answered.length!==QUESTIONS.length){toast('Ainda faltam situações.');return}
    const dimensions=Object.keys(DIMENSIONS).reduce((o,k)=>(o[k]={correct:0,total:0},o),{});let correct=0;
    QUESTIONS.forEach(q=>{dimensions[q.dimension].total++;if(state.readingAnswers[q.id]===q.correct){correct++;dimensions[q.dimension].correct++}});
    const score=Math.round(correct/QUESTIONS.length*100);const level=score>=88?"Leitura muito consistente nesta rodada":score>=63?"Boa leitura aplicada":score>=38?"Alguns sinais foram bem captados":"Vale desacelerar e conferir os detalhes";const strongest=Object.entries(dimensions).sort((a,b)=>(b[1].correct/b[1].total)-(a[1].correct/a[1].total))[0][0];
    state.readingResult={score,correct,total:QUESTIONS.length,dimensions,strongest,level};J.completeDay(DAY,XP);save();renderResult();openView('reading-result');
  }
  function renderResult(){const r=state.readingResult;if(!r||!$('#readingScore'))return;$('#readingScore').textContent=r.score;$('#readingLevel').textContent=r.level;$('#readingStrongest').textContent=DIMENSIONS[r.strongest];$('#readingBars').innerHTML=Object.entries(DIMENSIONS).map(([key,label])=>{const d=r.dimensions[key],pc=Math.round(d.correct/d.total*100);return `<div class="bar-row"><span>${label}</span><div class="bar-track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><div class="bar-fill reading-fill" style="width:${pc}%"></div></div><span>${d.correct}/${d.total}</span></div>`}).join('')}
  function patchJourneyCard(){const button=$('[data-journey-day="5"]');if(!button)return;const card=button.closest('.journey-card'),status=card?.querySelector('.journey-status');const done=state.completedDays.includes(5),available=state.completedDays.includes(4)&&!done;if(done){card?.classList.remove('active','soon','locked');card?.classList.add('done');if(status)status.textContent="Concluído";button.disabled=false;button.textContent="Rever etapa"}else if(available){card?.classList.remove('done','soon','locked');card?.classList.add('active');if(status)status.textContent="Disponível agora";button.disabled=false;button.textContent="Começar"}}
  function resetOwnState(){state.readingIndex=0;state.readingAnswers={};state.readingResult=null;save()}

  ensureState();injectViews();patchJourneyCard();renderResult();
  document.addEventListener('click',e=>{const button=e.target.closest?.('[data-journey-day="5"]');if(!button)return;e.preventDefault();e.stopImmediatePropagation();if(state.completedDays.includes(5)||state.completedDays.includes(4))start();else toast('Conclua o Dia 4 primeiro.')},true);
  const grid=$('#journeyGrid');if(grid)new MutationObserver(()=>patchJourneyCard()).observe(grid,{childList:true,subtree:true});
  $('#resetJourneyBtn')?.addEventListener('click',()=>setTimeout(()=>{resetOwnState();patchJourneyCard()},0));

  window.CARAMELO_DAY5={start,render,calculate,questions:QUESTIONS,dimensions:DIMENSIONS};

  if(!document.querySelector('link[href="assets/day6.css"]')){const l=document.createElement('link');l.rel='stylesheet';l.href='assets/day6.css';document.head.appendChild(l)}
  if(!document.querySelector('script[src="assets/day6.js"]')){const s=document.createElement('script');s.src='assets/day6.js';s.defer=false;document.body.appendChild(s)}
})();
