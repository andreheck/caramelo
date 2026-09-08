(()=>{
  const D=window.CARAMELO_DATA;
  const APP_KEY="caramelo:v3:state";
  const JOURNEY_KEY="caramelo:v4:journey";
  const DAY_XP={1:100,2:80,3:60,4:90,5:70,6:120,7:200};
  const LEVELS=[
    [0,"Zé Orelha"],[80,"Juvenil"],[160,"Pequeno Aprendiz"],[260,"Jovem Aprendiz"],
    [380,"Super Aprendiz"],[520,"Aprendiz Lendário"],[700,"Estagiário"],[1000,"Pessoa do Corre"],
    [1500,"Veterano"],[2200,"Dono do Pedaço"],[3000,"Pronto pra Ação"]
  ];
  const DAYS=[
    {day:1,title:"Bora se entender",subtitle:"Seu mapa vocacional inicial",icon:"compass",implemented:true},
    {day:2,title:"Como você tá por dentro",subtitle:"Termômetro do Momento",icon:"heart-hand",implemented:true},
    {day:3,title:"Sua vida tá no eixo?",subtitle:"Roda da Vida",icon:"balance",implemented:true},
    {day:4,title:"Como sua cabeça resolve?",subtitle:"Raciocínio e solução de problemas",icon:"brain",implemented:true},
    {day:5,title:"Você entende o jogo?",subtitle:"Leitura e interpretação de contexto",icon:"books",implemented:false},
    {day:6,title:"Você tá pronto pro corre?",subtitle:"Entrevista e prontidão profissional",icon:"messages",implemented:false},
    {day:7,title:"Teu mapa do corre",subtitle:"Síntese e plano de ação",icon:"map",implemented:false}
  ];
  const EMOTION_SCALE=["Não rolou","Teve um pouco disso daí","Mais do que eu gostaria","Bateu forte"];
  const EMOTION_QUESTIONS=[
    "Minha cabeça fica ligada mesmo quando eu queria desligar.",
    "Tenho sentido que as coisas saem do controle com facilidade.",
    "Meu corpo fica tenso ou apertado sem eu perceber.",
    "Quando algo dá errado, eu travo ou fico muito irritado.",
    "Meu dia parece uma corrida que nunca termina.",
    "Tem sido difícil relaxar de verdade.",
    "Sinto que estou chegando no meu limite.",
    "Sinto tensão ou alerta mesmo sem saber exatamente por quê.",
    "Penso tanto nas coisas que minha cabeça fica cansada.",
    "Fico esperando que alguma coisa dê errado.",
    "Meu corpo acelera quando estou preocupado.",
    "Situações novas têm me deixado mais travado do que eu gostaria.",
    "Tenho dificuldade de me desligar das preocupações.",
    "Alguns pensamentos parecem mandar mais em mim do que eu queria.",
    "Tenho acordado sem energia ou sem vontade.",
    "Coisas que eu curtia perderam um pouco a graça.",
    "Minha motivação anda baixa.",
    "Tenho dificuldade de reconhecer coisas boas em mim.",
    "Sinto que estou parado ou sem ritmo.",
    "Tenho me sentido perdido sobre para onde estou indo.",
    "Pensar no futuro tem me desanimado."
  ];
  const WHEEL_AREAS=[
    ["Energia","Seu corpo e sua disposição estão sustentando sua rotina?","zap"],
    ["Foco","Você consegue manter atenção no que precisa fazer?","search"],
    ["Estudo","Sua relação com estudo e aprendizagem está funcionando?","books"],
    ["Grana","Dinheiro está ocupando espaço demais na sua cabeça?","receipt"],
    ["Apoio","Você sente que tem pessoas com quem pode contar?","handshake"],
    ["Autoestima","Como anda a confiança em você e no que consegue construir?","lotus"],
    ["Direção","Você sente que existe algum próximo passo possível?","compass"]
  ];
  const WHEEL_SCALE=[
    [0,"Tá suave","Isso hoje não está pesando"],
    [1,"Dá pra melhorar","Existe um incômodo leve"],
    [2,"Tá puxado","Está cobrando energia"],
    [3,"Tá bem ruim","Está pesando de verdade"]
  ];
  const REASONING_DIMENSIONS={
    padroes:"Padrões",
    atencao:"Atenção",
    priorizacao:"Priorização",
    aplicacao:"Aplicação prática"
  };
  const REASONING_QUESTIONS=[
    {id:"r1",dimension:"padroes",icon:"puzzle",title:"Qual número continua a sequência?",context:"3 · 6 · 12 · 24 · ?",options:["30","36","48","54"],correct:2},
    {id:"r2",dimension:"atencao",icon:"search",title:"Qual código é exatamente igual ao original?",context:"Original: BRA7-29K",options:["BRA7-29K","BRA7-92K","BR47-29K","BRA7-29X"],correct:0},
    {id:"r3",dimension:"priorizacao",icon:"kanban",title:"Você chegou e encontrou quatro coisas ao mesmo tempo. O que vem primeiro?",context:"Um cliente está bloqueado sem acesso ao sistema; uma apresentação é amanhã; chegaram três mensagens internas; e uma planilha precisa ser organizada até sexta.",options:["Organizar a planilha","Responder as mensagens internas","Restaurar o acesso do cliente","Começar a apresentação de amanhã"],correct:2},
    {id:"r4",dimension:"aplicacao",icon:"ruler",title:"Quantas vagas ainda podem ser confirmadas com segurança?",context:"Uma oficina tem 60 lugares. Já existem 45 presenças confirmadas.",options:["10","15","20","25"],correct:1},
    {id:"r5",dimension:"atencao",icon:"clipboard",title:"Quem deve entrar na lista final?",context:"Regra: inclua apenas pessoas que confirmaram presença e não solicitaram cancelamento.",options:["Confirmou e depois cancelou","Ainda não respondeu","Confirmou e não cancelou","Demonstrou interesse, mas não confirmou"],correct:2},
    {id:"r6",dimension:"padroes",icon:"brain",title:"Qual letra continua o padrão?",context:"A · C · F · J · O · ?  (os saltos aumentam de um em um)",options:["T","U","V","W"],correct:1},
    {id:"r7",dimension:"priorizacao",icon:"search",title:"Dois relatórios dão números diferentes. Qual é o melhor primeiro passo?",context:"Você precisa decidir hoje, mas ainda não sabe qual relatório está atualizado.",options:["Escolher o número maior","Fazer uma média dos dois","Verificar fonte, data e regra de cada relatório","Usar o relatório que chegou por último sem conferir"],correct:2},
    {id:"r8",dimension:"aplicacao",icon:"route",title:"Qual tarefa precisa acontecer primeiro?",context:"A tarefa A só pode começar depois de B. A tarefa B só pode começar depois de C.",options:["A","B","C","A e B juntas"],correct:2}
  ];
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const fresh=()=>({
    completedDays:[],xp:0,
    emotionIndex:0,emotionAnswers:[],emotionResult:null,
    wheelIndex:0,wheelAnswers:[],wheelResult:null,
    reasoningIndex:0,reasoningAnswers:{},reasoningResult:null
  });
  function load(){
    try{
      const x=JSON.parse(localStorage.getItem(JOURNEY_KEY)||"null");
      return x&&typeof x==="object"?{...fresh(),...x,completedDays:Array.isArray(x.completedDays)?x.completedDays:[],reasoningAnswers:x.reasoningAnswers||{}}:fresh();
    }catch{return fresh()}
  }
  const state=load();
  function save(){localStorage.setItem(JOURNEY_KEY,JSON.stringify(state))}
  function icon(name){return `<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`}
  function toast(msg){const e=$("#toast");if(!e)return;e.textContent=msg;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)}
  function appState(){try{return JSON.parse(localStorage.getItem(APP_KEY)||"null")||{}}catch{return {}}}
  function quizComplete(){const a=appState().answers||{};return D.questions.every(q=>q.type==='ranking'?Array.isArray(a[q.id])&&a[q.id].length===q.items.length:a[q.id]!==undefined&&a[q.id]!==null)}
  function completeDay(day,xp=DAY_XP[day]||0){if(!state.completedDays.includes(day)){state.completedDays.push(day);state.completedDays.sort((a,b)=>a-b);state.xp+=xp;save();renderJourney()}return state.xp}
  function ensureDay1(){if(quizComplete())completeDay(1,DAY_XP[1])}
  function levelForXp(xp){let current=LEVELS[0];for(const l of LEVELS)if(xp>=l[0])current=l;return current}
  function nextLevel(xp){return LEVELS.find(l=>l[0]>xp)||null}
  function openView(view){if(window.CARAMELO_APP?.go)return window.CARAMELO_APP.go(view);$$('.view').forEach(v=>v.classList.toggle('active',v.id===view));scrollTo({top:0,behavior:'smooth'})}
  function firstIncomplete(){for(let i=1;i<=7;i++)if(!state.completedDays.includes(i))return i;return 7}
  function renderJourney(){
    ensureDay1();
    const host=$("#journeyGrid");if(!host)return;
    const active=firstIncomplete();
    const lvl=levelForXp(state.xp),next=nextLevel(state.xp);
    $("#journeyXp").textContent=`${state.xp} XP`;
    $("#journeyLevel").textContent=lvl[1];
    $("#journeyProgress").style.width=`${Math.round(state.completedDays.length/7*100)}%`;
    $("#journeyProgressText").textContent=`${state.completedDays.length} de 7 dias concluídos`;
    $("#journeyNextLevel").textContent=next?`${next[0]-state.xp} XP para ${next[1]}`:"Nível máximo alcançado";
    host.innerHTML=DAYS.map(d=>{
      const done=state.completedDays.includes(d.day),isActive=d.day===active,available=isActive&&d.implemented;
      const status=done?"Concluído":available?"Disponível agora":isActive&&!d.implemented?"Em breve":"Bloqueado";
      const cls=done?"done":available?"active":isActive?"soon":"locked";
      const disabled=!done&&!available;
      const cta=done?(d.day===1?"Rever mapa":"Rever etapa"):available?"Começar":"Aguarde";
      return `<article class="journey-card ${cls}">
        <div class="journey-day-icon">${icon(d.icon)}</div>
        <div class="journey-card-copy"><small>Dia ${d.day} · +${DAY_XP[d.day]} XP</small><h3>${d.title}</h3><p>${d.subtitle}</p><span class="journey-status">${status}</span></div>
        <button class="btn ${done?'secondary':''}" type="button" data-journey-day="${d.day}" ${disabled?'disabled':''}>${cta}</button>
      </article>`
    }).join('');
    $$('[data-journey-day]').forEach(b=>b.onclick=()=>openDay(Number(b.dataset.journeyDay)));
  }
  function openDay(day){
    if(day===1){openView(quizComplete()?'results':'onboarding');return}
    if(day===2){startEmotion();return}
    if(day===3){if(!state.completedDays.includes(2)){toast('Conclua o Dia 2 primeiro.');return}startWheel();return}
    if(day===4){if(!state.completedDays.includes(3)){toast('Conclua o Dia 3 primeiro.');return}startReasoning();return}
    toast('Esse módulo já está especificado e entra no próximo ciclo de implementação.');
  }
  function startEmotion(){state.emotionIndex=0;openView('emotion');renderEmotion()}
  function emotionOptions(index){return index===14?["Com energia","De boa","Cansado","Sem vontade"]:EMOTION_SCALE}
  function renderEmotion(){
    const host=$("#emotionHost");if(!host)return;
    const i=state.emotionIndex,q=EMOTION_QUESTIONS[i],selected=state.emotionAnswers[i],opts=emotionOptions(i);
    $("#emotionProgressText").textContent=`Pergunta ${i+1} de ${EMOTION_QUESTIONS.length}`;
    $("#emotionMeter").style.width=`${Math.round((i+1)/EMOTION_QUESTIONS.length*100)}%`;
    host.innerHTML=`<span class="eyebrow">termômetro do momento</span><h2 class="question-title">${q}</h2><p class="question-helper">Pense nos últimos dias e escolha a alternativa que mais se aproxima do seu momento.</p><div class="reflection-options">${opts.map((o,n)=>`<button type="button" class="reflection-option ${selected===n?'selected':''}" data-emotion-value="${n}" aria-pressed="${selected===n}"><strong>${o}</strong><span>${n===0?'Pouco ou nada':n===1?'Um pouco':n===2?'Com frequência':'Com bastante intensidade'}</span></button>`).join('')}</div><div class="question-actions"><button class="btn secondary" id="emotionBack" type="button">${i===0?'Voltar para jornada':'Pergunta anterior'}</button><button class="btn" id="emotionNext" type="button">${i===EMOTION_QUESTIONS.length-1?'Ver leitura':'Próxima pergunta'}</button></div>`;
    $$('[data-emotion-value]').forEach(b=>b.onclick=()=>{state.emotionAnswers[i]=Number(b.dataset.emotionValue);save();renderEmotion()});
    $('#emotionBack').onclick=()=>{if(i===0)return openView('journey');state.emotionIndex--;save();renderEmotion()};
    $('#emotionNext').onclick=()=>{if(state.emotionAnswers[i]===undefined){toast('Escolha uma alternativa para continuar.');return}if(i<EMOTION_QUESTIONS.length-1){state.emotionIndex++;save();renderEmotion();scrollTo({top:0,behavior:'smooth'})}else calculateEmotion()};
  }
  function calculateEmotion(){
    const a=state.emotionAnswers;if(a.length<21||a.some(v=>v===undefined)){toast('Ainda faltam respostas.');return}
    const tension=a.slice(0,7).reduce((x,y)=>x+y,0),worry=a.slice(7,14).reduce((x,y)=>x+y,0),energy=a.slice(14,21).reduce((x,y)=>x+y,0);
    const total=tension+worry+energy,score=Math.max(0,Math.min(100,Math.round((1-total/63)*100)));
    const cats=[{name:"Tensão",value:tension},{name:"Preocupação",value:worry},{name:"Energia e ânimo",value:energy}].sort((x,y)=>y.value-x.value);
    const level=score>75?"Momento mais estável":score>50?"Atenção leve":score>30?"Carga alta":"Muita sobrecarga";
    state.emotionResult={score,tension,worry,energy,dominant:cats[0].name,level};completeDay(2,DAY_XP[2]);save();renderEmotionResult();openView('emotion-result')
  }
  function renderEmotionResult(){
    const r=state.emotionResult;if(!r)return;
    $('#emotionScore').textContent=r.score;
    $('#emotionLevel').textContent=r.level;
    $('#emotionDominant').textContent=r.dominant;
    const vals=[["Tensão",r.tension],["Preocupação",r.worry],["Energia e ânimo",r.energy]];
    $('#emotionBars').innerHTML=vals.map(([n,v])=>`<div class="bar-row"><span>${n}</span><div class="bar-track" role="progressbar" aria-label="${n}" aria-valuemin="0" aria-valuemax="21" aria-valuenow="${v}"><div class="bar-fill reflection-fill" style="width:${Math.round(v/21*100)}%"></div></div><span>${v}/21</span></div>`).join('')
  }
  function startWheel(){state.wheelIndex=0;openView('life-wheel');renderWheel()}
  function renderWheel(){
    const host=$('#wheelHost');if(!host)return;
    const i=state.wheelIndex,[name,question,ic]=WHEEL_AREAS[i],selected=state.wheelAnswers[i];
    $('#wheelProgressText').textContent=`Área ${i+1} de ${WHEEL_AREAS.length}`;$('#wheelMeter').style.width=`${Math.round((i+1)/WHEEL_AREAS.length*100)}%`;
    host.innerHTML=`<div class="wheel-question-icon">${icon(ic)}</div><span class="eyebrow">roda da vida · ${name}</span><h2 class="question-title">${question}</h2><p class="question-helper">Não existe resposta certa. A ideia é identificar o que hoje está consumindo mais espaço e energia.</p><div class="reflection-options">${WHEEL_SCALE.map(([v,label,desc])=>`<button type="button" class="reflection-option ${selected===v?'selected':''}" data-wheel-value="${v}" aria-pressed="${selected===v}"><strong>${label}</strong><span>${desc}</span></button>`).join('')}</div><div class="question-actions"><button class="btn secondary" id="wheelBack" type="button">${i===0?'Voltar para jornada':'Área anterior'}</button><button class="btn" id="wheelNext" type="button">${i===WHEEL_AREAS.length-1?'Ver minha roda':'Próxima área'}</button></div>`;
    $$('[data-wheel-value]').forEach(b=>b.onclick=()=>{state.wheelAnswers[i]=Number(b.dataset.wheelValue);save();renderWheel()});
    $('#wheelBack').onclick=()=>{if(i===0)return openView('journey');state.wheelIndex--;save();renderWheel()};
    $('#wheelNext').onclick=()=>{if(state.wheelAnswers[i]===undefined){toast('Escolha uma alternativa para continuar.');return}if(i<WHEEL_AREAS.length-1){state.wheelIndex++;save();renderWheel();scrollTo({top:0,behavior:'smooth'})}else calculateWheel()};
  }
  function calculateWheel(){
    const a=state.wheelAnswers;if(a.length<7||a.some(v=>v===undefined)){toast('Ainda faltam respostas.');return}
    const sum=a.reduce((x,y)=>x+y,0),score=Math.round((1-sum/21)*100),worst=Math.max(...a),idx=a.indexOf(worst);
    state.wheelResult={score,worst:WHEEL_AREAS[idx][0],answers:[...a]};completeDay(3,DAY_XP[3]);save();renderWheelResult();openView('life-wheel-result')
  }
  function renderWheelResult(){
    const r=state.wheelResult;if(!r)return;
    $('#wheelScore').textContent=r.score;$('#wheelWorst').textContent=r.worst;
    $('#wheelBars').innerHTML=WHEEL_AREAS.map(([name],i)=>{const v=r.answers[i];return `<div class="bar-row"><span>${name}</span><div class="bar-track" role="progressbar" aria-label="Peso em ${name}" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${v}"><div class="bar-fill wheel-fill" style="width:${Math.round(v/3*100)}%"></div></div><span>${v}/3</span></div>`}).join('')
  }
  function startReasoning(){state.reasoningIndex=0;openView('reasoning');renderReasoning()}
  function renderReasoning(){
    const host=$('#reasoningHost');if(!host)return;
    const i=state.reasoningIndex,q=REASONING_QUESTIONS[i],selected=state.reasoningAnswers[q.id];
    $('#reasoningProgressText').textContent=`Desafio ${i+1} de ${REASONING_QUESTIONS.length}`;
    $('#reasoningMeter').style.width=`${Math.round((i+1)/REASONING_QUESTIONS.length*100)}%`;
    host.innerHTML=`<div class="wheel-question-icon reasoning-icon">${icon(q.icon)}</div><span class="eyebrow">${REASONING_DIMENSIONS[q.dimension]}</span><h2 class="question-title">${q.title}</h2><div class="logic-context">${q.context}</div><div class="reflection-options logic-options">${q.options.map((o,n)=>`<button type="button" class="reflection-option ${selected===n?'selected':''}" data-reasoning-value="${n}" aria-pressed="${selected===n}"><strong>${o}</strong></button>`).join('')}</div><div class="question-actions"><button class="btn secondary" id="reasoningBack" type="button">${i===0?'Voltar para jornada':'Desafio anterior'}</button><button class="btn" id="reasoningNext" type="button">${i===REASONING_QUESTIONS.length-1?'Ver meu desempenho':'Próximo desafio'}</button></div>`;
    $$('[data-reasoning-value]').forEach(b=>b.onclick=()=>{state.reasoningAnswers[q.id]=Number(b.dataset.reasoningValue);save();renderReasoning()});
    $('#reasoningBack').onclick=()=>{if(i===0)return openView('journey');state.reasoningIndex--;save();renderReasoning()};
    $('#reasoningNext').onclick=()=>{if(state.reasoningAnswers[q.id]===undefined){toast('Escolha uma alternativa para continuar.');return}if(i<REASONING_QUESTIONS.length-1){state.reasoningIndex++;save();renderReasoning();scrollTo({top:0,behavior:'smooth'})}else calculateReasoning()};
  }
  function calculateReasoning(){
    const answered=REASONING_QUESTIONS.filter(q=>state.reasoningAnswers[q.id]!==undefined);
    if(answered.length!==REASONING_QUESTIONS.length){toast('Ainda faltam desafios.');return}
    const dimensions=Object.keys(REASONING_DIMENSIONS).reduce((o,k)=>(o[k]={correct:0,total:0},o),{});
    let correct=0;
    REASONING_QUESTIONS.forEach(q=>{dimensions[q.dimension].total++;if(state.reasoningAnswers[q.id]===q.correct){correct++;dimensions[q.dimension].correct++}});
    const score=Math.round(correct/REASONING_QUESTIONS.length*100);
    const level=score>=88?"Boa consistência nesta rodada":score>=63?"Base funcional bem presente":score>=38?"Alguns padrões apareceram":"Vale repetir com calma";
    const strongest=Object.entries(dimensions).sort((a,b)=>(b[1].correct/b[1].total)-(a[1].correct/a[1].total))[0][0];
    state.reasoningResult={score,correct,total:REASONING_QUESTIONS.length,dimensions,strongest,level};
    completeDay(4,DAY_XP[4]);save();renderReasoningResult();openView('reasoning-result');
  }
  function renderReasoningResult(){
    const r=state.reasoningResult;if(!r)return;
    $('#reasoningScore').textContent=r.score;
    $('#reasoningLevel').textContent=r.level;
    $('#reasoningStrongest').textContent=REASONING_DIMENSIONS[r.strongest];
    $('#reasoningBars').innerHTML=Object.entries(REASONING_DIMENSIONS).map(([key,label])=>{const d=r.dimensions[key],pc=Math.round(d.correct/d.total*100);return `<div class="bar-row"><span>${label}</span><div class="bar-track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><div class="bar-fill reasoning-fill" style="width:${pc}%"></div></div><span>${d.correct}/${d.total}</span></div>`}).join('');
  }
  function resetJourney(){Object.assign(state,fresh());save();renderJourney();toast('Progresso complementar da jornada reiniciado.')}
  window.CARAMELO_JOURNEY={completeDay,renderJourney,resetJourney,state};
  $$('[data-go="journey"]').forEach(b=>b.addEventListener('click',()=>setTimeout(renderJourney,0)));
  $('#emotionToJourney')?.addEventListener('click',()=>{renderJourney();openView('journey')});
  $('#wheelToJourney')?.addEventListener('click',()=>{renderJourney();openView('journey')});
  $('#reasoningToJourney')?.addEventListener('click',()=>{renderJourney();openView('journey')});
  $('#resetJourneyBtn')?.addEventListener('click',resetJourney);
  ensureDay1();renderJourney();if(state.emotionResult)renderEmotionResult();if(state.wheelResult)renderWheelResult();if(state.reasoningResult)renderReasoningResult();
})();
