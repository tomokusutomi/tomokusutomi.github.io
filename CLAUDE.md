# CLAUDE.md

## Project Overview

This is the corporate website for **株式会社ナガサキ企画 (Nagasaki Kikaku, Inc.)** — a marketing, customer acquisition, and business development consultancy based in Nagasaki, Japan. The site is hosted on **GitHub Pages** with a custom domain (`www.nagasaki-kikaku.com`).

## Repository Structure

```
/
├── index.html        # Main single-page website (all content lives here)
├── style.css         # All styling — base, layout, animations, responsive
├── home.html         # Legacy redirect page (/home → /)
├── CNAME             # GitHub Pages custom domain: www.nagasaki-kikaku.com
├── _redirects        # Netlify-style redirect rule (/home → / with 301)
├── robots.txt        # Search engine crawling rules
├── sitemap.xml       # XML sitemap for SEO
└── assets/
    ├── logo.png      # Company logo (used in header)
    ├── favicon.png   # Favicon (32x32, 16x16, apple-touch-icon)
    └── thumbnail.png # OG/Twitter card preview image
```

## Technology Stack

- **Pure HTML/CSS/JS** — no build tools, no frameworks, no package manager
- **GitHub Pages** for hosting (deployed from `master` branch)
- **Google Fonts**: Zen Kaku Gothic New (weights 400, 500, 700)
- **Google Analytics**: tag ID `G-TRCMHT8680`
- No test suite, linter, or CI/CD pipeline

## Development Workflow

### Deploying Changes

This is a static site served directly by GitHub Pages. Pushing to `master` triggers an automatic deployment — there is no build step.

### Local Preview

Open `index.html` directly in a browser, or use any local HTTP server:
```bash
python3 -m http.server 8000
```

### No Build or Test Commands

There are no `npm`, `yarn`, or other package manager commands. No tests exist. Changes are verified visually in-browser.

## Architecture & Key Patterns

### Single-Page Layout

`index.html` contains the entire site as a single scrolling page with four sections:
1. **Hero** (`section.hero`) — tagline "誇るを、つくる。" with animated shape and line-by-line text reveal
2. **Services** (`section.services#services`) — bulleted list of service offerings
3. **Company** (`section.company#company`) — company info table (name, corporate number, founding date)
4. **Contact** (`section.contact#contact`) — email link

### CSS Architecture

All styles live in a single `style.css` file organized as:
1. **Base** — reset, body typography, container
2. **Header** — fixed logo positioning
3. **Hero** — grid layout, morphing shape animation (`@keyframes morphShape`)
4. **Sections** — shared section patterns, service list, company table, contact
5. **Footer** — centered copyright
6. **Reveal animations** — scroll-triggered fade-in (`.reveal`, `.line-reveal`)
7. **Mobile animation** — `@keyframes morphShapeMobile` (safer clip-path values)
8. **Responsive** — `@media (max-width: 768px)` breakpoint

### JavaScript (Inline in index.html)

Two self-executing IIFEs at the bottom of `index.html`:

1. **Hero parallax/follow** — the `.hero-mark` element follows cursor/touch position with easing, scale, and dynamic box-shadow
2. **Scroll reveal** — `IntersectionObserver`-based fade-in for `.reveal` sections and sequential `.line-reveal` text lines

### CSS Animation Details

The hero shape (`.hero-mark`) uses a complex `clip-path` animation that morphs through: **circle → triangle → organic blob → square → shrinking square → circle** over 18 seconds. There are separate keyframe sets for desktop (`morphShape`) and mobile (`morphShapeMobile`) with tighter coordinates to prevent overflow clipping.

## Conventions

### Language

- All user-facing content is in **Japanese**
- Commit messages are written in **Japanese** (describing changes concisely)
- Dates use **Reiwa era** format (e.g., 令和7年 = 2025)

### Styling Conventions

- Brand color: `#FF3702` (red-orange, used for hero shape and section dots)
- Text color: `#180707` (near-black)
- Background: `#EAEAEC` (light gray)
- Font size base: 14px
- Line height: 2.4 (generous for Japanese text readability)
- Container max-width: 960px with 80px left padding (40px on mobile)
- The logo is `position: fixed` at top-left

### SEO

- Full Open Graph and Twitter Card meta tags
- JSON-LD structured data (`Organization` schema)
- Canonical URL set to `https://nagasaki-kikaku.com/`
- `robots.txt` allows all crawlers
- `sitemap.xml` with single URL entry

## Important Notes for AI Assistants

- **No build step** — edit files directly; changes deploy on push to `master`
- **Commit messages should be in Japanese**, matching the existing convention
- **Preserve the Reiwa era date format** (令和7年 for 2025)
- **Keep inline JS** in `index.html` — do not extract to separate files unless explicitly asked
- **Keep all CSS in `style.css`** — do not split into multiple files
- **The hero animation is deliberately complex** with many keyframe steps for smoothness — do not simplify unless asked
- **Mobile breakpoint is 768px** — test both desktop and mobile layouts when making visual changes
- **The `home.html` is a legacy redirect** — it should not be modified or deleted
- **Be careful with `clip-path` values** on mobile — past commits show extensive debugging of overflow/clipping issues
- **Google Analytics is active** — do not remove or modify the tracking snippet unless asked
