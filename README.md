# Caramelo — Orientação Vocacional

O **Caramelo** é uma experiência digital de orientação vocacional com identidade brasileira. O projeto combina cenários ilustrados, escolhas forçadas e rankings para ajudar pessoas a explorar interesses, motivadores, ambientes de trabalho e hipóteses de carreira.

> Status atual: protótipo V4 em evolução. O instrumento é orientativo e ainda não corresponde a teste psicológico aprovado pelo SATEPSI nem a classificação normativa da população.

## O que já existe

- jornada navegável em 5 etapas;
- **42 itens implementados**;
- Capítulo 1 completo — “Quem sou em movimento”;
- Capítulo 2 completo — “Como resolvo problemas”;
- Capítulo 3 completo — “O que me atrai no mundo”;
- Capítulo 4 completo — “Onde eu funciono melhor”;
- matriz V4 com 50 posições planejadas;
- modelos A (cenário), C (escolha forçada) e D (ranking);
- 10 eixos de orientação;
- 7 perfis derivados;
- biblioteca própria de ícones SVG, sem emojis;
- persistência local do progresso;
- normalização estrutural dos eixos;
- resultado com perfil principal/secundário, eixos, áreas para investigar e plano de ação;
- documentação técnica, metodológica e auditoria de pontuação.

## Estrutura do repositório

```text
caramelo/
├─ index.html
├─ assets/
│  ├─ styles.css
│  ├─ icons.svg
│  ├─ data.js
│  ├─ chapter1-v4.js
│  ├─ chapter2-v4.js
│  ├─ chapter3-v4.js
│  ├─ chapter4-v4.js
│  ├─ scoring-v4.js
│  └─ app.js
├─ data/
│  └─ matriz-itens.csv
├─ docs/
│  ├─ documentacao-tecnica-v3.md
│  ├─ metodologia.md
│  ├─ matriz-itens.md
│  ├─ auditoria-pontuacao-v4.md
│  └─ roadmap.md
├─ CHANGELOG.md
├─ LICENSE
└─ README.md
```

## Rodando localmente

Como o projeto é front-end puro, basta servir a pasta com qualquer servidor HTTP local. Exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Lógica atual

A pontuação ocorre em 10 eixos: Investigativo, Criativo, Social, Empreendedor, Organizador, Prático-realizador, Autonomia, Estabilidade, Propósito e Reconhecimento.

Cada resposta adiciona pontos aos eixos. Rankings usam pesos reduzidos `[1.5, 1.2, 0.9, 0.6, 0.3, 0]` para funcionar como refinamento, e não como componente dominante. Os eixos são normalizados pelo máximo estrutural disponível na versão atual antes do cálculo dos perfis.

O momento de carreira — ensino médio, escolha de curso/faculdade ou transição — **não altera a pontuação**. Ele é usado apenas para adaptar a interpretação e os próximos passos.

As barras do resultado mostram a proporção do máximo estrutural disponível em cada eixo. Elas não representam percentis populacionais nem normas psicométricas.

## Matriz de itens

A expansão do instrumento é guiada por uma matriz versionada com **50 itens**, sendo:

- 30 cenários ilustrados — Modelo A (60%);
- 15 escolhas forçadas — Modelo C (30%);
- 5 rankings — Modelo D (10%);
- 10 itens em cada um dos 5 capítulos.

Neste momento, **42 itens estão executáveis e 8 permanecem para o fechamento do banco**.

- Visão técnica: [`docs/matriz-itens.md`](docs/matriz-itens.md)
- Fonte tabular: [`data/matriz-itens.csv`](data/matriz-itens.csv)
- Auditoria de pontuação: [`docs/auditoria-pontuacao-v4.md`](docs/auditoria-pontuacao-v4.md)

## Referências metodológicas

O desenvolvimento considera boas práticas de avaliação e orientação profissional, com referência ao SATEPSI/CFP e a modelos amplamente usados em interesses vocacionais, traços de personalidade e desenvolvimento de carreira. Essas referências orientam o desenho do produto; não significam que o Caramelo, em sua versão atual, seja um teste psicológico validado ou aprovado.

- SATEPSI/CFP: https://satepsi.cfp.org.br/
- 16Personalities — teoria e comunicação de traços: https://www.16personalities.com/articles/our-theory

## Próximos passos

1. implementar o Capítulo 5 — “Meu futuro possível” (`q43` a `q50`);
2. revisar pares forced-choice quanto à equivalência de desejabilidade;
3. repetir a auditoria estrutural com os 50 itens completos;
4. consolidar a matriz final de itens e ativos;
5. testar cognitivamente as perguntas com usuários;
6. implementar testes automatizados de navegação e cálculo;
7. preparar backend, consentimento e governança LGPD antes de armazenar dados pessoais;
8. evoluir o relatório e a taxonomia de cursos/carreiras.

## Histórico

A V4 consolida a matriz de 50 itens, completa os quatro primeiros capítulos e normaliza a pontuação por máximo estrutural. Veja [`CHANGELOG.md`](CHANGELOG.md) e a documentação em [`docs/`](docs/).
