import app from './app.js';

const port = Number(process.env.PORT || 3000);

const server = app.listen(port, () => {
  console.log(`url-shortener-api listening on port ${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close(() => process.exit(0));
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
