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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 Orbio 로봇 추천 시스템
          </h1>
          <p className="text-xl text-gray-600">
            작업 조건을 입력하면 AI가 가장 적합한 로봇을 추천해드립니다
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-2">
                작업 조건을 입력하세요
              </label>
              <textarea
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="예: 저온 창고에서 무거운 물품을 운반해야 합니다"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '추천 중...' : '로봇 추천받기'}
            </button>
          </form>
        </div>

        {/* 오류 메시지 */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* 추천 결과 */}
        {recommendation && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 추천 로봇
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* 로봇 정보 */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    {recommendation.robot.name}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">타입:</span>
                      <span className="ml-2 text-gray-600">{recommendation.robot.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">적재 용량:</span>
                      <span className="ml-2 text-gray-600">{recommendation.robot.specifications.payload}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">도달 거리:</span>
                      <span className="ml-2 text-gray-600">{recommendation.robot.specifications.reach}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">속도:</span>
                      <span className="ml-2 text-gray-600">{recommendation.robot.specifications.speed}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">온도 범위:</span>
                      <span className="ml-2 text-gray-600">{recommendation.robot.specifications.temperature}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">작업 환경:</span>
                      <div className="mt-1">
                        {recommendation.robot.specifications.environment.map((env, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded mr-2 mb-1"
                          >
                            {env}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 추천 이유 */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      💡 추천 이유
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {recommendation.reason}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      ✅ 일치하는 능력
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.matchingCapabilities.map((capability, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 로봇 설명 */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  📝 로봇 상세 설명
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {recommendation.robot.description}
                </p>
              </div>

              {/* 사용 사례 */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  🎯 주요 사용 사례
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.robot.useCases.map((useCase, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 