# Caramelo — Orientação Vocacional

Experiência digital brasileira para explorar interesses, ambientes, valores e hipóteses de carreira, com jornada de sete dias.

> Protótipo orientativo. Não é diagnóstico psicológico, não é teste aprovado pelo SATEPSI e não possui normas populacionais. Testes de software e simulações matemáticas não constituem validação psicométrica.

## Estado consolidado — 14/09/2026

O banco vocacional e a jornada foram integrados na `main`. O fechamento técnico está em `feat/fechamento-tecnico-v4`, PR #15, sem substituir a versão principal enquanto o PR estiver aberto.

- **50 itens executáveis**, cinco capítulos com dez itens: 30 cenários A, 15 escolhas forçadas C e cinco rankings D.
- Dez eixos e sete perfis derivados; perfil secundário e hipóteses exploratórias.
- Jornada de sete dias, persistência local, XP e síntese final.
- SVGs, tema neo-cordel, resultados em anéis e camada mobile.
- Sete artes finais ainda pendentes; componentes usam fallback gráfico.
- Auditoria reproduzível, regressões matemáticas e teste funcional em Chromium.

O [backlog único](docs/roadmap.md) distingue implementado, testado e pendente. A issue #16 acompanha a homologação e publicação; #17 reúne conteúdo e piloto; #18 acompanha as artes finais.

## Executar localmente

Requer Python 3 para o servidor local:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. O aplicativo é estático; não exige compilação. Evite abrir por `file://`, devido ao carregamento dos SVGs e outros recursos. O progresso pertence a este navegador/origem; não há sincronização de conta entre dispositivos.

## Auditoria e testes

Requer Node.js 22:

```bash
node tests/smoke.cjs
node --test tests/quality.cjs
```

A auditoria grava `reports/auditoria-50-itens.json` e `.md`: semente, fingerprint dos dados, máximos, influência dos rankings, distribuição simulada e sensibilidade. O workflow preserva os relatórios como artefatos por 30 dias.

Para navegação funcional, com Python 3 disponível:

```bash
npm install --no-save --package-lock=false playwright@1.55.0
npx playwright install chromium
node tests/browser.cjs
```

O teste percorre os Dias 1–7 com respostas sintéticas em Chromium, nas larguras de 1280 e 390 px. Verifica bloqueio de resposta ausente no Dia 1, retomada após recarregar, paridade entre interface e núcleo, XP sem duplicação, 720 XP no final, três hipóteses e plano 7/30/90. O botão imprimir é testado por chamada interceptada: isso **não** valida o PDF nem sua paginação.

A primeira falha interrompe a sequência. Cenários seguintes não executados não estão aprovados. Largura estreita não substitui aparelho físico, teste de toque, leitor de tela, avaliação visual ou piloto com pessoas. Foto opcional, cópia efetiva e reinícios têm critérios adicionais na issue #16.

## Pacote de prévia interna

```bash
node scripts/build-preview.cjs
```

Saída: `dist/caramelo-preview/`, com código de execução, documentação, `COMO-TESTAR.txt` e `BUILD.json`. O manifesto identifica o commit e hashes dos arquivos. Execução local fora do CI aparece como `local-unversioned` quando `GITHUB_SHA` não é informado.

No workflow **CARAMELO Quality Gate**, o pacote `caramelo-preview-<commit>` é publicado como artefato **somente se os jobs de auditoria e navegador terminarem com sucesso**. Consulte a execução correspondente ao commit do PR, na área Actions; o pacote fica disponível por 30 dias. Uma execução de PR pode usar SHA de integração de teste, identificado no manifesto.

Esse pacote não é um endereço web hospedado nem uma release pública. A publicação de URL continua separada na issue #16. Use somente dados fictícios na demonstração interna.

## Matemática e separação de camadas

Fluxo: respostas → pontos brutos → divisão pelo máximo estrutural do eixo → média ponderada dos perfis → interpretação.

- Rankings: `[1.5, 1.2, 0.9, 0.6, 0.3, 0]`.
- Modelo: `structural-normalized-v5`; banco: `4.4.0-prototype`.
- Momento de carreira adapta o texto, não acrescenta pontos.
- Percentuais são proporções dos máximos estruturais, não percentis populacionais.
- Empate numérico tem ordem técnica estável, sem inferir maior afinidade.
- Núcleo compartilhado: `assets/vocational-core.js`; o Dia 1 e a síntese consomem a mesma lógica no PR #15.
- Reflexões emocionais, roda da vida, desafios e gamificação são camadas distintas do instrumento vocacional.

## Documentação

- [Auditoria dos 50 itens — 14/09/2026](docs/auditoria-50-itens-2026-09-14.md)
- [Backlog e critérios](docs/roadmap.md)
- [Matriz de itens](docs/matriz-itens.md)
- [Metodologia](docs/metodologia.md)
- [Jornada de sete dias](docs/jornada-7-dias.md)
- [Briefing das artes](docs/perfis-visuais-v1.md)
- [Histórico](CHANGELOG.md)

A auditoria de 20 itens e a documentação V3 são históricas. Não representam numericamente o banco completo atual.

## Antes da coleta com participantes

Revisar conteúdo, informação ao participante, privacidade, consentimento, responsabilidades e governança. Backend, autenticação e resultados versionados são entregas posteriores quando necessários. Não inserir dados reais de participantes em issues, testes ou artefatos.
