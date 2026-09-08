# Changelog

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
