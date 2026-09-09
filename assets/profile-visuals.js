(()=>{
  const D=window.CARAMELO_DATA;
  if(!D)return;

  const META={
    'explorador-analitico':{icon:'search',kicker:'curiosidade que vira caminho',tags:['investigação','autonomia','profundidade']},
    'criador-expressivo':{icon:'palette',kicker:'ideias que ganham forma',tags:['criação','autoria','experimentação']},
    'cuidador-estrategico':{icon:'hand-heart',kicker:'cuidado com direção',tags:['escuta','desenvolvimento','vínculo']},
    'construtor-organizado':{icon:'bricks',kicker:'estrutura que faz acontecer',tags:['método','consistência','execução']},
    'comunicador-influente':{icon:'megaphone',kicker:'conexões que movimentam',tags:['influência','comunicação','iniciativa']},
    'transformador-social':{icon:'globe',kicker:'impacto que se espalha',tags:['propósito','comunidade','mobilização']},
    'realizador-pratico':{icon:'wrench',kicker:'ideia que vira solução',tags:['ação','técnica','resultado']}
  };

  const $=(s,r=document)=>r.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const icon=name=>`<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`;

  function profileByTitle(title){return D.profiles.find(p=>p.title===title)||null}

  function markup(profile,{compact=false}={}){
    if(!profile)return'';
    const meta=META[profile.id]||{icon:'compass',kicker:'seu jeito de caminhar',tags:[]};
    const src=`assets/profiles/${profile.id}.webp`;
    return `<section class="profile-visual ${compact?'profile-visual-compact':''}" data-profile="${esc(profile.id)}" aria-label="Representação visual do perfil ${esc(profile.title)}">
      <div class="profile-visual-art">
        <div class="profile-visual-pattern" aria-hidden="true"></div>
        <div class="profile-visual-orbit" aria-hidden="true"></div>
        <div class="profile-visual-symbol" aria-hidden="true">${icon(meta.icon)}</div>
        <img class="profile-visual-image" src="${src}" alt="Cena editorial representando o perfil ${esc(profile.title)}" loading="lazy">
      </div>
      <div class="profile-visual-copy">
        <span class="profile-visual-kicker">${esc(meta.kicker)}</span>
        <h3>${esc(profile.title)}</h3>
        <p>${esc(profile.summary)}</p>
        <div class="profile-visual-tags">${meta.tags.map(tag=>`<span class="profile-visual-tag">${esc(tag)}</span>`).join('')}</div>
      </div>
    </section>`;
  }

  function wireImages(root=document){
    root.querySelectorAll('.profile-visual-image').forEach(img=>{
      const container=img.closest('.profile-visual');
      img.addEventListener('load',()=>container?.classList.add('has-image'),{once:true});
      img.addEventListener('error',()=>{img.remove();container?.classList.remove('has-image')},{once:true});
      if(img.complete&&img.naturalWidth)container?.classList.add('has-image');
    });
  }

  function renderDay1(){
    const name=$('#profileName')?.textContent?.trim();
    const profile=profileByTitle(name);
    const card=$('#results .profile-card');
    if(!profile||!card)return;
    let host=$('#profileVisualDay1');
    if(!host){host=document.createElement('div');host.id='profileVisualDay1';card.insertAdjacentElement('afterend',host)}
    host.innerHTML=markup(profile);
    wireImages(host);
  }

  function renderDay7(){
    const title=$('#finalProfile')?.textContent?.trim();
    const profile=profileByTitle(title);
    const card=$('#final-map .final-profile-card');
    if(!profile||!card)return;
    let host=$('#profileVisualDay7');
    if(!host){host=document.createElement('div');host.id='profileVisualDay7';card.insertAdjacentElement('afterend',host)}
    host.innerHTML=markup(profile,{compact:true});
    wireImages(host);
  }

  function render(){renderDay1();renderDay7()}
  let queued=false;
  const queue=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;render()})};
  new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',()=>setTimeout(queue,0),true);
  render();

  window.CARAMELO_PROFILE_VISUALS={META,markup,render};
})();
