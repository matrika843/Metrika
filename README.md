# METRIKA — Cinematic Website (v2)

Dark, cinematic, multi-page React site for METRIKA digital studio.
**We build you. You trust us.**

## Tech stack
- React 19 + Vite 5
- React Router 7 (multi-page SPA)
- GSAP + ScrollTrigger (scroll choreography)
- Lenis (smooth scrolling)
- Tailwind CSS (utility layer) + custom cinematic CSS
- lucide-react (icons)

## Pages
| Route | Page |
|---|---|
| `/` | Home — preloader, hero (video + particles), marquee, about, services, showreel, horizontal project strip, process, CTA |
| `/services` | Detailed services with alternating image blocks |
| `/blog` | Journal — featured post + grid |
| `/contact` | Contact form (opens mail client) + studio info |
| `/signin`, `/signup` | Client portal auth (front-end demo — wire to Supabase/Firebase) |

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build to /dist
```

## Replace placeholders
- Images: search for `picsum.photos` and swap with real project screenshots
- Videos: two Pexels stock URLs in `src/sections/Hero.jsx` and `src/sections/Showreel.jsx` — replace with your showreel (poster image shows if video fails)
- Logo: `public/logo-white.png` (dark backgrounds) and `public/logo.png`

## Deploy
Vercel-ready: `vercel.json` included so all routes rewrite to `index.html`.

## Motion system
Preloader (logo reveal + 0–100 counter + curtain open) → hero line-mask headlines, count-up stats, gold particles → scroll-velocity marquee → word-by-word statement reveal → hover image previews on services → pinned horizontal film-strip projects with progress bar → magnetic buttons, custom gold cursor, film grain + vignette everywhere. `prefers-reduced-motion` is respected.
