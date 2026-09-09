(()=>{
  const D=window.CARAMELO_DATA;
  const button=document.querySelector('#demoResultBtn');
  if(D&&button){
    button.onclick=()=>{
      const answers={};
      D.questions.forEach((q,index)=>{
        if(q.type==='ranking') answers[q.id]=q.items.map((_,i)=>i);
        else answers[q.id]=index%q.options.length;
      });
      localStorage.setItem('caramelo:v4:state',JSON.stringify({view:'results',moment:'curso-faculdade',questionIndex:0,answers}));
      location.reload();
    };
  }

  ['assets/journey-ui.css','assets/visual-v1.css'].forEach(href=>{
    if(document.querySelector(`link[href="${href}"]`)) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=href;
    document.head.appendChild(link);
  });

  if(!document.querySelector('script[src="assets/journey-ui.js"]')){
    const script=document.createElement('script');
    script.src='assets/journey-ui.js';
    document.body.appendChild(script);
  }
})();
