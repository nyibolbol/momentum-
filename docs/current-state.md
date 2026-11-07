# Current state — Aussie Home Goods (80c354.myshopify.com)

**Reviewed:** 7 November 2026. **Sources:** Shopify Admin (products, collections, pages, menus, apps, analytics), the live storefront viewed on mobile, and the theme code pulled with Shopify CLI (§3).

---

## 1. Headline findings (read these first)

1. **Your live theme is Prestige 5.1.0, not Dawn.** It's named "Custom theme | Optimized" and is a paid theme from 2023. Duplicating it would give us Prestige, not Dawn. **Proposed:** add a **fresh copy of Dawn** as a new, unpublished theme called **"AHG Redesign — Claude"**. Your live theme isn't touched. The trade-off is that homepage settings and images don't carry across automatically, so we rebuild them, and nothing on the live site changes until you publish.
2. **The store has basically no traffic or sales yet.** Shopify analytics shows **13 sessions in the last 90 days** (8 desktop, 5 mobile) and **no recorded sales in the last 12 months**. So we have no conversion numbers to protect or compare against. The redesign starts from scratch, and we'll measure once Meta ads go live.
3. **The catalogue doesn't match a "home & comfort for 50+" brand.** Of 21 active products, about half fit (sheets, topper, earplugs, neck relaxer, kneeler, cleaning helpers). The rest are a chainsaw, a trimmer blade, a tyre inflator, a baby lounger, a ball pit, a face mask, detox foot patches and pet gear. **This is your call.** My recommendation is to hide off-brand items from the new menus and homepage rather than delete anything.
4. **Several product pages make medical / therapeutic claims** (§5). Neck Cloud, the neck massager and Detox Foot Patches are the riskiest under the TGA Advertising Code and Australian Consumer Law (ACL). They need rewriting, or pausing, before you send ad traffic to them.
5. **Every product shows a permanent "40–60% off" was-price,** and two product titles say "50% Off Today Only!". Under the ACL, a was-price has to be a real former selling price, and a "today only" offer has to actually end. As it stands this is a pricing-compliance risk.
6. **No structured product data.** There are no product types, no tags and **no metafield definitions**. All product content sits in one long description per product. We'll add metafields so each product page section can be edited separately.
7. **Guarantee mismatch.** The current site promises a **14-day** money-back guarantee. Your brief mentions **30-day returns**. The new site will use whichever you confirm, but the policy pages need to say the same thing.
8. **Shopify's own policy settings are empty.** Refund, privacy, terms and shipping exist as ordinary *pages*, but Settings → Policies has nothing in it. That means checkout shows no policy links. It's a quick admin fix (a 5-minute task for you; I can draft the text).
9. **There is no phone number or ABN anywhere** on the site. For a 50+ audience, both are strong trust signals. You'll need to supply them.

---

## 2. What exists today

### 2.1 Themes
| Theme | Role | Notes |
|---|---|---|
| Custom theme \| Optimized (Prestige 5.1.0) | **Live** | Untouched by this project |
| "Domains premium-paw-products…" | Unpublished | Old copy from 2023 |
| "Custom theme: Category" | Unpublished | Old copy from 2024 |
| Focal | Demo | Trial theme that was never bought |

### 2.2 Live homepage (mobile, top to bottom)
| # | Section | Content | Verdict |
|---|---|---|---|
| 1 | Pop-up | Email or discount pop-up | Replace with a gentler, delayed sign-up |
| 2 | Announcement bar | "🚨 Buy Now 40% OFF \| Afterpay Available \| Free Shipping & Fast Delivery Australia Wide! 🚨" | Keep the free-shipping and Afterpay messages. Drop the siren emoji and the blanket "40% off". |
| 3 | Header | Logo, flat 7-item menu (Home, Shop Now, Our Mission, FAQs, Shipping, Track, Contact) | Menu has no product categories. Rebuild it. |
| 4 | Slideshow | "Fast & Free Delivery Australia Wide", "Australia's Best Products… 40% OFF Storewide Sale", Shop Now | Replace with a focused hero |
| 5 | Rich text | "Highest Quality Australian Products…", "⌛ GRAB YOURS NOW! … LIMITED TIME ONLY! ⌛" | Unsupported urgency. Remove. |
| 6 | Featured collection | 12 products with "On sale" badges, mixed (pet grooming, face mask, chainsaw…) | Curate to comfort products |
| 7 | Why choose us | ✅ Australian owned & operated, free delivery, 10,000+ customers, 100% satisfaction, 14-day money back | **Keep the idea** and turn it into an icon grid. "10,000+" has to be provable. |
| 8 | About us | "Proudly owned & operated in Australia…" | Keep. This is a real advantage over the competitor. |
| 9 | Ali Reviews widget | Shows **empty** | Replace |
| 10 | Testimonials | 3 quotes (topper, toilet brush, Calming Buddy) | Keep the format. Confirm they're genuine. Drop the dog-dementia one, because it implies a health outcome. |
| 11 | Newsletter | Email sign-up | Keep |
| 12 | Footer | Trust ticks, quick links, newsletter | Add phone, ABN, payment icons and policy links |

