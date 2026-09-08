# Caramelo V3 — Documento técnico e funcional

**Status:** protótipo navegável  
**Versão lógica:** `3.0.0-prototype`  
**Data de consolidação no repositório:** 8 de setembro de 2026

## 1. Objetivo deste documento

Este documento descreve como o Caramelo funciona por dentro: fluxo de telas, estrutura do estado, banco de perguntas, ícones SVG, regras de pontuação, formação dos perfis, geração do resultado, acessibilidade e limitações atuais.

O Caramelo é uma ferramenta de orientação vocacional em fase de protótipo. O resultado é uma hipótese de orientação e não corresponde a diagnóstico psicológico, teste aprovado pelo SATEPSI ou classificação normativa da população.

## 2. Arquitetura atual

A V3 foi organizada em front-end modular:

- `index.html`: estrutura das telas;
- `assets/styles.css`: identidade visual e responsividade;
- `assets/icons.svg`: biblioteca de símbolos SVG;
- `assets/data.js`: eixos, perguntas, pesos e perfis;
- `assets/app.js`: navegação, estado, pontuação, persistência e resultado.

Não existe servidor, banco de dados ou autenticação nesta versão.

## 3. Fluxo da aplicação

1. **Landing:** apresentação do Caramelo e acesso à metodologia.
2. **Metodologia:** explica os modelos A, C e D, referências e limites éticos.
3. **Onboarding:** registra o momento de carreira do usuário.
4. **Quiz:** apresenta 12 itens distribuídos em cinco capítulos.
5. **Resultado:** mostra perfil principal, perfil secundário, eixos, áreas e plano de ação.

A função `go(view)` alterna as telas, atualiza a navegação e chama `renderQuiz()` ou `renderResults()` quando necessário.

## 4. Estado da aplicação

O objeto `state` concentra os dados da sessão:

| Campo | Tipo | Função |
|---|---|---|
| `view` | string | Tela atual: landing, methodology, onboarding, quiz ou results. |
| `moment` | string | Momento de carreira selecionado. |
| `questionIndex` | number | Índice da pergunta atualmente exibida. |
| `answers` | object | Respostas, indexadas pelo ID da pergunta. |

O progresso é salvo em `localStorage` com a chave `caramelo:v3:state`. A função `loadState()` restaura dados válidos; `saveState()` salva após navegação e alterações. A retomada começa pela primeira questão incompleta.

## 5. Biblioteca de ícones SVG

Os emojis foram substituídos por uma biblioteca SVG própria.

- Cada ícone é um `<symbol>` com ID semântico, como `icon-compass`.
- Elementos usam `<svg><use href="assets/icons.svg#icon-compass"></use></svg>`.
- Perguntas guardam apenas o nome semântico, por exemplo `icon: "compass"`.
- Os SVGs são decorativos; a informação permanece no texto visível.

### Como incluir um novo ícone

1. Criar um novo `<symbol id="icon-nome">` em `assets/icons.svg`.
2. Adicionar `icon: "nome"` ao item da pergunta.
3. Manter rótulo e descrição independentes do desenho.
4. Conferir se o símbolo existe antes de publicar.

## 6. Banco de perguntas

O array `questions` guarda os itens. Cada pergunta possui:

- `id`: identificador único;
- `chapter`: capítulo de 0 a 4;
- `type`: `scenario`, `forced` ou `ranking`;
- `model`: A, C ou D;
- `title` e `helper`;
- `options` ou `items`;
- `icon`, `label`, `desc` e `scores` em cada alternativa.

### Modelos usados

| Modelo | Tipo técnico | Função |
|---|---|---|
| A | `scenario` | Cenário ilustrado com alternativas comportamentais. |
| C | `forced` | Escolha forçada entre alternativas positivas. |
| D | `ranking` | Ordenação de prioridades. |

## 7. Eixos avaliados

| Eixo | Interpretação resumida |
|---|---|
| Investigativo | Entender a fundo, pesquisar e analisar. |
| Criativo | Imaginar, expressar e criar caminhos. |
| Social | Cuidar, ensinar, comunicar e aproximar pessoas. |
| Empreendedor | Liderar, influenciar e movimentar oportunidades. |
| Organizador | Planejar, estruturar e dar previsibilidade. |
| Prático-realizador | Resolver, construir e executar. |
| Autonomia | Ter liberdade para decidir e experimentar. |
| Estabilidade | Buscar segurança, rotina e continuidade. |
| Propósito | Sentir impacto e sentido no trabalho. |
| Reconhecimento | Crescer, aparecer e ser valorizado. |

## 8. Regras de pontuação

### 8.1 Cenários e escolha forçada

A pontuação da alternativa selecionada é somada diretamente aos eixos informados em `scores`.

`pontuação do eixo = soma dos pontos recebidos nas respostas`

### 8.2 Ranking

O ranking usa pesos decrescentes por posição:

`RANK_WEIGHTS = [2.5, 2, 1.5, 1, 0.5, 0]`

A contribuição é:

`pontos do item × peso da posição`

O último item recebe peso zero. Essa regra evita que uma única pergunta de ranking domine o resultado.

