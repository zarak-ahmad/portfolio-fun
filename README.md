# Developer Command Center

A MERN-stack portfolio themed like a VS Code / terminal command center — with a live project grid and a phone-friendly admin CMS for real-time demos.

## Stack

| Layer | Tech |
|-------|------|
| Backend | Node, Express, MongoDB, Mongoose |
| Frontend | React (Vite), Tailwind CSS v4, Framer Motion, React Router, Axios |
| Theme | One Dark Pro inspired (CSS variables) |

## Project structure

```
portfolio/
├── backend/
│   ├── middleware/auth.js
│   ├── models/Project.js
│   ├── routes/projects.js
│   ├── server.js
│   └── .env
└── frontend/
    └── src/
        ├── api/axios.js
        ├── components/  (Layout, Sidebar, Hero, ProjectCard)
        └── pages/       (Home, Projects, AdminDashboard)
```

## Prerequisites

- Node.js 18+
- Local MongoDB running on `mongodb://127.0.0.1:27017`
- (Optional) [ngrok](https://ngrok.com/) for phone/admin demos

## Install dependencies

Already done if you followed the setup. To reinstall:

```bash
# Backend
cd backend
npm install express mongoose cors dotenv
npm install -D nodemon

# Frontend
cd frontend
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install framer-motion axios react-type-animation react-router-dom
```

## Run both servers

Open **two terminals**:

**Terminal 1 — API (port 5000)**

```bash
cd backend
npm run dev
```

**Terminal 2 — React (port 5173)**

```bash
cd frontend
npm run dev
```

Then open:

- Portfolio: http://localhost:5173
- Projects: http://localhost:5173/projects
- Admin CMS: http://localhost:5173/admin
- API health: http://localhost:5000

### Auth secrets

| Where | Value |
|-------|-------|
| Admin login password (frontend) | `adminsecret` |
| API `Authorization` header (POST) | `adminsecret` |
| Backend `.env` `ADMIN_SECRET` | `adminsecret` |

## API

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/api/projects` | Public | List all projects |
| `POST` | `/api/projects` | Header `Authorization: adminsecret` | Create a project |

Example create:

```bash
curl -X POST http://localhost:5000/api/projects ^
  -H "Content-Type: application/json" ^
  -H "Authorization: adminsecret" ^
  -d "{\"title\":\"Demo App\",\"description\":\"Live from the terminal\",\"techStack\":[\"React\",\"Node\"],\"liveUrl\":\"\",\"githubUrl\":\"\",\"imageUrl\":\"\"}"
```

## Live demo with ngrok (phone admin)

So you can add projects from your phone during a presentation:

1. Start backend + frontend as above.
2. Expose the **backend** (or the whole stack via frontend proxy — simplest is expose both or just use LAN; for internet, expose frontend and point `VITE_API_URL` at an ngrok URL for the API):

```bash
# Terminal 3 — expose API
ngrok http 5000
```

3. Copy the HTTPS forwarding URL (e.g. `https://abc123.ngrok-free.app`).
4. In `frontend/.env`, set:

```env
VITE_API_URL=https://abc123.ngrok-free.app/api
```

5. Restart the Vite dev server, then optionally expose the frontend too:

```bash
ngrok http 5173
```

6. On your phone, open the frontend ngrok URL → `/admin` → login with `adminsecret` → submit a project → refresh `/projects` on the laptop to see it appear live.

> Tip: For a quick classroom demo on the same Wi‑Fi, skip ngrok and open `http://YOUR_LAN_IP:5173` on your phone (update CORS/API URL if needed).

## Environment

**backend/.env**

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dev-command-center
ADMIN_SECRET=adminsecret
```

**frontend/.env**

```env
VITE_API_URL=http://localhost:5000/api
```
