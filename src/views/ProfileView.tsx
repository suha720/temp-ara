// src/views/ProfileView.tsx
import React from 'react';

type ProfileViewProps = {
  onOpenFilter?: () => void; // 옵션
};

export default function ProfileView({ onOpenFilter = () => {} }: ProfileViewProps) {
  return (
    <section className="mb-6">
      <div className="flex flex-col items-center mb-6 pt-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
          <i className="ri-user-line text-3xl text-gray-400" />
        </div>
        <h2 className="text-lg font-bold mb-1">민지</h2>
        <p className="text-sm text-gray-600">한국어 학습 73일째</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            Level 3
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
            초급
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard value="73" label="학습일" />
        <StatCard value="156" label="단어" />
        <StatCard value="85%" label="정확도" />
      </div>

      <div className="space-y-4">
        <RowButton icon="ri-settings-3-line" label="설정" onClick={() => {}} />
        <RowButton icon="ri-notification-line" label="알림" onClick={() => {}} />
        <RowButton icon="ri-question-line" label="도움말" onClick={() => {}} />
        <RowButton icon="ri-logout-box-line" label="로그아웃" onClick={() => {}} />
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl text-center">
      <p className="text-2xl font-bold text-primary mb-1">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
}

function RowButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 bg-white rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <i className={`${icon} text-gray-600`} />
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <i className="ri-arrow-right-s-line text-gray-400" />
    </button>
  );
}
