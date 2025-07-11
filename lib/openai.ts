import OpenAI from 'openai';
import { robots, Robot } from './robots';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface RecommendationResult {
  robot: Robot;
  reason: string;
  matchingCapabilities: string[];
}

export async function getRobotRecommendation(userInput: string): Promise<RecommendationResult> {
  try {
    const robotsData = robots.map(robot => ({
      id: robot.id,
      name: robot.name,
      type: robot.type,
      capabilities: robot.capabilities,
      specifications: robot.specifications,
      description: robot.description,
      useCases: robot.useCases
    }));

    const prompt = `
다음은 Orbio 로봇 목록입니다:

${robotsData.map(robot => `
로봇 ID: ${robot.id}
이름: ${robot.name}
타입: ${robot.type}
능력: ${robot.capabilities.join(', ')}
사양:
- 적재 용량: ${robot.specifications.payload}
- 도달 거리: ${robot.specifications.reach}
- 속도: ${robot.specifications.speed}
- 작업 환경: ${robot.specifications.environment.join(', ')}
- 온도 범위: ${robot.specifications.temperature}
설명: ${robot.description}
사용 사례: ${robot.useCases.join(', ')}
`).join('\n')}

사용자 요구사항: "${userInput}"

위 로봇 중에서 사용자 요구사항에 가장 적합한 로봇을 하나 선택하고, 다음 JSON 형식으로 응답해주세요:

{
  "robotId": "선택된 로봇의 ID",
  "reason": "이 로봇을 추천하는 이유 (한국어로 상세히 설명)",
  "matchingCapabilities": ["요구사항과 일치하는 능력들"]
}

matchingCapabilities는 사용자 요구사항과 일치하는 로봇의 능력들을 나열합니다.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "당신은 로봇 전문가입니다. 사용자의 요구사항을 분석하여 가장 적합한 로봇을 추천해주세요."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('OpenAI API에서 응답을 받지 못했습니다.');
    }

    // JSON 응답 파싱
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('응답에서 JSON을 찾을 수 없습니다.');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    // 선택된 로봇 찾기
    const selectedRobot = robots.find(robot => robot.id === result.robotId);
    if (!selectedRobot) {
      throw new Error('선택된 로봇을 찾을 수 없습니다.');
    }

    return {
      robot: selectedRobot,
      reason: result.reason,
      matchingCapabilities: result.matchingCapabilities || []
    };

  } catch (error) {
    console.error('로봇 추천 중 오류 발생:', error);
    throw error;
  }
} 