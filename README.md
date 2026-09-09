# Caramelo — Orientação Vocacional

O **Caramelo** é uma experiência digital de orientação vocacional com identidade brasileira. O projeto combina cenários ilustrados, escolhas forçadas e rankings para ajudar pessoas a explorar interesses, motivadores, ambientes de trabalho e hipóteses de carreira.

> Status atual: protótipo V4 em evolução. O instrumento é orientativo e ainda não corresponde a teste psicológico aprovado pelo SATEPSI nem a classificação normativa da população.

## O que já existe

- jornada navegável em 5 capítulos;
- **50 itens implementados**;
- Capítulo 1 completo — “Quem sou em movimento”;
- Capítulo 2 completo — “Como resolvo problemas”;
- Capítulo 3 completo — “O que me atrai no mundo”;
- Capítulo 4 completo — “Onde eu funciono melhor”;
- Capítulo 5 completo — “Meu futuro possível”;
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
│  ├─ chapter5-v4.js
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

Cada resposta adiciona pontos aos eixos. Rankings usam pesos reduzidos `[1.5, 1.2, 0.9, 0.6, 0.3, 0]` para funcionar como refinamento, e não como componente dominante. Os eixos são normalizados pelo máximo estrutural disponível antes do cálculo dos perfis.

O momento de carreira — ensino médio, escolha de curso/faculdade ou transição — **não altera a pontuação**. Ele é usado apenas para adaptar a interpretação e os próximos passos.

As barras do resultado mostram a proporção do máximo estrutural disponível em cada eixo. Elas não representam percentis populacionais nem normas psicométricas.

## Matriz de itens

O banco V4 está fechado em **50 itens**, distribuídos em:

- 30 cenários ilustrados — Modelo A (60%);
- 15 escolhas forçadas — Modelo C (30%);
- 5 rankings — Modelo D (10%);
- 10 itens em cada um dos 5 capítulos.

Todos os 50 itens estão executáveis. Isso fecha a etapa de construção do banco, mas **não significa validação psicométrica**. Os itens ainda precisam passar por revisão de conteúdo, desejabilidade, acessibilidade, piloto e análise empírica.

- Visão técnica: [`docs/matriz-itens.md`](docs/matriz-itens.md)
- Fonte tabular: [`data/matriz-itens.csv`](data/matriz-itens.csv)
- Auditoria de pontuação: [`docs/auditoria-pontuacao-v4.md`](docs/auditoria-pontuacao-v4.md)

## Frente paralela do MVP

Há uma frente complementar em desenvolvimento para transformar o instrumento em uma **jornada de 7 dias**, com módulos reflexivos, raciocínio, prontidão profissional, XP e síntese final. Essa camada deve consumir o banco V4 como núcleo do Dia 1, sem substituir a lógica dos 50 itens.

A integração deve preservar a separação entre:

- **instrumento vocacional** — 50 itens e 10 eixos;
- **experiências reflexivas** — contexto, momento e Roda da Vida;
- **módulos complementares** — raciocínio, leitura de contexto e prontidão;
- **camada narrativa/gamificada** — 7 dias, XP e progressão.

## Próximos passos

1. rodar a auditoria estrutural final com os 50 itens;
2. revisar os pares forced-choice quanto à equivalência de desejabilidade;
3. revisar carga cognitiva e influência agregada dos 5 rankings;
4. reconciliar a aplicação dos 50 itens com a jornada de 7 dias do MVP;
5. testar cognitivamente as perguntas com usuários;
6. implementar e manter testes automatizados de navegação e cálculo;
7. preparar backend, consentimento e governança LGPD antes de armazenar dados pessoais;
8. evoluir o relatório e a taxonomia de cursos/carreiras.

## Histórico

A V4 fecha o banco planejado de 50 itens, completa os cinco capítulos e mantém a pontuação normalizada por máximo estrutural. Veja [`CHANGELOG.md`](CHANGELOG.md) e a documentação em [`docs/`](docs/).
