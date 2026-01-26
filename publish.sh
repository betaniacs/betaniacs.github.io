#!/bin/bash
# Publish personal website to GitHub
# Run in Terminal: cd ~/personal-website && ./publish.sh

set -e
cd "$(dirname "$0")"

echo "→ Initializing git..."
git init
git add .
git commit -m "Initial commit: personal website"
git branch -M main

echo ""
echo "→ Repo ready. Next:"
echo "  1. Create a new repo at https://github.com/new (e.g. name: personal-website)"
echo "     → Public, no README/.gitignore"
echo "  2. Run:"
echo "     git remote add origin https://github.com/YOUR_USERNAME/personal-website.git"
echo "     git push -u origin main"
echo "  3. GitHub → Settings → Pages → Source: main branch → Save"
echo ""
echo "  Your site will be at: https://YOUR_USERNAME.github.io/personal-website/"
echo ""
