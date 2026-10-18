# Multilingual Expansion: Spanish & Brazilian Portuguese Localization

CalculateLove is expanding internationally to serve Spanish-speaking and Brazilian Portuguese-speaking audiences while preserving 100% of the existing English/Hinglish production platform, its exact visual identity, and its core deterministic algorithms.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed during Phase 1 clarification:
> - **URL Slug Architecture**: Natural localized slugs (e.g. `/es/calculadora-del-amor/` and `/pt-br/calculadora-do-amor/`) for maximum search relevance and native user trust.
> - **Language Switcher Experience**: A compact globe icon button placed in the header that triggers an accessible, beautifully styled language selector modal.

- **Confirmed Decision 1**: Localized URL slugs are assigned for each calculator and category page across both Spanish (`/es/*`) and Brazilian Portuguese (`/pt-br/*`), with direct 1:1 route mapping.
- **Confirmed Decision 2**: The language switcher is implemented as an un-intrusive globe icon in the navigation bar, opening a centered modal dialog featuring English (India), Español, and Português (Brasil).
- **Confirmed Decision 3**: The existing English/Hinglish site (`en-IN`) remains the default root namespace (`/`), retaining all current links, SEO metadata, and Hinglish advice without modification.

---

### 1. Overview & Core Concept

- **What It Does**: Adds complete, fluent, and culturally authentic Spanish (`es`) and Brazilian Portuguese (`pt-BR`) versions of CalculateLove. Every public page—including Love Calculator, FLAMES Game, Friendship Calculator, DOB Compatibility, Marriage Prediction, Numerology, Astrology, Blog Guides, and Legal Pages—is accessible directly via localized URL routes.
- **Target Audience & Persona**:
  - Couples, daters, and friends across Latin America, Spain, and global Spanish speakers looking for fun, culturally resonant love and relationship compatibility tests.
  - Brazilian couples and internet users seeking engaging "Calculadora do Amor", "Jogo FLAMES", and relationship quizzes in natural Brazilian Portuguese.
  - Existing Indian and international English visitors who continue using the original site without interruption.
- **Key Value**: Expands organic search reach across major high-volume global markets without fragmenting brand identity or altering existing calculations.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Direct Entry via Localized URL**:
   A user arriving from Google Search at `https://calculatelove.online/es/calculadora-del-amor/` receives the full Spanish interface, complete with localized headings, input placeholders, button copy, FAQs, and a self-referencing canonical tag.
2. **Language Switching from Any Page**:
   A visitor on any page taps the compact Globe icon (`🌐`) in the top navigation. A lightweight, focused modal appears presenting the 3 available editions. Choosing "Português (Brasil)" instantly navigates them to the equivalent Brazilian Portuguese page while preserving the user's current context.
3. **Playing Calculators with 100% Deterministic Precision**:
   Entering "Carlos" and "Sofia" on the English, Spanish, or Brazilian Portuguese Love Calculator outputs the exact same numerical compatibility score (e.g., 88%), accompanied by natural, fluent localized relationship insights and advice.

#### Visual Identity & Theme
- **Design System Preservation**: Strict adherence to CalculateLove's existing warm romantic palette (`rose-600`, `pink-600`, `amber-500`, soft rose background washes, and clean slate typography).
- **Zero-Pill & Metadata Discipline**: Static metadata (dates, read times, calculation categories) stays unboxed with delicate typographic dividers (`·`), preserving the refined editorial feel.
- **Modal Aesthetic**: The language selector modal uses an overlay backdrop blur (`backdrop-blur-md bg-slate-900/40`), nested radius geometry, tactile selection cards with localized country flags / regional subtitles, and keyboard accessibility (`Escape` to close, `Tab` focus trap).
- **Responsive Layout**: Designed for seamless thumb accessibility on mobile devices ($\ge 44\text{px}$ touch targets) and compact alignment on desktop navigation bars.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: URL Structure Strategy**
  - *Chosen Approach*: Natural localized slugs (`/es/calculadora-del-amor/` and `/pt-br/calculadora-do-amor/`) with aliases for common queries.
  - *Why*: International search engines (Google España, Google Mexico, Google Brasil) rank native language slugs significantly higher than English slugs with a language prefix.
  - *Alternatives Considered*: Retaining English slugs (e.g. `/es/love-calculator/`) was rejected as suboptimal for organic international click-through rates.

- **Decision 2: Calculation Engine Architecture**
  - *Chosen Approach*: Single unified engine that handles core math, symmetric hashing, and letter elimination, coupled with a localization dictionary for descriptions, tags, advice, and tips.
  - *Why*: Guarantees mathematical parity across all versions while allowing cultural nuances (e.g. Hinglish warmth in India, romantic expressions in Spanish, lively phrases in Brazilian Portuguese).
  - *Alternatives Considered*: Duplicating calculation functions was rejected because it introduces drift risk.

