#!/usr/bin/env bash
# Copy Vite dist output to the repo root so legacy GitHub Pages
# (Deploy from branch: main /) serves the production build.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if [[ ! -d dist/assets || ! -f dist/index.html ]]; then
  echo "sync-pages: dist/ missing — run vite build first" >&2
  exit 1
fi

rm -rf assets
cp -R dist/assets assets
cp dist/index.html index.html
cp dist/favicon.svg favicon.svg
cp dist/icons.svg icons.svg
touch .nojekyll

if grep -q 'src/main.tsx' index.html; then
  echo "sync-pages: refusing to publish Vite source index.html" >&2
  exit 1
fi

echo "sync-pages: published dist → repo root (index.html, assets/, favicon.svg)"
