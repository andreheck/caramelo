# Caramelo — Visual V7 Preview

Branch: `feat/visual-v7-preview`

Esta é uma build de homologação visual baseada na versão técnica do PR #15.

## Alterações visuais

- sete cenas SVG separadas para os perfis vocacionais;
- textos, descrições e áreas sugeridas derivados do resultado calculado, não gravados nas artes;
- badges SVG para os sete dias;
- bússola SVG em camadas com agulha dinâmica;
- microanimações de transição, seleção e glow;
- suporte a `prefers-reduced-motion`.

## Escopo

A camada V7 não altera scoring, eixos, pesos, máximos estruturais ou regra de perfil. As artes são editoriais.

O Caramelo continua sendo um protótipo de orientação vocacional. Não é diagnóstico psicológico, não possui normas populacionais e não é apresentado como instrumento psicométrico validado.

## Teste

O GitHub Actions gera a build identificada no job `preview-package`. Baixe o artefato `caramelo-preview-<SHA>`, extraia-o e execute um servidor HTTP local conforme `COMO-TESTAR.txt`.