- **Decision 3: Language Switching State & Routing**
  - *Chosen Approach*: URL-first routing without automatic geo-IP redirects.
  - *Why*: Prevents search engine indexing penalties, respects user autonomy, and allows effortless link sharing.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Browser                                   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                     URL Path Navigation (/es/*, /pt-br/*, /*)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             src/App.tsx                                │
│  - Path normalization & locale detection ('en-IN' | 'es' | 'pt-BR')    │
│  - Bi-directional Route Resolver & slug mapping table                  │
└──────────────┬───────────────────────────────┬─────────────────────────┘
               │                               │
       Renders Header & Modal          Resolves Localized Page
               │                               │
               ▼                               ▼
┌───────────────────────────────┐ ┌──────────────────────────────────────┐
│  src/components/Header.tsx    │ │  Localized Page Components           │
│  - Compact Globe Icon         │ │  - HomePage (en, es, pt-br)          │
│  - LanguageSwitcherModal.tsx  │ │  - LoveCalculatorPage                │
│  - Context-preserving URLs    │ │  - FlamesPage, FriendshipPage, etc.  │
└───────────────────────────────┘ └──────────────────┬───────────────────┘
                                                     │
                                       Calls Deterministic Logic
                                                     │
                                                     ▼
                                  ┌──────────────────────────────────────┐
                                  │   src/lib/calculatorEngine.ts        │
                                  │   - Symmetric Hash & FLAMES Math     │
                                  │   - Locale-aware interpretation      │
                                  │     (English / Spanish / Portuguese) │
                                  └──────────────────┬───────────────────┘
                                                     │
                                       Synchronizes Metadata
                                                     │
                                                     ▼
                                  ┌──────────────────────────────────────┐
                                  │   src/components/SEOHead.tsx         │
                                  │   - Localized <title> & description  │
                                  │   - Self-referencing canonical URL   │
                                  │   - Reciprocal hreflang tags         │
                                  │   - <html lang="..."> attribute      │
                                  └──────────────────────────────────────┘
```

#### Multilingual URL Slug Registry
| Feature / Page | English (`en-IN`) | Spanish (`es`) | Brazilian Portuguese (`pt-BR`) |
| :--- | :--- | :--- | :--- |
| **Home** | `/` | `/es/` | `/pt-br/` |
| **Love Calculator** | `/love-calculator/` | `/es/calculadora-del-amor/` | `/pt-br/calculadora-do-amor/` |
| **FLAMES Game** | `/flames-calculator/` | `/es/calculadora-flames/` | `/pt-br/calculadora-flames/` |
| **Friendship** | `/friendship-calculator/` | `/es/calculadora-de-amistad/` | `/pt-br/calculadora-da-amizade/` |
| **DOB Compatibility**| `/love-calculator-by-date-of-birth/` | `/es/calculadora-de-amor-por-fecha-de-nacimiento/` | `/pt-br/calculadora-do-amor-por-data-de-nascimento/` |
| **Marriage Match** | `/love-or-arranged-marriage-calculator/` | `/es/calculadora-de-matrimonio/` | `/pt-br/calculadora-de-casamento/` |
| **Astrology Hub** | `/astrology/` | `/es/astrologia/` | `/pt-br/astrologia/` |
| **Numerology Hub** | `/numerology/` | `/es/numerologia/` | `/pt-br/numerologia/` |
| **Blog Index** | `/blog/` | `/es/blog/` | `/pt-br/blog/` |
| **About Us** | `/about/` | `/es/sobre-nosotros/` | `/pt-br/sobre-nos/` |
| **Contact** | `/contact/` | `/es/contacto/` | `/pt-br/contato/` |
| **Privacy Policy** | `/privacy-policy/` | `/es/politica-de-privacidad/` | `/pt-br/politica-de-privacidade/` |
| **Terms of Use** | `/terms/` | `/es/terminos/` | `/pt-br/termos/` |
| **Disclaimer** | `/disclaimer/` | `/es/descargo-de-responsabilidad/` | `/pt-br/aviso-legal/` |

#### Multilingual SEO & Sitemap Specification
- **Hreflang Tags**: Injected on every rendered page linking the English canonical (`x-default` / `en-IN`), Spanish version (`es`), and Brazilian Portuguese version (`pt-BR`).
- **Canonical URLs**: Every page contains an exact self-referencing canonical tag matching its URL.
- **HTML Lang Attribute**: Dynamically synced via `SEOHead` (`en-IN` for default, `es` for `/es/*`, `pt-BR` for `/pt-br/*`).
- **Sitemap XML**: `public/sitemap.xml` expanded to index all localized URLs with corresponding `xhtml:link` hreflang annotations.
