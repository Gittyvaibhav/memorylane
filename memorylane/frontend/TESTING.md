# Frontend Manual Test Instructions

Run the frontend locally and verify auth + protected routes.

Install and run:

```bash
cd memorylane/frontend
npm install
npm run dev
```

Environment:
- To point the frontend to your backend set `VITE_API_URL`, e.g. `VITE_API_URL=http://localhost:5000`.

Manual checks:

- Visit `/register` and create an account. Successful registration stores a JWT in `localStorage` as `token` and redirects to `/dashboard`.
- Visit `/login` and sign in. On success you should be redirected to `/dashboard` and see your email in the navbar.
- Visit `/dashboard` while signed out — you should be redirected to `/login`.
- Click `Logout` in the navbar — `localStorage.token` should be removed and the UI should update.

Notes:
- The frontend expects the backend auth endpoints:
  - `POST /api/auth/register` { email, password } -> { success, data: { token } }
  - `POST /api/auth/login` { email, password } -> { success, data: { token } }
  - `GET /api/auth/me` -> { success, data: { user } }
- If your backend uses a different base path, set `VITE_API_URL` accordingly.
