'use client';

import { useState } from 'react';
import { RecommendationResult } from '@/lib/openai';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('작업 조건을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendation(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('추천 요청에 실패했습니다.');
      }

      const result = await response.json();
      setRecommendation(result);
    } catch (err) {
      setError('로봇 추천 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#6a11cb] flex flex-col justify-start items-center py-0" style={{ fontFamily: 'Orbitron, sans-serif' }}>
      <div className="container mx-auto px-4 py-8">
        {/* 상단 Orbio 로고 (링크 없이 단순 이미지) */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 shadow-lg">
            <img
              src="/orbio_logo.png"
              alt="Orbio 로고"
              className="w-60 h-auto mb-2 drop-shadow-[0_0_24px_#6a11cb] transition-transform duration-300 hover:scale-105"
              style={{ filter: 'drop-shadow(0 2px 16px #6a11cb88)' }}
            />
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
          <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/10 border border-[#6a11cb80] rounded-2xl shadow-lg p-8">
            <div className="mb-4">
              <label htmlFor="userInput" className="block text-sm font-medium text-blue-100 mb-2 drop-shadow-[0_2px_8px_rgba(106,17,203,0.5)]">
                작업 조건을 입력하세요
              </label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="예: 저온 창고에서 무거운 물품을 운반해야 합니다"
                className="w-full px-3 py-2 bg-white/20 text-white placeholder:text-blue-100 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a11cb] focus:border-transparent transition-shadow duration-200 focus:shadow-lg backdrop-blur-sm"
                rows={4}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white font-bold py-2 px-4 rounded-md shadow-lg drop-shadow-[0_0_12px_#6a11cb] hover:from-[#2575fc] hover:to-[#6a11cb] focus:outline-none focus:ring-2 focus:ring-[#6a11cb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  추천 중...
                </span>
              ) : '로봇 추천받기'}
            </button>
          </form>
        </div>

        {/* 오류 메시지 */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* 추천 결과 */}
        {(loading || recommendation) && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            {loading ? (
              <div className="backdrop-blur-lg bg-white/10 border border-[#6a11cb80] rounded-2xl p-8 shadow-2xl drop-shadow-[0_0_32px_#6a11cb88] flex flex-col items-center justify-center min-h-[320px]">
                <div className="mb-4">
                  <svg className="animate-spin" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" stroke="#6a11cb" strokeWidth="8" opacity="0.2" />
                    <path d="M60 32c0-15.464-12.536-28-28-28" stroke="#6a11cb" strokeWidth="8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-white text-lg font-bold drop-shadow-[0_2px_8px_rgba(106,17,203,0.5)]">로봇을 추천 중입니다...</div>
              </div>
            ) : recommendation ? (
              <div className="backdrop-blur-lg bg-white/10 border border-[#6a11cb80] rounded-2xl p-8 shadow-2xl drop-shadow-[0_0_32px_#6a11cb88] transition-transform duration-500 hover:scale-[1.01]">
                <h2 className="text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(106,17,203,0.5)] mb-6 flex items-center gap-2">
                  추천 로봇
                  <span className="inline-block animate-bounce text-3xl">🤖</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 로봇 정보 */}
                  <div className="bg-white/30 rounded-lg p-6 animate-fade-in">
                    <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(106,17,203,0.5)] mb-4">
                      {recommendation.robot.name}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-blue-100">타입:</span>
                        <span className="ml-2 text-white/90">{recommendation.robot.type}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-100">적재 용량:</span>
                        <span className="ml-2 text-white/90">{recommendation.robot.specifications.payload}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-100">도달 거리:</span>
                        <span className="ml-2 text-white/90">{recommendation.robot.specifications.reach}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-100">속도:</span>
                        <span className="ml-2 text-white/90">{recommendation.robot.specifications.speed}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-100">온도 범위:</span>
                        <span className="ml-2 text-white/90">{recommendation.robot.specifications.temperature}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-100">작업 환경:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {recommendation.robot.specifications.environment.map((env, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-400/30 text-blue-100 text-sm px-2 py-1 rounded mr-2 mb-1 transition-transform duration-200 hover:scale-110 hover:bg-blue-300/60"
                            >
                              {env}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 추천 이유 및 일치 능력 */}
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <p className="text-white/90 leading-relaxed text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                        {recommendation.reason}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.matchingCapabilities.map((capability, index) => (
                          <span
                            key={index}
                            className="bg-green-400/30 text-green-100 text-sm px-3 py-1 rounded-full transition-transform duration-200 hover:scale-110 hover:bg-green-300/60"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 로봇 설명 */}
                  <div className="mt-6 pt-6 border-t border-blue-200/30 animate-fade-in">
                    <h4 className="text-lg font-semibold text-white mb-3 drop-shadow-[0_2px_8px_rgba(106,17,203,0.5)]">
                      로봇 상세 설명
                    </h4>
                    <p className="text-white/90 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                      {recommendation.robot.description}
                    </p>
                  </div>

                  {/* 사용 사례 */}
                  <div className="mt-6 pt-6 border-t border-purple-200/30 animate-fade-in">
                    <h4 className="text-lg font-semibold text-white mb-3 drop-shadow-[0_2px_8px_rgba(106,17,203,0.5)]">
                      주요 사용 사례
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.robot.useCases.map((useCase, index) => (
                        <span
                          key={index}
                          className="bg-purple-400/30 text-purple-100 text-sm px-3 py-1 rounded-full transition-transform duration-200 hover:scale-110 hover:bg-purple-300/60"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
      {/* 애니메이션 효과용 스타일 */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
} 