(()=>{
  const J=window.CARAMELO_JOURNEY;
  const D=window.CARAMELO_DATA;
  if(!J||!D)return;

  const state=J.state;
  const APP_KEY="caramelo:v3:state";
  const STORAGE_KEY="caramelo:v4:journey";
  const DAY=7;
  const XP=200;
  const AXIS_LABELS=D.axisLabels||{};
  const ARCHETYPES={
    fogo:{title:"Viajantes · Fogo",subtitle:"movimento, influência, ação e exploração",icon:"zap"},
    terra:{title:"Governantes · Terra",subtitle:"estrutura, execução, estabilidade e gestão",icon:"bricks"},
    ar:{title:"Deuses · Ar",subtitle:"ideias, investigação, sistemas e possibilidades",icon:"wind"},
    agua:{title:"Humanos · Água",subtitle:"relações, cuidado, desenvolvimento e significado",icon:"heart-hand"}
  };
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
  function icon(name){return `<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`}
  function toast(msg){const e=$("#toast");if(!e)return;e.textContent=msg;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)}
  function openView(view){$$('.view').forEach(v=>v.classList.toggle('active',v.id===view));scrollTo({top:0,behavior:'smooth'})}
  function appState(){try{return JSON.parse(localStorage.getItem(APP_KEY)||"null")||{}}catch{return {}}}
  function emptyScores(){return Object.keys(AXIS_LABELS).reduce((o,k)=>(o[k]=0,o),{})}
  function add(target,scores,multiplier=1){Object.entries(scores||{}).forEach(([k,v])=>target[k]=(target[k]||0)+v*multiplier)}
  function vocationalScores(){
    const app=appState(),answers=app.answers||{},scores=emptyScores();
    D.questions.forEach(q=>{
      const a=answers[q.id];if(a===undefined||a===null)return;
      if(q.type==='ranking')(a||[]).forEach((idx,p)=>add(scores,q.items[idx]?.scores,D.rankWeights[p]||0));
      else add(scores,q.options[a]?.scores);
    });
    add(scores,D.momentBoosts?.[app.moment]||{});
    return scores;
  }
  function rankedProfiles(scores){
    return D.profiles.map(p=>({...p,score:Object.entries(p.weights||{}).reduce((n,[k,w])=>n+(scores[k]||0)*w,0)})).sort((a,b)=>b.score-a.score);
  }
  function archetypeScores(s){
    return {
      fogo:(s.empreendedor||0)*1.2+(s.reconhecimento||0)*.8+(s.criativo||0)*.5+(s.autonomia||0)*.35,
      terra:(s.organizador||0)*1.2+(s.estabilidade||0)*1.05+(s.pratico||0)*.55,
      ar:(s.investigativo||0)*1.25+(s.criativo||0)*.65+(s.autonomia||0)*.5,
      agua:(s.social||0)*1.1+(s.proposito||0)*1.25+(s.estabilidade||0)*.15
    };
  }
  function dominantArchetypes(s){return Object.entries(archetypeScores(s)).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([key,value])=>({key,value,...ARCHETYPES[key]}))}
  function topAxes(s,count=5){
    const max=Math.max(...Object.values(s),1);
    return Object.entries(s).sort((a,b)=>b[1]-a[1]).slice(0,count).map(([key,value])=>({key,label:AXIS_LABELS[key]||key,value,pct:Math.max(0,Math.round(value/max*100))}));
  }
  function dimensionLabel(module,key){
    const maps={
      reasoning:{padroes:"Padrões",atencao:"Atenção",priorizacao:"Priorização",aplicacao:"Aplicação prática"},
      reading:{literal:"Informação explícita",inferencia:"Inferência",intencao:"Intenção comunicativa",instrucao:"Aplicação de instruções"},
      readiness:{preparacao:"Preparação",comunicacao:"Comunicação",responsabilidade:"Responsabilidade",adaptabilidade:"Adaptabilidade",autoconsciencia:"Autoconsciência",profissionalismo:"Postura profissional",resolucao:"Resolução de problemas"}
    };
    return maps[module]?.[key]||key||"—";
  }
  function levelForXp(xp){
    const levels=[[0,"Zé Orelha"],[80,"Juvenil"],[160,"Pequeno Aprendiz"],[260,"Jovem Aprendiz"],[380,"Super Aprendiz"],[520,"Aprendiz Lendário"],[700,"Estagiário"],[1000,"Pessoa do Corre"],[1500,"Veterano"],[2200,"Dono do Pedaço"],[3000,"Pronto pra Ação"]];
    let current=levels[0][1];levels.forEach(([min,name])=>{if(xp>=min)current=name});return current;
  }
  function careerHypotheses(primary,secondary,axes){
    const pool=[...new Set([...(primary?.careers||[]),...(secondary?.careers||[])])];
    const selected=pool.slice(0,3);
    const experimentByAxis={
      investigativo:"Escolha um problema real da área e passe 60 minutos pesquisando como profissionais costumam investigá-lo.",
      criativo:"Crie uma pequena peça, protótipo ou solução inspirada nessa área e observe seu nível de energia durante o processo.",
      social:"Converse por 20 minutos com alguém da área e pergunte sobre rotina, relações, dificuldades e impacto humano.",
      empreendedor:"Observe uma meta real dessa profissão e desenhe como você tentaria gerar resultado, influência ou crescimento.",
      organizador:"Mapeie a rotina da área em etapas, responsabilidades, ferramentas e indicadores para ver se a estrutura combina com você.",
      pratico:"Faça uma oficina, tutorial ou atividade de mão na massa ligada à área e registre o que foi fácil, difícil e interessante.",
      autonomia:"Procure um mini projeto que você possa executar sozinho e avalie como reage à liberdade de decidir o caminho.",
      estabilidade:"Pesquise formação, faixa de entrada, progressão e caminhos de especialização antes de avaliar a segurança dessa hipótese.",
      proposito:"Converse com alguém que recebe o impacto desse trabalho e investigue quais problemas humanos ou sociais a profissão realmente resolve.",
      reconhecimento:"Pesquise como resultado, portfólio, senioridade e visibilidade são construídos nessa área ao longo dos primeiros anos."
    };
    return selected.map((career,i)=>({career,experiment:experimentByAxis[axes[i%Math.max(axes.length,1)]?.key]||"Converse com um profissional e faça uma experiência curta antes de transformar curiosidade em decisão."}));
  }
  function plans(primary,axes,careers,readinessPriority,wheelWorst){
    const topAxis=axes[0]?.label||"seu principal eixo";
    const careerNames=careers.map(c=>c.career);
    return {
      d7:[
        `Escolha uma das três hipóteses — ${careerNames[0]||'uma área de interesse'} — e faça o primeiro microexperimento sugerido.`,
        `Anote três situações da sua vida que confirmam ou contradizem o eixo ${topAxis}.`,
        wheelWorst?`Defina uma ação pequena para reduzir o peso atual em ${wheelWorst}; contexto difícil merece cuidado, não decisões definitivas sobre vocação.`:"Reserve um momento curto para revisar o que na sua rotina está ajudando ou drenando sua energia."
      ],
      d30:[
        `Converse com pelo menos duas pessoas que trabalhem em ${careerNames.slice(0,2).join(' ou ')||'áreas que você está investigando'}.`,
        `Compare formação, rotina, mercado, remuneração inicial, ambiente e problemas resolvidos das três hipóteses.`,
        readinessPriority?`Treine especialmente ${readinessPriority.toLowerCase()} em uma simulação de entrevista ou situação de trabalho.`:"Faça ao menos uma simulação de entrevista e peça feedback objetivo."
      ],
      d90:[
        `Conclua uma experiência concreta ligada à hipótese mais promissora: curso curto, projeto, voluntariado, visita técnica ou portfólio.`,
        `Reavalie as três hipóteses usando evidências da experiência, e não apenas impressão ou expectativa.`,
        `Escolha o próximo compromisso realista: aprofundar a hipótese principal, testar uma segunda hipótese ou buscar orientação especializada.`
      ]
    };
  }
  function buildMap(){
    const scores=vocationalScores(),profiles=rankedProfiles(scores),primary=profiles[0],secondary=profiles[1],axes=topAxes(scores),archetypes=dominantArchetypes(scores);
    const emotion=state.emotionResult||null,wheel=state.wheelResult||null,reasoning=state.reasoningResult||null,reading=state.readingResult||null,readiness=state.readinessResult||null;
    const careers=careerHypotheses(primary,secondary,axes);
    const readinessPriority=readiness?dimensionLabel('readiness',readiness.priority):null;
    const actionPlan=plans(primary,axes,careers,readinessPriority,wheel?.worst||null);
    return {
      generatedAt:new Date().toISOString(),primaryProfile:primary?.title||"Mapa em construção",secondaryProfile:secondary?.title||"",profileSummary:primary?.summary||"",motivator:primary?.motivator||"",environment:primary?.environment||"",tension:primary?.tension||"",
      axes,archetypes,careers,actionPlan,
      context:{emotionScore:emotion?.score??null,emotionLevel:emotion?.level||null,wheelScore:wheel?.score??null,wheelWorst:wheel?.worst||null},
      observed:{reasoningScore:reasoning?.score??null,reasoningStrongest:reasoning?dimensionLabel('reasoning',reasoning.strongest):null,readingScore:reading?.score??null,readingStrongest:reading?dimensionLabel('reading',reading.strongest):null},
      readiness:{score:readiness?.score??null,strongest:readiness?dimensionLabel('readiness',readiness.strongest):null,priority:readinessPriority},
      xpBeforeFinal:state.xp
    };
  }
  function injectView(){
    if($('#final-map'))return;
    $('#main')?.insertAdjacentHTML('beforeend',`
      <section id="final-map" class="view" aria-labelledby="final-map-title">
        <article class="final-map-shell">
          <header class="panel pad final-map-hero">
            <div class="final-map-heading"><span class="eyebrow">dia 7 · jornada concluída</span><h2 id="final-map-title">Teu Mapa do Corre</h2><p class="lead">Uma síntese para transformar autoconhecimento em hipóteses e próximos passos.</p><div class="final-archetype" id="finalArchetype"></div></div>
            <div class="final-level-card"><small>Nível da jornada</small><strong id="finalLevel"></strong><span id="finalXp"></span><div class="final-photo" id="finalPhoto"><span>EU</span></div></div>
          </header>

          <div class="final-grid">
            <section class="panel pad final-profile-card"><span class="eyebrow">seu fio condutor</span><h3 id="finalProfile"></h3><p id="finalProfileSummary"></p><div class="final-key-grid" id="finalKeys"></div></section>
            <section class="panel pad"><span class="eyebrow">interesses e prioridades</span><h3>O que apareceu com mais força</h3><div class="bars reflection-bars" id="finalAxes"></div></section>
            <section class="panel pad"><span class="eyebrow">repertórios observados</span><h3>Como você resolveu e interpretou</h3><div class="final-signal-grid" id="finalSignals"></div></section>
            <section class="panel pad"><span class="eyebrow">contexto atual</span><h3>O momento em que essa escolha está acontecendo</h3><div class="final-context-grid" id="finalContext"></div><p class="microcopy">Contexto emocional e equilíbrio de vida ajudam a entender o momento, mas não definem nem restringem sua vocação.</p></section>
          </div>

          <section class="panel pad final-careers"><span class="eyebrow">3 hipóteses para investigar</span><h3>Não escolha no escuro. Teste no mundo real.</h3><div class="career-hypothesis-grid" id="finalCareers"></div></section>

          <section class="panel pad final-plan"><span class="eyebrow">plano de ação</span><h3>Próximos 7, 30 e 90 dias</h3><div class="timeline-grid" id="finalTimeline"></div></section>

          <section class="panel pad final-close"><div><span class="eyebrow">o mapa não fecha a estrada</span><h3>Você não precisa descobrir “a profissão certa”. Precisa construir evidências melhores sobre os caminhos que valem explorar.</h3></div><div class="actions"><button class="btn" id="finalCopyBtn" type="button">Copiar meu mapa</button><button class="btn secondary" id="finalPrintBtn" type="button">Imprimir / salvar PDF</button><button class="btn secondary" id="finalJourneyBtn" type="button">Voltar à jornada</button></div></section>
        </article>
      </section>`);
    $('#finalJourneyBtn').onclick=()=>{J.renderJourney();openView('journey')};
    $('#finalPrintBtn').onclick=()=>window.print();
    $('#finalCopyBtn').onclick=copySummary;
  }
  function setPhoto(){const node=$('#finalPhoto');if(!node)return;node.innerHTML=state.profilePhoto?`<img src="${state.profilePhoto}" alt="Foto escolhida pelo usuário">`:'<span>EU</span>'}
  function render(map=state.finalMap){
    if(!map||!$('#final-map'))return;
    $('#finalProfile').textContent=map.primaryProfile;
    $('#finalProfileSummary').innerHTML=`${map.profileSummary}${map.secondaryProfile?`<br><br><strong>Influência secundária:</strong> ${map.secondaryProfile}.`:''}`;
    $('#finalKeys').innerHTML=`<div><small>Motivador</small><strong>${map.motivator||'—'}</strong></div><div><small>Ambiente favorável</small><strong>${map.environment||'—'}</strong></div><div><small>Ponto de atenção</small><strong>${map.tension||'—'}</strong></div>`;
    $('#finalAxes').innerHTML=map.axes.map(a=>`<div class="bar-row"><span>${a.label}</span><div class="bar-track" role="progressbar" aria-label="${a.label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${a.pct}"><div class="bar-fill final-axis-fill" style="width:${a.pct}%"></div></div><span>${a.pct}%</span></div>`).join('');
    const primaryA=map.archetypes[0],secondaryA=map.archetypes[1];
    $('#finalArchetype').innerHTML=primaryA?`<div class="final-element-icon">${icon(primaryA.icon)}</div><div><small>Camada narrativa</small><strong>${primaryA.title}</strong><span>${primaryA.subtitle}${secondaryA?` · influência de ${secondaryA.title}`:''}</span></div>`:'';
    $('#finalSignals').innerHTML=`
      <div><small>Raciocínio aplicado</small><strong>${map.observed.reasoningScore??'—'}${map.observed.reasoningScore!==null?'/100':''}</strong><span>${map.observed.reasoningStrongest||'Sem resultado registrado'}</span></div>
      <div><small>Leitura de contexto</small><strong>${map.observed.readingScore??'—'}${map.observed.readingScore!==null?'/100':''}</strong><span>${map.observed.readingStrongest||'Sem resultado registrado'}</span></div>
      <div><small>Prontidão profissional</small><strong>${map.readiness.score??'—'}${map.readiness.score!==null?'/100':''}</strong><span>${map.readiness.strongest||'Sem resultado registrado'}</span></div>
      <div><small>Próximo treino</small><strong>${map.readiness.priority||'Continuar experimentando'}</strong><span>Use como alvo de desenvolvimento, não como rótulo.</span></div>`;
    $('#finalContext').innerHTML=`
      <div><small>Termômetro do Momento</small><strong>${map.context.emotionScore??'—'}${map.context.emotionScore!==null?'/100':''}</strong><span>${map.context.emotionLevel||'Sem leitura registrada'}</span></div>
      <div><small>Roda da Vida</small><strong>${map.context.wheelScore??'—'}${map.context.wheelScore!==null?'/100':''}</strong><span>${map.context.wheelWorst?`Maior peso atual: ${map.context.wheelWorst}`:'Sem leitura registrada'}</span></div>`;
    $('#finalCareers').innerHTML=map.careers.map((c,i)=>`<article class="career-hypothesis"><span>Hipótese ${i+1}</span><h4>${c.career}</h4><p>${c.experiment}</p></article>`).join('');
    const labels={d7:"Próximos 7 dias",d30:"Próximos 30 dias",d90:"Próximos 90 dias"};
    $('#finalTimeline').innerHTML=Object.entries(map.actionPlan).map(([key,items])=>`<article><span>${labels[key]}</span><ol>${items.map(x=>`<li>${x}</li>`).join('')}</ol></article>`).join('');
    $('#finalXp').textContent=`${state.xp} XP`;
    $('#finalLevel').textContent=levelForXp(state.xp);
    setPhoto();
  }
  function finish(){
    if(!state.completedDays.includes(6)){toast('Conclua o Dia 6 primeiro.');return}
    const map=buildMap();state.finalMap=map;J.completeDay(DAY,XP);save();render(map);openView('final-map');
  }
  function start(){
    if(!state.completedDays.includes(6)){toast('Conclua o Dia 6 primeiro.');return}
    if(state.finalMap&&state.completedDays.includes(7)){render(state.finalMap);openView('final-map');return}
    finish();
  }
  function copySummary(){
    const m=state.finalMap;if(!m)return;
    const text=[
      'TEU MAPA DO CORRE — CARAMELO',
      `Perfil principal: ${m.primaryProfile}`,
      m.secondaryProfile?`Influência secundária: ${m.secondaryProfile}`:'',
      `Motivador: ${m.motivator}`,
      `Ambiente favorável: ${m.environment}`,
      `Hipóteses: ${m.careers.map(c=>c.career).join(', ')}`,
      `Raciocínio: ${m.observed.reasoningScore??'—'}/100 · destaque: ${m.observed.reasoningStrongest||'—'}`,
      `Leitura de contexto: ${m.observed.readingScore??'—'}/100 · destaque: ${m.observed.readingStrongest||'—'}`,
      `Prontidão profissional: ${m.readiness.score??'—'}/100 · próximo treino: ${m.readiness.priority||'—'}`,
      '',
      '7 dias:',...m.actionPlan.d7.map(x=>`- ${x}`),
      '',
      '30 dias:',...m.actionPlan.d30.map(x=>`- ${x}`),
      '',
      '90 dias:',...m.actionPlan.d90.map(x=>`- ${x}`)
    ].filter(Boolean).join('\n');
    navigator.clipboard?.writeText(text).then(()=>toast('Mapa copiado.')).catch(()=>toast('Não foi possível copiar automaticamente.'));
  }
  function patchJourneyCard(){
    const button=$('[data-journey-day="7"]');if(!button)return;
    const card=button.closest('.journey-card'),status=card?.querySelector('.journey-status');
    const done=state.completedDays.includes(7),available=state.completedDays.includes(6)&&!done;
    if(done){card?.classList.remove('active','soon','locked');card?.classList.add('done');if(status)status.textContent="Concluído";button.disabled=false;button.textContent="Ver meu mapa"}
    else if(available){card?.classList.remove('done','soon','locked');card?.classList.add('active');if(status)status.textContent="Disponível agora";button.disabled=false;button.textContent="Montar meu mapa"}
  }
  function resetOwnState(){state.finalMap=null;save()}

  injectView();patchJourneyCard();if(state.finalMap)render(state.finalMap);
  document.addEventListener('click',e=>{
    const button=e.target.closest?.('[data-journey-day="7"]');if(!button)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(state.completedDays.includes(7)||state.completedDays.includes(6))start();else toast('Conclua o Dia 6 primeiro.');
  },true);
  const grid=$('#journeyGrid');if(grid)new MutationObserver(()=>patchJourneyCard()).observe(grid,{childList:true,subtree:true});
  $('#resetJourneyBtn')?.addEventListener('click',()=>setTimeout(()=>{resetOwnState();patchJourneyCard()},0));
  window.CARAMELO_DAY7={start,finish,buildMap,render};
})();
