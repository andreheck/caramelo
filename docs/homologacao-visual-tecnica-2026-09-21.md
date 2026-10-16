# Homologação visual e técnica do MVP — 21/09/2026

Commit homologado: `127ffe2929eb5aef60303b805d4b5c28933890ff`  
PR: #15  
Quality Gate: https://github.com/andreheck/caramelo/actions/runs/35633390537

Esta homologação verifica software, UX e apresentação da prévia interna. Não constitui validação psicométrica, certificação de acessibilidade ou autorização para coleta pública.

## 1. Revisão visual do percurso

As capturas abaixo são geradas pelo teste Chromium no próprio commit e preservadas no artefato `caramelo-browser-127ffe2929eb5aef60303b805d4b5c28933890ff`.

1. **Landing — saudável.** Hierarquia principal clara, CTAs distintos, painel visual equilibrado no desktop e layout responsivo a 390 px. O contorno visual indevido do título, causado pelo foco programático, foi removido sem retirar o foco semântico da navegação.
2. **Onboarding — saudável.** Três momentos de carreira legíveis e acionáveis; escolha pode ser feita por teclado.
3. **Dia 1 / pergunta — saudável.** Timeline, contexto da etapa, pergunta e ações mantêm hierarquia; bússola é informativa e não intercepta cliques.
4. **Resultado do Dia 1 — saudável.** Perfil, síntese e anéis permanecem legíveis; indicador lateral foi reduzido em telas de resultado para não competir com a devolutiva.
5. **Visão da jornada — saudável.** Sete etapas, arte de cada momento, estado atual/concluído/futuro e XP têm leitura consistente.
6. **Dia 2 / momento atual — saudável.** Escala e explicação são visualmente separadas da navegação geral.
7. **Dia 3 / roda da vida — saudável.** Opções de resposta e contexto do dia mantêm padrão da jornada.
8. **Dia 4 / raciocínio — saudável.** Enunciado e respostas aparecem como foco principal; timeline permanece secundária.
9. **Dia 5 / leitura — saudável.** Conteúdo de leitura mantém boa largura e contraste.
10. **Dia 6 / preparação — saudável.** Introdução e foto opcional não confundem a conclusão da etapa.
11. **Dia 7 / Mapa do Corre — saudável.** Perfil, interesses, repertórios, contexto, três hipóteses e plano 7/30/90 permanecem organizados em desktop e mobile.

### PDF / impressão

O teste gera um PDF real via Chromium. Na versão homologada:

- 4 páginas A4;
- sem textos ou cartões cortados;
- barras, anéis e cartões preservados;
- indicador flutuante e timeline fixa não aparecem na impressão;
- blocos de repertórios e contexto não são partidos entre páginas;
- plano de ação começa junto ao próprio título, sem cabeçalho órfão.

## 2. Casos técnicos fechados

| Verificação | Resultado |
| --- | --- |
| Percurso completo Dias 1–7 | aprovado em 1280 px e 390 px |
| 50 itens + recarga durante Dia 1 | aprovado |
| Paridade do perfil com núcleo compartilhado | aprovado |
| XP sem duplicação | aprovado |
| Foto opcional: carregar, redimensionar localmente e remover | aprovado |
| Clipboard: escrita e leitura real do resumo | aprovado |
| PDF real | aprovado — 4 páginas |
| Reinício complementar | aprovado — preserva Dia 1 e volta a 100 XP |
| Reinício completo | aprovado — limpa respostas e progresso em memória e armazenamento |
| localStorage indisponível | aprovado — aviso ao usuário, sem travamento |
| Skip link e foco no conteúdo principal | aprovado |
| Escolha do onboarding via teclado | aprovado |
| IDs duplicados / aria-labelledby quebrado / botões sem nome | nenhum encontrado |
| Contraste central da paleta | texto principal 14,96:1; texto secundário 5,32:1; verde/ branco 5,42:1 |
| Exceções JavaScript no percurso | nenhuma |

## Correções encontradas pela homologação

A rodada não foi apenas confirmatória. Os testes encontraram e corrigiram:

- indicador lateral bloqueando o botão “Próxima pergunta”;
- reinício completo que limpava o storage, mas mantinha respostas antigas em memória;
- módulos posteriores que podiam falhar quando o navegador bloqueava o localStorage;
- contorno de foco com aparência de campo em torno do título da landing;
- quebra ruim de blocos e título órfão na versão impressa/PDF.

## Evidências

- Quality Gate final: https://github.com/andreheck/caramelo/actions/runs/35633390537
- Capturas + PDF + resultados do navegador: https://github.com/andreheck/caramelo/actions/runs/35633390537/artifacts/10655147952
- Auditoria matemática: https://github.com/andreheck/caramelo/actions/runs/35633390537/artifacts/10655766537
- Pacote de preview: https://github.com/andreheck/caramelo/actions/runs/35633390537/artifacts/10654863318

## Limites ainda manuais

Ainda não estão encerrados:

- validação em celulares físicos reais;
- sessão humana com leitor de tela (NVDA, VoiceOver ou equivalente);
- revisão editorial/metodológica da issue #17;
- produção/homologação das sete artes finais dos perfis da issue #18;
- aprovação do PR #15, merge na `main` e URL pública/identificada de homologação.

Esses limites não invalidam a homologação de software acima; apenas não devem ser descritos como certificação de acessibilidade ou validação do instrumento.
