# URL Shortener API

Um serviço de encurtamento de URLs de alta performance construído com **Node.js**, **Express**, **MongoDB** e **Redis**. Demonstra conhecimento em caching, analytics e escalabilidade.

## 🎯 Características

- ✅ **Encurtamento de URLs** com slugs únicos
- ✅ **Redirecionamento rápido** com cache em Redis
- ✅ **Analytics em tempo real** (cliques, referrers, geolocalização básica)
- ✅ **Geração de QR Code** para cada link encurtado
- ✅ **Slugs customizados** definidos pelo usuário
- ✅ **Expiração automática** de links (TTL)
- ✅ **Rate Limiting** para segurança da API

## 🚀 Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js |
| **Banco de Dados** | MongoDB (Persistência) |
| **Cache** | Redis (Performance de Redirecionamento) |
| **QR Code** | qrcode library |
| **Validação** | express-validator |

## 🏗️ Arquitetura e Performance

Este projeto foi desenhado para suportar alta carga de redirecionamentos:

1. **Escrita:** Quando uma URL é encurtada, ela é salva no MongoDB.
2. **Leitura (Redirecionamento):** O sistema primeiro checa o Redis. Se estiver no cache, o redirecionamento ocorre em milissegundos. Se não, busca no MongoDB e popula o cache.
3. **Analytics:** Cliques são registrados de forma assíncrona para não atrasar o redirecionamento do usuário.

## 📋 Instalação

```bash
# Clone o repositório
git clone https://github.com/Beckerr11/url-shortener-api.git
cd url-shortener-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente (.env)
cp .env.example .env

# Inicie o servidor
npm start
```

## 📚 Endpoints Principais

### Encurtar URL
`POST /api/v1/shorten`
```json
{
  "originalUrl": "https://www.google.com/search?q=como+ser+um+dev+melhor",
  "customSlug": "dev-tips"
}
```

### Analytics
`GET /api/v1/analytics/:slug`
Retorna estatísticas detalhadas de acessos.

## 👨‍💻 Autor

**Douglas Silva** — Desenvolvedor Full Stack Júnior  
📧 douglasaparecidodasilva@gmail.com  
🔗 [GitHub](https://github.com/Beckerr11) | [Portfolio](https://douglasdev.tech)
