// src/views/VocabView.tsx
import React, { useMemo, useState } from 'react';
import AddWordModal from '../components/AddWordModal';
import type { Vocab, Level, Source } from '../types/vocab';

type VocabViewProps = {
  onOpenFilter?: () => void; // 옵션 + 기본값 no-op
};

const initialData: Vocab[] = [
  {
    id: '1',
    ko: '고맙습니다',
    en: 'Thank you',
    example: '선물을 받고 고맙다고 말했어요.',
    level: 'beginner',
    source: 'drama',
  },
  {
    id: '2',
    ko: '잘 지내셨어요?',
    en: 'How have you been?',
    example: '오랜만에 만난 친구에게 안부를 물었어요.',
    level: 'beginner',
    source: 'drama',
  },
];

export default function VocabView({ onOpenFilter = () => {} }: VocabViewProps) {
  const [items, setItems] = useState<Vocab[]>(initialData);
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      v =>
        v.ko.toLowerCase().includes(q) ||
        v.en.toLowerCase().includes(q) ||
        v.example.toLowerCase().includes(q),
    );
  }, [items, query]);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">단어장</h2>
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-500" onClick={onOpenFilter}>
            필터
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1 text-primary text-sm font-medium"
          >
            <i className="ri-add-line" />
            <span>추가</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl mb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="단어 검색"
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white text-sm"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(v => (
          <div key={v.id} className="bg-white p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{v.ko}</h3>
                <p className="text-sm text-gray-600">{v.en}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                  <i className="ri-volume-up-line text-gray-600" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                  <i className="ri-more-line text-gray-600" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{v.example}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {levelLabel(v.level)}
              </span>
              <span className="text-xs text-gray-400">{sourceLabel(v.source)}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-sm text-gray-500 py-8">검색 결과가 없습니다.</div>
        )}
      </div>

      {showAdd && (
        <AddWordModal
          onClose={() => setShowAdd(false)}
          onSave={({ korean, english, example, source, level }) => {
            const newItem: Vocab = {
              id: String(Date.now()),
              ko: korean,
              en: english,
              example,
              source,
              level,
            };
            setItems(prev => [newItem, ...prev]);
          }}
        />
      )}
    </section>
  );
}

function levelLabel(l: Level) {
  switch (l) {
    case 'beginner':
      return '초급';
    case 'intermediate':
      return '중급';
    case 'advanced':
      return '고급';
    default:
      return '미지정';
  }
}

function sourceLabel(s: Source) {
  switch (s) {
    case 'drama':
      return '드라마';
    case 'variety':
      return '예능';
    case 'movie':
      return '영화';
    case 'other':
      return '기타';
    default:
      return '';
  }
}
