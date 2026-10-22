(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const CHAPTER_ICONS=['route','brain','lightbulb','landmark'];
  let queued=false,observer=null;

  function decorateChapterBreak(){
    const modal=$('#v95ChapterBreak');if(!modal)return;
    const from=Number(modal.dataset.fromChapter);
    if(!Number.isInteger(from)||from<0||from>3)return;
    const icon=CHAPTER_ICONS[from]||'compass';
    const use=$('.v95-chapter-mark use',modal);
    if(use)use.setAttribute('href','assets/icons.svg#icon-'+icon);
    let label=$('.v96-chapter-label',modal);
    if(!label){
      label=document.createElement('span');
      label.className='v96-chapter-label';
      $('.v95-chapter-copy',modal)?.appendChild(label);
    }
    const next=window.CARAMELO_DATA?.chapters?.[from+1]||'Próxima parte';
    label.innerHTML='<svg aria-hidden="true"><use href="assets/icons.svg#icon-'+icon+'"></use></svg><span>próxima direção · '+next+'</span>';
  }

  function ensureResultNav(){
    const results=$('#results.active'),dashboard=$('#v8ResultDashboard'),actions=$('#results .actions');
    if(!results||!dashboard||!actions)return;
    const profile=$('#profileVisualDay1'),rings=$('#resultRingsDay1'),axes=$('#v9AxisSummary');
    if(!profile||!rings||!axes)return;

    if(!$('#v96ResultIntro')){
      const intro=document.createElement('p');
      intro.id='v96ResultIntro';
      intro.className='v96-result-mobile-intro';
      intro.innerHTML='<strong>Comece pelo seu perfil.</strong> Depois use a bússola e os eixos para entender por que esse resultado apareceu.';
      dashboard.insertAdjacentElement('beforebegin',intro);
    }

    let nav=$('#v96ResultNav');
    if(!nav){
      nav=document.createElement('nav');
      nav.id='v96ResultNav';
      nav.className='v96-result-nav';
      nav.setAttribute('aria-label','Navegação pelos resultados');
      nav.innerHTML=[
        ['profileVisualDay1','Perfil'],
        ['resultRingsDay1','Bússola'],
        ['v9AxisSummary','Eixos'],
        ['resultActions','Ações']
      ].map(([target,label],i)=>'<button type="button" data-v96-target="'+target+'" aria-current="'+(i===0?'true':'false')+'">'+label+'</button>').join('');
      $('#v96ResultIntro')?.insertAdjacentElement('beforebegin',nav);
      actions.id=actions.id||'resultActions';
      nav.addEventListener('click',event=>{
        const button=event.target.closest('[data-v96-target]');if(!button)return;
        const target=document.getElementById(button.dataset.v96Target);if(!target)return;
        target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
        $$('[data-v96-target]',nav).forEach(b=>b.setAttribute('aria-current',String(b===button)));
      });
    }
    addLabel(profile,'Seu perfil principal');
    addLabel(rings,'Como os sinais se combinam');
    addLabel(axes,'Seus eixos em destaque');

    if(!observer&&'IntersectionObserver' in window){
      observer=new IntersectionObserver(entries=>{
        const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(!visible)return;
        const id=visible.target.id;
        $$('[data-v96-target]',nav).forEach(b=>b.setAttribute('aria-current',String(b.dataset.v96Target===id)));
      },{rootMargin:'-25% 0px -58% 0px',threshold:[.15,.35,.6]});
      [profile,rings,axes,actions].forEach(el=>observer.observe(el));
    }
  }

  function addLabel(section,text){
    if(!section||section.querySelector(':scope > .v96-result-section-label'))return;
    const label=document.createElement('span');
    label.className='v96-result-section-label';
    label.textContent=text;
    section.prepend(label);
  }

  function sync(){
    decorateChapterBreak();
    ensureResultNav();
  }
  function queue(){
    if(queued)return;queued=true;
    requestAnimationFrame(()=>{queued=false;sync()});
  }
  new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-from-chapter']});
  window.addEventListener('load',queue);
  sync();
  window.CARAMELO_V96={refresh:queue};
})();