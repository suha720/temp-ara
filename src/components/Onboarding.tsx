import React, { useEffect, useMemo, useState } from 'react';

type Slide = {
  title: string;
  description: string;
  image?: string; // 선택
};

const SLIDES: Slide[] = [
  {
    title: '핵심 기능 한눈에',
    description: '앱의 주요 가치와 흐름을 3초 만에 파악하세요.',
    image: 'https://picsum.photos/seed/step1/400/240',
  },
  {
    title: '간단한 조작',
    description: '탭/스와이프로 이동하고, 언제든 Skip할 수 있어요.',
    image: 'https://picsum.photos/seed/step2/400/240',
  },
  {
    title: '지금 시작해보기',
    description: '로그인 없이도 체험 가능! 바로 시작해 보세요.',
    image: 'https://picsum.photos/seed/step3/400/240',
  },
];

interface OnboardingProps {
  onFinish: () => void; // 온보딩 종료 시 호출 (홈 이동 등)
  storageKey?: string; // 기본값: "onboardingSeen"
}

export default function Onboarding({ onFinish, storageKey = 'onboardingSeen' }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const lastIndex = SLIDES.length - 1;

  // 키보드 접근성: 좌우 화살표로 슬라이드 이동
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isLast = index === lastIndex;

  const next = () => setIndex(i => Math.min(i + 1, lastIndex));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  const handleSkipOrFinish = () => {
    localStorage.setItem(storageKey, 'true');
    onFinish();
  };

  const slide = useMemo(() => SLIDES[index], [index]);

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      aria-modal="true"
      role="dialog"
      aria-label="앱 온보딩 안내"
    >
      <div className="w-[min(92vw,420px)] rounded-2xl bg-white shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
            onClick={handleSkipOrFinish}
            aria-label={isLast ? '시작하기' : '건너뛰기'}
          >
            {isLast ? '시작하기' : '건너뛰기'}
          </button>
          <span className="text-xs text-gray-400">
            {index + 1} / {SLIDES.length}
          </span>
        </div>

        {/* 본문 */}
        <div className="px-6 pb-2">
          {slide.image && (
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={slide.image}
                alt=""
                className="w-full h-[200px] object-cover"
                draggable={false}
              />
            </div>
          )}
          <h2 className="text-lg font-bold mb-1">{slide.title}</h2>
          <p className="text-sm text-gray-600">{slide.description}</p>
        </div>

        {/* 인디케이터 */}
        <div className="flex items-center justify-center gap-2 py-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'
              }`}
              aria-label={`슬라이드 ${i + 1}로 이동`}
            />
          ))}
        </div>

        {/* 푸터 버튼 */}
        <div className="flex items-center justify-between px-4 pb-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="px-4 py-2 text-sm rounded-xl border disabled:opacity-40"
          >
            이전
          </button>

          {!isLast ? (
            <button onClick={next} className="px-4 py-2 text-sm rounded-xl bg-gray-900 text-white">
              다음
            </button>
          ) : (
            <button
              onClick={handleSkipOrFinish}
              className="px-4 py-2 text-sm rounded-xl bg-gray-900 text-white"
            >
              시작하기
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
