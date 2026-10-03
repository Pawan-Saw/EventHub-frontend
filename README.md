# Eventra — React Frontend

## Setup
```bash
npm install
npm run dev
```
Opens at http://localhost:5173

## Connect to your Spring Boot backend
Edit `src/services/api.js` — change `BASE_URL` (or set `VITE_API_BASE_URL` in a `.env` file)
to point at your backend, e.g:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

Right now `Events`, `Home`, `Bookings` pages use dummy data from `src/services/mockData.js`
so you can see the UI immediately. Swap those `EVENTS` / `MY_BOOKINGS` imports for real
`api.getEvents()` / `api.getMyBookings()` calls once your backend endpoints match, and wire
`Login.jsx` / `Register.jsx` to `api.login()` / `api.register()`.

## Structure
```
src/
  components/   Navbar, Footer, EventCard, Loading
  pages/        Home, Events, EventDetails, BookTicket, Login, Register, Bookings, Profile
  context/      AuthContext (localStorage-based session)
  services/     api.js (backend calls), mockData.js (placeholder data)
```

## Theme
Black background + yellow/orange (#FFB800) accent throughout — colors live in
`tailwind.config.js` under `theme.extend.colors` (`base`, `accent`).
