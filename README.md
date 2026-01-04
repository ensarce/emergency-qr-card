# 🚑 Acil Kart - Emergency Life-Saver QR Card

A Progressive Web App (PWA) that creates a credit card-sized emergency medical information card with a QR code. Perfect for carrying vital health information in your wallet or on your phone.

![Emergency Card Preview](https://via.placeholder.com/400x250/1a1a2e/ffffff?text=Acil+Kart+Preview)

## ✨ Features

- 📱 **PWA Support** - Install on mobile/desktop, works offline
- 🎨 **Premium Design** - Credit card-style with modern UI
- ⚡ **Real-time Preview** - See changes instantly as you type
- 📥 **Download as Image** - Export high-quality PNG for printing
- 💾 **Auto-Save** - Data persists in browser localStorage
- 🌐 **Works Offline** - Full functionality without internet
- 📷 **QR Code** - All info accessible via QR scan

## 🛠️ Tech Stack

- HTML5 / CSS3 / JavaScript (ES6)
- Tailwind CSS (via CDN)
- QRCode.js - QR code generation
- html2canvas - Card image export
- Service Worker - Offline caching

## 📁 Project Structure

```
emergency-qr-card/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── README.md           # Documentation
└── assets/
    ├── css/
    │   └── style.css   # Custom styles
    ├── js/
    │   └── app.js      # Application logic
    └── icons/
        ├── icon-192.png  # PWA icon (192x192)
        └── icon-512.png  # PWA icon (512x512)
```

## ⚠️ IMPORTANT: Add PWA Icons

**Before deploying, you must add PNG icons to the `assets/icons/` folder:**

1. Create a **192x192 pixel** PNG file named `icon-192.png`
2. Create a **512x512 pixel** PNG file named `icon-512.png`

These icons are required for the PWA to install correctly on devices. You can use:
- A simple red heart or medical cross icon
- Your organization's logo
- Any relevant medical/emergency symbol

**Recommended tools for creating icons:**
- [Figma](https://figma.com) (free)
- [Canva](https://canva.com) (free)
- [PWA Asset Generator](https://github.com/nicepkg/pwa-asset-generator)

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository (e.g., `acil-kart`)
3. Initialize with README (optional)

### Step 2: Push Your Code

```bash
# Navigate to project folder
cd emergency-qr-card

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Acil Kart PWA"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/acil-kart.git

# Push to main branch
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**

### Step 4: Access Your App

Your app will be live at:
```
https://YOUR-USERNAME.github.io/acil-kart/
```

*(It may take 1-2 minutes to deploy)*

## 🔧 Local Development

To run locally, you need a local server (Service Worker requires HTTPS or localhost):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📱 Installing as PWA

### On Mobile (Android/iOS):
1. Open the app in Chrome/Safari
2. Tap the "Add to Home Screen" option
3. The app will install with its own icon

### On Desktop (Chrome/Edge):
1. Click the install icon in the address bar
2. Or go to Menu → Install App

## 🎨 Customization

### Change Theme Color
Edit these files:
- `manifest.json` → `theme_color`
- `index.html` → `<meta name="theme-color">`
- `assets/css/style.css` → CSS variables in `:root`

### Modify Card Design
Edit `assets/css/style.css` - look for `.emergency-card` class

### Add/Remove Form Fields
1. Edit `index.html` to add HTML inputs
2. Update `assets/js/app.js`:
   - Add to `elements` object
   - Update `collectFormData()`
   - Update `updatePreview()`
   - Update `formatQRData()`
   - Update `loadSavedData()`

## 🔒 Privacy

- **No server** - All data stays on your device
- **localStorage** - Data saved in browser only
- **No analytics** - No tracking scripts included
- **Works offline** - No internet required after first load

## 📄 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for emergency preparedness
