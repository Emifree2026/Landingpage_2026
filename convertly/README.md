# Emifree — Industrial Air Filtration

Landing page for **Emifree GmbH** (Berlin). Self-cleaning filtration systems for CNC, metalworking, and industrial manufacturing environments.

## Stack

- **React 18** + **Vite 8**
- **Tailwind CSS 3** (utility-first, custom theme in `tailwind.config.js`)
- **framer-motion** for entrance and hover animations
- **lucide-react** for icons
- **React Hook Form** + **Zod** for the inquiry form
- **react-toastify** for success / error toasts
- **React Router 6** for client-side routing

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Sections

The page is composed in `src/pages/Home.jsx`:

1. **Header** — fixed nav with phone CTA, language selector, mobile menu
2. **Hero** — full-bleed video background with overlaid headline + CTA
3. **Applications** — six industrial segments with icons and SEO questions
4. **Products** — tabbed Mechanical / Electrostatic / Dust filtration systems with image gallery, spec sheet, and inquiry modal
5. **Technology** — ECO AIR vs EARIA comparison, step-by-step process, shared benefits, product variants
6. **Knowledge** — tabbed Industry Insights / About Us / Downloads with per-tab SEO meta + JSON-LD
7. **Contact** — inquiry form + contact info cards
8. **Footer** — newsletter signup + site map + legal line

A 404 page (`src/pages/NotFound.jsx`) handles unmatched routes.

## Inquiry form

The Contact form and the in-Product inquiry modal both submit via `react-hook-form` + `zod` validation. Both currently simulate submission with a `setTimeout` and surface a success toast; wire a real endpoint before launch.

## SEO

`Knowledge.jsx` updates `document.title`, `meta[name="description"]`, `<link rel="canonical">`, and appends a JSON-LD `<script>` per active tab. The root `index.html` provides defaults.

## License

Proprietary. See `LICENSE`.
