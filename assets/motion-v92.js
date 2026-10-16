(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let lastView='',queued=false,scrollObserver=null,pressTimer=0;

  function activeView(){return $('.view.active')}
  function completedDays(){
    const value=window.CARAMELO_JOURNEY?.state?.completedDays;
    return Array.isArray(value)?value.length:0;
  }
  function syncCompassAngle(){
    const needle=$('.v92-compass-needle');
    if(!needle)return;
    const angle=-18+Math.min(7,completedDays())*7;
    needle.style.setProperty('--v92-angle',angle+'deg');
  }
  function installCompass(){
    const stage=$('.v8-home-stage');
    if(!stage||$('.v92-home-compass',stage))return;
    const compass=document.createElement('div');
    compass.className='v92-home-compass';
    compass.setAttribute('aria-hidden','true');
    compass.innerHTML='<div class="v92-compass-glow"></div><span class="v92-orbit a"></span><span class="v92-orbit b"></span><div class="v92-compass-body"><img class="v92-compass-base" src="assets/journey/compass_base.svg" alt=""><img class="v92-compass-ring" src="assets/journey/compass_ring.svg" alt=""><img class="v92-compass-needle" src="assets/journey/compass_needle.svg" alt=""></div>';
    stage.appendChild(compass);
    syncCompassAngle();
    if(matchMedia('(pointer:fine)').matches&&stage.dataset.v92Pointer!=='1'){
      stage.dataset.v92Pointer='1';
      let raf=0;
      stage.addEventListener('pointermove',event=>{
        if(raf||reduceMotion.matches)return;
        raf=requestAnimationFrame(()=>{
          raf=0;
          const rect=stage.getBoundingClientRect();
          const x=(event.clientX-rect.left)/rect.width-.5;
          const y=(event.clientY-rect.top)/rect.height-.5;
          stage.style.setProperty('--v92-cx',(x*7).toFixed(2));
          stage.style.setProperty('--v92-cy',(y*5).toFixed(2));
        });
      },{passive:true});
      stage.addEventListener('pointerleave',()=>{
        stage.style.setProperty('--v92-cx','0');
        stage.style.setProperty('--v92-cy','0');
      },{passive:true});
    }
  }

  function revealCurrentView(){
    const view=activeView();
    if(!view||view.id===lastView)return;
    lastView=view.id;
    document.body.dataset.v92View=view.id;
    view.classList.remove('v92-view-enter');
    void view.offsetWidth;
    view.classList.add('v92-view-enter');
    const candidates=$$('.panel,.feature-card,.choice-card,.journey-card,.v9-profile-mini,.reflection-result',view)
      .filter((el,index,list)=>!list.some((other,i)=>i!==index&&other.contains(el)&&other.classList.contains('panel')))
      .slice(0,10);
    candidates.forEach((el,index)=>{
      el.style.setProperty('--v92-delay',Math.min(index,7)*35+'ms');
      el.classList.remove('v92-reveal');
      void el.offsetWidth;
      el.classList.add('v92-reveal');
    });
    if(view.id==='results'){
      const dashboard=$('#v8ResultDashboard');
      if(dashboard){
        dashboard.classList.remove('v92-result-enter');
        void dashboard.offsetWidth;
        dashboard.classList.add('v92-result-enter');
      }
    }
  }

  function pulseProgress(){
    const view=activeView();
    const bars=view?$$('.meter span,.v81-question-ribbon span',view):[];
    const top=$('.journey-top-progress .meter span');
    if(top)bars.push(top);
    bars.forEach(bar=>{
      bar.classList.remove('v92-progress-pulse');
      void bar.offsetWidth;
      bar.classList.add('v92-progress-pulse');
    });
  }

  function setupScrollReveal(){
    if(reduceMotion.matches)return;
    const items=$$('#landing .feature-card,#v9ProfileShowcase .v9-profile-mini');
    items.forEach((item,index)=>{
      item.classList.add('v92-scroll-item');
      item.style.setProperty('--v92-scroll-delay',Math.min(index,6)*45+'ms');
    });
    if(scrollObserver)scrollObserver.disconnect();
    scrollObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('v92-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },{threshold:.16});
    items.forEach(item=>scrollObserver.observe(item));
  }

  function sync(){
    installCompass();
    syncCompassAngle();
    revealCurrentView();
    setupScrollReveal();
  }
  function queue(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;sync()});
  }

  document.addEventListener('pointerdown',event=>{
    const target=event.target.closest?.('.btn,.nav button,.choice-card,.option-card,.rank-card,.reflection-option,[data-journey-day]');
    if(!target||reduceMotion.matches)return;
    target.classList.remove('v92-press');
    void target.offsetWidth;
    target.classList.add('v92-press');
    clearTimeout(pressTimer);
    pressTimer=setTimeout(()=>target.classList.remove('v92-press'),260);
  },true);

  document.addEventListener('click',event=>{
    if(event.target.closest?.('[data-option-index],[data-rank-index],[data-emotion-value],[data-wheel-value],[data-reasoning-value],[data-reading-value],[data-readiness-value],#nextQuestionBtn,#emotionNext,#wheelNext,#reasoningNext,#readingNext,#readinessNext')){
      requestAnimationFrame(pulseProgress);
    }
  },true);

  document.addEventListener('visibilitychange',()=>{
    document.body.classList.toggle('v92-paused',document.hidden);
  });

  const main=$('#main');
  if(main)new MutationObserver(queue).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-pressed']});
  window.addEventListener('load',queue);
  window.addEventListener('resize',syncCompassAngle,{passive:true});
  reduceMotion.addEventListener?.('change',queue);
  sync();
  window.CARAMELO_V92={refresh:queue,compass:syncCompassAngle};
})();