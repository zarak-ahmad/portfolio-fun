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

### Option A — Dashboard (easiest)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Set **Root Directory** to `frontend` (important).
4. Framework: Vite (auto-detected). Build: `npm run build`. Output: `dist`.
5. Deploy.

### Option B — Whole repo from root

Root `vercel.json` already builds `frontend/` and publishes `frontend/dist`. Just import the repo and deploy with default settings (no Root Directory change needed).

### Option C — CLI

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
