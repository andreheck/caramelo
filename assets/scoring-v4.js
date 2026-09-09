(() => {
  const data = window.CARAMELO_DATA;
  if (!data) return;

  // Ranking funciona como refinamento, e não como força dominante do resultado.
  data.rankWeights = [1.5, 1.2, 0.9, 0.6, 0.3, 0];

  // Máximo estrutural por eixo considerando os 50 itens implementados e os
  // pesos de ranking acima. Esses valores são referências internas de escala
  // e NÃO correspondem a normas populacionais.
  data.axisStructuralMax = {
    investigativo: 81,
    criativo: 64,
    social: 99,
    empreendedor: 66.5,
    organizador: 74,
    pratico: 69,
    autonomia: 69,
    estabilidade: 52,
    proposito: 54,
    reconhecimento: 44
  };

  // O momento de carreira afeta apenas a interpretação textual.
  data.useMomentBoosts = false;
  data.scoringModel = "structural-normalized-v5";
  data.version = "4.4.0-prototype";
})();
