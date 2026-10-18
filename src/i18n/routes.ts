export type SupportedLocale = 'en' | 'es' | 'pt-BR';

export interface RouteMapping {
  id: string;
  en: string;
  es: string;
  'pt-BR': string;
  aliases?: {
    es?: string[];
    'pt-BR'?: string[];
    en?: string[];
  };
}

export const SITE_DOMAIN = 'https://calculatelove.online';

export const ROUTE_REGISTRY: RouteMapping[] = [
  {
    id: 'home',
    en: '/',
    es: '/es/',
    'pt-BR': '/pt-br/',
  },
  {
    id: 'love-calculator',
    en: '/love-calculator/',
    es: '/es/calculadora-del-amor/',
    'pt-BR': '/pt-br/calculadora-do-amor/',
    aliases: {
      en: [
        '/love-calculator-by-name/',
        '/love-percentage-calculator/',
        '/true-love-calculator/',
        '/love-compatibility-calculator/',
      ],
      es: [
        '/es/love-calculator/',
        '/es/calculadora-amor/',
        '/es/calculadora-de-amor/',
      ],
      'pt-BR': [
        '/pt-br/love-calculator/',
        '/pt-br/calculadora-amor/',
        '/pt-br/calculadora-de-amor/',
      ],
    },
  },
  {
    id: 'flames',
    en: '/flames-calculator/',
    es: '/es/calculadora-flames/',
    'pt-BR': '/pt-br/calculadora-flames/',
    aliases: {
      es: ['/es/flames-calculator/', '/es/juego-flames/'],
      'pt-BR': ['/pt-br/flames-calculator/', '/pt-br/jogo-flames/'],
    },
  },
  {
    id: 'friendship',
    en: '/friendship-calculator/',
    es: '/es/calculadora-de-amistad/',
    'pt-BR': '/pt-br/calculadora-da-amizade/',
    aliases: {
      es: ['/es/friendship-calculator/', '/es/calculadora-amistad/'],
      'pt-BR': ['/pt-br/friendship-calculator/', '/pt-br/calculadora-amizade/'],
    },
  },
  {
    id: 'dob',
    en: '/love-calculator-by-date-of-birth/',
    es: '/es/calculadora-de-amor-por-fecha-de-nacimiento/',
    'pt-BR': '/pt-br/calculadora-do-amor-por-data-de-nascimento/',
    aliases: {
      es: ['/es/love-calculator-by-date-of-birth/', '/es/calculadora-fecha-nacimiento/'],
      'pt-BR': ['/pt-br/love-calculator-by-date-of-birth/', '/pt-br/calculadora-data-nascimento/'],
    },
  },
  {
    id: 'marriage',
    en: '/love-or-arranged-marriage-calculator/',
    es: '/es/calculadora-de-matrimonio/',
    'pt-BR': '/pt-br/calculadora-de-casamento/',
    aliases: {
      es: ['/es/love-or-arranged-marriage-calculator/', '/es/calculadora-matrimonio/'],
      'pt-BR': ['/pt-br/love-or-arranged-marriage-calculator/', '/pt-br/calculadora-casamento/'],
    },
  },
  {
    id: 'astrology',
    en: '/astrology/',
    es: '/es/astrologia/',
    'pt-BR': '/pt-br/astrologia/',
    aliases: {
      es: ['/es/astrology/'],
      'pt-BR': ['/pt-br/astrology/'],
    },
  },
  {
    id: 'numerology',
    en: '/numerology/',
    es: '/es/numerologia/',
    'pt-BR': '/pt-br/numerologia/',
    aliases: {
      es: ['/es/numerology/'],
      'pt-BR': ['/pt-br/numerology/'],
    },
  },
  {
    id: 'blog',
    en: '/blog/',
    es: '/es/blog/',
    'pt-BR': '/pt-br/blog/',
  },
  {
    id: 'about',
    en: '/about/',
    es: '/es/sobre-nosotros/',
    'pt-BR': '/pt-br/sobre-nos/',
    aliases: {
      es: ['/es/about/'],
      'pt-BR': ['/pt-br/about/'],
    },
  },
  {
    id: 'contact',
    en: '/contact/',
    es: '/es/contacto/',
    'pt-BR': '/pt-br/contato/',
    aliases: {
      es: ['/es/contact/'],
      'pt-BR': ['/pt-br/contact/'],
    },
  },
  {
    id: 'privacy',
    en: '/privacy-policy/',
    es: '/es/politica-de-privacidad/',
    'pt-BR': '/pt-br/politica-de-privacidade/',
    aliases: {
      es: ['/es/privacy-policy/'],
      'pt-BR': ['/pt-br/privacy-policy/'],
    },
  },
  {
    id: 'terms',
    en: '/terms/',
    es: '/es/terminos/',
    'pt-BR': '/pt-br/termos/',
    aliases: {
      es: ['/es/terms/'],
      'pt-BR': ['/pt-br/terms/'],
    },
  },
  {
    id: 'disclaimer',
    en: '/disclaimer/',
    es: '/es/descargo-de-responsabilidad/',
    'pt-BR': '/pt-br/aviso-legal/',
    aliases: {
      es: ['/es/disclaimer/'],
      'pt-BR': ['/pt-br/disclaimer/'],
    },
  },
];

