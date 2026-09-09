(() => {
  const data = window.CARAMELO_DATA;
  if (!data) return;

  // Ranking funciona como refinamento, e não como força dominante do resultado.
  data.rankWeights = [1.5, 1.2, 0.9, 0.6, 0.3, 0];

  // Máximo estrutural por eixo considerando os 28 itens implementados e os
  // pesos de ranking acima. Esses valores são apenas referências internas de
  // escala e NÃO correspondem a normas populacionais.
  data.axisStructuralMax = {
    investigativo: 55,
    criativo: 40,
    social: 56,
    empreendedor: 39.5,
    organizador: 52.5,
    pratico: 51,
    autonomia: 34,
    estabilidade: 24,
    proposito: 24,
    reconhecimento: 17
  };

  // O momento de carreira afeta apenas a interpretação textual.
  data.useMomentBoosts = false;
  data.scoringModel = "structural-normalized-v2";
  data.version = "4.1.0-prototype";
})();
