(() => {
  const D = window.CARAMELO_DATA;
  if (!D) return;
  const APP_KEY = "caramelo:v4:state";

  function state() {
    try {
      const value = JSON.parse(localStorage.getItem(APP_KEY) || "null");
      if (!value || typeof value !== "object" || Array.isArray(value)) return {};
      const answers = value.answers;
      return { ...value, answers: answers && typeof answers === "object" && !Array.isArray(answers) ? answers : {} };
    } catch { return {}; }
  }

  function emptyScores() {
    return Object.fromEntries(Object.keys(D.axisLabels || {}).map(key => [key, 0]));
  }

  function validAnswer(question, answer, partial = false) {
    if (question.type !== "ranking") {
      return Number.isInteger(answer) && answer >= 0 && answer < question.options.length;
    }
    return Array.isArray(answer)
      && (partial ? answer.length <= question.items.length : answer.length === question.items.length)
      && new Set(answer).size === answer.length
      && answer.every(index => Number.isInteger(index) && index >= 0 && index < question.items.length);
  }

  function isComplete(question, answers = state().answers || {}) {
    return validAnswer(question, answers?.[question.id]);
  }

  function quizComplete(answers = state().answers || {}) {
    return D.questions.every(question => isComplete(question, answers));
  }

  function rawScores(answers = state().answers || {}) {
    const result = emptyScores();
    const add = (scores, multiplier = 1) => Object.entries(scores || {}).forEach(([key, value]) => {
      if (Object.hasOwn(result, key) && Number.isFinite(value)) result[key] += value * multiplier;
    });
    D.questions.forEach(question => {
      const answer = answers?.[question.id];
      if (!validAnswer(question, answer, true)) return;
      if (question.type === "ranking") {
        answer.forEach((index, position) => add(question.items[index].scores, D.rankWeights[position] || 0));
      } else add(question.options[answer].scores);
    });
    return result;
  }

  function normalizedScores(raw = rawScores()) {
    return Object.fromEntries(Object.keys(D.axisLabels || {}).map(key => {
      const maximum = D.axisStructuralMax?.[key] || 1;
      const value = Number.isFinite(raw?.[key]) ? raw[key] : 0;
      return [key, Math.max(0, Math.min(1, value / maximum))];
    }));
  }

  function rankedProfiles(normalized = normalizedScores()) {
    return D.profiles.map(profile => {
      const entries = Object.entries(profile.weights || {});
      const total = entries.reduce((sum, [, weight]) => sum + weight, 0) || 1;
      const score = entries.reduce((sum, [key, weight]) => sum + (normalized[key] || 0) * weight, 0) / total;
      return { ...profile, score };
    }).sort((a, b) => b.score - a.score);
  }

  function result() {
    const app = state();
    const answers = app.answers || {};
    const raw = rawScores(answers);
    const normalized = normalizedScores(raw);
    const profiles = rankedProfiles(normalized);
    const primary = profiles[0];
    const secondary = profiles[1];
    const axes = Object.entries(normalized).sort((a, b) => b[1] - a[1]).map(([key, value]) => ({
      key, label: D.axisLabels[key] || key, value, pct: Math.round(value * 100)
    }));
    return {
      complete: quizComplete(answers), moment: app.moment || "ensino-medio",
      raw, normalized, axes, profiles, primary, secondary,
      careers: [...new Set([...(primary?.careers || []), ...(secondary?.careers || [])])],
      tiedProfiles: profiles.filter(profile => Math.abs(profile.score - primary.score) <= 1e-12).map(profile => profile.id),
      profileGap: primary && secondary ? primary.score - secondary.score : 0,
      tiePolicy: "stable-profile-order-not-measured-preference",
      scoringModel: D.scoringModel || "structural-normalized-v5", version: D.version
    };
  }

  window.CARAMELO_VOCATIONAL = {
    APP_KEY, state, validAnswer, isComplete, quizComplete,
    rawScores, normalizedScores, rankedProfiles, result
  };
})();
