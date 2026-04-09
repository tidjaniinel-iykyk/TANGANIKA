# Raw Mineral Resources — Static demo site

This is a small static site scaffold for the Raw Mineral Resources Company Ltd. It contains a polished Home page and skeleton pages for Your Minerals, Our Process, Our Ethics, About and Contact.

How to preview locally:

1. Open the project folder in VS Code (this workspace).
2. Use the VS Code Live Server extension, or open `index.html` directly in your browser.

Quick tips:
- Replace the placeholder SVGs in `images/minerals` with real photos you have in `images/minerals`.
- I used an Apple‑style clean hero and grid for the homepage.
 - Next step: we can iterate the home layout, add animations, then create detailed product pages for each mineral from your spreadsheet.

Performance tips:
- Convert large JPEGs to compressed WebP or AVIF files and add responsive srcset variants to serve appropriate image sizes to different devices.
- Use image compression (ImageMagick, Squoosh, or your preferred tool) and generate multiple sizes (small/medium/large) for each photo to reduce payload.
- Serve static files through a CDN and set long cache headers for images, CSS and JS to improve repeat navigations.
- Run Lighthouse (Chrome DevTools) and follow recommendations: reduce unused CSS, lazy load non-critical resources, and inline minimal critical CSS for the hero area.
