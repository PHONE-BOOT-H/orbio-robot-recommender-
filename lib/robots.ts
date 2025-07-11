export interface Robot {
  id: string;
  name: string;
  type: string;
  capabilities: string[];
  specifications: {
    payload: string;
    reach: string;
    speed: string;
    environment: string[];
    temperature: string;
  };
  description: string;
  useCases: string[];
}

export const robots: Robot[] = [
  {
    id: "robot-001",
    name: "Orbio ColdBot X1",
    type: "저온 창고 운반 로봇",
    capabilities: ["저온 환경 작업", "무거운 물품 운반", "자율 주행", "냉동 창고 최적화"],
    specifications: {
      payload: "최대 500kg",
      reach: "3.2m",
      speed: "2.5m/s",
      environment: ["저온 창고", "냉동 창고", "냉장 창고"],
      temperature: "-25°C ~ +5°C"
    },
    description: "저온 환경에서 안전하게 작동하는 전문 운반 로봇으로, 냉동 창고의 극한 환경에서도 안정적인 성능을 제공합니다.",
    useCases: ["저온 창고 물품 운반", "냉동 식품 배송", "냉장 창고 자동화"]
  },
  {
    id: "robot-002",
    name: "Orbio WarehouseBot Pro",
    type: "일반 창고 운반 로봇",
    capabilities: ["일반 창고 작업", "다양한 물품 운반", "고속 주행", "스마트 경로 최적화"],
    specifications: {
      payload: "최대 800kg",
      reach: "4.0m",
      speed: "3.5m/s",
      environment: ["일반 창고", "물류 센터", "배송 센터"],
      temperature: "0°C ~ +40°C"
    },
    description: "일반 창고 환경에 최적화된 다목적 운반 로봇으로, 높은 적재 용량과 빠른 속도를 제공합니다.",
    useCases: ["일반 창고 물품 운반", "물류 센터 자동화", "배송 업무 지원"]
  },
  {
    id: "robot-003",
    name: "Orbio PrecisionBot S1",
    type: "정밀 작업 로봇",
    capabilities: ["정밀 조립", "소형 부품 취급", "고정밀 센싱", "품질 검사"],
    specifications: {
      payload: "최대 50kg",
      reach: "1.8m",
      speed: "1.0m/s",
      environment: ["제조 공장", "조립 라인", "품질 검사실"],
      temperature: "+15°C ~ +30°C"
    },
    description: "정밀한 조립 작업과 품질 검사에 특화된 로봇으로, 높은 정확도와 일관성을 보장합니다.",
    useCases: ["전자제품 조립", "자동차 부품 조립", "품질 검사 자동화"]
  },
  {
    id: "robot-004",
    name: "Orbio HeavyBot M1",
    type: "중량 물품 운반 로봇",
    capabilities: ["대형 물품 운반", "높은 적재 용량", "안정적인 운반", "특수 환경 대응"],
    specifications: {
      payload: "최대 2000kg",
      reach: "5.5m",
      speed: "1.8m/s",
      environment: ["중공업 공장", "건설 현장", "항만 시설"],
      temperature: "-10°C ~ +50°C"
    },
    description: "대형 중량 물품을 안전하게 운반할 수 있는 강력한 로봇으로, 극한 환경에서도 안정적으로 작동합니다.",
    useCases: ["중공업 부품 운반", "건설 자재 운반", "항만 컨테이너 작업"]
  },
  {
    id: "robot-005",
    name: "Orbio CleanBot H1",
    type: "청소 및 유지보수 로봇",
    capabilities: ["자동 청소", "유지보수 작업", "위험 환경 대응", "24시간 운영"],
    specifications: {
      payload: "최대 100kg",
      reach: "2.5m",
      speed: "2.0m/s",
      environment: ["화학 공장", "핵시설", "위험 물질 처리장"],
      temperature: "-20°C ~ +60°C"
    },
    description: "위험한 환경에서 청소 및 유지보수 작업을 수행하는 특수 로봇으로, 인간의 안전을 보호합니다.",
    useCases: ["화학 공장 청소", "핵시설 유지보수", "위험 물질 처리"]
  }
]; 