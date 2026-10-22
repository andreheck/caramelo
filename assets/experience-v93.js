(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const DAY_META={
    1:{title:'Mapa vocacional',xp:100},
    2:{title:'Momento atual',xp:80},
    3:{title:'Roda da vida',xp:60},
    4:{title:'Raciocínio',xp:90},
    5:{title:'Leitura',xp:70},
    6:{title:'Preparação',xp:120},
    7:{title:'Mapa do corre',xp:200}
  };
  const VIEW_DAY={
    onboarding:1,quiz:1,results:1,
    emotion:2,'emotion-result':2,
    'life-wheel':3,'life-wheel-result':3,
    reasoning:4,'reasoning-result':4,
    reading:5,'reading-result':5,
    readiness:6,'readiness-result':6,
    'final-map':7
  };
  let queued=false,completionTimer=0,progressReady=false,knownCompleted=new Set();

  function journeyState(){return window.CARAMELO_JOURNEY?.state||null}
  function appState(){return window.CARAMELO_APP?.state||null}
  function activeView(){return $('.view.active')}

  function firstIncomplete(){
    const completed=journeyState()?.completedDays||[];
    for(let day=1;day<=7;day++)if(!completed.includes(day))return day;
    return 7;
  }
  function answerCount(){
    const answers=appState()?.answers;
    return answers&&typeof answers==='object'?Object.keys(answers).length:0;
  }
  function syncDayIdentity(){
    const view=activeView();
    if(!view)return;
    let day=VIEW_DAY[view.id]||0;
    if(view.id==='journey')day=firstIncomplete();
    if(day){
      document.body.dataset.v93Day=String(day);
      view.dataset.v93Day=String(day);
    }else{
      delete document.body.dataset.v93Day;
      delete view.dataset.v93Day;
    }
  }

  function ensureResume(){
    const actions=$('#landing .hero-copy .actions');
    if(!actions||$('#v93Resume'))return;
    const box=document.createElement('div');
    box.id='v93Resume';
    box.className='v93-resume';
    box.hidden=true;
    box.innerHTML='<div class="v93-resume-icon" aria-hidden="true"><svg><use href="assets/icons.svg#icon-route"></use></svg></div><div class="v93-resume-copy"><small>retomar</small><strong></strong></div><button class="v93-resume-button" id="v93ResumeButton" type="button">Continuar</button>';
    actions.insertAdjacentElement('afterend',box);
    $('#v93ResumeButton',box).addEventListener('click',resume);
  }
  function resume(){
    const J=journeyState(),A=appState();
    if(!J||!A)return;
    const completed=J.completedDays||[];
    if(completed.includes(7)){
      window.CARAMELO_APP?.go('journey');
      setTimeout(()=>document.querySelector('[data-journey-day="7"]:not([disabled])')?.click(),0);
      return;
    }
    if(!completed.includes(1)&&answerCount()>0){
      window.CARAMELO_APP?.go('quiz');
      return;
    }
    const day=firstIncomplete();
    window.CARAMELO_APP?.go('journey');
    setTimeout(()=>{
      window.CARAMELO_JOURNEY?.renderJourney?.();
      document.querySelector('[data-journey-day="'+day+'"]:not([disabled])')?.click();
    },0);
  }
  function syncResume(){
    ensureResume();
    const box=$('#v93Resume'),copy=$('.v93-resume-copy strong',box||document),small=$('.v93-resume-copy small',box||document),button=$('#v93ResumeButton');
    const J=journeyState(),A=appState();
    if(!box||!J||!A)return;
    const completed=J.completedDays||[];
    const answers=answerCount();
    if(completed.includes(7)){
      box.hidden=false;
      if(small)small.textContent='jornada concluída';
      if(copy)copy.textContent='Rever meu Mapa do Corre · '+J.xp+' XP';
      if(button)button.textContent='Abrir mapa';
      return;
    }
    if(!completed.includes(1)&&answers>0){
      const q=Math.min((Number(A.questionIndex)||0)+1,50);
      box.hidden=false;
      if(small)small.textContent='você já começou';
      if(copy)copy.textContent='Continuar mapa vocacional · Pergunta '+q+' de 50';
      if(button)button.textContent='Continuar';
      return;
    }
    if(completed.length>0){
      const day=firstIncomplete(),meta=DAY_META[day];
      box.hidden=false;
      if(small)small.textContent=completed.length+' de 7 dias concluídos';
      if(copy)copy.textContent='Próxima etapa: Dia '+day+' · '+meta.title;
      if(button)button.textContent='Seguir jornada';
      return;
    }
    box.hidden=true;
  }

  function ensureCompletion(){
    if($('#v93Completion'))return;
    const el=document.createElement('div');
    el.id='v93Completion';
    el.className='v93-completion';
    el.setAttribute('aria-live','polite');
    el.setAttribute('aria-atomic','true');
    el.innerHTML='<img alt=""><div><small></small><strong></strong><span></span></div>';
    document.body.appendChild(el);
  }
  function showCompletion(day){
    ensureCompletion();
    const el=$('#v93Completion'),meta=DAY_META[day];
    if(!el||!meta)return;
    el.dataset.day=String(day);
    el.style.setProperty('--v93-accent','var(--v93-accent)');
    $('img',el).src='assets/journey/day'+day+'_badge.svg';
    $('img',el).alt='Emblema do Dia '+day;
    $('small',el).textContent='Dia '+day+' concluído · +'+meta.xp+' XP';
    $('strong',el).textContent=meta.title+' entrou no seu mapa.';
    $('span',el).textContent=day<7?'A próxima etapa já ficou mais perto.':'Sua jornada-base está completa.';
    el.classList.remove('is-visible');
    void el.offsetWidth;
    el.classList.add('is-visible');
    clearTimeout(completionTimer);
    completionTimer=setTimeout(()=>el.classList.remove('is-visible'),2700);
  }
  function syncCompletion(){
    const state=journeyState();
    if(!state)return;
    const current=new Set(Array.isArray(state.completedDays)?state.completedDays:[]);
    if(!progressReady){
      knownCompleted=current;
      progressReady=true;
      return;
    }
    const added=[...current].filter(day=>!knownCompleted.has(day)).sort((a,b)=>a-b);
    knownCompleted=current;
    if(added.length)showCompletion(added[added.length-1]);
  }

  function sync(){
    syncDayIdentity();
    syncResume();
    syncCompletion();
  }
  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;sync()});
  }

  const main=$('#main');
  if(main)new MutationObserver(queue).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-pressed','style']});
  window.addEventListener('load',queue);
  window.addEventListener('storage',queue);
  document.addEventListener('click',event=>{
    if(event.target.closest?.('[data-option-index],[data-rank-index],[data-emotion-value],[data-wheel-value],[data-reasoning-value],[data-reading-value],[data-readiness-value],[data-journey-day],#nextQuestionBtn,#emotionNext,#wheelNext,#reasoningNext,#readingNext,#readinessNext')){
      setTimeout(queue,0);
    }
  },true);
  ensureCompletion();
  ensureResume();
  sync();
  window.CARAMELO_V93={refresh:queue,resume,showCompletion};
})();