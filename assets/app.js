(() => {
  const D = window.CARAMELO_DATA;
  const V = window.CARAMELO_VOCATIONAL;
  if (!D || !V) throw new Error('Núcleo vocacional indisponível.');
  const STORAGE_KEY = V.APP_KEY;
  const DEFAULT = { view: 'landing', moment: 'ensino-medio', questionIndex: 0, answers: {} };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function load() {
    const stored = V.state();
    const answers = {};
    for (const q of D.questions) {
      const answer = stored.answers?.[q.id];
      if (V.validAnswer(q, answer, true)) answers[q.id] = answer;
    }
    const allowedMoments = ['ensino-medio', 'curso-faculdade', 'transicao'];
    // Complementary modules render their own controls when opened from the journey.
    const view = ['landing','onboarding','quiz','results','methodology','journey'].includes(stored.view) ? stored.view : 'journey';
    return { ...DEFAULT, view: stored.view ? view : 'landing', answers,
      moment: allowedMoments.includes(stored.moment) ? stored.moment : DEFAULT.moment,
      questionIndex: Number.isInteger(stored.questionIndex) && stored.questionIndex >= 0 && stored.questionIndex < D.questions.length ? stored.questionIndex : 0 };
  }
  const state = load();
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { toast('Não foi possível salvar neste navegador. Seu progresso pode se perder ao fechar a página.'); } }
  function icon(name) { return `<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`; }
  function toast(message) {
    const element = $('#toast'); if (!element) return;
    element.textContent = message; element.classList.add('show');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => element.classList.remove('show'), 2200);
  }
  function focusTitle() {
    const title = $('.view.active .question-title') || $('.view.active h2') || $('.view.active h1');
    if (title) { title.tabIndex = -1; title.focus({preventScroll:true}); }
  }
  function go(view) {
    if (!document.getElementById(view)?.classList.contains('view')) view = 'landing';
    if (view === 'results' && !V.quizComplete(state.answers)) { view = 'quiz'; state.questionIndex = firstIncomplete(); }
    state.view = view;
    $$('.view').forEach(element => element.classList.toggle('active', element.id === view));
    $$('[data-view-button]').forEach(button => button.setAttribute('aria-current', button.dataset.viewButton === view ? 'page' : 'false'));
    save();
    if (view === 'quiz') renderQuiz();
    if (view === 'results') renderResults();
    if (view === 'journey') window.CARAMELO_JOURNEY?.renderJourney();
    focusTitle(); scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  function syncMoment() {
    $$('#momentGrid .choice-card').forEach(card => { const selected = card.dataset.moment === state.moment; card.classList.toggle('selected', selected); card.setAttribute('aria-pressed', String(selected)); });
  }
  function complete(question) { return V.isComplete(question, state.answers); }
  function firstIncomplete() { const index = D.questions.findIndex(question => !complete(question)); return index < 0 ? 0 : index; }
  function renderChapters() {
    const chapter = D.questions[state.questionIndex].chapter;
    $('#chapterList').innerHTML = D.chapters.map((name,index) => `<div class="chapter-pill ${index === chapter ? 'active' : ''}">${index + 1}. ${name}</div>`).join('');
  }
  function actions() {
    const last = state.questionIndex === D.questions.length - 1;
    return `<div class="question-actions"><button class="btn secondary" id="backQuestionBtn" type="button">${state.questionIndex === 0 ? 'Voltar' : 'Pergunta anterior'}</button><button class="btn" id="nextQuestionBtn" type="button">${last ? 'Ver meu mapa' : 'Próxima pergunta'}</button></div><p class="microcopy">Em escolhas difíceis, pense no que você escolheria quando ninguém está tentando te impressionar.</p>`;
  }
  function renderQuiz() {
    const question = D.questions[state.questionIndex], selected = state.answers[question.id];
    $('#quizProgressText').textContent = `Pergunta ${state.questionIndex + 1} de ${D.questions.length}`;
    $('#quizMeter').style.width = `${Math.round((state.questionIndex + 1) / D.questions.length * 100)}%`; renderChapters();
    let body = `<div class="badges"><span class="badge">Capítulo ${question.chapter + 1}</span><span class="badge">${D.chapters[question.chapter]}</span><span class="badge">Modelo ${question.model}</span></div><h2 class="question-title">${question.title}</h2><p class="question-helper">${question.helper}</p>`;
    if (question.type === 'ranking') {
      const order = Array.isArray(selected) ? selected : [];
      body += `<div class="rank-grid">${question.items.map((item,index) => { const position = order.indexOf(index); return `<button class="rank-card ${position >= 0 ? 'selected' : ''}" data-rank-index="${index}" aria-pressed="${position >= 0}" type="button"><div class="rank-number">${position >= 0 ? position + 1 : '—'}</div><div class="mini-illu">${icon(item.icon)}</div><strong>${item.label}</strong><span>${item.desc}</span></button>`; }).join('')}</div><div class="rank-actions"><button class="btn secondary" id="undoRankBtn" type="button">Desfazer última</button><button class="btn secondary" id="clearRankBtn" type="button">Limpar ranking</button></div>`;
    } else {
      body += `<div class="options-grid">${question.options.map((item,index) => `<button class="option-card ${selected === index ? 'selected' : ''}" data-option-index="${index}" aria-pressed="${selected === index}" type="button"><div class="visual-strip">${icon(item.icon)}</div><strong>${item.label}</strong><span>${item.desc}</span></button>`).join('')}</div>`;
    }
    $('#questionHost').innerHTML = body + actions();
    $$('[data-option-index]').forEach(button => { button.onclick = () => { const index = Number(button.dataset.optionIndex); state.answers[question.id] = index; save(); renderQuiz(); $(`[data-option-index="${index}"]`)?.focus({preventScroll:true}); }; });
    $$('[data-rank-index]').forEach(button => { button.onclick = () => { const index = Number(button.dataset.rankIndex); const answer = Array.isArray(state.answers[question.id]) ? state.answers[question.id] : []; if (!answer.includes(index)) { state.answers[question.id] = [...answer,index]; save(); renderQuiz(); $(`[data-rank-index="${index}"]`)?.focus({preventScroll:true}); } }; });
    const undo = $('#undoRankBtn'), clear = $('#clearRankBtn');
    if (undo) undo.onclick = () => { state.answers[question.id] = (state.answers[question.id] || []).slice(0,-1); save(); renderQuiz(); $('#undoRankBtn').focus({preventScroll:true}); };
    if (clear) clear.onclick = () => { state.answers[question.id] = []; save(); renderQuiz(); $('#clearRankBtn').focus({preventScroll:true}); };
    $('#backQuestionBtn').onclick = previous; $('#nextQuestionBtn').onclick = next;
  }
  function previous() { if (state.questionIndex === 0) return go('onboarding'); state.questionIndex--; save(); renderQuiz(); focusTitle(); scrollTo({top:0}); }
  function next() {
    const question = D.questions[state.questionIndex];
    if (!complete(question)) return toast(question.type === 'ranking' ? 'Complete o ranking para continuar.' : 'Escolha uma alternativa para continuar.');
    if (state.questionIndex < D.questions.length - 1) { state.questionIndex++; save(); renderQuiz(); focusTitle(); scrollTo({top:0}); } else go('results');
  }
  function momentCopy() { return {
    'ensino-medio':'Como você está explorando possibilidades, vale focar em repertório e experiências curtas antes de fechar uma escolha.',
    'curso-faculdade':'Como você está comparando curso ou faculdade, vale transformar preferências em critérios concretos de decisão.',
    'transicao':'Como você está em transição, vale separar o que é cansaço do momento atual do que é desejo real de uma nova área.'
  }[state.moment]; }
  function action(axis, profile) {
    const map = {
      investigativo:'Compare três áreas por rotina, formação, mercado e problemas que resolvem.',
      criativo:'Crie pequenos experimentos de portfólio em áreas que despertaram curiosidade.',
      social:'Converse com profissionais de áreas humanas sobre rotina, limites e impacto.',
      empreendedor:'Observe funções com metas, negociação, liderança e crescimento.',
      organizador:'Monte uma tabela com critérios objetivos de comparação entre caminhos.',
      pratico:'Faça uma experiência curta: oficina, curso, visita ou projeto.',
      autonomia:'Teste uma trilha autodirigida curta e observe como você responde à liberdade.',
      estabilidade:'Pesquise trilhas com previsibilidade, certificações e crescimento claro.',
      proposito:'Mapeie problemas que importam para você e as profissões que atuam neles.',
      reconhecimento:'Investigue áreas em que resultado, visibilidade e crescimento façam parte da trajetória.'
    };
    return [map[axis],`Valide o perfil ${profile.title} com exemplos reais da sua vida.`, 'Escolha uma área de alta curiosidade e outra de dúvida e compare rotinas profissionais reais.', 'Converse com alguém de confiança sobre seu principal ponto de atenção.'];
  }
  function renderResults() {
    const raw = V.rawScores(state.answers), normalized = V.normalizedScores(raw), profiles = V.rankedProfiles(normalized);
    const primary = profiles[0], secondary = profiles[1];
    const axes = Object.entries(normalized).sort((a,b) => b[1] - a[1]).slice(0,6);
    const careers = [...new Set([...primary.careers,...secondary.careers])].slice(0,12);
    const tie = Math.abs(primary.score - secondary.score) <= 1e-12 ? '<br><br>Há empate entre os primeiros perfis. A ordem de apresentação não representa maior afinidade medida.' : '';
    $('#profileName').textContent = primary.title;
    $('#profileSummary').innerHTML = `${primary.summary}<br><br><strong>Perfil secundário:</strong> ${secondary.title}.<br><br>${momentCopy()}${tie}`;
    $('#keyCards').innerHTML = `<div><small>Maior motivador</small><strong>${primary.motivator}</strong></div><div><small>Ambiente favorável</small><strong>${primary.environment}</strong></div><div><small>Ponto de atenção</small><strong>${primary.tension}</strong></div><div><small>Eixo dominante</small><strong>${D.axisLabels[axes[0][0]]}: ${D.axisOneLiners[axes[0][0]]}</strong></div>`;
    $('#axisBars').innerHTML = axes.map(([key,value]) => { const percentage = Math.round(value * 100); return `<div class="bar-row"><span>${D.axisLabels[key]}</span><div class="bar-track" role="progressbar" aria-label="${D.axisLabels[key]}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}"><div class="bar-fill" style="width:${percentage}%"></div></div><span>${percentage}%</span></div>`; }).join('');
    $('#careerChips').innerHTML = careers.map(item => `<span class="chip">${item}</span>`).join('');
    $('#actionPlan').innerHTML = action(axes[0][0],primary).map(item => `<li>${item}</li>`).join('');
  }
  function restart() { Object.assign(state,{...DEFAULT,answers:{}}); try { localStorage.removeItem(STORAGE_KEY); } catch {} syncMoment(); go('landing'); toast('Mapa vocacional reiniciado.'); }
  function seed() {
    state.answers = Object.fromEntries(D.questions.map(question => [question.id, question.type === 'ranking' ? question.items.map((_,index) => index) : 0]));
    state.moment = 'curso-faculdade'; save();
  }
  $$('[data-go]').forEach(button => { button.onclick = event => { event.preventDefault(); go(button.dataset.go); }; });
  $$('[data-view-button]').forEach(button => button.onclick = () => go(button.dataset.viewButton));
  $$('#momentGrid .choice-card').forEach(card => { card.onclick = () => { state.moment = card.dataset.moment; syncMoment(); save(); }; });
  $('#startQuizBtn').onclick = () => { state.questionIndex = firstIncomplete(); go('quiz'); };
  $('#demoResultBtn').onclick = () => { seed(); go('results'); };
  $('#restartBtn').onclick = restart;
  $('#copyResultBtn').onclick = async () => {
    const text = `Meu Mapa Vocacional Caramelo\n\nPerfil: ${$('#profileName').textContent}\n\n${$('#profileSummary').innerText}`;
    try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); toast('Resumo copiado.'); } catch { toast('Não foi possível copiar automaticamente. Selecione o resumo para copiar.'); }
  };
  window.CARAMELO_APP = {go};
  syncMoment(); if (state.view === 'results' && !V.quizComplete(state.answers)) state.view = 'landing';
  go(state.view);
})();
