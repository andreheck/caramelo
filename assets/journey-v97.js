(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  let queued=false;
  function centerCurrentRoute(){
    const route=$('#journeyTopSteps');
    const current=$('#journeyTopSteps .journey-top-step.current');
    if(!route||!current)return;
    if(matchMedia('(max-width:900px)').matches){
      const left=current.offsetLeft-route.clientWidth/2+current.clientWidth/2;
      route.scrollTo({left:Math.max(0,left),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }
  }
  function sync(){
    const tracker=$('#journeyTopProgress');
    if(tracker){
      const current=$('#journeyTopSteps .journey-top-step.current');
      if(current)tracker.dataset.currentDay=current.dataset.routeDay||'1';
    }
    centerCurrentRoute();
  }
  function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;sync()})}
  new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-current-day']});
  window.addEventListener('load',queue);
  window.addEventListener('resize',queue,{passive:true});
  sync();
  window.CARAMELO_V97={refresh:queue};
})();