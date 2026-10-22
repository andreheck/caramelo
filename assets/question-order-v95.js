(()=>{
  const D=window.CARAMELO_DATA;
  if(!D||!Array.isArray(D.questions)||D.questions.length!==50)return;
  const counts=Array.from({length:D.chapters?.length||5},(_,chapter)=>D.questions.filter(q=>q.chapter===chapter).length);
  if(counts.some(count=>count!==10))return;

  const previous=[...D.questions];
  let currentId=null;
  try{
    if(typeof localStorage!=='undefined'){
      const stored=JSON.parse(localStorage.getItem('caramelo:v4:state')||'null');
      if(stored&&Number.isInteger(stored.questionIndex))currentId=previous[stored.questionIndex]?.id||null;
    }
  }catch{}

  const numericId=q=>Number(String(q.id||'').replace(/\D+/g,''))||0;
  D.questions.sort((a,b)=>(a.chapter-b.chapter)||(numericId(a)-numericId(b)));
  D.presentationOrder='chapter-grouped-v95';

  if(currentId){
    const migratedIndex=D.questions.findIndex(q=>q.id===currentId);
    if(migratedIndex>=0){
      try{
        const stored=JSON.parse(localStorage.getItem('caramelo:v4:state')||'null');
        if(stored&&typeof stored==='object'&&stored.questionIndex!==migratedIndex){
          stored.questionIndex=migratedIndex;
          localStorage.setItem('caramelo:v4:state',JSON.stringify(stored));
        }
      }catch{}
    }
  }
})();