/**
 * Normalizes any path to start and end with slash
 */
export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  let clean = path.trim().toLowerCase();
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (!clean.endsWith('/')) clean = `${clean}/`;
  return clean;
}

/**
 * Detects locale strictly from URL path prefix
 */
export function getLocaleFromPath(path: string): SupportedLocale {
  const norm = normalizePath(path);
  if (norm.startsWith('/es/') || norm === '/es/') return 'es';
  if (norm.startsWith('/pt-br/') || norm === '/pt-br/') return 'pt-BR';
  return 'en';
}

/**
 * Finds the RouteMapping for a given path across all locales & aliases
 */
export function findRouteMapping(path: string): RouteMapping | null {
  const norm = normalizePath(path);

  // Exact match first
  for (const route of ROUTE_REGISTRY) {
    if (route.en === norm || route.es === norm || route['pt-BR'] === norm) {
      return route;
    }
  }

  // Check aliases
  for (const route of ROUTE_REGISTRY) {
    if (route.aliases?.en?.includes(norm)) return route;
    if (route.aliases?.es?.includes(norm)) return route;
    if (route.aliases?.['pt-BR']?.includes(norm)) return route;
  }

  // Check blog post route: /blog/:slug/, /es/blog/:slug/, /pt-br/blog/:slug/
  const blogEn = norm.match(/^\/blog\/([^/]+)\/$/);
  const blogEs = norm.match(/^\/es\/blog\/([^/]+)\/$/);
  const blogPt = norm.match(/^\/pt-br\/blog\/([^/]+)\/$/);
  const slug = blogEn?.[1] || blogEs?.[1] || blogPt?.[1];

  if (slug) {
    return {
      id: `blog-${slug}`,
      en: `/blog/${slug}/`,
      es: `/es/blog/${slug}/`,
      'pt-BR': `/pt-br/blog/${slug}/`,
    };
  }

  return null;
}

/**
 * Gets equivalent path when switching language from current path to target locale
 */
export function getEquivalentPath(currentPath: string, targetLocale: SupportedLocale): string {
  const route = findRouteMapping(currentPath);
  if (route) {
    return route[targetLocale];
  }

  // Fallback to the target locale's homepage
  if (targetLocale === 'es') return '/es/';
  if (targetLocale === 'pt-BR') return '/pt-br/';
  return '/';
}

export interface HreflangLink {
  lang: string;
  href: string;
}

/**
 * Computes canonical URL and reciprocal hreflang alternate links for SEO
 */
export function getSeoLinks(currentPath: string): {
  canonicalUrl: string;
  canonicalPath: string;
  hreflangs: HreflangLink[];
  localeCode: string; // 'en-IN' | 'es' | 'pt-BR'
} {
  const norm = normalizePath(currentPath);
  const locale = getLocaleFromPath(norm);
  const route = findRouteMapping(norm);

  // If known route, use mapped canonical path; otherwise use current normalized path
  const canonicalPath = route ? route[locale] : norm;
  const canonicalUrl = `${SITE_DOMAIN}${canonicalPath}`;

  const hreflangs: HreflangLink[] = [];

  if (route) {
    hreflangs.push({ lang: 'en-IN', href: `${SITE_DOMAIN}${route.en}` });
    hreflangs.push({ lang: 'es', href: `${SITE_DOMAIN}${route.es}` });
    hreflangs.push({ lang: 'pt-BR', href: `${SITE_DOMAIN}${route['pt-BR']}` });
    hreflangs.push({ lang: 'x-default', href: `${SITE_DOMAIN}${route.en}` });
  } else {
    // Fallback hreflang to homepages
    hreflangs.push({ lang: 'en-IN', href: `${SITE_DOMAIN}/` });
    hreflangs.push({ lang: 'es', href: `${SITE_DOMAIN}/es/` });
    hreflangs.push({ lang: 'pt-BR', href: `${SITE_DOMAIN}/pt-br/` });
    hreflangs.push({ lang: 'x-default', href: `${SITE_DOMAIN}/` });
  }

  const localeCode = locale === 'pt-BR' ? 'pt-BR' : locale === 'es' ? 'es' : 'en-IN';

  return {
    canonicalUrl,
    canonicalPath,
    hreflangs,
    localeCode,
  };
}
