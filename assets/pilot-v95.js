(()=>{
  const D=window.CARAMELO_DATA;
  const V=window.CARAMELO_VOCATIONAL;
  const APP=()=>window.CARAMELO_APP;
  if(!D||!V)return;
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  let queued=false,breakOpen=false,lastFocused=null,saveTimer=0;
  const chapterCopy=[
    'Você começou observando como reage, escolhe e se movimenta no cotidiano.',
    'Agora o foco muda para a forma como você enfrenta problemas e toma decisões.',
    'Nesta parte, entram interesses, curiosidades e o que naturalmente puxa sua atenção.',
    'Aqui você observa contexto, rotina e os ambientes em que tende a funcionar melhor.',
    'Na reta final, você aproxima preferências de futuro, sentido e possibilidades concretas.'
  ];

  function storageAvailable(){
    try{
      const key='caramelo:v95:probe';
      localStorage.setItem(key,'1');localStorage.removeItem(key);
      return true;
    }catch{return false}
  }
  function chapterStats(){
    const state=APP()?.state;
    if(!state||!D.questions[state.questionIndex])return null;
    const q=D.questions[state.questionIndex],chapter=q.chapter;
    const indices=D.questions.map((x,i)=>x.chapter===chapter?i:-1).filter(i=>i>=0);
    const position=indices.indexOf(state.questionIndex)+1;
    return {chapter,position,total:indices.length,current:q,next:D.questions[state.questionIndex+1]||null};
  }
  function ensureTools(){
    const side=$('#quiz .quiz-side');
    if(!side||$('#v95QuizTools'))return;
    const tools=document.createElement('div');
    tools.id='v95QuizTools';
    tools.className='v95-quiz-tools';
    tools.innerHTML='<span class="v95-chapter-progress" id="v95ChapterProgress"></span><span class="v95-save-state" id="v95SaveState" data-state="saved">Salvo neste navegador</span><button type="button" class="v95-pause" id="v95PauseBtn">Pausar e continuar depois</button>';
    side.appendChild(tools);
    $('#v95PauseBtn',tools).addEventListener('click',()=>{
      APP()?.go('landing');
      requestAnimationFrame(()=>$('#v93ResumeButton')?.focus({preventScroll:true}));
    });
  }
  function syncTools(){
    ensureTools();
    const stats=chapterStats(),progress=$('#v95ChapterProgress'),save=$('#v95SaveState');
    if(stats&&progress)progress.textContent=(stats.chapter+1)+'/'+D.chapters.length+' · '+stats.position+' de '+stats.total;
    if(save&&save.dataset.state!=='saving'){
      const ok=storageAvailable();
      save.dataset.state=ok?'saved':'error';
      save.textContent=ok?'Salvo neste navegador':'Salvamento indisponível';
    }
  }
  function markSaving(){
    const save=$('#v95SaveState');if(!save)return;
    save.dataset.state='saving';save.textContent='Salvando…';
    clearTimeout(saveTimer);
    saveTimer=setTimeout(syncTools,220);
  }
  function syncRanking(){
    const host=$('#questionHost');if(!host)return;
    const grid=$('.rank-grid',host);
    const old=$('.v95-ranking-count',host);
    if(!grid){old?.remove();return}
    const total=$$('[data-rank-index]',grid).length;
    const selected=$$('[data-rank-index].selected',grid).length;
    let count=old;
    if(!count){
      count=document.createElement('div');
      count.className='v95-ranking-count';
      count.innerHTML='<span><strong></strong> posições definidas</span><span class="v95-ranking-mini-track" aria-hidden="true"><span></span></span>';
      grid.insertAdjacentElement('afterend',count);
    }
    $('strong',count).textContent=selected+' de '+total;
    $('.v95-ranking-mini-track span',count).style.setProperty('--v95-rank-pct',Math.round(selected/Math.max(total,1)*100)+'%');
    count.setAttribute('aria-label',selected+' de '+total+' posições do ranking definidas');
  }

  function ensureBreak(){
    if($('#v95ChapterBreak'))return;
    const modal=document.createElement('div');
    modal.id='v95ChapterBreak';
    modal.className='v95-chapter-break';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-labelledby','v95ChapterTitle');
    modal.innerHTML='<div class="v95-chapter-card"><div class="v95-chapter-top"><div class="v95-chapter-mark" aria-hidden="true"><svg><use href="assets/icons.svg#icon-compass"></use></svg></div><div class="v95-chapter-copy"><small id="v95ChapterEyebrow"></small><h2 id="v95ChapterTitle"></h2><p id="v95ChapterText"></p></div></div><div class="v95-chapter-dots" id="v95ChapterDots" aria-hidden="true"></div><div class="v95-chapter-next"><small>Agora vem</small><strong id="v95ChapterNext"></strong></div><div class="v95-chapter-actions"><button type="button" class="btn secondary" id="v95ChapterReview">Rever última resposta</button><button type="button" class="btn" id="v95ChapterContinue">Seguir para próxima parte</button></div></div>';
    document.body.appendChild(modal);
    $('#v95ChapterReview',modal).addEventListener('click',closeBreak);
    $('#v95ChapterContinue',modal).addEventListener('click',continueBreak);
    modal.addEventListener('click',e=>{if(e.target===modal)closeBreak()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&breakOpen)closeBreak()});
  }
  function showBreak(stats){
    ensureBreak();
    const modal=$('#v95ChapterBreak');
    breakOpen=true;lastFocused=document.activeElement;
    modal.dataset.fromChapter=String(stats.chapter);
    $('#v95ChapterEyebrow').textContent='Parte '+(stats.chapter+1)+' de '+D.chapters.length+' concluída';
    $('#v95ChapterTitle').textContent=D.chapters[stats.chapter];
    $('#v95ChapterText').textContent=chapterCopy[stats.chapter]||'Você concluiu mais uma parte do seu mapa.';
    $('#v95ChapterNext').textContent=D.chapters[stats.next.chapter];
    $('#v95ChapterDots').innerHTML=D.chapters.map((_,i)=>'<span class="'+(i<=stats.chapter?'done':i===stats.chapter+1?'next':'')+'"></span>').join('');
    modal.classList.add('is-open');
    document.body.style.overflow='hidden';
    setTimeout(()=>$('#v95ChapterContinue')?.focus({preventScroll:true}),0);
  }
  function closeBreak(){
    const modal=$('#v95ChapterBreak');if(!modal)return;
    breakOpen=false;modal.classList.remove('is-open');document.body.style.overflow='';
    lastFocused?.focus?.({preventScroll:true});
  }
  function continueBreak(){
    const app=APP(),state=app?.state;
    if(!state)return closeBreak();
    state.questionIndex=Math.min(state.questionIndex+1,D.questions.length-1);
    closeBreak();
    app.go('quiz');
  }
  function shouldBreak(){
    const state=APP()?.state;if(!state)return null;
    const q=D.questions[state.questionIndex],next=D.questions[state.questionIndex+1];
    if(!q||!next||q.chapter===next.chapter)return null;
    if(!V.isComplete(q,state.answers))return null;
    return chapterStats();
  }

  function sync(){
    if(!$('#quiz.active'))return;
    syncTools();
    syncRanking();
  }
  function queue(){
    if(queued)return;queued=true;
    requestAnimationFrame(()=>{queued=false;sync()});
  }

  ensureBreak();
  const main=$('#main');
  if(main)new MutationObserver(queue).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-pressed']});
  document.addEventListener('click',event=>{
    if(event.target.closest?.('[data-option-index],[data-rank-index],#undoRankBtn,#clearRankBtn')){
      markSaving();setTimeout(queue,0);
    }
  },true);
  document.addEventListener('click',event=>{
    const next=event.target.closest?.('#nextQuestionBtn');
    if(!next||breakOpen)return;
    const stats=shouldBreak();
    if(!stats)return;
    event.preventDefault();
    event.stopImmediatePropagation();
    showBreak(stats);
  },true);
  window.addEventListener('load',queue);
  sync();
  window.CARAMELO_V95={refresh:queue,showBreak,closeBreak,storageAvailable};
})();