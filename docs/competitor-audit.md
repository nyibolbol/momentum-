# Competitor audit — painfreeaussies.com.au

**Audited:** 7 November 2026 · **Device:** mobile (390 px wide, iPhone user agent) · **Pages:** Home, best-selling product, Best Sellers collection, cart drawer and cart page

**Purpose:** Record the competitor's **layout and conversion patterns**, so Aussie Home Goods can match or beat them in our own Dawn sections. **We will not copy** their copy, images, colours, logo or brand name. Quoted copy appears only so we know what to avoid. See §6.

---

## 0. What's actually under the hood (corrects some assumptions)

| Item | What we found | Notes for us |
|---|---|---|
| Theme | Dawn **15.0.0** (theme name "Collection page design") | Same base we'll use. |
| Page builder | Shogun scripts load on every page (~130 references), **but** home and product content come from **custom Dawn sections** (`c2_comfy_glass_hero`, `product_icon_benefits`, `shop_by_pain_slider`, `multicolumn_metafields`, `metafield_faq`, `custom_video_section_metafields`) | Their product pages run on **metafields + custom sections**, which is the approach we plan to take. The Shogun script is dead weight they still load. |
| Reviews | **Judge.me** (shows on the product page and the star ratings on product cards). Loox is installed too, with scripts on every page. | Running two review apps duplicates scripts. We'll pick one. |
| Bundles | **Kaching Bundles**. Only one tier is set up: "Pack of 2 = 2 Units", with a "HOT DEAL" badge. | The product is sold as a forced 2-pack. Each unit drops to $65 in the cart, so it works as buy-one-get-one at $129.99. |
| Sticky add-to-cart | An app ("sticky-add-to-cart" extension) is installed. Kaching's own sticky bar is **disabled**. | **No sticky add-to-cart bar showed up on mobile** in our test. That leaves an easy gap for us to fill. |
| Frequently Bought Together | Code Black Belt FBT app | Shown at the bottom of the product page |
| Post-purchase | AfterSell + "Essential Post-Purchase Upsell" | Two apps doing the same job |
| Pay later | **Afterpay** (widget + badge), Klarna badge in drawer. **Zip has only a single trace** (no visible widget). | We'll show Afterpay and Zip properly. |
| Trust badges | Hextom "Ultimate Sales Boost" payment-logo strip | We can build this in code, so no app is needed |
| Email | Klaviyo (form + footer sign-up) | |
| Analytics | Hotjar + Microsoft Clarity on every page | |
| Other | Track123 order tracking, Timesact pre-order, jQuery from CDN, DMCA badge | |
| Weight | **126 `<script>` tags on the product page**, home HTML ≈ 1.15 MB | Heavy pages are their biggest weakness. Lean code is how we beat them on speed. |
| SEO | Product JSON-LD is present. **No FAQPage schema and no AggregateRating schema in the page HTML.** | We'll add both. |
| Legal | **No ABN anywhere** on the site. The footer has a "TGA Compliant" link. | We'll show our ABN in the footer. |

---

## 1. Global elements (on every page)

```
┌────────────────────────────────────────┐
│ ANNOUNCEMENT BAR — scrolling marquee   │  green bg, white bold text, emoji
│ "😍 Trending… | 🚚 Free Shipping & Free │  ~115 px tall on mobile (very tall)
│  Eye Mask | 🙌 We Care…"   (repeats)   │
├────────────────────────────────────────┤
│ [blank custom_liquid strip ~70 px]     │  ← wasted space above the header
├────────────────────────────────────────┤
│ ☰  [LOGO]      AUD $ ▾   🔍   🛒      │  STICKY header (stays on scroll)
└────────────────────────────────────────┘
```

| Element | Purpose | Mobile behaviour | Notes |
|---|---|---|---|
| Announcement bar | Shows the offers: free shipping + free gift, social proof | Auto-scrolling marquee with three repeated messages | No countdown and no free-shipping threshold, because **all standard shipping is free** (6–12 working days). Express costs $6.99. Moving text is hard for older readers to take in. |
| Header | Navigation, currency (AUD/NZD), search, cart | Sticky. Hamburger opens a mega-menu with 6 groups and ~25 collections. | Menu groups: Best Sellers, Sleep Better, Shoes, Massagers, Chairs, Get Fit at Home, Track Order. |
| Cart drawer | Slide-out cart (§5) | Full height, slides in from the right | Has the strongest conversion stack on the whole site |
| Footer | Contact, links, sign-up, payments | Single column, green background | Phone, email and hours sit at the top, which is good trust for a 50+ audience |

