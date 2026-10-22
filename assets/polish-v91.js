(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const PROFILE_TITLES=()=>new Set((window.CARAMELO_DATA?.profiles||[]).map(p=>p.title));
  function heroMosaic(){
    const stage=$('.v8-home-stage');if(!stage||stage.dataset.v91Mosaic==='1')return;
    stage.dataset.v91Mosaic='1';stage.classList.add('v91-mosaic-ready');
    $('.v8-home-main',stage)?.remove();
    const mosaic=document.createElement('div');mosaic.className='v91-hero-mosaic';mosaic.setAttribute('aria-hidden','true');
    mosaic.innerHTML=[
      'assets/profiles/transformador-social.webp',
      'assets/profiles/criador-expressivo.webp',
      'assets/profiles/explorador-analitico.webp',
      'assets/profiles/realizador-pratico.webp'
    ].map(src=>`<img src="${src}" alt="">`).join('');
    stage.prepend(mosaic);
  }
  function neutralQuestionArt(){
    const art=$('#v9QuestionArt');if(!art)return;
    art.classList.add('v91-neutral');
    const strong=$('strong',art),small=$('small',art);
    const index=window.CARAMELO_APP?.state?.questionIndex??0;
    if(small)small.textContent=`Pista ${Math.min(Number(index)+1,50)} de 50`;
    if(strong)strong.textContent='Escolha pelo que combina mais com você.';
  }
  function restoreCommunicator(){
    $('#v9ProfileShowcase .v9-profile-mini').forEach(card=>{
      if(card.querySelector('strong')?.textContent?.trim()!=='Comunicador Influente')return;
      const img=$('img',card);if(img){img.src='assets/profiles/comunicador-influente.svg';img.classList.add('v91-communicator-svg')}
    });
    ['#profileVisualDay1','#profileVisualDay7'].forEach(selector=>{
      const host=$(selector);if(host?.querySelector('.profile-visual-copy h3')?.textContent?.trim()!=='Comunicador Influente')return;
      const img=$('.profile-visual-image',host);if(img){img.src='assets/profiles/comunicador-influente.svg';img.classList.add('v91-communicator-svg')}
    });
  }
  function sync(){
    heroMosaic();neutralQuestionArt();restoreCommunicator();
  }
  let queued=false;
  function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})}
  new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src']});
  window.addEventListener('load',queue);
  window.addEventListener('resize',queue,{passive:true});
  sync();
  window.CARAMELO_V91={refresh:queue,profileTitles:PROFILE_TITLES};
})();