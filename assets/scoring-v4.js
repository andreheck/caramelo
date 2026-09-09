(() => {
  const data = window.CARAMELO_DATA;
  if (!data) return;

  // Ranking funciona como refinamento, e não como força dominante do resultado.
  data.rankWeights = [1.5, 1.2, 0.9, 0.6, 0.3, 0];

  // Máximo estrutural por eixo considerando os 35 itens implementados e os
  // pesos de ranking acima. Esses valores são referências internas de escala
  // e NÃO correspondem a normas populacionais.
  data.axisStructuralMax = {
    investigativo: 67,
    criativo: 55,
    social: 71,
    empreendedor: 48.5,
    organizador: 58.5,
    pratico: 62,
    autonomia: 36,
    estabilidade: 26,
    proposito: 32,
    reconhecimento: 23
  };

  // O momento de carreira afeta apenas a interpretação textual.
  data.useMomentBoosts = false;
  data.scoringModel = "structural-normalized-v3";
  data.version = "4.2.0-prototype";
})();
