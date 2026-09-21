(() => {
  const STAGES = {
    1: { short: 'Mapa vocacional', title: 'Bora se entender', subtitle: 'Seu mapa vocacional inicial', badge: 'assets/journey/day1_badge.webp', caption: 'Explorar com curiosidade e juntar pistas sobre seu jeito de caminhar.' },
    2: { short: 'Momento atual', title: 'Termômetro do momento', subtitle: 'Como você tá por dentro', badge: 'assets/journey/day2_badge.webp', caption: 'Perceber como você está por dentro para escolher com mais cuidado.' },
    3: { short: 'Roda da vida', title: 'Roda da Vida', subtitle: 'Sua vida tá no eixo?', badge: 'assets/journey/day3_badge.webp', caption: 'Olhar para as áreas da vida e enxergar o que pede atenção agora.' },
    4: { short: 'Raciocínio', title: 'Raciocínio', subtitle: 'Como sua cabeça resolve?', badge: 'assets/journey/day4_badge.webp', caption: 'Treinar lógica, atenção e solução de problemas do dia a dia.' },
    5: { short: 'Leitura', title: 'Leitura e contexto', subtitle: 'Você entende o jogo?', badge: 'assets/journey/day5_badge.webp', caption: 'Ler contextos, interpretar sinais e ampliar repertório.' },
    6: { short: 'Preparação', title: 'Preparação', subtitle: 'Você tá pronto pro corre?', badge: 'assets/journey/day6_badge.webp', caption: 'Organizar recursos, estratégia e confiança para os próximos passos.' },
    7: { short: 'Mapa do corre', title: 'Mapa do corre', subtitle: 'Teu mapa do corre', badge: 'assets/journey/day7_badge.webp', caption: 'Juntar a jornada em um plano visual de ação e possibilidades.' }
  };

  const VIEW_DAY = {
    onboarding: 1, quiz: 1, results: 1,
    emotion: 2, 'emotion-result': 2,
    'life-wheel': 3, 'life-wheel-result': 3,
    reasoning: 4, 'reasoning-result': 4,
    'reading-intro': 5, reading: 5, 'reading-result': 5,
    'readiness-intro': 6, readiness: 6, 'readiness-result': 6,
    'final-map-intro': 7, 'final-map': 7
  };

  const RESULT_VIEWS = new Set(['results','emotion-result','life-wheel-result','reasoning-result','reading-result','readiness-result','final-map']);
  const HIDDEN_VIEWS = new Set(['landing','methodology']);
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let refreshQueued = false;

  function journeyState() {
    const state = window.CARAMELO_JOURNEY?.state;
    return state && typeof state === 'object' ? state : { completedDays: [] };
  }

  function completedDays() {
    const days = journeyState().completedDays;
    return Array.isArray(days) ? days : [];
  }

  function firstIncompleteDay() {
    const done = completedDays();
    for (let day = 1; day <= 7; day += 1) if (!done.includes(day)) return day;
    return 7;
  }

  function activeViewId() { return $('.view.active')?.id || 'landing'; }
  function currentDay(view = activeViewId()) { return view === 'journey' ? firstIncompleteDay() : (VIEW_DAY[view] || null); }

  function meterPercent(view) {
    const ids = {
      quiz: 'quizMeter', emotion: 'emotionMeter', 'life-wheel': 'wheelMeter',
      reasoning: 'reasoningMeter', reading: 'readingMeter', readiness: 'readinessMeter'
    };
    const meter = ids[view] ? document.getElementById(ids[view]) : null;
    if (!meter) return null;
    const parsed = Number.parseFloat(meter.style.width || '');
    return Number.isFinite(parsed) ? Math.max(0, Math.min(100, Math.round(parsed))) : null;
  }

  function dayOnePercent() {
    try {
      const answers = window.CARAMELO_VOCATIONAL?.state?.().answers || {};
      const total = window.CARAMELO_DATA?.questions?.length || 50;
      return Math.round(Math.min(Object.keys(answers).length, total) / total * 100);
    } catch { return 0; }
  }

  function stagePercent(view = activeViewId()) {
    if (RESULT_VIEWS.has(view)) return 100;
    if (view === 'onboarding') return 4;
    if (view.endsWith('-intro')) return 6;
    const meter = meterPercent(view);
    if (meter !== null) return meter;
    if (view === 'quiz') return dayOnePercent();
    if (view === 'journey') return Math.round(completedDays().length / 7 * 100);
    return 0;
  }

  function ensureTopTracker() {
    let tracker = $('#journeyTopProgress');
    if (tracker) return tracker;
    const header = $('.topbar');
    if (!header) return null;
    tracker = document.createElement('section');
    tracker.id = 'journeyTopProgress';
    tracker.className = 'journey-top-progress';
    tracker.setAttribute('aria-label', 'Linha do tempo da jornada Caramelo');
    tracker.innerHTML = `<div class="journey-top-copy"><small id="journeyTopKicker">Você está aqui</small><strong id="journeyTopTitle">Dia 1 de 7</strong></div><div class="journey-top-steps" id="journeyTopSteps"></div>`;
    header.insertAdjacentElement('afterend', tracker);
    return tracker;
  }

  function renderTopTracker() {
    const tracker = ensureTopTracker();
    if (!tracker) return;
    const view = activeViewId();
    if (HIDDEN_VIEWS.has(view)) { tracker.classList.remove('visible'); return; }
    const day = currentDay(view);
    if (!day) { tracker.classList.remove('visible'); return; }
    tracker.classList.add('visible');
    const stage = STAGES[day];
    $('#journeyTopKicker').textContent = view === 'journey' ? 'Próxima etapa' : 'Você está aqui';
    $('#journeyTopTitle').textContent = `Dia ${day} de 7 · ${stage.short}`;
    $('#journeyTopSteps').innerHTML = Object.entries(STAGES).map(([key, item]) => {
      const n = Number(key);
      const done = completedDays().includes(n) || n < day;
      const current = n === day;
      const cls = current ? 'current' : done ? 'done' : 'future';
      return `<div class="journey-top-step ${cls}" aria-label="Dia ${n}: ${item.short}${current ? ', etapa atual' : done ? ', concluído' : ''}"><span class="journey-top-dot"><img src="${item.badge}" alt=""></span><span class="journey-top-label">${item.short}</span></div>`;
    }).join('');
  }

  function decorateJourneyCards() {
    $$('.journey-card').forEach(card => {
      const button = $('[data-journey-day]', card);
      const day = Number(button?.dataset.journeyDay);
      const stage = STAGES[day];
      const copy = $('.journey-card-copy', card);
      if (!stage || !copy || $('.journey-card-art', copy)) return;
      const art = document.createElement('div');
      art.className = 'journey-card-art';
      art.innerHTML = `<img class="badge-large" loading="lazy" src="${stage.badge}" alt="Arte da etapa ${day}: ${stage.title}"><span class="caption">${stage.caption}</span>`;
      copy.prepend(art);
    });
  }

  function ensureSideProgress() {
    let widget = $('#carameloSideProgress');
    if (widget) return widget;
    widget = document.createElement('aside');
    widget.id = 'carameloSideProgress';
    widget.setAttribute('aria-label', 'Progresso da etapa atual');
    widget.innerHTML = `<div class="side-progress-compass" aria-hidden="true"><img class="ring" src="assets/journey/compass_ring.webp" alt=""><img class="base" src="assets/journey/compass_base.webp" alt=""><img class="needle" src="assets/journey/compass_needle.webp" alt=""><img class="side-progress-badge" src="assets/journey/day1_badge.webp" alt=""></div><div class="side-progress-copy"><small class="side-progress-kicker">Dia 1 · Mapa vocacional</small><strong class="side-progress-title">Sua direção está em construção</strong><p class="side-progress-text">A bússola se movimenta conforme você avança.</p><div class="side-progress-percent"><span class="side-progress-overall">0 de 7 dias concluídos</span><b class="side-progress-value">0%</b></div><div class="side-progress-track" aria-hidden="true"><span></span></div></div>`;
    document.body.appendChild(widget);
    return widget;
  }

  function updateSideProgress() {
    const widget = ensureSideProgress();
    const view = activeViewId();
    if (HIDDEN_VIEWS.has(view)) { widget.classList.remove('visible'); return; }
    const day = currentDay(view);
    if (!day) { widget.classList.remove('visible'); return; }
    widget.classList.add('visible');
    const stage = STAGES[day];
    const pct = stagePercent(view);
    const angle = -120 + pct * 2.4;
    $('.side-progress-badge', widget).src = stage.badge;
    $('.side-progress-kicker', widget).textContent = `Dia ${day} · ${stage.short}`;
    $('.side-progress-title', widget).textContent = pct >= 100 ? 'Etapa concluída' : stage.title;
    $('.side-progress-text', widget).textContent = stage.caption;
    $('.side-progress-overall', widget).textContent = `${completedDays().length} de 7 dias concluídos`;
    $('.side-progress-value', widget).textContent = `${pct}%`;
    $('.side-progress-track span', widget).style.width = `${pct}%`;
    $('.needle', widget).style.transform = `rotate(${angle}deg)`;
  }

  function refresh() {
    refreshQueued = false;
    renderTopTracker();
    decorateJourneyCards();
    updateSideProgress();
  }

  function scheduleRefresh() {
    if (refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(refresh);
  }

  document.addEventListener('click', () => setTimeout(scheduleRefresh, 0), true);
  document.addEventListener('change', () => setTimeout(scheduleRefresh, 0), true);
  window.addEventListener('load', scheduleRefresh);
  document.addEventListener('DOMContentLoaded', scheduleRefresh);

  const journeyGrid = $('#journeyGrid');
  if (journeyGrid) new MutationObserver(scheduleRefresh).observe(journeyGrid, { childList: true });
  const main = $('#main');
  if (main) new MutationObserver(scheduleRefresh).observe(main, { childList: true, subtree: true });

  scheduleRefresh();
  window.CARAMELO_TIMELINE_ART = { refresh: scheduleRefresh, stages: STAGES };
})();