### 2.3 Live product page (Premium Bamboo Mattress Topper)
- Prestige's standard product layout: gallery, title, price with was-price, Add to cart, share links.
- **All selling content is one long description**: questions, "What is it", benefits, 3 steps, package contents, 14-day guarantee. It's readable, but nothing is broken into sections.
- No bundle or volume offer, no sticky add-to-cart, no FAQ, no comparison table, and no reviews showing (the Ali Reviews section is empty).
- "You may also like" shows a **chainsaw and a trimmer blade** on the mattress-topper page. Product recommendations need a theme.
- Social share links (Facebook, Pinterest, Twitter) take space above the fold and add nothing.

### 2.4 Products (21 active, 2 draft)
| Group | Products (price / was-price) | Fit for 50+ comfort brand |
|---|---|---|
| Sleep & bedroom | Bamboo Sheets $99.99–119.99 (/$230), Bamboo Mattress Topper $129.99–169.99 (/$300), Ultra Sleep Earplugs $44.99–49.99 (/$75) | ✅ **Core range**. Strongest hero candidates. |
| Comfort & relaxation | Neck Cloud $59.95 (/$125), Neck & Shoulder Massager $149.99 (/$300, **0 stock**), Multi-functional Kneeler & Seat $79.99 (/$125) | ✅ Fits, but **copy must be rewritten** (§5) |
| Easy-clean home | Cordless Power Scrubber $89.99, Flexible Silicone Toilet Brush $39.99 (**−27 stock**), Ultrasonic Cleaner $59.99 (**0 stock**), Miracle Mat $59.99 | ✅ Fits ("makes chores easier") |
| Pets | Pet Grooming Machine, Dog Cargo Liner, PawRamp™, Calming Buddy | ⚠️ Possible secondary "for your pets" collection |
| Outdoor & tools | 6" Cordless Chainsaw, Trimmer Blade (**−1 stock**), Tyre Inflator | ⚠️ Off-brand. Possible "garden & shed" collection. |
| Baby & kids | LUX Baby Lounger, Foam Ball Pit (**0 stock**) | ❌ Off-brand for 50+. Hide (or keep only as a "for the grandkids" gift idea). |
| Beauty / "wellness" | Blackhead Remover Face Mask (**0 stock**), Detox Foot Patches | ❌ Off-brand **and** high compliance risk. Recommend unpublishing. |

Other data issues:
- **4 active products with 0 stock** and **2 with negative stock** (sold beyond inventory). Either restock, set them to "continue selling" on purpose, or hide them.
- Product type and tags are blank on every product, so smart collections and filters can't work yet.
- Vendor is "Aussiehomegoods" on all products. Fine to leave.
- Titles contain promotions ("Calming Buddy- 50% Off Today Only!", "Ultra Sleep Earplugs - 50% OFF Today Only!"). Move promos out of titles.

### 2.5 Collections
| Collection | Products | Notes |
|---|---|---|
| SHOP NOW | 19 | Effectively "all products" |
| Australia's Leading Home Essentials | 9 | "Australia's leading" is an unsubstantiated claim |
| Australia's Leading Outdoor & Garden Essentials | 4 | Same issue |
| Australia's Leading Pet Essentials | 3 | Same issue |
| AVADA – Best Sellers / AVADA Email Marketing – Best Sellers / – Newest Products | 15 each | Auto-created by the Avada app for emails. Keep them hidden from navigation. |

Missing: comfort-led collections such as *Sleep & bedroom*, *Comfort at home*, *Easy-clean home* and a curated *Best sellers*.

### 2.6 Pages and menus
- Pages: Contact, Our Mission, FAQs, Shipping Information, Review Page (Ali Reviews template), Track My Order, Refund Policy, Terms of Service, Privacy Policy, plus one unpublished blank page. **Keep all of them** and restyle through the new theme.
- Main menu: flat list with no categories. Footer menu: Search, FAQs, Shipping, Refund, Privacy, Terms, Track, Contact. Keep this one.

### 2.7 Apps installed
| App | What it does | Recommendation |
|---|---|---|
| Afterpay On-Site Messaging | Afterpay instalment text | **Keep**. We'll position it next to the price. |
| Avada Email Marketing & SMS | Email capture and flows | Keep for now. Decide email platform in the plan. |
| Vitals | Bundle of 40 apps (reviews ratings stored in its metafields on 18 products, trust badges, etc.) | Heavy for speed. Replace with native sections plus one review app. Export its reviews first. |
| Hextom: Sales Boost | Countdown, scarcity, badges | Remove. Native announcement bar covers it, and its scarcity features are a compliance risk. |
| Sales Pop Up | "Someone in Sydney just bought…" pop-ups | Remove unless it shows real orders only. Fake pop-ups are misleading under the ACL. |
| Assortion | Upsell / bundles | Replace with native tier selector and cart upsell |
| Lucky Orange | Session recordings / heatmaps | Optional. Loads a script on every page. |
| Holiday Snowfall | Snow effect | Remove |
| (Leftovers) Ali Reviews, Ryviu | Review widgets with traces still in the theme / metafields | The Ali Reviews section is in the live theme but renders empty |

