'use strict';
// Real bank, isolated browser globals, deterministic audit. No external packages.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');
const crypto = require('node:crypto');
const sources = ['data','chapter1-v4','chapter2-v4','chapter3-v4','chapter4-v4','chapter5-v4','scoring-v4','vocational-core'].map(name => `assets/${name}.js`);
let stored = '{}';
const context = vm.createContext({window:{}, localStorage:{getItem:()=>stored}});
for(const path of sources) vm.runInContext(fs.readFileSync(path,'utf8'),context,{filename:path});
const D = context.window.CARAMELO_DATA, C = context.window.CARAMELO_VOCATIONAL;
const axes = Object.keys(D.axisLabels);
const plain = value => JSON.parse(JSON.stringify(value));
const blank = () => Object.fromEntries(axes.map(axis=>[axis,0]));
const completeAnswers = () => Object.fromEntries(D.questions.map(q=>[q.id,q.type==='ranking'?Array.from(q.items,(_,i)=>i):0]));
const put = (answers,moment='ensino-medio') => { stored=JSON.stringify({answers,moment}); };
let seed = 20260914;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
function randomAnswer(q){
  if(q.type!=='ranking')return Math.floor(random()*q.options.length);
  const order=Array.from(q.items,(_,i)=>i);
  for(let i=order.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
  return order;
}
function reference(answers){
  const raw=blank();
  for(const q of D.questions){
    const a=answers[q.id];
    const choices=q.type==='ranking'?a.map((i,p)=>[q.items[i],D.rankWeights[p]]):[[q.options[a],1]];
    for(const [item,weight] of choices)for(const axis of axes)raw[axis]+=(item.scores[axis]||0)*weight;
  }
  return raw;
}
const calculated=blank(), rankMax=blank(), expected=blank(), rankExpected=blank(), coverage=blank();
for(const q of D.questions){
  const items=q.type==='ranking'?q.items:q.options;
  for(const axis of axes){
    const values=items.map(item=>item.scores[axis]||0);
    if(values.some(v=>v>0))coverage[axis]++;
    if(q.type==='ranking'){
      const maximum=[...values].sort((a,b)=>b-a).reduce((sum,v,i)=>sum+v*(D.rankWeights[i]||0),0);
      const mean=values.reduce((a,b)=>a+b,0)/values.length*D.rankWeights.slice(0,values.length).reduce((a,b)=>a+b,0);
      calculated[axis]+=maximum;rankMax[axis]+=maximum;expected[axis]+=mean;rankExpected[axis]+=mean;
    } else {
      calculated[axis]+=Math.max(...values);
      expected[axis]+=values.reduce((a,b)=>a+b,0)/values.length;
    }
  }
}
const samples=10000, frequency=Object.fromEntries(D.profiles.map(p=>[p.id,0]));
let ties=0, changed=0, near=0;
for(let sample=0;sample<samples;sample++){
  const answers=Object.fromEntries(D.questions.map(q=>[q.id,randomAnswer(q)]));
  put(answers);
  const result=C.result();
  frequency[result.primary.id]++;
  if(result.tiedProfiles.length>1)ties++;
  if(result.profileGap<0.01)near++;
  if(sample<1000){
    const q=D.questions[Math.floor(random()*D.questions.length)];
    if(q.type==='ranking') [answers[q.id][0],answers[q.id][1]]=[answers[q.id][1],answers[q.id][0]];
    else answers[q.id]=(answers[q.id]+1+Math.floor(random()*(q.options.length-1)))%q.options.length;
    put(answers);
    if(C.result().primary.id!==result.primary.id)changed++;
  }
}
const cosine=(a,b)=>{
  const dot=axes.reduce((s,k)=>s+(a[k]||0)*(b[k]||0),0);
  const norm=x=>Math.sqrt(axes.reduce((s,k)=>s+(x[k]||0)**2,0));
  return dot/(norm(a)*norm(b));
};
const pairs=[];
D.profiles.forEach((a,i)=>D.profiles.slice(i+1).forEach(b=>pairs.push({a:a.id,b:b.id,cosine:cosine(a.weights,b.weights)})));
pairs.sort((a,b)=>b.cosine-a.cosine);
const report={
  instrumentVersion:D.version, scoringModel:D.scoringModel, seed:20260914,samples,
  sourceSHA:process.env.GITHUB_SHA||'local',
  dataFingerprint:crypto.createHash('sha256').update(sources.slice(0,-1).map(p=>fs.readFileSync(p,'utf8')).join('\n')).digest('hex'),
  items:D.questions.length, distribution:Object.fromEntries(['A','C','D'].map(m=>[m,D.questions.filter(q=>q.model===m).length])),
  axes:axes.map(axis=>({axis,label:D.axisLabels[axis],coverage:coverage[axis],configured:D.axisStructuralMax[axis],calculated:calculated[axis],difference:calculated[axis]-D.axisStructuralMax[axis],rankingMaximumShare:rankMax[axis]/calculated[axis],rankingExpectedShare:rankExpected[axis]/expected[axis]})),
  frequency, exactTies:ties,gapBelowOnePoint:near,
  sensitivity:{changed,samples:1000,rule:'one uniformly selected item; choices changed to a different alternative; rankings swap first two positions'},
  profileSimilarities:pairs,
  limitations:'Uniform independent simulated answers are not users, prevalence, psychometric validity, precision or a target uniform distribution. Coverage counts items with any positive opportunity. Axis maxima are separate upper bounds, not jointly achievable. Tie order is presentation-only.'
};
fs.mkdirSync('reports',{recursive:true});
fs.writeFileSync('reports/auditoria-50-itens.json',JSON.stringify(report,null,2)+'\n');
const md=['# Auditoria estrutural dos 50 itens','',`Modelo: ${D.scoringModel}. Semente: 20260914. Simulacoes: ${samples}.`,
'', '| Eixo | Itens com oportunidade | Teto calculado | Teto configurado | Ranking: parcela esperada |',
'|---|---:|---:|---:|---:|',...report.axes.map(a=>`| ${a.label} | ${a.coverage} | ${a.calculated.toFixed(2)} | ${a.configured.toFixed(2)} | ${(a.rankingExpectedShare*100).toFixed(2)}% |`),
'', '## Perfis em respostas aleatorias','',...Object.entries(frequency).map(([id,n])=>`- ${id}: ${n}/${samples} (${(n/samples*100).toFixed(2)}%).`),
'',`Mudanca de perfil apos uma alteracao: ${changed}/1000. Empates numericos: ${ties}.`,
'', '## Limites','',report.limitations,'','Os arquivos JSON detalham as premissas, pesos de rankings, proximidade de perfis e identificacao da fonte.'];
fs.writeFileSync('reports/auditoria-50-itens.md',md.join('\n')+'\n');
console.log('AUDIT_RESULT '+JSON.stringify(report));

test('50 items; model distribution; five chapters',()=>{
  assert.equal(D.questions.length,50);
  assert.deepEqual(plain(report.distribution),{A:30,C:15,D:5});
  assert.deepEqual([0,1,2,3,4].map(ch=>D.questions.filter(q=>q.chapter===ch).length),[10,10,10,10,10]);
});
test('all 10 structural maxima are recomputed independently',()=>{
  for(const axis of axes)assert.ok(Math.abs(calculated[axis]-D.axisStructuralMax[axis])<1e-9,`${axis}: calculated ${calculated[axis]}, configured ${D.axisStructuralMax[axis]}`);
});
test('independent scoring agrees on 100 complete protocols',()=>{
  for(let i=0;i<100;i++){
    const answers=Object.fromEntries(D.questions.map(q=>[q.id,randomAnswer(q)]));put(answers);
    const result=C.result(),raw=reference(answers);assert.equal(result.complete,true);
    for(const axis of axes){assert.ok(Math.abs(result.raw[axis]-raw[axis])<1e-9);assert.ok(Math.abs(result.normalized[axis]-raw[axis]/calculated[axis])<1e-9);}
  }
});
test('biographical moment never changes scores or profiles',()=>{
  const answers=completeAnswers();put(answers);const first=C.result();
  for(const moment of ['curso-faculdade','transicao']){put(answers,moment);const other=C.result();assert.deepEqual(plain(other.raw),plain(first.raw));assert.deepEqual(plain(other.profiles),plain(first.profiles));}
});
test('missing answers do not complete the instrument',()=>{put({});assert.equal(C.quizComplete(),false);const answers=completeAnswers();delete answers[D.questions[0].id];put(answers);assert.equal(C.quizComplete(),false);});
test('invalid choice indexes and coerced types are rejected',()=>{
  const q=D.questions.find(q=>q.type!=='ranking');
  for(const invalid of [-1,q.options.length,0.5,'0',{},[],true,null]){const answers=completeAnswers();answers[q.id]=invalid;put(answers);assert.equal(C.quizComplete(),false);assert.doesNotThrow(()=>C.result());}
});
test('rankings must be complete permutations',()=>{
  const q=D.questions.find(q=>q.type==='ranking');
  for(const invalid of [Array(q.items.length).fill(0),[0],Array.from(q.items,(_,i)=>i+1),'123456',{},null]){
    const answers=completeAnswers();answers[q.id]=invalid;put(answers);assert.equal(C.quizComplete(),false);assert.doesNotThrow(()=>C.result());
  }
});
test('valid partial rankings are safe but not complete',()=>{
  const q=D.questions.find(q=>q.type==='ranking');put({[q.id]:[0,1]});assert.equal(C.quizComplete(),false);
  const raw=C.rawScores();for(const axis of axes)assert.ok(Number.isFinite(raw[axis]));
});
test('corrupted or non-object persistence safely falls back',()=>{
  for(const value of ['{broken','null','42','true','[]','{"answers":null}','{"answers":[]}']){stored=value;assert.doesNotThrow(()=>C.result());assert.equal(C.quizComplete(),false);}
});
test('exact ties have an explicit stable presentation policy',()=>{
  put({});const result=C.result();assert.equal(result.tiedProfiles.length,D.profiles.length);
  assert.equal(result.tiePolicy,'stable-profile-order-not-measured-preference');
  assert.deepEqual(plain(result.profiles.map(p=>p.id)),plain(D.profiles.map(p=>p.id)));
});
test('unknown question IDs do not contribute',()=>{
  const answers=completeAnswers();put(answers);const raw=C.rawScores();answers.unknown=1000;put(answers);assert.deepEqual(plain(C.rawScores()),plain(raw));
});
test('all item scores and profile weights reference known axes',()=>{
  for(const q of D.questions)for(const item of(q.type==='ranking'?q.items:q.options))for(const [axis,value] of Object.entries(item.scores)){assert.ok(axes.includes(axis));assert.ok(Number.isFinite(value)&&value>=0);}
  for(const p of D.profiles)for(const [axis,weight] of Object.entries(p.weights)){assert.ok(axes.includes(axis));assert.ok(Number.isFinite(weight)&&weight>=0);}
});
