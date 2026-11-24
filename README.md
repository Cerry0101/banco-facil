# Banco Fácil

Recurso educacional independente para pessoas idosas aprenderem a usar aplicativos bancários.

- Banco do Brasil: guias visuais e simulador de Pix com dados fictícios.
- CAIXA: visível no menu, desativada (em breve).
- Não realiza transações nem se conecta a bancos. Sem vínculo com as instituições.
- Protótipo de pesquisa, ainda não validado com participantes idosos.

## Desenvolvimento

Execute `npm ci` e `npm run web`. Requer Node.js compatível com Expo SDK 58.

## GitHub Pages

Execute `node scripts/build-pages.cjs`, faça commit de `docs/` e envie a branch main.
Pages deve usar a branch main, pasta /docs. O site utiliza o prefixo /banco-facil.

## Verificação

`npm run typecheck` e `npm test`.
