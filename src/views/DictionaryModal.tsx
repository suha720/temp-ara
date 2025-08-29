export default function DictionaryModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center "
      onClick={onClose}
    >
      <div className="bg-white w-[90%] max-w-md rounded-xl p-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">사전 검색</h3>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <i className="ri-close-line" />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="단어를 입력하세요"
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 text-sm"
          />
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="text-center text-sm text-gray-600">검색할 단어를 입력해주세요</div>
      </div>
    </div>
  );
}
