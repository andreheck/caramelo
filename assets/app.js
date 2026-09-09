(() => {
  const D = window.CARAMELO_DATA;
  const STORAGE_KEY = "caramelo:v4:state";
  const DEFAULT = { view: "landing", moment: "ensino-medio", questionIndex: 0, answers: {} };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function load() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return stored && typeof stored === "object"
        ? { ...DEFAULT, ...stored, answers: stored.answers || {} }
        : { ...DEFAULT, answers: {} };
    } catch {
      return { ...DEFAULT, answers: {} };
    }
  }

  const state = load();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function icon(name) {
    return `<svg aria-hidden="true"><use href="assets/icons.svg#icon-${name}"></use></svg>`;
  }

  function toast(message) {
    const element = $("#toast");
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove("show"), 2000);
  }

  function go(view) {
    state.view = view;
    $$(".view").forEach(element => element.classList.toggle("active", element.id === view));
    $$('[data-view-button]').forEach(button => {
      button.setAttribute("aria-current", button.dataset.viewButton === view ? "page" : "false");
    });
    if (view === "quiz") renderQuiz();
    if (view === "results") renderResults();
    save();
    scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncMoment() {
    $$("#momentGrid .choice-card").forEach(card => {
      const selected = card.dataset.moment === state.moment;
      card.classList.toggle("selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    });
  }

  function complete(question) {
    const answer = state.answers[question.id];
    return question.type === "ranking"
      ? Array.isArray(answer) && answer.length === question.items.length
      : answer !== undefined && answer !== null;
  }

  function firstIncomplete() {
    const index = D.questions.findIndex(question => !complete(question));
    return index < 0 ? 0 : index;
  }

  function renderChapters() {
    const chapter = D.questions[state.questionIndex].chapter;
    $("#chapterList").innerHTML = D.chapters
      .map((name, index) => `<div class="chapter-pill ${index === chapter ? "active" : ""}">${index + 1}. ${name}</div>`)
      .join("");
  }

  function actions() {
    const last = state.questionIndex === D.questions.length - 1;
    return `<div class="question-actions">
      <button class="btn secondary" id="backQuestionBtn" type="button">${state.questionIndex === 0 ? "Voltar" : "Pergunta anterior"}</button>
      <button class="btn" id="nextQuestionBtn" type="button">${last ? "Ver meu mapa" : "Próxima pergunta"}</button>
    </div>
    <p class="microcopy">Em escolhas difíceis, pense no que você escolheria quando ninguém está tentando te impressionar.</p>`;
  }

  function renderQuiz() {
    const question = D.questions[state.questionIndex];
    const selected = state.answers[question.id];

    $("#quizProgressText").textContent = `Pergunta ${state.questionIndex + 1} de ${D.questions.length}`;
    $("#quizMeter").style.width = `${Math.round(((state.questionIndex + 1) / D.questions.length) * 100)}%`;
    renderChapters();

    let body = `<div class="badges">
      <span class="badge">Capítulo ${question.chapter + 1}</span>
      <span class="badge">${D.chapters[question.chapter]}</span>
      <span class="badge">Modelo ${question.model}</span>
    </div>
    <h2 class="question-title">${question.title}</h2>
    <p class="question-helper">${question.helper}</p>`;

    if (question.type === "ranking") {
      const order = Array.isArray(selected) ? selected : [];
      body += `<div class="rank-grid">${question.items.map((item, index) => {
        const position = order.indexOf(index);
        return `<button class="rank-card ${position >= 0 ? "selected" : ""}" data-rank-index="${index}" type="button">
          <div class="rank-number">${position >= 0 ? position + 1 : "—"}</div>
          <div class="mini-illu">${icon(item.icon)}</div>
          <strong>${item.label}</strong><span>${item.desc}</span>
        </button>`;
      }).join("")}</div>
      <div class="rank-actions">
        <button class="btn secondary" id="undoRankBtn" type="button">Desfazer última</button>
        <button class="btn secondary" id="clearRankBtn" type="button">Limpar ranking</button>
      </div>`;
    } else {
      body += `<div class="options-grid">${question.options.map((item, index) => `
        <button class="option-card ${selected === index ? "selected" : ""}" data-option-index="${index}" aria-pressed="${selected === index}" type="button">
          <div class="visual-strip">${icon(item.icon)}</div>
          <strong>${item.label}</strong><span>${item.desc}</span>
        </button>`).join("")}</div>`;
    }

    $("#questionHost").innerHTML = body + actions();

    $$('[data-option-index]').forEach(button => {
      button.onclick = () => {
        state.answers[question.id] = Number(button.dataset.optionIndex);
        save();
        renderQuiz();
      };
    });

    $$('[data-rank-index]').forEach(button => {
      button.onclick = () => {
        const index = Number(button.dataset.rankIndex);
        const answer = Array.isArray(state.answers[question.id]) ? state.answers[question.id] : [];
        if (!answer.includes(index)) {
          state.answers[question.id] = [...answer, index];
          save();
          renderQuiz();
        }
      };
    });

    const undo = $("#undoRankBtn");
    const clear = $("#clearRankBtn");
    if (undo) undo.onclick = () => {
      state.answers[question.id] = (state.answers[question.id] || []).slice(0, -1);
      save();
      renderQuiz();
    };
    if (clear) clear.onclick = () => {
      state.answers[question.id] = [];
      save();
      renderQuiz();
    };

    $("#backQuestionBtn").onclick = previous;
    $("#nextQuestionBtn").onclick = next;
  }

  function previous() {
    if (state.questionIndex === 0) return go("onboarding");
    state.questionIndex -= 1;
    save();
    renderQuiz();
    scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    const question = D.questions[state.questionIndex];
    if (!complete(question)) {
      toast(question.type === "ranking" ? "Complete o ranking para continuar." : "Escolha uma alternativa para continuar.");
      return;
    }
    if (state.questionIndex < D.questions.length - 1) {
      state.questionIndex += 1;
      save();
      renderQuiz();
      scrollTo({ top: 0, behavior: "smooth" });
    } else {
      go("results");
    }
  }

  function emptyScores() {
    return Object.keys(D.axisLabels).reduce((result, key) => {
      result[key] = 0;
      return result;
    }, {});
  }

  function add(target, source, multiplier = 1) {
    Object.entries(source || {}).forEach(([key, value]) => {
      target[key] = (target[key] || 0) + value * multiplier;
    });
  }

  function rawScores() {
    const result = emptyScores();
    D.questions.forEach(question => {
      const answer = state.answers[question.id];
      if (answer === undefined || answer === null) return;
      if (question.type === "ranking") {
        (answer || []).forEach((itemIndex, position) => {
          add(result, question.items[itemIndex].scores, D.rankWeights[position] || 0);
        });
      } else {
        add(result, question.options[answer].scores);
      }
    });
    return result;
  }

  function normalizedScores(raw) {
    return Object.keys(D.axisLabels).reduce((result, key) => {
      const structuralMax = D.axisStructuralMax?.[key] || 1;
      result[key] = Math.max(0, Math.min(1, (raw[key] || 0) / structuralMax));
      return result;
    }, {});
  }

  function rankedProfiles(normalized) {
    return D.profiles.map(profile => {
      const entries = Object.entries(profile.weights);
      const weightTotal = entries.reduce((sum, [, weight]) => sum + weight, 0) || 1;
      const score = entries.reduce((sum, [key, weight]) => sum + (normalized[key] || 0) * weight, 0) / weightTotal;
      return { ...profile, score };
    }).sort((a, b) => b.score - a.score);
  }

  function momentCopy() {
    return {
      "ensino-medio": "Como você está explorando possibilidades, vale focar em repertório e experiências curtas antes de fechar uma escolha.",
      "curso-faculdade": "Como você está comparando curso ou faculdade, vale transformar preferências em critérios concretos de decisão.",
      "transicao": "Como você está em transição, vale separar o que é cansaço do momento atual do que é desejo real de uma nova área."
    }[state.moment];
  }

  function action(axis, profile) {
    const map = {
      investigativo: "Compare três áreas por rotina, formação, mercado e problemas que resolvem.",
      criativo: "Crie pequenos experimentos de portfólio em áreas que despertaram curiosidade.",
      social: "Converse com profissionais de áreas humanas sobre rotina, limites e impacto.",
      empreendedor: "Observe funções com metas, negociação, liderança e crescimento.",
      organizador: "Monte uma tabela com critérios objetivos de comparação entre caminhos.",
      pratico: "Faça uma experiência curta: oficina, curso, visita ou projeto.",
      autonomia: "Teste uma trilha autodirigida curta e observe como você responde à liberdade.",
      estabilidade: "Pesquise trilhas com previsibilidade, certificações e crescimento claro.",
      proposito: "Mapeie problemas que importam para você e as profissões que atuam neles.",
      reconhecimento: "Investigue áreas em que resultado, visibilidade e crescimento façam parte da trajetória."
    };
    return [
      map[axis],
      `Valide o perfil ${profile.title} com exemplos reais da sua vida.`,
      "Escolha uma área de alta curiosidade e outra de dúvida e compare rotinas profissionais reais.",
      "Converse com alguém de confiança sobre seu principal ponto de atenção."
    ];
  }

  function renderResults() {
    const raw = rawScores();
    const normalized = normalizedScores(raw);
    const profiles = rankedProfiles(normalized);
    const primary = profiles[0];
    const secondary = profiles[1];
    const axes = Object.entries(normalized).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const careers = [...new Set([...primary.careers, ...secondary.careers])].slice(0, 12);

    $("#profileName").textContent = primary.title;
    $("#profileSummary").innerHTML = `${primary.summary}<br><br><strong>Perfil secundário:</strong> ${secondary.title}.<br><br>${momentCopy()}`;
    $("#keyCards").innerHTML = `
      <div><small>Maior motivador</small><strong>${primary.motivator}</strong></div>
      <div><small>Ambiente favorável</small><strong>${primary.environment}</strong></div>
      <div><small>Ponto de atenção</small><strong>${primary.tension}</strong></div>
      <div><small>Eixo dominante</small><strong>${D.axisLabels[axes[0][0]]}: ${D.axisOneLiners[axes[0][0]]}</strong></div>`;

    $("#axisBars").innerHTML = axes.map(([key, value]) => {
      const percentage = Math.round(value * 100);
      return `<div class="bar-row">
        <span>${D.axisLabels[key]}</span>
        <div class="bar-track" role="progressbar" aria-label="${D.axisLabels[key]}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage}">
          <div class="bar-fill" style="width:${percentage}%"></div>
        </div>
        <span>${percentage}%</span>
      </div>`;
    }).join("");

    $("#careerChips").innerHTML = careers.map(item => `<span class="chip">${item}</span>`).join("");
    $("#actionPlan").innerHTML = action(axes[0][0], primary).map(item => `<li>${item}</li>`).join("");
  }

  function restart() {
    Object.assign(state, { view: "landing", moment: "ensino-medio", questionIndex: 0, answers: {} });
    localStorage.removeItem(STORAGE_KEY);
    syncMoment();
    go("landing");
    toast("Jornada reiniciada.");
  }

  function seed() {
    state.answers = {
      q1: 1, q2: 1,
      q13: 2, q14: 0, q15: 1, q16: 0, q17: 1, q18: 1, q19: 0,
      q20: [0, 1, 5, 4, 2, 3],
      q3: 0, q4: 1, q5: 1, q6: 0,
      q7: [0, 2, 4, 1, 5, 3],
      q8: 1, q9: 1, q10: 1, q11: 1, q12: 2
    };
    state.moment = "curso-faculdade";
    save();
  }

  $$('[data-go]').forEach(button => {
    button.onclick = event => {
      event.preventDefault();
      go(button.dataset.go);
    };
  });
  $$('[data-view-button]').forEach(button => button.onclick = () => go(button.dataset.viewButton));
  $$("#momentGrid .choice-card").forEach(card => {
    card.onclick = () => {
      state.moment = card.dataset.moment;
      syncMoment();
      save();
    };
  });

  $("#startQuizBtn").onclick = () => {
    state.questionIndex = firstIncomplete();
    go("quiz");
  };
  $("#demoResultBtn").onclick = () => {
    seed();
    go("results");
  };
  $("#restartBtn").onclick = restart;
  $("#copyResultBtn").onclick = () => {
    const text = `Meu Mapa Vocacional Caramelo\n\nPerfil: ${$("#profileName").textContent}\n\n${$("#profileSummary").innerText}`;
    navigator.clipboard?.writeText(text)
      .then(() => toast("Resumo copiado."))
      .catch(() => toast("Não foi possível copiar automaticamente."));
  };

  syncMoment();
  if (state.view === "results" && !D.questions.every(complete)) state.view = "landing";
  go(state.view || "landing");
})();
