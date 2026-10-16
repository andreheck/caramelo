# Backlog único do Caramelo

Atualizado em 21/09/2026. Esta é a fonte consolidada de retomada dos dois chats. Implementação não significa validação psicométrica. Alterações do PR #15 permanecem fora da main enquanto o PR estiver aberto.

## Controle das próximas entregas

- **#16 — Fechamento técnico, homologação e publicação da prévia.** Resultados da última rodada ficam registrados nessa issue e no PR #15.
- **#17 — Revisão de conteúdo e interpretação antes do piloto.**
- **#18 — Sete artes finais e homologação visual.**

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

## Homologação e distribuição — #16

- [x] Revisar o percurso visual em capturas do commit homologado; evidência em `docs/homologacao-visual-tecnica-2026-09-21.md`.
- [x] Gerar e revisar PDF real de quatro páginas, sem blocos cortados ou cabeçalho órfão.
- [x] Testar foto opcional, clipboard real, reinício complementar, reinício completo e armazenamento indisponível.
- [x] Homologar por automação teclado/foco, nomes acessíveis, referências ARIA e contraste central da paleta.
- [ ] Fazer validação humana em celulares físicos e com leitor de tela.
- [ ] Aprovar revisão do PR e integração à main.
- [ ] Publicar endereço da prévia identificada e registrar suas limitações.

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
