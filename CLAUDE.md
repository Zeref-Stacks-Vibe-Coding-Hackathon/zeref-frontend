You are a senior Next.js/Tailwind/shadcn UI engineer. Generate a production-ready landing page for a project called “Cross-Chain Yield Resolver with Automated Looping.” I already have Next.js (App Router), Tailwind, and shadcn/ui installed.

GOAL

Build a clean, minimalist, high-end SaaS landing page inspired by the shared reference (large hero headline, light theme, floating badges, central illustration area). The background image must be:
public/Images/Background/zeref-bg.jpg
Use it as a subtle, soft background (cover, center) with an overlaid white/neutral gradient to keep text readable.

FILES TO CREATE/UPDATE

app/layout.tsx

app/page.tsx

components/site-header.tsx

components/hero.tsx

components/value-pills.tsx

components/trusted-logos.tsx

components/feature-cards.tsx

components/loop-timeline.tsx

components/site-footer.tsx

lib/copy.ts (centralized marketing copy)

styles/globals.css (only if needed)

DESIGN & TYPOGRAPHY

Clean, minimalist, airy whites with subtle shadows and rounded-2xl cards.

Use next/font:

Headings: Sora (700/600)

Body: Inter (400/500)

Provide an accent italic style for a single word in the hero (e.g., “cross-chain, DeFi, and looping”).

Color tokens (Tailwind extend.colors if needed):

primary: slate/neutral mix for text

brand: #0EA5E9 (sky) for accents

mint: #22C55E for success ticks

indigo: #6366F1 for subtle gradients

Layout width: max-w-7xl mx-auto px-6 md:px-8.

Use shadcn/ui components where sensible (Button, Badge, Card).

Light theme only for now.

HERO SECTION (components/hero.tsx)

Full-width hero with the background image (zeref-bg.jpg) set via a parent div before: pseudo element or inline style, with an overlay (white → transparent gradient).

Content centered.

Headline (2 lines):

Line 1: “Cross-Chain Yield Resolver”

Line 2: “with Automated Looping”

Subheading: one sentence value prop.

Primary CTA (shadcn Button): “Start Now” → /#app

Secondary CTA (ghost Button): “View Docs” → /docs

Two floating small badges (rounded, shadow, glass effect):

“12k+ Simulated Transactions” with 3 avatar placeholders

“Looping Optimized” with a check icon

Optional center illustration slot (empty div with a soft drop shadow) so I can place a canvas/image later.

VALUE PILLS (components/value-pills.tsx)

Small horizontal pills under the hero:

“Cross-Chain” (with link icon)

“DeFi Native” (with layers/coins icon)

“Auto-Looping” (with refresh icon)
Use shadcn Badge style but with custom “glass/blur” look (backdrop-blur, faint borders).

TRUSTED LOGOS (components/trusted-logos.tsx)

A slim band: “We’ve been evaluated with” + 5 placeholder logos (monochrome, low opacity). Evenly spaced, responsive.

FEATURE CARDS (components/feature-cards.tsx)

3–4 cards in a responsive grid (1/2/4). Each card: icon, title, short copy, and a subtle link.
Suggested cards & copy:

Resolver Transparency — “See why funds moved: APY deltas, thresholds, and target chain rationale.”

Cross-Chain Routing — “Bridge and redeploy across Stacks → Base → Solana with one flow.”

Auto-Looping — “Periodic checks trigger rebalancing only when net APY gain beats fees.”

Non-Custodial Vault — “Mint ySTX receipts and withdraw anytime with on-chain proofs.”

LOOP TIMELINE (components/loop-timeline.tsx)

Horizontal/vertical responsive timeline with 4 steps:

Deposit STX → mint ySTX

Resolve best APY

Bridge & deploy

Monitor & loop
Each step has a small icon and 1-line caption.

HEADER/FOOTER

Header (components/site-header.tsx): left brand text “LoopFi” (placeholder), right nav: “Features”, “How it Works”, “Docs”, “Contact”, plus a compact “Connect Wallet” button (use shadcn Button; logic can be placeholder). A mobile menu (sheet/drawer) for small screens.

Footer (components/site-footer.tsx): simple 2-row footer with copyright, social placeholders, and links to Docs/Terms/Privacy.

PAGE COMPOSITION (app/page.tsx)

Order:

<SiteHeader />

<Hero />

<ValuePills />

<TrustedLogos />

<FeatureCards />

<LoopTimeline />

CTA band (large Button “Launch App” & ghost Button “Read Whitepaper”)

<SiteFooter />

COPY (lib/copy.ts)

Centralize basic copy:

title: “Cross-Chain Yield Resolver with Automated Looping”

subtitle: “Resolve, bridge, and redeploy to the best APY—automatically.”

feature blurbs as above.
Make the hero include a span with italic style for the word “looping”.

INTERACTION & MOTION

Use Framer Motion lightly (fade-up on section, gentle scale on badges), no heavy parallax.

Buttons have hover transitions (transition-all, shadow, translate-y-[1px]).

ACCESSIBILITY & SEO

Semantic tags, alt text on logos, aria-label on CTAs.

Metadata in app/layout.tsx (export const metadata) with title/description.

STYLING NOTES

Background:

parent container uses relative

a ::before layer covers with bg-[url('/Images/Background/zeref-bg.jpg')] bg-cover bg-center opacity-30

add overlay gradient: from white → transparent so text remains readable

Cards: rounded-2xl border border-black/5 bg-white/70 backdrop-blur shadow-sm hover:shadow-md.

DELIVERABLES

Return all code files with complete imports and no TODOs. Ensure the page builds on a fresh Next.js/shadcn project. Don’t include lorem ipsum—use the provided copy. Ensure responsive layout (mobile → desktop). End by listing any Tailwind config additions I must paste in tailwind.config.ts.