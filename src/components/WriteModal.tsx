// src/components/WriteModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Category = 'question' | 'discussion' | 'information';
type ImageItem = { id: string; src: string; file: File };

export default function WriteModal({
  title = '글쓰기',
  onCancel,
  onDone,
}: {
  title?: string;
  onCancel: () => void;
  onDone: (payload: { title: string; content: string; category: Category; images: File[] }) => void;
}) {
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const isValid = useMemo(
    () => postTitle.trim() && content.trim() && category,
    [postTitle, content, category],
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 텍스트 영역 자동 리사이즈
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  const handlePickImages = () => {
    if (images.length >= 3) return;
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files);
    const room = 3 - images.length;

    selected.slice(0, room).forEach(file => {
      const id = `${Date.now()}-${Math.random()}`;
      const src = URL.createObjectURL(file);
      setImages(prev => [...prev, { id, src, file }]);
    });
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const item = prev.find(i => i.id === id);
      if (item) URL.revokeObjectURL(item.src);
      return prev.filter(i => i.id !== id);
    });
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onDone({
      title: postTitle.trim(),
      content: content.trim(),
      category: category as Category,
      images: images.map(i => i.file),
    });
    setShowSuccess(true);
  };

  const handleConfirm = () => {
    setShowSuccess(false);
  };

  const askCancel = () => {
    // 브라우저 confirm 대체(원하면 커스텀 모달로 바꿔도 됨)
    if (window.confirm('작성 중인 내용이 삭제됩니다. 정말 취소하시겠습니까?')) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* 백드롭 */}
      <div className="absolute inset-0 bg-black/50" onClick={askCancel} aria-hidden />

      {/* 컨테이너 */}
      <div className="absolute inset-0 bg-white w-[375px] mx-auto">
        {/* Top Nav */}
        <nav className="fixed top-0 w-[375px] mx-auto bg-white z-10 border-b">
          <div className="flex justify-between items-center px-4 h-14">
            <button
              onClick={askCancel}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="뒤로"
            >
              <i className="ri-arrow-left-line text-gray-600 text-xl" />
            </button>
            <h1 className="text-lg font-bold">{title}</h1>
            <button
              onClick={handleSubmit}
              className={`text-primary font-medium text-sm px-3 py-1 rounded-button ${
                isValid ? 'opacity-100' : 'opacity-50 pointer-events-none'
              }`}
            >
              완료
            </button>
          </div>
        </nav>

        {/* Main */}
        <main className="pt-16 pb-6 px-4">
          <div className="space-y-6">
            {/* 제목 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
              />
            </div>

            {/* 카테고리 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">카테고리</label>
              <div className="space-y-2">
                {(
                  [
                    { id: 'question', label: '질문' },
                    { id: 'discussion', label: '토론' },
                    { id: 'information', label: '정보' },
                  ] as const
                ).map(opt => {
                  const checked = category === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        checked ? 'bg-primary text-white' : 'bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        checked={checked}
                        onChange={() => setCategory(opt.id)}
                      />
                      <span
                        className={`relative w-5 h-5 rounded-full border-2 ${
                          checked ? 'border-white bg-white' : 'border-gray-300'
                        }`}
                      >
                        {checked && (
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                        )}
                      </span>
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 내용 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">내용</label>
              <textarea
                ref={textareaRef}
                placeholder="내용을 입력하세요"
                rows={8}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            {/* 이미지 첨부 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">이미지 첨부</label>
              <button
                onClick={handlePickImages}
                className={`w-full flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 hover:bg-gray-100 transition-colors ${
                  images.length >= 3 ? 'hidden' : ''
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                  <i className="ri-camera-line text-xl text-gray-500" />
                </div>
                <span className="text-sm text-gray-600">이미지 첨부</span>
                <span className="text-xs text-gray-400">최대 3장까지 첨부 가능</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleFilesSelected(e.target.files)}
              />

              <div className="grid grid-cols-3 gap-3">
                {images.map(img => (
                  <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden">
                    <img src={img.src} alt="미리보기" className="w-full h-full object-cover" />
                    <button
                      aria-label="이미지 삭제"
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    >
                      <i className="ri-close-line text-white text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={askCancel}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className={`flex-1 py-3 rounded-xl bg-primary text-white font-medium ${
                  isValid ? '' : 'opacity-50 pointer-events-none'
                }`}
              >
                작성 완료
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* 성공 모달 */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-2xl text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">게시글 작성 완료!</h3>
            <p className="text-sm text-gray-600 mb-6">게시글이 성공적으로 작성되었습니다.</p>
            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
