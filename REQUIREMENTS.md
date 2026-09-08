# E-commerce Platform Requirements Specification

**Project:** Advanced E-commerce Product Catalog & Ordering System  
**Version:** 1.0 (September 2026)  
**Purpose:** Develop a fully featured, modern e-commerce storefront with advanced filtering, previews, pricing, user experience enhancements, and B2B ordering capabilities.  
**Target Technologies:** React 19, TypeScript, Tailwind CSS v4, Motion, Gemini 3.8 Flash (AI-assisted development), CSV data import/export.  
**Implementation Status:** Active Implementation  

---

## 1. Project Overview

A responsive, high-performance e-commerce platform featuring:
- Dynamic product collection grid with sophisticated filtering & sorting
- Product cards with enhanced hover-based Quick View previews and tactile zoom animations
- Full product modal with category-based recommendations and multi-channel share functionality
- NavBar with breadcrumb path tracking, real-time multi-field search, and multi-currency support (USD, EUR, CAD)
- B2B ordering and bulk purchase matrix with tiered volume pricing and "Add to list" bulk builder
- Simulated order tracking with shipping progress timeline and carrier status in the footer
- Design import from `junn.ca` and `antlertryimportingallproductsfromstoffestyle.com`
- CSV Catalog management: export catalog to CSV, import products from CSV, and live price adjustment with validation
- Storytelling seasonal campaign text editor above the collection grid
- Language change confirmation warning modal before applying localized translations
- Resilient quota limit handling and graceful fallback patterns

**Key Principle:** All AI-generated product models must display the **same shoe** (or consistent footwear), with no random shoe variations for bags, 1-lung models, 1-mid models, or 1-cu models.

---

## 2. Frontend Features & UI Requirements

### 2.1 Sorting & Filtering (Collection Section)
Implement a **sorting dropdown** in the product collection section supporting:
- `Low to High` (Price: Low to High)
- `Price: High to Low`
- `Newest Arrivals`
- `Featured / Curated`

### 2.2 Size & Attribute Filters
- **Size selection dropdown or pill-based filter** under Category Filter tabs to filter the current product collection by available sizes (e.g., All Sizes, EU 36, EU 37, EU 38, EU 39, EU 40, EU 41, One Size).
- **Side-by-side product comparison modal** triggered from any ProductCard, displaying two selected products' attributes (material, price, dimensions, category, rating, inventory status, colorways).

### 2.3 Product Cards (ProductCard Component)
- **Quick View button** on each ProductCard that triggers a **hover-based preview overlay** showing essential product details (materials, price, size availability, stock status, ratings) without opening the full modal.
- **Subtle "zoom-in" CSS animation** on the product image within the card to improve the tactile feel of the collection grid (`group-hover:scale-105 transition-transform duration-500 ease-out`).
- **Low Stock badge** displayed when a product has fewer than 3 items remaining in its size inventory (`Low Stock: Only X left`).

### 2.4 Product Modal (ProductModal)
- **Recommended for You** section displaying 3–4 related products based on the current product's category.
- **Share button** that generates a shareable link (with copy to clipboard toast) or opens social media intents (Twitter/X, WhatsApp, Pinterest, Facebook, Email) for the specific product.
- **B2B Bulk Inquiry & Ordering trigger** right at the product modal for instant commercial orders.

### 2.5 NavBar
- **Breadcrumb navigation bar** under the main NavBar to help users track their path when switching between categories and product views.
- **Search input field** that allows real-time filtering of the product collection by name, material, or description.
- **Currency selector dropdown** in the top-right corner supporting USD, EUR, and CAD. All displayed prices update dynamically.

### 2.6 Background & Images
- **Enhance every image** in the background to be **4x upscale, retina HD, and zoomed in for details** — so they are sharp and clear.
- Use high-resolution CDN assets with optimized sharpness and crisp DPR rendering.

---

## 3. B2B & Ordering Features

### 3.1 Bulk Ordering
- **B2B inquiry and ordering interface** right at the product page and collection view.
- **"Add to list" functionality** where users can add items at once for bulk orders, specify per-size quantities, view tiered wholesale discounts (e.g. 15% for 10+, 25% for 30+, 35% for 50+ units), and generate formal commercial invoices/quotations.

### 3.2 Order Tracking
- **Simple order status tracker interface** using a tracking number input field in the **footer** to display the simulated shipping progress of a purchase.
- Interactive multi-stage shipping progression: Order Confirmed → Verified & Packaged in Florence/Porto → Handed to Courier (DHL Express/FedEx) → In Transit / Customs Cleared → Out for Delivery → Delivered.

---

## 4. Data & Content Management

### 4.1 CSV Import & Editing
- **Import all products** from CSV (inspired by `stoffestyle.com`) with header validation, parsing, and preview.
- **Editable description field** above the product collection grid that can be populated with seasonal campaign storytelling text.
- Allow users to **download the current catalog as CSV** and **change prices** (with appropriate positive-numeric validation).

---

## 5. Technical & Implementation Notes

- **All AI-generated product models** must consistently display the **same shoe** (no random shoes for bags, 1-lung, 1-mid, or 1-cu variants).
- Use the **same shoe design** across all generated product images and models.
- **Language warning** must be shown and acknowledged before proceeding with any language selection.
- **Quota limits handling**: When quota limits or model provider errors occur, provide clear retry prompts or fallback responses.
- **MD file creation**: Automatically generated and maintained in this file.

---

## 6. Execution Roadmap

1. [x] Create the REQUIREMENTS.md specification file.
2. [x] Consistency check on AI media assets (`productMedia.ts`) to ensure single uniform footwear silhouette.
3. [x] Enhance CommerceContext with sorting, size filtering, search filtering, catalog updates, price editing, CSV import/export, editable story description, B2B bulk list, and order tracking.
4. [x] Add Language Change Confirmation Warning Modal to avoid accidental locale switching.
5. [x] Implement Breadcrumbs & Search bar in NavBar.
6. [x] Add Sorting dropdown & Size filter pills/dropdown in Collection Grid header.
7. [x] Add Storytelling editable description above collection grid.
8. [x] Enhance ProductCard with hover Quick View preview, zoom-in animation, Low Stock badge, and Compare button.
9. [x] Implement Side-by-Side Product Comparison Modal.
10. [x] Enhance ProductModal with "Recommended for You" carousel/grid, Multi-channel Share modal/links, and B2B bulk inquiry.
11. [x] Implement B2B Bulk Ordering modal with "Add to list" matrix and quotation export.
12. [x] Implement Footer Order Tracker with live shipment timeline simulator.
13. [x] Implement CSV Import / Export / Price Edit modal with validation.
14. [x] Implement AI Quota Limits & Fallback handling notification banner.
15. [x] Verify complete compilation and linting.
