# Auditoria de pontuação V4 — Caramelo

Data: 8 de setembro de 2026

## Objetivo

Auditar os 20 itens implementados antes da expansão para os 50 itens previstos. A análise verificou:

- oportunidades de pontuação por eixo;
- máximos estruturais por eixo;
- peso relativo dos rankings;
- efeito dos ajustes por momento de carreira;
- distribuição dos sete perfis em simulações aleatórias;
- sobreposição estrutural entre perfis.

> Esta é uma auditoria matemática do protótipo. Não é análise psicométrica, estudo de validade ou normatização.

## 1. Cobertura dos eixos

Com os 20 itens atuais, cada eixo aparece no seguinte número de oportunidades de pontuação:

| Eixo | Oportunidades |
|---|---:|
| Organizador | 17 |
| Investigativo | 15 |
| Social | 15 |
| Autonomia | 15 |
| Propósito | 13 |
| Criativo | 12 |
| Prático-realizador | 12 |
| Estabilidade | 11 |
| Empreendedor | 9 |
| Reconhecimento | 9 |

Isso mostra que a quantidade de oportunidades não é uniforme. A diferença não é necessariamente um erro, porque cada item pode ter pesos diferentes, mas exige normalização antes de comparar eixos diretamente.

## 2. Máximos estruturais com o ranking anterior

Com pesos de ranking `[2.5, 2, 1.5, 1, 0.5, 0]`, os máximos teóricos eram:

| Eixo | Máximo teórico |
|---|---:|
| Social | 44.0 |
| Investigativo | 40.0 |
| Organizador | 39.0 |
| Prático-realizador | 34.0 |
| Autonomia | 28.5 |
| Criativo | 28.0 |
| Propósito | 24.5 |
| Empreendedor | 23.5 |
| Estabilidade | 23.0 |
| Reconhecimento | 16.5 |

Comparar esses valores brutos diretamente favorecia eixos com teto maior.

## 3. Efeito dos rankings

Os dois rankings atuais tinham influência desproporcional em alguns eixos. Sob respostas aleatórias uniformes, a participação esperada da pontuação vinda dos rankings era aproximadamente:

| Eixo | Parcela esperada vinda dos rankings |
|---|---:|
| Reconhecimento | 53.6% |
| Estabilidade | 52.6% |
| Empreendedor | 45.5% |
| Prático-realizador | 41.7% |
| Propósito | 40.5% |
| Autonomia | 34.1% |
| Social | 33.3% |
| Criativo | 26.3% |
| Organizador | 19.6% |
| Investigativo | 18.5% |

Conclusão: ranking estava funcionando como componente central para alguns eixos, apesar de ter sido concebido como formato de refinamento.

### Correção V4

Os pesos passam para:

`[1.5, 1.2, 0.9, 0.6, 0.3, 0]`

Com isso, a participação esperada dos rankings cai de forma relevante. Exemplos:

- Reconhecimento: de ~53.6% para ~40.9%;
- Estabilidade: de ~52.6% para ~40.0%;
- Empreendedor: de ~45.5% para ~33.3%;
- Prático-realizador: de ~41.7% para ~30.0%;
- Social: de ~33.3% para ~23.1%.

Ainda há peso importante em eixos pouco representados fora dos rankings; isso deve ser revisto conforme novos itens forem adicionados.

## 4. Novos máximos estruturais

Com os novos pesos de ranking, os máximos usados para normalização dos 20 itens passam a ser:

| Eixo | Máximo estrutural V4 |
|---|---:|
| Social | 40.0 |
| Investigativo | 38.0 |
| Organizador | 37.0 |
| Prático-realizador | 30.0 |
| Criativo | 26.0 |
| Autonomia | 25.5 |
| Propósito | 21.5 |
| Empreendedor | 20.5 |
| Estabilidade | 19.0 |
| Reconhecimento | 13.5 |

Cada escore bruto passa a ser dividido pelo máximo estrutural do próprio eixo antes da comparação entre eixos e do cálculo dos perfis.

Essa transformação produz uma escala interna de `0` a `1` por eixo.

## 5. Momento de carreira

Na V3, o momento escolhido no onboarding adicionava pontos diretamente:

- ensino médio;
- escolha de curso/faculdade;
- transição de carreira.

Em simulação com o mesmo padrão de respostas, alterar apenas o momento de carreira mudou o perfil principal em cerca de **7.6%** dos casos.

Isso mistura contexto biográfico com preferência vocacional.

### Correção V4

O momento de carreira deixa de alterar a pontuação.

