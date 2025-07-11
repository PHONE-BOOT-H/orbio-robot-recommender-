export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 animate-fade-in">
        {/* 로고 */}
        <div className="flex justify-center mb-6">
          <img src="/orbio_logo.png" alt="Orbio 로고" className="w-40 h-auto" />
        </div>
        {/* 회사명 및 슬로건 */}
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">Orbio (오르비오)</h1>
        <p className="text-center text-lg text-blue-700 font-semibold mb-4">“AI로 설계하는 미래형 로봇 인력 생태계”</p>
        {/* 한 줄 소개 */}
        <p className="text-center text-gray-700 mb-6">AI 기반 로봇 HRM 플랫폼, Orbio는 산업용 로봇을 사람처럼 평가하고, 추천하고, 성장시키는 리소스 매칭 시스템입니다.</p>
        {/* 상세 소개 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">상세 소개</h2>
          <p className="text-gray-700 leading-relaxed">
            Orbio는 PRISM 기반 로봇 운영 데이터 분석을 통해, 로봇 성능, 신뢰도, 활용 이력을 수집하고, 기업 맞춤형 배치 및 NFT 자산화를 지원합니다. 스마트팩토리, 물류, 경비, 헬스케어 등 다양한 산업군에서 최적의 로봇 배치를 가능하게 합니다.
          </p>
        </div>
        {/* 서비스 요약 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">서비스 요약</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>R-HRM 시스템</li>
            <li>AI 기반 매칭 엔진</li>
            <li>NFT 자산화</li>
            <li>성과 리포트 API</li>
          </ul>
        </div>
        {/* 회사 정보 */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">회사 위치</h2>
          <ul className="text-gray-700 space-y-1">
            <li>동아시아 로봇 순환 유통망 허브<br/>(Smart Logistics & Robotics Hub, East Asia)</li>
            <li>→ 한국, 일본, 대만, 베트남 등 주요 거점과 연동 가능</li>
          </ul>
        </div>
        {/* 기본 소개 텍스트 샘플 */}
        <div className="bg-blue-50 rounded-lg p-4 mt-8">
          <p className="text-gray-800 text-sm text-center">
            Orbio는 로봇을 단순 기계가 아닌 '평가 가능한 인재'로 보고, R-HRM 시스템을 통해 성능, 신뢰도, 성향을 분석하여 맞춤 추천 및 자동 배치를 지원합니다. AI 기반 매칭 엔진과 NFT 자산화 기능을 통해 로봇 리소스의 새로운 가치를 창출합니다.
          </p>
        </div>
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