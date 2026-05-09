# 💜 Mom's Mother's Day Website

A beautiful purple-themed Mother's Day site with an animated lily, heartfelt message, and photo collage.

---

## 🚀 Deploy in 10 Minutes (Free)

### Step 1 — Put your code on GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **"New repository"** (the green button)
3. Name it something like `moms-website`, set it to **Public**, click **Create**
4. On the next screen, click **"uploading an existing file"**
5. Drag ALL the files from this folder into the upload area:
   - `index.html`
   - `style.css`
   - `lily.js`
   - `app.js`
   - `photos.js`
   - The `photos/` folder (even if empty for now)
6. Click **"Commit changes"**

---

### Step 2 — Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) and sign up free (use your GitHub account)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → select your `moms-website` repo
4. Leave all settings as default, click **"Deploy site"**
5. In ~60 seconds you'll get a live URL like `https://sparkly-lily-abc123.netlify.app`

**That's it! Share the link with your mom 💜**

---

## 📷 Adding Permanent Photos

1. Put your image files (jpg, png, webp) into the `photos/` folder
2. Open `photos.js` and add the filenames to the array:

```js
const PHOTOS = [
  "photos/christmas2022.jpg",
  "photos/beach_trip.jpg",
  "photos/birthday_2023.png",
];
```

3. Go back to GitHub → your repo → drag in the updated files → Commit
4. Netlify auto-redeploys in about 30 seconds ✅

---

## ✏️ Personalizing the Message

Open `index.html` and find the section with `class="msg-body"` — edit the text to your own words!

---

## 🎨 Customizing

- **Colors**: Edit the CSS variables at the top of `style.css` under `:root`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Message**: Edit the text in the `#tab-message` section of `index.html`
