export default function VocabView({ onOpenAddWord }: { onOpenAddWord: () => void }) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">단어장</h2>
        <button
          className="flex items-center gap-1 text-primary text-sm font-medium"
          onClick={onOpenAddWord}
        >
          <i className="ri-add-line" />
          <span>추가</span>
        </button>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl mb-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="단어 검색"
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white text-sm"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        <button className="px-4 py-2 rounded-full bg-primary text-white text-sm whitespace-nowrap">
          전체
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
          미학습
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
          학습중
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
          완료
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">고맙습니다</h3>
              <p className="text-sm text-gray-600">Thank you</p>
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
          <p className="text-sm text-gray-600">선물을 받고 고맙다고 말했어요.</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              초급
            </span>
            <span className="text-xs text-gray-400">사랑의 불시착 EP.1</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">잘 지내셨어요?</h3>
              <p className="text-sm text-gray-600">How have you been?</p>
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
          <p className="text-sm text-gray-600">오랜만에 만난 친구에게 안부를 물었어요.</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              초급
            </span>
            <span className="text-xs text-gray-400">도깨비 EP.3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
