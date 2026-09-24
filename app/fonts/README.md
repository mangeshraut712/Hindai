# Locally hosted site fonts

The GitHub Pages build uses these WOFF2 subsets through `next/font/local` so
it never needs to fetch Google Fonts at build time. The font files were
retrieved from Google's official Fonts CSS endpoint (2026-09-24):

- Manrope, Latin, weights 400–600: https://fonts.google.com/specimen/Manrope
- Cormorant Garamond, Latin, weights 400–600: https://fonts.google.com/specimen/Cormorant+Garamond
- Noto Serif Devanagari, Devanagari, weights 400–700: https://fonts.google.com/noto/specimen/Noto+Serif+Devanagari

Each font's SIL Open Font License is included beside it.
