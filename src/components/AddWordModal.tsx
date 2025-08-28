// src/components/AddWordModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Level, Source } from '../types/vocab'; // ✅ 공용 타입만 사용

export default function AddWordModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (payload: {
    korean: string;
    english: string;
    example: string;
    source: Source;
    level: Level;
  }) => void;
}) {
  const [korean, setKorean] = useState('');
  const [english, setEnglish] = useState('');
  const [example, setExample] = useState('');
  const [level, setLevel] = useState<Level>(''); // "", "beginner" | "intermediate" | "advanced"
  const [source, setSource] = useState<Source>(''); // "", "drama" | "variety" | "movie" | "other"
  const [openSource, setOpenSource] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sourceBtnRef = useRef<HTMLButtonElement | null>(null);
  const sourceDropRef = useRef<HTMLDivElement | null>(null);

  const charCount = example.length;

  const isValid = useMemo(() => {
    return korean.trim() && english.trim() && example.trim();
  }, [korean, english, example]);

  // textarea auto-resize
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [example]);

  // 외부 클릭으로 출처 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        openSource &&
        sourceBtnRef.current &&
        sourceDropRef.current &&
        !sourceBtnRef.current.contains(target) &&
        !sourceDropRef.current.contains(target)
      ) {
        setOpenSource(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [openSource]);

  const save = () => {
    if (!isValid) return;
    onSave({
      korean: korean.trim(),
      english: english.trim(),
      example: example.trim(),
      source,
      level,
    });
    setShowSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      {/* Page container */}
      <div className="absolute inset-0 bg-white w-[375px] mx-auto">
        {/* Top bar */}
        <nav className="fixed top-0 w-[375px] mx-auto bg-white z-10 border-b">
          <div className="flex items-center px-4 h-14">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"
              aria-label="뒤로"
            >
              <i className="ri-arrow-left-s-line text-xl" />
            </button>
            <h1 className="flex-1 text-center text-lg font-bold">단어 추가</h1>
            <div className="w-10" />
          </div>
        </nav>

        {/* Main form */}
        <main className="pt-16 pb-24 px-4">
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              save();
            }}
          >
            {/* 한국어 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                한국어 단어 <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="한국어 단어를 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={korean}
                onChange={e => setKorean(e.target.value)}
                required
              />
            </div>

            {/* 영어 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                영어 번역 <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="영어 번역을 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={english}
                onChange={e => setEnglish(e.target.value)}
                required
              />
            </div>

            {/* 예문 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예문 <span className="text-primary">*</span>
              </label>
              <textarea
                ref={textareaRef}
                placeholder="예문을 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows={4}
                maxLength={500}
                value={example}
                onChange={e => setExample(e.target.value)}
                required
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">{charCount}/500</span>
              </div>
            </div>

            {/* 출처 드롭다운 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">출처</label>
              <div className="relative">
                <button
                  type="button"
                  ref={sourceBtnRef}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onClick={() => setOpenSource(v => !v)}
                >
                  <span className={source ? 'text-gray-900' : 'text-gray-500'}>
                    {source
                      ? { drama: '드라마', variety: '예능', movie: '영화', other: '기타' }[source]
                      : '출처를 선택하세요'}
                  </span>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-arrow-down-s-line text-gray-400" />
                  </div>
                </button>

                {openSource && (
                  <div
                    ref={sourceDropRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border z-10"
                  >
                    {(
                      [
                        { v: 'drama', t: '드라마' },
                        { v: 'variety', t: '예능' },
                        { v: 'movie', t: '영화' },
                        { v: 'other', t: '기타' },
                      ] as { v: Source; t: string }[]
                    ).map(o => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => {
                          setSource(o.v);
                          setOpenSource(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                      >
                        {o.t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 난이도 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
              <div className="flex gap-2">
                {(
                  [
                    { v: 'beginner', t: '초급' },
                    { v: 'intermediate', t: '중급' },
                    { v: 'advanced', t: '고급' },
                  ] as { v: Level; t: string }[]
                ).map(o => {
                  const active = level === o.v;
                  return (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setLevel(o.v)}
                      className={`flex-1 px-4 py-2 rounded-full text-sm ${
                        active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {o.t}
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </main>

        {/* Bottom fixed save */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 w-[375px] mx-auto">
          <button
            onClick={save}
            disabled={!isValid}
            className={`w-full py-3 font-medium rounded-button ${
              isValid
                ? 'bg-primary text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            저장
          </button>
        </div>
      </div>

      {/* 성공 모달 */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-2xl text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">단어가 추가되었습니다!</h3>
            <p className="text-sm text-gray-600 mb-6">
              새로운 단어가 단어장에 성공적으로 추가되었습니다.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="w-full py-3 bg-primary text-white font-medium rounded-button"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
