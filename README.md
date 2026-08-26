# URL Shortener API — Functional Demo

[![CI](https://github.com/Beckerr11/url-shortener-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Beckerr11/url-shortener-api/actions/workflows/ci.yml)

API demonstrativa de encurtamento de URLs com **validação, aliases personalizados, redirecionamento e analytics básicos**.

> O snapshot público atual usa armazenamento **em memória** para manter os testes reproduzíveis e não depender de serviços externos. MongoDB, Redis, QR Code e rate limiting fazem parte da evolução planejada e não são apresentados como recursos concluídos.

## Funcionalidades verificáveis

- `POST /api/shorten` cria uma URL curta;
- valida apenas URLs HTTP/HTTPS;
- suporta alias personalizado;
- rejeita aliases duplicados com `409`;
- `GET /:shortCode` redireciona com `301`;
- registra contagem de cliques em memória;
- `GET /api/stats/:shortCode` retorna analytics básicos;
- `GET /health` expõe health check;
- entrypoint de produção separado em `src/server.js`;
- imagem Docker executável em Node 24, com usuário não-root e healthcheck.

## Stack atual

- Node.js 24;
- Express;
- Jest;
- Supertest;
- Babel;
- Docker;
- GitHub Actions.

## Executando

### Testes

```bash
npm ci
npm test
```

A suíte valida criação, URL inválida, conflito de alias, redirecionamento, `404` e analytics.

### Servidor

```bash
node src/server.js
```

A porta padrão é `3000` e pode ser alterada por `PORT`.

### Container

```bash
docker build -t url-shortener-api .
docker run --rm -p 3000:3000 url-shortener-api
```

O CI constrói a mesma imagem para impedir que o Dockerfile fique desatualizado em relação à aplicação.

## Arquitetura atual

```text
HTTP request
    ↓
Express API
    ↓
validation + routing
    ↓
in-memory link store
    ↓
redirect / stats response
```

`src/app.js` contém o contrato Express testável; `src/server.js` cuida apenas do lifecycle do processo HTTP. Essa separação permite testar a API sem abrir uma porta fixa e executar o mesmo app em produção/container.

## Qualidade e manutenção

O GitHub Actions executa:

1. instalação determinística com `npm ci`;
2. suíte Jest;
3. `npm audit --omit=dev --audit-level=high`;
4. build da imagem Docker de produção.

O Dependabot acompanha atualizações npm semanalmente.

## Roadmap técnico

- persistência em MongoDB;
- cache de redirecionamento em Redis;
- rate limiting;
- geração de QR Code;
- métricas e observabilidade;
- deploy público.

## Limites explícitos

Este projeto não apresenta MongoDB, Redis ou QR Code como recursos atuais, mesmo que existam dependências relacionadas no histórico do repositório. O comportamento público documentado é somente o que a suíte e o CI conseguem verificar hoje.

## Autor

**Douglas Silva**  
[GitHub](https://github.com/Beckerr11) · [Portfólio](https://douglasdev.tech)
