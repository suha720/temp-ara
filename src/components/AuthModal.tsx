import React, { useState } from 'react';

export default function AuthModal({
  type,
  onClose,
  onSubmit,
  toggleType,
}: {
  type: 'login' | 'signup';
  onClose: () => void;
  onSubmit: (payload: { email: string; password: string; name?: string }) => void;
  toggleType: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (type === 'signup' && !name)) return;
    onSubmit({ email, password, name: type === 'signup' ? name : undefined });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-[90%] max-w-sm rounded-xl p-6">
        <form onSubmit={handleSubmit} id="auth-form">
          <div className="text-center mb-6">
            <div className="font-['Pacifico'] text-2xl text-primary mb-2">logo</div>
            <h2 className="text-xl font-bold">{type === 'login' ? '로그인' : '회원가입'}</h2>
          </div>

          <div className="space-y-4">
            {type === 'signup' && (
              <div>
                <label className="text-sm text-gray-600 mb-1 block">이름</label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600 mb-1 block">이메일</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-button mt-6"
          >
            {type === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {type === 'login' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            <button onClick={toggleType} className="text-primary font-medium ml-2">
              {type === 'login' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button className="flex items-center justify-center gap-2 w-full py-3 border rounded-button">
              <i className="ri-google-fill" />
              <span className="text-sm">Google로 계속하기</span>
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-3 border rounded-button">
              <i className="ri-apple-fill" />
              <span className="text-sm">Apple로 계속하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
