(()=>{
  const COLORS=['result-ring-0','result-ring-1','result-ring-2','result-ring-3','result-ring-4'];
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];

  function readBars(container){
    if(!container)return[];
    return $$('.bar-row',container).map(row=>{
      const bar=$('[role="progressbar"]',row);
      const label=row.firstElementChild?.textContent?.trim()||bar?.getAttribute('aria-label')||'Eixo';
      const value=Number(bar?.getAttribute('aria-valuenow')||0);
      return {label,value:Math.max(0,Math.min(100,value))};
    }).filter(item=>Number.isFinite(item.value)).slice(0,5);
  }

  function ringSvg(items){
    const center=160;
    const radii=[130,108,86,64,42];
    return `<svg class="result-rings-svg" viewBox="0 0 320 320" role="img" aria-label="Anéis concêntricos dos principais eixos">
      ${items.map((item,index)=>{
        const r=radii[index];
        const c=2*Math.PI*r;
        const offset=c*(1-item.value/100);
        return `<circle class="result-ring-track" cx="${center}" cy="${center}" r="${r}"></circle>
          <circle class="result-ring-value ${COLORS[index]}" cx="${center}" cy="${center}" r="${r}" transform="rotate(-90 160 160)" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"></circle>`;
      }).join('')}
    </svg>`;
  }

  function card(items,title,profile,context){
    if(!items.length)return'';
    const legend=items.map(item=>`<div class="result-ring-legend-item"><span class="result-ring-swatch" aria-hidden="true"></span><span>${item.label}</span><strong>${item.value}%</strong></div>`).join('');
    return `<section class="result-rings-card" data-ring-context="${context}">
      <div class="result-rings-layout">
        <div class="result-rings-watch">
          ${ringSvg(items)}
          <div class="result-rings-center"><small>seu mapa</small><strong>${profile||'Caramelo'}</strong></div>
        </div>
        <div class="result-rings-copy">
          <span class="eyebrow">leitura visual</span>
          <h3>${title}</h3>
          <p>Os anéis mostram os eixos que apareceram com mais força na sua combinação de respostas.</p>
          <div class="result-rings-legend">${legend}</div>
          <p class="result-rings-note">Os valores representam proporção do máximo estrutural disponível em cada eixo. Não são percentis populacionais nem uma comparação com outras pessoas.</p>
        </div>
      </div>
    </section>`;
  }

  function signature(items,profile){return `${profile}|${items.map(i=>`${i.label}:${i.value}`).join('|')}`}

  function renderDay1(){
    const bars=$('#axisBars');
    if(!bars)return;
    const items=readBars(bars);
    if(!items.length)return;
    const profile=$('#profileName')?.textContent?.trim()||'Seu perfil';
    const sig=signature(items,profile);
    let holder=$('#resultRingsDay1');
    if(!holder){
      holder=document.createElement('div');
      holder.id='resultRingsDay1';
      bars.insertAdjacentElement('beforebegin',holder);
    }
    if(holder.dataset.signature===sig)return;
    holder.dataset.signature=sig;
    holder.innerHTML=card(items,'Seu mapa em movimento',profile,'day1');
  }

  function renderFinal(){
    const bars=$('#finalAxes');
    if(!bars)return;
    const items=readBars(bars);
    if(!items.length)return;
    const profile=$('#finalProfile')?.textContent?.trim()||'Seu perfil';
    const sig=signature(items,profile);
    let holder=$('#resultRingsFinal');
    if(!holder){
      holder=document.createElement('div');
      holder.id='resultRingsFinal';
      const panel=bars.closest('.panel');
      if(panel) panel.insertAdjacentElement('beforebegin',holder);
      else bars.insertAdjacentElement('beforebegin',holder);
    }
    if(holder.dataset.signature===sig)return;
    holder.dataset.signature=sig;
    holder.innerHTML=card(items,'O desenho principal da sua jornada',profile,'final');
  }

  let queued=false;
  function render(){renderDay1();renderFinal()}
  function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;render()})}
  new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-valuenow']});
  document.addEventListener('click',()=>setTimeout(queue,0),true);
  render();
  window.CARAMELO_RESULT_RINGS={render};
})();
