import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// In production (Vercel) the /api folder is deployed as serverless functions.
// In local dev this tiny middleware routes /api/* to the same handler files,
// so the booking flow can be tested end to end with `npm run dev`.
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();
        const name = req.url.slice('/api/'.length).split('?')[0];
        try {
          const mod = await server.ssrLoadModule(`./api/${name}.js`);
          await mod.default(patchReq(req), patchRes(res));
        } catch (e) {
          console.error(`[api/${name}]`, e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal error' }));
        }
      });
    },
  };
}

function patchReq(req) {
  const url = new URL(req.url, 'http://localhost');
  req.query = Object.fromEntries(url.searchParams);
  return req;
}

function patchRes(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return res; };
  return res;
}

export default defineConfig(({ mode }) => {
  // Load .env into process.env so the local /api handlers (Resend, Google
  // Calendar) can read their keys during `npm run dev`, just like on Vercel.
  const env = loadEnv(mode, process.cwd(), '');
  for (const k of [
    'RESEND_API_KEY', 'BOOKING_TO', 'BOOKING_FROM',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_CALENDAR_ID',
  ]) {
    if (env[k] && !process.env[k]) process.env[k] = env[k];
  }

  return {
    plugins: [react(), localApi()],
    server: {
      // Respect the port assigned by the environment (e.g. preview panel);
      // falls back to Vite's default when PORT is not set.
      port: Number(process.env.PORT) || undefined,
    },
  };
});
