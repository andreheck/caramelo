(() => {
  const data = window.CARAMELO_DATA;
  if (!data) return;

  // Ranking funciona como refinamento, e não como força dominante do resultado.
  data.rankWeights = [1.5, 1.2, 0.9, 0.6, 0.3, 0];

  // Máximo estrutural por eixo considerando os 42 itens implementados e os
  // pesos de ranking acima. Esses valores são referências internas de escala
  // e NÃO correspondem a normas populacionais.
  data.axisStructuralMax = {
    investigativo: 70,
    criativo: 62,
    social: 87,
    empreendedor: 60,
    organizador: 68,
    pratico: 63,
    autonomia: 53,
    estabilidade: 37,
    proposito: 42,
    reconhecimento: 34
  };

  // O momento de carreira afeta apenas a interpretação textual.
  data.useMomentBoosts = false;
  data.scoringModel = "structural-normalized-v4";
  data.version = "4.3.0-prototype";
})();
