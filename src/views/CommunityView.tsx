export default function CommunityView() {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">커뮤니티</h2>
        <button
          className="flex items-center gap-1 text-primary text-sm font-medium"
          onClick={() => alert('글쓰기')}
        >
          <i className="ri-add-line" />
          <span>글쓰기</span>
        </button>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl mb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="검색"
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white text-sm"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['전체', '질문', '토론', '정보'].map((t, i) => (
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

      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="bg-white p-4 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="ri-user-line text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{i === 1 ? '한국어 마스터' : '드라마 팬'}</span>
                  <span className="text-xs text-gray-400">{i === 1 ? '1시간 전' : '2시간 전'}</span>
                </div>
                <h3 className="font-medium mb-2">
                  {i === 1 ? '한국어 발음 연습 팁 공유합니다!' : '도깨비 대사 해석 부탁드려요!'}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {i === 1
                    ? '안녕하세요! 오늘은 제가 한국어 발음 연습할 때 사용하는 방법을 공유하려고 해요...'
                    : '3화에서 나온 이 대사가 이해가 잘 안 되는데 설명해주실 수 있나요?...'}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1">
                    <i className="ri-heart-line text-gray-400" />
                    <span className="text-xs text-gray-400">{i === 1 ? '23' : '15'}</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <i className="ri-chat-1-line text-gray-400" />
                    <span className="text-xs text-gray-400">{i === 1 ? '12' : '8'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
