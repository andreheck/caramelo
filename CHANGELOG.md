# Changelog

## V4 — Capítulo 3 completo — 8 de setembro de 2026

### Banco de itens
- implementados `q29` a `q35`, fechando o Capítulo 3 — “O que me atrai no mundo”;
- total do protótipo ampliado para **35 itens executáveis**;
- novos itens cobrem atenção espontânea, papel em projeto social, atividade preferida, tipo de transformação desejada, curiosidade sustentada, criação × melhoria e reconhecimento × domínio técnico.

### Diferenciação conceitual
- introduzida distinção mais explícita entre **cuidado direto com pessoas** e **impacto social sistêmico**;
- reforçada separação entre criatividade autoral, execução prática, profundidade técnica e visibilidade profissional;
- `q32` foi desenhado especificamente para ajudar a diferenciar Cuidador Estratégico de Transformador Social sem alterar artificialmente os pesos dos perfis.

### Pontuação
- máximos estruturais recalculados para os 35 itens;
- mantida normalização estrutural dos 10 eixos;
- rankings seguem com pesos `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`;
- momento de carreira permanece fora do cálculo e atua apenas na interpretação.

### Governança
- matriz `data/matriz-itens.csv` atualizada para 35 itens implementados e 15 planejados;
- README e landing sincronizados com o estado atual da aplicação.

## V4 — Capítulo 2 completo — 8 de setembro de 2026

### Banco de itens
- implementados `q21` a `q28`, fechando o Capítulo 2 — “Como resolvo problemas”;
- composição do capítulo: 7 cenários ilustrados, 2 escolhas forçadas e 1 ranking, considerando `q3` e `q4` já existentes;
- total do protótipo ampliado para **28 itens executáveis**;
- novos itens cobrem instruções incompletas, falha de protótipo, conflito de soluções, decisão sob prazo, aprendizagem de ferramenta, coordenação de projeto, precisão × velocidade e critérios de decisão.

### Pontuação
- mantida a normalização estrutural introduzida na auditoria V4;
- máximos estruturais recalculados para os 28 itens;
- ranking continua com pesos `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`;
- `momentBoosts` permanecem fora do cálculo dos eixos;
- simulação preliminar do conjunto de 28 itens não mostrou nova concentração extrema de perfis.

### Design de conteúdo
- evitado uso artificial de Reconhecimento onde o construto não correspondia ao cenário;
- mantido equilíbrio entre investigação, execução, organização, criatividade, socialização e iniciativa;
- `q27` permanece sujeito a revisão empírica de desejabilidade entre precisão e velocidade;
- `q28` deve ser acompanhado na próxima auditoria pelo efeito agregado dos rankings.

## V4 — auditoria e normalização de pontuação — 8 de setembro de 2026

### Auditoria estrutural
- auditados os 20 itens implementados;
- levantadas oportunidades de pontuação e máximos estruturais dos 10 eixos;
- identificada concentração excessiva de perfis no cálculo por escores brutos;
- identificada influência desproporcional dos rankings em Estabilidade e Reconhecimento;
- identificada mudança de perfil em cerca de 7,6% dos casos simulados ao alterar apenas o momento de carreira.

### Correções
- ranking reduzido de `[2.5, 2, 1.5, 1, 0.5, 0]` para `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`;
- `momentBoosts` removidos da pontuação e mantidos apenas como histórico/interpretação;
- eixos passam a ser normalizados pelo máximo estrutural disponível nos itens atuais;
- perfis passam a ser calculados a partir dos eixos normalizados;
- pesos internos de cada perfil são normalizados pela própria soma antes da comparação;
- barras do resultado passam a representar proporção do máximo estrutural do eixo, e não comparação com o maior eixo individual.

### Simulação
- no modelo anterior, Cuidador Estratégico, Construtor Organizado e Explorador Analítico concentravam cerca de 81% dos perfis principais em respostas aleatórias;
- após normalização estrutural, a distribuição simulada ficou significativamente mais espalhada entre os sete perfis;
- registrada alta semelhança estrutural entre Cuidador Estratégico e Transformador Social como pendência para os próximos capítulos.

### Documentação
- criada `docs/auditoria-pontuacao-v4.md` com critérios, resultados, decisões e pendências;
- criada camada `assets/scoring-v4.js` para manter as regras de escala separadas do banco de itens;
- persistência local migra para chave V4 para não misturar estados calculados com regras anteriores.

## V4 — Capítulo 1 completo — 8 de setembro de 2026

### Banco de itens
- implementados `q13` a `q20`, fechando o Capítulo 1 com 10 itens;
- composição atual do capítulo: 7 cenários ilustrados, 2 escolhas forçadas e 1 ranking;
- total do protótipo ampliado de 12 para 20 itens executáveis;
- `q19` marcado para revisão específica de equivalência de desejabilidade;
- `q20` marcado para revisão do efeito do ranking sobre a pontuação.

### Interface e ativos
- os novos itens reutilizam SVGs já existentes no sprite;
- evitada expansão do pack visual antes da revisão de conteúdo;
- landing atualizada para informar 20 itens implementados.

### Governança
- matriz `data/matriz-itens.csv` sincronizada com o estado executável;
- `docs/matriz-itens.md` atualizado para registrar 20 itens implementados e 30 planejados;
- próximo gate definido como auditoria dos máximos teóricos e oportunidades de pontuação por eixo.

## V4 — matriz de itens — 8 de setembro de 2026

### Estrutura do instrumento
- criada matriz versionada com 50 posições de itens;
- preservados os 12 itens implementados na V3;
- adicionadas 38 posições planejadas para expansão;
- distribuição-alvo definida em 30 cenários ilustrados (A), 15 escolhas forçadas (C) e 5 rankings (D);
- 10 itens previstos para cada um dos 5 capítulos;
- cada item passa a registrar foco, eixos, regra de peso, desejabilidade, SVG e status de revisão.

### Governança
- criada fonte tabular em `data/matriz-itens.csv`;
- criada documentação de revisão em `docs/matriz-itens.md`;
- formalizados gates de conteúdo, forced-choice, acessibilidade visual e pontuação;
- definidos estados de revisão para itens planejados e implementados;
- reforçada a separação entre especificação de item, pontuação e interpretação editorial.

## V3 — 8 de setembro de 2026

### Interface
- substituição de emojis por SVGs próprios e semânticos;
- melhorias de acessibilidade e foco;
- barras de resultado explicitamente relativas ao mapa individual;
- continuidade da identidade visual brasileira do Caramelo.

### Lógica
- manutenção dos modelos A (cenário), C (escolha forçada) e D (ranking);
- ranking rebalanceado para pesos `[2.5, 2, 1.5, 1, 0.5, 0]`;
- persistência local do progresso;
- retomada pela primeira pergunta incompleta;
- separação entre eixos, perfis e interpretação do resultado;
- documentação explícita dos ajustes heurísticos por momento de carreira.

### Documentação
- README ampliado;
- documento técnico e funcional;
- documento de metodologia;
- roadmap de produto e pesquisa.

## V2 — protótipo anterior

- primeira consolidação da landing e metodologia;
- introdução dos modelos A/C/D;
- 10 eixos vocacionais;
- 7 perfis derivados;
- mapa de resultado com áreas e plano de ação.

## V1 — exploração inicial

- fluxo mobile-first;
- identidade regional brasileira;
- gamificação e perfis experimentais;
- enigma regional e carreiras editoriais.
