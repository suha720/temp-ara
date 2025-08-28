export default function HomeView() {
  return (
    <section className="mb-6">
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
          <div className="w-1/2 h-full bg-primary rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: 'ri-mic-line', label: '발음 연습' },
          { icon: 'ri-book-open-line', label: '단어장' },
          { icon: 'ri-group-line', label: '커뮤니티' },
          { icon: 'ri-search-line', label: '사전' },
        ].map(i => (
          <div key={i.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50">
            <div className="w-12 h-12 flex items-center justify-center">
              <i className={`${i.icon} text-xl text-primary`} />
            </div>
            <span className="text-xs text-center">{i.label}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">최근 학습한 콘텐츠</h3>
        <div className="space-y-3">
          {[
            {
              img: 'https://readdy.ai/api/search-image?query=korean%20drama%20scene%20thumbnail%2C%20modern%20setting%2C%20high%20quality&width=120&height=120&seq=2&orientation=squarish',
              title: '도깨비',
              sub: 'Episode 3 - Scene 2',
              time: '15분 전',
            },
            {
              img: 'https://readdy.ai/api/search-image?query=korean%20drama%20scene%20thumbnail%2C%20emotional%20moment%2C%20high%20quality&width=120&height=120&seq=3&orientation=squarish',
              title: '응답하라 1988',
              sub: 'Episode 1 - Scene 5',
              time: '1시간 전',
            },
          ].map(c => (
            <div key={c.title} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <img src={c.img} className="w-16 h-16 rounded-lg object-cover" alt="학습 콘텐츠" />
              <div>
                <h4 className="font-medium text-sm">{c.title}</h4>
                <p className="text-xs text-gray-600">{c.sub}</p>
                <div className="flex items-center gap-1 mt-1">
                  <i className="ri-time-line text-xs text-gray-400" />
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
