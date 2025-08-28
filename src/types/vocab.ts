// src/types/vocab.ts
export type Level = 'beginner' | 'intermediate' | 'advanced' | '';
export type Source = 'drama' | 'variety' | 'movie' | 'other' | '';

export type Vocab = {
  id: string;
  ko: string;
  en: string;
  example: string;
  level: Level;
  source: Source;
};
