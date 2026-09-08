# Matriz de especificação de itens — Caramelo

## Objetivo

Esta matriz transforma o banco de perguntas do Caramelo em um artefato controlável de produto e pesquisa. Cada item recebe identificação, capítulo, formato, foco conceitual, eixos, regra de peso, revisão de desejabilidade, ativos SVG e status de revisão.

A fonte tabular versionável está em [`data/matriz-itens.csv`](../data/matriz-itens.csv).

> A matriz organiza hipóteses de desenvolvimento. Ela não constitui evidência de validade psicométrica, norma populacional ou aprovação pelo SATEPSI.

## Desenho-alvo

| Indicador | Meta V4 |
|---|---:|
| Total de itens | 50 |
| Itens implementados na V3 | 12 |
| Itens planejados | 38 |
| Capítulos | 5 |
| Itens por capítulo | 10 |
| Modelo A — cenário ilustrado | 30 (60%) |
| Modelo C — escolha forçada | 15 (30%) |
| Modelo D — ranking | 5 (10%) |

A distribuição respeita a faixa definida para a experiência: cenários como formato dominante, escolhas forçadas em situações de ambivalência e rankings apenas em pontos de síntese.

## Distribuição por capítulo

| Capítulo | A | C | D | Total |
|---|---:|---:|---:|---:|
| Quem sou em movimento | 7 | 2 | 1 | 10 |
| Como resolvo problemas | 7 | 2 | 1 | 10 |
| O que me atrai no mundo | 6 | 3 | 1 | 10 |
| Onde eu funciono melhor | 6 | 3 | 1 | 10 |
| Meu futuro possível | 4 | 5 | 1 | 10 |
| **Total** | **30** | **15** | **5** | **50** |

O último capítulo recebe mais escolhas forçadas porque concentra tensões de decisão como propósito × estabilidade, reconhecimento × autonomia e especialização × liderança.

## Campos da matriz

### `id`

Identificador estável do item. Os itens existentes mantêm `q1` a `q12`; os novos usam `q13` a `q50`. O ID não deve ser reutilizado depois que um item entrar em piloto.

### `chapter`

Capítulo narrativo em que o item aparece.

### `model`

- `A`: cenário ilustrado;
- `C`: escolha forçada;
- `D`: ranking.

### `type`

Tipo técnico usado pelo front-end: `scenario`, `forced` ou `ranking`.

### `status`

- `implemented`: já existe no banco atual;
- `planned`: especificação criada, ainda não publicada no app.

### `focus`

Construto ou situação que o item pretende explorar. O foco deve ser descrito antes da redação final para evitar perguntas que parecem boas visualmente, mas não têm função clara no modelo.

### `primary_axis` e `secondary_axis`

Eixos que orientam a construção e a revisão. Em cenários multialternativa, o campo pode conter mais de um eixo porque as opções são deliberadamente simétricas.

Esses campos não substituem a pontuação real de cada alternativa.

### `weight_rule`

- `option_scores`: cada alternativa adiciona os pontos definidos no banco;
- `rankWeights_x_item_scores`: no ranking, o peso da posição multiplica os escores do item.

Pesos atuais de ranking: `[2.5, 2, 1.5, 1, 0.5, 0]`.

### `desirability`

Controle específico para escolhas forçadas:

- `provisional_balanced`: par atual parece razoavelmente equilibrado, mas ainda requer revisão;
- `pending_match`: alternativas planejadas precisam ser pareadas quanto à desejabilidade;
- `not_applicable`: o controle não é o mecanismo principal daquele formato.

Nenhum par deve ser considerado definitivamente equilibrado apenas por julgamento da equipe. O ideal é revisar com especialistas e testar empiricamente.

### `svg_assets`

Ícones que representam as alternativas. Para itens existentes, são os nomes atuais do sprite. Para itens planejados, funcionam como especificação do pack visual a criar.

### `svg_status`

- `implemented`: ativo já usado pelo app;
- `planned`: ícone/ilustração precisa ser criado ou validado no sprite.

### `review_status`

Etapa atual do item:

- `content_review`: item implementado aguardando revisão sistemática;
- `forced_choice_review`: par existente a revisar quanto à equivalência de desejabilidade;
- `ranking_review`: ranking existente a revisar quanto à carga cognitiva e cobertura;
- `item_writing`: foco definido, redação final ainda pendente;
- `forced_choice_design`: contraste definido, alternativas finais ainda pendentes;
- `ranking_design`: dimensões definidas, cards finais ainda pendentes.

## Os 38 novos itens planejados

### Capítulo 1 — Quem sou em movimento

- `q13` — o que coloca a pessoa em movimento diante de tarefa longa;
- `q14` — papel espontâneo em grupo novo;
- `q15` — uso de tempo livre para aprender;
- `q16` — reação a mudança de plano;
- `q17` — manejo de muitas ideias simultâneas;
- `q18` — resposta a pedido de ajuda;
- `q19` — começar e ajustar × esperar mais clareza;
- `q20` — ranking de fontes de energia para iniciar.

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

Cada novo item deve passar pelos seguintes estados:

`planned → redação → revisão de conteúdo → revisão de acessibilidade → revisão visual/SVG → revisão de pontuação → piloto → análise → aprovado para versão`

### Gate 1 — conteúdo

Verificar se:

- a situação é compreensível para o público-alvo;
- não depende de conhecimento profissional prévio;
- não induz uma resposta moralmente superior;
- não mistura dois construtos de forma acidental;
- não usa linguagem regional que impeça compreensão nacional.

### Gate 2 — escolha forçada

Nos itens C, verificar se:

- ambas as alternativas são plausíveis e positivas;
- o tamanho e complexidade textual são semelhantes;
- nenhuma alternativa parece claramente “mais madura”, “mais inteligente” ou “mais correta”;
- os eixos realmente representam uma tensão útil para orientação vocacional.

### Gate 3 — acessibilidade visual

Verificar se:

- a imagem complementa o texto, mas não é necessária para entendê-lo;
- todos os ícones possuem rótulo semântico;
- significado não depende apenas de cor;
- o SVG mantém legibilidade em telas pequenas;
- alternativas visualmente atraentes não recebem vantagem indevida.

### Gate 4 — pontuação

Antes do piloto, levantar:

- quantas oportunidades de pontuação cada eixo recebe;
- pontuação máxima teórica por eixo;
- efeito dos rankings sobre a variância total;
- dependência excessiva de um único item;
- sobreposição entre perfis derivados.

## Regras de governança

1. Nunca editar silenciosamente um item que já participou de coleta piloto; criar nova versão do item.
2. Manter texto exibido e regra de pontuação versionados juntos.
3. Registrar alteração de peso no `CHANGELOG.md`.
4. Tratar nomes de perfis como camada de comunicação, separada do escore dos eixos.
5. Não converter barras internas em percentis sem amostra normativa e procedimento documentado.
6. Não alegar aprovação SATEPSI sem processo e parecer correspondentes.

## Próxima implementação

A matriz está pronta para orientar o próximo ciclo. A recomendação é implementar os itens em lotes de 10, um capítulo de cada vez, iniciando pelo Capítulo 1. Antes de expor os novos itens aos usuários, deve ser criado o pack SVG correspondente e feita uma revisão das oportunidades de pontuação por eixo.
