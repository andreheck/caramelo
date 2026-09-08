# Matriz de especificação de itens — Caramelo

## Objetivo

Esta matriz transforma o banco de perguntas do Caramelo em um artefato controlável de produto e pesquisa. Cada item recebe identificação, capítulo, formato, foco conceitual, eixos, regra de peso, revisão de desejabilidade, ativos SVG e status de revisão.

A fonte tabular versionável está em [`data/matriz-itens.csv`](../data/matriz-itens.csv).

> A matriz organiza hipóteses de desenvolvimento. Ela não constitui evidência de validade psicométrica, norma populacional ou aprovação pelo SATEPSI.

## Desenho-alvo

| Indicador | Estado atual / Meta V4 |
|---|---:|
| Total de itens na matriz | 50 |
| Itens implementados | 20 |
| Itens planejados | 30 |
| Capítulos | 5 |
| Itens por capítulo na meta | 10 |
| Modelo A — cenário ilustrado | 30 (60%) |
| Modelo C — escolha forçada | 15 (30%) |
| Modelo D — ranking | 5 (10%) |

O Capítulo 1 está completo com 10 itens implementados. A distribuição-alvo mantém cenários como formato dominante, escolhas forçadas em situações de ambivalência e rankings apenas em pontos de síntese.

## Distribuição por capítulo

| Capítulo | A | C | D | Total |
|---|---:|---:|---:|---:|
| Quem sou em movimento | 7 | 2 | 1 | 10 |
| Como resolvo problemas | 7 | 2 | 1 | 10 |
| O que me atrai no mundo | 6 | 3 | 1 | 10 |
| Onde eu funciono melhor | 6 | 3 | 1 | 10 |
| Meu futuro possível | 4 | 5 | 1 | 10 |
| **Total** | **30** | **15** | **5** | **50** |

## Capítulo 1 — implementado

O capítulo **Quem sou em movimento** agora contém:

- `q1` — reação inicial diante de projeto ambíguo;
- `q2` — segurança × liberdade;
- `q13` — entrada em movimento diante de tarefa longa;
- `q14` — papel espontâneo em grupo novo;
- `q15` — uso espontâneo de tempo livre para aprender;
- `q16` — reação a mudança de plano;
- `q17` — manejo de muitas ideias simultâneas;
- `q18` — resposta a pedido de ajuda em tema dominado;
- `q19` — começar e ajustar × entender antes de avançar;
- `q20` — ranking de fontes de energia para começar.

### Estado de revisão

Os novos itens estão **implementados**, mas ainda não estão liberados como itens validados. Permanecem nos seguintes gates:

- `q13–q18`: revisão de conteúdo e funcionamento;
- `q19`: revisão específica de equivalência de desejabilidade entre as alternativas;
- `q20`: revisão de carga cognitiva e efeito do ranking na pontuação.

Nesta rodada foram reutilizados SVGs já existentes no sprite para evitar introduzir variáveis visuais novas antes da revisão do conteúdo.

## Campos da matriz

### `id`
Identificador estável do item. O ID não deve ser reutilizado depois que um item entrar em piloto.

### `chapter`
Capítulo narrativo em que o item aparece.

### `model`
- `A`: cenário ilustrado;
- `C`: escolha forçada;
- `D`: ranking.

### `type`
Tipo técnico usado pelo front-end: `scenario`, `forced` ou `ranking`.

### `status`
- `implemented`: já existe no banco executável;
- `planned`: especificação criada, ainda não publicada no app.

### `focus`
Construto ou situação que o item pretende explorar.

### `primary_axis` e `secondary_axis`
Eixos que orientam a construção e a revisão. Em cenários multialternativa, podem conter múltiplos eixos porque as opções são deliberadamente simétricas.

### `weight_rule`
- `option_scores`: cada alternativa adiciona os pontos definidos no banco;
- `rankWeights_x_item_scores`: no ranking, o peso da posição multiplica os escores do item.

Pesos atuais de ranking: `[2.5, 2, 1.5, 1, 0.5, 0]`.

