# Crimson Security (US) — marketing site

The US entity's site (crimsonsecurityinc.com). Sibling of the Canadian site: same layout, components, fonts and chat/enquiry plumbing, with the colour balance flipped to **black-forward** (near-black dominant, crimson as the accent, white/silver as support).

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion. Deploys to Vercel with zero config.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Environment variables

| Variable | Required | What it does |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | For the assistant and the briefing | Powers the chat assistant and the enquiry briefing. Without it the chat endpoint fails and enquiries send with no briefing. |
| `CHAT_ENABLED` | **Yes, to serve chat** | Defaults **off**. Set to `true` or `/api/chat` returns 503. Doubles as the kill switch. |
| `RESEND_API_KEY` | **Yes** | Delivers every enquiry. Unset means nothing is ever sent, and the routes say so rather than reporting false success. |
| `RESEND_FROM_EMAIL` | Recommended | The `From:` address. Must be on a domain **verified in Resend** or the send is rejected. Falls back to `website@crimsonsecurityinc.com`. |
| `RESEND_TO_EMAIL` | No | Where enquiries land. Comma-separated for several recipients. Defaults to the address in `lib/site.ts`, so leaving it unset is correct in production — and setting it is the safe way to test delivery against your own inbox without editing site details that also feed the footer, privacy page and JSON-LD. |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel ID. The pixel only loads when this is set, and the privacy page discloses it when it is. The Canadian site's pixel ID is deliberately not carried over. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical, OG and sitemap origin. Falls back to the production domain on a Vercel deploy, then localhost. Set it only to override, e.g. on staging. |

## Before launch

| Item | Where | Notes |
| --- | --- | --- |
| Chat assistant | `app/api/chat/route.ts` | **`CHAT_ENABLED` defaults off** — set it to `true` to serve. Rate limiting is in-memory per instance (see the design doc); move to Redis if the endpoint draws traffic. |
| Contact delivery | `app/api/contact/route.ts`, `lib/enquiry-delivery.ts` | Delivers via Resend. Requires `RESEND_API_KEY`; the route returns 500 when delivery fails rather than reporting false success. **Not yet verified against the live Resend API — see issue #11.** |
| Function duration | `app/api/chat/route.ts`, `app/api/contact/route.ts` | Both declare `maxDuration = 30` (seconds). **Do not lower it below twice `ANALYSIS_TIMEOUT_MS`.** The briefing is awaited before the email is sent, so a function killed mid-analysis would lose the enquiry silently. `tests/route-duration.test.ts` fails if the two drift apart. Vercel caps this by plan — confirm 30s is allowed on the plan in use. |
| Enquiry reference | `lib/enquiry-reference.ts` | Every enquiry gets a short code like `CS-8F3K2Q`. It **leads the email subject** (inbox lists truncate the end) and is shown to the visitor in the chat panel when their details are delivered, so a follow-up quoting it can be found with one search. The alphabet omits I, L, O and U — the characters people mistype reading a code aloud. |
| Enquiry briefing | `lib/lead-analysis.ts` | Haiku reads each enquiry and writes a summary, likely service, urgency, open questions and a **draft reply** into the email. Advisory only, labelled as such, and never sent to anyone automatically. Needs `ANTHROPIC_API_KEY`; without it, or on any failure, the enquiry still sends with the briefing omitted. |
| Contact details | `lib/site.ts` | info@crimsonsecurityinc.com (**unverified — the live US site publishes no email**), the Reston, VA address, phone and the other offices live here and feed the contact section, footer, privacy page and JSON-LD. **Confirm the mailboxes are live before launch.** To route enquiries elsewhere, set `RESEND_TO_EMAIL` rather than editing this. |
| Site URL | `NEXT_PUBLIC_SITE_URL` | Canonical, OG and sitemap URLs. Falls back to `https://crimsonsecurityinc.com` on any Vercel deploy, then localhost, so leaving it unset degrades safely rather than publishing `*.vercel.app` canonicals. The enquiry email does **not** depend on it — its logo is embedded, see `lib/enquiry-logo.ts`. |
| Privacy policy | `app/privacy/page.tsx` | Draft rewritten from the Canadian (PIPEDA) version for a US audience; **not yet reviewed against US state privacy law**. Have counsel review it. |