---

## 2. Homepage (top → bottom)

```
┌──────────────────────────────┐
│ ANNOUNCEMENT MARQUEE         │
│ STICKY HEADER                │
├──────────────────────────────┤
│ 1 HERO SLIDESHOW (3 slides)  │ full-bleed lifestyle photo
│  ┌ frosted-glass card ─────┐ │ card overlays top of image
│  │ EYEBROW (small caps)    │ │
│  │ HEADLINE (2 lines)      │ │
│  │ sub-copy (2 lines)      │ │
│  │ [SHOP BEST SELLERS →]   │ │ 2 pill buttons side-by-side
│  │ [OUR COLLECTION →]      │ │
│  │ (◯◯◯ 80K) ★★★★★ See why │ │ avatar stack + stars
│  └─────────────────────────┘ │
│        ○ ━ ○ ○  (dots)       │
├──────────────────────────────┤
│ 2 ICON BENEFITS (swipe row)  │ 5 tiles: Free Delivery · 30-Day
│ [🚚]   [💲]   →              │ Guarantee · Happy Customers ·
│ ▬▬▬▬───────── progress bar   │ Designed for Comfort · Premium Quality
├──────────────────────────────┤
│ 3 BEST SELLERS SLIDER        │ "DISCOVER OUR BEST / SELLING PRODUCTS"
│ ┌card┐ ┌ca…  (1.3 cards)     │ card: image, ☆ (count), title (2 lines,
│ │img │ │                     │ truncated), price, swatches,
│ │☆☆☆ │                     │ full-width [ADD TO CART]
│ │$   │                     │
│ │[ADD]│                    │
│ [BEST SELLER →]  (CTA pill)  │
├──────────────────────────────┤
│ 4 "SHOP BY PAIN" SLIDER      │ 5 tall image tiles (For Neck / Back /
│ ┌img + icon label┐ ┌…        │ Knee / Office / Sleeping), each linked
├──────────────────────────────┤ to a collection
│ 5 VIDEO REVIEWS CAROUSEL     │ "LOVED BY CUSTOMERS. MADE FOR YOU."
│ ┌9:16 UGC┐ centred, peeking  │ 9 vertical UGC videos, play + mute
├──────────────────────────────┤
│ 6 OUR MISSION / STORY        │ Banner + 3 alternating blocks
│ [WHY WE STARTED] h2 text img │ (pill eyebrow → heading → para →
│ [WHERE WE ARE] …             │ brush-stroke-masked photo)
│ [WHERE WE'RE GOING] …        │ Very long on mobile (~2,000 px)
├──────────────────────────────┤
│ 7 FAQ ACCORDION              │ 8 Qs, first one open, rounded tinted
│                              │ cards with chevron buttons
├──────────────────────────────┤
│ 8 FOOTER                     │
└──────────────────────────────┘
```

| # | Section | Purpose | Layout (mobile) | CTAs | Trust / offer |
|---|---|---|---|---|---|
| 1 | Hero slideshow | Grab attention, send people to best sellers | Full-width image. Text sits on a frosted-glass card over the top ~40% of the image. Image fills ~100% of the width, card ~90%. | "Shop best sellers" (primary), "Our collection" (secondary) | Avatar stack, "80K" customers, 5 stars, "See why they love us". **Bug seen:** on load the sticky header overlaps the top of the card. |
| 2 | Icon benefits | Quick reassurance | Horizontal swipe, 2 tiles visible, progress-bar scroller | None | Free delivery, 30-day guarantee, happy customers |
| 3 | Best-seller slider | Lets people buy from the homepage | 1.3 cards visible, swipe | Add to cart on every card, then a "Best seller" pill | Star count on each card. No strikethrough prices. |
| 4 | Shop by need | Sends visitors to collections by body area | Tall portrait tiles, 1.3 visible | The tile is the link | — (risky "pain" framing, see §6) |
| 5 | Video reviews | Social proof from real customer videos | 9:16 videos, centre one large with neighbours peeking | None | Branded overlay on the UGC |
| 6 | Mission / story | Builds brand trust ("Aussie" story) | Stacked text and image, all centred | None | Speaks to Australians. Too long for mobile. |
| 7 | FAQ | Answers objections, adds SEO text | Accordion, tinted cards, 44 px+ rows | None | No FAQ schema |
| 8 | Footer | Contact and policies | Single column | Email sign-up | Payment icons, phone, hours, "TGA Compliant" link |

