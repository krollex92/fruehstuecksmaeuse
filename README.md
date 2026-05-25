# Frühstücksmäuse PWA

This is an artisanal breakfast ritual sharing platform for friends, built as a Progressive Web App (PWA).

## Features
- **PWA Ready**: Can be installed on mobile and desktop devices.
- **Glassmorphic Design**: "Sunrise Noir" aesthetic optimized for culinary content.
- **Online Only**: Designed for real-time interaction (no offline storage).

## Publishing to GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Upload the contents of the `dist` folder** to your GitHub repository's `main` or `gh-pages` branch.
3. **Configure GitHub Pages** in your repository settings to serve from the chosen branch.

## PWA Data Elements
- `manifest.json`: Located in the `public` directory (available at the root after build).
- `sw.js`: Service worker for installability, located in the `public` directory.
- `index.html`: Linked manifest and service worker registration.

## Customization
- Replace `public/icon-192.png` and `public/icon-512.png` with your own app icons.
- Update `public/manifest.json` with your specific app name and colors if desired.