### `desirability`
- `provisional_balanced`: o par parece razoavelmente equilibrado, mas ainda requer revisão;
- `pending_match`: alternativas planejadas precisam ser pareadas;
- `not_applicable`: o controle não é o mecanismo principal do formato.

Nenhum par deve ser considerado definitivamente equilibrado apenas por julgamento da equipe.

### `svg_assets`
Ícones que representam as alternativas.

### `svg_status`
- `implemented`: ativo já utilizado;
- `planned`: ativo ainda precisa ser criado ou validado.

### `review_status`
- `content_review`;
- `forced_choice_review`;
- `ranking_review`;
- `item_writing`;
- `forced_choice_design`;
- `ranking_design`.

## Itens ainda planejados

### Capítulo 2 — Como resolvo problemas
- `q21` — instruções incompletas;
- `q22` — protótipo que falhou;
- `q23` — conflito entre soluções;
- `q24` — prazo curto e informação incompleta;
- `q25` — aprendizagem de ferramenta desconhecida;
- `q26` — projeto com muitas partes;
- `q27` — precisão × velocidade;
- `q28` — ranking de critérios para decisão.

### Capítulo 3 — O que me atrai no mundo
- `q29` — conteúdo que captura atenção espontânea;
- `q30` — papel em projeto voluntário;
- `q31` — atividade preferida em oficina aberta;
- `q32` — tipo de transformação que desperta interesse;
- `q33` — curiosidade sustentável ao longo do tempo;
- `q34` — criar do zero × melhorar algo existente;
- `q35` — visibilidade × domínio técnico.

### Capítulo 4 — Onde eu funciono melhor
- `q36` — configuração de equipe;
- `q37` — estilo de liderança favorável;
- `q38` — nível de estímulo e interação;
- `q39` — forma de meta que mobiliza;
- `q40` — rotina estável × agenda variável;
- `q41` — decisão compartilhada × responsabilidade individual;
- `q42` — ranking de atributos do ambiente.

### Capítulo 5 — Meu futuro possível
- `q43` — como investigar um curso ainda incerto;
- `q44` — preferência pessoal × expectativa familiar;
- `q45` — oportunidade com ganhos e perdas relevantes;
- `q46` — sentido × segurança financeira;
- `q47` — status × autonomia;
- `q48` — especialização × liderança;
- `q49` — caminho previsível × trajetória experimental;
- `q50` — ranking final de critérios de carreira.

## Fluxo recomendado de revisão

`planned → redação → revisão de conteúdo → revisão de acessibilidade → revisão visual/SVG → revisão de pontuação → piloto → análise → aprovado para versão`

### Gate 1 — conteúdo
Verificar compreensão, independência de conhecimento profissional prévio, neutralidade de desejabilidade e clareza do construto.

### Gate 2 — escolha forçada
Verificar plausibilidade equivalente, tamanho textual semelhante e ausência de alternativa claramente mais madura, inteligente ou correta.

### Gate 3 — acessibilidade visual
Verificar que a imagem complementa, mas não substitui o texto; que o significado não depende de cor; e que os SVGs funcionam em telas pequenas.

### Gate 4 — pontuação
Levantar oportunidades de pontuação por eixo, máximo teórico por eixo, efeito dos rankings, dependência excessiva de itens individuais e sobreposição entre perfis.

## Regras de governança

1. Não editar silenciosamente um item que já participou de coleta piloto; criar nova versão.
2. Manter texto exibido e regra de pontuação versionados juntos.
3. Registrar alterações de peso no `CHANGELOG.md`.
4. Tratar nomes de perfis como camada de comunicação separada dos escores.
5. Não converter barras internas em percentis sem amostra normativa.
6. Não alegar aprovação SATEPSI sem processo e parecer correspondentes.

## Próxima implementação

Com o Capítulo 1 completo, o próximo ciclo recomendado é **auditar a pontuação dos 20 itens implementados** antes de redigir o Capítulo 2. Essa auditoria deve verificar cobertura e máximos teóricos dos dez eixos e identificar eventuais vieses introduzidos pelo novo ranking `q20`.
