# Backend (Express + MySQL)

## Setup
1. `cp .env.example .env` and fill DB credentials.
2. `npm install`
3. Ensure MySQL is running and the database exists (`DB_NAME`). The server will auto-create the `schools` table.
4. `npm run dev` (or `npm start`)

## API
- `GET /api/health`
- `POST /api/schools` (multipart/form-data)
  - fields: name, address, city, state, contact, email_id
  - file: image
- `GET /api/schools`

## Static Images
- Served from `/schoolImages/...`
