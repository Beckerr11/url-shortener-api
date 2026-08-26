# URL Shortener API — Functional Demo

[![CI](https://github.com/Beckerr11/url-shortener-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Beckerr11/url-shortener-api/actions/workflows/ci.yml)

API demonstrativa de encurtamento de URLs com **validação, aliases personalizados, redirecionamento e analytics básicos**.

> O snapshot público atual usa armazenamento **em memória** para manter os testes reproduzíveis e não depender de serviços externos. MongoDB, Redis, QR Code e rate limiting fazem parte da evolução planejada e não são apresentados aqui como recursos já concluídos.

## Funcionalidades verificáveis

- `POST /api/shorten` cria uma URL curta;
- valida apenas URLs HTTP/HTTPS;
- suporta alias personalizado;
- rejeita aliases duplicados com `409`;
- `GET /:shortCode` redireciona com `301`;
- registra contagem de cliques em memória;
- `GET /api/stats/:shortCode` retorna analytics básicos;
- `GET /health` expõe um health check simples.

## Stack atual

- Node.js
- Express
- Jest
- Supertest
- Babel
- GitHub Actions

## Testes

A suíte cobre os principais fluxos HTTP da API:

```bash
npm ci
npm test
```

Os testes validam criação, URL inválida, conflito de alias, redirecionamento, `404` e analytics.

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

Essa implementação funciona como uma referência pequena e testável. A próxima evolução natural é trocar o armazenamento em memória por adapters persistentes sem alterar o contrato HTTP.

## Roadmap técnico

- persistência em MongoDB;
- cache de redirecionamento em Redis;
- rate limiting;
- geração de QR Code;
- métricas e observabilidade;
- containerização validada em CI;
- deploy público.

## Qualidade e manutenção

- CI executa a suíte Jest em pull requests e pushes;
- Dependabot acompanha atualizações npm semanalmente;
- dependências e arquivos gerados não devem ser versionados.

## Escopo

Este repositório é um **projeto de portfólio**. O README descreve somente o comportamento verificável no código atual; itens futuros ficam explicitamente separados no roadmap.
