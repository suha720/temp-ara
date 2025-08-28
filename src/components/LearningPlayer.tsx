// src/components/LearningPlayer.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

type SceneMeta = { id: number; title: string; desc: string };

const SCENES: SceneMeta[] = [
  { id: 1, title: 'Scene 1', desc: '프롤로그' },
  { id: 2, title: 'Scene 2', desc: '운명적 만남' },
  { id: 3, title: 'Scene 3', desc: '첫 만남의 순간' },
  { id: 4, title: 'Scene 4', desc: '오해와 갈등' },
  { id: 5, title: 'Scene 5', desc: '마음의 변화' },
  { id: 6, title: 'Scene 6', desc: '진실의 순간' },
  { id: 7, title: 'Scene 7', desc: '위기의 순간' },
  { id: 8, title: 'Scene 8', desc: '해피엔딩' },
];

type InteractionTab = 'pronunciation' | 'saveWordPanel' | 'savedQuick' | 'notes' | null;
type SubtitleMode = 'ko' | 'en' | 'both';

export default function LearningPlayer({
  onClose,
  initialScene = 3,
  totalScenes = 8,
}: {
  onClose: () => void;
  initialScene?: number;
  totalScenes?: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(initialScene);
  const [progressPct, setProgressPct] = useState((initialScene / totalScenes) * 100);
  const [subtitleSizeUp, setSubtitleSizeUp] = useState(false);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('both');
  const [repeat, setRepeat] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0); // 1.0x
  const speeds = ['1.0x', '1.25x', '1.5x', '0.75x'];
  const [openScenePicker, setOpenScenePicker] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [tab, setTab] = useState<InteractionTab>(null);
  const [showInteraction, setShowInteraction] = useState(false);

  // 발음 연습 가짜 로직
  const [recording, setRecording] = useState(false);
  const [showPronResult, setShowPronResult] = useState(false);

  const sceneMeta = useMemo(
    () => SCENES.find(s => s.id === currentScene) ?? SCENES[0],
    [currentScene],
  );

  useEffect(() => {
    setProgressPct((currentScene / totalScenes) * 100);
  }, [currentScene, totalScenes]);

  const toggleSpeed = () => {
    setSpeedIdx(i => (i + 1) % speeds.length);
  };

  const handlePrev = () => setCurrentScene(s => Math.max(1, s - 1));
  const handleNext = () => setCurrentScene(s => Math.min(totalScenes, s + 1));

  const handleSubtitleLangCycle = () => {
    setSubtitleMode(m => (m === 'both' ? 'ko' : m === 'ko' ? 'en' : 'both'));
  };

  const openTab = (t: InteractionTab) => {
    setShowInteraction(true);
    setShowPronResult(false);
    setTab(t);
  };

  const onWordClick = () => {
    setShowInteraction(true);
    setTab('saveWordPanel');
  };

  const startOrStopRecord = () => {
    if (!recording) {
      setRecording(true);
      setTimeout(() => {
        setRecording(false);
        setShowPronResult(true);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      {/* Container */}
      <div className="absolute inset-0 bg-white w-[375px] mx-auto overflow-hidden">
        {/* Top nav */}
        <nav className="fixed top-0 w-[375px] mx-auto bg-white z-10 border-b">
          <div className="flex justify-between items-center px-4 h-14">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"
            >
              <i className="ri-arrow-left-s-line text-xl" />
            </button>
            <h1 className="text-lg font-bold">학습하기</h1>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
              <i className="ri-bookmark-line text-xl" />
            </button>
          </div>
        </nav>

        <main className="pt-16 pb-20">
          {/* Video / Poster */}
          <section className="mb-4">
            <div className="relative bg-black aspect-video">
              <img
                src="https://readdy.ai/api/search-image?query=korean%20drama%20scene%20romantic%20couple%20talking%20emotional%20moment%20cinematic%20lighting%20high%20quality%20detailed%20composition&width=600&height=337&seq=video1&orientation=landscape"
                className="w-full h-full object-cover"
                alt="드라마 영상"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm"
                >
                  <i
                    className={`${playing ? 'ri-pause-fill' : 'ri-play-fill'} text-3xl text-white`}
                  />
                </button>
              </div>
              {/* simple controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white text-sm">02:15</span>
                  <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-white text-sm">05:00</span>
                  <button className="w-8 h-8 flex items-center justify-center text-white">
                    <i className="ri-fullscreen-line" />
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">전체 학습 진도</span>
                <span className="text-sm font-medium text-primary">
                  {currentScene}/{totalScenes} 장면
                </span>
              </div>
              <div
                className="h-2 rounded-full"
                style={{
                  background: `linear-gradient(90deg,#FF6B6B 0%,#FF6B6B ${progressPct}%,#e5e7eb ${progressPct}%,#e5e7eb 100%)`,
                }}
              />
            </div>
          </section>

          {/* Subtitles */}
          <section className="px-4 mb-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">자막</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSubtitleSizeUp(v => !v)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white"
                    aria-label="자막 크기"
                  >
                    <i className="ri-font-size text-gray-600" />
                  </button>
                  <button
                    onClick={handleSubtitleLangCycle}
                    className="px-3 py-1 bg-white rounded-full text-sm"
                  >
                    {subtitleMode === 'both' ? '한/영' : subtitleMode === 'ko' ? '한글' : '영어'}
                  </button>
                </div>
              </div>

              {/* 현재 자막 줄 */}
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p
                    className={`font-medium mb-1 ${subtitleSizeUp ? 'text-[16px]' : 'text-[14px]'}`}
                  >
                    <span
                      className="bg-[linear-gradient(120deg,#FF6B6B_0%,#FF6B6B_100%)] bg-no-repeat [background-size:100%_0.2em] [background-position:0_88%] cursor-pointer"
                      onClick={onWordClick}
                    >
                      안녕하세요
                    </span>
                    , 처음 뵙겠습니다.
                  </p>
                  {(subtitleMode === 'both' || subtitleMode === 'en') && (
                    <p className="text-sm text-gray-600">
                      Hello, nice to meet you for the first time.
                    </p>
                  )}
                </div>

                {/* 다음 줄(비활성 느낌) */}
                <div className="p-3 bg-white rounded-lg opacity-60">
                  <p className="text-sm font-medium mb-1">저는 윤세리라고 합니다.</p>
                  {(subtitleMode === 'both' || subtitleMode === 'en') && (
                    <p className="text-sm text-gray-600">My name is Yoon Se-ri.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Tools */}
          <section className="px-4 mb-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => openTab('pronunciation')}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm whitespace-nowrap"
              >
                <i className="ri-mic-line" />
                <span>발음 연습</span>
              </button>
              <button
                onClick={() => openTab('savedQuick')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap"
              >
                <i className="ri-bookmark-line" />
                <span>단어 저장</span>
              </button>
              <button
                onClick={() => setRepeat(r => !r)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  repeat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <i className="ri-repeat-line" />
                <span>반복 재생</span>
              </button>
              <button
                onClick={toggleSpeed}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm whitespace-nowrap"
              >
                <i className="ri-speed-line" />
                <span>{speeds[speedIdx]}</span>
              </button>
            </div>
          </section>

          {/* Interaction Area */}
          {showInteraction && (
            <section className="px-4 mb-4">
              <div className="bg-white rounded-xl p-4 border">
                {/* 발음 연습 */}
                {tab === 'pronunciation' && (
                  <div>
                    <div className="text-center mb-4">
                      <h4 className="font-medium mb-2">발음 연습</h4>
                      <p className="text-sm text-gray-600 mb-4">"안녕하세요"를 따라 말해보세요</p>
                      <button
                        onClick={startOrStopRecord}
                        className={`w-16 h-16 flex items-center justify-center rounded-full text-white ${
                          recording ? 'bg-red-500' : 'bg-primary'
                        }`}
                      >
                        <i className={`${recording ? 'ri-stop-line' : 'ri-mic-line'} text-2xl`} />
                      </button>
                      <p className="text-sm text-gray-600 mt-2">
                        {recording ? '녹음 중...' : '녹음하기'}
                      </p>
                    </div>

                    {showPronResult && (
                      <div id="pronunciation-result">
                        <div className="text-center mb-4">
                          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold text-green-600">85</span>
                          </div>
                          <p className="font-medium text-green-600">훌륭해요!</p>
                          <p className="text-sm text-gray-600">발음이 정확합니다</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 border rounded-button text-sm">
                            다시 연습
                          </button>
                          <button className="flex-1 py-2 bg-primary text-white rounded-button text-sm">
                            다음
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 단어 저장 패널(자막 단어 클릭 시) */}
                {tab === 'saveWordPanel' && (
                  <div>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">단어 저장</h4>
                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <p className="font-medium">안녕하세요</p>
                        <p className="text-sm text-gray-600">Hello</p>
                      </div>
                      <textarea
                        placeholder="메모를 추가하세요 (선택사항)"
                        className="w-full p-3 border rounded-lg text-sm resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border rounded-button text-sm">취소</button>
                      <button className="flex-1 py-2 bg-primary text-white rounded-button text-sm">
                        저장
                      </button>
                    </div>
                  </div>
                )}

                {/* 저장된 단어 퀵뷰 */}
                {tab === 'savedQuick' && (
                  <div>
                    <h4 className="font-medium mb-3">저장된 단어</h4>
                    <div className="space-y-2">
                      {[
                        { ko: '안녕하세요', en: 'Hello' },
                        { ko: '처음', en: 'First time' },
                      ].map(w => (
                        <div
                          key={w.ko}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <span className="text-sm font-medium">{w.ko}</span>
                            <span className="text-xs text-gray-600 ml-2">{w.en}</span>
                          </div>
                          <button className="w-6 h-6 flex items-center justify-center text-gray-400">
                            <i className="ri-volume-up-line" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 메모 */}
                {tab === 'notes' && (
                  <div>
                    <h4 className="font-medium mb-3">학습 노트</h4>
                    <textarea
                      placeholder="이 장면에 대한 메모를 작성하세요..."
                      className="w-full p-3 border rounded-lg text-sm resize-none"
                      rows={4}
                    />
                    <button className="w-full py-2 bg-primary text-white rounded-button text-sm mt-3">
                      저장
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Scene controls */}
          <section className="px-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                  >
                    <i className="ri-skip-back-line" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                  >
                    <i className="ri-skip-forward-line" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpenSettings(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                  >
                    <i className="ri-settings-3-line" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setOpenScenePicker(true)}
                  className="w-full p-3 bg-gray-50 rounded-lg text-left flex items-center justify-between"
                >
                  <div>
                    <span className="font-medium">{sceneMeta.title}</span>
                    <span className="text-sm text-gray-600 ml-2">{sceneMeta.desc}</span>
                  </div>
                  <i className="ri-arrow-down-s-line text-gray-400" />
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom dummy nav (비활성/디자인 유지용) */}
        <nav className="fixed bottom-0 w-[375px] mx-auto bg-white border-t">
          <div className="grid grid-cols-5 h-16">
            {[
              { icon: 'ri-home-5-line', text: '홈' },
              { icon: 'ri-play-circle-line', text: '학습', active: true },
              { icon: 'ri-book-2-line', text: '단어장' },
              { icon: 'ri-group-line', text: '커뮤니티' },
              { icon: 'ri-user-line', text: '프로필' },
            ].map(it => (
              <div
                key={it.text}
                className={`flex flex-col items-center justify-center ${
                  it.active ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={it.icon} />
                </div>
                <span className="text-xs mt-1">{it.text}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Scene Picker Modal */}
      {openScenePicker && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center"
          onClick={() => setOpenScenePicker(false)}
        >
          <div className="bg-white w-[90%] rounded-xl p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">장면 선택</h3>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                onClick={() => setOpenScenePicker(false)}
              >
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {SCENES.map(s => (
                <button
                  key={s.id}
                  className={`w-full p-3 text-left rounded-lg hover:bg-gray-50 ${
                    s.id === currentScene ? 'bg-primary/10 text-primary' : ''
                  }`}
                  onClick={() => {
                    setCurrentScene(s.id);
                    setOpenScenePicker(false);
                  }}
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-600">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {openSettings && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center"
          onClick={() => setOpenSettings(false)}
        >
          <div className="bg-white w-[90%] rounded-xl p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">설정</h3>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                onClick={() => setOpenSettings(false)}
              >
                <i className="ri-close-line" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">자막 크기</h4>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-2 rounded-button text-sm ${
                      !subtitleSizeUp ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                    onClick={() => setSubtitleSizeUp(false)}
                  >
                    보통
                  </button>
                  <button
                    className={`px-3 py-2 rounded-button text-sm ${
                      subtitleSizeUp ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                    onClick={() => setSubtitleSizeUp(true)}
                  >
                    크게
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">재생 속도</h4>
                <div className="flex gap-2 flex-wrap">
                  {['0.75x', '1.0x', '1.25x', '1.5x'].map(sp => (
                    <button
                      key={sp}
                      className={`px-3 py-2 rounded-button text-sm ${
                        speeds[speedIdx] === sp ? 'bg-primary text-white' : 'bg-gray-100'
                      }`}
                      onClick={() => setSpeedIdx(speeds.indexOf(sp))}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">자막 언어</h4>
                <div className="flex gap-2">
                  {[
                    { v: 'ko', t: '한글만' },
                    { v: 'both', t: '한글+영어' },
                    { v: 'en', t: '영어만' },
                  ].map(opt => (
                    <button
                      key={opt.v}
                      className={`px-3 py-2 rounded-button text-sm ${
                        subtitleMode === (opt.v as SubtitleMode)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100'
                      }`}
                      onClick={() => setSubtitleMode(opt.v as SubtitleMode)}
                    >
                      {opt.t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
