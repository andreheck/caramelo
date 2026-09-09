const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function loadData() {
  const code = fs.readFileSync('assets/data.js', 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.CARAMELO_DATA;
}

const D = loadData();
assert(D, 'CARAMELO_DATA deve existir');
assert(Array.isArray(D.questions) && D.questions.length >= 12, 'Deve haver ao menos 12 itens implementados');
assert(Array.isArray(D.profiles) && D.profiles.length === 7, 'Devem existir 7 perfis derivados');
assert(Array.isArray(D.rankWeights) && D.rankWeights.length >= 6, 'Ranking precisa ter pesos definidos');

const ids = new Set();
for (const q of D.questions) {
  assert(q.id && !ids.has(q.id), `ID de questão inválido ou duplicado: ${q.id}`);
  ids.add(q.id);
  assert(Number.isInteger(q.chapter), `${q.id}: chapter deve ser inteiro`);
  assert(q.model, `${q.id}: modelo ausente`);
  assert(['scenario', 'forced', 'ranking'].includes(q.type), `${q.id}: tipo não reconhecido`);
  const items = q.type === 'ranking' ? q.items : q.options;
  assert(Array.isArray(items) && items.length >= 2, `${q.id}: alternativas insuficientes`);
  for (const item of items) {
    assert(item.label, `${q.id}: alternativa sem label`);
    assert(item.icon, `${q.id}: alternativa sem ícone`);
    assert(item.scores && typeof item.scores === 'object', `${q.id}: scores ausentes`);
    for (const axis of Object.keys(item.scores)) assert(D.axisLabels[axis], `${q.id}: eixo desconhecido ${axis}`);
  }
}

const html = fs.readFileSync('index.html', 'utf8');
for (const id of [
  'journey','journeyGrid','journeyXp','journeyLevel','journeyProgress',
  'emotion','emotionHost','emotion-result','emotionScore','emotionBars',
  'life-wheel','wheelHost','life-wheel-result','wheelScore','wheelBars',
  'reasoning','reasoningHost','reasoning-result','reasoningScore','reasoningBars'
]) assert(html.includes(`id="${id}"`), `index.html deve conter #${id}`);

assert(html.includes('assets/journey.js'), 'index.html deve carregar assets/journey.js');
assert(html.includes('assets/reasoning.css'), 'index.html deve carregar assets/reasoning.css');
assert(html.includes('assets/day5.js'), 'index.html deve carregar assets/day5.js');
assert(html.includes('assets/day5.css'), 'index.html deve carregar assets/day5.css');

const journey = fs.readFileSync('assets/journey.js', 'utf8');
for (const marker of ['DAY_XP','LEVELS','EMOTION_QUESTIONS','WHEEL_AREAS','completeDay','REASONING_QUESTIONS','REASONING_DIMENSIONS','calculateReasoning','reasoningResult']) assert(journey.includes(marker), `journey.js deve conter ${marker}`);
for (let i = 1; i <= 8; i++) assert(journey.includes(`id:"r${i}"`), `Dia 4 deve conter o desafio r${i}`);
for (const dimension of ['padroes','atencao','priorizacao','aplicacao']) assert(journey.includes(`${dimension}:`), `Dia 4 deve declarar a dimensão ${dimension}`);
assert(journey.includes('{day:4,title:"Como sua cabeça resolve?",subtitle:"Raciocínio e solução de problemas",icon:"brain",implemented:true}'), 'Dia 4 deve estar habilitado');

const day5 = fs.readFileSync('assets/day5.js', 'utf8');
for (let i = 1; i <= 8; i++) assert(day5.includes(`id:"t${i}"`), `Dia 5 deve conter a situação t${i}`);
for (const dimension of ['literal','inferencia','intencao','instrucao']) assert(day5.includes(`${dimension}:`), `Dia 5 deve declarar a dimensão ${dimension}`);
for (const id of ['reading','readingHost','reading-result','readingScore','readingBars']) assert(day5.includes(`id="${id}"`), `Dia 5 deve injetar #${id}`);
assert(day5.includes('J.completeDay(DAY,XP)'), 'Dia 5 deve concluir a etapa usando XP idempotente da jornada');
assert(day5.includes('window.CARAMELO_DAY5'), 'Dia 5 deve expor seu módulo para integração');
assert(day5.includes("assets/day6.js"), 'Dia 5 deve carregar o módulo do Dia 6');
assert(day5.includes("assets/day6.css"), 'Dia 5 deve carregar o CSS do Dia 6');

const day6 = fs.readFileSync('assets/day6.js', 'utf8');
for (let i = 1; i <= 14; i++) assert(day6.includes(`id:"i${i}"`), `Dia 6 deve conter a situação i${i}`);
for (const dimension of ['preparacao','comunicacao','responsabilidade','adaptabilidade','autoconsciencia','profissionalismo','resolucao']) assert(day6.includes(`${dimension}:`), `Dia 6 deve declarar a dimensão ${dimension}`);
for (const id of ['readiness-intro','readiness','readinessHost','readiness-result','readinessScore','readinessBars','readinessOrbit']) assert(day6.includes(`id="${id}"`), `Dia 6 deve injetar #${id}`);
assert(day6.includes('J.completeDay(DAY,XP)'), 'Dia 6 deve concluir a etapa usando XP idempotente da jornada');
assert(day6.includes('profilePhoto'), 'Dia 6 deve suportar foto opcional local');
assert(day6.includes('canvas.toDataURL'), 'Dia 6 deve reduzir a foto no navegador');
assert(day6.includes('window.CARAMELO_DAY6'), 'Dia 6 deve expor seu módulo para integração');
assert(fs.existsSync('assets/day6.css'), 'Dia 6 deve possuir CSS próprio');

console.log(`OK: ${D.questions.length} itens, ${D.profiles.length} perfis e Dias 1–6 da jornada validados estruturalmente.`);
