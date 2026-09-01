# GrowPilot AI landing page

A dependency-free static early-access and customer-discovery site for `growpilot.ag`. It intentionally positions GrowPilot AI as an in-development product direction, not a launched service.

## Local use

Requires Node 20+ and Python 3.

```sh
npm test
npm run check
npm run serve
# open http://127.0.0.1:8080
```

`npm test` validates the required pages, form fields, SEO primitives, accessibility basics, and no-tracker/no-external-asset policy. `npm run check` performs lightweight structural checks suitable for CI.

## Hosting

The form is a Netlify Form (`growpilot-early-access`) and posts to `success.html`. `netlify.toml` contains cache and security headers. The generated site is the repository root; no build is required.

## Key files

- `index.html` — primary page and Netlify form
- `assets/styles.css` — responsive system-font design system
- `privacy.html`, `terms.html`, `success.html`, `404.html` — supporting routes
- `robots.txt`, `sitemap.xml` — crawler controls
- `.github/workflows/ci.yml` — Node 20 validation workflow
