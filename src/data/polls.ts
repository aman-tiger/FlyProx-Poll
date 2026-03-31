export type PollCategory = 'friendship' | 'sympathy' | 'humor' | 'knowledge';

export interface PollQuestion {
  id: string;
  category: PollCategory;
  text: string;
  emoji: string;
}

export const CATEGORY_COLORS: Record<PollCategory, string[]> = {
  friendship: ['#E8473F', '#C0392B'],
  sympathy: ['#3B5FD4', '#6B3FD4'],
  humor: ['#4DB8E8', '#2A8FBF'],
  knowledge: ['#D43B8A', '#8B3FD4'],
};

export const CATEGORY_LABELS: Record<PollCategory, string> = {
  friendship: 'Дружба',
  sympathy: 'Симпатия',
  humor: 'Юмор',
  knowledge: 'Знания',
};

export const POLL_QUESTIONS: PollQuestion[] = [
  // Дружба (3 questions)
  {
    id: 'f1',
    category: 'friendship',
    text: 'Кто лучший друг в классе?',
    emoji: '🤝',
  },
  {
    id: 'f2',
    category: 'friendship',
    text: 'С кем бы ты хотел оказаться на необитаемом острове?',
    emoji: '🏝️',
  },
  {
    id: 'f3',
    category: 'friendship',
    text: 'Кто всегда поддержит тебя в трудную минуту?',
    emoji: '💪',
  },

  // Симпатия (3 questions)
  {
    id: 's1',
    category: 'sympathy',
    text: 'Кого ты считаешь самым симпатичным?',
    emoji: '😊',
  },
  {
    id: 's2',
    category: 'sympathy',
    text: 'Кто похож на Илона Маска?',
    emoji: '🚀',
  },
  {
    id: 's3',
    category: 'sympathy',
    text: 'У кого самая красивая улыбка?',
    emoji: '😁',
  },

  // Юмор (3 questions)
  {
    id: 'h1',
    category: 'humor',
    text: 'Кто самый весёлый в классе?',
    emoji: '😂',
  },
  {
    id: 'h2',
    category: 'humor',
    text: 'Кто лучше всех умеет поднять настроение?',
    emoji: '🎭',
  },
  {
    id: 'h3',
    category: 'humor',
    text: 'Кто, скорее всего, станет стендап-комиком?',
    emoji: '🎤',
  },

  // Знания (3 questions)
  {
    id: 'k1',
    category: 'knowledge',
    text: 'Кто самый умный?',
    emoji: '🧠',
  },
  {
    id: 'k2',
    category: 'knowledge',
    text: 'У кого большие шансы стать миллиардером?',
    emoji: '💰',
  },
  {
    id: 'k3',
    category: 'knowledge',
    text: 'Кто лучше всех?',
    emoji: '🏆',
  },
];

export const MOCK_CLASSMATES = [
  'Динара Искакова',
  'Иван Балгужинов',
  'Александра Ивлеева',
  'Марат Биримтаев',
  'Айгерим Сейткали',
  'Никита Петров',
  'Амина Жакупова',
  'Тимур Сатыбалды',
  'Ксения Морозова',
  'Данияр Ахметов',
  'Полина Соколова',
  'Бауыржан Нурлан',
];

export function getRandomClassmates(exclude?: string): string[] {
  const shuffled = [...MOCK_CLASSMATES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}
