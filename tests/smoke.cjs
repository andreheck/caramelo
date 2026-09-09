const fs=require('fs');
const vm=require('vm');
const assert=require('assert');
function loadScript(path,sandbox){vm.runInContext(fs.readFileSync(path,'utf8'),sandbox,{filename:path})}
const sandbox={window:{}};vm.createContext(sandbox);
['assets/data.js','assets/chapter1-v4.js','assets/chapter2-v4.js','assets/chapter3-v4.js','assets/chapter4-v4.js','assets/chapter5-v4.js','assets/scoring-v4.js'].forEach(p=>loadScript(p,sandbox));
const D=sandbox.window.CARAMELO_DATA;
assert(D);assert.strictEqual(D.questions.length,50);assert.strictEqual(D.profiles.length,7);assert.strictEqual(Object.keys(D.axisLabels).length,10);assert.deepStrictEqual(Array.from(D.rankWeights),[1.5,1.2,0.9,0.6,0.3,0]);assert.strictEqual(D.useMomentBoosts,false);assert.strictEqual(D.scoringModel,'structural-normalized-v5');
const ids=new Set(),byModel={A:0,C:0,D:0},byChapter=[0,0,0,0,0];
for(const q of D.questions){assert(q.id&&!ids.has(q.id));ids.add(q.id);byChapter[q.chapter]++;byModel[q.model]++;const items=q.type==='ranking'?q.items:q.options;for(const item of items)for(const axis of Object.keys(item.scores))assert(D.axisLabels[axis])}
assert.deepStrictEqual(byModel,{A:30,C:15,D:5});assert.deepStrictEqual(byChapter,[10,10,10,10,10]);assert.strictEqual(Object.keys(D.axisStructuralMax||{}).length,10);
const sprite=fs.readFileSync('assets/icons.svg','utf8');for(const q of D.questions)for(const item of(q.type==='ranking'?q.items:q.options))assert(sprite.includes(`id="icon-${item.icon}"`));
const core=fs.readFileSync('assets/vocational-core.js','utf8');assert(core.includes('caramelo:v4:state'));assert(core.includes('axisStructuralMax'));assert(!core.includes('momentBoosts'));
const journey=fs.readFileSync('assets/journey.js','utf8');assert(journey.includes('caramelo:v4:state'));assert(!journey.includes('caramelo:v3:state'));for(let day=1;day<=7;day++)assert(journey.includes(`{day:${day},`));
const day7=fs.readFileSync('assets/day7.js','utf8');assert(day7.includes('CARAMELO_VOCATIONAL'));assert(!day7.includes('momentBoosts'));assert(day7.includes('scoringModel'));
const demo=fs.readFileSync('assets/demo-v4.js','utf8');for(const file of ['assets/journey-ui.css','assets/journey-ui.js','assets/visual-v1.css','assets/result-rings.css','assets/result-rings.js'])assert(demo.includes(file),`${file} deve ser carregado`);
for(const file of ['assets/journey-ui.css','assets/journey-ui.js','assets/visual-v1.css','assets/result-rings.css','assets/result-rings.js'])assert(fs.existsSync(file),`${file} deve existir`);
const rings=fs.readFileSync('assets/result-rings.js','utf8');assert(rings.includes('stroke-dasharray'));assert(rings.includes('aria-valuenow'));assert(rings.includes('resultRingsDay1'));assert(rings.includes('resultRingsFinal'));assert(rings.includes('slice(0,5)'));
const ringCss=fs.readFileSync('assets/result-rings.css','utf8');for(const cls of ['result-rings-watch','result-ring-value','result-rings-legend'])assert(ringCss.includes(cls));assert(ringCss.includes('prefers-reduced-motion'));
const visualCss=fs.readFileSync('assets/visual-v1.css','utf8');for(const token of ['--green','--blue','--yellow','--caramel'])assert(visualCss.includes(token));
console.log(`OK: ${D.questions.length} itens, jornada V4, tema visual V1 e resultado em anéis concêntricos consistentes.`);
