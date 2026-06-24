import request from 'supertest';
import app from '../app.js';

describe('URL Shortener Controller', () => {
  describe('POST /api/shorten', () => {
    it('should shorten a valid URL', async () => {
      const response = await request(app)
        .post('/api/shorten')
        .send({
          originalUrl: 'https://www.example.com/very/long/url/that/needs/shortening',
          customAlias: 'mylink',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('shortUrl');
      expect(response.body).toHaveProperty('shortCode');
    });

    it('should return 400 for invalid URL', async () => {
      const response = await request(app)
        .post('/api/shorten')
        .send({
          originalUrl: 'not-a-valid-url',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 409 if custom alias already exists', async () => {
      // First request
      await request(app)
        .post('/api/shorten')
        .send({
          originalUrl: 'https://example.com/first',
          customAlias: 'duplicate',
        });

      // Second request with same alias
      const response = await request(app)
        .post('/api/shorten')
        .send({
          originalUrl: 'https://example.com/second',
          customAlias: 'duplicate',
        });

      expect(response.status).toBe(409);
    });
  });

  describe('GET /:shortCode', () => {
    it('should redirect to original URL', async () => {
      // Create shortened URL
      const createResponse = await request(app)
        .post('/api/shorten')
        .send({
          originalUrl: 'https://www.example.com/redirect-test',
        });

      const shortCode = createResponse.body.shortCode;

      // Redirect
      const response = await request(app)
        .get(`/${shortCode}`)
        .redirects(0);

      expect(response.status).toBe(301);
      expect(response.headers.location).toContain('example.com');
    });

    it('should return 404 for non-existent short code', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .redirects(0);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/stats/:shortCode', () => {
    it('should return analytics for a shortened URL', async () => {
      // Create shortened URL
      const createResponse = await request(app)
        .post('/api/shorten')
        .send({
          originalUrl: 'https://www.example.com/analytics-test',
        });

      const shortCode = createResponse.body.shortCode;

      // Get stats
      const response = await request(app)
        .get(`/api/stats/${shortCode}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('clicks');
      expect(response.body).toHaveProperty('createdAt');
    });
  });
});
