# Caramelo — Orientação Vocacional

O **Caramelo** é uma experiência digital de orientação vocacional com identidade brasileira. O projeto combina cenários ilustrados, escolhas forçadas e rankings para ajudar pessoas a explorar interesses, motivadores, ambientes de trabalho e hipóteses de carreira.

> Status atual: protótipo V3 em evolução. O instrumento é orientativo e ainda não corresponde a teste psicológico aprovado pelo SATEPSI nem a classificação normativa da população.

## O que já existe

- jornada navegável em 5 etapas;
- 12 itens implementados distribuídos em 5 capítulos;
- matriz V4 com 50 posições planejadas;
- modelos A (cenário), C (escolha forçada) e D (ranking);
- 10 eixos de orientação;
- 7 perfis derivados;
- biblioteca própria de ícones SVG, sem emojis;
- persistência local do progresso;
- resultado com perfil principal/secundário, eixos, áreas para investigar e plano de ação;
- documentação técnica e metodológica.

## Estrutura do repositório

```text
caramelo/
├─ index.html                 # aplicação atual
├─ assets/
│  ├─ styles.css              # identidade visual e responsividade
│  ├─ icons.svg               # sprite SVG do produto
│  ├─ data.js                 # perguntas, eixos, perfis e pesos
│  └─ app.js                  # estado, navegação, pontuação e resultado
├─ data/
│  └─ matriz-itens.csv        # matriz de especificação dos 50 itens
├─ docs/
│  ├─ documentacao-tecnica-v3.md
│  ├─ metodologia.md
│  ├─ matriz-itens.md
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

Cada resposta adiciona pontos aos eixos. No ranking, os pesos atuais são `[2.5, 2, 1.5, 1, 0.5, 0]`. Os perfis são calculados por soma ponderada dos eixos. As barras do resultado mostram intensidade **relativa ao próprio mapa da pessoa** e não percentis populacionais.

## Matriz de itens

A expansão do instrumento agora é guiada por uma matriz versionada com **50 itens**, sendo:

- 30 cenários ilustrados — Modelo A (60%);
- 15 escolhas forçadas — Modelo C (30%);
- 5 rankings — Modelo D (10%);
- 10 itens em cada um dos 5 capítulos.

Cada registro documenta capítulo, formato, foco conceitual, eixos, regra de peso, controle de desejabilidade, SVG e status de revisão.

- Visão técnica: [`docs/matriz-itens.md`](docs/matriz-itens.md)
- Fonte tabular: [`data/matriz-itens.csv`](data/matriz-itens.csv)

Os 12 itens atuais foram preservados e 38 novas posições foram especificadas para os próximos ciclos de redação, revisão visual e piloto.

## Referências metodológicas

O desenvolvimento considera boas práticas de avaliação e orientação profissional, com referência ao SATEPSI/CFP e a modelos amplamente usados em interesses vocacionais, traços de personalidade e desenvolvimento de carreira. Essas referências orientam o desenho do produto; não significam que o Caramelo, em sua versão atual, seja um teste psicológico validado ou aprovado.

- SATEPSI/CFP: https://satepsi.cfp.org.br/
- 16Personalities — teoria e comunicação de traços: https://www.16personalities.com/articles/our-theory

## Próximos passos

1. redigir os 38 itens planejados a partir da matriz;
2. revisar pares forced-choice quanto à equivalência de desejabilidade;
3. equilibrar oportunidades e máximos teóricos de pontuação por eixo;
4. criar os SVGs previstos para os novos cenários;
5. testar cognitivamente as perguntas com usuários;
6. implementar testes automatizados de navegação e cálculo;
7. preparar backend, consentimento e governança LGPD antes de armazenar dados pessoais;
8. evoluir o relatório e a taxonomia de cursos/carreiras.

## Histórico

A V3 consolida a troca dos emojis por SVGs, melhora acessibilidade, reduz o peso do ranking, adiciona persistência local e documenta as regras internas da aplicação. A matriz V4 passa a orientar a expansão do banco para 50 itens. Veja [`CHANGELOG.md`](CHANGELOG.md) e a documentação em [`docs/`](docs/).
