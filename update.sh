#!/bin/bash
# Update your GitHub Pages site with latest changes
# Run in Terminal: cd ~/personal-website && ./update.sh

set -e
cd "$(dirname "$0")"

echo "→ Staging changes..."
git add .

if git diff --staged --quiet; then
  echo "  Nothing to commit. Your site is already up to date."
  exit 0
fi

echo "→ Committing..."
git commit -m "Update personal website"

echo "→ Pushing to GitHub..."
git push origin main

echo ""
echo "✓ Done! Your site will update in 1–2 minutes."
echo "  https://betaniacs.github.io/"
echo ""
