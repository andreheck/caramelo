(() => {
  const D = window.CARAMELO_DATA;
  if (!D) return;

  const APP_KEY = "caramelo:v4:state";

  function state() {
    try { return JSON.parse(localStorage.getItem(APP_KEY) || "null") || {}; }
    catch { return {}; }
  }

  function emptyScores() {
    return Object.keys(D.axisLabels || {}).reduce((result, key) => {
      result[key] = 0;
      return result;
    }, {});
  }

  function add(target, source, multiplier = 1) {
    Object.entries(source || {}).forEach(([key, value]) => {
      target[key] = (target[key] || 0) + value * multiplier;
    });
  }

  function isComplete(question, answers) {
    const answer = answers?.[question.id];
    return question.type === "ranking"
      ? Array.isArray(answer) && answer.length === question.items.length
      : answer !== undefined && answer !== null;
  }

  function quizComplete() {
    const answers = state().answers || {};
    return D.questions.every(question => isComplete(question, answers));
  }

  function rawScores() {
    const answers = state().answers || {};
    const result = emptyScores();
    D.questions.forEach(question => {
      const answer = answers[question.id];
      if (answer === undefined || answer === null) return;
      if (question.type === "ranking") {
        (answer || []).forEach((itemIndex, position) => {
          add(result, question.items[itemIndex]?.scores, D.rankWeights[position] || 0);
        });
      } else {
        add(result, question.options[answer]?.scores);
      }
    });
    return result;
  }

  function normalizedScores(raw = rawScores()) {
    return Object.keys(D.axisLabels || {}).reduce((result, key) => {
      const structuralMax = D.axisStructuralMax?.[key] || 1;
      result[key] = Math.max(0, Math.min(1, (raw[key] || 0) / structuralMax));
      return result;
    }, {});
  }

  function rankedProfiles(normalized = normalizedScores()) {
    return D.profiles.map(profile => {
      const entries = Object.entries(profile.weights || {});
      const weightTotal = entries.reduce((sum, [, weight]) => sum + weight, 0) || 1;
      const score = entries.reduce((sum, [key, weight]) => sum + (normalized[key] || 0) * weight, 0) / weightTotal;
      return { ...profile, score };
    }).sort((a, b) => b.score - a.score);
  }

  function result() {
    const app = state();
    const raw = rawScores();
    const normalized = normalizedScores(raw);
    const profiles = rankedProfiles(normalized);
    const primary = profiles[0];
    const secondary = profiles[1];
    const axes = Object.entries(normalized)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({
        key,
        label: D.axisLabels[key] || key,
        value,
        pct: Math.round(value * 100)
      }));
    const careers = [...new Set([...(primary?.careers || []), ...(secondary?.careers || [])])];
    return {
      complete: quizComplete(),
      moment: app.moment || "ensino-medio",
      raw,
      normalized,
      axes,
      profiles,
      primary,
      secondary,
      careers,
      scoringModel: D.scoringModel || "structural-normalized-v5",
      version: D.version
    };
  }

  window.CARAMELO_VOCATIONAL = {
    APP_KEY,
    state,
    quizComplete,
    rawScores,
    normalizedScores,
    rankedProfiles,
    result
  };
})();
