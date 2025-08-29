import React, { useEffect, useState } from 'react';
import Onboarding from './components/Onboarding';

export default function Mine() {
  const STORAGE_KEY = 'onboardingSeen';
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY) === 'true';
    if (!seen) setShowOnboarding(true);
  }, []);

  return (
    <div className="min-h-dvh">
      {showOnboarding && (
        <Onboarding onFinish={() => setShowOnboarding(false)} storageKey={STORAGE_KEY} />
      )}

      {/* 실제 앱 화면 */}
      <main className="p-6">
        <h1 className="text-2xl font-bold">홈</h1>
        <p className="text-gray-600 mt-2">여기부터 실제 콘텐츠가 렌더링됩니다.</p>
      </main>
    </div>
  );
}
