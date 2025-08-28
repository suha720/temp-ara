// src/views/LearnView.tsx
import React, { useState } from 'react';
import LearningPlayer from '../components/LearningPlayer';

type LearnViewProps = {
  onOpenFilter?: () => void; // 옵셔널 + 기본값 no-op
};

export default function LearnView({ onOpenFilter = () => {} }: LearnViewProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  if (showDetail) {
    return (
      <section className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setShowDetail(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"
            aria-label="뒤로"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <h2 className="text-lg font-bold">학습하기</h2>
        </div>

        <div className="relative h-56 rounded-xl overflow-hidden mb-4">
          <img
            src="https://readdy.ai/api/search-image?query=korean%20drama%20scene%2C%20romantic%20moment%2C%20high%20quality%20cinematic%2C%20emotional&width=600&height=320&seq=6&orientation=landscape"
            className="w-full h-full object-cover"
            alt="드라마 장면"
          />
          <div className="absolute inset-0 bg-black/20" />
          <button
            className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm"
            onClick={() => setShowPlayer(true)}
            aria-label="재생"
          >
            <i className="ri-play-fill text-3xl text-white" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">사랑의 불시착</h3>
              <p className="text-sm text-gray-600">Episode 1 - Scene 1</p>
            </div>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              초급
            </span>
          </div>
          <p className="text-sm text-gray-600">첫 만남의 순간, 운명적인 대화가 시작됩니다.</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <i className="ri-time-line text-gray-400" />
              <span className="text-xs text-gray-400">5분</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="ri-chat-1-line text-gray-400" />
              <span className="text-xs text-gray-400">20개 대화</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl">
            <h4 className="font-medium mb-3">학습 내용</h4>
            <div className="space-y-2">
              {[
                { icon: 'ri-volume-up-line', text: '발음 연습 - 5개 문장' },
                { icon: 'ri-book-2-line', text: '새로운 단어 - 10개' },
                { icon: 'ri-chat-1-line', text: '대화 연습 - 3개 상황' },
              ].map(i => (
                <div key={i.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                    <i className={`${i.icon} text-primary`} />
                  </div>
                  <span className="text-sm">{i.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3 bg-primary text-white font-medium rounded-button"
            onClick={() => setShowPlayer(true)}
          >
            학습 시작하기
          </button>
        </div>

        {/* 학습 플레이어 모달 */}
        {showPlayer && (
          <LearningPlayer onClose={() => setShowPlayer(false)} initialScene={3} totalScenes={8} />
        )}
      </section>
    );
  }

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">학습하기</h2>
        <button className="text-primary text-sm font-medium" onClick={onOpenFilter}>
          필터
        </button>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {['전체', '드라마', '예능', '영화'].map((t, i) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                i === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <button
          className="bg-white rounded-xl overflow-hidden text-left"
          onClick={() => setShowDetail(true)}
        >
          <img
            src="https://readdy.ai/api/search-image?query=korean%20drama%20scene%2C%20romantic%20moment%2C%20high%20quality%20cinematic&width=600&height=320&seq=4&orientation=landscape"
            className="w-full h-40 object-cover"
            alt="드라마 장면"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">사랑의 불시착</h3>
                <p className="text-sm text-gray-600">Episode 1 - Scene 1</p>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                초급
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              첫 만남의 순간, 운명적인 대화가 시작됩니다.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <i className="ri-time-line text-gray-400" />
                <span className="text-xs text-gray-400">5분</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="ri-chat-1-line text-gray-400" />
                <span className="text-xs text-gray-400">20개 대화</span>
              </div>
            </div>
          </div>
        </button>

        <div className="bg-white rounded-xl overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=korean%20variety%20show%20scene%2C%20fun%20moment%2C%20high%20quality&width=600&height=320&seq=5&orientation=landscape"
            className="w-full h-40 object-cover"
            alt="예능 장면"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">런닝맨</h3>
                <p className="text-sm text-gray-600">Episode 580 - Scene 3</p>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                중급
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              재미있는 게임 속 다양한 한국어 표현을 배워보세요.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <i className="ri-time-line text-gray-400" />
                <span className="text-xs text-gray-400">8분</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="ri-chat-1-line text-gray-400" />
                <span className="text-xs text-gray-400">30개 대화</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
