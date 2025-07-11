import { NextRequest, NextResponse } from 'next/server';
import { getRobotRecommendation } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: '사용자 입력이 필요합니다.' },
        { status: 400 }
      );
    }

    const recommendation = await getRobotRecommendation(userInput);

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '로봇 추천 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 