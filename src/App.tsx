// App.tsx
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

import HomeView from './views/HomeView';
import LearnView from './views/LearnView';
import VocabView from './views/VocabView';
import CommunityView from './views/CommunityView';
import ProfileView from './views/ProfileView';
import AuthModal from './components/AuthModal';
import FilterSheet from './components/FilterSheet';

export default function App() {
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
          <NavLink
            to="/profile"
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
            aria-label="프로필"
          >
            <i className="ri-user-line text-gray-600" />
          </NavLink>
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
      <Router>
        {/* Top Nav */}
        <nav className="fixed top-0 w-[375px] bg-white z-50 border-b">
          <div className="flex justify-between items-center px-4 h-14">
            <NavLink to="/" className="font-['Gungsuh'] text-xl text-primary">
              아라
            </NavLink>
            {TopRight}
          </div>
        </nav>

        {/* Main */}
        <main className="pt-16 pb-20 px-4">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/learn" element={<LearnView onOpenFilter={() => setShowFilter(true)} />} />
            <Route path="/vocab" element={<VocabView />} />
            <Route path="/community" element={<CommunityView />} />
            <Route path="/profile" element={<ProfileView />} />
            {/* 잘못된 경로는 홈으로 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 w-[375px] bg-white border-t">
          <div className="grid grid-cols-5 h-16">
            <NavItem to="/" icon="ri-home-5-line" label="홈" end />
            <NavItem to="/learn" icon="ri-play-circle-line" label="학습" />
            <NavItem to="/vocab" icon="ri-book-2-line" label="단어장" />
            <NavItem to="/community" icon="ri-group-line" label="커뮤니티" />
            <NavItem to="/profile" icon="ri-user-line" label="프로필" />
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
      </Router>
    </div>
  );
}

function NavItem({
  to,
  icon,
  label,
  end,
}: {
  to: string;
  icon: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-gray-400'}`
      }
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <i className={icon} />
      </div>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
}
