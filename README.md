# Web Development Assignment — Next.js + MySQL

This repo contains a **complete mini-project** per the assignment:

- **Page 1:** `addSchool.jsx` — add schools with validation and image upload.
- **Page 2:** `showSchools.jsx` — list schools like an e-commerce grid.
- **Backend:** Express API + MySQL, stores images in `backend/upload/schoolImages` and serves them at `/schoolImages/...`.

## Quick Start (Local)

### 1) Backend
```bash
cd backend
cp .env.example .env
# Edit DB credentials
npm install
npm run dev
```

> Ensure MySQL is running and a database named in `DB_NAME` exists.

### 2) Frontend
```bash
cd ../frontend
npm install
echo "NEXT_PUBLIC_API_BASE=http://localhost:4000" > .env.local
npm run dev
```

Open http://localhost:3000

- Add schools at `/addSchool`
- View schools at `/showSchools`

## Deploy
- **Backend:** Render, Railway, or a VPS (remember to persist `upload/schoolImages`).
- **Frontend:** Vercel/Netlify — set `NEXT_PUBLIC_API_BASE` to your backend URL.

## MySQL Schema
The backend auto-creates the `schools` table on start:

```
id INT AI PK
name TEXT
address TEXT
city TEXT
state TEXT
contact VARCHAR(20)
image TEXT
email_id TEXT
```

## Notes
- CORS enabled on backend.
- Images served from `http://<backend-host>/schoolImages/<filename>`.
- Validation using react-hook-form.
