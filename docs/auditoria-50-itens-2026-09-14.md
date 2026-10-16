# Auditoria estrutural final do banco V4 — 50 itens

Data: 14/09/2026. Esta auditoria substitui, para o banco atual, os resultados numéricos da auditoria histórica de 20 itens. Não é estudo psicométrico, validade, precisão ou normatização.

## Evidência executada

GitHub Actions: execução `34898579126`, job `104158709204`, branch `feat/fechamento-tecnico-v4`, alteração `d78fc0cb7b41a24106d513661801800e29e795ed`. O checkout da integração de teste foi `774657ca5ff60c04ee05f6437b5a2d0cc80e612c`.

- 12 testes de regressão aprovados, zero falhas.
- 50 itens: 30 A, 15 C, 5 D; dez itens em cada capítulo.
- Dez máximos recalculados independentemente, todos iguais aos configurados.
- 100 protocolos comparados com implementação independente da soma de pontos.
- 10.000 protocolos simulados com semente 20260914.
- Nenhum peso de item, ranking ou perfil foi alterado nesta retomada.

## Tetos e contribuição esperada dos rankings

A cobertura conta perguntas com pelo menos uma oportunidade positiva para o eixo. As parcelas esperadas pressupõem alternativas e permutações uniformes e independentes. Os máximos são limites separados por eixo, não um conjunto simultaneamente atingível.

| Eixo | Cobertura em itens | Teto conferido | Parcela esperada dos rankings |
|---|---:|---:|---:|
| Investigativo | 33 | 81 | 16,51% |
| Criativo | 27 | 64 | 21,43% |
| Social | 39 | 99 | 23,81% |
| Empreendedor | 30 | 66,5 | 24,14% |
| Organizador | 37 | 74 | 12,50% |
| Prático-realizador | 26 | 69 | 20,22% |
| Autonomia | 37 | 69 | 22,86% |
| Estabilidade | 28 | 52 | 35,71% |
| Propósito | 29 | 54 | 30,38% |
| Reconhecimento | 25 | 44 | 35,29% |

## Distribuição simulada

| Perfil | Protocolos | Frequência |
|---|---:|---:|
| Explorador Analítico | 1.363 | 13,63% |
| Criador Expressivo | 1.959 | 19,59% |
| Cuidador Estratégico | 581 | 5,81% |
| Construtor Organizado | 2.526 | 25,26% |
| Comunicador Influente | 1.404 | 14,04% |
| Transformador Social | 1.228 | 12,28% |
| Realizador Prático | 939 | 9,39% |

Não são frequências esperadas da população e não justificam forçar os sete perfis a uma distribuição uniforme.

## Sensibilidade e sobreposição

- 170 de 1.000 protocolos mudaram o perfil principal após uma alteração: escolha substituída por outra alternativa ou troca das duas primeiras posições de um ranking. Isso descreve esta simulação, não confiabilidade teste-reteste.
- 2.472 de 10.000 protocolos apresentaram diferença menor que 0,01 entre os dois primeiros escores de perfil. O limiar é descritivo e não é corte psicométrico.
- Nenhum empate numérico na amostra simulada; empates artificiais têm teste específico.
- Similaridade cosseno dos vetores de pesos de Cuidador Estratégico e Transformador Social: 0,88509. Não confundir com correlação empírica de pessoas.

## Decisões

1. Preservar a matemática atual: os tetos conferem e faltam dados de participantes para rever pesos.
2. Manter visível o perfil secundário e evitar interpretação determinista.
3. Tratar empate exato como apresentação estável, nunca como diferença medida.
4. Revisar a contribuição dos rankings em Estabilidade, Reconhecimento e Propósito na etapa metodológica.
5. Testar qualitativamente a diferenciação entre cuidado direto e transformação sistêmica.
6. Usar o núcleo único também no Dia 1; eliminar o cálculo duplicado da interface.

## Reprodução

`node --test tests/quality.cjs`

O comando produz `reports/auditoria-50-itens.json` e `.md`. O workflow preserva esses relatórios por 30 dias. Resultados futuros devem ser identificados pelo commit e fingerprint, sem sobrescrever a interpretação histórica.
