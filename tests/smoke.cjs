const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

function loadScript(path,sandbox){vm.runInContext(fs.readFileSync(path,'utf8'),sandbox,{filename:path})}
const sandbox={window:{}};vm.createContext(sandbox);
['assets/data.js','assets/chapter1-v4.js','assets/chapter2-v4.js','assets/chapter3-v4.js','assets/chapter4-v4.js','assets/chapter5-v4.js','assets/scoring-v4.js'].forEach(p=>loadScript(p,sandbox));
const D=sandbox.window.CARAMELO_DATA;
assert(D,'CARAMELO_DATA deve existir');
assert.strictEqual(D.questions.length,50,'Banco V4 deve ter exatamente 50 itens executáveis');
assert.strictEqual(D.profiles.length,7,'Devem existir 7 perfis derivados');
assert.strictEqual(Object.keys(D.axisLabels).length,10,'Devem existir 10 eixos');
assert.deepStrictEqual(Array.from(D.rankWeights),[1.5,1.2,0.9,0.6,0.3,0],'Pesos de ranking V4 divergentes');
assert.strictEqual(D.useMomentBoosts,false,'Momento de carreira não pode alterar a pontuação');
assert.strictEqual(D.scoringModel,'structural-normalized-v5','Modelo de scoring inesperado');

const ids=new Set();const byModel={A:0,C:0,D:0};const byChapter=[0,0,0,0,0];
for(const q of D.questions){
  assert(q.id&&!ids.has(q.id),`ID inválido ou duplicado: ${q.id}`);ids.add(q.id);
  assert(Number.isInteger(q.chapter)&&q.chapter>=0&&q.chapter<5,`${q.id}: capítulo inválido`);byChapter[q.chapter]++;
  assert(byModel[q.model]!==undefined,`${q.id}: modelo inválido`);byModel[q.model]++;
  assert(['scenario','forced','ranking'].includes(q.type),`${q.id}: tipo inválido`);
  const items=q.type==='ranking'?q.items:q.options;assert(Array.isArray(items)&&items.length>=2,`${q.id}: alternativas insuficientes`);
  for(const item of items){assert(item.label,`${q.id}: label ausente`);assert(item.icon,`${q.id}: ícone ausente`);assert(item.scores&&typeof item.scores==='object',`${q.id}: scores ausentes`);for(const axis of Object.keys(item.scores))assert(D.axisLabels[axis],`${q.id}: eixo desconhecido ${axis}`)}
}
assert.deepStrictEqual(byModel,{A:30,C:15,D:5},'Distribuição A/C/D deve ser 30/15/5');
assert.deepStrictEqual(byChapter,[10,10,10,10,10],'Cada capítulo deve ter 10 itens');
for(const [axis,max] of Object.entries(D.axisStructuralMax||{}))assert(D.axisLabels[axis]&&max>0,`Máximo estrutural inválido em ${axis}`);
assert.strictEqual(Object.keys(D.axisStructuralMax||{}).length,10,'Todos os eixos precisam de máximo estrutural');

const sprite=fs.readFileSync('assets/icons.svg','utf8');
for(const q of D.questions){for(const item of (q.type==='ranking'?q.items:q.options))assert(sprite.includes(`id="icon-${item.icon}"`),`${q.id}: SVG ausente icon-${item.icon}`)}

const html=fs.readFileSync('index.html','utf8');
for(const script of ['chapter1-v4.js','chapter2-v4.js','chapter3-v4.js','chapter4-v4.js','chapter5-v4.js','scoring-v4.js','vocational-core.js','app.js','journey.js','day5.js'])assert(html.includes(`assets/${script}`),`index.html deve carregar ${script}`);
for(const id of ['journey','journeyGrid','emotion','emotion-result','life-wheel','life-wheel-result','reasoning','reasoning-result'])assert(html.includes(`id="${id}"`),`index.html deve conter #${id}`);

const core=fs.readFileSync('assets/vocational-core.js','utf8');
assert(core.includes('caramelo:v4:state'),'vocational-core deve ler estado V4');
assert(core.includes('axisStructuralMax'),'vocational-core deve normalizar por máximo estrutural');
assert(!core.includes('momentBoosts'),'vocational-core não deve aplicar momentBoosts');

const journey=fs.readFileSync('assets/journey.js','utf8');
assert(journey.includes('caramelo:v4:state'),'journey deve ler estado V4');
assert(!journey.includes('caramelo:v3:state'),'journey não pode depender do estado V3');
for(let day=1;day<=7;day++)assert(journey.includes(`{day:${day},`),`Jornada deve declarar Dia ${day}`);
for(const marker of ['EMOTION_QUESTIONS','WHEEL_AREAS','REASONING_QUESTIONS','completeDay'])assert(journey.includes(marker),`journey.js deve conter ${marker}`);

for(const file of ['assets/day5.js','assets/day6.js','assets/day7.js'])assert(fs.existsSync(file),`${file} deve existir`);
const day7=fs.readFileSync('assets/day7.js','utf8');
assert(day7.includes('CARAMELO_VOCATIONAL'),'Dia 7 deve consumir o núcleo vocacional V4');
assert(!day7.includes('momentBoosts'),'Dia 7 não pode reaplicar momentBoosts');
assert(!day7.includes('caramelo:v3:state'),'Dia 7 não pode ler estado V3');
assert(day7.includes('scoringModel'),'Mapa final deve registrar o modelo de scoring usado');

console.log(`OK: ${D.questions.length} itens, ${D.profiles.length} perfis, 5 capítulos e jornada MVP V4 estruturalmente consistente.`);
