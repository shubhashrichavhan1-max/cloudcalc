# ☁ CloudCalc — Web Calculator
### Mini Project: Web Application Hosted on Public Cloud

---

## 📁 Project Structure

```
calculator-app/
├── index.html     ← Main HTML structure
├── style.css      ← All styles and animations
├── script.js      ← Calculator logic + keyboard support
└── README.md      ← This file
```

---

## ✨ Features

- ✅ Full arithmetic: Addition, Subtraction, Multiplication, Division
- ✅ Percentage (%) and Negation (+/−) functions
- ✅ Chained operations (e.g., 5 + 3 × 2 = )
- ✅ Live expression display above the screen
- ✅ Ripple button animations
- ✅ **Full keyboard support** (see below)
- ✅ Responsive design — works on mobile & desktop
- ✅ Error handling (division by zero)
- ✅ No dependencies — pure HTML, CSS, JavaScript

---

## ⌨️ Keyboard Shortcuts

| Key           | Action           |
|---------------|------------------|
| `0–9`         | Enter number     |
| `.` or `,`    | Decimal point    |
| `+`           | Addition         |
| `-`           | Subtraction      |
| `*`           | Multiplication   |
| `/`           | Division         |
| `Enter` / `=` | Calculate result |
| `Escape`      | Clear (AC)       |
| `Backspace`   | Delete last digit|
| `%`           | Percentage       |

---

## 🚀 Cloud Deployment Guide

### Option 1: GitHub Pages (Free, Easiest)
1. Create a new GitHub repository
2. Upload all 4 files (`index.html`, `style.css`, `script.js`, `README.md`)
3. Go to **Settings → Pages**
4. Set **Source** to `main` branch, folder `/root`
5. Click **Save** — your URL: `https://yourusername.github.io/repo-name/`

---

### Option 2: Netlify (Free, Drag & Drop)
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **Add New Site → Deploy Manually**
3. Drag and drop the entire `calculator-app/` folder
4. Your app is live instantly with a public URL!

---

### Option 3: AWS S3 Static Website
1. Log in to AWS Console → S3 → **Create Bucket**
2. Uncheck "Block all public access"
3. Upload all 4 files to the bucket
4. Go to **Properties → Static website hosting** → Enable
5. Set `index.html` as the index document
6. Go to **Permissions → Bucket Policy**, add:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
     }]
   }
   ```
7. Access via the S3 website endpoint URL

---

### Option 4: Google Cloud Storage
1. Open GCP Console → Cloud Storage → **Create Bucket**
2. Choose a unique name, set region
3. Upload all 4 files
4. Go to **Permissions → Grant Access** → add `allUsers` with `Storage Object Viewer`
5. Click the 3-dot menu on the bucket → **Edit website configuration**
6. Set `index.html` as the main page
7. Access via: `https://storage.googleapis.com/YOUR-BUCKET-NAME/index.html`

---

### Option 5: Vercel (Free, CLI or GitHub)
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project folder
cd calculator-app

# Deploy
vercel

# Follow the prompts — you'll get a live URL!
```

---

### Option 6: Azure Static Web Apps
1. Go to Azure Portal → Create → **Static Web App**
2. Connect your GitHub repo
3. Set build output to `/` (root)
4. Azure auto-deploys on every push via GitHub Actions

---

## 🛠️ Local Development

Simply open `index.html` in your browser — no build step, no server needed!

```bash
# Optional: Use a local server
npx serve .
# or
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

---

## 📐 Technologies Used

| Technology | Usage |
|-----------|-------|
| HTML5     | Semantic markup, button grid |
| CSS3      | Grid, animations, CSS variables, responsive design |
| Vanilla JS| Calculator logic, keyboard events, DOM manipulation |
| Google Fonts | Syne (display) + DM Mono (numbers) |

---

## 👨‍💻 Project Info

- **Type**: Mini-Project — Web Application on Public Cloud
- **Year**: 2026
- **Stack**: Pure HTML/CSS/JS (Zero dependencies)
- **Hosting**: Compatible with all major cloud platforms

---

*Built with precision. Deployed on the cloud.*