### 2.8 Performance snapshot (live homepage)
- 61 `<script>` tags. Several app embeds load on every page. A clean Dawn build should do far better.

---

## 3. Theme code (from `shopify theme pull`)

> _Filled in after Shopify CLI login. See the CLI section below._

---

## 4. What's missing compared with the competitor

| Pattern (from `competitor-audit.md`) | Have it? | Notes |
|---|---|---|
| Static announcement bar with offer | Partly | Exists but is shouty. No free-shipping threshold or optional countdown. |
| Hero with headline, single CTA and trust row | ❌ | Slideshow with sale messaging |
| Icon benefit / trust strip | Partly | Text ticks only |
| Best-seller product slider with quick add | Partly | Static grid, no quick add |
| Shop-by-category tiles | ❌ | |
| Video reviews (UGC) | ❌ | |
| Text reviews with stars on cards | ❌ | Review widget is empty |
| Brand story / Australian ownership | ✅ | Keep and strengthen |
| FAQ accordion (home and product) | Partly | FAQ page only. No FAQ on product pages, no schema. |
| Product benefit bullets near the price | ❌ | Buried in description |
| Bundle / volume tiers | ❌ | |
| Payment / Afterpay messaging at the buy button | Partly | Afterpay app installed |
| Sticky add-to-cart (mobile) | ❌ | Competitor doesn't have this either, so it's an advantage for us |
| Product content sections from metafields | ❌ | No metafields defined |
| Frequently bought together / related | Partly | Recommendations show irrelevant items |
| Cart drawer with free-shipping bar, upsell, guarantee and payment icons | ❌ | Need to confirm the drawer type in the theme code |
| Comparison table | ❌ | Competitor doesn't have this either |
| Guarantee section on the product page | Partly | Inside description text |
| Footer with contact, ABN and payment icons | ❌ | No phone, ABN or payment icons |

## 5. Compliance flags in **your own** current copy

> These need fixing however the redesign goes, ideally before running ads. This isn't legal advice; get a compliance review for anything you're unsure about.

| Product / place | Current wording (excerpt) | Issue |
|---|---|---|
| **Neck Cloud** | "Struggling with neck pain, TMJ & tension headaches", "Eliminate your neck pain… in just 10 minutes", "less than the average chiropractic session", "customers have manifested severe neck pain relief after 2 weeks" | Therapeutic claims about named conditions. **Highest risk.** |
| **Neck & Shoulder Massager For Pain Relief** | Title, plus "Instant pain relief", "Say goodbye to neck and shoulder pain", "pain-free lifestyle" | Therapeutic claims, including in the product title |
| **Detox Foot Patches** | "Eliminate build-up toxins", "natural remedy", "improve sleep", "Approved by professional institutions", "Australia's #1 best selling" | Therapeutic and unsubstantiated claims. **Recommend unpublishing.** |
| **Blackhead Remover Face Mask** | "Reduce inflammation & wrinkles", "anti-inflammatory and antimicrobial", "Based on our clinical test study" | Therapeutic and clinical claims |
| **Multi-functional Kneeler** | "60% of Australians over 45 experience knee and hip pain", "minimal to no pain", "designed to prevent pain" | Pain claims plus an unsourced statistic |
| **Calming Buddy (pet)** | "separation anxiety… will not have to suffer from anxiety anymore" | Animal-health claim (APVMA/ACL territory) |
| **Mattress Topper** | "Reducing discomfort by supporting your back, neck & shoulders", "Australia's #1" | Borderline health claim. "#1" is unsubstantiated. |
| **Bamboo Sheets** | "The perfect sheets for healthier skin" | Health claim |
| **Ultra Sleep Earplugs** | "promote overall health and well-being", "50% OFF Today Only!" | Health claim plus false urgency |
| Sitewide | "40% OFF storewide", permanent was-prices on every product, "LIMITED TIME ONLY", "Australia's Leading…" collection names, "Australia's best products" | Misleading-pricing, urgency and superlative risks under the ACL |
| Homepage testimonial | Dog with dementia "seems to work to help calm her" | Health-outcome testimonial |

## 6. What to keep

- **Australian owned & operated, shipped in Australia.** It's genuine and the competitor doesn't say it. Put it in the hero, the trust strip, the product page and the footer.
- **Free delivery Australia-wide** and **Afterpay**. Keep both, stated plainly.
- **The bedroom range** (bamboo sheets, mattress topper, earplugs) as the hero product family. It has the most variants, the best stock and lifestyle-safe benefits (soft, breathable, cool, washable).
- **Product photography** already uploaded (5–19 images per product).
- **Existing pages and URLs**: no redirects needed, and any SEO they have is preserved.
- **The format of testimonials with first name and state** ("Amanda H, ADL"). It's authentic-feeling and works for this audience.
- **The Avada email list**, if it has subscribers.
