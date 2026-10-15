(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const D=window.CARAMELO_DATA;
  const PROFILE_COPY={
    'explorador-analitico':'Pesquisa, analisa e conecta informações.',
    'criador-expressivo':'Cria, comunica e transforma ideias.',
    'cuidador-estrategico':'Acolhe, planeja e faz acontecer.',
    'construtor-organizado':'Estrutura, planeja e realiza com consistência.',
    'comunicador-influente':'Conversa, inspira e mobiliza pessoas.',
    'transformador-social':'Questiona, conecta e cria impacto positivo.',
    'realizador-pratico':'Age, resolve e entrega resultados concretos.'
  };
  const CARD_TOKENS=[
    ['#edf4ff','#2457c5'],['#fff0e8','#ef6d42'],['#eef8f1','#087a43'],['#fff6d9','#6d5a00'],
    ['#f3ebff','#6b3bc5'],['#fff0eb','#d63b2c'],['#e9f8fb','#137a91']
  ];
  const QUESTION_ART=['explorador-analitico','criador-expressivo','cuidador-estrategico','construtor-organizado','comunicador-influente','transformador-social','realizador-pratico'];
  function icon(name){return `<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`}
  function enhanceHero(){
    const copy=$('#landing .hero-copy');if(!copy)return;
    const lead=$('#landing .hero-copy .lead');
    if(lead)lead.textContent='Um teste vocacional para você se conhecer melhor e dar mais sentido às suas escolhas na vida, nos estudos e no trabalho.';
    if(!$('.v9-hero-benefits',copy)){
      const list=document.createElement('div');list.className='v9-hero-benefits';
      list.innerHTML=[
        ['route','7 dias de descobertas'],['lightbulb','Experiência leve e visual'],['compass','Resultados personalizados'],['shield','Gratuito e sem cadastro']
      ].map(([i,t])=>`<div class="v9-hero-benefit">${icon(i)}<span>${t}</span></div>`).join('');
      lead?.insertAdjacentElement('afterend',list);
    }
  }
  function buildProfileShowcase(){
    const landing=$('#landing'),features=$('#landing .section-grid.three');if(!landing||!features||!D?.profiles?.length||$('#v9ProfileShowcase'))return;
    const section=document.createElement('section');section.id='v9ProfileShowcase';section.className='v9-profile-showcase';
    section.innerHTML=`<div class="v9-profile-showcase-head"><div><h2>Os 7 perfis do Caramelo</h2><p>Cada perfil representa uma forma de se relacionar com o mundo, aprender e construir o seu caminho.</p></div></div><div class="v9-profile-rail">${D.profiles.map((p,i)=>{
      const [bg,accent]=CARD_TOKENS[i%CARD_TOKENS.length];
      const artId=p.id==='comunicador-influente'?'transformador-social':p.id;return `<article class="v9-profile-mini" style="--v9-card:${bg};--v9-accent:${accent}"><img loading="lazy" src="assets/profiles/${artId}.webp" alt="Ilustração do perfil ${p.title}"><div class="v9-profile-mini-copy"><strong>${p.title}</strong><span>${PROFILE_COPY[p.id]||p.summary}</span></div></article>`;
    }).join('')}</div>`;
    features.insertAdjacentElement('afterend',section);
  }
  function currentQuestionIndex(){
    const direct=window.CARAMELO_APP?.state?.questionIndex;
    if(Number.isInteger(direct))return direct;
    try{return Number(JSON.parse(localStorage.getItem('caramelo:v4:state')||'{}').questionIndex)||0}catch{return 0}
  }
  function updateQuestionArt(){
    if(!$('#quiz.active'))return;
    const side=$('#quiz .quiz-side');if(!side)return;
    let art=$('#v9QuestionArt',side);
    if(!art){art=document.createElement('div');art.id='v9QuestionArt';art.className='v9-question-art';art.innerHTML='<img alt=""><div class="v9-question-art-copy"><small></small><strong></strong></div>';side.appendChild(art)}
    const index=currentQuestionIndex(),id=QUESTION_ART[index%QUESTION_ART.length],profile=D?.profiles?.find(p=>p.id===id);
    const img=$('img',art),src=`assets/profiles/${id}.webp`;
    if(img.getAttribute('src')!==src){img.style.opacity='.18';setTimeout(()=>{img.src=src;img.alt='Cena ilustrada de exploração vocacional';img.style.opacity='1'},80)}
    $('small',art).textContent=`Pista ${Math.min(index+1,50)} de 50`;
    $('strong',art).textContent='Escolha pelo que combina mais com você.';
  }
  function axisSummary(){
    const bars=$('#axisBars');if(!bars)return'';
    const rows=[...bars.querySelectorAll('.bar-row')].slice(0,6).map(r=>r.outerHTML).join('');
    return `<div class="v9-axis-head"><small>seus resultados</small><strong>Seu mapa em números</strong><p>Os valores mostram a proporção do máximo estrutural disponível em cada eixo.</p></div>${rows}`;
  }
  function installCompassCenter(){
    const center=$('#resultRingsDay1 .result-rings-center');if(!center||center.dataset.v9==='1')return;
    center.dataset.v9='1';
    center.innerHTML='<div class="v9-ring-compass" aria-hidden="true"><img src="assets/journey/compass_base.svg" alt=""><img src="assets/journey/compass_ring.svg" alt=""><img class="v9-needle" src="assets/journey/compass_needle.svg" alt=""></div>';
    const top=$('#axisBars [role="progressbar"]');const pct=Number(top?.getAttribute('aria-valuenow')||50);
    $('.v9-needle',center).style.transform=`rotate(${-35+pct*1.35}deg)`;
  }
  function detailMarkup(){
    const profile=window.CARAMELO_VOCATIONAL?.result?.()?.primary;
    const summary=$('#profileSummary')?.innerHTML||profile?.summary||'';
    const key=$('#keyCards')?.innerHTML||'';
    const axes=$('#axisBars')?.innerHTML||'';
    const careers=$('#careerChips')?.innerHTML||'';
    const plan=$('#actionPlan')?.innerHTML||'';
    return `<div class="v8-dialog-shell"><div class="v8-dialog-head"><div><small class="eyebrow">seu perfil principal</small><h3>${profile?.title||$('#profileName')?.textContent||'Seu perfil'}</h3></div><button class="v8-dialog-close" type="button">Fechar</button></div>
      <div class="v9-detail-tabs" role="tablist" aria-label="Detalhes do perfil">
        <button class="v9-detail-tab" role="tab" aria-selected="true" data-v9-tab="overview">Visão geral</button>
        <button class="v9-detail-tab" role="tab" aria-selected="false" data-v9-tab="traits">Seus traços</button>
        <button class="v9-detail-tab" role="tab" aria-selected="false" data-v9-tab="areas">Áreas de atuação</button>
        <button class="v9-detail-tab" role="tab" aria-selected="false" data-v9-tab="tips">Dicas práticas</button>
      </div>
      <section class="v9-detail-panel" data-v9-panel="overview"><h4>O que aparece com mais força</h4><p>${summary}</p><div class="v9-key-grid">${key}</div></section>
      <section class="v9-detail-panel" data-v9-panel="traits" hidden><h4>Seus eixos em destaque</h4><div>${axes}</div></section>
      <section class="v9-detail-panel" data-v9-panel="areas" hidden><h4>Áreas para investigar</h4><div>${careers}</div></section>
      <section class="v9-detail-panel" data-v9-panel="tips" hidden><h4>Próximos passos práticos</h4><ol>${plan}</ol></section>
    </div>`;
  }
  function bindDetail(dialog){
    dialog.querySelector('.v8-dialog-close')?.addEventListener('click',()=>dialog.close());
    dialog.querySelectorAll('[data-v9-tab]').forEach(btn=>btn.addEventListener('click',()=>{
      dialog.querySelectorAll('[data-v9-tab]').forEach(b=>b.setAttribute('aria-selected',String(b===btn)));
      dialog.querySelectorAll('[data-v9-panel]').forEach(p=>p.hidden=p.dataset.v9Panel!==btn.dataset.v9Tab);
    }));
  }
  function decorateResult(){
    if(!$('#results.active'))return;
    const heading=$('#results-title');if(heading)heading.textContent='Seus resultados';
    const dash=$('#v8ResultDashboard'),profile=$('#profileVisualDay1'),rings=$('#resultRingsDay1');if(!dash||!profile||!rings)return;
    let axis=$('#v9AxisSummary');
    if(!axis){axis=document.createElement('section');axis.id='v9AxisSummary';dash.prepend(axis)}
    axis.innerHTML=axisSummary();
    installCompassCenter();
    const actions=$('#results .actions'),old=$('#v8ResultDetailBtn');
    if(old)old.style.display='none';
    let btn=$('#v9ProfileDetailBtn');
    if(actions&&!btn){btn=document.createElement('button');btn.type='button';btn.className='btn secondary';btn.id='v9ProfileDetailBtn';btn.textContent='Ver perfil completo';actions.prepend(btn)}
    const dialog=$('#v8ResultDetails');
    if(dialog)dialog.dataset.v9Owned='1';
    if(btn&&dialog&&!btn.dataset.v9){btn.dataset.v9='1';btn.addEventListener('click',()=>{dialog.innerHTML=detailMarkup();bindDetail(dialog);dialog.showModal()})}
    $('#results').classList.add('v9-result-ready');
  }
  let queued=false;
  function sync(){
    enhanceHero();buildProfileShowcase();updateQuestionArt();decorateResult();
  }
  function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})}
  const main=$('#main');if(main)new MutationObserver(queue).observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-valuenow']});
  window.addEventListener('load',queue);
  sync();
  window.CARAMELO_V9={refresh:queue};
})();