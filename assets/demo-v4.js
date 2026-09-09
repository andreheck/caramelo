(()=>{
  const D=window.CARAMELO_DATA;
  const button=document.querySelector('#demoResultBtn');
  if(!D||!button)return;
  button.onclick=()=>{
    const answers={};
    D.questions.forEach((q,index)=>{
      if(q.type==='ranking') answers[q.id]=q.items.map((_,i)=>i);
      else answers[q.id]=index%q.options.length;
    });
    localStorage.setItem('caramelo:v4:state',JSON.stringify({view:'results',moment:'curso-faculdade',questionIndex:0,answers}));
    location.reload();
  };
})();
