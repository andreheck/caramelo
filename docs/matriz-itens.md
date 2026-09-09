# Matriz de especificação de itens — Caramelo

## Objetivo

Esta matriz transforma o banco de perguntas do Caramelo em um artefato controlável de produto e pesquisa. Cada item recebe identificação, capítulo, formato, foco conceitual, eixos, regra de peso, revisão de desejabilidade, ativos SVG e status de revisão.

A fonte tabular versionável está em [`data/matriz-itens.csv`](../data/matriz-itens.csv).

> A matriz organiza hipóteses de desenvolvimento. Ela não constitui evidência de validade psicométrica, norma populacional ou aprovação pelo SATEPSI.

## Estado atual

| Indicador | V4 |
|---|---:|
| Total de itens na matriz | 50 |
| Itens implementados | 50 |
| Itens ainda planejados | 0 |
| Capítulos | 5 |
| Itens por capítulo | 10 |
| Modelo A — cenário ilustrado | 30 (60%) |
| Modelo C — escolha forçada | 15 (30%) |
| Modelo D — ranking | 5 (10%) |

Todos os itens estão executáveis no protótipo. **Implementado não significa validado**: o banco ainda precisa de revisão de conteúdo, equivalência de desejabilidade, acessibilidade, piloto e análise empírica.

## Distribuição por capítulo

| Capítulo | A | C | D | Total |
|---|---:|---:|---:|---:|
| Quem sou em movimento | 7 | 2 | 1 | 10 |
| Como resolvo problemas | 7 | 2 | 1 | 10 |
| O que me atrai no mundo | 6 | 3 | 1 | 10 |
| Onde eu funciono melhor | 6 | 3 | 1 | 10 |
| Meu futuro possível | 4 | 5 | 1 | 10 |
| **Total** | **30** | **15** | **5** | **50** |

## Capítulos fechados

### 1. Quem sou em movimento

`q1`, `q2`, `q13–q20`.

Explora entrada em movimento, papel espontâneo, aprendizagem, reação a mudança, manejo de ideias, ajuda, início sob incerteza e fontes de energia para começar.

### 2. Como resolvo problemas

`q3`, `q4`, `q21–q28`.

Explora estratégia diante de desafios, instruções incompletas, falha de solução, conflito, prazo curto, aprendizagem de ferramenta, coordenação, precisão × velocidade e critérios de decisão.

### 3. O que me atrai no mundo

`q5–q7`, `q29–q35`.

Explora atenção espontânea, interesses, atividades preferidas, impacto direto × sistêmico, curiosidade sustentada, criação × melhoria e reconhecimento × domínio técnico.

### 4. Onde eu funciono melhor

`q8–q10`, `q36–q42`.

Explora ambiente, configuração de equipe, liderança, nível de estímulo, forma de meta, previsibilidade × variedade, decisão compartilhada × autonomia e atributos prioritários do ambiente.

### 5. Meu futuro possível

`q11`, `q12`, `q43–q50`.

Explora investigação de curso, expectativas familiares, risco/oportunidade, propósito × estabilidade, reconhecimento × autonomia, especialização × liderança, previsibilidade × experimentação e critérios finais de carreira.

## Campos da matriz

- `id`: identificador estável do item;
- `chapter`: capítulo narrativo;
- `model`: A, C ou D;
- `type`: `scenario`, `forced` ou `ranking`;
- `status`: `implemented` ou `planned`;
- `focus`: situação ou construto principal;
- `primary_axis` e `secondary_axis`: eixos que orientam a construção e revisão;
- `weight_rule`: regra de pontuação;
- `desirability`: controle para pares forced-choice;
- `svg_assets`: ativos visuais usados;
- `svg_status`: estado do ativo;
- `review_status`: gate de revisão atual.

## Regras de pontuação

### Cenários e escolhas forçadas

Cada alternativa adiciona os pontos definidos no item.

### Rankings

Os rankings usam atualmente:

`[1.5, 1.2, 0.9, 0.6, 0.3, 0]`

O objetivo é fazer o ranking funcionar como refinamento, sem dominar os eixos.

### Normalização

Os eixos são normalizados pelo máximo estrutural disponível no banco de 50 itens antes do cálculo dos perfis derivados. Esses máximos são referências internas de escala e **não são normas populacionais**.

## Gates de revisão

### Gate 1 — conteúdo

Verificar se:

- a situação é compreensível para o público-alvo;
- não depende de conhecimento profissional prévio;
- não induz uma resposta moralmente superior;
- não mistura construtos de forma acidental;
- a linguagem funciona nacionalmente.

### Gate 2 — forced-choice

Verificar se:

- ambas as alternativas são plausíveis e positivas;
- comprimento e complexidade são semelhantes;
- nenhuma alternativa parece claramente mais madura ou correta;
- a tensão entre eixos é útil para orientação vocacional.

Os pares marcados `provisional_balanced` continuam dependendo de revisão por especialistas e teste empírico.

### Gate 3 — acessibilidade visual

Verificar se:

- a imagem complementa o texto, mas não é necessária para entendê-lo;
- significado não depende apenas de cor;
- SVG mantém legibilidade em tela pequena;
- nenhuma alternativa recebe vantagem apenas por apelo visual.

### Gate 4 — pontuação

Antes do piloto final, levantar:

- oportunidades de pontuação por eixo;
- máximo estrutural por eixo;
- influência agregada dos cinco rankings;
- dependência de um único item;
- distribuição simulada dos perfis;
- sobreposição entre perfis derivados.

## Governança

1. Não editar silenciosamente um item que já tenha participado de piloto; versionar a mudança.
2. Manter texto exibido e regra de pontuação versionados juntos.
3. Registrar mudanças de peso no `CHANGELOG.md`.
4. Tratar nomes de perfis como camada de comunicação, separada do escore dos eixos.
5. Não converter barras em percentis sem amostra normativa e procedimento documentado.
6. Não alegar aprovação SATEPSI sem processo e parecer correspondentes.
7. Manter experiências reflexivas e módulos complementares do MVP separados do núcleo de 50 itens.

## Próxima etapa

Com o banco fechado, o próximo ciclo deve priorizar:

1. auditoria estrutural final dos 50 itens;
2. revisão dos 15 pares forced-choice;
3. revisão do efeito dos 5 rankings;
4. testes cognitivos com usuários;
5. integração do núcleo vocacional com a jornada de 7 dias do MVP;
6. piloto e análise empírica.