**Missing from their homepage:** no comparison table, no prominent guarantee block, no Australian-owned badge, no countdown, no reviews text slider (only videos), no Afterpay/Zip messaging, no email pop-up seen (Klaviyo may trigger later).

---

## 3. Product page (best seller: butterfly neck pillow, $129.99 AUD, "Pack of 2")

```
┌──────────────────────────────┐
│ ANNOUNCEMENT · STICKY HEADER │
├──────────────────────────────┤
│ 1 MAIN PRODUCT               │
│ [ gallery 1:1, swipe 10 ]    │ thumbnails strip under main image
│ ▢ ▢ ▢ ▢ ▢                    │
│ H1 Title — Pack of 2         │ long title, 3 lines on mobile
│ ☆☆☆☆☆ (141)                  │ (stars rendered as empty boxes — font bug)
│ $129.99 AUD   [ON SALE]      │ "On sale" badge with NO compare-at price
│ ✔ benefit 1                  │ 3 tick bullets
│ ✔ benefit 2                  │
│ ✔ benefit 3                  │
│ Color: Grey  (Grey)(Black)   │ pill swatches
│ Quantity [- 2 +]             │ Dawn qty, defaulted to 2
│ ── Bundle & Save More ──     │ Kaching block
│ ┌◉ Pack of 2 = 2 Units  $129.99┐ HOT DEAL ribbon
│ │ #1 [Grey▾]  #2 [Grey▾]     │ per-unit colour pickers
│ └────────────────────────────┘
│ [      ADD TO CART       ]   │ purple, full width, ~48 px
│ [   Buy with Shop Pay    ]   │ dynamic checkout
│  More payment options        │
│ Secure and trusted checkout: │ afterpay ApplePay MC ShopPay
│ VISA Klarna PayPal logos     │ VISA Klarna PayPal
│ "Hurry up! Only 5 left"      │ low-stock urgency (number changed 7→5
│                              │ between two loads minutes apart)
├──────────────────────────────┤
│ 2 BENEFIT ICONS (metafields) │ 2×2 grid of round icons + labels
├──────────────────────────────┤
│ 3 MULTI-ROW (image→text ×3)  │ image/GIF/video full-width, then
│  img  / H2 / para            │ H2 + paragraph; 3 rows: intro, how it
│  img  / H2 / para + materials│ works (+ materials), key benefits ✔×6
│  img  / H2 / ✔ list          │
├──────────────────────────────┤
│ 4 VIDEO REVIEWS (metafields) │ "Customers love our …", 2 videos, ← →
├──────────────────────────────┤
│ 5 FAQ (metafields)           │ 6 Qs: different from regular? positions,
│                              │ materials, what's in the box, shipping,
│                              │ returns
├──────────────────────────────┤
│ 6 JUDGE.ME REVIEWS           │ 4.84/5 · 141 reviews, histogram,
│                              │ Write a review, search, sort, paginated
├──────────────────────────────┤
│ 7 YOU MAY ALSO LIKE          │ 3 related products (pinned)
├──────────────────────────────┤
│ 8 FREQUENTLY BOUGHT TOGETHER │ 2 thumbnails + checkboxes, total
│                              │ $164.99, [ADD SELECTED TO CART]
├──────────────────────────────┤
│ FOOTER                       │
└──────────────────────────────┘
```

| # | Section | Purpose | Layout / mobile | CTA | Trust / offer mechanics |
|---|---|---|---|---|---|
| 1 | Main product | Make the sale | Dawn product layout: stacked gallery, then info. Gallery is 1:1 with a thumbnail strip. | Add to cart, Shop Pay, more payment options | Review count, "On sale" badge, 3 tick benefits, bundle block (one "Hot deal" tier), payment logos incl. Afterpay/Klarna, low-stock urgency. A "Quantity restriction" pop-up forces 2 units. |
| 2 | Benefit icons | Show benefits at a glance | 2×2 icons from metafields | — | Labels are risky (§6) |
| 3 | Multi-row story | Explains the product | 3 rows of full-width media, then text. Text is ~15 px on a light background. | — | Materials line |
| 4 | Video reviews | Social proof | 9:16 player with arrows | — | — |
| 5 | FAQ | Handles objections | Accordion rows with dividers | — | Shipping times, 30-day returns, what's in the box |
| 6 | Reviews | Social proof | Judge.me widget | Write a review | 4.84 average, histogram. **Star glyphs fail to render** (show as empty boxes or "G"). |
| 7 | Related | Raise order value | 3-card grid | Add to cart | — |
| 8 | FBT | Raise order value | Checkbox list | Add selected | Bundle total |

