# ToyTopia

A warm, playful marketplace for discovering toys. ToyTopia is a React storefront built around a friendly, kid-attracting toy-shop experience — bright category tiles, star ratings, a curated home feed, and a clean, modern checkout-ready product page.

## Features

- **Browse & discover** — home feed with trending toys, category tiles, and a "shop by age" section.
- **Catalog** — filter by category, free-text search, and sort by popularity, price, or rating.
- **Product pages** — image, price, rating with review counts, quick specs, related toys, and an add-to-bag action backed by a lightweight cart.
- **Accounts** — email/password and Google sign-in via Firebase, plus a profile and a saved-items (wishlist) view.
- **Brand system** — warm cream/coral palette, Baloo 2 display type, Nunito body, and fully local assets (no external image or font dependencies).

## Tech stack

- **React 18** + **Vite 7**
- **Tailwind CSS 3.4** with a custom brand token set (`tailwindcss-animate` plugin)
- **framer-motion** for entrance/hover motion
- **lucide-react** for icons
- **react-router-dom** for routing
- **Firebase** (Auth) for login and accounts
- **@fontsource-variable** for local Baloo 2 + Nunito fonts

> Note: `daisyui`, `swiper`, `aos`, `lottie-react`, and `react-spinners` remain in `package.json` as legacy dependencies, but the current UI is hand-built with Tailwind tokens and is not dependent on them.

## Getting started

### Prerequisites

- Node.js 18+
- A Firebase project (for authentication)

### Install

```bash
npm install
```

### Environment

Create a `.env` file in the project root with your Firebase web config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Analytics is only initialized in production builds, so `VITE_FIREBASE_MEASUREMENT_ID` is optional for local development.

### Run

```bash
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  assets/        # local images (hero + product photos) and generated tiles
  components/    # Navbar, Footer, Brand (logo/icons), Shared/ToyCard, ui/*
  data/          # toys.js (local product catalog)
  lib/           # cart.js (localStorage-backed cart)
  pages/         # Home, AllToys, ToyDetails, Login, Register, ForgotPassword, Profile, Favorites, ErrorPage
  config/        # firebase.js
  context/       # AuthContext
```

## Notes

- All product and hero imagery is bundled locally, so the app renders fully offline (no broken external image links).
- Text and surface colors are tuned for AA contrast on the cream background.
- The cart and wishlist persist in `localStorage` for the demo experience.
