# Backlog único do Caramelo

Atualizado em 21/10/2026. Esta é a fonte consolidada de retomada do projeto. Implementação não significa validação psicométrica. A baseline atual da main é a V9.2; a V9.3 está em desenvolvimento na branch de experiência.

## Controle das próximas entregas

- **#16 — Fechamento técnico, homologação e publicação da prévia.** Integração técnica e publicação já concluídas; restam apenas validações humanas em dispositivo físico/leitor de tela.
- **#17 — Revisão de conteúdo e interpretação antes do piloto.** Continua como frente metodológica principal.
- **#18 — Sete artes finais e homologação visual.** Estrutura implementada; ainda falta arte exclusiva do Comunicador Influente e revisão editorial final do conjunto.
- **V9.3 — Continuidade e experiência.** Retomada inteligente, feedback de conclusão e personalidade de movimento por dia.

## Implementado antes desta retomada

- [x] Banco V4: 50 itens, cinco capítulos, dez eixos e sete perfis.
- [x] SVGs e persistência local.
- [x] Normalização estrutural e exclusão do momento biográfico da pontuação.
- [x] Jornada de sete dias, progressão por XP e síntese final.
- [x] Tema visual, resultados em anéis, camada mobile e fallback de perfis.
- [x] CI de sintaxe e smoke tests.

## Implementado e auditado no PR #15

- [x] Auditoria de 50 itens executada: 12 regressões aprovadas, dez tetos conferidos.
- [x] Simulação documentada de 10.000 protocolos, sem alegação psicométrica.
- [x] Validação de índices, rankings e armazenamento no núcleo.
- [x] Critério técnico de empate explícito.
- [x] Dia 1 alinhado ao núcleo compartilhado.
- [x] Travamento ao finalizar Dia 4 reproduzido na execução 34898940262.
- [x] Correção dos observadores dos Dias 5 e 6 aprovada no percurso 1–5: execução 34899239954, desktop e largura 390 px.
- [x] Mesma correção aplicada ao Dia 7 e teste ampliado para os sete dias.
- [x] Síntese final reconstruída ao revisitar para refletir respostas atuais, sem novo XP.
- [x] Gerador de pacote estático com manifesto e hashes.
- [x] Pipeline condiciona o pacote à aprovação da auditoria e navegador.
- [x] README, jornada e backlog reconciliados com a implementação.

O resultado da rodada ampliada 1–7 e a existência do pacote devem ser conferidos por execução/commit em **#16**, evitando interpretar apenas a presença de um teste como aprovação.

## Evolução visual e de interação — V9.1 a V9.3

- [x] V9.1 integrada à main com hero editorial, resultado em três painéis e galeria de perfis.
- [x] V9.2 integrada à main com bússola SVG animada, transições entre telas e microinterações.
- [x] Preview público sincronizado com a main na Vercel.
- [x] V9.2 aprovada em CI, auditoria e percurso completo de navegador.
- [x] V9.3: retomada inteligente de progresso adicionada.
- [x] V9.3: identidade de movimento por dia adicionada.
- [x] V9.3: feedback visual de seleção e conclusão de etapa adicionado.
- [x] V9.3: Quality Gate completo e integração à main.
- [ ] Refinar arte exclusiva do Comunicador Influente e resolução final das sete artes.

## Journey map — V9.7

- [x] Redesenhar a trilha superior como rota visual, valorizando os SVGs das sete etapas.
- [x] Destacar claramente etapa atual, concluídas e futuras.
- [x] Criar comportamento horizontal próprio no mobile.
- [x] Remover a taxonomia dos sete perfis da landing.
- [x] Realocar os perfis para a área de Metodologia.
- [ ] Aprovar Quality Gate completo da V9.7 e integrar à main.
- [ ] Publicar alias limpo de piloto para substituir a nomenclatura legada v7-preview.

## Pilot visual — V9.6

- [x] Aplicar arte exclusiva do Comunicador Influente em landing, perguntas e resultados.
- [x] Remover reaproveitamento visual do Transformador Social para o Comunicador.
- [x] Reordenar o resultado mobile para Perfil → Bússola → Eixos → Ações.
- [x] Adicionar navegação rápida entre blocos do resultado no mobile.
- [x] Dar identidade visual distinta às quatro pausas entre capítulos.
- [ ] Aprovar Quality Gate completo da V9.6 e integrar à main.
- [ ] Rodada humana em celular físico para revisar densidade, leitura e ritmo.

## Experiência do respondente — V9.5

- [x] Agrupar a ordem de apresentação dos 50 itens em cinco capítulos de dez, sem alterar IDs, pesos ou scoring.
- [x] Migrar o índice salvo para preservar a pergunta atual de quem já iniciou o mapa.
- [x] Inserir pausas de transição entre os cinco capítulos.
- [x] Mostrar progresso dentro do capítulo e estado de salvamento local.
- [x] Permitir pausar o Dia 1 e retomar pela landing.
- [x] Mostrar contador de conclusão nos cinco rankings.
- [ ] Aprovar Quality Gate completo da V9.5 e integrar à main.
- [ ] Validar ritmo/fadiga em entrevistas cognitivas com participantes reais.

## Homologação e distribuição — #16

- [x] Revisar o percurso visual em capturas do commit homologado; evidência em `docs/homologacao-visual-tecnica-2026-09-21.md`.
- [x] Gerar e revisar PDF real de quatro páginas, sem blocos cortados ou cabeçalho órfão.
- [x] Testar foto opcional, clipboard real, reinício complementar, reinício completo e armazenamento indisponível.
- [x] Homologar por automação teclado/foco, nomes acessíveis, referências ARIA e contraste central da paleta.
- [ ] Fazer validação humana em celulares físicos e com leitor de tela.
- [x] Aprovar revisão dos PRs técnicos/visuais e integrar à main.
- [x] Publicar endereço da prévia identificada e registrar a baseline de versão.
- [ ] Fazer rodada humana final em celular físico e leitor de tela.

## Conteúdo e interpretação — #17

- [ ] Revisar 15 pares de escolha forçada e cinco rankings.
- [ ] Rever contribuição dos rankings em Estabilidade, Reconhecimento e Propósito.
- [ ] Revisar separação Cuidador Estratégico × Transformador Social.
- [ ] Verificar hipóteses de carreira e devolutivas não deterministas.
- [ ] Realizar entrevistas cognitivas e registrar ajustes dos itens.
- [ ] Definir responsáveis, informação ao participante e governança antes do piloto.

## Visual — #18

- [ ] Produzir sete WebPs conforme briefing.
- [ ] Integrar e conferir recortes nos Dias 1 e 7.
- [ ] Conferir acessibilidade da composição e fallback.

## Depois da demonstração interna

Autenticação, backend, resultados versionados, taxonomia ampliada de cursos/ocupações, painel editorial, administração e analytics dependem do escopo do produto/piloto. Estudos psicométricos são uma frente própria. Demonstração de software não equivale a autorização de coleta pública nem a uso profissional regulado.
