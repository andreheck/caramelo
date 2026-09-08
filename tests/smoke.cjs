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
    for (const axis of Object.keys(item.scores)) {
      assert(D.axisLabels[axis], `${q.id}: eixo desconhecido ${axis}`);
    }
  }
}

const html = fs.readFileSync('index.html', 'utf8');
for (const id of [
  'journey','journeyGrid','journeyXp','journeyLevel','journeyProgress',
  'emotion','emotionHost','emotion-result','emotionScore','emotionBars',
  'life-wheel','wheelHost','life-wheel-result','wheelScore','wheelBars'
]) {
  assert(html.includes(`id="${id}"`), `index.html deve conter #${id}`);
}

assert(html.includes('assets/journey.js'), 'index.html deve carregar assets/journey.js');

const journey = fs.readFileSync('assets/journey.js', 'utf8');
for (const marker of ['DAY_XP','LEVELS','EMOTION_QUESTIONS','WHEEL_AREAS','completeDay']) {
  assert(journey.includes(marker), `journey.js deve conter ${marker}`);
}

console.log(`OK: ${D.questions.length} itens, ${D.profiles.length} perfis e telas-base da jornada validados.`);
