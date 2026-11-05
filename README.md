# Silen Website

Source for the official Silen Linux website — a static site for an independent
Linux distribution built around a minimal foundation, practical tooling, and
reproducible system configuration.

## Preview locally

The site is plain HTML, CSS, and JavaScript with no build step. Serve the
repository root:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Structure

- `index.html` — home page
- `about.html` — project background
- `downloads.html` — installation media and release info
- `css/style.css` — site styles
- `js/main.js` — navigation and page behavior
- `assets/` — fonts, mascot artwork, and icons
- `netlify.toml` — Netlify publish and header configuration

## Deployment

The site deploys as static files from the repository root (see `netlify.toml`).
`.nojekyll` is included so the files can also be served directly from GitHub
Pages without Jekyll processing.
