export interface ToolMeta {
  id: string;
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'love' | 'friendship' | 'flames' | 'marriage' | 'astrology' | 'numerology';
  keywords: string[];
  badge?: string;
}

export interface CompatibilityResult {
  score: number;
  grade: string;
  verdict: string;
  summary: string;
  breakdown: {
    communication: number;
    emotionalHarmony: number;
    passion: number;
    longevity: number;
  };
  advice: string;
  names: {
    person1: string;
    person2: string;
  };
}

export interface FlamesStep {
  name1Letters: string[];
  name2Letters: string[];
  cancelledLetters: string[];
  remainingCount: number;
  eliminationRounds: {
    letterEliminated: string;
    remainingLetters: string[];
    indexEliminated: number;
  }[];
}

export interface FlamesResult {
  person1: string;
  person2: string;
  remainingCount: number;
  resultLetter: 'F' | 'L' | 'A' | 'M' | 'E' | 'S';
  resultWord: string;
  meaning: string;
  steps: FlamesStep;
}

export interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  readTime: string;
  relatedCalculatorUrl: string;
  content: string[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
