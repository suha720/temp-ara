import React, { useMemo, useState } from 'react';
import HomeView from './views/HomeView';
import LearnView from './views/LearnView';
import VocabView from './views/VocabView';
import CommunityView from './views/CommunityView';
import ProfileView from './views/ProfileView';
import AuthModal from './components/AuthModal';
import FilterSheet from './components/FilterSheet';

type Tab = 'home' | 'learn' | 'vocab' | 'community' | 'profile';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [authType, setAuthType] = useState<'login' | 'signup' | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const TopRight = useMemo(() => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <i className="ri-notification-3-line text-gray-600" />
          </div>
          <button
            onClick={() => setTab('profile')}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
            aria-label="프로필"
          >
            <i className="ri-user-line text-gray-600" />
          </button>
        </div>
      );
    }
    return (
      <button onClick={() => setAuthType('login')} className="text-sm text-primary font-medium">
        로그인
      </button>
    );
  }, [isLoggedIn]);

  return (
    <div className="bg-white w-[375px] min-h-[762px] mx-auto relative">
      {/* Top Nav */}
      <nav className="fixed top-0  w-[375px] bg-white z-50 border-b">
        <div className="flex justify-between items-center px-4 h-14">
          <div className="font-['Gungsuh'] text-xl text-primary">아라</div>
          {TopRight}
        </div>
      </nav>

      {/* Main */}
      <main className="pt-16 pb-20 px-4">
        {tab === 'home' && <HomeView />}
        {tab === 'learn' && <LearnView onOpenFilter={() => setShowFilter(true)} />}
        {tab === 'vocab' && <VocabView />}
        {tab === 'community' && <CommunityView />}
        {tab === 'profile' && <ProfileView />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-[375px] bg-white border-t">
        <div className="grid grid-cols-5 h-16">
          <TabButton
            active={tab === 'home'}
            icon="ri-home-5-line"
            label="홈"
            onClick={() => setTab('home')}
          />
          <TabButton
            active={tab === 'learn'}
            icon="ri-play-circle-line"
            label="학습"
            onClick={() => setTab('learn')}
          />
          <TabButton
            active={tab === 'vocab'}
            icon="ri-book-2-line"
            label="단어장"
            onClick={() => setTab('vocab')}
          />
          <TabButton
            active={tab === 'community'}
            icon="ri-group-line"
            label="커뮤니티"
            onClick={() => setTab('community')}
          />
          <TabButton
            active={tab === 'profile'}
            icon="ri-user-line"
            label="프로필"
            onClick={() => setTab('profile')}
          />
        </div>
      </nav>

      {/* Auth Modal */}
      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          onSubmit={payload => {
            console.log(`${authType} submitted:`, payload);
            setIsLoggedIn(true);
            setAuthType(null);
          }}
          toggleType={() => setAuthType(t => (t === 'login' ? 'signup' : 'login'))}
        />
      )}

      {/* Filter Sheet */}
      {showFilter && (
        <FilterSheet
          onApply={filters => {
            console.log('Selected filters:', filters);
            setShowFilter(false);
          }}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex flex-col items-center justify-center ${
        active ? 'text-primary' : 'text-gray-400'
      }`}
      onClick={onClick}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <i className={icon} />
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}
