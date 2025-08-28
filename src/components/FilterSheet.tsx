import React, { useState } from 'react';

type Filters = {
  level: Set<string>;
  duration: Set<string>;
  subtitle: Set<string>;
  genre: Set<string>;
};

export default function FilterSheet({
  onApply,
  onClose,
}: {
  onApply: (filters: Filters) => void;
  onClose: () => void;
}) {
  const [sel, setSel] = useState<Filters>({
    level: new Set(),
    duration: new Set(),
    subtitle: new Set(),
    genre: new Set(),
  });

  const Toggle = (group: keyof Filters, val: string) => {
    setSel(prev => {
      const copy: Filters = {
        level: new Set(prev.level),
        duration: new Set(prev.duration),
        subtitle: new Set(prev.subtitle),
        genre: new Set(prev.genre),
      };
      const s = copy[group];
      s.has(val) ? s.delete(val) : s.add(val);
      return copy;
    });
  };

  const Btn = ({ group, children }: { group: keyof Filters; children: string }) => {
    const active = sel[group].has(children);
    return (
      <button
        onClick={() => Toggle(group, children)}
        className={`px-4 py-2 rounded-full text-sm ${
          active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full bg-white rounded-t-xl p-4" style={{ transform: 'translateY(0)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">필터</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <i className="ri-close-line" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">난이도</h4>
            <div className="flex gap-2 flex-wrap">
              <Btn group="level">초급</Btn>
              <Btn group="level">중급</Btn>
              <Btn group="level">고급</Btn>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">콘텐츠 길이</h4>
            <div className="flex gap-2 flex-wrap">
              <Btn group="duration">5분 이하</Btn>
              <Btn group="duration">5-10분</Btn>
              <Btn group="duration">10분 이상</Btn>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">자막 유형</h4>
            <div className="flex gap-2 flex-wrap">
              <Btn group="subtitle">한글</Btn>
              <Btn group="subtitle">영어</Btn>
              <Btn group="subtitle">둘 다</Btn>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">장르</h4>
            <div className="flex gap-2 flex-wrap">
              <Btn group="genre">로맨스</Btn>
              <Btn group="genre">코미디</Btn>
              <Btn group="genre">액션</Btn>
            </div>
          </div>
        </div>

        <button
          onClick={() => onApply(sel)}
          className="w-full py-3 bg-primary text-white font-medium rounded-button mt-6"
        >
          적용
        </button>
      </div>
    </div>
  );
}