Ele permanece apenas como camada de interpretação e recomendação. Assim, duas pessoas com respostas idênticas obtêm os mesmos eixos e perfis, mas podem receber próximos passos adaptados ao momento em que estão.

## 6. Distribuição simulada dos perfis

Foram simulados 50 mil conjuntos de respostas aleatórias para observar viés puramente estrutural.

### Modelo anterior — escores brutos

| Perfil | Frequência aproximada como principal |
|---|---:|
| Cuidador Estratégico | 33.7% |
| Construtor Organizado | 25.2% |
| Explorador Analítico | 22.0% |
| Criador Expressivo | 7.2% |
| Comunicador Influente | 5.6% |
| Realizador Prático | 3.4% |
| Transformador Social | 2.9% |

Os três primeiros concentravam cerca de **81%** dos resultados principais em respostas aleatórias, sinalizando forte viés da arquitetura de pontuação.

### Modelo V4 — eixos normalizados

Com normalização por máximo estrutural e pesos de ranking reduzidos, nova simulação de 50 mil respostas produziu aproximadamente:

| Perfil | Frequência aproximada como principal |
|---|---:|
| Construtor Organizado | 21.1% |
| Criador Expressivo | 18.8% |
| Comunicador Influente | 17.2% |
| Transformador Social | 12.8% |
| Explorador Analítico | 11.5% |
| Realizador Prático | 10.1% |
| Cuidador Estratégico | 8.5% |

Essa distribuição não é uma meta normativa e não deve ser forçada a 1/7 para cada perfil. O ganho está em remover a vantagem matemática causada pelos diferentes tetos dos eixos.

## 7. Sensibilidade a uma resposta

Em simulação, alterar uma única resposta aleatória mudou o perfil principal em aproximadamente um quarto dos casos próximos de fronteiras entre perfis.

Isso não deve ser interpretado automaticamente como defeito: quando dois perfis têm afinidades semelhantes, pequenas mudanças podem trocar a ordem. Porém, reforça a importância de:

- mostrar perfil secundário;
- comunicar combinações, não rótulos absolutos;
- futuramente exibir grau de proximidade entre perfis;
- evitar afirmações deterministas.

## 8. Sobreposição entre perfis

Foi comparada a semelhança entre os vetores de peso dos sete perfis.

O alerta principal foi:

**Cuidador Estratégico × Transformador Social: similaridade estrutural muito alta (~0.89).**

Ambos dependem fortemente de `social` e `proposito`, apenas invertendo parcialmente a ênfase.

Outras combinações ficaram significativamente mais distantes.

### Decisão V4

Não alterar esses perfis ainda.

Antes, os próximos capítulos devem introduzir itens capazes de distinguir melhor:

- cuidado/interação direta com pessoas;
- propósito coletivo/sistêmico;
- desenvolvimento humano individual;
- atuação em causas, políticas, sustentabilidade ou transformação social ampla.

Após 30–40 itens, repetir a auditoria para decidir se os perfis permanecem separados ou se precisam de redesenho.

## 9. Arquitetura adotada

A V4 passa a usar:

`respostas → escores brutos por eixo → normalização estrutural por eixo → combinação ponderada de perfis → interpretação`

O perfil é tratado como camada interpretativa derivada dos eixos.

O momento de carreira atua somente depois do cálculo, na personalização da recomendação.

## 10. Mudanças implementadas

- ranking reduzido para `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`;
- máximos estruturais documentados para os 20 itens atuais;
- retirada dos `momentBoosts` do cálculo;
- cálculo de perfil baseado em eixos normalizados;
- pesos do perfil normalizados pela soma de seus próprios pesos;
- barras de resultado passam a representar proporção do máximo estrutural do eixo;
- onboarding deixa explícito que momento de carreira não altera a pontuação;
- armazenamento local passa para chave V4 para evitar misturar estados antigos com a nova lógica.

## 11. Pendências antes do Capítulo 2

1. revisar qualitativamente o par forced-choice `q19`;
2. observar se `q20` continua excessivamente influente após dados reais de piloto;
3. usar os próximos itens para aumentar cobertura de Empreendedor e Reconhecimento sem depender de rankings;
4. criar contrastes que diferenciem Cuidador Estratégico de Transformador Social;
5. recalcular máximos estruturais sempre que um novo capítulo for implementado;
6. repetir simulação após 30, 40 e 50 itens;
7. substituir máximos estruturais por procedimento de escala mais estável caso o instrumento evolua para estudos psicométricos formais.
