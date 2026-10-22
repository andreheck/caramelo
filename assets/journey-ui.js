(() => {
  const LABELS = [
    "Mapa vocacional",
    "Momento atual",
    "Roda da vida",
    "Raciocínio",
    "Leitura",
    "Preparação",
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
  function trackerMarkup() {
    return `<div class="journey-top-context">
      <div class="journey-top-copy">
        <small id="journeyTopKicker">Etapa atual</small>
        <strong id="journeyTopTitle">Dia 1 · Mapa vocacional</strong>
      </div>
      <span class="journey-top-count" id="journeyTopCount" aria-label="Etapa 1 de 7">1/7</span>
    </div>
    <div class="journey-top-route-wrap">
      <div class="journey-top-steps" id="journeyTopSteps" aria-label="Mapa visual da jornada"></div>
    </div>`;
  }
  function ensureTracker() {
    let tracker = $("#journeyTopProgress");
    if (tracker) {
      if (!tracker.querySelector(".journey-top-context")) {
        tracker.innerHTML = trackerMarkup();
        tracker.className = "journey-top-progress";
        tracker.setAttribute("aria-live","polite");
      }
      return tracker;
    }
    const header = $(".topbar");
    if (!header) return null;
    tracker = document.createElement("aside");
    tracker.className = "journey-top-progress";
    tracker.id = "journeyTopProgress";
    tracker.setAttribute("aria-live","polite");
    tracker.innerHTML = trackerMarkup();
    header.insertAdjacentElement("afterend", tracker);
    return tracker;
  }
  function stepMarkup(label, n, day, completed) {
    const current = n === day;
    const done = completed.includes(n) || n < day;
    const cls = current ? "current" : done ? "done" : "future";
    const status = current ? "etapa atual" : done ? "concluída" : "próxima etapa";
    return `<div class="journey-top-step ${cls}" data-journey-route-day="${n}" aria-label="Dia ${n}: ${label}, ${status}">
      <span class="journey-top-connector" aria-hidden="true"></span>
      <span class="journey-top-node">
        <img src="assets/journey/day${n}_badge.svg" alt="" aria-hidden="true">
        <span class="journey-top-check" aria-hidden="true">✓</span>
      </span>
      <span class="journey-top-label"><small>Dia ${n}</small><strong>${label}</strong></span>
    </div>`;
  }
  function revealCurrentStep(tracker, day) {
    if (tracker.dataset.focusedDay === String(day)) return;
    tracker.dataset.focusedDay = String(day);
    requestAnimationFrame(() => {
      const step = tracker.querySelector(`[data-journey-route-day="${day}"]`);
      const route = $("#journeyTopSteps");
      if (!step || !route || route.scrollWidth <= route.clientWidth + 4) return;
      step.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "nearest",
        inline: "center"
      });
    });
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
    tracker.dataset.currentDay = String(day);
    tracker.classList.toggle("journey-complete", completed.length === 7);
    $("#journeyTopKicker").textContent = view === "journey" ? "Próximo passo" : "Etapa atual";
    $("#journeyTopTitle").textContent = `Dia ${day} · ${LABELS[day - 1]}`;
    $("#journeyTopCount").textContent = `${day}/7`;
    $("#journeyTopCount").setAttribute("aria-label", `Etapa ${day} de 7`);
    $("#journeyTopSteps").innerHTML = LABELS.map((label, index) =>
      stepMarkup(label, index + 1, day, completed)
    ).join("");
    revealCurrentStep(tracker, day);
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

  new MutationObserver(queueRender).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["class"]
  });
  document.addEventListener("click", () => setTimeout(queueRender, 0), true);
  window.addEventListener("storage", queueRender);
  render();
  window.CARAMELO_JOURNEY_UI = { render, currentDay };
})();
