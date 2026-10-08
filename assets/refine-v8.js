(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const QUESTION_VIEWS=new Set(['quiz','emotion','life-wheel','reasoning','reading','readiness']);
  let questionDirection='stay', lastView='';
  function activeView(){return $('.view.active')?.id||''}
  function enhanceLanding(){
    const landing=$('#landing'); if(!landing||landing.dataset.v8==='1')return;
    landing.dataset.v8='1';
    const title=$('#landing-title'); if(title) title.innerHTML='Seu futuro também tem <span>muitas possibilidades.</span>';
    const lead=$('#landing .hero-copy .lead'); if(lead) lead.textContent='Uma jornada brasileira, visual e prática para transformar curiosidade em pistas, hipóteses de carreira e próximos passos que façam sentido para você.';
    const panel=$('#landing .visual-panel');
    if(panel) panel.innerHTML=`<div class="v8-home-stage" aria-label="Colagem ilustrada da jornada Caramelo">
      <img class="v8-home-main" src="assets/profiles/transformador-social.webp" alt="Jovens construindo possibilidades em uma cena brasileira colorida">
      <div class="v8-home-wash" aria-hidden="true"></div>
      <div class="v8-home-copy"><small>bora descobrir?</small><strong>Não existe um único caminho certo.</strong><p>Seu mapa aparece aos poucos, conforme você se conhece, compara possibilidades e testa ideias.</p></div>
      <img class="v8-home-card a" src="assets/profiles/criador-expressivo.webp" alt="">
      <img class="v8-home-card b" src="assets/profiles/realizador-pratico.webp" alt="">
      <div class="v8-home-chiprow">
        <span class="v8-home-chip"><svg aria-hidden="true"><use href="assets/icons.svg#icon-route"></use></svg>7 dias</span>
        <span class="v8-home-chip"><svg aria-hidden="true"><use href="assets/icons.svg#icon-lightbulb"></use></svg>hipóteses reais</span>
        <span class="v8-home-chip"><svg aria-hidden="true"><use href="assets/icons.svg#icon-compass"></use></svg>seu próprio ritmo</span>
      </div>
    </div>`;
  }
  function syncMode(){
    const view=activeView(); if(!view)return;
    document.body.classList.toggle('v8-question-mode',QUESTION_VIEWS.has(view));
    document.body.classList.toggle('v8-result-mode',view==='results');
    document.body.dataset.v8View=view;
    lastView=view;
    if(view==='results') queueResult();
  }
  function animateQuestion(){
    const host=$('#questionHost'); if(!host)return;
    host.classList.remove('v8-enter-forward','v8-enter-back','v8-enter-stay');
    void host.offsetWidth;
    host.classList.add(questionDirection==='next'?'v8-enter-forward':questionDirection==='back'?'v8-enter-back':'v8-enter-stay');
    questionDirection='stay';
  }
  function resultDetailsHTML(){
    const summary=$('#profileSummary')?.innerHTML||'';
    const axes=$('#axisBars')?.outerHTML||'';
    const careers=$('#careerChips')?.outerHTML||'';
    const plan=$('#actionPlan')?.outerHTML||'';
    return `<div class="v8-dialog-shell"><div class="v8-dialog-head"><h3>Detalhes do seu mapa</h3><button class="v8-dialog-close" type="button">Fechar</button></div>
      <section class="v8-dialog-section"><h4>Leitura complementar</h4><p>${summary}</p></section>
      <section class="v8-dialog-section"><h4>Eixos em destaque</h4><p class="microcopy">Proporção do máximo estrutural disponível em cada eixo; não são percentis populacionais.</p>${axes}</section>
      <section class="v8-dialog-section"><h4>Áreas para investigar</h4>${careers}</section>
      <section class="v8-dialog-section"><h4>Plano de ação sugerido</h4>${plan}</section></div>`;
  }
  let resultQueued=false;
  function queueResult(){if(resultQueued)return;resultQueued=true;requestAnimationFrame(()=>{resultQueued=false;organizeResult()})}
  function organizeResult(){
    const results=$('#results'),main=$('#results .result-main'),profile=$('#profileVisualDay1'),rings=$('#resultRingsDay1'),keys=$('#keyCards');
    if(!results||!main||!profile||!rings||!keys)return;
    let dash=$('#v8ResultDashboard');
    if(!dash){dash=document.createElement('div');dash.id='v8ResultDashboard';$('#results-title')?.insertAdjacentElement('afterend',dash)}
    [profile,rings,keys].forEach(el=>{if(el.parentElement!==dash)dash.appendChild(el)});
    results.classList.add('v8-result-ready');
    let details=$('#v8ResultDetails');
    if(!details){details=document.createElement('dialog');details.id='v8ResultDetails';main.appendChild(details)}
    details.innerHTML=resultDetailsHTML();
    details.querySelector('.v8-dialog-close')?.addEventListener('click',()=>details.close());
    let button=$('#v8ResultDetailBtn');
    const actions=$('#results .actions');
    if(actions&&!button){button=document.createElement('button');button.type='button';button.className='btn secondary';button.id='v8ResultDetailBtn';button.textContent='Ver detalhes';actions.prepend(button);button.addEventListener('click',()=>{details.innerHTML=resultDetailsHTML();details.querySelector('.v8-dialog-close')?.addEventListener('click',()=>details.close());details.showModal()})}
  }
  enhanceLanding();
  syncMode();
  const main=$('#main');
  if(main)new MutationObserver(()=>{syncMode();queueResult()}).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  const q=$('#questionHost');
  if(q)new MutationObserver(animateQuestion).observe(q,{childList:true});
  document.addEventListener('pointerdown',e=>{
    if(e.target.closest?.('#nextQuestionBtn'))questionDirection='next';
    else if(e.target.closest?.('#backQuestionBtn'))questionDirection='back';
    const choice=e.target.closest?.('.option-card,.rank-card,.reflection-option,.choice-card');
    if(choice){choice.classList.remove('v8-answer-pulse');void choice.offsetWidth;choice.classList.add('v8-answer-pulse')}
  },true);
  window.addEventListener('load',()=>{enhanceLanding();syncMode();queueResult()});
  window.CARAMELO_V8={refresh:()=>{enhanceLanding();syncMode();queueResult()}};
})();