### 8.3 Ajuste pelo momento de carreira

| Momento | Ajuste |
|---|---|
| Ensino médio | Investigativo +0,5; Social +0,5; Autonomia +0,5 |
| Escolha de curso/faculdade | Organizador +0,7; Estabilidade +0,4; Investigativo +0,4 |
| Transição de área | Autonomia +0,8; Prático +0,5; Propósito +0,4 |

Esses ajustes são heurísticos de protótipo. Não são normas psicométricas e devem ser revisados em estudo posterior.

## 9. Formação dos perfis

Cada perfil contém pesos próprios para alguns eixos. A função `rankProfiles(scores)` calcula:

`pontuação do perfil = soma(pontuação do eixo × peso do eixo no perfil)`

Os perfis são ordenados da maior para a menor pontuação. O primeiro vira perfil principal; o segundo, perfil secundário.

### Perfis atuais

- Explorador Analítico
- Criador Expressivo
- Cuidador Estratégico
- Construtor Organizado
- Comunicador Influente
- Transformador Social
- Realizador Prático

## 10. Geração do resultado

`renderResults()` produz:

1. perfil principal e resumo;
2. perfil secundário;
3. leitura adaptada ao momento de carreira;
4. maior motivador, ambiente favorável e ponto de atenção;
5. seis eixos mais fortes;
6. união das carreiras dos dois perfis, sem duplicação;
7. plano de ação construído pelo eixo dominante.

### Percentuais das barras

As barras são relativas ao maior eixo da própria pessoa:

`percentual = pontuação do eixo ÷ maior pontuação individual × 100`

Elas **não são percentis populacionais**. Um mínimo visual pode ser aplicado apenas a eixos positivos muito baixos; eixos zerados permanecem em 0%.

## 11. Persistência e retomada

- O estado é salvo automaticamente no navegador.
- `firstIncompleteQuestionIndex()` localiza a primeira questão ainda não concluída.
- `restart()` limpa respostas, momento e armazenamento local.
- Resultados incompletos não são restaurados como tela final.

## 12. Acessibilidade implementada

- link “Pular para o conteúdo principal”;
- navegação por teclado e foco visível;
- `aria-current` na navegação;
- `aria-pressed` em opções selecionáveis;
- `aria-live` em mensagens;
- barras com `role="progressbar"`;
- textos independentes dos ícones;
- SVGs decorativos ocultos para leitores de tela;
- layout responsivo.

## 13. Funções principais

| Função | Responsabilidade |
|---|---|
| `go(view)` | Alternar telas e acionar renderizações. |
| `renderQuiz()` | Montar a pergunta atual. |
| `renderRanking()` | Montar e numerar o ranking. |
| `wireOptions()` | Registrar escolha em perguntas A e C. |
| `wireRanking()` | Registrar e desfazer posições no ranking. |
| `calculateScores()` | Consolidar pontuações dos eixos. |
| `rankProfiles()` | Calcular e ordenar perfis. |
| `renderResults()` | Criar o mapa vocacional. |
| `buildActionPlan()` | Gerar ações conforme eixo dominante. |
| `saveState()` / `loadState()` | Persistir e restaurar progresso. |

## 14. Limitações atuais

1. O banco tem apenas 12 itens e serve para demonstrar experiência e lógica.
2. Não há estudos de validade, precisão, consistência interna ou normas.
3. Os pesos foram definidos como hipótese de produto e precisam de revisão técnica.
4. Não há backend, conta de usuário, consentimento ou política de retenção de dados.
5. As carreiras estão vinculadas aos perfis por listas editoriais, sem taxonomia ocupacional externa.
6. Empates entre perfis seguem a ordem original do array.
7. Não existem itens de controle, detecção de resposta aleatória ou análise de tempo.
8. O contexto do momento de carreira usa ajustes heurísticos pequenos.

## 15. Próximas evoluções recomendadas

### Conteúdo e metodologia

- expandir para 40–60 itens;
- equilibrar número de oportunidades de pontuação por eixo;
- revisar desejabilidade das escolhas forçadas;
- criar matriz de especificação por capítulo, eixo e dificuldade;
- realizar análise por especialistas e testes cognitivos com usuários;
- planejar estudos de evidência de validade e precisão.

### Produto e tecnologia

- mover banco de itens para JSON versionado quando o conteúdo estabilizar;
- criar testes automatizados de navegação e cálculo;
- implementar backend e perfil de usuário somente com base legal e consentimento;
- definir governança LGPD e política de exclusão;
- registrar versão do instrumento associada a cada resultado;
- criar painel editorial para perguntas, perfis e carreiras;
- exportar relatório em PDF;
- integrar taxonomias ocupacionais e informações de cursos.

## 16. Alterações consolidadas na V3

- substituição integral dos emojis por SVGs;
- nomes semânticos para os ícones;
- redução e balanceamento do peso do ranking;
- aviso de que as barras são relativas, não normativas;
- acessibilidade das barras aprimorada;
- salvamento local e retomada de progresso;
- reinício com limpeza do armazenamento;
- separação do código em arquivos para facilitar manutenção no GitHub.
