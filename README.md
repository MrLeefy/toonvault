# ToonVault

ToonVault is a mobile-first, WEBTOON-style reader PWA built with Next.js 16 App Router and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on a desktop browser or mobile device. For a production build:

```bash
npm run build
npm start
```

Useful scripts:

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm start` — serve the production build
- `npm run lint` — run ESLint

## Project structure

```text
src/app/(main)       Main browsing routes and mobile app shell
src/app/(reader)     Distraction-free episode reader routes
src/components/layout  Shared header, shell, and bottom navigation
src/components/ui    Reusable presentation components
public/manifest.webmanifest  PWA manifest and app icon
```

The PWA manifest uses the scalable `public/icon.svg` app icon.

The current stories, episodes, and artwork are original mock data intended to be replaced with an API or CMS when the product is ready for live content.

## Brand notice

ToonVault is an independent demo product and is not affiliated with, endorsed by, or sponsored by WEBTOON or Naver.
