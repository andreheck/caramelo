# Caramelo — Orientação Vocacional

Experiência digital brasileira para explorar interesses, ambientes, valores e hipóteses de carreira, com jornada de sete dias.

> Protótipo orientativo. Não é diagnóstico psicológico, não é teste aprovado pelo SATEPSI e não possui normas populacionais. Testes de software e simulações matemáticas não constituem validação psicométrica.

## Estado consolidado — 14/09/2026

O banco vocacional e a jornada já foram integrados na `main`. A retomada técnica ocorre em `feat/fechamento-tecnico-v4`, PR #15, sem substituir a versão principal até a conferência dos testes.

- **50 itens executáveis**, cinco capítulos com dez itens: 30 cenários A, 15 escolhas forçadas C e cinco rankings D.
- Dez eixos e sete perfis derivados, com perfil secundário e orientação exploratória.
- Jornada de sete dias, persistência local, XP e síntese final implementados.
- SVGs, tema neo-cordel, resultados em anéis e camada mobile.
- Sete artes finais ainda pendentes; os componentes usam fallback gráfico.
- CI estrutural, auditoria reproduzível e testes de regressão.

O backlog único está em [`docs/roadmap.md`](docs/roadmap.md). Marcação de implementação não equivale a homologação de uso.

## Executar localmente

Requer Python 3 para o servidor local:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. O aplicativo é front-end estático; não exige compilação para execução local. Não é recomendado abrir o HTML diretamente por `file://`, devido ao carregamento de SVGs e outros recursos.

## Testes

Requer Node.js 22:

```bash
node tests/smoke.cjs
node --test tests/quality.cjs
```

A auditoria grava `reports/auditoria-50-itens.json` e `.md`, com semente, fingerprint dos dados, máximos, contribuição dos rankings e simulações. No GitHub Actions os relatórios ficam nos artefatos da execução.

Para o teste funcional com Chromium e Python 3 disponíveis:

```bash
npm install --no-save --package-lock=false playwright@1.55.0
npx playwright install chromium
node tests/browser.cjs
```

O teste usa exclusivamente respostas sintéticas, verifica navegação dos Dias 1–5, retomada no Dia 1, paridade entre interface e núcleo e XP idempotente. A primeira falha interrompe a sequência: cenários posteriores não devem ser considerados aprovados. Dias 6–7, impressão, leitores de tela e aparelhos físicos permanecem critérios separados.

## Matemática e separação de camadas

Fluxo: respostas → pontos brutos → divisão pelo máximo estrutural de cada eixo → média ponderada dos perfis → interpretação.

- Rankings: pesos `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`.
- Modelo: `structural-normalized-v5`; banco: `4.4.0-prototype`.
- Momento de carreira adapta o texto, não acrescenta pontos.
- Percentuais representam proporções dos máximos estruturais, não percentis populacionais.
- Empate numérico usa ordem técnica estável, sem alegação de maior afinidade.
- O núcleo compartilhado é `assets/vocational-core.js`; a interface do Dia 1 delega o cálculo a ele no PR #15.
- Reflexões emocionais, roda da vida, desempenho em desafios e gamificação não devem ser confundidos com o instrumento vocacional.

## Evidências e documentação

- [Auditoria dos 50 itens — 14/09/2026](docs/auditoria-50-itens-2026-09-14.md)
- [Backlog único e critérios ainda abertos](docs/roadmap.md)
- [Matriz de itens](docs/matriz-itens.md)
- [Metodologia](docs/metodologia.md)
- [Especificação da jornada](docs/jornada-7-dias.md)
- [Briefing das sete artes](docs/perfis-visuais-v1.md)
- [Histórico de alterações](CHANGELOG.md)

A auditoria anterior de 20 itens e a documentação técnica V3 são históricas. Não devem ser usadas como evidência numérica do banco atual.

## Antes de publicar para participantes

Conferir navegação integral, resultados e exportação, revisar conteúdo com o público-alvo, produzir informação ao participante e revisar privacidade e governança de dados. A implementação atual é local: não há promessa de sincronização entre dispositivos. Não carregar dados reais em issues ou artefatos de CI.

Publicação de prévia, autenticação e backend são entregas separadas. Enquanto não houver versão identificada e homologada, não tratar o repositório como produto pronto para coleta pública.
