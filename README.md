# Betania Adane · Personal Website

Portfolio site — [betaniacs.github.io](https://betaniacs.github.io/).

---

## Updating GitHub with your latest changes

### Option 1: Use the update script (easiest)

1. **Open Terminal** (outside Cursor).
2. Run:

   ```bash
   cd ~/personal-website
   ./update.sh
   ```

3. If you're prompted for GitHub login, sign in. Your site updates in 1–2 minutes.

---

### Option 2: Run the commands yourself

```bash
cd ~/personal-website
git add .
git commit -m "Update personal website"
git push origin main
```

---

### First-time setup (only if you haven’t published yet)

If `git push` says **“no remote”** or **“origin” doesn’t exist**:

1. Create a repo on GitHub: [github.com/new](https://github.com/new)  
   - Name: **`betaniacs.github.io`** (for `https://betaniacs.github.io/`)  
   - Public, no README.

2. Then run:

   ```bash
   cd ~/personal-website
   git init
   git add .
   git commit -m "Initial commit: personal website"
   git branch -M main
   git remote add origin https://github.com/betaniacs/betaniacs.github.io.git
   git push -u origin main
   ```

3. Turn on Pages: repo → **Settings** → **Pages** → **Source: main** → Save.

---

### If you edit `~/Documents/Personal Website` instead

Copy the updated files into `~/personal-website` before updating:

```bash
cp ~/Documents/Personal\ Website/index.html ~/personal-website/
cp ~/Documents/Personal\ Website/style.css ~/personal-website/
cd ~/personal-website
./update.sh
```

Or run `git add`, `commit`, and `push` from whichever folder is your actual git repo.
