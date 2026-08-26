import express from 'express';

const app = express();

app.use(express.json());

const links = new Map();
let sequence = 0;

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function nextShortCode() {
  sequence += 1;
  return sequence.toString(36).padStart(6, '0');
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/shorten', (req, res) => {
  const { originalUrl, customAlias } = req.body ?? {};

  if (!isValidHttpUrl(originalUrl)) {
    return res.status(400).json({ message: 'A valid HTTP(S) URL is required.' });
  }

  const shortCode = customAlias?.trim() || nextShortCode();

  if (links.has(shortCode)) {
    return res.status(409).json({ message: 'This alias is already in use.' });
  }

  const link = {
    originalUrl,
    shortCode,
    clicks: 0,
    createdAt: new Date().toISOString(),
  };

  links.set(shortCode, link);

  return res.status(201).json({
    shortCode,
    shortUrl: `http://localhost/${shortCode}`,
  });
});

app.get('/api/stats/:shortCode', (req, res) => {
  const link = links.get(req.params.shortCode);

  if (!link) {
    return res.status(404).json({ message: 'Short URL not found.' });
  }

  return res.json({
    shortCode: link.shortCode,
    originalUrl: link.originalUrl,
    clicks: link.clicks,
    createdAt: link.createdAt,
  });
});

app.get('/:shortCode', (req, res) => {
  const link = links.get(req.params.shortCode);

  if (!link) {
    return res.status(404).json({ message: 'Short URL not found.' });
  }

  link.clicks += 1;
  return res.redirect(301, link.originalUrl);
});

export default app;
