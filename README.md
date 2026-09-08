# Stöffa Atelier — Handcrafted Luxury Footwear & Wedges

[![Deploy to GitHub Pages](https://github.com/sandipy/stoffa3/actions/workflows/deploy.yml/badge.svg)](https://github.com/sandipy/stoffa3/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-gold?style=flat-square&logo=github)](https://sandipy.github.io/stoffa3/)
[![License](https://img.shields.io/badge/License-Private%20%2F%20Proprietary-stone?style=flat-square)](LICENSE)

An artisanal e-commerce flagship application for **Stöffa Atelier** (Accesoire), celebrating handcrafted luxury women's footwear, architectural wedges, Kolhapuri-inspired mules, block heels, and artisanal potli bags. Engineered for destination weddings, royal galas, resort getaways, and black-tie celebrations.

---

## 🌐 Live Web Deployment & GitHub Pages

- **Live GitHub Pages URL**: [https://sandipy.github.io/stoffa3/](https://sandipy.github.io/stoffa3/)
- **Repository**: [https://github.com/sandipy/stoffa3](https://github.com/sandipy/stoffa3)
- **Deployment Status**: Automated via GitHub Actions on every push to `main`.
- **Pre-Built Offline Archive**: `stoffa3-offline-production.zip` (contained in this repository root and `public/` folder).

---

## 📦 Offline ZIP Package

For offline exhibitions, client presentations without internet access, or local file review:
1. Locate `stoffa3-offline-production.zip` in the repository root (or download via `/stoffa3-offline-production.zip` from the live site).
2. Unpack the ZIP archive on any computer.
3. Open `index.html` in any modern web browser or serve it using any lightweight static server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
All fonts, high-resolution photography, styles, and interactive state run 100% self-contained with zero external dependencies required.

---

## ✨ Comprehensive Features & Architectural Audit

### 1. Luxury Footwear & Collection Curation
- **Architectural Wedges (2.5", 3.5", 4.25")**: Sculptural wedge heels engineered with broad surface contact area to eliminate lawn and gravel sinking at destination ceremonies.
- **Dual-Density Orthopedic Memory Foam**: Proprietary multi-layer cushioning providing 8+ hours of standing and dancing endurance.
- **Kolhapuri Mules & Embroidered Flats**: Hand-braided calfskin leather uppers with artisan metallic burnishing in champagne, antique gold, pewter, and rose silver.
- **Artisanal Potlis & Evening Bags**: Hand-embroidered evening accessories complementing the footwear edits.

### 2. Interactive Discovery & Sizing
- **Multi-Angle Visual Explorer**: Front, side profile, and detail angles for each style.
- **Side-by-Side Product Comparison Matrix**: Compare heel heights, sole architectures, and materials across multiple silhouettes.
- **Dedicated Product Detail View**: In-depth craftsmanship storytelling, heel stability notes, and white-glove shipping breakdowns.
- **US/EU Sizing & Fit Guide Modal**: Accurate conversion tables with insole centimeters and foot shape recommendations.

### 3. International Commerce & B2B Wholesale
- **Multi-Currency Engine**: Live conversions across USD ($), EUR (€), GBP (£), AED (AED), INR (₹), CAD ($), and AUD ($).
- **International Localization**: Interface support for English, French, Arabic, Hindi, and Spanish.
- **B2B Wholesale Portal**: Dedicated modal for boutique owners, bridal salons, and luxury department store buyers to submit wholesale purchase requests.
- **Affiliate Partner Suite**: Creator portal for fashion stylists, bridal consultants, and influencers to generate tracking handles and view commission tiers.

### 4. Celebrity Spotting & Editorial Lookbook
- **Red Carpet Muses**: Curated spotting cards featuring international red carpets, Cannes gala appearances, and royal Udaipur palace celebrations.
- **Occasion Navigation**: Rapid filters for Destination Weddings, Black-Tie Galas, Mother of the Bride, and Resort Soirées.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4 with custom luxury palette (`stone`, `gold`, `rose`)
- **Icons**: Lucide React
- **Build Tool**: Vite 6 (configured with portable relative base `./` for GitHub Pages and offline bundles)
- **Deployment**: GitHub Actions (`.github/workflows/deploy.yml`) with automated `deploy-pages` integration

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ or 20+ (recommended: Node.js 20 or 22)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/sandipy/stoffa3.git
cd stoffa3
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000` (or `http://localhost:5173`).

### 4. Build for Production & GitHub Pages
```bash
npm run build
```
Compiled static assets are generated in `dist/`, fully optimized with hashed chunks, minified JavaScript, and scoped Tailwind stylesheets.

### 5. Run Linter & Typecheck
```bash
npm run lint
```

---

## 🚀 GitHub Pages Configuration

This repository includes an automated workflow at `.github/workflows/deploy.yml`.

To enable GitHub Pages in your repository settings:
1. Navigate to your repository on GitHub: [https://github.com/sandipy/stoffa3](https://github.com/sandipy/stoffa3)
2. Go to **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Build and deployment** &rarr; **Source**:
   - Select **GitHub Actions**.
4. Every push to `main` will automatically build and publish the live site to:
   👉 **https://sandipy.github.io/stoffa3/**

*(Alternatively, you can select "Deploy from a branch", choose the `gh-pages` branch and `/ (root)` folder).*

---

## 📂 Project Structure

```
stoffa3/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── accesoire_catalog.csv     # Complete B2B catalog manifest
│   └── stoffa3-offline-production.zip # Direct download offline bundle
├── src/
│   ├── assets/images/              # High-resolution editorial & shoe photography
│   ├── components/
│   │   ├── admin/                  # Atelier administrative dashboard
│   │   ├── affiliate/              # Influencer & bridal stylist affiliate portal
│   │   ├── B2BOrderModal.tsx       # Wholesale inquiry engine
│   │   ├── Breadcrumbs.tsx         # Category & occasion breadcrumb trail
│   │   ├── CartDrawer.tsx          # Slide-out luxury shopping bag
│   │   ├── CategoryCollectionSection.tsx # Category gallery cards
│   │   ├── CelebritySpottingSection.tsx  # Red carpet & gala lookbook
│   │   ├── CurrencyModal.tsx       # Multi-currency switcher
│   │   ├── Footer.tsx              # Brand footer & social channels
│   │   ├── Hero.tsx                # Hero presentation banner
│   │   ├── LanguageModal.tsx       # Multi-language locale switcher
│   │   ├── Navbar.tsx              # Sticky header with navigation & cart badge
│   │   ├── OccasionDiscovery.tsx   # Curated event-based shopping filters
│   │   ├── ProductCard.tsx         # Product card with quick preview & add-to-bag
│   │   ├── ProductComparisonModal.tsx # Side-by-side spec comparison
│   │   ├── ProductDetailPage.tsx   # Full-page product display with size guide
│   │   ├── ProductModal.tsx        # Quick-view product modal
│   │   └── QuotaAlertBanner.tsx    # Intelligent system resilience notice
│   ├── context/
│   │   └── CommerceContext.tsx     # Central e-commerce state management
│   ├── data/
│   │   ├── collectionsData.ts      # Occasion edits and curated themes
│   │   ├── heroCollectionsData.ts  # Architectural wedge editorial features
│   │   ├── mockData.ts             # Default catalog models and specs
│   │   ├── productMedia.ts         # Multi-angle imagery mapping
│   │   ├── stoffaCatalog.ts        # Comprehensive product catalog
│   │   └── stoffaMediaAssets.ts    # Celebrity and artisan media assets
│   ├── index.css                   # Tailwind CSS root styling
│   ├── main.tsx                    # React DOM entry point
│   ├── types.ts                    # TypeScript definitions
│   └── vite-env.d.ts
├── index.html                      # HTML5 root template
├── metadata.json                   # Project metadata
├── package.json                    # Project dependencies and npm scripts
├── stoffa3-offline-production.zip  # Packaged offline distribution archive
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite build configuration (base: './')
```

---

## 🔒 Security & Privacy Notice
All sensitive tokens and client credentials are kept strictly out of git history. Environment variables are documented in `.env.example`.

---

© Stöffa Atelier / Accesoire. All rights reserved.
