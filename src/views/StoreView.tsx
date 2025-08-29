// src/views/StoreView.tsx
import React from 'react';

export default function StoreView() {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">굿즈 스토어</h2>
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">스폰서</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            id: 1,
            name: '한글 티셔츠',
            price: '₩29,000',
            img: 'https://picsum.photos/seed/tee/400/260',
          },
          {
            id: 2,
            name: '훈민정음 머그',
            price: '₩15,000',
            img: 'https://picsum.photos/seed/tee/400/260',
          },
          {
            id: 3,
            name: '한글 스티커팩',
            price: '₩6,900',
            img: 'https://picsum.photos/seed/sticker/400/260',
          },
        ].map(p => (
          <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img src={p.img} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.price}</p>
              <button className="mt-3 w-full py-2 bg-primary text-white rounded-button text-sm">
                상세 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
