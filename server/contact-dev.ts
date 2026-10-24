import { Readable } from 'node:stream';
import { loadEnv, type Plugin } from 'vite';
import { POST, GET } from '../api/contact';

// Run the real server handler locally. No credentials are injected into Vite's client.
export function contactDev(): Plugin {
  return {
    name: 'local-contact-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir, ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL']);
      for (const key of ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL']) {
        if (!process.env[key] && env[key]) process.env[key] = env[key];
      }
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/contact') return next();
        try {
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
          }
          const request = new Request(`http://${req.headers.host}${req.url}`, {
            method: req.method,
            headers,
            ...(req.method === 'POST' ? {
              body: Readable.toWeb(req) as ReadableStream<Uint8Array>,
              duplex: 'half',
            } : {}),
          } as RequestInit);
          const response = req.method === 'POST' ? await POST(request) : GET();
          res.writeHead(response.status, Object.fromEntries(response.headers));
          res.end(await response.text());
        } catch {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email service unavailable' }));
        }
      });
    },
  };
}