## Where things live

- `lib/content.ts` — all services, story blocks, tabs, stats and differentiators. Edit copy here.
- `lib/site.ts` — name, description, URL, nav links, and all contact details (emails, address, locations).
- `tailwind.config.ts` — palette sampled from the logo (`crimson`, `silver`, `ink`).
- `app/globals.css` — section themes. Neutral colours are CSS variables; add `theme-light` to a section to flip it to white/gray, `theme-crimson` for the crimson band, or nothing for dark. Page rhythm (black-forward; see *Design language* below): black hero → white story → black services → charcoal capabilities → black stats → white differentiators → black contact → charcoal footer. `theme-crimson` is no longer used on the home page.
- `components/Reveal.tsx`, `CountUp.tsx` — scroll-triggered animation primitives (IntersectionObserver-based).
- `components/CircuitTexture.tsx`, `PixelField.tsx` — the shield's circuit/pixel motif as background texture.
- `components/Logo.tsx` — the official US logo (supplied by Richard). `public/crimson-security-logo-dark.png` is the artwork recoloured for black backgrounds (crimson wordmark, silver tagline, transparent ground); `crimson-security-logo.png` keeps the original maroon/grey on transparency for white backgrounds; `crimson-security-c.png` is the wordmark's "C", used for the chat launcher, icons and the capabilities visual. All three were cut from the master by the same script, so replace them together if the logo changes.
- `components/AccentMark.tsx` / `AccentDivider.tsx` — the diamond glyph used as the section-label and list marker.
- `app/icon.png`, `apple-icon.png`, `opengraph-image.png`, `twitter-image.png`, `public/crimson-security-mark-email.png` (and `lib/enquiry-logo.ts`) — rendered from the logo files above; regenerate together.
- `app/opengraph-image.png` / `twitter-image.png` — 1200×630 social card.

## Motion & accessibility

- All Framer Motion animation runs under `<MotionConfig reducedMotion="user">`; CSS animations are switched off in a `prefers-reduced-motion: reduce` block in `app/globals.css`.
- Hero entrance is CSS-only so the logo (LCP) never waits on hydration. Scroll reveals fall back to visible with JS disabled.
- Tabs follow the WAI-ARIA tabs pattern (roving tabindex, arrow/Home/End keys).

## GEO (generative engine optimization)

- `app/llms.txt/route.ts` — `/llms.txt`, built from `lib/content.ts` and `lib/site.ts`.
- `lib/jsonld.ts` + `components/JsonLd.tsx` — Organization (`ProfessionalService`) and `WebSite` on every page via the root layout; `WebPage` + `BreadcrumbList` on inner pages.
- `app/robots.ts` (links the sitemap) and `app/sitemap.ts`.
- `tests/geo.test.ts` enforces title ≤ 60 and description ≤ 160 characters, the sitemap link, and that llms.txt carries the US facts.

## Design language (how this differs from the Canadian site)

Same sections, copy flow, fonts (Archivo + Inter) and brand colours; different execution, so the two read as siblings rather than a recolour.

| | Canadian site | US site |
| --- | --- | --- |
| Hero | Centred stack on an animated crimson glow | Left-aligned headline beside an "assessment scope" sheet, on a ruled grid |
| Header | One transparent bar that frosts on scroll | Solid black, two tiers: phone/HQ strip + nav with a square CTA |
| Buttons | Rounded, gradient, soft glow | Square, flat, uppercase, hard offset shadow (`.btn`, `.btn-primary`, `.btn-ghost`) |
| Corners | Soft and rounded | Squared: `borderRadius` scale overridden in `tailwind.config.ts` |
| Section headings | Label above headline | Heavy rule, numbered label in a left column (`SectionHeading`) |
| Approach | Alternating rows with illustration cards | Three ruled numbered columns |
| Services | Illustrated bento grid of cards | Ruled index with chips |
| Capabilities | Side tab rail, rounded panel | Top tab bar, flat ruled panel |
| Stats | Full-bleed crimson band, centred | Black, left-aligned, between heavy crimson rules |
| Why Crimson | Icon-led 3-column grid on tinted field | Two-column numbered ledger on white |
| Motion | Slow 0.7s / 28px reveals | Short 0.45s / 14px reveals |
