(() => {
  const LABELS = [
    "Mapa vocacional",
    "Momento atual",
    "Roda da vida",
    "Raciocínio",
    "Leitura",
    "Prontidão",
    "Mapa do corre"
  ];
  const VIEW_DAY = {
    onboarding: 1,
    quiz: 1,
    results: 1,
    emotion: 2,
    "emotion-result": 2,
    "life-wheel": 3,
    "life-wheel-result": 3,
    reasoning: 4,
    "reasoning-result": 4,
    reading: 5,
    "reading-result": 5,
    "readiness-intro": 6,
    readiness: 6,
    "readiness-result": 6,
    "final-map": 7
  };
  const HIDDEN_VIEWS = new Set(["landing", "methodology"]);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function journeyState() {
    return window.CARAMELO_JOURNEY?.state || {};
  }

  function firstIncompleteDay() {
    const done = journeyState().completedDays || [];
    for (let day = 1; day <= 7; day += 1) if (!done.includes(day)) return day;
    return 7;
  }

  function activeViewId() {
    return $(".view.active")?.id || "landing";
  }

  function currentDay(view = activeViewId()) {
    if (view === "journey") return firstIncompleteDay();
    return VIEW_DAY[view] || null;
  }

  function ensureTracker() {
    if ($("#journeyTopProgress")) return $("#journeyTopProgress");
    const header = $(".topbar");
    if (!header) return null;
    header.insertAdjacentHTML("afterend", `
      <div class="journey-top-progress" id="journeyTopProgress" aria-live="polite">
        <div class="journey-top-copy">
          <small id="journeyTopKicker">Sua jornada</small>
          <strong id="journeyTopTitle">Dia 1 de 7</strong>
        </div>
        <div class="journey-top-steps" id="journeyTopSteps" aria-label="Progresso da jornada"></div>
      </div>`);
    return $("#journeyTopProgress");
  }

  function render() {
    const tracker = ensureTracker();
    if (!tracker) return;
    const view = activeViewId();
    if (HIDDEN_VIEWS.has(view)) {
      tracker.classList.remove("visible");
      return;
    }
    const day = currentDay(view);
    if (!day) {
      tracker.classList.remove("visible");
      return;
    }
    const completed = journeyState().completedDays || [];
    tracker.classList.add("visible");
    $("#journeyTopKicker").textContent = view === "journey" ? "Próxima etapa" : "Você está aqui";
    $("#journeyTopTitle").textContent = `Dia ${day} de 7 · ${LABELS[day - 1]}`;
    $("#journeyTopSteps").innerHTML = LABELS.map((label, index) => {
      const n = index + 1;
      const done = completed.includes(n) || n < day;
      const current = n === day;
      const cls = done ? "done" : current ? "current" : "future";
      return `<div class="journey-top-step ${cls}" aria-label="Dia ${n}: ${label}${current ? ", etapa atual" : done ? ", concluído" : ""}">
        <span class="journey-top-dot">${done ? "✓" : n}</span>
        <span class="journey-top-label">${label}</span>
      </div>`;
    }).join("");
  }

  let queued = false;
  function queueRender() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      render();
    });
  }

  const observer = new MutationObserver(queueRender);
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });
  document.addEventListener("click", () => setTimeout(queueRender, 0), true);
  window.addEventListener("storage", queueRender);
  render();

  window.CARAMELO_JOURNEY_UI = { render, currentDay };
})();
