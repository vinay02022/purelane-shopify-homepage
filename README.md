# Purelane Shopify Homepage Theme Conversion

Production-ready Shopify Online Store 2.0 theme built on top of Shopify's Dawn foundation, reproducing the visual language, glassmorphic styling, and interactions of the Purelane plant-based homecare design prototype.

---

## 5 Required Core Sections Implemented

1. **Hero (`sections/purelane-hero.liquid`)**
   * Responsive split grid with 3-stage animated product showcase stage (`#hstage`).
   * Desktop badge rail & mobile badge strip.
   * Merchant-editable headings, lede copy, CTA buttons, and Stage 1–3 pricing callouts.

2. **Shop / Product Grid (`sections/purelane-product-grid.liquid`)**
   * Native catalog integration reading `collection.products` with star ratings, price discounts, and AJAX Add to Cart form submission hooks.
   * Product title line-clamping and fallback placeholder handling for products missing featured images.
   * High-contrast "Sold out" pill badges for out-of-stock items (`product.available == false`).

3. **Best-Selling Combos (`sections/purelane-combos-rail.liquid`)**
   * Horizontal swipe-oriented combo rail container (`.comborail`) with `scroll-snap-type: x mandatory`.
   * Package savings badges (`.save`), flag tags (`.flag`), and product reference selectors (`product_1`, `product_2`, `product_3`).

4. **Bundles (`sections/purelane-bundles.liquid`)**
   * Tier-based bundle builder cards (Starter, Most popular, Whole home) adapting dynamically from 1 column on mobile to 3 columns on desktop.
   * Product quantity counters (`.qty`), unit price notes ("Flat ₹166 per product"), feature checklists, and gold glowing border highlights (`is_popular == true`).

5. **Reviews Rail (`sections/purelane-reviews-rail.liquid`)**
   * Aggregate review stats header ("4.8 from 8,000+ reviews", "Loved by 12 lakh+ homes").
   * Infinite continuous CSS marquee animation loop (`@keyframes marq`) with pause-on-hover / focus-within controls and `@media (prefers-reduced-motion: reduce)` accessibility compliance.

---

## Theme Architecture & File Map

```
purelane-shopify-homepage/
├── assets/
│   ├── purelane-theme.css             # Main stylesheet (V2 brand variables, glass, typography, grids)
│   └── purelane-theme.js              # Theme JS (ScrollReveals, HeroStage, Parallax, Editor listeners)
├── config/
│   ├── settings_schema.json           # Theme editor config schema
│   └── settings_data.json             # Theme default settings data
├── layout/
│   └── theme.liquid                   # Core shell (Head, Ambient canvas, Header, Footer, Sticky CTA)
├── sections/
│   ├── purelane-hero.liquid           # 01 Hero section
│   ├── purelane-product-grid.liquid   # 02 Shop / Product Grid section
│   ├── purelane-combos-rail.liquid    # 03 Best-selling Combos rail section
│   ├── purelane-bundles.liquid        # 04 Bundles section
│   └── purelane-reviews-rail.liquid   # 05 Reviews rail section
├── snippets/
│   ├── card-product-purelane.liquid   # Reusable product card component
│   ├── card-combo-purelane.liquid     # Reusable combo card component
│   ├── card-tier-purelane.liquid      # Reusable bundle tier component
│   ├── card-review-purelane.liquid    # Reusable review card component
│   ├── price-purelane.liquid          # Liquid price & savings math snippet
│   └── icon-purelane.liquid           # Centralized SVG icon helper
└── templates/
    └── index.json                     # OS 2.0 template specifying section order
```

---

## Performance & Accessibility Highlights

* **Core Web Vitals:** `loading="eager"` and `fetchpriority="high"` on the primary hero image; `loading="lazy"` on downstream product cards.
* **Layout Stability (CLS):** Explicit `aspect-ratio` bounds on image slots prevent reflow during image load.
* **WCAG AA Compliance:** Skip-to-content link, high-contrast focus rings (`outline: 2px solid #4f7d10 !important`), semantic landmarks (`role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`), and full reduced motion support.
