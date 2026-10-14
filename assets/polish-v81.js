(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const PHASES={
    1:{views:['quiz','results'],title:'Mapa vocacional',copy:'Preferências, ambientes e prioridades começam a desenhar seu mapa.'},
    2:{views:['emotion','emotion-result'],title:'Momento atual',copy:'Agora o contexto entra na conversa: energia, pressão e como você está hoje.'},
    3:{views:['life-wheel','life-wheel-result'],title:'Roda da vida',copy:'Veja onde sua energia está distribuída e onde existe mais pressão.'},
    4:{views:['reasoning','reasoning-result'],title:'Raciocínio',copy:'Observe estratégias que aparecem quando você resolve desafios curtos.'},
    5:{views:['reading','reading-result'],title:'Leitura',copy:'Repare como você extrai sentido, compara pistas e organiza informação.'},
    6:{views:['readiness','readiness-result'],title:'Preparação',copy:'Transforme pistas em prontidão para experimentar possibilidades reais.'},
    7:{views:['final-map'],title:'Mapa do corre',copy:'Junte as peças e transforme hipóteses em próximos passos possíveis.'}
  };
  const safeGet=(k,fallback)=>{try{return localStorage.getItem(k)??fallback}catch{return fallback}};
  const safeSet=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
  let soundEnabled=safeGet('caramelo:v81:sound','on')!=='off',audio=null,lastDay=0,phaseTimer=0,phaseShowTimer=0,heroTimer=0,heroIndex=0;
  function activeView(){return $('.view.active')?.id||''}
  function phaseForView(view){return Number(Object.entries(PHASES).find(([,p])=>p.views.includes(view))?.[0]||0)}
  function ensureAudio(){
    if(!soundEnabled||navigator.webdriver||/HeadlessChrome/i.test(navigator.userAgent))return null;
    if(!audio){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;audio=new C()}
    if(audio.state==='suspended')audio.resume().catch(()=>{});
    return audio;
  }
  function tone(freq,start,duration,volume=.025,type='sine'){
    const ctx=ensureAudio();if(!ctx)return;
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.type=type;o.frequency.setValueAtTime(freq,ctx.currentTime+start);
    g.gain.setValueAtTime(.0001,ctx.currentTime+start);
    g.gain.exponentialRampToValueAtTime(volume,ctx.currentTime+start+.018);
    g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+start+duration);
    o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime+start);o.stop(ctx.currentTime+start+duration+.03);
  }
  function sound(kind){
    if(!soundEnabled)return;
    if(kind==='select'){tone(520,0,.08,.018,'triangle');tone(680,.045,.09,.012,'sine')}
    else if(kind==='next'){tone(392,0,.1,.018,'triangle');tone(523,.07,.12,.017,'sine')}
    else if(kind==='phase'){tone(392,0,.24,.022,'sine');tone(494,.05,.27,.018,'sine');tone(659,.11,.3,.016,'triangle')}
    else if(kind==='on'){tone(523,0,.11,.02,'sine');tone(659,.08,.14,.017,'sine')}
  }
  function installSoundToggle(){
    const nav=$('.topbar .nav');if(!nav||$('#v81SoundToggle'))return;
    const b=document.createElement('button');b.type='button';b.id='v81SoundToggle';b.className='v81-sound-toggle';
    const render=()=>{b.setAttribute('aria-pressed',String(soundEnabled));b.textContent=soundEnabled?'Som ligado':'Som desligado';b.title=soundEnabled?'Desativar sons sutis da jornada':'Ativar sons sutis da jornada'};
    render();
    b.addEventListener('click',()=>{soundEnabled=!soundEnabled;safeSet('caramelo:v81:sound',soundEnabled?'on':'off');render();if(soundEnabled){ensureAudio();sound('on')}});
    nav.appendChild(b);
  }
  function installPhaseOverlay(){
    if($('#v81PhaseOverlay'))return;
    const el=document.createElement('div');el.id='v81PhaseOverlay';el.className='v81-phase-overlay';el.setAttribute('aria-live','polite');
    el.innerHTML='<div class="v81-phase-card"><img alt=""><div class="v81-phase-copy"><small></small><strong></strong><p></p></div><div class="v81-phase-progress" aria-hidden="true"><span></span></div></div>';
    document.body.appendChild(el);
  }
  function showPhase(day){
    const p=PHASES[day],overlay=$('#v81PhaseOverlay');if(!p||!overlay)return;
    clearTimeout(phaseTimer);
    overlay.dataset.day=String(day);
    $('img',overlay).src=`assets/journey/day${day}_badge.svg`;
    $('img',overlay).alt=`Emblema do Dia ${day}: ${p.title}`;
    $('small',overlay).textContent=`Dia ${day} de 7`;
    $('strong',overlay).textContent=p.title;
    $('p',overlay).textContent=p.copy;
    overlay.classList.remove('is-visible');void overlay.offsetWidth;overlay.classList.add('is-visible');
    sound('phase');
    phaseTimer=setTimeout(()=>overlay.classList.remove('is-visible'),reduceMotion.matches?520:1120);
  }
  function syncPhase(){
    const view=activeView();
    if(view==='landing')lastDay=0;
    const day=phaseForView(view);
    if(day&&day!==lastDay){lastDay=day;clearTimeout(phaseShowTimer);phaseShowTimer=setTimeout(()=>showPhase(day),420)}
  }
  function installQuestionRibbon(){
    const host=$('#questionHost');if(!host)return;
    const refresh=()=>{
      if(!host.children.length)return;
      host.querySelector('.v81-question-ribbon')?.remove();
      const ribbon=document.createElement('div');ribbon.className='v81-question-ribbon';ribbon.setAttribute('aria-hidden','true');ribbon.innerHTML='<span></span>';
      const helper=host.querySelector('.question-helper');
      (helper||host.firstElementChild)?.insertAdjacentElement('afterend',ribbon);
      host.classList.remove('v81-question-arrival');void host.offsetWidth;host.classList.add('v81-question-arrival');
    };
    new MutationObserver(refresh).observe(host,{childList:true});
    refresh();
  }
  function kickCompass(){
    const w=$('#carameloSideProgress');if(!w)return;
    w.classList.remove('v81-reacting');void w.offsetWidth;w.classList.add('v81-reacting');
    setTimeout(()=>w.classList.remove('v81-reacting'),620);
  }
  function installHeroMotion(){
    const stage=$('.v8-home-stage'),img=$('.v8-home-main');if(!stage||!img)return;
    const images=['assets/profiles/transformador-social.webp','assets/profiles/criador-expressivo.webp','assets/profiles/comunicador-influente.webp','assets/profiles/realizador-pratico.webp'];
    if(!reduceMotion.matches&&!heroTimer){
      heroTimer=setInterval(()=>{
        if(activeView()!=='landing'||document.hidden)return;
        heroIndex=(heroIndex+1)%images.length;img.classList.add('v81-switching');
        setTimeout(()=>{img.src=images[heroIndex];img.classList.remove('v81-switching')},220);
      },4200);
    }
    if(matchMedia('(pointer:fine)').matches){
      let raf=0;
      stage.addEventListener('pointermove',e=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const r=stage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.setProperty('--v81-px',(x*-8).toFixed(2));stage.style.setProperty('--v81-py',(y*-6).toFixed(2))})});
      stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--v81-px','0');stage.style.setProperty('--v81-py','0')});
    }
  }
  function sync(){
    installSoundToggle();installPhaseOverlay();installHeroMotion();syncPhase();
  }
  document.addEventListener('click',e=>{
    const isAnswer=Boolean(e.target.closest?.('[data-option-index],[data-rank-index],[data-emotion-value],[data-wheel-value],[data-reasoning-value],[data-reading-value],[data-readiness-value]'));
    const isNext=Boolean(e.target.closest?.('#nextQuestionBtn,#emotionNext,#wheelNext,#reasoningNext,#readingNext,#readinessNext'));
    if(!isAnswer&&!isNext)return;
    setTimeout(()=>{ensureAudio();if(isAnswer){sound('select');kickCompass()}if(isNext)sound('next')},0);
  });
  document.addEventListener('keyup',e=>{if(e.key==='Enter'||e.key===' '){setTimeout(ensureAudio,0)}},true);
  const main=$('#main');if(main)new MutationObserver(()=>requestAnimationFrame(sync)).observe(main,{subtree:true,attributes:true,attributeFilter:['class']});
  installSoundToggle();installPhaseOverlay();installQuestionRibbon();installHeroMotion();syncPhase();
  window.CARAMELO_V81={sound:(v)=>{soundEnabled=Boolean(v);safeSet('caramelo:v81:sound',soundEnabled?'on':'off');installSoundToggle()},phase:showPhase};
})();