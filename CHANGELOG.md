# Changelog

## MVP — Mobile UX V1 — 10 de setembro de 2026

### Auditoria responsiva
- criada `assets/mobile-v1.css` como camada específica para telas de até 620px, com ajuste adicional abaixo de 380px;
- foco principal em uso entre 390px e 430px, preservando o desktop existente;
- incluído suporte a safe areas via `env(safe-area-inset-*)`.

### Navegação e jornada
- cabeçalho simplificado em telas pequenas, mantendo marca, Jornada e Começar como ações principais;
- marcador superior dos 7 dias compactado para ocupar menos altura sem perder posição na jornada;
- botões e alvos principais passam a respeitar altura mínima de toque;
- efeitos de hover são neutralizados em dispositivos touch.

### Dia 1 e módulos de perguntas
- cards, badges, tipografia e ilustrações compactados para reduzir rolagem desnecessária;
- ações de pergunta passam a usar barra sticky próxima ao polegar;
- rankings e ações auxiliares são reorganizados para telas estreitas;
- barras de resultado passam a empilhar rótulo/valor sobre a trilha em mobile.

### Resultados e Dias 6–7
- smartwatch reduzido e reequilibrado para 390–430px;
- cards editoriais de perfil ajustados para leitura vertical;
- órbita de prontidão do Dia 6 vira grade compacta em mobile, evitando uma área circular excessivamente alta;
- cabeçalho do Mapa do Corre compactado, com nível, XP e foto em bloco horizontal;
- cards de hipóteses, contexto e plano de ação recebem espaçamento mobile específico.

### Governança
- nenhuma regra de scoring, persistência ou conteúdo do instrumento foi alterada;
- smoke test passa a exigir carregamento da camada mobile, safe areas, alvos de toque e adaptações de Dias 6–7;
- validação em aparelho físico ainda é necessária antes de considerar o mobile fechado.

## MVP — Perfis visuais V1 — 9 de setembro de 2026

### Identidade dos resultados
- definida direção comum **neo-cordel digital brasileiro** para os sete perfis, com linguagem editorial contemporânea e sem estereótipos profissionais;
- criado `docs/perfis-visuais-v1.md` com briefing, paleta, composição, prompt-base, cenas e critérios específicos para cada perfil;
- definidos nomes estáveis para artes finais em `assets/profiles/<profile-id>.webp`.

### Interface
- criada camada `assets/profile-visuals.css` para cards editoriais de perfil;
- criado `assets/profile-visuals.js` para renderizar identidade visual no resultado do Dia 1 e no Mapa do Corre do Dia 7;
- enquanto a arte final não existir, cada perfil usa fallback gráfico próprio com cor, símbolo e palavras-chave;
- imagens finais entram automaticamente quando disponíveis e falhas de carregamento retornam ao fallback sem imagem quebrada.

### Governança
- identidade visual permanece camada editorial e não altera scoring, eixos ou perfis;
- CI e smoke tests passam a proteger os sete IDs de perfil, carregamento da camada e fallback de imagem.

## MVP — Resultado smartwatch V1 — 9 de setembro de 2026

### Visualização
- adicionada leitura dos cinco eixos de maior intensidade por anéis concêntricos inspirados em smartwatch;
- aplicada no resultado do Dia 1 e na síntese do Dia 7;
- centro do gráfico destaca o perfil principal e legenda mantém nome do eixo + percentual estrutural;
- barras tradicionais permanecem disponíveis para detalhamento e acessibilidade.

### Interpretação
- os valores continuam representando proporção do máximo estrutural disponível em cada eixo;
- não são percentis populacionais nem comparação normativa com outras pessoas.

## MVP — Redesign visual V1 — 9 de setembro de 2026

### Direção visual
- criada a camada `assets/visual-v1.css` como tema visual isolado sobre o MVP existente;
- adotada paleta brasileira contemporânea com verde profundo, azul, amarelo, caramelo e fundo palha, evitando uso literal da bandeira;
- tipografia e hierarquia ajustadas para reduzir a aparência industrial e aproximar o produto de uma experiência mais humana e editorial;
- cards, botões, painéis e áreas de conteúdo ganharam mais respiro, profundidade leve e variação visual entre etapas.

### Jornada
- landing, onboarding, Dia 1, Dias 2–6 e visão da jornada foram harmonizados pela mesma linguagem visual;
- marcador superior continua sendo a referência global de posição na jornada e foi adaptado ao novo tema;
- mantidas as transições leves e o respeito a `prefers-reduced-motion`.

### Resultado
- Dia 7 recebeu apenas harmonização visual nesta etapa;
- visual de resultado com círculos concêntricos inspirado em smartwatch permanece como etapa seguinte, separado do redesign geral para não misturar estrutura e visualização de dados.

### Responsividade
- incluídos ajustes específicos para 980px, 850px, 620px e 420px;
- navegação, cards, jornada, questionários e ações foram compactados para preparar o MVP para validação mobile.

### Governança
- nenhuma regra de scoring, item ou persistência foi alterada;
- smoke test atualizado para exigir existência e carregamento do tema visual V1.

## V4 — Capítulo 5 completo — 8 de setembro de 2026

### Banco de itens
- implementados `q43` a `q50`, fechando o Capítulo 5 — “Meu futuro possível”;
- banco V4 fechado em **50 itens executáveis**;
- novos itens cobrem investigação de curso, conflito com expectativa familiar, avaliação de oportunidade, propósito × estabilidade, reconhecimento × autonomia, especialização × liderança, previsibilidade × experimentação e ranking final de critérios de carreira.

### Pontuação
- máximos estruturais recalculados para os 50 itens;
- mantida normalização estrutural dos 10 eixos;
- rankings permanecem com pesos `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`;
- momento de carreira permanece fora do cálculo e atua apenas na interpretação;
- modelo de escala atualizado para `structural-normalized-v5`.

### Governança
- landing e README atualizados para 50 itens;
- matriz deve refletir os 50 itens como implementados, sem confundir implementação com validação;
- próxima etapa definida como auditoria estrutural final, revisão de forced-choice e integração com a jornada de 7 dias do MVP.
