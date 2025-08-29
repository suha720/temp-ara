import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HomeView({
  actions,
}: {
  actions: { openDictionary: () => void; openAddWord?: () => void };
}) {
  const nav = useNavigate();

  const banners = [
    {
      img: 'https://readdy.ai/api/search-image?query=modern%20korean%20drama%20scene%20with%20young%20actors%2C%20high%20quality%2C%20cinematic%20lighting%2C%20emotional%20moment&width=600&height=320&seq=1&orientation=landscape',
      title: '오늘의 추천 드라마',
      desc: '사랑의 불시착 - Episode 1',
    },
    {
      img: 'https://readdy.ai/api/search-image?query=modern%20korean%20drama%20scene%20with%20young%20actors%2C%20high%20quality%2C%20cinematic%20lighting%2C%20emotional%20moment&width=600&height=320&seq=1&orientation=landscape',
      title: '인기 예능',
      desc: '런닝맨 - 웃음폭탄 에피소드',
    },
    {
      img: 'https://readdy.ai/api/search-image?query=modern%20korean%20drama%20scene%20with%20young%20actors%2C%20high%20quality%2C%20cinematic%20lighting%2C%20emotional%20moment&width=600&height=320&seq=1&orientation=landscape',
      title: '명작 영화',
      desc: '기생충 - 명장면 다시보기',
    },
  ];

  return (
    <section className="mb-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="rounded-xl overflow-hidden mb-6"
      >
        {banners.map((b, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[420px]">
              <img src={b.img} className="w-full h-full object-cover" alt={b.title} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-medium">{b.title}</h3>
                <p className="text-white/80 text-sm">{b.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold">안녕하세요, 민지님!</h2>
          <p className="text-sm text-gray-600">오늘도 한국어 공부 화이팅!</p>
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-sm text-primary font-medium">Level 3</span>
        </div>
      </div>

      <div className="relative h-40 rounded-xl overflow-hidden mb-6">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20korean%20drama%20scene%20with%20young%20actors%2C%20high%20quality%2C%20cinematic%20lighting%2C%20emotional%20moment&width=600&height=320&seq=1&orientation=landscape"
          className="w-full h-full object-cover"
          alt="오늘의 추천 영상"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-medium">오늘의 추천 드라마</h3>
          <p className="text-white/80 text-sm">사랑의 불시착 - Episode 1</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h3 className="font-medium mb-3">학습 진행 상황</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">오늘의 목표</span>
          <span className="text-sm font-medium">15/30분</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-primary rounded-full" />
        </div>
      </div>

      {/* 퀵 메뉴 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <button
          className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => nav('/learn')}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <i className="ri-mic-line text-xl text-primary" />
          </div>
          <span className="text-xs text-center">발음 연습</span>
        </button>

        <button
          className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => nav('/vocab')}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <i className="ri-book-open-line text-xl text-primary" />
          </div>
          <span className="text-xs text-center">단어장</span>
        </button>

        <button
          className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => nav('/community')}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <i className="ri-group-line text-xl text-primary" />
          </div>
          <span className="text-xs text-center">커뮤니티</span>
        </button>

        <button
          className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={actions.openDictionary}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <i className="ri-search-line text-xl text-primary" />
          </div>
          <span className="text-xs text-center">사전</span>
        </button>
      </div>

      {/* 0829 - 광고 시작 */}

      <div className="bg-white rounded-xl overflow-hidden mb-6 border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">광고</span>
            <h3 className="font-medium">한글 굿즈 스토어 오픈!</h3>
          </div>
          <a
            href="/store"
            className="px-3 py-1 rounded-button bg-primary text-white text-sm"
            onClick={() => console.log('promo_click_store')}
          >
            보러가기
          </a>
        </div>
        {/* <div className="relative h-32">
          <img
            src="https://picsum.photos/seed/hangulshop/900/300"
            className="w-full h-full object-contain"
            alt="한글 굿즈 프로모션"
          />
        </div> */}
        <div
          className="relative h-32 rounded-xl overflow-hidden mb-6 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://picsum.photos/seed/hangulshop/900/300')",
          }}
        >
          {/* 오버레이 (어두운 그라데이션) */}
          <div className="absolute inset-0 bg-black/30" />

          {/* 안의 콘텐츠 */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-4">
            <h3 className="text-white font-bold text-lg mb-1">한글 굿즈 스토어 오픈!</h3>
            <p className="text-white/80 text-sm mb-2">티셔츠, 머그컵, 스티커까지 🎁</p>
            <a href="/store" className="px-3 py-1 bg-primary text-white rounded-button text-sm">
              보러가기
            </a>
          </div>
        </div>
      </div>

      {/* 0829 - 광고 끝 */}

      {/* 최근 학습 */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">최근 학습한 콘텐츠</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => nav('/learn/1')}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          >
            <img
              src="https://readdy.ai/api/search-image?query=korean%20drama%20scene%20thumbnail%2C%20modern%20setting%2C%20high%20quality&width=120&height=120&seq=2&orientation=squarish"
              className="w-20 h-20 rounded-lg object-cover"
              alt="학습 콘텐츠"
            />
            <div>
              <h4 className="font-medium text-sm">도깨비</h4>
              <p className="text-xs text-gray-600">Episode 3 - Scene 2</p>
              <div className="flex items-center gap-1 mt-1">
                <i className="ri-time-line text-xs text-gray-400" />
                <span className="text-xs text-gray-400">15분 전</span>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <img
              src="https://readdy.ai/api/search-image?query=korean%20drama%20scene%20thumbnail%2C%20emotional%20moment%2C%20high%20quality&width=120&height=120&seq=3&orientation=squarish"
              className="w-16 h-16 rounded-lg object-cover"
              alt="학습 콘텐츠"
            />
            <div>
              <h4 className="font-medium text-sm">응답하라 1988</h4>
              <p className="text-xs text-gray-600">Episode 1 - Scene 5</p>
              <div className="flex items-center gap-1 mt-1">
                <i className="ri-time-line text-xs text-gray-400" />
                <span className="text-xs text-gray-400">1시간 전</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
