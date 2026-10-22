(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const STAGES=[
    ['Mapa vocacional','assets/journey/day1_badge.svg'],
    ['Momento atual','assets/journey/day2_badge.svg'],
    ['Roda da vida','assets/journey/day3_badge.svg'],
    ['Raciocínio','assets/journey/day4_badge.svg'],
    ['Leitura','assets/journey/day5_badge.svg'],
    ['Preparação','assets/journey/day6_badge.svg'],
    ['Mapa do corre','assets/journey/day7_badge.svg']
  ];
  let queued=false,lastMobileDay=0;

  function setText(el,text){if(el&&el.textContent!==text)el.textContent=text}
  function journeyState(){return window.CARAMELO_JOURNEY?.state||{completedDays:[]}}
  function completed(){const d=journeyState().completedDays;return Array.isArray(d)?d:[]}
  function currentDay(){
    const direct=Number(document.body.dataset.v93Day||0);
    if(direct>=1&&direct<=7)return direct;
    const view=document.querySelector('.view.active')?.id;
    const map={onboarding:1,quiz:1,results:1,emotion:2,'emotion-result':2,'life-wheel':3,'life-wheel-result':3,reasoning:4,'reasoning-result':4,reading:5,'reading-result':5,readiness:6,'readiness-result':6,'final-map':7,journey:Math.min(7,completed().length+1)};
    return Number(map[view]||0);
  }
  function ownRouteMarkup(steps,current){
    const doneDays=completed();
    const existing=[...steps.querySelectorAll('.journey-top-step')];
    const needsMarkup=existing.length!==7||existing.some(card=>!card.querySelector('.journey-top-dot img'));
    if(needsMarkup){
      steps.innerHTML=STAGES.map(([label,badge],index)=>{
        const day=index+1;
        return '<div class="journey-top-step" data-day="'+day+'"><span class="journey-top-dot"><img src="'+badge+'" alt=""></span><span class="journey-top-label">'+label+'</span></div>';
      }).join('');
    }
    [...steps.querySelectorAll('.journey-top-step')].forEach((card,index)=>{
      const day=index+1,done=doneDays.includes(day)||day<current,isCurrent=day===current;
      card.classList.toggle('current',isCurrent);
      card.classList.toggle('done',!isCurrent&&done);
      card.classList.toggle('future',!isCurrent&&!done);
    });
  }

  function enhanceTracker(){
    const tracker=$('#journeyTopProgress'),steps=$('#journeyTopSteps');
    if(!tracker||!steps)return;
    const current=currentDay();
    if(!current)return;
    ownRouteMarkup(steps,current);
    const cards=$('.journey-top-step',steps);
    if(cards.length!==7)return;
    tracker.classList.add('visible');

    const title=$('#journeyTopTitle',tracker),kicker=$('#journeyTopKicker',tracker);
    const currentLabel=$('.journey-top-label',cards[current-1])?.textContent?.trim()||'Sua etapa';
    setText(kicker,'Sua rota');
    setText(title,currentLabel);

    let meta=$('.v97-route-meta',tracker);
    if(!meta){
      meta=document.createElement('span');
      meta.className='v97-route-meta';
      $('.journey-top-copy',tracker)?.appendChild(meta);
    }
    setText(meta,'Dia '+current+' · '+completed().length+' concluído'+(completed().length===1?'':'s'));

    steps.style.setProperty('--v97-route-progress',String(Math.max(0,(current-1)/6)));
    cards.forEach((card,index)=>{
      const day=index+1;
      card.dataset.day=String(day);
      const done=card.classList.contains('done');
      const isCurrent=card.classList.contains('current');
      if(isCurrent)card.setAttribute('aria-current','step'); else card.removeAttribute('aria-current');
      let dayLabel=$('.journey-top-day',card);
      if(!dayLabel){
        dayLabel=document.createElement('span');
        dayLabel.className='journey-top-day';
        card.prepend(dayLabel);
      }
      setText(dayLabel,'Dia '+day);
      let state=$('.journey-top-state',card);
      if(!state){
        state=document.createElement('span');
        state.className='journey-top-state';
        card.appendChild(state);
      }
      setText(state,isCurrent?'agora':done?'feito':'depois');
    });

    if(innerWidth<=900&&current!==lastMobileDay){
      lastMobileDay=current;
      requestAnimationFrame(()=>{
        const active=cards[current-1];
        if(!active)return;
        const left=active.offsetLeft-(steps.clientWidth-active.offsetWidth)/2;
        steps.scrollTo({left:Math.max(0,left),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      });
    }
  }

  function relocateProfiles(){
    const showcase=$('#v9ProfileShowcase');
    const methodology=$('#methodology .prose');
    if(!showcase||!methodology)return;
    if(showcase.parentElement!==methodology){
      showcase.classList.add('v97-methodology-profiles');
      const h2=$('.v9-profile-showcase-head h2',showcase);
      const p=$('.v9-profile-showcase-head p',showcase);
      if(h2)h2.textContent='Perfis interpretativos do Caramelo';
      if(p)p.textContent='Depois da jornada, os sinais do mapa são organizados em sete perfis interpretativos. Eles ajudam a abrir hipóteses — não servem para limitar você a um rótulo.';
      const notice=$('.notice',methodology);
      if(notice)notice.insertAdjacentElement('beforebegin',showcase); else methodology.appendChild(showcase);
    }
  }

  function sync(){
    enhanceTracker();
    relocateProfiles();
  }
  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;sync()});
  }

  new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('load',queue);
  window.addEventListener('resize',queue,{passive:true});
  sync();
  window.CARAMELO_V97={refresh:queue};
})();