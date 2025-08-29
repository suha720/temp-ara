// src/App.tsx
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import HomeView from './views/HomeView';
import LearnView from './views/LearnView';
import LearnDetail from './views/LearnDetail';
import VocabView from './views/VocabView';
import CommunityView from './views/CommunityView';
import ProfileView from './views/ProfileView';

import AuthModal from './components/AuthModal';
import FilterSheet from './components/FilterSheet';
import AddWordModal from './components/AddWordModal';

import DictionaryModal from './views/DictionaryModal';
import StoreView from './views/StoreView';

type AuthType = 'login' | 'signup' | null;
type User = { email: string; password: string; name: string };

function TopNav({
  onOpenAuth,
  isLoggedIn,
}: {
  onOpenAuth: (t: Exclude<AuthType, null>) => void;
  isLoggedIn: boolean;
}) {
  const linkBase = 'text-gray-600 hover:text-gray-900';
  const linkActive = 'text-primary font-medium';

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-20">
          <div className="flex items-center gap-8">
            <div className="font-gungsuh text-2xl text-primary">아라</div>
            <div className="hidden sm:flex items-center gap-6">
              <NavLink to="/" end className={({ isActive }) => (isActive ? linkActive : linkBase)}>
                홈
              </NavLink>
              <NavLink to="/learn" className={({ isActive }) => (isActive ? linkActive : linkBase)}>
                학습하기
              </NavLink>
              <NavLink to="/vocab" className={({ isActive }) => (isActive ? linkActive : linkBase)}>
                단어장
              </NavLink>
              <NavLink
                to="/community"
                className={({ isActive }) => (isActive ? linkActive : linkBase)}
              >
                커뮤니티
              </NavLink>
              <NavLink to="/store" className={({ isActive }) => (isActive ? linkActive : linkBase)}>
                스토어
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50"
              aria-label="알림"
            >
              <i className="ri-notification-3-line text-gray-600" />
            </button>

            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                aria-label="프로필"
                title="프로필"
              >
                <i className="ri-user-line text-gray-700" />
              </NavLink>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-button text-white bg-primary hover:bg-primary/90"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [authType, setAuthType] = useState<AuthType>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddWord, setShowAddWord] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);

  // ✅ 간단 auth 상태 + 유저 저장
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 마운트 시 localStorage에서 상태 복구
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedLoggedIn) setIsLoggedIn(true);
  }, []);

  // AuthModal → payload 하나 받는 형태로 맞춤
  type AuthPayload = { email: string; password: string; name?: string };
  const handleAuthSubmit = (payload: AuthPayload) => {
    if (authType === 'signup') {
      // ⚠️ 학습용: 비밀번호 평문 저장(실서비스 금지)
      const newUser: User = {
        email: payload.email,
        password: payload.password,
        name: payload.name || '게스트',
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('loggedIn', 'true');
      setUser(newUser);
      setIsLoggedIn(true);
      setAuthType(null);
      return;
    }

    if (authType === 'login') {
      const raw = localStorage.getItem('user');
      if (!raw) {
        alert('등록된 계정이 없습니다. 먼저 회원가입을 해 주세요.');
        return;
      }
      const saved: User = JSON.parse(raw);
      if (saved.email === payload.email && saved.password === payload.password) {
        localStorage.setItem('loggedIn', 'true');
        setUser(saved);
        setIsLoggedIn(true);
        setAuthType(null);
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  // 로그아웃
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
    // 유저 자체도 지우려면 아래 주석 해제
    // localStorage.removeItem('user'); setUser(null);
  };

  // FilterSheet → onApply 필수
  const handleApplyFilters = (filters: any) => {
    console.log('Selected filters:', filters);
    setShowFilter(false);
  };

  // AddWordModal → onSave 타입을 컴포넌트로부터 추론 (중복 타입/경로 이슈 방지)
  type AddWordPayload = Parameters<
    NonNullable<React.ComponentProps<typeof AddWordModal>['onSave']>
  >[0];

  const handleSaveWord = (payload: AddWordPayload) => {
    console.log('Saved vocabulary:', payload);
    setShowAddWord(false);
  };

  const actions = useMemo(
    () => ({
      openFilter: () => setShowFilter(true),
      openAddWord: () => setShowAddWord(true),
      openDictionary: () => setShowDictionary(true),
    }),
    [],
  );

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <TopNav onOpenAuth={setAuthType} isLoggedIn={isLoggedIn} />

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8">
              {/* 메인 컨텐츠 */}
              <div className="col-span-12 lg:col-span-9">
                <Routes>
                  <Route path="/" element={<HomeView actions={actions} />} />
                  <Route path="/learn" element={<LearnView onOpenFilter={actions.openFilter} />} />
                  <Route path="/learn/:id" element={<LearnDetail />} />
                  <Route
                    path="/vocab"
                    element={<VocabView onOpenAddWord={actions.openAddWord} />}
                  />
                  <Route path="/community" element={<CommunityView />} />
                  <Route path="/profile" element={<ProfileView onLogout={handleLogout} />} />

                  {/* 추가0829 */}
                  <Route path="/store" element={<StoreView />} />
                </Routes>
              </div>

              {/* 우측 사이드 카드 — 로그인시에만 표시 */}
              {isLoggedIn && (
                <div className="col-span-12 lg:col-span-3">
                  <aside className="bg-white rounded-xl p-6 shadow-sm sticky top-28">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-user-line text-2xl text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{user?.name ?? '게스트'}</h3>
                        <p className="text-sm text-gray-600">한국어 학습 73일째</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">오늘의 목표</span>
                        <span className="text-sm font-medium">15/30분</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-primary rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-primary mb-1">156</p>
                        <p className="text-xs text-gray-600">학습한 단어</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl text-center">
                        <p className="text-2xl font-bold text-primary mb-1">85%</p>
                        <p className="text-xs text-gray-600">정확도</p>
                      </div>
                    </div>

                    <button
                      className="w-full py-3 bg-primary text-white font-medium rounded-button mb-3"
                      onClick={() => (window.location.href = '/learn')}
                    >
                      학습 시작하기
                    </button>

                    <button
                      className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-button"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </button>
                  </aside>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 전역 모달들 */}
        {authType && (
          <AuthModal
            type={authType}
            onClose={() => setAuthType(null)}
            onSubmit={handleAuthSubmit} // payload 하나
            toggleType={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
          />
        )}

        {showFilter && (
          <FilterSheet onClose={() => setShowFilter(false)} onApply={handleApplyFilters} />
        )}

        {showAddWord && (
          <AddWordModal onClose={() => setShowAddWord(false)} onSave={handleSaveWord} />
        )}

        {showDictionary && <DictionaryModal onClose={() => setShowDictionary(false)} />}
      </div>
    </Router>
  );
}
