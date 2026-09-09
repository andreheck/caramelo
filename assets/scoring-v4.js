(() => {
  const data = window.CARAMELO_DATA;
  if (!data) return;

  // Ranking passa a ter papel de refinamento, e não de dominância do resultado.
  data.rankWeights = [1.5, 1.2, 0.9, 0.6, 0.3, 0];

  // Máximo estrutural por eixo considerando os 20 itens implementados e os
  // pesos de ranking acima. Esses valores não são normas populacionais.
  data.axisStructuralMax = {
    investigativo: 38,
    criativo: 26,
    social: 40,
    empreendedor: 20.5,
    organizador: 37,
    pratico: 30,
    autonomia: 25.5,
    estabilidade: 19,
    proposito: 21.5,
    reconhecimento: 13.5
  };

  // O momento de carreira passa a afetar somente a interpretação textual.
  // Os boosts antigos permanecem no arquivo-base apenas por histórico.
  data.useMomentBoosts = false;
  data.scoringModel = "structural-normalized-v1";
  data.version = "4.0.0-prototype";
})();
