import { useNavigate } from 'react-router-dom';

export default function LearnView({ onOpenFilter }: { onOpenFilter: () => void }) {
  const nav = useNavigate();

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
          <button className="px-4 py-2 rounded-full bg-primary text-white text-sm whitespace-nowrap">
            전체
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
            드라마
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
            예능
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
            영화
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow text-left"
          onClick={() => nav('/learn/1')}
        >
          <img
            src="https://readdy.ai/api/search-image?query=korean%20drama%20scene%2C%20romantic%20moment%2C%20high%20quality%20cinematic&width=600&height=320&seq=4&orientation=landscape"
            className="w-full h-48 object-cover"
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
