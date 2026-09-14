# Jornada Caramelo — sete dias

Especificação consolidada em 14/09/2026. Implementação e homologação são estados diferentes. Resultados da rodada técnica atual: PR #15 e issue #16; pendências editoriais: #17; artes finais: #18.

## Camadas

O núcleo vocacional reúne 50 itens e dez eixos. Termômetro do Momento e Roda da Vida são experiências reflexivas próprias. Raciocínio, leitura e prontidão descrevem desafios situacionais. Arquétipos, elementos, XP e níveis são recursos narrativos, não tipos psicológicos fixos.

## Percurso implementado

| Dia | Experiência | Conteúdo atual | Saída | XP |
|---|---|---|---|---:|
| 1 | Bora se entender | Onboarding e 50 itens em cinco capítulos | Eixos, perfis principal/secundário, áreas e ações | 100 |
| 2 | Como você tá por dentro | 21 autorrelatos próprios sobre o momento | Devolutiva não diagnóstica de contexto | 80 |
| 3 | Sua vida tá no eixo? | Sete áreas: energia, foco, estudo, grana, apoio, autoestima, direção | Leitura reflexiva e área de maior peso | 60 |
| 4 | Como sua cabeça resolve? | Oito desafios de padrões, atenção, priorização e aplicação | Desempenho nesta rodada; não inteligência global | 90 |
| 5 | Você entende o jogo? | Oito situações de leitura aplicada | Informação explícita, inferência, intenção e instruções | 70 |
| 6 | Você tá pronto pro corre? | 14 situações profissionais, foto local opcional | Repertório de prontidão e prioridade de treino | 120 |
| 7 | Teu Mapa do Corre | Síntese do núcleo e dos módulos | Três hipóteses e plano 7/30/90 dias | 200 |

Total da jornada: **720 XP**. Revisitar uma etapa concluída não deve duplicar XP. O Dia 7 não acrescenta pontos aos eixos vocacionais. Na retomada do PR #15, a síntese é reconstruída a partir das respostas atuais quando reaberta.

## Progressão narrativa

| XP mínimo | Nível |
|---:|---|
| 0 | Zé Orelha |
| 80 | Juvenil |
| 160 | Pequeno Aprendiz |
| 260 | Jovem Aprendiz |
| 380 | Super Aprendiz |
| 520 | Aprendiz Lendário |
| 700 | Estagiário |
| 1.000 | Pessoa do Corre |
| 1.500 | Veterano |
| 2.200 | Dono do Pedaço |
| 3.000 | Pronto pra Ação |

A primeira jornada termina em Estagiário. Níveis superiores dependem de experiências futuras; não implicam emprego, qualificação formal ou aptidão comprovada.

## Regras da interpretação

O momento de carreira adapta os textos e próximos passos, sem modificar a pontuação. A porcentagem dos eixos é proporção do máximo estrutural disponível, não percentil populacional. Perfis são hipóteses derivadas; contexto emocional e situação socioeconômica não definem nem restringem uma vocação.

O Termômetro usa redação própria do produto e não deve ser apresentado como equivalente psicométrico a uma escala validada. Desafios de leitura, raciocínio e entrevista não são avaliações padronizadas nem critérios isolados de seleção/exclusão.

## Identidade e personalização

Viajantes/Fogo, Governantes/Terra, Deuses/Ar e Humanos/Água são metáforas editoriais de síntese. Não substituem os sete perfis do núcleo vocacional.

O enigma regional e personalização cultural foram propostos no histórico, mas não devem ser tratados como funcionalidade concluída por estarem nesta especificação. Região, quando usada, deve contextualizar exemplos e linguagem, não acrescentar pontos a personalidade, aptidão ou interesse.

## Persistência e navegação

- Estado vocacional: `caramelo:v4:state`.
- Estado complementar e XP: `caramelo:v4:journey`.
- Armazenamento local ao navegador; sem conta/sincronização entre dispositivos.
- Dias futuros ficam bloqueados pela progressão na interface.
- Questões do Dia 1 têm retomada após recarregar e validação de respostas.
- Módulos complementares preservam respostas, mas a retomada exata de cada tela, reinícios e recuperação de erros exigem homologação específica.

## Critérios com evidência técnica

- [x] Telas dos sete dias implementadas e ligadas ao núcleo de 50 itens.
- [x] Estados concluído, disponível e bloqueado implementados.
- [x] Termômetro, roda, desafios e síntese implementados.
- [x] Auditoria matemática do núcleo executada com 12 regressões aprovadas.
- [x] Navegação dos Dias 1–5, retomada do Dia 1 e não duplicação de XP testadas em Chromium na execução 34899239954.
- [x] Teste ampliado 1–7, três hipóteses, plano e 720 XP implementado; resultado da execução mais recente registrado em #16.
- [ ] Revisão visual, acessibilidade assistiva e aparelho físico.
- [ ] Foto, cópia real, reinícios e cenários excepcionais.
- [ ] Paginação de impressão/salvar PDF: o teste automatizado verifica somente a chamada do botão, não o arquivo final.
- [ ] Conteúdo revisado com usuários e responsáveis técnicos antes do piloto.

Arquivos históricos V3 e auditoria de 20 itens devem ser consultados como histórico, não como prova da situação atual.
