# MilanMeter: AI Rules & Architectural Constitution

This document governs all future agent edits, engineering contributions, and SEO/content additions to MilanMeter. Every modification must comply with these guidelines.

---

## 1. Core Engineering & Architecture

- **Stack**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, lightweight Motion.
- **Routing**: Client-side URL history routing with clean paths (`/love-calculator/`, `/flames-calculator/`, `/blog/xyz/`), synchronized `<title>`, meta descriptions, canonical URLs, and structured JSON-LD data.
- **Mobile First**: Minimum touch target $\ge 44 \times 44\text{px}$. Responsive containers with outer padding $\ge 16\text{px}$. Single elevation cards (`rounded-2xl` with subtle 1px border `border-slate-200/80` or `shadow-sm`).
- **No Heavy Libraries**: Do not install unnecessary animation packages, heavy UI component frameworks, or tracking bloat. Keep bundle sizes minimal for Core Web Vitals (INP < 100ms, LCP < 1.2s, CLS = 0).

---

## 2. SEO & SERP Guidelines

- **Primary Target Market**: India (`<html lang="en-IN">`). English language, natural Indian English phrasing where appropriate, without artificial keyword-stuffing.
- **Self-Canonicalization**: Every indexable page must point to its own canonical clean URL.
- **Duplicate URL Prevention**: Calculator calculations must run client-side. URL query parameters (e.g. `?name1=Aarav&name2=Ananya`) must NEVER generate new indexable pages or crawlable duplicate states. Robots.txt disallows `/*?*`.
- **Title and Meta Discipline**:
  - Titles must be between 40–60 characters, distinct, and include primary user intent naturally.
  - Descriptions must be 120–160 characters with clear call-to-action value.
  - No keyword stuffing or repetitive suffix appending across pages.
- **Structured Data**: Every calculator page must render valid JSON-LD `WebApplication` and `BreadcrumbList`. Blog posts render `Article`. Homepage renders `WebSite` and `Organization`. Never insert fake ratings, fake review stars, or invalid schema.

---

## 3. Calculator Logic & Determinism Rules

- **Deterministic Computation**: Every calculator must produce the exact same result given the same input (order-independent for symmetric pairs like Person A + Person B).
- **Legitimate Algorithms**:
  - **FLAMES**: Classic cancellation of common letters in Person 1 and Person 2 names, counting the remaining letters, and cyclic elimination through F-L-A-M-E-S (Friends, Lovers, Affectionate, Marriage, Enemies, Siblings).
  - **Name Compatibility / Love Percentage**: Stable hashing of normalized alphabetic characters with weighted soundex/vowel affinity, scaled between 40% and 99% with playful variance, plus multi-dimensional trait breakdowns (Communication, Passion, Emotional Harmony, Long-term Potential).
  - **Date of Birth**: Deterministic calculation based on Life Path Numbers (numerological root digit 1–9) and elemental harmony.
- **Honest Positioning & Disclaimers**:
  - Never claim scientific certainty or predictive psychic ability.
  - Always frame results as fun, entertainment, and romantic compatibility reflections.
  - Display clear disclaimers explaining that healthy relationships depend on mutual respect, open communication, and effort.

---

## 4. Content & Editorial Guidelines

- **User-First Editorial**: Blog articles must directly answer user questions, explain the cultural and mathematical origin of tools (like FLAMES in Indian schools), and guide users with grounded relationship wisdom.
- **Anti-AI Slop Rules**:
  - No generic placeholder prose ("In today's fast paced world...").
  - No robotic repeated phrases across pages.
  - Zero pill badges on static metadata (use plain unboxed text with `·` dividers).
  - No decorative icon clutter on every line.
- **Internal Linking**: Every calculator must link to 3–4 related tools and 2 supporting blog guides. Every blog guide must contextually link back to relevant calculators.

---

## 5. Privacy & Security Rules

- **Client-Side Privacy**: All name and date inputs are computed entirely in the user's browser. Names are never stored in databases, transmitted to backend servers, or harvested.
- **Zero Secrets on Client**: No API keys or private tokens are embedded in frontend source files.
