# Zarak Portfolio

Frontend-only portfolio for **Zarak Ahmad** (React + Vite + Tailwind) — ready for **Vercel free tier**. No Express/MongoDB required.

## Why frontend-only?

Vercel’s free hobby plan is built for static/frontend apps. This project now stores:

| Data | Where |
|------|--------|
| Your 5 showcase projects | Bundled in the app (`src/data/projects.js`) |
| Projects added via `/admin` | Browser **localStorage** (great for live demos on that device) |

The old `backend/` folder can stay for learning, but **you do not need it to deploy**.

## Local run

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:6100  
Admin password: `adminsecret`

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → import **zarak-portfolio**.
3. Set **Root Directory** to `frontend`.
4. Leave Install / Build commands as defaults (`npm install`, `npm run build`).
   - If you previously set `npm install --prefix frontend`, **clear that override** — it causes a double `frontend/frontend` path error.
5. Output directory: `dist` (auto with Vite).
6. Deploy.

Or from CLI:

```bash
cd frontend
npx vercel
```

## After deploy

- Home: `https://your-app.vercel.app/`
- Projects: `https://your-app.vercel.app/projects`
- Admin: `https://your-app.vercel.app/admin`

## Notes for demos

- Admin-added projects are saved **in that browser only** (localStorage). Clearing site data removes them; the 5 built-in projects always remain.
- To permanently add a project for everyone, edit `frontend/src/data/projects.js` and redeploy.
