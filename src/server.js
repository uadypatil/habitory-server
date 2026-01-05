/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  Server Core • Modular API Runtime
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

'use strict';
require('dotenv').config();

// ── Core Dependencies ─────────────────────────────────────────────────────────
const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ── Environment Configuration ────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ── App Initialization ────────────────────────────────────────────────────────
const app = express();

// ── Global Middleware ─────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'online',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── Dynamic Route Loader ──────────────────────────────────────────────────────
const routesPath = path.join(__dirname, 'route');

fs.readdirSync(routesPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const route = require(path.join(routesPath, file));

    if (typeof route === 'function') {
      // Mount all routes under /app/*
      app.use('/apo', route);
      console.log(`✔ Route loaded: ${file}`);
    }
  });

// ── Fallback Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
  });
});

// ── Server Bootstrap ──────────────────────────────────────────────────────────
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    `⚡ API live on port ${PORT} • ${NODE_ENV.toUpperCase()} MODE`
  );
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('🛑 Graceful shutdown initiated...');
  server.close(() => {
    console.log('✅ Server terminated safely.');
    process.exit(0);
  });
}

module.exports = app;