**Sticky elements:** the header only. **No sticky add-to-cart on mobile.** Once you scroll past the main block there's no buy button until the bottom of the page (~9,000 px of scrolling).

**Missing from their product page:** no sticky add-to-cart, no comparison table, no guarantee section on the page itself (it only appears in the cart drawer), no per-unit price or "Save $X" in the bundle, no "Most popular" choice between tiers (there's only one tier), no specs/how-to-use accordion near the buy button, no Australian-owned or shipped-from-Australia statement, no delivery estimate near the buy button.

---

## 4. Collection page (Best Sellers)

```
┌──────────────────────────────┐
│ ANNOUNCEMENT · STICKY HEADER │
├──────────────────────────────┤
│ H1 "Best Sellers" (text only │ no banner image, no description shown
├──────────────────────────────┤
│ ( ⚟ Filter and sort | Shop By Collection ) │ one rounded pill bar
├──────────────────────────────┤
│ ┌card┐ ┌card┐   2-column grid │ card: image (1:1), stars + (count),
│ │img │ │img │                 │ title 2 lines truncated, price,
│ │★(n)│ │★(n)│                 │ colour swatches (+n), full-width
│ │$   │ │$   │                 │ purple [ADD TO CART]
│ │[ADD]│ │[ADD]│               │
│ … 26 products, one page       │
├──────────────────────────────┤
│ collection_description (empty│
│ FOOTER                       │
└──────────────────────────────┘
```

| Element | Notes |
|---|---|
| Header | Plain H1. No hero image or intro copy. |
| Filter | Dawn drawer filters (price, availability, colour, size) plus a "Shop by collection" sub-nav drawer |
| Grid | 2 columns on mobile. Cards have a shadow and rounded corners, with **quick add-to-cart on every card**. |
| Card trust | Star rating + count. No sale badges, no "Best seller" badges, no free-shipping note. |
| Weak points | Images lazy-load as blank grey boxes. Titles cut off at ~25 characters. Card text is ~13 px. |

---

## 5. Cart drawer and cart page

```
┌ Your Cart (2) │ ★★★★½ Trusted by 80,000+ Happy Customers   ✕ ┐
│ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬🚚  (progress bar, full)               │
│ "Awesome! You're getting free shipping!"                       │
│ [img] Premium Silk Eye Mask – FREE        ← auto-added gift    │
│ [img] Butterfly … Pill…  Color #1 Grey  🏷 Pack of Units        │
│       [- 2 +] [🗑]                                             │
│ ── Add an Extra Pillowcase ──  (in-cart upsell)               │
│ [img] Pillowcase…  Grey▾  AUD $20 ~~$35~~ [$15 off]  [+ Add]   │
│ Subtotal                                      $129.99 AUD     │
│ [ 🔒 SECURE CHECKOUT ]                                          │
│ 100% Risk-Free | 30-Day Money-Back Guarantee                  │
│ afterpay MC ShopPay ApplePay PayPal VISA Klarna               │
└───────────────────────────────────────────────────────────────┘
```

| Element | Mechanic |
|---|---|
| Header trust | Star rating and "80,000+ customers" next to the cart title |
| Free-shipping progress bar | Already full (every order ships free) with a celebratory message. With an empty cart it shows "Our best sellers" picks. |
| Free gift | Silk eye mask added automatically at $0 |
| BOGO | 2 × $129.99 shows as 2 × $65 sale price (bundle discount) |
| In-cart upsell | Matching accessory at a strikethrough price with a "$15 off" pill and a one-tap Add |
| Checkout | Full-width button with a padlock icon |
| Below the button | Risk-free guarantee line and payment-logo strip |
| Cart page | Same content in table form, plus "Taxes, discounts and shipping calculated at checkout" |

This drawer is the competitor's **best-built conversion component**. Our cart drawer should reach the same level (free-shipping bar, guarantee, payment icons, one upsell) without four separate apps.

---

## 6. Compliance flags: competitor copy to AVOID

> Not legal advice. These flags are based on the Australian Consumer Law (ACL, enforced by the ACCC) and the Therapeutic Goods Act / TGA Advertising Code. If a product is advertised with therapeutic claims, it can be treated as a "therapeutic good" that has to be listed on the ARTG. Get a compliance review before launch.

| Where | Competitor wording (paraphrased or short quote) | Risk | Our safe alternative pattern |
|---|---|---|---|
| Brand / domain | "Pain Free …" | Implies a therapeutic outcome in the brand name itself | Our name has no health claim. Keep it that way. |
| Home hero eyebrow | "Pain relief & everyday comfort" | Therapeutic claim (relief of pain) | "Everyday comfort, at home" |
| Home section | "Shop by pain, find your relief", tiles "For Neck / Back / Knee" | Implies treating conditions by body part | "Shop by room / by moment": *Bedroom, Lounge, On your feet, Desk, Travel* |
| Product benefit icons | "Relieves neck ache", "Reduces snoring", "Promotes better sleep" | Therapeutic claims (relieve or reduce a symptom or condition) | "Soft, supportive feel", "Stays cool", "Fits side & back sleeping" |
| Product bullets | "Helps improve overall sleep quality", "May promote proper neck alignment" | A health claim stays a claim even with "may" in front of it | "Contoured shape cradles your head", "Breathable cover" |
| Product copy | "cervical pillow", "ergonomic … neck support pillow" | "Cervical" is clinical language | "Contoured memory-foam pillow" |
| SEO title | "Best Snoring Pillow" | Therapeutic claim plus an unsubstantiated superlative | Descriptive title only |
| Product names | "…Comfort & Relief from All Day Walking", "Barefoot Shoes for Healthy Feet", "Back Decompression Stretching" | Health or therapeutic claims in the product title | "Stretch-fit everyday shoes", "Wide-toe flexible shoes" |
| Reviews shown | Reviews saying "woke pain free", "shoulder pain had gone", "after cervical spinal surgery…" | Testimonials making therapeutic claims count as advertising by the store. Showing them carries the same risk as writing them yourself. | Moderate reviews: hide or don't feature ones that make health claims. Feature comfort and quality reviews. |
| Price badge | "ON SALE" shown with no was-price | Possibly a misleading price representation (ACL) | Show a saving only against a genuine former price |
| Urgency | "Hurry up! Only 7 / 5 left" (number changed within minutes) | False scarcity is a misleading practice (ACCC has acted on fake urgency) | Show stock only from real inventory, or not at all |
| Strikethrough upsell | "$35 → $20, $15 off" | OK only if $35 is a genuine former price | Same rule |
| Social proof | "Trusted by 80,000+", "80K" avatar stack | Must be substantiated | Only use numbers we can prove |
| Guarantee | "100% Risk-Free" | Must not suggest customers lose their consumer-guarantee rights. "Risk-free" has to be true (e.g. who pays return postage?) | "30-day change-of-mind returns", plus a note that ACL rights still apply |
| Footer | "TGA Compliant" link | Claiming compliance invites scrutiny and is meaningless for non-therapeutic goods | Don't use it |
| Imported reviews | "Review collected from another provider" | Reviews have to be genuine and about this product (ACCC online-reviews guidance) | Only reviews from verified buyers of our own products |

---

## 7. Where we can beat them (summary for the plan)

1. **Speed.** They load 126 scripts, two review apps, two upsell apps, Shogun leftovers, jQuery, Hotjar and Clarity. We use native Dawn plus one review app, and target Lighthouse ≥ 80.
2. **Sticky add-to-cart on mobile.** They have none in practice.
3. **A real tier selector.** 1 / 2 / 3 units with per-unit price, a "Save $X" line and a "Most popular" badge. They show a single forced 2-pack with a restriction pop-up, which is confusing.
4. **Readability for 50+.** Their body text is 13–15 px with thin weights, cut-off titles, a moving marquee and broken star icons. We'll use 18 px base, high contrast and static messages.
5. **Trust they lack.** Australian-owned badge, ABN in the footer, a delivery estimate near the button, a guarantee section on the product page, a comparison table, and visible Afterpay/Zip messaging.
6. **SEO.** FAQPage and AggregateRating schema, which they don't have.
7. **Patterns worth matching.** Hero with a social-proof row, icon benefit strip, product slider with quick add, UGC video carousel, product content driven by metafields, product FAQ (what's in the box, shipping, returns), cart drawer with free-shipping bar, free gift, one-tap upsell, guarantee and payment strip, and contact details in the footer.

---

### Method
- Raw HTML fetched for each page and split by Shopify section ID to read section names and content.
- JS-rendered mobile screenshots taken with Playwright and Firecrawl at 390 px width. A product was added to the cart to capture the drawer and cart page.
- Screenshots were kept outside the repo on purpose (they're competitor copyright) and aren't committed.
